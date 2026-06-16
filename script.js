/* ============================================
   YZT — Interactive Engine v4
   Theme · Language · Cursor Trail · Particles
   ============================================ */

// ===== TRANSLATIONS =====
const translations = {
  zh: {
    'loading': '初始化系统...',
    'nav-about': '关于', 'nav-skills': '技能', 'nav-work': '作品',
    'nav-thinking': '思考', 'nav-pentest': '渗透', 'nav-contact': '联系',
    'hero-label': '系统操作员 // 机密',
    'hero-desc': '研究者。操作者。观察思考与崩溃的系统。',
    'hero-explore': '探索', 'hero-the': '系统之间的', 'hero-void': '虚空',
    'hero-between': '与', 'hero-systems': '秩序',
    'hero-explore-btn': '探索作品', 'hero-contact-btn': '联系我',
    'meta-location': '位置', 'meta-status': '状态', 'meta-active': '活跃',
    'meta-clearance': '权限等级', 'meta-uptime': '运行时间', 'scroll': '滚动',
    'section-about': '关于', 'section-skills': '技能', 'section-work': '作品',
    'section-thinking': '思考', 'section-terminal': '终端', 'section-contact': '联系',
    'about-intro': '一个观察者，站在<span class="highlight" data-tip="大语言模型、智能体、强化学习">人工智能</span>、<span class="highlight" data-tip="渗透测试、逆向工程、开源情报">网络安全</span>和连接它们的涌现模式的交汇处。',
    'about-body': '在系统崩溃、进化和重组的空间中运作。每一个漏洞都是一扇门。每一个模型都是一面镜子。有趣的问题存在于边界之处。',
    'stat-focus': '专注领域', 'stat-questions': '探索问题', 'stat-boundaries': '边界限制',
    'skill-ai': 'AI / 机器学习系统', 'skill-ai-detail': '大模型微调 · 智能体架构 · 强化学习',
    'skill-security': '网络安全', 'skill-security-detail': '渗透测试 · Web安全 · 开源情报',
    'skill-dev': '软件开发', 'skill-dev-detail': 'Python · Rust · TypeScript · Go',
    'skill-infra': '基础设施', 'skill-infra-detail': 'Docker · Linux · 网络 · 云计算',
    'work-ai': 'AI 系统', 'work-ai-desc': '构建和破坏智能系统。从微调到红队测试。机器正在觉醒。',
    'work-security': '安全研究', 'work-security-desc': '绘制攻击面。理解失败模式。每一把锁都有钥匙，每一个系统都有故事。',
    'work-research': '学术研究', 'work-research-desc': '探索机器理解和创造的边界。未知就是目的地。',
    'work-active': '● 进行中', 'work-exploring': '● 探索中', 'work-ongoing': '● 持续进行',
    'think-1': '论对齐的脆弱性', 'think-1-tag': 'AI安全',
    'think-2': '多智能体系统中的对抗模式', 'think-2-tag': '研究',
    'think-3': 'CTF教会我们关于真实系统的什么', 'think-3-tag': '安全',
    'think-4': '提示词的不合理有效性', 'think-4-tag': '大模型',
    'terminal-hint': '输入 <span class="cmd-hint">help</span> 查看可用命令',
    'contact-text': '使用以下渠道进行加密传输。',
    'contact-quote': '"发现可能的极限的唯一方法，<br>就是超越它们，进入不可能。"',
    'konami-title': '🎮 秘技已激活', 'konami-desc': '你找到了秘密。矩阵掌控了你。',
    'konami-exit': '退出', 'footer-built': '精心打造',
  },
  en: {
    'loading': 'INITIALIZING SYSTEM...',
    'nav-about': 'About', 'nav-skills': 'Skills', 'nav-work': 'Work',
    'nav-thinking': 'Thinking', 'nav-pentest': 'Pentest', 'nav-contact': 'Contact',
    'hero-label': 'SYSTEM OPERATOR // CLASSIFIED',
    'hero-desc': 'Researcher. Operator. Observer of systems that think and systems that break.',
    'hero-explore': 'Exploring', 'hero-the': 'the', 'hero-void': 'void',
    'hero-between': 'between', 'hero-systems': 'systems',
    'hero-explore-btn': 'Explore Work', 'hero-contact-btn': 'Get in Touch',
    'meta-location': 'LOCATION', 'meta-status': 'STATUS', 'meta-active': 'ACTIVE',
    'meta-clearance': 'CLEARANCE', 'meta-uptime': 'UPTIME', 'scroll': 'SCROLL',
    'section-about': 'About', 'section-skills': 'Skills', 'section-work': 'Work',
    'section-thinking': 'Thinking', 'section-terminal': 'Terminal', 'section-contact': 'Contact',
    'about-intro': 'An observer at the intersection of <span class="highlight" data-tip="Large Language Models, Agents, Reinforcement Learning">artificial intelligence</span>, <span class="highlight" data-tip="Penetration Testing, Reverse Engineering, OSINT">cybersecurity</span>, and the emergent patterns that connect them.',
    'about-body': 'Operating in the spaces where systems break, evolve, and recombine. Every vulnerability is a door. Every model is a mirror. The interesting questions live at the edges.',
    'stat-focus': 'Focus Areas', 'stat-questions': 'Questions', 'stat-boundaries': 'Boundaries',
    'skill-ai': 'AI / ML Systems', 'skill-ai-detail': 'LLM Fine-tuning · Agent Architecture · RL',
    'skill-security': 'Cybersecurity', 'skill-security-detail': 'Pentesting · Web Security · OSINT',
    'skill-dev': 'Development', 'skill-dev-detail': 'Python · Rust · TypeScript · Go',
    'skill-infra': 'Infrastructure', 'skill-infra-detail': 'Docker · Linux · Networking · Cloud',
    'work-ai': 'AI Systems', 'work-ai-desc': 'Building and breaking intelligent systems. From fine-tuning to red-teaming. The machines are waking up.',
    'work-security': 'Security', 'work-security-desc': 'Mapping attack surfaces. Understanding failure modes. Every lock has a key, every system has a story.',
    'work-research': 'Research', 'work-research-desc': 'Probing the boundaries of what machines can understand and create. The unknown is the destination.',
    'work-active': '● Active', 'work-exploring': '● Exploring', 'work-ongoing': '● Ongoing',
    'think-1': 'On the fragility of alignment', 'think-1-tag': 'AI Safety',
    'think-2': 'Adversarial patterns in multi-agent systems', 'think-2-tag': 'Research',
    'think-3': 'What CTFs teach us about real systems', 'think-3-tag': 'Security',
    'think-4': 'The unreasonable effectiveness of prompting', 'think-4-tag': 'LLM',
    'terminal-hint': 'Type <span class="cmd-hint">help</span> to see available commands',
    'contact-text': 'For encrypted transmissions, use the channels below.',
    'contact-quote': '"The only way to discover the limits of the possible<br>is to go beyond them into the impossible."',
    'konami-title': '🎮 KONAMI CODE ACTIVATED', 'konami-desc': 'You found the secret. The matrix has you.',
    'konami-exit': 'EXIT', 'footer-built': 'BUILT WITH PURPOSE',
  }
};

// ===== LANGUAGE TOGGLE =====
let currentLang = localStorage.getItem('lang') || 'zh';

function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  const langTextEl = document.querySelector('.lang-text');
  if (langTextEl) langTextEl.textContent = lang === 'zh' ? 'EN' : '中';
  
  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });
  
  // Update page title
  document.title = lang === 'zh' ? 'YZT — 研究者·操作者·观察者' : 'YZT — Researcher·Operator·Observer';
}

// Initialize language immediately
updateLanguage(currentLang);

document.addEventListener('DOMContentLoaded', () => {

  // Language toggle click handler
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'zh' ? 'en' : 'zh';
      updateLanguage(newLang);
      showToast(newLang === 'zh' ? '🇨🇳 已切换到中文' : '🇬🇧 Switched to English');
    });
  }

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    showToast(next === 'dark' ? '🌙 暗色模式' : '☀️ 亮色模式');
  });

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

  // ===== HASH ROUTER =====
  const routes = {
    '/': 'hero',
    '/about': 'about',
    '/skills': 'skills',
    '/work': 'work',
    '/thinking': 'thinking',
    '/terminal': 'interactive',
    '/contact': 'contact'
  };
  const routeOrder = ['/', '/about', '/skills', '/work', '/thinking', '/terminal', '/contact'];

  function navigateTo(hash) {
    const route = hash.replace('#', '') || '/';
    const panelId = routes[route] || 'hero';

    // Hide all panels
    document.querySelectorAll('.panel').forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });

    // Show target panel
    const target = document.getElementById(panelId);
    if (target) {
      target.style.display = 'flex';
      // Trigger reflow for animation
      target.offsetHeight;
      target.classList.add('active');
    }

    // Initialize dot matrix for this panel
    initDotMatrix(panelId);

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + route);
    });

    // Update sidebar active state
    document.querySelectorAll('.page-sidebar-item').forEach(item => {
      const pageId = item.getAttribute('data-page');
      item.classList.toggle('active', pageId === panelId);
    });

    // Scroll to top
    window.scrollTo(0, 0);
  }


  // Listen for hash changes
  window.addEventListener('hashchange', () => navigateTo(location.hash));

  // Initial route
  navigateTo(location.hash || '#/');

  // ===== CUSTOM CURSOR =====
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const glow = document.getElementById('cursorGlow');
  const trailCanvas = document.getElementById('cursorTrail');
  const tCtx = trailCanvas.getContext('2d');
  let mx = -100, my = -100, rx = -100, ry = -100, gx = -100, gy = -100;

  function resizeTrail() {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  }
  resizeTrail();
  window.addEventListener('resize', resizeTrail);

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Trail particles
  const trailParticles = [];
  class TrailParticle {
    constructor(x, y) {
      this.x = x; this.y = y;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.life = 1;
      this.decay = Math.random() * 0.03 + 0.02;
      this.size = Math.random() * 3 + 1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.life -= this.decay;
    }
    draw(ctx) {
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      ctx.globalAlpha = this.life * 0.6;
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let lastTrailTime = 0;
  function animateCursor(time) {
    rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
    gx += (mx - gx) * 0.06; gy += (my - gy) * 0.06;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    glow.style.left = gx + 'px'; glow.style.top = gy + 'px';

    // Trail
    if (time - lastTrailTime > 16 && mx > 0) {
      trailParticles.push(new TrailParticle(mx, my));
      lastTrailTime = time;
    }
    tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    for (let i = trailParticles.length - 1; i >= 0; i--) {
      trailParticles[i].update();
      trailParticles[i].draw(tCtx);
      if (trailParticles[i].life <= 0) trailParticles.splice(i, 1);
    }
    tCtx.globalAlpha = 1;

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Cursor hover
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
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
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
      const dx = this.x - mouseCanvas.x, dy = this.y - mouseCanvas.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150 * 0.02;
        this.vx += dx * force; this.vy += dy * force;
      }
      this.vx *= 0.99; this.vy *= 0.99;
    }
    draw() {
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = accent; ctx.globalAlpha = this.opacity; ctx.fill(); ctx.globalAlpha = 1;
    }
  }

  const numParticles = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
  for (let i = 0; i < numParticles; i++) particles.push(new Particle());

  function drawLines() {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accent; ctx.globalAlpha = 0.06 * (1 - dist / 120);
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      const dx = p.x - mouseCanvas.x, dy = p.y - mouseCanvas.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouseCanvas.x, mouseCanvas.y);
        ctx.strokeStyle = accent; ctx.globalAlpha = 0.08 * (1 - dist / 200);
        ctx.lineWidth = 0.5; ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ===== COORDS =====
  const coordsX = document.getElementById('coordsX');
  const coordsY = document.getElementById('coordsY');
  document.addEventListener('mousemove', e => {
    coordsX.textContent = 'X: ' + String(e.clientX).padStart(4, '0');
    coordsY.textContent = 'Y: ' + String(e.clientY).padStart(4, '0');
  });

  // ===== UPTIME =====
  const uptimeEl = document.getElementById('uptime');
  const startTime = Date.now();
  if (uptimeEl) {
    setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      uptimeEl.textContent = h + ':' + m + ':' + s;
    }, 1000);
  }

  // ===== VISITOR IP =====
  const ipEl = document.getElementById('visitorIP');
  if (ipEl) {
    fetch('https://api.ip.sb/ip')
      .then(r => r.text())
      .then(ip => { ipEl.textContent = ip.trim(); })
      .catch(() => {
        fetch('https://ip.3322.net')
          .then(r => r.text())
          .then(ip => { ipEl.textContent = ip.trim(); })
          .catch(() => { ipEl.textContent = '未知'; });
      });
  }

  // ===== NAV =====
  const nav = document.getElementById('nav');
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    const total = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      // Let default behavior handle it (jump to anchor)
      mobileMenu.classList.remove('active');
      navMenuBtn.classList.remove('active');
    });
  });

  const navMenuBtn = document.getElementById('navMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  navMenuBtn.addEventListener('click', () => {
    navMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // ===== TYPEWRITERS =====
  function typeText(el, text, speed, delay, callback) {
    setTimeout(() => {
      let i = 0;
      function tick() {
        if (i <= text.length) {
          el.textContent = text.slice(0, i) + (i < text.length ? '█' : '');
          i++; setTimeout(tick, speed + Math.random() * speed * 0.5);
        } else { el.textContent = text; if (callback) callback(); }
      }
      tick();
    }, delay);
  }

  // Use language-specific text for typewriters
  const heroLabelKey = currentLang === 'zh' ? '系统操作员 // 机密' : 'SYSTEM OPERATOR // CLASSIFIED';
  const heroDescKey = currentLang === 'zh' ? '研究者。操作者。观察思考与崩溃的系统。' : 'Researcher. Operator. Observer of systems that think and systems that break.';
  
  typeText(document.getElementById('heroLabel'), heroLabelKey, 50, 1200);
  typeText(document.getElementById('heroDesc'), heroDescKey, 25, 2200);

  // ===== SCRAMBLE TEXT =====
  const scrambleChars = '█▓▒░@#$%&*!?';
  document.querySelectorAll('.scramble').forEach(el => {
    const original = el.getAttribute('data-text') || el.textContent;
    let interval;
    el.addEventListener('mouseenter', () => {
      let iterations = 0;
      interval = setInterval(() => {
        el.textContent = original.split('').map((ch, i) =>
          i < iterations ? original[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        ).join('');
        iterations += 1 / 2;
        if (iterations > original.length) { el.textContent = original; clearInterval(interval); }
      }, 40);
    });
    el.addEventListener('mouseleave', () => { clearInterval(interval); el.textContent = original; });
  });

  // ===== ABOUT TERMINAL =====
  const termBody = document.getElementById('terminalBody');
  let termCmd = document.getElementById('terminalCmd');
  let cursorEl = termBody.querySelector('.cursor');
  const termRunBtn = document.getElementById('termRun');

  const termSequence = [
    { type: 'cmd', text: 'cat /etc/identity' },
    { type: 'output', lines: currentLang === 'zh' ? 
      ['名字:    [已隐藏]', '别名:   yzt', '角色:    研究员 / 操作员', '状态:  活跃'] :
      ['name:    [REDACTED]', 'alias:   yzt', 'role:    researcher / operator', 'status:  active'] },
    { type: 'cmd', text: 'echo $CURRENT_FOCUS' },
    { type: 'output', lines: currentLang === 'zh' ?
      ['AI系统 · 网络安全 · 涌现行为'] :
      ['AI systems · Cybersecurity · Emergent behavior'] },
    { type: 'cmd', text: 'uname -a' },
    { type: 'output', lines: ['void 6.6.0-yzt #1 SMP PREEMPT_DYNAMIC x86_64'] },
    { type: 'cmd', text: 'cat motto.txt' },
    { type: 'output', lines: currentLang === 'zh' ?
      ['"每一个系统都有一个故事。', '  去发现它。"'] :
      ['"Every system has a story.', '  Find it."'] },
  ];

  let seqIdx = 0;
  function buildTerminalState(upToIdx) {
    termBody.innerHTML = '';
    for (let i = 0; i <= upToIdx; i++) {
      const step = termSequence[i];
      if (step.type === 'output') {
        step.lines.forEach(line => {
          const div = document.createElement('div'); div.className = 'terminal-output';
          div.textContent = line; termBody.appendChild(div);
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
      if (i <= text.length) { termCmd.textContent = text.slice(0, i); i++; setTimeout(tick, 45 + Math.random() * 25); }
      else { setTimeout(cb, 350); }
    }
    tick();
  }
  function runSequence() {
    if (seqIdx >= termSequence.length) { if (cursorEl) cursorEl.style.display = 'none'; return; }
    const step = termSequence[seqIdx];
    if (step.type === 'cmd') { typeCmd(step.text, () => { seqIdx++; runSequence(); }); }
    else if (step.type === 'output') { buildTerminalState(seqIdx); termCmd.textContent = ''; seqIdx++; setTimeout(runSequence, 500); }
  }
  termRunBtn.addEventListener('click', () => { seqIdx = 0; buildTerminalState(-1); setTimeout(runSequence, 200); });
  const termObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { buildTerminalState(-1); setTimeout(runSequence, 500); termObserver.disconnect(); }
  }, { threshold: 0.3 });
  termObserver.observe(termBody);

  // ===== STATS COUNTER =====
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = el.getAttribute('data-target');
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (target === '∞') { el.textContent = '∞'; }
        else {
          const num = parseInt(target); let current = 0;
          const step = Math.max(1, Math.floor(num / 30));
          const interval = setInterval(() => { current += step; if (current >= num) { current = num; clearInterval(interval); } el.textContent = current; }, 40);
        }
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
  });

  // ===== SKILLS ANIMATION =====
  document.querySelectorAll('.skill-card').forEach(el => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { el.classList.add('visible'); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(el);
  });

  // ===== SKILLS CANVAS =====
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
    const w = skillsCanvas.offsetWidth, h = skillsCanvas.offsetHeight;
    sCtx.clearRect(0, 0, w, h);
    const waves = [
      { amp: 20, freq: 0.015, speed: 0.02, color: 'rgba(0,212,255,0.15)' },
      { amp: 15, freq: 0.02, speed: 0.015, color: 'rgba(123,97,255,0.12)' },
      { amp: 25, freq: 0.01, speed: 0.025, color: 'rgba(0,212,255,0.08)' },
    ];
    waves.forEach(wave => {
      sCtx.beginPath(); sCtx.moveTo(0, h / 2);
      for (let x = 0; x <= w; x++) {
        const y = h / 2 + Math.sin(x * wave.freq + skillsTime * wave.speed) * wave.amp
                + Math.sin(x * wave.freq * 0.5 + skillsTime * wave.speed * 1.3) * wave.amp * 0.5;
        sCtx.lineTo(x, y);
      }
      sCtx.lineTo(w, h); sCtx.lineTo(0, h); sCtx.closePath();
      sCtx.fillStyle = wave.color; sCtx.fill();
    });
    sCtx.strokeStyle = 'rgba(0,0,0,0.03)'; sCtx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 40) { sCtx.beginPath(); sCtx.moveTo(x, 0); sCtx.lineTo(x, h); sCtx.stroke(); }
    for (let y = 0; y < h; y += 40) { sCtx.beginPath(); sCtx.moveTo(0, y); sCtx.lineTo(w, y); sCtx.stroke(); }
    skillsTime++; requestAnimationFrame(drawSkillsWave);
  }
  drawSkillsWave();

  // ===== CARD GLOW + TILT =====
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });
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
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 0.08 + 's'; revealObserver.observe(el); });

  // ===== INTERACTIVE TERMINAL =====
  const iBody = document.getElementById('interactiveBody');
  const iInput = document.getElementById('interactiveInput');

  const commands = {
    help: () => currentLang === 'zh' ? [
      '可用命令:', '',
      '  help      — 显示此消息',
      '  whoami    — 身份信息',
      '  about     — 关于我',
      '  skills    — 技能树',
      '  focus     — 当前专注领域',
      '  projects  — 项目展示',
      '  secret    — ???',
      '  theme     — 切换暗色/亮色模式',
      '  lang      — 切换中英文',
      '  clear     — 清除终端',
      '  date      — 当前时间戳',
      '  quote     — 随机名言',
      '  matrix    — 进入矩阵',
      '  hack      — 模拟黑客攻击',
      '  neofetch  — 系统信息',
      '  fortune   — 幸运饼干',
      '', '输入任何内容来探索。',
    ] : [
      'Available commands:', '',
      '  help      — Show this message',
      '  whoami    — Identity info',
      '  about     — About me',
      '  skills    — Skill tree',
      '  focus     — Current focus areas',
      '  projects  — Notable projects',
      '  secret    — ???',
      '  theme     — Toggle dark/light mode',
      '  lang      — Switch Chinese/English',
      '  clear     — Clear terminal',
      '  date      — Current timestamp',
      '  quote     — Random quote',
      '  matrix    — Enter the matrix',
      '  hack      — Simulate hacking',
      '  neofetch  — System info',
      '  fortune   — Fortune cookie',
      '', 'Type anything to explore.',
    ],
    whoami: () => currentLang === 'zh' ?
      ['yzt — 研究员 / 操作员', '权限等级: 未知', '位置: [访问者]'] :
      ['yzt — researcher / operator', 'clearance: unknown', 'location: [visitor]'],
    about: () => currentLang === 'zh' ?
      ['一个站在AI、安全和涌现模式交汇处的观察者。', '在系统崩溃、进化和重组的空间中运作。'] :
      ['An observer at the intersection of AI, security,', 'and emergent patterns. Operating in the spaces', 'where systems break, evolve, and recombine.'],
    skills: () => currentLang === 'zh' ? [
      '├── AI / 机器学习系统    [████████░░] 90%',
      '├── 网络安全            [███████░░░] 75%',
      '├── 软件开发            [████████░░] 85%',
      '└── 基础设施            [███████░░░] 70%',
    ] : [
      '├── AI / ML Systems    [████████░░] 90%',
      '├── Cybersecurity      [███████░░░] 75%',
      '├── Development        [████████░░] 85%',
      '└── Infrastructure     [███████░░░] 70%',
    ],
    focus: () => currentLang === 'zh' ?
      ['→ 大模型智能体与编排', '→ 渗透测试（学习中）', '→ 对抗性机器学习研究', '→ 系统级安全分析'] :
      ['→ LLM Agents & Orchestration', '→ Penetration Testing (learning)', '→ Adversarial ML Research', '→ System-level security analysis'],
    projects: () => currentLang === 'zh' ? [
      '◆ Hermes Agent — AI助手平台',
      '◆ 个人网站 — yzt.qzz.io',
      '◆ [机密] — ████████████████',
      '◆ [机密] — ████████████████',
    ] : [
      '◆ Hermes Agent — AI assistant platform',
      '◆ Personal Site — yzt.qzz.io',
      '◆ [CLASSIFIED] — ████████████████',
      '◆ [CLASSIFIED] — ████████████████',
    ],
    secret: () => {
      setTimeout(() => showToast(currentLang === 'zh' ? '🎮 发现彩蛋！试试科纳米秘技...' : '🎮 Easter egg found! Try the Konami code...'), 500);
      return currentLang === 'zh' ?
        ['你找到了。但这里什么都没有。真的吗？👁️', '提示: ↑↑↓↓←→←→BA'] :
        ['You found it. But there\'s nothing here. Or is there? 👁️', 'Hint: ↑↑↓↓←→←→BA'];
    },
    theme: () => { themeToggle.click(); return [currentLang === 'zh' ? '主题已切换！' : 'Theme toggled!']; },
    lang: () => { langToggle.click(); return ['']; },
    date: () => [new Date().toISOString()],
    clear: () => 'CLEAR',
    matrix: () => {
      const lines = [];
      for (let i = 0; i < 10; i++) {
        let line = '';
        for (let j = 0; j < 60; j++) line += String.fromCharCode(0x30A0 + Math.random() * 96);
        lines.push(line);
      }
      lines.push('', currentLang === 'zh' ? '醒来吧，尼奥...' : 'Wake up, Neo...');
      return lines;
    },
    hack: () => currentLang === 'zh' ? [
      '初始化漏洞利用框架...',
      '[*] 扫描目标 192.168.1.0/24',
      '[+] 发现 12 台活动主机',
      '[*] 枚举服务...',
      '[+] 端口 22/tcp — OpenSSH 8.9',
      '[+] 端口 80/tcp — Apache 2.4',
      '[+] 端口 443/tcp — nginx 1.24',
      '[*] 检查漏洞...',
      '[!] 检测到 CVE-2024-XXXXX',
      '[*] 生成载荷...',
      '[+] 载荷投递成功',
      '[+] 会话 1 已建立',
      '',
      '开个玩笑😉 保持道德。',
    ] : [
      'Initializing exploit framework...',
      '[*] Scanning target 192.168.1.0/24',
      '[+] Found 12 live hosts',
      '[*] Enumerating services...',
      '[+] Port 22/tcp — OpenSSH 8.9',
      '[+] Port 80/tcp — Apache 2.4',
      '[+] Port 443/tcp — nginx 1.24',
      '[*] Checking for vulnerabilities...',
      '[!] CVE-2024-XXXXX detected',
      '[*] Generating payload...',
      '[+] Payload delivered successfully',
      '[+] Session 1 opened',
      '',
      'Just kidding. 😉 Stay ethical.',
    ],
    neofetch: () => {
      return currentLang === 'zh' ? [
        '        .--.          yzt@虚空',
        '       |o_o |         ──────────────',
        '       |:_/ |         系统: Void Linux x86_64',
        '      //   \\ \\        内核: 6.6.0-yzt',
        '     (|     | )       运行: ' + Math.floor((Date.now() - startTime) / 60000) + ' 分钟',
        '    /\'\\_   _/`\\       Shell: bash 5.2',
        '    \\___)=(___/       主题: ' + html.getAttribute('data-theme'),
        '                      分辨率: ' + window.innerWidth + 'x' + window.innerHeight,
        '                      终端: yzt-term',
        '                      CPU: 神经网络',
        '                      内存: ∞ / ∞',
      ] : [
        '        .--.          yzt@void',
        '       |o_o |         ──────────────',
        '       |:_/ |         OS: Void Linux x86_64',
        '      //   \\ \\        Kernel: 6.6.0-yzt',
        '     (|     | )       Uptime: ' + Math.floor((Date.now() - startTime) / 60000) + ' mins',
        '    /\'\\_   _/`\\       Shell: bash 5.2',
        '    \\___)=(___/       Theme: ' + html.getAttribute('data-theme'),
        '                      Resolution: ' + window.innerWidth + 'x' + window.innerHeight,
        '                      Terminal: yzt-term',
        '                      CPU: Neural Network',
        '                      Memory: ∞ / ∞',
      ];
    },
    fortune: () => {
      const zh = [
        '🔮 "预测未来的最好方法就是创造它。" — 艾伦·凯',
        '🔮 "任何足够先进的技术都与魔法无异。" — 亚瑟·克拉克',
        '🔮 "困难之中蕴藏着机会。" — 爱因斯坦',
        '🔮 "唯一的智慧就是知道自己一无所知。" — 苏格拉底',
      ];
      const en = [
        '🔮 "The best way to predict the future is to invent it." — Alan Kay',
        '🔮 "Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke',
        '🔮 "In the middle of difficulty lies opportunity." — Einstein',
        '🔮 "The only true wisdom is in knowing you know nothing." — Socrates',
      ];
      const quotes = currentLang === 'zh' ? zh : en;
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
          const welcome = iBody.querySelector('.interactive-welcome');
          const inputLine = iBody.querySelector('.interactive-input-line');
          iBody.innerHTML = '';
          if (welcome) iBody.appendChild(welcome);
          iBody.appendChild(inputLine);
          return;
        }
        result.forEach((line, i) => { setTimeout(() => addOutput(line), i * 30); });
      } else {
        addOutput(currentLang === 'zh' ? 
          `bash: ${cmd}: 命令未找到。输入 'help' 查看可用命令。` :
          `bash: ${cmd}: command not found. Type 'help' for available commands.`, 'error');
      }
      setTimeout(() => { iBody.scrollTop = iBody.scrollHeight; }, 100);
    }
  });
  iBody.addEventListener('click', () => iInput.focus());

  // ===== TOAST NOTIFICATION =====
  window.showToast = function(text) {
    const toast = document.getElementById('eeToast');
    document.getElementById('eeToastText').textContent = text;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
  };

  // ===== KONAMI CODE =====
  const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;

  document.addEventListener('keydown', e => {
    if (e.key === konamiSequence[konamiIdx] || e.key.toLowerCase() === konamiSequence[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konamiSequence.length) {
        konamiIdx = 0;
        activateKonami();
      }
    } else {
      konamiIdx = 0;
    }
  });

  // Touch konami for mobile (tap logo 5 times)
  let logoTaps = 0;
  let logoTimer;
  document.querySelector('.nav-logo').addEventListener('click', e => {
    e.preventDefault();
    logoTaps++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => { logoTaps = 0; }, 2000);
    if (logoTaps >= 5) { logoTaps = 0; activateKonami(); }
  });

  function activateKonami() {
    showToast(currentLang === 'zh' ? '🎮 秘技已激活！' : '🎮 KONAMI CODE ACTIVATED!');
    const overlay = document.getElementById('konamiOverlay');
    overlay.classList.add('active');

    // Matrix rain
    const mCanvas = document.getElementById('matrixCanvas');
    const mCtx = mCanvas.getContext('2d');
    mCanvas.width = window.innerWidth;
    mCanvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}|:<>?';
    const fontSize = 14;
    const columns = Math.floor(mCanvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    function drawMatrix() {
      mCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
      mCtx.fillStyle = '#00ff88';
      mCtx.font = fontSize + 'px JetBrains Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      if (overlay.classList.contains('active')) requestAnimationFrame(drawMatrix);
    }
    drawMatrix();
  }

  // ===== CLICK BURST =====
  document.addEventListener('click', e => {
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      spark.style.cssText = `
        position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
        width: 4px; height: 4px; border-radius: 50%;
        background: var(--accent); pointer-events: none; z-index: 100000;
        transition: all 0.6s cubic-bezier(0.16,1,0.3,1);
      `;
      document.body.appendChild(spark);
      const angle = (Math.PI * 2 / 6) * i;
      const distance = 30 + Math.random() * 20;
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
        spark.style.opacity = '0';
      });
      setTimeout(() => spark.remove(), 600);
    }
  });

  // ===== PARALLAX GRID =====
  window.addEventListener('scroll', () => {
    const grid = document.querySelector('.hero-grid');
    if (grid) grid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  });

  // ===== BUILD TIME =====
  document.getElementById('buildTime').textContent =
    'BUILT ' + new Date().toISOString().slice(0, 10).toUpperCase();

  // ===== DOT MATRIX (interactive on blue blocks) =====
  let globalMouseX = -1000, globalMouseY = -1000;

  document.addEventListener('mousemove', e => {
    globalMouseX = e.clientX;
    globalMouseY = e.clientY;
  });

  function initDotMatrix(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const canvas = panel.querySelector('.dot-matrix');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dotSpacing = 28;
    const dotBaseRadius = 1.5;
    const influenceRadius = 200;
    let animId = null;

    function resize() {
      const parent = canvas.parentElement;
      if (parent) {
        const w = parent.offsetWidth;
        const h = parent.offsetHeight;
        if (w > 0 && h > 0) {
          canvas.width = w;
          canvas.height = h;
        }
      }
    }

    // Start resize + draw loop
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const w = canvas.width;
      const h = canvas.height;

      if (w > 0 && h > 0) {
        ctx.clearRect(0, 0, w, h);

        const rect = canvas.getBoundingClientRect();
        const mx = globalMouseX - rect.left;
        const my = globalMouseY - rect.top;

        for (let x = dotSpacing; x < w; x += dotSpacing) {
          for (let y = dotSpacing; y < h; y += dotSpacing) {
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / influenceRadius);
            const r = dotBaseRadius + influence * 4;
            const a = 0.15 + influence * 0.65;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    // Start immediately, retry resize for late layouts
    draw();
    requestAnimationFrame(resize);
    setTimeout(resize, 100);
    setTimeout(resize, 300);
    setTimeout(resize, 600);
    setTimeout(resize, 1000);
  }

});
