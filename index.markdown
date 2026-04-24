---
layout: single
author_profile: true
classes: home
---

*Dinghao here.*

I am finishing my PhD in neuroscience at the [Max Planck Institute for Neuroscience](https://www.mpfi.org), working on how a small brainstem nucleus called the locus coeruleus sends rapid, spatially precise dopamine signals into the hippocampus to tune neural dynamics during navigation.

<p class="currently-intro">Recently, I have been reading <em class="currently-substance">{{ site.data.currently.reading }}</em>, learning <em class="currently-substance">{{ site.data.currently.learning }}</em>, and working on <em class="currently-substance">{{ site.data.currently.working_on }}</em>.</p>

Reach out to me: <a href="mailto:dinghao.luo@outlook.com">[dinghao.luo@outlook.com]</a>  
Find me: [GitHub](https://github.com/dinghaoluo) · [Reddit](https://www.reddit.com/user/amoxdl24/) · [Instagram](https://www.instagram.com/amoxitoxin) · [LinkedIn](https://www.linkedin.com/in/dinghaoluo/) · [CV](/cv/)

---

<h2 id="thoughts"><a href="/thoughts/">thoughts :)</a></h2>

{% assign all_thoughts = site.data.thoughts | sort: 'posted' | reverse %}

<div class="home-covers" aria-hidden="true">
  {% for t in all_thoughts limit:40 %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

I keep a running log of everything I read, watch, and play, with reviews that range from a paragraph to a small essay. A few titles I will shamelessly push on anyone who asks: *Gravity's Rainbow*, *Solenoid*, Mark Fisher's *Capitalist Realism*, *Aftersun*, *The Zone of Interest*, *Disco Elysium*, *Outer Wilds*, and all five seasons of *The Wire*. If even one of those is new to you, I promise it will be worth your time. The negative reviews are equally honest; nothing here is polite for the sake of being polite.

[→ thoughts](/thoughts/)

---

<h2 id="writing"><a href="/writing/">writing :)</a></h2>

I spent three years as science editor and translator at Neu-Reality (神经现实), a Chinese-language neuroscience and philosophy platform, and seven months at *Scientific American* China, where I wrote weekly news and a print feature on the Adversarial Collaboration on Consciousness project, interviewing researchers like Cyriel Pennartz and Anil Seth. The longest project was translating Merlin Sheldrake's *Entangled Life* into Chinese (《菌络万象》); it took the better part of a year and won the 2025 Pingshan Natural History Museum Book Award. Personal essays and short fiction live here too, mostly written between experiments.

[→ writing & translation](/writing/)

---

<h2 id="science"><a href="/science/">science :)</a></h2>

My PhD asks what tunes the accuracy of memory. I study the locus coeruleus, a small brainstem nucleus classically treated as a slow, diffuse modulator of arousal. What I found is that it also delivers rapid, spatially confined dopamine signals into hippocampal CA1, and that these signals bias local neural dynamics during time and distance estimation in a navigation task. The dopamine transients decay over seconds and micrometres, selectively recruiting a population of ramping neurons and shifting when the animal initiates reward-seeking. I designed the experiments, built the analysis pipelines in **Python**, and developed a computational model to test the idea. A paper is in preparation. Before this I was in the Paulsen lab at Cambridge, where my undergraduate thesis looked at dopamine's role in CA3–CA1 synaptic plasticity. I am graduating December 2026 and looking for data science roles in Europe; if the overlap between neuroscience, computation, and careful writing sounds useful to you, get in touch.

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

There is a [CV](/cv/) if you need one. I am also building [the Zone](https://github.com/dinghaoluo/the_zone_site), a companion site for visualising *Gravity's Rainbow*: interactive maps, character networks, and cross-reference tools, because some books refuse to stay on the page. Seven Pynchon novels in and still finding new threads.
