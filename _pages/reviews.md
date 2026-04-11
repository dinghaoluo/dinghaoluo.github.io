---
layout: single
author_profile: true
permalink: /brief-takes/
title: "brief takes"
---

*Films, books, and whatever else. Not proper reviews.*

---

{% for take in site.data.brief_takes %}
<div class="brief-card">
  <div class="brief-card__img-wrap">
    {% if take.image and take.image != "" %}
      <img class="brief-card__img" src="{{ take.image | relative_url }}" alt="{{ take.title }}">
    {% else %}
      <div class="brief-card__img brief-card__img--placeholder"></div>
    {% endif %}
  </div>
  <details class="brief-card__details">
    <summary class="brief-card__summary">
      <div class="brief-card__meta">
        <span class="brief-card__type">{{ take.type }}</span><span class="brief-card__sep"> · </span><span class="brief-card__title">{{ take.title }}</span><span class="brief-card__sep"> · </span><span class="brief-card__creator">{{ take.creator_role }} {{ take.creator }}</span>
      </div>
      <div class="brief-card__preview">{{ take.preview }}</div>
    </summary>
    <div class="brief-card__expand">
      <div class="brief-card__expand-inner">
        {{ take.full | markdownify }}
      </div>
    </div>
  </details>
</div>
{% endfor %}
