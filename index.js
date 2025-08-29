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

// Cart functionality with localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
  const cartContainer = document.getElementById("cartItems");
  if (cartContainer) {
    const cart = getCart();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p class='empty-card'>Your cart is empty</p>";
      return;
    }

    // Group items by name to count quantities
    const itemCounts = cart.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + 1;
      return acc;
    }, {});

    // Display items with quantities
    Object.entries(itemCounts).forEach(([itemName, count], index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <span class="item-name">${itemName}</span>
                    <span class="item-quantity">x${count}</span>
                </div>
                <button onclick="removeFromCart('${itemName}')">Remove</button>
            `;
      cartContainer.appendChild(itemDiv);
    });
  }
}

function removeFromCart(itemName) {
  const cart = getCart();
  // Find the index of the first occurrence of the item
  const index = cart.findIndex((item) => item.name === itemName);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
    updateCartDisplay();
  }
}

// Order now buttons with cart functionality
document.querySelectorAll(".btn").forEach((button) => {
  if (button.textContent.trim().includes("Order Now")) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // Get the item name from the closest product container
      const itemContainer = this.closest(".menu-item, .special-item");
      const itemName = itemContainer
        ? itemContainer.querySelector("h3")?.textContent
        : "Unknown Item";

      // Add to cart
      const cart = getCart();
      cart.push({
        name: itemName,
        date: new Date().toISOString(),
      });
      saveCart(cart);
      updateCartDisplay();
      alert("Item added to cart!");
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

// Toggle cart panel
function toggleCart() {
  const cartPanel = document.getElementById("cartPanel");
  cartPanel.classList.toggle("active");
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();

  // Close cart panel when clicking outside
  document.addEventListener("click", function (e) {
    const cartPanel = document.getElementById("cartPanel");
    const cartButton = document.querySelector(".cart-button");

    if (!cartPanel.contains(e.target) && !cartButton.contains(e.target)) {
      cartPanel.classList.remove("active");
    }
  });
});
