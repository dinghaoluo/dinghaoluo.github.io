---
layout: single
author_profile: true
permalink: /writing/
title: "writing"
classes: writing-page
---

Reading gives me obsessions; writing tests what I have actually understood. This is where the writing lives: science features, translation, fiction, journals, and essays.

**Science writing**: I spent three years at [Neu-Reality (神经现实)](https://neu-reality.com/), a Chinese neuroscience and philosophy platform, writing, editing, proofreading, and translating science pieces for a general audience. I then spent seven months at [*Scientific American* China](https://www.huanqiukexue.com/), where I wrote weekly news and interviewed researchers like Anil Seth and Cyriel Pennartz for [a print feature](/writing/acr-consciousness/) on [Accelerating Research on Consciousness](https://www.templetonworldcharity.org/our-priorities/discovery/accelerating-research-consciousness).

**Translation**: I translated Merlin Sheldrake's *Entangled Life* into Chinese, a book that forced the question of whether scientific precision and living strangeness can share a sentence. The Chinese edition has since been recognised by Pingshan, Scientific American China, and Douban.

**Short stories and essays**: I've kept a personal platform (@阿莫東森的無聊生活) since secondary school. There I write short stories, essays, and some occasional sci-comm pieces.

---

{% assign articles = site.writing | sort: 'date' | reverse %}
{% assign featured_articles = articles | where: "writing_feature", true | sort: "writing_feature_order" %}

<h2 class="writing-section-title" id="print">print</h2>

<div class="writing-list">
{% for article in articles %}
{% assign is_print_article = false %}
{% if article.section == "print" %}
  {% assign is_print_article = true %}
{% endif %}
{% if article.type == "translation" %}
  {% assign is_print_article = true %}
{% endif %}
{% if is_print_article and article.writing_page != false %}
{% assign print_type = article.type %}
{% if article.type == "feature" %}
  {% assign print_type = "science" %}
{% endif %}
{% assign print_title = article.archive_title | default: article.title_display | default: article.title %}
{% assign print_excerpt = article.archive_excerpt | default: article.excerpt %}
{% assign title_is_plain = false %}
{% if article.type == "translation" or article.title_link == false %}
  {% assign title_is_plain = true %}
{% endif %}
<div class="writing-entry writing-entry--print writing-entry--print-{{ print_type | slugify }}{% if article.type == 'translation' %} writing-entry--translation{% endif %}{% if article.featured %} writing-entry--featured{% endif %}">
  {% if article.image %}
  <a href="{{ article.url }}" class="writing-entry__img-wrap">
    <img src="{{ article.image }}" alt="{{ print_title | strip_html | escape }}" class="writing-entry__img" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    {% unless article.show_archive_type == false %}
    <span class="writing-entry__type">{{ print_type }}</span>
    {% endunless %}
    <h3 class="writing-entry__title{% if title_is_plain %} writing-entry__title--plain{% endif %}">
      {% if title_is_plain %}
      <span class="writing-entry__title-main">{{ print_title }}</span>
      {% else %}
      <a href="{{ article.url }}">{{ print_title }}</a>
      {% endif %}
      {% if article.title_zh %}
      <span class="writing-entry__title-zh-inline">{{ article.title_zh }}</span>
      {% endif %}
    </h3>
    {% if article.links.size > 0 %}
    <div class="writing-entry__book-links">
      {% for link in article.links %}
      <a href="{{ link.url }}">{{ link.label | downcase }}</a>
      {% endfor %}
    </div>
    {% endif %}
    {% if article.companion_link %}
    <div class="writing-entry__companion-link">
      {% if article.companion_lede %}
      <span class="writing-entry__companion-lede">{{ article.companion_lede }}</span>
      {% endif %}
      <a href="{{ article.companion_link.url }}">{{ article.companion_link.label }}</a>
    </div>
    {% endif %}
    <div class="writing-entry__meta">
      {% assign show_print_isbn = false %}
      {% if article.show_archive_isbn == true %}
        {% assign show_print_isbn = true %}
      {% endif %}
      {% include writing-meta.html item=article show_kind=false show_title_zh=false show_isbn=show_print_isbn %}
    </div>
    {% if print_excerpt %}
    <div class="writing-entry__text">{{ print_excerpt }}</div>
    {% endif %}
    {% if article.awards %}
    <div class="writing-entry__awards">
      {% for award in article.awards %}
      {% assign award_label = award.label | default: award %}
      {% if award.url %}
      <a class="writing-entry__award" href="{{ award.url }}">{{ award_label }}</a>
      {% else %}
      <span class="writing-entry__award">{{ award_label }}</span>
      {% endif %}
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
{% endif %}
{% endfor %}
</div>

---

<h2 class="writing-section-title" id="digital">digital</h2>

<div class="writing-filter-strip" id="writing-filter-strip">
  <div class="writing-filter-pill" id="writing-filter-pill"></div>
  <button class="writing-filter-btn active" data-filter="all" type="button">ALL</button>
  <button class="writing-filter-btn" data-filter="science" type="button"><span class="writing-filter-label-full">science</span><span class="writing-filter-label-short">sci</span></button>
  <button class="writing-filter-btn" data-filter="essay" type="button"><span class="writing-filter-label-full">essays</span><span class="writing-filter-label-short">essay</span></button>
  <button class="writing-filter-btn" data-filter="story" type="button"><span class="writing-filter-label-full">stories</span><span class="writing-filter-label-short">story</span></button>
  <button class="writing-filter-btn" data-filter="journal" type="button"><span class="writing-filter-label-full">journal</span><span class="writing-filter-label-short">notes</span></button>
</div>

<div class="writing-controls-row">
  <div class="writing-search-wrap">
    <input
      type="search"
      id="writing-search"
      class="writing-search-input"
      placeholder="search writing..."
      autocomplete="off"
      spellcheck="false"
    />
    <button class="writing-search-clear" id="writing-search-clear" type="button" aria-label="clear search" hidden>&times;</button>
    <span class="writing-search-enter" aria-hidden="true">&crarr;</span>
  </div>
  <button class="writing-luck-btn" id="writing-luck-btn" type="button">try your luck</button>
</div>

<div class="writing-archive-status" id="writing-archive-status" aria-live="polite"></div>

<nav class="writing-pagination" aria-label="Writing pagination" hidden>
  <span class="writing-pagination__range"></span>
  <button class="writing-pagination__btn writing-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="writing-pagination__status"><input type="number" class="writing-pagination__input" value="1" min="1" aria-label="Go to page"> / <span class="writing-pagination__total">1</span></span>
  <button class="writing-pagination__btn writing-pagination__next" type="button" aria-label="Next page">&rsaquo;</button>
</nav>

<div class="writing-list writing-list--archive" id="writing-archive">
{% for article in featured_articles %}
{% assign is_print_article = false %}
{% if article.section == "print" %}
  {% assign is_print_article = true %}
{% endif %}
{% if article.type == "translation" %}
  {% assign is_print_article = true %}
{% endif %}
{% unless is_print_article or article.writing_page == false %}
{% include writing-archive-entry.html article=article %}
{% endunless %}
{% endfor %}
{% for article in articles %}
{% assign is_print_article = false %}
{% if article.section == "print" %}
  {% assign is_print_article = true %}
{% endif %}
{% if article.type == "translation" %}
  {% assign is_print_article = true %}
{% endif %}
{% assign hide_from_archive = false %}
{% if article.writing_page == false or article.writing_feature %}
  {% assign hide_from_archive = true %}
{% endif %}
{% unless is_print_article or hide_from_archive %}
{% include writing-archive-entry.html article=article %}
{% endunless %}
{% endfor %}
</div>

<nav class="writing-pagination writing-pagination--bottom" aria-label="Writing pagination" hidden>
  <button class="writing-pagination__btn writing-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="writing-pagination__status"><input type="number" class="writing-pagination__input" value="1" min="1" aria-label="Go to page"> / <span class="writing-pagination__total">1</span></span>
  <button class="writing-pagination__btn writing-pagination__next" type="button" aria-label="Next page">&rsaquo;</button>
</nav>

<script src="{{ '/assets/js/writing-archive.js' | relative_url }}"></script>

---

<h2 class="writing-section-title" id="translations">translations</h2>

I also translated and edited work by Michael Graziano, Timothy Lillicrap and Geoffrey Hinton, Jordana Cepelewicz, Alex Mar, and others into Chinese for Neu-Reality.

- Michael Graziano, 'Are We Really Conscious?' · *The Atlantic* · [original](https://www.theatlantic.com/science/archive/2016/03/phlegm-theories-of-consciousness/472812/) · [中文](https://mp.weixin.qq.com/s/dUAQ-v7_Xb_uP1znW4f-0g)
- Timothy P. Lillicrap, Adam Santoro, Luke Marris, Colin J. Akerman and Geoffrey Hinton, 'Backpropagation and the Brain' · *Nature Reviews Neuroscience* · [original](https://www.nature.com/articles/s41583-020-0277-3) · [中文](https://mp.weixin.qq.com/s/n0cNsT_Gf7RZBFjE3rd_hw)
- Jordana Cepelewicz, 'In Brain's Electrical Ripples, Markers for Memories Appear' · *Quanta Magazine* · [original](https://www.quantamagazine.org/in-brains-electrical-ripples-markers-for-memories-appear-20190806/) · [中文](https://mp.weixin.qq.com/s/gpKgkS9_EMnG7auZKLDuyw)
- Grigori Guitchounts, 'An Existential Crisis in Neuroscience' · *Nautilus* · [original](https://nautil.us/an-existential-crisis-in-neuroscience-236115/) · [中文](https://mp.weixin.qq.com/s/TWu-VGcNfIg0oQYeXO3mSg)
- Kevin Berger, 'Gustav Klimt in the Brain Lab' · *Nautilus* · [original](https://nautil.us/gustav-klimt-in-the-brain-lab-237578/) · [中文](https://mp.weixin.qq.com/s/bZJhnXy4RNnYkSdE2kbGUA)
- Dyani Lewis, 'Optogenetics: Understanding the Brain One Flash of Light at a Time' · *Cosmos Magazine* · [original](https://cosmosmagazine.com/biology/optogenetics-understanding-the-brain-one-flash-of-light-at-a-time) · [中文](https://mp.weixin.qq.com/s?__biz=MzkxNzg2MzkxNg==&mid=2247539537&idx=1&sn=45a1385d9a380990018731b7f3a7dfd7&source=41)
- Alex Mar, 'The Uncanny Love of Robot-Making' · *WIRED* · [original](https://www.wired.com/2017/10/hiroshi-ishiguro-when-robots-act-just-like-humans/) · [中文](https://mp.weixin.qq.com/s/AB9Pxh-52b7ZJxSDTfaceA)
- Steve Ayan, 'The Brain's Autopilot Mechanism Steers Consciousness' · *Scientific American* · [original](https://www.scientificamerican.com/article/the-brains-autopilot-mechanism-steers-consciousness/) · [中文](https://mp.weixin.qq.com/s/edW5JRQ2VZF7k6E5daDkYA)
