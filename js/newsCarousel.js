document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("newsCarousel");
  const carousel = track.closest(".carousel");
  const prevBtn = carousel.querySelector(".carousel-arrow.left");
  const nextBtn = carousel.querySelector(".carousel-arrow.right");

  const CLONES = 1;
  let isFixing = false;

  // Grab original slides
  const originals = Array.from(track.children);

  // Clone last slide(s) to the front
  originals.slice(-CLONES).forEach(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add("is-clone");
    track.insertBefore(clone, track.firstChild);
  });

  // Clone first slide(s) to the end
  originals.slice(0, CLONES).forEach(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add("is-clone");
    track.appendChild(clone);
  });

  const slides = Array.from(track.children);

  /* -------------------------
     Utility helpers
  ------------------------- */

  function disableSmooth() {
    track.style.scrollBehavior = "auto";
  }

  function enableSmooth() {
    track.style.scrollBehavior = "smooth";
  }

  function slideStep() {
    if (slides.length < 2) return 0;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  function currentIndex() {
    const step = slideStep();
    if (!step) return 0;
    return Math.round(track.scrollLeft / step);
  }

  function scrollToIndex(index, smooth = true) {
    if (!slides[index]) return;

    if (smooth) enableSmooth();
    else disableSmooth();

    track.scrollTo({
      left: slides[index].offsetLeft
    });

    if (!smooth) {
      requestAnimationFrame(enableSmooth);
    }
  }

  /* -------------------------
     Navigation
  ------------------------- */

  function goNext() {
    if (isFixing) return;
    scrollToIndex(currentIndex() + 1, true);
  }

  function goPrev() {
    if (isFixing) return;
    scrollToIndex(currentIndex() - 1, true);
  }

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  /* -------------------------
     Infinite loop correction
  ------------------------- */

  function fixLoopIfNeeded() {
    if (isFixing) return;
    isFixing = true;

    const idx = currentIndex();
    const firstReal = CLONES;
    const lastReal = CLONES + originals.length - 1;

    // Jump from front clone → last real
    if (idx < firstReal) {
      disableSmooth();
      scrollToIndex(lastReal, false);
      isFixing = false;
      return;
    }

    // Jump from end clone → first real
    if (idx > lastReal) {
      disableSmooth();
      scrollToIndex(firstReal, false);
      isFixing = false;
      return;
    }

    isFixing = false;
  }

  /* -------------------------
     Scroll listener (debounced)
  ------------------------- */

  let scrollTimer = null;
  track.addEventListener("scroll", () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(fixLoopIfNeeded, 60);
  });

  /* -------------------------
     Resize handling
  ------------------------- */

  window.addEventListener("resize", () => {
    scrollToIndex(currentIndex(), false);
  });

  /* -------------------------
     Init
  ------------------------- */

  // Start on first real slide (skip clone)
  scrollToIndex(CLONES, false);
});
