// ===== YZT v80 =====
document.addEventListener('DOMContentLoaded', function() {

  // Loader
  var loader = document.getElementById('cubeLoader');
  var overlay = document.getElementById('loaderOverlay');
  if (loader) {
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
      if (overlay) overlay.style.transform = 'translateY(0)';
      setTimeout(function() {
        loader.classList.add('done');
        document.body.style.overflow = '';
      }, 1000);
    }, 3000);
  }

  // Uptime
  var t0 = Date.now();
  var uptimeEl = document.getElementById('uptime');
  setInterval(function() {
    if (!uptimeEl) return;
    var d = Date.now() - t0;
    uptimeEl.textContent =
      String(Math.floor(d/36e5)).padStart(2,'0') + ':' +
      String(Math.floor(d%36e5/6e4)).padStart(2,'0') + ':' +
      String(Math.floor(d%6e4/1e3)).padStart(2,'0');
  }, 1000);

  // Seeds
  document.querySelectorAll('.seed').forEach(function(e) {
    e.textContent = 'SEED: ' + Math.floor(Math.random()*9999999999).toString().padStart(10,'0');
  });

  // Progress bar
  var bar = document.getElementById('progressBar');
  if (bar) window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0) bar.style.width = (window.scrollY / h * 100) + '%';
  });

  // Hamburger
  var hb = document.getElementById('hamburger');
  var nv = document.getElementById('nav');
  if (hb && nv) {
    hb.addEventListener('click', function() { hb.classList.toggle('active'); nv.classList.toggle('open'); });
    nv.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { hb.classList.remove('active'); nv.classList.remove('open'); });
    });
  }

  // Theme
  var tb = document.getElementById('themeToggle');
  var dark = true;
  if (tb) tb.addEventListener('click', function() {
    dark = !dark;
    if (dark) { document.documentElement.removeAttribute('data-theme'); tb.textContent = '\u2600'; }
    else { document.documentElement.setAttribute('data-theme', 'light'); tb.textContent = '\u263E'; }
  });

  // Language
  var lb = document.getElementById('langToggle');
  var lang = 'zh';
  if (lb) lb.addEventListener('click', function() {
    lang = lang === 'zh' ? 'en' : 'zh';
    lb.textContent = lang === 'zh' ? '\u4E2D' : 'EN';
    document.querySelectorAll('[data-' + lang + ']').forEach(function(el) {
      var v = el.getAttribute('data-' + lang);
      if (v) el.innerHTML = v;
    });
  });

  // IP
  fetch('https://api.ip.sb/geoip', {signal: AbortSignal.timeout(5000)})
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var p = [];
      if (d.city) p.push(d.city);
      if (d.country) p.push(d.country);
      var el = document.getElementById('visitorIP');
      if (el) el.textContent = p.join(', ') || d.ip || '\u672A\u7705';
    })
    .catch(function() {
      var el = document.getElementById('visitorIP');
      if (el) el.textContent = '\u672A\u7705';
    });

  // Active nav
  var secs = document.querySelectorAll('.grid[id]');
  var navLinks = document.querySelectorAll('.nav a');
  if (secs.length) new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        navLinks.forEach(function(l) { l.style.color = ''; });
        var l = document.querySelector('.nav a[href="#' + e.target.id + '"]');
        if (l) l.style.color = 'var(--gold)';
      }
    });
  }, {threshold: 0.3}).observe(secs[0]);

  // ===== CURSOR =====
  var dot = document.querySelector('.cur-dot');
  var ring = document.querySelector('.cur-ring');
  if (dot && ring && window.matchMedia('(hover:hover)').matches) {
    var mx = -100, my = -100, dx = -100, dy = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });
    (function anim() {
      dx += (mx - dx) * 0.3; dy += (my - dy) * 0.3;
      dot.style.transform = 'translate3d(' + (dx-7) + 'px,' + (dy-7) + 'px,0)';
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.transform = 'translate3d(' + (rx-22) + 'px,' + (ry-22) + 'px,0)';
      requestAnimationFrame(anim);
    })();
  }

  // ===== EYES (pupil follow + blink) =====
  var pL = document.getElementById('pupil-left');
  var pR = document.getElementById('pupil-right');
  var eLT = document.getElementById('eyelid-lt');
  var eLB = document.getElementById('eyelid-lb');
  var eRT = document.getElementById('eyelid-rt');
  var eRB = document.getElementById('eyelid-rb');

  if (pL && pR) {
    var emx = 0.5, emy = 0.5, ecx = 0.5, ecy = 0.5;
    document.addEventListener('mousemove', function(e) {
      emx = e.clientX / window.innerWidth;
      emy = e.clientY / window.innerHeight;
    });
    (function animEyes() {
      ecx += (emx - ecx) * 0.08;
      ecy += (emy - ecy) * 0.08;
      var tx = (ecx - 0.5) * 24;
      var ty = (ecy - 0.5) * 16;
      pL.setAttribute('transform', 'translate(' + tx + ',' + ty + ')');
      pR.setAttribute('transform', 'translate(' + tx + ',' + ty + ')');
      requestAnimationFrame(animEyes);
    })();

    // Blink
    function blink() {
      if (eLT) eLT.style.transform = 'translateY(75px)';
      if (eLB) eLB.style.transform = 'translateY(-65px)';
      if (eRT) eRT.style.transform = 'translateY(75px)';
      if (eRB) eRB.style.transform = 'translateY(-65px)';
      setTimeout(function() {
        if (eLT) eLT.style.transform = '';
        if (eLB) eLB.style.transform = '';
        if (eRT) eRT.style.transform = '';
        if (eRB) eRB.style.transform = '';
      }, 150);
      setTimeout(blink, 3000 + Math.random() * 2000);
    }
    setTimeout(blink, 4000);
  }

});
