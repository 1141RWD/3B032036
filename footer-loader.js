// 當 DOM 內容加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 獲取頁尾佔位符元素
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (footerPlaceholder) {
        // 使用 fetch API 載入頁尾 HTML
        fetch('_footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('無法載入頁尾');
                }
                return response.text();
            })
            .then(html => {
                // 將載入的 HTML 插入到佔位符元素中
                footerPlaceholder.innerHTML = html;
                
                // 初始化頁尾功能（如訂閱表單等）
                initFooterFunctions();
            })
            .catch(error => {
                console.error('載入頁尾時發生錯誤:', error);
                footerPlaceholder.innerHTML = '<p>頁尾載入失敗</p>';
            });
    }
});

// 初始化頁尾中的互動功能
function initFooterFunctions() {
    // 訂閱電子報功能
    const subscribeBtn = document.querySelector('#footer-placeholder .btn-primary');
    const emailInput = document.querySelector('#footer-placeholder input[type="email"]');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (email && validateEmail(email)) {
                alert('感謝您的訂閱！');
                emailInput.value = '';
            } else {
                alert('請輸入有效的電子郵件地址');
            }
        });
    }
}

// 電子郵件驗證功能
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}