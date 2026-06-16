// ===== YZT v4 — Interactive Script =====

(function () {
  'use strict';

  // ===== TERMINAL TYPING EFFECT =====
  const terminalLines = [
    { prompt: '~', cmd: 'whoami' },
    { output: 'YZT — Researcher · Operator · Observer' },
    { prompt: '~', cmd: 'cat focus.txt' },
    { output: 'AI/LLM · Cybersecurity · Systems Engineering' },
    { prompt: '~', cmd: 'echo $STATUS' },
    { output: 'ACTIVE — exploring the boundary' },
    { prompt: '~', cmd: '' },
  ];

  const terminalBody = document.getElementById('terminalBody');
  let lineIdx = 0;

  function typeLine() {
    if (lineIdx >= terminalLines.length) return;
    const line = terminalLines[lineIdx];
    const el = document.createElement('span');
    el.className = 'terminal-line';
    el.style.animationDelay = '0s';

    if (line.prompt) {
      el.innerHTML = `<span class="terminal-prompt">${line.prompt} ❯ </span><span class="cmd-text"></span>`;
      terminalBody.appendChild(el);
      typeCmd(el.querySelector('.cmd-text'), line.cmd, () => {
        lineIdx++;
        setTimeout(typeLine, 400);
      });
    } else {
      el.innerHTML = `<span style="color:var(--white-dim)">${line.output}</span>`;
      terminalBody.appendChild(el);
      lineIdx++;
      setTimeout(typeLine, 600);
    }
  }

  function typeCmd(el, text, cb) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    el.parentElement.appendChild(cursor);

    function tick() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, 50 + Math.random() * 60);
      } else {
        cursor.remove();
        // Show output line
        const nextLine = terminalLines[lineIdx + 1];
        if (nextLine && nextLine.output) {
          const outEl = document.createElement('span');
          outEl.className = 'terminal-line';
          outEl.style.animationDelay = '0.1s';
          outEl.innerHTML = `<span style="color:var(--white-dim)">${nextLine.output}</span>`;
          terminalBody.appendChild(outEl);
          lineIdx++; // skip output line
        }
        if (cb) setTimeout(cb, 200);
      }
    }
    tick();
  }

  // Add final cursor to last line
  function addFinalCursor() {
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    const lastPrompt = document.createElement('span');
    lastPrompt.className = 'terminal-line';
    lastPrompt.innerHTML = `<span class="terminal-prompt">~ ❯ </span>`;
    lastPrompt.appendChild(cursor);
    terminalBody.appendChild(lastPrompt);
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
  const navLinks = document.querySelectorAll('.nav a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars
        entry.target.querySelectorAll('.skill-bar span[data-width]').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });

        // Animate stat numbers
        entry.target.querySelectorAll('.stat-num[data-count]').forEach(el => {
          animateCount(el, el.dataset.count);
        });

        // Update active nav
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(s => observer.observe(s));

  // ===== ANIMATE COUNTER =====
  function animateCount(el, target) {
    if (target === '∞' || target === '0') {
      el.textContent = target;
      return;
    }
    const num = parseInt(target);
    if (isNaN(num)) { el.textContent = target; return; }
    let current = 0;
    const step = Math.max(1, Math.floor(num / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= num) { current = num; clearInterval(interval); }
      el.textContent = current;
    }, 40);
  }

  // ===== IP LOCATION =====
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
      } catch {
        el.textContent = '—';
      }
    }
  }

  // ===== VISIT COUNTER (localStorage) =====
  function updateVisits() {
    const el = document.getElementById('visitCount');
    if (!el) return;
    let count = parseInt(localStorage.getItem('yzt_visits') || '0') + 1;
    localStorage.setItem('yzt_visits', count);
    el.textContent = count;
  }

  // ===== LANGUAGE TOGGLE =====
  let currentLang = localStorage.getItem('yzt_lang') || 'zh';
  const langBtn = document.getElementById('langBtn');

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('yzt_lang', lang);
    if (langBtn) langBtn.textContent = lang === 'zh' ? 'EN' : '中';

    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        if (text.includes('<')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
  }

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLang(currentLang === 'zh' ? 'en' : 'zh');
    });
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
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 400);
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', () => {
    genSeeds();
    tickUptime();
    setInterval(tickUptime, 1000);
    updateProgress();
    window.addEventListener('scroll', updateProgress);
    fetchIP();
    updateVisits();
    applyLang(currentLang);

    // Start terminal typing after short delay
    setTimeout(() => {
      typeLine();
      // Add final cursor after all lines
      const totalDelay = terminalLines.length * 800 + 2000;
      setTimeout(addFinalCursor, totalDelay);
    }, 500);
  });
})();
