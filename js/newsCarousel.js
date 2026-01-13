document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("newsCarousel");
  const carousel = track.closest(".carousel");
  const prevBtn = carousel.querySelector(".carousel-arrow.left");
  const nextBtn = carousel.querySelector(".carousel-arrow.right");

  const DURATION = 300;
  const EASE = "cubic-bezier(0, 0, 0.2, 1)";

  let slides = Array.from(track.children);
  let currentIndex = 1; // start on first real slide
  let isAnimating = false;

  /* -------------------------
     Clone edges for looping
  ------------------------- */

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.classList.add("is-clone");
  lastClone.classList.add("is-clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  slides = Array.from(track.children);

  /* -------------------------
     Layout
  ------------------------- */

  function slideWidth() {
    return slides[0].getBoundingClientRect().width;
  }

function setPosition(animate = true) {
  const slideW = slideWidth();
  const carouselW = carousel.getBoundingClientRect().width;
  const centerOffset = (carouselW - slideW) / 2;

  const offset = slideW * currentIndex - centerOffset;

  track.style.transition = animate
    ? `transform ${DURATION}ms ${EASE}`
    : "none";

  track.style.transform = `translateX(-${offset}px)`;

  requestAnimationFrame(updateActiveSlide);
}



  /* -------------------------
     Navigation
  ------------------------- */
  function updateActiveSlide() {
  slides.forEach(slide => slide.classList.remove("is-active"));
  slides[currentIndex].classList.add("is-active");
  }

  function goNext() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    setPosition(true);
  }

  function goPrev() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex--;
    setPosition(true);
  }

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  /* -------------------------
     Loop correction
  ------------------------- */

  track.addEventListener("transitionend", () => {
    // If we hit the fake last slide → jump to real first
    if (slides[currentIndex].classList.contains("is-clone")) {
      track.style.transition = "none";
      currentIndex =
        currentIndex === 0 ? slides.length - 2 : 1;
      setPosition(false);
    }
    updateActiveSlide();
    isAnimating = false;
  });

  /* -------------------------
     Resize handling
  ------------------------- */

  window.addEventListener("resize", () => {
    setPosition(false);
  });

  /* -------------------------
     Init
  ------------------------- */

  setPosition(false);
  updateActiveSlide();
});
