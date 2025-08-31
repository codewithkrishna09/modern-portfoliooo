// small helper: replace youtube-like tilt with pointer-based 3D tilt
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  const inner = card.querySelector(".card-inner");
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx; // -1 .. 1
    const dy = (y - cy) / cy;
    const tiltX = (dy * 8).toFixed(2);
    const tiltY = (dx * -8).toFixed(2);
    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px)`;
    card.classList.add("glow");
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.classList.remove("glow");
  });

  // touch: simple tap to toggle small scale (mobile)
  card.addEventListener("touchstart", () => {
    card.style.transform = "perspective(900px) translateZ(6px) scale(1.01)";
    card.classList.add("glow");
  });
  card.addEventListener("touchend", () => {
    card.style.transform = "";
    card.classList.remove("glow");
  });
});

// enable keyboard focus style + play on space
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "Enter") {
    const vid =
      document.activeElement.querySelector &&
      document.activeElement.querySelector("video");
    if (vid) {
      e.preventDefault();
      if (vid.paused) vid.play();
      else vid.pause();
    }
  }
});

// Smooth scroll for nav
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// replace year
document.getElementById("year").textContent = new Date().getFullYear();

// NOTES for Google Drive embedding:
// If your share link looks like: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// use the FILE_ID where this HTML has FILE_ID_1 ... FILE_ID_6 and FILE_ID_PREVIEW
// final video URL format used in <video> tag:
// https://drive.google.com/uc?export=download&id=FILE_ID_HERE

// IMPORTANT: Google Drive sometimes blocks direct serving for some accounts. If a video doesn't play,
// 1) make sure the file is public (Anyone with the link can view), 2) try converting to MP4 and re-uploading.

// Accessibility: make cards focusable for keyboard users
document
  .querySelectorAll(".card")
  .forEach((c) => c.setAttribute("tabindex", "0"));
