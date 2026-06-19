document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. RESPONSIIVE MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenu = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenu) {
        mobileMenu.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            mobileMenu.classList.toggle("toggle-open");
        });
    }

    // ==========================================
    // 2. BONUS CHALLENGE: DARK/LIGHT NEON MODE
    // ==========================================
    const themeToggle = document.getElementById("theme-toggle");

    // Check local storage for preference
    if (localStorage.getItem("theme") === "light") {
        document.documentElement.setAttribute("data-theme", "light");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            let currentTheme = document.documentElement.getAttribute("data-theme");
            if (currentTheme === "light") {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
            }
        });
    }

    // ==========================================
    // 3. FAQ ACCORDION INTERACTION
    // ==========================================
    const accordions = document.querySelectorAll(".accordion-header");

    accordions.forEach(acc => {
        acc.addEventListener("click", function() {
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

    // ==========================================
    // 4. JAVASCRIPT FORM VALIDATION
    // ==========================================
    const form = document.getElementById("registrationForm");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop native submission pipeline

            // Collect Form Control Values
            const nameInput = document.getElementById("fullName").value.trim();
            const emailInput = document.getElementById("email").value.trim();

            // Grab DOM Feedback elements
            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const formFeedback = document.getElementById("formFeedback");

            let isFormValid = true;

            // Validate Name (Conditional)
            if (nameInput.length < 3) {
                nameError.style.display = "block";
                isFormValid = false;
            } else {
                nameError.style.display = "none";
            }

            // Validate Email with Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput)) {
                emailError.style.display = "block";
                isFormValid = false;
            } else {
                emailError.style.display = "none";
            }

            // Provide User Feedback message via DOM Manipulation
            if (isFormValid) {
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                formFeedback.style.color = "var(--neon-cyan)";
                formFeedback.textContent = `Sending your interest request for ${nameInput}...`;

                fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        Accept: "application/json"
                    }
                })
                .then(response => {
                    if (response.ok) {
                        formFeedback.textContent = "Thanks! Your application was submitted successfully.";
                        form.reset();
                    } else {
                        throw new Error("Submission failed");
                    }
                })
                .catch(() => {
                    formFeedback.style.color = "#EF4444";
                    formFeedback.textContent = "Submission error. Please try again or check your Formspree URL.";
                })
                .finally(() => {
                    submitButton.disabled = false;
                });
            } else {
                formFeedback.style.color = "#EF4444";
                formFeedback.textContent = "Error: Validation criteria mismatched. Correct fields above.";
            }
        });
    }
});