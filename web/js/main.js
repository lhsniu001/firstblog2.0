// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});

// 设置当前活动页面的导航链接样式
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 项目过滤功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 表单提交处理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // 这里可以添加表单提交的处理逻辑
            alert('消息已发送！');
            contactForm.reset();
        });
    }

    // 轮播图功能
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        let currentSlide = 0;
        const slideCount = slides.length;
        let slideInterval;

        // 确保正确初始化轮播图
        function initCarousel() {
            // 设置初始幻灯片
            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            
            // 设置初始点
            dots.forEach((dot, index) => {
                if (index === 0) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // 确保按钮可见
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
        }

        // 切换到指定幻灯片
        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slideCount) % slideCount;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // 下一张幻灯片
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        // 上一张幻灯片
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // 自动播放
        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
        }

        // 停止自动播放
        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        // 绑定按钮事件
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault(); // 防止默认行为
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault(); // 防止默认行为
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });

        // 绑定圆点事件
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopSlideShow();
                startSlideShow();
            });
        });

        // 鼠标悬停时停止自动播放
        carousel.addEventListener('mouseenter', stopSlideShow);
        carousel.addEventListener('mouseleave', startSlideShow);

        // 初始化轮播图
        initCarousel();
        // 开始自动播放
        startSlideShow();
        
        // 添加触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopSlideShow();
        }, false);
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                // 向左滑动，下一张
                nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                // 向右滑动，上一张
                prevSlide();
            }
            startSlideShow();
        }, false);
    }

    // 平滑滚动到文章锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 博客文章图片点击放大功能
    const images = document.querySelectorAll('.post-image');
    const overlay = document.querySelector('.image-overlay');

    if (images.length && overlay) {
        images.forEach(image => {
            image.addEventListener('click', () => {
                if (!image.classList.contains('expanded')) {
                    // 放大图片
                    image.classList.add('expanded');
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // 防止背景滚动
                }
            });
        });

        // 点击遮罩层或已放大的图片时关闭
        overlay.addEventListener('click', closeExpandedImage);
        images.forEach(image => {
            image.addEventListener('click', function() {
                if (this.classList.contains('expanded')) {
                    closeExpandedImage();
                }
            });
        });

        // 按ESC键关闭图片
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeExpandedImage();
            }
        });

        function closeExpandedImage() {
            const expandedImage = document.querySelector('.post-image.expanded');
            if (expandedImage) {
                expandedImage.classList.remove('expanded');
                overlay.classList.remove('active');
                document.body.style.overflow = ''; // 恢复背景滚动
            }
        }
    }

    // 博客文章分类筛选功能
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            button.classList.add('active');

            const selectedCategory = button.textContent.trim();

            blogPosts.forEach(post => {
                const postCategory = post.querySelector('.post-category').textContent.trim();
                if (selectedCategory === '全部' || selectedCategory === postCategory) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeIn 0.5s ease';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // 添加淡入动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // 博客文章点赞功能
    const likeBtns = document.querySelectorAll('.like-btn');
    
    // 从本地存储加载已点赞的文章
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || {};
    
    likeBtns.forEach(btn => {
        const itemId = btn.getAttribute('data-id');
        
        // 如果已经点赞过，显示已点赞状态
        if (likedItems[itemId]) {
            btn.classList.add('liked');
            btn.innerHTML = '<i class="fas fa-thumbs-up"></i> 已点赞';
        }
        
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const likeCountElement = this.closest('.blog-post, .project-card').querySelector('.like-count');
            
            if (!likedItems[itemId]) {
                // 增加点赞数
                let likeCount = parseInt(likeCountElement.textContent);
                likeCount++;
                likeCountElement.textContent = likeCount;
                
                // 标记为已点赞
                this.classList.add('liked');
                this.innerHTML = '<i class="fas fa-thumbs-up"></i> 已点赞';
                
                // 保存到本地存储
                likedItems[itemId] = true;
                localStorage.setItem('likedItems', JSON.stringify(likedItems));
            }
        });
    });
    
    // 记录文章浏览量
    const viewCounts = JSON.parse(localStorage.getItem('viewCounts')) || {};
    
    // 如果是文章页面，加载和更新浏览量
    if (window.location.pathname.includes('blog.html') || window.location.pathname.includes('projects.html')) {
        const articles = document.querySelectorAll('.blog-post, .project-card');
        
        articles.forEach(article => {
            const itemId = article.id;
            if (itemId) {
                const viewCountElement = article.querySelector('.view-count');
                if (viewCountElement) {
                    // 从本地存储中获取当前浏览量，如果没有则设为0
                    let count = viewCounts[itemId] || 0;
                    
                    // 增加浏览量
                    count++;
                    
                    // 更新显示
                    viewCountElement.textContent = count;
                    
                    // 保存到本地存储
                    viewCounts[itemId] = count;
                    localStorage.setItem('viewCounts', JSON.stringify(viewCounts));
                }
            }
        });
    }
    
    // 定期刷新浏览量显示（每5秒更新一次）
    function updateViewCounts() {
        const viewCounts = JSON.parse(localStorage.getItem('viewCounts')) || {};
        const viewCountElements = document.querySelectorAll('.view-count');
        
        viewCountElements.forEach(element => {
            const itemId = element.closest('.blog-post, .project-card').id;
            if (itemId && viewCounts[itemId]) {
                element.textContent = viewCounts[itemId];
            }
        });
    }
    
    // 每5秒刷新一次浏览量显示
    setInterval(updateViewCounts, 5000);
    
    // 博客文章阅读全文功能
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.parentElement;
            const excerpt = content.querySelector('.post-excerpt');
            const fullContent = content.querySelector('.full-content');
            
            if (fullContent.style.display === 'none') {
                // 显示全文
                excerpt.style.display = 'none';
                fullContent.style.display = 'block';
                this.textContent = '收起全文';
            } else {
                // 收起全文
                excerpt.style.display = 'block';
                fullContent.style.display = 'none';
                this.textContent = '阅读全文';
            }
        });
    });
    
    // 项目详情查看功能
    const detailsBtns = document.querySelectorAll('.details-btn');
    const projectOverlay = document.querySelector('.project-overlay');
    
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectDetails = projectCard.querySelector('.project-details');
            
            if (projectDetails.style.display === 'none') {
                // 显示详情
                projectDetails.style.display = 'block';
                this.textContent = '收起详情';
            } else {
                // 收起详情
                projectDetails.style.display = 'none';
                this.textContent = '查看详情';
            }
        });
    });
    
    // ESC键关闭项目详情
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectOverlay && projectOverlay.classList.contains('active')) {
            closeProjectDetails();
        }
    });
    
    function closeProjectDetails() {
        if (projectOverlay) {
            projectOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});