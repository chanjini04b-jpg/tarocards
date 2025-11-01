// Tarot Dictionary System - Clean Version
class TarotDictionary {
    constructor() {
        this.cards = [];
        this.filteredCards = [];
        this.currentFilter = "all";
        this.currentView = "grid";
        this.isLoaded = false;
        
        console.log("TarotDictionary constructor started");
        this.init();
    }

    async init() {
        try {
            await this.loadCards();
            this.setupEventListeners();
            this.renderCards();
            console.log("Tarot dictionary initialization complete. Total cards:", this.cards.length);
        } catch (error) {
            console.error("Tarot dictionary initialization error:", error);
        }
    }

    async loadCards() {
        try {
            if (typeof FULL_TAROT_CARDS !== "undefined" && FULL_TAROT_CARDS.length > 0) {
                this.cards = FULL_TAROT_CARDS;
                console.log("Loaded from FULL_TAROT_CARDS:", this.cards.length, "cards");
            } else {
                try {
                    const response = await fetch("tarot_cards.json");
                    if (response.ok) {
                        this.cards = await response.json();
                        console.log("Loaded from JSON file:", this.cards.length, "cards");
                    } else {
                        throw new Error("JSON file load failed");
                    }
                } catch (fetchError) {
                    console.warn("JSON file load failed, using default data:", fetchError);
                    this.loadDefaultCards();
                }
            }

            this.filteredCards = [...this.cards];
            this.isLoaded = true;

        } catch (error) {
            console.error("Card loading error:", error);
            this.loadDefaultCards();
        }
    }

    loadDefaultCards() {
        this.cards = [
            {
                id: "MA0", arcana: "Major", name_ko: "바보", name_en: "The Fool", rank: 0,
                meaning_up: "새로운 시작, 모험, 순수, 잠재력, 자유",
                meaning_rev: "무모함, 부주의, 위험, 경솔, 혼돈",
                image: "images/00-TheFool.jpg"
            },
            {
                id: "MA1", arcana: "Major", name_ko: "마법사", name_en: "The Magician", rank: 1,
                meaning_up: "능력, 행동, 집중, 숙련, 창조적인 힘",
                meaning_rev: "미숙함, 속임수, 능력 부족, 망설임",
                image: "images/01-TheMagician.jpg"
            }
        ];

        this.filteredCards = [...this.cards];
        this.isLoaded = true;
        console.log("Using default card data:", this.cards.length, "cards");
    }

    setupEventListeners() {
        const filterButtons = document.querySelectorAll(".filter-btn");
        filterButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const filter = e.target.dataset.filter;
                if (filter) {
                    this.setFilter(filter);
                }
            });
        });

        const viewButtons = document.querySelectorAll(".view-btn");
        viewButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const view = e.target.dataset.view;
                if (view) {
                    this.setView(view);
                }
            });
        });

        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                this.searchCards(e.target.value);
            });
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
        });
        
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) {
            activeBtn.classList.add("active");
        }

        this.applyFilters();
    }

    setView(view) {
        this.currentView = view;
        
        document.querySelectorAll(".view-btn").forEach(btn => {
            btn.classList.remove("active");
        });
        
        const activeBtn = document.querySelector(`[data-view="${view}"]`);
        if (activeBtn) {
            activeBtn.classList.add("active");
        }

        this.renderCards();
    }

    applyFilters() {
        let filtered = [...this.cards];

        if (this.currentFilter !== "all") {
            if (this.currentFilter === "major") {
                filtered = filtered.filter(card => card.arcana === "Major");
            } else if (this.currentFilter === "minor") {
                filtered = filtered.filter(card => card.arcana === "Minor");
            }
        }

        this.filteredCards = filtered;
        this.renderCards();
    }

    searchCards(query) {
        if (!query.trim()) {
            this.applyFilters();
            return;
        }

        const searchTerm = query.toLowerCase().trim();
        this.filteredCards = this.cards.filter(card => 
            card.name_ko.toLowerCase().includes(searchTerm) ||
            card.name_en.toLowerCase().includes(searchTerm) ||
            card.meaning_up.toLowerCase().includes(searchTerm) ||
            card.meaning_rev.toLowerCase().includes(searchTerm)
        );

        this.renderCards();
    }

    renderCards() {
        const container = document.getElementById("cardGrid");
        if (!container) {
            console.error("cardGrid container not found");
            return;
        }

        container.innerHTML = "";
        
        if (this.filteredCards.length === 0) {
            container.innerHTML = '<div class="no-results"><p>검색 결과가 없습니다.</p></div>';
            this.updateCardCount();
            return;
        }

        container.className = this.currentView === "grid" ? "card-grid" : "card-list";

        this.filteredCards.forEach(card => {
            const cardElement = this.createCardElement(card);
            container.appendChild(cardElement);
        });

        this.updateCardCount();
    }

    createCardElement(card) {
        const cardDiv = document.createElement("div");
        cardDiv.className = this.currentView === "grid" ? "dictionary-card" : "dictionary-card-list";
        
        const imagePath = this.getCardImagePath(card);
        
        if (this.currentView === "grid") {
            cardDiv.innerHTML = `
                <div class="card-image-container">
                    <img src="${imagePath}" alt="${card.name_ko}" class="card-image" 
                         onerror="this.src='images/CardBacks.jpg'">
                    <div class="card-overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
                <div class="card-info">
                    <h3 class="card-name">${card.name_ko}</h3>
                    <p class="card-name-en">${card.name_en}</p>
                    <div class="card-meanings">
                        <p class="meaning-up"><strong>정방향:</strong> ${card.meaning_up}</p>
                        <p class="meaning-rev"><strong>역방향:</strong> ${card.meaning_rev}</p>
                    </div>
                    <p class="card-arcana">${card.arcana} Arcana</p>
                </div>
            `;
        } else {
            cardDiv.innerHTML = `
                <div class="list-card-image">
                    <img src="${imagePath}" alt="${card.name_ko}" 
                         onerror="this.src='images/CardBacks.jpg'">
                </div>
                <div class="list-card-content">
                    <div class="list-card-header">
                        <h3 class="card-name">${card.name_ko}</h3>
                        <p class="card-name-en">${card.name_en}</p>
                        <span class="card-arcana">${card.arcana}</span>
                    </div>
                    <div class="list-card-meanings">
                        <p class="meaning-up"><strong>정방향:</strong> ${card.meaning_up}</p>
                        <p class="meaning-rev"><strong>역방향:</strong> ${card.meaning_rev}</p>
                    </div>
                </div>
            `;
        }

        cardDiv.addEventListener("click", () => {
            this.showCardModal(card);
        });

        return cardDiv;
    }

    getCardImagePath(card) {
        if (card.image) {
            return card.image.startsWith("images/") ? card.image : `images/${card.image}`;
        }

        if (card.arcana === "Major" && typeof card.rank === "number") {
            const cardNumber = String(card.rank).padStart(2, "0");
            const cardName = card.name_en.replace(/\s+/g, "");
            return `images/${cardNumber}-${cardName}.jpg`;
        }

        if (card.arcana === "Minor" && card.suit && card.rank) {
            const suitName = card.suit;
            const cardNumber = String(card.rank).padStart(2, "0");
            return `images/${suitName}${cardNumber}.jpg`;
        }

        return "images/CardBacks.jpg";
    }

    showCardModal(card) {
        if (typeof showCardModal === "function") {
            showCardModal(card);
        } else {
            const modalContent = `
                ${card.name_ko} (${card.name_en})
                
                정방향: ${card.meaning_up}
                역방향: ${card.meaning_rev}
                
                아르카나: ${card.arcana}
            `;
            alert(modalContent);
        }
    }

    updateCardCount() {
        const countElement = document.getElementById("cardCount");
        if (countElement) {
            countElement.textContent = `총 ${this.filteredCards.length}장의 카드`;
        }

        const statusElement = document.getElementById("dictionaryStatus");
        if (statusElement) {
            statusElement.textContent = `${this.cards.length}장 중 ${this.filteredCards.length}장 표시`;
        }
    }

    getAllCards() {
        return this.cards;
    }

    getFilteredCards() {
        return this.filteredCards;
    }

    getTotalCount() {
        return this.cards.length;
    }

    getFilteredCount() {
        return this.filteredCards.length;
    }

    debug() {
        console.log("=== Tarot Dictionary Debug Info ===");
        console.log("Total cards:", this.cards.length);
        console.log("Filtered cards:", this.filteredCards.length);
        console.log("Current filter:", this.currentFilter);
        console.log("Current view:", this.currentView);
        console.log("Loaded:", this.isLoaded);
        console.log("FULL_TAROT_CARDS exists:", typeof FULL_TAROT_CARDS !== "undefined");
        if (typeof FULL_TAROT_CARDS !== "undefined") {
            console.log("FULL_TAROT_CARDS size:", FULL_TAROT_CARDS.length);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded - Starting tarot dictionary initialization");
    
    if (typeof window.tarotDictionary === "undefined") {
        window.tarotDictionary = new TarotDictionary();
        console.log("New tarot dictionary instance created");
    } else {
        console.log("Using existing tarot dictionary instance");
    }
});

window.debugTarotDictionary = function() {
    if (window.tarotDictionary) {
        window.tarotDictionary.debug();
    } else {
        console.log("No tarot dictionary instance found.");
    }
};

window.TarotDictionary = TarotDictionary;
