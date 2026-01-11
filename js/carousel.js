const track = document.getElementById("carousel-track");
const items = document.querySelectorAll(".carousel-item");
let index = 0;

function updateCarousel() {
  const totalItems = items.length;
  const center = Math.floor(totalItems / 2);
  
  items.forEach((item, i) => {
    item.classList.remove("active");
    if (i === index) {
      item.classList.add("active");
    }
  });

  const offset = -index * (items[0].offsetWidth + 30); // 30 is the gap
  track.style.transform = `translateX(${offset + track.offsetWidth / 2 - items[0].offsetWidth / 2}px)`;
}

document.getElementById("next").addEventListener("click", () => {
  index = (index + 1) % items.length;
  updateCarousel();
});

document.getElementById("prev").addEventListener("click", () => {
  index = (index - 1 + items.length) % items.length;
  updateCarousel();
});

// Auto-scroll
setInterval(() => {
  index = (index + 1) % items.length;
  updateCarousel();
}, 5000);

window.addEventListener("load", updateCarousel);
