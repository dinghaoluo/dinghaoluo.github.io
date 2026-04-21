---
layout: single
author_profile: true
permalink: /writing/personal/
title: "personal"
---

*Journals, fiction, and short essays written between 2017 and 2020 for a WeChat blog called 阿莫東森的無聊生活. Originally in Chinese; translated here with links to the originals.*

---

{% assign pieces = site.personal | sort: 'date' | reverse %}
{% assign journals = pieces | where: "category", "journal" %}
{% assign fiction = pieces | where: "category", "fiction" %}
{% assign scicomm = pieces | where: "category", "scicomm" %}
{% assign encyclopaedic = pieces | where: "category", "encyclopaedic" %}

### journal

<div class="writing-list">
{% for piece in journals %}
<div class="writing-entry">
  {% if piece.image %}
  <a href="{{ piece.url }}" class="writing-entry__img-wrap">
    <img src="{{ piece.image }}" alt="{{ piece.title }}" class="writing-entry__img" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    <h3 class="writing-entry__title">
      <a href="{{ piece.url }}">{{ piece.title }}</a>
    </h3>
    {% if piece.title_zh %}
    <span class="writing-entry__title-en">{{ piece.title_zh }}</span>
    {% endif %}
    <div class="writing-entry__meta">
      {{ piece.date | date: "%B %Y" }}
    </div>
    {% if piece.excerpt %}
    <div class="writing-entry__text">{{ piece.excerpt }}</div>
    {% endif %}
    {% if piece.links.size > 0 %}
    <div class="writing-entry__links">
      {% for link in piece.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>

---

### fiction

<div class="writing-list">
{% for piece in fiction %}
<div class="writing-entry">
  {% if piece.image %}
  <a href="{{ piece.url }}" class="writing-entry__img-wrap">
    <img src="{{ piece.image }}" alt="{{ piece.title }}" class="writing-entry__img" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    <h3 class="writing-entry__title">
      <a href="{{ piece.url }}">{{ piece.title }}</a>
    </h3>
    {% if piece.title_zh %}
    <span class="writing-entry__title-en">{{ piece.title_zh }}</span>
    {% endif %}
    <div class="writing-entry__meta">
      {{ piece.date | date: "%B %Y" }}
    </div>
    {% if piece.excerpt %}
    <div class="writing-entry__text">{{ piece.excerpt }}</div>
    {% endif %}
    {% if piece.links.size > 0 %}
    <div class="writing-entry__links">
      {% for link in piece.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>

{% if scicomm.size > 0 %}
---

### scicomm

<div class="writing-list">
{% for piece in scicomm %}
<div class="writing-entry">
  {% if piece.image %}
  <a href="{{ piece.url }}" class="writing-entry__img-wrap">
    <img src="{{ piece.image }}" alt="{{ piece.title }}" class="writing-entry__img" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    <h3 class="writing-entry__title">
      <a href="{{ piece.url }}">{{ piece.title }}</a>
    </h3>
    {% if piece.title_zh %}
    <span class="writing-entry__title-en">{{ piece.title_zh }}</span>
    {% endif %}
    <div class="writing-entry__meta">
      {{ piece.date | date: "%B %Y" }}
    </div>
    {% if piece.excerpt %}
    <div class="writing-entry__text">{{ piece.excerpt }}</div>
    {% endif %}
    {% if piece.links.size > 0 %}
    <div class="writing-entry__links">
      {% for link in piece.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>
{% endif %}

{% if encyclopaedic.size > 0 %}
---

### encyclopaedic

<div class="writing-list">
{% for piece in encyclopaedic %}
<div class="writing-entry">
  {% if piece.image %}
  <a href="{{ piece.url }}" class="writing-entry__img-wrap">
    <img src="{{ piece.image }}" alt="{{ piece.title }}" class="writing-entry__img" loading="lazy">
  </a>
  {% endif %}
  <div class="writing-entry__body">
    <h3 class="writing-entry__title">
      <a href="{{ piece.url }}">{{ piece.title }}</a>
    </h3>
    {% if piece.title_zh %}
    <span class="writing-entry__title-en">{{ piece.title_zh }}</span>
    {% endif %}
    <div class="writing-entry__meta">
      {{ piece.date | date: "%B %Y" }}
    </div>
    {% if piece.excerpt %}
    <div class="writing-entry__text">{{ piece.excerpt }}</div>
    {% endif %}
    {% if piece.links.size > 0 %}
    <div class="writing-entry__links">
      {% for link in piece.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>
{% endif %}
