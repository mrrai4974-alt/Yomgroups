/* =========================================================
   YOM Groups — main.js (premium interactions)
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---- Sticky header ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    var sp = document.getElementById("scrollProgress");
    if (sp) {
      var h = document.documentElement;
      var p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      sp.style.width = (p * 100) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Scroll progress bar ---- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress"; bar.id = "scrollProgress";
  document.body.appendChild(bar);

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.querySelector(".mobile-panel");
  var backdrop = document.querySelector(".mobile-backdrop");
  function openMenu(){ if(!panel) return; panel.classList.add("open"); backdrop&&backdrop.classList.add("open"); toggle&&toggle.classList.add("open"); document.body.style.overflow="hidden"; }
  function closeMenu(){ if(!panel) return; panel.classList.remove("open"); backdrop&&backdrop.classList.remove("open"); toggle&&toggle.classList.remove("open"); document.body.style.overflow=""; }
  if (toggle) toggle.addEventListener("click", function(){ panel&&panel.classList.contains("open")?closeMenu():openMenu(); });
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  var mpClose = document.querySelector(".mp-close");
  if (mpClose) mpClose.addEventListener("click", closeMenu);
  document.querySelectorAll(".mp-toggle").forEach(function(btn){
    btn.addEventListener("click", function(){
      var group = btn.closest(".mp-group"); if(!group) return;
      var sub = group.querySelector(".mp-sub");
      var open = group.classList.toggle("open");
      if (sub) sub.style.maxHeight = open ? sub.scrollHeight+"px" : "0";
    });
  });
  document.querySelectorAll(".mobile-panel a").forEach(function(a){ a.addEventListener("click", closeMenu); });

  /* ---- Counters ---- */
  function animateCounter(el){
    var target = parseFloat(el.getAttribute("data-target"));
    var decimals = (el.getAttribute("data-decimals")||"0")|0;
    var dur = 1700, start = null;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts-start)/dur, 1);
      var eased = 1 - Math.pow(1-p, 3);
      var val = target*eased;
      el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString("en-IN");
      if (p<1) requestAnimationFrame(step);
      else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString("en-IN");
    }
    requestAnimationFrame(step);
  }

  /* ---- Reveal + counters ---- */
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.classList.contains("counter")) animateCounter(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.16 });
    document.querySelectorAll(".reveal, .counter").forEach(function(el, i){
      if (el.classList.contains("reveal")) el.style.transitionDelay = ((i % 3) * 0.07) + "s";
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("in"); });
    document.querySelectorAll(".counter").forEach(animateCounter);
  }

  /* ---- FAQ ---- */
  document.querySelectorAll(".faq-q").forEach(function(q){
    q.addEventListener("click", function(){
      var item = q.closest(".faq-item"); if(!item) return;
      var ans = item.querySelector(".faq-a");
      var open = item.classList.toggle("open");
      if (ans) ans.style.maxHeight = open ? ans.scrollHeight+"px" : "0";
    });
  });

  /* ---- Demo forms ---- */
  document.querySelectorAll("form[data-demo-form]").forEach(function(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var s = form.querySelector(".form-success");
      if (s){ s.classList.add("show"); s.scrollIntoView({behavior:"smooth",block:"center"}); }
      form.reset();
      setTimeout(function(){ s && s.classList.remove("show"); }, 6000);
    });
  });

  /* ---- Seamless marquee (duplicate track content once) ---- */
  document.querySelectorAll(".marquee").forEach(function(m){
    m.innerHTML += m.innerHTML;
  });

  /* ---- Custom cursor + magnetic buttons (desktop only) ---- */
  if (!isTouch && !reduce) {
    var dot = document.createElement("div"); dot.className = "cursor-dot";
    var ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.appendChild(dot); document.body.appendChild(ring);
    document.body.classList.add("has-cursor");
    var mx=0,my=0,rx=0,ry=0;
    document.addEventListener("mousemove", function(e){
      mx=e.clientX; my=e.clientY;
      dot.style.transform = "translate("+mx+"px,"+my+"px) translate(-50%,-50%)";
    });
    (function loop(){
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      ring.style.transform = "translate("+rx+"px,"+ry+"px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a, button, .card, .industry, .case, .post").forEach(function(el){
      el.addEventListener("mouseenter", function(){ ring.classList.add("hover"); });
      el.addEventListener("mouseleave", function(){ ring.classList.remove("hover"); });
    });
    // magnetic buttons
    document.querySelectorAll(".btn").forEach(function(btn){
      btn.addEventListener("mousemove", function(e){
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width/2;
        var y = e.clientY - r.top - r.height/2;
        btn.style.transform = "translate("+(x*0.25)+"px,"+(y*0.35)+"px)";
      });
      btn.addEventListener("mouseleave", function(){ btn.style.transform = ""; });
    });
  }

  /* ---- Heading mask reveal ---- */
  if (!reduce) {
    var heads = document.querySelectorAll(".hero h1, .page-hero h1, .section-head h2");
    heads.forEach(function (h) {
      h.classList.add("mask-wrap");
      h.innerHTML = '<span class="mask-in">' + h.innerHTML + "</span>";
    });
    if ("IntersectionObserver" in window) {
      var mo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in-view"); mo.unobserve(e.target); }
        });
      }, { threshold: 0.3 });
      setTimeout(function () { heads.forEach(function (h) { mo.observe(h); }); }, 60);
    } else {
      heads.forEach(function (h) { h.classList.add("in-view"); });
    }
  }

  /* ---- Hero mouse parallax ---- */
  var heroSec = document.querySelector(".hero");
  if (heroSec && !isTouch && !reduce) {
    var pv = heroSec.querySelector(".hero-visual");
    var floats = heroSec.querySelectorAll(".hero-float");
    heroSec.addEventListener("mousemove", function (e) {
      var r = heroSec.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      if (pv) pv.style.transform = "translate(" + (x * 16) + "px," + (y * 16) + "px)";
      floats.forEach(function (f, i) { var d = (i + 1) * 9; f.style.transform = "translate(" + (x * d) + "px," + (y * d) + "px)"; });
    });
    heroSec.addEventListener("mouseleave", function () {
      if (pv) pv.style.transform = "";
      floats.forEach(function (f) { f.style.transform = ""; });
    });
  }

  /* ---- Intro preloader (once per session) ---- */
  if (!reduce && !sessionStorage.getItem("yg_loaded")) {
    var pl = document.createElement("div");
    pl.className = "preloader";
    pl.innerHTML = '<div class="preloader__inner"><div class="preloader__count" id="plCount">0</div><div class="preloader__bar"><i id="plBar"></i></div><div class="preloader__label">YOM Groups</div></div>';
    document.body.appendChild(pl);
    document.body.classList.add("loading");
    var c = 0, cEl = pl.querySelector("#plCount"), bEl = pl.querySelector("#plBar");
    var timer = setInterval(function () {
      c += Math.floor(Math.random() * 9) + 4;
      if (c >= 100) { c = 100; clearInterval(timer);
        setTimeout(function () {
          pl.classList.add("done");
          document.body.classList.remove("loading");
          sessionStorage.setItem("yg_loaded", "1");
          setTimeout(function () { pl.remove(); }, 900);
        }, 260);
      }
      cEl.textContent = c; bEl.style.width = c + "%";
    }, 65);
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  onScroll();
})();
