// Tarot Dictionary System
class TarotDictionary {
    constructor() {
        this.cards = [];
        this.filteredCards = [];
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.isLoaded = false;
        console.log('TarotDictionary 생성자 실행됨');
        this.init();
    }

    async init() {
        try {
            await this.loadCards();
            this.setupEventListeners();
            this.renderCards();
            console.log('타로사전 초기화 완료');
        } catch (error) {
            console.error('타로사전 초기화 오류:', error);
        }
    }

    async loadCards() {
        try {
            // 먼저 FULL_TAROT_CARDS 사용 시도
            if (typeof FULL_TAROT_CARDS !== 'undefined' && FULL_TAROT_CARDS.length > 0) {
                this.cards = FULL_TAROT_CARDS;
                console.log('JavaScript FULL_TAROT_CARDS 로딩 성공:', this.cards.length, '장');
            } else {
                // 백업: JSON 파일에서 로드
                const response = await fetch('tarot_cards.json');
                if (response.ok) {
                    this.cards = await response.json();
                    console.log('JSON 파일 로딩 성공:', this.cards.length, '장');
                } else {
                    // 최후의 수단: 기본 카드 데이터
                    this.loadDefaultCards();
                }
            }

            this.filteredCards = [...this.cards];
            this.isLoaded = true;
            console.log('카드 데이터 로딩 완료:', this.cards.length, '장');

        } catch (error) {
            console.error('카드 로딩 오류:', error);
            this.loadDefaultCards();
        }
    }

    loadDefaultCards() {
        this.cards = [
            {
                "id": "MA0",
                "arcana": "Major",
                "name_ko": "바보",
                "name_en": "The Fool",
                "rank": 0,
                "meaning_up": "새로운 시작, 모험, 순수, 잠재력, 자유",
                "meaning_rev": "무모함, 부주의, 위험, 경솔, 혼돈",
                "image": "images/00-TheFool.jpg"
            },
            {
                "id": "MA1", 
                "arcana": "Major",
                "name_ko": "마법사",
                "name_en": "The Magician",
                "rank": 1,
                "meaning_up": "능력, 행동, 집중, 숙련, 창조적인 힘",
                "meaning_rev": "미숙함, 속임수, 능력 부족, 망설임",
                "image": "images/01-TheMagician.jpg"
            }
        ];
        this.filteredCards = [...this.cards];
        this.isLoaded = true;
        console.log('기본 카드 데이터 사용:', this.cards.length, '장');
    }

    setupEventListeners() {
        // 필터 버튼들
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });

        // 뷰 전환 버튼들
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.setView(view);
            });
        });

        // 검색 입력
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchCards(e.target.value);
            });
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // 버튼 활성화 상태 업데이트
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.applyFilters();
    }

    setView(view) {
        this.currentView = view;
        
        // 버튼 활성화 상태 업데이트
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        this.renderCards();
    }

    applyFilters() {
        let filtered = [...this.cards];

        // 아르카나 필터
        if (this.currentFilter !== 'all') {
            if (this.currentFilter === 'major') {
                filtered = filtered.filter(card => card.arcana === 'Major');
            } else if (this.currentFilter === 'minor') {
                filtered = filtered.filter(card => card.arcana === 'Minor');
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

        const searchTerm = query.toLowerCase();
        this.filteredCards = this.cards.filter(card => 
            card.name_ko.toLowerCase().includes(searchTerm) ||
            card.name_en.toLowerCase().includes(searchTerm) ||
            card.meaning_up.toLowerCase().includes(searchTerm) ||
            card.meaning_rev.toLowerCase().includes(searchTerm)
        );

        this.renderCards();
    }

    renderCards() {
        const container = document.getElementById('cardGrid');
        if (!container) {
            console.error('cardGrid 컨테이너를 찾을 수 없습니다');
            return;
        }

        container.innerHTML = '';
        
        if (this.filteredCards.length === 0) {
            container.innerHTML = '<p class="no-results">검색 결과가 없습니다.</p>';
            return;
        }

        this.filteredCards.forEach(card => {
            const cardElement = this.createCardElement(card);
            container.appendChild(cardElement);
        });

        // 카드 개수 업데이트
        this.updateCardCount();
    }

    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = this.currentView === 'grid' ? 'dictionary-card' : 'dictionary-card-list';
        
        const imagePath = this.getCardImagePath(card);
        
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

        // 카드 클릭 이벤트
        cardDiv.addEventListener('click', () => {
            this.showCardModal(card);
        });

        return cardDiv;
    }

    getCardImagePath(card) {
        if (card.image) {
            return card.image.startsWith('images/') ? card.image : `images/${card.image}`;
        }

        // 메이저 아르카나의 경우
        if (card.arcana === 'Major') {
            const cardNumber = String(card.rank).padStart(2, '0');
            const cardName = card.name_en.replace(/\s+/g, '');
            return `images/${cardNumber}-${cardName}.jpg`;
        }

        // 마이너 아르카나의 경우
        if (card.suit && card.rank) {
            const suitName = card.suit;
            const cardNumber = String(card.rank).padStart(2, '0');
            return `images/${suitName}${cardNumber}.jpg`;
        }

        return 'images/CardBacks.jpg';
    }

    showCardModal(card) {
        // 기존 UI 헬퍼의 showCardModal 사용하거나 새로 구현
        if (typeof showCardModal === 'function') {
            showCardModal(card);
        } else {
            // 간단한 모달 구현
            alert(`${card.name_ko} (${card.name_en})\n\n정방향: ${card.meaning_up}\n역방향: ${card.meaning_rev}`);
        }
    }

    updateCardCount() {
        const countElement = document.getElementById('cardCount');
        if (countElement) {
            countElement.textContent = `총 ${this.filteredCards.length}장의 카드`;
        }
    }

    // 공개 메서드들
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
}

// 즉시 실행으로 타로사전 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - 타로사전 초기화 시작');
    if (typeof window.tarotDictionary === 'undefined') {
        window.tarotDictionary = new TarotDictionary();
        console.log('타로사전 인스턴스 생성 완료');
    }
});

// 디버깅용 전역 함수
window.debugTarotDictionary = function() {
    console.log('=== 타로사전 디버그 정보 ===');
    console.log('FULL_TAROT_CARDS 존재:', typeof FULL_TAROT_CARDS !== 'undefined');
    console.log('FULL_TAROT_CARDS 개수:', typeof FULL_TAROT_CARDS !== 'undefined' ? FULL_TAROT_CARDS.length : 0);
    console.log('TarotDictionary 존재:', typeof TarotDictionary !== 'undefined');
    console.log('tarotDictionary 인스턴스:', window.tarotDictionary);
    if (window.tarotDictionary) {
        console.log('로딩된 카드 수:', window.tarotDictionary.getTotalCount());
        console.log('필터된 카드 수:', window.tarotDictionary.getFilteredCount());
    }
};