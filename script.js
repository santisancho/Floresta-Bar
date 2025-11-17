// Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Category Accordion
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const category = header.parentElement;
            const wasActive = category.classList.contains('active');
            
            const currentTab = category.closest('.tab-content');
            const allCategories = currentTab.querySelectorAll('.menu-category');
            allCategories.forEach(cat => cat.classList.remove('active'));
            
            if (!wasActive) {
                category.classList.add('active');
            }
        });
    });
    
    // Open first category by default
    const firstBebidas = document.querySelector('#bebidas .menu-category');
    const firstComida = document.querySelector('#comida .menu-category');
    if (firstBebidas) firstBebidas.classList.add('active');
    if (firstComida) firstComida.classList.add('active');
    
    // Smooth scroll for hero CTA
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = heroCta.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Photos Carousel
    const photoSlides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentPhotoSlide = 0;
    let photoInterval;
    
    function showPhotoSlide(index) {
        photoSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        if (index >= photoSlides.length) currentPhotoSlide = 0;
        if (index < 0) currentPhotoSlide = photoSlides.length - 1;
        
        photoSlides[currentPhotoSlide].classList.add('active');
        indicators[currentPhotoSlide].classList.add('active');
    }
    
    function nextPhotoSlide() {
        currentPhotoSlide++;
        if (currentPhotoSlide >= photoSlides.length) currentPhotoSlide = 0;
        showPhotoSlide(currentPhotoSlide);
    }
    
    function prevPhotoSlide() {
        currentPhotoSlide--;
        if (currentPhotoSlide < 0) currentPhotoSlide = photoSlides.length - 1;
        showPhotoSlide(currentPhotoSlide);
    }
    
    function startPhotoCarousel() {
        photoInterval = setInterval(nextPhotoSlide, 4000);
    }
    
    function stopPhotoCarousel() {
        clearInterval(photoInterval);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextPhotoSlide();
            stopPhotoCarousel();
            startPhotoCarousel();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevPhotoSlide();
            stopPhotoCarousel();
            startPhotoCarousel();
        });
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentPhotoSlide = index;
            showPhotoSlide(currentPhotoSlide);
            stopPhotoCarousel();
            startPhotoCarousel();
        });
    });
    
    startPhotoCarousel();
    
    // Video Background Carousel
    const bgVideos = document.querySelectorAll('.bg-video');
    const videoDots = document.querySelectorAll('.video-dot');
    let currentVideoIndex = 0;
    let videoInterval;
    
    function showVideo(index) {
        bgVideos.forEach((video, i) => {
            video.classList.remove('active');
            if (i !== index) {
                video.pause();
            }
        });
        
        videoDots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= bgVideos.length) currentVideoIndex = 0;
        if (index < 0) currentVideoIndex = bgVideos.length - 1;
        
        bgVideos[currentVideoIndex].classList.add('active');
        bgVideos[currentVideoIndex].play();
        videoDots[currentVideoIndex].classList.add('active');
    }
    
    function nextVideo() {
        currentVideoIndex++;
        if (currentVideoIndex >= bgVideos.length) currentVideoIndex = 0;
        showVideo(currentVideoIndex);
    }
    
    function startVideoCarousel() {
        videoInterval = setInterval(nextVideo, 6000);
    }
    
    videoDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentVideoIndex = index;
            showVideo(currentVideoIndex);
            clearInterval(videoInterval);
            startVideoCarousel();
        });
    });
    
    // Iniciar primer video
    if (bgVideos.length > 0) {
        bgVideos[0].play();
        startVideoCarousel();
    }
    
    // Pausar videos cuando no estén visibles
    const experienceSection = document.querySelector('.experience-section');
    const observerOptions = {
        threshold: 0.5
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bgVideos[currentVideoIndex].play();
                startVideoCarousel();
            } else {
                bgVideos.forEach(video => video.pause());
                clearInterval(videoInterval);
            }
        });
    }, observerOptions);
    
    if (experienceSection) {
        sectionObserver.observe(experienceSection);
    }
});


