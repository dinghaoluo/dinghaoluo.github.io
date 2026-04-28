# Writing Task Requirements

This file holds operational rules that used to live in the main style guide. The main voice/style principles are in [style.md](style.md). Examples are in [samples.md](samples.md).

## Review Expansion And Catalogue Work

- Short game/book/film catalogue reviews can be expanded into polished English mini-essays, with length guided by the strength and complexity of the response.
- Loved entries can take more space; disliked entries should often be compressed. Contempt is expressed through brevity, not padding.
- Never mention star ratings or numerical scores in review prose. The `eval` field carries the verdict; the text carries the argument.
- Use generic 'one' rather than reader-facing 'you' in review prose.
- Add years to film, game, show, and major book references where precision matters: *Inception* (2010).
- Acknowledge uncertainty where appropriate, especially for scientific or factual claims.

## Chronology And Reading-Journal Authenticity

- Respect the `posted` date. Writing from earlier periods should not refer to later experiences.
- Voice maturation is natural. Older entries can be less developed than newer writing.
- Retrospective thematic bleed is allowed when a review follows a dense reading/viewing cluster and the conceptual link is real. Keep it light, retrospective, and genuine.
- Do not force an analogy merely because a neighbouring entry has attractive vocabulary.

## Factual And Source Rules

- Verify concrete details before using them.
- Never invent direct quotes, author statements, reception claims, plot details, translation comparisons, or publication facts.
- If only one translation was read, state that limitation plainly before discussing the translation.
- Sparse direct citations are allowed when they are specific and useful. General discourse should usually be absorbed into the prose rather than cited mechanically.
- In long-form review-essays, named critics and reviews should clarify a live problem in the argument. One to three named outside voices in a passage is usually enough. More than that starts to read as a literature survey unless each source performs a distinct function: historical reception, formal comparison, translation context, or a useful disagreement.
- Aggregated citation should never serve as proof of having consulted the discourse. A reception paragraph should answer: what does the outside conversation make visible that the essay could not make visible alone?
- For primary-text work, use the text itself when factual accuracy matters.

## Formatting

- Use ***bold italic*** for the current entry's own title on first substantial mention.
- Use *italic* for other work titles.
- Use *italic* for important concepts sparingly.
- Use **bold** for emphatic stress sparingly.
- Use `<u></u>` only for standout sentences that crystallise the argument. One is normal; two is exceptional.
- Long-form `_writing/` essays do not need `<u></u>` if pull quotes are already doing the visual emphasis. Use underline for catalogue cards and compact reviews; use pull quotes for essay architecture. Do not make both devices compete for the same sentence.
- Inside `<u>` tags, use HTML equivalents for formatting: `<em>` for italic, `<b><i>` for bold italic.
- Main prose should prefer markdown formatting. Reserve HTML for page-level metadata, source notes, image/banner handling, and layout components.
- Long-form `_writing/` essays may use `<hr class="section-break">` and markdown pull quotes with Kramdown classes when they clarify structure.
- Short catalogue reviews should not use headers or bullet points.

## Metadata And Translation Conventions

- For books read in English translation, mark the translator with `(EN)` in `creator`. Do not add `(EN)` to books originally written in English.
- For books read in Chinese translation, use `(CN)` or `(TW)` where appropriate.
- If a book was read in Chinese and the original language is neither Chinese nor English, `title_en` holds the original-language title only, and the Chinese edition title belongs in `creator` after the translator when known.
- If a book was read in Chinese and the original language is English, the main title is already original, so `title_en` can hold the Chinese edition title.
- Do not apply book-only title metadata rules to films, games, TV, or music.
- Do not put foreign-language titles into English review prose unless the title itself is the object under discussion.
- Translation notes should be brief. A full paragraph on translation can overwhelm the work unless translation is central to the argument.

## Website Wrapper Tone

- Homepage and navigational copy can be warmer than review prose.
- A reader landing on the site needs a hospitable threshold: a lived detail, a childhood habit, or a small statement of why the page exists.
- Wrapper copy may use reader-facing 'you' sparingly when it feels hospitable.
- Avoid empty calls to action. Prefer concrete invitations.

## Music And Game-Specific Rules

- Music reviews should avoid calendar embedding: 'best of the month', 'right now', 'this year', 'recently'.
- Personal rankings are acceptable when timeless; monthly or yearly diary framing is not.
- Game reviews should not centre completion statistics, platinum trophies, achievement-hunting, playthrough counts, or hour counts.
- Mechanical claims should be concrete: boss design, map structure, hitboxes, encounter rhythm, build variety, response systems.

## Chinese / Douban Requirements

- Douban reviews use traditional Chinese.
- Use standard Chinese punctuation and book title marks `《》` for Chinese-language titles.
- English titles and game terms can remain in English when that is more natural.
- Short Douban book reviews usually do not open with `《Title》...` because the page context supplies the title.
- Short Douban book reviews should be compact: roughly 150-250 characters for meh/disliked, 300-450 for liked, longer only when the book demands it.
- Long-form Chinese game reviews can use explicit section headers and spoiler warnings.
- Short Douban reviews do not need spoiler warnings.
- Personal context is acceptable only when it changes the reading of the work.
- Avoid generic authority frames in Chinese such as `最準的地方在於`, `真正厲害的是`, `最打動我的是`.
- Avoid grand contrast aphorisms in Chinese, especially `不是X，而是Y`, unless the opposition is genuinely necessary.

## Common Banned Or Rationed Constructions

These are rationed rather than mechanically forbidden. Keep one only when it carries a real argumentative distinction; remove it when it merely gives the sentence a balanced shape.

- `genuinely` as filler intensifier.
- `the kind of [noun] that...`
- `the result is`
- `one finishes the album/record`
- `feels less like X than Y`
- repeated `not X but Y`
- `it's worth noting`
- `one might argue`
- `importantly`
- `notably`
- `at the end of the day`
- empty reaction frames: `what strikes me most`, `what stayed with me`, `what moved me most`, `what I took away`

## Translated Article Titles

Chinese source titles are often commercial or clickbait-adjacent. English translations should use descriptive, serious titles that represent the piece as portfolio work rather than traffic bait.
