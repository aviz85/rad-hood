/* art01 — Red's home: housing-block apartment living room (scene01, horizon 118)
   Hotspot rects (binding): sofa [150,128,80,42] · tv [108,118,36,40]
   photo [228,58,32,34] · door [284,86,30,78]. Mom is a sprite — not drawn here. */
RH.registerArt('art01', function (ctx, P, t) {
  /* ---------- wall (down to horizon 118) ---------- */
  P.rect(ctx, 0, 0, 320, 118, 3);                 // cyan plaster wall
  P.rect(ctx, 0, 0, 320, 4, 7);                   // ceiling cornice
  P.line(ctx, 0, 4, 319, 4, 8, 1);                // cornice shadow line
  // wallpaper motif: sparse light diamonds
  for (let wy = 18; wy < 104; wy += 22) {
    for (let wx = 6 + ((wy / 22) % 2) * 14; wx < 318; wx += 28) {
      P.px(ctx, wx, wy, 11);
      P.px(ctx, wx - 1, wy + 1, 11); P.px(ctx, wx + 1, wy + 1, 11);
      P.px(ctx, wx, wy + 2, 11);
    }
  }
  // old plaster crack near the ceiling
  P.line(ctx, 142, 6, 148, 16, 8, 1);
  P.line(ctx, 148, 16, 146, 24, 8, 1);
  // baseboard
  P.rect(ctx, 0, 112, 320, 6, 6);
  P.line(ctx, 0, 112, 319, 112, 8, 1);

  /* ---------- floor (118..200): gray terrazzo tiles ---------- */
  P.rect(ctx, 0, 118, 320, 82, 7);
  P.dither(ctx, 0, 118, 320, 5, 7, 8);            // shadow at the wall base
  // grout lines, perspective spacing grows toward the viewer
  const rows = [125, 133, 143, 155, 169, 184];
  for (let i = 0; i < rows.length; i++) P.line(ctx, 0, rows[i], 319, rows[i], 8, 1);
  for (let i = -4; i <= 4; i++) {                 // converging tile columns
    P.line(ctx, 160 + i * 30, 118, 160 + i * 62, 200, 8, 1);
  }
  P.dither(ctx, 0, 192, 320, 8, 7, 8);            // darker foreground edge

  /* ---------- window on the left wall ---------- */
  P.rect(ctx, 12, 26, 52, 56, 15);                // white frame
  P.rect(ctx, 16, 30, 44, 48, 9);                 // opening: sky base
  P.bands(ctx, 16, 30, 44, 21, [9, 11, 11]);      // brighter sky at the top
  // neighboring housing blocks
  P.rect(ctx, 20, 46, 16, 32, 8);
  P.rect(ctx, 42, 54, 14, 24, 7);
  for (let by = 50; by < 74; by += 6) {           // lit windows in the block
    P.px(ctx, 24, by, 14); P.px(ctx, 30, by, 14);
  }
  P.px(ctx, 46, 60, 1); P.px(ctx, 51, 66, 1);     // dark windows next door
  // laundry line between the blocks
  P.line(ctx, 36, 52, 42, 56, 8, 1);
  P.px(ctx, 38, 54, 12); P.px(ctx, 40, 55, 11);   // tiny hung clothes
  // a bird crossing the window
  const bx = 19 + Math.floor((t * 11) % 38);
  const by2 = 36 + Math.round(Math.sin(t * 5) * 2);
  P.px(ctx, bx, by2, 0); P.px(ctx, bx + 1, by2 - 1, 0); P.px(ctx, bx + 2, by2, 0);
  // mullions
  P.rect(ctx, 37, 30, 2, 48, 15);
  P.rect(ctx, 16, 53, 44, 2, 15);
  // curtains with a soft sway
  const sway = Math.round(Math.sin(t * 1.4) * 1);
  P.rect(ctx, 12, 26, 52, 5, 9);                  // pelmet
  P.poly(ctx, [[13, 31], [21, 31], [19 + sway, 56], [22 + sway, 80], [13, 80]], 11);
  P.poly(ctx, [[63, 31], [55, 31], [57 - sway, 56], [54 - sway, 80], [63, 80]], 11);
  P.line(ctx, 17, 36, 17 + sway, 70, 3, 1);       // curtain fold hints
  P.line(ctx, 59, 36, 59 - sway, 70, 3, 1);
  P.rect(ctx, 10, 82, 56, 4, 7);                  // window sill
  P.line(ctx, 10, 86, 65, 86, 8, 1);
  // cactus on the sill — Mom's only surviving plant
  P.rect(ctx, 28, 74, 6, 8, 4);                   // little pot
  P.rect(ctx, 29, 68, 4, 6, 2);
  P.px(ctx, 27, 70, 2); P.px(ctx, 34, 71, 2);     // cactus arms
  P.px(ctx, 30, 66, 10);                          // fresh sprout

  /* ---------- ceiling lamp + a stubborn fly ---------- */
  P.line(ctx, 160, 0, 160, 12, 8, 1);
  P.poly(ctx, [[151, 22], [169, 22], [164, 13], [156, 13]], 14);
  P.px(ctx, 160, 23, 15);                         // glowing bulb tip
  P.dither(ctx, 154, 24, 13, 3, 14, 3);           // faint light haze
  const fa = t * 3;
  P.px(ctx, 160 + Math.round(Math.cos(fa) * 11), 28 + Math.round(Math.sin(fa * 2) * 4), 0);

  /* ---------- wall clock with a swinging pendulum ---------- */
  P.circle(ctx, 88, 44, 9, 9, 6);
  P.circle(ctx, 88, 44, 6, 6, 15);
  P.px(ctx, 88, 39, 0); P.px(ctx, 88, 49, 0);     // 12 and 6 marks
  P.px(ctx, 83, 44, 0); P.px(ctx, 93, 44, 0);     // 9 and 3 marks
  P.line(ctx, 88, 44, 88, 40, 0, 1);              // hour hand
  P.line(ctx, 88, 44, 91, 44, 0, 1);              // minute hand
  P.rect(ctx, 85, 53, 6, 4, 6);                   // clock base
  const pend = Math.round(Math.sin(t * 3) * 4);
  P.line(ctx, 88, 56, 88 + pend, 66, 8, 1);
  P.circle(ctx, 88 + pend, 68, 2, 2, 14);

  /* ---------- shelf with books and a doily ---------- */
  P.rect(ctx, 178, 70, 44, 4, 6);
  P.line(ctx, 178, 74, 221, 74, 8, 1);
  P.px(ctx, 182, 74, 8); P.px(ctx, 216, 74, 8);   // shelf brackets
  P.rect(ctx, 182, 60, 4, 10, 4);                 // books
  P.rect(ctx, 187, 58, 4, 12, 1);
  P.rect(ctx, 192, 62, 4, 8, 2);
  P.rect(ctx, 197, 59, 3, 11, 5);
  P.rect(ctx, 205, 64, 12, 6, 15);                // crocheted doily
  P.px(ctx, 206, 63, 15); P.px(ctx, 215, 63, 15);

  /* ---------- Grandma's framed photo — hotspot [228,58,32,34] ---------- */
  P.px(ctx, 244, 54, 8);                          // nail
  P.line(ctx, 244, 54, 232, 60, 8, 1);            // hanging strings
  P.line(ctx, 244, 54, 256, 60, 8, 1);
  P.rect(ctx, 228, 58, 32, 34, 6);                // wooden frame
  P.rect(ctx, 230, 60, 28, 30, 14);               // gold inner edge
  P.rect(ctx, 232, 62, 24, 26, 7);                // faded photo background
  P.circle(ctx, 244, 76, 7, 8, 13);               // grandma's face
  P.circle(ctx, 244, 66, 7, 4, 15);               // white hair
  P.circle(ctx, 244, 61, 3, 2, 15);               // the bun
  P.circle(ctx, 240, 73, 2.5, 2.5, 8);            // round spectacle rims
  P.circle(ctx, 248, 73, 2.5, 2.5, 8);
  P.circle(ctx, 240, 73, 1.5, 1.5, 13);
  P.circle(ctx, 248, 73, 1.5, 1.5, 13);
  P.px(ctx, 244, 73, 8);                          // spectacle bridge
  P.px(ctx, 240, 73, 0); P.px(ctx, 248, 73, 0);   // eyes
  P.px(ctx, 241, 72, 15); P.px(ctx, 249, 72, 15); // a glint that is too sharp
  P.line(ctx, 241, 80, 247, 80, 4, 1);            // the smile
  P.px(ctx, 240, 79, 4); P.px(ctx, 248, 79, 4);   // ...curled a bit too far

  /* ---------- old TV — hotspot [108,118,36,40] ---------- */
  P.line(ctx, 118, 120, 106, 102, 8, 1);          // rabbit-ear antennas
  P.line(ctx, 126, 120, 138, 100, 8, 1);
  P.px(ctx, 106, 102, 15); P.px(ctx, 138, 100, 15);
  P.rect(ctx, 108, 120, 36, 30, 6);               // wooden body
  P.line(ctx, 108, 120, 143, 120, 14, 1);         // top highlight
  P.rect(ctx, 112, 124, 22, 20, 0);               // screen
  const fr = Math.floor(t * 12);
  for (let i = 0; i < 10; i++) {                  // animated static
    const c1 = ((i + fr) % 4 === 0) ? 15 : 8;
    const c2 = ((i + fr) % 3 === 0) ? 7 : 0;
    P.dither(ctx, 112, 124 + i * 2, 22, 2, c1, c2);
  }
  P.px(ctx, 138, 127, 14); P.px(ctx, 138, 133, 14); // channel knobs
  P.line(ctx, 137, 139, 140, 139, 8, 1);          // speaker slits
  P.line(ctx, 137, 141, 140, 141, 8, 1);
  P.rect(ctx, 110, 150, 4, 8, 8);                 // stand legs
  P.rect(ctx, 138, 150, 4, 8, 8);
  P.dither(ctx, 108, 156, 38, 3, 8, 7);           // floor shadow

  /* ---------- sofa — hotspot [150,128,80,42] ---------- */
  P.dither(ctx, 150, 166, 84, 5, 8, 7);           // floor shadow
  P.rect(ctx, 150, 128, 80, 22, 4);               // backrest
  P.line(ctx, 150, 128, 229, 128, 12, 1);         // top highlight
  P.line(ctx, 176, 132, 176, 146, 8, 1);          // backrest seams
  P.line(ctx, 203, 132, 203, 146, 8, 1);
  P.rect(ctx, 150, 140, 11, 28, 4);               // armrests
  P.rect(ctx, 219, 140, 11, 28, 4);
  P.line(ctx, 150, 140, 160, 140, 12, 1);
  P.line(ctx, 219, 140, 229, 140, 12, 1);
  P.rect(ctx, 161, 148, 58, 13, 12);              // seat cushions
  P.line(ctx, 190, 148, 190, 160, 4, 1);          // cushion split
  P.line(ctx, 161, 154, 218, 154, 4, 1);          // sagging crease
  P.rect(ctx, 161, 161, 58, 7, 4);                // skirt
  P.rect(ctx, 196, 130, 12, 7, 15);               // protective doily on the back
  P.px(ctx, 198, 137, 15); P.px(ctx, 205, 137, 15);
  P.rect(ctx, 164, 142, 10, 9, 14);               // throw pillow
  P.px(ctx, 168, 146, 4);
  // Red's slippers, kicked off in front of the sofa
  P.rect(ctx, 168, 178, 6, 3, 13);
  P.rect(ctx, 178, 180, 6, 3, 13);

  /* ---------- rug in front of the sofa ---------- */
  P.rect(ctx, 100, 172, 128, 22, 1);              // blue rug base
  P.rect(ctx, 100, 172, 128, 2, 14);              // yellow border
  P.rect(ctx, 100, 192, 128, 2, 14);
  P.rect(ctx, 100, 174, 2, 18, 14);
  P.rect(ctx, 226, 174, 2, 18, 14);
  P.dither(ctx, 108, 177, 112, 12, 1, 3);         // woven pattern
  P.rect(ctx, 152, 180, 24, 6, 9);                // center medallion
  P.px(ctx, 150, 182, 14); P.px(ctx, 177, 182, 14);
  P.px(ctx, 102, 193, 14); P.px(ctx, 225, 173, 14); // frayed corner threads

  /* ---------- exit door on the right — hotspot [284,86,30,78] ---------- */
  P.rect(ctx, 282, 84, 36, 82, 7);                // door frame
  P.line(ctx, 282, 84, 282, 165, 8, 1);
  P.rect(ctx, 286, 88, 28, 76, 6);                // door leaf
  P.line(ctx, 286, 88, 313, 88, 14, 1);           // light catching the top
  P.rect(ctx, 290, 94, 20, 26, 6);                // upper panel
  P.line(ctx, 290, 94, 309, 94, 8, 1);
  P.line(ctx, 290, 94, 290, 119, 8, 1);
  P.line(ctx, 290, 119, 309, 119, 14, 1);
  P.rect(ctx, 290, 128, 20, 30, 6);               // lower panel
  P.line(ctx, 290, 128, 309, 128, 8, 1);
  P.line(ctx, 290, 128, 290, 157, 8, 1);
  P.line(ctx, 290, 157, 309, 157, 14, 1);
  P.circle(ctx, 290, 124, 2, 2, 14);              // brass knob
  P.px(ctx, 290, 123, 15);
  P.px(ctx, 296, 99, 0); P.px(ctx, 304, 99, 0);   // peephole screws... just kidding, a peephole
  P.circle(ctx, 300, 102, 2, 2, 8);
  P.rect(ctx, 316, 98, 2, 6, 14);                 // mezuzah on the frame
  P.rect(ctx, 280, 166, 36, 6, 2);                // doormat
  P.dither(ctx, 282, 167, 32, 4, 2, 10);

  /* ---------- coat hooks + umbrella stand near the door ---------- */
  P.rect(ctx, 262, 92, 14, 3, 6);                 // hook rail
  P.px(ctx, 265, 95, 8); P.px(ctx, 272, 95, 8);
  P.poly(ctx, [[263, 96], [268, 96], [269, 112], [262, 112]], 4); // a spare red hoodie
  P.px(ctx, 265, 97, 12); P.px(ctx, 266, 104, 12);
  P.rect(ctx, 268, 148, 10, 18, 8);               // umbrella stand
  P.line(ctx, 272, 134, 273, 150, 6, 1);          // umbrella handle
  P.poly(ctx, [[266, 136], [280, 136], [273, 130]], 11); // folded canopy
  P.dither(ctx, 266, 164, 14, 3, 8, 7);

  /* ---------- small wall details ---------- */
  P.rect(ctx, 154, 100, 6, 5, 7);                 // power outlet
  P.px(ctx, 155, 102, 0); P.px(ctx, 158, 102, 0);
  P.line(ctx, 144, 105, 154, 103, 8, 1);          // TV cable crawling to it
  P.line(ctx, 144, 105, 142, 118, 8, 1);
});
