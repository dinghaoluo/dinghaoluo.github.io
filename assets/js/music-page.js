/* music-page.js - defer the large listening-notes wall until after first paint */
(function () {
  'use strict';

  var mount = document.getElementById('music-album-wall-loader');
  if (!mount || !window.fetch) return;

  var loaded = false;

  function loadScript(src) {
    if (!src) return;
    var script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

  function loadWall() {
    if (loaded) return;
    loaded = true;

    fetch(mount.getAttribute('data-src'), { credentials: 'same-origin' })
      .then(function (response) {
        if (!response.ok) throw new Error('album wall request failed');
        return response.text();
      })
      .then(function (html) {
        mount.innerHTML = html;
        mount.classList.add('is-loaded');
        loadScript(mount.getAttribute('data-script'));
      })
      .catch(function () {
        mount.innerHTML = '<p><a href="' + mount.getAttribute('data-src') + '">Open listening notes</a>.</p>';
      });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        observer.disconnect();
        loadWall();
      }
    }, { rootMargin: '700px 0px' });
    observer.observe(mount);
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadWall, { timeout: 2500 });
  } else {
    window.setTimeout(loadWall, 1800);
  }
})();
