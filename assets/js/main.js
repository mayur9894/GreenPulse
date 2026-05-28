// ========================================
// MAIN JS
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  navbarScroll();
  mobileMenu();
  initAOS();
  animateCounters();
  animateProgressBars();
  initModalSlider();
});

// ========================================
// AOS INIT
// ========================================
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
      offset: 60,
    });
  }
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function navbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    navbar.classList.toggle("navbar-scroll", currentScroll > 50);
    if (currentScroll > lastScroll && currentScroll > 120) {
      navbar.classList.remove("navbar-show");
      navbar.classList.add("navbar-hide");
    } else {
      navbar.classList.remove("navbar-hide");
      navbar.classList.add("navbar-show");
    }
    lastScroll = currentScroll;
  });
}

// ========================================
// MOBILE MENU
// ========================================
function mobileMenu() {
  const toggleBtn = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileButtons = document.getElementById("mobileButtons");
  if (!toggleBtn || !mobileMenu || !mobileButtons) return;
  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
    mobileButtons.classList.toggle("show");
    toggleBtn.innerHTML = mobileMenu.classList.contains("show")
      ? '<i class="bi bi-x"></i>'
      : '<i class="bi bi-list"></i>';
  });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"));
        let current = 0;
        const step = target / 72;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.round(current).toLocaleString();
          if (current >= target) {
            clearInterval(timer);
          }
        }, 18);
        counterObserver.unobserve(el);
      });
    },
    {
      threshold: 0.3,
    }
  );
  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// ========================================
// PROGRESS BAR ANIMATIONS
// ========================================
function animateProgressBars() {
  animateBar("xp-bar", "70%");
  animateBar("challenge-bar", "82%");
}

function animateBar(id, width) {
  const bar = document.getElementById(id);
  if (!bar) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          bar.style.width = width;
        }, 300);

        observer.disconnect();
      }
    },
    {
      threshold: 0.4,
    }
  );
  observer.observe(bar);
}

// ========================================
// MODAL IMAGE SLIDER
// ========================================
function initModalSlider() {
  const modalElement = document.getElementById("adModal");
  const modalImage = document.getElementById("modalImage");
  if (!modalElement || !modalImage) return;
  const images = [
    "assets/images/d1.png",
    "assets/images/d2.png",
  ];
  let currentIndex = 0;
  const modal = new bootstrap.Modal(modalElement);
  // Open modal immediately
  modal.show();
  // Change image every 4 seconds
  const imageLoop = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex];
  }, 4000);
  // Close modal after 20 seconds
  setTimeout(() => {
    modal.hide();
    clearInterval(imageLoop);
  }, 15000);
}