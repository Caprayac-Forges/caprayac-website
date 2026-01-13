document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("newsCarousel");
  const carousel = track.closest(".carousel");
  const prevBtn = carousel.querySelector(".carousel-arrow.left");
  const nextBtn = carousel.querySelector(".carousel-arrow.right");

  // Configuration: how many slides to clone on each side.
  // 1 is enough for a simple infinite loop.
  const CLONES = 1;

  let isJumping = false;

  // Grab original slides
  const originals = Array.from(track.children);

  // Clone last CLONES slides to the front
  const headClones = originals.slice(-CLONES).map((node) => node.cloneNode(true));
  headClones.forEach((c) => {
    c.classList.add("is-clone");
    track.insertBefore(c, track.firstChild);
  });

  // Clone first CLONES slides to the end
  const tailClones = originals.slice(0, CLONES).map((node) => node.cloneNode(true));
  tailClones.forEach((c) => {
    c.classList.add("is-clone");
    track.appendChild(c);
  });

  // After clones, all slides:
  const slides = Array.from(track.children);

  function slideStepPx() {
    // cards are flex items; offsetWidth gives the visible width.
    // If you later add gap, include it by measuring distance between slides.
    const a = slides[0];
    const b = slides[1];
    if (!a || !b) return 0;
    return b.offsetLeft - a.offsetLeft;
  }

  function scrollToIndex(index, smooth = true) {
    const target = slides[index];
    if (!target) return;

    track.scrollTo({
      left: target.offsetLeft,
      behavior: smooth ? "smooth" : "auto"
    });
  }

  // Start on the first real slide (after the head clones)
  function initPosition() {
    const startIndex = CLONES;
    scrollToIndex(startIndex, false);
  }

  function currentIndex() {
    const step = slideStepPx();
    if (!step) return 0;
    // Find closest slide to current scrollLeft
    const approx = Math.round(track.scrollLeft / step);
    return Math.max(0, Math.min(slides.length - 1, approx));
  }

  function goNext() {
    if (isJumping) return;
    scrollToIndex(currentIndex() + 1, true);
  }

  function goPrev() {
    if (isJumping) return;
    scrollToIndex(currentIndex() - 1, true);
  }

  // When we land on a clone, jump instantly to the equivalent real slide
  function fixLoopIfNeeded() {
    const idx = currentIndex();

    // If we’re at the very first clone area (front clones)
    if (idx < CLONES) {
      isJumping = true;
      // Jump to the equivalent real slide near the end
      // Example with CLONES=1:
      // idx 0 (clone of last) -> jump to last real slide index (CLONES + originals.length - 1)
      const realIdx = CLONES + originals.length - (CLONES - idx);
      scrollToIndex(realIdx, false);
      isJumping = false;
      return;
    }

    // If we’re at the tail clone area (end clones)
    const lastRealIndex = CLONES + originals.length - 1;
    const firstTailCloneIndex = lastRealIndex + 1;

    if (idx >= firstTailCloneIndex) {
      isJumping = true;
      // Jump back to the equivalent real slide near the start
      // Example with CLONES=1:
      // idx last+1 (clone of first) -> jump to first real slide index CLONES
      const realIdx = CLONES + (idx - firstTailCloneIndex);
      scrollToIndex(realIdx, false);
      isJumping = false;
    }
  }

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  // Fix looping after scroll settles
  let scrollTimer = null;
  track.addEventListener("scroll", () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(fixLoopIfNeeded, 80);
  });

  window.addEventListener("resize", () => {
    // Keep the same logical slide on resize by snapping to closest
    scrollToIndex(currentIndex(), false);
  });

  initPosition();
});
