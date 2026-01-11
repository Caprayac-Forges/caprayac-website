const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.querySelector('.carousel-btn.right');
const prevBtn = document.querySelector('.carousel-btn.left');

let index = 0;

function updateCarousel() {
  const itemWidth = items[0].offsetWidth + 20;
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % items.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + items.length) % items.length;
  updateCarousel();
});

setInterval(() => {
  index = (index + 1) % items.length;
  updateCarousel();
}, 3500);
