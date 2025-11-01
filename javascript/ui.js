/**
 * UI 관련 함수들
 * 모달, 애니메이션, 사용자 인터랙션 처리
 */

// 모달 관련 변수
let currentModal = null;

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeUI();
    initializeTarot();
});

// UI 초기화 함수
function initializeUI() {
    setupNavigation();
    setupModal();
    setupScrollAnimations();
    setupSmoothScrolling();
    setupCardInteractions();
    setupResponsiveLayout();
}

// 네비게이션 설정
function setupNavigation() {
    const nav = document.querySelector('.navigation');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 모바일 네비게이션 토글
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-active');
        });
    }
    
    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
            }
        });
    });
    
    // 스크롤 시 네비게이션 스타일 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
}

// 모달 설정
function setupModal() {
    // 모든 모달 닫기 버튼 이벤트
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-close') || 
            e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentModal) {
            closeModal();
        }
    });
}

// 카드 모달 표시
function showCardModal(card) {
    const modal = document.getElementById('cardModal');
    const modalCardImage = document.getElementById('modalCardImage');
    const modalCardName = document.getElementById('modalCardName');
    const modalCardMeaning = document.getElementById('modalCardMeaning');
    const modalCardDescription = document.getElementById('modalCardDescription');
    
    if (modal && modalCardImage && modalCardName && modalCardMeaning) {
        // 카드 정보 설정
        modalCardName.textContent = `${card.name_ko} (${card.name_en})`;
        
        // 카드 의미 설정 (정방향/역방향 고려)
        const meaning = card.reversed ? card.meaning_rev : card.meaning_up;
        const orientation = card.reversed ? "역방향" : "정방향";
        modalCardMeaning.textContent = `${orientation}: ${meaning}`;
        
        // 추가 설명이 있는 경우
        if (modalCardDescription && card.description) {
            modalCardDescription.textContent = card.description;
            modalCardDescription.style.display = 'block';
        } else if (modalCardDescription) {
            modalCardDescription.style.display = 'none';
        }
        
        // 이미지 설정
        const imagePath = getCardImagePath ? getCardImagePath(card) : card.image || 'images/CardBacks.jpg';
        modalCardImage.src = imagePath;
        modalCardImage.alt = card.name_ko;
        
        // 이미지 로드 오류 시 기본 이미지 사용
        modalCardImage.onerror = function() {
            this.src = 'images/CardBacks.jpg';
        };
        
        // 역방향 카드인 경우 회전 효과
        if (card.reversed) {
            modalCardImage.style.transform = 'rotate(180deg)';
        } else {
            modalCardImage.style.transform = 'rotate(0deg)';
        }
        
        // 모달 표시
        modal.style.display = 'flex';
        modal.classList.add('modal-show');
        currentModal = modal;
        
        // 접근성을 위한 포커스 설정
        modal.focus();
    }
}

// 모달 닫기
function closeModal() {
    if (currentModal) {
        currentModal.classList.remove('modal-show');
        setTimeout(() => {
            currentModal.style.display = 'none';
            currentModal = null;
        }, 300);
    }
}

// 스크롤 애니메이션 설정
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 관찰
    const animateElements = document.querySelectorAll('.fade-in, .slide-up, .card-item');
    animateElements.forEach(el => observer.observe(el));
}

// 부드러운 스크롤 설정
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // 네비게이션 높이 고려
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 카드 인터랙션 설정
function setupCardInteractions() {
    // 카드 호버 효과
    document.addEventListener('mouseenter', function(e) {
        if (e.target.classList.contains('card-item') || 
            e.target.closest('.card-item')) {
            const card = e.target.closest('.card-item') || e.target;
            card.classList.add('card-hover');
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target.classList.contains('card-item') || 
            e.target.closest('.card-item')) {
            const card = e.target.closest('.card-item') || e.target;
            card.classList.remove('card-hover');
        }
    }, true);
    
    // 카드 클릭 효과
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('card-image') || 
            e.target.closest('.card-image')) {
            const cardElement = e.target.closest('.card-item');
            if (cardElement) {
                addClickRipple(e.target, e);
            }
        }
    });
}

// 클릭 리플 효과 추가
function addClickRipple(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        z-index: 1000;
    `;
    
    ripple.classList.add('ripple');
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // 애니메이션 트리거
    requestAnimationFrame(() => {
        ripple.style.transform = 'scale(2)';
        ripple.style.opacity = '0';
        ripple.style.transition = 'all 0.6s ease-out';
    });
    
    // 애니메이션 완료 후 제거
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// 반응형 레이아웃 설정
function setupResponsiveLayout() {
    function handleResize() {
        const width = window.innerWidth;
        const body = document.body;
        
        // 화면 크기에 따른 클래스 추가/제거
        body.classList.remove('mobile', 'tablet', 'desktop');
        
        if (width < 768) {
            body.classList.add('mobile');
        } else if (width < 1024) {
            body.classList.add('tablet');
        } else {
            body.classList.add('desktop');
        }
        
        // 카드 그리드 조정
        adjustCardGrid();
    }
    
    window.addEventListener('resize', debounce(handleResize, 250));
    handleResize(); // 초기 실행
}

// 카드 그리드 조정
function adjustCardGrid() {
    const cardContainer = document.querySelector('.cards-grid');
    if (!cardContainer) return;
    
    const containerWidth = cardContainer.offsetWidth;
    const cardWidth = 200; // 기본 카드 너비
    const gap = 20; // 카드 간격
    const columns = Math.floor((containerWidth + gap) / (cardWidth + gap));
    
    cardContainer.style.gridTemplateColumns = `repeat(${Math.max(1, columns)}, 1fr)`;
}

// 로딩 스피너 표시/숨김
function showLoading(target = document.body) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
        <div class="spinner-circle"></div>
        <div class="spinner-text">로딩 중...</div>
    `;
    
    if (typeof target === 'string') {
        target = document.querySelector(target);
    }
    
    if (target) {
        target.style.position = 'relative';
        target.appendChild(spinner);
    }
    
    return spinner;
}

function hideLoading(spinner) {
    if (spinner && spinner.parentNode) {
        spinner.parentNode.removeChild(spinner);
    }
}

// 토스트 메시지 표시
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 토스트 컨테이너가 없으면 생성
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // 애니메이션을 위한 지연
    setTimeout(() => toast.classList.add('toast-show'), 100);
    
    // 자동 제거
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스로틀 함수
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 이미지 지연 로딩
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 폼 유효성 검사
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const errorElement = input.nextElementSibling;
        
        if (!value) {
            isValid = false;
            input.classList.add('error');
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.textContent = '이 필드는 필수입니다.';
                errorElement.style.display = 'block';
            }
        } else {
            input.classList.remove('error');
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.style.display = 'none';
            }
        }
    });
    
    return isValid;
}

// 타로 관련 초기화
function initializeTarot() {
    // 타로 카드 데이터 로드 확인
    if (typeof FULL_TAROT_CARDS !== 'undefined') {
        console.log('타로 카드 데이터 로드 완료:', FULL_TAROT_CARDS.length, '개');
    } else if (typeof simpleTarot !== 'undefined') {
        console.log('간단한 타로 시스템 로드 완료');
    } else {
        console.warn('타로 카드 데이터를 찾을 수 없습니다.');
    }
    
    // 지연 로딩 설정
    setupLazyLoading();
}

// 유틸리티 함수들
const UIUtils = {
    // 요소가 뷰포트에 있는지 확인
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // 요소 높이 애니메이션
    slideDown(element, duration = 300) {
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease-out`;
        
        const height = element.scrollHeight;
        element.style.height = height + 'px';
        
        setTimeout(() => {
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    },
    
    slideUp(element, duration = 300) {
        element.style.height = element.offsetHeight + 'px';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.height = '0';
        });
        
        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    },
    
    // 텍스트 복사
    copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // 구 브라우저 지원
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return Promise.resolve();
        }
    }
};

// 전역으로 접근 가능한 함수들
window.showCardModal = showCardModal;
window.closeModal = closeModal;
window.showToast = showToast;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.UIUtils = UIUtils;
