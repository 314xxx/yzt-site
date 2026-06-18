// ===== YZT — Script v6.3 =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== 3D CUBE LOADER (auto-dismiss) =====
  var cubeLoader = document.getElementById('cubeLoader');
  var loaderOverlay = document.getElementById('loaderOverlay');

  if (cubeLoader) {
    document.body.style.overflow = 'hidden';
    // Auto-dismiss after 3 seconds
    setTimeout(function() {
      if (loaderOverlay) loaderOverlay.style.transform = 'translateY(0)';
      setTimeout(function() {
        cubeLoader.style.display = 'none';
        document.body.style.overflow = '';
      }, 1000);
    }, 3000);
  }

  // ===== LOADER (old, auto-dismiss fallback) =====
  var loader = document.getElementById('loader');
  if (loader && !cubeLoader) {
    setTimeout(function() { loader.classList.add('hidden'); }, 800);
    setTimeout(function() { loader.remove(); }, 1400);
  }

  // Uptime
  var t0 = Date.now();
  var uptimeEl = document.getElementById('uptime');
  function tick() {
    if (!uptimeEl) return;
    var d = Date.now() - t0;
    var h = String(Math.floor(d / 3600000)).padStart(2, '0');
    var m = String(Math.floor((d % 3600000) / 60000)).padStart(2, '0');
    var s = String(Math.floor((d % 60000) / 1000)).padStart(2, '0');
    uptimeEl.textContent = h + ':' + m + ':' + s;
  }
  tick();
  setInterval(tick, 1000);

  // Seeds
  document.querySelectorAll('.seed').forEach(function(e) {
    e.textContent = 'SEED: ' + Math.floor(Math.random() * 9999999999).toString().padStart(10, '0');
  });

  // Progress bar
  var bar = document.getElementById('progressBar');
  if (bar) {
    window.addEventListener('scroll', function() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / h * 100) + '%';
    });
  }

  // Hamburger
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // Theme toggle
  var themeBtn = document.getElementById('themeToggle');
  var isDark = true;
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
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

  // Language toggle
  var langBtn = document.getElementById('langToggle');
  var lang = 'zh';
  if (langBtn) {
    langBtn.addEventListener('click', function() {
      lang = lang === 'zh' ? 'en' : 'zh';
      langBtn.textContent = lang === 'zh' ? '\u4E2D' : 'EN';
      document.querySelectorAll('[data-' + lang + ']').forEach(function(el) {
        var val = el.getAttribute('data-' + lang);
        if (val) el.innerHTML = val;
      });
    });
  }

  // IP
  fetchIP();

  // Active nav
  var sections = document.querySelectorAll('.grid[id]');
  var links = document.querySelectorAll('.nav a');
  var navObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        links.forEach(function(l) { l.style.color = ''; });
        var l = document.querySelector('.nav a[href="#' + entry.target.id + '"]');
        if (l) l.style.color = 'var(--gold)';
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(function(s) { navObs.observe(s); });

  // ===== CUSTOM CURSOR =====
  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    var mx = -100, my = -100;
    var dx = -100, dy = -100;
    var rx = -100, ry = -100;

    document.addEventListener('mousemove', function(e) {
      mx = e.clientX;
      my = e.clientY;
    });

    function animateCursor() {
      dx += (mx - dx) * 0.3;
      dy += (my - dy) * 0.3;
      dot.style.transform = 'translate3d(' + (dx - 7) + 'px,' + (dy - 7) + 'px,0)';

      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.transform = 'translate3d(' + (rx - 22) + 'px,' + (ry - 22) + 'px,0)';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // ===== UNSEEN-STYLE EYES (follow mouse) =====
  var eyeLeft = document.getElementById('eyeLeft');
  var eyeRight = document.getElementById('eyeRight');
  var unseenEyes = document.getElementById('unseenEyes');

  if (eyeLeft && eyeRight && unseenEyes && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', function(e) {
      var rect = unseenEyes.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) / window.innerWidth * 20;
      var dy = (e.clientY - cy) / window.innerHeight * 15;
      var transform = 'translate(' + dx + 'px, ' + dy + 'px)';
      eyeLeft.setAttribute('transform', transform);
      eyeRight.setAttribute('transform', transform);
    });
  }

  // ===== BORDER GLOW =====
  document.querySelectorAll('.border-glow').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      var cx = r.width / 2;
      var cy = r.height / 2;
      var ddx = x - cx;
      var ddy = y - cy;
      var kx = Infinity, ky = Infinity;
      if (ddx !== 0) kx = cx / Math.abs(ddx);
      if (ddy !== 0) ky = cy / Math.abs(ddy);
      var edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1) * 100;
      var angle = Math.atan2(ddy, ddx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      card.style.setProperty('--edge-proximity', edge.toFixed(1));
      card.style.setProperty('--cursor-angle', angle.toFixed(1) + 'deg');
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
    card.addEventListener('mouseleave', function() {
      card.style.setProperty('--edge-proximity', '0');
    });
  });

});

// Fetch IP
function fetchIP() {
  var el = document.getElementById('visitorIP');
  if (!el) return;
  fetch('https://api.ip.sb/geoip', { signal: AbortSignal.timeout(5000) })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var p = [];
      if (d.city) p.push(d.city);
      if (d.country) p.push(d.country);
      el.textContent = p.join(', ') || d.ip || '\u672A\u7705';
    })
    .catch(function() {
      fetch('http://ip.3322.net', { signal: AbortSignal.timeout(3000) })
        .then(function(r) { return r.text(); })
        .then(function(t) { el.textContent = t; })
        .catch(function() { el.textContent = '\u672A\u7705'; });
    });
}
