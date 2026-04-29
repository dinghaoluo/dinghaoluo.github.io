(function () {
  'use strict';

  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function effectiveTheme() {
    var saved = document.documentElement.getAttribute('data-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return systemTheme();
  }

  function applyTheme(theme) {
    if (theme && theme !== systemTheme()) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    }
    updateLabel();
  }

  function updateLabel() {
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    btn.setAttribute('data-theme-label', 'switch to ' + next);
    btn.setAttribute('title', 'Switch to ' + next + ' mode');
  }

  btn.addEventListener('click', function () {
    var current = effectiveTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  updateLabel();
})();
