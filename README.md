# hao things :)

This repo contains the source scripts of my personal website. 

This started out as a much smaller project around the end of 2024, when I tried to build a site to showcase the music I'd made. I built the site out of the defaults of the Minimal Mistakes remote theme, and deployed it with Jekyll on GitHub pages. Over the past two years, I have collected and organised portfolios of my writing, short reviews, research, music, and photos, and this site has now been overhauled, and even has a portal to a computational literary analysis of *Gravity's Rainbow* that probably should have stayed a weekend project.

## What you can find here

The site has six main pages. 

**Writing** collects essays, fiction, journal entries, science communication, and the translation work. 

**Thoughts** is an archive of several hundred short entries, searchable and shuffleable. This is probably the most frequently updated page on the website. 

**Science** covers the work from my university and PhD years. 

**Music** tells the story of me making my own music (with in-site audios and a Bandcamp link if anyone fancies a listen), and also has album reviews. 

**Photos** is a world map of places I have photographed with a curated photo gallery.

**The Zone** is the *Gravity's Rainbow* (1973) visualisation: plotline braids, character network analysis, a glossary, and more sections in development.

The 404 page I am quite proud of. It generates procedural prose fragments from a lexicon of corridors, catalogues, and drowned pages. Every broken URL gets its own little text.

## Repo structure

`index.markdown` is the homepage. Pages are stored in `_pages/`, writing pieces in `_writing/`, and data files (navigation, thoughts entries, album reviews, the 404 lexicon) in `_data/`. Styles go through `assets/css/main.scss`, which imports Minimal Mistakes and then (sorry :( ) overrides most of it. Scripts are page-gated via `_includes/scripts.html`: shared utilities in `list-utils.js`, then per-page modules for card expansion, search, pagination, weighted shuffle, audio playback, and the photo map.

## Notes

The tab title is a pun: 好 (*hǎo*, good) shares its sound with a character in my name. The footer quotes on each page are original lines. The weighted shuffle on the thoughts and writing pages is called 'try your luck', and you are indeed welcome to... try your luck!
