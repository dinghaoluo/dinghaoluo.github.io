# hao things :)

Source code for my personal website. Built with Jekyll and the Minimal Mistakes remote theme, deployed on GitHub Pages.

The tab title is a pun: '好' (*hǎo*, meaning ‘good’) shares its sound with '豪' in my name.

## Repo structure

`index.md` is the homepage. Pages are in `_pages/`, writing pieces in `_writing/`, and data files (navigation, thoughts entries, the 404 lexicon) in `_data/`. Styles go through `assets/css/main.scss`, which imports Minimal Mistakes and then overrides (over the years of development) most of it. Scripts are page-gated via `_includes/scripts.html`: shared utilities sit in `list-utils.js`, with per-page modules handling card expansion, search, pagination, weighted shuffle, audio playback, and the photo map.

## Pages

The site has six sections plus a 404.

**Writing**: essays, fiction, journal entries, science communication, and translation work

**Thoughts**: several hundred short entries, searchable and shuffleable

**Science**: work from my university and PhD years

**Music**: original tracks (in-site audio, Bandcamp)

**Photos**: a world map of places I have photographed, with a curated gallery

**The Zone**: a computational literary analysis of *Gravity's Rainbow* (1973): plotline braids, character network, glossary, and more sections in progress

**404**: generates procedural prose fragments from a lexicon of corridors, catalogues, and drowned pages. Every broken URL gets its own little text.

## Attribution

Theme: [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) 4.24.0 (MIT). Fonts: [Mononoki](https://madmalik.github.io/mononoki/) (OFL), [Reforma](https://pampatype.com/reforma) (PampaType, licensed). Book and film cover images are sourced from publishers and platforms for editorial reference; they are not my original work.
