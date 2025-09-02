/* thoughts-cards.js - smooth expand/collapse for thought cards */
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

/* thoughts filter strip - category filtering, search, weighted reshuffle, pagination, and hash navigation */
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
      card.querySelectorAll('mark.thoughts-highlight').forEach(function (mark) {
        mark.replaceWith(mark.textContent);
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
      var selectors = '.thoughts-card__title, .thoughts-card__creator, .thoughts-card__text';
      card.querySelectorAll(selectors).forEach(function (el) {
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        var node;
        while ((node = walker.nextNode())) {
          if (!regex.test(node.nodeValue)) continue;
          regex.lastIndex = 0;
          var frag = document.createDocumentFragment();
          var text = node.nodeValue;
          var lastIdx = 0;
          var match;
          while ((match = regex.exec(text))) {
            if (match.index > lastIdx) {
              frag.appendChild(document.createTextNode(text.slice(lastIdx, match.index)));
            }
            var mark = document.createElement('mark');
            mark.className = 'thoughts-highlight';
            mark.textContent = match[1];
            frag.appendChild(mark);
            lastIdx = regex.lastIndex;
          }
          if (lastIdx < text.length) {
            frag.appendChild(document.createTextNode(text.slice(lastIdx)));
          }
          node.parentNode.replaceChild(frag, node);
        }
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
