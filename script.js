// ============ PRELOADER ============
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) {
    setTimeout(() => pre.classList.add('done'), 250);
  }
});

// ============ HEADER SCROLL STATE ============
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
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

// ============ SCROLL REVEAL ============
const revealTargets = document.querySelectorAll(
  '.card, .g-item, .unit-card, .step, .contact-text, .contact-form, .section h2, .section-lead'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ============ FOOTER YEAR ============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============ QUOTE FORM -> WHATSAPP ============
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = data.get('nombre') || '';
    const fecha = data.get('fecha') || 'a confirmar';
    const evento = data.get('evento') || '';
    const mensaje = data.get('mensaje') || '';

    const text =
      `Hola! Soy ${nombre}.\n` +
      `Quiero cotizar la barra móvil para un evento de tipo: ${evento}.\n` +
      `Fecha estimada: ${fecha}.\n` +
      `Detalles: ${mensaje}`;

    const url = `https://wa.me/59898281622?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  });
}
