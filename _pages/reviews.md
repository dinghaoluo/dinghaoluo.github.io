---
layout: single
author_profile: true
permalink: /thoughts/
title: 'thoughts'
---

*Films, books, and whatever else &mdash; a running record of things that have been on my mind.*

---

<div class="thoughts-filter-strip" id="thoughts-filter-strip">
  <div class="thoughts-filter-pill" id="thoughts-filter-pill"></div>
  <button class="thoughts-filter-btn active" data-filter="all">all</button>
  <button class="thoughts-filter-btn" data-filter="book">books</button>
  <button class="thoughts-filter-btn" data-filter="film">films</button>
  <button class="thoughts-filter-btn" data-filter="other">others</button>
</div>

<div class="thoughts-search-wrap">
  <input
    type="search"
    id="thoughts-search"
    class="thoughts-search-input"
    placeholder="search titles, authors, topics..."
    autocomplete="off"
    spellcheck="false"
  />
</div>

{% assign pinned_thoughts = site.data.thoughts | where: 'pin', true | sort: 'posted' | reverse %}
{% assign regular_thoughts = site.data.thoughts | where_exp: 'thought', 'thought.pin != true' | sort: 'posted' | reverse %}
{% if pinned_thoughts.size > 0 %}
<div class="thoughts-pin-lead">
  <span class="thoughts-pin-lead__label">pinned</span>
  <p>A couple of entries I especially want near the top.</p>
</div>
{% for thought in pinned_thoughts %}
{% include thought-card.html take=thought %}
{% endfor %}
{% endif %}
{% for thought in regular_thoughts %}
{% include thought-card.html take=thought %}
{% endfor %}
