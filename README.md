# cereniq: — Personal Website

A clean, minimal portfolio built on **Jekyll** with a customized **Minimal Mistakes** theme, deployed via GitHub Pages.

## Build & Dependencies

### Requirements
- Ruby 3.0+
- Bundler

### Installation

```bash
bundle install
```

### Local Development

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

- Hot-reload enabled — changes to Markdown, CSS, and config files auto-refresh
- Note: `_config.yml` changes require a restart
- Sass is compiled to CSS with `style: compressed` (see `_config.yml` line 225)

### Deployment

The site is hosted on **GitHub Pages** and auto-deploys on push to `main` branch. No manual build step required.

---

## Theme & Customization

### Base Theme
- **Minimal Mistakes v4.24.0** (remote theme via GitHub)
- Skin: `default`
- Repo reference: `mmistakes/minimal-mistakes@4.24.0` in `_config.yml`

### Custom CSS & Layout

All customization lives in `assets/css/main.scss`. Key overrides:

#### Masthead (Navigation Bar)
- **Clean-room rebuild** using CSS IDs only to avoid Minimal Mistakes class interference (`#cereniq-masthead`, `#cereniq-masthead-inner`, `#cereniq-nav`)
- **Desktop (≥1024px):** masthead padding `0.65em 1em`; nav font-size `1em` (body text size)
- **Mobile (<1024px):** tighter padding `0.45em 1em`; nav wraps with reduced font sizes
- **Mobile wrap control:** flex line-break span (`.nav-line-break`) forces nav items to wrap after `brief_takes`

#### Typography
- **Font:** `'Mononoki'` monospace throughout (site title, nav, headings, code)
- **Base font-size:** `15px` (mobile/medium), `16px` (large+ breakpoints)
- **Content headings:** h2 `1.15em`, h3 `1.05em`; lowercase, normal weight
- **Homepage h2:** bold with subtle scale-in animation

#### Layout & Widths
- **Sidebar width:** `220px` (`$large`), `260px` (`$x-large`)
- **Main content panel:** calculated to fit remaining space after sidebar
- **Max-width constraints:** `1100px` at x-large breakpoint (`$x-large: 1412px`)
- **Mobile:** full-width, sidebar hidden

#### Colors
- **Primary:** `#c47c5a` (warm rust)
- **Link color:** `#b5651d` (amber brown)
- **Background:** `#faf9f7` (off-white)
- **Text:** `#2c2c2c` (near black)
- **Muted text:** `#8a8a8a` (gray, used for secondary prose)
- **Footer background:** `#f0ebe5` (tan)

#### Component-Specific

**Brief-Takes Filter Strip:**
- Width: `85%` (centered with `margin: 0 auto`)
- Background: semi-transparent pill-shaped box
- Sliding highlight animation (`.brief-filter-pill`) with cubic-bezier easing

**Footer:**
- Font-size: `1.05em`
- No accent colors — plain text with hover darkening
- Icons inherit text color

**Currently Intro (Homepage):**
- Greeting text (`.currently-greeting`): muted color `#8a8a8a`
- Substance text (`.currently-substance`): darker gray `#6a6a6a`, italic
- Fixed text "and thinking about" precedes the dynamic value

### SCSS Structure
```
assets/css/main.scss
  ↳ Imports Minimal Mistakes base (via remote theme)
  ↳ Custom overrides: masthead, nav, sidebar, footer, typography, colors, animations
```

### Key Breakpoints (from Minimal Mistakes)
- `$small: 600px`
- `$medium: 768px`
- `$medium-wide: 900px`
- `$large: 1024px` — desktop layout threshold
- `$x-large: 1412px` — wide layout threshold

---

## JavaScript

### Brief-Cards Toggle (`assets/js/brief-cards.js`)
- Click card to expand/collapse
- Hover 2+ seconds to auto-open (when collapsed)
- Smooth height animations (0.42s open, 0.32s close)
- `.is-open` class and `aria-expanded` attribute for state

### Filter Pill Animation (`assets/js/brief-cards.js`)
- Dynamically calculates pill position & width based on active button
- Smooth left/width transition with cubic-bezier easing
- Shows/hides cards via opacity + transform

---

## Data Files

Structured content lives in `_data/` as YAML:
- `navigation.yml` — Site nav links with optional classes
- `currently.yml` — Homepage "recently I've been..." dynamic values
- `brief_takes.yml` — Metadata for brief take entries (title, category, excerpt, date)
- `writing.yml`, `research.yml`, `music.yml`, `photos.yml` — Other section metadata

---

## Static Assets

- **Fonts:** Mononoki font via system/CDN (specified in CSS)
- **Images:** Stored in `assets/images/`; avatar at `assets/images/avatar.jpg`
- **Stylesheets:** Compiled from `_sass/` + custom `assets/css/main.scss`
- **Scripts:** jQuery + Bootstrap (inherited from MM); brief-cards.js for interactivity

---

## Jekyll Configuration Highlights

- **Markdown:** Kramdown with GFM
- **Highlighter:** Rouge
- **Plugins:** jekyll-feed, jekyll-paginate, jekyll-sitemap, jekyll-gist, jekyll-include-cache, jekyll-remote-theme
- **Permalinks:** `/:categories/:title/`
- **HTML Compression:** Enabled for production
- **Sass output style:** Compressed

See `_config.yml` for full settings.

---

## License & Attribution

- **Minimal Mistakes Theme:** Licensed under MIT by Michael Rose (mmistakes)
- **Custom code & styling:** Part of cereniq.blog portfolio

---

## Notes for Contributors

1. **Avoid Minimal Mistakes class names** in custom components — use IDs or custom classes to prevent unintended theme overrides.
2. **Test on multiple breakpoints** — the design has distinct mobile, tablet, and desktop behaviors.
3. **Keep Mononoki as the primary font** — it's central to the visual identity.
4. **SCSS is compressed** — check the compiled CSS output if debugging styles.
5. **Mobile nav wrapping** is controlled by the `.nav-line-break` flex break mechanism, not media query hiding.
