// ============ PRELOADER ============
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) setTimeout(() => pre.classList.add('done'), 300);
});

// ============ HEADER SCROLL STATE ============
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============ MOBILE MENU ============
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ============ SUBTLE HERO PARALLAX ============
const heroBg = document.getElementById('heroBg');
if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.2) {
      heroBg.style.transform = `translateY(${y * 0.15}px) scale(1.02)`;
    }
  }, { passive: true });
}

// ============ SCROLL REVEAL ============
const revealTargets = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));

// ============ GALLERY CAROUSEL ============
const track = document.getElementById('carouselTrack');
if (track) {
  const slides = Array.from(track.children);
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      slides[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  const scrollByOne = (dir) => {
    const slide = slides[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const amount = (slide.getBoundingClientRect().width + gap) * dir;
    track.scrollBy({ left: amount, behavior: 'smooth' });
  };
  prevBtn.addEventListener('click', () => scrollByOne(-1));
  nextBtn.addEventListener('click', () => scrollByOne(1));

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        const idx = slides.indexOf(entry.target);
        dots.forEach(d => d.classList.remove('active'));
        if (dots[idx]) dots[idx].classList.add('active');
      }
    });
  }, { root: track, threshold: [0.6] });
  slides.forEach(s => slideObserver.observe(s));
}

// ============ CARTA COMPLETA TOGGLE ============
const cartaToggle = document.getElementById('cartaToggle');
if (cartaToggle) {
  cartaToggle.addEventListener('click', () => {
    const collapsibles = document.querySelectorAll('.menu-collapsible');
    const expanding = !collapsibles[0].classList.contains('expanded');
    collapsibles.forEach(el => el.classList.toggle('expanded', expanding));
    cartaToggle.textContent = expanding ? 'Ver menos' : 'Ver carta completa';
  });
}

// ============ FOOTER YEAR ============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
