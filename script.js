/* ============================================
   YZT — Interactive Engine v2
   Cursor · Particles · Terminal · Reveals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== LOADER =====
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  let loadProgress = 0;

  function animateLoader() {
    loadProgress += Math.random() * 15 + 5;
    if (loadProgress > 100) loadProgress = 100;
    loaderFill.style.width = loadProgress + '%';
    if (loadProgress < 100) {
      setTimeout(animateLoader, 100 + Math.random() * 200);
    } else {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 400);
    }
  }
  document.body.style.overflow = 'hidden';
  animateLoader();

  // ===== CUSTOM CURSOR =====
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const glow = document.getElementById('cursorGlow');
  let mx = -100, my = -100, rx = -100, ry = -100, gx = -100, gy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
  });

  function animateCursor() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    gx += (mx - gx) * 0.06;
    gy += (my - gy) * 0.06;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover on interactive elements
  const interactiveEls = 'a, button, .work-card, .thinking-item, .skill-card, .stat-card, input';
  document.querySelectorAll(interactiveEls).forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  // ===== HERO PARTICLE CANVAS =====
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseCanvas = { x: 0, y: 0 };

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseCanvas.x = e.clientX - rect.left;
    mouseCanvas.y = e.clientY - rect.top;
  });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.3 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      // Mouse repel
      const dx = this.x - mouseCanvas.x;
      const dy = this.y - mouseCanvas.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150 * 0.02;
        this.vx += dx * force;
        this.vy += dy * force;
      }
      // Damping
      this.vx *= 0.99;
      this.vy *= 0.99;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  const numParticles = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
  for (let i = 0; i < numParticles; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    // Lines to mouse
    particles.forEach(p => {
      const dx = p.x - mouseCanvas.x;
      const dy = p.y - mouseCanvas.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseCanvas.x, mouseCanvas.y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 200)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ===== COORDS DISPLAY =====
  const coordsX = document.getElementById('coordsX');
  const coordsY = document.getElementById('coordsY');
  document.addEventListener('mousemove', e => {
    coordsX.textContent = 'X: ' + String(e.clientX).padStart(4, '0');
    coordsY.textContent = 'Y: ' + String(e.clientY).padStart(4, '0');
  });

  // ===== UPTIME COUNTER =====
  const uptimeEl = document.getElementById('uptime');
  const startTime = Date.now();
  function updateUptime() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
    const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');
    uptimeEl.textContent = h + ':' + m + ':' + s;
    requestAnimationFrame(updateUptime);
  }
  updateUptime();

  // ===== NAV =====
  const nav = document.getElementById('nav');
  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    nav.classList.toggle('scrolled', scrolled);
    // Scroll progress
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu
      mobileMenu.classList.remove('active');
      navMenuBtn.classList.remove('active');
    });
  });

  // Mobile menu
  const navMenuBtn = document.getElementById('navMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  navMenuBtn.addEventListener('click', () => {
    navMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // ===== HERO TYPEWRITERS =====
  function typeText(el, text, speed, delay, callback) {
    setTimeout(() => {
      let i = 0;
      function tick() {
        if (i <= text.length) {
          el.textContent = text.slice(0, i) + (i < text.length ? '█' : '');
          i++;
          setTimeout(tick, speed + Math.random() * speed * 0.5);
        } else {
          el.textContent = text;
          if (callback) callback();
        }
      }
      tick();
    }, delay);
  }

  typeText(document.getElementById('heroLabel'),
    'SYSTEM OPERATOR // CLASSIFIED', 50, 1200);

  typeText(document.getElementById('heroDesc'),
    'Researcher. Operator. Observer of systems that think and systems that break.',
    25, 2200);

  // ===== SCRAMBLE TEXT =====
  const scrambleChars = '█▓▒░@#$%&*!?';
  document.querySelectorAll('.scramble').forEach(el => {
    const original = el.getAttribute('data-text') || el.textContent;
    let interval;
    el.addEventListener('mouseenter', () => {
      let iterations = 0;
      interval = setInterval(() => {
        el.textContent = original.split('').map((ch, i) => {
          if (i < iterations) return original[i];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');
        iterations += 1 / 2;
        if (iterations > original.length) {
          el.textContent = original;
          clearInterval(interval);
        }
      }, 40);
    });
    el.addEventListener('mouseleave', () => {
      clearInterval(interval);
      el.textContent = original;
    });
  });

  // ===== ABOUT TERMINAL =====
  const termBody = document.getElementById('terminalBody');
  let termCmd = document.getElementById('terminalCmd');
  let cursorEl = termBody.querySelector('.cursor');
  const termRunBtn = document.getElementById('termRun');

  const termSequence = [
    { type: 'cmd', text: 'cat /etc/identity' },
    { type: 'output', lines: [
      'name:    [REDACTED]',
      'alias:   yzt',
      'role:    researcher / operator',
      'status:  active',
    ]},
    { type: 'cmd', text: 'echo $CURRENT_FOCUS' },
    { type: 'output', lines: [
      'AI systems · Cybersecurity · Emergent behavior',
    ]},
    { type: 'cmd', text: 'uname -a' },
    { type: 'output', lines: [
      'void 6.6.0-yzt #1 SMP PREEMPT_DYNAMIC x86_64',
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
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = '<span class="prompt">$</span> <span class="cmd"></span><span class="cursor">█</span>';
    termBody.appendChild(promptLine);
    termCmd = promptLine.querySelector('.cmd');
    cursorEl = promptLine.querySelector('.cursor');
  }

  function typeCmd(text, cb) {
    let i = 0;
    function tick() {
      if (i <= text.length) {
        termCmd.textContent = text.slice(0, i);
        i++;
        setTimeout(tick, 45 + Math.random() * 25);
      } else { setTimeout(cb, 350); }
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
      typeCmd(step.text, () => { seqIdx++; runSequence(); });
    } else if (step.type === 'output') {
      buildTerminalState(seqIdx);
      termCmd.textContent = '';
      seqIdx++;
      setTimeout(runSequence, 500);
    }
  }

  // Re-run button
  termRunBtn.addEventListener('click', () => {
    seqIdx = 0;
    buildTerminalState(-1);
    setTimeout(runSequence, 200);
  });

  // Start on scroll
  const termObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      buildTerminalState(-1);
      setTimeout(runSequence, 500);
      termObserver.disconnect();
    }
  }, { threshold: 0.3 });
  termObserver.observe(termBody);

  // ===== STATS COUNTER =====
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = el.getAttribute('data-target');
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (target === '∞') {
          el.textContent = '∞';
        } else {
          const num = parseInt(target);
          let current = 0;
          const step = Math.max(1, Math.floor(num / 30));
          const interval = setInterval(() => {
            current += step;
            if (current >= num) { current = num; clearInterval(interval); }
            el.textContent = current;
          }, 40);
        }
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
  });

  // ===== SKILLS ANIMATION =====
  document.querySelectorAll('.skill-card').forEach(el => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.classList.add('visible');
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
  });

  // ===== SKILLS CANVAS (Wave visualization) =====
  const skillsCanvas = document.getElementById('skillsCanvas');
  const sCtx = skillsCanvas.getContext('2d');
  let skillsTime = 0;

  function resizeSkillsCanvas() {
    skillsCanvas.width = skillsCanvas.offsetWidth * 2;
    skillsCanvas.height = skillsCanvas.offsetHeight * 2;
    sCtx.scale(2, 2);
  }
  resizeSkillsCanvas();
  window.addEventListener('resize', resizeSkillsCanvas);

  function drawSkillsWave() {
    const w = skillsCanvas.offsetWidth;
    const h = skillsCanvas.offsetHeight;
    sCtx.clearRect(0, 0, w, h);

    const waves = [
      { amp: 20, freq: 0.015, speed: 0.02, color: 'rgba(0, 212, 255, 0.15)' },
      { amp: 15, freq: 0.02, speed: 0.015, color: 'rgba(123, 97, 255, 0.12)' },
      { amp: 25, freq: 0.01, speed: 0.025, color: 'rgba(0, 212, 255, 0.08)' },
    ];

    waves.forEach(wave => {
      sCtx.beginPath();
      sCtx.moveTo(0, h / 2);
      for (let x = 0; x <= w; x++) {
        const y = h / 2 + Math.sin(x * wave.freq + skillsTime * wave.speed) * wave.amp
                        + Math.sin(x * wave.freq * 0.5 + skillsTime * wave.speed * 1.3) * wave.amp * 0.5;
        sCtx.lineTo(x, y);
      }
      sCtx.lineTo(w, h);
      sCtx.lineTo(0, h);
      sCtx.closePath();
      sCtx.fillStyle = wave.color;
      sCtx.fill();
    });

    // Grid
    sCtx.strokeStyle = 'rgba(0,0,0,0.03)';
    sCtx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 40) {
      sCtx.beginPath(); sCtx.moveTo(x, 0); sCtx.lineTo(x, h); sCtx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      sCtx.beginPath(); sCtx.moveTo(0, y); sCtx.lineTo(w, y); sCtx.stroke();
    }

    skillsTime++;
    requestAnimationFrame(drawSkillsWave);
  }
  drawSkillsWave();

  // ===== CARD GLOW FOLLOW =====
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // ===== CARD TILT =====
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll(
    '.about-text, .about-terminal, .about-stats, .skill-card, .work-card, .thinking-item, .contact-content, .interactive-terminal'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    revealObserver.observe(el);
  });

  // ===== INTERACTIVE TERMINAL =====
  const iBody = document.getElementById('interactiveBody');
  const iInput = document.getElementById('interactiveInput');

  const commands = {
    help: () => [
      'Available commands:',
      '',
      '  help      — Show this message',
      '  whoami    — Identity info',
      '  about     — About me',
      '  skills    — Skill tree',
      '  focus     — Current focus areas',
      '  secret    — ???',
      '  clear     — Clear terminal',
      '  date      — Current timestamp',
      '  quote     — Random quote',
      '  matrix    — Enter the matrix',
      '',
      'Type anything to explore.',
    ],
    whoami: () => ['yzt — researcher / operator', 'clearance: ████████████'],
    about: () => [
      'An observer at the intersection of AI, security,',
      'and emergent patterns. Operating in the spaces',
      'where systems break, evolve, and recombine.',
    ],
    skills: () => [
      '├── AI / ML Systems    [████████░░] 90%',
      '├── Cybersecurity      [███████░░░] 75%',
      '├── Development        [████████░░] 85%',
      '└── Infrastructure     [███████░░░] 70%',
    ],
    focus: () => [
      '→ LLM Agents & Orchestration',
      '→ Penetration Testing (learning)',
      '→ Adversarial ML Research',
      '→ System-level security analysis',
    ],
    secret: () => ['You found it. But there\'s nothing here. Or is there? 👁️'],
    date: () => [new Date().toISOString()],
    clear: () => 'CLEAR',
    matrix: () => {
      const lines = [];
      for (let i = 0; i < 8; i++) {
        let line = '';
        for (let j = 0; j < 60; j++) {
          line += String.fromCharCode(0x30A0 + Math.random() * 96);
        }
        lines.push(line);
      }
      lines.push('', 'Wake up, Neo...');
      return lines;
    },
    quote: () => {
      const quotes = [
        '"The best way to predict the future is to invent it." — Alan Kay',
        '"Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke',
        '"In the middle of difficulty lies opportunity." — Einstein',
        '"The only true wisdom is in knowing you know nothing." — Socrates',
        '"First, solve the problem. Then, write the code." — John Johnson',
      ];
      return [quotes[Math.floor(Math.random() * quotes.length)]];
    },
  };

  function addOutput(text, cls) {
    const div = document.createElement('div');
    div.className = 'interactive-output' + (cls ? ' ' + cls : '');
    div.textContent = text;
    iBody.insertBefore(div, iBody.querySelector('.interactive-input-line'));
  }

  function addPromptEcho(cmd) {
    const div = document.createElement('div');
    div.className = 'interactive-output cmd-echo';
    div.innerHTML = '<span style="color:#00ff88">visitor@yzt</span><span style="color:rgba(255,255,255,0.3)">:</span><span style="color:#7b61ff">~</span><span style="color:rgba(255,255,255,0.5)">$ </span>' + cmd;
    iBody.insertBefore(div, iBody.querySelector('.interactive-input-line'));
  }

  iInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = iInput.value.trim().toLowerCase();
      iInput.value = '';
      if (!cmd) return;

      addPromptEcho(cmd);

      if (commands[cmd]) {
        const result = commands[cmd]();
        if (result === 'CLEAR') {
          // Clear all output except welcome and input line
          const welcome = iBody.querySelector('.interactive-welcome');
          const inputLine = iBody.querySelector('.interactive-input-line');
          iBody.innerHTML = '';
          if (welcome) iBody.appendChild(welcome);
          iBody.appendChild(inputLine);
          return;
        }
        result.forEach((line, i) => {
          setTimeout(() => addOutput(line), i * 30);
        });
      } else {
        addOutput(`bash: ${cmd}: command not found. Type 'help' for available commands.`, 'error');
      }

      // Auto-scroll
      setTimeout(() => {
        iBody.scrollTop = iBody.scrollHeight;
      }, 100);
    }
  });

  // Focus input on click anywhere in terminal
  iBody.addEventListener('click', () => iInput.focus());

  // ===== BUILD TIME =====
  document.getElementById('buildTime').textContent =
    'BUILT ' + new Date().toISOString().slice(0, 10).toUpperCase();

  // ===== PARALLAX GRID =====
  window.addEventListener('scroll', () => {
    const grid = document.querySelector('.hero-grid');
    if (grid) grid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  });

});
