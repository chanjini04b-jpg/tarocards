// Yes/No Tarot System
class YesNoTarot {
    constructor() {
        this.tarotManager = null;
    }

    async init() {
        this.tarotManager = await initializeTarotManager();
    }

    async getYesNoAnswer(question) {
        if (!this.tarotManager) await this.init();
        
        const card = this.tarotManager.drawRandomCard();
        const answer = this.interpretYesNo(card);
        
        return {
            question: question,
            card: card,
            answer: answer.response,
            confidence: answer.confidence,
            explanation: answer.explanation
        };
    }

    interpretYesNo(card) {
        // Yes/No interpretation based on card meanings and energy
        const yesCards = ['MA0', 'MA1', 'MA3', 'MA6', 'MA7', 'MA8', 'MA10', 'MA17', 'MA19', 'MA21'];
        const neutralCards = ['MA2', 'MA5', 'MA9', 'MA11', 'MA12', 'MA14', 'MA20'];
        const noCards = ['MA4', 'MA13', 'MA15', 'MA16', 'MA18'];

        let response, confidence, explanation;

        if (card.reversed) {
            // Reversed cards tend toward No or caution
            if (yesCards.includes(card.id)) {
                response = 'Maybe';
                confidence = '보통';
                explanation = '조건부 긍정적입니다. 신중한 접근이 필요합니다.';
            } else {
                response = 'No';
                confidence = '높음';
                explanation = '현재 상황에서는 부정적인 신호가 강합니다.';
            }
        } else {
            // Upright interpretation
            if (yesCards.includes(card.id)) {
                response = 'Yes';
                confidence = '높음';
                explanation = '긍정적인 에너지가 강하게 나타납니다.';
            } else if (neutralCards.includes(card.id)) {
                response = 'Maybe';
                confidence = '보통';
                explanation = '상황에 따라 달라질 수 있습니다. 추가적인 고려가 필요합니다.';
            } else {
                response = 'No';
                confidence = '보통';
                explanation = '현재로서는 부정적인 신호가 나타납니다.';
            }
        }

        return { response, confidence, explanation };
    }

    generateDetailedResponse(result) {
        const cardMeaning = result.card.getMeaning();
        return `
            <strong>질문:</strong> ${result.question}<br>
            <strong>답변:</strong> ${result.answer}<br>
            <strong>신뢰도:</strong> ${result.confidence}<br>
            <strong>설명:</strong> ${result.explanation}<br>
            <strong>카드 의미:</strong> ${cardMeaning}
        `;
    }
}

// Simple Yes/No Function
async function getSimpleYesNo(question) {
    const yesNoTarot = new YesNoTarot();
    return await yesNoTarot.getYesNoAnswer(question);
}

// Display Yes/No Result
function displayYesNoResult(result, containerId = 'yesNoResult') {
    const container = document.getElementById(containerId);
    if (!container || !result) return;

    const answerClass = result.answer.toLowerCase();
    const html = `
        <div class="yesno-result">
            <div class="question-section">
                <h3>질문: ${result.question}</h3>
            </div>
            <div class="card-section">
                <img src="${getCardImagePath(result.card)}" alt="${result.card.name_ko}" 
                     class="yesno-card-image" onerror="this.src='images/CardBacks.jpg'">
                <h4>${result.card.name_ko} (${result.card.name_en})</h4>
                ${result.card.reversed ? '<p class="reversed-note">역방향</p>' : ''}
            </div>
            <div class="answer-section">
                <div class="answer ${answerClass}">
                    <h2>${result.answer}</h2>
                    <p class="confidence">신뢰도: ${result.confidence}</p>
                </div>
                <p class="explanation">${result.explanation}</p>
                <p class="card-meaning"><strong>카드 의미:</strong> ${result.card.getMeaning()}</p>
            </div>
        </div>
    `;

    container.innerHTML = html;
}