document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "dark";

  if (themeToggle) {
    if (savedTheme === "light") {
      root.setAttribute("data-theme", "light");
      themeToggle.textContent = "Dark Mode";
    } else {
      root.removeAttribute("data-theme");
      themeToggle.textContent = "Light Mode";
    }

    themeToggle.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";

      if (isLight) {
        root.removeAttribute("data-theme");
        themeToggle.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        themeToggle.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
      }
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // Handle mobile menu toggle - supports both #mobile-menu and .nav-toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileMenu.classList.toggle("toggle-open");
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  const accordions = document.querySelectorAll(".accordion-header");

  accordions.forEach((acc) => {
    acc.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.paddingTop = null;
        content.style.paddingBottom = null;
        this.querySelector("span").textContent = "+";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.paddingTop = "1rem";
        content.style.paddingBottom = "1rem";
        this.querySelector("span").textContent = "-";
      }
    });
  });

  const form = document.getElementById("registrationForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameInput = document.getElementById("fullName").value.trim();
      const emailInput = document.getElementById("email").value.trim();
      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const formFeedback = document.getElementById("formFeedback");

      let isFormValid = true;

      if (nameInput.length < 3) {
        nameError.style.display = "block";
        isFormValid = false;
      } else {
        nameError.style.display = "none";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput)) {
        emailError.style.display = "block";
        isFormValid = false;
      } else {
        emailError.style.display = "none";
      }

      if (isFormValid) {
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        formFeedback.style.color = "var(--neon-cyan)";
        formFeedback.textContent = `Sending your interest request for ${nameInput}...`;

        fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              formFeedback.textContent =
                "Thanks! Your application was submitted successfully.";
              form.reset();
            } else {
              throw new Error("Submission failed");
            }
          })
          .catch(() => {
            formFeedback.style.color = "#EF4444";
            formFeedback.textContent =
              "Submission error. Please try again or check your Formspree URL.";
          })
          .finally(() => {
            submitButton.disabled = false;
          });
      } else {
        formFeedback.style.color = "#EF4444";
        formFeedback.textContent =
          "Error: Validation criteria mismatched. Correct fields above.";
      }
    });
  }

  const showMoreButtons = document.querySelectorAll(".show-more-btn");

  showMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".opportunity-card");
      const details = card.querySelector(".extended-details");

      if (!details) return;

      details.classList.toggle("open");
      button.textContent = details.classList.contains("open")
        ? "Show less"
        : "Show more";
    });
  });
});
