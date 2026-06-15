/* ============================================
   YZT — Interactive Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Cursor Glow ----
  const glow = document.getElementById('cursorGlow');
  let mx = 0, my = 0, gx = 0, gy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateGlow() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ---- Nav scroll ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---- Smooth scroll nav links ----
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---- Typewriter: hero label ----
  const labelEl = document.getElementById('heroLabel');
  const labelText = 'SYSTEM OPERATOR // CLASSIFIED';
  let li = 0;
  function typeLabel() {
    if (li <= labelText.length) {
      labelEl.textContent = labelText.slice(0, li) + '█';
      li++;
      setTimeout(typeLabel, 60 + Math.random() * 40);
    } else {
      labelEl.textContent = labelText;
    }
  }
  setTimeout(typeLabel, 800);

  // ---- Typewriter: hero desc ----
  const descEl = document.getElementById('heroDesc');
  const descText = 'Researcher. Operator. Observer of systems that think and systems that break.';
  let di = 0;
  function typeDesc() {
    if (di <= descText.length) {
      descEl.textContent = descText.slice(0, di);
      di++;
      setTimeout(typeDesc, 30 + Math.random() * 20);
    }
  }
  setTimeout(typeDesc, 1600);

  // ---- Terminal animation ----
  const termBody = document.getElementById('terminalBody');
  let termCmd = document.getElementById('terminalCmd');
  let cursorEl = termBody.querySelector('.cursor');

  const termSequence = [
    { type: 'cmd', text: 'cat /etc/identity' },
    { type: 'output', lines: [
      'name: [REDACTED]',
      'alias: yzt',
      'role: researcher / operator',
    ]},
    { type: 'cmd', text: 'echo $CURRENT_FOCUS' },
    { type: 'output', lines: [
      'AI systems · Security · Emergent behavior',
    ]},
    { type: 'cmd', text: 'uptime' },
    { type: 'output', lines: [
      '>>> always online',
    ]},
    { type: 'cmd', text: 'cat motto.txt' },
    { type: 'output', lines: [
      '"Every system has a story.',
      '  Find it."',
    ]},
  ];

  let seqIdx = 0;

  function buildTerminalState(upToIdx) {
    termBody.innerHTML = '';
    for (let i = 0; i <= upToIdx; i++) {
      const step = termSequence[i];
      if (step.type === 'output') {
        step.lines.forEach(line => {
          const div = document.createElement('div');
          div.className = 'terminal-output';
          div.textContent = line;
          termBody.appendChild(div);
        });
      }
    }
    // Add current prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = '<span class="prompt">$</span> <span class="cmd"></span><span class="cursor">█</span>';
    termBody.appendChild(promptLine);
    termCmd = promptLine.querySelector('.cmd');
    cursorEl = promptLine.querySelector('.cursor');
  }

  function typeCmd(text, callback) {
    let i = 0;
    function tick() {
      if (i <= text.length) {
        termCmd.textContent = text.slice(0, i);
        i++;
        setTimeout(tick, 50 + Math.random() * 30);
      } else {
        setTimeout(callback, 400);
      }
    }
    tick();
  }

  function runSequence() {
    if (seqIdx >= termSequence.length) {
      if (cursorEl) cursorEl.style.display = 'none';
      return;
    }
    const step = termSequence[seqIdx];
    if (step.type === 'cmd') {
      typeCmd(step.text, () => {
        seqIdx++;
        runSequence();
      });
    } else if (step.type === 'output') {
      buildTerminalState(seqIdx);
      // Remove the cmd text from prompt (already shown)
      termCmd.textContent = '';
      seqIdx++;
      setTimeout(runSequence, 600);
    }
  }

  // Start terminal after scroll into view
  const termObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      buildTerminalState(-1);
      setTimeout(runSequence, 500);
      termObserver.disconnect();
    }
  }, { threshold: 0.3 });
  termObserver.observe(termBody);

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll(
    '.about-text, .about-terminal, .work-card, .thinking-item, .contact-content'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ---- Card tilt effect ----
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---- Build time ----
  document.getElementById('buildTime').textContent =
    'BUILT ' + new Date().toISOString().slice(0, 10).toUpperCase();

  // ---- Parallax grid ----
  window.addEventListener('scroll', () => {
    const grid = document.querySelector('.hero-grid');
    if (grid) {
      grid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  });

});
