/* writing-archive.js - filter, search, and shuffle for /writing/ */
(function () {
  'use strict';

  var PAGE_SIZE = 8;

  function initWritingArchive() {
    var strip = document.getElementById('writing-filter-strip');
    var archive = document.getElementById('writing-archive');
    if (!strip || !archive) return;

    var pill = document.getElementById('writing-filter-pill');
    var buttons = Array.prototype.slice.call(strip.querySelectorAll('.writing-filter-btn'));
    var entries = Array.prototype.slice.call(archive.querySelectorAll('.writing-entry--archive'));
    var searchInput = document.getElementById('writing-search');
    var searchClear = document.getElementById('writing-search-clear');
    var luckBtn = document.getElementById('writing-luck-btn');
    var status = document.getElementById('writing-archive-status');
    var paginationWraps = Array.prototype.slice.call(document.querySelectorAll('.writing-pagination'));
    var pageInputs = Array.prototype.slice.call(document.querySelectorAll('.writing-pagination__input'));
    var totalEls = Array.prototype.slice.call(document.querySelectorAll('.writing-pagination__total'));
    var rangeEls = Array.prototype.slice.call(document.querySelectorAll('.writing-pagination__range'));
    var prevBtns = Array.prototype.slice.call(document.querySelectorAll('.writing-pagination__prev'));
    var nextBtns = Array.prototype.slice.call(document.querySelectorAll('.writing-pagination__next'));
    var searchTimer = null;
    var pageInputTimer = null;
    var shuffled = false;
    var currentPage = 1;
    var nonWordRe = /[^a-z0-9\u4e00-\u9fff\s]/g;

    try {
      nonWordRe = new RegExp('[^\\p{L}\\p{N}\\s]', 'gu');
    } catch (e) {}

    if (!buttons.length || !entries.length) return;

    entries.forEach(function (entry, index) {
      entry.dataset.originalIndex = String(index);
    });

    function normalise(value) {
      return (value || '')
        .toLowerCase()
        .replace(nonWordRe, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function currentFilter() {
      var active = strip.querySelector('.writing-filter-btn.active');
      return active ? active.getAttribute('data-filter') : 'all';
    }

    function currentQuery() {
      return searchInput ? normalise(searchInput.value) : '';
    }

    function scrollToFilter() {
      var top = strip.getBoundingClientRect().top + window.pageYOffset - 18;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function terms(query) {
      return query ? query.split(' ').filter(Boolean) : [];
    }

    function entryText(entry) {
      if (entry._cachedText !== undefined) return entry._cachedText;
      entry._cachedText = normalise([
        entry.getAttribute('data-title'),
        entry.getAttribute('data-date'),
        entry.getAttribute('data-kind'),
        entry.getAttribute('data-search'),
        entry.textContent
      ].join(' '));
      return entry._cachedText;
    }

    function matches(entry, filter, query) {
      var kind = entry.getAttribute('data-kind') || '';
      if (filter !== 'all' && kind !== filter) return false;

      var queryTerms = terms(query);
      if (!queryTerms.length) return true;

      var haystack = entryText(entry);
      return queryTerms.every(function (term) {
        return haystack.indexOf(term) !== -1;
      });
    }

    function movePill(button) {
      if (!button || !pill) return;
      var stripBox = strip.getBoundingClientRect();
      var btnBox = button.getBoundingClientRect();
      pill.style.left = (btnBox.left - stripBox.left) + 'px';
      pill.style.width = btnBox.width + 'px';
    }

    function restoreDateOrder() {
      entries = entries.slice().sort(function (a, b) {
        return Number(a.dataset.originalIndex) - Number(b.dataset.originalIndex);
      });
      entries.forEach(function (entry) {
        archive.appendChild(entry);
      });
      shuffled = false;
    }

    function matchedEntries() {
      var filter = currentFilter();
      var query = currentQuery();
      return entries.filter(function (entry) {
        return matches(entry, filter, query);
      });
    }

    function totalPages(count) {
      return Math.max(1, Math.ceil(count / PAGE_SIZE));
    }

    function updatePagination(matched) {
      var total = totalPages(matched.length);
      var start = (currentPage - 1) * PAGE_SIZE;
      var end = Math.min(start + PAGE_SIZE, matched.length);
      var rangeText = matched.length ? (start + 1) + '-' + end + ' of ' + matched.length : '';

      paginationWraps.forEach(function (wrap) {
        wrap.hidden = total <= 1;
      });
      pageInputs.forEach(function (input) {
        input.value = currentPage;
        input.max = total;
      });
      totalEls.forEach(function (el) {
        el.textContent = total;
      });
      rangeEls.forEach(function (el) {
        el.textContent = rangeText;
      });
      prevBtns.forEach(function (btn) {
        btn.disabled = currentPage <= 1;
      });
      nextBtns.forEach(function (btn) {
        btn.disabled = currentPage >= total;
      });
    }

    function render() {
      var matched = matchedEntries();
      var total = totalPages(matched.length);
      if (currentPage > total) currentPage = total;
      if (currentPage < 1) currentPage = 1;

      var start = (currentPage - 1) * PAGE_SIZE;
      var pageEntries = matched.slice(start, start + PAGE_SIZE);
      var pageSet = new Set(pageEntries);

      entries.forEach(function (entry) {
        entry.hidden = !pageSet.has(entry);
      });

      if (status) {
        var label = matched.length === 1 ? 'piece' : 'pieces';
        status.textContent = matched.length ? matched.length + ' ' + label : 'no pieces found';
      }

      if (luckBtn) {
        luckBtn.disabled = matched.length < 2;
        luckBtn.classList.toggle('is-disabled', matched.length < 2);
      }

      updatePagination(matched);
    }

    function shuffle(list) {
      var result = list.slice();
      for (var i = result.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = result[i];
        result[i] = result[j];
        result[j] = tmp;
      }
      return result;
    }

    function applyFilter(options) {
      if (!options || !options.keepOrder) restoreDateOrder();
      if (!options || !options.preservePage) currentPage = 1;
      render();
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        buttons.forEach(function (other) {
          other.classList.remove('active');
        });
        button.classList.add('active');
        movePill(button);
        applyFilter();
      });
    });

    function updateSearchClear() {
      var hasQuery = !!(searchInput && searchInput.value);
      if (searchClear) searchClear.hidden = !hasQuery;
      if (searchInput && searchInput.parentNode) {
        searchInput.parentNode.classList.toggle('has-query', hasQuery);
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        updateSearchClear();
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          applyFilter();
        }, 160);
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', function () {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        updateSearchClear();
        applyFilter();
      });
    }

    if (luckBtn) {
      luckBtn.addEventListener('click', function () {
        var matched = matchedEntries();
        if (matched.length < 2) {
          render();
          return;
        }

        var shuffledMatched = shuffle(matched);
        var unmatched = entries.filter(function (entry) {
          return matched.indexOf(entry) === -1;
        });

        entries = shuffledMatched.concat(unmatched);
        entries.forEach(function (entry) {
          archive.appendChild(entry);
        });
        shuffled = true;
        currentPage = 1;
        render();
        scrollToFilter();
      });
    }

    function goToPage(page) {
      var total = totalPages(matchedEntries().length);
      if (page < 1) page = 1;
      if (page > total) page = total;
      if (page === currentPage) {
        pageInputs.forEach(function (input) {
          input.value = currentPage;
        });
        return;
      }

      currentPage = page;
      render();
      scrollToFilter();
    }

    prevBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        goToPage(currentPage - 1);
      });
    });

    nextBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        goToPage(currentPage + 1);
      });
    });

    function handlePageInput(input) {
      var value = parseInt(input.value, 10);
      if (isNaN(value)) value = currentPage;
      goToPage(value);
    }

    pageInputs.forEach(function (input) {
      input.addEventListener('input', function () {
        clearTimeout(pageInputTimer);
        if (!input.value) return;
        pageInputTimer = setTimeout(function () {
          handlePageInput(input);
        }, 200);
      });

      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          clearTimeout(pageInputTimer);
          handlePageInput(input);
          input.blur();
        }
      });

      input.addEventListener('blur', function () {
        clearTimeout(pageInputTimer);
        handlePageInput(input);
      });
    });

    window.addEventListener('resize', function () {
      movePill(strip.querySelector('.writing-filter-btn.active'));
    });

    setTimeout(function () {
      movePill(strip.querySelector('.writing-filter-btn.active'));
      applyFilter({ keepOrder: shuffled });
      updateSearchClear();
    }, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWritingArchive);
  } else {
    initWritingArchive();
  }
})();
