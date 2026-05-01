---
layout: single
author_profile: true
classes: home
---

*Hi, Dinghao here :)*

I'm finishing my PhD in neuroscience at the Max Planck Florida Institute for Neuroscience, studying how a small brainstem nucleus uses dopamine to shape memory in the hippocampus. I'm graduating in December 2026 and looking for data science roles in Europe.

Recently I've been reading *Mason & Dixon* (1997), learning SQL and intermediate machine learning, and working on a computational analysis of Pynchon's *Gravity's Rainbow*.

Reach out to me: <a href="mailto:dinghao.luo@outlook.com" class="site-nav-link">[dinghao.luo@outlook.com]</a><br>Find me: <a href="https://github.com/dinghaoluo" class="site-nav-link">GitHub</a> · <a href="https://www.reddit.com/user/amoxdl24/" class="site-nav-link">Reddit</a> · <a href="https://www.instagram.com/amoxitoxin" class="site-nav-link">Instagram</a> · <a href="https://www.linkedin.com/in/dinghaoluo/" class="site-nav-link">LinkedIn</a> · <a href="/cv/" class="site-nav-link">CV</a>

---

<h2 id="writing"><a href="/writing/">writing :)</a></h2>

Writing, along with reading, was one of my first true passions. Like many kids, I kept a journal as I grew up, and the advent of the Internet age allowed me to transform things I wrote in my journal into an online repository. I wrote under the pen-name `amoxitoxin` in Chinese since I was 15, and have translated selected pieces into English, which can be found on the <a href="/writing/" class="site-nav-link">writing</a> page. Here are some of the pieces of which I am proudest:

<div class="home-writing-shelf" aria-label="featured writing">
  <a class="home-writing-tile home-writing-tile--gravity" href="/writing/gravitys-rainbow/" aria-label="Fires a Calculation; Hits a Coordinate: On Gravity's Rainbow">
    <img class="home-writing-tile__image" src="/assets/images/writing/gravitys_rainbow_hardcover.jpg" alt="" loading="lazy">
    <span class="home-writing-tile__glass">
      <span class="home-writing-tile__kicker">review</span>
      <span class="home-writing-tile__title">On <em>Gravity's Rainbow</em>:<br><span class="home-writing-tile__title-subtitle">Fires a Calculation; Hits a Coordinate</span></span>
    </span>
  </a>
  <a class="home-writing-tile home-writing-tile--place-cells" href="/writing/place-cells/" aria-label="Just One Centimetre Deeper: Place Cells and the Brain's Cartography">
    <img class="home-writing-tile__image" src="/assets/images/writing/place-cells-hippocampus-cleaned.jpg" alt="" loading="lazy">
    <span class="home-writing-tile__glass">
      <span class="home-writing-tile__kicker">science</span>
      <span class="home-writing-tile__title">Just One Centimetre Deeper: <span class="home-writing-tile__title-subtitle">Place Cells and the Brain's Cartography</span></span>
    </span>
  </a>
  <a class="home-writing-tile home-writing-tile--freedoms" href="/writing/two-freedoms/" aria-label="Two Freedoms">
    <img class="home-writing-tile__image" src="/assets/images/personal/two-freedoms.webp" alt="" loading="lazy">
    <span class="home-writing-tile__glass">
      <span class="home-writing-tile__kicker">journal</span>
      <span class="home-writing-tile__title">Two Freedoms</span>
      <span class="home-writing-tile__title-zh" lang="zh-Hant">兩種自由</span>
    </span>
  </a>
  <a class="home-writing-tile home-writing-tile--solenoid" href="/writing/solenoid/" aria-label="Nothing Is Strange to a Child: On Solenoid">
    <img class="home-writing-tile__image" src="/assets/images/writing/solenoid.jpg" alt="" loading="lazy">
    <span class="home-writing-tile__glass">
      <span class="home-writing-tile__kicker">review</span>
      <span class="home-writing-tile__title">On <em>Solenoid</em>:<br><span class="home-writing-tile__title-subtitle">Nothing Is Strange to a Child</span></span>
    </span>
  </a>
  <a class="home-writing-tile home-writing-tile--shanwei" href="/writing/shanwei/" aria-label="Shanwei">
    <img class="home-writing-tile__image" src="/assets/images/personal/shanwei.webp" alt="" loading="lazy">
    <span class="home-writing-tile__glass">
      <span class="home-writing-tile__kicker">journal</span>
      <span class="home-writing-tile__title">Shanwei</span>
      <span class="home-writing-tile__title-zh" lang="zh-Hant">汕尾</span>
    </span>
  </a>
</div>

Since my undergraduate years at Cambridge, however, and now through my PhD, I have written mostly about science. I was one of the founding members of Neu-Reality (神经现实), a Chinese-language neuroscience and philosophy platform, and spent three years as science editor and translator there. After that were seven months at *Scientific American* China, where I wrote weekly news, edited translations of each month's *SciAm* magazine, and finished <a href="/writing/arc-consciousness/" class="site-nav-link">a print feature</a> on Templeton World Charity Foundation's Accelerating Research on Consciousness (ARC) initiative, interviewing researchers like Cyriel Pennartz and Anil Seth.

<figure class="home-writing-award">
  <img src="/assets/images/writing/entangled-life-pingshan-award.jpg" alt="The Chinese edition of Entangled Life displayed with the Pingshan Natural History Museum Book Award certificate." loading="lazy">
  <figcaption>Pingshan Natural History Museum Book Award, 2025.</figcaption>
</figure>

My longest writing project was translating Merlin Sheldrake's ***Entangled Life*** into Chinese ([《菌络万象》](https://www.amazon.com/dp/7559677754)), taking a total of 2 years as I was juggling my PhD experiments and analyses on the side. The Chinese edition is widely loved ([8.7/10 on Douban](https://book.douban.com/subject/37088268/)) and won the 2025 Pingshan Natural History Museum Book Award amongst others. I sat down with Sheldrake afterwards for <a href="/writing/entangled-life/" class="site-nav-link">a conversation about fungi, translation, and strangeness</a>.

<a href="/writing/" class="site-nav-link">→ writing</a>

---

<h2 id="thoughts"><a href="/thoughts/">thoughts :)</a></h2>

{% assign all_thoughts = site.data.thoughts | sort: 'posted' | reverse %}
{% assign book_thoughts = all_thoughts | where: 'type', 'book' %}
{% assign game_thoughts = all_thoughts | where: 'type', 'game' %}

<div class="home-thoughts-block home-thoughts-block--books" markdown="1">
<div class="home-covers home-covers--books" aria-hidden="true" data-count="12" data-mobile-count="15">
  {% for t in book_thoughts %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" data-cn-edition="{% if t.creator contains '(CN' or t.image contains 'chinese' %}true{% else %}false{% endif %}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

Reading was probably my favourite pastime from childhood through my teenage years: the first durable way I found of making sense of the world as a kid. The early years of my PhD (regrettably) interrupted the habit for a while. Returning to books gave me back a method, a way of testing private feeling against politics, science, history, and fiction's strange talent for telling the truth sideways. The writers I return to most, for now, are Mircea <span class="ro-name" lang="ro">Cărtărescu</span> and Thomas Pynchon.

- [***Solenoid*** (2015)](/thoughts/#solenoid) by Mircea <span class="ro-name" lang="ro">Cărtărescu</span>
- [***Vineland*** (1990)](/thoughts/#vineland) by Thomas Pynchon
- [***Capitalist Realism*** (2009)](/thoughts/#capitalist-realism-is-there-no-alternative) by Mark Fisher
- [***Models of the Mind*** (2021)](/thoughts/#models-of-the-mind-how-physics-engineering-and-mathematics-have-shaped-our-understanding-of-the-brain) by Grace Lindsay
- [***When We Cease to Understand the World*** (2020)](/thoughts/#when-we-cease-to-understand-the-world) by Benjamín Labatut
- ... *and if you read Chinese*, my translation of [***Entangled Life*** (2020)](/thoughts/#entangled-life) by Merlin Sheldrake

<p class="home-thoughts-links"><a href="/thoughts/?type=book">→ books</a></p>
</div>

<div class="home-thoughts-block home-thoughts-block--screen" markdown="1">
<div class="home-covers home-covers--screen" aria-hidden="true" data-count="12" data-tablet-count="9" data-mobile-count="15">
  {% for t in all_thoughts %}{% if t.image and t.type == 'film' %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% if t.image and t.type == 'tv' %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

Films and television came later than books, but they fit the same habit from another angle: watching rhythm, framing, bodies, rooms, and cuts make an idea felt before it has to be stated. I write about them when a scene keeps its shape afterwards, whether that is a face held too long, a joke with a political aftertaste, or a structure that quietly tells on the world around it.

- ***Interstellar*** (2014) dir. Christopher Nolan
- ***The Wire*** Season 4 (2006) created by David Simon

<p class="home-thoughts-links"><a href="/thoughts/?type=film">→ films</a> · <a href="/thoughts/?type=tv">→ tv</a></p>
</div>

<div class="home-thoughts-block home-thoughts-block--games" markdown="1">
<div class="home-covers home-covers--games" aria-hidden="true" data-count="12" data-tablet-count="9" data-mobile-count="15">
  {% for t in game_thoughts %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" data-type="{{ t.type }}" data-eval="{{ t.eval | default: '' | downcase | escape }}" data-title="{{ t.title | escape }}" data-title-en="{{ t.title_en | default: '' | escape }}" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

Games are where the systems part of my brain gets least restrained: maps, loops, boss phases, knowledge-locks, buildcraft, and the exact point where interaction becomes thought rather than ornament. A good game makes its world answer back: mechanics carry pressure the dialogue cannot, and the map knows I have touched it. I am less patient with games that mistake volume for life.

- ***Outer Wilds*** (2019) by Mobius Digital
- ***Elden Ring*** (2022) by FromSoftware

<p class="home-thoughts-links"><a href="/thoughts/?type=game">→ games</a></p>
</div>

---

<h2 id="science"><a href="/science/">science :)</a></h2>

My PhD asks how the brain starts a memory-guided action when landmarks are absent, and how a fast dopamine signal from the brainstem puts the hippocampus into the right state to make that decision. The work combines electrophysiology, optogenetics, two-photon dopamine and calcium imaging, behavioural analysis, **Python** pipelines, and computational modelling. A manuscript is in preparation. Before this I was in the Paulsen lab at Cambridge, where my undergraduate thesis looked at dopamine's role in CA3-CA1 synaptic plasticity.

<div class="home-science-strip" aria-label="Science photos">
  <figure class="home-science-card">
    <img src="/assets/images/science/genetics-society-summer-school-edinburgh-2018.webp" alt="Participants at the Genetics Society Summer School Workshop in Edinburgh, seated in a conference room." loading="lazy" width="1846" height="1299">
    <figcaption><span>Genetics Society, Queen Square, 2018.</span> I only realised later that I had forgotten to take a picture with the Fisher lab members. I really did have such a great time at Queen Square.</figcaption>
  </figure>
  <figure class="home-science-card">
    <img src="/assets/images/science/paulsen-lab-cambridge-2019.webp" alt="Members of the Paulsen lab gathered around a dinner table in Cambridge." loading="lazy" width="1500" height="1000">
    <figcaption><span>Paulsen lab, Cambridge, 2019.</span> The lab where electrophysiology became a room, a table, and people I learned from.</figcaption>
  </figure>
  <figure class="home-science-card">
    <img src="/assets/images/science/wang-lab-mpfi.webp" alt="Members of the Wang Lab gathered in the Max Planck Florida Institute atrium." loading="lazy" width="1920" height="1280">
    <figcaption><span>Wang Lab, MPFI.</span> The lab where the PhD work lives now: behaviour, imaging, hippocampal circuits, and the analysis code connecting them.</figcaption>
  </figure>
</div>

<a href="/science/" class="site-nav-link">→ science</a>

---

<h2 id="music"><a href="/music/">music :)</a></h2>

<div class="home-featured-album">
  <a href="/music/" class="home-featured-album__cover">
    <img src="/assets/images/the_maze.jpg" alt="amoxitoxin album cover">
  </a>
  <div class="home-featured-album__info">
    <span class="home-featured-album__title">amoxitoxin</span>
    <p class="home-featured-album__desc">One-person prog and art-rock. The first album, 迷宮 (<em>The Maze</em>), was written during two years in Cambridge — five tracks and a bonus coda in English and Mandarin, somewhere between Pink Floyd and Haken.</p>
    <a href="https://amoxitoxin.bandcamp.com/" class="home-featured-album__link">Bandcamp</a> · <a href="/music/" class="home-featured-album__link site-nav-link">listen here</a>
  </div>
</div>

<div class="home-albums" aria-hidden="true">
  {% assign albums = site.data.music_thoughts | sort: 'posted' | reverse %}
  {% for a in albums limit:40 %}{% if a.image %}<a href="/music/#{{ a.title | slugify }}" class="home-albums__link" style="display:none"><img src="{{ a.image }}" alt="{{ a.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

I listen to far more than I make, which is probably healthy: prog, jazz fusion, Canterbury scene, metal, and whatever else pulls me in on a given week. There are album reviews here too, several hundred of them, covering everything from King Crimson to Keor to 万能青年旅店.

<a href="/music/" class="site-nav-link">→ music</a>

---

<h2 id="photos"><a href="/photos/">photos :)</a></h2>

Photographs from fieldwork, travel, and the small daily-life moments that made me stop walking. Mostly shot on a Fujifilm X-T4; nothing staged, nothing filtered.

<a href="/photos/" class="site-nav-link">→ photos</a>

---

<h2 id="other-stuff">other stuff :)</h2>

There is a <a href="/cv/" class="site-nav-link">CV</a> if you need one. I am also building [the Zone](https://github.com/dinghaoluo/the_zone_site), a computational companion to *Gravity's Rainbow*: maps, character networks, and cross-reference tools for a book that refuses to stay on the page. After seven Pynchon novels, I am still finding new threads.
