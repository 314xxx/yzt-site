// ===== YZT — Script =====

document.addEventListener('DOMContentLoaded', () => {
  // Uptime
  const t0 = Date.now();
  const el = document.getElementById('uptime');
  function tick() {
    if (!el) return;
    const d = Date.now() - t0;
    const h = String(Math.floor(d / 3600000)).padStart(2, '0');
    const m = String(Math.floor((d % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((d % 60000) / 1000)).padStart(2, '0');
    el.textContent = h + ':' + m + ':' + s;
  }
  tick();
  setInterval(tick, 1000);

  // Seeds
  document.querySelectorAll('.seed').forEach(e => {
    e.textContent = 'SEED: ' + Math.floor(Math.random() * 9999999999).toString().padStart(10, '0');
  });

  // Progress bar
  const bar = document.getElementById('progressBar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / h * 100) + '%';
    });
  }

  // IP
  fetchIP();

  // Active nav
  const sections = document.querySelectorAll('.grid[id]');
  const links = document.querySelectorAll('.nav a');
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const l = document.querySelector('.nav a[href="#' + e.target.id + '"]');
        if (l) l.style.color = 'var(--gold)';
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => obs.observe(s));
});

async function fetchIP() {
  const el = document.getElementById('visitorIP');
  if (!el) return;
  try {
    const r = await fetch('https://api.ip.sb/geoip', { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    const p = [];
    if (d.city) p.push(d.city);
    if (d.country) p.push(d.country);
    el.textContent = p.join(', ') || d.ip || '未知';
  } catch {
    try {
      const r = await fetch('http://ip.3322.net', { signal: AbortSignal.timeout(3000) });
      el.textContent = await r.text();
    } catch {
      el.textContent = '未知';
    }
  }
}
