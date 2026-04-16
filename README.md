# hao things

Personal website built with Jekyll and the Minimal Mistakes remote theme.

## Repo Layout

- `index.markdown` is the homepage.
- `about.markdown` is the about page.
- `404.html` is the custom 404 page.
- `_pages/reviews.md` renders `/thoughts/`.
- `_pages/writing.md` renders `/writing/`.
- `_pages/research.md` renders `/science/`.
- `_pages/music.md` renders `/music/`.
- `_pages/photos.md` renders `/photos/`.
- `_pages/cv.markdown` renders `/cv/`.
- `_posts/` contains blog posts.

## Data Files

- `_data/navigation.yml` defines the primary navigation.
- `_data/currently.yml` feeds the homepage "Recently I've been..." line.
- `_data/brief_takes.yml` stores the entries shown on `/thoughts/`.
- `_data/ui-text.yml` contains Minimal Mistakes UI strings.

## Styling And Scripts

- `_config.yml` sets the site config and `remote_theme`.
- `assets/css/main.scss` is the main stylesheet entry point. It imports Minimal Mistakes and defines the local Mononoki font faces from `assets/fonts/mononoki/`.
- `_includes/head/custom.html` adds favicon tags and extra `<head>` markup.
- `_includes/scripts.html` loads `assets/js/main.min.js`, `assets/js/thoughts-cards.js`, and `assets/js/haothings-nav.js`.
- `assets/js/thoughts-cards.js` handles thoughts card expansion, filtering, and search highlighting.
- `assets/js/haothings-nav.js` handles the mobile navigation toggle.

## Local Development

Install dependencies with:

```bash
bundle install
```

Run the local server with:

```bash
bundle exec jekyll serve
```

As of 2026-04-15, `bundle exec jekyll build` currently fails in `assets/css/main.scss` with `Internal Error: Incompatible units: 'rem' and 'vw'`, so local build verification is blocked until that existing Sass issue is fixed.
