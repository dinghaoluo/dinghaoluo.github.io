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
- `_data/thoughts.yml` stores the entries shown on `/thoughts/`.
- `_data/ui-text.yml` contains Minimal Mistakes UI strings.

## Styling And Scripts

- `_config.yml` sets the site config and `remote_theme`.
- `assets/css/main.scss` is the main stylesheet entry point. It imports Minimal Mistakes, defines the local Mononoki font faces from `assets/fonts/mononoki/`, and contains the full Morandi colour palette, dark mode mixin, and all custom component styles.
- `_includes/head/custom.html` adds favicon tags, extra `<head>` markup, and the theme-toggle FOUC prevention script.
- `_includes/scripts.html` loads `assets/js/main.min.js`, `assets/js/thoughts-cards.js`, `assets/js/haothings-nav.js`, `assets/js/nav-justify.js`, and `assets/js/theme-toggle.js`.
- `assets/js/thoughts-cards.js` handles thoughts card expansion, filtering, search, pagination, weighted shuffle ("try your luck"), preview panel randomisation, and hash-based deep linking.
- `assets/js/haothings-nav.js` handles the mobile navigation toggle.
- `assets/js/theme-toggle.js` handles the manual dark/light mode toggle (`d / l` button), persisting the choice to localStorage.
- `assets/js/nav-justify.js` handles navigation link spacing.

## Local Development

Install dependencies with:

```bash
bundle install
```

Run the local server with:

```bash
bundle exec jekyll serve
```

As of 2026-04-17, `bundle exec jekyll build` and `bundle exec jekyll serve` work correctly.
