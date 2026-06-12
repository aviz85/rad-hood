/* s_misc.js — misc character sprites: guard, cop, cat, gnome, crow, squirrel.
 * Format per GAME-SPEC 4.4: pal maps chars to EGA indices, '.' = transparent,
 * all rows in a frame share the same length, anchor = bottom-center.
 * Design rule: dark outline + one strong identifying detail per character
 * so each reads instantly at 320x200 (guard = shades, cop = cap badge,
 * cat = ginger + white chest, gnome = red hat + red eyes, crow = yellow beak,
 * squirrel = giant fluffy tail).
 */

/* === GUARD — bridge tough guy. All-black outfit, full sunglasses band. 14x29 === */
RH.registerSprite('guard', {
  pal: { k: 0, d: 8, s: 13, w: 15 }, // k black suit/outline, d dark-gray shading, s skin, w shirt collar
  anchor: [7, 29],
  frames: {
    stand: [
      '.....kkkk.....', // buzz-cut hair
      '....kkkkkk....',
      '....kssssk....', // forehead
      '...kkkkkkkk...', // sunglasses band — the identifying detail
      '....kssssk....', // cheeks
      '.....kssk.....', // jaw / neck
      '..kkkkwwkkkk..', // wide shoulders, white collar peek
      '.kkkkkwwkkkkk.',
      '.kkkkkkkkkkkk.', // arms crossed over chest
      '.kdkkkkkkkkdk.', // gray shading separates arms from torso
      '.kdkkkkkkkkdk.',
      '.kdkkkkkkkkdk.',
      '.sskkkkkkkkss.', // bare hands at the sides
      '..kkkkkkkkkk..',
      '..kdkkkkkkdk..', // hip shading
      '..kkkkkkkkkk..',
      '..kkkk..kkkk..', // legs
      '..kkkk..kkkk..',
      '..kkkk..kkkk..',
      '..kkkk..kkkk..',
      '..kkkk..kkkk..',
      '..kkkk..kkkk..',
      '..kkkk..kkkk..',
      '..kkkk..kkkk..',
      '..kkkk..kkkk..',
      '..kkkk..kkkk..',
      '..kkkk..kkkk..',
      '.ddddd..ddddd.', // heavy boots
      '.ddddd..ddddd.',
    ],
  },
});

/* === COP — forest police. Blue uniform, yellow cap badge + chest badge. 14x27 === */
RH.registerSprite('cop', {
  pal: { b: 1, k: 0, s: 13, y: 14 }, // b uniform blue, k outline/boots, s skin, y badges
  anchor: [7, 27],
  frames: {
    stand: [
      '....bbbbbb....', // police cap
      '...bbbyybbb...', // cap with yellow badge — the identifying detail
      '....kssssk....', // face
      '....kskksk....', // eyes
      '....kssssk....',
      '.....kssk.....', // neck
      '..bbbbbbbbbb..', // shoulders
      '.bbbbbbbbbbbb.',
      '.bbybbbbbbbbb.', // chest badge
      '.bbbbbbbbbbbb.',
      '.bbbbbbbbbbbb.',
      '.ssbbbbbbbbss.', // hands
      '..kkkkyykkkk..', // duty belt, yellow buckle
      '..bbbbbbbbbb..',
      '..bbbb..bbbb..', // legs
      '..bbbb..bbbb..',
      '..bbbb..bbbb..',
      '..bbbb..bbbb..',
      '..bbbb..bbbb..',
      '..bbbb..bbbb..',
      '..bbbb..bbbb..',
      '..bbbb..bbbb..',
      '..bbbb..bbbb..',
      '..bbbb..bbbb..',
      '..bbbb..bbbb..',
      '.kkkkk..kkkkk.', // polished shoes
      '.kkkkk..kkkkk.',
    ],
  },
});

/* === CAT — Matok, the kiosk owner's ginger cat. Head left, tail right. 12x9 === */
RH.registerSprite('cat', {
  pal: { k: 0, o: 12, w: 15, e: 2 }, // k outline/legs, o ginger fur, w white chest, e green eye
  anchor: [6, 9],
  frames: {
    stand: [
      '.k..k.......', // pointy ears
      '.koook......', // head
      '.keook.....k', // green eye + tail tip raised
      '.kooookkkk.k', // back line + tail
      '.koooooooook', // body, tail joins
      '.kwoooooook.', // white chest patch — the identifying detail
      '..k.k...k.k.', // four legs, standing
      '..k.k...k.k.',
      '..k.k...k.k.',
    ],
    walk1: [
      '.k..k.......',
      '.koook......',
      '.keook.....k',
      '.kooookkkk.k',
      '.koooooooook',
      '.kwoooooook.',
      '.k...k..k..k', // legs spread mid-stride
      '.k...k..k..k',
      'k....k..k..k',
    ],
    walk2: [
      '.k..k.......',
      '.koook......',
      '.keook....k.', // tail flicks
      '.kooookkkkk.',
      '.koooooooook',
      '.kwoooooook.',
      '...kk...kk..', // legs gathered under body
      '...kk...kk..',
      '...kk...kk..',
    ],
  },
});

/* === GNOME — garden gnome whose eyes follow you. Red hat, red eyes. 10x14 === */
RH.registerSprite('gnome', {
  pal: { r: 4, s: 13, w: 15, b: 1, k: 0 }, // r disturbing red hat + eyes, s face, w beard, b tunic, k feet
  anchor: [5, 14],
  frames: {
    stand: [
      '....rr....', // tall pointed hat — the identifying detail
      '....rr....',
      '...rrrr...',
      '...rrrr...',
      '..rrrrrr..',
      '.rrrrrrrr.', // hat brim
      '..srssrs..', // unblinking red eyes
      '.wssssssw.', // beard creeps up the cheeks
      '.wwwsswww.',
      '.wwwwwwww.', // full white beard
      '..wwwwww..',
      '..bbbbbb..', // stubby blue tunic
      '..bbbbbb..',
      '..kk..kk..', // little feet
    ],
  },
});

/* === CROW — fence crow at Grandma's road. Head left, yellow beak. 12x9 === */
RH.registerSprite('crow', {
  pal: { k: 0, d: 8, y: 14, e: 15 }, // k black body, d wing sheen, y beak, e white eye
  anchor: [6, 9],
  frames: {
    stand: [
      '..kk........', // head
      '.kkkk.......',
      'ykekk.......', // yellow beak — the identifying detail — and white eye
      '.kkkkkkkk...', // body
      '.kkkkdddkkk.', // folded wing with gray sheen
      '..kkkkkkkkkk', // tail sweeps right
      '...kkkkk..kk',
      '....k..k....', // stick legs
      '...kk.kk....', // gripping feet
    ],
    stand2: [ // optional anim frame: beak opens for "kra"
      '..kk........',
      'ykkkk.......', // upper beak tilts
      'ykekk.......',
      '.kkkkkkkk...',
      '.kkkkdddkkk.',
      '..kkkkkkkkkk',
      '...kkkkk..kk',
      '....k..k....',
      '...kk.kk....',
    ],
  },
});

/* === SQUIRREL — forest path squirrel. Brown body, huge bright tail. 12x9 === */
RH.registerSprite('squirrel', {
  pal: { k: 0, o: 6, r: 12, w: 15 }, // k outline, o brown body, r fluffy red tail, w belly
  anchor: [6, 9],
  frames: {
    stand: [
      '.........rr.', // tail tip curls over the head — the identifying detail
      '........rrrr',
      '.kk.....rrrr', // ears
      '.koook..rrrr', // head
      '.kkook..rrr.', // dark bead eye
      '.koooookrrr.', // body meets tail
      '.kwwoook.rr.', // white belly
      '..koook.....', // haunch
      '..kk..kk....', // paws
    ],
    stand2: [ // optional anim frame: tail flick
      '........rr..',
      '.......rrrr.',
      '.kk....rrrr.',
      '.koook.rrrr.',
      '.kkook..rrr.',
      '.koooookrrr.',
      '.kwwoook.rr.',
      '..koook.....',
      '..kk..kk....',
    ],
  },
});
