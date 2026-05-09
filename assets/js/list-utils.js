/* list-utils.js — shared utilities for filter/search/pagination pages */
(function () {
  'use strict';

  var nonWordRe = /[^a-z0-9一-鿿\s]/g;
  try {
    nonWordRe = new RegExp('[^\\p{L}\\p{N}\\s]', 'gu');
  } catch (e) {}

  function normalise(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(nonWordRe, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function scrollToFilter(strip) {
    if (!strip) return;
    var top = strip.getBoundingClientRect().top + window.pageYOffset - 18;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  function movePill(container, pillEl, target) {
    if (!container || !pillEl || !target) return;
    var sr = container.getBoundingClientRect();
    var br = target.getBoundingClientRect();
    pillEl.style.left = (br.left - sr.left) + 'px';
    pillEl.style.width = br.width + 'px';
  }

  function updateSearchClear(input, clearBtn) {
    var hasQuery = !!(input && input.value);
    if (clearBtn) clearBtn.hidden = !hasQuery;
    if (input && input.parentNode) {
      input.parentNode.classList.toggle('has-query', hasQuery);
    }
  }

  function debounce(fn, ms) {
    var timer = null;
    return function () {
      clearTimeout(timer);
      var args = arguments;
      var ctx = this;
      timer = setTimeout(function () { fn.apply(ctx, args); }, ms);
    };
  }

  function totalPages(matchedCount, perPage) {
    return Math.max(1, Math.ceil(matchedCount / perPage));
  }

  function updatePagination(opts) {
    var page = opts.page;
    var tp = opts.totalPages;
    var perPage = opts.perPage;
    var matchedCount = opts.matchedCount;
    var start = (page - 1) * perPage;
    var end = Math.min(start + perPage, matchedCount);
    var rangeText = matchedCount ? (start + 1) + '–' + end + ' of ' + matchedCount : '';

    if (opts.inputEls) {
      opts.inputEls.forEach(function (el) { el.value = page; el.max = tp; });
    }
    if (opts.totalEls) {
      opts.totalEls.forEach(function (el) { el.textContent = tp; });
    }
    if (opts.rangeEls) {
      opts.rangeEls.forEach(function (el) { el.textContent = rangeText; });
    }
    if (opts.prevBtns) {
      opts.prevBtns.forEach(function (btn) { btn.disabled = page <= 1; });
    }
    if (opts.nextBtns) {
      opts.nextBtns.forEach(function (btn) { btn.disabled = page >= tp; });
    }
    if (opts.navEls) {
      opts.navEls.forEach(function (wrap) { wrap.hidden = tp <= 1; });
    }
  }

  function handlePageInput(inputEl, totalPagesFn, goToPageFn) {
    var val = parseInt(inputEl.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    var tp = totalPagesFn();
    if (val > tp) val = tp;
    goToPageFn(val);
  }

  function weightedShuffle(items, weightFn) {
    var pool = items.slice();
    var result = [];
    while (pool.length) {
      var total = 0;
      for (var i = 0; i < pool.length; i++) total += weightFn(pool[i]);
      var threshold = Math.random() * total;
      var idx = pool.length - 1;
      for (var j = 0; j < pool.length; j++) {
        threshold -= weightFn(pool[j]);
        if (threshold <= 0) { idx = j; break; }
      }
      result.push(pool.splice(idx, 1)[0]);
    }
    return result;
  }

  function restoreOrder(items, container, attr) {
    var sorted = items.slice().sort(function (a, b) {
      return Number(a.dataset[attr]) - Number(b.dataset[attr]);
    });
    var fragment = document.createDocumentFragment();
    sorted.forEach(function (item) { fragment.appendChild(item); });
    container.appendChild(fragment);
    return sorted;
  }

  function handleHash(opts) {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) return false;
    var targetId = decodeURIComponent(hash.slice(1));
    var target = document.getElementById(targetId);
    if (!target || !opts.matches(target)) return false;

    if (opts.prepare) opts.prepare(target);

    var items = opts.items();
    var idx = items.indexOf(target);
    if (idx === -1 && opts.fallback) {
      opts.fallback(target);
      items = opts.items();
      idx = items.indexOf(target);
    }
    if (idx === -1) return false;

    var perPage = opts.perPage();
    opts.setPage(Math.floor(idx / perPage) + 1);
    opts.render();

    setTimeout(function () {
      if (opts.open) {
        opts.open(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);

    return true;
  }

  window.ListUtils = {
    normalise: normalise,
    escapeRegExp: escapeRegExp,
    scrollToFilter: scrollToFilter,
    movePill: movePill,
    updateSearchClear: updateSearchClear,
    debounce: debounce,
    totalPages: totalPages,
    updatePagination: updatePagination,
    handlePageInput: handlePageInput,
    weightedShuffle: weightedShuffle,
    restoreOrder: restoreOrder,
    handleHash: handleHash
  };
})();
