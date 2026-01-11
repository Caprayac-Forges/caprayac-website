const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.querySelector('.carousel-btn.right');
const prevBtn = document.querySelector('.carousel-btn.left');

let index = 1; // center on second item by default

function updateCarousel() {
  const itemWidth = items[0].offsetWidth + 20;
  const visibleCount = 3;
  const offset = (itemWidth * index) - (itemWidth * Math.floor(visibleCount / 2));
  track.style.transform = `translateX(-${offset}px)`;

  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % items.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + items.length) % items.length;
  updateCarousel();
});

// Auto-scroll
setInterval(() => {
  index = (index + 1) % items.length;
  updateCarousel();
}, 3500);

// Initialize
updateCarousel();
