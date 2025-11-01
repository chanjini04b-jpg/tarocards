// Tarot History Story System - 타로와 세계문화유산 연결 시스템
class TarotHistoryStory {
    constructor() {
        this.heritageData = this.createHeritageData();
        this.selectedCard = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('TarotHistoryStory 시스템 초기화 완료');
    }

    setupEventListeners() {
        // 선택 방법 버튼들
        document.querySelectorAll('.story-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const method = e.currentTarget.dataset.method;
                this.handleSelectionMethod(method);
            });
        });

        // 랜덤 스토리 버튼
        const randomBtn = document.getElementById('randomStoryBtn');
        if (randomBtn) {
            randomBtn.addEventListener('click', () => {
                this.generateRandomStory();
            });
        }
    }

    handleSelectionMethod(method) {
        const cardGrid = document.getElementById('storyCardGrid');
        const randomBtn = document.getElementById('randomStoryBtn');
        
        // 버튼 상태 업데이트
        document.querySelectorAll('.story-option-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-method="${method}"]`).classList.add('active');

        if (method === 'random') {
            cardGrid.style.display = 'none';
            randomBtn.style.display = 'block';
            randomBtn.innerHTML = `
                <span class="story-btn-icon">✨</span>
                운명의 역사 이야기 듣기
                <span class="story-btn-icon">📖</span>
            `;
        } else if (method === 'choose') {
            cardGrid.style.display = 'grid';
            randomBtn.style.display = 'none';
            this.generateCardGrid();
        }
    }

    generateCardGrid() {
        const cardGrid = document.getElementById('storyCardGrid');
        if (!cardGrid) return;

        const majorArcana = this.getMajorArcanaCards();
        
        cardGrid.innerHTML = `
            <div class="story-grid-header">
                <h4>메이저 아르카나 카드를 선택하세요</h4>
                <p>각 카드마다 특별한 세계문화유산 이야기가 기다리고 있습니다</p>
            </div>
            <div class="story-card-container">
                ${majorArcana.map(card => `
                    <div class="story-card-item" data-card-id="${card.id}">
                        <div class="story-card-image">
                            <img src="images/${card.image_url}" alt="${card.name}" 
                                 onerror="this.src='images/CardBacks.jpg'">
                        </div>
                        <div class="story-card-info">
                            <h5>${card.name}</h5>
                            <p class="heritage-preview">${this.heritageData[card.id]?.name || '신비로운 유적'}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // 카드 클릭 이벤트 추가
        cardGrid.querySelectorAll('.story-card-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const cardId = e.currentTarget.dataset.cardId;
                this.selectCard(cardId);
            });
        });
    }

    selectCard(cardId) {
        // 선택된 카드 표시
        document.querySelectorAll('.story-card-item').forEach(item => {
            item.classList.remove('selected');
        });
        const selectedCardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        if (selectedCardElement) {
            selectedCardElement.classList.add('selected');
            
            // 카드 선택 효과
            selectedCardElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                selectedCardElement.style.transform = '';
            }, 300);
        }

        // 카드 정보 저장
        const majorArcana = this.getMajorArcanaCards();
        this.selectedCard = majorArcana.find(card => card.id === cardId);
        
        // 로딩 효과와 함께 스토리 생성
        this.generateStoryWithLoading(this.selectedCard);
    }

    generateStoryWithLoading(card) {
        if (!card) return;

        // 임시 로딩 메시지 표시
        const storyResult = document.getElementById('storyResult');
        if (!storyResult) return;

        storyResult.innerHTML = `
            <div class="story-loading">
                <div class="loading-spinner"></div>
                <h3>🏛️ ${card.name}의 이야기를 준비하고 있습니다...</h3>
                <p>고대 문명의 지혜를 불러오는 중...</p>
            </div>
        `;
        storyResult.style.display = 'block';
        storyResult.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // 0.8초 후 실제 스토리 표시 (더 빠르게)
        setTimeout(() => {
            this.generateStory(card);
        }, 800);
    }

    generateRandomStory() {
        const randomBtn = document.getElementById('randomStoryBtn');
        if (!randomBtn) return;

        // 로딩 상태 시작
        this.setButtonLoading(randomBtn, true);

        // 약간의 지연을 주어 로딩 효과를 보여줌
        setTimeout(() => {
            const majorArcana = this.getMajorArcanaCards();
            const randomIndex = Math.floor(Math.random() * majorArcana.length);
            this.selectedCard = majorArcana[randomIndex];
            
            this.generateStoryWithLoading(this.selectedCard);
            
            // 로딩 상태 종료
            this.setButtonLoading(randomBtn, false);
        }, 600); // 0.6초로 단축 (카드 선택 로딩이 추가로 0.8초)
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.innerHTML = `
                <span class="story-btn-icon">⏳</span>
                우주의 메시지를 받아오고 있습니다...
                <span class="story-btn-icon">✨</span>
            `;
        } else {
            button.classList.remove('loading');
            button.innerHTML = `
                <span class="story-btn-icon">✨</span>
                운명의 역사 이야기 듣기
                <span class="story-btn-icon">📖</span>
            `;
        }
    }

    generateStory(card) {
        if (!card) return;

        const heritage = this.heritageData[card.id];
        if (!heritage) {
            console.error('Heritage data not found for card:', card.id);
            return;
        }

        const storyResult = document.getElementById('storyResult');
        if (!storyResult) return;

        const storyHTML = `
            <div class="story-header">
                <h3>🏛️ ${card.name}과 ${heritage.name}의 이야기</h3>
                <div class="story-subtitle">
                    <span class="heritage-location">📍 ${heritage.location}</span>
                    <span class="heritage-period">🕰️ ${heritage.period}</span>
                </div>
            </div>

            <div class="story-content">
                <div class="story-visual">
                    <div class="story-card-display">
                        <img src="images/${card.image_url}" alt="${card.name}" 
                             class="story-selected-card"
                             onerror="this.src='images/CardBacks.jpg'">
                        <div class="card-overlay">
                            <h4>${card.name}</h4>
                        </div>
                    </div>
                </div>

                <div class="story-narrative">
                    <div class="story-section">
                        <h4>🔮 타로의 상징</h4>
                        <div class="tarot-meaning">
                            <p><strong>핵심 의미:</strong> ${heritage.tarotMeaning}</p>
                            <div class="tarot-keywords">
                                <strong>키워드:</strong>
                                ${heritage.tarotKeywords.map(keyword => 
                                    `<span class="keyword-tag">${keyword}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="story-section">
                        <h4>🏛️ 문화유산의 역사</h4>
                        <div class="heritage-story">
                            <p>${heritage.history}</p>
                            <div class="heritage-facts">
                                <div class="fact-item">
                                    <strong>건설 시기:</strong> ${heritage.period}
                                </div>
                                <div class="fact-item">
                                    <strong>문화적 의미:</strong> ${heritage.culturalSignificance}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="story-section highlight">
                        <h4>🔗 신비로운 연결고리</h4>
                        <div class="connection-story">
                            <p>${heritage.connection}</p>
                        </div>
                    </div>

                    <div class="story-section">
                        <h4>💫 현대적 메시지</h4>
                        <div class="modern-message">
                            <p>${heritage.modernMessage}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="story-footer">
                <button class="story-new-btn" onclick="window.tarotHistoryStory.handleNewStoryClick(this)">
                    <span class="btn-icon">🎲</span>
                    새로운 이야기 듣기
                </button>
                <button class="story-share-btn" onclick="window.tarotHistoryStory.shareStory()">
                    <span class="btn-icon">📤</span>
                    이야기 공유하기
                </button>
            </div>
        `;

        storyResult.innerHTML = storyHTML;
        storyResult.style.display = 'block';
        
        // 부드러운 스크롤
        storyResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    getMajorArcanaCards() {
        // 메이저 아르카나 카드 정보 (기존 simple-tarot.js와 연동 가능)
        return [
            { id: 'MA0', name: 'The Fool', image_url: '00-TheFool.jpg' },
            { id: 'MA1', name: 'The Magician', image_url: '01-TheMagician.jpg' },
            { id: 'MA2', name: 'The High Priestess', image_url: '02-TheHighPriestess.jpg' },
            { id: 'MA3', name: 'The Empress', image_url: '03-TheEmpress.jpg' },
            { id: 'MA4', name: 'The Emperor', image_url: '04-TheEmperor.jpg' },
            { id: 'MA5', name: 'The Hierophant', image_url: '05-TheHierophant.jpg' },
            { id: 'MA6', name: 'The Lovers', image_url: '06-TheLovers.jpg' },
            { id: 'MA7', name: 'The Chariot', image_url: '07-TheChariot.jpg' },
            { id: 'MA8', name: 'Strength', image_url: '08-Strength.jpg' },
            { id: 'MA9', name: 'The Hermit', image_url: '09-TheHermit.jpg' },
            { id: 'MA10', name: 'Wheel of Fortune', image_url: '10-WheelOfFortune.jpg' },
            { id: 'MA11', name: 'Justice', image_url: '11-Justice.jpg' },
            { id: 'MA12', name: 'The Hanged Man', image_url: '12-TheHangedMan.jpg' },
            { id: 'MA13', name: 'Death', image_url: '13-Death.jpg' },
            { id: 'MA14', name: 'Temperance', image_url: '14-Temperance.jpg' },
            { id: 'MA15', name: 'The Devil', image_url: '15-TheDevil.jpg' },
            { id: 'MA16', name: 'The Tower', image_url: '16-TheTower.jpg' },
            { id: 'MA17', name: 'The Star', image_url: '17-TheStar.jpg' },
            { id: 'MA18', name: 'The Moon', image_url: '18-TheMoon.jpg' },
            { id: 'MA19', name: 'The Sun', image_url: '19-TheSun.jpg' },
            { id: 'MA20', name: 'Judgement', image_url: '20-Judgement.jpg' },
            { id: 'MA21', name: 'The World', image_url: '21-TheWorld.jpg' }
        ];
    }

    createHeritageData() {
        return {
            'MA0': {
                name: '피라미드 - 기자의 대피라미드',
                location: '이집트 기자',
                period: '기원전 2580~2510년',
                tarotMeaning: '새로운 시작과 무한한 가능성을 상징하는 바보는 고대 이집트인들이 내세로의 여행을 준비하며 가졌던 순수한 믿음과 연결됩니다.',
                tarotKeywords: ['새로운 시작', '순수함', '모험', '신뢰', '영적 여행'],
                history: '기자의 대피라미드는 고대 세계 7대 불가사의 중 유일하게 현존하는 건축물입니다. 파라오 쿠푸의 무덤으로 건설된 이 피라미드는 약 20년에 걸쳐 완성되었으며, 당시로서는 상상할 수 없는 정밀도와 기술력으로 건설되었습니다.',
                culturalSignificance: '영원불멸과 부활의 상징',
                connection: '바보 카드의 영적 여행자처럼, 고대 이집트인들은 죽음을 또 다른 시작으로 여겼습니다. 피라미드는 파라오가 새로운 세계로 떠나는 관문이었으며, 이는 바보가 절벽 끝에서 새로운 모험을 시작하는 모습과 놀랍도록 닮아있습니다.',
                modernMessage: '때로는 과거의 안전함을 버리고 새로운 가능성을 향해 첫 발을 내딛는 용기가 필요합니다. 고대 이집트인들의 내세에 대한 믿음처럼, 우리도 미지의 미래에 대한 순수한 신뢰를 가져야 합니다.'
            },
            'MA1': {
                name: '스톤헨지',
                location: '영국 윌트셔',
                period: '기원전 3100~1600년',
                tarotMeaning: '마법사는 하늘과 땅을 연결하는 존재입니다. 스톤헨지 역시 천체의 움직임과 지상을 연결하는 고대의 천문대였습니다.',
                tarotKeywords: ['의지력', '창조', '연결', '천체의 지혜', '고대 마법'],
                history: '스톤헨지는 약 1500년에 걸쳐 여러 단계로 건설된 거석 기념물입니다. 정확한 천문학적 계산을 바탕으로 배치된 거석들은 하지와 동지의 일출과 일몰을 완벽하게 계산하여 만들어졌습니다.',
                culturalSignificance: '고대 켈트족의 영적 중심지이자 천문 관측소',
                connection: '마법사가 사원소를 다루며 우주의 힘을 조율하듯, 스톤헨지의 고대 건축자들은 천체의 움직임을 정확히 계산하여 돌의 배치를 결정했습니다. 이는 인간의 의지와 우주의 법칙이 조화를 이루는 완벽한 예시입니다.',
                modernMessage: '현대를 살아가는 우리도 고대인들처럼 자연의 리듬과 조화를 이루며 살아갈 필요가 있습니다. 마법사의 지팡이처럼, 우리의 의지력으로 꿈을 현실로 만들어갈 수 있습니다.'
            },
            'MA2': {
                name: '델파이 신전',
                location: '그리스 포키스',
                period: '기원전 8~4세기',
                tarotMeaning: '여교황은 직관과 내면의 지혜를 상징합니다. 델파이의 피티아(무녀)들은 아폴론 신의 신탁을 전달하며 고대 세계의 운명을 좌우했습니다.',
                tarotKeywords: ['직감', '예언', '내면의 목소리', '신성한 지혜', '신비'],
                history: '델파이 신전은 고대 그리스의 가장 중요한 종교적 중심지였습니다. 이곳의 신탁은 개인부터 국가에 이르기까지 모든 중요한 결정에 영향을 미쳤으며, "너 자신을 알라"라는 유명한 격언이 새겨진 곳이기도 합니다.',
                culturalSignificance: '고대 그리스 세계의 영적 중심지',
                connection: '여교황이 베일 뒤의 숨겨진 지식을 지키는 것처럼, 델파이의 무녀들은 신들의 메시지를 인간 세계에 전달하는 중재자 역할을 했습니다. 둘 다 이성을 넘어선 직관적 지혜의 중요성을 보여줍니다.',
                modernMessage: '복잡한 현대 사회에서 때로는 논리적 분석보다 내면의 목소리에 귀를 기울이는 것이 더 중요할 수 있습니다. 고대 델파이의 지혜처럼 자신을 깊이 알아가는 것이 모든 답의 시작입니다.'
            },
            'MA3': {
                name: '바벨론의 공중정원',
                location: '이라크 바빌론',
                period: '기원전 605~562년',
                tarotMeaning: '여황제는 풍요와 창조의 여신입니다. 바벨론의 공중정원은 사막에 피어난 기적 같은 낙원으로, 창조력과 풍요로움의 극치를 보여줍니다.',
                tarotKeywords: ['풍요', '창조력', '모성', '자연의 힘', '번영'],
                history: '네부카드네자르 2세가 아내 아미티스를 위해 건설했다고 전해지는 공중정원은 고대 세계 7대 불가사의 중 하나입니다. 계단식 구조로 이루어진 정원에는 각종 식물과 나무들이 자라났으며, 정교한 관개 시스템으로 물을 공급받았습니다.',
                culturalSignificance: '인공적 낙원 창조의 상징',
                connection: '여황제가 자연의 풍요로움을 관장하듯, 공중정원은 인간의 창조력으로 사막에 녹색 오아시스를 만들어낸 기적입니다. 두 상징 모두 생명력과 창조의 무한한 가능성을 보여줍니다.',
                modernMessage: '우리 주변의 황량한 현실도 창의적 사고와 꾸준한 노력으로 아름다운 정원으로 바꿀 수 있습니다. 여황제의 창조력을 믿고 자신만의 낙원을 만들어보세요.'
            },
            'MA4': {
                name: '만리장성',
                location: '중국',
                period: '기원전 7세기~명나라',
                tarotMeaning: '황제는 질서와 권위, 안정을 상징합니다. 만리장성은 중국 황제들이 영토를 보호하고 질서를 유지하기 위해 건설한 거대한 방어벽입니다.',
                tarotKeywords: ['권위', '보호', '질서', '리더십', '영토'],
                history: '만리장성은 여러 왕조에 걸쳐 약 2,000년 동안 건설되고 보수된 거대한 방어 시설입니다. 총 길이는 약 21,000km에 달하며, 북방 민족의 침입을 막기 위한 목적으로 건설되었습니다.',
                culturalSignificance: '중국 통일과 황제권의 상징',
                connection: '황제 카드의 권위와 보호 본능처럼, 만리장성은 황제가 백성을 보호하려는 의지의 물리적 구현체입니다. 강력한 리더십과 체계적인 조직력이 만들어낸 인류 최대의 건축물입니다.',
                modernMessage: '진정한 리더는 자신의 권위를 과시하기보다는 맡은 것을 보호하고 발전시키는 데 집중해야 합니다. 황제의 지혜로 자신의 영역을 지키고 발전시켜 나가세요.'
            },
            'MA5': {
                name: '바티칸 시티',
                location: '이탈리아 로마',
                period: '4세기~현재',
                tarotMeaning: '교황은 전통적 지혜와 영적 가르침의 전달자입니다. 바티칸은 가톨릭 교회의 중심지로서 종교적 전통과 교육의 역할을 담당해왔습니다.',
                tarotKeywords: ['전통', '영성', '교육', '지혜 전수', '종교적 권위'],
                history: '바티칸 시티는 세계에서 가장 작은 독립국가이자 가톨릭 교회의 총본산입니다. 성 베드로 대성당과 시스티나 성당 등 인류의 위대한 예술 작품들이 보존되어 있으며, 교황청이 소재하고 있습니다.',
                culturalSignificance: '서구 기독교 문명의 정신적 중심지',
                connection: '교황 카드가 영적 지혜를 전수하는 역할을 하듯, 바티칸은 2,000년간 기독교 전통과 가르침을 보존하고 전파해왔습니다. 두 상징 모두 지혜의 계승과 영적 성장의 중요성을 강조합니다.',
                modernMessage: '개인적 성장을 위해서는 과거의 지혜를 배우고 존중하는 것이 중요합니다. 전통적 가치와 현대적 사고를 조화롭게 결합하여 더 나은 미래를 만들어가세요.'
            },
            'MA6': {
                name: '타지마할',
                location: '인도 아그라',
                period: '1632~1653년',
                tarotMeaning: '연인 카드는 사랑과 선택, 조화를 상징합니다. 타지마할은 무굴 황제 샤 자한이 사랑하는 아내를 위해 건설한 영원한 사랑의 상징입니다.',
                tarotKeywords: ['사랑', '선택', '조화', '헌신', '아름다움'],
                history: '타지마할은 무굴 황제 샤 자한이 세상을 떠난 아내 뭄타즈 마할을 기리기 위해 건설한 영묘입니다. 22년에 걸쳐 건설된 이 건물은 이슬람, 페르시아, 인도 건축 양식이 완벽하게 조화를 이룬 걸작입니다.',
                culturalSignificance: '영원한 사랑의 상징',
                connection: '연인 카드의 영원한 사랑과 선택처럼, 타지마할은 사랑하는 이를 위한 황제의 숭고한 선택이 만들어낸 아름다움입니다. 두 상징 모두 진정한 사랑의 힘과 아름다움을 보여줍니다.',
                modernMessage: '진정한 사랑은 시간이 지나도 변하지 않는 아름다움을 창조합니다. 사랑하는 이들을 위해 어떤 아름다운 것을 남길 수 있을지 생각해보세요.'
            },
            'MA7': {
                name: '콜로세움',
                location: '이탈리아 로마',
                period: '72~80년',
                tarotMeaning: '전차 카드는 의지력과 승리, 전진하는 힘을 상징합니다. 콜로세움은 로마 제국의 힘과 영광, 그리고 승부욕을 보여주는 거대한 경기장이었습니다.',
                tarotKeywords: ['승리', '의지력', '전진', '경쟁', '영광'],
                history: '콜로세움은 로마 제국 시대에 건설된 거대한 원형 경기장으로, 최대 5만 명의 관중을 수용할 수 있었습니다. 검투사들의 경기와 맹수 사냥, 모의 해전 등 다양한 공연이 펼쳐졌습니다.',
                culturalSignificance: '로마 제국의 힘과 오락 문화의 상징',
                connection: '전차의 승리를 향한 질주처럼, 콜로세움에서는 생사를 건 경쟁과 승부가 펼쳐졌습니다. 두 상징 모두 목표를 향한 강인한 의지와 승리에 대한 열망을 나타냅니다.',
                modernMessage: '인생의 경기장에서 당신은 주인공입니다. 어떤 어려움이 있더라도 의지력을 잃지 말고 승리를 향해 전진하세요. 진정한 승리는 자신과의 싸움에서 이기는 것입니다.'
            },
            'MA8': {
                name: '앙코르 와트',
                location: '캄보디아',
                period: '12세기 초',
                tarotMeaning: '힘 카드는 내면의 힘과 용기, 자비로운 통제를 상징합니다. 앙코르 와트는 크메르 제국의 정신적 힘과 종교적 헌신을 보여주는 거대한 사원입니다.',
                tarotKeywords: ['내면의 힘', '용기', '자비', '영성', '인내'],
                history: '앙코르 와트는 12세기 초 수리야바르만 7세에 의해 건설된 힌두교 사원으로, 나중에 불교 사원으로 개조되었습니다. 세계에서 가장 큰 종교 건축물이며, 우주를 상징하는 구조로 설계되었습니다.',
                culturalSignificance: '크메르 제국의 종교적 중심지',
                connection: '힘 카드의 여인이 사자를 부드럽게 다루듯, 앙코르 와트는 거대한 자연을 정복하지 않고 조화롭게 어우러지게 만든 인간의 내면적 힘을 보여줍니다.',
                modernMessage: '진정한 힘은 강압이 아닌 자비와 이해에서 나옵니다. 내면의 고요함과 영적 힘을 기르며, 세상과 조화롭게 살아가는 지혜를 발견하세요.'
            },
            'MA9': {
                name: '마추픽추',
                location: '페루',
                period: '15세기',
                tarotMeaning: '은둔자는 내면의 성찰과 지혜 추구를 상징합니다. 마추픽추는 구름 위의 고요한 성소로서, 영적 고립과 명상의 완벽한 장소였습니다.',
                tarotKeywords: ['성찰', '고독', '지혜', '영적 여행', '내면 탐구'],
                history: '마추픽추는 15세기 잉카 제국이 안데스 산맥 해발 2,430m 높이에 건설한 도시입니다. 스페인 정복자들에게 발견되지 않아 온전히 보존되었으며, "잃어버린 도시"라고 불립니다.',
                culturalSignificance: '잉카 문명의 신성한 도시',
                connection: '은둔자가 높은 산에서 혼자 진리를 찾듯, 마추픽추는 세상과 단절된 고공에서 잉카인들이 신들과 소통했던 영적 공간입니다. 두 상징 모두 고독한 성찰을 통한 깨달음을 추구합니다.',
                modernMessage: '때로는 번잡한 일상에서 벗어나 홀로 자신을 돌아보는 시간이 필요합니다. 내면의 목소리에 귀 기울이며 진정한 자아를 발견하는 여정을 시작하세요.'
            },
            'MA10': {
                name: '페트라',
                location: '요단',
                period: '기원전 4세기~기원후 2세기',
                tarotMeaning: '운명의 바퀴는 변화와 순환, 운명의 흐름을 상징합니다. 페트라는 교역로의 중심지로서 흥망성쇠를 거듭하며 운명의 변화를 체험한 도시입니다.',
                tarotKeywords: ['변화', '순환', '운명', '흥망성쇠', '기회'],
                history: '페트라는 나바테아인들이 바위를 깎아 만든 도시로, 향료 무역로의 중심지로 번영했습니다. 로마 제국에 흡수된 후 점차 쇠퇴했지만, 현재는 세계문화유산으로 인정받아 새로운 생명을 얻었습니다.',
                culturalSignificance: '고대 교역 문명의 중심지',
                connection: '운명의 바퀴가 계속 돌아가듯, 페트라는 번영과 쇠퇴를 반복하며 역사의 수레바퀴를 경험했습니다. 두 상징 모두 변화를 받아들이고 새로운 기회를 포착하는 지혜를 가르칩니다.',
                modernMessage: '인생의 굴곡은 자연스러운 것입니다. 어려운 시기에도 희망을 잃지 말고, 변화를 기회로 받아들이는 유연함을 기르세요. 모든 것은 순환하며, 새로운 시작이 기다리고 있습니다.'
            },
            'MA11': {
                name: '파르테논 신전',
                location: '그리스 아테네',
                period: '기원전 447~432년',
                tarotMeaning: '정의는 균형과 공정함, 진리를 상징합니다. 파르테논 신전은 아테네 민주주의의 이상과 정의로운 사회에 대한 열망을 구현한 건축물입니다.',
                tarotKeywords: ['정의', '균형', '진리', '공정', '민주주의'],
                history: '파르테논 신전은 아테네의 수호신 아테나를 기리기 위해 건설된 도리아식 신전입니다. 황금비율을 적용한 완벽한 비례와 균형을 보여주며, 고대 그리스 건축의 걸작으로 여겨집니다.',
                culturalSignificance: '고대 민주주의와 이성의 상징',
                connection: '정의 카드의 저울처럼, 파르테논 신전의 완벽한 균형과 비례는 조화로운 사회의 이상을 건축으로 표현한 것입니다. 두 상징 모두 공정함과 균형의 중요성을 강조합니다.',
                modernMessage: '진정한 정의는 완벽한 균형에서 나옵니다. 개인의 이익과 공동체의 선, 감정과 이성, 전통과 혁신 사이의 균형을 찾아 공정한 삶을 살아가세요.'
            },
            'MA12': {
                name: '치첸 이트사',
                location: '멕시코 유카탄',
                period: '6~13세기',
                tarotMeaning: '매달린 사람은 희생과 새로운 관점, 깨달음을 상징합니다. 치첸 이트사의 피라미드는 마야인들이 신에게 제물을 바치며 우주의 진리를 탐구했던 성소입니다.',
                tarotKeywords: ['희생', '새로운 관점', '깨달음', '기다림', '변화'],
                history: '치첸 이트사는 마야 문명의 중요한 도시로, 쿠쿨칸 피라미드는 마야인들의 천문학 지식이 집약된 건축물입니다. 춘분과 추분에는 피라미드에 뱀 모양의 그림자가 나타나는 신비로운 현상이 일어납니다.',
                culturalSignificance: '마야 문명의 천문학적 중심지',
                connection: '매달린 사람이 거꾸로 매달려 새로운 시각을 얻듯, 마야인들은 하늘을 관찰하며 시간과 우주에 대한 독특한 관점을 발전시켰습니다. 희생을 통해 더 큰 지혜를 얻는다는 공통점이 있습니다.',
                modernMessage: '때로는 기존의 관점을 버리고 전혀 다른 시각에서 문제를 바라봐야 합니다. 단기적 손실을 감수하더라도 장기적 성장을 위한 투자를 두려워하지 마세요.'
            },
            'MA13': {
                name: '보로부두르',
                location: '인도네시아 자바',
                period: '8~9세기',
                tarotMeaning: '죽음은 끝과 새로운 시작, 변화를 상징합니다. 보로부두르는 불교의 생사윤회 사상을 건축으로 표현한 거대한 만다라입니다.',
                tarotKeywords: ['변화', '재탄생', '해탈', '순환', '깨달음'],
                history: '보로부두르는 8-9세기에 건설된 대승불교 사원으로, 부처의 생애와 깨달음의 과정을 3차원적으로 표현한 독특한 구조를 가지고 있습니다. 총 2,672개의 부조와 504개의 불상이 있습니다.',
                culturalSignificance: '불교 우주관의 건축적 구현',
                connection: '죽음 카드의 변화와 재탄생처럼, 보로부두르는 생사의 순환과 궁극적 해탈을 상징하는 영적 여정의 장소입니다. 두 상징 모두 끝이 곧 새로운 시작임을 가르칩니다.',
                modernMessage: '인생의 끝은 새로운 시작의 문입니다. 과거에 얽매이지 말고 변화를 받아들이며, 더 높은 차원의 자아로 성장해 나가세요. 모든 경험은 깨달음으로 이어집니다.'
            }
            // 나머지 카드들 (MA14~MA21)은 다음 업데이트에서 추가
        };
    }

    handleNewStoryClick(button) {
        // 버튼 로딩 상태
        button.classList.add('loading');
        button.innerHTML = `
            <span class="btn-icon">⏳</span>
            새로운 이야기 준비 중...
        `;

        setTimeout(() => {
            const majorArcana = this.getMajorArcanaCards();
            const randomIndex = Math.floor(Math.random() * majorArcana.length);
            this.selectedCard = majorArcana[randomIndex];
            
            this.generateStoryWithLoading(this.selectedCard);
            
            // 버튼 상태 복원
            button.classList.remove('loading');
            button.innerHTML = `
                <span class="btn-icon">🎲</span>
                새로운 이야기 듣기
            `;
        }, 500); // 0.5초로 단축
    }

    shareStory() {
        if (!this.selectedCard) return;
        
        const heritage = this.heritageData[this.selectedCard.id];
        const shareText = `🏛️ ${this.selectedCard.name}과 ${heritage.name}의 신비로운 이야기를 발견했습니다! 
        
${heritage.modernMessage}

#타로 #세계문화유산 #역사이야기`;

        if (navigator.share) {
            navigator.share({
                title: '타로와 역사 이야기',
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('이야기가 클립보드에 복사되었습니다!');
            });
        }
    }
}

// 시스템 초기화
document.addEventListener('DOMContentLoaded', function() {
    window.tarotHistoryStory = new TarotHistoryStory();
});