/* thoughts-cards.js — smooth expand/collapse for thought cards */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var cardsRoot = document.getElementById('thoughts-cards');
    if (!cardsRoot) return;

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
        closeCard(card, wrap, toggle, collapsedH);
      } else {
        cardsRoot.querySelectorAll('.thoughts-card.is-open').forEach(function (other) {
          if (other === card) return;
          var otherWrap = other.querySelector('.thoughts-card__text-wrap');
          var otherToggle = other.querySelector('.thoughts-card__toggle');
          closeCard(other, otherWrap, otherToggle, parseFloat(other.dataset.collapsedH));
        });
        openCard(card, wrap, toggle);
      }
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
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });

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

/* thoughts filter strip — category filtering, search, weighted reshuffle, pagination, and hash navigation */
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
    var searchClear = document.getElementById('thoughts-search-clear');
    var luckBtn = document.getElementById('thoughts-luck-btn');
    var paginationWraps = document.querySelectorAll('.thoughts-pagination');
    var pageInputs = document.querySelectorAll('.thoughts-pagination__input');
    var totalEls = document.querySelectorAll('.thoughts-pagination__total');
    var prevBtns = document.querySelectorAll('.thoughts-pagination__prev');
    var nextBtns = document.querySelectorAll('.thoughts-pagination__next');
    var rangeEls = document.querySelectorAll('.thoughts-pagination__range');
    var searchTimer = null;
    var pageInputTimer = null;
    var isShuffled = false;
    var currentPage = 1;
    var matchedCards = cards.slice();
    var previouslyShown = [];
    var initialized = false;

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

    function filterFromUrl() {
      if (!window.URLSearchParams) return null;
      var params = new URLSearchParams(window.location.search);
      var requested = normalise(params.get('type') || params.get('filter') || '');
      var aliases = {
        books: 'book',
        movie: 'film',
        movies: 'film',
        films: 'film',
        television: 'tv',
        shows: 'tv',
        games: 'game'
      };
      requested = aliases[requested] || requested;
      var exists = false;
      btns.forEach(function (btn) {
        if (btn.getAttribute('data-filter') === requested) exists = true;
      });
      return exists ? requested : null;
    }

    function queryTerms(query) {
      return query ? query.split(' ').filter(Boolean) : [];
    }

    function cardText(card) {
      if (card._cachedText !== undefined) return card._cachedText;
      var el = card.querySelector('.thoughts-card__text');
      card._cachedText = el ? normalise(el.textContent) : '';
      return card._cachedText;
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
        card.getAttribute('data-reaction')
      ].join(' ')) + ' ' + cardText(card);

      return terms.every(function (term) {
        return haystack.indexOf(term) !== -1;
      });
    }

    function cardRelevance(card, query) {
      if (!query) return 0;
      var title = normalise(card.getAttribute('data-title'));
      var creator = normalise(card.getAttribute('data-author'));
      var year = normalise(card.getAttribute('data-year'));
      var type = normalise(card.getAttribute('data-type'));
      var reaction = normalise(card.getAttribute('data-reaction'));
      var text = cardText(card);
      var score = 0;

      if (title === query) score = 100;
      else if (title.indexOf(query) === 0) score = 80;
      else if ((' ' + title + ' ').indexOf(' ' + query + ' ') !== -1) score = 60;
      else if (title.indexOf(query) !== -1) score = 40;
      else if (creator === query) score = 30;
      else if (creator.indexOf(query) !== -1) score = 20;
      else if (year.indexOf(query) !== -1 || type.indexOf(query) !== -1 || reaction.indexOf(query) !== -1) score = 10;
      else if (text.indexOf(query) !== -1) score = 5;

      var terms = queryTerms(query);
      if (terms.length > 1) {
        var titleHits = terms.filter(function (t) { return title.indexOf(t) !== -1; }).length;
        score += titleHits * 5;
      }

      return score;
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
      var arr = list.slice();
      var n = arr.length;
      var total = 0;
      for (var i = 0; i < n; i++) total += reactionWeight(arr[i]);

      for (var i = 0; i < n - 1; i++) {
        var threshold = Math.random() * total;
        var pickedIndex = i;

        for (var j = i; j < n; j++) {
          threshold -= reactionWeight(arr[j]);
          if (threshold <= 0) { pickedIndex = j; break; }
        }

        total -= reactionWeight(arr[pickedIndex]);
        var tmp = arr[i];
        arr[i] = arr[pickedIndex];
        arr[pickedIndex] = tmp;
      }

      return arr;
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
      var start = (currentPage - 1) * PAGE_SIZE;
      var end = Math.min(start + PAGE_SIZE, matchedCards.length);
      var rangeText = matchedCards.length ? (start + 1) + '–' + end + ' of ' + matchedCards.length : '';
      pageInputs.forEach(function (el) {
        el.value = currentPage;
        el.max = total;
      });
      totalEls.forEach(function (el) { el.textContent = total; });
      rangeEls.forEach(function (el) { el.textContent = rangeText; });
      prevBtns.forEach(function (btn) { btn.disabled = currentPage <= 1; });
      nextBtns.forEach(function (btn) { btn.disabled = currentPage >= total; });
      paginationWraps.forEach(function (wrap) { wrap.hidden = total <= 1; });
    }

    function computeMatched(filterValue, query) {
      var matched = cards.filter(function (card) {
        var cardType = (card.getAttribute('data-type') || '').toLowerCase();
        var matchesType = filterValue === 'all'
          || cardType === filterValue;
        return matchesType && cardMatchesQuery(card, query);
      });
      if (query) {
        matched.sort(function (a, b) {
          return cardRelevance(b, query) - cardRelevance(a, query);
        });
      }
      return matched;
    }

    function renderPage() {
      var total = totalPages();
      if (currentPage > total) currentPage = total;
      if (currentPage < 1) currentPage = 1;

      var start = (currentPage - 1) * PAGE_SIZE;
      var end = start + PAGE_SIZE;
      var pageSet = matchedCards.slice(start, end);
      var nowShown = new Set(pageSet);
      var query = currentQuery();

      if (!initialized) {
        cards.forEach(function (card) {
          if (!nowShown.has(card)) {
            card.style.display = 'none';
          }
        });
        initialized = true;
      } else {
        previouslyShown.forEach(function (card) {
          if (!nowShown.has(card)) {
            restoreHighlights(card);
            card.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(4px)';
            setTimeout(function () {
              if (card.style.opacity === '0') card.style.display = 'none';
            }, 230);
          }
        });
      }

      pageSet.forEach(function (card) {
        highlightTerms(card, query);
        card.style.display = '';
        card.offsetHeight;
        card.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });

      previouslyShown = pageSet;
      updatePagination();
      updateLuckState();
      updatePinLead();
    }

    function switchFilter(filterValue) {
      btns.forEach(function (b) { b.classList.remove('active'); });
      var targetBtn = null;
      btns.forEach(function (btn) {
        if (btn.getAttribute('data-filter') === filterValue) targetBtn = btn;
      });
      if (targetBtn) {
        targetBtn.classList.add('active');
        movePill(targetBtn);
      }
      if (searchInput) searchInput.value = '';
      matchedCards = computeMatched(filterValue, '');
    }

    function applyFilter(filterValue, opts) {
      var query = currentQuery();
      matchedCards = computeMatched(filterValue, query);
      if (query) {
        var matchedSet = new Set(matchedCards);
        reorderCards(matchedCards.concat(cards.filter(function (c) {
          return !matchedSet.has(c);
        })));
      } else if (!isShuffled) {
        restoreChronologicalOrder();
      }
      if (!opts || !opts.preservePage) currentPage = 1;
      renderPage();
    }

    function currentFilter() {
      var activeBtn = strip.querySelector('.thoughts-filter-btn.active');
      return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    }

    function scrollToFilter() {
      var top = strip.getBoundingClientRect().top + window.pageYOffset - 18;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function handleHash() {
      var hash = window.location.hash;
      if (!hash || hash.length < 2) return false;
      var targetId = hash.slice(1);
      var target = document.getElementById(targetId);
      if (!target || !target.classList.contains('thoughts-card')) return false;

      var cardType = (target.getAttribute('data-type') || '').toLowerCase();
      switchFilter(cardType);

      var idx = matchedCards.indexOf(target);
      if (idx === -1) {
        switchFilter('all');
        idx = matchedCards.indexOf(target);
      }
      if (idx === -1) return false;

      currentPage = Math.floor(idx / PAGE_SIZE) + 1;
      renderPage();

      setTimeout(function () {
        if (!target.classList.contains('is-open')) {
          target.click();
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);

      return true;
    }

    var active = strip.querySelector('.thoughts-filter-btn.active');
    var initialFilter = filterFromUrl();

    if (!handleHash()) {
      if (initialFilter) {
        switchFilter(initialFilter);
        applyFilter(initialFilter);
      } else if (active) {
        setTimeout(function () { movePill(active); }, 100);
        applyFilter(active.getAttribute('data-filter'));
      }
    }

    window.addEventListener('hashchange', function () {
      handleHash();
    });

    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        movePill(btn);
        applyFilter(btn.getAttribute('data-filter'));
      });
    });

    function updateSearchClear() {
      if (searchClear) searchClear.hidden = !searchInput || !searchInput.value;
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        updateSearchClear();
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          applyFilter(currentFilter());
        }, 180);
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', function () {
        if (searchInput) { searchInput.value = ''; searchInput.focus(); }
        updateSearchClear();
        applyFilter(currentFilter());
      });
    }

    if (luckBtn) {
      luckBtn.addEventListener('click', function () {
        if (!matchedCards.length) {
          updateLuckState();
          return;
        }

        matchedCards = weightedShuffle(matchedCards);
        var shuffledSet = new Set(matchedCards);
        reorderCards(matchedCards.concat(cards.filter(function (card) {
          return !shuffledSet.has(card);
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
          scrollToFilter();
        }
      });
    });

    nextBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentPage < totalPages()) {
          currentPage++;
          renderPage();
          scrollToFilter();
        }
      });
    });

    function handlePageInput(input) {
      var val = parseInt(input.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > totalPages()) val = totalPages();
      if (val === currentPage) {
        input.value = currentPage;
        return;
      }
      currentPage = val;
      renderPage();
      scrollToFilter();
    }

    pageInputs.forEach(function (input) {
      input.addEventListener('input', function () {
        clearTimeout(pageInputTimer);
        if (!input.value) return;
        pageInputTimer = setTimeout(function () {
          handlePageInput(input);
        }, 220);
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          clearTimeout(pageInputTimer);
          handlePageInput(input);
          input.blur();
        }
      });
      input.addEventListener('blur', function () {
        clearTimeout(pageInputTimer);
        if (!input.value || String(input.value) !== String(currentPage)) {
          handlePageInput(input);
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

/* frontpage cover wall — weighted shuffle favouring books */
(function () {
  'use strict';
  function weightedShuffle(items) {
    var pool = items.slice();
    var result = [];
    while (pool.length) {
      var total = pool.reduce(function (sum, el) {
        return sum + (el.getAttribute('data-type') === 'book' ? 3 : 1);
      }, 0);
      var threshold = Math.random() * total;
      var idx = pool.length - 1;
      for (var i = 0; i < pool.length; i++) {
        threshold -= (pool[i].getAttribute('data-type') === 'book' ? 3 : 1);
        if (threshold <= 0) { idx = i; break; }
      }
      result.push(pool.splice(idx, 1)[0]);
    }
    return result;
  }
  function initCovers() {
    var containers = Array.prototype.slice.call(document.querySelectorAll('.home-covers'));
    containers.forEach(function (container) {
      var items = Array.prototype.slice.call(container.querySelectorAll('[style*="display:none"], [style*="display: none"]'));
      if (!items.length) return;
      var desktopCount = parseInt(container.getAttribute('data-count'), 10);
      var tabletCount = parseInt(container.getAttribute('data-tablet-count'), 10);
      var mobileCount = parseInt(container.getAttribute('data-mobile-count'), 10);
      var count = window.innerWidth <= 480
        ? (mobileCount || 14)
        : (window.innerWidth <= 1023 ? (tabletCount || desktopCount || 20) : (desktopCount || 20));
      var shuffled = weightedShuffle(items);
      for (var k = 0; k < shuffled.length; k++) {
        if (k < count) {
          shuffled[k].style.display = '';
          container.appendChild(shuffled[k]);
        } else {
          shuffled[k].parentNode.removeChild(shuffled[k]);
        }
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCovers);
  } else {
    initCovers();
  }
})();

/* frontpage album strip — shuffle and limit album covers */
(function () {
  'use strict';
  function initAlbums() {
    var container = document.querySelector('.home-albums');
    if (!container) return;
    var items = Array.prototype.slice.call(container.querySelectorAll('[style*="display:none"], [style*="display: none"]'));
    if (!items.length) return;
    var count = window.innerWidth <= 480 ? 16 : 24;
    var pool = items.slice();
    var shuffled = [];
    while (pool.length) {
      var idx = Math.floor(Math.random() * pool.length);
      shuffled.push(pool.splice(idx, 1)[0]);
    }
    for (var k = 0; k < shuffled.length; k++) {
      if (k < count) {
        shuffled[k].style.display = '';
        container.appendChild(shuffled[k]);
      } else {
        shuffled[k].parentNode.removeChild(shuffled[k]);
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAlbums);
  } else {
    initAlbums();
  }
})();
