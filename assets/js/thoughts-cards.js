/* thoughts-cards.js - expand/collapse for thought cards */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var cardsRoot = document.getElementById('thoughts-cards');
    if (!cardsRoot) return;

    // not sure this is accessible enough but it works for now
    cardsRoot.addEventListener('click', function (event) {
      var card = event.target.closest ? event.target.closest('.thoughts-card') : null;
      if (!card || !cardsRoot.contains(card)) return;

      var wrap   = card.querySelector('.thoughts-card__text-wrap');
      var toggle = card.querySelector('.thoughts-card__toggle');
      if (!wrap) return;

      if (!card.dataset.collapsedH) {
        card.dataset.collapsedH = wrap.offsetHeight;
      }
      var collapsedH = parseFloat(card.dataset.collapsedH);

      if (card.classList.contains('is-open')) {
        wrap.style.transition = 'max-height 0.32s ease';
        wrap.style.maxHeight  = collapsedH + 'px';
        card.classList.toggle('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        wrap.addEventListener('transitionend', function handler() {
          wrap.style.maxHeight  = '';
          wrap.style.transition = '';
          wrap.removeEventListener('transitionend', handler);
        });
      } else {
        // might want keyboard support later
        var startH  = wrap.offsetHeight;
        wrap.style.maxHeight = 'none';
        var targetH = wrap.scrollHeight;
        wrap.style.maxHeight = startH + 'px';
        void wrap.offsetHeight;
        card.classList.add('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
        wrap.style.transition = 'max-height 0.42s ease';
        wrap.style.maxHeight  = targetH + 'px';
        wrap.addEventListener('transitionend', function handler() {
          wrap.style.maxHeight  = 'none';
          wrap.style.transition = '';
          wrap.removeEventListener('transitionend', handler);
        });
      }
    });
  });
})();
