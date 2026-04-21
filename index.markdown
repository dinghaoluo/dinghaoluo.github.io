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

{% assign all_thoughts = site.data.thoughts | sort: 'posted' | reverse %}
{% assign t_books = all_thoughts | where: "type", "book" %}
{% assign t_films = all_thoughts | where: "type", "film" %}
{% assign t_games = all_thoughts | where: "type", "game" %}
{% assign t_tv = all_thoughts | where: "type", "tv" %}

<div class="home-covers" aria-hidden="true">
  {% for t in all_thoughts limit:30 %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

I consume things compulsively and I have opinions about most of them. {{ t_books.size }} books — Pynchon's parabolas, Cărtărescu's Bucharest, Mark Fisher finding the words for what an entire generation already felt. {{ t_films.size }} films — Tarkovsky's *Stalker*, Kubrick's corridors, Haneke making you sit with it. {{ t_tv.size }} TV seasons — *The Wire* reshaping what the form can do, Fargo's snow-covered absurdism. {{ t_games.size }} games — *Disco Elysium*'s internal monologue, *Outer Wilds* teaching you to let go, soulslikes that mean it. Some thoughts are long; none are particularly polite about things I didn't like. I write the kind of reviews I wish I'd found before picking up the book or pressing play — not summaries, but real engagement with what the thing is trying to do and whether it pulls it off.

[→ thoughts](/thoughts/)

---

<h2 id="writing">writing :)</h2>

Three years editing neuroscience writing at Neu-Reality (神经现实), one of the earliest Chinese-language science communication platforms, where I translate and write about brain research for a general educated audience. Seven months as a science editor at *Scientific American* China, where I wrote weekly news pieces and a print feature on the ARC project — the largest adversarial collaboration on consciousness ever attempted — for which I got to interview Cyriel Pennartz and Anil Seth. And a Chinese translation of Merlin Sheldrake's *Entangled Life*, which won the 2025 Pingshan Natural History Museum Book Award; after finishing the translation I sat down with Sheldrake to talk about fungi, fermentation, and what it means to think about organisms that don't have brains. Science is what I study; writing about it, in both languages, is how I make sense of it.

[→ writing & translation](/writing/)

---

<h2 id="science">science :)</h2>

My PhD asks what sounds like a simple question: how does the brain decide what to remember? I study the locus coeruleus, a tiny cluster of brainstem neurones that sends dopamine into the hippocampus. The textbook picture treats the LC as a slow, diffuse modulator — a volume knob on arousal. I'm trying to work out whether that picture is too coarse: whether the phasic dopamine signals do something more precise, selectively shaping which cell populations in hippocampal CA1 fire and which memories survive. I designed the experiments, built the analysis pipelines in **Python**, and developed a computational model to test the idea. Paper getting closer to done. Before this I was in the Paulsen lab at Cambridge, where my undergraduate thesis looked at dopamine's role in CA3–CA1 synaptic plasticity — so the LC–hippocampus axis has been a thread through everything I've done.

[→ science](/science/)

---

<h2 id="music">music :)</h2>

<div class="home-albums" aria-hidden="true">
  {% assign albums = site.data.music_thoughts | sort: 'posted' | reverse %}
  {% for a in albums limit:24 %}{% if a.image %}<img src="{{ a.image }}" alt="" loading="lazy">{% endif %}{% endfor %}
</div>

I write and record progressive art-rock under the name *amoxitoxin* — one album out so far, with neuroscience and Cambridge seeping into the song titles whether I want them to or not (*central pattern generator*, *the rain on the Cam*). I also listen obsessively: prog, jazz fusion, Canterbury scene, and whatever else catches me. There are {{ albums.size }} albums on the music page with thoughts on each — here are the most recent covers. Some longer thoughts on the ones that stayed with me.

[→ music](/music/)

---

<h2 id="photos">photos :)</h2>

A running collection of photographs from the field and daily life.

[→ photos](/photos/)

---

<h2 id="other-stuff">other stuff :)</h2>

There's a [CV](/cv/), and I'm building [the zone](https://github.com/dinghaoluo/the_zone_site) — a companion site for visualising *Gravity's Rainbow*, because some books won't stay on the page. Seven Pynchon novels in and I'm still finding new threads.
