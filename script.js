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
function setupCarousel() {
    const carousel = document.getElementById("carousel");
    const cards = carousel.getElementsByClassName("project-card");
    const numCards = cards.length;
    const radius = 300;

    for (let i = 0; i < numCards; i++) {
        const angle = (360 / numCards) * i;
        cards[i].style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    }
}



// ==========================
// 3D CAROUSEL INTERACTIVE SPIN
// ==========================
let autoRotate = true;
let currentRotation = 0;
let autoSpeed = 0.3; // normal auto spin speed
let mouseSpeed = 0.4; // speed while dragging
let lastMouseX = 0;

const carousel = document.getElementById("carousel");

// Animation loop
function rotateCarousel() {
    if (autoRotate) {
        currentRotation += autoSpeed;
        carousel.style.transform = `rotateY(${currentRotation}deg)`;
    }
    requestAnimationFrame(rotateCarousel);
}
rotateCarousel();

// Stop rotation on hover
carousel.addEventListener("mouseenter", () => {
    autoRotate = false;
});

// Rotate based on mouse movement
carousel.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;

    if (mouseX < lastMouseX) {
        currentRotation -= mouseSpeed;
    } else if (mouseX > lastMouseX) {
        currentRotation += mouseSpeed;
    }

    lastMouseX = mouseX;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
});

// Resume auto rotation when mouse leaves
carousel.addEventListener("mouseleave", () => {
    autoRotate = true;
});



// ==========================
// INTRO SLIDE ANIMATION ON LOAD
// ==========================
window.addEventListener("load", () => {
    document.querySelector(".intro-img").classList.add("animate-left");
    document.querySelector(".intro-text").classList.add("animate-right");
});



// ==========================
// SECTION FADE-IN ON SCROLL
// ==========================
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.2 }
);

sections.forEach(section => observer.observe(section));



// ==========================
// INITIALIZE EVERYTHING
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    typeRole();
    setupCarousel();
});
