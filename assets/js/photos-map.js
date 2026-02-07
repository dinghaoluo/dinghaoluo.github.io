(function () {
  var body = document.body;
  if (!body || !body.classList.contains('photos-page')) return;

  var sectionPins = Array.prototype.slice.call(document.querySelectorAll('.photo-map-pin[data-section]'));
  var clusterPins = Array.prototype.slice.call(document.querySelectorAll('.photo-map-pin[data-map-cluster]'));
  var localMaps = Array.prototype.slice.call(document.querySelectorAll('[data-map-local]'));
  var localDeck = document.querySelector('[data-map-local-deck]');

  function setSelectedSection(section) {
    sectionPins.forEach(function (pin) {
      pin.classList.toggle('is-active', pin.getAttribute('data-section') === section);
    });
  }

  function closeLocalMaps() {
    localMaps.forEach(function (map) {
      map.hidden = true;
      map.setAttribute('aria-hidden', 'true');
      map.classList.remove('is-open');
    });
    clusterPins.forEach(function (pin) {
      pin.classList.remove('is-active');
      pin.setAttribute('aria-expanded', 'false');
    });
    if (localDeck) localDeck.classList.remove('has-open-map');
  }

  function openCluster(cluster) {
    var opened = false;

    localMaps.forEach(function (map) {
      var isMatch = map.getAttribute('data-map-local') === cluster;
      map.hidden = !isMatch;
      map.setAttribute('aria-hidden', isMatch ? 'false' : 'true');
      map.classList.toggle('is-open', isMatch);
      if (isMatch) opened = true;
    });

    clusterPins.forEach(function (pin) {
      var isMatch = pin.getAttribute('data-map-cluster') === cluster;
      pin.classList.toggle('is-active', isMatch);
      pin.setAttribute('aria-expanded', isMatch ? 'true' : 'false');
    });

    sectionPins.forEach(function (pin) { pin.classList.remove('is-active'); });
    if (localDeck) localDeck.classList.toggle('has-open-map', opened);
  }

  clusterPins.forEach(function (pin) {
    pin.addEventListener('click', function () {
      openCluster(pin.getAttribute('data-map-cluster'));
    });
  });

  sectionPins.forEach(function (pin) {
    pin.addEventListener('click', function () {
      var section = pin.getAttribute('data-section');
      setSelectedSection(section);
      if (!pin.closest('[data-map-local]')) closeLocalMaps();
    });
  });
}());