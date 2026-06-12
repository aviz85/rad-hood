/* art06 — Forest clearing: Zevik's grill stand.
   Warm late-afternoon light pouring into a tidy clearing. A makeshift but
   spotless brick grill, a cloth banner "the good wolf — 100% vegetarian"
   (drawn as shapes, text via "read"), a hand-painted menu board, a small
   feng-shui campfire, stump seats for the customers who never come.
   Horizon at y=116. Hotspots painted exactly at spec rects:
     grill [186,118,62,52] · fire [196,152,22,18] · menu [98,108,26,40]
   The wolf [128,90,48,84] is a sprite — the engine draws him, not us.   */
RH.registerArt('art06', function (ctx, P, t) {
  /* ---------- sky: a warm opening in the canopy ---------- */
  P.bands(ctx, 0, 0, 320, 56, [9, 9, 11, 11, 14]);
  P.dither(ctx, 0, 18, 320, 6, 9, 11);            // blend: light blue -> cyan
  P.dither(ctx, 0, 42, 320, 8, 11, 14);           // blend: cyan -> warm yellow haze
  /* low sun glow leaking through the trees on the right */
  P.circle(ctx, 262, 44, 16, 12, 14);
  P.dither(ctx, 244, 36, 36, 8, 14, 11);
  /* one happy bird doing lazy circles over the only friendly spot in the forest */
  const bx = 90 + Math.cos(t * 0.8) * 36, by = 22 + Math.sin(t * 1.6) * 7;
  const flap = Math.sin(t * 8) > 0 ? 3 : -1;
  P.line(ctx, bx - 4, by - flap, bx, by, 0, 1);
  P.line(ctx, bx, by, bx + 4, by - flap, 0, 1);

  /* ---------- the forest ring around the clearing ---------- */
  /* far canopy mass down to the horizon */
  P.dither(ctx, 0, 52, 320, 10, 2, 11);           // treetops against the bright sky
  P.rect(ctx, 0, 62, 320, 54, 2);
  P.dither(ctx, 0, 62, 320, 54, 2, 0);            // murky depth between far trunks
  /* jagged silhouette tops */
  for (let i = 0; i < 15; i++) {
    const tx = i * 22 + 2;
    P.poly(ctx, [[tx, 64], [tx + 10, 46 + (i * 5) % 10], [tx + 20, 64]], 2);
  }
  /* far black trunks peeking through */
  for (let i = 0; i < 10; i++) P.rect(ctx, 14 + i * 31, 84, 3, 32, 0);
  /* warm light spilling into the clearing center where the stand lives */
  P.dither(ctx, 96, 96, 150, 20, 2, 14);

  /* big framing trees on both edges of the clearing */
  /* left tree */
  P.rect(ctx, 8, 56, 16, 70, 6);                  // trunk
  P.rect(ctx, 8, 56, 4, 70, 0);                   // shaded edge
  P.dither(ctx, 19, 60, 5, 60, 6, 14);            // sunlit bark edge
  P.poly(ctx, [[2, 126], [10, 110], [22, 110], [30, 126]], 6); // root flare
  P.circle(ctx, 18, 38, 30, 24, 2);
  P.circle(ctx, 0, 52, 22, 18, 2);
  P.dither(ctx, 0, 18, 56, 14, 2, 10);            // lit leaves on top
  P.dither(ctx, 0, 56, 50, 10, 2, 0);             // deep shade under canopy
  /* right tree */
  P.rect(ctx, 296, 54, 15, 72, 6);
  P.rect(ctx, 307, 54, 4, 72, 0);
  P.dither(ctx, 296, 58, 4, 62, 6, 14);
  P.poly(ctx, [[290, 126], [298, 110], [309, 110], [317, 126]], 6);
  P.circle(ctx, 302, 36, 28, 24, 2);
  P.circle(ctx, 318, 54, 20, 18, 2);
  P.dither(ctx, 272, 16, 48, 14, 2, 10);
  P.px(ctx, 14, 30, 10); P.px(ctx, 30, 44, 10); P.px(ctx, 300, 28, 10); P.px(ctx, 314, 46, 0);

  /* ---------- ground: well-kept clearing grass ---------- */
  P.rect(ctx, 0, 116, 320, 84, 2);
  P.dither(ctx, 0, 116, 320, 8, 2, 10);           // bright sunlit rim at the horizon
  P.dither(ctx, 0, 188, 320, 12, 2, 0);           // shade at the bottom edge
  P.dither(ctx, 0, 124, 36, 70, 2, 0);            // canopy shadow, left tree
  P.dither(ctx, 288, 124, 32, 70, 2, 0);          // canopy shadow, right tree
  /* swept dirt apron around the stand — Zevik rakes it daily */
  P.poly(ctx, [[170, 132], [264, 132], [282, 196], [158, 196]], 6);
  P.dither(ctx, 172, 132, 92, 6, 6, 2);           // grassy upper edge
  P.dither(ctx, 162, 188, 116, 8, 6, 0);          // shadowed lower edge
  /* rake lines — perfectly parallel, obviously */
  for (let i = 0; i < 4; i++) P.line(ctx, 172 + i * 6, 140, 164 + i * 8, 192, 0, 1);
  /* a tidy stone-lined footpath approaching from the left exit */
  P.poly(ctx, [[0, 158], [170, 150], [170, 166], [0, 176]], 6);
  P.dither(ctx, 0, 158, 168, 5, 6, 2);
  P.dither(ctx, 0, 170, 168, 6, 6, 0);
  for (let i = 0; i < 7; i++) { P.px(ctx, 10 + i * 24, 156, 7); P.px(ctx, 20 + i * 24, 178, 7); }
  /* grass tufts + tiny flowers */
  const tuft = [[48, 184], [86, 192], [120, 186], [254, 124], [60, 130], [104, 144], [288, 184]];
  for (const [gx, gy] of tuft) {
    P.line(ctx, gx, gy, gx - 2, gy - 5, 10, 1);
    P.line(ctx, gx, gy, gx, gy - 6, 10, 1);
    P.line(ctx, gx, gy, gx + 2, gy - 4, 2, 1);
  }
  P.px(ctx, 70, 126, 14); P.px(ctx, 94, 136, 12); P.px(ctx, 270, 128, 14);
  P.px(ctx, 40, 148, 12); P.px(ctx, 116, 192, 14); P.px(ctx, 300, 178, 13);

  /* stump seats for the customers (population: zero) */
  for (const [sx, sy] of [[44, 168], [74, 178], [292, 168]]) {
    P.circle(ctx, sx, sy + 9, 9, 3, 0);           // ground shadow
    P.rect(ctx, sx - 8, sy, 16, 9, 6);            // stump body
    P.rect(ctx, sx - 8, sy, 3, 9, 0);
    P.circle(ctx, sx, sy, 8, 3, 7);               // sawn top
    P.circle(ctx, sx, sy, 4, 2, 6);               // rings
    P.px(ctx, sx, sy, 0);
  }

  /* ---------- the banner: "the good wolf — 100% vegetarian" ---------- */
  /* two poles flanking the grill, cloth strung between them */
  P.rect(ctx, 180, 84, 3, 48, 6); P.rect(ctx, 180, 84, 1, 48, 14);
  P.rect(ctx, 252, 84, 3, 48, 6); P.rect(ctx, 252, 84, 1, 48, 14);
  const sway = Math.sin(t * 1.4) * 1.5;
  P.poly(ctx, [[183, 88], [252, 88], [252, 104], [218, 106 + sway], [183, 104]], 15);
  P.line(ctx, 183, 88, 252, 88, 7, 1);            // top hem
  P.line(ctx, 183, 104, 218, 106 + sway, 7, 1);   // sagging bottom hem
  P.line(ctx, 218, 106 + sway, 252, 104, 7, 1);
  /* red "lettering" squiggles (real text comes via the read command) */
  P.rect(ctx, 188, 92, 8, 3, 4); P.rect(ctx, 199, 92, 6, 3, 4); P.rect(ctx, 208, 92, 10, 3, 4);
  P.rect(ctx, 222, 92, 7, 3, 4); P.rect(ctx, 233, 92, 12, 3, 4);
  P.rect(ctx, 192, 98, 10, 2, 4); P.rect(ctx, 206, 98, 8, 2, 4); P.rect(ctx, 218, 98, 12, 2, 4);
  /* green veggie seal: a little leaf badge on the corner */
  P.circle(ctx, 246, 96, 4, 4, 2);
  P.px(ctx, 245, 95, 10); P.px(ctx, 246, 96, 10); P.px(ctx, 247, 94, 10);

  /* ---------- the grill stand (hotspot [186,118,62,52]) ---------- */
  P.circle(ctx, 218, 172, 38, 6, 0);              // soft ground shadow under the stand
  /* brick body — spotless, restaurant-grade masonry */
  P.rect(ctx, 188, 132, 58, 38, 4);
  P.dither(ctx, 188, 132, 58, 38, 4, 12);         // warm brick texture
  for (let r = 0; r < 5; r++) {
    P.line(ctx, 188, 138 + r * 7, 245, 138 + r * 7, 0, 1);          // mortar rows
    for (let c2 = 0; c2 < 5; c2++) P.px(ctx, 192 + c2 * 11 + (r % 2) * 5, 135 + r * 7, 0);
  }
  P.rect(ctx, 188, 132, 2, 38, 0);                // shaded left edge
  /* counter slab */
  P.rect(ctx, 186, 128, 62, 5, 8);
  P.rect(ctx, 186, 128, 62, 1, 7);                // polished top edge
  /* the grate: black bars over the heat, gleaming */
  P.rect(ctx, 190, 122, 40, 6, 0);
  for (let i = 0; i < 7; i++) P.rect(ctx, 192 + i * 6, 122, 2, 6, 8);
  P.rect(ctx, 190, 122, 40, 1, 7);
  /* portobello skewers resting on the grate with military precision
     (kept inside the grill hotspot rect, y >= 118) */
  for (let i = 0; i < 3; i++) {
    const mx = 196 + i * 12;
    P.rect(ctx, mx, 118, 1, 7, 7);                // skewer stick
    P.circle(ctx, mx, 121, 4, 3, 6);              // brown cap
    P.px(ctx, mx - 2, 120, 14); P.px(ctx, mx + 1, 122, 14);  // the famous light dots
  }
  /* condiment corner: two sauce bottles + the eternally empty tip jar */
  P.rect(ctx, 234, 120, 4, 8, 4); P.px(ctx, 235, 119, 15);   // ketchup-red bottle
  P.rect(ctx, 240, 121, 4, 7, 10); P.px(ctx, 241, 120, 15);  // green herb sauce
  P.rect(ctx, 226, 121, 5, 7, 11); P.rect(ctx, 227, 123, 3, 4, 3);  // glass tip jar (empty)
  /* grill smoke drifting up — thin, well-behaved smoke */
  for (let i = 0; i < 5; i++) {
    const sy2 = 112 - ((t * 14 + i * 13) % 56);
    const sx2 = 208 + Math.sin(t * 2 + i * 1.7) * (3 + i);
    P.px(ctx, sx2, sy2, 7); P.px(ctx, sx2 + 2, sy2 - 2, 8);
  }

  /* ---------- the campfire (hotspot [196,152,22,18], animated) ---------- */
  /* firebox arch opening in the brick body (kept inside the fire rect, y >= 152) */
  P.rect(ctx, 196, 155, 22, 15, 0);
  P.circle(ctx, 207, 155, 11, 3, 0);              // arched top of the opening
  /* logs arranged at exactly equal angles. Feng shui, as promised. */
  P.line(ctx, 199, 168, 215, 162, 6, 2);
  P.line(ctx, 199, 162, 215, 168, 6, 2);
  /* flames — three tongues flickering on their own clocks */
  const f1 = 4 + Math.sin(t * 9) * 2, f2 = 6 + Math.sin(t * 11 + 2) * 2.5, f3 = 4 + Math.sin(t * 8 + 4) * 2;
  P.poly(ctx, [[200, 166], [203, 166 - f1], [206, 166]], 4);
  P.poly(ctx, [[204, 167], [208, 165 - f2], [212, 167]], 12);
  P.poly(ctx, [[209, 166], [212, 166 - f3], [215, 166]], 4);
  P.poly(ctx, [[206, 166], [208, 163 - f2 * 0.6], [210, 166]], 14);   // hot yellow core
  /* embers winking under the logs */
  if (Math.sin(t * 6) > 0) P.px(ctx, 203, 167, 12);
  if (Math.sin(t * 7 + 1) > 0) P.px(ctx, 210, 168, 14);
  P.px(ctx, 206, 168, 12);
  /* warm flickering glow on the dirt in front of the firebox */
  const glow = Math.sin(t * 9) > -0.4;
  if (glow) { P.dither(ctx, 192, 171, 30, 4, 6, 14); P.circle(ctx, 207, 176, 14, 3, 6); P.dither(ctx, 196, 174, 22, 4, 6, 12); }
  /* a rising spark now and then */
  const spk = (t * 30) % 24;
  if (spk < 16) P.px(ctx, 206 + Math.sin(t * 5) * 3, 158 - spk, 14);

  /* ---------- the menu board (hotspot [98,108,26,40]) ---------- */
  P.rect(ctx, 109, 130, 4, 18, 6);                // post down to the grass
  P.rect(ctx, 109, 130, 1, 18, 0);
  P.circle(ctx, 111, 149, 7, 2, 0);               // post shadow
  P.rect(ctx, 98, 108, 26, 26, 6);                // wooden board
  P.rect(ctx, 99, 109, 24, 24, 15);               // chalk-white face
  P.rect(ctx, 98, 108, 26, 1, 14); P.rect(ctx, 98, 133, 26, 1, 0);   // frame edges
  /* hand-painted mushroom doodle as the header */
  P.circle(ctx, 110, 114, 5, 3, 6);
  P.rect(ctx, 109, 116, 3, 4, 7);
  P.px(ctx, 108, 113, 14); P.px(ctx, 112, 114, 14);
  /* menu "lines": three dishes, all of them mushrooms */
  P.rect(ctx, 102, 122, 12, 2, 0); P.rect(ctx, 117, 122, 4, 2, 4);   // dish + price
  P.rect(ctx, 102, 126, 14, 2, 0); P.rect(ctx, 118, 126, 3, 2, 4);
  P.rect(ctx, 102, 130, 10, 2, 0); P.rect(ctx, 116, 130, 5, 2, 4);

  /* ---------- storytelling clutter, all neatly arranged ---------- */
  /* firewood stack: split logs in a perfect pyramid */
  P.rect(ctx, 256, 158, 26, 12, 6);
  P.circle(ctx, 261, 158, 5, 4, 6); P.circle(ctx, 261, 158, 3, 2, 14);
  P.circle(ctx, 270, 158, 5, 4, 6); P.circle(ctx, 270, 158, 3, 2, 14);
  P.circle(ctx, 278, 158, 4, 4, 6); P.circle(ctx, 278, 158, 2, 2, 14);
  P.circle(ctx, 266, 152, 5, 4, 6); P.circle(ctx, 266, 152, 3, 2, 14);
  P.circle(ctx, 274, 152, 4, 4, 6); P.circle(ctx, 274, 152, 2, 2, 14);
  P.dither(ctx, 254, 168, 30, 4, 2, 0);           // stack shadow
  /* an empty produce crate, waiting for portobellos that never arrive */
  P.rect(ctx, 252, 178, 24, 12, 6);
  P.rect(ctx, 253, 179, 22, 10, 0);
  P.line(ctx, 252, 183, 276, 183, 6, 1);
  P.line(ctx, 258, 178, 258, 190, 6, 1); P.line(ctx, 268, 178, 268, 190, 6, 1);
  /* a folded apron hung on the right banner pole — pressed and spotless */
  P.rect(ctx, 248, 112, 8, 10, 15);
  P.rect(ctx, 248, 112, 8, 2, 4);
  P.px(ctx, 251, 116, 4); P.px(ctx, 252, 118, 4);
  /* fireflies waking up at the clearing's shaded edge */
  if (Math.sin(t * 3) > 0.2) P.px(ctx, 24, 140, 14);
  if (Math.sin(t * 3.7 + 2) > 0.3) P.px(ctx, 304, 146, 14);
  if (Math.sin(t * 4.3 + 4) > 0.4) P.px(ctx, 12, 168, 10);
});
