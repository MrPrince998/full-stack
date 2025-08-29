// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Back to top button
window.addEventListener("scroll", function () {
  const backToTop = document.querySelector(".back-to-top");
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navActions = document.querySelector(".nav-actions");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  navActions.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    hamburger.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Explore Menu button (placeholder functionality)
document.querySelector(".explore-btn").addEventListener("click", function (e) {
  e.preventDefault();
  alert("Explore Menu functionality coming soon!");
});

// order now buttons (placeholder functionality)
document.querySelectorAll(".btn").forEach((button) => {
  if (button.textContent.trim().includes("Order Now")) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Order has been placed!");
    });
  }
});

// Reservation form popup
document
  .querySelector("#reservation form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const date = document.getElementById("date").value;
    if (date) {
      alert("Reservation confirmed for " + date + "!");
      this.reset();
    } else {
      alert("Please select a reservation date.");
    }
  });

// Newsletter subscription
document
  .getElementById("subscribe-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value;
    if (email) {
      alert("Subscribed with " + email + "!");
      document.getElementById("newsletter-email").value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });
