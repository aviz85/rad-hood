# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-06-11

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** rad-hood
- **Hebrew parser (`js/engine/parser.js`)** is the single source of input forgiveness. `parse()` resolves the first token to a verb via `verbOf()` (exact → strip infinitive ל-/ו- → Levenshtein ≤1). Nouns match via `scoreName()`/`matchScore()`: exact 100, prefix-form 92 (ה/ב/ל/ו/כ/מ/ש + combos grown onto the *name*, never peeled off player input), substring 78, 1-typo 70, 2-typo 62 (long words only).
- **Scene `onCommand` handlers call `RHParser.matchNoun`** (e.g. scene12 scenery). Loosening noun matching can make a scene falsely intercept a command before the real hotspot/item runs — always run `node test/e2e.mjs` (must stay 32/32, 270/270) after touching the parser.
- **`findHotspot`/`findInvItem` pick the BEST-scoring candidate** (not first match), threshold 62. Exact (100) always beats a fuzzy partial.
- **Input-assist UI:** `#suggest` chip bar under the input (`RH.renderSuggest` in core.js) — empty input shows verb chips, after a verb shows the scene's visible hotspot/inventory names. Tappable; keeps play text-based. Refreshed on input/focus/goto.
- **RTL prompt glyph:** `#prompt` is `direction:ltr; unicode-bidi:isolate` so the char isn't bidi-mirrored. Aviz wants it shown as `>` (not `<`).

## Do-Not-Repeat

- [2026-06-15] Fuzzy noun matching at edit-distance 2 on short words (e.g. 'ריבה'↔'סריגה') causes false matches that scene `onCommand` handlers act on. Gate distance-2 to word length ≥6; distance-1 to length ≥4.

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
