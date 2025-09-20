(function () {
  'use strict';

  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

  function init() {
    var links = document.querySelectorAll('.js-drift-link');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var lines = JSON.parse(link.getAttribute('data-drift-lines') || '[]');
      var base = link.getAttribute('data-drift-base') || '/';
      if (base.charAt(base.length - 1) !== '/') base += '/';

      if (lines.length) {
        link.textContent = lines[Math.floor(Math.random() * lines.length)];
      }

      var token = '';
      var len = 5 + Math.floor(Math.random() * 5);
      for (var j = 0; j < len; j++) token += chars.charAt(Math.floor(Math.random() * chars.length));
      link.setAttribute('href', base + 'lost-' + token);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
