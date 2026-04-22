# hao things — stylesheet reference

## font

| element | family | size | weight | notes |
|---|---|---|---|---|
| body | Mononoki | 0.95em | normal | base 16px / 18px (large) / 20px (x-large) |
| headings h1–h6 | Mononoki | — | normal | letter-spacing: -0.01em |
| page h2 | Mononoki | 1em | normal | lowercase, border-bottom |
| page h3 | Mononoki | 0.95em | normal | — |
| page title (subpages) | Mononoki | 1.2em | normal | lowercase |
| nav links | Mononoki | 0.85em | normal | letter-spacing: 0.02em |
| author name | Mononoki | 1em | normal | — |
| author bio/headline | Mononoki | 0.82em | normal | vertical lines via `<br>` in _config.yml |
| author links | Mononoki | 0.78em | normal | line-height: 1.85 |
| theme toggle | Mononoki | 0.82rem | varies | "d" muted / "l" bold in light; swapped in dark |

line-height: 1.85 (body)

## colours — Morandi palette

| variable | hex | used for |
|---|---|---|
| `$morandi-oat` | `#faf7f2` | warm white, backgrounds |
| `$morandi-ink` | `#3f3934` | main text colour |
| `$morandi-clay` | `#b78e79` | primary accent |
| `$morandi-clay-deep` | `#8d6959` | links, strong accent |
| `$morandi-stone` | `#ddd3c8` | light background surfaces |
| `$morandi-muted` | `#7f766f` | muted text |
| `$morandi-muted-soft` | `#9b928a` | softer muted text |
| `$morandi-blue` | `#90a4b0` | blue accent (eval badges) |
| `$morandi-blue-deep` | `#627884` | deeper blue accent |
| `$morandi-grey-soft` | `#e8e2db` | grey surfaces |
| `$morandi-grey-deep` | `#8b837c` | grey text |
| `$morandi-rose` | `#bb9891` | rose accent |
| `$morandi-rose-deep` | `#7d605b` | deeper rose |
| `$site-bg` | `#ffffff` | page background |
| `$site-border` | `#e0dbd5` | horizontal rules, section borders |

## dark mode

Dark mode uses a `@mixin dark-colors` shared by two selectors:

- `@media (prefers-color-scheme: dark) { html:not([data-theme="light"]) { ... } }` — system preference, unless user forced light
- `html[data-theme="dark"] { ... }` — manual dark override via toggle

Dark background: `#1c1917`. Dark text: `#ddd3c8`. Dark link: `#c49a85`.

A `d / l` toggle button (fixed top-right, `#theme-toggle`) lets users override system preference. Choice persists via `localStorage('theme')`. A FOUC prevention script in `<head>` applies the saved `data-theme` attribute before first paint.

## layout

- max `#main` width: 900px (x-large breakpoint)
- subpage `.page` max-width: 820px (large) / 860px (x-large), centered
- subpage `.page__inner-wrap`: full width within `.page` container
- homepage keeps sidebar author profile; subpages hide it, show footer author profile instead

## prose watchlist

| pattern | problem | fix |
|---|---|---|
| `the only X in/of [phrase] I have verb-ed` | Zero relative pronoun after interrupting prepositional phrase creates a garden-path reading; reader parses the prep phrase as the end of the NP, then stumbles on the subject 'I'. | Insert **'that'**: `the only X in/of [phrase] **that** I have verb-ed` |
| `the same X I have / I feel` | Comparative construction needs a connector. | Insert 'that' or 'as': `the same level of dislike **that** I have for X` |
| Simple `the [superlative] X I have verb-ed` with no intervening phrase | Fine as-is; zero relative on a directly post-nominal clause is idiomatic English. | No fix needed. |

Rule of thumb: if a prepositional phrase sits between the head noun and the zero-relative clause (`noun [prep phrase] I verb`), add 'that'. If the relative clause is immediately post-nominal (`noun I verb`), zero-relative is fine.

## key file locations

| what | where |
|---|---|
| main stylesheet | `assets/css/main.scss` |
| font files | `assets/fonts/mononoki/` |
| layout (base) | `_layouts/default.html` |
| layout (single page) | `_layouts/single.html` |
| layout (archive/thoughts) | `_layouts/archive.html` |
| author sidebar | `_includes/author-profile.html` |
| navigation data | `_data/navigation.yml` |
| author config | `_config.yml` → `author:` section |
| theme toggle JS | `assets/js/theme-toggle.js` |
| thoughts card JS | `assets/js/thoughts-cards.js` |
| FOUC prevention | `_includes/head/custom.html` |
| this file | `_docs/STYLESHEET.md` |
