// small helper: replace youtube-like tilt with pointer-based 3D tilt
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const inner = card.querySelector(".card-inner");

  // accessibility ke liye
  card.setAttribute("tabindex", "0");

  // mouse move par tilt
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    inner.style.transform = `perspective(900px) rotateX(${dy * 8}deg) rotateY(${
      dx * -8
    }deg) translateZ(6px)`;
    card.classList.add("glow");
  });

  // mouse leave par reset
  card.addEventListener("mouseleave", () => {
    inner.style.transform = "";
    card.classList.remove("glow");
  });

  // touch par thoda zoom (mobile)
  card.addEventListener("touchstart", () => {
    inner.style.transform = "perspective(900px) translateZ(6px) scale(1.02)";
    card.classList.add("glow");
  });
  card.addEventListener("touchend", () => {
    inner.style.transform = "";
    card.classList.remove("glow");
  });
});

// keyboard accessibility (Enter / Space se video toggle)
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "Enter") {
    const vid =
      document.activeElement.querySelector &&
      document.activeElement.querySelector("video");
    if (vid) {
      e.preventDefault();
      vid.paused ? vid.play() : vid.pause();
    }
  }
});

// smooth scroll
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

// toggle menu (mobile navbar)
function toggleMenu() {
  document.getElementById("menuList").classList.toggle("show");
}







// Tilt effect for About & Contact
function tiltEffect(section) {
  section.addEventListener("mousemove", (e) => {
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    const tiltX = (dy * 6).toFixed(2);
    const tiltY = (dx * -6).toFixed(2);
    section.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  section.addEventListener("mouseleave", () => {
    section.style.transform = "rotateX(0) rotateY(0)";
  });
}

const aboutCard = document.querySelector("#about");
const contactCard = document.querySelector("#contact form");

if (aboutCard) tiltEffect(aboutCard);
if (contactCard) tiltEffect(contactCard);
