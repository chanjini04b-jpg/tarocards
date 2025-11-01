/**
 * 백업 데이터 로더 - 네트워크 오류 시 사용할 fallback 데이터
 */

// 백업 타로카드 데이터 (주요 카드들만) - images 폴더 경로로 설정
const BACKUP_TAROT_DATA = [
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
    },
    {
        "id": "MA2",
        "arcana": "Major",
        "name_ko": "고위 여사제",
        "name_en": "The High Priestess",
        "rank": 2,
        "meaning_up": "직관, 신비, 잠재의식, 지혜, 비밀",
        "meaning_rev": "표면적 지식, 비밀의 노출, 감정의 불안",
        "image": "images/02-TheHighPriestess.jpg"
    },
    {
        "id": "MA3",
        "arcana": "Major",
        "name_ko": "여황제",
        "name_en": "The Empress",
        "rank": 3,
        "meaning_up": "풍요, 모성, 창조, 자연, 성장",
        "meaning_rev": "의존성, 과보호, 창조력 부족, 불안정",
        "image": "images/03-TheEmpress.jpg"
    },
    {
        "id": "MA4",
        "arcana": "Major",
        "name_ko": "황제",
        "name_en": "The Emperor",
        "rank": 4,
        "meaning_up": "권위, 안정, 보호, 질서, 리더십",
        "meaning_rev": "폭정, 경직성, 과도한 통제, 권위주의",
        "image": "images/04-TheEmperor.jpg"
    },
    {
        "id": "MA5",
        "arcana": "Major",
        "name_ko": "교황",
        "name_en": "The Hierophant",
        "rank": 5,
        "meaning_up": "전통, 교육, 종교, 관습, 정신적 지도",
        "meaning_rev": "도그마, 융통성 부족, 제한적 사고, 반항",
        "image": "images/05-TheHierophant.jpg"
    },
    {
        "id": "MA6",
        "arcana": "Major",
        "name_ko": "연인",
        "name_en": "The Lovers",
        "rank": 6,
        "meaning_up": "사랑, 조화, 관계, 선택, 결합",
        "meaning_rev": "불화, 선택의 어려움, 관계 문제, 분리",
        "image": "images/06-TheLovers.jpg"
    },
    {
        "id": "MA7",
        "arcana": "Major",
        "name_ko": "전차",
        "name_en": "The Chariot",
        "rank": 7,
        "meaning_up": "의지력, 승리, 통제, 진행, 목표 달성",
        "meaning_rev": "통제력 상실, 방향성 부족, 좌절, 지연",
        "image": "images/07-TheChariot.jpg"
    },
    {
        "id": "MA8",
        "arcana": "Major",
        "name_ko": "힘",
        "name_en": "Strength",
        "rank": 8,
        "meaning_up": "내적 힘, 용기, 인내, 자제력, 동정심",
        "meaning_rev": "약함, 자제력 부족, 의심, 두려움",
        "image": "images/08-Strength.jpg"
    },
    {
        "id": "MA9",
        "arcana": "Major",
        "name_ko": "은자",
        "name_en": "The Hermit",
        "rank": 9,
        "meaning_up": "내적 지혜, 성찰, 고독, 영적 탐구, 안내",
        "meaning_rev": "고립, 외로움, 철회, 편견, 거부",
        "image": "images/09-TheHermit.jpg"
    },
    {
        "id": "MA10",
        "arcana": "Major",
        "name_ko": "운명의 바퀴",
        "name_en": "Wheel of Fortune",
        "rank": 10,
        "meaning_up": "운명, 변화, 행운, 순환, 새로운 기회",
        "meaning_rev": "불운, 통제 불가능한 변화, 정체, 역행",
        "image": "images/10-WheelOfFortune.jpg"
    },
    {
        "id": "MA11",
        "arcana": "Major",
        "name_ko": "정의",
        "name_en": "Justice",
        "rank": 11,
        "meaning_up": "공정, 균형, 진실, 책임, 인과응보",
        "meaning_rev": "불공정, 편견, 부정직, 불균형, 면피",
        "image": "images/11-Justice.jpg"
    },
    {
        "id": "MA12",
        "arcana": "Major",
        "name_ko": "달린 남자",
        "name_en": "The Hanged Man",
        "rank": 12,
        "meaning_up": "희생, 기다림, 새로운 관점, 내적 성장, 포기",
        "meaning_rev": "자기 희생, 지연, 무익한 희생, 이기심",
        "image": "images/12-TheHangedMan.jpg"
    }
];

const BACKUP_BACKGROUND_DATA = [
    {
        "id": "MA0",
        "background_ko": "마추픽추",
        "description_ko": "페루의 신비로운 고대 잉카 문명의 유적지"
    },
    {
        "id": "MA1",
        "background_ko": "스톤헨지",
        "description_ko": "영국의 신비로운 거석 문화 유적지"
    },
    {
        "id": "MA2",
        "background_ko": "델파이 신전",
        "description_ko": "고대 그리스의 신탁과 예언의 성지"
    },
    {
        "id": "MA3",
        "background_ko": "앙코르 와트",
        "description_ko": "캄보디아의 웅장한 힌두 사원 복합체"
    },
    {
        "id": "MA4",
        "background_ko": "페트라",
        "description_ko": "요단의 붉은 사암으로 조각된 고대 도시"
    },
    {
        "id": "MA5",
        "background_ko": "바티칸",
        "description_ko": "로마 가톨릭교회의 성지이자 교황청"
    },
    {
        "id": "MA6",
        "background_ko": "타지마할",
        "description_ko": "인도의 영원한 사랑을 상징하는 백색 대리석 묘"
    },
    {
        "id": "MA7",
        "background_ko": "콜로세움",
        "description_ko": "로마 제국의 웅장한 투기장과 권력의 상징"
    },
    {
        "id": "MA8",
        "background_ko": "킬리만자로",
        "description_ko": "아프리카 최고봉, 도전과 극복의 상징"
    },
    {
        "id": "MA9",
        "background_ko": "히말라야",
        "description_ko": "세계의 지붕, 명상과 영적 수행의 성지"
    },
    {
        "id": "MA10",
        "background_ko": "치첸이트사",
        "description_ko": "마야 문명의 천문학과 시간의 신전"
    },
    {
        "id": "MA11",
        "background_ko": "이스터 섬",
        "description_ko": "칠레의 신비로운 모아이 석상들의 섬"
    },
    {
        "id": "MA12",
        "background_ko": "울루루",
        "description_ko": "호주 원주민의 성스러운 붉은 바위산"
    }
];

// 백업 데이터 로더 클래스
class BackupDataLoader {
    constructor() {
        this.cards = [];
        this.backgrounds = {};
        this.isLoaded = false;
    }

    // 백업 데이터 로드
    loadBackupData() {
        console.log('백업 데이터를 사용합니다...');
        
        try {
            // 배경 데이터 매핑
            BACKUP_BACKGROUND_DATA.forEach(bg => {
                this.backgrounds[bg.id] = bg;
            });
            
            // 카드 객체 생성
            this.cards = BACKUP_TAROT_DATA.map(cardData => {
                const backgroundData = this.backgrounds[cardData.id];
                return {
                    ...cardData,
                    background: backgroundData || {
                        background_ko: "미지의 땅",
                        description_ko: "신비로운 미지의 장소"
                    }
                };
            });
            
            this.isLoaded = true;
            console.log(`백업 데이터로 ${this.cards.length}개의 카드를 로드했습니다.`);
            
            return this.cards;
        } catch (error) {
            console.error('백업 데이터 로드 실패:', error);
            return [];
        }
    }

    // 특정 카드 가져오기
    getCard(id) {
        return this.cards.find(card => card.id === id);
    }

    // 랜덤 카드 가져오기
    getRandomCard() {
        if (this.cards.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        return this.cards[randomIndex];
    }

    // 메이저 아르카나만 가져오기
    getMajorArcana() {
        return this.cards.filter(card => card.arcana === "Major");
    }

    // 카드 검색
    searchCards(keyword) {
        if (!keyword) return this.cards;
        
        const lowerKeyword = keyword.toLowerCase();
        return this.cards.filter(card => 
            card.name_ko.toLowerCase().includes(lowerKeyword) ||
            card.name_en.toLowerCase().includes(lowerKeyword) ||
            card.meaning_up.toLowerCase().includes(lowerKeyword) ||
            card.meaning_rev.toLowerCase().includes(lowerKeyword)
        );
    }
}

// 전역 백업 로더 인스턴스
const backupLoader = new BackupDataLoader();

// 백업 데이터 로드 함수 (기존 코드와의 호환성을 위해)
function loadBackupData() {
    return backupLoader.loadBackupData();
}

// 모듈로 내보내기 (필요한 경우)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BACKUP_TAROT_DATA,
        BACKUP_BACKGROUND_DATA,
        BackupDataLoader,
        backupLoader,
        loadBackupData
    };
}
