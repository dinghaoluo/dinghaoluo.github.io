(function () {
  var body = document.body;
  if (!body || !body.classList.contains('photos-page')) return;

  var pins = Array.prototype.slice.call(document.querySelectorAll('.photo-map-pin[data-section]'));
  if (!pins.length) return;

  function setSelected(section) {
    pins.forEach(function (pin) {
      pin.classList.toggle('is-active', pin.getAttribute('data-section') === section);
    });
  }

  pins.forEach(function (pin) {
    pin.addEventListener('click', function () {
      setSelected(pin.getAttribute('data-section'));
    });
  });
}());
