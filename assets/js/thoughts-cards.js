/* thoughts-cards.js — smooth expand/collapse for thought cards */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.thoughts-card').forEach(function (card) {
      var wrap   = card.querySelector('.thoughts-card__text-wrap');
      var toggle = card.querySelector('.thoughts-card__toggle');
      if (!wrap) return;

      // Record the CSS-defined collapsed height (2 lines)
      var collapsedH = wrap.offsetHeight;

      // Click anywhere on the card to toggle open/close
      card.addEventListener('click', function () {
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

/* thoughts filter strip — category filtering with smooth pill animation */
(function () {
  'use strict';

  function initFilter() {
    var strip = document.getElementById('thoughts-filter-strip');
    if (!strip) return;

    var pill  = document.getElementById('thoughts-filter-pill');
    var btns  = strip.querySelectorAll('.thoughts-filter-btn');
    var cards = document.querySelectorAll('.thoughts-card');
    var searchInput = document.getElementById('thoughts-search');
    var luckBtn = document.getElementById('thoughts-luck-btn');
    var searchTimer = null;
    var spotlightCard = null;

    if (!btns.length || !cards.length) return;

    function normalise(str) {
      return (str || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function currentQuery() {
      return searchInput ? normalise(searchInput.value) : '';
    }

    function queryTerms(query) {
      return query ? query.split(' ').filter(Boolean) : [];
    }

    function cardMatchesQuery(card, query) {
      if (!query) return true;

      var terms = queryTerms(query);
      if (!terms.length) return true;

      var haystack = normalise([
        card.getAttribute('data-title'),
        card.getAttribute('data-author'),
        card.getAttribute('data-year'),
        card.getAttribute('data-type'),
        card.getAttribute('data-reaction'),
        card.getAttribute('data-text')
      ].join(' '));

      return terms.every(function (term) {
        return haystack.indexOf(term) !== -1;
      });
    }

    function escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function restoreHighlights(card) {
      card.querySelectorAll('.thoughts-card__title, .thoughts-card__creator, .thoughts-card__text').forEach(function (node) {
        if (node._originalHtml) {
          node.innerHTML = node._originalHtml;
        } else {
          node._originalHtml = node.innerHTML;
        }
      });
    }

    function highlightTerms(card, query) {
      var terms = queryTerms(query).filter(function (term) {
        return term.length > 1;
      });

      restoreHighlights(card);
      if (!terms.length) return;

      var regex = new RegExp('(' + terms.map(escapeRegExp).join('|') + ')', 'gi');
      card.querySelectorAll('.thoughts-card__title, .thoughts-card__creator, .thoughts-card__text').forEach(function (node) {
        node.innerHTML = node.innerHTML.replace(regex, '<mark class="thoughts-highlight">$1</mark>');
      });
    }

    function movePill(btn) {
      if (!btn || !pill) return;
      var sr = strip.getBoundingClientRect();
      var br = btn.getBoundingClientRect();
      pill.style.left  = (br.left  - sr.left)  + 'px';
      pill.style.width =  br.width             + 'px';
    }

    function clearSpotlight() {
      if (!spotlightCard) return;
      spotlightCard.classList.remove('thoughts-card--spotlight');
      spotlightCard = null;
    }

    function visibleCards() {
      return Array.prototype.slice.call(cards).filter(function (card) {
        return card.style.display !== 'none';
      });
    }

    function reactionWeight(card) {
      var reaction = (card.getAttribute('data-reaction') || '').toLowerCase();
      var pinned = card.getAttribute('data-pinned') === 'true';
      var weight = 1;

      if (reaction === 'loved' || reaction === 'hated') {
        weight = 5;
      } else if (reaction === 'liked' || reaction === 'disliked') {
        weight = 3;
      } else if (reaction === 'meh') {
        weight = 1;
      }

      if (pinned) {
        weight = Math.max(1, weight - 1);
      }

      return weight;
    }

    function pickWeightedCard(pool) {
      var total = pool.reduce(function (sum, card) {
        return sum + reactionWeight(card);
      }, 0);
      var threshold = Math.random() * total;

      for (var i = 0; i < pool.length; i++) {
        threshold -= reactionWeight(pool[i]);
        if (threshold <= 0) {
          return pool[i];
        }
      }

      return pool[pool.length - 1] || null;
    }

    function spotlight(card) {
      if (!card) return;

      clearSpotlight();
      spotlightCard = card;
      card.classList.add('thoughts-card--spotlight');

      if (!card.classList.contains('is-open')) {
        card.click();
      }

      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function updateLuckState() {
      if (!luckBtn) return;
      var hasVisibleCards = visibleCards().length > 0;
      luckBtn.disabled = !hasVisibleCards;
      luckBtn.setAttribute('aria-disabled', hasVisibleCards ? 'false' : 'true');
    }

    function applyFilter(filterValue) {
      var query = currentQuery();

      cards.forEach(function (card) {
        var cardType = (card.getAttribute('data-type') || '').toLowerCase();
        var matchesType = filterValue === 'all'
                       || cardType === filterValue
                       || (filterValue === 'other' && cardType !== 'book' && cardType !== 'film');
        var matchesQuery = cardMatchesQuery(card, query);
        var matches = matchesType && matchesQuery;

        highlightTerms(card, matches ? query : '');

        if (matches) {
          card.style.display = '';
          card.offsetHeight;
          card.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          if (spotlightCard === card) {
            clearSpotlight();
          }
          card.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(4px)';
          setTimeout(function () {
            if (card.style.opacity === '0') card.style.display = 'none';
          }, 230);
        }
      });

      updateLuckState();
    }

    var active = strip.querySelector('.thoughts-filter-btn.active');
    if (active) {
      setTimeout(function () { movePill(active); }, 100);
      applyFilter(active.getAttribute('data-filter'));
    }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        movePill(btn);
        var filter = btn.getAttribute('data-filter');
        applyFilter(filter);
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          var activeBtn = strip.querySelector('.thoughts-filter-btn.active');
          var filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
          applyFilter(filter);
        }, 180);
      });
    }

    if (luckBtn) {
      luckBtn.addEventListener('click', function () {
        var pool = visibleCards();
        var card = pickWeightedCard(pool);
        spotlight(card);
      });
      updateLuckState();
    }
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilter);
  } else {
    initFilter();
  }
})();
