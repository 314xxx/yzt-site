// ===== YZT — Minimal Script =====

document.addEventListener('DOMContentLoaded', () => {
  // Uptime counter
  const startTime = Date.now();
  const uptimeEl = document.getElementById('uptime');
  function updateUptime() {
    if (!uptimeEl) return;
    const diff = Date.now() - startTime;
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    uptimeEl.textContent = `${h}:${m}:${s}`;
  }
  updateUptime();
  setInterval(updateUptime, 1000);

  // Random seeds
  document.querySelectorAll('[id^="seed"]').forEach(el => {
    el.textContent = Math.floor(Math.random() * 9999999999).toString().padStart(10, '0');
  });

  // IP location
  fetchLocation();

  // Active nav link on scroll
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));
});

async function fetchLocation() {
  const el = document.getElementById('visitorIP');
  if (!el) return;
  try {
    const res = await fetch('https://api.ip.sb/geoip', { signal: AbortSignal.timeout(5000) });
    const data = await res.json();
    const parts = [];
    if (data.city) parts.push(data.city);
    if (data.country) parts.push(data.country);
    el.textContent = parts.join(', ') || data.ip || '未知';
  } catch {
    try {
      const res = await fetch('http://ip.3322.net', { signal: AbortSignal.timeout(3000) });
      el.textContent = await res.text();
    } catch {
      el.textContent = '未知';
    }
  }
}
