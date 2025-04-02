document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const closeMenu = document.getElementById("close-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click", function () {
        mobileMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
    });
});

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

if (document.getElementsByClassName('mySwiper').length > 0) {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

/* Brand Carousel */
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    if (track) {
        const images = [...track.children];

        images.forEach(image => {
            let clone = image.cloneNode(true);
            track.appendChild(clone);
        });
    }
});

/* Mobile Scroll */
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const openMenuBtn = document.querySelector(".hamburger-menu");
    const closeMenuBtn = document.getElementById("close-menu");
    const body = document.body;
    let scrollPosition = 0;


    function disableScroll() {
        scrollPosition = window.scrollY;
        body.style.position = "fixed";
        body.style.top = `-${scrollPosition}px`;
        body.style.width = "100%";
    }


    function enableScroll() {
        body.style.position = "";
        body.style.top = "";
        window.scrollTo(0, scrollPosition);
    }


    openMenuBtn.addEventListener("click", function () {
        mobileMenu.classList.add("active");
        disableScroll();
    });


    closeMenuBtn.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        enableScroll();
    });
});

document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    document.querySelector(".parallax-bg").style.transform = `translateY(${scrollPosition * 0.5}px)`;
});