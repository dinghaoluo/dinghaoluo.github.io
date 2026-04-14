---
layout: single
author_profile: false
permalink: /thoughts/
title: 'thoughts'
---

*Films, books, and whatever else &mdash; a running record of things that have been on my mind.*

---

<div class="brief-filter-strip" id="brief-filter-strip">
  <div class="brief-filter-pill" id="brief-filter-pill"></div>
  <button class="brief-filter-btn active" data-filter="all">all</button>
  <button class="brief-filter-btn" data-filter="book">books</button>
  <button class="brief-filter-btn" data-filter="film">films</button>
  <button class="brief-filter-btn" data-filter="other">others</button>
</div>

<div class="takes-search-wrap">
  <input
    type="search"
    id="takes-search"
    class="takes-search-input"
    placeholder="search titles, authors, topics..."
    autocomplete="off"
    spellcheck="false"
  />
</div>

{% assign pinned_takes = site.data.brief_takes | where: 'pin', true | sort: 'posted' | reverse %}
{% assign regular_takes = site.data.brief_takes | where_exp: 'take', 'take.pin != true' | sort: 'posted' | reverse %}
{% if pinned_takes.size > 0 %}
  <div class="thoughts-pin-lead">
    <span class="thoughts-pin-lead__label">pinned</span>
    <p>A couple of entries I especially want near the top.</p>
  </div>
  {% for take in pinned_takes %}
    {% include thought-card.html take=take %}
  {% endfor %}
{% endif %}
{% for take in regular_takes %}
  {% include thought-card.html take=take %}
{% endfor %}
