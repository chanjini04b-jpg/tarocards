class ChakraTarot {
    constructor() {
        this.selectedMethod = null;
        this.selectedChakra = null;
        this.tarotCards = [];
        this.chakraData = {
            root: {
                name: '뿌리 차크라 (물라다라)',
                color: '#ff4444',
                location: '꼬리뼈',
                element: '땅',
                aspects: ['생존본능', '안정감', '물질적 기반', '안전감', '실용성'],
                balanced: '안정적이고 현실적이며 물질적 기반이 탄탄합니다.',
                overactive: '물질에 지나치게 집착하고 고집이 셀 수 있습니다.',
                underactive: '불안감을 느끼고 현실적 기반이 불안정합니다.',
                blocked: '생존에 대한 두려움과 극도의 불안감을 느낍니다.'
            },
            sacral: {
                name: '천골 차크라 (스바디스타나)',
                color: '#ff8800',
                location: '하복부',
                element: '물',
                aspects: ['창조성', '성적 에너지', '감정', '관계', '즐거움'],
                balanced: '창의적이고 감정적으로 균형잡혀 있으며 건강한 관계를 맺습니다.',
                overactive: '감정 기복이 심하고 성적 욕구가 과도할 수 있습니다.',
                underactive: '창의성이 부족하고 감정 표현이 어렵습니다.',
                blocked: '관계에서 어려움을 겪고 창조적 에너지가 막혀있습니다.'
            },
            solar: {
                name: '태양신경총 차크라 (마니푸라)',
                color: '#ffdd00',
                location: '상복부',
                element: '불',
                aspects: ['개인적 힘', '자신감', '의지력', '자아정체성', '리더십'],
                balanced: '자신감 있고 목표 지향적이며 건강한 자아를 가지고 있습니다.',
                overactive: '과도하게 통제하려 하고 공격적일 수 있습니다.',
                underactive: '자신감이 부족하고 의지력이 약합니다.',
                blocked: '자아 정체성의 혼란과 무력감을 느낍니다.'
            },
            heart: {
                name: '심장 차크라 (아나하타)',
                color: '#4caf50',
                location: '가슴 중앙',
                element: '공기',
                aspects: ['사랑', '연민', '관계', '치유', '용서'],
                balanced: '사랑이 넘치고 타인과 건강한 관계를 맺으며 치유력이 있습니다.',
                overactive: '타인을 위해 자신을 과도하게 희생할 수 있습니다.',
                underactive: '사랑 표현이 어렵고 관계에서 거리감을 느낍니다.',
                blocked: '과거의 상처로 인해 마음을 닫고 사랑을 두려워합니다.'
            },
            throat: {
                name: '목 차크라 (비슈다)',
                color: '#2196f3',
                location: '목',
                element: '공간',
                aspects: ['소통', '표현', '진실', '창의성', '청취'],
                balanced: '진실하게 소통하고 자신을 명확하게 표현합니다.',
                overactive: '말이 너무 많고 타인의 말을 듣지 않을 수 있습니다.',
                underactive: '의사소통이 어렵고 자신을 표현하기 힘듭니다.',
                blocked: '진실을 말하는 것을 두려워하고 소통에 큰 어려움을 겪습니다.'
            },
            'third-eye': {
                name: '제3의 눈 차크라 (아즈나)',
                color: '#673ab7',
                location: '이마 중앙',
                element: '빛',
                aspects: ['직감', '통찰력', '영적 시야', '지혜', '명상'],
                balanced: '직감이 뛰어나고 명확한 통찰력을 가지고 있습니다.',
                overactive: '현실과 환상을 구분하지 못하고 과도한 상상에 빠질 수 있습니다.',
                underactive: '직감이 부족하고 큰 그림을 보지 못합니다.',
                blocked: '영적 통찰력이 차단되고 삶의 방향을 잃었습니다.'
            },
            crown: {
                name: '정수리 차크라 (사하스라라)',
                color: '#9c27b0',
                location: '정수리',
                element: '생각',
                aspects: ['영성', '깨달음', '우주적 의식', '신성함', '초월'],
                balanced: '영적으로 깨어있고 우주와의 연결감을 느낍니다.',
                overactive: '현실에서 벗어나 과도한 영적 추구에 빠질 수 있습니다.',
                underactive: '영적 연결감이 부족하고 물질적인 것에만 관심이 있습니다.',
                blocked: '영적 성장이 정체되고 삶의 더 큰 의미를 찾지 못합니다.'
            }
        };
        
        this.recommendations = {
            healing: {
                icon: '🌿',
                title: '치유 및 명상',
                methods: [
                    '매일 10분간 차크라 명상하기',
                    '해당 차크라 색상의 크리스탈 활용',
                    '아로마테라피로 에너지 정화',
                    '요가나 스트레칭으로 에너지 순환',
                    '자연 속에서 시간 보내기'
                ]
            },
            meditation: {
                icon: '🧘‍♀️',
                title: '에너지 균형',
                methods: [
                    '차크라별 만트라 암송',
                    '색상 시각화 명상',
                    '호흡법으로 에너지 조절',
                    '차크라 음악으로 진동 조화',
                    '에너지 청소 의식 실행'
                ]
            },
            lifestyle: {
                icon: '🌱',
                title: '생활 습관',
                methods: [
                    '균형잡힌 식단으로 에너지 공급',
                    '충분한 수면으로 회복',
                    '규칙적인 운동으로 순환 개선',
                    '부정적 환경과 관계 정리',
                    '긍정적 확언과 자기 사랑'
                ]
            },
            energy: {
                icon: '⚡',
                title: '에너지 활성화',
                methods: [
                    '해당 차크라 위치에 손 올리고 집중',
                    '차크라 색상 옷이나 액세서리 착용',
                    '에너지 히오와 레이키 활용',
                    '음성 진동(챈팅)으로 활성화',
                    '창조적 활동으로 에너지 표현'
                ]
            }
        };

        this.init();
    }

    async init() {
        await this.loadTarotCards();
        this.setupEventListeners();
    }

    async loadTarotCards() {
        try {
            const response = await fetch('./tarot_cards.json');
            this.tarotCards = await response.json();
        } catch (error) {
            console.error('타로 카드 데이터 로딩 실패:', error);
            // 기본 카드 데이터 설정
            this.tarotCards = this.getDefaultCards();
        }
    }

    getDefaultCards() {
        return [
            { id: 0, name: "The Fool", korean: "바보", image: "image2/00-TheFool.jpg" },
            { id: 1, name: "The Magician", korean: "마법사", image: "image2/01-TheMagician.jpg" },
            { id: 2, name: "The High Priestess", korean: "여교황", image: "image2/02-TheHighPriestess.jpg" },
            { id: 3, name: "The Empress", korean: "여황제", image: "image2/03-TheEmpress.jpg" },
            { id: 4, name: "The Emperor", korean: "황제", image: "image2/04-TheEmperor.jpg" },
            { id: 5, name: "The Hierophant", korean: "교황", image: "image2/05-TheHierophant.jpg" },
            { id: 6, name: "The Lovers", korean: "연인", image: "image2/06-TheLovers.jpg" },
            { id: 7, name: "The Chariot", korean: "전차", image: "image2/07-TheChariot.jpg" },
            { id: 8, name: "Strength", korean: "힘", image: "image2/08-Strength.jpg" },
            { id: 9, name: "The Hermit", korean: "은둔자", image: "image2/09-TheHermit.jpg" },
            { id: 10, name: "Wheel of Fortune", korean: "운명의 수레바퀴", image: "image2/10-WheelOfFortune.jpg" },
            { id: 11, name: "Justice", korean: "정의", image: "image2/11-Justice.jpg" },
            { id: 12, name: "The Hanged Man", korean: "매달린 사람", image: "image2/12-TheHangedMan.jpg" },
            { id: 13, name: "Death", korean: "죽음", image: "image2/13-Death.jpg" },
            { id: 14, name: "Temperance", korean: "절제", image: "image2/14-Temperance.jpg" },
            { id: 15, name: "The Devil", korean: "악마", image: "image2/15-TheDevil.jpg" },
            { id: 16, name: "The Tower", korean: "탑", image: "image2/16-TheTower.jpg" },
            { id: 17, name: "The Star", korean: "별", image: "image2/17-TheStar.jpg" },
            { id: 18, name: "The Moon", korean: "달", image: "image2/18-TheMoon.jpg" },
            { id: 19, name: "The Sun", korean: "태양", image: "image2/19-TheSun.jpg" },
            { id: 20, name: "Judgement", korean: "심판", image: "image2/20-Judgement.jpg" },
            { id: 21, name: "The World", korean: "세계", image: "image2/21-TheWorld.jpg" }
        ];
    }

    setupEventListeners() {
        // Method selection
        document.querySelectorAll('.method-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectMethod(card.dataset.method);
            });
        });

        // Specific chakra selection
        document.querySelectorAll('.chakra-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectChakra(item.dataset.chakra);
            });
        });

        // Analysis button
        const analyzeButton = document.getElementById('startChakraAnalysis');
        if (analyzeButton) {
            analyzeButton.addEventListener('click', (e) => {
                this.startAnalysis();
            });
        }

        // Action buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'saveChakraAnalysis') {
                this.saveAnalysis();
            } else if (e.target.id === 'shareChakraResults') {
                this.shareResults();
            } else if (e.target.id === 'newChakraAnalysis') {
                this.resetAnalysis();
            }
        });
    }

    selectMethod(method) {
        this.selectedMethod = method;
        
        // Update UI
        document.querySelectorAll('.method-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-method="${method}"]`).classList.add('selected');

        // Show/hide specific chakra selection
        const specificSelection = document.getElementById('specificChakraSelection');
        if (method === 'specific') {
            specificSelection.style.display = 'block';
            specificSelection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            specificSelection.style.display = 'none';
            this.selectedChakra = null;
            document.querySelectorAll('.chakra-item').forEach(item => {
                item.classList.remove('selected');
            });
        }

        this.updateAnalysisButton();
    }

    selectChakra(chakra) {
        this.selectedChakra = chakra;
        
        // Update UI
        document.querySelectorAll('.chakra-item').forEach(item => {
            item.classList.remove('selected');
        });
        document.querySelector(`[data-chakra="${chakra}"]`).classList.add('selected');

        this.updateAnalysisButton();
    }

    updateAnalysisButton() {
        const button = document.getElementById('startChakraAnalysis');
        const buttonText = document.getElementById('analysisButtonText');
        
        if (!this.selectedMethod) {
            button.disabled = true;
            buttonText.textContent = '방법을 선택해주세요';
        } else if (this.selectedMethod === 'specific' && !this.selectedChakra) {
            button.disabled = true;
            buttonText.textContent = '차크라를 선택해주세요';
        } else {
            button.disabled = false;
            const methodTexts = {
                'all': '전체 차크라 스캔 시작',
                'specific': '선택한 차크라 분석 시작',
                'imbalance': '불균형 차크라 찾기 시작'
            };
            buttonText.textContent = methodTexts[this.selectedMethod];
        }
    }

    async startAnalysis() {
        const button = document.getElementById('startChakraAnalysis');
        const originalText = document.getElementById('analysisButtonText').textContent;
        
        // 버튼 비활성화 및 로딩 표시
        button.disabled = true;
        document.getElementById('analysisButtonText').textContent = '분석중...';
        
        // 카드 섞기 애니메이션 시뮬레이션
        await this.playShuffleAnimation();
        
        // 방법에 따른 분석 실행
        let results;
        switch (this.selectedMethod) {
            case 'all':
                results = this.analyzeAllChakras();
                break;
            case 'specific':
                results = this.analyzeSpecificChakra(this.selectedChakra);
                break;
            case 'imbalance':
                results = this.findImbalancedChakra();
                break;
        }

        // 결과 표시
        this.displayResults(results);
        
        // 버튼 복원
        button.disabled = false;
        document.getElementById('analysisButtonText').textContent = originalText;
    }

    async playShuffleAnimation() {
        return new Promise(resolve => {
            const button = document.getElementById('startChakraAnalysis');
            let count = 0;
            const interval = setInterval(() => {
                count++;
                document.getElementById('analysisButtonText').textContent = `분석중${'.'.repeat(count % 4)}`;
                if (count >= 8) {
                    clearInterval(interval);
                    resolve();
                }
            }, 300);
        });
    }

    analyzeAllChakras() {
        const chakraOrder = ['root', 'sacral', 'solar', 'heart', 'throat', 'third-eye', 'crown'];
        const results = {
            type: 'all',
            date: new Date().toLocaleDateString('ko-KR'),
            chakras: {},
            overallBalance: this.calculateOverallBalance()
        };

        chakraOrder.forEach(chakraKey => {
            const card = this.drawRandomCard();
            const status = this.determineChakraStatus(card);
            const interpretation = this.generateChakraInterpretation(chakraKey, card, status);
            
            results.chakras[chakraKey] = {
                name: this.chakraData[chakraKey].name,
                color: this.chakraData[chakraKey].color,
                card: card,
                status: status,
                interpretation: interpretation
            };
        });

        return results;
    }

    analyzeSpecificChakra(chakraKey) {
        const card = this.drawRandomCard();
        const status = this.determineChakraStatus(card);
        const interpretation = this.generateDetailedInterpretation(chakraKey, card, status);
        
        return {
            type: 'specific',
            date: new Date().toLocaleDateString('ko-KR'),
            chakra: chakraKey,
            name: this.chakraData[chakraKey].name,
            color: this.chakraData[chakraKey].color,
            card: card,
            status: status,
            interpretation: interpretation
        };
    }

    findImbalancedChakra() {
        // 직감적으로 가장 주의가 필요한 차크라 선택
        const chakraKeys = Object.keys(this.chakraData);
        const selectedChakra = chakraKeys[Math.floor(Math.random() * chakraKeys.length)];
        
        const card = this.drawRandomCard();
        const status = 'blocked'; // 불균형 찾기에서는 주로 문제 있는 상태
        const interpretation = this.generateImbalanceInterpretation(selectedChakra, card);
        
        return {
            type: 'imbalance',
            date: new Date().toLocaleDateString('ko-KR'),
            chakra: selectedChakra,
            name: this.chakraData[selectedChakra].name,
            color: this.chakraData[selectedChakra].color,
            card: card,
            status: status,
            interpretation: interpretation
        };
    }

    drawRandomCard() {
        return this.tarotCards[Math.floor(Math.random() * this.tarotCards.length)];
    }

    determineChakraStatus(card) {
        const cardNumber = card.id;
        
        // 카드 번호에 따른 상태 결정 (메이저 아르카나 기준)
        if (cardNumber === 0 || cardNumber === 6 || cardNumber === 14 || cardNumber === 17 || cardNumber === 19 || cardNumber === 21) {
            return 'balanced'; // 긍정적 카드들
        } else if (cardNumber === 5 || cardNumber === 9 || cardNumber === 12 || cardNumber === 18 || cardNumber === 20) {
            return 'underactive'; // 내성적/수동적 에너지
        } else if (cardNumber === 1 || cardNumber === 4 || cardNumber === 7 || cardNumber === 8 || cardNumber === 11) {
            return 'overactive'; // 강한/활동적 에너지
        } else {
            return 'blocked'; // 도전적 카드들
        }
    }

    calculateOverallBalance() {
        const balanceTypes = ['균형잡힘', '과활성', '저활성', '막힘'];
        const selectedBalance = balanceTypes[Math.floor(Math.random() * balanceTypes.length)];
        
        const balanceInfo = {
            '균형잡힘': { icon: '⚖️', description: '전반적으로 안정적인 에너지 흐름' },
            '과활성': { icon: '🔥', description: '일부 차크라의 과도한 활성화' },
            '저활성': { icon: '💧', description: '전체적으로 에너지가 부족한 상태' },
            '막힘': { icon: '🚫', description: '에너지 흐름에 중요한 방해 요소 존재' }
        };
        
        return {
            type: selectedBalance,
            ...balanceInfo[selectedBalance]
        };
    }

    generateChakraInterpretation(chakraKey, card, status) {
        const chakra = this.chakraData[chakraKey];
        const baseMessage = chakra[status];
        
        return `${card.korean} 카드가 나타내는 ${chakra.name}의 상태: ${baseMessage} 현재 이 차크라와 관련된 ${chakra.aspects.join(', ')} 영역에서 ${this.getStatusMessage(status)}`;
    }

    generateDetailedInterpretation(chakraKey, card, status) {
        const chakra = this.chakraData[chakraKey];
        const baseMessage = chakra[status];
        
        return `${card.korean} 카드가 ${chakra.name}에 나타났습니다. ${baseMessage} 

이 차크라는 ${chakra.location}에 위치하며 ${chakra.element} 원소와 연결되어 있습니다. 
주요 영향 영역: ${chakra.aspects.join(', ')}

현재 상태를 개선하기 위해서는 ${this.getDetailedAdvice(chakraKey, status)}를 권장합니다.`;
    }

    generateImbalanceInterpretation(chakraKey, card) {
        const chakra = this.chakraData[chakraKey];
        
        return `현재 가장 주의가 필요한 차크라는 ${chakra.name}입니다. ${card.korean} 카드가 이 부분의 불균형을 보여주고 있습니다. 

${chakra.blocked}

특히 ${chakra.aspects.join(', ')} 영역에서 어려움을 겪고 있을 수 있습니다. 이 차크라의 균형을 회복하기 위한 집중적인 관리가 필요합니다.`;
    }

    getStatusMessage(status) {
        const messages = {
            'balanced': '조화로운 에너지를 보이고 있습니다',
            'overactive': '과도한 활성화로 인한 불균형이 있습니다',
            'underactive': '에너지 부족으로 인한 약화가 있습니다',
            'blocked': '에너지 흐름의 막힘과 정체가 있습니다'
        };
        return messages[status];
    }

    getDetailedAdvice(chakraKey, status) {
        const advice = {
            'root': {
                'balanced': '현재 상태를 유지하며 안정감을 더욱 강화하세요',
                'overactive': '물질적 집착을 줄이고 정신적 성장에 집중하세요',
                'underactive': '운동과 건강한 식단으로 체력을 기르세요',
                'blocked': '안전한 환경을 조성하고 기본적 욕구를 충족시키세요'
            },
            'sacral': {
                'balanced': '창의적 활동을 계속하며 감정 표현을 자유롭게 하세요',
                'overactive': '감정을 조절하고 절제력을 기르세요',
                'underactive': '새로운 취미나 창작 활동을 시작해보세요',
                'blocked': '과거의 감정적 트라우마를 치유하고 자유로워지세요'
            },
            'solar': {
                'balanced': '자신감을 바탕으로 목표를 추진해나가세요',
                'overactive': '겸손함을 기르고 타인의 의견도 존중하세요',
                'underactive': '작은 성공 경험을 쌓아 자신감을 기르세요',
                'blocked': '자아 정체성을 재정립하고 개인적 힘을 되찾으세요'
            },
            'heart': {
                'balanced': '사랑과 연민의 에너지를 계속 나누어주세요',
                'overactive': '자기 자신도 사랑하고 경계를 설정하세요',
                'underactive': '자기 사랑부터 시작하여 마음을 열어가세요',
                'blocked': '용서의 힘으로 과거의 상처를 치유하세요'
            },
            'throat': {
                'balanced': '진실한 소통을 계속하며 창의적 표현을 확장하세요',
                'overactive': '더 많이 듣고 신중하게 말하는 연습을 하세요',
                'underactive': '목소리를 내는 연습을 하고 자신의 의견을 표현하세요',
                'blocked': '진실을 말할 용기를 가지고 소통의 두려움을 극복하세요'
            },
            'third-eye': {
                'balanced': '직감을 신뢰하며 명상을 통해 통찰력을 기르세요',
                'overactive': '현실적 관점을 유지하고 환상과 현실을 구분하세요',
                'underactive': '명상과 성찰을 통해 내면의 지혜를 개발하세요',
                'blocked': '마음을 열고 새로운 관점을 받아들이세요'
            },
            'crown': {
                'balanced': '영적 연결감을 유지하며 지혜를 나누어주세요',
                'overactive': '현실적 책임도 소홀히 하지 마세요',
                'underactive': '영적 수행을 통해 더 큰 의미를 찾아보세요',
                'blocked': '마음을 열고 우주적 에너지에 연결하세요'
            }
        };
        
        return advice[chakraKey]?.[status] || '균형 회복을 위한 지속적인 관심과 노력이 필요합니다';
    }

    displayResults(results) {
        const resultsSection = document.getElementById('chakraResults');
        const dateElement = document.getElementById('analysisDate');
        
        // 날짜 설정
        dateElement.textContent = `분석 날짜: ${results.date}`;
        
        if (results.type === 'all') {
            this.displayAllChakrasResults(results);
        } else {
            this.displaySingleChakraResult(results);
        }
        
        // 추천사항 표시
        this.displayRecommendations(results);
        
        // 결과 섹션 표시 및 스크롤
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    displayAllChakrasResults(results) {
        const allResults = document.getElementById('allChakrasResults');
        const singleResult = document.getElementById('singleChakraResult');
        const overallBalance = document.getElementById('overallBalance');
        const chakraCards = document.getElementById('chakraCards');
        
        // 단일 결과 숨기고 전체 결과 표시
        singleResult.style.display = 'none';
        allResults.style.display = 'block';
        
        // 전체 균형 상태 표시
        overallBalance.innerHTML = `
            <div class="balance-indicator">
                <span class="balance-icon">${results.overallBalance.icon}</span>
                <span class="balance-text">${results.overallBalance.type}</span>
            </div>
            <p style="color: rgba(255, 255, 255, 0.8); margin-top: 10px;">${results.overallBalance.description}</p>
        `;
        
        // 개별 차크라 카드들 표시
        chakraCards.innerHTML = '';
        Object.entries(results.chakras).forEach(([chakraKey, chakraResult]) => {
            const cardElement = this.createChakraResultCard(chakraKey, chakraResult);
            chakraCards.appendChild(cardElement);
        });
    }

    displaySingleChakraResult(results) {
        const allResults = document.getElementById('allChakrasResults');
        const singleResult = document.getElementById('singleChakraResult');
        const singleChakraCard = document.getElementById('singleChakraCard');
        
        // 전체 결과 숨기고 단일 결과 표시
        allResults.style.display = 'none';
        singleResult.style.display = 'block';
        
        // Get chakra symbol image and chakra class
        const chakraImage = this.getChakraSymbolImage(results.chakra);
        const chakraClass = `${results.chakra}-chakra`;
        
        // 단일 차크라 카드 생성
        singleChakraCard.innerHTML = `
            <div class="large-tarot-card" style="background-image: url('${results.card.image}');">
                <div class="card-name">${results.card.korean}</div>
            </div>
            <div class="large-card-info">
                <h4>${results.name}</h4>
                <div class="large-energy-status">
                    <span class="large-status-indicator status-${results.status}"></span>
                    <span class="status-text">${this.getStatusText(results.status)}</span>
                </div>
                <div class="large-interpretation">${results.interpretation}</div>
            </div>
        `;
        
        // Add chakra-specific background
        singleChakraCard.className = `chakra-card-large ${chakraClass}`;
    }

    createChakraResultCard(chakraKey, chakraResult) {
        const card = document.createElement('div');
        card.className = 'chakra-result-card';
        
        // Get chakra symbol image
        const chakraImage = this.getChakraSymbolImage(chakraKey);
        
        card.innerHTML = `
            <div class="chakra-header">
                <div class="chakra-icon with-image" style="background-image: url('${chakraImage}'); background-color: ${chakraResult.color};">
                </div>
                <div class="chakra-name">${chakraResult.name}</div>
            </div>
            <div class="tarot-card-mini" style="background-image: url('${chakraResult.card.image}');">
                <div class="card-name">${chakraResult.card.korean}</div>
            </div>
            <div class="energy-status">
                <span class="status-indicator status-${chakraResult.status}"></span>
                <span class="status-text">${this.getStatusText(chakraResult.status)}</span>
            </div>
            <div class="chakra-interpretation">${chakraResult.interpretation}</div>
        `;
        
        return card;
    }

    getChakraSymbolImage(chakraKey) {
        const imageMap = {
            'root': 'images/chakras/symbols/root-chakra.svg',
            'sacral': 'images/chakras/symbols/sacral-chakra.svg',
            'solar': 'images/chakras/symbols/solar-chakra.svg',
            'heart': 'images/chakras/symbols/heart-chakra.svg',
            'throat': 'images/chakras/symbols/throat-chakra.svg',
            'third-eye': 'images/chakras/symbols/third-eye-chakra.svg',
            'crown': 'images/chakras/symbols/crown-chakra.svg'
        };
        return imageMap[chakraKey] || '';
    }

    getChakraEmoji(chakraKey) {
        const emojis = {
            'root': '🔴',
            'sacral': '🟠',
            'solar': '🟡',
            'heart': '🟢',
            'throat': '🔵',
            'third-eye': '🟣',
            'crown': '🟪'
        };
        return emojis[chakraKey] || '⚫';
    }

    getStatusText(status) {
        const statusTexts = {
            'balanced': '균형잡힘',
            'overactive': '과활성',
            'underactive': '저활성',
            'blocked': '막힘'
        };
        return statusTexts[status] || '알 수 없음';
    }

    displayRecommendations(results) {
        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = '';
        
        // 각 추천 카테고리별로 항목 생성
        Object.entries(this.recommendations).forEach(([key, category]) => {
            const recommendationElement = document.createElement('div');
            recommendationElement.className = `recommendation-item recommendation-${key}`;
            
            const randomMethods = this.getRandomMethods(category.methods, 3);
            
            recommendationElement.innerHTML = `
                <div class="recommendation-title">
                    <span>${category.icon}</span>
                    ${category.title}
                </div>
                <div class="recommendation-content">
                    <ul>
                        ${randomMethods.map(method => `<li>${method}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            recommendationsList.appendChild(recommendationElement);
        });
    }

    getRandomMethods(methods, count) {
        const shuffled = [...methods].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    saveAnalysis() {
        const results = this.getCurrentResults();
        const dataStr = JSON.stringify(results, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `chakra-analysis-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('분석 결과가 저장되었습니다!', 'success');
    }

    shareResults() {
        const results = this.getCurrentResults();
        const shareText = `차크라 타로 분석 결과 (${results.date})\n\n${this.generateShareText(results)}`;
        
        if (navigator.share) {
            navigator.share({
                title: '차크라 타로 분석 결과',
                text: shareText
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('결과가 클립보드에 복사되었습니다!', 'info');
            });
        }
    }

    generateShareText(results) {
        if (results.type === 'all') {
            let shareText = `전체 차크라 상태: ${results.overallBalance.type}\n\n`;
            Object.entries(results.chakras).forEach(([key, chakra]) => {
                shareText += `${chakra.name}: ${chakra.card.korean} - ${this.getStatusText(chakra.status)}\n`;
            });
            return shareText;
        } else {
            return `${results.name}: ${results.card.korean} - ${this.getStatusText(results.status)}\n\n${results.interpretation}`;
        }
    }

    getCurrentResults() {
        // 현재 표시된 결과를 반환 (실제 구현에서는 결과를 저장해둬야 함)
        return {
            date: document.getElementById('analysisDate').textContent,
            method: this.selectedMethod,
            chakra: this.selectedChakra
        };
    }

    resetAnalysis() {
        // 초기 상태로 리셋
        this.selectedMethod = null;
        this.selectedChakra = null;
        
        document.querySelectorAll('.method-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        document.querySelectorAll('.chakra-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        document.getElementById('specificChakraSelection').style.display = 'none';
        document.getElementById('chakraResults').style.display = 'none';
        
        this.updateAnalysisButton();
        
        // 맨 위로 스크롤
        document.querySelector('.chakra-method-selection').scrollIntoView({ behavior: 'smooth' });
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            color: #333;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// 전역 초기화
let chakraTarot;

document.addEventListener('DOMContentLoaded', () => {
    chakraTarot = new ChakraTarot();
});