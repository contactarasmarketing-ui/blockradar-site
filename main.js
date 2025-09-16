// 4) Telemetry animasyonunu “daha gerçek” yapmak için random süre & gecikme
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-ping]').forEach(el => {
    el.style.animationDuration = (1000 + Math.random()*800) + 'ms';
    el.style.animationDelay = (Math.random()*1200) + 'ms';
  });
});

// 1) Header sabit: Eğer projede Scroll/GSAP transform varsa, header’a asla dokunmaması için:
(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  header.classList.add('no-transform');
})();
