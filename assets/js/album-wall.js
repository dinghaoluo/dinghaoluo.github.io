/* album-wall.js — search, weighted shuffle, expand/collapse, and pagination for the music album grid */
(function () {
  'use strict';

  function init() {
    var grid = document.getElementById('album-wall-grid');
    if (!grid) return;

    var searchInput = document.getElementById('album-wall-search');
    var luckBtn = document.getElementById('album-wall-luck');
    var pagination = document.getElementById('album-wall-pagination');
    var prevBtn = document.getElementById('album-wall-prev');
    var nextBtn = document.getElementById('album-wall-next');
    var currentEl = document.getElementById('album-wall-current');
    var totalEl = document.getElementById('album-wall-total');

    var tiles = Array.prototype.slice.call(grid.querySelectorAll('.album-tile'));
    var searchTimer = null;
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
      currentEl.textContent = currentPage;
      totalEl.textContent = tp;
      prevBtn.disabled = currentPage <= 1;
      nextBtn.disabled = currentPage >= tp;
      pagination.hidden = tp <= 1;
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

    function computeMatched(query) {
      return tiles.filter(function (tile) { return tileMatchesQuery(tile, query); });
    }

    function applyFilter() {
      var query = currentQuery();
      matchedTiles = computeMatched(query);
      currentPage = 1;
      renderPage();
    }

    // initial render
    applyFilter();

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(applyFilter, 180);
      });
    }

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

    prevBtn.addEventListener('click', function () {
      if (currentPage > 1) { currentPage--; renderPage(); }
    });

    nextBtn.addEventListener('click', function () {
      if (currentPage < totalPages()) { currentPage++; renderPage(); }
    });

    window.addEventListener('resize', function () {
      renderPage();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
