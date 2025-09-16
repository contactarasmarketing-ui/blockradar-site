// yıl
document.getElementById('y') && (document.getElementById('y').textContent = new Date().getFullYear());

// Canlı sayaçlar (random walk + easing)
const el1 = document.getElementById('c1');
const el2 = document.getElementById('c2');
const el3 = document.getElementById('c3');
let v1 = 480, v2 = 3, v3 = 320;

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const tween = (el, from, to, dur = 800) => {
  const s = performance.now();
  const step = () => {
    const p = Math.min((performance.now() - s) / dur, 1);
    const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    el.textContent = Math.round(from + (to - from) * e);
    if (p < 1) requestAnimationFrame(step);
  };
  step();
};
function tickStats() {
  v1 = clamp(Math.round(v1 + (Math.random() * 40 - 20)), 420, 560);
  v3 = clamp(Math.round(v3 + (Math.random() * 30 - 15)), 280, 380);
  if (Math.random() < 0.18) v2 = clamp(v2 + (Math.random() < .5 ? -1 : 1), 3, 5);
  tween(el1, parseInt(el1.textContent, 10), v1);
  tween(el2, parseInt(el2.textContent, 10), v2);
  tween(el3, parseInt(el3.textContent, 10), v3);
  setTimeout(tickStats, 1500 + Math.random() * 1200);
}
setTimeout(tickStats, 1000);

// Radar + Uptime wave sadece görünür olunca başlasın
let started = false;
const radarCard = document.getElementById('radarCard');
const ro = new IntersectionObserver((ents) => {
  ents.forEach(ent => {
    if (ent.isIntersecting && !started) {
      started = true;
      startRadar();
      ro.disconnect();
    }
  });
}, { threshold: .4 });
ro.observe(radarCard);

function startRadar() {
  const radar = document.getElementById('radar');
  const ap1 = document.getElementById('ap1');
  const ap2 = document.getElementById('ap2');

  // Kırmızı tespitler random konumlara kayar (tekrarsız hissiyat)
  const moveAlert = (el) => {
    const top = 18 + Math.random() * 64;
    const left = 18 + Math.random() * 64;
    el.style.top = top + '%';
    el.style.left = left + '%';
  };
  setInterval(() => moveAlert(ap1), 2800 + Math.random() * 1200);
  setTimeout(() => setInterval(() => moveAlert(ap2), 3000 + Math.random() * 1200), 1200);

  // Uptime Telemetry – sinüs + hafif noise + dönemsel frekans değişimi
  const path = document.getElementById('wavePath');
  let t = 0, drift = 0.02;
  function draw() {
    t += 0.04;
    // drift’i yavaşça değiştir → tekrarı kır
    drift += (Math.random() - 0.5) * 0.0002;
    drift = clamp(drift, 0.015, 0.03);

    const pts = [];
    const W = 600, base = 70;
    for (let x = 0; x <= W; x += 30) {
      const y = base
        + Math.sin(t + x * drift) * 10
        + Math.sin(t * 1.7 + x * 0.05) * 4
        + (Math.random() - 0.5) * 0.6; // küçük noise
      pts.push([x, y]);
    }
    let d = `M0,${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x, y] = pts[i];
      d += ` S ${x - 20},${(y + pts[i - 1][1]) / 2} ${x},${y}`;
    }
    d += ` ${W},${pts[pts.length - 1][1]}`;
    path.setAttribute('d', d);
    requestAnimationFrame(draw);
  }
  draw();
}
