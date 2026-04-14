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
| toc title | Mononoki | 0.82em | normal | lowercase, explicit !important |
| toc links | Mononoki | 0.88em | normal | — |
| home profile name (en) | Mononoki | 0.9em | normal | — |
| home profile name (zh) | Mononoki | 0.74em | normal | — |
| home profile links | Mononoki | 0.78em | normal | — |
| footer | Mononoki | 0.82em | normal | — |

line-height: 1.85 (body)

## colours

| name | hex | used for |
|---|---|---|
| background | `#faf9f7` | page background (warm white) |
| masthead/footer bg | `#f0ebe5` | header and footer background |
| masthead/footer border | `#d0c8c0` | top/bottom border lines |
| text (main) | inherits | body text |
| text (dark) | `#2c2c2c` | names, titles, strong |
| text (mid) | `#4a4a4a` | nav links, some ui |
| text (muted) | `#5a5a5a` | author bio |
| text (faint) | `#6a6a6a` | home profile links |
| text (very faint) | `#8a8a8a` | chinese name, toc title |
| link / accent | `#b5651d` | all links on hover, link colour |
| ui accent | `#c47c5a` | MM primary-color override (badges etc.) |
| hr / borders | `#e0dbd5` | horizontal rules, section borders |

## layout

- max content width: 1440px (at x-large breakpoint)
- masthead: sticky, z-index 999
- masthead uses ID selectors (#haothings-masthead etc.) — immune to MM CSS

## key file locations

| what | where |
|---|---|
| main stylesheet | `assets/css/main.scss` |
| font files | `assets/fonts/mononoki/` |
| masthead template | `_includes/masthead.html` |
| author sidebar | `_includes/author-profile.html` (MM default) |
| navigation data | `_data/navigation.yml` |
| author config | `_config.yml` → `author:` section |
| this file | `_docs/STYLESHEET.md` |
