/**
 * 공통 타로 카드 데이터 관리자
 * 모든 메뉴에서 78장의 타로 카드 데이터를 일관되게 사용할 수 있도록 지원
 */
class TarotCardManager {
    constructor() {
        this.cards = [];
        this.majorArcana = [];
        this.minorArcana = [];
        this.isLoaded = false;
    }

    /**
     * 타로 카드 데이터 로딩
     */
    async loadCards() {
        if (this.isLoaded) {
            return this.cards;
        }

        try {
            const response = await fetch('tarot_cards.json');
            if (response.ok) {
                this.cards = await response.json();
                this.procesCards();
                this.isLoaded = true;
                console.log('타로 카드 데이터 로딩 완료:', this.cards.length, '장');
                return this.cards;
            } else {
                throw new Error('타로 카드 JSON 파일 로딩 실패');
            }
        } catch (error) {
            console.error('타로 카드 데이터 로딩 오류:', error);
            this.loadFallbackData();
            return this.cards;
        }
    }

    /**
     * 카드 데이터 처리 및 분류
     */
    procesCards() {
        this.majorArcana = this.cards.filter(card => card.arcana === 'Major');
        this.minorArcana = this.cards.filter(card => card.arcana === 'Minor');
        
        // 이미지 경로가 없는 경우 기본 경로 설정
        this.cards = this.cards.map(card => ({
            ...card,
            image: card.image || this.generateImagePath(card)
        }));
    }

    /**
     * 이미지 경로 생성
     */
    generateImagePath(card) {
        if (card.arcana === 'Major') {
            const number = card.rank.toString().padStart(2, '0');
            return `image2/${number}-${card.name_en.replace(/\s+/g, '')}.jpg`;
        } else {
            // 마이너 아르카나
            const suitMap = {
                'Wands': 'Wands',
                'Cups': 'Cups', 
                'Swords': 'Swords',
                'Pentacles': 'Pentacles'
            };
            
            const suit = suitMap[card.suit] || 'Wands';
            const rank = card.rank.toString().padStart(2, '0');
            return `image2/${suit}${rank}.jpg`;
        }
    }

    /**
     * 폴백 데이터 (로딩 실패 시)
     */
    loadFallbackData() {
        this.cards = [
            { id: "MA0", arcana: "Major", name_ko: "바보", name_en: "The Fool", rank: 0, image: "image2/00-TheFool.jpg" },
            { id: "MA1", arcana: "Major", name_ko: "마법사", name_en: "The Magician", rank: 1, image: "image2/01-TheMagician.jpg" },
            // ... 추가 필요시 확장
        ];
        this.procesCards();
        this.isLoaded = true;
    }

    /**
     * 모든 카드 반환
     */
    getAllCards() {
        return this.cards;
    }

    /**
     * 메이저 아르카나만 반환
     */
    getMajorArcana() {
        return this.majorArcana;
    }

    /**
     * 마이너 아르카나만 반환
     */
    getMinorArcana() {
        return this.minorArcana;
    }

    /**
     * 특정 수트의 카드만 반환
     */
    getCardsBySuit(suit) {
        return this.minorArcana.filter(card => card.suit === suit);
    }

    /**
     * ID로 카드 검색
     */
    getCardById(id) {
        return this.cards.find(card => card.id === id);
    }

    /**
     * 랜덤 카드 선택
     */
    getRandomCard() {
        return this.cards[Math.floor(Math.random() * this.cards.length)];
    }

    /**
     * 랜덤 카드 여러 장 선택
     */
    getRandomCards(count = 1) {
        const shuffled = [...this.cards].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    /**
     * 가로형 이미지 CSS 클래스 추가
     */
    getImageStyle() {
        return {
            'object-fit': 'cover',
            'object-position': 'center top',
            'aspect-ratio': '3/2',
            'border-radius': '8px'
        };
    }
}

// 전역 인스턴스 생성
window.tarotCardManager = new TarotCardManager();

// DOM 로딩 완료 시 카드 데이터 자동 로딩
document.addEventListener('DOMContentLoaded', async () => {
    await window.tarotCardManager.loadCards();
    console.log('타로 카드 매니저 초기화 완료');
});