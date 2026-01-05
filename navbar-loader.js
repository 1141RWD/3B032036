// 當 DOM 內容加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 獲取導覽列佔位符元素
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    
    if (navbarPlaceholder) {
        // 使用 fetch API 載入導覽列 HTML
        fetch('_navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('無法載入導覽列');
                }
                return response.text();
            })
            .then(html => {
                // 將載入的 HTML 插入到佔位符元素中
                navbarPlaceholder.innerHTML = html;
                
                // 載入後初始化手機版選單功能
                initMobileMenu();
                
                // 標記當前活動頁面
                markActivePage();
            })
            .catch(error => {
                console.error('載入導覽列時發生錯誤:', error);
                navbarPlaceholder.innerHTML = '<p>導覽列載入失敗</p>';
            });
    }
});

// 初始化手機版選單功能
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            // 切換手機選單的開啟/關閉狀態
            this.classList.toggle('open');
            navLinks.classList.toggle('active');
        });
    }
}

// 標記當前活動頁面
function markActivePage() {
    // 獲取當前頁面的路徑名稱
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // 選擇所有導覽連結
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 對每個連結檢查是否匹配當前頁面
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}