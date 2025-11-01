// Dream Interpretation Tarot System
class DreamTarot {
    constructor() {
        this.symbolMeanings = {
            // 자연 관련 상징
            '바다': { keywords: ['emotion', 'unconscious', 'depth'], tarotThemes: ['cups', 'high_priestess', 'moon'] },
            '산': { keywords: ['challenge', 'achievement', 'spiritual'], tarotThemes: ['hermit', 'emperor', 'strength'] },
            '하늘': { keywords: ['freedom', 'spirituality', 'limitless'], tarotThemes: ['star', 'fool', 'wheel'] },
            '강': { keywords: ['flow', 'change', 'transition'], tarotThemes: ['death', 'temperance', 'flow'] },
            '숲': { keywords: ['unknown', 'growth', 'mystery'], tarotThemes: ['hermit', 'green_man', 'earth'] },
            '꽃': { keywords: ['beauty', 'growth', 'potential'], tarotThemes: ['empress', 'sun', 'growth'] },
            '나무': { keywords: ['growth', 'stability', 'wisdom'], tarotThemes: ['world', 'hermit', 'stability'] },
            
            // 동물 관련 상징
            '새': { keywords: ['freedom', 'message', 'spirit'], tarotThemes: ['fool', 'star', 'air'] },
            '고양이': { keywords: ['intuition', 'mystery', 'independence'], tarotThemes: ['high_priestess', 'moon', 'intuition'] },
            '개': { keywords: ['loyalty', 'protection', 'friendship'], tarotThemes: ['strength', 'sun', 'loyalty'] },
            '뱀': { keywords: ['transformation', 'wisdom', 'healing'], tarotThemes: ['death', 'temperance', 'magician'] },
            '물고기': { keywords: ['emotion', 'intuition', 'depth'], tarotThemes: ['cups', 'moon', 'depth'] },
            '말': { keywords: ['power', 'freedom', 'journey'], tarotThemes: ['chariot', 'knight', 'journey'] },
            
            // 사람 관련 상징
            '어머니': { keywords: ['nurturing', 'protection', 'guidance'], tarotThemes: ['empress', 'moon', 'nurturing'] },
            '아버지': { keywords: ['authority', 'protection', 'guidance'], tarotThemes: ['emperor', 'hierophant', 'authority'] },
            '아이': { keywords: ['innocence', 'new_beginning', 'potential'], tarotThemes: ['fool', 'sun', 'new_beginning'] },
            '노인': { keywords: ['wisdom', 'experience', 'guidance'], tarotThemes: ['hermit', 'hierophant', 'wisdom'] },
            '친구': { keywords: ['support', 'companionship', 'social'], tarotThemes: ['three_cups', 'lovers', 'social'] },
            
            // 건물/장소 관련 상징
            '집': { keywords: ['security', 'family', 'foundation'], tarotThemes: ['four_pentacles', 'emperor', 'security'] },
            '학교': { keywords: ['learning', 'growth', 'discipline'], tarotThemes: ['hierophant', 'hermit', 'learning'] },
            '병원': { keywords: ['healing', 'care', 'recovery'], tarotThemes: ['temperance', 'star', 'healing'] },
            '교회': { keywords: ['spirituality', 'faith', 'guidance'], tarotThemes: ['hierophant', 'high_priestess', 'spirituality'] },
            '다리': { keywords: ['transition', 'connection', 'crossing'], tarotThemes: ['death', 'temperance', 'transition'] },
            
            // 물체 관련 상징
            '자동차': { keywords: ['control', 'direction', 'progress'], tarotThemes: ['chariot', 'magician', 'control'] },
            '열쇠': { keywords: ['solution', 'access', 'mystery'], tarotThemes: ['hermit', 'magician', 'solution'] },
            '거울': { keywords: ['reflection', 'truth', 'self'], tarotThemes: ['high_priestess', 'moon', 'reflection'] },
            '책': { keywords: ['knowledge', 'learning', 'wisdom'], tarotThemes: ['hierophant', 'hermit', 'knowledge'] },
            '전화': { keywords: ['communication', 'message', 'connection'], tarotThemes: ['magician', 'hermit', 'communication'] },
            
            // 현상 관련 상징
            '비': { keywords: ['cleansing', 'emotion', 'renewal'], tarotThemes: ['cups', 'temperance', 'cleansing'] },
            '눈': { keywords: ['purity', 'cold', 'clarity'], tarotThemes: ['hermit', 'star', 'clarity'] },
            '바람': { keywords: ['change', 'movement', 'spirit'], tarotThemes: ['fool', 'tower', 'change'] },
            '불': { keywords: ['passion', 'destruction', 'transformation'], tarotThemes: ['wands', 'tower', 'passion'] },
            '빛': { keywords: ['enlightenment', 'hope', 'guidance'], tarotThemes: ['sun', 'star', 'enlightenment'] }
        };

        this.dreamCardMappings = {
            // 감정별 카드 매핑
            emotions: {
                happy: ['The Sun', 'Three of Cups', 'Ten of Cups', 'Ace of Cups'],
                fear: ['The Moon', 'Nine of Swords', 'The Devil', 'The Tower'],
                sad: ['Three of Swords', 'Five of Cups', 'The Hanged Man', 'Death'],
                anger: ['Five of Wands', 'Seven of Wands', 'The Tower', 'Five of Swords'],
                peaceful: ['The Star', 'Temperance', 'Four of Swords', 'The Hermit'],
                confused: ['The Moon', 'Seven of Cups', 'Two of Swords', 'The Hanged Man'],
                excited: ['The Fool', 'Ace of Wands', 'Page of Wands', 'Knight of Wands'],
                nostalgic: ['Six of Cups', 'The Hermit', 'Four of Cups', 'The High Priestess'],
                mysterious: ['The High Priestess', 'The Moon', 'The Hermit', 'Seven of Cups'],
                neutral: ['Wheel of Fortune', 'Justice', 'Temperance', 'The World']
            },
            
            // 주제별 카드 매핑
            themes: {
                transformation: ['Death', 'The Tower', 'Temperance', 'Wheel of Fortune'],
                love: ['The Lovers', 'Two of Cups', 'Ten of Cups', 'The Empress'],
                career: ['The Magician', 'Eight of Pentacles', 'Ten of Pentacles', 'The Emperor'],
                spirituality: ['The Hermit', 'The High Priestess', 'The Star', 'Temperance'],
                challenge: ['The Tower', 'Five of Wands', 'Seven of Swords', 'The Devil'],
                success: ['The Sun', 'Ten of Pentacles', 'The World', 'Ace of Wands'],
                journey: ['The Fool', 'The Chariot', 'The Hermit', 'Knight of Wands'],
                wisdom: ['The Hermit', 'The High Priestess', 'The Hierophant', 'King of Swords']
            }
        };

        this.dreamInterpretations = {
            // 카드별 꿈 해석
            "The Fool": {
                meaning: "새로운 시작과 모험",
                dreamContext: "당신의 꿈은 새로운 여정의 시작을 암시합니다.",
                advice: "두려움 없이 새로운 도전을 받아들이세요.",
                symbolism: "순수함, 자유로움, 무한한 가능성"
            },
            "The Magician": {
                meaning: "의지력과 창조의 힘",
                dreamContext: "꿈은 당신 안에 있는 잠재력과 능력을 나타냅니다.",
                advice: "자신의 능력을 믿고 목표를 향해 나아가세요.",
                symbolism: "창조력, 집중력, 실현 가능성"
            },
            "The High Priestess": {
                meaning: "직감과 내면의 지혜",
                dreamContext: "무의식의 깊은 메시지와 직관적 통찰을 나타냅니다.",
                advice: "내면의 목소리에 귀 기울이고 직감을 믿으세요.",
                symbolism: "신비로움, 직관, 숨겨진 지식"
            },
            "The Empress": {
                meaning: "풍요로움과 창조성",
                dreamContext: "꿈은 풍요로운 에너지와 창조적 잠재력을 보여줍니다.",
                advice: "자연스러운 흐름을 받아들이고 창조력을 발휘하세요.",
                symbolism: "모성애, 풍요로움, 자연의 힘"
            },
            "The Emperor": {
                meaning: "권위와 안정성",
                dreamContext: "꿈은 질서와 구조, 리더십의 필요성을 나타냅니다.",
                advice: "체계적이고 논리적인 접근으로 목표를 달성하세요.",
                symbolism: "권위, 질서, 안정감"
            },
            "The Hierophant": {
                meaning: "전통과 영적 지도",
                dreamContext: "꿈은 영적 성장과 전통적 가치의 중요성을 보여줍니다.",
                advice: "경험 있는 조언자의 도움을 구하거나 전통적 방법을 따르세요.",
                symbolism: "영성, 전통, 지혜로운 조언"
            },
            "The Lovers": {
                meaning: "사랑과 선택",
                dreamContext: "꿈은 중요한 관계나 결정의 기로에 서 있음을 나타냅니다.",
                advice: "마음의 소리를 듣고 진정한 조화를 추구하세요.",
                symbolism: "사랑, 선택, 조화"
            },
            "The Chariot": {
                meaning: "의지력과 승리",
                dreamContext: "꿈은 목표 달성을 위한 강한 의지와 추진력을 보여줍니다.",
                advice: "확고한 의지로 장애물을 극복하고 앞으로 나아가세요.",
                symbolism: "승리, 의지력, 자제력"
            },
            "Strength": {
                meaning: "내면의 힘과 용기",
                dreamContext: "꿈은 부드러운 힘과 내면의 용기를 나타냅니다.",
                advice: "인내와 친절함으로 어려움을 극복하세요.",
                symbolism: "용기, 인내, 부드러운 힘"
            },
            "The Hermit": {
                meaning: "내면의 탐구와 지혜",
                dreamContext: "꿈은 혼자만의 시간과 성찰의 필요성을 보여줍니다.",
                advice: "고독한 시간을 통해 내면의 답을 찾으세요.",
                symbolism: "성찰, 지혜, 영적 탐구"
            },
            "Wheel of Fortune": {
                meaning: "운명의 변화",
                dreamContext: "꿈은 인생의 큰 변화와 새로운 기회를 나타냅니다.",
                advice: "변화를 받아들이고 새로운 기회를 포착하세요.",
                symbolism: "변화, 운명, 새로운 사이클"
            },
            "Justice": {
                meaning: "균형과 공정함",
                dreamContext: "꿈은 공정함과 균형의 필요성을 나타냅니다.",
                advice: "객관적이고 공정한 판단으로 문제를 해결하세요.",
                symbolism: "정의, 균형, 공정한 판단"
            },
            "The Hanged Man": {
                meaning: "희생과 새로운 관점",
                dreamContext: "꿈은 기다림과 새로운 시각의 필요성을 보여줍니다.",
                advice: "서두르지 말고 다른 관점에서 상황을 바라보세요.",
                symbolism: "희생, 새로운 관점, 인내"
            },
            "Death": {
                meaning: "변화와 재생",
                dreamContext: "꿈은 완전한 변화와 새로운 시작을 나타냅니다.",
                advice: "과거를 놓아주고 새로운 변화를 받아들이세요.",
                symbolism: "변화, 재생, 새로운 시작"
            },
            "Temperance": {
                meaning: "조화와 절제",
                dreamContext: "꿈은 균형과 조화의 중요성을 보여줍니다.",
                advice: "극단을 피하고 중간지점에서 균형을 찾으세요.",
                symbolism: "절제, 조화, 통합"
            },
            "The Devil": {
                meaning: "유혹과 속박",
                dreamContext: "꿈은 내면의 두려움이나 제약을 나타냅니다.",
                advice: "자신을 속박하는 것들로부터 해방되세요.",
                symbolism: "속박, 유혹, 물질주의"
            },
            "The Tower": {
                meaning: "급작스러운 변화",
                dreamContext: "꿈은 갑작스러운 변화나 깨달음을 나타냅니다.",
                advice: "예상치 못한 변화를 통해 새로운 기회를 발견하세요.",
                symbolism: "파괴, 계시, 급변"
            },
            "The Star": {
                meaning: "희망과 영감",
                dreamContext: "꿈은 희망과 치유의 메시지를 전합니다.",
                advice: "희망을 잃지 말고 꿈을 향해 나아가세요.",
                symbolism: "희망, 영감, 치유"
            },
            "The Moon": {
                meaning: "환상과 무의식",
                dreamContext: "꿈은 숨겨진 진실이나 환상을 나타냅니다.",
                advice: "진실과 환상을 구분하고 직감을 믿으세요.",
                symbolism: "환상, 직감, 숨겨진 진실"
            },
            "The Sun": {
                meaning: "성공과 기쁨",
                dreamContext: "꿈은 성공과 행복한 결과를 예고합니다.",
                advice: "긍정적인 에너지로 모든 일에 임하세요.",
                symbolism: "성공, 기쁨, 활력"
            },
            "Judgement": {
                meaning: "각성과 재생",
                dreamContext: "꿈은 새로운 깨달음과 영적 각성을 나타냅니다.",
                advice: "과거를 정리하고 새로운 차원으로 발전하세요.",
                symbolism: "각성, 재생, 새로운 소명"
            },
            "The World": {
                meaning: "완성과 성취",
                dreamContext: "꿈은 완성과 성취의 기쁨을 나타냅니다.",
                advice: "목표를 달성했다면 이제 새로운 도전을 준비하세요.",
                symbolism: "완성, 성취, 조화"
            }
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const analyzeBtn = document.getElementById('dreamAnalyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeDream());
        }
    }

    setDreamContent(content) {
        const dreamTextarea = document.getElementById('dreamContent');
        if (dreamTextarea) {
            dreamTextarea.value = content;
            dreamTextarea.focus();
        }
    }

    analyzeDream() {
        const dreamContent = document.getElementById('dreamContent').value.trim();
        const dreamEmotion = document.getElementById('dreamEmotion').value;
        const dreamSymbols = document.getElementById('dreamSymbols').value.trim();

        if (!dreamContent) {
            alert('꿈의 내용을 입력해주세요.');
            return;
        }

        // 분석 버튼 비활성화 및 로딩 효과
        const analyzeBtn = document.getElementById('dreamAnalyzeBtn');
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = `
            <span class="dream-btn-icon">🔮</span>
            꿈을 해석하고 있습니다...
            <span class="dream-btn-icon">✨</span>
        `;

        // 애니메이션과 함께 해석 실행
        setTimeout(() => {
            this.performDreamAnalysis(dreamContent, dreamEmotion, dreamSymbols);
            
            // 버튼 복원
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = `
                <span class="dream-btn-icon">🔮</span>
                꿈의 의미 해석하기
                <span class="dream-btn-icon">✨</span>
            `;
        }, 2000);
    }

    performDreamAnalysis(content, emotion, symbols) {
        console.log('Starting dream analysis with:', { content, emotion, symbols });
        
        try {
            // 1. 꿈 내용에서 키워드 추출
            console.log('Step 1: Extracting symbols from content');
            const extractedSymbols = this.extractSymbolsFromContent(content);
            console.log('Extracted symbols:', extractedSymbols);
            
            // 2. 입력된 상징들과 결합
            console.log('Step 2: Combining symbols');
            const allSymbols = symbols ? symbols.split(',').map(s => s.trim()) : [];
            const combinedSymbols = [...extractedSymbols, ...allSymbols];
            console.log('Combined symbols:', combinedSymbols);
            
            // 3. 감정과 상징을 바탕으로 타로카드 선택
            console.log('Step 3: Selecting cards');
            const selectedCards = this.selectCardsForDream(emotion, combinedSymbols, content);
            console.log('Selected cards:', selectedCards);
            
            // 4. 해석 결과 생성
            console.log('Step 4: Generating interpretation');
            const interpretation = this.generateDreamInterpretation(selectedCards, content, emotion, combinedSymbols);
            console.log('Generated interpretation:', interpretation);
            
            // 5. 결과 표시
            console.log('Step 5: Displaying results');
            this.displayDreamResult(interpretation, selectedCards);
            console.log('Dream analysis completed successfully');
            
        } catch (error) {
            console.error('Dream analysis error details:', error);
            console.error('Error stack:', error.stack);
            this.showError(`꿈 해석 중 오류가 발생했습니다: ${error.message}`);
        }
    }

    extractSymbolsFromContent(content) {
        const symbols = [];
        const contentLower = content.toLowerCase();
        
        // 미리 정의된 상징들을 찾기
        Object.keys(this.symbolMeanings).forEach(symbol => {
            if (contentLower.includes(symbol)) {
                symbols.push(symbol);
            }
        });
        
        return symbols;
    }

    selectCardsForDream(emotion, symbols, content) {
        const selectedCards = [];
        
        // 1. 감정 기반 카드 선택
        if (emotion && this.dreamCardMappings && this.dreamCardMappings.emotions && this.dreamCardMappings.emotions[emotion]) {
            const emotionCards = this.dreamCardMappings.emotions[emotion];
            if (emotionCards && emotionCards.length > 0) {
                selectedCards.push(emotionCards[Math.floor(Math.random() * emotionCards.length)]);
            }
        }
        
        // 2. 상징 기반 카드 선택
        if (symbols && symbols.length > 0) {
            const symbolCard = this.getCardFromSymbols(symbols);
            if (symbolCard && !selectedCards.includes(symbolCard)) {
                selectedCards.push(symbolCard);
            }
        }
        
        // 3. 내용 분석 기반 추가 카드
        if (content) {
            const themeCard = this.getCardFromTheme(content);
            if (themeCard && !selectedCards.includes(themeCard)) {
                selectedCards.push(themeCard);
            }
        }
        
        // 최소 1장, 최대 3장 보장
        while (selectedCards.length < 1) {
            const randomCard = this.getRandomCard();
            if (randomCard && !selectedCards.includes(randomCard)) {
                selectedCards.push(randomCard);
            }
        }
        
        return selectedCards.slice(0, 3); // 최대 3장
    }

    getCardFromSymbols(symbols) {
        const allCards = Object.keys(this.dreamInterpretations);
        
        for (const symbol of symbols) {
            if (this.symbolMeanings[symbol]) {
                const themes = this.symbolMeanings[symbol].tarotThemes;
                // 테마에 맞는 카드 찾기 (간단한 매핑)
                for (const theme of themes) {
                    const matchingCard = this.findCardByTheme(theme);
                    if (matchingCard) return matchingCard;
                }
            }
        }
        
        return allCards[Math.floor(Math.random() * allCards.length)];
    }

    findCardByTheme(theme) {
        const themeCardMap = {
            'cups': 'Ace of Cups',
            'high_priestess': 'The High Priestess',
            'moon': 'The Moon',
            'hermit': 'The Hermit',
            'emperor': 'The Emperor',
            'strength': 'Strength',
            'star': 'The Star',
            'fool': 'The Fool',
            'wheel': 'Wheel of Fortune',
            'death': 'Death',
            'temperance': 'Temperance',
            'magician': 'The Magician',
            'empress': 'The Empress',
            'sun': 'The Sun',
            'world': 'The World'
        };
        
        return themeCardMap[theme] || null;
    }

    getCardFromTheme(content) {
        const contentLower = content.toLowerCase();
        
        // 내용 분석을 통한 테마 결정
        if (contentLower.includes('사랑') || contentLower.includes('연인') || contentLower.includes('결혼')) {
            return this.dreamCardMappings.themes.love[Math.floor(Math.random() * this.dreamCardMappings.themes.love.length)];
        }
        if (contentLower.includes('일') || contentLower.includes('직장') || contentLower.includes('성공')) {
            return this.dreamCardMappings.themes.career[Math.floor(Math.random() * this.dreamCardMappings.themes.career.length)];
        }
        if (contentLower.includes('변화') || contentLower.includes('바뀌') || contentLower.includes('달라지')) {
            return this.dreamCardMappings.themes.transformation[Math.floor(Math.random() * this.dreamCardMappings.themes.transformation.length)];
        }
        if (contentLower.includes('영적') || contentLower.includes('종교') || contentLower.includes('신성')) {
            return this.dreamCardMappings.themes.spirituality[Math.floor(Math.random() * this.dreamCardMappings.themes.spirituality.length)];
        }
        
        return null;
    }

    getRandomCard() {
        if (!this.dreamInterpretations) {
            return "The Fool"; // 기본 카드
        }
        
        const allCards = Object.keys(this.dreamInterpretations);
        if (allCards.length === 0) {
            return "The Fool"; // 기본 카드
        }
        
        return allCards[Math.floor(Math.random() * allCards.length)];
    }

    generateDreamInterpretation(cards, content, emotion, symbols) {
        if (!cards || cards.length === 0) {
            throw new Error('선택된 카드가 없습니다.');
        }
        
        const mainCard = cards[0];
        const cardInterpretation = this.dreamInterpretations[mainCard];
        
        if (!cardInterpretation) {
            console.warn(`Card interpretation not found for: ${mainCard}`);
            // 기본 해석 제공
            const defaultInterpretation = {
                meaning: "신비로운 의미",
                dreamContext: "이 꿈은 특별한 의미를 담고 있습니다.",
                advice: "직감을 믿고 행동하세요.",
                symbolism: "깊은 상징적 의미"
            };
            return {
                mainCard: mainCard,
                cards: cards,
                overallMeaning: this.generateOverallMeaning(cards, emotion, defaultInterpretation),
                dreamMessage: this.generateDreamMessage(content, symbols, defaultInterpretation),
                spiritualGuidance: this.generateSpiritualGuidance(cards),
                practicalAdvice: this.generatePracticalAdvice(cards, emotion),
                symbolAnalysis: this.analyzeSymbols(symbols),
                futureGuidance: this.generateFutureGuidance(cards)
            };
        }
        
        return {
            mainCard: mainCard,
            cards: cards,
            overallMeaning: this.generateOverallMeaning(cards, emotion, cardInterpretation),
            dreamMessage: this.generateDreamMessage(content, symbols, cardInterpretation),
            spiritualGuidance: this.generateSpiritualGuidance(cards),
            practicalAdvice: this.generatePracticalAdvice(cards, emotion),
            symbolAnalysis: this.analyzeSymbols(symbols),
            futureGuidance: this.generateFutureGuidance(cards)
        };
    }

    generateOverallMeaning(cards, emotion, cardInterpretation) {
        if (!cardInterpretation) {
            cardInterpretation = {
                meaning: "신비로운 의미"
            };
        }
        
        let meaning = `${cardInterpretation.meaning}을 주제로 한 꿈입니다. `;
        
        if (emotion) {
            const emotionMeanings = {
                happy: "기쁨과 만족감이 가득한",
                fear: "내면의 두려움과 불안을 다루는",
                sad: "슬픔을 통한 치유와 성장의",
                anger: "억압된 감정의 해방을 위한",
                peaceful: "평온함과 조화를 추구하는",
                confused: "명확함을 찾아가는",
                excited: "새로운 에너지와 열정의",
                nostalgic: "과거와 현재를 연결하는",
                mysterious: "숨겨진 진실을 찾는",
                neutral: "균형과 중립성을 유지하는"
            };
            
            meaning += `이는 ${emotionMeanings[emotion] || ''} 메시지를 담고 있습니다.`;
        }
        
        return meaning;
    }

    generateDreamMessage(content, symbols, cardInterpretation) {
        if (!cardInterpretation || !cardInterpretation.dreamContext) {
            cardInterpretation = {
                dreamContext: "이 꿈은 특별한 의미를 담고 있습니다."
            };
        }
        
        let message = cardInterpretation.dreamContext + " ";
        
        if (symbols && symbols.length > 0) {
            message += `꿈에 나타난 ${symbols.join(', ')} 등의 상징들은 `;
            message += "당신의 무의식이 전하는 중요한 메시지입니다. ";
        }
        
        message += "이 꿈은 현재 당신의 삶에서 중요한 의미를 가지며, ";
        message += "앞으로의 방향성을 제시해주고 있습니다.";
        
        return message;
    }

    generateSpiritualGuidance(cards) {
        if (!cards || cards.length === 0) {
            return "깊은 영적 메시지를 담고 있습니다.";
        }
        
        const guidance = [];
        
        cards.forEach(card => {
            const cardInfo = this.dreamInterpretations[card];
            if (cardInfo && cardInfo.symbolism) {
                guidance.push(`${card}: ${cardInfo.symbolism}`);
            } else {
                guidance.push(`${card}: 신비로운 상징`);
            }
        });
        
        return guidance.length > 0 ? guidance.join(' | ') : "깊은 영적 메시지를 담고 있습니다.";
    }

    generatePracticalAdvice(cards, emotion) {
        if (!cards || cards.length === 0) {
            return "직감을 믿고 행동하세요.";
        }
        
        const mainCard = cards[0];
        const cardInfo = this.dreamInterpretations[mainCard];
        
        let advice = (cardInfo && cardInfo.advice) ? cardInfo.advice + " " : "직감을 믿고 행동하세요. ";
        
        // 감정 기반 추가 조언
        const emotionAdvice = {
            fear: "두려움을 직면하고 용기를 내어 한 걸음씩 나아가세요.",
            sad: "슬픔을 억누르지 말고 자연스럽게 받아들이며 치유의 시간을 가지세요.",
            anger: "분노의 에너지를 건설적인 방향으로 전환하세요.",
            confused: "서두르지 말고 차분히 상황을 정리해보세요."
        };
        
        if (emotion && emotionAdvice[emotion]) {
            advice += " " + emotionAdvice[emotion];
        }
        
        return advice;
    }

    analyzeSymbols(symbols) {
        if (!symbols || symbols.length === 0) return "특별한 상징이 발견되지 않았습니다.";
        
        const analysis = symbols.map(symbol => {
            if (!symbol) return "";
            
            const meaning = this.symbolMeanings[symbol];
            if (meaning && meaning.keywords) {
                return `${symbol}: ${meaning.keywords.join(', ')}을 의미합니다.`;
            }
            return `${symbol}: 개인적으로 중요한 의미를 가질 수 있습니다.`;
        }).filter(item => item !== "");
        
        return analysis.length > 0 ? analysis.join(' ') : "특별한 상징이 발견되지 않았습니다.";
    }

    generateFutureGuidance(cards) {
        const futureMessages = [
            "앞으로 며칠 간 직감을 믿고 행동해보세요.",
            "새로운 기회가 찾아올 것입니다. 열린 마음으로 받아들이세요.",
            "과거의 경험이 현재 상황의 해답을 제시할 것입니다.",
            "인내심을 가지고 기다리면 좋은 결과가 있을 것입니다.",
            "주변 사람들과의 소통을 통해 새로운 통찰을 얻게 될 것입니다."
        ];
        
        return futureMessages[Math.floor(Math.random() * futureMessages.length)];
    }

    displayDreamResult(interpretation, cards) {
        const resultContainer = document.getElementById('dreamResult');
        
        if (!resultContainer) return;
        
        const cardsHtml = cards.map(card => this.generateCardHtml(card)).join('');
        
        resultContainer.innerHTML = `
            <div class="dream-interpretation">
                <div class="dream-header">
                    <h3>🌙 꿈의 해석 결과</h3>
                    <p class="dream-subtitle">무의식이 전하는 메시지를 받아보세요</p>
                </div>
                
                <div class="dream-cards-section">
                    <h4>🔮 선택된 타로카드</h4>
                    <div class="dream-cards-container">
                        ${cardsHtml}
                    </div>
                </div>
                
                <div class="dream-meaning-sections">
                    <div class="meaning-section">
                        <h4>✨ 전체적인 의미</h4>
                        <p>${interpretation.overallMeaning}</p>
                    </div>
                    
                    <div class="meaning-section">
                        <h4>💭 꿈의 메시지</h4>
                        <p>${interpretation.dreamMessage}</p>
                    </div>
                    
                    <div class="meaning-section">
                        <h4>🌟 영적 안내</h4>
                        <p>${interpretation.spiritualGuidance}</p>
                    </div>
                    
                    <div class="meaning-section">
                        <h4>💡 실용적 조언</h4>
                        <p>${interpretation.practicalAdvice}</p>
                    </div>
                    
                    <div class="meaning-section">
                        <h4>🔍 상징 분석</h4>
                        <p>${interpretation.symbolAnalysis}</p>
                    </div>
                    
                    <div class="meaning-section">
                        <h4>🔮 미래 안내</h4>
                        <p>${interpretation.futureGuidance}</p>
                    </div>
                </div>
                
                <div class="dream-actions">
                    <button onclick="dreamTarot.shareDreamReading()" class="dream-share-btn">
                        <span>📱</span> 해석 결과 공유하기
                    </button>
                    <button onclick="dreamTarot.saveDreamReading()" class="dream-save-btn">
                        <span>💾</span> 꿈 일기에 저장하기
                    </button>
                    <button onclick="dreamTarot.newDreamReading()" class="dream-new-btn">
                        <span>🔄</span> 새로운 꿈 해석하기
                    </button>
                </div>
            </div>
        `;
        
        // 스크롤 및 즉시 표시 (깜빡임 방지)
        resultContainer.style.display = 'block';
        resultContainer.style.opacity = '1';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    generateCardHtml(cardName) {
        const cardInfo = this.dreamInterpretations[cardName];
        const imagePath = this.getCardImagePath(cardName);
        
        return `
            <div class="dream-card-item">
                <div class="dream-card-image">
                    <img src="${imagePath}" alt="${cardName}" 
                         style="width: 320px; height: 180px; object-fit: cover; border-radius: 15px; border: 2px solid rgba(255, 215, 0, 0.3); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);"
                         onerror="this.src='./images/CardBacks.jpg';">
                </div>
                <div class="dream-card-info">
                    <h5>${cardName}</h5>
                    <p class="card-meaning">${cardInfo ? cardInfo.meaning : '신비로운 의미'}</p>
                    <p class="card-symbolism">${cardInfo ? cardInfo.symbolism : '깊은 상징'}</p>
                </div>
            </div>
        `;
    }

    getCardImagePath(cardName) {
        // 카드 이름을 실제 파일명으로 매핑
        const cardMappings = {
            'The Fool': '00-TheFool.jpg',
            'The Magician': '01-TheMagician.jpg',
            'The High Priestess': '02-TheHighPriestess.jpg',
            'The Empress': '03-TheEmpress.jpg',
            'The Emperor': '04-TheEmperor.jpg',
            'The Hierophant': '05-TheHierophant.jpg',
            'The Lovers': '06-TheLovers.jpg',
            'The Chariot': '07-TheChariot.jpg',
            'Strength': '08-Strength.jpg',
            'The Hermit': '09-TheHermit.jpg',
            'Wheel of Fortune': '10-WheelOfFortune.jpg',
            'Justice': '11-Justice.jpg',
            'The Hanged Man': '12-TheHangedMan.jpg',
            'Death': '13-Death.jpg',
            'Temperance': '14-Temperance.jpg',
            'The Devil': '15-TheDevil.jpg',
            'The Tower': '16-TheTower.jpg',
            'The Star': '17-TheStar.jpg',
            'The Moon': '18-TheMoon.jpg',
            'The Sun': '19-TheSun.jpg',
            'Judgement': '20-Judgement.jpg',
            'The World': '21-TheWorld.jpg',
            
            // 컵 수트
            'Ace of Cups': 'Cups01.jpg',
            'Two of Cups': 'Cups02.jpg',
            'Three of Cups': 'Cups03.jpg',
            'Four of Cups': 'Cups04.jpg',
            'Five of Cups': 'Cups05.jpg',
            'Six of Cups': 'Cups06.jpg',
            'Seven of Cups': 'Cups07.jpg',
            'Eight of Cups': 'Cups08.jpg',
            'Nine of Cups': 'Cups09.jpg',
            'Ten of Cups': 'Cups10.jpg',
            'Page of Cups': 'Cups11.jpg',
            'Knight of Cups': 'Cups12.jpg',
            'Queen of Cups': 'Cups13.jpg',
            'King of Cups': 'Cups14.jpg',
            
            // 펜타클 수트
            'Ace of Pentacles': 'Pentacles01.jpg',
            'Two of Pentacles': 'Pentacles02.jpg',
            'Three of Pentacles': 'Pentacles03.jpg',
            'Four of Pentacles': 'Pentacles04.jpg',
            'Five of Pentacles': 'Pentacles05.jpg',
            'Six of Pentacles': 'Pentacles06.jpg',
            'Seven of Pentacles': 'Pentacles07.jpg',
            'Eight of Pentacles': 'Pentacles08.jpg',
            'Nine of Pentacles': 'Pentacles09.jpg',
            'Ten of Pentacles': 'Pentacles10.jpg',
            'Page of Pentacles': 'Pentacles11.jpg',
            'Knight of Pentacles': 'Pentacles12.jpg',
            'Queen of Pentacles': 'Pentacles13.jpg',
            'King of Pentacles': 'Pentacles14.jpg',
            
            // 소드 수트
            'Ace of Swords': 'Swords01.jpg',
            'Two of Swords': 'Swords02.jpg',
            'Three of Swords': 'Swords03.jpg',
            'Four of Swords': 'Swords04.jpg',
            'Five of Swords': 'Swords05.jpg',
            'Six of Swords': 'Swords06.jpg',
            'Seven of Swords': 'Swords07.jpg',
            'Eight of Swords': 'Swords08.jpg',
            'Nine of Swords': 'Swords09.jpg',
            'Ten of Swords': 'Swords10.jpg',
            'Page of Swords': 'Swords11.jpg',
            'Knight of Swords': 'Swords12.jpg',
            'Queen of Swords': 'Swords13.jpg',
            'King of Swords': 'Swords14.jpg',
            
            // 완드 수트
            'Ace of Wands': 'Wands01.jpg',
            'Two of Wands': 'Wands02.jpg',
            'Three of Wands': 'Wands03.jpg',
            'Four of Wands': 'Wands04.jpg',
            'Five of Wands': 'Wands05.jpg',
            'Six of Wands': 'Wands06.jpg',
            'Seven of Wands': 'Wands07.jpg',
            'Eight of Wands': 'Wands08.jpg',
            'Nine of Wands': 'Wands09.jpg',
            'Ten of Wands': 'Wands10.jpg',
            'Page of Wands': 'Wands11.jpg',
            'Knight of Wands': 'Wands12.jpg',
            'Queen of Wands': 'Wands13.jpg',
            'King of Wands': 'Wands14.jpg'
        };
        
        const fileName = cardMappings[cardName];
        if (fileName) {
            return `./images/${fileName}`;
        }
        
        // 백업 이미지
        return './images/CardBacks.jpg';
    }

    shareDreamReading() {
        const dreamContent = document.getElementById('dreamContent').value;
        const resultText = `🌙 꿈 해석 타로 결과 🌙\n\n꿈 내용: ${dreamContent.substring(0, 100)}...\n\n타로카드가 전하는 메시지를 확인해보세요!\n\n#타로 #꿈해석 #타로리딩`;
        
        if (navigator.share) {
            navigator.share({
                title: '꿈 해석 타로 결과',
                text: resultText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(resultText).then(() => {
                alert('해석 결과가 클립보드에 복사되었습니다!');
            });
        }
    }

    saveDreamReading() {
        const dreamContent = document.getElementById('dreamContent').value;
        const currentDate = new Date().toLocaleDateString('ko-KR');
        
        const dreamEntry = {
            date: currentDate,
            content: dreamContent,
            emotion: document.getElementById('dreamEmotion').value,
            symbols: document.getElementById('dreamSymbols').value,
            timestamp: Date.now()
        };
        
        // 로컬 스토리지에 저장
        const savedDreams = JSON.parse(localStorage.getItem('dreamJournal') || '[]');
        savedDreams.unshift(dreamEntry);
        
        // 최근 50개만 보관
        if (savedDreams.length > 50) {
            savedDreams.splice(50);
        }
        
        localStorage.setItem('dreamJournal', JSON.stringify(savedDreams));
        alert('꿈 일기에 저장되었습니다! 💫');
    }

    newDreamReading() {
        // 폼 초기화
        document.getElementById('dreamContent').value = '';
        document.getElementById('dreamEmotion').value = '';
        document.getElementById('dreamSymbols').value = '';
        
        // 결과 숨기기
        const resultContainer = document.getElementById('dreamResult');
        if (resultContainer) {
            resultContainer.style.display = 'none';
        }
        
        // 입력 영역으로 스크롤
        document.getElementById('dreamContent').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('dreamContent').focus();
    }

    showError(message) {
        const resultContainer = document.getElementById('dreamResult');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="dream-error">
                    <h3>😔 해석 실패</h3>
                    <p>${message}</p>
                    <button onclick="dreamTarot.newDreamReading()" class="dream-retry-btn">다시 시도하기</button>
                </div>
            `;
            resultContainer.style.display = 'block';
        }
    }
}

// 전역 함수들
function setDreamContent(content) {
    if (window.dreamTarot) {
        window.dreamTarot.setDreamContent(content);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    window.dreamTarot = new DreamTarot();
});