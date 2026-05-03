---
layout: single
author_profile: true
permalink: /music/
title: "music"
---

<style>

/* ── prose wrapper: continuous text flow around floated players ── */
.mp-prose {
  line-height: 1.68;
  font-family: 'Mononoki', monospace;
}

/* ── player: floated, text wraps beside ── */
.mp-player {
  display: block;
  width: 380px;
  max-width: 48%;
  margin: 0.9rem 0;
}
.mp-player .wv-player {
  max-width: none;
  width: 100%;
}
.mp-float-l {
  float: left;
  clear: left;
  margin-right: 1.4rem;
}
.mp-float-r {
  float: right;
  clear: right;
  margin-left: 1.4rem;
}

/* ── clearfix ── */
.mp-clear::after { content: ""; display: table; clear: both; }

/* ── setup photo insert ── */
.mp-setup {
  float: right;
  clear: right;
  width: 240px;
  max-width: 42%;
  margin: 0 0 0.8rem 1.4rem;
}
.mp-setup img {
  display: block;
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgba(155, 146, 138, 0.22);
  filter: saturate(0.94) contrast(1.02);
  transition: filter 0.22s ease;
}
.mp-setup:hover img { filter: saturate(1) contrast(1.04); }
.mp-setup figcaption {
  margin-top: 0.28rem;
  font-family: 'Reforma 2018', Georgia, serif;
  font-size: 0.72rem;
  line-height: 1.4;
  color: #7f766f;
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
  margin: 0.3rem 1.4rem 0.6rem 0;
  text-align: center;
}
.mp-album-hero img {
  display: block;
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgba(155, 146, 138, 0.28);
  box-shadow: 0 6px 32px rgba(63, 57, 52, 0.07), 0 1px 4px rgba(63, 57, 52, 0.04);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.mp-album-hero:hover img {
  box-shadow: 0 8px 40px rgba(63, 57, 52, 0.10), 0 2px 6px rgba(63, 57, 52, 0.05);
  transform: translateY(-2px);
}
.mp-album-hero figcaption {
  margin-top: 0.45rem;
  font-size: 0.68rem;
  color: #9b928a;
  letter-spacing: 0.04em;
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
    float: none !important;
    width: 100%;
    max-width: 100%;
    margin: 0.7rem 0 !important;
  }
  .mp-setup {
    float: none;
    width: 100%;
    max-width: 280px;
    margin: 0.8rem 0;
  }
  .mp-album-hero {
    float: none;
    width: 180px;
    max-width: 180px;
    margin: 1.4rem 0;
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
  html:not([data-theme="light"]) .mp-album-hero figcaption { color: #7a7370; }
  html:not([data-theme="light"]) .mp-album-hero figcaption a { color: #c49a85; border-bottom-color: rgba(196, 154, 133, 0.3); }
  html:not([data-theme="light"]) .mp-setup img { border-color: rgba(90, 82, 76, 0.4); }
  html:not([data-theme="light"]) .mp-setup figcaption { color: #9b928a; }
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
html[data-theme="dark"] .mp-album-hero figcaption { color: #7a7370; }
html[data-theme="dark"] .mp-album-hero figcaption a { color: #c49a85; border-bottom-color: rgba(196, 154, 133, 0.3); }
html[data-theme="dark"] .mp-setup img { border-color: rgba(90, 82, 76, 0.4); }
html[data-theme="dark"] .mp-setup figcaption { color: #9b928a; }
html[data-theme="dark"] .music-album-wall-loader { color: #7a7370; }
</style>

<figure class="mp-setup">
  <img src="/assets/images/music/roli-setup-london-2018.jpg" alt="ROLI Seaboard, Launchpad, and MacBook Pro running Logic on a desk in London, 2018" loading="lazy">
  <figcaption>the whole studio, London 2018</figcaption>
</figure>
<div class="mp-prose" markdown="0">
I had been absorbing prog and jazz since secondary school, and by the time I reached <b>Cambridge</b> the impulse to make something of my own had been building for years. Gear had become cheap and strange; anyone with a laptop could make a record, and a wave of expressive MIDI controllers had started arriving that made a keyboard feel less like a grid of switches and more like an instrument you could lean into. I ordered a <b>ROLI Seaboard</b> after watching someone play one online: a slab of silicone that responded to pressure, slide, and vibrato under every finger, closer to voice than keyboard. A Launchpad, a MacBook, Logic Pro, and the ROLI on a college desk; that was the entire studio. The first time I ran my fingers across it I knew the music I had been carrying around could finally get out.
<div class="mp-player mp-float-l">
{% include audio-player.html src="/assets/audio/pre_album_20180420_sainsburys_coffee.mp3" title="11pm Sainsbury's coffee run" waveform="/assets/audio/waveforms/pre_album_20180420_sainsburys_coffee.json" duration="9:04" %}
</div>
The first thing I recorded, in the spring of 2018, was a nine-minute track about going to <b>Sainsbury's</b> at eleven at night to buy coffee: mock exams and hair loss and a mother who tells you to sleep early. The door slam at the end is real. Friends loved it; that was enough; I kept going. I was singing and playing bass in a band at Cambridge (we played Wanqing's <b>Kill That Man from Shijiazhuang</b>, which counts), but <b>amoxitoxin</b> was mine alone: every sound had to pass through my hands, my ear, my judgement. I had just been to the <b>Pink Floyd</b> exhibition in London and bought a Floyd-edition pair of Sennheisers; I had just seen <b>Haken</b> live for the first time, <b>Bent Knee</b> opening.
<div class="mp-player mp-float-r">
{% include audio-player.html src="/assets/audio/pre_album_20180426_bitter_sweet_symphony_cover.mp3" title="Bitter Sweet Symphony (cover)" waveform="/assets/audio/waveforms/pre_album_20180426_bitter_sweet_symphony_cover.json" duration="4:11" %}
</div>
A <b>Bitter Sweet Symphony</b> cover came from that impulse, and <em>surrender</em> was written that summer during a placement at the <b>Fisher group at UCL</b>, a fiction about an Alzheimer's patient dying with their memory dissolving. These were experiments, and the album grew out of them.
<div class="mp-player mp-float-l">
{% include audio-player.html src="/assets/audio/pre_album_20180801_surrender.mp3" title="surrender" waveform="/assets/audio/waveforms/pre_album_20180801_surrender.json" duration="7:36" %}
</div>
</div>

<div class="mp-clear"></div>

<figure class="mp-album-hero">
  <img src="/assets/images/the_maze.jpg" alt="The Maze album cover" decoding="async">
  <figcaption>the maze (2020) · <a href="https://amoxitoxin.bandcamp.com/">bandcamp</a></figcaption>
</figure>
<div class="mp-prose" markdown="0">
Then <b>COVID</b> arrived and I left Cambridge in March 2020. On the flight home to <b>Guangzhou</b> I was listening to Kaipa's <em>Children of the New Horizon</em> on repeat. The government put me in a quarantine motel in Panyu, across from the house where my parents lived, close enough to see the building but not to enter it. I asked my mother to bring me a <b>Nektar MIDI keyboard</b> to pair with my ROLI. She did.
<div class="mp-player mp-float-l mp-album">
{% include audio-player.html src="/assets/audio/kitty_kat_and_the_stars.mp3" title="cosmic cat" waveform="/assets/audio/waveforms/kitty_kat_and_the_stars.json" duration="1:53" %}
</div>
The first track I wrote in that room was <em>cosmic cat</em>, on the same day I was writing my undergraduate thesis. It is heavy and nimble, constantly changing register; the name arrived first, and then I thought there should be cats in it, so the meows at the end are deliberate and slightly absurd. After quarantine I wrote <em>the maze</em>, which became the title track and the seed of the album; it started as a description of the compositional process, getting lost inside arrangements, following a passage into a dead end, doubling back, and over time I came to hear it as something wider, a condition everyone navigates.
<div class="mp-player mp-float-l mp-album">
{% include audio-player.html src="/assets/audio/the_maze.mp3" title="the maze" waveform="/assets/audio/waveforms/the_maze.json" duration="9:41" %}
</div>
The last track written was <em>reflections</em>, the most ambitious at twelve minutes: <b>Jiangshan Wang</b>, a friend from Neu-Reality, had posted her lyrics on WeChat looking for a composer, and she probably did not expect to hear from me. I took the lyrics and the song grew out of hand, section after section accruing. Everything on the album passed through a ROLI, a Nektar, a laptop, my voice, and not much else: college rooms in Cambridge, a London flat during a summer placement, a quarantine motel in Guangzhou.
<div class="mp-player mp-float-l mp-album">
{% include audio-player.html src="/assets/audio/reflections.mp3" title="reflections (feat. Jiangshan Wang)" waveform="/assets/audio/waveforms/reflections.json" duration="12:07" %}
</div>
By 2019 I had walked along the <b>Cam</b> enough times to know the exact quality of its emptiness after rain, the punts stacked and dripping, the surface holding the last of the day, and I wrote a track about that feeling. I named another after a neuroscience concept because one rhythmic motif kept driving the whole thing forward, looping and sustaining itself the way a <b>central pattern generator</b> does in the spinal cord; it felt right to let the music do what the nervous system does.
<div class="mp-player mp-float-l mp-album">
{% include audio-player.html src="/assets/audio/the_rain_on_the_cam.mp3" title="after the rain, no one on the Cam" waveform="/assets/audio/waveforms/the_rain_on_the_cam.json" duration="8:02" %}
</div>
<div class="mp-player mp-float-l mp-album">
{% include audio-player.html src="/assets/audio/central_pattern_generator.mp3" title="central pattern generator" waveform="/assets/audio/waveforms/central_pattern_generator.json" duration="4:17" %}
</div>
The last piece I wrote before leaving Cambridge was not addressed to anyone in particular; just a gesture of hope aimed at a city and a season.
<div class="mp-player mp-float-l mp-album">
{% include audio-player.html src="/assets/audio/we_will_meet_again_in_springtime_london.mp3" title="we will meet again in springtime London" waveform="/assets/audio/waveforms/we_will_meet_again_in_springtime_london.json" duration="2:24" %}
</div>
Since then there are scattered new recordings, experimental and unfinished. <b>amoxitoxin</b> is quiet but not done.
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
