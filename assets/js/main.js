/* =========================================================
   YOM Groups — main.js
   Header scroll, mobile menu, counters, FAQ, reveal, form
   ========================================================= */
(function () {
  "use strict";

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.querySelector(".mobile-panel");
  var backdrop = document.querySelector(".mobile-backdrop");

  function openMenu() {
    if (!panel) return;
    panel.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    if (toggle) toggle.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    if (!panel) return;
    panel.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    if (toggle) toggle.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      panel && panel.classList.contains("open") ? closeMenu() : openMenu();
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  var mpClose = document.querySelector(".mp-close");
  if (mpClose) mpClose.addEventListener("click", closeMenu);

  /* Mobile accordion groups */
  document.querySelectorAll(".mp-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.closest(".mp-group");
      if (!group) return;
      var sub = group.querySelector(".mp-sub");
      var isOpen = group.classList.toggle("open");
      if (sub) sub.style.maxHeight = isOpen ? sub.scrollHeight + "px" : "0";
    });
  });
  /* Close mobile menu when a link is clicked */
  document.querySelectorAll(".mobile-panel a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---- Animated counters ---- */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    var decimals = (el.getAttribute("data-decimals") || "0") | 0;
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString("en-IN");
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString("en-IN");
    }
    requestAnimationFrame(step);
  }

  /* ---- Intersection Observer: reveal + counters ---- */
  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        if (entry.target.classList.contains("counter")) animateCounter(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    document.querySelectorAll(".reveal, .counter").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll(".counter").forEach(animateCounter);
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      if (!item) return;
      var ans = item.querySelector(".faq-a");
      var open = item.classList.toggle("open");
      if (ans) ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0";
    });
  });

  /* ---- Contact / audit form (front-end demo) ---- */
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = form.querySelector(".form-success");
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
      setTimeout(function () { success && success.classList.remove("show"); }, 6000);
    });
  });

  /* ---- Footer year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
