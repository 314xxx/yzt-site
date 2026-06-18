// ===== YZT — Script v71 =====
document.addEventListener('DOMContentLoaded', function() {

  // Loader auto-dismiss
  var cl = document.getElementById('cubeLoader');
  var lo = document.getElementById('loaderOverlay');
  if (cl) {
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
      if (lo) lo.style.transform = 'translateY(0)';
      setTimeout(function() { cl.style.display = 'none'; document.body.style.overflow = ''; }, 1000);
    }, 3000);
  }

  // Uptime
  var t0 = Date.now(), ue = document.getElementById('uptime');
  function tick() { if (!ue) return; var d = Date.now()-t0; ue.textContent = String(Math.floor(d/36e5)).padStart(2,'0')+':'+String(Math.floor(d%36e5/6e4)).padStart(2,'0')+':'+String(Math.floor(d%6e4/1e3)).padStart(2,'0'); }
  tick(); setInterval(tick, 1000);

  // Seeds
  document.querySelectorAll('.seed').forEach(function(e) { e.textContent = 'SEED: ' + Math.floor(Math.random()*9999999999).toString().padStart(10,'0'); });

  // Progress bar
  var bar = document.getElementById('progressBar');
  if (bar) window.addEventListener('scroll', function() { bar.style.width = (window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%'; });

  // Hamburger
  var hb = document.getElementById('hamburger'), nv = document.getElementById('nav');
  if (hb && nv) {
    hb.addEventListener('click', function() { hb.classList.toggle('active'); nv.classList.toggle('open'); });
    nv.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', function() { hb.classList.remove('active'); nv.classList.remove('open'); }); });
  }

  // Theme toggle
  var tb = document.getElementById('themeToggle'), dk = true;
  if (tb) tb.addEventListener('click', function() { dk=!dk; if(dk){document.documentElement.removeAttribute('data-theme');tb.textContent='\u2600';}else{document.documentElement.setAttribute('data-theme','light');tb.textContent='\u263E';} });

  // Language toggle
  var lb = document.getElementById('langToggle'), lg = 'zh';
  if (lb) lb.addEventListener('click', function() { lg=lg==='zh'?'en':'zh'; lb.textContent=lg==='zh'?'\u4E2D':'EN'; document.querySelectorAll('[data-'+lg+']').forEach(function(el){var v=el.getAttribute('data-'+lg);if(v)el.innerHTML=v;}); });

  // IP
  (function() {
    var el = document.getElementById('visitorIP');
    if (!el) return;
    fetch('https://api.ip.sb/geoip',{signal:AbortSignal.timeout(5000)}).then(function(r){return r.json();}).then(function(d){var p=[];if(d.city)p.push(d.city);if(d.country)p.push(d.country);el.textContent=p.join(', ')||d.ip||'\u672A\u7705';}).catch(function(){fetch('http://ip.3322.net',{signal:AbortSignal.timeout(3000)}).then(function(r){return r.text();}).then(function(t){el.textContent=t;}).catch(function(){el.textContent='\u672A\u7705';});});
  })();

  // Active nav
  var secs = document.querySelectorAll('.grid[id]');
  var navLinks = document.querySelectorAll('.nav a');
  if (secs.length) {
    new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if(e.isIntersecting){navLinks.forEach(function(l){l.style.color='';});var l=document.querySelector('.nav a[href="#'+e.target.id+'"]');if(l)l.style.color='var(--gold)';} });
    }, {threshold:0.3}).observe(secs[0]);
  }

  // ===== CUSTOM CURSOR =====
  var cdot = document.getElementById('cursorDot');
  var cring = document.getElementById('cursorRing');

  if (cdot && cring && window.matchMedia('(hover:hover)').matches) {
    var cmx = -100, cmy = -100, ccx = -100, ccy = -100, crx = -100, cry = -100;

    document.addEventListener('mousemove', function(e) {
      cmx = e.clientX;
      cmy = e.clientY;
    });

    function animCursor() {
      ccx += (cmx - ccx) * 0.3;
      ccy += (cmy - ccy) * 0.3;
      cdot.style.transform = 'translate3d(' + (ccx - 7) + 'px,' + (ccy - 7) + 'px,0)';

      crx += (cmx - crx) * 0.1;
      cry += (cmy - cry) * 0.1;
      cring.style.transform = 'translate3d(' + (crx - 22) + 'px,' + (cry - 22) + 'px,0)';

      requestAnimationFrame(animCursor);
    }
    animCursor();
  }

  // ===== UNSEEN EYES (pupil follow + auto blink) =====
  var pupilL = document.getElementById('pupil-left');
  var pupilR = document.getElementById('pupil-right');
  var eyelidLT = document.getElementById('eyelid-lt');
  var eyelidLB = document.getElementById('eyelid-lb');
  var eyelidRT = document.getElementById('eyelid-rt');
  var eyelidRB = document.getElementById('eyelid-rb');
  var eyeWrap = document.getElementById('unseenEyes');

  if (pupilL && pupilR && eyeWrap) {
    var emx = 0.5, emy = 0.5, ecx = 0.5, ecy = 0.5;
    var maxMove = 12;

    document.addEventListener('mousemove', function(e) {
      emx = e.clientX / window.innerWidth;
      emy = e.clientY / window.innerHeight;
    });

    function animEyes() {
      ecx += (emx - ecx) * 0.08;
      ecy += (emy - ecy) * 0.08;
      var tx = (ecx - 0.5) * 2 * maxMove;
      var ty = (ecy - 0.5) * 2 * maxMove;
      pupilL.setAttribute('transform', 'translate(' + tx + ',' + ty + ')');
      pupilR.setAttribute('transform', 'translate(' + tx + ',' + ty + ')');
      requestAnimationFrame(animEyes);
    }
    animEyes();

    // Auto blink every 3-5 seconds
    function blink() {
      if (eyelidLT) eyelidLT.style.transform = 'translateY(75px)';
      if (eyelidLB) eyelidLB.style.transform = 'translateY(-65px)';
      if (eyelidRT) eyelidRT.style.transform = 'translateY(75px)';
      if (eyelidRB) eyelidRB.style.transform = 'translateY(-65px)';
      setTimeout(function() {
        if (eyelidLT) eyelidLT.style.transform = 'translateY(0)';
        if (eyelidLB) eyelidLB.style.transform = 'translateY(0)';
        if (eyelidRT) eyelidRT.style.transform = 'translateY(0)';
        if (eyelidRB) eyelidRB.style.transform = 'translateY(0)';
      }, 150);
      setTimeout(blink, 3000 + Math.random() * 2000);
    }
    setTimeout(blink, 4000);
  }

  // Border glow
  document.querySelectorAll('.border-glow').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect(), x = e.clientX-r.left, y = e.clientY-r.top;
      var cx = r.width/2, cy = r.height/2, dx = x-cx, dy = y-cy;
      var kx = dx?cx/Math.abs(dx):Infinity, ky = dy?cy/Math.abs(dy):Infinity;
      var edge = Math.min(Math.max(1/Math.min(kx,ky),0),1)*100;
      var angle = Math.atan2(dy,dx)*180/Math.PI+90;
      if(angle<0)angle+=360;
      card.style.setProperty('--edge-proximity',edge.toFixed(1));
      card.style.setProperty('--cursor-angle',angle.toFixed(1)+'deg');
      card.style.setProperty('--mouse-x',x+'px');
      card.style.setProperty('--mouse-y',y+'px');
    });
    card.addEventListener('mouseleave',function(){card.style.setProperty('--edge-proximity','0');});
  });

});
