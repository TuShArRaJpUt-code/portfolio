// ==========================
// DYNAMIC TYPING EFFECT
// ==========================
const roles = ["App Developer", "Frontend Developer", "Web Developer", "Python Developer","Programmer","Tech Enthusiast"];
let roleIndex = 0, charIndex = 0;
const dynamicText = document.getElementById("dynamic-text");
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetween = 2000;

function typeRole() {
    if (charIndex < roles[roleIndex].length) {
        dynamicText.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, typingSpeed);
    } else {
        setTimeout(eraseRole, delayBetween);
    }
}

function eraseRole() {
    if (charIndex > 0) {
        dynamicText.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseRole, erasingSpeed);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, typingSpeed);
    }
}

// ==========================
// 3D CAROUSEL SETUP
// ==========================
const carousel = document.getElementById("carousel");
const cards = carousel.getElementsByClassName("project-card");
let currentRotation = 0;
let autoRotate = true;
const autoSpeed = 0.3;
let lastMouseX = 0;
let isDragging = false;

function setupCarousel() {
    const numCards = cards.length;
    const radius = Math.min(window.innerWidth / 3, 300); // responsive radius
    for (let i = 0; i < numCards; i++) {
        const angle = (360 / numCards) * i;
        cards[i].style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    }
}

function rotateCarousel() {
    if (autoRotate && !isDragging) {
        currentRotation += autoSpeed;
        carousel.style.transform = `rotateY(${currentRotation}deg)`;
    }
    requestAnimationFrame(rotateCarousel);
}
rotateCarousel();

// Carousel Interactivity
carousel.addEventListener("mouseenter", () => autoRotate = false);
carousel.addEventListener("mouseleave", () => autoRotate = true);

carousel.addEventListener("mousedown", (e) => { isDragging = true; lastMouseX = e.clientX; });
carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const delta = e.clientX - lastMouseX;
    currentRotation += delta * 0.5;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
    lastMouseX = e.clientX;
});
carousel.addEventListener("mouseup", () => isDragging = false);
carousel.addEventListener("mouseleave", () => isDragging = false);

// Touch events
carousel.addEventListener("touchstart", (e) => { isDragging = true; lastMouseX = e.touches[0].clientX; });
carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - lastMouseX;
    currentRotation += delta * 0.5;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
    lastMouseX = e.touches[0].clientX;
});
carousel.addEventListener("touchend", () => isDragging = false);

// ==========================
// INTRO ANIMATION & LOADER
// ==========================
const loader = document.getElementById("loader");
const introImg = document.querySelector('.intro-img');
const introText = document.querySelector('.intro-text');
const minLoaderTime = 3000;
const startTime = Date.now();

window.addEventListener("load", () => {
    // Loader fade
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(minLoaderTime - elapsedTime, 0);
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease";
        setTimeout(() => loader.style.display = "none", 500);
    }, remainingTime);

    // Intro animation
    introImg.classList.add('animate-left');
    introText.classList.add('animate-right');
});

// ==========================
// SECTIONS & SKILLS ANIMATION
// ==========================
const sections = document.querySelectorAll('section');
const skillFills = document.querySelectorAll('.skill-fill');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            if(entry.target.id === 'skills'){
                skillFills.forEach(fill => fill.style.width = fill.dataset.width);
            }
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => sectionObserver.observe(section));

// ==========================
// INITIALIZE
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    typeRole();
    setupCarousel();
});
function animateCount(id, end) {
    let count = 0;
    const el = document.getElementById(id);
    const step = Math.ceil(end / 100);
    const interval = setInterval(() => {
        count += step;
        if(count > end) count = end;
        el.textContent = count;
        if(count === end) clearInterval(interval);
    }, 20);
}

const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        animateCount('projects-count', 7);
        animateCount('workshops-count', 4);
        animateCount('skills-count', 5);
        statsObserver.unobserve(statsSection);
    }
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

