---
layout: single
author_profile: true
permalink: /brief-takes/
title: 'brief takes'
---

*Films, books, and whatever else &mdash; a running record of things that have been on my mind.*

---

<div class='brief-filter-strip' id='brief-filter-strip'>
  <div class='brief-filter-pill' id='brief-filter-pill'></div>
  <button class='brief-filter-btn active' data-filter='all'>all</button>
  <button class='brief-filter-btn' data-filter='book'>books</button>
  <button class='brief-filter-btn' data-filter='film'>films</button>
  <button class='brief-filter-btn' data-filter='other'>others</button>
</div>

{% assign sorted_takes = site.data.brief_takes | sort: 'posted' | reverse %}
{% for take in sorted_takes %}
<div class='brief-card' data-type='{{ take.type }}'>
  <div class='brief-card__img-wrap'>
    {% if take.image and take.image != '' %}
      <img class='brief-card__img' src='{{ take.image | relative_url }}' alt='{{ take.title }}'>
    {% else %}
      <div class='brief-card__img--placeholder'></div>
    {% endif %}
  </div>
  <div class='brief-card__body'>
    <div class='brief-card__meta'>
      <span class='brief-card__type'>{{ take.type }}</span><span class='brief-card__sep'>&middot;</span><span class='brief-card__title'>{{ take.title }}{% if take.year and take.year != '' %}<span class='brief-card__year'>{{ take.year }}</span>{% endif %}</span><span class='brief-card__sep'>&middot;</span><span class='brief-card__creator'>{{ take.creator_role }} {{ take.creator }}</span>
    </div>
    {% if take.posted and take.posted != '' %}
      <div class='brief-card__posted'>
        {{ take.posted | date: '%-d %b %Y' }}
      </div>
    {% endif %}
    <div class='brief-card__text-wrap'>
      <div class='brief-card__text'>{{ take.text | markdownify }}</div>
    </div>
    <button class='brief-card__toggle' aria-expanded='false' aria-label='expand review'>&darr;</button>
  </div>
</div>
{% endfor %}
