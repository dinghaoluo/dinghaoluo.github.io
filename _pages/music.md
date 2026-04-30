---
layout: single
author_profile: true
permalink: /music/
title: "music"
---

<style>
  .music-release {
    max-width: 760px;
    margin: 2.2rem 0 1.4rem;
    display: grid;
    grid-template-columns: minmax(150px, 210px) minmax(0, 1fr);
    gap: 1.25rem;
    align-items: start;
  }
  .music-release__cover {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid rgba(155, 146, 138, 0.28);
  }
  .music-release__eyebrow {
    margin: 0 0 0.2rem;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #9b928a;
  }
  .music-release__title {
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.2;
  }
  .music-release__title span {
    color: #8d6959;
    font-weight: 500;
  }
  .music-release__copy {
    max-width: 34rem;
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.65;
    color: #6f6963;
  }
  .music-release__links {
    margin: 0.7rem 0 0;
    font-size: 0.78rem;
  }
  .music-player-flow {
    grid-column: 1 / -1;
    margin-top: 0.2rem;
  }
  .music-player-flow::after {
    content: "";
    display: block;
    clear: both;
  }
  .music-player-wrap {
    float: right;
    width: 420px;
    max-width: 58%;
    margin: 0.1rem 0 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .music-player-wrap .wv-player {
    width: 100%;
    max-width: none;
  }
  .music-player-side-text {
    max-width: 100%;
  }
  .music-album-wall-loader {
    min-height: 14rem;
    margin-top: 1.4rem;
    color: #9b928a;
    font-size: 0.78rem;
  }
  .music-album-wall-loader.is-loaded {
    font-size: inherit;
  }
  @media (prefers-color-scheme: dark) {
    html:not([data-theme="light"]) .music-release__cover { border-color: rgba(90, 82, 76, 0.4); }
    html:not([data-theme="light"]) .music-release__eyebrow { color: #7a7370; }
    html:not([data-theme="light"]) .music-release__title span { color: #c49a85; }
    html:not([data-theme="light"]) .music-release__copy { color: #b7aea6; }
    html:not([data-theme="light"]) .music-album-wall-loader { color: #7a7370; }
  }
  html[data-theme="dark"] .music-release__cover { border-color: rgba(90, 82, 76, 0.4); }
  html[data-theme="dark"] .music-release__eyebrow { color: #7a7370; }
  html[data-theme="dark"] .music-release__title span { color: #c49a85; }
  html[data-theme="dark"] .music-release__copy { color: #b7aea6; }
  html[data-theme="dark"] .music-album-wall-loader { color: #7a7370; }
  @media (max-width: 620px) {
    .music-release {
      grid-template-columns: minmax(0, 1fr);
      max-width: 420px;
      gap: 0.85rem;
    }
    .music-release__cover {
      max-width: 220px;
    }
    .music-release__title {
      font-size: 1.2rem;
    }
    .music-player-flow {
      margin-top: 0.4rem;
    }
    .music-player-wrap {
      float: none;
      width: 100%;
      max-width: 100%;
      margin: 0 0 0.9rem;
    }
  }
</style>

*Music sits here in two forms: tracks I make as amoxitoxin, and the records I keep returning to when I am trying to remember what music can do.*

---

<section class="music-release" aria-labelledby="the-maze-release">
  <img class="music-release__cover" src="/assets/images/the_maze.jpg" alt="迷宮 album cover" decoding="async">
  <div class="music-release__body">
    <p class="music-release__eyebrow">amoxitoxin</p>
    <h2 class="music-release__title" id="the-maze-release">迷宮 <span>(The Maze)</span></h2>
    <p class="music-release__links"><a href="https://amoxitoxin.bandcamp.com/">Bandcamp</a></p>
  </div>

  <div class="music-player-flow">
    <div class="music-player-wrap" aria-label="The Maze track players">
      {% include audio-player.html src="/assets/audio/the_maze.mp3" title="01 · 迷宮 — the maze" waveform="/assets/audio/waveforms/the_maze.json" duration="9:41" %}
      {% include audio-player.html src="/assets/audio/the_rain_on_the_cam.mp3" title="02 · 雨後康河無人泛舟 — the rain on the Cam" waveform="/assets/audio/waveforms/the_rain_on_the_cam.json" duration="8:02" %}
      {% include audio-player.html src="/assets/audio/reflections.mp3" title="03 · 倒影 (feat. 王江山) — reflections" waveform="/assets/audio/waveforms/reflections.json" duration="12:07" %}
      {% include audio-player.html src="/assets/audio/central_pattern_generator.mp3" title="04 · 中樞模式發生器 — central pattern generator" waveform="/assets/audio/waveforms/central_pattern_generator.json" duration="4:17" %}
      {% include audio-player.html src="/assets/audio/kitty_kat_and_the_stars.mp3" title="05 · 宇宙貓 — kitty kat and the stars" waveform="/assets/audio/waveforms/kitty_kat_and_the_stars.json" duration="1:53" %}
      {% include audio-player.html src="/assets/audio/we_will_meet_again_in_springtime_london.mp3" title="06 · 我們會在三月的倫敦重逢 (bonus track) — we will meet again in springtime London" waveform="/assets/audio/waveforms/we_will_meet_again_in_springtime_london.json" duration="2:24" %}
    </div>
    <div class="music-player-side-text">
      <p class="music-release__copy">One-person prog and art-rock, written across two years in Cambridge. The record sits somewhere between Pink Floyd's drift and Haken's machinery, with Mandarin/English lyrics and a small springtime coda at the end.</p>
    </div>
  </div>
</section>

---

<div
  class="music-album-wall-loader"
  id="music-album-wall-loader"
  data-src="{{ '/music/album-wall/' | relative_url }}"
  data-script="{{ '/assets/js/album-wall.js' | relative_url }}"
>
  loading listening notes...
</div>

<noscript><p><a href="{{ '/music/album-wall/' | relative_url }}">Open listening notes</a>.</p></noscript>
<script src="{{ '/assets/js/music-page.js' | relative_url }}"></script>
