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
// Carousel rotation state (outer scope so other functions can use it)
let carouselEl = null;
let carouselRotationY = 0;
let carouselIsRotating = true; // controls whether the carousel auto-rotates
const carouselSpeed = 0.15; // degrees per frame (adjust to taste)
let radius = 300; // distance from center (kept here so the rotation transform can use it)

function setupCarousel() {
  carouselEl = document.getElementById('carousel');
  const cards = carouselEl.getElementsByClassName('project-card');
  const numCards = cards.length;

  for (let i = 0; i < numCards; i++) {
    const angle = (360 / numCards) * i;
    cards[i].style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
  }

  // Ensure proper 3D rendering
  carouselEl.style.transformStyle = 'preserve-3d';
}

// Smooth rotation loop using requestAnimationFrame
function rotateCarouselLoop() {
  if (!carouselEl) {
    requestAnimationFrame(rotateCarouselLoop);
    return;
  }

  if (carouselIsRotating) {
    carouselRotationY = (carouselRotationY + carouselSpeed) % 360;
    // translateZ(-radius) recenters the carousel so card translateZ(radius) positions are correct
    carouselEl.style.transform = `translateZ(-${radius}px) rotateY(${carouselRotationY}deg)`;
  }

  requestAnimationFrame(rotateCarouselLoop);
}

function attachCarouselHoverHandlers() {
  if (!carouselEl) return;

  // Pause on mouse enter, resume on mouse leave
  carouselEl.addEventListener('mouseenter', () => {
    carouselIsRotating = false;
  });

  carouselEl.addEventListener('mouseleave', () => {
    carouselIsRotating = true;
  });
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
