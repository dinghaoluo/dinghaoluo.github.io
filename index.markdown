---
layout: single
author_profile: true
classes: home
---

*Hi, Dinghao here :)*

I am finishing my PhD in neuroscience at the [Max Planck Institute for Neuroscience](https://www.mpfi.org), working on how rapid dopamine signals in the hippocampus tune the accuracy of memory. I am graduating December 2026 and looking for data science roles in Europe.

Recently, I have been reading *Mason & Dixon*, learning *SQL and intermediate machine learning*, and working on *a computational analysis of Pynchon's* Gravity's Rainbow.

Reach out to me: <a href="mailto:dinghao.luo@outlook.com">[dinghao.luo@outlook.com]</a>  
Find me: [GitHub](https://github.com/dinghaoluo) · [Reddit](https://www.reddit.com/user/amoxdl24/) · [Instagram](https://www.instagram.com/amoxitoxin) · [LinkedIn](https://www.linkedin.com/in/dinghaoluo/) · [CV](/cv/)

---

<h2 id="thoughts"><a href="/thoughts/">thoughts :)</a></h2>

{% assign all_thoughts = site.data.thoughts | sort: 'posted' | reverse %}

<div class="home-covers" aria-hidden="true">
  {% for t in all_thoughts limit:40 %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

Reading was the first durable way I found of making sense of the world. The early years of my PhD interrupted the habit; returning to it gave me a sharper vocabulary for political economy, science, and the strange persistence of fiction. The writers I return to most are Mircea Cărtărescu and Thomas Pynchon. These are a few coordinates rather than a canon: books that changed the scale at which I think.

- ***Solenoid*** (2015) by Mircea Cărtărescu
- ***Gravity's Rainbow*** (1973) by Thomas Pynchon
- ***Capitalist Realism*** (2009) by Mark Fisher
- *and if you read Chinese...* my translation of ***Entangled Life*** (2020) by Merlin Sheldrake

[→ thoughts](/thoughts/)

---

<h2 id="writing"><a href="/writing/">writing :)</a></h2>

I spent three years as science editor and translator at Neu-Reality (神经现实), a Chinese-language neuroscience and philosophy platform, and seven months at *Scientific American* China, where I wrote weekly news and a print feature on the Adversarial Collaboration on Consciousness project, interviewing researchers like Cyriel Pennartz and Anil Seth. The longest project was translating Merlin Sheldrake's *Entangled Life* into Chinese (《菌络万象》); it took the better part of a year and won the 2025 Pingshan Natural History Museum Book Award. Personal essays and short fiction live here too, mostly written between experiments.

[→ writing & translation](/writing/)

---

<h2 id="science"><a href="/science/">science :)</a></h2>

My PhD asks what tunes the accuracy of memory. The locus coeruleus, a small brainstem nucleus, is usually treated as a slow arousal system: a diffuse neuromodulatory volume knob. My work starts from a different possibility, that rapid LC dopamine signals in hippocampal CA1 change local neural dynamics on the scale at which a memory-guided decision is made. In a navigation task, these dopamine transients decay over seconds and micrometres, recruit a population of ramping neurons, and shift when the animal initiates reward-seeking. I designed the experiments, built the analysis pipelines in **Python**, and developed a computational model to test the mechanism. A paper is in preparation. Before this I was in the Paulsen lab at Cambridge, where my undergraduate thesis looked at dopamine's role in CA3–CA1 synaptic plasticity. I am graduating December 2026 and looking for data science roles in Europe; if the overlap between neuroscience, computation, and careful writing sounds useful to you, get in touch.

[→ science](/science/)

---

<h2 id="music"><a href="/music/">music :)</a></h2>

<div class="home-featured-album">
  <a href="/music/" class="home-featured-album__cover">
    <img src="/assets/images/the_maze.jpg" alt="amoxitoxin album cover">
  </a>
  <div class="home-featured-album__info">
    <span class="home-featured-album__title">amoxitoxin</span>
    <p class="home-featured-album__desc">One-person prog and art-rock. The first album, 迷宮 (<em>The Maze</em>), was written during two years in Cambridge — five tracks in English and Mandarin, somewhere between Pink Floyd and Haken.</p>
    <a href="https://amoxitoxin.bandcamp.com/" class="home-featured-album__link">Bandcamp</a> · <a href="/music/" class="home-featured-album__link">listen here</a>
  </div>
</div>

<div class="home-albums" aria-hidden="true">
  {% assign albums = site.data.music_thoughts | sort: 'posted' | reverse %}
  {% for a in albums limit:40 %}{% if a.image %}<a href="/music/#{{ a.title | slugify }}" class="home-albums__link" style="display:none"><img src="{{ a.image }}" alt="{{ a.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

I listen to far more than I make: prog, jazz fusion, Canterbury scene, metal, and whatever else pulls me in. There are album reviews here too, several hundred of them, covering everything from King Crimson to Keor to 万能青年旅店.

[→ music](/music/)

---

<h2 id="photos"><a href="/photos/">photos :)</a></h2>

Photographs from fieldwork, travel, and daily life. Mostly shot on a Fujifilm X-T4; nothing staged, nothing filtered.

[→ photos](/photos/)

---

<h2 id="other-stuff">other stuff :)</h2>

There is a [CV](/cv/) if you need one. I am also building [the Zone](https://github.com/dinghaoluo/the_zone_site), a computational companion to *Gravity's Rainbow*: maps, character networks, and cross-reference tools for a book that refuses to stay on the page. After seven Pynchon novels, I am still finding new threads.
