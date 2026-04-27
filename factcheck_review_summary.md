# Thoughts Fact-Check Summary

This is the concise proofread guide for the `_data/thoughts.yml` fact-check and writing-polish pass. The detailed batch audit is in `factcheck_audit.md`.

## Scope

- Checked 712 review entries across books, films, TV, games, and other media.
- Verified metadata, title placement, creators, years, types, original titles, translators where available, plot/mechanics claims, production claims, historical claims, and quoted or paraphrased details.
- Preserved ordering, YAML structure, and Dinghao's established review voice.
- Left solenoid-related files and other unrelated working-tree changes untouched.

## Main Corrections

- Restored and documented the book-only Chinese-title rule in `styleguides/style.md`: English originals read in Chinese keep the Chinese edition title in `title_en`; non-English originals read in Chinese keep the original-language title in `title_en` and put the Chinese edition title in `creator` as `(CN: 《...》)`.
- Corrected major book metadata and prose issues in entries including `The Deserters`, `Burnt Heart and Other Romances`, `Hi Izuru Kuni no Kojo`, `TV People`, `The Outsider`, the Tolkien entries, and several Murakami/Akutagawa/Kundera/Garcia Marquez entries.
- Corrected type and creator metadata for TV entries that had been marked as films, including `Asura`, `Why Try to Change Me Now`, `Unbelievable`, `This Is Going to Hurt`, and `Dopesick`.
- Fixed concrete game-detail claims in entries including `TUNIC`, `Dark Souls II`, `The Last of Us Part II`, `The Last of Us Remastered`, `Elden Ring`, `Dark Souls: Remastered`, and `The Beginner's Guide`.
- Fixed film/TV factual overreach in entries including `Better Call Saul S4`, `Severance S2`, `Adolescence`, `The Crown S5`, `The Problem with Jon Stewart S2`, `Inception`, `The Aviator`, and `Coherence`.
- Removed or softened claims that could not be verified, especially precise attributions, unsupported production claims, wrong scene chronology, and lines/details from the wrong source.

## Writing Polish

- Removed remaining direct-reader `you` usages outside quotations.
- Replaced unsupported precision with more durable wording rather than adding invented detail.
- Kept older entries chronologically plausible instead of making them sound like newly written 2026 essays.
- Preserved strong judgements where the factual basis held; softened only claims that were wrong, overprecise, or unsupported.

## Open Questions

- `The Outsider`: the exact translator/edition remains uncertain because the entry uses the UK title while the quoted line may correspond to a different English translation.
- Tolkien childhood Chinese editions and translators are probable but may need Dinghao's memory to confirm exact editions.
- Personal reading chronology from high school and college was left as memory unless it conflicted with public facts.
- Recent or future-facing 2025/2026 entries were checked against available public material, but some production/release details may still shift.

## Validation

- YAML parse passed: 712 entries.
- Audit coverage check passed: no YAML entries missing from `factcheck_audit.md`.
- `git diff --check -- _data\thoughts.yml styleguides\style.md` passed, with only CRLF warnings.
- `bundle exec jekyll build` passed on rerun.
