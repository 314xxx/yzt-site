// ===== YZT — Script v5.6 =====
// Marquee · Custom Cursor · Hero Parallax · Border Glow

document.addEventListener('DOMContentLoaded', () => {

  // ─── Loader ───
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 800);
    setTimeout(() => loader.remove(), 1400);
  }

  // ─── Uptime ───
  const t0 = Date.now();
  const uptimeEl = document.getElementById('uptime');
  function tick() {
    if (!uptimeEl) return;
    const d = Date.now() - t0;
    const h = String(Math.floor(d / 3600000)).padStart(2, '0');
    const m = String(Math.floor((d % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((d % 60000) / 1000)).padStart(2, '0');
    uptimeEl.textContent = h + ':' + m + ':' + s;
  }
  tick();
  setInterval(tick, 1000);

  // ─── Seeds ───
  document.querySelectorAll('.seed').forEach(e => {
    e.textContent = 'SEED: ' + Math.floor(Math.random() * 9999999999).toString().padStart(10, '0');
  });

  // ─── Progress bar ───
  const bar = document.getElementById('progressBar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / h * 100) + '%';
    });
  }

  // ─── Hamburger menu ───
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // ─── Theme toggle ───
  const themeBtn = document.getElementById('themeToggle');
  let isDark = true;
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      isDark = !isDark;
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.textContent = '\u2600';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.textContent = '\u263E';
      }
    });
  }

  // ─── Language toggle ───
  const langBtn = document.getElementById('langToggle');
  let lang = 'zh';
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      lang = lang === 'zh' ? 'en' : 'zh';
      langBtn.textContent = lang === 'zh' ? '\u4E2D' : 'EN';
      document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        const val = el.getAttribute('data-' + lang);
        if (val) el.innerHTML = val;
      });
    });
  }

  // ─── IP ───
  fetchIP();

  // ─── Active nav ───
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

  // ═══════════════════════════════════════════
  // CUSTOM CURSOR (Lorenzo-style with trail)
  // ═══════════════════════════════════════════
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0;
    let dx = 0, dy = 0;  // dot position (fast)
    let rx = 0, ry = 0;  // ring position (slow, creates trail)

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animateCursor() {
      // Dot follows quickly
      dx += (mx - dx) * 0.25;
      dy += (my - dy) * 0.25;
      cursorDot.style.transform = `translate3d(${dx - 6}px, ${dy - 6}px, 0)`;

      // Ring follows slowly (creates trail/gooey effect)
      rx += (mx - rx) * 0.08;
      ry += (my - ry) * 0.08;
      cursorRing.style.transform = `translate3d(${rx - 22.5}px, ${ry - 22.5}px, 0)`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // ═══════════════════════════════════════════
  // HERO PARALLAX (mouse-driven)
  // ═══════════════════════════════════════════
  const heroBody = document.getElementById('heroBody');
  const heroTitle = document.getElementById('heroTitle');
  const heroText = document.getElementById('heroText');

  if (heroBody && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;

      if (heroTitle) {
        heroTitle.style.transform = `translate(${cx * 8}px, ${cy * 5}px)`;
      }
      if (heroText) {
        heroText.style.transform = `translate(${cx * 4}px, ${cy * 3}px)`;
      }
    });
  }

  // ═══════════════════════════════════════════
  // BORDER GLOW EFFECT
  // ═══════════════════════════════════════════
  document.querySelectorAll('.border-glow').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Edge proximity (0-100)
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity, ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1) * 100;

      // Cursor angle
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;

      card.style.setProperty('--edge-proximity', edge.toFixed(1));
      card.style.setProperty('--cursor-angle', angle.toFixed(1) + 'deg');
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--edge-proximity', '0');
    });
  });

});

// ─── Fetch IP ───
async function fetchIP() {
  const el = document.getElementById('visitorIP');
  if (!el) return;
  try {
    const r = await fetch('https://api.ip.sb/geoip', { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    const p = [];
    if (d.city) p.push(d.city);
    if (d.country) p.push(d.country);
    el.textContent = p.join(', ') || d.ip || '\u672A\u7705';
  } catch {
    try {
      const r = await fetch('http://ip.3322.net', { signal: AbortSignal.timeout(3000) });
      el.textContent = await r.text();
    } catch {
      el.textContent = '\u672A\u7705';
    }
  }
}
