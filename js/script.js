const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

function updateCarousel(index) {
  cards.forEach(card => card.classList.remove('active'));
  cards[index].classList.add('active');

  const offset = cards[index].offsetLeft - (track.offsetWidth / 2) + (cards[index].offsetWidth / 2);
  track.style.transform = `translateX(-${offset}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel(currentIndex);
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel(currentIndex);
}, 5000); // Auto-scroll every 5 seconds

// Initialize
updateCarousel(currentIndex);
