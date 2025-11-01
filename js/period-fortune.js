// Period Fortune System - Weekly and Monthly Tarot Reading
class PeriodFortuneSystem {
    constructor() {
        this.periods = {
            weekly: { cards: 3, duration: 7 },
            monthly: { cards: 5, duration: 30 }
        };
        this.currentPeriod = 'weekly';
        this.currentWeekCards = null;
        this.currentMonthCards = null;
        
        this.init();
    }

    init() {
        // Add debug function to window
        window.debugPeriodFortune = () => {
            console.log('🔍 Debugging period fortune system...');
            const system = this.getTarotSystem();
            console.log('🔍 Current tarot system:', system);
            
            if (system && system.getAvailableCards) {
                const cards = system.getAvailableCards();
                console.log('🔍 Available cards:', cards);
                console.log('🔍 First 3 cards sample:');
                cards.slice(0, 3).forEach((card, i) => {
                    console.log(`🔍 Card ${i}:`, {
                        name: card.name,
                        name_en: card.name_en,
                        name_ko: card.name_ko,
                        id: card.id
                    });
                });
            } else {
                console.log('🔍 No tarot system found or no getAvailableCards method');
            }
        };
        
        this.setupEventListeners();
        this.updatePeriodDates();
        this.loadPeriodCards();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.period-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const period = e.currentTarget.dataset.period;
                this.switchPeriod(period);
            });
        });

        // Card drawing buttons
        document.getElementById('weeklyCardBtn').addEventListener('click', () => {
            this.drawPeriodCards('weekly');
        });

        document.getElementById('monthlyCardBtn').addEventListener('click', () => {
            this.drawPeriodCards('monthly');
        });
    }

    switchPeriod(period) {
        // Update tabs
        document.querySelectorAll('.period-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-period="${period}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.period-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${period}Content`).classList.add('active');

        this.currentPeriod = period;
    }

    updatePeriodDates() {
        const now = new Date();
        
        // Weekly date range
        const weekStart = this.getWeekStart(now);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        document.getElementById('weeklyDate').textContent = 
            `${this.formatDate(weekStart)} - ${this.formatDate(weekEnd)}`;

        // Monthly date range
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        
        document.getElementById('monthlyDate').textContent = 
            `${now.getFullYear()}년 ${now.getMonth() + 1}월`;
    }

    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
        return new Date(d.setDate(diff));
    }

    formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }

    getPeriodSeed(period) {
        const now = new Date();
        
        if (period === 'weekly') {
            const weekStart = this.getWeekStart(now);
            return `${weekStart.getFullYear()}-W${this.getWeekNumber(weekStart)}`;
        } else {
            return `${now.getFullYear()}-${now.getMonth() + 1}`;
        }
    }

    getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    seededRandom(seed) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            const char = seed.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        let x = Math.sin(Math.abs(hash)) * 10000;
        return x - Math.floor(x);
    }

    drawPeriodCards(period) {
        const seed = this.getPeriodSeed(period);
        const cardCount = this.periods[period].cards;
        
        // Check if cards already drawn for this period
        const storageKey = `${period}-cards-${seed}`;
        const storedCards = localStorage.getItem(storageKey);
        
        // 개발 중에는 캐시를 무시하고 항상 새로 생성 (나중에 제거 가능)
        // if (storedCards) {
        //     this.displayPeriodCards(period, JSON.parse(storedCards));
        //     return;
        // }

        // Draw new cards
        const cards = this.selectPeriodCards(seed, cardCount);
        
        // Store for consistency
        localStorage.setItem(storageKey, JSON.stringify(cards));
        
        // Display cards with animation
        this.displayPeriodCards(period, cards);
    }

    selectPeriodCards(seed, count) {
        const tarotSystem = this.getTarotSystem();
        console.log('Tarot system:', tarotSystem);
        
        const availableCards = tarotSystem.getAvailableCards();
        console.log('Available cards count:', availableCards.length);
        console.log('First 3 cards structure:', availableCards.slice(0, 3));
        
        const selectedCards = [];
        
        for (let i = 0; i < count; i++) {
            const cardSeed = `${seed}-card-${i}`;
            const randomValue = this.seededRandom(cardSeed);
            const cardIndex = Math.floor(randomValue * availableCards.length);
            
            console.log(`Selecting card ${i}: index ${cardIndex}`);
            
            // Determine if reversed (30% chance)
            const reversedSeed = `${cardSeed}-reversed`;
            const isReversed = this.seededRandom(reversedSeed) < 0.3;
            
            const originalCard = availableCards[cardIndex];
            console.log(`🎯 Original card ${i}:`, originalCard);
            
            const card = { ...originalCard };
            console.log(`🎯 Copied card ${i} before standardization:`, card);
            
            // 카드 이름 표준화 시도들 - 강제로 name 필드 설정
            console.log('🎯 Before name standardization:', {
                name: card.name,
                name_en: card.name_en,
                name_ko: card.name_ko,
                id: card.id
            });
            
            // 강제로 name 필드를 설정
            if (card.name_en) {
                card.name = card.name_en;
                console.log('🎯 Used name_en:', card.name);
            } else if (card.name_ko) {
                card.name = card.name_ko;
                console.log('🎯 Used name_ko:', card.name);
            } else if (card.id) {
                card.name = this.getCardNameFromId(card.id);
                console.log('🎯 Used ID mapping:', card.name);
            } else {
                card.name = `Card ${cardIndex}`;
                console.log('🎯 Used fallback name:', card.name);
            }
            
            // 확인: name 필드가 제대로 설정되었는지 강제 체크
            if (!card.name || card.name === 'undefined' || card.name === undefined) {
                card.name = card.name_en || card.name_ko || this.getCardNameFromId(card.id) || `Card ${cardIndex}`;
                console.log('🎯 FORCED name assignment:', card.name);
            }
            
            console.log('🎯 After name standardization:', {
                name: card.name,
                name_en: card.name_en,
                name_ko: card.name_ko,
                id: card.id
            });
            
            // 키워드 표준화
            if (!card.keywords && card.meaning_up) {
                card.keywords = card.meaning_up.split(', ');
            }
            
            // 의미 표준화
            if (!card.meaning && card.meaning_up) {
                card.meaning = card.meaning_up;
            }
            
            if (!card.reversedMeaning && card.meaning_down) {
                card.reversedMeaning = card.meaning_down;
            }
            
            // 역방향 키워드 표준화
            if (!card.reversedKeywords && card.keywords_reversed) {
                card.reversedKeywords = card.keywords_reversed;
            }
            
            card.reversed = isReversed;
            card.position = this.getPeriodPosition(i, count);
            
            console.log(`🎯 Final processed card ${i}:`, card);
            selectedCards.push(card);
        }
        
        console.log('🎯 All selected cards being returned:', selectedCards);
        selectedCards.forEach((card, index) => {
            console.log(`🎯 Return Card ${index}:`, {
                name: card.name,
                name_en: card.name_en,
                position: card.position,
                reversed: card.reversed
            });
        });
        
        return selectedCards;
    }
    
    getCardNameFromId(cardId) {
        // ID에서 카드 이름 추출
        const majorArcanaNames = {
            'MA0': 'The Fool',
            'MA1': 'The Magician',
            'MA2': 'The High Priestess',
            'MA3': 'The Empress',
            'MA4': 'The Emperor',
            'MA5': 'The Hierophant',
            'MA6': 'The Lovers',
            'MA7': 'The Chariot',
            'MA8': 'Strength',
            'MA9': 'The Hermit',
            'MA10': 'Wheel of Fortune',
            'MA11': 'Justice',
            'MA12': 'The Hanged Man',
            'MA13': 'Death',
            'MA14': 'Temperance',
            'MA15': 'The Devil',
            'MA16': 'The Tower',
            'MA17': 'The Star',
            'MA18': 'The Moon',
            'MA19': 'The Sun',
            'MA20': 'Judgement',
            'MA21': 'The World'
        };
        
        return majorArcanaNames[cardId] || `Card ${cardId}`;
    }

    getPeriodPosition(index, total) {
        if (total === 3) {
            return ['과거/기반', '현재/도전', '미래/결과'][index];
        } else if (total === 5) {
            return ['현재 상황', '도전과 장애', '숨겨진 영향', '조언과 방향', '최종 결과'][index];
        }
        return `위치 ${index + 1}`;
    }

    displayPeriodCards(period, cards) {
        const resultContainer = document.getElementById(`${period}CardResult`);
        const button = document.getElementById(`${period}CardBtn`);
        
        // Debug logging
        console.log(`Displaying ${period} cards:`, cards);
        cards.forEach((card, index) => {
            const imagePath = this.getCardImagePath(card);
            console.log(`Card ${index + 1} (${card.name}): ${imagePath}`);
        });
        
        // Hide button and show result
        button.style.display = 'none';
        resultContainer.style.display = 'block';
        
        resultContainer.innerHTML = this.generatePeriodCardHTML(cards, period);
        
        // Animate cards appearance
        setTimeout(() => {
            resultContainer.classList.add('animate-reveal');
        }, 100);
    }

    generatePeriodCardHTML(cards, period) {
        console.log('🎴 generatePeriodCardHTML received cards:', cards);
        cards.forEach((card, index) => {
            console.log(`🎴 Card ${index}:`, {
                name: card.name,
                name_en: card.name_en,
                name_ko: card.name_ko,
                id: card.id,
                position: card.position,
                reversed: card.reversed,
                allProps: Object.keys(card)
            });
        });
        
        const periodTitle = period === 'weekly' ? '주간' : '월간';
        
        let html = `
            <div class="period-result-header">
                <h4>${periodTitle} 타로 스프레드</h4>
                <p class="period-result-subtitle">
                    ${cards.length}장의 카드가 ${periodTitle.toLowerCase()} 운세를 말해줍니다
                </p>
            </div>
            
            <div class="period-cards-container">
        `;
        
        cards.forEach((card, index) => {
            const cardImage = this.getCardImagePath(card);
            const rotateClass = card.reversed ? 'card-reversed' : '';
            
            html += `
                <div class="period-card-item period-card-loading" style="animation-delay: ${index * 0.3}s;">
                    <div class="period-card-position">
                        <span class="position-number">${index + 1}</span>
                        <span class="position-name">${card.position}</span>
                    </div>
                    
                    <div class="period-card-visual">
                        <img src="${cardImage}" 
                             alt="${this.getCardDisplayName(card)}" 
                             class="period-card-image ${rotateClass}"
                             onload="this.parentElement.parentElement.classList.remove('period-card-loading');"
                             onerror="this.src='images/CardBacks.jpg'; this.parentElement.parentElement.classList.remove('period-card-loading');">
                    </div>
                    
                    <div class="period-card-meaning">
                        <h5 class="card-name">
                            ${this.getCardDisplayName(card)}
                            ${card.reversed ? ' (역방향)' : ''}
                        </h5>
                        
                        <div class="card-keywords">
                            <strong>핵심 키워드:</strong>
                            <span class="keywords-list">
                                ${this.getCardKeywords(card)}
                            </span>
                        </div>
                        
                        <div class="card-interpretation">
                            <p>${this.getPeriodInterpretation(card, index, period)}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
            </div>
            
            <div class="period-summary">
                <h5>종합 해석</h5>
                <p>${this.generatePeriodSummary(cards, period)}</p>
            </div>
            
            <div class="period-actions">
                <button class="period-redraw-btn" onclick="periodFortune.redrawPeriodCards('${period}')">
                    <i class="fas fa-sync-alt"></i>
                    다시 뽑기
                </button>
            </div>
        `;
        
        return html;
    }

    getCardImagePath(card) {
        console.log('🖼️ Getting image path for card:', card);
        
        // Use the global getCardImagePath function if available
        if (typeof window.getCardImagePath === 'function') {
            const globalPath = window.getCardImagePath(card);
            console.log('🖼️ Global function returned:', globalPath);
            return globalPath;
        }
        
        // Try multiple image locations based on card information
        const cardName = card.name || card.name_en || this.getCardDisplayName(card);
        console.log('🖼️ Using card name for image:', cardName);
        
        // Major Arcana mapping for Cards-jpg folder (numbered format)
        const majorArcanaMapping = {
            "The Fool": "00-TheFool.jpg",
            "The Magician": "01-TheMagician.jpg", 
            "The High Priestess": "02-TheHighPriestess.jpg",
            "The Empress": "03-TheEmpress.jpg",
            "The Emperor": "04-TheEmperor.jpg",
            "The Hierophant": "05-TheHierophant.jpg",
            "The Lovers": "06-TheLovers.jpg",
            "The Chariot": "07-TheChariot.jpg",
            "Strength": "08-Strength.jpg",
            "The Hermit": "09-TheHermit.jpg",
            "Wheel of Fortune": "10-WheelOfFortune.jpg",
            "Justice": "11-Justice.jpg",
            "The Hanged Man": "12-TheHangedMan.jpg",
            "Death": "13-Death.jpg",
            "Temperance": "14-Temperance.jpg",
            "The Devil": "15-TheDevil.jpg",
            "The Tower": "16-TheTower.jpg",
            "The Star": "17-TheStar.jpg",
            "The Moon": "18-TheMoon.jpg",
            "The Sun": "19-TheSun.jpg",
            "Judgement": "20-Judgement.jpg",
            "The World": "21-TheWorld.jpg"
        };
        
        // Try local images folder first (numbered format) - 이게 실제 경로입니다!
        if (cardName && majorArcanaMapping[cardName]) {
            const numberedPath = `images/${majorArcanaMapping[cardName]}`;
            console.log('🖼️ Trying local images folder:', numberedPath);
            return numberedPath;
        }
        
        // Try image_url if available  
        if (card.image_url) {
            const urlPath = `images/${card.image_url}`;
            console.log('🖼️ Trying image_url in images folder:', urlPath);
            return urlPath;
        }
        
        // Try ID-based mapping
        if (card.id) {
            const idMapping = {
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
            
            if (idMapping[card.id]) {
                const idPath = `images/${idMapping[card.id]}`;
                console.log('🖼️ Trying ID mapping:', idPath);
                return idPath;
            }
        }
        
        // Fallback to cardback in images folder
        console.log('🖼️ Using fallback cardback');
        return 'images/CardBacks.jpg';
    }

    getCardKeywords(card) {
        if (!card) return '신비, 변화, 성장';
        
        const keywords = card.reversed && card.reversedKeywords 
            ? card.reversedKeywords 
            : card.keywords || ['신비', '변화', '성장'];
        
        return Array.isArray(keywords) ? keywords.slice(0, 4).join(', ') : '신비, 변화, 성장';
    }

    getPeriodInterpretation(card, position, period) {
        const meaning = card.reversed ? card.reversedMeaning : card.meaning;
        const positionContext = period === 'weekly' ? '이번 주' : '이번 달';
        
        if (position === 0) {
            return `${positionContext}의 기반이 되는 에너지입니다. ${meaning}`;
        } else if (position === 1) {
            return `${positionContext} 중 주목해야 할 중요한 요소입니다. ${meaning}`;
        } else if (position === 2 && period === 'weekly') {
            return `${positionContext} 후반과 다음 주로 이어질 흐름입니다. ${meaning}`;
        } else {
            return `${positionContext}의 ${card.position.toLowerCase()}와 관련된 메시지입니다. ${meaning}`;
        }
    }

    generatePeriodSummary(cards, period) {
        const timeframe = period === 'weekly' ? '이번 주' : '이번 달';
        const majorArcanaCount = cards.filter(card => 
            ['The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 
             'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit', 
             'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance', 
             'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World']
            .includes(card.name)
        ).length;
        
        let summary = `${timeframe}은 `;
        
        if (majorArcanaCount >= 3) {
            summary += '인생의 중요한 전환점이 될 수 있는 시기입니다. 큰 변화와 성장의 기회가 찾아올 것으로 보입니다.';
        } else if (majorArcanaCount >= 1) {
            summary += '안정적인 흐름 속에서도 의미 있는 변화가 있을 시기입니다. 작은 변화들이 모여 큰 성과를 만들어낼 것입니다.';
        } else {
            summary += '일상적인 흐름 속에서 꾸준한 발전을 이룰 수 있는 시기입니다. 차근차근 계획을 실행해 나가시기 바랍니다.';
        }
        
        const reversedCount = cards.filter(card => card.reversed).length;
        if (reversedCount >= 2) {
            summary += ' 내면의 성찰과 재평가가 필요한 시점이니, 신중한 접근을 권합니다.';
        }
        
        return summary;
    }

    redrawPeriodCards(period) {
        const seed = this.getPeriodSeed(period);
        const storageKey = `${period}-cards-${seed}`;
        
        // Remove stored cards
        localStorage.removeItem(storageKey);
        
        // Reset UI
        const resultContainer = document.getElementById(`${period}CardResult`);
        const button = document.getElementById(`${period}CardBtn`);
        
        resultContainer.style.display = 'none';
        button.style.display = 'block';
        
        // Redraw
        this.drawPeriodCards(period);
    }

    loadPeriodCards() {
        // Check if cards already exist for current periods
        const weekSeed = this.getPeriodSeed('weekly');
        const monthSeed = this.getPeriodSeed('monthly');
        
        const weeklyCards = localStorage.getItem(`weekly-cards-${weekSeed}`);
        const monthlyCards = localStorage.getItem(`monthly-cards-${monthSeed}`);
        
        if (weeklyCards) {
            this.displayPeriodCards('weekly', JSON.parse(weeklyCards));
        }
        
        if (monthlyCards) {
            this.displayPeriodCards('monthly', JSON.parse(monthlyCards));
        }
    }

    getTarotSystem() {
        console.log('Getting tarot system...');
        
        // Get the available tarot system - try multiple sources
        if (typeof window.simpleTarotSystem !== 'undefined' && window.simpleTarotSystem) {
            console.log('Using window.simpleTarotSystem');
            return window.simpleTarotSystem;
        }
        
        if (typeof window.simpleTarot !== 'undefined' && window.simpleTarot) {
            console.log('Using window.simpleTarot');
            return window.simpleTarot;
        }
        
        if (typeof window.historicalTarotDeck !== 'undefined' && window.historicalTarotDeck) {
            console.log('Using window.historicalTarotDeck');
            return {
                getAvailableCards: () => window.historicalTarotDeck.cards || this.getFallbackCards()
            };
        }
        
        if (typeof window.tarotDeck !== 'undefined' && window.tarotDeck && window.tarotDeck.cards) {
            console.log('Using window.tarotDeck');
            return {
                getAvailableCards: () => window.tarotDeck.cards
            };
        }
        
        console.log('Using fallback system');
        // Fallback system with basic cards
        return {
            getAvailableCards: () => this.getFallbackCards()
        };
    }
    
    testCardSelection() {
        console.log('🧪 Testing card selection...');
        
        const system = this.getTarotSystem();
        console.log('🧪 Tarot system:', system);
        
        if (system && system.getAvailableCards) {
            const cards = system.getAvailableCards();
            console.log('🧪 Available cards:', cards.length);
            console.log('🧪 First card:', cards[0]);
            
            // Test selecting period cards
            const selectedCards = this.selectPeriodCards('weekly');
            console.log('🧪 Selected cards:', selectedCards);
            
            // Test HTML generation
            const html = this.generatePeriodCardHTML(selectedCards, 'weekly');
            console.log('🧪 Generated HTML length:', html.length);
            
            // Show result in document
            document.getElementById('weeklyCardResult').innerHTML = html;
            document.getElementById('weeklyCardResult').style.display = 'block';
        } else {
            console.log('🧪 No tarot system available');
        }
    }

    getCardDisplayName(card) {
        console.log('🎯 getCardDisplayName called with:', card);
        
        // Check all possible name fields and handle "undefined" string
        if (card.name && card.name !== 'undefined') {
            console.log('🎯 Using card.name:', card.name);
            return card.name;
        }
        
        if (card.name_en) {
            console.log('🎯 Using card.name_en:', card.name_en);
            return card.name_en;
        }
        
        if (card.name_ko) {
            console.log('🎯 Using card.name_ko:', card.name_ko);
            return card.name_ko;
        }
        
        if (card.id) {
            const nameFromId = this.getCardNameFromId(card.id);
            console.log('🎯 Using name from ID:', nameFromId);
            return nameFromId;
        }
        
        console.log('🎯 Using fallback name');
        return 'Unknown Card';
    }

    getFallbackCards() {
        return [
            { 
                name: 'The Fool', 
                meaning: '새로운 시작과 모험의 에너지가 가득한 시기입니다.', 
                keywords: ['시작', '모험', '순수'],
                reversedMeaning: '무모함과 경솔함을 경계해야 할 시기입니다.',
                reversedKeywords: ['무모', '경솔', '방향성부족'],
                image_url: '00-TheFool.jpg',
                id: 'MA0'
            },
            { 
                name: 'The Magician', 
                meaning: '의지력과 실행력으로 목표를 달성할 수 있는 시기입니다.', 
                keywords: ['의지', '실행', '창조'],
                reversedMeaning: '집중력 부족이나 에너지 낭비를 조심해야 합니다.',
                reversedKeywords: ['분산', '낭비', '무력감'],
                image_url: '01-TheMagician.jpg',
                id: 'MA1'
            },
            { 
                name: 'The High Priestess', 
                meaning: '직감과 내면의 지혜를 따르는 것이 중요한 시기입니다.', 
                keywords: ['직감', '지혜', '신비'],
                reversedMeaning: '내면의 목소리를 무시하거나 혼란스러운 시기입니다.',
                reversedKeywords: ['혼란', '무시', '표면적'],
                image_url: '02-TheHighPriestess.jpg',
                id: 'MA2'
            },
            { 
                name: 'The Empress', 
                meaning: '풍요와 창조의 에너지가 가득한 시기입니다.', 
                keywords: ['풍요', '창조', '모성'],
                reversedMeaning: '창조적 에너지가 막히거나 불균형한 상태입니다.',
                reversedKeywords: ['막힘', '불균형', '의존'],
                image_url: '03-TheEmpress.jpg',
                id: 'MA3'
            },
            { 
                name: 'The Emperor', 
                meaning: '권위와 안정성이 중요한 시기입니다.', 
                keywords: ['권위', '안정', '질서'],
                reversedMeaning: '권위남용이나 과도한 통제를 경계해야 합니다.',
                reversedKeywords: ['독재', '경직', '반항'],
                image_url: '04-TheEmperor.jpg',
                id: 'MA4'
            },
            { 
                name: 'The Hierophant', 
                meaning: '전통적 지혜와 교육이 중요한 시기입니다.', 
                keywords: ['전통', '교육', '영성'],
                reversedMeaning: '기존 관습에 의문을 갖거나 독창성을 추구하는 시기입니다.',
                reversedKeywords: ['반항', '독창성', '자유'],
                image_url: '05-TheHierophant.jpg',
                id: 'MA5'
            },
            { 
                name: 'The Lovers', 
                meaning: '사랑과 관계에서 중요한 선택의 시기입니다.', 
                keywords: ['사랑', '선택', '조화'],
                reversedMeaning: '관계의 불균형이나 잘못된 선택을 경계해야 합니다.',
                reversedKeywords: ['불화', '유혹', '갈등'],
                image_url: '06-TheLovers.jpg',
                id: 'MA6'
            },
            { 
                name: 'The Chariot', 
                meaning: '의지력과 결단력으로 승리를 쟁취할 수 있는 시기입니다.', 
                keywords: ['승리', '의지', '진보'],
                reversedMeaning: '방향성을 잃거나 통제력을 상실할 수 있는 시기입니다.',
                reversedKeywords: ['혼란', '실패', '좌절'],
                image_url: '07-TheChariot.jpg',
                id: 'MA7'
            },
            { 
                name: 'Strength', 
                meaning: '내면의 힘과 용기로 어려움을 극복하는 시기입니다.', 
                keywords: ['용기', '힘', '인내'],
                reversedMeaning: '자신감 부족이나 내면의 두려움과 마주하는 시기입니다.',
                reversedKeywords: ['두려움', '약함', '의심'],
                image_url: '08-Strength.jpg',
                id: 'MA8'
            },
            { 
                name: 'The Hermit', 
                meaning: '내면 탐구와 영적 성장이 필요한 시기입니다.', 
                keywords: ['성찰', '지혜', '고독'],
                reversedMeaning: '고립이나 내면의 혼란으로 방향을 잃을 수 있습니다.',
                reversedKeywords: ['고립', '외로움', '방황'],
                image_url: '09-TheHermit.jpg',
                id: 'MA9'
            },
            { 
                name: 'Wheel of Fortune', 
                meaning: '운명의 변화와 새로운 기회가 찾아오는 시기입니다.', 
                keywords: ['변화', '운명', '기회'],
                reversedMeaning: '불운이나 예상치 못한 변화에 대비해야 하는 시기입니다.',
                reversedKeywords: ['불운', '정체', '실망'],
                image_url: '10-WheelOfFortune.jpg',
                id: 'MA10'
            },
            { 
                name: 'Justice', 
                meaning: '공정함과 균형이 중요한 시기입니다.', 
                keywords: ['정의', '균형', '진실'],
                reversedMeaning: '불공정함이나 편견을 경계해야 하는 시기입니다.',
                reversedKeywords: ['불공정', '편견', '불균형'],
                image_url: '11-Justice.jpg',
                id: 'MA11'
            },
            { 
                name: 'The Hanged Man', 
                meaning: '새로운 관점과 희생을 통한 깨달음의 시기입니다.', 
                keywords: ['희생', '관점', '깨달음'],
                reversedMeaning: '불필요한 희생이나 저항을 피해야 하는 시기입니다.',
                reversedKeywords: ['고집', '저항', '지연'],
                image_url: '12-TheHangedMan.jpg',
                id: 'MA12'
            },
            { 
                name: 'Death', 
                meaning: '끝과 새로운 시작, 변화와 재탄생의 시기입니다.', 
                keywords: ['변화', '끝', '재탄생'],
                reversedMeaning: '변화에 대한 저항이나 정체된 상황을 의미합니다.',
                reversedKeywords: ['정체', '저항', '회피'],
                image_url: '13-Death.jpg',
                id: 'MA13'
            },
            { 
                name: 'Temperance', 
                meaning: '조화와 절제를 통한 균형의 시기입니다.', 
                keywords: ['조화', '절제', '균형'],
                reversedMeaning: '불균형이나 극단적 행동을 경계해야 하는 시기입니다.',
                reversedKeywords: ['극단', '불균형', '조급함'],
                image_url: '14-Temperance.jpg',
                id: 'MA14'
            },
            { 
                name: 'The Devil', 
                meaning: '물질적 욕망이나 중독에서 벗어나야 하는 시기입니다.', 
                keywords: ['유혹', '속박', '욕망'],
                reversedMeaning: '속박에서 벗어나 자유를 찾는 시기입니다.',
                reversedKeywords: ['해방', '자유', '깨달음'],
                image_url: '15-TheDevil.jpg',
                id: 'MA15'
            },
            { 
                name: 'The Tower', 
                meaning: '급격한 변화와 파괴를 통한 새로운 시작의 시기입니다.', 
                keywords: ['파괴', '변화', '깨달음'],
                reversedMeaning: '변화를 피하거나 내적 갈등이 있는 시기입니다.',
                reversedKeywords: ['회피', '갈등', '완고함'],
                image_url: '16-TheTower.jpg',
                id: 'MA16'
            },
            { 
                name: 'The Star', 
                meaning: '희망과 영감, 치유의 에너지가 가득한 시기입니다.', 
                keywords: ['희망', '영감', '치유'],
                reversedMeaning: '희망을 잃거나 방향성을 찾지 못하는 시기입니다.',
                reversedKeywords: ['절망', '혼란', '실망'],
                image_url: '17-TheStar.jpg',
                id: 'MA17'
            },
            { 
                name: 'The Moon', 
                meaning: '직감과 무의식의 세계를 탐구하는 시기입니다.', 
                keywords: ['직감', '꿈', '신비'],
                reversedMeaning: '환상이나 착각에서 벗어나 현실을 직시하는 시기입니다.',
                reversedKeywords: ['착각', '환상', '혼란'],
                image_url: '18-TheMoon.jpg',
                id: 'MA18'
            },
            { 
                name: 'The Sun', 
                meaning: '기쁨과 성공, 긍정적 에너지가 넘치는 시기입니다.', 
                keywords: ['기쁨', '성공', '활력'],
                reversedMeaning: '과도한 자신감이나 오만함을 경계해야 하는 시기입니다.',
                reversedKeywords: ['오만', '과신', '허영'],
                image_url: '19-TheSun.jpg',
                id: 'MA19'
            },
            { 
                name: 'Judgement', 
                meaning: '심판과 부활, 새로운 소명을 찾는 시기입니다.', 
                keywords: ['심판', '부활', '소명'],
                reversedMeaning: '자기 판단력 부족이나 과거에 얽매이는 시기입니다.',
                reversedKeywords: ['후회', '판단착오', '정체'],
                image_url: '20-Judgement.jpg',
                id: 'MA20'
            },
            { 
                name: 'The World', 
                meaning: '완성과 성취, 새로운 사이클의 시작을 의미합니다.', 
                keywords: ['완성', '성취', '여행'],
                reversedMeaning: '목표 달성의 지연이나 불완전한 성취를 의미합니다.',
                reversedKeywords: ['지연', '미완성', '실망'],
                image_url: '21-TheWorld.jpg',
                id: 'MA21'
            }
        ];
    }
}

// Initialize period fortune system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.periodFortune = new PeriodFortuneSystem();
});