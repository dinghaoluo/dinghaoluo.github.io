(function () {
  var body = document.body;
  if (!body || !body.classList.contains('photos-page')) return;

  var pins = Array.prototype.slice.call(document.querySelectorAll('.photo-map-pin[data-section]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('.photo-section[id]'));
  if (!pins.length || !sections.length || !('IntersectionObserver' in window)) return;

  function setActive(id) {
    pins.forEach(function (pin) {
      pin.classList.toggle('is-active', pin.getAttribute('data-section') === id);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    var visible = entries
      .filter(function (entry) { return entry.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
    if (visible && visible.target && visible.target.id) setActive(visible.target.id);
  }, {
    root: null,
    threshold: [0.18, 0.35, 0.55],
    rootMargin: '-22% 0px -48% 0px'
  });

  sections.forEach(function (section) { observer.observe(section); });
  setActive(sections[0].id);
}());
