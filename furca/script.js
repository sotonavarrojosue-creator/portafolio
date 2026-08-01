/* Furca — script.js */

// Reloj local (topbar)
(function () {
  var clock = document.getElementById('clock');
  function tick() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = 'HORA LOCAL ' + h + ':' + m;
  }
  tick();
  setInterval(tick, 30000);
})();

// Reveal por sección: slide-X con stagger en bloques grandes (no fade-up genérico)
(function () {
  var els = document.querySelectorAll('.split, .specs, .rows, .table, .cocktails, .cta__inner');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 600ms var(--ease), transform 600ms var(--ease)';
    io.observe(el);
  });
})();

// Línea de hero: reveal por clip
(function () {
  var lines = document.querySelectorAll('.hero__title .line');
  lines.forEach(function (line, i) {
    line.style.transition = 'clip-path 700ms var(--ease) ' + (i * 140) + 'ms';
    line.style.clipPath = 'inset(0 100% 0 0)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        line.style.clipPath = 'inset(0 0 0 0)';
      });
    });
  });
})();
