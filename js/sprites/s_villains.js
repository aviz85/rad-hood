/* s_villains.js — sprites for Zevik the vegetarian wolf and Grandma.
   Format per GAME-SPEC 4.4: pal maps chars to EGA indices, '.' = transparent,
   all rows in a frame are the same length, anchor at bottom-center. */

/* ---------------------------------------------------------------------------
 * Zevik the Wolf — 18x34
 * Big, gray and miserable. Droopy ears, sad inward brows, low pupils,
 * a permanent frown — and his one strong identifying detail: a white
 * grill apron with a ketchup stain (the only red meat he ever touches).
 * Frames: stand (default) · stand2 (a sigh — ears droop lower, eyes close).
 * ------------------------------------------------------------------------ */
RH.registerSprite('wolf', {
  pal: {
    k: 0,   // black outline / nose / pupils
    g: 8,   // dark gray fur (shadow, legs)
    G: 7,   // light gray fur
    w: 15,  // white (eyes, muzzle, apron)
    r: 4,   // red ketchup stain on the apron
  },
  anchor: [9, 34],
  frames: {
    stand: [
      '..kk..........kk..',  // ear tips
      '.kggk........kggk.',
      '.kgGgk......kgGgk.',
      '.kgGGgkkkkkkgGGgk.',  // ears meet the skull
      '.kGGGGGGGGGGGGGGk.',
      '.kGGGGGGGGGGGGGGk.',
      '.kGGkkGGGGGGkkGGk.',  // sad slanted brows
      '.kGwwwGGGGGGwwwGk.',  // big watery eyes
      '.kGwkwGGGGGGwkwGk.',  // pupils, low and hopeless
      '.kGGGGGwwwwGGGGGk.',  // muzzle top
      '.kGGGGwwwwwwGGGGk.',
      '.kGGGGwwkkwwGGGGk.',  // nose
      '.kGGGGwkwwkwGGGGk.',  // frown corners pointing down
      '..kGGGwwwwwwGGGk..',  // jaw
      '..kkGGGGGGGGGGkk..',  // neck
      '...kGGGGGGGGGGk...',  // shoulders
      '..kGGkwwwwwwkGGk..',  // apron bib + arms at the sides
      '..kGGkwwwwwwkGGk..',
      '..kGGwwwwwwwwGGk..',  // apron widens
      '..kGgwwwrrwwwgGk..',  // ketchup stain
      '..kGgwwwwrwwwgGk..',  // stain drip
      '..kggwwwwwwwwggk..',
      '..kkgwwwwwwwwgkk..',  // paws hanging limp
      '...kwwwwwwwwwwk...',  // apron skirt
      '...kwwwwwwwwwwk...',
      '...kkwwwwwwwwkk...',
      '....kkkkkkkkkk....',  // apron hem
      '....kggk..kggk....',  // legs
      '....kggk..kggk....',
      '....kggk..kggk....',
      '....kggk..kggk....',
      '...kgggk..kgggk...',
      '..kggggk..kggggk..',  // big tired feet
      '..kkkkkk..kkkkkk..',
    ],
    stand2: [
      '..................',  // ears slump a full row lower
      '..kk..........kk..',
      '.kggk........kggk.',
      '.kgGgkkkkkkkkgGgk.',
      '.kGGGGGGGGGGGGGGk.',
      '.kGGGGGGGGGGGGGGk.',
      '.kGGkkGGGGGGkkGGk.',
      '.kGkkkGGGGGGkkkGk.',  // eyes shut mid-sigh
      '.kGGGGGGGGGGGGGGk.',
      '.kGGGGGwwwwGGGGGk.',
      '.kGGGGwwwwwwGGGGk.',
      '.kGGGGwwkkwwGGGGk.',
      '.kGGGGwkwwkwGGGGk.',
      '..kGGGwwwwwwGGGk..',
      '..kkGGGGGGGGGGkk..',
      '...kGGGGGGGGGGk...',
      '..kGGkwwwwwwkGGk..',
      '..kGGkwwwwwwkGGk..',
      '..kGGwwwwwwwwGGk..',
      '..kGgwwwrrwwwgGk..',
      '..kGgwwwwrwwwgGk..',
      '..kggwwwwwwwwggk..',
      '..kkgwwwwwwwwgkk..',
      '...kwwwwwwwwwwk...',
      '...kwwwwwwwwwwk...',
      '...kkwwwwwwwwkk...',
      '....kkkkkkkkkk....',
      '....kggk..kggk....',
      '....kggk..kggk....',
      '....kggk..kggk....',
      '....kggk..kggk....',
      '...kgggk..kgggk...',
      '..kggggk..kggggk..',
      '..kkkkkk..kkkkkk..',
    ],
  },
});

/* ---------------------------------------------------------------------------
 * Grandma — 14x30
 * Small and sweet-looking: white bun, round glasses, hands folded over a
 * spotless apron — and a wide smile that never reaches the eyes.
 * Identifying detail: the glasses. In stand the pupils peek coldly past the
 * lenses; in stand2 the lenses flash white and the eyes vanish entirely.
 * Frames: stand (cold stare) · stand2 (lens glint).
 * ------------------------------------------------------------------------ */
RH.registerSprite('grandma', {
  pal: {
    k: 0,   // black outline / eyes / shoes
    G: 7,   // gray hair
    w: 15,  // white (bun, collar, apron, lens glint)
    f: 13,  // skin
    c: 11,  // glasses lenses
    d: 5,   // magenta dress
  },
  anchor: [7, 30],
  frames: {
    stand: [
      '.....kkkk.....',  // bun outline
      '....kwwwwk....',  // snow-white bun
      '....kwwwwk....',
      '...kkwwwwkk...',
      '..kGGGGGGGGk..',  // hair top
      '.kGGGGGGGGGGk.',
      '.kGffffffffGk.',  // forehead
      '.kGffffffffGk.',
      '.kGcckkkkccGk.',  // glasses rim and bridge
      '.kGkcffffckGk.',  // pupils at the inner lens edge — too still
      '.kGffffffffGk.',
      '.kGfkffffkfGk.',  // smile corners, all the way up
      '.kGffkkkkffGk.',  // the smile itself; the eyes never joined it
      '.kGffffffffGk.',
      '..kGffffffGk..',  // chin
      '...kkffffkk...',  // neck
      '..kkwwwwwwkk..',  // lace collar
      '.kddwwwwwwddk.',  // shoulders, spotless apron over the dress
      '.kdddwwwwdddk.',
      '.kdddwwwwdddk.',
      '.kddkwwwwkddk.',  // arms folded in front
      '.kddkffffkddk.',  // hands clasped, very patiently
      '.kdddwwwwdddk.',
      '.kdddwwwwdddk.',
      '.kddwwwwwwddk.',
      '.kddwwwwwwddk.',
      '.kddddddddddk.',  // dress hem
      '..kkkkkkkkkk..',
      '...kkk..kkk...',  // tiny sensible shoes
      '...kkk..kkk...',
    ],
    stand2: [
      '.....kkkk.....',
      '....kwwwwk....',
      '....kwwwwk....',
      '...kkwwwwkk...',
      '..kGGGGGGGGk..',
      '.kGGGGGGGGGGk.',
      '.kGffffffffGk.',
      '.kGffffffffGk.',
      '.kGwwkkkkwwGk.',  // lenses flash white
      '.kGwwffffwwGk.',  // no eyes behind the glint at all
      '.kGffffffffGk.',
      '.kGfkffffkfGk.',
      '.kGffkkkkffGk.',  // the smile does not move
      '.kGffffffffGk.',
      '..kGffffffGk..',
      '...kkffffkk...',
      '..kkwwwwwwkk..',
      '.kddwwwwwwddk.',
      '.kdddwwwwdddk.',
      '.kdddwwwwdddk.',
      '.kddkwwwwkddk.',
      '.kddkffffkddk.',
      '.kdddwwwwdddk.',
      '.kdddwwwwdddk.',
      '.kddwwwwwwddk.',
      '.kddwwwwwwddk.',
      '.kddddddddddk.',
      '..kkkkkkkkkk..',
      '...kkk..kkk...',
      '...kkk..kkk...',
    ],
  },
});
