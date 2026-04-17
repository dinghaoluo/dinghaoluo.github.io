---
layout: single
author_profile: true
permalink: /music/
title: "music"
---

<style>
  .music-player-wrap {
    max-width: 700px;
    margin: 2.4rem 0 1.6rem;
    border-radius: 0.36rem;
    overflow: hidden;
    border: 1px solid rgba(127, 118, 111, 0.12);
    box-shadow: 0 4px 16px rgba(63, 57, 52, 0.06);
  }

  .music-player-wrap iframe {
    display: block;
    width: 100%;
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
    html:not([data-theme="light"]) .music-player-wrap {
      border-color: rgba(155, 146, 138, 0.16);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
    html:not([data-theme="light"]) .music-note {
      color: #6a6360;
    }
  }

  html[data-theme="dark"] .music-player-wrap {
    border-color: rgba(155, 146, 138, 0.16);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  html[data-theme="dark"] .music-note {
    color: #6a6360;
  }
</style>

*Sound made under another name.*

---

<div class="music-player-wrap">
  <iframe
    id="bc-player"
    style="width: 100%; height: 470px;"
    seamless>
    <a href="https://amoxitoxin.bandcamp.com/album/the-maze">The Maze by amoxitoxin</a>
  </iframe>
</div>

<p class="music-note">All releases are on <a href="https://amoxitoxin.bandcamp.com/">Bandcamp</a>.</p>

<script>
  (function () {
    var base = 'https://bandcamp.com/EmbeddedPlayer/album=4228822450/size=large/artwork=small/transparent=false/';
    var light = base + 'bgcol=faf7f2/linkcol=8d6959/';
    var dark  = base + 'bgcol=1c1917/linkcol=c49a85/';
    var frame = document.getElementById('bc-player');

    function effectiveTheme() {
      var saved = document.documentElement.getAttribute('data-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function sync() {
      var src = effectiveTheme() === 'dark' ? dark : light;
      if (frame.getAttribute('src') !== src) {
        frame.setAttribute('src', src);
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
