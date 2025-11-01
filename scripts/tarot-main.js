// Main Tarot System
const majorImageMap = {
    "MA0": "00-TheFool.jpg", "MA1": "01-TheMagician.jpg", "MA2": "02-TheHighPriestess.jpg",
    "MA3": "03-TheEmpress.jpg", "MA4": "04-TheEmperor.jpg", "MA5": "05-TheHierophant.jpg",
    "MA6": "06-TheLovers.jpg", "MA7": "07-TheChariot.jpg", "MA8": "08-Strength.jpg",
    "MA9": "09-TheHermit.jpg", "MA10": "10-WheelOfFortune.jpg", "MA11": "11-Justice.jpg",
    "MA12": "12-TheHangedMan.jpg", "MA13": "13-Death.jpg", "MA14": "14-Temperance.jpg",
    "MA15": "15-TheDevil.jpg", "MA16": "16-TheTower.jpg", "MA17": "17-TheStar.jpg",
    "MA18": "18-TheMoon.jpg", "MA19": "19-TheSun.jpg", "MA20": "20-Judgement.jpg",
    "MA21": "21-TheWorld.jpg"
};

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
        return 'images/CardBacks.jpg';
    }

    getMeaning() {
        return this.reversed ? this.meaning_rev : this.meaning_up;
    }
}

class TarotCardManager {
    constructor() {
        this.cards = [];
        this.isLoaded = false;
    }

    async loadCards() {
        if (this.isLoaded) return;
        try {
            if (typeof FULL_TAROT_CARDS !== 'undefined') {
                this.cards = FULL_TAROT_CARDS.map(cardData => 
                    new TarotCard(
                        cardData.id, cardData.name_ko, cardData.name_en,
                        cardData.meaning_up, cardData.meaning_rev, cardData.arcana,
                        cardData.rank, cardData.suit, cardData.image
                    )
                );
                this.isLoaded = true;
                return;
            }
            this.loadDefaultCards();
        } catch (error) {
            console.error('Card loading error:', error);
            this.loadDefaultCards();
        }
    }

    loadDefaultCards() {
        this.cards = [
            new TarotCard("MA0", "바보", "The Fool", "새로운 시작, 모험", "무모함, 부주의", "Major", 0, null, "images/00-TheFool.jpg")
        ];
        this.isLoaded = true;
    }

    drawRandomCard() {
        if (!this.isLoaded || this.cards.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        const card = this.cards[randomIndex];
        if (Math.random() < 0.3) card.reversed = true;
        return card;
    }

    getAllCards() {
        return this.cards;
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
    return card.getImagePath ? card.getImagePath() : 'images/CardBacks.jpg';
}