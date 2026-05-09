/* thoughts-cards.js — smooth expand/collapse for thought cards */
(function () {
  'use strict';

  function detectCreatorWrap() {
    var lines = document.querySelectorAll('.thoughts-card__title-line');
    lines.forEach(function (line) {
      var title = line.querySelector('.thoughts-card__title');
      var wrap = line.querySelector('.thoughts-card__creator-wrap');
      if (!title || !wrap) return;
      var wrapped = wrap.offsetTop > title.offsetTop;
      wrap.classList.toggle('is-wrapped', wrapped);
    });
  }
  window._detectCreatorWrap = detectCreatorWrap;

  document.addEventListener('DOMContentLoaded', function () {
    detectCreatorWrap();
    window.addEventListener('resize', detectCreatorWrap);

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
        var targetTop = predictedCardTopAfterCollapse(card);
        cardsRoot.querySelectorAll('.thoughts-card.is-open').forEach(function (other) {
          if (other === card) return;
          var otherWrap = other.querySelector('.thoughts-card__text-wrap');
          var otherToggle = other.querySelector('.thoughts-card__toggle');
          closeCard(other, otherWrap, otherToggle, parseFloat(other.dataset.collapsedH));
        });
        openCard(card, wrap, toggle);
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });

    function predictedCardTopAfterCollapse(card) {
      var top = card.getBoundingClientRect().top + window.pageYOffset;
      cardsRoot.querySelectorAll('.thoughts-card.is-open').forEach(function (other) {
        if (other === card) return;
        if (!(other.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_FOLLOWING)) return;

        var otherWrap = other.querySelector('.thoughts-card__text-wrap');
        if (!otherWrap) return;
        if (!other.dataset.collapsedH) {
          other.dataset.collapsedH = otherWrap.offsetHeight;
        }
        top -= Math.max(0, otherWrap.offsetHeight - parseFloat(other.dataset.collapsedH || 0));
      });
      return Math.max(0, top);
    }

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
    var orderDirty = false;

    if (!btns.length || !cards.length || !cardsRoot) return;

    cards.forEach(function (card, index) {
      card.dataset.originalIndex = String(index);
    });

    var normalise = ListUtils.normalise;

    function currentQuery() {
      return searchInput ? normalise(searchInput.value) : '';
    }

    function filterFromUrl() {
      if (!window.URLSearchParams) return null;
      var params = new URLSearchParams(window.location.search);
      var requested = normalise(params.get('type') || params.get('filter') || '');
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

    var escapeRegExp = ListUtils.escapeRegExp;

    function restoreHighlights(card) {
      if (!card._hasHighlights) return;
      card.querySelectorAll('.thoughts-card__title, .thoughts-card__creator, .thoughts-card__text').forEach(function (node) {
        if (node._originalHtml) {
          node.innerHTML = node._originalHtml;
        }
      });
      card._hasHighlights = false;
    }

    function highlightTerms(card, query) {
      var terms = queryTerms(query).filter(function (term) {
        return term.length > 1;
      });

      restoreHighlights(card);
      if (!terms.length) return;

      var regex = new RegExp('(' + terms.map(escapeRegExp).join('|') + ')', 'gi');
      card.querySelectorAll('.thoughts-card__title, .thoughts-card__creator, .thoughts-card__text').forEach(function (node) {
        if (!node._originalHtml) node._originalHtml = node.innerHTML;
        node.innerHTML = node.innerHTML.replace(regex, '<mark class="thoughts-highlight">$1</mark>');
      });
      card._hasHighlights = true;
    }

    function movePill(container, pillEl, btn) {
      ListUtils.movePill(container, pillEl, btn);
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
      return ListUtils.weightedShuffle(list, reactionWeight);
    }

    function reorderCards(orderedCards) {
      var fragment = document.createDocumentFragment();
      orderedCards.forEach(function (card) {
        fragment.appendChild(card);
      });
      cardsRoot.appendChild(fragment);
      orderDirty = true;
    }

    function restoreChronologicalOrder() {
      if (!orderDirty) {
        isShuffled = false;
        updatePinLead();
        return;
      }
      ListUtils.restoreOrder(cards, cardsRoot, 'originalIndex');
      isShuffled = false;
      orderDirty = false;
      updatePinLead();
    }

    function totalPages() {
      return ListUtils.totalPages(matchedCards.length, PAGE_SIZE);
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
      ListUtils.updatePagination({
        page: currentPage,
        totalPages: total,
        perPage: PAGE_SIZE,
        matchedCount: matchedCards.length,
        inputEls: pageInputs,
        totalEls: totalEls,
        rangeEls: rangeEls,
        prevBtns: prevBtns,
        nextBtns: nextBtns,
        navEls: paginationWraps
      });
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
        if (query) {
          highlightTerms(card, query);
        } else {
          restoreHighlights(card);
        }
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
      if (window._detectCreatorWrap) window._detectCreatorWrap();
    }

    function switchFilter(filterValue) {
      btns.forEach(function (b) { b.classList.remove('active'); });
      var targetBtn = null;
      btns.forEach(function (btn) {
        if (btn.getAttribute('data-filter') === filterValue) targetBtn = btn;
      });
      if (targetBtn) {
        targetBtn.classList.add('active');
        movePill(strip, pill, targetBtn);
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
      ListUtils.scrollToFilter(strip);
    }

    function handleHash() {
      return ListUtils.handleHash({
        matches: function (el) { return el.classList.contains('thoughts-card'); },
        prepare: function (target) {
          var cardType = (target.getAttribute('data-type') || '').toLowerCase();
          switchFilter(cardType);
        },
        items: function () { return matchedCards; },
        fallback: function () { switchFilter('all'); },
        perPage: function () { return PAGE_SIZE; },
        setPage: function (p) { currentPage = p; },
        render: renderPage,
        open: function (target) {
          if (!target.classList.contains('is-open')) {
            target.click();
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }

    var active = strip.querySelector('.thoughts-filter-btn.active');
    var initialFilter = filterFromUrl();

    if (!handleHash()) {
      if (initialFilter) {
        switchFilter(initialFilter);
        applyFilter(initialFilter);
      } else if (active) {
        movePill(strip, pill, active);
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
        movePill(strip, pill, btn);
        applyFilter(btn.getAttribute('data-filter'));
      });
    });

    function updateSearchClear() {
      ListUtils.updateSearchClear(searchInput, searchClear);
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
    updateSearchClear();

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
      ListUtils.handlePageInput(input, totalPages, function (val) {
        if (val === currentPage) {
          input.value = currentPage;
          return;
        }
        currentPage = val;
        renderPage();
        scrollToFilter();
      });
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
      if (activeBtn) movePill(strip, pill, activeBtn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilter);
  } else {
    initFilter();
  }
})();

/* frontpage cover wall - weighted shuffle tuned per section */
(function () {
  'use strict';
  var WIDE_SCREEN_MIN = 1412;
  var COVER_MIN_WEIGHT = 0.15;
  var BOOK_CHINESE_EDITION_MULTIPLIER = 0.02;
  var BOOK_CHINESE_EDITION_MIN_WEIGHT = 0.02;
  var BOOK_NON_CHINESE_EDITION_MULTIPLIER = 1.5;
  var BOOK_NON_CHINESE_LOVED_MULTIPLIER = 3.2;
  var EXTREME_REACTION_MULTIPLIER = 3;

  function hasChineseTitleFallback(el) {
    var text = [
      el.getAttribute('data-title'),
      el.getAttribute('data-title-en')
    ].join(' ');
    var hasHan = /[\u3400-\u9fff\uf900-\ufaff]/.test(text);
    var hasJapaneseOrKorean = /[\u3040-\u30ff\uac00-\ud7af]/.test(text);
    return hasHan && !hasJapaneseOrKorean;
  }

  function isChineseEdition(el) {
    return el.getAttribute('data-cn-edition') === 'true' || hasChineseTitleFallback(el);
  }

  function coverWeight(el, container) {
    var type = (el.getAttribute('data-type') || '').toLowerCase();
    var reaction = (el.getAttribute('data-eval') || '').toLowerCase();
    var weight = 1;
    var minWeight = COVER_MIN_WEIGHT;

    if (container.classList.contains('home-covers--books')) {
      if (reaction === 'loved') weight = 6;
      else if (reaction === 'hated') weight = 5;
      else if (reaction === 'liked') weight = 1.4;
      else if (reaction.indexOf('meh') === 0) weight = 0.8;
      else if (reaction === 'disliked') weight = 1.2;

      if (isChineseEdition(el)) {
        weight *= BOOK_CHINESE_EDITION_MULTIPLIER;
        minWeight = BOOK_CHINESE_EDITION_MIN_WEIGHT;
      } else {
        weight *= BOOK_NON_CHINESE_EDITION_MULTIPLIER;
        if (reaction === 'loved') {
          weight *= BOOK_NON_CHINESE_LOVED_MULTIPLIER;
        }
      }
    } else if (container.classList.contains('home-covers--screen')) {
      if (type === 'film') weight *= 2.4;
      if (type === 'tv') weight *= 0.75;
    }

    if (!container.classList.contains('home-covers--books')) {
      if (reaction === 'loved' || reaction === 'hated') weight *= EXTREME_REACTION_MULTIPLIER;
      else if (reaction === 'liked' || reaction === 'disliked') weight *= 1.35;
      else if (reaction.indexOf('meh') === 0) weight *= 0.75;
    }

    return Math.max(weight, minWeight);
  }

  function weightedShuffle(items, container) {
    var pool = items.map(function (el) {
      return { el: el, weight: coverWeight(el, container) };
    });
    var result = [];
    while (pool.length) {
      var total = pool.reduce(function (sum, item) {
        return sum + item.weight;
      }, 0);
      var threshold = Math.random() * total;
      var idx = pool.length - 1;
      for (var i = 0; i < pool.length; i++) {
        threshold -= pool[i].weight;
        if (threshold <= 0) { idx = i; break; }
      }
      result.push(pool.splice(idx, 1)[0].el);
    }
    return result;
  }

  function wideCoverCount(container, wideCount, desktopCount) {
    if (!Number.isNaN(wideCount)) return wideCount;
    if (container.classList.contains('home-covers--screen') || container.classList.contains('home-covers--games')) {
      return 9;
    }
    return desktopCount || 20;
  }

  function initCovers() {
    var containers = Array.prototype.slice.call(document.querySelectorAll('.home-covers'));
    containers.forEach(function (container) {
      var items = Array.prototype.slice.call(container.querySelectorAll('[style*="display:none"], [style*="display: none"]'));
      if (!items.length) return;
      var desktopCount = parseInt(container.getAttribute('data-count'), 10);
      var wideCount = parseInt(container.getAttribute('data-wide-count'), 10);
      var tabletCount = parseInt(container.getAttribute('data-tablet-count'), 10);
      var mobileCount = parseInt(container.getAttribute('data-mobile-count'), 10);
      var count = window.innerWidth <= 480
        ? (mobileCount || 14)
        : (window.innerWidth <= 1023
          ? (tabletCount || desktopCount || 20)
          : (window.innerWidth >= WIDE_SCREEN_MIN ? wideCoverCount(container, wideCount, desktopCount) : (desktopCount || 20)));
      var shuffled = weightedShuffle(items, container);
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
