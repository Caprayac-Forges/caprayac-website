const cards = document.querySelectorAll('.carousel-card');
let currentIndex = 0;

function updateCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove('active');
    if (index === currentIndex) {
      card.classList.add('active');
    }
  });
}

function nextCard() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
}

function prevCard() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
}

// Auto-loop every 5 seconds
setInterval(nextCard, 5000);

// Manual controls
document.getElementById('carousel-next').addEventListener('click', nextCard);
document.getElementById('carousel-prev').addEventListener('click', prevCard);

// Initial setup
updateCarousel();

