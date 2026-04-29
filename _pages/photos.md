---
layout: single
author_profile: true
permalink: /photos/
title: "photos"
classes: photos-page
---

<div class="photos-intro">
  <p>Fieldwork, travel, Cambridge light, Florida rain, and a few ordinary scenes that made walking past feel wrong.</p>
</div>

<div class="photo-map-panel" aria-label="Regional maps for the photo atlas">
  <div class="photo-map-grid">
    {% for region in site.data.photo_map_regions %}
      {% capture region_title_id %}photo-map-svg-{{ region.id }}-title{% endcapture %}
      <section class="photo-map-card photo-map-card--{{ region.scope | default: 'regional' }} photo-map-card--{{ region.id }}" aria-labelledby="photo-map-{{ region.id }}-title">
        <p class="photo-map-card__title" id="photo-map-{{ region.id }}-title">{{ region.title }}</p>
        <div class="photo-map-plate" style="--map-aspect: {{ region.aspect | default: '1.7778' }};">
          {% include photo-world-map.svg view_box=region.view_box title=region.title title_id=region_title_id %}
          <div class="photo-map-pins" aria-hidden="false">
            {% for point in region.points %}
              <a class="photo-map-pin photo-map-pin--{{ point.accent | default: 'clay' }}"
                 href="#{{ point.section }}"
                 data-section="{{ point.section }}"
                 aria-label="{{ point.label | escape }}: {{ point.target | escape }}"
                 style="--x: {{ point.x }}%; --y: {{ point.y }}%; --label-x: {{ point.label_x | default: '0.72rem' }}; --label-y: {{ point.label_y | default: '-50%' }};">
                <span class="photo-map-pin__dot" aria-hidden="true"></span>
                <span class="photo-map-pin__label" aria-hidden="true">{{ point.short_label | default: point.label }}</span>
              </a>
            {% endfor %}
          </div>
        </div>
      </section>
    {% endfor %}
  </div>
</div>

<div class="photo-atlas" aria-label="Curated photo atlas">
  {% for section in site.data.photos %}
    {% assign section_index = forloop.index %}
    {% assign photo_loading = 'lazy' %}
    {% if section_index == 1 %}
      {% assign photo_loading = 'eager' %}
    {% endif %}
    <section id="{{ section.id }}" class="photo-section photo-section--{{ section.accent | default: 'clay' }}">
      <aside class="photo-section__note" aria-labelledby="{{ section.id }}-title">
        <span class="photo-section__index">{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>
        <h2 id="{{ section.id }}-title">{{ section.title }}</h2>
        <p class="photo-section__axis">{{ section.axis }}</p>
        <p class="photo-section__note-text">{{ section.note }}</p>
      </aside>

      <div class="photo-cluster">
        {% for photo in section.photos %}
          <figure class="photo-frame photo-frame--{{ photo.slot | default: 'wide' }}">
            <img src="{{ photo.src | relative_url }}"
                 alt="{{ photo.alt | escape }}"
                 width="{{ photo.width }}"
                 height="{{ photo.height }}"
                 loading="{{ photo_loading }}"
                 decoding="async"{% if section_index == 1 and forloop.index == 1 %}
                 fetchpriority="high"{% endif %}>
            <figcaption>{{ photo.caption }}</figcaption>
          </figure>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</div>
