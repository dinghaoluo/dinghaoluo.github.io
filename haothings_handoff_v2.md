# Handoff v2: hao things — three feature areas
## dinghaoluo.github.io

---

## Overview of changes

1. **Sticky section headers** — section `<h2>`s stick below the masthead as you scroll, replacing the need for a jump list on all screen sizes
2. **Layout fixes** — sidebar stickiness offset bug + content width narrowing on widescreen only
3. **Thoughts page search** — keyword + natural language search bar above the filter pills

---

---

# Feature 1: Sticky Section Headers

## Concept

As the user scrolls down the homepage, the current section's `<h2>` ("thoughts :)", "writing :)", etc.) sticks just below the masthead/navbar. When the next section arrives, it pushes the previous one out and takes its place. This replaces the need for a ToC or jump list entirely — on all screen sizes including mobile.

Inspired by: the Infinite Digest / Swinehart pattern where a sticky label travels with the reader through long content.

This also future-proofs the design: if individual sections grow their own sub-navigation (e.g. pinned photos at the top of the photos section), the sticky header creates a natural container for it.

---

## How it works technically

Each `<h2>` becomes `position: sticky`, pinned just below the masthead. The browser's native sticky behaviour handles the push/replace effect automatically — no JavaScript needed.

The section headers already have IDs:
```
#thoughts, #writing, #science, #music, #photos, #other-stuff
```

---

## Implementation

### Step 1 — Check masthead height

The masthead (`#haothings-masthead`) height needs to be measured so section headers stick directly below it, not overlapping it.

```javascript
// In browser console, check the rendered height
document.querySelector('#haothings-masthead').getBoundingClientRect().height
// Use this value as the `top` offset for sticky h2s
```

Approximate value is likely `~60px` but measure to confirm.

### Step 2 — Make the masthead itself sticky

The masthead is currently `position: relative`. Change it to sticky so the section headers have something to stick beneath:

```css
#haothings-masthead {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--background-color, #fff); /* match site background */
}
```

### Step 3 — Make section h2s sticky

```css
.page__content h2 {
  position: sticky;
  top: 60px; /* = masthead height — measure and confirm */
  z-index: 50;
  background: var(--background-color, #fff); /* must have background or content scrolls behind it */
  padding-top: 0.5em;
  padding-bottom: 0.4em;
  margin-top: 0;
  border-bottom: 1px solid currentColor; /* optional: visual separator */
}
```

> **Critical:** sticky elements must have a background colour, otherwise the scrolling content bleeds through them.

> **Critical:** `position: sticky` only works if no ancestor has `overflow: hidden`. The current layout uses floats (`.page { float: right }`), which is fine. But check that `.page__inner-wrap` and `.initial-content` don't have overflow set.

### Step 4 — Responsive behaviour

Sticky section headers work the same across all three breakpoints — no special mobile handling needed. The masthead height may differ on mobile (hamburger menu vs full nav), so measure separately:

```css
/* Mobile — masthead may be shorter */
@media (max-width: 63.9em) {
  .page__content h2 {
    top: 48px; /* adjust to actual mobile masthead height */
  }
}

/* Desktop narrow (64em–88.25em) */
@media (min-width: 64em) {
  .page__content h2 {
    top: 60px; /* adjust to actual desktop masthead height */
  }
}

/* Desktop widescreen (≥88.25em) */
@media (min-width: 88.25em) {
  .page__content h2 {
    top: 60px; /* likely same — confirm */
  }
}
```

### Step 5 — Remove the "on this page" jump list

Since sticky headers solve navigation at all screen sizes, the "on this page" list in the homepage content area can be removed entirely from the Jekyll template.

### Step 6 — Remove the sidebar ToC from handoff v1

Superseded by this approach — do not implement the sidebar ToC from the previous handoff doc.

---

## Three-screen summary

| Screen | Behaviour |
|--------|-----------|
| **Mobile** | Masthead sticky at top, section h2 sticky just below it. No sidebar. Linear scroll. |
| **Desktop narrow** (64em–88.25em) | Same as mobile, plus sidebar visible (not sticky — see Feature 2). |
| **Desktop widescreen** (≥88.25em) | Same, wider sidebar (300px). Content area narrower — see Feature 2. |

---

---

# Feature 2: Layout Fixes

## Fix A — Sidebar sticky offset bug

**Problem:** On desktop, the sidebar (`.sidebar.sticky`) briefly scrolls with the main content for the first few pixels before locking in place.

**Root cause:** The current sticky rule is:
```css
@media (min-width: 64em) {
  .sticky {
    position: sticky;
    top: 2em;
  }
}
```

`top: 2em` is relative to the viewport, but if the masthead is not itself sticky (currently it is `position: relative`), the sidebar's sticky origin point is calculated from the document top — causing it to appear to scroll slightly before sticking.

**Fix:** Once the masthead becomes sticky (Feature 1, Step 2), change the sidebar `top` to equal the masthead height + a small gap:

```css
@media (min-width: 64em) {
  .sticky {
    position: sticky;
    top: calc(60px + 1em); /* masthead height + breathing room */
  }
}
```

Adjust `60px` to the confirmed masthead height.

---

## Fix B — Content width narrowing on widescreen only

**Problem:** On very wide screens (≥88.25em), the content area spans the full available width, which makes long paragraphs too wide to read comfortably.

**Current rules:**
```css
@media (min-width: 88.25em) {
  .page { width: calc(100% - 300px); padding-right: 300px; }
}
```

The sidebar is `300px`, the page content takes the remaining width — which at 1400px+ becomes very wide.

**Fix:** Cap the content area width and centre it within the available space. Apply only at widescreen breakpoint:

```css
@media (min-width: 88.25em) {
  .page__inner-wrap {
    max-width: 720px;   /* comfortable reading width — adjust to taste */
    margin-left: auto;
    margin-right: auto;
  }
}
```

This keeps the sidebar at its full width and position, while the text column becomes narrower and better proportioned. The `720px` value is a starting point — tune to match the visual feel of the masthead text area width.

> **Desktop widescreen only** — do not apply this at the 64em breakpoint, only at 88.25em and above.

---

---

# Feature 3: Thoughts Page Search

## Concept

A search bar sits above (or just below) the existing filter pills (all / books / films / others), left-aligned with them. It lets the user filter entries by typing a title, author name, year, or a descriptive phrase.

**Two modes, one input field:**
- **Keyword mode** (default, no server needed): instant JS filtering against title, author, year, and tag fields already rendered in the DOM
- **Natural language mode** (AI-powered, optional upgrade): the search query is sent to Claude via the Anthropic API and returns a ranked/filtered list

Both modes use the same search bar. Natural language mode can be added as a progressive enhancement — keyword mode ships first.

---

## Entry data structure (from current DOM)

Each entry on the thoughts page contains:
- `type` tag: book / film / other
- `title` + `year`
- `by [author name]`
- `date added`
- `reaction tag`: loved / liked / meh / disliked
- Full text body (the review/take)

This is enough data for both keyword and semantic search.

---

## Layout

```
[ all ]  [ books ]  [ films ]  [ others ]    ← existing filter pills (unchanged)
[ 🔍 search titles, authors, topics...     ] ← new search bar, full width of pill row
```

The search bar sits **below** the filter pills, left-aligned to match them. It is full-width of the content column. The two work together: filter pills narrow by type, search bar narrows further by text.

**Aesthetic guidance:**
- Match the monospace font of the rest of the site
- No heavy border — a subtle bottom-border-only or low-opacity full border fits the site's minimal style
- Placeholder text: `search titles, authors, topics…`
- No search button — results filter live as the user types (with a small debounce of ~200ms)

---

## Implementation A — Keyword search (ship first)

Pure JavaScript, no dependencies, works on GitHub Pages static hosting.

### Step 1 — Mark up entry data as data attributes

Each entry card needs its searchable fields in data attributes so JS can read them without parsing visible text:

```html
<div class="take-entry"
     data-title="Capitalist Realism"
     data-author="Mark Fisher"
     data-year="2009"
     data-type="book"
     data-reaction="loved"
     data-tags="politics capitalism mental health">
  <!-- existing entry HTML unchanged -->
</div>
```

In Jekyll/Liquid, these can be generated from the entry's front matter automatically.

### Step 2 — Add the search bar HTML

In the thoughts page template, below the filter pills:

```html
<div class="takes-search-wrap">
  <input
    type="search"
    id="takes-search"
    class="takes-search-input"
    placeholder="search titles, authors, topics…"
    autocomplete="off"
    spellcheck="false"
  />
</div>
```

### Step 3 — Search CSS

```css
.takes-search-wrap {
  margin-top: 0.6em;
  margin-bottom: 1.2em;
}

.takes-search-input {
  width: 100%;
  font-family: inherit; /* Mononoki */
  font-size: 0.9em;
  background: transparent;
  border: none;
  border-bottom: 1px solid currentColor;
  outline: none;
  padding: 0.3em 0;
  opacity: 0.7;
  color: inherit;
  transition: opacity 0.15s;
}

.takes-search-input:focus {
  opacity: 1;
}

.takes-search-input::placeholder {
  opacity: 0.45;
}
```

### Step 4 — Search JavaScript

```javascript
(function () {
  const searchInput = document.getElementById('takes-search');
  if (!searchInput) return;

  const entries = document.querySelectorAll('.take-entry');
  let debounceTimer;

  function normalise(str) {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  }

  function filterEntries() {
    const query = normalise(searchInput.value.trim());
    const activeType = document.querySelector('.filter-pill.active')?.dataset.type || 'all';

    entries.forEach(entry => {
      const fields = [
        entry.dataset.title,
        entry.dataset.author,
        entry.dataset.year,
        entry.dataset.tags,
        entry.dataset.reaction
      ].map(normalise).join(' ');

      const matchesQuery = !query || fields.includes(query);
      const matchesType = activeType === 'all' || entry.dataset.type === activeType;

      entry.style.display = (matchesQuery && matchesType) ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(filterEntries, 200);
  });

  // Hook into existing filter pills so search + type filter work together
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      setTimeout(filterEntries, 0); // run after pill state updates
    });
  });
})();
```

> Adjust `.filter-pill` and `.filter-pill.active` to match the actual CSS classes used by the existing pill buttons, and `.take-entry` to match the actual entry wrapper class.

---

## Implementation B — Natural language search (optional upgrade)

This can be added later without changing the UI — it's a progressive enhancement on top of keyword search.

**How it works:**
When the query is longer than ~3 words or contains no exact keyword match, the input is sent to the Anthropic API. The model receives the full list of entries (title + author + reaction + a short excerpt) and returns a ranked list of matching IDs. The JS then shows only those entries in ranked order.

**Rough API call:**

```javascript
async function naturalLanguageSearch(query, entries) {
  const entryList = entries.map((e, i) =>
    `[${i}] "${e.dataset.title}" by ${e.dataset.author} (${e.dataset.year}) — ${e.dataset.reaction}. ${e.querySelector('.take-excerpt')?.textContent.slice(0, 120) || ''}`
  ).join('\n');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `The user is searching a reading list with the query: "${query}"\n\nEntries:\n${entryList}\n\nReturn ONLY a JSON array of the entry indices (e.g. [2, 5, 0]) that best match the query, ranked by relevance. Return an empty array [] if none match.`
      }]
    })
  });

  const data = await response.json();
  try {
    const text = data.content.find(b => b.type === 'text')?.text || '[]';
    return JSON.parse(text.match(/\[[\d,\s]*\]/)?.[0] || '[]');
  } catch { return []; }
}
```

**When to trigger NL search vs keyword search:** use keyword search for short queries (≤ 2 words), NL search for longer or more descriptive queries ("books about memory and forgetting", "something I loved about political theory").

**Note on API key:** the Anthropic API key cannot be exposed in a public GitHub Pages site. Options:
- Add a lightweight serverless function (Cloudflare Worker, Netlify Function, Vercel Edge) that proxies the request — the API key lives server-side
- Or: keep NL search as a local Claude artifact / future feature, and ship keyword search now

---

## Three-screen summary for search

| Screen | Behaviour |
|--------|-----------|
| **Mobile** | Search bar full width below pills. Works identically. |
| **Desktop narrow** | Same — no sidebar on thoughts page. |
| **Desktop widescreen** | Same — search bar constrained to content column width. |

---

---

# Additional Fix: Chinese Character Font Rendering

**Problem:** Mononoki has no CJK glyphs. Chinese characters fall back to an OS default that mismatches in size and weight.

**Fix — update font-family stack in global CSS:**

```css
body, * {
  font-family: Mononoki, 'Noto Sans Mono CJK SC', 'Source Han Mono SC',
               'Microsoft YaHei Mono', monospace;
}
```

This covers Windows, macOS/iOS, and any machine with Noto or Source Han installed. No additional imports needed — these are system fonts.

---

---

# Checklist for Codey

### Feature 1: Sticky section headers
- [ ] Measure actual masthead height (desktop + mobile)
- [ ] Make `#haothings-masthead` `position: sticky; top: 0; z-index: 100`
- [ ] Add background colour to masthead (prevent bleed-through)
- [ ] Make `.page__content h2` `position: sticky; top: [masthead height]px`
- [ ] Add background colour to h2s
- [ ] Set correct `top` values per breakpoint (mobile / 64em / 88.25em)
- [ ] Remove "on this page" jump list from homepage template
- [ ] Do NOT implement sidebar ToC from handoff v1

### Feature 2: Layout fixes
- [ ] Fix sidebar `top` offset: `top: calc([masthead height] + 1em)`
- [ ] Add `max-width: 720px` + `margin: auto` to `.page__inner-wrap` at ≥88.25em only

### Feature 3: Thoughts search
- [ ] Add `data-*` attributes to entry cards in Jekyll template
- [ ] Add search bar HTML below filter pills
- [ ] Add search CSS (monospace, borderless, bottom-border only)
- [ ] Add search JS with debounce + integration with existing filter pills
- [ ] (Optional later) Add NL search via Anthropic API through a serverless proxy

### Font fix
- [ ] Update `font-family` stack to include CJK fallbacks
