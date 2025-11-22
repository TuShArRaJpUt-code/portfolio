// ==========================
// DYNAMIC TYPING EFFECT
// ==========================
const roles = ["App Developer", "Frontend Developer", "Web Developer", "Python Developer"];
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

// ==========================
// 3D CAROUSEL ROTATION LOOP
// ==========================
function rotateCarousel() {
    if (autoRotate && !isDragging) {
        currentRotation += autoSpeed;
        carousel.style.transform = `rotateY(${currentRotation}deg)`;
    }
    requestAnimationFrame(rotateCarousel);
}
rotateCarousel();

// ==========================
// CAROUSEL INTERACTIVITY
// ==========================
carousel.addEventListener("mouseenter", () => autoRotate = false);
carousel.addEventListener("mouseleave", () => autoRotate = true);

carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
});
carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const delta = e.clientX - lastMouseX;
    currentRotation += delta * 0.5;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
    lastMouseX = e.clientX;
});
carousel.addEventListener("mouseup", () => isDragging = false);
carousel.addEventListener("mouseleave", () => isDragging = false);

// Touch events for mobile
carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    lastMouseX = e.touches[0].clientX;
});
carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - lastMouseX;
    currentRotation += delta * 0.5;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
    lastMouseX = e.touches[0].clientX;
});
carousel.addEventListener("touchend", () => isDragging = false);

// ==========================
// INTRO SLIDE ANIMATION
// ==========================
window.addEventListener("load", () => {
    document.querySelector(".intro-img").classList.add("animate-left");
    document.querySelector(".intro-text").classList.add("animate-right");
});

// ==========================
// SECTION FADE-IN AND SKILL ANIMATION
// ==========================
// Animate skill bars only when visible
const skillFills = document.querySelectorAll(".skill-fill");
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Animate skill bars when skills section is visible
            if (entry.target.id === "skills") {
                skillFills.forEach(fill => {
                    fill.style.width = fill.dataset.width;
                });
            }
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));


// ==========================
// INITIALIZE EVERYTHING
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    typeRole();
    setupCarousel();
});
