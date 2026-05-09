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

/* ── singles/EP covers: compact 3-across row in one block ── */
.mp-singles {
  width: calc(100% - 48% - var(--media-float-gutter));
  float: right;
  margin: 0;
  text-align: center;
}

.mp-singles__covers {
  display: flex;
  gap: var(--media-pair-gap);
}

.mp-singles__covers img {
  flex: 1 1 0;
  min-width: 0;
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
.mp-singles {
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
    margin: var(--media-float-gap) 0;
  }
  .mp-album-hero {
    float: none;
    width: 180px;
    max-width: 180px;
    margin: var(--media-float-gap) 0;
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
html[data-theme="dark"] .mp-setup img { border-color: rgba(90, 82, 76, 0.4); }
html[data-theme="dark"] .mp-singles img { border-color: rgba(90, 82, 76, 0.4); }
html[data-theme="dark"] .music-album-wall-loader { color: #7a7370; }
</style>

<div class="mp-prose mp-prose--singles" markdown="0">
<figure class="mp-setup">
  <img src="/assets/images/music/roli-setup-london-2018.jpg" alt="ROLI Seaboard, Launchpad, and MacBook Pro running Logic on a desk in London, 2018" loading="lazy">
  <figcaption>my whole 'studio', London, 2018</figcaption>
</figure>

I had been absorbing prog and jazz since secondary school, and by Cambridge the impulse to make something of my own had been building for years. Gear was getting cheap and strange: anyone with a laptop could make a record, and expressive MIDI controllers were arriving from nowhere. I ordered a ROLI Seaboard after watching somebody play one on YouTube. And there I was, a MacBook, Logic Pro, and the ROLI on a wooden desk. That was the entire studio, and I sank nights and days into it.

<span class="mp-break"></span>

<div class="mp-player">
{% include audio-player.html src="/assets/audio/pre_album_20180420_sainsburys_coffee.mp3" title="11pm Sainsbury's coffee run" waveform="/assets/audio/waveforms/pre_album_20180420_sainsburys_coffee.json" duration="4:50" %}
</div>
<div class="mp-player">
{% include audio-player.html src="/assets/audio/pre_album_20180801_surrender.mp3" title="surrender." waveform="/assets/audio/waveforms/pre_album_20180801_surrender.json" duration="6:20" %}
</div>

<figure class="mp-singles">
  <div class="mp-singles__covers">
    <img src="/assets/images/music/on_edamame.jpg" alt="on edamame EP cover" loading="lazy">
    <img src="/assets/images/music/the_cam_after_rain.jpg" alt="the Cam after rain single cover" loading="lazy">
    <img src="/assets/images/music/reflections.jpg" alt="reflections single cover" loading="lazy">
  </div>
  <figcaption>my early singles and EP</figcaption>
</figure>

Spring 2018, around Easter, I was preparing for Tripos and would come home from the library around ten in the evening. There was this Costa machine inside the Sainsbury's outside Sidney Sussex, and I would sometimes grab a coffee before going home to keep studying. And that became the first track: mock exams and hair loss and a mother who'd been telling me to go to bed earlier. At the very end, my dorm door (one of those fire doors that would slam hard shut unless eased closed) also makes a cameo.

<span class="mp-break"></span>

My university years were full of exhibitions and shows around the UK. The summer after second year, I went to the Pink Floyd exhibition in London, saw Haken live for the first time with Bent Knee (<em>can you imagine?</em>) opening. All that listening fed the impulse to make my own. At the time I was working at Queen Square as a summer RA on Alzheimer's disease, and 'surrender.' came out of that internship: a patient's memory dissolving, and the song dissolving with it.

</div>

<div class="mp-clear"></div>

<div class="mp-prose" markdown="0">
<figure class="mp-album-hero">
  <img src="/assets/images/the_maze.jpg" alt="The Maze album cover" decoding="async">
  <figcaption><em>the maze</em> · <a href="https://amoxitoxin.bandcamp.com/">Bandcamp</a></figcaption>
</figure>

Those earlier experiments pointed towards a full-length album. In March 2020, COVID arrived and I left Cambridge for Guangzhou, and after landing I was put in a quarantine motel for a week. On the way home I had been listening to Kaipa's <em>Children of the Sounds</em> (2017) on repeat, and the idea of several tracks united by a loose concept came to me. The motel was close enough to home that I could ask my mother to bring a Nektar MIDI keyboard, which I bought on the day I landed. She did, and I started writing <em>the maze</em> while finishing my undergrad thesis.

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

The first track from that room was 'cosmic cat', named after the fact because the track felt both heavy and nimble, constantly changing register. Once the name arrived, I added the heavily reverbed meows at the end. It is short and sweet, and I have grown into it over time.

<span class="mp-break"></span>

The title track came after quarantine, when I was back in my childhood room. It was born in those early-COVID days when chaos filled the outside world, out of the feeling of getting lost in all of it. The staggered electronic piano near the end owes something to the vocal overlay from Gentle Giant's 'Knots' (1972).

<span class="mp-break"></span>

I finished 'reflections' last, and at twelve minutes it is the most ambitious thing on the album. Jiangshan Wang, a friend from Neu-Reality, had posted one of her poems on WeChat asking for a composer. She probably did not expect to hear from me. I took the poem and started writing, but the track kept growing, section after section, into my longest composition yet. In the middle is a long instrumental passage, time signatures shifting under layered textures, with a guitar snippet recorded by Mingxuan Huang. It is my proudest musical creation so far.

<span class="mp-break"></span>

'the Cam after rain' was older, but I reworked it for the album in early 2020. I was at Magdalene, right by the Cam, and I had walked along the bank enough times to know its hauntingly beautiful emptiness after rain: the punts stacked and dripping, with far fewer passers-by.

<span class="mp-break"></span>

I named 'central pattern generator' after a neuroscience concept: one rhythmic motif generated by the spinal cord, driving an animal forward. The track loops its opening motif the same way, with layers of instruments added on top like body architectures evolving around the generator.

<span class="mp-break"></span>

And lastly, 'we will meet again in springtime London' is the bonus track, a tiny gesture of hope aimed at a city and a future time.

<span class="mp-break"></span>

Everything on the album passed through a ROLI, a Nektar, a MacBook, Logic Pro, and my voice, recorded across college rooms in Cambridge, a King's Cross student dorm, a quarantine motel, and my childhood room in Guangzhou. <code>amoxitoxin</code> is quiet, but not done.

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
