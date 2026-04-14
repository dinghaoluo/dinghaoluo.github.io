document.addEventListener("DOMContentLoaded", function() {
  var breakpoint = 1023;
  var toggle = document.getElementById("haothings-nav-toggle");
  var nav = document.getElementById("haothings-nav");

  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is--visible");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function toggleNav() {
    var isOpen = nav.classList.toggle("is--visible");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  toggle.addEventListener("click", function(event) {
    event.stopPropagation();
    if (window.innerWidth > breakpoint) return;
    toggleNav();
  });

  document.addEventListener("click", function(event) {
    if (window.innerWidth > breakpoint) return;
    if (!event.target.closest("#haothings-masthead-inner")) {
      closeNav();
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  nav.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", function() {
    if (window.innerWidth > breakpoint) {
      closeNav();
    }
  });
});
