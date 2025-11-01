// YES/NO Tarot System
console.log('yesno-tarot.js 파일 로딩 시작');

class YesNoTarot {
    constructor() {
        console.log('YesNoTarot 생성자 호출');
        this.yesNoCards = [];
        this.currentQuestion = '';
        this.init();
    }

    async init() {
        console.log('YesNoTarot init 시작');
        
        // 카드 매니저가 로딩될 때까지 기다림
        if (window.tarotCardManager) {
            console.log('타로 카드 매니저 발견, 카드 로딩 중...');
            try {
                await window.tarotCardManager.loadCards();
                this.yesNoCards = this.createYesNoCards();
                console.log('카드 매니저로부터 카드 데이터 생성 완료:', this.yesNoCards);
            } catch (error) {
                console.error('카드 매니저에서 카드 로딩 실패:', error);
                this.yesNoCards = this.createFallbackYesNoCards();
                console.log('폴백 카드 데이터 사용:', this.yesNoCards);
            }
        } else {
            console.log('타로 카드 매니저 없음, 폴백 데이터 사용');
            // 폴백 데이터 사용
            this.yesNoCards = this.createFallbackYesNoCards();
            console.log('폴백 카드 데이터 생성 완료:', this.yesNoCards);
        }
        
        this.setupEventListeners();
        console.log('YesNoTarot init 완료');
    }

    setupEventListeners() {
        // Draw button
        const drawBtn = document.getElementById('yesnoDrawBtn');
        if (drawBtn) {
            drawBtn.addEventListener('click', () => this.drawYesNoCard());
        }

        // Question input Enter key
        const questionInput = document.getElementById('yesnoQuestion');
        if (questionInput) {
            questionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.drawYesNoCard();
                }
            });
        }
    }

    drawYesNoCard() {
        const questionInput = document.getElementById('yesnoQuestion');
        const question = questionInput.value.trim();

        if (!question) {
            this.showMessage('질문을 입력해주세요! 🤔', 'warning');
            questionInput.focus();
            return;
        }

        if (question.length < 5) {
            this.showMessage('더 구체적인 질문을 입력해주세요! ✨', 'warning');
            return;
        }

        this.currentQuestion = question;

        // Button state change
        const drawBtn = document.getElementById('yesnoDrawBtn');
        if (drawBtn) {
            drawBtn.disabled = true;
            drawBtn.innerHTML = '<span class="loading-spinner"></span> 카드를 뽑는 중...';
        }

        // Animate and draw card
        setTimeout(() => {
            this.performCardDraw();
        }, 1500);
    }

    performCardDraw() {
        console.log('performCardDraw 시작');
        console.log('현재 질문:', this.currentQuestion);
        console.log('yesNoCards 데이터:', this.yesNoCards);
        
        // Select answer type based on question energy
        const answerType = this.determineAnswerType(this.currentQuestion);
        console.log('결정된 답변 타입:', answerType);
        
        // Get random card from selected type
        const cardPool = this.yesNoCards[answerType];
        console.log('선택된 카드 풀:', cardPool);
        
        if (!cardPool || cardPool.length === 0) {
            console.error('카드 풀이 비어있습니다. 폴백 데이터 사용');
            this.yesNoCards = this.createFallbackYesNoCards();
            const fallbackPool = this.yesNoCards[answerType];
            
            if (!fallbackPool || fallbackPool.length === 0) {
                console.error('폴백 데이터도 없습니다');
                this.showMessage('카드 데이터를 불러올 수 없습니다.', 'error');
                
                // Reset button
                const drawBtn = document.getElementById('yesnoDrawBtn');
                if (drawBtn) {
                    drawBtn.disabled = false;
                    drawBtn.innerHTML = '<span class="card-icon">🔮</span> 카드 뽑기';
                }
                return;
            }
            
            const randomCard = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
            console.log('폴백에서 선택된 카드:', randomCard);
            this.displayResult(randomCard, answerType);
        } else {
            const randomCard = cardPool[Math.floor(Math.random() * cardPool.length)];
            console.log('선택된 카드:', randomCard);
            this.displayResult(randomCard, answerType);
        }
        
        // Reset button
        const drawBtn = document.getElementById('yesnoDrawBtn');
        if (drawBtn) {
            drawBtn.disabled = false;
            drawBtn.innerHTML = '<span class="card-icon">🔮</span> 카드 뽑기';
        }
    }

    determineAnswerType(question) {
        // Simple algorithm to determine answer tendency based on question
        const lowerQuestion = question.toLowerCase();
        
        // Positive keywords increase YES probability
        const positiveWords = ['사랑', '성공', '행복', '좋', '괜찮', '잘', '승진', '결혼', '여행', '구매', '시작'];
        const negativeWords = ['문제', '어려', '힘들', '위험', '싫', '안', '못', '실패', '포기', '그만'];
        const neutralWords = ['언제', '어떻', '선택', '결정', '고민', '생각', '방법', '시간'];

        let positiveScore = 0;
        let negativeScore = 0;
        let neutralScore = 0;

        positiveWords.forEach(word => {
            if (lowerQuestion.includes(word)) positiveScore += 1;
        });

        negativeWords.forEach(word => {
            if (lowerQuestion.includes(word)) negativeScore += 1;
        });

        neutralWords.forEach(word => {
            if (lowerQuestion.includes(word)) neutralScore += 1;
        });

        // Add some randomness
        const random = Math.random();
        
        if (positiveScore > negativeScore && positiveScore > neutralScore && random > 0.3) {
            return 'YES';
        } else if (negativeScore > positiveScore && negativeScore > neutralScore && random > 0.3) {
            return 'NO';
        } else if (neutralScore > 0 || random < 0.2) {
            return 'MAYBE';
        } else {
            // Random selection when unclear
            const types = ['YES', 'NO', 'MAYBE'];
            return types[Math.floor(Math.random() * types.length)];
        }
    }

    displayResult(card, answerType) {
        console.log('displayResult 호출됨');
        console.log('카드 데이터:', card);
        console.log('답변 타입:', answerType);
        
        const resultSection = document.getElementById('yesnoResult');
        console.log('yesnoResult 요소 찾기 시도...');
        console.log('결과 섹션 요소:', resultSection);
        
        if (!resultSection) {
            console.error('yesnoResult element not found');
            console.log('페이지의 모든 ID 요소들:');
            const allElements = document.querySelectorAll('[id]');
            allElements.forEach(el => console.log(`- ${el.id}`));
            return;
        }
        
        console.log('결과 섹션 요소 찾음:', resultSection);
        console.log('현재 display 스타일:', resultSection.style.display);
        
        // 결과 섹션이 숨겨져 있다면 보이게 만들기
        resultSection.style.display = 'block';
        console.log('결과 섹션 display를 block으로 설정');

        const answerColors = {
            'YES': '#4CAF50',
            'NO': '#f44336', 
            'MAYBE': '#FF9800'
        };

        const answerEmojis = {
            'YES': '✅',
            'NO': '❌',
            'MAYBE': '🤔'
        };

        console.log('HTML 콘텐츠 생성 시작');
        console.log('카드 이미지 경로:', card.image_url);
        
        // 사용자 친화적인 아름다운 결과 HTML
        const beautifulHtml = `
            <div style="
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 255, 255, 0.1));
                border: 2px solid rgba(255, 215, 0, 0.3);
                border-radius: 20px;
                padding: 30px;
                margin: 30px 0;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
                animation: fadeInUp 0.8s ease;
            ">
                <!-- 질문 회상 -->
                <div style="
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 15px;
                    margin-bottom: 25px;
                    border: 1px solid rgba(255, 215, 0, 0.2);
                ">
                    <p style="
                        color: #f0d084;
                        font-size: 16px;
                        margin: 0;
                        font-weight: 500;
                        opacity: 0.9;
                    ">
                        🔮 <strong>당신의 질문:</strong> "${this.currentQuestion}"
                    </p>
                </div>

                <!-- 답변 결과 -->
                <div style="
                    background: linear-gradient(135deg, ${answerColors[answerType]}, ${this.getDarkerColor(answerColors[answerType])});
                    border-radius: 50px;
                    padding: 20px 40px;
                    margin: 25px auto;
                    max-width: 300px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
                    transform: scale(1.05);
                ">
                    <h1 style="
                        color: white;
                        font-size: 2.5em;
                        margin: 0;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                        font-weight: bold;
                    ">
                        ${answerEmojis[answerType]} ${answerType}
                    </h1>
                </div>

                <!-- 확신도 표시 -->
                <div style="margin: 20px 0;">
                    <p style="color: #ccc; margin: 8px 0; font-size: 14px;">우주의 확신도</p>
                    <div style="
                        background: rgba(255, 255, 255, 0.2);
                        height: 12px;
                        border-radius: 6px;
                        max-width: 200px;
                        margin: 0 auto;
                        overflow: hidden;
                        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
                    ">
                        <div style="
                            background: linear-gradient(90deg, ${answerColors[answerType]}, #fff);
                            width: ${card.confidence}%;
                            height: 100%;
                            border-radius: 6px;
                            box-shadow: 0 0 10px ${answerColors[answerType]};
                            transition: width 1s ease;
                        "></div>
                    </div>
                    <p style="
                        color: ${answerColors[answerType]};
                        font-weight: bold;
                        margin: 8px 0;
                        font-size: 16px;
                    ">${card.confidence}%</p>
                </div>

                <!-- 카드 정보 -->
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 25px;
                    margin: 30px 0;
                    flex-wrap: wrap;
                ">
                    <!-- 카드 이미지 -->
                    <div style="
                        background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                        border-radius: 15px;
                        padding: 15px;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                        border: 2px solid rgba(255, 215, 0, 0.3);
                    ">
                        <img src="${card.image_url}" 
                             alt="${card.name}" 
                             style="
                                 max-width: 180px;
                                 max-height: 280px;
                                 border-radius: 10px;
                                 box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
                                 display: block;
                             " 
                             onerror="console.error('이미지 로드 실패:', '${card.image_url}'); this.parentElement.style.display='none';">
                    </div>

                    <!-- 카드 정보 -->
                    <div style="
                        text-align: left;
                        max-width: 350px;
                        background: rgba(255, 255, 255, 0.08);
                        border-radius: 15px;
                        padding: 25px;
                        border: 1px solid rgba(255, 215, 0, 0.2);
                    ">
                        <h2 style="
                            color: #f0d084;
                            margin: 0 0 10px 0;
                            font-size: 1.4em;
                            text-align: center;
                        ">${card.name}</h2>
                        
                        <p style="
                            color: #d4af37;
                            text-align: center;
                            margin: 0 0 20px 0;
                            font-size: 1.1em;
                            font-weight: 500;
                        ">${card.korean}</p>

                        <div style="margin: 15px 0;">
                            <h4 style="
                                color: #f0d084;
                                margin: 0 0 8px 0;
                                font-size: 1em;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">✨ 카드의 메시지</h4>
                            <p style="
                                color: #fff;
                                line-height: 1.6;
                                margin: 0;
                                background: rgba(255, 255, 255, 0.1);
                                padding: 12px;
                                border-radius: 8px;
                                border-left: 4px solid ${answerColors[answerType]};
                            ">${card.meaning}</p>
                        </div>

                        <div style="margin: 15px 0;">
                            <h4 style="
                                color: #f0d084;
                                margin: 0 0 8px 0;
                                font-size: 1em;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">💡 우주의 조언</h4>
                            <p style="
                                color: #fff;
                                line-height: 1.6;
                                margin: 0;
                                background: rgba(255, 255, 255, 0.1);
                                padding: 12px;
                                border-radius: 8px;
                                border-left: 4px solid ${answerColors[answerType]};
                            ">${card.advice}</p>
                        </div>
                    </div>
                </div>

                <!-- 액션 버튼들 -->
                <div style="margin-top: 30px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                    <button onclick="window.yesNoTarot.drawYesNoCard()" style="
                        background: linear-gradient(135deg, #f0d084, #d4af37);
                        color: #1a1a2e;
                        border: none;
                        padding: 15px 25px;
                        border-radius: 25px;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        box-shadow: 0 5px 15px rgba(240, 208, 132, 0.4);
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    " 
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(240, 208, 132, 0.6)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(240, 208, 132, 0.4)'">
                        🔄 다른 질문하기
                    </button>
                    
                    <button onclick="window.yesNoTarot.clearQuestion()" style="
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        padding: 15px 25px;
                        border-radius: 25px;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(102, 126, 234, 0.6)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(102, 126, 234, 0.4)'">
                        📝 새로운 질문
                    </button>
                </div>

                <!-- 감사 메시지 -->
                <div style="
                    margin-top: 25px;
                    padding: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 215, 0, 0.1);
                ">
                    <p style="
                        color: #f0d084;
                        margin: 0;
                        font-size: 14px;
                        opacity: 0.8;
                        font-style: italic;
                    ">
                        🌟 타로는 조언을 제공할 뿐입니다. 최종 결정은 항상 당신의 지혜와 직감을 따르세요. 🌟
                    </p>
                </div>
            </div>

            <style>
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;
        
        console.log('HTML 설정 중...');
        resultSection.innerHTML = beautifulHtml;
        console.log('HTML 설정 완료');
        
        // 결과 섹션 보이기
        resultSection.style.display = 'block';
        console.log('결과 섹션 display block 설정');
        
        // 스크롤
        console.log('스크롤 시작');
        resultSection.scrollIntoView({ behavior: 'smooth' });
        console.log('스크롤 완료');
        
        console.log('displayResult 함수 완료');
    }

    // 색상을 더 어둡게 만드는 헬퍼 함수
    getDarkerColor(color) {
        const colorMap = {
            '#4CAF50': '#2E7D32',  // YES - 더 어두운 녹색
            '#f44336': '#C62828',  // NO - 더 어두운 빨간색
            '#FF9800': '#E65100'   // MAYBE - 더 어두운 주황색
        };
        return colorMap[color] || color;
    }

    clearQuestion() {
        const questionInput = document.getElementById('yesnoQuestion');
        if (questionInput) {
            questionInput.value = '';
            questionInput.focus();
        }
        
        const resultSection = document.getElementById('yesnoResult');
        if (resultSection) {
            resultSection.style.display = 'none';
        }
        
        this.currentQuestion = '';
    }

    showMessage(text, type = 'info') {
        // Simple message display
        const existingMessage = document.querySelector('.yesno-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const message = document.createElement('div');
        message.className = `yesno-message ${type}`;
        message.textContent = text;
        
        const container = document.querySelector('.yesno-input-section');
        if (container) {
            container.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
        }
    }

    createYesNoCards() {
        console.log('createYesNoCards 시작');
        
        // 타로 카드 매니저에서 78장 카드 가져오기
        if (!window.tarotCardManager) {
            console.error('타로 카드 매니저가 없습니다');
            return this.createFallbackYesNoCards();
        }
        
        const allCards = window.tarotCardManager.getAllCards();
        console.log('전체 카드 데이터:', allCards);
        
        if (!allCards || allCards.length === 0) {
            console.error('카드 데이터가 비어있습니다');
            return this.createFallbackYesNoCards();
        }
        
        // YES 카드들 (긍정적 의미가 강한 카드들)
        const yesCardIds = ['MA19', 'MA21', 'MA17', 'MA10', 'MA6', 'MA3', 'MA1', 'CU01', 'CU02', 'CU03', 'CU09', 'CU10', 'WA01', 'WA06', 'PE01', 'PE09', 'PE10'];
        
        // NO 카드들 (부정적이거나 주의가 필요한 카드들)
        const noCardIds = ['MA13', 'MA15', 'MA16', 'MA12', 'MA18', 'SW03', 'SW05', 'SW08', 'SW09', 'SW10', 'CU05', 'CU08', 'PE05', 'WA05', 'WA10'];
        
        // MAYBE 카드들 (중립적이거나 선택이 필요한 카드들)
        const maybeCardIds = ['MA2', 'MA4', 'MA5', 'MA7', 'MA8', 'MA9', 'MA11', 'MA14', 'MA20', 'SW02', 'SW04', 'SW06', 'SW07', 'CU04', 'CU07', 'PE02', 'PE04', 'PE07'];

        const result = {
            YES: yesCardIds.map(id => this.createYesNoCardData(allCards.find(card => card.id === id), 'YES')).filter(Boolean),
            NO: noCardIds.map(id => this.createYesNoCardData(allCards.find(card => card.id === id), 'NO')).filter(Boolean),
            MAYBE: maybeCardIds.map(id => this.createYesNoCardData(allCards.find(card => card.id === id), 'MAYBE')).filter(Boolean)
        };
        
        console.log('생성된 YES/NO 카드 데이터:', result);
        
        // 각 카테고리에 카드가 있는지 확인
        if (result.YES.length === 0 || result.NO.length === 0 || result.MAYBE.length === 0) {
            console.warn('일부 카테고리에 카드가 없습니다. 폴백 데이터 사용');
            return this.createFallbackYesNoCards();
        }
        
        return result;
    }

    createYesNoCardData(card, type) {
        if (!card) return null;
        
        const confidenceMap = { 'YES': 85, 'NO': 80, 'MAYBE': 70 };
        const messageMap = {
            'YES': {
                meaning: '긍정적인 에너지가 흐르고 있습니다. 당신의 결정은 좋은 결과를 가져올 것입니다.',
                advice: '자신감을 가지고 앞으로 나아가세요. 지금이 행동할 때입니다.'
            },
            'NO': {
                meaning: '지금은 신중함이 필요한 시기입니다. 다른 방향을 고려해보세요.',
                advice: '성급한 결정보다는 더 많은 정보를 수집하고 기다리는 것이 좋겠습니다.'
            },
            'MAYBE': {
                meaning: '상황이 아직 확실하지 않습니다. 더 많은 고려가 필요한 상태입니다.',
                advice: '조금 더 시간을 두고 상황을 지켜본 후 결정하세요. 추가적인 정보나 변화를 기다려보세요.'
            }
        };

        return {
            name: card.name_en,
            korean: card.name_ko,
            id: card.id,
            image_url: card.image.startsWith('image2/') ? '../' + card.image : card.image,
            element: card.arcana === 'Major' ? '메이저 아르카나' : card.suit,
            meaning: messageMap[type].meaning,
            advice: messageMap[type].advice,
            card_meaning: card.meaning_up,
            confidence: confidenceMap[type] + Math.floor(Math.random() * 10)
        };
    }

    createFallbackYesNoCards() {
        // 매니저가 없을 때 사용하는 기본 데이터
        return {
            YES: [
                {
                    name: 'The Sun',
                    korean: '태양',
                    id: 'MA19',
                    image_url: '../image2/19-TheSun.jpg',
                    element: '메이저 아르카나',
                    meaning: '밝은 에너지와 성공의 신호입니다. 당신의 결정은 긍정적인 결과를 가져올 것입니다.',
                    advice: '자신감을 가지고 앞으로 나아가세요. 지금이 행동할 때입니다.',
                    confidence: 95
                }
            ],
            NO: [
                {
                    name: 'The Tower',
                    korean: '탑',
                    id: 'MA16',
                    image_url: '../image2/16-TheTower.jpg',
                    element: '메이저 아르카나',
                    meaning: '지금은 신중함이 필요한 시기입니다. 급격한 변화가 예상됩니다.',
                    advice: '성급한 결정보다는 더 많은 정보를 수집하고 기다리는 것이 좋겠습니다.',
                    confidence: 85
                }
            ],
            MAYBE: [
                {
                    name: 'The High Priestess',
                    korean: '여교황',
                    id: 'MA2',
                    image_url: '../image2/02-TheHighPriestess.jpg',
                    element: '메이저 아르카나',
                    meaning: '상황이 아직 확실하지 않습니다. 직감을 믿고 더 깊이 생각해보세요.',
                    advice: '조금 더 시간을 두고 상황을 지켜본 후 결정하세요.',
                    confidence: 75
                }
            ]
        };
    }
}

// 질문 예시 설정 함수 - 간단하고 확실한 버전
window.setYesNoQuestion = function(question) {
    console.log('setYesNoQuestion 호출:', question);
    
    const input = document.getElementById('yesnoQuestion');
    if (input) {
        input.value = question;
        input.focus();
        
        // 시각적 피드백
        input.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        setTimeout(() => {
            input.style.backgroundColor = '';
        }, 500);
        
        console.log('질문 설정 완료:', question);
    } else {
        console.error('yesnoQuestion 입력 필드를 찾을 수 없습니다');
    }
};

// 예시 질문 버튼 이벤트 설정
function initializeExampleQuestions() {
    console.log('예시 질문 버튼 초기화 시작');
    
    // 약간의 지연을 두고 실행 (DOM이 완전히 로드되도록)
    setTimeout(() => {
        const exampleTags = document.querySelectorAll('.example-tag');
        console.log(`발견된 예시 태그: ${exampleTags.length}개`);
        
        if (exampleTags.length === 0) {
            console.warn('예시 태그를 찾을 수 없습니다. 다시 시도합니다...');
            setTimeout(initializeExampleQuestions, 1000);
            return;
        }
        
        exampleTags.forEach((tag, index) => {
            // 기존 이벤트 제거
            tag.onclick = null;
            
            // 새 클릭 이벤트 추가
            tag.addEventListener('click', function() {
                console.log(`예시 질문 ${index + 1} 클릭:`, this.textContent);
                
                // 클릭 효과
                this.style.transform = 'scale(0.95)';
                this.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.backgroundColor = '';
                }, 150);
                
                // 질문 설정
                if (typeof window.setYesNoQuestion === 'function') {
                    window.setYesNoQuestion(this.textContent);
                } else {
                    console.error('setYesNoQuestion 함수를 찾을 수 없습니다');
                }
            });
            
            // 커서 스타일 설정
            tag.style.cursor = 'pointer';
            
            console.log(`예시 질문 ${index + 1} 이벤트 설정 완료:`, tag.textContent);
        });
        
        console.log('모든 예시 질문 버튼 초기화 완료');
    }, 500);
}

// DOM 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('YesNo Tarot DOM 로드 완료');
    
    // YesNoTarot 인스턴스 생성
    if (typeof YesNoTarot !== 'undefined') {
        window.yesNoTarot = new YesNoTarot();
        console.log('YesNoTarot 인스턴스 생성 완료:', window.yesNoTarot);
    } else {
        console.error('YesNoTarot 클래스를 찾을 수 없습니다');
    }
    
    // 예시 질문 버튼 초기화
    initializeExampleQuestions();
    
    // 버튼 이벤트 재확인
    setTimeout(() => {
        const drawBtn = document.getElementById('yesnoDrawBtn');
        if (drawBtn && window.yesNoTarot) {
            console.log('Draw 버튼 이벤트 재설정');
            drawBtn.addEventListener('click', function() {
                console.log('Draw 버튼 클릭됨');
                window.yesNoTarot.drawYesNoCard();
            });
        }
    }, 1000);
});

// 페이지 로드 시에도 초기화 (안전장치)
window.addEventListener('load', function() {
    console.log('페이지 완전 로드 완료');
    
    // YesNoTarot 인스턴스가 없다면 다시 생성
    if (!window.yesNoTarot && typeof YesNoTarot !== 'undefined') {
        console.log('YesNoTarot 인스턴스 재생성');
        window.yesNoTarot = new YesNoTarot();
    }
    
    // 예시 질문 버튼이 아직 설정되지 않았다면 다시 시도
    const exampleTags = document.querySelectorAll('.example-tag');
    if (exampleTags.length > 0 && !exampleTags[0].onclick && !exampleTags[0]._hasClickListener) {
        console.log('예시 질문 버튼 재초기화 시도');
        initializeExampleQuestions();
    }
});

// 파일 로딩 완료 및 클래스 정의 확인
console.log('yesno-tarot.js 파일 로딩 완료');
console.log('YesNoTarot 클래스 정의 상태:', typeof YesNoTarot);

// 전역 스코프에 클래스 명시적 할당 (안전장치)
if (typeof window !== 'undefined') {
    window.YesNoTarot = YesNoTarot;
    console.log('YesNoTarot 클래스를 window 객체에 할당 완료');
}