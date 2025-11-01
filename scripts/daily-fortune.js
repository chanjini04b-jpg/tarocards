// Daily Fortune Tarot
class DailyFortune {
    constructor() {
        this.tarotManager = null;
    }

    async init() {
        this.tarotManager = await initializeTarotManager();
    }

    async getDailyCard() {
        if (!this.tarotManager) await this.init();
        return this.tarotManager.drawRandomCard();
    }

    generateDailyReading(card) {
        if (!card) return null;

        const timeOfDay = new Date().getHours();
        let timeMessage = '';
        
        if (timeOfDay < 12) {
            timeMessage = '오늘 아침, 새로운 에너지와 함께';
        } else if (timeOfDay < 18) {
            timeMessage = '오늘 오후, 활동적인 시간에';
        } else {
            timeMessage = '오늘 저녁, 하루를 마무리하며';
        }

        return {
            card: card,
            message: `${timeMessage} ${card.name_ko} 카드가 당신에게 나타났습니다.`,
            meaning: card.getMeaning(),
            advice: this.generateAdvice(card)
        };
    }

    generateAdvice(card) {
        const adviceMap = {
            'MA0': '새로운 시도를 두려워하지 마세요. 모험은 성장의 시작입니다.',
            'MA1': '당신의 능력을 믿고 적극적으로 행동하세요.',
            'MA2': '직감을 믿고 내면의 목소리에 귀 기울이세요.',
            'MA3': '창조적인 에너지를 발휘할 때입니다.',
            'MA4': '체계적이고 계획적인 접근이 필요합니다.',
            'MA5': '전통적인 방법이나 조언을 구해보세요.',
            'MA6': '중요한 선택의 순간입니다. 신중히 결정하세요.',
            'MA7': '의지력을 발휘하여 목표를 향해 나아가세요.',
            'MA8': '인내와 용기로 어려움을 극복할 수 있습니다.',
            'MA9': '성찰의 시간을 가지며 내면을 들여다보세요.'
        };

        return adviceMap[card.id] || '오늘은 긍정적인 마음으로 하루를 시작하세요.';
    }
}

// Simple Daily Fortune Function
async function getSimpleDailyFortune() {
    const dailyFortune = new DailyFortune();
    const card = await dailyFortune.getDailyCard();
    return dailyFortune.generateDailyReading(card);
}

// Display Daily Fortune
function displayDailyFortune(reading, containerId = 'dailyFortuneResult') {
    const container = document.getElementById(containerId);
    if (!container || !reading) return;

    const html = `
        <div class="daily-fortune-card">
            <div class="card-section">
                <img src="${getCardImagePath(reading.card)}" alt="${reading.card.name_ko}" 
                     class="fortune-card-image" onerror="this.src='images/CardBacks.jpg'">
                <h3>${reading.card.name_ko} (${reading.card.name_en})</h3>
                ${reading.card.reversed ? '<p class="reversed-note">역방향</p>' : ''}
            </div>
            <div class="reading-section">
                <p class="time-message">${reading.message}</p>
                <p class="card-meaning"><strong>의미:</strong> ${reading.meaning}</p>
                <p class="daily-advice"><strong>오늘의 조언:</strong> ${reading.advice}</p>
            </div>
        </div>
    `;

    container.innerHTML = html;
}