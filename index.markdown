---
layout: single
author_profile: true
classes: home
---

*Dinghao here.*

I am finishing my PhD in neuroscience at the [Max Planck Institute for Neuroscience](https://www.mpfi.org), working on how a tiny cluster of brainstem neurones uses dopamine to shape how animals remember. I'm graduating December 2026 and looking for data science roles in Europe.

<p class="currently-intro">Currently reading <em class="currently-substance">{{ site.data.currently.reading }}</em>, learning <em class="currently-substance">{{ site.data.currently.learning }}</em>, and working on <em class="currently-substance">{{ site.data.currently.working_on }}</em>.</p>

Reach out to me: <a href="mailto:dinghao.luo@outlook.com">[dinghao.luo@outlook.com]</a>  
Find me: [GitHub](https://github.com/dinghaoluo) · [Reddit](https://www.reddit.com/user/amoxdl24/) · [Instagram](https://www.instagram.com/amoxitoxin) · [LinkedIn](https://www.linkedin.com/in/dinghaoluo/) · [CV](/cv/)

---

<h2 id="thoughts"><a href="/thoughts/">thoughts :)</a></h2>

{% assign all_thoughts = site.data.thoughts | sort: 'posted' | reverse %}

<div class="home-covers" aria-hidden="true">
  {% for t in all_thoughts limit:40 %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

I read and watch compulsively: Pynchon and Cărtărescu, Tarkovsky and Haneke, *The Wire* and *Disco Elysium*. Some thoughts are long; none are polite about things I didn't like.

[→ thoughts](/thoughts/)

---

<h2 id="writing"><a href="/writing/">writing :)</a></h2>

Three years at Neu-Reality (神经现实), a Chinese-language science platform. Seven months at *Scientific American* China, where I wrote weekly news and a print feature on the ARC consciousness project. I translated Merlin Sheldrake's *Entangled Life* into Chinese; it won the 2025 Pingshan Natural History Museum Book Award.

[→ writing & translation](/writing/)

---

<h2 id="science"><a href="/science/">science :)</a></h2>

My PhD asks how the brain decides what to remember. I study the locus coeruleus, a tiny cluster of brainstem neurones that sends dopamine into the hippocampus; the textbook treats it as a slow, diffuse modulator, a volume knob on arousal, but I am trying to work out whether its phasic signals do something more precise, selectively shaping which cells fire and which memories survive. I designed the experiments, built the analysis pipelines in **Python**, and developed a computational model to test the idea. A paper is in preparation. Before this I was in the Paulsen lab at Cambridge, where my undergraduate thesis looked at dopamine's role in CA3–CA1 synaptic plasticity.

[→ science](/science/)

---

<h2 id="music"><a href="/music/">music :)</a></h2>

<div class="home-featured-album">
  <a href="/music/" class="home-featured-album__cover">
    <img src="/assets/images/the_maze.jpg" alt="amoxitoxin album cover">
  </a>
  <div class="home-featured-album__info">
    <span class="home-featured-album__title">amoxitoxin</span>
    <p class="home-featured-album__desc">Progressive art-rock, one album out. Neuroscience and Cambridge in the song titles whether I wanted them there or not.</p>
    <a href="https://amoxitoxin.bandcamp.com/" class="home-featured-album__link">Bandcamp</a> · <a href="/music/" class="home-featured-album__link">listen here</a>
  </div>
</div>

<div class="home-albums" aria-hidden="true">
  {% assign albums = site.data.music_thoughts | sort: 'posted' | reverse %}
  {% for a in albums limit:40 %}{% if a.image %}<a href="/music/#{{ a.title | slugify }}" class="home-albums__link" style="display:none"><img src="{{ a.image }}" alt="{{ a.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

I also listen obsessively: prog, jazz fusion, Canterbury scene, and whatever else catches me. Some longer thoughts on albums that stayed with me.

[→ music](/music/)

---

<h2 id="photos"><a href="/photos/">photos :)</a></h2>

Photographs from fieldwork and daily life.

[→ photos](/photos/)

---

<h2 id="other-stuff">other stuff :)</h2>

There's a [CV](/cv/), and I'm building [the zone](https://github.com/dinghaoluo/the_zone_site), a companion site for visualising *Gravity's Rainbow*, because some books won't stay on the page. Seven Pynchon novels in and still finding new threads.
