---
layout: single
author_profile: true
permalink: /brief-takes/
title: "brief takes"
---

*Films, books, and whatever else — a running record of things that have been on my mind.*

---

{% for take in site.data.brief_takes %}
<div class="brief-card">
  <div class="brief-card__img-wrap">
    {% if take.image and take.image != "" %}
      <img class="brief-card__img" src="{{ take.image | relative_url }}" alt="{{ take.title }}">
    {% else %}
      <div class="brief-card__img--placeholder"></div>
    {% endif %}
  </div>
  <div class="brief-card__body">
    <div class="brief-card__meta">
      <span class="brief-card__type">{{ take.type }}</span><span class="brief-card__sep"> · </span><span class="brief-card__title">{{ take.title }}</span><span class="brief-card__sep"> · </span><span class="brief-card__creator">{{ take.creator_role }} {{ take.creator }}</span>
    </div>
    <div class="brief-card__text-wrap"><p class="brief-card__text">{{ take.text }}</p></div>
    <button class="brief-card__toggle" aria-expanded="false" aria-label="expand review">↓</button>
  </div>
</div>
{% endfor %}
