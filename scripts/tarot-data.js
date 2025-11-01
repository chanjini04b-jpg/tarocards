// 전체 타로 카드 데이터 (78장)
const FULL_TAROT_CARDS = [
  // 메이저 아르카나 (22장)
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
    "meaning_rev": "표면적 지식, 비밀의 노출, 감정적 불안",
    "image": "images/02-TheHighPriestess.jpg"
  },
  {
    "id": "MA3",
    "arcana": "Major",
    "name_ko": "여제",
    "name_en": "The Empress",
    "rank": 3,
    "meaning_up": "풍요, 어머니, 창조, 자연, 아름다움",
    "meaning_rev": "불임, 사치, 정체, 창조성 부족",
    "image": "images/03-TheEmpress.jpg"
  },
  {
    "id": "MA4",
    "arcana": "Major",
    "name_ko": "황제",
    "name_en": "The Emperor",
    "rank": 4,
    "meaning_up": "권위, 안정, 아버지, 통제, 구조",
    "meaning_rev": "미성숙, 폭정, 통제 불능, 무능력",
    "image": "images/04-TheEmperor.jpg"
  },
  {
    "id": "MA5",
    "arcana": "Major",
    "name_ko": "교황",
    "name_en": "The Hierophant",
    "rank": 5,
    "meaning_up": "전통, 종교, 교육, 지혜, 영적 지도",
    "meaning_rev": "독단적 사고, 전통 거부, 비정통적",
    "image": "images/05-TheHierophant.jpg"
  },
  {
    "id": "MA6",
    "arcana": "Major",
    "name_ko": "연인",
    "name_en": "The Lovers",
    "rank": 6,
    "meaning_up": "사랑, 선택, 조화, 관계, 결합",
    "meaning_rev": "갈등, 선택의 혼란, 관계문제, 분리",
    "image": "images/06-TheLovers.jpg"
  },
  {
    "id": "MA7",
    "arcana": "Major",
    "name_ko": "전차",
    "name_en": "The Chariot",
    "rank": 7,
    "meaning_up": "승리, 의지력, 결단, 통제, 전진",
    "meaning_rev": "통제력 상실, 혼란, 방향성 부족",
    "image": "images/07-TheChariot.jpg"
  },
  {
    "id": "MA8",
    "arcana": "Major",
    "name_ko": "힘",
    "name_en": "Strength",
    "rank": 8,
    "meaning_up": "용기, 인내, 내적 힘, 자제력, 부드러운 힘",
    "meaning_rev": "약함, 용기 상실, 통제력 부족, 공격성",
    "image": "images/08-Strength.jpg"
  },
  {
    "id": "MA9",
    "arcana": "Major",
    "name_ko": "은둔자",
    "name_en": "The Hermit",
    "rank": 9,
    "meaning_up": "성찰, 내적 지혜, 탐구, 고독, 영적 여행",
    "meaning_rev": "고독함, 외로움, 거부, 내적 혼란",
    "image": "images/09-TheHermit.jpg"
  },
  {
    "id": "MA10",
    "arcana": "Major",
    "name_ko": "운명의 수레바퀴",
    "name_en": "Wheel of Fortune",
    "rank": 10,
    "meaning_up": "운명, 기회, 변화, 순환, 행운",
    "meaning_rev": "불운, 나쁜 운, 통제 불가, 악순환",
    "image": "images/10-WheelOfFortune.jpg"
  },
  {
    "id": "MA11",
    "arcana": "Major",
    "name_ko": "정의",
    "name_en": "Justice",
    "rank": 11,
    "meaning_up": "공정성, 균형, 진실, 법적 문제",
    "meaning_rev": "불공정성, 불균형, 거짓, 복수, 불평등",
    "image": "images/11-Justice.jpg"
  },
  {
    "id": "MA12",
    "arcana": "Major",
    "name_ko": "매달린 남자",
    "name_en": "The Hanged Man",
    "rank": 12,
    "meaning_up": "희생, 관점의 변화, 수용, 기다림, 영적 깨달음",
    "meaning_rev": "이기심, 무의미한 희생, 막막함",
    "image": "images/12-TheHangedMan.jpg"
  },
  {
    "id": "MA13",
    "arcana": "Major",
    "name_ko": "죽음",
    "name_en": "Death",
    "rank": 13,
    "meaning_up": "변화, 변혁, 종료와 시작, 재생, 새로운 시작",
    "meaning_rev": "정체, 변화 거부, 부정, 집착",
    "image": "images/13-Death.jpg"
  },
  {
    "id": "MA14",
    "arcana": "Major",
    "name_ko": "절제",
    "name_en": "Temperance",
    "rank": 14,
    "meaning_up": "균형, 조화, 절제, 치유, 인내",
    "meaning_rev": "과잉, 불균형, 조급함, 불화",
    "image": "images/14-Temperance.jpg"
  },
  {
    "id": "MA15",
    "arcana": "Major",
    "name_ko": "악마",
    "name_en": "The Devil",
    "rank": 15,
    "meaning_up": "유혹, 속박, 물질주의, 중독, 그림자",
    "meaning_rev": "해방, 자유, 깨달음, 속박으로부터 탈출, 극복",
    "image": "images/15-TheDevil.jpg"
  },
  {
    "id": "MA16",
    "arcana": "Major",
    "name_ko": "탑",
    "name_en": "The Tower",
    "rank": 16,
    "meaning_up": "파괴, 충격, 계시, 갑작스러운 변화, 깨달음",
    "meaning_rev": "내적 변화, 개인적 변화, 파괴 회피",
    "image": "images/16-TheTower.jpg"
  },
  {
    "id": "MA17",
    "arcana": "Major",
    "name_ko": "별",
    "name_en": "The Star",
    "rank": 17,
    "meaning_up": "희망, 영감, 평화, 영성, 재생",
    "meaning_rev": "절망, 실망, 불신, 영감 부족",
    "image": "images/17-TheStar.jpg"
  },
  {
    "id": "MA18",
    "arcana": "Major",
    "name_ko": "달",
    "name_en": "The Moon",
    "rank": 18,
    "meaning_up": "환상, 불안, 잠재의식, 직감, 혼란",
    "meaning_rev": "명확성, 현실 인식, 불안의 극복",
    "image": "images/18-TheMoon.jpg"
  },
  {
    "id": "MA19",
    "arcana": "Major",
    "name_ko": "태양",
    "name_en": "The Sun",
    "rank": 19,
    "meaning_up": "기쁨, 행복, 긍정적 에너지, 성공",
    "meaning_rev": "과신, 지나친 행복, 부족한 에너지",
    "image": "images/19-TheSun.jpg"
  },
  {
    "id": "MA20",
    "arcana": "Major",
    "name_ko": "심판",
    "name_en": "Judgement",
    "rank": 20,
    "meaning_up": "부활, 각성, 새로운 시작, 판단, 용서",
    "meaning_rev": "용기 상실, 잘못된 판단, 용서 부족",
    "image": "images/20-Judgement.jpg"
  },
  {
    "id": "MA21",
    "arcana": "Major",
    "name_ko": "세계",
    "name_en": "The World",
    "rank": 21,
    "meaning_up": "완성, 성공, 행복, 통합, 전체성",
    "meaning_rev": "미완성, 지연, 목표 달성 실패",
    "image": "images/21-TheWorld.jpg"
  },

  // 마이너 아르카나 - 완드 (지팡이) (14장)
  {
    "id": "MI1",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 에이스",
    "name_en": "Ace of Wands",
    "rank": 1,
    "meaning_up": "창조적 에너지, 새로운 시작, 영감, 열정",
    "meaning_rev": "창조적 막힘, 지연된 시작, 부족한 동기",
    "image": "images/Wands01.jpg"
  },
  {
    "id": "MI2",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 2",
    "name_en": "Two of Wands",
    "rank": 2,
    "meaning_up": "계획, 미래 계획, 결정, 개인적 권력",
    "meaning_rev": "계획 부족, 개인적 목표, 무계획",
    "image": "images/Wands02.jpg"
  },
  {
    "id": "MI3",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 3",
    "name_en": "Three of Wands",
    "rank": 3,
    "meaning_up": "확장, 선견지명, 리더십, 장거리 계획",
    "meaning_rev": "계획 부족, 개인적 목표, 지연",
    "image": "images/Wands03.jpg"
  },
  {
    "id": "MI4",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 4",
    "name_en": "Four of Wands",
    "rank": 4,
    "meaning_up": "축하, 조화, 가정, 성취",
    "meaning_rev": "가정 불화, 불안정, 부족한 지원",
    "image": "images/Wands04.jpg"
  },
  {
    "id": "MI5",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 5",
    "name_en": "Five of Wands",
    "rank": 5,
    "meaning_up": "갈등, 경쟁, 불일치, 투쟁",
    "meaning_rev": "내적 갈등, 갈등 회피, 조화",
    "image": "images/Wands05.jpg"
  },
  {
    "id": "MI6",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 6",
    "name_en": "Six of Wands",
    "rank": 6,
    "meaning_up": "승리, 성공, 공적 인정, 진전",
    "meaning_rev": "개인적 성취, 낙심, 지연",
    "image": "images/Wands06.jpg"
  },
  {
    "id": "MI7",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 7",
    "name_en": "Seven of Wands",
    "rank": 7,
    "meaning_up": "도전, 방어, 인내, 경쟁",
    "meaning_rev": "압도당함, 항복, 외부 압력",
    "image": "images/Wands07.jpg"
  },
  {
    "id": "MI8",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 8",
    "name_en": "Eight of Wands",
    "rank": 8,
    "meaning_up": "빠른 행동, 진전, 움직임, 소식",
    "meaning_rev": "지연, 좌절, 내부 정렬",
    "image": "images/Wands08.jpg"
  },
  {
    "id": "MI9",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 9",
    "name_en": "Nine of Wands",
    "rank": 9,
    "meaning_up": "회복력, 끈기, 시험, 경계",
    "meaning_rev": "편집증, 의심, 방어적",
    "image": "images/Wands09.jpg"
  },
  {
    "id": "MI10",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 10",
    "name_en": "Ten of Wands",
    "rank": 10,
    "meaning_up": "부담, 과부하, 책임, 근면",
    "meaning_rev": "책임 회피, 위임, 부담 덜기",
    "image": "images/Wands10.jpg"
  },
  {
    "id": "MI11",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 페이지",
    "name_en": "Page of Wands",
    "rank": 11,
    "meaning_up": "영감, 아이디어, 학습, 발견",
    "meaning_rev": "무계획, 부족한 방향, 제한된 성장",
    "image": "images/Wands11.jpg"
  },
  {
    "id": "MI12",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 나이트",
    "name_en": "Knight of Wands",
    "rank": 12,
    "meaning_up": "충동적, 모험적, 열정적, 성급함",
    "meaning_rev": "무모함, 참을성 없음, 행동 전 생각",
    "image": "images/Wands12.jpg"
  },
  {
    "id": "MI13",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 퀸",
    "name_en": "Queen of Wands",
    "rank": 13,
    "meaning_up": "용기, 확신, 독립, 결단력",
    "meaning_rev": "이기심, 질투, 불안정",
    "image": "images/Wands13.jpg"
  },
  {
    "id": "MI14",
    "arcana": "Minor",
    "suit": "Wands",
    "name_ko": "완드 킹",
    "name_en": "King of Wands",
    "rank": 14,
    "meaning_up": "자연스러운 리더, 비전, 기업가정신, 명예",
    "meaning_rev": "충동적, 증오적, 무자비함",
    "image": "images/Wands14.jpg"
  },

  // 마이너 아르카나 - 컵 (성배) (14장)
  {
    "id": "MI15",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 에이스",
    "name_en": "Ace of Cups",
    "rank": 1,
    "meaning_up": "새로운 관계, 감정적 시작, 사랑, 직관",
    "meaning_rev": "감정적 막힘, 억압된 감정, 사랑 부족",
    "image": "images/Cups01.jpg"
  },
  {
    "id": "MI16",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 2",
    "name_en": "Two of Cups",
    "rank": 2,
    "meaning_up": "결합, 파트너십, 상호 매력, 관계",
    "meaning_rev": "관계 불균형, 긴장, 분리",
    "image": "images/Cups02.jpg"
  },
  {
    "id": "MI17",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 3",
    "name_en": "Three of Cups",
    "rank": 3,
    "meaning_up": "우정, 지역사회, 행복, 축하",
    "meaning_rev": "독립, 개인주의, 취소된 계획",
    "image": "images/Cups03.jpg"
  },
  {
    "id": "MI18",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 4",
    "name_en": "Four of Cups",
    "rank": 4,
    "meaning_up": "명상, 고려, 무관심, 재평가",
    "meaning_rev": "퇴각, 철회, 새로운 접근법",
    "image": "images/Cups04.jpg"
  },
  {
    "id": "MI19",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 5",
    "name_en": "Five of Cups",
    "rank": 5,
    "meaning_up": "후회, 실패, 실망, 비관주의",
    "meaning_rev": "개인적 좌절, 자기용서, 앞으로 나아가기",
    "image": "images/Cups05.jpg"
  },
  {
    "id": "MI20",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 6",
    "name_en": "Six of Cups",
    "rank": 6,
    "meaning_up": "향수, 어린 시절, 재회, 순수함",
    "meaning_rev": "과거에 얽매임, 현실성, 미래에 집중",
    "image": "images/Cups06.jpg"
  },
  {
    "id": "MI21",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 7",
    "name_en": "Seven of Cups",
    "rank": 7,
    "meaning_up": "환상, 선택, 공상, 소망 사고",
    "meaning_rev": "현실, 집중, 명확한 선택",
    "image": "images/Cups07.jpg"
  },
  {
    "id": "MI22",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 8",
    "name_en": "Eight of Cups",
    "rank": 8,
    "meaning_up": "포기, 철수, 더 높은 목적 추구",
    "meaning_rev": "표류, 혼란, 더 낮은 에너지",
    "image": "images/Cups08.jpg"
  },
  {
    "id": "MI23",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 9",
    "name_en": "Nine of Cups",
    "rank": 9,
    "meaning_up": "만족, 감정적 안정, 사치, 행복",
    "meaning_rev": "내적 행복, 물질주의, 해방감",
    "image": "images/Cups09.jpg"
  },
  {
    "id": "MI24",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 10",
    "name_en": "Ten of Cups",
    "rank": 10,
    "meaning_up": "감정적 성취, 행복, 조화, 가족",
    "meaning_rev": "가족 불화, 가정 갈등, 가치관 차이",
    "image": "images/Cups10.jpg"
  },
  {
    "id": "MI25",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 페이지",
    "name_en": "Page of Cups",
    "rank": 11,
    "meaning_up": "창의적 기회, 직관적 메시지, 호기심",
    "meaning_rev": "감정적 미성숙, 창의적 막힘, 내성적",
    "image": "images/Cups11.jpg"
  },
  {
    "id": "MI26",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 나이트",
    "name_en": "Knight of Cups",
    "rank": 12,
    "meaning_up": "로맨스, 매력, 상상력, 감정에 따른 행동",
    "meaning_rev": "변덕스러움, 질투, 비현실적",
    "image": "images/Cups12.jpg"
  },
  {
    "id": "MI27",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 퀸",
    "name_en": "Queen of Cups",
    "rank": 13,
    "meaning_up": "공감, 양육, 직관, 치유",
    "meaning_rev": "감정적 불안정, 의존적, 순교자",
    "image": "images/Cups13.jpg"
  },
  {
    "id": "MI28",
    "arcana": "Minor",
    "suit": "Cups",
    "name_ko": "컵 킹",
    "name_en": "King of Cups",
    "rank": 14,
    "meaning_up": "감정적 균형, 관용, 외교, 연민",
    "meaning_rev": "감정적 조작, 변덕스러움, 인색함",
    "image": "images/Cups14.jpg"
  },

  // 마이너 아르카나 - 검 (소드) (14장)
  {
    "id": "MI29",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 에이스",
    "name_en": "Ace of Swords",
    "rank": 1,
    "meaning_up": "새로운 아이디어, 지적 시작, 명확성, 진실",
    "meaning_rev": "혼란, 혼돈, 지적 막힘, 거짓 아이디어",
    "image": "images/Swords01.jpg"
  },
  {
    "id": "MI30",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 2",
    "name_en": "Two of Swords",
    "rank": 2,
    "meaning_up": "어려운 선택, 우유부단, 균형, 억압된 감정",
    "meaning_rev": "혼란, 정보 과부하, 거짓 딜레마",
    "image": "images/Swords02.jpg"
  },
  {
    "id": "MI31",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 3",
    "name_en": "Three of Swords",
    "rank": 3,
    "meaning_up": "상심, 슬픔, 배신, 분리",
    "meaning_rev": "회복, 용서, 감정적 방출",
    "image": "images/Swords03.jpg"
  },
  {
    "id": "MI32",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 4",
    "name_en": "Four of Swords",
    "rank": 4,
    "meaning_up": "휴식, 명상, 정신적 평화, 고요함",
    "meaning_rev": "조바심, 번아웃, 수면 부족",
    "image": "images/Swords04.jpg"
  },
  {
    "id": "MI33",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 5",
    "name_en": "Five of Swords",
    "rank": 5,
    "meaning_up": "갈등, 패배, 이기주의, 굴욕",
    "meaning_rev": "화해, 용서, 내적 갈등 해결",
    "image": "images/Swords05.jpg"
  },
  {
    "id": "MI34",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 6",
    "name_en": "Six of Swords",
    "rank": 6,
    "meaning_up": "전환, 변화, 앞으로 나아가기, 여행",
    "meaning_rev": "저항, 변화 회피, 과거에 얽매임",
    "image": "images/Swords06.jpg"
  },
  {
    "id": "MI35",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 7",
    "name_en": "Seven of Swords",
    "rank": 7,
    "meaning_up": "기만, 속임수, 도둑질, 전략",
    "meaning_rev": "양심의 가책, 고백, 정직",
    "image": "images/Swords07.jpg"
  },
  {
    "id": "MI36",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 8",
    "name_en": "Eight of Swords",
    "rank": 8,
    "meaning_up": "제한, 감금, 부정적 사고, 피해자 의식",
    "meaning_rev": "해방, 자유, 제한의 해제",
    "image": "images/Swords08.jpg"
  },
  {
    "id": "MI37",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 9",
    "name_en": "Nine of Swords",
    "rank": 9,
    "meaning_up": "악몽, 불안, 걱정, 절망",
    "meaning_rev": "내적 혼란, 부정적 사고 패턴 해제",
    "image": "images/Swords09.jpg"
  },
  {
    "id": "MI38",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 10",
    "name_en": "Ten of Swords",
    "rank": 10,
    "meaning_up": "배신, 파멸, 고통스러운 끝, 바닥",
    "meaning_rev": "회복, 재생, 새로운 시작",
    "image": "images/Swords10.jpg"
  },
  {
    "id": "MI39",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 페이지",
    "name_en": "Page of Swords",
    "rank": 11,
    "meaning_up": "호기심, 정신적 에너지, 감시, 경계",
    "meaning_rev": "간첩, 거짓말, 비밀",
    "image": "images/Swords11.jpg"
  },
  {
    "id": "MI40",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 나이트",
    "name_en": "Knight of Swords",
    "rank": 12,
    "meaning_up": "야심, 행동, 충동적, 무모함",
    "meaning_rev": "무책임, 부주의, 무모한 행동",
    "image": "images/Swords12.jpg"
  },
  {
    "id": "MI41",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 퀸",
    "name_en": "Queen of Swords",
    "rank": 13,
    "meaning_up": "독립, 명확한 사고, 직접적 소통, 지성",
    "meaning_rev": "냉정함, 혹독함, 쓴맛, 편견",
    "image": "images/Swords13.jpg"
  },
  {
    "id": "MI42",
    "arcana": "Minor",
    "suit": "Swords",
    "name_ko": "소드 킹",
    "name_en": "King of Swords",
    "rank": 14,
    "meaning_up": "지적 힘, 권위, 진실, 윤리",
    "meaning_rev": "독재, 무자비함, 권력 남용",
    "image": "images/Swords14.jpg"
  },

  // 마이너 아르카나 - 펜타클 (동전) (14장)
  {
    "id": "MI43",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 에이스",
    "name_en": "Ace of Pentacles",
    "rank": 1,
    "meaning_up": "새로운 재정적 기회, 번영, 물질적 시작",
    "meaning_rev": "손실된 기회, 재정적 불안정, 욕심",
    "image": "images/Pentacles01.jpg"
  },
  {
    "id": "MI44",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 2",
    "name_en": "Two of Pentacles",
    "rank": 2,
    "meaning_up": "다중 우선순위, 시간 관리, 적응성",
    "meaning_rev": "우선순위 상실, 과도한 집중, 압도됨",
    "image": "images/Pentacles02.jpg"
  },
  {
    "id": "MI45",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 3",
    "name_en": "Three of Pentacles",
    "rank": 3,
    "meaning_up": "팀워크, 협력, 기술 구축, 학습",
    "meaning_rev": "비협조적, 기술 부족, 개인주의",
    "image": "images/Pentacles03.jpg"
  },
  {
    "id": "MI46",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 4",
    "name_en": "Four of Pentacles",
    "rank": 4,
    "meaning_up": "보안, 보존, 인색함, 통제",
    "meaning_rev": "관대함, 지나친 지출, 탈착",
    "image": "images/Pentacles04.jpg"
  },
  {
    "id": "MI47",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 5",
    "name_en": "Five of Pentacles",
    "rank": 5,
    "meaning_up": "재정적 손실, 빈곤, 불안정, 고립",
    "meaning_rev": "재정적 회복, 영적 빈곤, 개선",
    "image": "images/Pentacles05.jpg"
  },
  {
    "id": "MI48",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 6",
    "name_en": "Six of Pentacles",
    "rank": 6,
    "meaning_up": "관대함, 공유, 자선, 공정성",
    "meaning_rev": "이기심, 부패, 부당함",
    "image": "images/Pentacles06.jpg"
  },
  {
    "id": "MI49",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 7",
    "name_en": "Seven of Pentacles",
    "rank": 7,
    "meaning_up": "투자, 인내, 장기 시각, 지속성",
    "meaning_rev": "성급함, 투자 부족, 제한된 성공",
    "image": "images/Pentacles07.jpg"
  },
  {
    "id": "MI50",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 8",
    "name_en": "Eight of Pentacles",
    "rank": 8,
    "meaning_up": "숙련도, 기술 개발, 집중, 근면",
    "meaning_rev": "완벽주의, 낮은 기준, 부족한 기술",
    "image": "images/Pentacles08.jpg"
  },
  {
    "id": "MI51",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 9",
    "name_en": "Nine of Pentacles",
    "rank": 9,
    "meaning_up": "재정적 독립, 사치, 자급자족, 우아함",
    "meaning_rev": "지나친 의존, 재정적 실패, 허영",
    "image": "images/Pentacles09.jpg"
  },
  {
    "id": "MI52",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 10",
    "name_en": "Ten of Pentacles",
    "rank": 10,
    "meaning_up": "재정적 보안, 가족 부, 유산, 전통",
    "meaning_rev": "재정적 실패, 가족 분쟁, 외로움",
    "image": "images/Pentacles10.jpg"
  },
  {
    "id": "MI53",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 페이지",
    "name_en": "Page of Pentacles",
    "rank": 11,
    "meaning_up": "야심, 학습 욕구, 새로운 기회, 현실성",
    "meaning_rev": "게으름, 학습 부족, 현실 회피",
    "image": "images/Pentacles11.jpg"
  },
  {
    "id": "MI54",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 나이트",
    "name_en": "Knight of Pentacles",
    "rank": 12,
    "meaning_up": "근면, 책임감, 신뢰성, 완고함",
    "meaning_rev": "게으름, 무책임, 무기력함",
    "image": "images/Pentacles12.jpg"
  },
  {
    "id": "MI55",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 퀸",
    "name_en": "Queen of Pentacles",
    "rank": 13,
    "meaning_up": "양육, 실용성, 자원 제공, 근무 환경",
    "meaning_rev": "재정적 불안정, 질투, 이기심",
    "image": "images/Pentacles13.jpg"
  },
  {
    "id": "MI56",
    "arcana": "Minor",
    "suit": "Pentacles",
    "name_ko": "펜타클 킹",
    "name_en": "King of Pentacles",
    "rank": 14,
    "meaning_up": "재정적 성공, 사업가 정신, 보안, 관대함",
    "meaning_rev": "탐욕, 물질주의, 재정적 무능력",
    "image": "images/Pentacles14.jpg"
  }
];

// 전역에서 사용할 수 있도록 export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FULL_TAROT_CARDS };
}