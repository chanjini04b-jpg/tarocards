// 메인 타로 리딩 시스템 테스트 헬퍼 함수들
// 브라우저 콘솔에서 실행할 수 있는 디버그 함수들

// 메인 타로 시스템 상태 확인
function checkMainTarotSystem() {
    console.log('=== 메인 타로 리딩 시스템 상태 ===');
    
    // SimpleTarot 시스템 확인
    if (typeof simpleTarot !== 'undefined') {
        console.log('✅ SimpleTarot 시스템 로드됨');
        console.log('카드 수:', simpleTarot.cards.length);
        console.log('준비 상태:', simpleTarot.isReady);
    } else {
        console.log('❌ SimpleTarot 시스템 없음');
    }
    
    // HTML 요소들 확인
    const elements = {
        userQuestion: document.getElementById('userQuestion'),
        drawCardsBtn: document.getElementById('drawCardsBtn'),
        readingResults: document.getElementById('readingResults'),
        drawnCards: document.getElementById('drawnCards'),
        spreadOptions: document.querySelectorAll('.spread-option')
    };
    
    console.log('--- HTML 요소 확인 ---');
    for (const [name, element] of Object.entries(elements)) {
        if (element) {
            if (element.length !== undefined) {
                console.log(`✅ ${name}: ${element.length}개`);
            } else {
                console.log(`✅ ${name}: 발견`);
            }
        } else {
            console.log(`❌ ${name}: 없음`);
        }
    }
    
    // 이벤트 리스너 확인
    const drawBtn = document.getElementById('drawCardsBtn');
    if (drawBtn) {
        console.log('카드 뽑기 버튼 상태:', drawBtn.disabled ? '비활성화' : '활성화');
    }
    
    // 현재 선택된 스프레드 확인
    const activeSpread = document.querySelector('.spread-option.active');
    if (activeSpread) {
        console.log('선택된 스프레드:', activeSpread.dataset.count + '장');
    }
}

// 수동으로 카드 뽑기 테스트
function testDrawCards() {
    console.log('=== 수동 카드 뽑기 테스트 ===');
    
    // 질문 자동 입력
    const questionInput = document.getElementById('userQuestion');
    if (questionInput) {
        questionInput.value = '테스트 질문: 나의 오늘은 어떨까요?';
        console.log('질문 입력 완료');
        
        // 이벤트 트리거
        questionInput.dispatchEvent(new Event('input'));
    }
    
    // 스프레드 선택 (원 카드)
    const firstSpread = document.querySelector('.spread-option[data-count="1"]');
    if (firstSpread) {
        firstSpread.click();
        console.log('원 카드 선택 완료');
    }
    
    // 카드 뽑기 실행
    setTimeout(() => {
        const drawBtn = document.getElementById('drawCardsBtn');
        if (drawBtn && !drawBtn.disabled) {
            drawBtn.click();
            console.log('카드 뽑기 실행');
        } else {
            console.log('카드 뽑기 버튼이 비활성화되어 있습니다');
        }
    }, 500);
}

// 3장 스프레드 테스트
function testThreeCardSpread() {
    console.log('=== 3장 스프레드 테스트 ===');
    
    // 질문 자동 입력
    const questionInput = document.getElementById('userQuestion');
    if (questionInput) {
        questionInput.value = '테스트 질문: 과거-현재-미래를 알고 싶습니다';
        questionInput.dispatchEvent(new Event('input'));
    }
    
    // 3장 스프레드 선택
    const threeSpread = document.querySelector('.spread-option[data-count="3"]');
    if (threeSpread) {
        threeSpread.click();
        console.log('3장 스프레드 선택 완료');
    }
    
    // 카드 뽑기 실행
    setTimeout(() => {
        const drawBtn = document.getElementById('drawCardsBtn');
        if (drawBtn && !drawBtn.disabled) {
            drawBtn.click();
            console.log('3장 카드 뽑기 실행');
        }
    }, 500);
}

// 새로운 리딩 테스트
function testNewReading() {
    console.log('=== 새로운 리딩 테스트 ===');
    
    const newReadingBtn = document.getElementById('newReadingBtn');
    if (newReadingBtn) {
        newReadingBtn.click();
        console.log('새로운 리딩 시작');
    } else {
        console.log('새로운 리딩 버튼을 찾을 수 없습니다');
    }
}

// 전역으로 함수들 등록
window.checkMainTarotSystem = checkMainTarotSystem;
window.testDrawCards = testDrawCards;
window.testThreeCardSpread = testThreeCardSpread;
window.testNewReading = testNewReading;

console.log('메인 타로 테스트 함수들이 로드되었습니다.');
console.log('사용법:');
console.log('- checkMainTarotSystem(): 시스템 상태 확인');
console.log('- testDrawCards(): 원 카드 뽑기 테스트');
console.log('- testThreeCardSpread(): 3장 스프레드 테스트');
console.log('- testNewReading(): 새로운 리딩 시작 테스트');