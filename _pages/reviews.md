---
layout: single
author_profile: true
permalink: /thoughts/
title: 'thoughts'
header:
  og_image: "/assets/images/social-card-thoughts.png"
---

<div class="thoughts-filter-strip thoughts-filter-strip--type" id="thoughts-filter-strip">
  <div class="thoughts-filter-pill" id="thoughts-filter-pill"></div>
  <button class="thoughts-filter-btn active" data-filter="all" type="button">ALL</button>
  <button class="thoughts-filter-btn" data-filter="book" type="button">books</button>
  <button class="thoughts-filter-btn" data-filter="film" type="button">films</button>
  <button class="thoughts-filter-btn" data-filter="tv" type="button">tv</button>
  <button class="thoughts-filter-btn" data-filter="game" type="button">games</button>
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

<noscript>
<p class="noscript-notice">Search, filtering, and pagination require JavaScript. All entries are shown below in reverse chronological order.</p>
</noscript>

<nav class="thoughts-pagination" aria-label="Pagination" hidden>
  <span class="thoughts-pagination__range"></span>
  <button class="thoughts-pagination__btn thoughts-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="thoughts-pagination__status"><input type="number" class="thoughts-pagination__input" value="1" min="1" inputmode="numeric" aria-label="Go to page"> / <span class="thoughts-pagination__total">1</span></span>
  <button class="thoughts-pagination__btn thoughts-pagination__next" type="button" aria-label="Next page">&rsaquo;</button>
</nav>

{% assign thoughts_by_date = site.data.thoughts | sort: 'posted' | reverse %}
{% assign thoughts_initial_page_size = 15 %}
<div class="thoughts-cards" id="thoughts-cards">
{% for thought in thoughts_by_date %}
{% assign hide_initial = true %}
{% if forloop.index <= thoughts_initial_page_size %}
  {% assign hide_initial = false %}
{% endif %}
{% include thought-card.html take=thought initially_hidden=hide_initial %}
{% endfor %}
</div>

<nav class="thoughts-pagination thoughts-pagination--bottom" aria-label="Pagination" hidden>
  <button class="thoughts-pagination__btn thoughts-pagination__prev" type="button" aria-label="Previous page">&lsaquo;</button>
  <span class="thoughts-pagination__status"><input type="number" class="thoughts-pagination__input" value="1" min="1" inputmode="numeric" aria-label="Go to page"> / <span class="thoughts-pagination__total">1</span></span>
  <button class="thoughts-pagination__btn thoughts-pagination__next" type="button" aria-label="Next page">&rsaquo;</button>
</nav>

