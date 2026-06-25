/* ---- GIGBRIDGE - About Page JavaScript ---- */

/* ---- GIGBRIDGE - About Page JavaScript ---- */

document.addEventListener("DOMContentLoaded", function () {
  // ----- 1. THEME TOGGLE -----
  // Why: Switches between light and dark mode by toggling a class on <html>
  // - Uses CSS variables defined in :root and .dark-mode
  // - Persistent state is stored in localStorage

  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Load saved theme preference
  const savedTheme = localStorage.getItem("gigbridge-theme");
  if (savedTheme === "dark") {
    html.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "☀️ Light Mode";
  } else {
    html.classList.remove("dark-mode");
    if (themeToggle) themeToggle.textContent = "🌙 Dark Mode";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = html.classList.toggle("dark-mode");
      this.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
      localStorage.setItem("gigbridge-theme", isDark ? "dark" : "light");
    });
  }

  // ----- 2. FAQ ACCORDION -----
  // Why: Each FAQ item expands/collapses when clicked
  // - Uses max-height transitions for smooth animations

  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      const accordionItem = this.parentElement;
      const accordionContent =
        accordionItem.querySelector(".accordion-content");
      const icon = this.querySelector(".icon");

      const isActive = accordionContent.classList.contains("active");

      // Close all other accordions (single-open behaviour)
      accordionHeaders.forEach(function (otherHeader) {
        if (otherHeader !== header) {
          const otherContent =
            otherHeader.parentElement.querySelector(".accordion-content");
          const otherIcon = otherHeader.querySelector(".icon");
          otherContent.classList.remove("active");
          otherHeader.classList.remove("active");
          if (otherIcon) otherIcon.textContent = "+";
        }
      });

      // Toggle the clicked one
      if (isActive) {
        accordionContent.classList.remove("active");
        this.classList.remove("active");
        if (icon) icon.textContent = "+";
      } else {
        accordionContent.classList.add("active");
        this.classList.add("active");
        if (icon) icon.textContent = "×";
      }
    });
  });

  // ----- 3. MOBILE NAV TOGGLE -----
  // Why: Shows/hides the nav menu on small screens

  const mobileToggle = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("open");
      });
    });
  }

  // ----- 4. TEAM CAROUSEL - KEYBOARD & TOUCH -----
  // Why: Adds keyboard navigation and touch support

  const carouselContainer = document.querySelector(".carousel-container");

  if (carouselContainer) {
    carouselContainer.setAttribute("tabindex", "0");
    carouselContainer.setAttribute("role", "region");
    carouselContainer.setAttribute("aria-label", "Team members carousel");

    carouselContainer.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        this.scrollLeft += 220;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        this.scrollLeft -= 220;
        e.preventDefault();
      }
    });

    // Mouse drag scrolling
    let isDown = false;
    let startX;
    let scrollLeftPos;

    carouselContainer.addEventListener("mousedown", function (e) {
      isDown = true;
      this.style.cursor = "grabbing";
      startX = e.pageX - this.offsetLeft;
      scrollLeftPos = this.scrollLeft;
    });

    carouselContainer.addEventListener("mouseleave", function () {
      isDown = false;
      this.style.cursor = "grab";
    });

    carouselContainer.addEventListener("mouseup", function () {
      isDown = false;
      this.style.cursor = "grab";
    });

    carouselContainer.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - this.offsetLeft;
      const walk = (x - startX) * 1.5;
      this.scrollLeft = scrollLeftPos - walk;
    });
  }

  // ----- 5. SMOOTH SCROLL FOR ANCHOR LINKS -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ----- 6. ACTIVE NAV LINK HIGHLIGHT -----
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    const linkHref = link.getAttribute("href");
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  console.log("✅ GigBridge About page loaded successfully!");
});
