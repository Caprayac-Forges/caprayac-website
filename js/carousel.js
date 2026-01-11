const cards = document.querySelectorAll('.carousel-card');
let currentIndex = 0;

function updateCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove('active');
    card.style.transform = 'scale(1)';
  });

  const current = cards[currentIndex];
  current.classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
}

document.getElementById('carousel-next').addEventListener('click', nextSlide);
document.getElementById('carousel-prev').addEventListener('click', prevSlide);

// Auto-scroll every 5 seconds
setInterval(() => {
  nextSlide();
}, 5000);

// Initialize
updateCarousel();
