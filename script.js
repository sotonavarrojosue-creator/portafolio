// APARECÉ — portafolio: microinteracciones
document.addEventListener('DOMContentLoaded', () => {
  // Nav sticky state
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Reloj local (toque telemetry)
  const clock = document.getElementById('clock');
  const tick = () => {
    const now = new Date().toLocaleTimeString('es-CR', { hour12: false, timeZone: 'America/Costa_Rica' });
    if (clock) clock.textContent = 'SJC ' + now;
  };
  tick();
  setInterval(tick, 1000);

  // Scroll spy en el nav
  const links = document.querySelectorAll('.nav__links a');
  const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => {
          l.style.borderBottomColor = l.getAttribute('href') === '#' + e.target.id ? 'var(--orange)' : 'transparent';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => spy.observe(s));
});
