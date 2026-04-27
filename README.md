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
- `_writing/` contains the writing and translation collection.
- `_posts/` is reserved for future dated posts; the starter Jekyll post has been removed.

## Data Files

- `_data/navigation.yml` defines the primary navigation.
- `_data/thoughts.yml` stores the entries shown on `/thoughts/`.
- `_data/music_thoughts.yml` stores the album entries shown on `/music/`.
- `_data/404_lexicon.yml` stores the words used by the custom 404 page.
- `_data/ui-text.yml` contains Minimal Mistakes UI strings.

## Styling And Scripts

- `_config.yml` sets the site config, `remote_theme`, collections, defaults, and build exclusions.
- `assets/css/main.scss` is the main stylesheet entry point. It imports Minimal Mistakes, defines local font faces, and contains the custom colour palette, dark mode mixin, and component styles.
- `_includes/head/custom.html` adds favicon tags, extra `<head>` markup, and the theme-toggle FOUC prevention script.
- `_includes/scripts.html` loads `assets/js/main.min.js`, `assets/js/thoughts-cards.js`, `assets/js/haothings-nav.js`, `assets/js/nav-justify.js`, and `assets/js/theme-toggle.js`.
- `assets/js/thoughts-cards.js` handles thoughts card expansion, filtering, search, pagination, weighted shuffle (`try your luck`), preview panel randomisation, and hash-based deep linking.
- `assets/js/album-wall.js` handles album-wall filtering, search, pagination, and expansion.
- `assets/js/audio-player.js` handles the custom audio players on `/music/`.
- `assets/js/haothings-nav.js` handles the mobile navigation toggle.
- `assets/js/theme-toggle.js` handles the manual dark/light mode toggle (`d / l` button), persisting the choice to localStorage.
- `assets/js/nav-justify.js` handles navigation link spacing.

## Authoring-Only Material

These folders are tracked for convenience, but they are not part of the public website experience and are excluded from the Jekyll build in `_config.yml`:

- `styleguides/` contains writing-voice and editing guidance for authoring reviews and site copy.
- `_docs/` contains implementation notes, stylesheet references, and design records.
- `font-trials/` contains typography experiments and exported comparison material.
- `scripts/` contains local utility scripts, such as waveform generation for audio assets.

Before the site is treated as fully live/public, consider moving these authoring-only files to a private notes repo or local workspace. They are useful for writing and maintenance, but they are not meant for readers browsing the website.

## Local Development

Install dependencies with:

```bash
bundle install
```

Run the local server with:

```bash
bundle exec jekyll serve
```

Build the site with:

```bash
bundle exec jekyll build
```
