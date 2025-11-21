// ==========================
// DYNAMIC TYPING EFFECT
// ==========================
const roles = ["App Developer", "Frontend Developer", "Web Developer","Python Developer"];
let roleIndex = 0, charIndex = 0;
const dynamicText = document.getElementById("dynamic-text");
const typingSpeed = 100; // milliseconds per character
const erasingSpeed = 50;
const delayBetween = 2000; // delay before erasing

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
    const carousel = document.getElementById('carousel');
    const cards = carousel.getElementsByClassName('project-card');
    const numCards = cards.length;
    const radius = 300; // distance from center

    for (let i = 0; i < numCards; i++) {
        const angle = (360 / numCards) * i;
        cards[i].style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    }
}

// ==========================
// INITIALIZE
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    typeRole();      // start dynamic typing
    setupCarousel(); // setup 3D carousel
});
// Animate intro on page load
window.addEventListener("load", () => {
  document.querySelector(".intro-img").classList.add("animate-left");
  document.querySelector(".intro-text").classList.add("animate-right");
});

// Animate sections on scroll
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
      }
    });
  }, 
  { threshold: 0.2 } // trigger when 20% of section is visible
);

sections.forEach(section => observer.observe(section));
