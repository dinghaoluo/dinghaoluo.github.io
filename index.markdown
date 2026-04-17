---
layout: single
author_profile: true
classes: home
---

*Hi, Dinghao here :)* 

I am finishing my PhD in neuroscience at the [Max Planck Institute for Neuroscience](https://www.mpfi.org), working on how a tiny cluster of brainstem neurones uses dopamine to shape how animals remember. Graduating December 2026, and actively looking for data science/analysis roles in Europe.

<p class="currently-intro">Recently I've been reading <em class="currently-substance">{{ site.data.currently.reading }}</em>, learning <em class="currently-substance">{{ site.data.currently.learning }}</em>, and thinking about <em class="currently-substance">{{ site.data.currently.thinking }}</em>.</p>

Reach out to me: <a href="mailto:dinghao.luo@outlook.com">[dinghao.luo@outlook.com]</a>  
Find me: [GitHub](https://github.com/dinghaoluo) · [Reddit](https://www.reddit.com/user/amoxdl24/) · [Instagram](https://www.instagram.com/amoxitoxin) · [LinkedIn](https://www.linkedin.com/in/dinghaoluo/) · [CV](/cv/)

---

<h2 id="thoughts">thoughts :)</h2>

<div class="thoughts-preview-inline" id="thoughts-preview-inline">
  <span class="thoughts-preview-inline__label">my thoughts on&hellip;</span>
  {% assign thoughts = site.data.thoughts | sort: 'posted' | reverse %}
  {% for thought in thoughts limit:15 %}
  <a href="/thoughts/#{{ thought.title | slugify }}" class="thoughts-preview-inline__item" style="display:none">
    <span class="thoughts-preview-inline__title">{{ thought.title }}</span>
    <span class="thoughts-preview-inline__text">{{ thought.text | markdownify | strip_html | strip_newlines | strip | truncate: 60, '…' }}</span>
  </a>
  {% endfor %}
</div>

I also have some more day-to-day thoughts on various books, films, and other things that have been on my mind.

[→ thoughts](/thoughts/)

---

<h2 id="writing">writing :)</h2>

Three years at Neu-Reality (神经现实), seven months at *Scientific American* China, and a translation of Merlin Sheldrake's *Entangled Life* — winner of the 2025 Pingshan Natural History Museum Book Award.

[→ writing & translation](/writing/)

---

<h2 id="science">science :)</h2>

Phasic dopamine from the locus coeruleus, hippocampal CA1 subpopulations, and what it all means for how memories get encoded. **Python** pipelines and a computational model; paper in preparation.

[→ science](/science/)

---

<h2 id="music">music :)</h2>

Progressive art-rock as *amoxitoxin*. Several albums on [Bandcamp](https://amoxitoxin.bandcamp.com/).

[→ music](/music/)

---

<h2 id="photos">photos :)</h2>

A running collection of photographs from the field and daily life.

[→ photos](/photos/)

---

<h2 id="other-stuff">other stuff :)</h2>

There's a [CV](/cv/) too.
