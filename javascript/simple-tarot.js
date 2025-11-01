/**
 * 간단한 타로 시스템 - 독립적으로 작동하는 기본 타로 기능
 */

class SimpleTarotSystem {
    constructor() {
        this.cards = this.createDefaultCards();
        this.randomQuestions = this.createRandomQuestions();
        this.isReady = true;
        this.currentSpread = [];
        console.log('SimpleTarotSystem 초기화 완료:', this.cards.length, '개의 카드');
    }
    
    // 기본 카드 데이터 생성
    createDefaultCards() {
        return [
            // 메이저 아르카나 기본 카드들
            {
                id: "MA0",
                name_ko: "바보",
                name_en: "The Fool",
                arcana: "Major",
                rank: 0,
                meaning_up: "새로운 시작, 모험, 순수함",
                meaning_rev: "무모함, 경솔함, 위험",
                image: "images/00-TheFool.jpg"
            },
            {
                id: "MA1",
                name_ko: "마법사",
                name_en: "The Magician",
                arcana: "Major",
                rank: 1,
                meaning_up: "능력, 집중, 창조적 힘",
                meaning_rev: "미숙함, 속임수, 능력 부족",
                image: "images/01-TheMagician.jpg"
            },
            {
                id: "MA2",
                name_ko: "고위 여사제",
                name_en: "The High Priestess",
                arcana: "Major",
                rank: 2,
                meaning_up: "직관, 신비, 잠재의식",
                meaning_rev: "표면적 지식, 감정 불안",
                image: "images/02-TheHighPriestess.jpg"
            },
            {
                id: "MA3",
                name_ko: "여황제",
                name_en: "The Empress",
                arcana: "Major",
                rank: 3,
                meaning_up: "풍요, 모성, 창조",
                meaning_rev: "의존성, 과보호, 불안정",
                image: "images/03-TheEmpress.jpg"
            },
            {
                id: "MA4",
                name_ko: "황제",
                name_en: "The Emperor",
                arcana: "Major",
                rank: 4,
                meaning_up: "권위, 안정, 리더십",
                meaning_rev: "폭정, 경직성, 과도한 통제",
                image: "images/04-TheEmperor.jpg"
            },
            {
                id: "MA21",
                name_ko: "세계",
                name_en: "The World",
                arcana: "Major",
                rank: 21,
                meaning_up: "완성, 성취, 조화",
                meaning_rev: "미완성, 지연, 불만족",
                image: "images/21-TheWorld.jpg"
            }
        ];
    }
    
    // 랜덤 질문 생성
    createRandomQuestions() {
        return [
            // 일반적인 인생 질문
            "나의 미래는 어떻게 전개될까요?",
            "현재 나에게 가장 필요한 것은 무엇일까요?",
            "지금 내가 집중해야 할 것은 무엇일까요?",
            "나를 기다리고 있는 기회는 무엇일까요?",
            "현재 상황에서 나는 어떤 선택을 해야 할까요?",
            
            // 사랑과 관계
            "나의 연애운은 어떨까요?",
            "내 인생에 진정한 사랑이 언제 찾아올까요?",
            "현재 관계에서 주의해야 할 점은 무엇일까요?",
            "가족 관계에서 개선해야 할 부분이 있을까요?",
            "새로운 인연을 만날 수 있을까요?",
            
            // 직업과 성공
            "직장에서의 나의 미래는 어떨까요?",
            "새로운 도전을 시작해도 될까요?",
            "현재 하고 있는 일이 나에게 맞는 길인가요?",
            "승진이나 발전의 기회가 있을까요?",
            "부업이나 새로운 수입원을 만들어도 될까요?",
            
            // 개인적 성장
            "내가 극복해야 할 약점은 무엇일까요?",
            "나의 숨겨진 능력은 무엇일까요?",
            "자신감을 향상시키기 위해 무엇을 해야 할까요?",
            "내 인생의 목적은 무엇일까요?",
            "과거의 상처에서 벗어나려면 어떻게 해야 할까요?",
            
            // 금전과 물질
            "경제적 상황이 개선될까요?",
            "투자와 재정 관리에 대한 조언을 주세요.",
            "큰 구매 결정을 내려도 될까요?",
            "돈 관련 문제의 해결책은 무엇일까요?",
            
            // 건강과 웰빙
            "내 건강 상태는 주의해야 할 점이 있을까요?",
            "스트레스를 줄이는 방법은 무엇일까요?",
            "정신적 평화를 찾으려면 어떻게 해야 할까요?",
            "라이프 밸런스를 맞추는 방법은 무엇일까요?"
        ];
    }
    
    // 카드 셔플
    shuffleCards() {
        const shuffled = [...this.cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // 랜덤 카드 뽑기
    drawRandomCard() {
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        const card = this.cards[randomIndex];
        const isReversed = Math.random() < 0.3; // 30% 확률로 역방향
        
        return {
            ...card,
            reversed: isReversed,
            meaning: isReversed ? card.meaning_rev : card.meaning_up
        };
    }
    
    // 원 카드 리딩
    oneCardReading() {
        const question = this.getRandomQuestion();
        const card = this.drawRandomCard();
        
        return {
            question: question,
            card: card,
            interpretation: this.generateSimpleInterpretation(card, question)
        };
    }
    
    // 쓰리 카드 스프레드 (과거-현재-미래)
    threeCardSpread() {
        const shuffled = this.shuffleCards();
        const spread = [];
        
        const positions = ["과거", "현재", "미래"];
        
        for (let i = 0; i < 3; i++) {
            const card = shuffled[i];
            const isReversed = Math.random() < 0.3;
            
            spread.push({
                position: positions[i],
                ...card,
                reversed: isReversed,
                meaning: isReversed ? card.meaning_rev : card.meaning_up
            });
        }
        
        this.currentSpread = spread;
        return spread;
    }
    
    // 랜덤 질문 가져오기
    getRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * this.randomQuestions.length);
        return this.randomQuestions[randomIndex];
    }
    
    // 간단한 해석 생성
    generateSimpleInterpretation(card, question) {
        const interpretations = [
            `${card.name_ko} 카드가 나타나 ${card.meaning}를 시사합니다.`,
            `이 카드는 ${card.meaning}와 관련된 에너지를 보여줍니다.`,
            `${card.name_ko}는 현재 상황에서 ${card.meaning}의 중요성을 강조합니다.`,
            `카드가 전하는 메시지는 ${card.meaning}에 주목하라는 것입니다.`
        ];
        
        const randomIndex = Math.floor(Math.random() * interpretations.length);
        return interpretations[randomIndex];
    }
    
    // 카드 이미지 경로 가져오기
    getCardImagePath(card) {
        if (!card) return 'images/CardBacks.jpg';
        
        // 기본 이미지 경로 반환
        return card.image || 'images/CardBacks.jpg';
    }
    
    // 특정 카드 찾기
    findCard(id) {
        return this.cards.find(card => card.id === id);
    }
    
    // 카드 추가 (동적으로 카드 데이터를 확장할 때 사용)
    addCard(cardData) {
        if (cardData && cardData.id && !this.findCard(cardData.id)) {
            this.cards.push(cardData);
            return true;
        }
        return false;
    }
    
    // 전체 카드 데이터 업데이트
    updateCards(newCardsData) {
        if (Array.isArray(newCardsData) && newCardsData.length > 0) {
            this.cards = newCardsData;
            console.log('카드 데이터 업데이트 완료:', this.cards.length, '개의 카드');
            return true;
        }
        return false;
    }
    
    // 시스템 상태 확인
    getSystemStatus() {
        return {
            isReady: this.isReady,
            cardCount: this.cards.length,
            questionCount: this.randomQuestions.length,
            hasCurrentSpread: this.currentSpread.length > 0
        };
    }
    
    // 디버그 정보
    debugInfo() {
        console.log('SimpleTarotSystem Debug Info:');
        console.log('- 카드 수:', this.cards.length);
        console.log('- 질문 수:', this.randomQuestions.length);
        console.log('- 현재 스프레드:', this.currentSpread);
        console.log('- 시스템 준비 상태:', this.isReady);
    }
}

// 유틸리티 함수들
const TarotUtils = {
    // 카드 방향 결정 (정방향/역방향)
    determineCardOrientation() {
        return Math.random() < 0.7; // 70% 확률로 정방향
    },
    
    // 카드 의미 포맷팅
    formatCardMeaning(card, isReversed = false) {
        const meaning = isReversed ? card.meaning_rev : card.meaning_up;
        const orientation = isReversed ? "역방향" : "정방향";
        return `${card.name_ko} (${orientation}): ${meaning}`;
    },
    
    // 간단한 날짜 포맷
    formatDate(date = new Date()) {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // 랜덤 조언 생성
    generateRandomAdvice() {
        const advices = [
            "마음을 열고 새로운 가능성을 받아들이세요.",
            "직감을 믿고 내면의 목소리에 귀 기울이세요.",
            "현재에 집중하며 과거에 얽매이지 마세요.",
            "용기를 가지고 한 걸음씩 나아가세요.",
            "변화를 두려워하지 말고 기회로 받아들이세요.",
            "균형을 찾고 조화로운 삶을 추구하세요.",
            "인내심을 가지고 때를 기다리세요.",
            "자신을 믿고 내재된 힘을 발휘하세요."
        ];
        
        const randomIndex = Math.floor(Math.random() * advices.length);
        return advices[randomIndex];
    }
};

// 전역 인스턴스 생성
const simpleTarot = new SimpleTarotSystem();

// 간편 함수들 (기존 코드와의 호환성을 위해)
function drawCard() {
    return simpleTarot.drawRandomCard();
}

function getRandomQuestion() {
    return simpleTarot.getRandomQuestion();
}

function performOneCardReading() {
    return simpleTarot.oneCardReading();
}

function performThreeCardReading() {
    return simpleTarot.threeCardSpread();
}

// 모듈로 내보내기 (필요한 경우)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SimpleTarotSystem,
        TarotUtils,
        simpleTarot,
        drawCard,
        getRandomQuestion,
        performOneCardReading,
        performThreeCardReading
    };
}
