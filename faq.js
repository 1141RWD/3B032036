document.addEventListener('DOMContentLoaded', function() {
    // FAQ 開合功能
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 檢查其他是否已經打開，如果有則關閉
            const currentlyActive = document.querySelector('.faq-item.active');
            if(currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            // 切換當前項目的開合狀態
            item.classList.toggle('active');
        });
    });
});