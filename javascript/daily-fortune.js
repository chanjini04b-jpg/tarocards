// 일일 운세 시스템
class DailyFortune {
    constructor() {
        this.todayCard = null;
        this.dailyMessages = this.createDailyMessages();
        this.init();
    }
    
    init() {
        this.updateDateDisplay();
        this.bindEvents();
        this.checkExistingCard();
    }
    
    // 오늘 날짜 표시
    updateDateDisplay() {
        const today = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        const dateString = today.toLocaleDateString('ko-KR', options);
        
        const dateElement = document.getElementById('todayDate');
        if (dateElement) {
            dateElement.textContent = dateString;
        }
    }
    
    // 이벤트 바인딩
    bindEvents() {
        const dailyCardBtn = document.getElementById('dailyCardBtn');
        if (dailyCardBtn) {
            dailyCardBtn.addEventListener('click', () => this.drawDailyCard());
        }
    }
    
    // 기존 카드 확인 (localStorage에서)
    checkExistingCard() {
        const today = this.getTodayString();
        const savedCard = localStorage.getItem(`daily_card_${today}`);
        
        if (savedCard) {
            try {
                const cardData = JSON.parse(savedCard);
                this.todayCard = cardData;
                this.displayDailyCard(cardData, false); // 이미 뽑힌 카드 표시
            } catch (error) {
                console.error('저장된 카드 데이터 파싱 오류:', error);
                localStorage.removeItem(`daily_card_${today}`);
            }
        }
    }
    
    // 오늘 날짜 문자열 생성 (YYYY-MM-DD 형식)
    getTodayString() {
        const today = new Date();
        return today.getFullYear() + '-' + 
               String(today.getMonth() + 1).padStart(2, '0') + '-' + 
               String(today.getDate()).padStart(2, '0');
    }
    
    // 날짜 기반 시드로 카드 선택 (매일 동일한 카드)
    getDailyCard() {
        const today = this.getTodayString();
        
        // 날짜를 숫자로 변환하여 시드 생성
        const seed = this.hashCode(today);
        
        // 시드 기반 랜덤 함수
        const seededRandom = this.seededRandom(seed);
        
        // 카드 시스템 가져오기 - 다양한 시스템 지원
        let cards = [];
        
        // 1. 윈도우에서 SimpleTarotSystem 찾기
        if (window.simpleTarotSystem && window.simpleTarotSystem.getAvailableCards) {
            console.log('Using simpleTarotSystem');
            cards = window.simpleTarotSystem.getAvailableCards();
        }
        // 2. 윈도우에서 tarotDeck 찾기
        else if (window.tarotDeck && window.tarotDeck.cards) {
            console.log('Using tarotDeck');
            cards = window.tarotDeck.cards;
        }
        // 3. 윈도우에서 historicalTarotDeck 찾기
        else if (window.historicalTarotDeck && window.historicalTarotDeck.cards) {
            console.log('Using historicalTarotDeck');
            cards = window.historicalTarotDeck.cards;
        }
        // 4. 전역 SimpleTarotSystem 클래스 사용
        else if (window.SimpleTarotSystem) {
            console.log('Creating new SimpleTarotSystem');
            const cardSystem = new window.SimpleTarotSystem();
            cards = cardSystem.getAvailableCards();
        }
        // 5. 백업 카드 시스템
        else {
            console.log('Using fallback cards');
            cards = this.getFallbackCards();
        }
        
        if (!cards || cards.length === 0) {
            console.error('카드 데이터가 없습니다');
            return null;
        }
        
        console.log(`Available cards: ${cards.length}`);
        
        // 시드 기반으로 카드 선택
        const cardIndex = Math.floor(seededRandom * cards.length);
        const selectedCard = { ...cards[cardIndex] };
        
        // 역방향 여부도 시드 기반으로 결정 (30% 확률)
        const reverseRandom = this.seededRandom(seed + 1);
        selectedCard.is_reversed = reverseRandom < 0.3;
        
        console.log(`Selected card: ${selectedCard.name || selectedCard.title} (reversed: ${selectedCard.is_reversed})`);
        
        return selectedCard;
    }
    
    // 백업 카드 시스템
    getFallbackCards() {
        return [
            { 
                name: 'The Fool', 
                meaning: '새로운 시작과 모험의 에너지가 가득한 시기입니다.',
                id: 'MA0',
                image_url: '00-TheFool.jpg'
            },
            { 
                name: 'The Magician', 
                meaning: '의지력과 실행력으로 목표를 달성할 수 있는 시기입니다.',
                id: 'MA1',
                image_url: '01-TheMagician.jpg'
            },
            { 
                name: 'The High Priestess', 
                meaning: '직감과 내면의 지혜를 따르는 것이 중요한 시기입니다.',
                id: 'MA2',
                image_url: '02-TheHighPriestess.jpg'
            },
            { 
                name: 'The Empress', 
                meaning: '풍요와 창조의 에너지가 가득한 시기입니다.',
                id: 'MA3',
                image_url: '03-TheEmpress.jpg'
            },
            { 
                name: 'The Emperor', 
                meaning: '권위와 안정성이 중요한 시기입니다.',
                id: 'MA4',
                image_url: '04-TheEmperor.jpg'
            },
            { 
                name: 'The Hierophant', 
                meaning: '전통적 지혜와 교육이 중요한 시기입니다.',
                id: 'MA5',
                image_url: '05-TheHierophant.jpg'
            },
            { 
                name: 'The Lovers', 
                meaning: '사랑과 관계에서 중요한 선택의 시기입니다.',
                id: 'MA6',
                image_url: '06-TheLovers.jpg'
            },
            { 
                name: 'The Chariot', 
                meaning: '의지력과 결단력으로 승리를 쟁취할 수 있는 시기입니다.',
                id: 'MA7',
                image_url: '07-TheChariot.jpg'
            },
            { 
                name: 'Strength', 
                meaning: '내면의 힘과 용기로 어려움을 극복하는 시기입니다.',
                id: 'MA8',
                image_url: '08-Strength.jpg'
            },
            { 
                name: 'The Hermit', 
                meaning: '내면 탐구와 영적 성장이 필요한 시기입니다.',
                id: 'MA9',
                image_url: '09-TheHermit.jpg'
            },
            { 
                name: 'Wheel of Fortune', 
                meaning: '운명의 변화와 새로운 기회가 찾아오는 시기입니다.',
                id: 'MA10',
                image_url: '10-WheelOfFortune.jpg'
            },
            { 
                name: 'Justice', 
                meaning: '공정함과 균형이 중요한 시기입니다.',
                id: 'MA11',
                image_url: '11-Justice.jpg'
            },
            { 
                name: 'The Hanged Man', 
                meaning: '새로운 관점과 희생을 통한 깨달음의 시기입니다.',
                id: 'MA12',
                image_url: '12-TheHangedMan.jpg'
            },
            { 
                name: 'Death', 
                meaning: '끝과 새로운 시작, 변화와 재탄생의 시기입니다.',
                id: 'MA13',
                image_url: '13-Death.jpg'
            },
            { 
                name: 'Temperance', 
                meaning: '조화와 절제를 통한 균형의 시기입니다.',
                id: 'MA14',
                image_url: '14-Temperance.jpg'
            },
            { 
                name: 'The Devil', 
                meaning: '물질적 욕망이나 중독에서 벗어나야 하는 시기입니다.',
                id: 'MA15',
                image_url: '15-TheDevil.jpg'
            },
            { 
                name: 'The Tower', 
                meaning: '급격한 변화와 파괴를 통한 새로운 시작의 시기입니다.',
                id: 'MA16',
                image_url: '16-TheTower.jpg'
            },
            { 
                name: 'The Star', 
                meaning: '희망과 영감, 치유의 에너지가 가득한 시기입니다.',
                id: 'MA17',
                image_url: '17-TheStar.jpg'
            },
            { 
                name: 'The Moon', 
                meaning: '직감과 무의식의 세계를 탐구하는 시기입니다.',
                id: 'MA18',
                image_url: '18-TheMoon.jpg'
            },
            { 
                name: 'The Sun', 
                meaning: '기쁨과 성공, 긍정적 에너지가 넘치는 시기입니다.',
                id: 'MA19',
                image_url: '19-TheSun.jpg'
            },
            { 
                name: 'Judgement', 
                meaning: '심판과 부활, 새로운 소명을 찾는 시기입니다.',
                id: 'MA20',
                image_url: '20-Judgement.jpg'
            },
            { 
                name: 'The World', 
                meaning: '완성과 성취, 새로운 사이클의 시작을 의미합니다.',
                id: 'MA21',
                image_url: '21-TheWorld.jpg'
            }
        ];
    }
    
    // 문자열을 해시코드로 변환
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 32bit 정수로 변환
        }
        return Math.abs(hash);
    }
    
    // 시드 기반 랜덤 함수
    seededRandom(seed) {
        // 더 나은 시드 기반 랜덤 함수
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }
    
    // 데일리 카드 뽑기
    drawDailyCard() {
        console.log('오늘의 카드 뽑기 시작'); // 디버깅용
        
        const today = this.getTodayString();
        
        // 이미 오늘 카드를 뽑았는지 확인
        if (this.todayCard) {
            this.showAlreadyDrawnMessage();
            return;
        }
        
        // 버튼 비활성화 및 로딩 상태로 변경
        const button = document.getElementById('dailyCardBtn');
        if (button) {
            button.disabled = true;
            button.innerHTML = `
                <span class="shuffle-icon">🔄</span>
                카드를 섞고 있습니다...
            `;
            button.classList.add('shuffling');
        }
        
        // 카드 섞기 효과 시작
        this.showShufflingEffect();
        
        // 3초 후 카드 뽑기 완료
        setTimeout(() => {
            // 카드 뽑기
            const card = this.getDailyCard();
            if (!card) {
                this.showErrorMessage();
                this.resetButton();
                return;
            }
            
            this.todayCard = card;
            
            // localStorage에 저장
            localStorage.setItem(`daily_card_${today}`, JSON.stringify(card));
            
            // 카드 표시
            this.displayDailyCard(card, true);
            
            // 버튼 숨기기
            if (button) {
                button.style.display = 'none';
            }
        }, 3000);
    }
    
    // 카드 섞기 효과
    showShufflingEffect() {
        const dailySection = document.querySelector('.daily-section');
        if (!dailySection) return;
        
        // 카드 섞기 컨테이너 생성
        const shuffleContainer = document.createElement('div');
        shuffleContainer.className = 'shuffle-container';
        shuffleContainer.innerHTML = `
            <div class="shuffle-cards">
                <div class="shuffle-card" style="animation-delay: 0s">🂠</div>
                <div class="shuffle-card" style="animation-delay: 0.2s">🂠</div>
                <div class="shuffle-card" style="animation-delay: 0.4s">🂠</div>
                <div class="shuffle-card" style="animation-delay: 0.6s">🂠</div>
                <div class="shuffle-card" style="animation-delay: 0.8s">🂠</div>
            </div>
            <div class="shuffle-message">
                <p>🌟 우주의 에너지가 카드를 섞고 있습니다 🌟</p>
                <div class="energy-particles">
                    <span>✨</span>
                    <span>⭐</span>
                    <span>💫</span>
                    <span>🌙</span>
                    <span>☄️</span>
                </div>
            </div>
        `;
        
        // 일일 운세 섹션에 추가
        const dailyContainer = dailySection.querySelector('.daily-fortune-container');
        if (dailyContainer) {
            dailyContainer.appendChild(shuffleContainer);
            
            // 3초 후 제거
            setTimeout(() => {
                if (shuffleContainer.parentNode) {
                    shuffleContainer.remove();
                }
            }, 3000);
        }
    }
    
    // 버튼 리셋
    resetButton() {
        const button = document.getElementById('dailyCardBtn');
        if (button) {
            button.disabled = false;
            button.innerHTML = `
                <span class="daily-btn-icon">🌟</span>
                오늘의 카드 뽑기
                <span class="daily-btn-icon">🌟</span>
            `;
            button.classList.remove('shuffling');
        }
    }
    
    // 데일리 카드 표시
    displayDailyCard(card, isNewDraw = false) {
        const resultContainer = document.getElementById('dailyCardResult');
        const button = document.getElementById('dailyCardBtn');
        
        if (!resultContainer) return;
        
        if (isNewDraw) {
            // 새로 뽑은 카드인 경우: 먼저 카드만 보여주기
            this.showCardOnly(card, resultContainer, button);
        } else {
            // 이미 뽑은 카드인 경우: 바로 전체 표시
            this.showFullInterpretation(card, resultContainer, button, false);
        }
    }
    
    // 카드만 먼저 보여주기
    showCardOnly(card, resultContainer, button) {
        // 버튼 텍스트 변경
        if (button) {
            button.innerHTML = '<span class="daily-btn-icon">🎴</span> 카드를 확인했습니다! <span class="daily-btn-icon">🎴</span>';
            button.disabled = true;
        }
        
        resultContainer.innerHTML = `
            <div class="daily-card-container animate-reveal">
                <div class="daily-card-header">
                    <h3>오늘의 카드</h3>
                    <span class="daily-new-badge">NEW!</span>
                </div>
                
                <div class="daily-card-display">
                    <div class="daily-tarot-card ${card.is_reversed ? 'reversed' : ''}" id="dailyCardDisplay">
                        <img src="images/${card.image_url}" alt="${card.name_ko}" 
                             class="daily-card-image ${card.is_reversed ? 'reversed-image' : ''}"
                             onerror="this.src='images/CardBacks.jpg';">
                        <div class="daily-card-name">
                            ${card.is_reversed ? '⭔ ' : ''}${card.name_ko}${card.is_reversed ? ' (역방향)' : ''}
                        </div>
                    </div>
                </div>
                
                <div class="daily-card-message">
                    <div class="revelation-message">
                        <h4>✨ 당신의 오늘 카드가 나타났습니다 ✨</h4>
                        <p>카드를 클릭하시거나 잠시 기다리시면 상세한 해석을 확인할 수 있습니다</p>
                        <div class="revelation-timer">
                            <div class="timer-dots">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>
                            <p class="timer-text">해석 준비 중...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        resultContainer.style.display = 'block';
        
        // 카드 클릭 이벤트 추가
        const cardElement = document.getElementById('dailyCardDisplay');
        if (cardElement) {
            cardElement.style.cursor = 'pointer';
            cardElement.addEventListener('click', () => {
                this.revealInterpretation(card, resultContainer, button);
            });
        }
        
        // 5초 후 자동으로 해석 표시
        setTimeout(() => {
            this.revealInterpretation(card, resultContainer, button);
        }, 5000);
        
        // 스크롤
        setTimeout(() => {
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
    
    // 해석 공개
    revealInterpretation(card, resultContainer, button) {
        // 이미 해석이 표시되었는지 확인
        if (resultContainer.querySelector('.daily-interpretation')) {
            return;
        }
        
        this.showFullInterpretation(card, resultContainer, button, true);
    }
    
    // 전체 해석 표시
    showFullInterpretation(card, resultContainer, button, withAnimation = false) {
        // 버튼 텍스트 변경
        if (button) {
            button.innerHTML = '<span class="daily-btn-icon">👁️</span> 오늘의 카드 다시 보기 <span class="daily-btn-icon">👁️</span>';
            button.disabled = false;
        }
        
        // 데일리 해석 생성
        const dailyInterpretation = this.generateDailyInterpretation(card);
        
        resultContainer.innerHTML = `
            <div class="daily-card-container ${withAnimation ? 'animate-reveal' : ''}">
                <div class="daily-card-header">
                    <h3>오늘의 카드</h3>
                </div>
                
                <div class="daily-card-display">
                    <div class="daily-tarot-card ${card.is_reversed ? 'reversed' : ''}">
                        <img src="images/${card.image_url}" alt="${card.name_ko}" 
                             class="daily-card-image ${card.is_reversed ? 'reversed-image' : ''}"
                             onerror="this.src='images/CardBacks.jpg';">
                        <div class="daily-card-name">
                            ${card.is_reversed ? '⭔ ' : ''}${card.name_ko}${card.is_reversed ? ' (역방향)' : ''}
                        </div>
                    </div>
                </div>
                
                <div class="daily-interpretation ${withAnimation ? 'animate-interpretation' : ''}">
                    <div class="daily-message">
                        <h4>🌟 오늘의 메시지</h4>
                        <p>${dailyInterpretation.message}</p>
                    </div>
                    
                    <div class="daily-advice">
                        <h4>💫 오늘의 조언</h4>
                        <p>${dailyInterpretation.advice}</p>
                    </div>
                    
                    <div class="daily-focus">
                        <h4>🎯 오늘 집중할 점</h4>
                        <p>${dailyInterpretation.focus}</p>
                    </div>
                    
                    <div class="daily-keywords">
                        <h4>🔑 핵심 키워드</h4>
                        <div class="daily-keywords-list">
                            ${dailyInterpretation.keywords.map(keyword => 
                                `<span class="daily-keyword-tag">${keyword}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="daily-lucky">
                        <h4>🍀 행운의 한마디</h4>
                        <p class="lucky-comment">"${dailyInterpretation.luckyComment}"</p>
                    </div>
                </div>
            </div>
        `;
        
        resultContainer.style.display = 'block';
        
        // 해석이 새로 나타나는 경우 스크롤
        if (withAnimation) {
            setTimeout(() => {
                const interpretation = resultContainer.querySelector('.daily-interpretation');
                if (interpretation) {
                    interpretation.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
        }
    }
    
    // 데일리 전용 해석 생성
    generateDailyInterpretation(card) {
        const isReversed = card.is_reversed;
        
        // 기본 데일리 메시지들
        const dailyMessages = this.getDailyMessagesForCard(card);
        
        return {
            message: isReversed ? 
                (dailyMessages.messageReversed || dailyMessages.message) : 
                dailyMessages.message,
            advice: isReversed ? 
                (dailyMessages.adviceReversed || dailyMessages.advice) : 
                dailyMessages.advice,
            focus: isReversed ? 
                (dailyMessages.focusReversed || dailyMessages.focus) : 
                dailyMessages.focus,
            keywords: isReversed ? 
                (card.keywords_reversed || card.keywords || ['주의', '성찰', '재검토']) : 
                (card.keywords || ['긍정', '성장', '기회']),
            luckyComment: isReversed ? 
                (dailyMessages.luckyReversed || "어려움도 성장의 기회입니다") : 
                (dailyMessages.lucky || "오늘은 특별한 날이 될 것입니다")
        };
    }
    
    // 카드별 데일리 메시지 가져오기
    getDailyMessagesForCard(card) {
        const messages = this.dailyMessages[card.id] || this.dailyMessages.default;
        return messages;
    }
    
    // 이미 뽑은 카드일 때 메시지
    showAlreadyDrawnMessage() {
        // 기존 카드 다시 표시
        this.displayDailyCard(this.todayCard, false);
    }
    
    // 오류 메시지
    showErrorMessage() {
        console.error('Daily fortune error occurred'); // 디버깅용
        
        const resultContainer = document.getElementById('dailyCardResult');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="daily-error">
                    <h3>🚫 오류 발생</h3>
                    <p>카드를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
                    <button onclick="location.reload()" class="retry-button">
                        🔄 페이지 새로고침
                    </button>
                </div>
            `;
            resultContainer.style.display = 'block';
        }
        
        // 버튼 리셋
        this.resetButton();
    }
    
    // 이미 뽑힌 카드 메시지
    showAlreadyDrawnMessage() {
        console.log('Already drawn today card'); // 디버깅용
        
        const resultContainer = document.getElementById('dailyCardResult');
        const button = document.getElementById('dailyCardBtn');
        
        if (this.todayCard && resultContainer) {
            // 기존 카드를 다시 표시
            this.displayDailyCard(this.todayCard, false);
            
            // 버튼 숨기기
            if (button) {
                button.style.display = 'none';
            }
        }
    }
    
    // 데일리 메시지 데이터베이스
    createDailyMessages() {
        return {
            "MA0": {
                message: "새로운 시작의 에너지가 당신을 둘러싸고 있습니다. 오늘은 과거의 걱정을 내려놓고 순수한 마음으로 세상을 바라보세요.",
                advice: "직감을 믿고 새로운 경험에 열린 마음을 가지세요. 작은 모험이 큰 변화의 시작이 될 수 있습니다.",
                focus: "순수함과 자발성을 잃지 않으면서도 현실적인 준비를 병행하는 것",
                lucky: "용기 있는 첫 걸음이 행운을 부를 것입니다",
                messageReversed: "성급한 결정보다는 신중한 계획이 필요한 날입니다. 주변의 조언에 귀를 기울이세요.",
                adviceReversed: "충동적인 행동을 자제하고, 충분한 정보를 수집한 후 결정하세요.",
                focusReversed: "현실적인 관점에서 상황을 바라보고, 준비를 철저히 하는 것",
                luckyReversed: "신중함이 위험을 피하게 해줄 것입니다"
            },
            "MA1": {
                message: "오늘은 당신의 의지력과 창조적 능력이 빛을 발하는 날입니다. 원하는 것을 현실로 만들어낼 수 있는 힘이 있습니다.",
                advice: "명확한 목표를 설정하고 집중력을 발휘하세요. 당신이 가진 모든 자원을 활용할 때입니다.",
                focus: "의지력과 집중을 통해 구체적인 성과를 만들어내는 것",
                lucky: "당신의 능력이 모든 것을 가능하게 만들 것입니다"
            },
            "MA2": {
                message: "내면의 목소리에 귀를 기울이는 것이 중요한 날입니다. 직감과 지혜가 올바른 길을 안내할 것입니다.",
                advice: "논리보다는 직감을 믿고, 조용한 시간을 가져 내면의 소리를 들어보세요.",
                focus: "명상이나 성찰을 통해 내적 지혜에 접근하는 것",
                lucky: "숨겨진 진실이 당신에게 드러날 것입니다"
            },
            default: {
                message: "오늘은 새로운 가능성이 열리는 특별한 날입니다. 긍정적인 에너지로 하루를 시작하세요.",
                advice: "현재 순간에 집중하고, 주변의 작은 신호들에 주의를 기울이세요.",
                focus: "마음의 평화를 유지하면서 적극적으로 하루를 살아가는 것",
                lucky: "오늘 하루가 당신에게 특별한 선물을 가져다줄 것입니다"
            }
        };
    }
}

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    window.dailyFortune = new DailyFortune();
});