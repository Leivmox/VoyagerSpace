// --- 轮播图逻辑 (Carousel Logic) ---

document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0; // 从0开始计数
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let slideTimer;

    // 1. 初始化显示第一张
    showSlides(slideIndex);
    startAutoPlay();

    // 2. 绑定点击事件 (左右箭头)
    // 这种写法比 html onclick 更稳定
    if(prevBtn) {
        prevBtn.addEventListener('click', function() {
            changeSlide(-1);
            resetTimer();
        });
    }
    
    if(nextBtn) {
        nextBtn.addEventListener('click', function() {
            changeSlide(1);
            resetTimer();
        });
    }

    // 3. 绑定点击事件 (小圆点)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            slideIndex = index;
            showSlides(slideIndex);
            resetTimer();
        });
    });

    // --- 核心函数定义 ---

    // 切换上一张/下一张
    function changeSlide(n) {
        slideIndex += n;
        // 循环逻辑
        if (slideIndex >= slides.length) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = slides.length - 1; }
        showSlides(slideIndex);
    }

    // 显示指定幻灯片
    function showSlides(n) {
        // 先移除所有 active 样式
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        // 给当前的添加 active
        // 这里的 n 可能会因为点击变得不准，所以重新校准一下边界
        if (n >= slides.length) n = 0;
        if (n < 0) n = slides.length - 1;
        
        slides[n].classList.add("active");
        dots[n].classList.add("active");
    }

    // 自动播放
    function startAutoPlay() {
        slideTimer = setInterval(function() {
            changeSlide(1);
        }, 6000); // 4秒切一次
    }

    // 重置定时器（防止手动点击后立刻自动切）
    function resetTimer() {
        clearInterval(slideTimer);
        startAutoPlay();
    }
});