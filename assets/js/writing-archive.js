/* writing-archive.js - filter and search for the writing archive */
(function () {
  'use strict';

  // third time writing normalise, but this file is small enough it doesn't matter
  function normalise(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var archive = document.querySelector('.writing-archive');
    if (!archive) return;

    var entries = Array.from(archive.querySelectorAll('.writing-archive-entry'));
    var searchInput = archive.querySelector('.writing-search-input');
    var filterBtns = Array.from(archive.querySelectorAll('.writing-filter-btn'));
    var activeFilter = 'all';

    if (!entries.length) return;

    function entryMatchesFilter(entry) {
      if (activeFilter === 'all') return true;
      return (entry.getAttribute('data-category') || '') === activeFilter;
    }

    function entryMatchesQuery(entry, query) {
      if (!query) return true;
      var haystack = normalise([
        entry.getAttribute('data-title'),
        entry.getAttribute('data-year'),
        entry.getAttribute('data-category')
      ].join(' '));
      return query.split(' ').every(function (t) {
        return haystack.indexOf(t) !== -1;
      });
    }

    function applyFilter() {
      var query = searchInput ? normalise(searchInput.value) : '';
      entries.forEach(function (entry) {
        var show = entryMatchesFilter(entry) && entryMatchesQuery(entry, query);
        entry.style.display = show ? '' : 'none';
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeFilter = btn.getAttribute('data-filter') || 'all';
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
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

    applyFilter();
  });
})();
