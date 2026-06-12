/* s_town.js — town NPC sprites: mom, kiosk (kiosk owner), pensioner.
 * Format per GAME-SPEC 4.4: pal maps chars to EGA indices, '.' = transparent.
 * All sprites are 14x28, anchored at bottom-center [7, 28].
 * Each character has one strong identifying detail readable at tiny size:
 * mom = white apron + worried knit brows, kiosk = unibrow/mustache + tank top,
 * pensioner = blue cap + cane.
 */

/* Mom — magenta dress, big white apron, hair bun, worried face,
 * hands clasped in front of the apron. */
RH.registerSprite('mom', {
  pal: {
    k: 0,   // black outline / eyes / shoes
    h: 6,   // brown hair (bun)
    s: 13,  // skin
    d: 5,   // magenta dress
    w: 15,  // white apron
  },
  anchor: [7, 28],
  frames: {
    stand: [
      '.....hhhh.....', // hair bun top
      '....hhhhhh....',
      '....hhhhhh....',
      '....hssssh....', // hairline over forehead
      '...hssssssh...',
      '...hsskkssh...', // worried brows knit together
      '...hskssksh...', // eyes
      '...hssssssh...',
      '...hssskssh...', // small worried mouth
      '....ssssss....', // chin
      '......ss......', // neck
      '...kddddddk...', // shoulders
      '...kddwwddk...', // apron bib starts
      '..kddwwwwddk..',
      '..kddwwwwddk..',
      '..kddwsswddk..', // hands clasped on apron
      '..kddwwwwddk..',
      '..kddwwwwddk..',
      '..kddwwwwddk..',
      '..kddwwwwddk..',
      '.kdddwwwwdddk.', // skirt widens
      '.kddwwwwwwddk.',
      '.kddwwwwwwddk.',
      'kddwwwwwwwwddk',
      'kddddddddddddk', // dress hem
      '....ss..ss....', // legs
      '....ss..ss....',
      '...kkk..kkk...', // shoes
    ],
  },
});

/* Kiosk owner — burly guy in a white tank top, bare arms, thick black
 * unibrow and a full mustache, chest hair peeking over the tank. */
RH.registerSprite('kiosk', {
  pal: {
    k: 0,   // black hair / mustache / outline / belt
    s: 13,  // skin (face, bare arms)
    w: 15,  // white tank top
    b: 1,   // blue shorts
    n: 6,   // brown sandals
  },
  anchor: [7, 28],
  frames: {
    stand: [
      '.....kkkk.....', // short black hair
      '....kkkkkk....',
      '....kssssk....',
      '...kssssssk...',
      '...kskkkksk...', // mighty unibrow
      '...kskssksk...', // eyes
      '...kssssssk...',
      '...kkkkkkkk...', // full mustache band
      '...kssssssk...',
      '....kssssk....', // chin
      '.....ssss.....', // thick neck
      '..sskwwwwkss..', // broad shoulders, tank straps
      '..sskwkkwkss..', // chest hair peeking over the tank
      '..s.kwwwwk.s..', // bare arms at sides
      '..s.kwwwwk.s..',
      '..s.kwwwwk.s..',
      '..s.kwwwwk.s..', // hands
      '....kwwwwk....',
      '....kwwwwk....', // tank hem
      '....kkkkkk....', // belt
      '....bbbbbb....', // shorts
      '....bbbbbb....',
      '....bb..bb....', // legs
      '....bb..bb....',
      '....bb..bb....',
      '....bb..bb....',
      '...nnn..nnn...', // sandals
      '...nnn..nnn...',
    ],
  },
});

/* Pensioner — blue flat cap with a brim, white sideburns and mustache,
 * squinting (no glasses yet), gray coat, right hand resting on a cane. */
RH.registerSprite('pensioner', {
  pal: {
    k: 0,   // black outline / collar / shoes
    c: 1,   // blue cap
    w: 15,  // white hair / mustache
    s: 13,  // skin
    o: 7,   // light gray coat
    p: 8,   // dark gray trousers
    n: 6,   // brown wooden cane
  },
  anchor: [7, 28],
  frames: {
    stand: [
      '....ccccc.....', // cap crown
      '...ccccccc....',
      '..ccccccccc...', // cap brim
      '...wssssssw...', // white sideburns
      '...wskssksw...', // squinting eyes (lost his glasses)
      '....ssssss....',
      '....swwwws....', // white mustache
      '.....ssss.....', // chin
      '......ss......', // neck
      '....kkkkkk....', // scarf collar
      '..kooooook....', // hunched shoulders
      '..kooooook....',
      '..kooooooko...', // right sleeve reaching out
      '..kooooookon..', // sleeve + cane handle
      '..kooooooksn..', // hand gripping the cane
      '..kooooook.n..', // coat + cane shaft
      '..kooooook.n..',
      '..kooooook.n..',
      '..kooooook.n..',
      '..kkkkkkkk.n..', // coat hem
      '...pp.pp...n..', // trousers
      '...pp.pp...n..',
      '...pp.pp...n..',
      '...pp.pp...n..',
      '...pp.pp...n..',
      '...pp.pp...n..',
      '..kkk.kkk..n..', // orthopedic shoes + cane tip
      '..kkk.kkk..n..',
    ],
  },
});
