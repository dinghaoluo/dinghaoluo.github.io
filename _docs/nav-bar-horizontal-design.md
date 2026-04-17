# Horizontal Navigation Bar Design (pre-stacked-nav)

Reference snapshot of the horizontal nav bar used on subpages before the
stacked vertical navigation redesign. Saved for potential revert.

## HTML (`_includes/page-header.html`)

```html
<div class="page-header">
  <a class="page-header__title" href="/"><strong>hao things</strong> :)</a>
  <nav class="page-header__nav" aria-label="Primary navigation">
    {%- for link in site.data.navigation.main -%}
      {%- assign current_path = page.url | replace: '/index.html', '/' -%}
      {%- assign link_path = link.url | split: '#' | first | replace: '/index.html', '/' -%}
      {%- assign is_current = false -%}
      {%- if link.url contains '#' -%}
      {%- elsif current_path == link_path -%}
        {%- assign is_current = true -%}
      {%- endif -%}
      <a href="{{ link.url | relative_url }}"{% if is_current %} class="is-current" aria-current="page"{% endif %}>{{ link.title }}</a>
    {%- endfor -%}
  </nav>
</div>
```

## SCSS (assets/css/main.scss, lines ~154-253)

```scss
.page-header {
  margin-bottom: 2.4rem;
  padding-top: 1.6rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid $site-separator-soft;

  @include breakpoint($large) {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1.2em;
    padding-top: 2rem;
    padding-bottom: 1.3rem;
    margin-bottom: 2.8rem;
  }
}

.page-header__title {
  display: block;
  font-weight: normal;
  letter-spacing: -0.02em;
  color: $site-text;
  text-decoration: none;
  font-size: 1.24em;
  line-height: 1;

  strong { font-weight: 600; }

  @include breakpoint($large) {
    font-size: 1.35em;
  }

  &:hover {
    color: $link-color;
    text-decoration: none;
  }
}

.page-header__nav {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.15em 1.2em;
  margin-top: 0.9em;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }

  @include breakpoint($large) {
    margin-top: 0;
    gap: 0.15em 1.3em;
    justify-content: flex-end;
    overflow-x: visible;
  }

  a {
    color: $site-text;
    font-family: 'Mononoki', monospace;
    font-size: 0.95em;
    letter-spacing: -0.01em;
    white-space: nowrap;
    text-decoration: none;
    position: relative;
    padding-bottom: 3px;
    transition: color 0.18s ease;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1.5px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.2s ease;
      opacity: 0.82;
    }

    &:hover {
      color: $link-color;
      text-decoration: none;
      &::after { transform: scaleX(1); }
    }

    &.is-current {
      color: $link-color;
      font-style: italic;
      &::after {
        transform: scaleX(1);
        height: 2px;
      }
    }
  }
}
```

## Behaviour

- On mobile: horizontal scrollable row, "hao things :)" above nav links
- On desktop ($large+): flex row, title left-aligned, nav right-aligned
- Current page link gets `$link-color` (morandi-clay-deep / #8d6959), italic, permanent underline
- Hover: sweep underline animates left→right
- Separate `<h1 class="page-bigtitle">` rendered below the bar inside `.page__inner-wrap`
