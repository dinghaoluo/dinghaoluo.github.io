---
layout: single
author_profile: true
permalink: /photos/
title: "photos"
---

*What the eye kept after the moment passed.*

<!--
  To add photos later:
  1. Drop image files into assets/images/photos/
  2. Replace the placeholder text above with gallery entries like:

  {% assign photos = site.static_files | where_exp: "f", "f.path contains '/assets/images/photos/'" %}
  <div class="gallery-grid">
  {% for photo in photos %}
    <figure>
      <img src="{{ photo.path }}" alt="">
    </figure>
  {% endfor %}
  </div>

  Or use Minimal Mistakes' built-in gallery include:
  {% include gallery id="gallery" %}
  (with a `gallery:` array defined in front matter)
-->
