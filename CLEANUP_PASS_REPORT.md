# Cleanup Pass Report

Date: 2026-04-15

## What Changed

- `README.md`
  - Rewrote the repo overview to match the current site structure.
  - Removed stale references to `assets/js/brief-cards.js`, `.brief-filter-pill`, and data files that are not part of the current repo flow.
  - Updated the styling/script notes to reflect the real entry points: `assets/css/main.scss`, `_includes/head/custom.html`, `_includes/scripts.html`, `assets/js/thoughts-cards.js`, and `assets/js/haothings-nav.js`.
  - Documented the current local Mononoki font usage from `assets/fonts/mononoki/`.

- `_config.yml`
  - Removed one duplicated `author_profile: true` entry from the `_posts` defaults block.

## Why These Changes Are Safe

- `README.md` does not affect the rendered site.
- The removed `_config.yml` line duplicated the same key with the same value inside the same defaults block, so the effective intended setting remains `author_profile: true`.
- No layouts, includes, public page content, styles, navigation, permalinks, or client-side behavior were changed.

## Verification Method And Results

- Checked the starting worktree with `git status --short --branch`.
  - Result: clean `main` worktree before edits.

- Audited repo references with ripgrep before editing.
  - Result: stale README references to `brief-cards.js` and `brief-filter-pill` were confirmed.
  - Result: `JetBrains Mono` appeared only in `_includes/head/custom.html`, and no stylesheet or script references were found that proved active usage.

- Installed the missing Ruby gems so the repo's Jekyll command could be exercised locally.

- Ran the local build command before changes:
  - `bundle exec jekyll build`
  - Result: build failed before site generation completed.
  - Repeated warnings/errors:
    - pagination warning: no `index.html` pagination template found
    - existing SCSS build blocker: `Internal Error: Incompatible units: 'rem' and 'vw'`

- Ran the same local build command again after changes:
  - `bundle exec jekyll build`
  - Result: failed with the same warning/error sequence as the baseline attempt.

- Outcome:
  - Full before/after `_site/` HTML parity could not be produced because the repo currently does not complete a local Jekyll build.
  - The retained edits were limited to documentation-only changes plus a config de-duplication that is no-op by construction.

## Considered But Intentionally Not Changed

- `_includes/head/custom.html`
  - The JetBrains Mono import looks stale from repo search, but removing it would change generated `<head>` output.
  - Because the site build is currently blocked, that removal was not kept in this pass.

- `_config.yml` duplicated `plugins:` blocks
  - Left untouched.
  - Consolidating them may be safe, but it is more invasive than the no-op duplicate key removal and should be verified with a successful build first.

- Comments and naming drift around `brief takes` vs `thoughts`
  - Left alone unless already covered by the README rewrite.
  - Additional wording cleanup can wait for a pass where build parity is available.

## Later Suggestions

- Fix the existing Sass/Jekyll build blocker in `assets/css/main.scss` first, then rerun a parity-based cleanup pass.
  - The likely trigger is the CSS `min(42vw, 7.25rem)` expression under SassC.

- Revisit removal of the JetBrains Mono import in `_includes/head/custom.html` once the build succeeds and generated HTML can be compared safely.

- After build health is restored, do a second conservative audit for redundant config and unused assets/imports with `_site/` diffs or page-level checksums.
