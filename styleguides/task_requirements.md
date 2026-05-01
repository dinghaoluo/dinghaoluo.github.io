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
- Long-form source notes should not inventory the primary text by default; a review assumes the work being reviewed. Name the primary edition only when edition, translation, or original-publication year matters to a visible claim.
- For translated works, distinguish the original publication year from the edition or translation year when both are used in the prose or source note.
- Outside sources should appear in source notes only when they support a visible claim, named critic, author statement, translation context, or useful disagreement.
- When naming a critic in prose, either link the critic's name at first mention or identify the critic and outlet in the source note.
- When reusing a critic's vocabulary across entries, recheck the original source. Do not let an older site entry's paraphrase become the authority for a later essay.

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
- Pull quote text in long-form essays must appear verbatim in the main body text so it is searchable and attributable to the prose, not only to the layout.
- Pull quotes must also work without nearby context. Avoid extracted lines whose key words only make sense because the previous paragraph supplied the referent.
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

## Photo Atlas Requirements

- The `/photos/` page is a curated atlas, not a uniform masonry dump. Default slots are useful, but repeated motifs or emotionally specific sequences should get custom placement when the generic grid makes them read flat. The Guangzhou tower sequence is the reference: similar subjects can be arranged as a composed group rather than tiled evenly.
- Remove photos from the page by editing `_data/photos.yml`; do not delete image assets unless the user explicitly asks to remove files from disk.
- Geographic groupings should reflect the user's categories, not only broad map convenience. Guangzhou, Hong Kong, Shenzhen, and Zhuhai belong together as Pearl River Delta material; Chongqing, Hangzhou, Huazhou, Shanwei, Xiamen, and Shanghai belong in a separate "elsewhere in China" chapter.
- Map data must follow section data. When a photo section is renamed, split, or regrouped, update `_data/photo_map_regions.yml`, local-map IDs, cluster IDs, anchors, and labels together so the overview map and local cards do not point at stale buckets.
- Zoomed local maps should keep the rough-edged visual language. Avoid silently smoothing coastlines or turning regions into detached islands unless the actual geography warrants it.
- Preserve the whole photograph when the point of the image lives at the edge, in text, in a pun, or in the full sequence. Chinese characters at the lower-left of a frame, a cyclist/bike composition split by railings, or a stitched vertical walking sequence should not be cropped for a prettier tile. Use full-frame slots such as `whole` or `whole-portrait`, with the rendered `--photo-ratio`, so the actual width/height controls the frame.
- Cropping is acceptable only when it improves the photograph without deleting the reason the photograph is there. Before assigning a generic `wide`, `portrait`, or `square` slot, check whether the image has edge details, signs, faces, repeated bodies, or text that would be cut.
- If a page-specific slot is added in `assets/css/main.scss`, include a mobile fallback in the same pass. Custom desktop composition should collapse cleanly on narrow screens.
- Verification can be lightweight while iterating: YAML parse plus `git diff --check` is enough for small data-only changes. Run a full Jekyll build after Sass, template, map, or renderer changes, and always before pushing a photo update.

## Music And Game-Specific Rules

- Music reviews should avoid calendar embedding: 'best of the month', 'right now', 'this year', 'recently'.
- Personal rankings are acceptable when timeless; monthly or yearly diary framing is not.
- Game reviews should not centre completion statistics, platinum trophies, achievement-hunting, playthrough counts, or hour counts.
- Mechanical claims should be concrete: boss design, map structure, hitboxes, encounter rhythm, build variety, response systems.

## Chinese / Douban Requirements

- Douban reviews use traditional Chinese.
- Use standard Chinese punctuation. Book, film, game, and album titles take `《》`. Article, essay, short-story, song, and poem titles take `「」`. Do not collapse the distinction; an article title in `《》` reads as a book title.
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
- meta-claim openers: `X matters because Y`, `Y hurts because Z`, `This is the novel's exact cruelty`, `The point is not that X`, `And that seems to be the part of Y…`. These announce the move instead of making it.
- big abstract nouns where a specific one is available: `Empire`, `modernity`, `capitalism`, `history`. Replace with the specific noun the argument actually supports.
- self-credentialing in serious essays: `My own work makes me X`, `As a [profession] I can confirm Y`. Use first-person for concession or limit, not credential.

## Pre-Publication Repetition Audit

Before publishing a long-form essay, grep for any noun or verb that appears three or more times across adjacent paragraphs and decide whether each instance earns its place. Some repetitions are structural callbacks (the *Solenoid* drawers, the *Gravity's Rainbow* coordinate); most are unconscious tics. The published *Gravity's Rainbow* essay had to drop three of five 'refusal' instances in its closing movement before the word stopped feeling like a verbal shrug. If a word recurs and is not a deliberate callback, vary it.

## External Hyperlinks Inline

Long-form review-essays should hyperlink referenced concepts, places, events, and works at the moment they appear in the prose, not only in the source note. The *Solenoid* essay links the Cărtărescu interviews, Hooyman's labyrinth, and Perelmuter's counterfactual reading inline at the moment of need. The *Gravity's Rainbow* essay links Mittelwerk, the dodo myth, the Herero/Nama conflict, the integrating accelerometer, and Mendelson's 'Encyclopedic Narrative' inline. The source note then collects what was actually used. This is not just citation; it is courtesy to the reader who wants to follow a specific reference without scanning the bottom of the page.

## Source Note Opening

A long-form source note should open with the outside source most useful to the prose, not with edition data or a 'read in' framing. The *Gravity's Rainbow* source note opens with Riewald's math gloss because the rocket's double integration is what the essay leans hardest on. Reserve primary-edition mentions for cases where edition, translation, or original-publication year materially affects a visible claim. 'Read in the Penguin Classics deluxe edition (2012)' is filler; cut it.

Source notes should not duplicate metadata that already appears in the page's metadata head. The post date is already shown in the kicker (`journal · 27 Jul 2020`); a source-note line saying 'Originally published in Chinese on X, July 2020' repeats it. Drop the date and let the metadata head carry it. Reserve the source note for what the metadata head cannot show: the original-language title, the outlet, the translator, the edition where edition matters.

## Quotation Marks

Use single quotation marks for dialogue, titles within prose, and quoted phrases. Double quotation marks are not used in prose.

- Dialogue: 'Hello,' she said.
- Titles: Radiohead's 'Planet Telex'
- Quoted phrases: The priest says 'surely someone can do that'

Nested quotes use double inside single: 'He said "hello" to me.'

This applies to all prose. Markdown/YAML frontmatter and code blocks follow their own conventions.

## Image Captions

Two distinct caption registers, by length:

- **Short captions (single phrase or single sentence)** — used for journal-mode photos and any image whose caption is a tag rather than a paragraph. Lowercase the first word unless it is a proper noun. No full stop at the end. Examples: 'Lighthouse Island, Red Bay' (caps because both terms are proper nouns), 'an old fortress on the island has a window overlooking the surrounding sea' (lowercase because no proper noun starts the line). 'A boat crossing the bay.' is wrong on both counts; 'a boat crossing the bay' is right.
- **Long captions (multi-sentence descriptive paragraphs)** — used for long-form review-essay figures where the image needs introduction, attribution, and license. Follow normal prose conventions: sentence-case capitalisation, full stops between sentences, attribution and license at the end. The *Solenoid* and *Gravity's Rainbow* essays use this register for their inline figures.

Pick the register before writing the caption. Mixing them — sentence-case opening with no terminal full stop, or lowercase opening on a paragraph caption — reads as inconsistency.

## Em Dashes And Punctuation Rhythm

Em dashes are allowed when they carry real syntactic work — for example, when a parenthetical needs to remain inline rather than break out into commas, or when a list within a sentence needs visible boundaries. The *Solenoid* essay uses em dashes for inline lists ('city and body, fact and fiction, biography and counterfactual, flesh and metaphysics') and occasional asides.

Em dashes become a tic when one paragraph carries three or more, or when several em dashes do the same kind of work in succession. Colons and semicolons should still carry most of the rhythm in analytical prose; the *Capitalist Realism* sample is a useful reference for em-dash-free pacing. If a closing paragraph contains multiple em dashes, examine each: usually one is doing real work and the others are reflex.

## Long-Form Vs Journal-Mode Rules

The rules in this file describe review-essay and catalogue prose. Journal-mode entries (those in `_writing/` whose `category` is `journal` rather than `essay`) follow a different logic: they accumulate registers around an emotional centre rather than driving toward an argument. Use [_writing/shanwei.md](../_writing/shanwei.md) as the journal-mode reference, and see the journal-mode notes in [samples.md](samples.md) for what the rules look like there.

## Translated Article Titles

Chinese source titles are often commercial or clickbait-adjacent. English translations should use descriptive, serious titles that represent the piece as portfolio work rather than traffic bait.
