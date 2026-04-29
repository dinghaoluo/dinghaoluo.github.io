---
layout: single
author_profile: true
permalink: /writing/
title: "writing"
classes: writing-page
---

Reading gives me obsessions; writing tests what I have actually understood. This page gathers the public-facing versions: science features, translation, fiction, journals, and essays.

**Science writing**: I spent three years at Neu-Reality (神经现实), a Chinese science platform, writing about neuroscience for people who wanted the brain made exact rather than mystified. I then spent seven months at *Scientific American* China, where I wrote weekly news and interviewed researchers like Anil Seth and Cyriel Pennartz for a print feature on the largest consciousness collaboration ever attempted.

**Translation**: I translated Merlin Sheldrake's *Entangled Life* into Chinese, a book that made me think hard about how scientific precision and living strangeness can survive in the same sentence. The Chinese edition won the 2025 Pingshan Natural History Museum Book Award.

**Fiction and essays**: I've kept a personal platform (阿莫東森的無聊生活) since secondary school: fiction, essays, the occasional debunking piece, a long biographical essay on Rachmaninoff. The writers I return to most are Grace Lindsay, who makes computational neuroscience feel like intellectual history; Merlin Sheldrake, who follows fungi into the root systems of the world; Mark Fisher, who finds the exact words for what everyone already felt.

---

{% assign articles = site.writing | sort: 'date' | reverse %}

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
{% if is_print_article %}
{% assign print_type = article.type %}
{% if article.type == "feature" %}
  {% assign print_type = "science" %}
{% endif %}
{% assign title_is_plain = false %}
{% if article.type == "translation" or article.title_link == false %}
  {% assign title_is_plain = true %}
{% endif %}
<div class="writing-entry writing-entry--print writing-entry--print-{{ print_type | slugify }}{% if article.type == 'translation' %} writing-entry--translation{% endif %}{% if article.featured %} writing-entry--featured{% endif %}">
  {% if article.image %}
  <a href="{{ article.url }}" class="writing-entry__img-wrap">
    <img src="{{ article.image }}" alt="{{ article.title }}" class="writing-entry__img" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    <span class="writing-entry__type">{{ print_type }}</span>
    <h3 class="writing-entry__title{% if title_is_plain %} writing-entry__title--plain{% endif %}">
      {% if title_is_plain %}
      <span class="writing-entry__title-main">{{ article.title_display | default: article.title }}</span>
      {% else %}
      <a href="{{ article.url }}">{{ article.title_display | default: article.title }}</a>
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
      {% include writing-meta.html item=article show_kind=false show_title_zh=false show_isbn=false %}
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
  <button class="writing-filter-btn" data-filter="story" type="button"><span class="writing-filter-label-full">short stories</span><span class="writing-filter-label-short">story</span></button>
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
{% for article in articles %}
{% assign is_print_article = false %}
{% if article.section == "print" %}
  {% assign is_print_article = true %}
{% endif %}
{% if article.type == "translation" %}
  {% assign is_print_article = true %}
{% endif %}
{% unless is_print_article %}
{% assign writing_kind = "essay" %}
{% if article.type == "feature" or article.section == "online" or article.category == "scicomm" %}
  {% assign writing_kind = "science" %}
{% elsif article.category == "fiction" %}
  {% assign writing_kind = "story" %}
{% elsif article.category == "journal" %}
  {% assign writing_kind = "journal" %}
{% endif %}
{% assign show_feature_banner = false %}
{% if article.feature_banner and article.banner_image %}
  {% assign show_feature_banner = true %}
{% endif %}
{% assign show_archive_image = false %}
{% if article.archive_image and article.image and show_feature_banner == false %}
  {% assign show_archive_image = true %}
{% endif %}
{% assign display_type = article.type | default: article.category %}
{% if writing_kind == "science" %}
  {% assign display_type = "science" %}
{% endif %}
<div
  class="writing-entry writing-entry--archive writing-entry--kind-{{ writing_kind }}{% if show_archive_image %} writing-entry--has-image{% endif %}{% if show_feature_banner %} writing-entry--feature-banner{% endif %}"
  data-kind="{{ writing_kind }}"
  data-title="{{ article.title | strip_html | escape }}"
  data-date="{{ article.date | date: '%Y-%m-%d' }}"
  data-search="{{ article.title | append: ' ' | append: article.title_zh | append: ' ' | append: display_type | append: ' ' | append: article.type | append: ' ' | append: article.category | append: ' ' | append: article.outlet | append: ' ' | append: article.outlet_en | append: ' ' | append: article.excerpt | strip_html | strip_newlines | escape }}"
>
  {% if show_feature_banner %}
  <a
    href="{{ article.url }}"
    class="writing-entry__feature-banner"
    style="--writing-banner-image: url('{{ article.banner_image | relative_url }}');"
    aria-label="{{ article.title | strip_html | escape }}"
  >
    <div class="writing-entry__feature-panel">
      <div class="writing-entry__kicker">
        <span class="writing-entry__type">{{ display_type }}</span>
        <span class="writing-entry__date">{{ article.date | date: "%-d %b %Y" }}</span>
      </div>
      <h3 class="writing-entry__title">{{ article.title_display | default: article.title }}</h3>
      {% if article.excerpt %}
      <div class="writing-entry__text">{{ article.excerpt }}</div>
      {% endif %}
    </div>
  </a>
  {% else %}
  {% if show_archive_image %}
  <a href="{{ article.url }}" class="writing-entry__img-wrap">
    <img src="{{ article.image }}" alt="{{ article.title }}" class="writing-entry__img" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    <div class="writing-entry__kicker">
      <span class="writing-entry__type">{{ display_type }}</span>
      <span class="writing-entry__date">{{ article.date | date: "%-d %b %Y" }}</span>
    </div>
    <h3 class="writing-entry__title">
      <a href="{{ article.url }}">{{ article.title_display | default: article.title }}</a>
    </h3>
    {% if article.title_zh %}
    <span class="writing-entry__title-en">{{ article.title_zh }}</span>
    {% endif %}
    {% if article.byline or article.source_author or article.creator or article.outlet or article.isbn %}
    <div class="writing-entry__meta">
      {% include writing-meta.html item=article show_kind=false show_title_zh=false show_date=false %}
    </div>
    {% endif %}
    {% if article.excerpt %}
    <div class="writing-entry__text">{{ article.excerpt }}</div>
    {% endif %}
  </div>
  {% endif %}
</div>
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
