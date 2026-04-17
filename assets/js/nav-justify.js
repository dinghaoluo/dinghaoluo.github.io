(function () {
  'use strict';

  function justifyNav() {
    var stack = document.querySelector('.page-header__nav-stack');
    if (!stack) return;

    var links = Array.prototype.slice.call(stack.querySelectorAll('a'));
    if (links.length < 2) return;

    links.forEach(function (link) {
      link.style.letterSpacing = '';
      link.style.width = '';
    });

    var maxWidth = 0;
    links.forEach(function (link) {
      var w = link.getBoundingClientRect().width;
      if (w > maxWidth) maxWidth = w;
    });

    links.forEach(function (link) {
      var w = link.getBoundingClientRect().width;
      var text = link.textContent || '';
      var chars = text.length;
      if (chars < 2 || w >= maxWidth) {
        link.style.width = maxWidth + 'px';
        return;
      }
      var extra = (maxWidth - w) / (chars - 1);
      var current = parseFloat(getComputedStyle(link).letterSpacing) || 0;
      link.style.letterSpacing = (current + extra) + 'px';
      link.style.width = maxWidth + 'px';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      requestAnimationFrame(justifyNav);
    });
  } else {
    requestAnimationFrame(justifyNav);
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      justifyNav();
    }, 150);
  });
})();
