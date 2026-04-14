/* brief-cards.js — smooth expand/collapse for brief-take cards */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.brief-card').forEach(function (card) {
      var wrap   = card.querySelector('.brief-card__text-wrap');
      var toggle = card.querySelector('.brief-card__toggle');
      if (!wrap) return;

      // Record the CSS-defined collapsed height (2 lines)
      var collapsedH = wrap.offsetHeight;
      var hoverTimer = null;

      // Click anywhere on the card to toggle open/close
      card.addEventListener('click', function () {
        if (card.classList.contains('is-open')) {
          closeCard(card, wrap, toggle, collapsedH);
        } else {
          openCard(card, wrap, toggle);
        }
      });

      // Hover for 2 seconds to auto-open (only when closed)
      card.addEventListener('mouseenter', function () {
        if (!card.classList.contains('is-open')) {
          hoverTimer = setTimeout(function () {
            openCard(card, wrap, toggle);
          }, 2000);
        }
      });

      card.addEventListener('mouseleave', function () {
        clearTimeout(hoverTimer);
        hoverTimer = null;
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
      if (toggle) toggle.setAttribute('aria-expanded', 'true');

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
      if (toggle) toggle.setAttribute('aria-expanded', 'false');

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

/* brief filter strip — category filtering with smooth pill animation */
(function () {
  'use strict';

  function initFilter() {
    var strip = document.getElementById('brief-filter-strip');
    if (!strip) return;

    var pill  = document.getElementById('brief-filter-pill');
    var btns  = strip.querySelectorAll('.brief-filter-btn');
    var cards = document.querySelectorAll('.brief-card');

    if (!btns.length || !cards.length) return;

    function movePill(btn) {
      if (!btn || !pill) return;
      var sr = strip.getBoundingClientRect();
      var br = btn.getBoundingClientRect();
      pill.style.left  = (br.left  - sr.left)  + 'px';
      pill.style.width =  br.width             + 'px';
    }

    function applyFilter(filterValue) {
      cards.forEach(function (card) {
        var cardType = (card.getAttribute('data-type') || '').toLowerCase();
        var matches = filterValue === 'all'
                   || cardType === filterValue
                   || (filterValue === 'other' && cardType !== 'book' && cardType !== 'film');

        if (matches) {
          // show card
          card.style.display = '';
          card.offsetHeight;  // force reflow
          card.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          // hide card
          card.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(4px)';
          setTimeout(function () {
            if (card.style.opacity === '0') card.style.display = 'none';
          }, 230);
        }
      });
    }

    // Initialize pill position
    var active = strip.querySelector('.brief-filter-btn.active');
    if (active) {
      setTimeout(function () { movePill(active); }, 100);
    }

    // Attach click handlers
    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();

        // Update active state
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Move pill
        movePill(btn);

        // Apply filter
        var filter = btn.getAttribute('data-filter');
        applyFilter(filter);
      });
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilter);
  } else {
    initFilter();
  }
})();
