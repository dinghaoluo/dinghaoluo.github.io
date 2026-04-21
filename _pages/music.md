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
  .music-note {
    margin: 0.6rem 0 0;
    font-size: 0.78rem;
    color: #a79f97;
    font-style: italic;
    letter-spacing: 0.005em;
  }
  @media (prefers-color-scheme: dark) {
    html:not([data-theme="light"]) .music-note { color: #6a6360; }
  }
  html[data-theme="dark"] .music-note { color: #6a6360; }
</style>

*Sound made under another name.*

---

<div class="music-player-wrap">
  {% include audio-player.html src="/assets/audio/kitty_kat_and_the_stars.mp3" title="宇宙貓 — kitty kat and the stars" waveform="/assets/audio/waveforms/kitty_kat_and_the_stars.json" %}
  {% include audio-player.html src="/assets/audio/central_pattern_generator.mp3" title="中樞模式發生器 — central pattern generator" waveform="/assets/audio/waveforms/central_pattern_generator.json" %}
  {% include audio-player.html src="/assets/audio/reflections.mp3" title="倒影 (feat. 王江山) — reflections" waveform="/assets/audio/waveforms/reflections.json" %}
  {% include audio-player.html src="/assets/audio/the_rain_on_the_cam.mp3" title="雨後康河無人泛舟 — the rain on the Cam" waveform="/assets/audio/waveforms/the_rain_on_the_cam.json" %}
  {% include audio-player.html src="/assets/audio/the_maze.mp3" title="迷宮 — the maze" waveform="/assets/audio/waveforms/the_maze.json" %}
</div>

<p class="music-note">All releases are on <a href="https://amoxitoxin.bandcamp.com/">Bandcamp</a>.</p>

<!-- Bandcamp embedded fallback (kept for reference)
<div class="music-player-wrap">
  <div class="music-track"><iframe class="bc-track" data-track="1915815379" seamless><a href="https://amoxitoxin.bandcamp.com/track/kitty-kat-and-the-stars">宇宙貓 (kitty kat and the stars)</a></iframe></div>
  <div class="music-track"><iframe class="bc-track" data-track="2704602144" seamless><a href="https://amoxitoxin.bandcamp.com/track/central-pattern-generator">中樞模式發生器 (central pattern generator)</a></iframe></div>
  <div class="music-track"><iframe class="bc-track" data-track="3943970932" seamless><a href="https://amoxitoxin.bandcamp.com/track/feat-reflections">倒影 (feat. 王江山) (reflections)</a></iframe></div>
  <div class="music-track"><iframe class="bc-track" data-track="745767449" seamless><a href="https://amoxitoxin.bandcamp.com/track/the-rain-on-the-cam">雨後康河無人泛舟 (the rain on the Cam)</a></iframe></div>
  <div class="music-track"><iframe class="bc-track" data-track="1667904940" seamless><a href="https://amoxitoxin.bandcamp.com/track/the-maze">迷宮 (the maze)</a></iframe></div>
</div>
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
        if (frames[i].getAttribute('src') !== src) frames[i].setAttribute('src', src);
      }
    }
    sync();
    new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', sync);
  })();
</script>
-->

---

{% include album-wall.html %}

<script src="{{ '/assets/js/album-wall.js' | relative_url }}"></script>
