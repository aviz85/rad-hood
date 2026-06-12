/* art11 — Grandma's yard.
   A storybook cottage that tries WAY too hard to be adorable: pink shutters,
   heart doormat, a smiling sun... and then the details curdle — a boarded-up
   window, a barred cellar window with something blinking inside, an "herb"
   bed of suspicious purple blooms, jam-colored chimney smoke, and a shadow
   that sometimes watches from behind the lace curtain.
   Horizon at y=114. Hotspots painted exactly at spec rects:
     door [148,96,38,74] · herbs [222,150,62,26] ·
     cellar_window [40,162,28,18] · welcome [192,104,26,22]
   The gnome [58,148,22,28] is a sprite — the engine draws him; we only lay
   the flagstone he creepily stands on.                                    */
RH.registerArt('art11', function (ctx, P, t) {
  /* tiny local heart stamp — the yard runs on these */
  function heart(x, y, c) {
    P.circle(ctx, x - 2, y, 2, 2, c);
    P.circle(ctx, x + 2, y, 2, 2, c);
    P.poly(ctx, [[x - 4, y + 1], [x + 4, y + 1], [x, y + 5]], c);
  }

  /* ---------- sky: aggressively pleasant ---------- */
  P.bands(ctx, 0, 0, 320, 64, [9, 9, 11, 11, 13]);
  P.dither(ctx, 0, 22, 320, 8, 9, 11);             // blue -> cyan blend
  P.dither(ctx, 0, 48, 320, 10, 11, 13);           // cyan -> sickly-sweet pink haze
  P.rect(ctx, 0, 58, 320, 30, 13);                 // pink haze down to the treetops
  /* a sun with a face. Nobody asked the sun to smile. It smiles anyway. */
  P.circle(ctx, 290, 22, 12, 12, 14);
  P.circle(ctx, 290, 22, 9, 9, 15);
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4 + t * 0.2;
    P.line(ctx, 290 + Math.cos(a) * 14, 22 + Math.sin(a) * 14,
                290 + Math.cos(a) * 18, 22 + Math.sin(a) * 18, 14, 1);
  }
  P.px(ctx, 287, 20, 0); P.px(ctx, 293, 20, 0);    // eyes
  P.line(ctx, 287, 25, 290, 26, 0, 1); P.line(ctx, 290, 26, 293, 25, 0, 1); // smile
  /* marshmallow clouds drifting very slowly */
  const cd = (t * 3) % 80;
  P.circle(ctx, 50 + cd, 18, 14, 6, 15); P.circle(ctx, 62 + cd, 14, 10, 6, 15);
  P.circle(ctx, 180 - cd * 0.5, 34, 12, 5, 15); P.circle(ctx, 192 - cd * 0.5, 31, 8, 4, 15);

  /* ---------- distant forest ring behind the cottage ---------- */
  P.rect(ctx, 0, 86, 320, 28, 2);
  P.dither(ctx, 0, 86, 320, 8, 2, 11);             // treetop rim against the sky
  P.dither(ctx, 0, 104, 320, 10, 2, 0);            // murky base — the forest disapproves
  for (let i = 0; i < 16; i++) {
    P.poly(ctx, [[i * 21, 88], [i * 21 + 10, 72 + (i * 7) % 12], [i * 21 + 20, 88]], 2);
  }

  /* ---------- ground: lawn mowed to within an inch of its life ---------- */
  P.rect(ctx, 0, 114, 320, 86, 2);
  P.dither(ctx, 0, 114, 320, 6, 2, 10);            // bright rim at the horizon
  P.dither(ctx, 0, 190, 320, 10, 2, 0);            // shade at the bottom edge
  P.dither(ctx, 0, 120, 26, 60, 2, 0);             // forest shadow creeping in, left

  /* white picket fence on the right, in front of the woods */
  P.rect(ctx, 262, 132, 58, 2, 15);
  P.rect(ctx, 262, 142, 58, 2, 15);
  for (let i = 0; i < 7; i++) {
    const fx = 264 + i * 9;
    P.rect(ctx, fx, 124, 3, 26, 15);
    P.poly(ctx, [[fx, 124], [fx + 1, 121], [fx + 3, 124]], 15);
    P.px(ctx, fx + 1, 128, 7);                      // nail
  }
  P.dither(ctx, 262, 150, 58, 4, 2, 0);            // fence shadow

  /* ---------- the cottage ---------- */
  /* roof: red, steep, suspiciously perfect */
  P.poly(ctx, [[14, 78], [143, 30], [272, 78]], 4);
  P.poly(ctx, [[26, 74], [143, 32], [143, 74]], 12);  // sunlit left slope sheen
  P.dither(ctx, 30, 56, 100, 18, 4, 12);
  P.line(ctx, 14, 78, 143, 30, 0, 1);
  P.line(ctx, 143, 30, 272, 78, 0, 1);
  for (let i = 1; i < 5; i++)                       // shingle rows
    P.line(ctx, 36 + i * 6, 78 - i * 9, 250 - i * 6, 78 - i * 9, 0, 1);
  P.rect(ctx, 12, 78, 262, 4, 8);                   // eave board
  P.rect(ctx, 12, 78, 262, 1, 15);
  /* chimney + jam-colored smoke. Jam smells like that? Apparently. */
  P.rect(ctx, 198, 40, 14, 28, 4);
  P.dither(ctx, 198, 40, 14, 28, 4, 6);
  P.rect(ctx, 196, 38, 18, 4, 8);
  P.rect(ctx, 196, 38, 18, 1, 7);
  for (let i = 0; i < 5; i++) {
    const sy = 34 - ((t * 10 + i * 11) % 34);
    const sx = 205 + Math.sin(t * 1.6 + i * 1.9) * (2 + i);
    P.px(ctx, sx, sy, i % 2 ? 13 : 7);
    P.px(ctx, sx + 2, sy - 1, 5);
  }
  /* attic round window — dark. Round windows are for watching. */
  P.circle(ctx, 143, 56, 8, 8, 6);
  P.circle(ctx, 143, 56, 6, 6, 0);
  P.line(ctx, 137, 56, 149, 56, 6, 1);
  P.line(ctx, 143, 50, 143, 62, 6, 1);

  /* front wall: cheerful painted clapboard */
  P.rect(ctx, 30, 82, 226, 76, 7);
  P.dither(ctx, 30, 82, 8, 76, 7, 8);               // shaded left edge
  P.dither(ctx, 246, 82, 10, 76, 7, 15);            // sunlit right edge
  for (let i = 1; i < 9; i++) P.line(ctx, 30, 82 + i * 8, 256, 82 + i * 8, 8, 1); // siding
  /* stone foundation strip down to the lawn */
  P.rect(ctx, 30, 158, 226, 18, 8);
  P.dither(ctx, 30, 158, 226, 18, 8, 7);
  for (let i = 0; i < 14; i++) {
    P.rect(ctx, 33 + i * 16, 161, 12, 5, 7);
    P.rect(ctx, 41 + i * 16, 169, 12, 5, 7);
  }
  P.rect(ctx, 30, 158, 226, 1, 15);                 // foundation cap
  P.dither(ctx, 30, 176, 226, 5, 2, 0);             // wall shadow on the grass

  /* ---------- cellar window (hotspot [40,162,28,18]) ---------- */
  P.rect(ctx, 38, 160, 32, 21, 8);                  // stone surround
  P.rect(ctx, 40, 162, 28, 18, 0);                  // pitch-black opening
  /* something lives down there. It blinks. It meows. */
  if (Math.sin(t * 1.1) > -0.55) {
    P.px(ctx, 50, 171, 14); P.px(ctx, 56, 171, 14); // two yellow eyes
    P.px(ctx, 50, 172, 10); P.px(ctx, 56, 172, 10);
  }
  for (let i = 0; i < 4; i++) P.rect(ctx, 43 + i * 7, 162, 2, 18, 7);  // bars
  P.rect(ctx, 40, 170, 28, 1, 7);                   // cross bar
  P.dither(ctx, 38, 181, 32, 3, 2, 0);              // damp shadow below

  /* ---------- left window: lace, shutters, and the Watcher ---------- */
  P.rect(ctx, 74, 96, 44, 44, 6);                   // frame
  P.rect(ctx, 77, 99, 38, 38, 1);                   // dim interior glass
  /* a silhouette appears behind the curtain... sometimes. Don't look. */
  if (Math.sin(t * 0.4) > 0.55) {
    P.circle(ctx, 96, 110, 6, 7, 0);                // a head-shaped shadow
    P.rect(ctx, 89, 116, 14, 21, 0);                // shoulders
  }
  P.poly(ctx, [[77, 99], [92, 99], [77, 130]], 15); // lace curtain, left
  P.poly(ctx, [[115, 99], [100, 99], [115, 130]], 15); // lace curtain, right
  P.line(ctx, 96, 99, 96, 137, 6, 1);               // mullion
  P.line(ctx, 77, 118, 115, 118, 6, 1);
  /* pink shutters with heart cutouts — of course there are heart cutouts */
  P.rect(ctx, 66, 96, 8, 44, 13); P.rect(ctx, 66, 96, 8, 1, 15);
  P.rect(ctx, 118, 96, 8, 44, 13); P.rect(ctx, 118, 96, 8, 1, 15);
  heart(70, 112, 4); heart(122, 112, 4);
  /* windowsill stacked with jam jars. For decoration. Sure. */
  P.rect(ctx, 64, 140, 64, 4, 15);
  for (let i = 0; i < 4; i++) {
    P.rect(ctx, 72 + i * 13, 132, 8, 8, 5);
    P.rect(ctx, 73 + i * 13, 131, 6, 2, 6);
    P.px(ctx, 74 + i * 13, 134, 13);
  }

  /* ---------- right window: boarded shut. Cute houses do that, right? --- */
  P.rect(ctx, 224, 98, 26, 34, 6);
  P.rect(ctx, 227, 101, 20, 28, 0);
  P.line(ctx, 225, 104, 249, 124, 6, 3);            // plank one
  P.line(ctx, 225, 124, 249, 104, 6, 3);            // plank two
  P.px(ctx, 228, 106, 8); P.px(ctx, 246, 122, 8);   // nail heads
  P.px(ctx, 228, 122, 8); P.px(ctx, 246, 106, 8);

  /* ---------- front door (hotspot [148,96,38,74]) ---------- */
  P.rect(ctx, 144, 92, 46, 80, 15);                 // white trim
  P.rect(ctx, 148, 96, 38, 74, 6);                  // warm wooden door
  P.dither(ctx, 148, 96, 4, 74, 6, 0);              // hinge-side shading
  P.line(ctx, 154, 96, 154, 170, 0, 1);             // plank seams
  P.line(ctx, 167, 96, 167, 170, 0, 1);
  P.line(ctx, 180, 96, 180, 170, 0, 1);
  P.rect(ctx, 152, 102, 30, 26, 6);                 // upper panel
  P.line(ctx, 152, 102, 182, 102, 14, 1);
  P.line(ctx, 152, 128, 182, 128, 0, 1);
  /* heart-shaped peephole. Adorable. Also: it is a peephole. */
  heart(167, 112, 4);
  P.px(ctx, 167, 112, 0);
  /* brass knocker + handle */
  P.circle(ctx, 167, 136, 4, 4, 14);
  P.circle(ctx, 167, 137, 3, 3, 6);
  P.px(ctx, 178, 142, 14); P.px(ctx, 179, 142, 14);
  /* dried-flower wreath, slightly too dry */
  P.circle(ctx, 167, 100, 7, 4, 6);
  P.px(ctx, 161, 99, 13); P.px(ctx, 165, 97, 12); P.px(ctx, 170, 98, 13);
  P.px(ctx, 173, 100, 12); P.px(ctx, 163, 102, 5);
  /* stone step + heart doormat */
  P.rect(ctx, 142, 170, 50, 7, 8);
  P.rect(ctx, 142, 170, 50, 1, 7);
  P.rect(ctx, 146, 178, 42, 8, 13);
  P.rect(ctx, 147, 179, 40, 6, 12);
  heart(167, 180, 15);

  /* ---------- embroidered welcome sign (hotspot [192,104,26,22]) ------- */
  P.line(ctx, 196, 100, 205, 104, 6, 1);            // hanging strings
  P.line(ctx, 214, 100, 205, 104, 6, 1);
  P.px(ctx, 196, 99, 8); P.px(ctx, 214, 99, 8);     // nails
  P.rect(ctx, 192, 104, 26, 22, 6);                 // wooden hoop frame
  P.rect(ctx, 194, 106, 22, 18, 15);                // linen
  /* cross-stitch "lettering" — actual text arrives via the read command */
  P.rect(ctx, 197, 109, 6, 2, 4); P.rect(ctx, 205, 109, 8, 2, 4);
  P.rect(ctx, 197, 113, 10, 2, 4); P.rect(ctx, 209, 113, 5, 2, 4);
  heart(205, 119, 12);
  P.px(ctx, 196, 107, 13); P.px(ctx, 214, 107, 13); // stitched corners
  P.px(ctx, 196, 122, 13); P.px(ctx, 214, 122, 13);

  /* ---------- the "herb" bed (hotspot [222,150,62,26]) ----------------- */
  P.rect(ctx, 222, 150, 62, 26, 6);                 // wooden planter box
  P.rect(ctx, 222, 150, 62, 2, 14);                 // sunlit top edge
  P.rect(ctx, 222, 174, 62, 2, 0);
  P.line(ctx, 242, 150, 242, 176, 0, 1);            // box joints
  P.line(ctx, 263, 150, 263, 176, 0, 1);
  P.rect(ctx, 225, 153, 56, 20, 0);                 // rich dark soil
  P.dither(ctx, 225, 153, 56, 20, 0, 6);
  /* the "herbs": swaying stems with blooms in colors herbs do not come in */
  for (let i = 0; i < 6; i++) {
    const hx = 230 + i * 9, sway2 = Math.sin(t * 2 + i * 1.3) * 1.5;
    P.line(ctx, hx, 168, hx + sway2, 152, 2, 1);
    P.px(ctx, hx - 1 + sway2, 156, 10);
    P.circle(ctx, hx + sway2, 150, 2, 2, i % 2 ? 5 : 12);  // magenta/red blooms
    P.px(ctx, hx + sway2, 149, 13);
  }
  /* a tiny hand-written plant label. Best not to read it too closely. */
  P.rect(ctx, 273, 158, 8, 6, 15);
  P.rect(ctx, 276, 164, 2, 8, 6);
  P.rect(ctx, 274, 160, 6, 1, 0);
  P.dither(ctx, 222, 176, 62, 4, 2, 0);             // planter shadow

  /* ---------- gnome's flagstone (sprite drawn by engine at [69,176]) --- */
  P.circle(ctx, 69, 180, 16, 5, 0);                 // soft shadow ring
  P.circle(ctx, 69, 178, 14, 5, 7);                 // the stone he never leaves
  P.dither(ctx, 57, 176, 24, 5, 7, 8);
  /* worshipful little flowers planted in a circle around him */
  for (let i = 0; i < 5; i++) {
    const a2 = i * 1.26 + 0.3;
    const fx2 = 69 + Math.cos(a2) * 19, fy2 = 180 + Math.sin(a2) * 7;
    P.px(ctx, fx2, fy2 - 2, 14); P.px(ctx, fx2, fy2 - 1, 12); P.px(ctx, fx2, fy2, 2);
  }

  /* ---------- garden path from the left exit to the door --------------- */
  P.poly(ctx, [[0, 186], [60, 182], [140, 180], [142, 188], [62, 192], [0, 196]], 6);
  P.poly(ctx, [[140, 180], [164, 177], [170, 177], [170, 186], [142, 188]], 6);
  P.dither(ctx, 0, 182, 142, 4, 6, 2);
  P.dither(ctx, 0, 192, 142, 4, 6, 0);
  for (let i = 0; i < 8; i++) {                     // stepping stones
    P.circle(ctx, 12 + i * 19, 186 + (i % 2) * 3, 5, 2, 7);
    P.px(ctx, 12 + i * 19, 186 + (i % 2) * 3, 8);
  }

  /* ---------- final sweet/sour touches ---------- */
  /* topiary bush trimmed into a heart, right of the door */
  P.circle(ctx, 207, 160, 8, 8, 2);
  P.circle(ctx, 200, 154, 6, 6, 2); P.circle(ctx, 214, 154, 6, 6, 2);
  P.dither(ctx, 196, 148, 14, 8, 2, 10);
  P.rect(ctx, 205, 168, 4, 6, 6);
  P.dither(ctx, 198, 174, 18, 3, 2, 0);
  /* a butterfly that refuses to land anywhere in this yard. Smart. */
  const bx2 = 160 + Math.sin(t * 0.9) * 60, by2 = 132 + Math.sin(t * 2.3) * 9;
  const wing = Math.sin(t * 12) > 0 ? 2 : 0;
  P.px(ctx, bx2, by2, 0);
  P.px(ctx, bx2 - 1, by2 - wing, 13); P.px(ctx, bx2 + 1, by2 - wing, 13);
  /* scattered daisies on the lawn */
  const daisies = [[20, 130, 15], [118, 188, 14], [204, 186, 15], [300, 160, 13], [288, 188, 15], [40, 192, 14]];
  for (const [dx, dy, dc] of daisies) {
    P.px(ctx, dx, dy, dc); P.px(ctx, dx - 1, dy, dc); P.px(ctx, dx + 1, dy, dc);
    P.px(ctx, dx, dy - 1, dc); P.px(ctx, dx, dy + 1, dc); P.px(ctx, dx, dy, 14);
  }
  /* one lone crow feather on the lawn. The crow from the fence warned her. */
  P.line(ctx, 246, 188, 252, 184, 0, 1);
  P.px(ctx, 252, 184, 8);
});
