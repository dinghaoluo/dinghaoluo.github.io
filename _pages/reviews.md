---
layout: single
author_profile: true
permalink: /thoughts/
title: 'thoughts'
---

*Books, films, games, and television that refused to leave quietly. Some notes are arguments; some are attempts to remember the exact shape of being moved, annoyed, or ambushed by something.*

---

<div class="thoughts-filter-strip" id="thoughts-filter-strip">
  <div class="thoughts-filter-pill" id="thoughts-filter-pill"></div>
  <button class="thoughts-filter-btn active" data-filter="book">books</button>
  <button class="thoughts-filter-btn" data-filter="film">films</button>
  <button class="thoughts-filter-btn" data-filter="tv">tv</button>
  <button class="thoughts-filter-btn" data-filter="game">games</button>
  <button class="thoughts-filter-btn" data-filter="all">ALL</button>
</div>

<div class="thoughts-controls-row">
  <div class="thoughts-search-wrap">
    <input
      type="search"
      id="thoughts-search"
      class="thoughts-search-input"
      placeholder="search for..."
      autocomplete="off"
      spellcheck="false"
    />
    <button class="thoughts-search-clear" id="thoughts-search-clear" type="button" aria-label="clear search" hidden>&times;</button>
    <span class="thoughts-search-enter" aria-hidden="true">&crarr;</span>
  </div>
  <button class="thoughts-luck-btn" id="thoughts-luck-btn" type="button">try your luck</button>
</div>

<nav class="thoughts-pagination" aria-label="Pagination" hidden>
  <span class="thoughts-pagination__range"></span>
  <button class="thoughts-pagination__btn thoughts-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="thoughts-pagination__status"><input type="number" class="thoughts-pagination__input" value="1" min="1" aria-label="Go to page"> / <span class="thoughts-pagination__total">1</span></span>
  <button class="thoughts-pagination__btn thoughts-pagination__next" type="button" aria-label="Next page">&rsaquo;</button>
</nav>

{% assign pinned_thoughts = site.data.thoughts | where: 'pin', true | sort: 'posted' | reverse %}
{% assign regular_thoughts = site.data.thoughts | where_exp: 'thought', 'thought.pin != true' | sort: 'posted' | reverse %}
{% assign thoughts_initial_page_size = 15 %}
{% assign thoughts_initial_count = 0 %}
<div class="thoughts-cards" id="thoughts-cards">
{% if pinned_thoughts.size > 0 %}
<div class="thoughts-pin-lead" id="thoughts-pin-lead">
  <span class="thoughts-pin-lead__label">pinned</span>
</div>
{% for thought in pinned_thoughts %}
{% assign thought_type = thought.type | downcase %}
{% assign hide_initial = true %}
{% if thought_type == 'book' and thoughts_initial_count < thoughts_initial_page_size %}
  {% assign hide_initial = false %}
  {% assign thoughts_initial_count = thoughts_initial_count | plus: 1 %}
{% endif %}
{% include thought-card.html take=thought initially_hidden=hide_initial %}
{% endfor %}
{% endif %}
{% for thought in regular_thoughts %}
{% assign thought_type = thought.type | downcase %}
{% assign hide_initial = true %}
{% if thought_type == 'book' and thoughts_initial_count < thoughts_initial_page_size %}
  {% assign hide_initial = false %}
  {% assign thoughts_initial_count = thoughts_initial_count | plus: 1 %}
{% endif %}
{% include thought-card.html take=thought initially_hidden=hide_initial %}
{% endfor %}
</div>

<nav class="thoughts-pagination thoughts-pagination--bottom" aria-label="Pagination" hidden>
  <button class="thoughts-pagination__btn thoughts-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="thoughts-pagination__status"><input type="number" class="thoughts-pagination__input" value="1" min="1" aria-label="Go to page"> / <span class="thoughts-pagination__total">1</span></span>
  <button class="thoughts-pagination__btn thoughts-pagination__next" type="button" aria-label="Next page">&rsaquo;</button>
</nav>

