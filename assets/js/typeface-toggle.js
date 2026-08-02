(function () {
  'use strict';

  var btn = document.getElementById('typeface-toggle');
  if (!btn) return;

  // cycle order: Piazzolla (default) → STIX Two Text → Literata
  var cycle = [
    ['piazzolla',  'Piazzolla'],
    ['stix',       'STIX Two Text'],
    ['literata',   'Literata']
  ];

  function currentIndex() {
    var v = document.documentElement.getAttribute('data-serif');
    for (var i = 0; i < cycle.length; i++) if (cycle[i][0] === v) return i;
    return 0;
  }

  function applyTypeface(idx, announceName) {
    var entry = cycle[idx];
    document.documentElement.setAttribute('data-serif', entry[0]);
    localStorage.setItem('typeface', entry[0]);

    if (announceName) {
      btn.setAttribute('data-typeface-label', entry[1]);
      btn.setAttribute('title', 'Typeface: ' + entry[1]);
      // After 1.6s, revert to the neutral hover label so the next hover reads
      // as an invitation ("change typeface") rather than a stale confirmation.
      clearTimeout(btn._revertTimer);
      btn._revertTimer = setTimeout(function () {
        btn.setAttribute('data-typeface-label', 'change typeface');
        btn.setAttribute('title', 'Change typeface (current: ' + entry[1] + ')');
      }, 1600);
    } else {
      btn.setAttribute('data-typeface-label', 'change typeface');
      btn.setAttribute('title', 'Change typeface (current: ' + entry[1] + ')');
    }
  }

  btn.addEventListener('click', function () {
    var next = (currentIndex() + 1) % cycle.length;
    applyTypeface(next, true);
  });

  // Initial title reflects the currently-applied typeface without triggering
  // the timed announce animation.
  applyTypeface(currentIndex(), false);
})();
