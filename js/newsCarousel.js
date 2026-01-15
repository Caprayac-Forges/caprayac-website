document.addEventListener("DOMContentLoaded", () => {
  /* Get all neede elements*/
  const track = document.getElementById("newsCarousel");
  const carousel = track.closest(".carousel");
  const inner = carousel.querySelector(".carousel-inner");
  const prevBtn = carousel.querySelector(".carousel-arrow.left");
  const nextBtn = carousel.querySelector(".carousel-arrow.right");

  /* Animation settings */
  const DURATION = 300;
  const EASE = "cubic-bezier(0, 0, 0.2, 1)";

  /* Slide state variables */
  let slides = Array.from(track.children);
  let currentIndex = 1;
  let isAnimating = false;

  /* Create clones to loop the slides*/

  /*Append first and last clones*/
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.classList.add("is-clone");
  lastClone.classList.add("is-clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  slides = Array.from(track.children);
  currentIndex = 1;

  /* Measure the width of slide*/
  function slideWidth() {
    return slides[0].getBoundingClientRect().width;
  }

  /* Center the current slide in the container*/
  function setPosition(animate = true) {
  const containerRect = inner.getBoundingClientRect();
  const slideRect = slides[currentIndex].getBoundingClientRect();

  /* Find where container and slides are*/
  const containerCenter = containerRect.left + containerRect.width / 2;

  const slideCenter = slideRect.left + slideRect.width / 2;

  /* How far the slide is*/
  const delta = slideCenter - containerCenter;

  track.style.transition = animate
    ? `transform ${DURATION}ms ${EASE}`
    : "none";

  /* Current translate value*/
  const computed = getComputedStyle(track).transform;
  let currentTranslate = 0;
  if (computed && computed !== "none") {
    const matrix = new DOMMatrixReadOnly(computed);
    currentTranslate = matrix.m41;
  }

  /* Move the track by delta*/
  track.style.transform = `translateX(${currentTranslate - delta}px)`;

  requestAnimationFrame(updateActiveSlide);
}


  /* Update active slide class*/
  function updateActiveSlide() {
    slides.forEach(slide => slide.classList.remove("is-active"));
    slides[currentIndex].classList.add("is-active");
  }

  /* Navigation*/

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

  /* Loop correction*/

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

  /* Handling resize */

  window.addEventListener("resize", () => {
    setPosition(false);
  });

  /* Initial position */
  requestAnimationFrame(() => {
    setPosition(false);
    updateActiveSlide();
  });
});
