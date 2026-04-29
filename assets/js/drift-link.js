(function () {
  'use strict';

  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

  function parseLines(value) {
    if (!value) return [];

    try {
      var parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) return [];

      return parsed.filter(function (line) {
        return typeof line === 'string' && line.trim().length > 0;
      });
    } catch (error) {
      return [];
    }
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function randomToken() {
    var length = 5 + Math.floor(Math.random() * 5);
    var token = '';

    for (var i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return token;
  }

  function randomMissingPath(base) {
    var root = base || '/';

    if (root.charAt(root.length - 1) !== '/') {
      root += '/';
    }

    return root + 'lost-' + randomToken();
  }

  function initLink(link) {
    var lines = parseLines(link.getAttribute('data-drift-lines'));
    var base = link.getAttribute('data-drift-base') || '/';

    if (lines.length > 0) {
      link.textContent = randomItem(lines);
    }

    link.setAttribute('href', randomMissingPath(base));
  }

  function init() {
    var links = document.querySelectorAll('.js-drift-link');

    for (var i = 0; i < links.length; i++) {
      initLink(links[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
