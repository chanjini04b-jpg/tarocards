// UI Helper Functions
function showCardModal(card) {
    const modal = document.getElementById('cardModal');
    const modalCardImage = document.getElementById('modalCardImage');
    const modalCardName = document.getElementById('modalCardName');
    const modalCardMeaning = document.getElementById('modalCardMeaning');

    if (modal && modalCardImage && modalCardName && modalCardMeaning) {
        modalCardName.textContent = `${card.name_ko} (${card.name_en})`;
        modalCardMeaning.textContent = card.reversed ? card.meaning_rev : card.meaning_up;
        
        const imagePath = getCardImagePath(card);
        modalCardImage.src = imagePath;
        modalCardImage.onerror = function() {
            this.src = 'images/CardBacks.jpg';
        };

        modal.style.display = 'block';
    }
}

function closeCardModal() {
    const modal = document.getElementById('cardModal');
    if (modal) modal.style.display = 'none';
}

function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'block';
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerHTML = result;
        resultElement.style.display = 'block';
    }
}

function createCardHTML(card) {
    const imagePath = getCardImagePath(card);
    return `
        <div class="card-item" onclick="showCardModal(${JSON.stringify(card).replace(/"/g, '&quot;')})">
            <div class="card-image-container">
                <img src="${imagePath}" alt="${card.name_ko}" class="card-image" onerror="this.src='images/CardBacks.jpg'">
                ${card.reversed ? '<div class="reversed-indicator">역방향</div>' : ''}
            </div>
            <div class="card-info">
                <h3>${card.name_ko}</h3>
                <p>${card.reversed ? card.meaning_rev : card.meaning_up}</p>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close');
    if (closeButton) closeButton.addEventListener('click', closeCardModal);

    const modal = document.getElementById('cardModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) closeCardModal();
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') closeCardModal();
    });
});