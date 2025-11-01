// Chakra Tarot System
class ChakraTarot {
    constructor() {
        this.chakras = [
            { name: '루트 차크라', color: '#FF0000', element: '땅', location: '기저부' },
            { name: '사크랄 차크라', color: '#FF7F00', element: '물', location: '아랫배' },
            { name: '솔라플렉서스 차크라', color: '#FFFF00', element: '불', location: '명치' },
            { name: '하트 차크라', color: '#00FF00', element: '공기', location: '가슴' },
            { name: '스로트 차크라', color: '#0000FF', element: '공간', location: '목' },
            { name: '써드아이 차크라', color: '#4B0082', element: '빛', location: '이마' },
            { name: '크라운 차크라', color: '#9400D3', element: '생각', location: '정수리' }
        ];
        this.tarotManager = null;
    }

    async init() {
        this.tarotManager = await initializeTarotManager();
    }

    async performChakraReading() {
        if (!this.tarotManager) await this.init();
        
        const reading = [];
        for (let i = 0; i < this.chakras.length; i++) {
            const card = this.tarotManager.drawRandomCard();
            reading.push({
                chakra: this.chakras[i],
                card: card,
                interpretation: this.interpretChakraCard(this.chakras[i], card)
            });
        }
        
        return reading;
    }

    interpretChakraCard(chakra, card) {
        const interpretations = {
            '루트 차크라': {
                focus: '안정성, 생존 본능, 물질적 기반',
                message: `${card.name_ko} 카드가 당신의 기반과 안정성에 대해 말하고 있습니다.`
            },
            '사크랄 차크라': {
                focus: '창조성, 성적 에너지, 감정',
                message: `${card.name_ko} 카드가 당신의 창조적 에너지와 감정 상태를 나타냅니다.`
            },
            '솔라플렉서스 차크라': {
                focus: '개인적 힘, 자신감, 의지력',
                message: `${card.name_ko} 카드가 당신의 개인적 힘과 의지에 대해 조언합니다.`
            },
            '하트 차크라': {
                focus: '사랑, 연민, 관계',
                message: `${card.name_ko} 카드가 당신의 사랑과 관계에 대한 메시지를 전합니다.`
            },
            '스로트 차크라': {
                focus: '의사소통, 진실, 표현',
                message: `${card.name_ko} 카드가 당신의 소통과 표현에 대해 이야기합니다.`
            },
            '써드아이 차크라': {
                focus: '직관, 통찰, 영적 인식',
                message: `${card.name_ko} 카드가 당신의 직관과 영적 통찰을 안내합니다.`
            },
            '크라운 차크라': {
                focus: '영성, 깨달음, 우주적 연결',
                message: `${card.name_ko} 카드가 당신의 영적 성장과 깨달음을 나타냅니다.`
            }
        };

        const interp = interpretations[chakra.name];
        return {
            focus: interp.focus,
            message: interp.message,
            meaning: card.getMeaning(),
            advice: this.generateChakraAdvice(chakra, card)
        };
    }

    generateChakraAdvice(chakra, card) {
        return `${chakra.name}의 에너지를 균형있게 유지하기 위해 ${card.getMeaning()}의 의미를 일상에 적용해보세요.`;
    }
}

// Display Chakra Reading
function displayChakraReading(reading, containerId = 'chakraResult') {
    const container = document.getElementById(containerId);
    if (!container || !reading) return;

    let html = '<div class="chakra-reading">';
    
    reading.forEach((item, index) => {
        html += `
            <div class="chakra-card" style="border-left: 5px solid ${item.chakra.color}">
                <div class="chakra-info">
                    <h4>${item.chakra.name}</h4>
                    <p class="chakra-location">${item.chakra.location} • ${item.chakra.element}</p>
                    <p class="chakra-focus">${item.interpretation.focus}</p>
                </div>
                <div class="card-info">
                    <img src="${getCardImagePath(item.card)}" alt="${item.card.name_ko}" 
                         class="chakra-card-image" onerror="this.src='images/CardBacks.jpg'">
                    <h5>${item.card.name_ko}</h5>
                    <p>${item.interpretation.meaning}</p>
                    <p class="advice">${item.interpretation.advice}</p>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}