---
layout: single
author_profile: true
permalink: /writing/
title: "writing"
classes:
  - writing-page
  - section-nav-page
header:
  og_image: "/assets/images/social-card-writing.png"
lede: "a collection of my writing and translation work, from science communication features to journal entries"
section_nav: true
---

<nav class="home-section-strip" aria-label="writing page sections">
  <div class="home-section-strip__scroller">
    <a href="#print" data-home-section="print">print</a>
    <a href="#digital" data-home-section="digital">digital</a>
    <a href="#other-writing" data-home-section="other-writing">other</a>
    <a href="#translations" data-home-section="translations">trans.</a>
  </div>
</nav>
<div class="home-back-to-top-wrap">
  <button class="home-back-to-top" type="button" aria-label="Back to top"
    aria-hidden="true" tabindex="-1" data-home-back-to-top>&uarr;</button>
</div>

{% assign articles = site.writing | sort: 'date' | reverse %}
{% assign print_articles = articles | sort: "print_order" %}

<h2 class="writing-section-title" id="print">print</h2>

<div class="writing-list">
{% for article in print_articles %}
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
{% assign print_excerpt = article.excerpt %}
{% assign title_is_plain = false %}
{% if article.type == "translation" or article.title_link == false %}
  {% assign title_is_plain = true %}
{% endif %}
{% assign show_archive_title_zh = true %}
{% if article.show_archive_title_zh == false %}
  {% assign show_archive_title_zh = false %}
{% endif %}
<div id="{{ print_title | strip_html | slugify }}" class="writing-entry writing-entry--print writing-entry--print-{{ print_type | slugify }}{% if article.type == 'translation' %} writing-entry--translation{% endif %}{% if article.image %} writing-entry--has-image{% endif %}{% if article.featured %} writing-entry--featured{% endif %}">
  {% if article.image %}
  {% if title_is_plain %}
  <div class="writing-entry__img-wrap">
    <img src="{{ article.image }}" alt="{{ print_title | strip_html | escape }}" class="writing-entry__img" loading="lazy" width="140" height="210">
  </div>
  {% else %}
  <a href="{{ article.url }}" class="writing-entry__img-wrap">
    <img src="{{ article.image }}" alt="{{ print_title | strip_html | escape }}" class="writing-entry__img" loading="lazy" width="140" height="210">
  </a>
  {% endif %}
  {% endif %}
  <div class="writing-entry__body">
    <div class="writing-entry__header">
      <h3 class="writing-entry__title{% if title_is_plain %} writing-entry__title--plain{% endif %}">
        {% if title_is_plain %}
        <span class="writing-entry__title-main">{{ print_title }}</span>
        {% else %}
        <a href="{{ article.url }}">{{ print_title }}</a>
        {% endif %}
        {% if article.title_zh and show_archive_title_zh %}
        <span class="writing-entry__title-zh-inline">{{ article.title_zh }}</span>
        {% endif %}
      </h3>
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
        {% include writing-meta.html item=article show_kind=false show_title_zh=false show_isbn=show_print_isbn show_links=true show_updated=false %}
      </div>
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

<nav class="writing-pagination" aria-label="Writing pagination">
  <span class="writing-pagination__range"></span>
  <button class="writing-pagination__btn writing-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="writing-pagination__status"><input type="number" class="writing-pagination__input" value="1" min="1" inputmode="numeric" aria-label="Go to page"> / <span class="writing-pagination__total">1</span></span>
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
{% unless is_print_article or article.writing_page == false %}
{% include writing-archive-entry.html article=article %}
{% endunless %}
{% endfor %}
</div>

<nav class="writing-pagination writing-pagination--bottom" aria-label="Writing pagination" hidden>
  <span class="writing-pagination__range"></span>
  <button class="writing-pagination__btn writing-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="writing-pagination__status"><input type="number" class="writing-pagination__input" value="1" min="1" inputmode="numeric" aria-label="Go to page"> / <span class="writing-pagination__total">1</span></span>
  <button class="writing-pagination__btn writing-pagination__next" type="button" aria-label="Next page">&rsaquo;</button>
</nav>

---

<h2 class="writing-section-title" id="other-writing">other writing</h2>

I've written some commissioned science communication pieces in Chinese, including my article with the highest readership, '[The Persistence of 'Neuromyths' (不是人的脑子只用了10%，而是只有10%的人用了脑子)](https://mp.weixin.qq.com/s/wyetxNOx5PJPoAvP5apCeQ)', which was published on Guokr (果壳), China's most popular digital pop-science platform. '[Can We Manipulate Working Memory from Outside the Skull? (无须开颅，就能操控工作记忆？)](/writing/working-memory/)' was co-authored with [Lindsay Li](https://lishanshan-lss.github.io) for Neu-Reality (神经现实), written at the invitation of Dr. Huan Luo, the paper's corresponding author.

---

<h2 class="writing-section-title" id="translations">translations</h2>

I've also translated and edited work by Alex Mar, Geoffrey Hinton, Jordana Cepelewicz, Michael Graziano, Timothy Lillicrap, and others into Chinese for Neu-Reality. The selected translations below are ordered by how proud I am of them.

- Alex Mar, '[Love in the Times of Robots](https://www.wired.com/2017/10/hiroshi-ishiguro-when-robots-act-just-like-humans/)' · *WIRED* · [赛博时期的爱情](https://mp.weixin.qq.com/s/AB9Pxh-52b7ZJxSDTfaceA)
- Jordana Cepelewicz, '[In Brain's Electrical Ripples, Markers for Memories Appear](https://www.quantamagazine.org/in-brains-electrical-ripples-markers-for-memories-appear-20190806/)' · *Quanta Magazine* · [海马波簇闪烁，照亮记忆幽林](https://mp.weixin.qq.com/s/gpKgkS9_EMnG7auZKLDuyw)
- Timothy P. Lillicrap, Adam Santoro, Luke Marris, Colin J. Akerman and Geoffrey Hinton, '[Backpropagation and the Brain](https://doi.org/10.1038/s41583-020-0277-3)' · *Nature Reviews Neuroscience* · [大脑中的反向传播](https://mp.weixin.qq.com/s/n0cNsT_Gf7RZBFjE3rd_hw) (co-translated with Lindsay Li)
- Grigori Guitchounts, '[An Existential Crisis in Neuroscience](https://nautil.us/an-existential-crisis-in-neuroscience-237680)' · *Nautilus* · [神经科学的存在危机](https://mp.weixin.qq.com/s/TWu-VGcNfIg0oQYeXO3mSg)
- Michael Graziano, '[Most Popular Theories of Consciousness Are Worse Than Wrong](https://www.theatlantic.com/science/archive/2016/03/phlegm-theories-of-consciousness/472812/)' · *The Atlantic* · [一些意识理论，让我们在理解意识的路上“开倒车”?](https://mp.weixin.qq.com/s/dUAQ-v7_Xb_uP1znW4f-0g)
- Kevin Berger, '[Gustav Klimt in the Brain Lab](https://nautil.us/gustav-klimt-in-the-brain-lab-237324)' · *Nautilus* · [美存在于观看者的神经系统之中](https://mp.weixin.qq.com/s/bZJhnXy4RNnYkSdE2kbGUA)
- Dyani Lewis, '[Optogenetics: Understanding the Brain One Flash of Light at a Time](https://www.media.mit.edu/articles/optogenetics-understanding-the-brain-one-flash-of-light-at-a-time/)' · *Cosmos Magazine* · [光遗传学——大脑说：“要有光。”](https://mp.weixin.qq.com/s?__biz=MzkxNzg2MzkxNg==&mid=2247539537&idx=1&sn=45a1385d9a380990018731b7f3a7dfd7&source=41)
- Steve Ayan, '[The Brain's Autopilot Mechanism Steers Consciousness](https://www.scientificamerican.com/article/the-brains-autopilot-mechanism-steers-consciousness/)' · *Scientific American* · [你的大脑在自动驾驶，而你一无所知](https://mp.weixin.qq.com/s/edW5JRQ2VZF7k6E5daDkYA)
