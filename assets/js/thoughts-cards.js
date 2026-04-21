/* thoughts-cards.js — smooth expand/collapse for thought cards */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.thoughts-card').forEach(function (card) {
      var wrap   = card.querySelector('.thoughts-card__text-wrap');
      var toggle = card.querySelector('.thoughts-card__toggle');
      if (!wrap) return;

      var collapsedH = wrap.offsetHeight;

      card.addEventListener('click', function () {
        if (card.classList.contains('is-open')) {
          closeCard(card, wrap, toggle, collapsedH);
        } else {
          document.querySelectorAll('.thoughts-card.is-open').forEach(function (other) {
            if (other === card) return;
            var otherWrap = other.querySelector('.thoughts-card__text-wrap');
            var otherToggle = other.querySelector('.thoughts-card__toggle');
            var otherCollapsedH = parseFloat(other.dataset.collapsedH) || collapsedH;
            closeCard(other, otherWrap, otherToggle, otherCollapsedH);
          });
          openCard(card, wrap, toggle);
        }
      });
      card.dataset.collapsedH = collapsedH;
    });

    function openCard(card, wrap, toggle) {
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

    function closeCard(card, wrap, toggle, collapsedH) {
      var currentH = wrap.offsetHeight;
      wrap.style.maxHeight = currentH + 'px';

      void wrap.offsetHeight;

      card.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');

      wrap.style.transition = 'max-height 0.32s ease';
      wrap.style.maxHeight  = collapsedH + 'px';

      wrap.addEventListener('transitionend', function handler() {
        wrap.style.maxHeight  = '';
        wrap.style.transition = '';
        wrap.removeEventListener('transitionend', handler);
      });
    }
  });
})();

/* thoughts filter strip — category filtering, search, weighted reshuffle, and pagination */
(function () {
  'use strict';

  var PAGE_SIZE = 15;

  function initFilter() {
    var strip = document.getElementById('thoughts-filter-strip');
    if (!strip) return;

    var pill = document.getElementById('thoughts-filter-pill');
    var cardsRoot = document.getElementById('thoughts-cards');
    var pinLead = document.getElementById('thoughts-pin-lead');
    var btns = strip.querySelectorAll('.thoughts-filter-btn');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.thoughts-card'));
    var searchInput = document.getElementById('thoughts-search');
    var luckBtn = document.getElementById('thoughts-luck-btn');
    var paginationWraps = document.querySelectorAll('.thoughts-pagination');
    var currentEls = document.querySelectorAll('.thoughts-pagination__current');
    var totalEls = document.querySelectorAll('.thoughts-pagination__total');
    var prevBtns = document.querySelectorAll('.thoughts-pagination__prev');
    var nextBtns = document.querySelectorAll('.thoughts-pagination__next');
    var searchTimer = null;
    var isShuffled = false;
    var currentPage = 1;
    var matchedCards = cards.slice();

    if (!btns.length || !cards.length || !cardsRoot) return;

    cards.forEach(function (card, index) {
      card.dataset.originalIndex = String(index);
    });

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
      pill.style.left = (br.left - sr.left) + 'px';
      pill.style.width = br.width + 'px';
    }

    function visibleCards() {
      return cards.filter(function (card) {
        return card.style.display !== 'none';
      });
    }

    function reactionWeight(card) {
      var reaction = (card.getAttribute('data-reaction') || '').toLowerCase();

      if (reaction === 'loved' || reaction === 'hated') return 5;
      if (reaction === 'liked' || reaction === 'disliked') return 3;
      return 1;
    }

    function weightedShuffle(list) {
      var pool = list.slice();
      var shuffled = [];

      while (pool.length) {
        var total = pool.reduce(function (sum, card) {
          return sum + reactionWeight(card);
        }, 0);
        var threshold = Math.random() * total;
        var pickedIndex = pool.length - 1;

        for (var i = 0; i < pool.length; i++) {
          threshold -= reactionWeight(pool[i]);
          if (threshold <= 0) {
            pickedIndex = i;
            break;
          }
        }

        shuffled.push(pool.splice(pickedIndex, 1)[0]);
      }

      return shuffled;
    }

    function reorderCards(orderedCards) {
      orderedCards.forEach(function (card) {
        cardsRoot.appendChild(card);
      });
    }

    function restoreChronologicalOrder() {
      reorderCards(cards.slice().sort(function (a, b) {
        return Number(a.dataset.originalIndex) - Number(b.dataset.originalIndex);
      }));
      isShuffled = false;
      updatePinLead();
    }

    function totalPages() {
      return Math.max(1, Math.ceil(matchedCards.length / PAGE_SIZE));
    }

    function updatePinLead() {
      if (!pinLead) return;
      if (isShuffled || currentPage > 1) {
        pinLead.hidden = true;
        return;
      }
      var hasPinnedInFilter = matchedCards.some(function (card) {
        return card.getAttribute('data-pinned') === 'true';
      });
      pinLead.hidden = !hasPinnedInFilter;
    }

    function updateLuckState() {
      if (!luckBtn) return;
      var hasMatches = matchedCards.length > 0;
      luckBtn.disabled = !hasMatches;
      luckBtn.setAttribute('aria-disabled', hasMatches ? 'false' : 'true');
      luckBtn.classList.toggle('is-disabled', !hasMatches);
    }

    function updatePagination() {
      var total = totalPages();
      currentEls.forEach(function (el) { el.textContent = currentPage; });
      totalEls.forEach(function (el) { el.textContent = total; });
      prevBtns.forEach(function (btn) { btn.disabled = currentPage <= 1; });
      nextBtns.forEach(function (btn) { btn.disabled = currentPage >= total; });
      paginationWraps.forEach(function (wrap) { wrap.hidden = total <= 1; });
    }

    function computeMatched(filterValue, query) {
      return cards.filter(function (card) {
        var cardType = (card.getAttribute('data-type') || '').toLowerCase();
        var matchesType = filterValue === 'all'
          || cardType === filterValue;
        return matchesType && cardMatchesQuery(card, query);
      });
    }

    function renderPage() {
      var total = totalPages();
      if (currentPage > total) currentPage = total;
      if (currentPage < 1) currentPage = 1;

      var start = (currentPage - 1) * PAGE_SIZE;
      var end = start + PAGE_SIZE;
      var pageSet = matchedCards.slice(start, end);
      var pageMembership = new Set(pageSet);
      var query = currentQuery();

      cards.forEach(function (card) {
        var shouldShow = pageMembership.has(card);
        highlightTerms(card, shouldShow ? query : '');

        if (shouldShow) {
          card.style.display = '';
          card.offsetHeight;
          card.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(4px)';
          setTimeout(function () {
            if (card.style.opacity === '0') card.style.display = 'none';
          }, 230);
        }
      });

      updatePagination();
      updateLuckState();
      updatePinLead();
    }

    function applyFilter(filterValue, opts) {
      var query = currentQuery();
      matchedCards = computeMatched(filterValue, query);
      if (!opts || !opts.preservePage) currentPage = 1;
      renderPage();
    }

    function currentFilter() {
      var activeBtn = strip.querySelector('.thoughts-filter-btn.active');
      return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
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
        applyFilter(btn.getAttribute('data-filter'));
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          applyFilter(currentFilter());
        }, 180);
      });
    }

    if (luckBtn) {
      luckBtn.addEventListener('click', function () {
        if (!matchedCards.length) {
          updateLuckState();
          return;
        }

        matchedCards = weightedShuffle(matchedCards);
        reorderCards(matchedCards.concat(cards.filter(function (card) {
          return matchedCards.indexOf(card) === -1;
        })));
        isShuffled = true;
        currentPage = 1;
        renderPage();
      });
      updateLuckState();
    }

    prevBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentPage > 1) {
          currentPage--;
          renderPage();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    nextBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentPage < totalPages()) {
          currentPage++;
          renderPage();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    window.addEventListener('resize', function () {
      var activeBtn = strip.querySelector('.thoughts-filter-btn.active');
      if (activeBtn) movePill(activeBtn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilter);
  } else {
    initFilter();
  }
})();

/* preview panel randomization — shuffles sidebar and inline thoughts panels */
(function () {
  'use strict';
  function shuffleAndShow(container, count) {
    if (!container) return;
    var items = Array.prototype.slice.call(container.querySelectorAll('[style*="display:none"], [style*="display: none"]'));
    if (!items.length) return;
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = items[i]; items[i] = items[j]; items[j] = tmp;
    }
    for (var k = 0; k < items.length; k++) {
      if (k < count) {
        items[k].style.display = '';
      } else {
        items[k].parentNode.removeChild(items[k]);
      }
    }
  }
  function init() {
    shuffleAndShow(document.querySelector('.author__sidebar-thoughts'), 5);
    shuffleAndShow(document.getElementById('thoughts-preview-inline'), 5);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* hash navigation — scroll to and expand a specific thought card */
(function () {
  'use strict';
  function init() {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    var target = document.getElementById(hash.slice(1));
    if (!target || !target.classList.contains('thoughts-card')) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (!target.classList.contains('is-open')) {
      target.click();
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 200); });
  } else {
    setTimeout(init, 200);
  }
})();
