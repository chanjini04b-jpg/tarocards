// 타로 카드 시스템 - 메인 파일

// 메이저 아르카나 이미지 매핑
const majorImageMap = {
    "MA0": "00-TheFool.jpg",
    "MA1": "01-TheMagician.jpg", 
    "MA2": "02-TheHighPriestess.jpg",
    "MA3": "03-TheEmpress.jpg",
    "MA4": "04-TheEmperor.jpg",
    "MA5": "05-TheHierophant.jpg",
    "MA6": "06-TheLovers.jpg",
    "MA7": "07-TheChariot.jpg",
    "MA8": "08-Strength.jpg",
    "MA9": "09-TheHermit.jpg",
    "MA10": "10-WheelOfFortune.jpg",
    "MA11": "11-Justice.jpg",
    "MA12": "12-TheHangedMan.jpg",
    "MA13": "13-Death.jpg",
    "MA14": "14-Temperance.jpg",
    "MA15": "15-TheDevil.jpg",
    "MA16": "16-TheTower.jpg",
    "MA17": "17-TheStar.jpg",
    "MA18": "18-TheMoon.jpg",
    "MA19": "19-TheSun.jpg",
    "MA20": "20-Judgement.jpg",
    "MA21": "21-TheWorld.jpg"
};

// 타로 카드 클래스
class TarotCard {
    constructor(id, name_ko, name_en, meaning_up, meaning_rev, arcana, rank = null, suit = null, image = null) {
        this.id = id;
        this.name_ko = name_ko;
        this.name_en = name_en;
        this.meaning_up = meaning_up;
        this.meaning_rev = meaning_rev;
        this.arcana = arcana;
        this.rank = rank;
        this.suit = suit;
        this.image = image;
        this.reversed = false;
    }

    getImagePath() {
        if (this.image) {
            return this.image.startsWith('images/') ? this.image : `images/${this.image}`;
        }

        if (this.arcana === 'Major') {
            return `images/${majorImageMap[this.id] || "CardBacks.jpg"}`;
        }
        
        if (this.name_en) {
            return `images/${this.name_en}.jpg`;
        }
        
        return 'images/CardBacks.jpg';
    }

    getMeaning() {
        return this.reversed ? this.meaning_rev : this.meaning_up;
    }

    flip() {
        this.reversed = !this.reversed;
    }
}

// 카드 이미지 경로 생성 함수
function generateImageUrl(card) {
    if (card.arcana === 'Major') {
        const majorArcanaMapping = {
            "MA0": "00-TheFool.jpg", "MA1": "01-TheMagician.jpg", "MA2": "02-TheHighPriestess.jpg",
            "MA3": "03-TheEmpress.jpg", "MA4": "04-TheEmperor.jpg", "MA5": "05-TheHierophant.jpg",
            "MA6": "06-TheLovers.jpg", "MA7": "07-TheChariot.jpg", "MA8": "08-Strength.jpg",
            "MA9": "09-TheHermit.jpg", "MA10": "10-WheelOfFortune.jpg", "MA11": "11-Justice.jpg",
            "MA12": "12-TheHangedMan.jpg", "MA13": "13-Death.jpg", "MA14": "14-Temperance.jpg",
            "MA15": "15-TheDevil.jpg", "MA16": "16-TheTower.jpg", "MA17": "17-TheStar.jpg",
            "MA18": "18-TheMoon.jpg", "MA19": "19-TheSun.jpg", "MA20": "20-Judgement.jpg",
            "MA21": "21-TheWorld.jpg"
        };
        return `images/${majorArcanaMapping[card.id]}`;
    }
    
    if (card.image_url && card.image_url.startsWith('images/')) {
        return card.image_url;
    } else {
        return card.image_url ? `images/${card.image_url}` : 'images/CardBacks.jpg';
    }
}

// 타로 카드 매니저 클래스
class TarotCardManager {
    constructor() {
        this.cards = [];
        this.backgrounds = [];
        this.isLoaded = false;
    }

    async loadCards() {
        if (this.isLoaded) return;

        try {
            if (typeof FULL_TAROT_CARDS !== 'undefined') {
                this.cards = FULL_TAROT_CARDS.map(cardData => 
                    new TarotCard(
                        cardData.id,
                        cardData.name_ko,
                        cardData.name_en,
                        cardData.meaning_up,
                        cardData.meaning_rev,
                        cardData.arcana,
                        cardData.rank,
                        cardData.suit,
                        cardData.image
                    )
                );
                this.isLoaded = true;
                return;
            }

            const response = await fetch('tarot_cards.json');
            if (!response.ok) {
                throw new Error(`카드 데이터 로드 실패: ${response.status}`);
            }
            
            const cardsData = await response.json();
            this.cards = cardsData.map(cardData => 
                new TarotCard(
                    cardData.id,
                    cardData.name_ko,
                    cardData.name_en,
                    cardData.meaning_up,
                    cardData.meaning_rev,
                    cardData.arcana || 'Major',
                    cardData.rank,
                    cardData.suit,
                    cardData.image
                )
            );

            this.isLoaded = true;
        } catch (error) {
            console.error('카드 데이터 로드 오류:', error);
            this.loadDefaultCards();
        }
    }

    loadDefaultCards() {
        this.cards = [
            new TarotCard("MA0", "바보", "The Fool", "새로운 시작, 모험, 순수", "무모함, 부주의", "Major", 0, null, "images/00-TheFool.jpg"),
            new TarotCard("MA1", "마법사", "The Magician", "능력, 행동, 집중", "미숙함, 속임수", "Major", 1, null, "images/01-TheMagician.jpg")
        ];
        this.isLoaded = true;
    }

    drawRandomCard() {
        if (!this.isLoaded || this.cards.length === 0) {
            console.error('카드가 로드되지 않았습니다.');
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        const card = this.cards[randomIndex];
        
        if (Math.random() < 0.3) {
            card.reversed = true;
        }
        
        return card;
    }

    getAllCards() {
        return this.cards;
    }

    getCardCount() {
        return this.cards.length;
    }
}

let tarotManager = null;

async function initializeTarotManager() {
    if (!tarotManager) {
        tarotManager = new TarotCardManager();
        await tarotManager.loadCards();
    }
    return tarotManager;
}

function getCardImagePath(card) {
    if (!card) return 'images/CardBacks.jpg';
    
    if (card.getImagePath) {
        return card.getImagePath();
    }
    
    return generateImageUrl(card);
}