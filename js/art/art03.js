/* art03 — The public garden (scene03)
   Hotspot rects (binding, from GAME-SPEC section 7):
     pensioner [62,104,32,62]  -> sprite, engine draws it (bench behind him only)
     bench     [52,142,72,26]
     fountain  [158,118,48,34]
     trash     [248,146,22,30]
     bushes    [288,118,32,44]
   Horizon 120 — walkable grass from y=120 down. */
RH.registerArt('art03', function (ctx, P, t) {
  /* ---------- sky ---------- */
  P.bands(ctx, 0, 0, 320, 70, [1, 1, 9, 9, 11]);
  P.rect(ctx, 0, 70, 320, 32, 11);                // lower sky down to the hedge line
  P.dither(ctx, 0, 66, 320, 6, 11, 9);            // soft haze near rooftops

  /* sun with a dithered halo */
  P.circle(ctx, 272, 22, 13, 13, 14);
  P.circle(ctx, 272, 22, 10, 10, 15);
  P.px(ctx, 272, 22, 14);

  /* drifting clouds (slow, loop across the screen) */
  const cd = (t * 4) % 400 - 40;
  for (const [bx, by, s] of [[40, 18, 1], [150, 34, 0.7], [250, 12, 0.85]]) {
    const cx = ((bx + cd) % 400 + 400) % 400 - 40;
    P.circle(ctx, cx, by, 16 * s, 5 * s, 15);
    P.circle(ctx, cx + 12 * s, by + 2, 11 * s, 4 * s, 15);
    P.circle(ctx, cx - 12 * s, by + 3, 10 * s, 3.5 * s, 7);
  }

  /* a flapping bird crossing the sky */
  const bX = ((t * 26) % 380) - 30, bY = 30 + Math.sin(t * 2) * 3;
  const flap = Math.floor(t * 6) % 2 ? 2 : -1;
  P.line(ctx, bX - 4, bY - flap, bX, bY, 0, 1);
  P.line(ctx, bX, bY, bX + 4, bY - flap, 0, 1);

  /* ---------- distant housing blocks behind the garden ---------- */
  for (const [hx, hw, hh, c] of [[0, 56, 52, 7], [62, 44, 44, 8], [196, 60, 48, 7], [262, 58, 40, 8]]) {
    P.rect(ctx, hx, 96 - hh, hw, hh, c);
    P.rect(ctx, hx, 96 - hh, hw, 3, c === 7 ? 8 : 0);   // roof line
    for (let wy = 96 - hh + 7; wy < 90; wy += 9)        // little windows
      for (let wx = hx + 5; wx < hx + hw - 5; wx += 10)
        P.rect(ctx, wx, wy, 4, 5, (wx + wy) % 3 ? 1 : 14);
  }
  /* TV antennas on the roofs */
  P.line(ctx, 28, 44, 28, 34, 0, 1); P.line(ctx, 24, 36, 32, 36, 0, 1);
  P.line(ctx, 224, 48, 224, 38, 0, 1); P.line(ctx, 220, 40, 228, 40, 0, 1);

  /* ---------- park hedge & trees above the horizon ---------- */
  P.dither(ctx, 0, 92, 320, 10, 2, 0);             // dark tree line
  P.rect(ctx, 0, 102, 320, 18, 2);                 // hedge band
  P.dither(ctx, 0, 102, 320, 5, 10, 2);            // sunlit hedge top
  for (let hx = 6; hx < 320; hx += 22)             // bumpy hedge silhouette
    P.circle(ctx, hx, 103, 9, 5, 2);

  /* two park trees poking over the hedge */
  for (const [tx, sc] of [[120, 1], [228, 0.8]]) {
    P.rect(ctx, tx - 2, 92, 5, 16, 6);
    P.circle(ctx, tx, 84, 18 * sc, 14 * sc, 2);
    P.circle(ctx, tx - 6 * sc, 78, 11 * sc, 9 * sc, 10);
    P.dither(ctx, tx - 4, 74, 12 * sc, 7 * sc, 10, 2);
  }

  /* ---------- ground: grass + walking path ---------- */
  P.rect(ctx, 0, 120, 320, 80, 2);
  P.dither(ctx, 0, 120, 320, 8, 2, 10);            // sunlit strip at the horizon
  P.dither(ctx, 0, 188, 320, 12, 2, 0);            // darker foreground grass
  /* grass tufts */
  for (let i = 0; i < 26; i++) {
    const gx = (i * 53 + 17) % 318, gy = 124 + ((i * 37) % 70);
    P.px(ctx, gx, gy, 10); P.px(ctx, gx + 1, gy - 1, 10); P.px(ctx, gx + 2, gy, 2);
  }
  /* dirt path crossing the garden between the exits */
  P.poly(ctx, [[0, 158], [320, 150], [320, 178], [0, 190]], 6);
  P.dither(ctx, 0, 156, 320, 5, 6, 2);             // soft top edge
  P.dither(ctx, 0, 184, 320, 5, 6, 2);             // soft bottom edge
  P.dither(ctx, 30, 162, 260, 18, 6, 14);          // sandy texture
  /* paved circle around the fountain */
  P.circle(ctx, 182, 156, 44, 13, 7);
  P.circle(ctx, 182, 156, 38, 10, 8);
  P.dither(ctx, 150, 150, 64, 12, 8, 7);

  /* ---------- park lamppost (left of the bench) ---------- */
  P.rect(ctx, 28, 100, 3, 62, 0);
  P.rect(ctx, 26, 160, 7, 4, 0);                   // base
  P.circle(ctx, 29, 96, 5, 6, 8);                  // lamp head (off — daytime)
  P.rect(ctx, 27, 92, 5, 5, 14);
  P.circle(ctx, 29, 170, 10, 3, 0);                // shadow

  /* ---------- the bench [52,142,72,26] ---------- */
  /* shadow */
  P.dither(ctx, 54, 166, 74, 6, 0, 2);
  /* backrest: two horizontal wooden slats */
  P.rect(ctx, 54, 142, 68, 5, 6); P.rect(ctx, 54, 142, 68, 1, 14);
  P.rect(ctx, 54, 149, 68, 4, 6); P.rect(ctx, 54, 149, 68, 1, 14);
  /* seat */
  P.rect(ctx, 52, 154, 72, 5, 6);
  P.rect(ctx, 52, 154, 72, 1, 14);
  P.rect(ctx, 52, 159, 72, 2, 0);                  // seat edge shadow
  /* cast-iron legs + armrest curls */
  P.rect(ctx, 58, 161, 3, 7, 0); P.rect(ctx, 115, 161, 3, 7, 0);
  P.rect(ctx, 56, 167, 7, 2, 0); P.rect(ctx, 113, 167, 7, 2, 0);
  P.line(ctx, 54, 142, 54, 156, 0, 2); P.line(ctx, 120, 142, 120, 156, 0, 2);
  /* the glasses under the bench — a tiny glint so sharp eyes spot them */
  const gl = Math.floor(t * 2) % 2;                // lens twinkle
  P.px(ctx, 84, 164, gl ? 11 : 3); P.px(ctx, 88, 164, gl ? 3 : 11);
  P.px(ctx, 86, 164, 0); P.px(ctx, 85, 163, 0); P.px(ctx, 87, 163, 0);

  /* ---------- the dry fountain [158,118,48,34] ---------- */
  /* top bowl + pedestal */
  P.circle(ctx, 182, 121, 13, 4, 7);
  P.circle(ctx, 182, 120, 13, 3, 8);
  P.circle(ctx, 182, 119, 10, 2, 7);
  P.rect(ctx, 179, 122, 7, 16, 7);
  P.rect(ctx, 179, 122, 2, 16, 15);                // pedestal highlight
  P.rect(ctx, 184, 122, 2, 16, 8);                 // pedestal shade
  /* lower basin */
  P.circle(ctx, 182, 142, 24, 9, 7);
  P.circle(ctx, 182, 141, 24, 8, 8);
  P.circle(ctx, 182, 140, 20, 6, 7);
  P.circle(ctx, 182, 141, 17, 4, 8);
  P.dither(ctx, 168, 139, 28, 5, 6, 8);            // bone-dry dirt inside
  /* cracks in the stone — dry since 1994 */
  P.line(ctx, 168, 146, 176, 150, 0, 1);
  P.line(ctx, 195, 144, 202, 149, 0, 1);
  P.line(ctx, 182, 117, 186, 120, 0, 1);
  /* a stubborn weed growing out of the top bowl, swaying */
  const wv = Math.round(Math.sin(t * 2) * 1.5);
  P.line(ctx, 182, 118, 182 + wv, 111, 2, 1);
  P.px(ctx, 182 + wv, 110, 10); P.px(ctx, 181 + wv, 111, 10);
  /* pigeon perched on the bowl rim, bobbing its head */
  const pk = Math.floor(t * 3) % 2;
  P.circle(ctx, 192, 116, 3, 2, 7);
  P.px(ctx, 195, 114 + pk, 7); P.px(ctx, 196, 114 + pk, 14);
  /* fountain shadow */
  P.circle(ctx, 184, 153, 26, 4, 0);
  P.dither(ctx, 160, 150, 50, 6, 0, 8);

  /* ---------- the trash can [248,146,22,30] ---------- */
  P.dither(ctx, 250, 174, 24, 4, 0, 2);            // shadow
  P.rect(ctx, 250, 152, 18, 24, 8);                // body
  P.rect(ctx, 252, 152, 3, 24, 7);                 // highlight stripe
  P.rect(ctx, 264, 152, 3, 24, 0);                 // shaded side
  P.rect(ctx, 250, 158, 18, 2, 0);                 // ribs
  P.rect(ctx, 250, 166, 18, 2, 0);
  P.rect(ctx, 248, 148, 22, 5, 7);                 // rim
  P.rect(ctx, 248, 148, 22, 1, 15);
  /* the newspaper poking out of the top (kept inside the hotspot rect) */
  P.poly(ctx, [[253, 152], [261, 146], [264, 151], [256, 154]], 15);
  P.line(ctx, 255, 151, 260, 148, 7, 1);
  P.line(ctx, 256, 153, 262, 150, 7, 1);
  /* a fly circling the can */
  const fa = t * 7;
  P.px(ctx, 259 + Math.cos(fa) * 7, 142 + Math.sin(fa * 1.7) * 4, 0);

  /* ---------- the bushes [288,118,32,44] ---------- */
  P.dither(ctx, 288, 158, 32, 5, 0, 2);            // shadow
  P.circle(ctx, 298, 142, 11, 13, 2);
  P.circle(ctx, 312, 136, 10, 14, 2);
  P.circle(ctx, 306, 128, 10, 9, 2);
  P.circle(ctx, 295, 130, 8, 8, 10);               // sunlit lobe
  P.dither(ctx, 290, 124, 22, 10, 10, 2);
  P.dither(ctx, 300, 140, 18, 12, 2, 0);           // inner darkness
  /* little red berries */
  P.px(ctx, 294, 134, 4); P.px(ctx, 304, 126, 4); P.px(ctx, 310, 144, 12);
  P.px(ctx, 298, 148, 4); P.px(ctx, 314, 132, 12);
  /* a butterfly bobbing over the bushes */
  const by2 = 116 + Math.sin(t * 3) * 4, bx2 = 296 + Math.cos(t * 1.3) * 6;
  const fw = Math.floor(t * 8) % 2;
  P.px(ctx, bx2, by2, 14); P.px(ctx, bx2 - 1, by2 - fw, 14); P.px(ctx, bx2 + 1, by2 - fw, 14);

  /* ---------- foreground flowerbed (bottom-left, decorative) ---------- */
  P.dither(ctx, 4, 192, 70, 8, 6, 2);
  for (let i = 0; i < 6; i++) {
    const fx = 10 + i * 11, fy = 193 + (i % 2) * 3;
    P.line(ctx, fx, fy + 4, fx, fy, 2, 1);
    P.px(ctx, fx, fy - 1, i % 2 ? 12 : 14);
    P.px(ctx, fx - 1, fy, i % 2 ? 12 : 14);
    P.px(ctx, fx + 1, fy, i % 2 ? 12 : 14);
  }
  /* a lost bottle cap — neighborhood realism */
  P.px(ctx, 142, 186, 14); P.px(ctx, 143, 186, 6);
});
