// ===== YZT — Script v70 =====
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

  fetchIP();

  // Active nav
  var secs = document.querySelectorAll('.grid[id]');
  var navLinks = document.querySelectorAll('.nav a');
  new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if(e.isIntersecting){navLinks.forEach(function(l){l.style.color='';});var l=document.querySelector('.nav a[href="#'+e.target.id+'"]');if(l)l.style.color='var(--gold)';} });
  }, {threshold:0.3}).observe(secs[0]);

  // ===== UNSEEN EYES (SVG transform attribute) =====
  var eyeL = document.getElementById('eyeLeft');
  var eyeR = document.getElementById('eyeRight');
  var eyeWrap = document.getElementById('unseenEyes');

  if (eyeL && eyeR && eyeWrap) {
    var emx = 0, emy = 0, ecx = 0, ecy = 0;
    var er = eyeWrap.getBoundingClientRect();
    var mmx = er.width / 12, mmy = er.height / 8;

    document.addEventListener('mousemove', function(e) {
      var cx = er.left + er.width / 2;
      var cy = er.top + er.height / 2;
      emx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.4)));
      emy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.4)));
    });

    window.addEventListener('resize', function() {
      er = eyeWrap.getBoundingClientRect();
      mmx = er.width / 12;
      mmy = er.height / 8;
    });

    function animEyes() {
      ecx += (emx - ecx) * 0.08;
      ecy += (emy - ecy) * 0.08;
      var tx = Math.round(ecx * mmx * 10) / 10;
      var ty = Math.round(ecy * mmy * 10) / 10;
      var t = 'translate(' + tx + ',' + ty + ')';
      eyeL.setAttribute('transform', t);
      eyeR.setAttribute('transform', t);
      requestAnimationFrame(animEyes);
    }
    animEyes();
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

function fetchIP() {
  var el = document.getElementById('visitorIP');
  if (!el) return;
  fetch('https://api.ip.sb/geoip',{signal:AbortSignal.timeout(5000)}).then(function(r){return r.json();}).then(function(d){var p=[];if(d.city)p.push(d.city);if(d.country)p.push(d.country);el.textContent=p.join(', ')||d.ip||'\u672A\u7705';}).catch(function(){fetch('http://ip.3322.net',{signal:AbortSignal.timeout(3000)}).then(function(r){return r.text();}).then(function(t){el.textContent=t;}).catch(function(){el.textContent='\u672A\u7705';});});
}
