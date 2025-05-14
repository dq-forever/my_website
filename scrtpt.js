// 导航高亮逻辑
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// gallery.js

// 图片放大功能模块
function initGallery() {
    // 图片点击事件
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.querySelector('.modal-overlay');
            const modalImg = modal.querySelector('.modal-image');
            modal.style.display = 'flex';
            modalImg.src = img.src;
        });
    });

    // 关闭按钮事件
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.querySelector('.modal-overlay').style.display = 'none';
    });

    // 背景点击关闭
    document.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if(e.target === e.currentTarget) {
            e.currentTarget.style.display = 'none';
        }
    });
}

// 自动滚动控制模块
function setupAutoScroll() {
    const tracks = document.querySelectorAll('.gallery-track');
    tracks.forEach(track => {
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    setupAutoScroll();
});
