document.addEventListener("DOMContentLoaded", () => {
    // ======= DOM Elements =======
    const menuToggleBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const logo = document.getElementById("logo");
    const cartIcon = document.getElementById("cart-icon");
    const desktopHeader = document.querySelector(".desktop-header");
    const mobileHeader = document.querySelector(".mobile-header");
    const mobileNavLinks = document.querySelectorAll(".mobile-menu a");
    const playButton = document.getElementById("play-button");
    const bannerVideo = document.getElementById("banner-video");
    const fadeInSections = document.querySelectorAll(".blog-content, .why-pink, .latest-news, .main-banner, .blog_banner_main");
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const headerOffset = 80;

    // journal js
    document.addEventListener("DOMContentLoaded", function () {
        const container = document.querySelector(".journal-container");
        const items = document.querySelectorAll(".journal-item");
        let itemWidth = items[0].offsetWidth + 10; // Item width + gap

        container.scrollLeft = 0; // Ensure first slide is fully visible

        container.addEventListener("scroll", () => {
            clearTimeout(container.scrollEndTimer);
            container.scrollEndTimer = setTimeout(() => {
                let nearestSlide = Math.round(container.scrollLeft / itemWidth);
                container.scrollTo({
                    left: nearestSlide * itemWidth,
                    behavior: "smooth",
                });
            }, 100);
        });
    });

    // ======= Utility Functions =======
    const isMobileView = () => window.innerWidth <= 1024;

    const updateHeaderScrollState = () => {
        if (!mobileMenu.classList.contains("open")) {
            const isScrolled = window.scrollY > 50;
            desktopHeader?.classList.toggle("scrolled", isScrolled);
            mobileHeader?.classList.toggle("scrolled", isScrolled);
        }
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove("open");
        menuToggleBtn?.classList.remove("active");
        logo?.classList.remove("hide");
        cartIcon?.classList.remove("hide");
        updateHeaderScrollState();
    };

    const handleSmoothScroll = (link) => {
        const targetId = link.getAttribute("href")?.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Smoth scroll effect on link click
    scrollLinks.forEach(link => {
        link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            e.preventDefault();

            const targetPosition = target.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = targetPosition - headerOffset;

            window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
            });
        }
        });
    });

    // ======= Event Listeners =======

    // Scroll Event (throttled)
    let scrollTimeout;
    window.addEventListener("scroll", () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateHeaderScrollState();
                scrollTimeout = null;
            }, 100);
        }
    });

    // Menu Toggle
    menuToggleBtn?.addEventListener("click", () => {
        if (isMobileView()) {
            const isMenuOpen = mobileMenu.classList.contains("open");
            menuToggleBtn.classList.toggle("active");
            mobileMenu.classList.toggle("open");
            logo?.classList.toggle("hide");
            cartIcon?.classList.toggle("hide");

            if (!isMenuOpen) {
                mobileHeader?.classList.remove("scrolled");
            } else {
                updateHeaderScrollState();
            }
        }
    });

    // Mobile Menu Link Click
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            if (isMobileView()) {
                closeMobileMenu();
            }

            if (link.getAttribute("href")?.startsWith("#")) {
                e.preventDefault();
                handleSmoothScroll(link);
            }
        });
    });

    // Window Resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(() => {
                if (!isMobileView()) {
                    closeMobileMenu();
                }
                resizeTimeout = null;
            }, 150);
        }
    });

    // Video Play
    if (playButton && bannerVideo) {
        playButton.addEventListener("click", () => {
            playButton.style.display = "none";
            bannerVideo.style.display = "block";
            bannerVideo.play();
        });
    }

    // Blog Section Fade-in Animation
    fadeInSections.forEach(section => section.classList.add("fade-in"));

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, idx * 150);
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    fadeInSections.forEach(section => observer.observe(section));
});
