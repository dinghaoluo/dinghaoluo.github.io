/* thoughts-cards.js - expand/collapse for thought cards */
(function () {
  'use strict';

  function normalise(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function totalPages(count, perPage) {
    return Math.max(1, Math.ceil(count / perPage));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var cardsRoot = document.getElementById('thoughts-cards');
    if (!cardsRoot) return;

    var cards = Array.from(cardsRoot.querySelectorAll('.thoughts-card'));
    var btns = Array.from(document.querySelectorAll('.thoughts-filter-btn'));
    var searchInput = document.querySelector('.thoughts-search-input');
    var PAGE_SIZE = 32;
    var currentPage = 1;
    var activeFilter = 'all';
    var matchedCards = cards.slice();

    if (!cards.length) return;

    function cardMatchesFilter(card) {
      if (activeFilter === 'all') return true;
      return card.getAttribute('data-type') === activeFilter;
    }

    function cardMatchesQuery(card, query) {
      if (!query) return true;
      var haystack = normalise([
        card.getAttribute('data-title'),
        card.getAttribute('data-author'),
        card.getAttribute('data-year'),
        card.getAttribute('data-type')
      ].join(' '));
      return query.split(' ').every(function (term) {
        return haystack.indexOf(term) !== -1;
      });
    }

    function applyFilter() {
      var query = searchInput ? normalise(searchInput.value) : '';
      matchedCards = cards.filter(function (card) {
        return cardMatchesFilter(card) && cardMatchesQuery(card, query);
      });
      currentPage = 1;
      render();
    }

    function render() {
      var start = (currentPage - 1) * PAGE_SIZE;
      var end = start + PAGE_SIZE;
      cards.forEach(function (card) { card.style.display = 'none'; });
      matchedCards.slice(start, end).forEach(function (card) {
        card.style.display = '';
      });
      updatePaginationUI();
    }

    // duplicating pagination logic, should extract at some point
    function updatePaginationUI() {
      var tp = totalPages(matchedCards.length, PAGE_SIZE);
      var pageInputs = document.querySelectorAll('.thoughts-page-input');
      var totalEls = document.querySelectorAll('.thoughts-page-total');
      var prevBtns = document.querySelectorAll('.thoughts-prev-btn');
      var nextBtns = document.querySelectorAll('.thoughts-next-btn');
      pageInputs.forEach(function (el) { el.value = currentPage; el.max = tp; });
      totalEls.forEach(function (el) { el.textContent = tp; });
      prevBtns.forEach(function (btn) { btn.disabled = currentPage <= 1; });
      nextBtns.forEach(function (btn) { btn.disabled = currentPage >= tp; });
    }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeFilter = btn.getAttribute('data-filter') || 'all';
        if (searchInput) searchInput.value = '';
        btns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        applyFilter();
      });
    });

    if (searchInput) {
      var timer = null;
      searchInput.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(applyFilter, 200);
      });
    }

    document.querySelectorAll('.thoughts-prev-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentPage > 1) { currentPage--; render(); }
      });
    });
    document.querySelectorAll('.thoughts-next-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentPage < totalPages(matchedCards.length, PAGE_SIZE)) {
          currentPage++; render();
        }
      });
    });

    // expand on card click
    cardsRoot.addEventListener('click', function (event) {
      var card = event.target.closest ? event.target.closest('.thoughts-card') : null;
      if (!card || !cardsRoot.contains(card)) return;
      if (event.target.closest('a, button')) return;

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
        card.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        wrap.addEventListener('transitionend', function handler() {
          wrap.style.maxHeight  = '';
          wrap.style.transition = '';
          wrap.removeEventListener('transitionend', handler);
        });
      } else {
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

    applyFilter();
  });
})();
