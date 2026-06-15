# Memory

> Chronological action log. Hooks and AI append to this file automatically.
> Old sessions are consolidated by the daemon weekly.

## Session: 2026-06-12 10:25

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-06-12 10:25

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-06-12 10:25

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-06-12 10:26

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-06-15 10:51

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 11:00 | Created js/engine/parser.js | — | ~2029 |
| 11:01 | Edited js/engine/core.js | added 2 condition(s) | ~269 |
| 11:01 | Edited js/engine/core.js | added 3 condition(s) | ~217 |
| 11:01 | Edited js/engine/core.js | added 1 condition(s) | ~87 |
| 11:01 | Edited js/engine/core.js | modified say() | ~86 |
| 11:02 | Edited index.html | 2→3 lines | ~72 |
| 11:02 | Edited js/engine/core.js | added 7 condition(s) | ~742 |
| 11:02 | Edited js/engine/core.js | added 1 condition(s) | ~37 |
| 11:02 | Edited css/style.css | expanded (+22 lines) | ~148 |
| 11:07 | Edited js/engine/parser.js | 4→4 lines | ~74 |

## 2026-06-15 — Hebrew input forgiveness + autocomplete
| time | description | files | outcome | ~tokens |
|------|-------------|-------|---------|---------|
| -- | Investigated "הפנסיונר doesn't work" — actually resolves fine in current code; real gap is infinitives ("לדבר","לקחת") + verb typos falling to snark | js/engine/parser.js | reproduced via stub-DOM harness | ~6k |
| -- | Parser rewrite: verbOf (infinitive strip + fuzzy), scoreName/matchScore (general Hebrew prefixes + Levenshtein), suggestVerb | js/engine/parser.js | infinitives/typos/prefixes resolve | ~3k |
| -- | core.js: best-score findHotspot/findInvItem, "did you mean" + "אפשר כאן:" target hints, #suggest autocomplete chip bar | js/engine/core.js | tappable suggestions, unstuck on phrasing | ~3k |
| -- | Fixed regression: fuzzy d2 matched ריבה↔סריגה → scene12 false intercept; gated d2 to len>=6 | js/engine/parser.js | e2e 32/32, 270/270 | ~2k |
| -- | RTL prompt arrow < → > (LTR-isolated), CSS for #suggest chips | index.html, css/style.css | verified in browser | ~1k |
| 11:12 | Session end: 10 writes across 4 files (parser.js, core.js, index.html, style.css) | 10 reads | ~23382 tok |
