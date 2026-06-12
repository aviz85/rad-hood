# BUILD REPORT — Red Riding Hood and the Vegetarian Wolf
### A Sierra On-Line 1989-style adventure game · built 2026-06-12

A complete, playable browser quest adventure in the style of King's Quest / Space Quest (1989):
320×200 logical canvas upscaled to 960×600, strict 16-color EGA palette, text-parser input in Hebrew,
procedural chiptune music via WebAudio, funny Sierra-style deaths, and a 270-point score system.
All player-facing text is Hebrew (addressing the player in feminine form — the player is Red);
all code, comments and docs are English.

---

## 1. What was built

### Validation status

```
node test/check.mjs js/art/*.js js/scenes/*.js js/music/*.js js/sprites/*.js js/dialog/*.js
OK (arts:15 · scenes:14 · music:8 · sprites:12 · items:0 · sfx:10)   → exit 0
```

Every content file passes the project checker (syntax, registration, structure, and live execution
of every draw function against a mock canvas context). `js/boot.js` is the browser bootstrap
(title screen / start / load) — it requires `document` and is intentionally not a checker target.

Cross-reference audit (performed for this report):
- All 50 `<script>` tags in `index.html` resolve to existing files (43 content + 6 engine + boot).
- Every scene's `art`, `music` and sprite ids resolve to registered assets.
- Score keys used in scenes: all 20 binding keys from the spec, summing to **270 points**
  (`p_bridge` awards 15 via the protection note or 10 via seeds — the spec's intended alternative).

### Scenes — 14 scenes, full story arc (`js/scenes/`, 3,109 lines)

| # | Scene | Music | Key beats |
|---|-------|-------|-----------|
| 01 | Red's home | m_hood | Opening narration, Mom gives the basket (+10), Grandma-photo foreshadowing |
| 02 | Street & kiosk | m_hood | Kiosk owner's missing cat, newspaper→seeds trade (+15) |
| 03 | Public garden | m_hood | Glasses under the bench (+10), newspaper in trash (+5), glasses→map (+15) |
| 04 | Forest entrance | m_forest | Warning sign, map-gated exit (wander-back gag) |
| 05 | Forest path | m_forest | Hub: squirrel, signpost, up-exit to mushroom field |
| 06 | Zevik's grill stand | m_grill | Wolf backstory (+5), mushrooms→note cutscene (+25), torch (+10) |
| 07 | Mushroom field | m_forest | Three patches, correct pick (+15), **death by mushroom** |
| 08 | River & bridge | m_river | Toll guard, note (+15) or seeds (+10) to pass, **death by swimming** |
| 09 | The cave | m_danger | Torch-gated entry, rusty key (+10), jam jar (+10), pawprint hint |
| 10 | Path to Grandma's | m_grandma | Too-cute billboards, talking crow, complaint mailbox |
| 11 | Grandma's yard | m_grandma | Knock-to-enter (+5), creepy gnome, barred cellar window |
| 12 | Grandma's living room | m_grandma | "Big eyes" dialogue (+10), **death by jam**, phone call distraction, key→basement (+20) |
| 13 | The basement | m_danger | Evidence wall (+15), bear-trap **death**, free the cat (+15), charge phone (+10), photo (+20), finale cutscene (+30) |
| 14 | Epilogue | m_end | Neighborhood celebration, per-character closing gags, `theEnd` with final score |

Four comic deaths (mushroom, river, jam, bear trap) — each with a punchline, per the genre contract.

### Background art — 15 paintings (`js/art/`, 3,058 lines)

`art01`–`art14` plus `art_title` (animated title screen). Pure procedural EGA painting via the `P`
helpers (rect/poly/circle/dither/bands/line/px) — no images, no text rendering. Every interactive
object is drawn inside its binding hotspot rect; animated details (campfire, water, bats, birds)
keyed to the `t` parameter.

### Sprites — 12 characters (`js/sprites/`, 653 lines)

| File | Ids |
|------|-----|
| `s_red.js` | `red` (player — stand/walk1/walk2, red hoodie, attitude) |
| `s_villains.js` | `wolf`, `grandma` |
| `s_town.js` | `mom`, `kiosk`, `pensioner` |
| `s_misc.js` | `guard`, `cop`, `cat`, `gnome`, `crow`, `squirrel` |

### Music — 8 tracks + 10 SFX (`js/music/`, 884 lines)

All eight binding tracks: `m_title` (fanfare), `m_hood` (Mediterranean chiptune), `m_forest`
(minor, mysterious), `m_grill` (reggae-chiptune), `m_river` (flowing arpeggios), `m_grandma`
(sweet waltz with a wrong note), `m_danger` (low dissonance), `m_end` (victory march).
Multi-voice (square/triangle/sawtooth/sine/noise), beat-aligned, auto-looping.
`sfx.js` adds the 10 required effects: `meow, howl, splash, camera, ring, crash, siren, tada, creak, crow`.

### Dialogue & design docs

- `js/dialog/snark.js` — the Narrator's snark pool for silly/unknown commands.
- `design/` — 8 docs (1,474 lines): `story.md`, four voice bibles (Red / Wolf / Grandma /
  NPCs+Narrator), `jokes.md`, `looks.md`, `review.md` (per-scene punch-up notes).

### Totals

| Layer | Files | Lines |
|---|---|---|
| Scenes | 14 | 3,109 |
| Background art | 15 | 3,058 |
| Sprites | 4 | 653 |
| Music + SFX | 9 | 884 |
| Dialogue | 1 | 37 |
| Boot | 1 | 34 |
| Engine (pre-existing, untouched) | 6 | 924 |
| Design docs | 8 | 1,474 |
| **Project total** | | **~10,373** |

---

## 2. How to run

No build step. Serve the directory statically and open it in a browser:

```bash
cd /Users/aviz/rad-hood
python3 -m http.server 8000
# then open http://localhost:8000/
```

(Any static server works: `npx serve`, `php -S`, etc. Opening `index.html` via `file://` may
block WebAudio/localStorage in some browsers — prefer a local server.)

On the title screen press **Enter** or click the start button. Type Hebrew commands in the input
line (e.g. `דבר עם אמא`, `קח סלסלה`, `הבט מתחת לספסל`, `תן פטריות לזאב`), move Red with the
arrow keys or by clicking the floor. Save/load is built into the engine (localStorage).

Re-run validation any time:

```bash
cd /Users/aviz/rad-hood && node test/check.mjs js/art/*.js js/scenes/*.js js/music/*.js js/sprites/*.js js/dialog/*.js
```

---

## 3. Directory structure

```
rad-hood/
├── index.html              # entry point — loads all scripts in order (final, untouched)
├── GAME-SPEC.md            # the binding contract
├── BUILD-REPORT.md         # this report
├── css/style.css           # CRT-style chrome (final, untouched)
├── design/                 # narrative & comedy bibles (8 docs)
├── js/
│   ├── engine/             # final, untouched: core, parser, palette, sprites, audio, items
│   ├── boot.js             # title screen / start / load bootstrap
│   ├── art/                # art01–art14 + art_title (procedural EGA backgrounds)
│   ├── scenes/             # scene01–scene14 (logic, hotspots, dialogue, scoring)
│   ├── sprites/            # s_red, s_villains, s_town, s_misc (12 sprite ids)
│   ├── music/              # 8 tracks + sfx.js
│   └── dialog/snark.js     # Narrator snark pool
└── test/
    ├── check.mjs           # content validator (the gate every file passed)
    └── dev.html            # development harness
```

---

## 4. Known gaps / possible follow-ups

- **No automated end-to-end playthrough test.** `check.mjs` validates structure and executes
  draw functions, but a scripted walkthrough (commands → expected flags/score → finale) would
  catch logic regressions. A headless harness over `test/dev.html` is the natural next step.
- **Parser synonyms are good but not exhaustive.** Hebrew is rich; playtesting will surface verb
  and noun phrasings players type that aren't covered (the Narrator's snark fallback catches them
  gracefully, but more synonyms = better feel).
- **Single walk animation set.** Red has stand/walk1/walk2; there are no directional (left/right
  flip handled by engine, but no up/down) or idle animations. Cosmetic only.
- **Music is loop-based with no transitions** — track changes between scenes are hard cuts.
  A short crossfade in the engine's audio layer would polish it (engine change — out of scope).
- **No mobile/touch input** beyond click-to-walk; the text parser assumes a physical keyboard.
- **Save system is a single localStorage slot** (engine-provided). Multiple named slots would be
  a Sierra-authentic touch.

None of these block a full, scoreable 270/270 playthrough from the title screen to `theEnd`.
