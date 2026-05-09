---
layout: single
author_profile: true
permalink: /music/
title: "music"
classes: music-page
---

<style>

/* ── player: floated left, text wraps right ── */
.mp-player {
  display: block;
  float: left;
  clear: left;
  width: 380px;
  max-width: 48%;
  margin: 0.5rem var(--media-float-gutter) 0.5rem 0;
}
.mp-player .wv-player {
  max-width: none;
  width: 100%;
}

/* ── clearfix ── */
.mp-clear::after { content: ""; display: table; clear: both; }
.mp-clear + .mp-prose { margin-top: 1.4rem; }

/* ── singles/EP covers: compact 3-across row ── */
.mp-singles {
  display: flex;
  gap: var(--media-pair-gap);
  width: calc(100% - 48% - var(--media-float-gutter));
  float: right;
  margin: 0;
}
.mp-singles figure {
  flex: 1 1 0;
  min-width: 0;
  margin: 0;
  text-align: center;
}
.mp-singles img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  margin-bottom: 0;
  border-radius: var(--media-radius);
  border: 1px solid rgba(155, 146, 138, 0.22);
  box-shadow: 0 3px 16px rgba(63, 57, 52, 0.05);
}
.mp-singles figcaption {
  font-size: clamp(0.74rem, calc(0.7rem + 0.1vw), 0.82rem);
  font-style: italic;
  line-height: 1.36;
  margin-top: var(--media-caption-gap);
  white-space: nowrap;
}

.mp-prose--singles {
  --mp-media-column: min(48%, 450px);
}
.mp-prose--singles .mp-player {
  float: right;
  clear: right;
  width: var(--mp-media-column);
  max-width: var(--mp-media-column);
  margin: var(--media-float-gap) 0 var(--media-float-gap) var(--media-float-gutter);
}
.mp-prose--singles .mp-singles {
  float: right;
  clear: right;
  width: var(--mp-media-column);
  max-width: var(--mp-media-column);
  margin: var(--media-float-gap) 0 var(--media-float-gap) var(--media-float-gutter);
}

/* ── reset theme figure defaults ── */
.mp-setup,
.mp-album-hero,
.mp-singles figure {
  display: block;
  margin: 0;
  flex-wrap: unset;
  justify-content: unset;
  align-items: unset;
}

/* ── setup photo insert ── */
.mp-setup {
  float: right;
  clear: right;
  width: 240px;
  max-width: 42%;
  margin: var(--media-float-gap) 0 var(--media-float-gap) var(--media-float-gutter);
}
.mp-setup img {
  display: block;
  width: 100%;
  margin-bottom: 0;
  border-radius: var(--media-radius);
  border: 1px solid rgba(155, 146, 138, 0.22);
  filter: saturate(0.94) contrast(1.02);
  transition: filter 0.22s ease;
}
.mp-setup:hover img { filter: saturate(1) contrast(1.04); }
.mp-setup figcaption {
  font-size: clamp(0.74rem, calc(0.7rem + 0.1vw), 0.82rem);
  line-height: 1.22;
  margin-top: var(--media-caption-gap);
}

/* ── album track: subtly warmer ── */
.mp-album .wv-player {
  background: #f7f1e9;
  border-color: rgba(183, 142, 121, 0.28);
  box-shadow: 0 2px 12px rgba(63, 57, 52, 0.045);
}

/* ── album cover hero ── */
.mp-album-hero {
  float: left;
  clear: left;
  width: 160px;
  max-width: 24%;
  margin: var(--media-float-gap) var(--media-float-gutter) var(--media-float-gap) 0;
  text-align: center;
}
.mp-album-hero img {
  display: block;
  width: 100%;
  margin-bottom: 0;
  border-radius: var(--media-radius);
  border: 1px solid rgba(155, 146, 138, 0.28);
  box-shadow: 0 6px 32px rgba(63, 57, 52, 0.07), 0 1px 4px rgba(63, 57, 52, 0.04);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.mp-album-hero:hover img {
  box-shadow: 0 8px 40px rgba(63, 57, 52, 0.10), 0 2px 6px rgba(63, 57, 52, 0.05);
  transform: translateY(-2px);
}
.mp-album-hero figcaption {
  font-size: clamp(0.74rem, calc(0.7rem + 0.1vw), 0.82rem);
  letter-spacing: 0.04em;
  margin-top: var(--media-caption-gap);
  white-space: nowrap;
}
.mp-album-hero figcaption a {
  color: #8d6959;
  text-decoration: none;
  border-bottom: 1px solid rgba(141, 105, 89, 0.3);
  transition: border-color 0.2s ease;
}
.mp-album-hero figcaption a:hover {
  border-bottom-color: #8d6959;
}

/* ── album wall loader ── */
.music-album-wall-loader {
  min-height: 14rem;
  margin-top: 1.4rem;
  color: #9b928a;
  font-size: 0.78rem;
}
.music-album-wall-loader.is-loaded { font-size: inherit; }

/* ── mobile ── */
@media (max-width: 620px) {
  .mp-player {
    float: none;
    width: 100%;
    max-width: 100%;
    margin: 0.7rem 0;
  }
  .mp-setup {
    float: none;
    width: 100%;
    max-width: 280px;
    margin: var(--media-block-gap) 0;
  }
  .mp-album-hero {
    float: none;
    width: 180px;
    max-width: 180px;
    margin: var(--media-block-gap) 0;
  }
  .mp-singles {
    float: none;
    width: 100%;
    max-width: 100%;
  }
  .mp-prose--singles {
    --mp-media-column: 100%;
  }
  .mp-prose--singles .mp-player,
  .mp-prose--singles .mp-singles {
    float: none;
    clear: none;
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}

/* ── dark mode ── */
@media (prefers-color-scheme: dark) {
  html:not([data-theme="light"]) .mp-album .wv-player {
    background: #211e1a;
    border-color: rgba(196, 154, 133, 0.22);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  }
  html:not([data-theme="light"]) .mp-album-hero img {
    border-color: rgba(90, 82, 76, 0.4);
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.18);
  }
  html:not([data-theme="light"]) .mp-album-hero figcaption a { color: #c49a85; border-bottom-color: rgba(196, 154, 133, 0.3); }
  html:not([data-theme="light"]) .mp-setup img { border-color: rgba(90, 82, 76, 0.4); }
  html:not([data-theme="light"]) .mp-singles img { border-color: rgba(90, 82, 76, 0.4); }
  html:not([data-theme="light"]) .music-album-wall-loader { color: #7a7370; }
}
html[data-theme="dark"] .mp-album .wv-player {
  background: #211e1a;
  border-color: rgba(196, 154, 133, 0.22);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}
html[data-theme="dark"] .mp-album-hero img {
  border-color: rgba(90, 82, 76, 0.4);
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.18);
}
html[data-theme="dark"] .mp-album-hero figcaption a { color: #c49a85; border-bottom-color: rgba(196, 154, 133, 0.3); }
html[data-theme="dark"] .mp-setup img { border-color: rgba(90, 82, 76, 0.4); }
html[data-theme="dark"] .mp-singles img { border-color: rgba(90, 82, 76, 0.4); }
html[data-theme="dark"] .music-album-wall-loader { color: #7a7370; }
</style>

<div class="mp-prose mp-prose--singles" markdown="0">
<figure class="mp-setup">
  <img src="/assets/images/music/roli-setup-london-2018.jpg" alt="ROLI Seaboard, Launchpad, and MacBook Pro running Logic on a desk in London, 2018" loading="lazy">
  <figcaption>the whole studio, London 2018</figcaption>
</figure>
I had been absorbing prog and jazz since secondary school, and by <b>Cambridge</b> the impulse to make something of my own had been building for years. Gear had become cheap and strange; anyone with a laptop could make a record, and expressive MIDI controllers were arriving that made a keyboard feel less like a grid of switches and more like an instrument you could lean into. I ordered a <b>ROLI Seaboard</b> after watching someone play one online: a slab of silicone that responded to pressure, slide, and vibrato under every finger, closer to voice than keyboard. A Launchpad, a MacBook, Logic Pro, and the ROLI on a college desk; that was the entire studio.
<div class="mp-player">
{% include audio-player.html src="/assets/audio/pre_album_20180420_sainsburys_coffee.mp3" title="11pm Sainsbury's coffee run" waveform="/assets/audio/waveforms/pre_album_20180420_sainsburys_coffee.json" duration="4:50" %}
</div>
<div class="mp-player">
{% include audio-player.html src="/assets/audio/pre_album_20180801_surrender.mp3" title="surrender." waveform="/assets/audio/waveforms/pre_album_20180801_surrender.json" duration="6:20" %}
</div>
<div class="mp-singles">
  <figure>
    <img src="/assets/images/music/on_edamame.jpg" alt="on edamame EP cover" loading="lazy">
    <figcaption>on edamame</figcaption>
  </figure>
  <figure>
    <img src="/assets/images/music/the_cam_after_rain.jpg" alt="the Cam after rain single cover" loading="lazy">
    <figcaption>the Cam after rain</figcaption>
  </figure>
  <figure>
    <img src="/assets/images/music/reflections.jpg" alt="reflections single cover" loading="lazy">
    <figcaption>reflections</figcaption>
  </figure>
</div>
The first thing I recorded, spring 2018, was a nine-minute track about going to <b>Sainsbury's</b> at eleven at night to buy coffee: mock exams and hair loss and a mother who tells you to sleep early. The door slam at the end is real. Friends loved it; that was enough; I kept going.
<span class="mp-break"></span>
I was playing bass in a band at Cambridge (we played Wanqing's <b>Kill That Man from Shijiazhuang</b>, which counts), but <b>amoxitoxin</b> was mine alone. I had just been to the <b>Pink Floyd</b> exhibition in London; I had just seen <b>Haken</b> live for the first time, <b>Bent Knee</b> opening. A <b>Bitter Sweet Symphony</b> cover came from that impulse, and <em>surrender</em> was written that summer while I was working in an <b>Alzheimer's research group in London</b>: a fiction about a patient dying with their memory dissolving. These were experiments, and the album grew out of them.
</div>

<div class="mp-clear"></div>

<div class="mp-prose" markdown="0">
<figure class="mp-album-hero">
  <img src="/assets/images/the_maze.jpg" alt="The Maze album cover" decoding="async">
  <figcaption>the maze (2020) · <a href="https://amoxitoxin.bandcamp.com/">bandcamp</a></figcaption>
</figure>
<b>COVID</b> arrived and I left Cambridge in March 2020. On the flight home to <b>Guangzhou</b> I was listening to Kaipa's <em>Children of the New Horizon</em> on repeat. The government put me in a quarantine motel in Panyu, close enough to see my parents' building but not to enter it. I asked my mother to bring me a <b>Nektar MIDI keyboard</b>. She did.
<span class="mp-break"></span>
<div class="mp-player mp-album">
{% include audio-player.html src="/assets/audio/kitty_kat_and_the_stars.mp3" title="cosmic cat" waveform="/assets/audio/waveforms/kitty_kat_and_the_stars.json" duration="1:53" %}
</div>
<div class="mp-player mp-album">
{% include audio-player.html src="/assets/audio/the_maze.mp3" title="the maze" waveform="/assets/audio/waveforms/the_maze.json" duration="9:41" %}
</div>
<div class="mp-player mp-album">
{% include audio-player.html src="/assets/audio/reflections.mp3" title="reflections (feat. Jiangshan Wang)" waveform="/assets/audio/waveforms/reflections.json" duration="12:07" %}
</div>
<div class="mp-player mp-album">
{% include audio-player.html src="/assets/audio/the_rain_on_the_cam.mp3" title="the Cam after rain" waveform="/assets/audio/waveforms/the_rain_on_the_cam.json" duration="8:02" %}
</div>
<div class="mp-player mp-album">
{% include audio-player.html src="/assets/audio/central_pattern_generator.mp3" title="central pattern generator" waveform="/assets/audio/waveforms/central_pattern_generator.json" duration="4:17" %}
</div>
<div class="mp-player mp-album">
{% include audio-player.html src="/assets/audio/we_will_meet_again_in_springtime_london.mp3" title="we will meet again in springtime London" waveform="/assets/audio/waveforms/we_will_meet_again_in_springtime_london.json" duration="2:24" %}
</div>
The first track from that room was <em>cosmic cat</em>, written the same day as my undergraduate thesis: heavy and nimble, constantly changing register. The name arrived first; the meows at the end are deliberate. <em>the maze</em> came after quarantine and became the title track: getting lost inside arrangements, following a passage into a dead end, doubling back. Over time I heard it as something wider, a condition everyone navigates. <em>reflections</em> was the last written and the most ambitious at twelve minutes. <b>Jiangshan Wang</b>, a friend from Neu-Reality, had posted her lyrics on WeChat looking for a composer; she probably did not expect to hear from me. I took them and the song grew out of hand, section after section accruing.
<span class="mp-break"></span>
By 2019 I had walked along the <b>Cam</b> enough times to know the exact quality of its emptiness after rain, the punts stacked and dripping, and I wrote a track about that feeling. I named another after a neuroscience concept: one rhythmic motif driving the whole thing forward, looping and sustaining itself the way a <b>central pattern generator</b> does in the spinal cord. The last piece I wrote before leaving Cambridge was not addressed to anyone in particular; just a gesture of hope aimed at a city and a season.
<span class="mp-break"></span>
Everything on the album passed through a ROLI, a Nektar, a laptop, my voice, and not much else: college rooms in Cambridge, a London flat, a quarantine motel in Guangzhou. <b>amoxitoxin</b> is quiet but not done.
</div>

<div class="mp-clear"></div>

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
