---
layout: single
author_profile: true
permalink: /thoughts/
title: 'thoughts'
lede: "A running catalogue of films, books, and other encounters, with order intact until you decide to disturb it."
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

<div class="thoughts-controls-row">
  <div class="thoughts-search-wrap">
    <input
      type="search"
      id="thoughts-search"
      class="thoughts-search-input"
      placeholder="search titles, authors, topics..."
      autocomplete="off"
      spellcheck="false"
    />
    <span class="thoughts-search-enter" aria-hidden="true">&crarr;</span>
  </div>
  <button class="thoughts-luck-btn" id="thoughts-luck-btn" type="button">try your luck</button>
</div>

<nav class="thoughts-pagination" aria-label="Pagination" hidden>
  <button class="thoughts-pagination__btn thoughts-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="thoughts-pagination__status"><span class="thoughts-pagination__current">1</span> / <span class="thoughts-pagination__total">1</span></span>
  <button class="thoughts-pagination__btn thoughts-pagination__next" type="button" aria-label="Next page">&rsaquo;</button>
</nav>

{% assign pinned_thoughts = site.data.thoughts | where: 'pin', true | sort: 'posted' | reverse %}
{% assign regular_thoughts = site.data.thoughts | where_exp: 'thought', 'thought.pin != true' | sort: 'posted' | reverse %}
<div class="thoughts-cards" id="thoughts-cards">
{% if pinned_thoughts.size > 0 %}
<div class="thoughts-pin-lead" id="thoughts-pin-lead">
  <span class="thoughts-pin-lead__label">pinned</span>
  <p>A few entries I wanted to mark, even if the deck gets reshuffled.</p>
</div>
{% for thought in pinned_thoughts %}
{% include thought-card.html take=thought %}
{% endfor %}
{% endif %}
{% for thought in regular_thoughts %}
{% include thought-card.html take=thought %}
{% endfor %}
</div>

<nav class="thoughts-pagination thoughts-pagination--bottom" aria-label="Pagination" hidden>
  <button class="thoughts-pagination__btn thoughts-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="thoughts-pagination__status"><span class="thoughts-pagination__current">1</span> / <span class="thoughts-pagination__total">1</span></span>
  <button class="thoughts-pagination__btn thoughts-pagination__next" type="button" aria-label="Next page">&rsaquo;</button>
</nav>

