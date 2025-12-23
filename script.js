/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // 選取所有帶有 .counter 類別的元素
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // 數字越小跑越慢，越大跑越快

    // 定義動畫函式
    const startCounter = (counter) => {
        const updateCount = () => {
            // 取得目標數字 (從 HTML 的 data-target 屬性)
            const target = +counter.getAttribute('data-target');
            // 取得當前數字
            const count = +counter.innerText;
            
            // 計算每次增加的步長 (讓所有數字在差不多時間跑完)
            const inc = target / speed;

            if (count < target) {
                // 如果還沒到目標，繼續增加
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20); // 每 20ms 更新一次
            } else {
                // 確保最終數字精準等於目標
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // 建立觀察者 (Intersection Observer)
    // 只有當元素進入畫面 50% 時才觸發動畫
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                // 開始跑動畫
                startCounter(counter);
                // 動畫跑過一次後，就停止觀察 (避免往回滑又重跑)
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5 // 門檻：元素出現 50% 時觸發
    });

    // 開始觀察每一個計數器
    counters.forEach(counter => {
        observer.observe(counter);
    });
});
/* ============================
   手機版選單切換邏輯
   ============================ */
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('nav ul');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        // 1. 切換選單的顯示狀態 (滑入/滑出)
        navLinks.classList.toggle('active');
        
        // 2. 切換按鈕的形狀 (三條線 <-> 叉叉)
        menuBtn.classList.toggle('active');
    });

    // 點擊連結後自動收起選單 (優化體驗)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

}
