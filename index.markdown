---
layout: single
author_profile: true
classes: home
---

*Hi, Dinghao here :)*

I am in the last stretch of my PhD in neuroscience at the [Max Planck Institute for Neuroscience](https://www.mpfi.org), working on how rapid dopamine signals in the hippocampus tune the accuracy of memory. I am graduating in December 2026 and looking for data science roles in Europe.

Recently I've been reading *Mason & Dixon* (1997), learning SQL and intermediate machine learning, and building a computational analysis of Pynchon's *Gravity's Rainbow*.

Reach out to me: <a href="mailto:dinghao.luo@outlook.com">[dinghao.luo@outlook.com]</a>
Find me: [GitHub](https://github.com/dinghaoluo) · [Reddit](https://www.reddit.com/user/amoxdl24/) · [Instagram](https://www.instagram.com/amoxitoxin) · [LinkedIn](https://www.linkedin.com/in/dinghaoluo/) · [CV](/cv/)

---

<h2 id="thoughts"><a href="/thoughts/">thoughts :)</a></h2>

{% assign all_thoughts = site.data.thoughts | sort: 'posted' | reverse %}
{% assign book_thoughts = all_thoughts | where: 'type', 'book' %}
{% assign game_thoughts = all_thoughts | where: 'type', 'game' %}

<div class="home-thoughts-block home-thoughts-block--books" markdown="1">
<div class="home-covers home-covers--books" aria-hidden="true" data-count="12" data-mobile-count="8">
  {% for t in book_thoughts %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" data-cn-edition="{% if t.creator contains '(CN' or t.image contains 'chinese' %}true{% else %}false{% endif %}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

Reading was probably my favourite pastime from childhood through my teenage years: the first durable way I found of making sense of the world as a kid. The early years of my PhD (regrettably) interrupted the habit for a while. Returning to books gave me back a method, a way of testing private feeling against politics, science, history, and fiction's strange talent for telling the truth sideways. The writers I return to most, for now, are Mircea Cărtărescu and Thomas Pynchon. These are a few books I love, not a canon; more like coordinates for the way I read now, and possible doorways if one of them is new to you.

- ***Solenoid*** (2015) by Mircea Cărtărescu
- ***Gravity's Rainbow*** (1973) by Thomas Pynchon
- ***Capitalist Realism*** (2009) by Mark Fisher
- ... *and if you read Chinese*, my translation of ***Entangled Life*** (2020) by Merlin Sheldrake

<p class="home-thoughts-links"><a href="/thoughts/?type=book">→ books</a></p>
</div>

<div class="home-thoughts-block home-thoughts-block--screen" markdown="1">
<div class="home-covers home-covers--screen" aria-hidden="true" data-count="12" data-tablet-count="9" data-mobile-count="8">
  {% for t in all_thoughts %}{% if t.image and t.type == 'film' %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% if t.image and t.type == 'tv' %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

Films and television came later than books, but they fit the same habit from another angle: watching rhythm, framing, bodies, rooms, and cuts put pressure on an idea before the explanation arrives. I write about them when a scene keeps its shape afterwards, whether that is a face held too long, a joke with a political aftertaste, or a structure that quietly tells on the world around it.

- ***Interstellar*** (2014) dir. Christopher Nolan
- ***The Wire*** Season 4 (2006) created by David Simon

<p class="home-thoughts-links"><a href="/thoughts/?type=film">→ films</a> · <a href="/thoughts/?type=tv">→ tv</a></p>
</div>

<div class="home-thoughts-block home-thoughts-block--games" markdown="1">
<div class="home-covers home-covers--games" aria-hidden="true" data-count="12" data-tablet-count="9" data-mobile-count="8">
  {% for t in game_thoughts %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

Games are where the systems part of my brain gets least restrained: maps, loops, boss phases, knowledge-locks, buildcraft, and the exact point where interaction becomes thought rather than ornament. I am drawn to worlds that respond and to mechanics that carry more than the dialogue can say. I am less patient with games that mistake volume for life.

- ***Outer Wilds*** (2019) by Mobius Digital
- ***Elden Ring*** (2022) by FromSoftware

<p class="home-thoughts-links"><a href="/thoughts/?type=game">→ games</a></p>
</div>

---

<h2 id="writing"><a href="/writing/">writing :)</a></h2>

Writing came before most of the official things here. I spent three years as science editor and translator at Neu-Reality (神经现实), a Chinese-language neuroscience and philosophy platform, and seven months at *Scientific American* China, where I wrote weekly news and a print feature on the Adversarial Collaboration on Consciousness project, interviewing researchers like Cyriel Pennartz and Anil Seth. The longest project was translating Merlin Sheldrake's *Entangled Life* into Chinese (《菌络万象》); it took the better part of a year and won the 2025 Pingshan Natural History Museum Book Award. Personal essays and short fiction live here too, mostly written between experiments, moves, and periods of not quite knowing what to do with myself.

[→ writing & translation](/writing/)

---

<h2 id="science"><a href="/science/">science :)</a></h2>

My PhD asks what tunes the accuracy of memory, which is another way of asking why some moments stay precise while others blur before we can hold them. The locus coeruleus, a small brainstem nucleus, is usually treated as a slow arousal system: a diffuse neuromodulatory volume knob. My work starts from a different possibility, that rapid LC dopamine signals in hippocampal CA1 change local neural dynamics on the scale at which a memory-guided decision is made. In a navigation task, these dopamine transients decay over seconds and micrometres, recruit a population of ramping neurons, and shift when the animal initiates reward-seeking. I designed the experiments, built the analysis pipelines in **Python**, and developed a computational model to test the mechanism. A paper is in preparation. Before this I was in the Paulsen lab at Cambridge, where my undergraduate thesis looked at dopamine's role in CA3–CA1 synaptic plasticity. I am graduating December 2026 and looking for data science roles in Europe; if the overlap between neuroscience, computation, and careful writing sounds useful to you, get in touch.

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

I listen to far more than I make, which is probably healthy: prog, jazz fusion, Canterbury scene, metal, and whatever else pulls me in on a given week. There are album reviews here too, several hundred of them, covering everything from King Crimson to Keor to 万能青年旅店.

[→ music](/music/)

---

<h2 id="photos"><a href="/photos/">photos :)</a></h2>

Photographs from fieldwork, travel, and the small daily-life moments that made me stop walking. Mostly shot on a Fujifilm X-T4; nothing staged, nothing filtered.

[→ photos](/photos/)

---

<h2 id="other-stuff">other stuff :)</h2>

There is a [CV](/cv/) if you need one. I am also building [the Zone](https://github.com/dinghaoluo/the_zone_site), a computational companion to *Gravity's Rainbow*: maps, character networks, and cross-reference tools for a book that refuses to stay on the page. After seven Pynchon novels, I am still finding new threads.
