document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("newsCarousel");
  const carousel = track.closest(".carousel");
  const inner = carousel.querySelector(".carousel-inner");
  const prevBtn = carousel.querySelector(".carousel-arrow.left");
  const nextBtn = carousel.querySelector(".carousel-arrow.right");

  const DURATION = 300;
  const EASE = "cubic-bezier(0, 0, 0.2, 1)";

  let slides = Array.from(track.children);
  let currentIndex = 1;
  let isAnimating = false;

  /* -----------------------------
     Clone edges for infinite loop
  ----------------------------- */

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.classList.add("is-clone");
  lastClone.classList.add("is-clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  slides = Array.from(track.children);
  currentIndex = 1;

  /* -----------------------------
     Helpers
  ----------------------------- */

  function slideWidth() {
    return slides[0].getBoundingClientRect().width;
  }

  function setPosition(animate = true) {
    const slideW = slideWidth();
    const containerW = inner.getBoundingClientRect().width;
    const centerOffset = (containerW - slideW) / 2;

    const offset = slideW * currentIndex - centerOffset;

    track.style.transition = animate
      ? `transform ${DURATION}ms ${EASE}`
      : "none";

    track.style.transform = `translateX(-${offset}px)`;

    requestAnimationFrame(updateActiveSlide);
  }

  function updateActiveSlide() {
    slides.forEach(slide => slide.classList.remove("is-active"));
    slides[currentIndex].classList.add("is-active");
  }

  /* -----------------------------
     Navigation
  ----------------------------- */

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

  /* -----------------------------
     Loop correction
  ----------------------------- */

  track.addEventListener("transitionend", () => {
    if (slides[currentIndex].classList.contains("is-clone")) {
      track.style.transition = "none";

      currentIndex =
        currentIndex === 0 ? slides.length - 2 : 1;

      setPosition(false);
    }

    isAnimating = false;
    updateActiveSlide();
  });

  /* -----------------------------
     Resize handling
  ----------------------------- */

  window.addEventListener("resize", () => {
    setPosition(false);
  });

  /* -----------------------------
     Init (important)
  ----------------------------- */

  requestAnimationFrame(() => {
    setPosition(false);
    updateActiveSlide();
  });
});
