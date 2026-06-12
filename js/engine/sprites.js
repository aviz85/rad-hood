/* Sprite engine — pixel characters defined as row strings */
(function () {
  const defs = {};

  function register(id, def) { defs[id] = def; }

  function draw(ctx, id, frame, x, y, flip) {
    const d = defs[id] || defs.generic;
    if (!d || !d.frames) return;
    const rows = d.frames[frame] || d.frames.stand || d.frames[Object.keys(d.frames)[0]];
    if (!rows || !rows.length) return;
    const w = rows[0].length, h = rows.length;
    const ax = d.anchor ? d.anchor[0] : Math.floor(w / 2);
    const ay = d.anchor ? d.anchor[1] : h;
    for (let r = 0; r < h; r++) {
      const row = rows[r];
      for (let i = 0; i < row.length; i++) {
        const ch = row[i];
        if (ch === '.' || ch === ' ') continue;
        const c = d.pal && d.pal[ch];
        if (c === undefined) continue;
        const px = flip ? (w - 1 - i) : i;
        P.rect(ctx, Math.round(x) - ax + px, Math.round(y) - ay + r, 1, 1, c);
      }
    }
  }

  /* Generic figure — fallback when a sprite is missing */
  register('generic', {
    pal: { h: 6, s: 13, c: 9, k: 0 },
    frames: {
      stand: [
        '...hhh....', '..hhhhh...', '..ssss....', '..s.s.....', '..ssss....',
        '..cccc....', '.cccccc...', '.cccccc...', '..cccc....', '..c..c....',
        '..c..c....', '..c..c....', '..k..k....',
      ],
    },
  });

  /* Red — basic placeholder sprite; replaced by js/sprites/s_red.js */
  const R = {
    pal: { r: 4, R: 12, s: 13, k: 0, j: 1, J: 9, w: 15 },
    anchor: [6, 26],
    frames: {
      stand: [
        '...RRRR....', '..RRRRRR...', '..Rssss....', '..Rs.s.....', '..Rssss....',
        '...sss.....', '..RRRRR....', '.RRRRRRR...', '.R.RRR.R...', '.R.RRR.R...',
        '...RRR.....', '...JJJ.....', '...JJJ.....', '..JJ.JJ....', '..JJ.JJ....',
        '..JJ.JJ....', '..JJ.JJ....', '..JJ.JJ....', '..kk.kk....', '..kk.kk....',
      ],
      walk1: [
        '...RRRR....', '..RRRRRR...', '..Rssss....', '..Rs.s.....', '..Rssss....',
        '...sss.....', '..RRRRR....', '.RRRRRRR...', '.R.RRR.R...', '.R.RRR.R...',
        '...RRR.....', '...JJJ.....', '...JJJ.....', '..JJ.JJ....', '..JJ..JJ...',
        '.JJ....JJ..', '.JJ....JJ..', 'JJ......JJ.', 'kk......kk.', '...........',
      ],
      walk2: [
        '...RRRR....', '..RRRRRR...', '..Rssss....', '..Rs.s.....', '..Rssss....',
        '...sss.....', '..RRRRR....', '.RRRRRRR...', '.R.RRR.R...', '.R.RRR.R...',
        '...RRR.....', '...JJJ.....', '...JJJ.....', '...JJJ.....', '...JJJ.....',
        '..JJJJJ....', '..JJ.JJ....', '..JJ.JJ....', '..kk.kk....', '...........',
      ],
    },
  };
  register('red', R);

  window.RHSprites = { register, draw, defs };
})();
