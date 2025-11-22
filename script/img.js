(() => {
  let index = 0;

  const images = [
    "images/slide1.png",
    "images/slide2.png",
    "images/slide3.png",
    "images/slide4.png",
    "images/slide5.png",
    "images/slide6.png",
    "images/slide7.png",
    "images/slide8.png",
    "images/slide9.png",
  ];

  const intervalMs = 5000;
  let timer = null;

  function startTimer(el) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    stopTimer();
    timer = setInterval(() => next(el), intervalMs);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function next(imgEl) {
    index = (index + 1) % images.length;
    if (imgEl) imgEl.src = images[index];
  }

  function prev(imgEl) {
    index = (index - 1 + images.length) % images.length;
    if (imgEl) imgEl.src = images[index];
  }

  document.addEventListener("DOMContentLoaded", () => {
    const imgElement = document.getElementById("carouselImage");
    if (!imgElement) {
      console.warn(
        "carouselImage element not found — slideshow not initialized"
      );
      return;
    }

    if (images.length) imgElement.src = images[index];

    startTimer(imgElement);

    imgElement.addEventListener("mouseenter", () => stopTimer());
    imgElement.addEventListener("mouseleave", () => startTimer(imgElement));
    imgElement.addEventListener("focus", () => stopTimer());
    imgElement.addEventListener("blur", () => startTimer(imgElement));

    imgElement.tabIndex = imgElement.tabIndex || 0;
    imgElement.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next(imgElement);
      if (e.key === "ArrowLeft") prev(imgElement);
    });
  });
})();
