// ===== YZT v5 — Dark/Light + 中/EN + Interactions =====
(function () {
  'use strict';

  // ===== TERMINAL LINES =====
  const terminalData = {
    zh: [
      { type: 'cmd', text: 'whoami' },
      { type: 'out', text: 'YZT — 研究者 · 操作者 · 观察者' },
      { type: 'cmd', text: 'cat focus.txt' },
      { type: 'out', text: 'AI/LLM · 网络安全 · 系统工程' },
      { type: 'cmd', text: 'echo $STATUS' },
      { type: 'out', text: 'ACTIVE — 在边界处探索' },
    ],
    en: [
      { type: 'cmd', text: 'whoami' },
      { type: 'out', text: 'YZT — Researcher · Operator · Observer' },
      { type: 'cmd', text: 'cat focus.txt' },
      { type: 'out', text: 'AI/LLM · Cybersecurity · Systems Engineering' },
      { type: 'cmd', text: 'echo $STATUS' },
      { type: 'out', text: 'ACTIVE — exploring the boundary' },
    ]
  };

  const terminalBody = document.getElementById('terminalBody');
  let lineIdx = 0;
  let typing = false;

  function runTerminal(lang) {
    if (typing) return;
    typing = true;
    terminalBody.innerHTML = '';
    lineIdx = 0;

    const lines = terminalData[lang] || terminalData.zh;

    function typeLine() {
      if (lineIdx >= lines.length) {
        // Final cursor
        const wrap = document.createElement('span');
        wrap.className = 'terminal-line';
        wrap.style.opacity = '1';
        wrap.innerHTML = '<span class="terminal-prompt">~ ❯ </span><span class="terminal-cursor"></span>';
        terminalBody.appendChild(wrap);
        typing = false;
        return;
      }

      const line = lines[lineIdx];

      if (line.type === 'cmd') {
        const el = document.createElement('span');
        el.className = 'terminal-line';
        el.style.animationDelay = '0s';
        el.innerHTML = '<span class="terminal-prompt">~ ❯ </span><span class="cmd-text"></span>';
        terminalBody.appendChild(el);

        const cmdEl = el.querySelector('.cmd-text');
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        el.appendChild(cursor);

        let i = 0;
        function typeChar() {
          if (i < line.text.length) {
            cmdEl.textContent += line.text[i++];
            setTimeout(typeChar, 40 + Math.random() * 50);
          } else {
            cursor.remove();
            lineIdx++;
            // Show output
            if (lineIdx < lines.length && lines[lineIdx].type === 'out') {
              const outEl = document.createElement('span');
              outEl.className = 'terminal-line';
              outEl.style.animationDelay = '0.1s';
              outEl.innerHTML = '<span style="color:var(--text-dim)">' + lines[lineIdx].text + '</span>';
              terminalBody.appendChild(outEl);
              lineIdx++;
            }
            setTimeout(typeLine, 350);
          }
        }
        typeChar();
      } else {
        lineIdx++;
        typeLine();
      }
    }

    setTimeout(typeLine, 300);
  }

  // ===== THEME =====
  const themeBtn = document.getElementById('themeBtn');
  let currentTheme = localStorage.getItem('yzt_theme') || 'dark';

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('yzt_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀' : '◐';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // ===== LANGUAGE =====
  const langBtn = document.getElementById('langBtn');
  let currentLang = localStorage.getItem('yzt_lang') || 'zh';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('yzt_lang', lang);
    if (langBtn) langBtn.textContent = lang === 'zh' ? 'EN' : '中';
    document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';

    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        if (text.includes('<')) el.innerHTML = text;
        else el.textContent = text;
      }
    });

    // Re-run terminal in new language
    runTerminal(lang);
  }

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLang(currentLang === 'zh' ? 'en' : 'zh');
    });
  }

  // ===== UPTIME =====
  const t0 = Date.now();
  const uptimeEl = document.getElementById('uptime');

  function tickUptime() {
    if (!uptimeEl) return;
    const d = Date.now() - t0;
    const h = String(Math.floor(d / 3600000)).padStart(2, '0');
    const m = String(Math.floor((d % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((d % 60000) / 1000)).padStart(2, '0');
    uptimeEl.textContent = h + ':' + m + ':' + s;
  }

  // ===== SEEDS =====
  function genSeeds() {
    document.querySelectorAll('.seed').forEach(e => {
      e.textContent = 'SEED: ' + Math.floor(Math.random() * 9999999999).toString().padStart(10, '0');
    });
  }

  // ===== PROGRESS BAR =====
  const bar = document.getElementById('progressBar');
  function updateProgress() {
    if (!bar) return;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h * 100) : 0) + '%';
  }

  // ===== SCROLL ANIMATIONS =====
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Skill bars
        entry.target.querySelectorAll('.skill-bar span[data-width]').forEach(b => {
          b.style.width = b.dataset.width + '%';
        });

        // Stat counters
        entry.target.querySelectorAll('.stat-num[data-count]').forEach(el => {
          animateCount(el, el.dataset.count);
        });

        // Active nav
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(s => observer.observe(s));

  function animateCount(el, target) {
    const num = parseInt(target);
    if (isNaN(num)) { el.textContent = target; return; }
    let current = 0;
    const step = Math.max(1, Math.floor(num / 25));
    const iv = setInterval(() => {
      current += step;
      if (current >= num) { current = num; clearInterval(iv); }
      el.textContent = current;
    }, 35);
  }

  // ===== IP =====
  async function fetchIP() {
    const el = document.getElementById('visitorIP');
    if (!el) return;
    try {
      const r = await fetch('https://api.ip.sb/geoip', { signal: AbortSignal.timeout(5000) });
      const d = await r.json();
      const p = [];
      if (d.city) p.push(d.city);
      if (d.country) p.push(d.country);
      el.textContent = p.join(', ') || d.ip || '—';
    } catch {
      try {
        const r = await fetch('https://ipinfo.io/json', { signal: AbortSignal.timeout(3000) });
        const d = await r.json();
        el.textContent = d.city ? d.city + ', ' + d.country : d.ip || '—';
      } catch { el.textContent = '—'; }
    }
  }

  // ===== VISITS =====
  function updateVisits() {
    const el = document.getElementById('visitCount');
    if (!el) return;
    let c = parseInt(localStorage.getItem('yzt_visits') || '0') + 1;
    localStorage.setItem('yzt_visits', c);
    el.textContent = c;
  }

  // ===== MOBILE MENU =====
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      menuBtn.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuBtn.textContent = '☰';
      });
    });
  }

  // ===== BACK TO TOP =====
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 400));
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ===== SMOOTH ANCHOR =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ===== HASH ROUTING =====
  function handleHash() {
    const hash = location.hash || '#hero';
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === hash));
  }

  window.addEventListener('hashchange', handleHash);

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    genSeeds();
    tickUptime();
    setInterval(tickUptime, 1000);
    updateProgress();
    window.addEventListener('scroll', updateProgress);
    fetchIP();
    updateVisits();
    applyLang(currentLang);
    handleHash();
  });
})();
