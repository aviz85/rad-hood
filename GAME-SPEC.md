# GAME-SPEC — Red Riding Hood and the Vegetarian Wolf
## A Sierra On-Line 1989-style quest adventure · Player-facing text in Hebrew

**This is the binding contract.** Every agent writing a content file must comply with the structures, names and coordinates defined here. Do not modify the engine (`js/engine/*`), `index.html` or `css/*`. Each agent writes **only** the files assigned to it.

**Language policy (critical):**
- **All code, comments, identifiers, commit messages, design docs and documentation — English only.**
- **All player-facing strings (dialogue, descriptions, UI messages, death messages) — Hebrew only**, addressing the player in feminine form (the player is Red).
- Arrows inside Hebrew strings must be `←` (never `→` — it points against RTL reading flow).

---

## 1. Story & Tone

- **Red (כיפה)** — a sassy street-smart neighborhood girl ("ערסית"): slang, overconfidence, zero patience, heart of gold underneath. Mom sends her with a pastry basket to Grandma who lives beyond the forest.
- **Zevik the Wolf (זאביק)** — a pitiful vegetarian wolf. Everyone flees from him while all he wants is grilled portobello mushrooms. The true victim of the fairy tale.
- **Grandma (סבתא)** — a sweet-faced psychopath. Runs a shady "jam" empire from her basement, traps everywhere, and has been framing the wolf for years. The twist: **she** is the one terrorizing the forest.
- **The Narrator** — the voice of the game. Sarcastic, fourth-wall-breaking, Sierra-style but with street attitude. He mocks silly commands, describes objects cynically, and enjoys it when Red dies.
- Funny deaths are part of the genre (like Sierra): eating a mushroom, eating Grandma's jam, swimming in the river, the basement trap. Always with a punchline.

---

## 2. Architecture

Browser game with no build step: `index.html` loads global scripts. Logical canvas **320×200** displayed at 960×600. EGA palette only (16 colors). The engine (`js/engine/`) is already written and final.

### File validation — mandatory for every agent
```bash
cd /Users/aviz/rad-hood && node test/check.mjs <files you wrote>
```
Repeat fix→check until the output is clean (exit 0). The checker validates syntax, registration, structure, and also executes draw functions against a mock ctx.

---

## 3. EGA palette & paint helpers (`P`)

Indices: 0 black · 1 blue · 2 green · 3 cyan · 4 red · 5 magenta · 6 brown · 7 light gray · 8 dark gray · 9 light blue · 10 light green · 11 light cyan · 12 light red · 13 pink · 14 yellow · 15 white

```js
P.rect(ctx,x,y,w,h,c)        // filled rect, c = EGA index (or '#hex')
P.px(ctx,x,y,c)              // single pixel
P.line(ctx,x1,y1,x2,y2,c,t)  // line (Bresenham), t=thickness
P.poly(ctx,[[x,y],...],c)    // filled polygon
P.circle(ctx,cx,cy,rx,ry,c)  // filled ellipse
P.dither(ctx,x,y,w,h,c1,c2)  // pixel checkerboard — EGA-style gradients
P.bands(ctx,x,y,w,h,[c,...]) // horizontal stripes (skies, sunsets)
```

---

## 4. Content file formats

### 4.1 Background art — `js/art/artNN.js`
```js
RH.registerArt('art07', function (ctx, P, t) {
  // Paint the full 320x200 every call. t = seconds (subtle animation: fire, birds, water).
  P.bands(ctx, 0, 0, 320, 60, [1, 9, 11]);           // sky
  P.dither(ctx, 0, 60, 320, 60, 2, 10);               // distant forest
  P.rect(ctx, 0, 120, 320, 80, 6);                    // ground
  // ... richness: trees with volume, shadows, dithering, small details
});
```
Rules: **no `ctx.fillText`** (signs are drawn as shapes; their text is delivered via the "read" command). No external images. Interactive objects must be drawn exactly inside their hotspot rects (section 7). Horizon (top walk line) per the scene's `horizon` — below it is walkable ground.

### 4.2 Scene logic — `js/scenes/sceneNN.js`
```js
RH.registerScene({
  id: 'scene07', name: 'שדה הפטריות', art: 'art07', music: 'm_forest',
  horizon: 125,                      // minimal walkable y (default 120)
  look: 'תיאור כללי של הסצנה לפקודת "הבט".',
  enter(g) {                          // called on every entry — MUST be idempotent!
    if (!g.flag('seen07')) { g.flag('seen07', 1); g.say('שורת פתיחה...'); }
  },
  beforeExit(dir, g) { return true; },   // optional; false = blocks exit (then say why)
  hotspots: [
    { id: 'wolf', names: ['זאב', 'זאביק'], rect: [130, 95, 46, 80],
      sprite: 'wolf', pos: [153, 175],          // sprite drawn over background, baseline at pos
      when: g => !g.flag('wolfGone'),            // conditional visibility (optional)
      look: 'string or fn(g)',
      talk(g) { g.sayAs('זאביק', 'שלום...'); },
      give: { mushrooms(g) { /* ... */ }, '*': 'הוא לא רוצה את זה.' },
      use:  { torch(g) { /* use torch on... */ } },
    },
  ],
  exits: { left: { to: 'scene06' }, right: { to: 'scene08', x: 12, y: 170 } },
  onCommand(g, verb, noun, target) { return false; },  // free command interception; true=handled
});
```
- Verb keys on a hotspot: `look, take, talk, use, give, open, eat, read, knock, push, show, call, photo` — string or `fn(g)`.
- `give`/`use` are objects keyed by **item id** (`'*'` = fallback).
- `names` — all Hebrew synonyms the player might type (without ה' definite article — the engine handles prefixes).
- API available inside handlers: `g.say(...lines)` (returns a Promise), `g.sayAs(name, ...lines)`, `g.flag(k[,v])`, `g.has(itemId)`, `g.give(itemId)`, `g.takeItem(itemId)`, `g.addScore(points, 'key')`, `g.die('funny message')`, `g.goto(sceneId, x, y)`, `g.playSfx(name)`, `g.theEnd(text)`.
- Scoring: use **exactly** the keys and values from the score table (section 8). `addScore` with a key never counts twice.

### 4.3 Music — `js/music/m_*.js`
```js
RH.registerMusic('m_forest', {
  bpm: 96,
  voices: [
    { wave: 'square',   vol: 0.12, notes: [['E4',1],['G4',0.5],[0,0.5],['A4',2]] },
    { wave: 'triangle', vol: 0.18, notes: [['E2',2],['A2',2]] },          // bass
    { wave: 'noise',    vol: 0.05, notes: [['x',0.5],[0,0.5],['x',0.5],[0,0.5]] }, // drums
  ],
});
```
- Note: `['C4', duration in beats]` · `0` = rest · `'x'` = noise hit (noise voice). Pitches `A0`–`B7`, sharp `#`, flat `b`.
- `wave`: square / triangle / sawtooth / sine / noise. Loops automatically. Recommended length: 16–32 beats, 2–4 voices. **All voices must sum to the same number of beats!**

### 4.4 Sprites — `js/sprites/s_*.js`
```js
RH.registerSprite('wolf', {
  pal: { g: 8, G: 7, p: 13, k: 0, w: 15 },   // char -> EGA color (or '#hex'), '.' = transparent
  anchor: [8, 36],                              // anchor point (bottom-center); default w/2,h
  frames: {
    stand: [ '....kk....', '...kGGk...', /* row strings, all same length! */ ],
    walk1: [ /* ... */ ], walk2: [ /* ... */ ],
  },
});
```
The player/walking characters need `stand, walk1, walk2`. Static characters — `stand` is enough (extra frames can animate via the hotspot's `anim`). Recommended human size: ~12–16 wide × 26–34 tall. Cat/crow small: ~12×10.

### 4.5 Sound effects — `js/music/sfx.js`
```js
RH.registerSfx('meow', function (ctx, out) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'square'; o.frequency.setValueAtTime(900, ctx.currentTime);
  o.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.25);
  g.gain.setValueAtTime(0.2, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  o.connect(g); g.connect(out); o.start(); o.stop(ctx.currentTime + 0.3);
});
```
Built into the engine (do not redefine): `blip, pickup, score, error, death, door, knock`. To add: `meow, howl, splash, camera, ring, crash, siren, tada, creak, crow`.

---

## 5. Items (defined in the engine — `js/engine/items.js`, do not touch)

| id | Hebrew name | Source |
|---|---|---|
| `phone` | טלפון (סוללה מתה) | starting inventory |
| `basket` | סלסלת מאפים | Mom, scene01 |
| `glasses` | משקפיים | under the bench, scene03 |
| `newspaper` | עיתון | trash can, scene03 |
| `map` | מפה של היער | the pensioner, scene03 |
| `seeds` | גרעינים | the kiosk owner, scene02 |
| `mushrooms` | פטריות פורטובלו | scene07 |
| `note` | פתק חסות מהזאב | Zevik, scene06 |
| `torch` | לפיד | Zevik's campfire, scene06 |
| `rusty_key` | מפתח חלוד | the cave, scene09 |
| `jam` | צנצנת ריבה חשודה | the cave, scene09 |
| `photos` | צילומים מרשיעים | photographing the wall, scene13 |

---

## 6. Canonical flags

`hasBasket, gotGlasses, gaveGlasses, toldCat, wolfTold, wolfFriend, bridgeOpen, sawTracks, gmaBusy, basementOpen, freedCat, phoneCharged, finale` + `seenNN` flags for first entry to each scene.

---

## 7. Scenes — binding outline

General structure: 320×200. Sky/wall down to `horizon`, walkable floor from `horizon` to 200. For every hotspot, the `rect` is also where the artist draws the object.

### scene01 — Red's home (interior) · art01 · m_hood · horizon 118
A housing-block apartment living room: rug, sofa, old TV, framed photo of Grandma on the wall, exit door on the right. Mom stands on the left.
- hotspots: `mom` — rect [38,92,36,78], sprite `mom`, pos [56,170] · `sofa` [150,128,80,42] · `tv` [108,118,36,40] · `photo` Grandma's photo [228,58,32,34] · `door` [284,86,30,78]
- first enter: opening — the Narrator introduces Red and the mission (4–6 lines, funny).
- talk mom: dialogue, gives `basket`, **+10 `p_basket`**, flag `hasBasket`. Repeat talk: motherly nagging.
- look Grandma's photo: foreshadowing ("החיוך שלה... משהו שם לא מסתדר").
- beforeExit right: without `hasBasket` — Mom stops you (false). With it — exit to scene02.
- exits: right → scene02

### scene02 — Neighborhood street & kiosk · art02 · m_hood · horizon 122
A neighborhood street: housing blocks, laundry lines, kiosk with an awning, "missing cat" poster. The kiosk owner behind the counter.
- hotspots: `kioskman` [118,96,38,72], sprite `kiosk`, pos [137,168] · `kiosk` structure [96,62,96,108] · `poster` missing-cat poster [206,84,30,38] · `trash` [44,148,22,32] · `laundry` [240,40,70,30]
- talk kiosk owner: his cat "מתוק" vanished near the forest; he is bored and wants a newspaper. give newspaper → gives `seeds`, **+15 `p_seeds`**, flag `toldCat`.
- look poster: "נעדר: מתוק. חתול. עונה לשם 'פסססס'. תוגמל במסטיק."
- exits: left → scene01, right → scene03

### scene03 — The public garden · art03 · m_hood · horizon 120
A garden with a bench, a pensioner sitting, a dry fountain, a trash can, bushes.
- hotspots: `pensioner` [62,104,32,62], sprite `pensioner`, pos [78,166] · `bench` [52,142,72,26] · `fountain` [158,118,48,34] · `trash` [248,146,22,30] · `bushes` [288,118,32,44]
- look/search bench ("הבט מתחת לספסל"): find `glasses`, **+10 `p_glasses`**, flag `gotGlasses`.
- take/look trash: find `newspaper`, **+5 `p_paper`**.
- Pensioner without glasses: complains he can't see. give glasses → delighted, gives `map` + a forest warning, **+15 `p_map`**, flag `gaveGlasses`.
- look fountain: "יבשה מ-1994. כמו ההומור של הפנסיונר."
- exits: left → scene02, right → scene04

### scene04 — Forest entrance · art04 · m_forest · horizon 118
Edge of the neighborhood: asphalt ends, trees begin, big warning sign, darkening mood.
- hotspots: `sign` warning sign [138,96,44,52] · `trees` [0,30,90,110] · `mailbox` abandoned mailbox [250,140,20,34]
- read sign: "זהירות: זאב. או יותר גרוע — סבתא." (+joke)
- beforeExit right: without `map` — Narrator: you wandered an hour and ended up back here (false). With the map — pass.
- exits: left → scene03, right → scene05

### scene05 — Forest path · art05 · m_forest · horizon 110
Thick forest, winding path, a huge ancient tree, a squirrel, a small wooden signpost pointing up.
- hotspots: `oldtree` [30,20,80,150] · `squirrel` [242,148,16,14], sprite `squirrel`, pos [250,162], anim · `signpost` [196,118,18,40] · `flowers` [120,160,40,16]
- talk squirrel: punchline. read signpost: "שדה הפטריות — למעלה. באחריותכן."
- exits: left → scene04, right → scene06, up → scene07

### scene06 — Forest clearing: Zevik's grill stand · art06 · m_grill · horizon 116
A clearing with a makeshift grill stand, a sign "הזאב הטוב — 100% צמחוני", a small campfire, Zevik standing sad.
- hotspots: `wolf` Zevik [128,90,48,84], sprite `wolf`, pos [152,172] · `grill` [186,118,62,52] · `fire` campfire [196,152,22,18] (animated fire in the art!) · `menu` menu sign [98,108,26,40]
- first talk: **+5 `p_wolfTalk`**, flag `wolfTold` — Zevik pours his heart: vegetarian, everyone runs, craves portobello ("כובע חום, נקודות בהירות — רק אלה!"), hints Grandma "לא מה שנדמה לך".
- give mushrooms (when `wolfTold`): happy grill cutscene, **+25 `p_feedWolf`**, flag `wolfFriend`, gives `note` (protection note). Offers a torch.
- take/use fire after `wolfFriend`: receive `torch`, **+10 `p_torch`**. Before: "לקחת אש ממדורה של זאב זר? תרבות, איפה."
- read menu: funny vegetarian menu.
- exits: left → scene05, right → scene08

### scene07 — The mushroom field · art07 · m_forest · horizon 125
A darker clearing, three distinct mushroom patches, an old creepy scarecrow.
- hotspots: `redshrooms` red mushrooms [56,148,34,22] · `glowshrooms` glowing mushrooms [148,140,32,20] · `brownshrooms` brown dotted mushrooms [238,152,38,20] · `scarecrow` [96,88,30,64]
- take brown: without `wolfTold` — "אין לי מושג מה אכיל פה ואני לא בונה על מזל." With it — receive `mushrooms`, **+15 `p_shrooms`**.
- take red/glowing: refusal with a joke. **eat any mushroom: death** (comic, Sierra-style).
- look scarecrow: creepy + a Grandma hint.
- exits: down → scene05

### scene08 — The river & bridge · art08 · m_river · horizon 112
A wide river crosses the screen, wooden bridge on the right, a tough-guy guard with sunglasses on it, a "toll" sign, a cave mouth in the rocks above.
- hotspots: `guard` [212,96,34,74], sprite `guard`, pos [229,168] · `bridge` [184,118,94,34] · `river` [0,150,320,44] · `tollsign` [168,100,22,36] · `cave_mouth` [60,70,44,44]
- beforeExit right without `bridgeOpen`: the guard stops you — "אגרת ביטחון: 50 שקל. או שווה ערך בגרעינים." (false)
- show/give note → the guard panics with respect, **+15 `p_bridge`**, flag `bridgeOpen`. give seeds (alternative) → pass, **+10 `p_bridge`** (loses seeds).
- use/swim river ("שחה", "קפוץ לנחל"): **death** ("שחייה בנחל: חינם. ההלוויה: לא.").
- Walking to the cave mouth = exit up → scene09.
- exits: left → scene06, right → scene10, up → scene09

### scene09 — The cave · art09 · m_danger · horizon 120
A dark cave: stalactites, bats, a jam crate, a metallic glint, small cat pawprints, suspicious cave paintings.
- enter: without `torch` — Red refuses to enter ("חושך, אחותי.") and auto-returns to scene08 (g.goto). With the torch — enter (the art may assume warm torch light).
- hotspots: `key_glint` [252,162,14,10] → take: `rusty_key`, **+10 `p_key`** · `jambox` jam crate [58,138,42,32] → take: `jam`, **+10 `p_jam`**; read label: "ריבת סבתא — טעם אחד ואת בעננים. מילולית." · `paintings` [120,60,80,44] → look: "מישהו צייר סבתא עם מסור. אמנות." · `pawprints` [180,170,40,12] → look: hint that מתוק was taken toward Grandma's house · `bats` [140,30,60,24]
- exits: down → scene08

### scene10 — The path to Grandma's · art10 · m_grandma · horizon 116
A countryside path that is "too cute": white fence, jam billboards, a crow on the fence, a heart-shaped mailbox.
- hotspots: `signs` [80,90,60,60] → read: "ריבות של סבתא! 100% טבעי. 0% שאלות." · `crow` [222,118,18,16], sprite `crow`, pos [231,134] → talk: "קרררע. ברצינות, תברחי." · `mailbox_heart` [270,134,24,38] → look/open: unopened complaint letters
- exits: left → scene08, right → scene11

### scene11 — Grandma's yard · art11 · m_grandma · horizon 114
A sweet wooden house with disturbing touches: a gnome whose eyes follow you, an "herb" bed, a barred basement window, a front door with an embroidered sign.
- hotspots: `door` [148,96,38,74] · `gnome` [58,148,22,28], sprite `gnome`, pos [69,176] · `herbs` [222,150,62,26] · `cellar_window` [40,162,28,18] · `welcome` embroidered sign [192,104,26,22]
- knock door: Grandma opens with chilling sweetness → **+5 `p_enter`** → g.goto('scene12').
- open door without knocking: locked ("מנומסים דופקים. ערסים גם, אבל חזק יותר.").
- look gnome/herbs/window: dark jokes. From the window — cat meowing.
- exits: left → scene10

### scene12 — Grandma's living room · art12 · m_grandma · horizon 120
A too-perfect grandma living room: armchair, certificate wall, jam jar shelf, antique phone, heavy basement door on the left, window.
- hotspots: `grandma` [198,92,38,80], sprite `grandma`, pos [217,172], when: `g=>!g.flag('gmaBusy')` · `certificates` [120,56,60,44] → look: "תעודת הוקרה: המלכודת היצירתית ביותר, 1987." · `jamshelf` [254,70,44,60] · `oldphone` [98,118,20,22] · `cellar_door` [40,92,32,76] · `exit_door` [286,94,30,74]
- first enter: the **"big eyes" dialogue**, street-smart version (Red: "סבתא, איזה עיניים גדולות יש לך..." Grandma answers sweet-menacing) → **+10 `p_eyes`**. Grandma offers jam.
- eat jam / accept her offer: **death**.
- talk Grandma (after the opening): the phone rings — "הספק" — Grandma goes to the kitchen, flag `gmaBusy` (she disappears from the scene).
- use rusty_key on cellar_door: only when `gmaBusy` — opens, **+20 `p_basement`**, flag `basementOpen`, g.goto('scene13'). While Grandma is present — she blocks ("לאן, מתוקה? שם רק... שימורים.").
- exits: via exit_door → scene11 (e.g. open/use hotspot or exits.right)

### scene13 — The basement · art13 · m_danger · horizon 124
A horror basement lit by a bare bulb: evidence wall (maps, wolf photos with X marks, red strings), a cage with the cat, a jam production table, a charger and outlet, a floor trap zone, cat pawprints bypassing it, stairs back up.
- hotspots: `evidence_wall` [110,52,90,64] → look: **+15 `p_wall`** (detailed, funny-disturbing description) · `cage` cage with מתוק [44,128,38,34] → open: free the cat, **+15 `p_cat`**, flag `freedCat`, a `cat` sprite roams the scene · `charger` [254,140,26,22] → use phone on it: **+10 `p_charge`**, flag `phoneCharged` · `traps_floor` trap zone [140,168,60,22] · `tracks` cat pawprints [120,180,80,12] → look: flag `sawTracks` ("מתוק עקף את האמצע. חכם ממך.") · `stairs` [20,80,28,80]
- Trap: any command targeting `charger` or `cage` before `sawTracks` triggers **death** ("מלכודת דובים. לרגל שלך יש עכשיו דעות.") — crossing the room's center. The `traps_floor` look should warn.
- photo evidence_wall (when `phoneCharged`): receive `photos`, **+20 `p_photo`** → then cutscene: Grandma appears on the stairs ("לאן ממהרים?") → Zevik bursts through the window → confrontation → Grandma arrested by the forest cop (Zevik "מכיר אנשים") → **+30 `p_finale`**, flag `finale` → g.goto('scene14').
- exits: up via stairs → scene12 (before the finale)

### scene14 — Epilogue · art14 · m_end · horizon 120 · `noPlayer: true`
A neighborhood celebration: a "הזאב הרעב — חומוס וגריל פטריות" restaurant sign, Zevik with a serving tray, the kiosk owner hugging מתוק, the pensioner dancing, Grandma in a police van in the background.
- enter: ending sequence — funny closing lines for each character, then `g.theEnd('הסוף! צברת X מתוך 270 נקודות. ...')` (compose with `g.score`).
- Decorative hotspots with funny looks (restaurant, police van, Zevik).

---

## 8. Score table (270 pts — binding keys)

| key | pts | event |
|---|---|---|
| p_basket | 10 | basket from Mom |
| p_glasses | 10 | finding the glasses |
| p_paper | 5 | newspaper from the trash |
| p_map | 15 | glasses to pensioner → map |
| p_seeds | 15 | newspaper to kiosk owner → seeds |
| p_wolfTalk | 5 | first talk with Zevik |
| p_shrooms | 15 | picking the right mushrooms |
| p_feedWolf | 25 | mushrooms to Zevik → note |
| p_torch | 10 | taking the torch |
| p_bridge | 15 (or 10 with seeds) | crossing the bridge |
| p_key | 10 | the rusty key |
| p_jam | 10 | the jam jar from the cave |
| p_enter | 5 | entering Grandma's house |
| p_eyes | 10 | the big-eyes dialogue |
| p_basement | 20 | opening the basement |
| p_wall | 15 | examining the evidence wall |
| p_cat | 15 | freeing מתוק |
| p_charge | 10 | charging the phone |
| p_photo | 20 | photographing the evidence |
| p_finale | 30 | the finale |

---

## 9. Required sprites (binding ids)

| file | ids | notes |
|---|---|---|
| `js/sprites/s_red.js` | `red` | The player! Red hoodie, jeans, attitude. stand+walk1+walk2. ~14×30 |
| `js/sprites/s_villains.js` | `wolf`, `grandma` | Zevik: gray, sad, grill apron; Grandma: sweet with something off in the eyes. At least stand, ideally a 2nd frame |
| `js/sprites/s_town.js` | `mom`, `kiosk`, `pensioner` | stand |
| `js/sprites/s_misc.js` | `guard`, `cop`, `cat`, `gnome`, `crow`, `squirrel` | stand (small animals ~12×10) |

## 10. Required music

| file | id | mood |
|---|---|---|
| m_title.js | `m_title` | heroic-comic opener, 8-bit fanfare, 110–130bpm |
| m_hood.js | `m_hood` | neighborhood: light, Mediterranean-chiptune, rhythmic |
| m_forest.js | `m_forest` | forest: mysterious, minor, 80–100bpm |
| m_grill.js | `m_grill` | Zevik: warm, mellow, slow reggae-chiptune |
| m_river.js | `m_river` | river: flowing arpeggios |
| m_grandma.js | `m_grandma` | a "sweet" waltz with one wrong note — cute but off |
| m_danger.js | `m_danger` | cave/basement: tension, low bass, dissonance |
| m_end.js | `m_end` | celebration: happy victory march |

## 11. Design docs (written in the design phase, in `design/`)

`story.md` (full narrative), `voice-red.md`, `voice-wolf.md`, `voice-grandma.md`, `voice-npcs.md` (including the Narrator!), `jokes.md`, `looks.md`, `review.md` (punch-up notes per scene). **Docs are written in English; literal game lines inside them are Hebrew.** Every scene-logic agent must read them before writing.

## 12. Comedy principles

1. The Narrator answers every silly command with sarcasm. 2. Fourth-wall breaks in moderation (like Space Quest). 3. Red answers characters in slang but is never vulgar. 4. Every death = a punchline + a nod that "Sierra would be proud". 5. Self-aware anachronisms (phone, insurance, GPS, stories) are the charm — not a bug. 6. No jokes at the expense of real groups — everything at the expense of the characters.
