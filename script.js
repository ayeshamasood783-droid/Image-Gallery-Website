const gallery = document.getElementById("galleryGrid");
const pageBtns = document.querySelectorAll(".page-btn");

const imagesPerPage = 12;
let currentPage = 1;
let currentFilter = "all";

/* IMAGE DATA */
const imageData = [];
const categories = ["nature", "city", "people"];

for (let page = 1; page <= 3; page++) {
  categories.forEach(cat => {
    for (let i = 0; i < imagesPerPage / 3; i++) {
      imageData.push({
        src: `https://picsum.photos/seed/${cat}${page}${i}/600/400`,
        category: cat,
        page
      });
    }
  });
}

/* RENDER IMAGES */
function renderGallery() {
  gallery.innerHTML = "";

  imageData
    .filter(img => img.page === currentPage)
    .forEach(item => {
      const img = document.createElement("img");
      img.src = item.src;
      img.dataset.category = item.category;

      if (currentFilter !== "all" && item.category !== currentFilter) {
        img.style.display = "none";
      }

      img.addEventListener("click", () => openLightbox(img));
      gallery.appendChild(img);
    });
}

/* PAGINATION */
pageBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    pageBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentPage = Number(btn.dataset.page);
    renderGallery();
  });
});

/* FILTERS */
document.querySelectorAll(".filters button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filters button")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    renderGallery();
  };
});

/* LIGHTBOX */
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let visibleImages = [];
let currentIndex = 0;

function openLightbox(img) {
  visibleImages = [...document.querySelectorAll(".gallery img")]
    .filter(i => i.style.display !== "none");

  currentIndex = visibleImages.indexOf(img);
  lightbox.style.display = "flex";
  lightboxImg.src = img.src;
}

closeBtn.onclick = () => lightbox.style.display = "none";

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
};

/* INITIAL LOAD */
renderGallery();
