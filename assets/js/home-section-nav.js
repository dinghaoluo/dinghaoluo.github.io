(function () {
  'use strict';

  function init() {
    var strip = document.querySelector('.home-section-strip');
    var backTop = document.querySelector('[data-home-back-to-top]');
    var mobileMedia = window.matchMedia('(max-width: 991.98px)');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var frame = null;
    var activeId = '';

    function setBackTopVisible(visible) {
      if (!backTop) return;

      backTop.classList.toggle('is-visible', visible);
      backTop.setAttribute('aria-hidden', visible ? 'false' : 'true');
      backTop.tabIndex = visible ? 0 : -1;
    }

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion.matches ? 'auto' : 'smooth'
      });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '#top');
      }
    }

    function initBackTopOnly() {
      function updateBackTopOnly() {
        frame = null;
        setBackTopVisible(window.pageYOffset > 72);
      }

      function requestBackTopOnlyUpdate() {
        if (frame) return;
        frame = window.requestAnimationFrame(updateBackTopOnly);
      }

      if (!backTop) return;

      backTop.addEventListener('click', scrollToTop);
      document.addEventListener('scroll', requestBackTopOnlyUpdate, { passive: true });
      window.addEventListener('resize', requestBackTopOnlyUpdate);
      updateBackTopOnly();
    }

    if (!strip) {
      initBackTopOnly();
      return;
    }

    var scroller = strip.querySelector('.home-section-strip__scroller');
    var links = Array.prototype.slice.call(strip.querySelectorAll('[data-home-section]'));

    var sections = links.map(function(link) {
      var id = link.getAttribute('data-home-section');
      return {
        id: id,
        link: link,
        element: document.getElementById(id)
      };
    }).filter(function(section) {
      return section.element;
    });
    var sectionById = sections.reduce(function(map, section) {
      map[section.id] = section;
      return map;
    }, {});

    if (!sections.length) return;

    function updateStripSpacing() {
      if (!scroller || !links.length) return;

      if (!mobileMedia.matches) {
        scroller.style.removeProperty('--home-strip-start-space');
        scroller.style.removeProperty('--home-strip-end-space');
        return;
      }

      scroller.style.setProperty(
        '--home-strip-start-space',
        Math.max(0, (scroller.clientWidth - links[0].offsetWidth) / 2) + 'px'
      );
      scroller.style.setProperty(
        '--home-strip-end-space',
        Math.max(0, (scroller.clientWidth - links[links.length - 1].offsetWidth) / 2) + 'px'
      );
    }

    function scrollActiveLink(link) {
      if (!scroller || !link) return;

      if (mobileMedia.matches) {
        if (!strip.classList.contains('is-visible')) return;
        updateStripSpacing();

        var left = link.offsetLeft + (link.offsetWidth / 2) - (scroller.clientWidth / 2);
        scroller.scrollTo({
          left: Math.max(0, left),
          behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
        return;
      }

      if (scroller.scrollHeight > scroller.clientHeight) {
        var top = link.offsetTop - ((scroller.clientHeight - link.offsetHeight) / 2);
        scroller.scrollTo({
          top: Math.max(0, top),
          behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
      }
    }

    function setActive(id) {
      if (activeId === id) return;
      activeId = id || '';

      sections.forEach(function(section) {
        var active = section.id === activeId;
        section.link.classList.toggle('is-active', active);
        if (active) {
          section.link.setAttribute('aria-current', 'location');
          scrollActiveLink(section.link);
        } else {
          section.link.removeAttribute('aria-current');
        }
      });
    }

    function currentSectionId() {
      var line = mobileMedia.matches
        ? Math.max(strip.offsetHeight + 12, window.innerHeight * 0.35)
        : window.innerHeight * 0.38;
      var current = sections[0].id;

      sections.forEach(function(section) {
        if (section.element.getBoundingClientRect().top <= line) {
          current = section.id;
        }
      });

      return current;
    }

    function revealOffset() {
      return mobileMedia.matches ? Math.max(strip.offsetHeight + 12, 72) : 72;
    }

    function update() {
      frame = null;

      var entered = sections[0].element.getBoundingClientRect().top <= revealOffset();
      updateStripSpacing();
      strip.classList.toggle('is-visible', entered);
      setBackTopVisible(entered);

      if (entered) {
        setActive(currentSectionId());
      } else {
        setActive('');
      }
    }

    function requestUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    document.addEventListener('click', function(event) {
      var anchor = event.target.closest('a[href^="#"]');
      var id;
      var section;
      var targetTop;

      if (!anchor) return;
      if (!mobileMedia.matches && !anchor.closest('.home-section-strip')) return;

      id = anchor.getAttribute('href').slice(1);

      if (id === 'top') {
        event.preventDefault();
        setActive('');
        scrollToTop();
        return;
      }

      section = sectionById[id];
      if (!section) return;

      event.preventDefault();
      setActive(id);
      targetTop = section.element.getBoundingClientRect().top + window.pageYOffset - (
        mobileMedia.matches ? strip.offsetHeight + 10 : 18
      );
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: reducedMotion.matches ? 'auto' : 'smooth'
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '#' + id);
      }
    }, true);

    if (backTop) {
      backTop.addEventListener('click', function() {
        setActive('');
        scrollToTop();
      });
    }

    document.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    if (mobileMedia.addEventListener) {
      mobileMedia.addEventListener('change', requestUpdate);
    } else if (mobileMedia.addListener) {
      mobileMedia.addListener(requestUpdate);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(requestUpdate).catch(function() {});
    }

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
