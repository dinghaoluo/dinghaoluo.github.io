---
layout: single
author_profile: true
classes: home
---

*Hi, Dinghao here :)*

I'm finishing my PhD in neuroscience at the [Max Planck Florida Institute for Neuroscience](https://www.mpfi.org), studying how rapid locus coeruleus dopamine signals tune hippocampal dynamics during memory-guided navigation. I am graduating in December 2026 and looking for data science roles in Europe.

Recently I've been reading *Mason & Dixon* (1997), learning SQL and intermediate machine learning, and building a computational analysis of Pynchon's *Gravity's Rainbow*.

Reach out to me: <a href="mailto:dinghao.luo@outlook.com">[dinghao.luo@outlook.com]</a><br>
Find me: [GitHub](https://github.com/dinghaoluo) · [Reddit](https://www.reddit.com/user/amoxdl24/) · [Instagram](https://www.instagram.com/amoxitoxin) · [LinkedIn](https://www.linkedin.com/in/dinghaoluo/) · [CV](/cv/)

---

<h2 id="writing"><a href="/writing/">writing :)</a></h2>

Writing, along with reading, was one of my first true passions. Like many kids, I kept a journal as I grew up, and the advent of the Internet age allowed me to transform things I wrote in my journal into an online repository. I wrote under the pen-name `amoxitoxin` in Chinese since I was 15, and have translated selected pieces into English, which can be found on the *writing* page.

Since my undergraduate years at Cambridge, however, and now through my PhD, I have written mostly about science. I was one of the founding members of [**Neu-Reality**](https://neu-reality.com/) (神经现实), a Chinese-language neuroscience and philosophy platform, and spent three years as science editor and translator there. After that were seven months at <a href="https://www.huanqiukexue.com/"><strong><em>Scientific American</em> China</strong></a>, where I wrote weekly news, edited translations of each month's *SciAm* magazine, and finished [a print feature](/writing/acr-consciousness/) on [Accelerating Research on Consciousness](https://www.templetonworldcharity.org/our-priorities/discovery/accelerating-research-consciousness), interviewing researchers like Cyriel Pennartz and Anil Seth.

My longest project was translating Merlin Sheldrake's ***Entangled Life*** into Chinese (《菌络万象》), taking a total of 2 years as I was juggling my PhD experiments and analyses on the side. The efforts paid off, luckily: the Chinese translation is widely loved (sitting at [8.7/10 on Douban](https://book.douban.com/subject/37088268/) ['China's Goodreads']), and won the [2025 Pingshan Natural History Museum Book Award](https://m.sohu.com/a/970954278_122097022) amongst others. I also did a very fun [interview with Sheldrake](/writing/entangled-life/) after the publication of the Chinese edition.

[→ writing & translation](/writing/)

---

<h2 id="thoughts"><a href="/thoughts/">thoughts :)</a></h2>

{% assign all_thoughts = site.data.thoughts | sort: 'posted' | reverse %}
{% assign book_thoughts = all_thoughts | where: 'type', 'book' %}
{% assign game_thoughts = all_thoughts | where: 'type', 'game' %}

<div class="home-thoughts-block home-thoughts-block--books" markdown="1">
<div class="home-covers home-covers--books" aria-hidden="true" data-count="12" data-mobile-count="8">
  {% for t in book_thoughts %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" data-cn-edition="{% if t.creator contains '(CN' or t.image contains 'chinese' %}true{% else %}false{% endif %}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

Reading was probably my favourite pastime from childhood through my teenage years: the first durable way I found of making sense of the world as a kid. The early years of my PhD (regrettably) interrupted the habit for a while. Returning to books gave me back a method, a way of testing private feeling against politics, science, history, and fiction's strange talent for telling the truth sideways. The writers I return to most, for now, are Mircea Cărtărescu and Thomas Pynchon.

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

Films and television came later than books, but they fit the same habit from another angle: watching rhythm, framing, bodies, rooms, and cuts make an idea felt before it has to be stated. I write about them when a scene keeps its shape afterwards, whether that is a face held too long, a joke with a political aftertaste, or a structure that quietly tells on the world around it.

- ***Interstellar*** (2014) dir. Christopher Nolan
- ***The Wire*** Season 4 (2006) created by David Simon

<p class="home-thoughts-links"><a href="/thoughts/?type=film">→ films</a> · <a href="/thoughts/?type=tv">→ tv</a></p>
</div>

<div class="home-thoughts-block home-thoughts-block--games" markdown="1">
<div class="home-covers home-covers--games" aria-hidden="true" data-count="12" data-tablet-count="9" data-mobile-count="8">
  {% for t in game_thoughts %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

Games are where the systems part of my brain gets least restrained: maps, loops, boss phases, knowledge-locks, buildcraft, and the exact point where interaction becomes thought rather than ornament. A good game makes its world answer back: mechanics carry pressure the dialogue cannot, and the map knows I have touched it. I am less patient with games that mistake volume for life.

- ***Outer Wilds*** (2019) by Mobius Digital
- ***Elden Ring*** (2022) by FromSoftware

<p class="home-thoughts-links"><a href="/thoughts/?type=game">→ games</a></p>
</div>

---

<h2 id="science"><a href="/science/">science :)</a></h2>

My PhD asks how the brain starts a memory-guided action when landmarks are absent. In a virtual-reality navigation task, mice have to estimate elapsed time or distance before initiating reward seeking; I study how phasic LC dopamine signals in hippocampal CA1 tune that computation on the scale of seconds and micrometres. The work combines electrophysiology, optogenetics, two-photon dopamine and calcium imaging, behavioural analysis, **Python** pipelines, and computational modelling. A manuscript is in preparation. Before this I was in the Paulsen lab at Cambridge, where my undergraduate thesis looked at dopamine's role in CA3-CA1 synaptic plasticity.

[→ science](/science/)

---

<h2 id="music"><a href="/music/">music :)</a></h2>

<div class="home-featured-album">
  <a href="/music/" class="home-featured-album__cover">
    <img src="/assets/images/the_maze.jpg" alt="amoxitoxin album cover">
  </a>
  <div class="home-featured-album__info">
    <span class="home-featured-album__title">amoxitoxin</span>
    <p class="home-featured-album__desc">One-person prog and art-rock. The first album, 迷宮 (<em>The Maze</em>), was written during two years in Cambridge — five tracks and a bonus coda in English and Mandarin, somewhere between Pink Floyd and Haken.</p>
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
