let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showItem(index) {
  items.forEach((item, i) => {
    item.classList.remove('active');
    if (i === index) {
      item.classList.add('active');
    }
  });

  const carousel = document.querySelector('.carousel');
  const offset = -index * (items[0].offsetWidth + 32); // 32px is the margin
  carousel.style.transform = `translateX(${offset}px)`;
}

function nextItem() {
  currentIndex = (currentIndex + 1) % totalItems;
  showItem(currentIndex);
}

function prevItem() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  showItem(currentIndex);
}

document.getElementById('next').addEventListener('click', nextItem);
document.getElementById('prev').addEventListener('click', prevItem);

// Auto-scroll
setInterval(nextItem, 4000);

// Initial display
showItem(currentIndex);
