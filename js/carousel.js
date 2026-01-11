let currentIndex = 0;
const cards = document.querySelectorAll(".carousel-card");
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

function updateCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove("active");
    if (index === currentIndex) {
      card.classList.add("active");
    }
  });

  const cardWidth = cards[0].offsetWidth + 20; // card width + margin
  const offset = (track.offsetWidth - cardWidth) / 2 - currentIndex * cardWidth;
  track.style.transform = `translateX(${offset}px)`;
}

function showNextCard() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
}

function showPrevCard() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
}

prevBtn.addEventListener("click", showPrevCard);
nextBtn.addEventListener("click", showNextCard);

setInterval(() => {
  showNextCard();
}, 5000);

window.addEventListener("resize", updateCarousel);
updateCarousel();
