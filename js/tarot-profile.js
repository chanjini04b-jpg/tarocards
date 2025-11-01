// Tarot Profile Analysis JavaScript

class TarotProfile {
    constructor() {
        this.profileData = null;
        this.currentMode = 'self'; // 'self' 또는 'friend'
        this.initializeElements();
        this.setupEventListeners();
        this.populateYears();
        this.populateDays();
        this.setupModeSelection();
    }

    initializeElements() {
        this.birthYear = document.getElementById('birthYear');
        this.birthMonth = document.getElementById('birthMonth');
        this.birthDay = document.getElementById('birthDay');
        this.birthTime = document.getElementById('birthTime');
        this.analyzeBtn = document.getElementById('analyzeProfile');
        this.resultsSection = document.getElementById('profileResults');
        this.inputTitle = document.getElementById('inputTitle');
        this.inputDescription = document.getElementById('inputDescription');
    }

    setupEventListeners() {
        // 모드 선택 카드 클릭
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectMode(card.dataset.mode);
            });
        });

        // 생년월일 변경 감지
        [this.birthYear, this.birthMonth, this.birthDay].forEach(element => {
            element.addEventListener('change', () => this.validateForm());
        });

        // 월 변경시 일수 업데이트
        this.birthMonth.addEventListener('change', () => this.populateDays());

        // 분석 버튼
        this.analyzeBtn.addEventListener('click', () => this.analyzeProfile());

        // 액션 버튼들
        document.getElementById('saveProfile')?.addEventListener('click', () => this.saveProfile());
        document.getElementById('shareProfile')?.addEventListener('click', () => this.shareProfile());
        document.getElementById('newAnalysis')?.addEventListener('click', () => this.resetForm());
    }

    setupModeSelection() {
        // 초기 모드 설정
        this.updateModeUI();
    }

    selectMode(mode) {
        this.currentMode = mode;
        
        // 모든 카드에서 active 클래스 제거
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // 선택된 카드에 active 클래스 추가
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // UI 업데이트
        this.updateModeUI();
    }

    updateModeUI() {
        const titles = {
            'self': '생년월일을 입력해주세요',
            'friend': '친구의 생년월일을 입력해주세요'
        };
        
        const descriptions = {
            'self': '정확한 생년월일을 통해 더 정밀한 분석을 제공합니다',
            'friend': '친구의 정확한 생년월일을 통해 타로 프로필을 분석해드립니다'
        };
        
        if (this.inputTitle) {
            this.inputTitle.textContent = titles[this.currentMode];
        }
        
        if (this.inputDescription) {
            this.inputDescription.textContent = descriptions[this.currentMode];
        }
        
        // 분석 버튼 텍스트 변경
        if (this.analyzeBtn) {
            this.analyzeBtn.querySelector('.analyze-text').textContent = '타로 프로필 분석하기';
        }
    }

    populateYears() {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1920; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = `${year}년`;
            this.birthYear.appendChild(option);
        }
    }

    populateDays() {
        const month = parseInt(this.birthMonth.value);
        const year = parseInt(this.birthYear.value) || 2024;
        
        // 기존 일수 옵션 제거
        this.birthDay.innerHTML = '<option value="">선택</option>';
        
        if (!month) return;

        // 해당 월의 일수 계산
        const daysInMonth = new Date(year, month, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = `${day}일`;
            this.birthDay.appendChild(option);
        }
    }

    validateForm() {
        const isValid = this.birthYear.value && this.birthMonth.value && this.birthDay.value;
        this.analyzeBtn.disabled = !isValid;
    }

    analyzeProfile() {
        const birthDate = {
            year: parseInt(this.birthYear.value),
            month: parseInt(this.birthMonth.value),
            day: parseInt(this.birthDay.value),
            time: this.birthTime.value ? parseInt(this.birthTime.value) : null
        };

        this.profileData = this.calculateProfile(birthDate);
        this.displayResults();
    }

    calculateProfile(birthDate) {
        // 생년월일 기반 타로 분석 로직
        const { year, month, day, time } = birthDate;
        
        // 메이저 아르카나 계산 (생년월일 합계의 타로 넘버)
        const birthSum = this.sumDigits(year + month + day);
        const majorArcana = birthSum > 22 ? this.sumDigits(birthSum) : birthSum;
        
        // 개인 카드 결정
        const personalCard = this.getPersonalCard(majorArcana);
        
        // 성격 분석
        const personality = this.analyzePersonality(majorArcana, month, day);
        
        // 행운의 요소
        const luckyElements = this.calculateLuckyElements(birthDate);
        
        // 인생 가이드
        const guidance = this.generateGuidance(majorArcana, personality);

        return {
            birthDate,
            majorArcana,
            personalCard,
            personality,
            luckyElements,
            guidance
        };
    }

    sumDigits(num) {
        while (num > 22) {
            num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    }

    getPersonalCard(number) {
        const cards = {
            1: { name: "마법사(The Magician)", meaning: "창조력과 실행력을 가진 당신은 꿈을 현실로 만드는 능력이 있습니다.", icon: "🎩" },
            2: { name: "여교황(The High Priestess)", meaning: "직감과 내면의 지혜가 뛰어난 당신은 숨겨진 진실을 꿰뚫어 봅니다.", icon: "🌙" },
            3: { name: "여황제(The Empress)", meaning: "풍요로움과 창조적 에너지로 가득한 당신은 생명력이 넘칩니다.", icon: "👑" },
            4: { name: "황제(The Emperor)", meaning: "강한 리더십과 질서를 추구하는 당신은 안정적인 기반을 만듭니다.", icon: "⚡" },
            5: { name: "교황(The Hierophant)", meaning: "전통과 지혜를 중시하는 당신은 다른 이들을 가르치고 인도합니다.", icon: "📿" },
            6: { name: "연인(The Lovers)", meaning: "조화와 선택을 중시하는 당신은 인간관계에서 깊은 유대를 형성합니다.", icon: "💕" },
            7: { name: "전차(The Chariot)", meaning: "강한 의지력과 추진력으로 목표를 향해 나아가는 승리자입니다.", icon: "🏆" },
            8: { name: "힘(Strength)", meaning: "내면의 힘과 용기로 어려움을 극복하는 강인한 정신력을 가졌습니다.", icon: "🦁" },
            9: { name: "은둔자(The Hermit)", meaning: "깊은 성찰과 지혜를 추구하며 내면의 빛으로 길을 밝힙니다.", icon: "🕯️" },
            10: { name: "운명의 수레바퀴(Wheel of Fortune)", meaning: "변화와 기회를 잘 활용하며 운명을 스스로 개척해나갑니다.", icon: "🎡" },
            11: { name: "정의(Justice)", meaning: "공정함과 균형을 추구하며 올바른 판단력을 가지고 있습니다.", icon: "⚖️" },
            12: { name: "매달린 사람(The Hanged Man)", meaning: "희생과 인내를 통해 새로운 관점과 깨달음을 얻습니다.", icon: "🔄" },
            13: { name: "죽음(Death)", meaning: "변화와 재생의 에너지로 끊임없이 자신을 발전시켜 나갑니다.", icon: "🦋" },
            14: { name: "절제(Temperance)", meaning: "조화와 균형을 통해 안정된 삶을 추구하며 갈등을 중재합니다.", icon: "🍃" },
            15: { name: "악마(The Devil)", meaning: "욕망과 유혹을 이겨내며 진정한 자유를 찾아가는 여정에 있습니다.", icon: "⛓️" },
            16: { name: "탑(The Tower)", meaning: "급격한 변화와 깨달음을 통해 새로운 자아를 발견합니다.", icon: "⚡" },
            17: { name: "별(The Star)", meaning: "희망과 영감을 주는 존재로 꿈과 이상을 현실화시킵니다.", icon: "⭐" },
            18: { name: "달(The Moon)", meaning: "직감과 상상력이 풍부하며 숨겨진 진실을 찾아냅니다.", icon: "🌕" },
            19: { name: "태양(The Sun)", meaning: "밝고 긍정적인 에너지로 주변을 환하게 밝히는 존재입니다.", icon: "☀️" },
            20: { name: "심판(Judgement)", meaning: "과거를 정리하고 새로운 시작을 위한 판단력을 가지고 있습니다.", icon: "📯" },
            21: { name: "세계(The World)", meaning: "완성과 성취를 상징하며 모든 영역에서 조화를 이룹니다.", icon: "🌍" },
            22: { name: "바보(The Fool)", meaning: "무한한 가능성과 새로운 모험을 추구하는 자유로운 영혼입니다.", icon: "🎭" }
        };
        
        return cards[number] || cards[22];
    }

    analyzePersonality(majorArcana, month, day) {
        const personalities = {
            1: { core: "창조적 리더", talent: "아이디어 실현", challenge: "완벽주의 극복" },
            2: { core: "직감적 조언자", talent: "타인의 마음 읽기", challenge: "과도한 민감함 조절" },
            3: { core: "풍요로운 창조자", talent: "예술적 감각", challenge: "과도한 관대함 조절" },
            4: { core: "안정적 건설자", talent: "체계적 계획", challenge: "융통성 기르기" },
            5: { core: "지혜로운 교사", talent: "전통 지식 전수", challenge: "고정관념 탈피" },
            6: { core: "조화로운 중재자", talent: "인간관계 조율", challenge: "우유부단함 극복" },
            7: { core: "의지적 승부사", talent: "목표 달성", challenge: "성급함 조절" },
            8: { core: "용기있는 보호자", talent: "위기 극복", challenge: "과도한 자신감 조절" },
            9: { core: "지혜로운 탐구자", talent: "깊은 성찰", challenge: "고립감 극복" },
            10: { core: "변화의 주도자", talent: "기회 포착", challenge: "변덕스러움 조절" },
            11: { core: "공정한 판단자", talent: "균형잡힌 시각", challenge: "경직성 극복" },
            12: { core: "인내하는 현자", talent: "희생적 사랑", challenge: "수동성 극복" },
            13: { core: "변화의 촉진자", talent: "재생과 혁신", challenge: "파괴적 성향 조절" },
            14: { core: "균형잡힌 중재자", talent: "갈등 해결", challenge: "우유부단함 극복" },
            15: { core: "열정적 도전자", talent: "강한 추진력", challenge: "유혹 극복" },
            16: { core: "혁신적 개혁가", talent: "급진적 변화", challenge: "충동성 조절" },
            17: { core: "희망적 꿈꾸는 자", talent: "영감 전달", challenge: "현실감각 기르기" },
            18: { core: "신비로운 탐험가", talent: "직감적 통찰", challenge: "불안감 극복" },
            19: { core: "긍정적 에너지원", talent: "주변 밝히기", challenge: "과도한 낙관 조절" },
            20: { core: "심판하는 재생자", talent: "새로운 시작", challenge: "과거 집착 탈피" },
            21: { core: "완성된 성취자", talent: "모든 영역 조화", challenge: "만족감 유지" },
            22: { core: "자유로운 모험가", talent: "무한한 가능성", challenge: "책임감 기르기" }
        };

        return personalities[majorArcana] || personalities[22];
    }

    calculateLuckyElements(birthDate) {
        const { year, month, day, time } = birthDate;
        
        const colors = ["황금색", "은색", "파란색", "빨간색", "초록색", "보라색", "오렌지색"];
        const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        
        const colorIndex = (month + day) % colors.length;
        const dayIndex = (year + month + day) % days.length;
        const luckyNum = ((year % 10) + (month % 10) + (day % 10)) % 9 + 1;

        return {
            color: colors[colorIndex],
            day: days[dayIndex],
            number: luckyNum
        };
    }

    generateGuidance(majorArcana, personality) {
        const guidances = {
            1: {
                strength: "창조적 아이디어를 실행에 옮기는 능력을 최대한 활용하세요. 리더십을 발휘할 기회를 찾아보세요.",
                caution: "완벽주의에 빠져 시작을 망설이지 마세요. 완벽하지 않아도 시도하는 것이 중요합니다.",
                direction: "창업, 예술 분야, 혁신적인 프로젝트 리더 등의 역할이 잘 맞을 것입니다."
            },
            2: {
                strength: "뛰어난 직감과 타인의 감정을 이해하는 능력을 상담이나 치료 분야에 활용해보세요.",
                caution: "너무 민감해서 타인의 감정에 휩쓸리지 않도록 경계를 설정하는 것이 중요합니다.",
                direction: "심리상담, 치료 분야, 예술 치료, 영성 관련 일이 적합합니다."
            },
            // ... 다른 카드들의 가이드도 필요에 따라 추가
        };

        return guidances[majorArcana] || {
            strength: "당신만의 고유한 재능을 발견하고 계발하세요.",
            caution: "자신만의 약점을 인정하고 보완해나가세요.",
            direction: "자신의 내면의 소리에 귀를 기울이며 진정한 길을 찾아가세요."
        };
    }

    displayResults() {
        if (!this.profileData) return;

        const { birthDate, personalCard, personality, luckyElements, guidance } = this.profileData;

        // 모드에 따른 텍스트 설정
        const pronouns = {
            'self': {
                possessive: '나의',
                subject: '당신',
                birth: '출생',
                card: '나의 개인 카드',
                profile: '나의 타로 프로필'
            },
            'friend': {
                possessive: '친구의',
                subject: '친구',
                birth: '친구 출생',
                card: '친구의 개인 카드',
                profile: '친구의 타로 프로필'
            }
        };
        
        const currentPronouns = pronouns[this.currentMode];

        // 생년월일 요약
        document.getElementById('birthSummary').textContent = 
            `${birthDate.year}년 ${birthDate.month}월 ${birthDate.day}일 ${currentPronouns.birth}`;

        // 개인 카드
        document.getElementById('personalCardImage').innerHTML = personalCard.icon;
        document.getElementById('personalCardName').textContent = personalCard.name;
        
        // 카드 의미에서 "당신"을 모드에 따라 변경
        const cardMeaning = personalCard.meaning.replace(/당신/g, currentPronouns.subject);
        document.getElementById('personalCardMeaning').textContent = cardMeaning;

        // 성격 분석
        document.getElementById('coreTraits').textContent = personality.core;
        document.getElementById('naturalTalents').textContent = personality.talent;
        document.getElementById('lifeChallenge').textContent = personality.challenge;

        // 행운의 요소
        document.getElementById('luckyColor').textContent = luckyElements.color;
        document.getElementById('luckyNumber').textContent = luckyElements.number;
        document.getElementById('luckyDay').textContent = luckyElements.day;

        // 인생 가이드 - 모드에 따라 문구 변경
        const strengthGuidance = guidance.strength.replace(/당신/g, currentPronouns.subject);
        const cautionGuidance = guidance.caution.replace(/당신/g, currentPronouns.subject);
        const directionGuidance = guidance.direction.replace(/당신/g, currentPronouns.subject);
        
        document.getElementById('strengthGuidance').textContent = strengthGuidance;
        document.getElementById('cautionGuidance').textContent = cautionGuidance;
        document.getElementById('directionGuidance').textContent = directionGuidance;

        // 결과 섹션 표시
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    saveProfile() {
        if (!this.profileData) return;
        
        localStorage.setItem('tarotProfile', JSON.stringify(this.profileData));
        alert('타로 프로필이 저장되었습니다! 📄✨');
    }

    shareProfile() {
        if (!this.profileData) return;

        const { personalCard, luckyElements } = this.profileData;
        
        const shareTexts = {
            'self': `🔮 나의 타로 프로필\n카드: ${personalCard.name}\n행운의 색: ${luckyElements.color}\n행운의 숫자: ${luckyElements.number}\n\n히스토리컬 타로에서 확인하기!`,
            'friend': `🔮 친구의 타로 프로필\n카드: ${personalCard.name}\n행운의 색: ${luckyElements.color}\n행운의 숫자: ${luckyElements.number}\n\n히스토리컬 타로에서 확인하기!`
        };
        
        const shareText = shareTexts[this.currentMode];
        const title = this.currentMode === 'self' ? '나의 타로 프로필' : '친구의 타로 프로필';
        
        if (navigator.share) {
            navigator.share({
                title: title,
                text: shareText
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('프로필 정보가 클립보드에 복사되었습니다! 📋✨');
            });
        }
    }

    resetForm() {
        [this.birthYear, this.birthMonth, this.birthDay, this.birthTime].forEach(element => {
            element.value = '';
        });
        this.resultsSection.style.display = 'none';
        this.analyzeBtn.disabled = true;
        this.populateDays();
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new TarotProfile();
});