/* album-wall.js — search, weighted shuffle, expand/collapse, and pagination for the music album grid */
(function () {
  'use strict';

  function init() {
    var grid = document.getElementById('album-wall-grid');
    if (!grid) return;

    var filterStrip = document.getElementById('album-wall-filter-strip');
    var filterPill = document.getElementById('album-wall-filter-pill');
    var filterBtns = filterStrip ? Array.prototype.slice.call(filterStrip.querySelectorAll('.album-wall__filter-btn')) : [];
    var searchInput = document.getElementById('album-wall-search');
    var searchClear = document.getElementById('album-wall-search-clear');
    var luckBtn = document.getElementById('album-wall-luck');
    var paginationWraps = document.querySelectorAll('.album-wall__pagination');
    var prevBtns = document.querySelectorAll('.album-wall__prev');
    var nextBtns = document.querySelectorAll('.album-wall__next');
    var pageInputs = document.querySelectorAll('.album-wall__page-input');
    var totalPagesEls = document.querySelectorAll('.album-wall__total-pages');
    var rangeEls = document.querySelectorAll('.album-wall__range');

    var tiles = Array.prototype.slice.call(grid.querySelectorAll('.album-tile'));
    var searchTimer = null;
    var pageInputTimer = null;
    var currentPage = 1;
    var matchedTiles = tiles.slice();
    var isShuffled = false;

    tiles.forEach(function (tile, i) {
      tile.dataset.originalIndex = String(i);
    });

    // expand/collapse on tile click
    tiles.forEach(function (tile) {
      var wrap = tile.querySelector('.album-tile__preview-wrap');
      var toggle = tile.querySelector('.album-tile__toggle');
      if (!wrap) return;

      var collapsedH = 0;
      function measureCollapsed() {
        if (collapsedH === 0 && wrap.offsetHeight > 0) collapsedH = wrap.offsetHeight;
      }

      tile.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        measureCollapsed();

        if (tile.classList.contains('is-open')) {
          var currentH = wrap.offsetHeight;
          wrap.style.maxHeight = currentH + 'px';
          void wrap.offsetHeight;
          tile.classList.remove('is-open');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
          wrap.style.transition = 'max-height 0.32s ease';
          wrap.style.maxHeight = (collapsedH || '3.6em') + (collapsedH ? 'px' : '');
          wrap.addEventListener('transitionend', function handler() {
            wrap.style.maxHeight = '';
            wrap.style.transition = '';
            wrap.removeEventListener('transitionend', handler);
          });
        } else {
          tiles.forEach(function (other) {
            if (other === tile || !other.classList.contains('is-open')) return;
            var ow = other.querySelector('.album-tile__preview-wrap');
            var ot = other.querySelector('.album-tile__toggle');
            if (!ow) return;
            var ch = ow.offsetHeight;
            ow.style.maxHeight = ch + 'px';
            void ow.offsetHeight;
            other.classList.remove('is-open');
            if (ot) ot.setAttribute('aria-expanded', 'false');
            ow.style.transition = 'max-height 0.32s ease';
            ow.style.maxHeight = '';
            ow.addEventListener('transitionend', function handler() {
              ow.style.transition = '';
              ow.removeEventListener('transitionend', handler);
            });
          });

          var startH = wrap.offsetHeight;
          wrap.style.maxHeight = 'none';
          var targetH = wrap.scrollHeight;
          wrap.style.maxHeight = startH + 'px';
          void wrap.offsetHeight;
          tile.classList.add('is-open');
          if (toggle) toggle.setAttribute('aria-expanded', 'true');
          wrap.style.transition = 'max-height 0.42s ease';
          wrap.style.maxHeight = targetH + 'px';
          wrap.addEventListener('transitionend', function handler() {
            wrap.style.maxHeight = 'none';
            wrap.style.transition = '';
            wrap.removeEventListener('transitionend', handler);
            tile.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      });
    });

    function getColumns() {
      if (!tiles.length) return 5;
      var gridWidth = grid.offsetWidth;
      var tileWidth = tiles[0].offsetWidth;
      if (!tileWidth) return 5;
      return Math.max(1, Math.round(gridWidth / tileWidth));
    }

    function pageSize() {
      return getColumns() * 6;
    }

    function normalise(str) {
      return (str || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function currentQuery() {
      return searchInput ? normalise(searchInput.value) : '';
    }

    function currentFilter() {
      if (!filterStrip) return 'all';
      var active = filterStrip.querySelector('.album-wall__filter-btn.active');
      return active ? active.getAttribute('data-filter') : 'all';
    }

    function setFilter(filterValue) {
      filterBtns.forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filterValue);
      });
      moveFilterPill(filterStrip ? filterStrip.querySelector('.album-wall__filter-btn.active') : null);
    }

    function moveFilterPill(btn) {
      if (!btn || !filterPill || !filterStrip) return;
      var stripBox = filterStrip.getBoundingClientRect();
      var btnBox = btn.getBoundingClientRect();
      filterPill.style.left = (btnBox.left - stripBox.left) + 'px';
      filterPill.style.width = btnBox.width + 'px';
    }

    function queryTerms(q) {
      return q ? q.split(' ').filter(Boolean) : [];
    }

    function tileMatchesQuery(tile, q) {
      if (!q) return true;
      var terms = queryTerms(q);
      if (!terms.length) return true;
      var haystack = normalise([
        tile.getAttribute('data-title'),
        tile.getAttribute('data-artist'),
        tile.getAttribute('data-genre'),
        tile.getAttribute('data-year'),
        tile.getAttribute('data-eval'),
        tile.getAttribute('data-text')
      ].join(' '));
      return terms.every(function (t) { return haystack.indexOf(t) !== -1; });
    }

    function tileMatchesFilter(tile, filter) {
      if (!filter || filter === 'all') return true;

      var genre = normalise(tile.getAttribute('data-genre'));
      if (!genre) return false;

      if (filter === 'prog-art') {
        return (genre.indexOf('prog') !== -1 && genre.indexOf('metal') === -1)
          || genre.indexOf('art rock') !== -1
          || genre.indexOf('canterbury') !== -1;
      }

      if (filter === 'jazz') {
        return genre.indexOf('jazz') !== -1 || genre.indexOf('fusion') !== -1;
      }

      if (filter === 'prog-metal') {
        return genre.indexOf('progressive metal') !== -1 || genre.indexOf('prog metal') !== -1;
      }

      return false;
    }

    function reactionWeight(tile) {
      var r = (tile.getAttribute('data-eval') || '').toLowerCase();
      if (r === 'loved' || r === 'hated') return 5;
      if (r === 'liked' || r === 'disliked') return 3;
      return 1;
    }

    function weightedShuffle(list) {
      var pool = list.slice();
      var result = [];
      while (pool.length) {
        var total = pool.reduce(function (s, t) { return s + reactionWeight(t); }, 0);
        var threshold = Math.random() * total;
        var idx = pool.length - 1;
        for (var i = 0; i < pool.length; i++) {
          threshold -= reactionWeight(pool[i]);
          if (threshold <= 0) { idx = i; break; }
        }
        result.push(pool.splice(idx, 1)[0]);
      }
      return result;
    }

    function totalPages() {
      return Math.max(1, Math.ceil(matchedTiles.length / pageSize()));
    }

    function updatePagination() {
      var tp = totalPages();
      if (currentPage > tp) currentPage = tp;
      if (currentPage < 1) currentPage = 1;
      var ps = pageSize();
      var start = (currentPage - 1) * ps;
      var end = Math.min(start + ps, matchedTiles.length);
      var rangeText = matchedTiles.length ? (start + 1) + '–' + end + ' of ' + matchedTiles.length : '';
      pageInputs.forEach(function (el) { el.value = currentPage; el.max = tp; });
      totalPagesEls.forEach(function (el) { el.textContent = tp; });
      rangeEls.forEach(function (el) { el.textContent = rangeText; });
      prevBtns.forEach(function (btn) { btn.disabled = currentPage <= 1; });
      nextBtns.forEach(function (btn) { btn.disabled = currentPage >= tp; });
      paginationWraps.forEach(function (wrap) { wrap.hidden = tp <= 1; });
    }

    function updateLuckState() {
      if (!luckBtn) return;
      var has = matchedTiles.length > 0;
      luckBtn.disabled = !has;
      luckBtn.classList.toggle('is-disabled', !has);
    }

    function renderPage() {
      var tp = totalPages();
      if (currentPage > tp) currentPage = tp;
      if (currentPage < 1) currentPage = 1;

      var ps = pageSize();
      var start = (currentPage - 1) * ps;
      var end = start + ps;
      var pageSet = matchedTiles.slice(start, end);
      var visible = new Set(pageSet);

      tiles.forEach(function (tile) {
        var shouldShow = visible.has(tile);
        if (shouldShow) {
          tile.style.display = '';
          tile.offsetHeight;
          tile.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
          tile.style.opacity = '1';
          tile.style.transform = 'translateY(0)';
        } else {
          tile.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
          tile.style.opacity = '0';
          tile.style.transform = 'translateY(4px)';
          setTimeout(function () {
            if (tile.style.opacity === '0') tile.style.display = 'none';
          }, 230);
        }
      });

      updatePagination();
      updateLuckState();
    }

    function reorderTiles(ordered) {
      ordered.forEach(function (tile) { grid.appendChild(tile); });
    }

    function tileRelevance(tile, query) {
      if (!query) return 0;
      var title = normalise(tile.getAttribute('data-title'));
      var artist = normalise(tile.getAttribute('data-artist'));
      var genre = normalise(tile.getAttribute('data-genre'));
      var year = normalise(tile.getAttribute('data-year'));
      var reaction = normalise(tile.getAttribute('data-eval'));
      var text = normalise(tile.getAttribute('data-text'));
      var score = 0;

      if (title === query) score = 100;
      else if (title.indexOf(query) === 0) score = 80;
      else if ((' ' + title + ' ').indexOf(' ' + query + ' ') !== -1) score = 60;
      else if (title.indexOf(query) !== -1) score = 40;
      else if (artist === query) score = 30;
      else if (artist.indexOf(query) !== -1) score = 20;
      else if (year.indexOf(query) !== -1 || genre.indexOf(query) !== -1 || reaction.indexOf(query) !== -1) score = 10;
      else if (text.indexOf(query) !== -1) score = 5;

      var terms = queryTerms(query);
      if (terms.length > 1) {
        var titleHits = terms.filter(function (t) { return title.indexOf(t) !== -1; }).length;
        score += titleHits * 5;
      }
      return score;
    }

    function computeMatched(query, filter) {
      var matched = tiles.filter(function (tile) {
        return tileMatchesFilter(tile, filter) && tileMatchesQuery(tile, query);
      });
      if (query) {
        matched.sort(function (a, b) {
          return tileRelevance(b, query) - tileRelevance(a, query);
        });
      }
      return matched;
    }

    function restoreChronologicalOrder() {
      reorderTiles(tiles.slice().sort(function (a, b) {
        return Number(a.dataset.originalIndex) - Number(b.dataset.originalIndex);
      }));
      isShuffled = false;
    }

    function applyFilter() {
      var query = currentQuery();
      matchedTiles = computeMatched(query, currentFilter());
      if (query) {
        reorderTiles(matchedTiles.concat(tiles.filter(function (t) {
          return matchedTiles.indexOf(t) === -1;
        })));
      } else if (!isShuffled) {
        restoreChronologicalOrder();
      }
      currentPage = 1;
      renderPage();
    }

    // initial render
    var handledHash = handleHash();
    if (!handledHash) {
      applyFilter();
    }
    setTimeout(function () {
      moveFilterPill(filterStrip ? filterStrip.querySelector('.album-wall__filter-btn.active') : null);
    }, 80);

    function handleHash() {
      var hash = window.location.hash;
      if (!hash || hash.length < 2) return false;
      var targetId = hash.slice(1);
      var target = document.getElementById(targetId);
      if (!target || !target.classList.contains('album-tile')) return false;

      if (searchInput) searchInput.value = '';
      setFilter('all');
      matchedTiles = computeMatched('', 'all');
      var idx = matchedTiles.indexOf(target);
      if (idx === -1) return false;

      var ps = pageSize();
      currentPage = Math.floor(idx / ps) + 1;
      renderPage();

      setTimeout(function () {
        if (!target.classList.contains('is-open')) {
          target.click();
        }
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }, 350);

      return true;
    }

    function updateSearchClear() {
      if (searchClear) searchClear.hidden = !searchInput || !searchInput.value;
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        updateSearchClear();
        clearTimeout(searchTimer);
        searchTimer = setTimeout(applyFilter, 180);
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', function () {
        if (searchInput) { searchInput.value = ''; searchInput.focus(); }
        updateSearchClear();
        applyFilter();
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setFilter(btn.getAttribute('data-filter'));
        isShuffled = false;
        currentPage = 1;
        applyFilter();
      });
    });

    if (luckBtn) {
      luckBtn.addEventListener('click', function () {
        if (!matchedTiles.length) return;
        matchedTiles = weightedShuffle(matchedTiles);
        reorderTiles(matchedTiles.concat(tiles.filter(function (t) {
          return matchedTiles.indexOf(t) === -1;
        })));
        isShuffled = true;
        currentPage = 1;
        renderPage();
      });
    }

    var wall = document.getElementById('album-wall');

    function scrollToFilter() {
      var target = filterStrip || wall;
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.pageYOffset - 18;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
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
      renderPage();
      moveFilterPill(filterStrip ? filterStrip.querySelector('.album-wall__filter-btn.active') : null);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
