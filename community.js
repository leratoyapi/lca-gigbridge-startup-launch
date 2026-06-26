let categoryItems = document.querySelectorAll(".category-list li");

let posts = document.querySelectorAll("[data-category]");

categoryItems.forEach(function (item) {
  item.addEventListener("click", function () {
    let selected = item.textContent; // Gets the text of the clicked item

    if (selected === "All Discussions") {
      posts.forEach(function (post) {
        post.style.display = "block";
      });
    } else {
      posts.forEach(function (post) {
        if (post.dataset.category === selected) {
          // dataset.category is how JavaScript reads a data-category attribute.
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    }
  });
});

let likeButtons = document.querySelectorAll(".like-btn");
likeButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let current = parseInt(btn.textContent.replace("👍 ", ""));
    btn.textContent = "👍 " + (current + 1);
  });
});

// Select all posts and the load more button
let allPosts = document.querySelectorAll(".post-card");
let loadMoreBtn = document.querySelector(".load-more-btn"); // Changed to querySelector

// How many posts to show at a time
let visibleCount = 5;

// Hide all posts beyond the first 5
function updatePosts() {
  if (!loadMoreBtn) return; // Prevent crashes if element isn't found

  allPosts.forEach(function (post, index) {
    if (index < visibleCount) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });

  if (visibleCount >= allPosts.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Run on page load
updatePosts();

// Show more when clicked
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", function () {
    visibleCount += 3;
    updatePosts();
  });
}
