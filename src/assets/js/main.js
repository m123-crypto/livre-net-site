(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    }
  });
})();

// Diaporama avant/après : boutons, points, défilement automatique toutes les 5 s
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-diapo]").forEach(function (root) {
    var track = root.querySelector("[data-diapo-track]");
    var slides = track ? track.children : [];
    if (!track || slides.length < 2) return;
    var dots = root.querySelectorAll("[data-diapo-dot]");
    var current = 0, timer = null, paused = false;
    function go(i) {
      current = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[current].offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" });
      mark();
    }
    function mark() {
      dots.forEach(function (d, k) { d.setAttribute("aria-current", k === current ? "true" : "false"); });
    }
    function start() { if (reduce) return; stop(); timer = setInterval(function () { if (!paused && !document.hidden) go(current + 1); }, 5000); }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    root.querySelector("[data-diapo-prev]").addEventListener("click", function () { go(current - 1); start(); });
    root.querySelector("[data-diapo-next]").addEventListener("click", function () { go(current + 1); start(); });
    dots.forEach(function (d) { d.addEventListener("click", function () { go(parseInt(d.getAttribute("data-diapo-dot"), 10)); start(); }); });
    var t;
    track.addEventListener("scroll", function () {
      clearTimeout(t);
      t = setTimeout(function () { var i = Math.round(track.scrollLeft / track.clientWidth); if (i !== current) { current = i; mark(); } }, 80);
    });
    root.addEventListener("mouseenter", function () { paused = true; });
    root.addEventListener("mouseleave", function () { paused = false; });
    root.addEventListener("focusin", function () { paused = true; });
    root.addEventListener("focusout", function () { paused = false; });
    track.addEventListener("touchstart", function () { paused = true; }, { passive: true });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
    });
    mark(); start();
  });
})();
