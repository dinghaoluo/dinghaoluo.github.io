---
layout: single
author_profile: true
permalink: /music/
title: "music"
---

<style>
  .music-player-wrap {
    max-width: 480px;
    margin: 2.4rem 0 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .music-track {
    border-radius: 0.28rem;
    overflow: hidden;
    border: 1px solid rgba(127, 118, 111, 0.10);
    box-shadow: 0 1px 4px rgba(63, 57, 52, 0.03);
  }

  .music-track iframe {
    display: block;
    width: 100%;
    height: 42px;
    border: none;
  }

  .music-note {
    margin: 0.6rem 0 0;
    font-size: 0.78rem;
    color: #a79f97;
    font-style: italic;
    letter-spacing: 0.005em;
  }

  @media (prefers-color-scheme: dark) {
    html:not([data-theme="light"]) .music-track {
      border-color: rgba(155, 146, 138, 0.16);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    html:not([data-theme="light"]) .music-note {
      color: #6a6360;
    }
  }

  html[data-theme="dark"] .music-track {
    border-color: rgba(155, 146, 138, 0.16);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  html[data-theme="dark"] .music-note {
    color: #6a6360;
  }
</style>

*Sound made under another name.*

---

<div class="music-player-wrap">
  <div class="music-track"><iframe class="bc-track" data-track="1915815379" seamless><a href="https://amoxitoxin.bandcamp.com/track/kitty-kat-and-the-stars">宇宙貓 (kitty kat and the stars)</a></iframe></div>
  <div class="music-track"><iframe class="bc-track" data-track="2704602144" seamless><a href="https://amoxitoxin.bandcamp.com/track/central-pattern-generator">中樞模式發生器 (central pattern generator)</a></iframe></div>
  <div class="music-track"><iframe class="bc-track" data-track="3943970932" seamless><a href="https://amoxitoxin.bandcamp.com/track/feat-reflections">倒影 (feat. 王江山) (reflections)</a></iframe></div>
  <div class="music-track"><iframe class="bc-track" data-track="745767449" seamless><a href="https://amoxitoxin.bandcamp.com/track/the-rain-on-the-cam">雨後康河無人泛舟 (the rain on the Cam)</a></iframe></div>
  <div class="music-track"><iframe class="bc-track" data-track="1667904940" seamless><a href="https://amoxitoxin.bandcamp.com/track/the-maze">迷宮 (the maze)</a></iframe></div>
</div>

<p class="music-note">All releases are on <a href="https://amoxitoxin.bandcamp.com/">Bandcamp</a>.</p>

<script>
  (function () {
    var base = 'https://bandcamp.com/EmbeddedPlayer/size=small/artwork=small/transparent=false/';
    var lightSuffix = 'bgcol=faf7f2/linkcol=8d6959/';
    var darkSuffix  = 'bgcol=1c1917/linkcol=c49a85/';
    var frames = document.querySelectorAll('.bc-track');

    function effectiveTheme() {
      var saved = document.documentElement.getAttribute('data-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function sync() {
      var suffix = effectiveTheme() === 'dark' ? darkSuffix : lightSuffix;
      for (var i = 0; i < frames.length; i++) {
        var trackId = frames[i].getAttribute('data-track');
        var src = base + 'track=' + trackId + '/' + suffix;
        if (frames[i].getAttribute('src') !== src) {
          frames[i].setAttribute('src', src);
        }
      }
    }

    sync();

    new MutationObserver(sync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', sync);
  })();
</script>

---

{% include album-wall.html %}

<script src="{{ '/assets/js/album-wall.js' | relative_url }}"></script>
