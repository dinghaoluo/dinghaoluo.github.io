---
layout: single
author_profile: true
permalink: /writing/
title: "writing"
---

Writing came first for me, before the PhD, before most of the science, before I had any sensible idea what I was doing. This page gathers the public-facing version of that habit: science features, translations, fiction, and essays.

**Science writing**: I spent three years at Neu-Reality (神经现实), a Chinese science platform, writing about neuroscience for people who wanted to understand the brain without the jargon. I then spent seven months at *Scientific American* China, where I wrote weekly news and interviewed researchers like Anil Seth and Cyriel Pennartz for a print feature on the largest consciousness collaboration ever attempted.

**Translation**: I translated Merlin Sheldrake's *Entangled Life* into Chinese; it won the 2025 Pingshan Natural History Museum Book Award.

**Fiction and essays**: I've kept a personal platform (阿莫東森的無聊生活) since secondary school - fiction, essays, the occasional debunking piece, a long biographical essay on Rachmaninoff. The writers I return to most are Grace Lindsay, who makes computational neuroscience feel like intellectual history; Merlin Sheldrake, who follows fungi into the root systems of the world; Mark Fisher, who finds the exact words for what everyone already felt.

---

{% assign articles = site.writing | sort: 'date' | reverse %}
{% assign print_articles = articles | where: "section", "print" %}
{% assign online_articles = articles | where: "section", "online" %}
{% assign binaural_article = articles | where: "title", "Binaural beats, or malice as neuroscience" %}
{% assign science_articles = online_articles | concat: binaural_article | sort: 'date' | reverse %}
{% assign fiction_articles = articles | where: "category", "fiction" %}
{% assign journal_articles = articles | where: "category", "journal" %}
{% assign scicomm_articles = articles | where: "category", "scicomm" | where_exp: "item", "item.title != 'Binaural beats, or malice as neuroscience'" %}
{% assign encyclopaedic_articles = articles | where: "category", "encyclopaedic" %}
{% assign journal_combined = journal_articles | concat: scicomm_articles | concat: encyclopaedic_articles | sort: 'date' | reverse %}

### print

<div class="writing-list">
{% for article in print_articles %}
<div class="writing-entry{% if article.featured %} writing-entry--featured{% endif %}">
  {% if article.image %}
  <a href="{{ article.url }}" class="writing-entry__img-wrap">
    <img src="{{ article.image }}" alt="{{ article.title }}" class="writing-entry__img" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    <span class="writing-entry__type">{{ article.type }}</span>
    <h3 class="writing-entry__title">
      <a href="{{ article.url }}">{{ article.title }}</a>
    </h3>
    {% if article.title_zh %}
    <span class="writing-entry__title-en">{{ article.title_zh }}</span>
    {% endif %}
    <div class="writing-entry__meta">
      {% if article.creator %}{{ article.creator }} · {% endif %}{{ article.outlet }}{% if article.outlet_en %} ({{ article.outlet_en }}){% endif %} · {{ article.date | date: "%B %Y" }}{% if article.isbn %} · ISBN {{ article.isbn }}{% endif %}
    </div>
    {% if article.excerpt %}
    <div class="writing-entry__text">{{ article.excerpt }}</div>
    {% endif %}
    {% if article.awards %}
    <div class="writing-entry__awards">
      {% for award in article.awards %}
      <span class="writing-entry__award">{{ award }}</span>
      {% endfor %}
    </div>
    {% endif %}
    {% if article.links.size > 0 %}
    <div class="writing-entry__links">
      {% for link in article.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>

---

### science

<div class="writing-list">
{% for article in science_articles %}
<div class="writing-entry writing-entry--science">
  {% if article.image %}
  <a href="{{ article.url }}" class="writing-entry__banner-wrap">
    <img src="{{ article.image }}" alt="{{ article.title }}" class="writing-entry__banner" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    <span class="writing-entry__type">{{ article.type }}</span>
    <h3 class="writing-entry__title">
      <a href="{{ article.url }}">{{ article.title }}</a>
    </h3>
    {% if article.title_zh %}
    <span class="writing-entry__title-en">{{ article.title_zh }}</span>
    {% endif %}
    <div class="writing-entry__meta">
      {% if article.creator %}{{ article.creator }} · {% endif %}{{ article.outlet }}{% if article.outlet_en %} ({{ article.outlet_en }}){% endif %} · {{ article.date | date: "%B %Y" }}
    </div>
    {% if article.excerpt %}
    <div class="writing-entry__text">{{ article.excerpt }}</div>
    {% endif %}
    {% if article.links.size > 0 %}
    <div class="writing-entry__links">
      {% for link in article.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>

---

### fiction

<div class="writing-list">
{% for article in fiction_articles %}
<div class="writing-entry writing-entry--fiction">
  <a href="{{ article.url }}" class="writing-entry__banner-wrap">
    {% if article.image %}
    <img src="{{ article.image }}" alt="{{ article.title }}" class="writing-entry__banner" loading="lazy">
    {% endif %}
  </a>
  <div class="writing-entry__body">
    <span class="writing-entry__type">{{ article.category }}</span>
    <h3 class="writing-entry__title">
      <a href="{{ article.url }}">{{ article.title }}</a>
    </h3>
    {% if article.title_zh %}
    <span class="writing-entry__title-en">{{ article.title_zh }}</span>
    {% endif %}
    <div class="writing-entry__meta">
      {% if article.creator %}{{ article.creator }} · {% endif %}{{ article.date | date: "%B %Y" }}
    </div>
    {% if article.excerpt %}
    <div class="writing-entry__text">{{ article.excerpt }}</div>
    {% endif %}
    {% if article.links.size > 0 %}
    <div class="writing-entry__links">
      {% for link in article.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>

---

### journal

<div class="writing-list writing-list--journal">
{% for article in journal_combined %}
<div class="writing-entry writing-entry--journal">
  {% if article.image %}
  <a href="{{ article.url }}" class="writing-entry__banner-wrap">
    <img src="{{ article.image }}" alt="{{ article.title }}" class="writing-entry__banner" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    <span class="writing-entry__type">{{ article.category }}</span>
    <h3 class="writing-entry__title">
      <a href="{{ article.url }}">{{ article.title }}</a>
    </h3>
    {% if article.title_zh %}
    <span class="writing-entry__title-en">{{ article.title_zh }}</span>
    {% endif %}
    <div class="writing-entry__meta">
      {% if article.creator %}{{ article.creator }} · {% endif %}{{ article.date | date: "%B %Y" }}
    </div>
    {% if article.excerpt %}
    <div class="writing-entry__text">{{ article.excerpt }}</div>
    {% endif %}
    {% if article.links.size > 0 %}
    <div class="writing-entry__links">
      {% for link in article.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>

---

### translations

I also translated and edited work by Michael Graziano, Timothy Lillicrap and Geoffrey Hinton, Jordana Cepelewicz, Alex Mar, and others into Chinese for Neu-Reality.

- Michael Graziano, 'Are We Really Conscious?' — *The Atlantic* · [original](https://www.theatlantic.com/science/archive/2016/03/phlegm-theories-of-consciousness/472812/) · [中文](https://mp.weixin.qq.com/s/dUAQ-v7_Xb_uP1znW4f-0g)
- Timothy P. Lillicrap, Adam Santoro, Luke Marris, Colin J. Akerman and Geoffrey Hinton, 'Backpropagation and the Brain' — *Nature Reviews Neuroscience* · [original](https://www.nature.com/articles/s41583-020-0277-3) · [中文](https://mp.weixin.qq.com/s/n0cNsT_Gf7RZBFjE3rd_hw)
- Jordana Cepelewicz, 'In Brain's Electrical Ripples, Markers for Memories Appear' — *Quanta Magazine* · [original](https://www.quantamagazine.org/in-brains-electrical-ripples-markers-for-memories-appear-20190806/) · [中文](https://mp.weixin.qq.com/s/gpKgkS9_EMnG7auZKLDuyw)
- Grigori Guitchounts, 'An Existential Crisis in Neuroscience' — *Nautilus* · [original](https://nautil.us/an-existential-crisis-in-neuroscience-236115/) · [中文](https://mp.weixin.qq.com/s/TWu-VGcNfIg0oQYeXO3mSg)
- Kevin Berger, 'Gustav Klimt in the Brain Lab' — *Nautilus* · [original](https://nautil.us/gustav-klimt-in-the-brain-lab-237578/) · [中文](https://mp.weixin.qq.com/s/bZJhnXy4RNnYkSdE2kbGUA)
- Dyani Lewis, 'Optogenetics: Understanding the Brain One Flash of Light at a Time' — *Cosmos Magazine* · [original](https://cosmosmagazine.com/biology/optogenetics-understanding-the-brain-one-flash-of-light-at-a-time) · [中文](https://mp.weixin.qq.com/s?__biz=MzkxNzg2MzkxNg==&mid=2247539537&idx=1&sn=45a1385d9a380990018731b7f3a7dfd7&source=41)
- Alex Mar, 'The Uncanny Love of Robot-Making' — *WIRED* · [original](https://www.wired.com/2017/10/hiroshi-ishiguro-when-robots-act-just-like-humans/) · [中文](https://mp.weixin.qq.com/s/AB9Pxh-52b7ZJxSDTfaceA)
- Steve Ayan, 'The Brain's Autopilot Mechanism Steers Consciousness' — *Scientific American* · [original](https://www.scientificamerican.com/article/the-brains-autopilot-mechanism-steers-consciousness/) · [中文](https://mp.weixin.qq.com/s/edW5JRQ2VZF7k6E5daDkYA)
