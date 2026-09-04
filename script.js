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
  let activeIndex = 0;

  const goTo = (index) => {
    const target = slides[(index + slides.length) % slides.length];
    target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  prevBtn.addEventListener('click', () => { goTo(activeIndex - 1); restartAutoplay(); });
  nextBtn.addEventListener('click', () => { goTo(activeIndex + 1); restartAutoplay(); });

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        activeIndex = slides.indexOf(entry.target);
        dots.forEach(d => d.classList.remove('active'));
        if (dots[activeIndex]) dots[activeIndex].classList.add('active');
      }
    });
  }, { root: track, threshold: [0.6] });
  slides.forEach(s => slideObserver.observe(s));

  // ---- Autoplay: advances every 4.5s, pauses on interaction / off-screen / hidden tab ----
  const AUTOPLAY_MS = 4500;
  let autoplayTimer = null;
  const reduceMotion = !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  const stopAutoplay = () => { clearInterval(autoplayTimer); autoplayTimer = null; };
  const startAutoplay = () => {
    if (reduceMotion || autoplayTimer) return;
    autoplayTimer = setInterval(() => goTo(activeIndex + 1), AUTOPLAY_MS);
  };
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  const carouselWrap = track.closest('.carousel');
  ['pointerdown', 'wheel'].forEach(evt => {
    track.addEventListener(evt, () => { stopAutoplay(); }, { passive: true });
  });
  carouselWrap.addEventListener('mouseenter', stopAutoplay);
  carouselWrap.addEventListener('mouseleave', startAutoplay);
  carouselWrap.addEventListener('touchend', () => setTimeout(startAutoplay, 2000), { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay(); else startAutoplay();
  });

  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) startAutoplay(); else stopAutoplay();
    });
  }, { threshold: 0.3 });
  visibilityObserver.observe(carouselWrap);
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
