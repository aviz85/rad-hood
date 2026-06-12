/* art_title — Title screen: "Red Riding Hood and the Vegetarian Wolf".
   A dramatic-comic Sierra 1989 night shot: black forest, a huge low moon,
   Grandma's house silhouetted on a hill (one window flickering — of course),
   Red herself standing on the path with her basket, yellow eyes blinking in
   the dark woods, a crooked neighborhood sign, twinkling stars, drifting
   smoke, fireflies and one melodramatic bat crossing the moon.
   The title lettering is hand-built pixel glyphs (no fillText, per spec). */
(function () {
  /* ---------- 5x7 pixel Hebrew glyphs for the title lettering ---------- */
  const G = {
    'א': ['#...#', '##..#', '.#.#.', '..#..', '.#.#.', '#..##', '#...#'],
    'ב': ['.####', '....#', '....#', '....#', '....#', '....#', '#####'],
    'ד': ['#####', '...#.', '...#.', '...#.', '...#.', '...#.', '...#.'],
    'ה': ['#####', '....#', '....#', '#...#', '#...#', '#...#', '#...#'],
    'ו': ['..##.', '...#.', '...#.', '...#.', '...#.', '...#.', '...#.'],
    'ז': ['#####', '...#.', '..#..', '..#..', '..#..', '..#..', '..#..'],
    'ח': ['#####', '#...#', '#...#', '#...#', '#...#', '#...#', '#...#'],
    'י': ['..##.', '...#.', '...#.', '.....', '.....', '.....', '.....'],
    'כ': ['.####', '....#', '....#', '....#', '....#', '....#', '.####'],
    'מ': ['.#.##', '#.#.#', '#...#', '#...#', '#...#', '#...#', '#.###'],
    'נ': ['..##.', '...#.', '...#.', '...#.', '...#.', '...#.', '####.'],
    'פ': ['#####', '....#', '....#', '.##.#', '.#..#', '....#', '#####'],
    'צ': ['#...#', '#..#.', '.#.#.', '..##.', '...#.', '..#..', '#####'],
  };
  /* Hebrew reads right-to-left; these arrays are pre-reversed so they can be
     painted left-to-right. TITLE spells "Kipa Aduma", SUB "veHaZeev HaTzimchoni". */
  const TITLE = ['ה', 'מ', 'ו', 'ד', 'א', ' ', 'ה', 'פ', 'י', 'כ'];
  const SUB = ['י', 'נ', 'ו', 'ח', 'מ', 'צ', 'ה', ' ', 'ב', 'א', 'ז', 'ה', 'ו'];

  function word(ctx, P, letters, x, y, s, c) {
    let cx = x;
    for (const ch of letters) {
      if (ch === ' ') { cx += 4 * s; continue; }
      const rows = G[ch];
      for (let r = 0; r < 7; r++)
        for (let q = 0; q < 5; q++)
          if (rows[r][q] === '#') P.rect(ctx, cx + q * s, y + r * s, s, s, c);
      cx += 6 * s;
    }
  }

  RH.registerArt('art_title', function (ctx, P, t) {
    /* ---------- night sky ---------- */
    P.rect(ctx, 0, 0, 320, 132, 0);
    P.dither(ctx, 0, 98, 320, 14, 0, 1);          // faint blue breath near the horizon
    P.rect(ctx, 0, 112, 320, 20, 1);
    P.dither(ctx, 0, 112, 320, 6, 1, 0);          // soften the glow's upper edge

    /* twinkling stars — deterministic field, each with its own phase */
    for (let i = 0; i < 44; i++) {
      const sx = (i * 73 + 13) % 320, sy = (i * 37 + 5) % 88;
      if (sx > 224 && sx < 304 && sy > 40) continue;      // keep the moon's patch clear
      const tw = Math.sin(t * 2.1 + i * 1.7);
      if (tw > 0.3) P.px(ctx, sx, sy, 15);
      else if (tw > -0.45) P.px(ctx, sx, sy, 7);
      /* a few stars get a sparkle cross when at full brightness */
      if (i % 9 === 0 && tw > 0.85) {
        P.px(ctx, sx - 1, sy, 7); P.px(ctx, sx + 1, sy, 7);
        P.px(ctx, sx, sy - 1, 7); P.px(ctx, sx, sy + 1, 7);
      }
    }

    /* ---------- the big moon (low, theatrical, definitely too big) ---------- */
    P.circle(ctx, 276, 68, 31, 31, 1);             // soft blue halo
    P.circle(ctx, 276, 68, 26, 26, 15);
    P.dither(ctx, 256, 48, 12, 10, 15, 7);         // shaded upper-left limb
    P.circle(ctx, 264, 54, 5, 4, 7);               // craters (upper lune — the rest
    P.circle(ctx, 288, 56, 3, 2, 7);               //  will hide behind the house)
    P.circle(ctx, 276, 48, 2, 2, 7);
    P.px(ctx, 270, 60, 7); P.px(ctx, 284, 62, 7);

    /* one melodramatic bat crossing the moon, flapping */
    const bx = 250 + ((t * 12) % 56), by = 56 + Math.sin(t * 5) * 4;
    const flap = Math.sin(t * 12) > 0 ? 3 : -2;
    P.line(ctx, bx - 4, by - flap, bx, by, 0, 1);
    P.line(ctx, bx, by, bx + 4, by - flap, 0, 1);
    P.px(ctx, bx, by - 1, 0);

    /* ---------- distant treeline along the whole horizon glow ---------- */
    P.rect(ctx, 0, 118, 320, 14, 0);
    for (let i = 0; i < 27; i++) {
      const tx = i * 12 - 3;
      P.poly(ctx, [[tx, 120], [tx + 6, 106 + ((i * 5) % 9)], [tx + 12, 120]], 0);
    }

    /* ---------- the hill with Grandma's house, dead center of the moon ---------- */
    P.poly(ctx, [[160, 132], [210, 112], [256, 102], [300, 104], [320, 110], [320, 132]], 0);
    P.dither(ctx, 160, 102, 160, 30, 0, 2);        // hill is barely lit — it knows things
    /* the house: pure black silhouette cut into the moon disc */
    P.poly(ctx, [[252, 104], [252, 78], [300, 78], [300, 104]], 0);             // body
    P.poly(ctx, [[246, 80], [276, 60], [306, 80]], 0);                           // roof
    P.rect(ctx, 290, 50, 7, 14, 0);                 // crooked chimney
    P.rect(ctx, 288, 48, 11, 3, 0);
    /* moonlit rim where the silhouette leaves the disc */
    P.line(ctx, 246, 80, 252, 76, 8, 1);
    P.line(ctx, 252, 96, 252, 103, 8, 1);
    /* the one lit window — flickers like someone is... cooking jam */
    const flick = Math.sin(t * 7) + Math.sin(t * 13.7);
    P.rect(ctx, 259, 84, 9, 10, flick > -0.6 ? 14 : 6);
    P.line(ctx, 263, 84, 263, 93, 0, 1);            // window cross bars
    P.line(ctx, 259, 88, 267, 88, 0, 1);
    P.rect(ctx, 282, 86, 7, 18, 0);                 // door (closed; politely knock)
    P.px(ctx, 284, 95, 8);                          // a glint of doorknob
    /* smoke puffs rising from the chimney, drawn dark against the moon */
    for (let k = 0; k < 3; k++) {
      const rise = (t * 9 + k * 13) % 34;
      const px2 = 294 + rise * 0.3 + Math.sin(t * 2 + k) * 2;
      const py = 46 - rise;
      if (py > 6) P.circle(ctx, px2, py, 2 + rise * 0.12, 2, 8);
    }
    /* a twisted dead tree by the house, because of course there is one */
    P.line(ctx, 314, 110, 310, 84, 0, 2);
    P.line(ctx, 311, 90, 304, 78, 0, 1);
    P.line(ctx, 311, 90, 318, 76, 0, 1);

    /* ---------- the dark forest, left wall ---------- */
    /* canopy: heaps of black foliage rolling down toward the path */
    P.circle(ctx, 8, 78, 30, 26, 0);
    P.circle(ctx, 42, 70, 28, 24, 0);
    P.circle(ctx, 78, 82, 26, 22, 0);
    P.circle(ctx, 104, 98, 22, 20, 0);
    P.poly(ctx, [[0, 132], [0, 70], [120, 96], [116, 132]], 0);
    /* moonlit rims on a few black trunks */
    P.rect(ctx, 22, 92, 8, 40, 0);  P.rect(ctx, 29, 94, 2, 38, 8);
    P.rect(ctx, 58, 88, 9, 44, 0);  P.rect(ctx, 66, 90, 2, 42, 8);
    P.rect(ctx, 92, 96, 7, 36, 0);  P.rect(ctx, 98, 98, 2, 34, 8);
    /* crooked branches reaching over the path — very welcoming */
    P.line(ctx, 98, 96, 128, 86, 0, 2);
    P.line(ctx, 122, 88, 136, 92, 0, 1);
    P.line(ctx, 100, 104, 124, 102, 0, 1);

    /* ---------- ground & the winding path ---------- */
    P.rect(ctx, 0, 132, 320, 68, 2);
    P.dither(ctx, 0, 132, 320, 68, 2, 0);           // night grass
    P.dither(ctx, 0, 132, 320, 5, 2, 10);           // moonlit rim along the horizon
    /* dirt path: from the bottom edge, snaking up toward the house on the hill */
    P.poly(ctx, [[128, 200], [168, 200], [158, 174], [196, 152], [232, 140], [262, 116], [254, 112], [222, 132], [184, 144], [142, 168]], 6);
    P.dither(ctx, 140, 150, 110, 48, 6, 8);         // the path is mostly shadow
    P.dither(ctx, 136, 184, 34, 16, 6, 8);
    /* scattered stones and tufts */
    P.circle(ctx, 96, 176, 4, 2, 8); P.circle(ctx, 200, 158, 3, 2, 8);
    P.rect(ctx, 44, 158, 2, 4, 10); P.rect(ctx, 70, 184, 2, 4, 10);
    P.rect(ctx, 230, 178, 2, 4, 10); P.rect(ctx, 290, 162, 2, 4, 10);

    /* ---------- eyes blinking in the woods (and one pair in the bushes) ---------- */
    /* foreground bush, bottom-right corner — something lives in it */
    P.circle(ctx, 306, 192, 22, 14, 0);
    P.circle(ctx, 284, 198, 14, 9, 0);
    P.dither(ctx, 288, 180, 32, 8, 0, 2);
    const EYES = [[34, 100, 0.0], [70, 88, 1.9], [16, 120, 3.4], [101, 104, 5.1], [300, 184, 2.6]];
    for (const [ex, ey, ph] of EYES) {
      if (Math.sin(t * 0.9 + ph) > -0.82) {         // open most of the time; brief blinks
        P.rect(ctx, ex, ey, 2, 2, 14);
        P.rect(ctx, ex + 5, ey, 2, 2, 14);
        P.px(ctx, ex, ey, 15); P.px(ctx, ex + 5, ey, 15);   // glints
      } else {
        P.rect(ctx, ex, ey + 1, 2, 1, 6);           // mid-blink slits
        P.rect(ctx, ex + 5, ey + 1, 2, 1, 6);
      }
    }

    /* ---------- fireflies drifting over the grass ---------- */
    for (let k = 0; k < 3; k++) {
      const fx = 60 + k * 84 + Math.sin(t * 0.8 + k * 2.1) * 26;
      const fy = 152 + k * 9 + Math.sin(t * 1.7 + k * 4.0) * 7;
      if (Math.sin(t * 3 + k * 2.5) > -0.2) P.px(ctx, fx, fy, 14);
    }

    /* ---------- Red herself: hood, basket, attitude ---------- */
    /* (No sprite on the title — she is painted here, looking at the house.) */
    const rx = 116, ry = 130;                       // top-left anchor; feet land at y=178
    P.circle(ctx, rx + 13, ry + 50, 12, 3, 0);      // moon shadow under her
    /* cape: big, dramatic, slightly lifted by the night wind */
    const wav = Math.sin(t * 1.8) * 2;
    P.poly(ctx, [[rx + 6, ry + 12], [rx + 20, ry + 12], [rx + 26 + wav, ry + 40], [rx + 22, ry + 44], [rx + 4, ry + 44], [rx, ry + 40 + wav]], 4);
    P.line(ctx, rx + 6, ry + 12, rx, ry + 40 + wav, 0, 1);          // shadow edge, left
    P.line(ctx, rx + 20, ry + 12, rx + 26 + wav, ry + 40, 12, 1);   // moonlit edge, right
    P.line(ctx, rx + 12, ry + 18, rx + 9, ry + 42, 0, 1);           // one deep cape fold
    /* hood, peaked like every classic poster */
    P.poly(ctx, [[rx + 7, ry + 12], [rx + 10, ry + 1], [rx + 13, ry - 3], [rx + 16, ry + 1], [rx + 19, ry + 12]], 4);
    P.rect(ctx, rx + 8, ry + 9, 11, 5, 4);
    P.line(ctx, rx + 13, ry - 3, rx + 17, ry + 3, 12, 1);           // moon catches the peak
    /* face inside the hood — pale in the moonlight, eyes on the house */
    P.rect(ctx, rx + 11, ry + 5, 6, 5, 7);
    P.rect(ctx, rx + 12, ry + 5, 4, 2, 15);          // moonlit brow
    P.px(ctx, rx + 13, ry + 8, 0); P.px(ctx, rx + 15, ry + 8, 0);   // determined eyes
    P.rect(ctx, rx + 11, ry + 4, 6, 1, 0);           // hood shading over the brow
    /* legs and sneakers under the cape */
    P.rect(ctx, rx + 8, ry + 44, 4, 3, 1);
    P.rect(ctx, rx + 15, ry + 44, 4, 3, 1);
    P.rect(ctx, rx + 7, ry + 46, 6, 2, 15);
    P.rect(ctx, rx + 15, ry + 46, 6, 2, 15);
    /* arm holding the famous basket */
    P.line(ctx, rx + 20, ry + 22, rx + 26, ry + 28, 4, 2);
    P.rect(ctx, rx + 23, ry + 28, 10, 7, 6);         // basket body
    P.dither(ctx, rx + 23, ry + 28, 10, 7, 6, 14);   // weave
    P.line(ctx, rx + 23, ry + 28, rx + 28, ry + 22, 6, 1);  // handle
    P.line(ctx, rx + 28, ry + 22, rx + 33, ry + 28, 6, 1);
    P.rect(ctx, rx + 24, ry + 27, 8, 1, 15);         // napkin over the pastries

    /* ---------- crooked neighborhood sign, bottom-right ---------- */
    P.rect(ctx, 268, 154, 4, 28, 6);                 // post
    P.rect(ctx, 268, 154, 1, 28, 14);                // moonlit edge of the post
    P.poly(ctx, [[244, 148], [296, 144], [297, 158], [245, 162]], 7);  // tilted board
    P.poly(ctx, [[244, 148], [296, 144], [296, 146], [244, 150]], 15); // lit top edge
    /* scratched "lettering" — shapes only; the real text waits for the game */
    P.rect(ctx, 252, 151, 12, 2, 0);
    P.rect(ctx, 268, 150, 8, 2, 0);
    P.rect(ctx, 280, 150, 10, 2, 0);
    /* arrow pointing left, into the forest — Hebrew signs point with the reading */
    P.rect(ctx, 256, 156, 26, 2, 0);
    P.poly(ctx, [[250, 157], [257, 153], [257, 161]], 0);
    P.line(ctx, 246, 162, 243, 168, 0, 1);           // a nail gave up; board sags

    /* ---------- the title lettering ---------- */
    /* drop shadow first, then the gold face; the subtitle in moon-white */
    word(ctx, P, TITLE, 76, 12, 3, 4);
    word(ctx, P, TITLE, 74, 10, 3, 14);
    word(ctx, P, SUB, 75, 39, 2, 8);
    word(ctx, P, SUB, 74, 38, 2, 15);
    /* a roaming sparkle along the gold letters — pure 1989 box-art energy */
    const sp = 74 + ((t * 60) % 240);
    if (sp < 244) {
      P.px(ctx, sp, 10 + (sp % 18), 15);
      P.px(ctx, sp + 1, 10 + (sp % 18), 15);
    }
  });
})();
