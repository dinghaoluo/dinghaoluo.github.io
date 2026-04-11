/* brief-cards.js — smooth expand/collapse for brief-take cards */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.brief-card').forEach(function (card) {
      var wrap   = card.querySelector('.brief-card__text-wrap');
      var toggle = card.querySelector('.brief-card__toggle');
      if (!wrap || !toggle) return;

      // Record the CSS-defined collapsed height (2 lines)
      var collapsedH = wrap.offsetHeight;

      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        if (card.classList.contains('is-open')) {
          closeCard(card, wrap, toggle, collapsedH);
        } else {
          openCard(card, wrap, toggle);
        }
      });
    });

    function openCard(card, wrap, toggle) {
      // Measure natural (full) height
      var startH  = wrap.offsetHeight;
      wrap.style.maxHeight = 'none';
      var targetH = wrap.scrollHeight;
      wrap.style.maxHeight = startH + 'px';

      // Trigger reflow so browser registers the start value
      void wrap.offsetHeight;

      card.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');

      wrap.style.transition = 'max-height 0.42s ease';
      wrap.style.maxHeight  = targetH + 'px';

      wrap.addEventListener('transitionend', function handler() {
        wrap.style.maxHeight  = 'none'; // let height be natural after open
        wrap.style.transition = '';
        wrap.removeEventListener('transitionend', handler);
      });
    }

    function closeCard(card, wrap, toggle, collapsedH) {
      // Pin current height before removing is-open so transition starts from full
      var currentH = wrap.offsetHeight;
      wrap.style.maxHeight = currentH + 'px';

      void wrap.offsetHeight; // reflow

      card.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');

      wrap.style.transition = 'max-height 0.32s ease';
      wrap.style.maxHeight  = collapsedH + 'px';

      wrap.addEventListener('transitionend', function handler() {
        wrap.style.maxHeight  = ''; // let CSS max-height (2.9em) take over
        wrap.style.transition = '';
        wrap.removeEventListener('transitionend', handler);
      });
    }
  });
})();
