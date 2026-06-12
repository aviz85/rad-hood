/* art07 — The mushroom field: a darker clearing uphill from the forest path.
   The canopy is almost sealed; what little light gets through falls on three
   distinct mushroom patches and on an old scarecrow nobody remembers planting.
   Someone dressed it in a knitted shawl. It smells faintly of jam.
   Horizon at y=125 (walkable ground below). Hotspots painted exactly at spec rects:
     redshrooms   [56,148,34,22]
     glowshrooms  [148,140,32,20]
     brownshrooms [238,152,38,20]
     scarecrow    [96,88,30,64]
   Exit is DOWN (back to scene05) — a trail fades out at the bottom edge. */
RH.registerArt('art07', function (ctx, P, t) {
  /* ---------- sky: barely there, choked by the canopy ---------- */
  P.bands(ctx, 0, 0, 320, 26, [1, 1, 9]);
  P.dither(ctx, 0, 18, 320, 8, 1, 9);              // dim blend where sky meets leaves

  /* ---------- canopy ceiling: heavy, almost sealed shut ---------- */
  P.rect(ctx, 0, 22, 320, 30, 2);
  P.dither(ctx, 0, 14, 320, 12, 2, 1);             // leaves eating the last of the sky
  P.dither(ctx, 0, 34, 320, 20, 2, 0);             // murky underside
  for (let i = 0; i < 10; i++) {                   // sagging leaf clumps
    const cx = i * 34 + 10;
    P.circle(ctx, cx, 30 + (i * 13) % 16, 22, 12, 2);
    P.circle(ctx, cx + 8, 40 + (i * 7) % 12, 14, 8, 0);
  }
  P.dither(ctx, 0, 44, 320, 12, 0, 2);             // gloom dripping off the canopy
  /* two stingy sky holes — the forest's entire lighting budget */
  const sway = Math.sin(t * 1.2);
  P.px(ctx, 96 + sway * 2, 16, 11); P.px(ctx, 230 - sway * 2, 12, 9);

  /* ---------- dark forest wall down to the horizon ---------- */
  P.rect(ctx, 0, 54, 320, 71, 0);
  P.dither(ctx, 0, 54, 320, 64, 0, 2);             // barely-readable depths
  /* packed far trunks, black on black */
  for (let i = 0; i < 16; i++) {
    const fx = 6 + i * 20 + (i * 7) % 9;
    P.rect(ctx, fx, 58, 3, 64, 0);
    P.px(ctx, fx + 3, 76 + (i * 11) % 36, 2);      // one moss pixel each, for morale
  }
  /* nearer trunks framing the clearing, left and right */
  const mids = [[8, 12], [42, 8], [276, 10], [304, 12], [196, 7]];
  for (const [mx, mw] of mids) {
    P.rect(ctx, mx, 50, mw, 75, 6);
    P.rect(ctx, mx, 50, 2, 75, 0);                 // shaded flank
    P.dither(ctx, mx + 2, 54, mw - 3, 68, 6, 0);   // bark lost in shadow
    P.px(ctx, mx + mw - 1, 70, 8);                 // the faintest highlight
  }
  P.dither(ctx, 0, 118, 320, 7, 2, 0);             // dark moss rim above the floor

  /* ---------- one anemic light shaft, breathing ---------- */
  const shaft = Math.sin(t * 0.6) * 0.5 + 0.5;
  if (shaft > 0.3) {
    P.dither(ctx, 250, 26, 3, 100, 14, 0);
    P.dither(ctx, 258, 30, 2, 96, 14, 0);
    P.circle(ctx, 258, 130, 14, 4, 2);             // weak light pool, mostly missing the mushrooms
    P.dither(ctx, 246, 126, 28, 7, 2, 10);
  }

  /* ---------- the field floor: dark grass, darker corners ---------- */
  P.rect(ctx, 0, 125, 320, 75, 2);
  P.dither(ctx, 0, 125, 320, 8, 2, 0);             // shade right under the horizon
  P.dither(ctx, 0, 172, 320, 28, 2, 0);            // foreground gloom
  P.dither(ctx, 0, 125, 40, 75, 2, 0);             // deep shadow at the left edge
  P.dither(ctx, 290, 125, 30, 75, 2, 0);           // and the right
  P.dither(ctx, 130, 130, 70, 16, 2, 10);          // a slightly braver patch of grass mid-field

  /* ---------- the trail down (exit, bottom of screen) ---------- */
  P.poly(ctx, [[150, 200], [142, 178], [150, 160], [166, 160], [176, 180], [172, 200]], 6);
  P.dither(ctx, 144, 162, 30, 14, 6, 2);           // grass swallowing the trail upward
  P.dither(ctx, 146, 186, 28, 14, 6, 0);           // dark trodden dirt near the player
  P.rect(ctx, 156, 172, 4, 2, 8); P.rect(ctx, 164, 186, 3, 2, 8); // pebbles
  /* small sneaker prints heading up into the field. Yours, presumably. */
  P.px(ctx, 158, 192, 0); P.px(ctx, 162, 184, 0); P.px(ctx, 157, 176, 0);

  /* ---------- ground fog crawling between the patches ---------- */
  const fogx = Math.sin(t * 0.5) * 8;
  P.dither(ctx, 30 + fogx, 144, 70, 4, 7, 2);
  P.dither(ctx, 196 - fogx, 150, 80, 4, 7, 2);
  P.dither(ctx, 96 + fogx * 0.5, 166, 60, 3, 7, 2);

  /* ---------- RED mushrooms (hotspot [56,148,34,22]) — classic "do not" ---------- */
  P.dither(ctx, 54, 162, 40, 8, 2, 0);             // shadowed ring of dead grass around them
  const reds = [[63, 162, 7, 6], [76, 165, 5, 5], [85, 160, 6, 6], [70, 156, 4, 4]];
  for (const [rx, ry, rw, rh] of reds) {
    P.rect(ctx, rx - 1, ry, 3, rh, 7);             // pale stem
    P.px(ctx, rx - 1, ry + rh - 1, 8);             // stem shading
    P.circle(ctx, rx, ry, rw, Math.ceil(rw * 0.6), 4);   // red cap
    P.circle(ctx, rx - 1, ry - 1, rw - 2, Math.ceil(rw * 0.4), 12); // lit top
    P.px(ctx, rx - 2, ry - 1, 15); P.px(ctx, rx + 2, ry, 15);       // white warning dots
    P.px(ctx, rx, ry + 1, 15);
  }
  P.circle(ctx, 72, 170, 16, 3, 0);                // pooled shadow under the patch
  P.dither(ctx, 58, 168, 30, 4, 0, 2);
  /* a tiny bug skeleton next to them. Foreshadowing with six legs. */
  P.px(ctx, 90, 168, 15); P.px(ctx, 91, 168, 15); P.px(ctx, 92, 167, 15);

  /* ---------- GLOWING mushrooms (hotspot [148,140,32,20]) — radioactive chic ---------- */
  const pulse = Math.sin(t * 2.4) * 0.5 + 0.5;     // slow eerie breathing
  P.circle(ctx, 164, 152, 22, 9, pulse > 0.5 ? 3 : 1);   // glow halo on the grass
  P.dither(ctx, 144, 145, 42, 14, pulse > 0.5 ? 3 : 1, 2);
  const glows = [[155, 152, 6], [166, 155, 5], [174, 149, 5], [161, 146, 4]];
  for (const [gx, gy, gw] of glows) {
    P.rect(ctx, gx - 1, gy, 3, 6, 7);              // stem
    P.circle(ctx, gx, gy, gw, Math.ceil(gw * 0.6), 3);   // cyan cap
    P.circle(ctx, gx - 1, gy - 1, gw - 2, 2, 11);        // bright crown
    if (pulse > 0.5) P.px(ctx, gx, gy - 2, 15);          // hot pixel at peak glow
  }
  /* drifting spores — pretty, and almost certainly a lawsuit */
  if (pulse > 0.4) {
    P.px(ctx, 152 + Math.sin(t * 1.3) * 5, 138 - pulse * 6, 11);
    P.px(ctx, 172 - Math.sin(t * 1.7) * 4, 134 - pulse * 4, 3);
    P.px(ctx, 163, 130 - pulse * 8, 11);
  }

  /* ---------- BROWN dotted mushrooms (hotspot [238,152,38,20]) — the right ones ---------- */
  P.dither(ctx, 236, 164, 44, 8, 2, 10);           // healthy grass — nature approves of these
  const browns = [[246, 165, 8, 5], [258, 168, 6, 4], [268, 163, 7, 5], [252, 159, 5, 3]];
  for (const [bx, by, bw, bh] of browns) {
    P.rect(ctx, bx - 1, by, 3, bh + 2, 7);         // sturdy pale stem
    P.px(ctx, bx + 1, by + bh, 8);
    P.circle(ctx, bx, by, bw, Math.ceil(bw * 0.55), 6);  // brown portobello cap
    P.circle(ctx, bx - 1, by - 1, bw - 2, Math.ceil(bw * 0.3), 14); // warm lit top
    P.px(ctx, bx - 2, by, 14); P.px(ctx, bx + 2, by + 1, 14);       // the famous light dots
    P.px(ctx, bx, by - 1, 15);
    P.px(ctx, bx + bw - 2, by + 1, 0);             // shaded cap rim
  }
  P.circle(ctx, 257, 174, 18, 3, 0);               // soft shadow pool
  P.dither(ctx, 242, 171, 32, 4, 0, 2);
  /* one nibble mark on a cap — somebody furry already vouched for them */
  P.px(ctx, 250, 162, 7); P.px(ctx, 251, 161, 7);

  /* ---------- the SCARECROW (hotspot [96,88,30,64]) — why is there a scarecrow ---------- */
  /* there is no crop here. there has never been a crop here. */
  P.dither(ctx, 96, 150, 34, 5, 0, 2);             // its long wrong shadow
  P.rect(ctx, 109, 110, 3, 42, 6);                 // pole
  P.rect(ctx, 109, 110, 1, 42, 0);                 // pole shading
  P.rect(ctx, 98, 112, 25, 3, 6);                  // crossbar
  P.px(ctx, 110, 112, 0); P.px(ctx, 121, 113, 8);  // old nails
  /* tattered coat — and is that... a knitted shawl? Grandma knits shawls. */
  P.poly(ctx, [[103, 116], [118, 116], [122, 144], [99, 144]], 8);
  P.dither(ctx, 100, 126, 21, 18, 8, 0);           // rot creeping up the hem
  P.poly(ctx, [[101, 144], [104, 150], [108, 144]], 8);  // torn flaps
  P.poly(ctx, [[112, 144], [116, 151], [119, 144]], 8);
  P.rect(ctx, 102, 115, 17, 4, 5);                 // the magenta shawl. Hand-knitted. Recent.
  P.px(ctx, 104, 118, 13); P.px(ctx, 112, 118, 13); P.px(ctx, 117, 118, 13); // knit stitches
  /* straw arms on the crossbar */
  P.rect(ctx, 98, 113, 6, 2, 14); P.rect(ctx, 117, 113, 6, 2, 14);
  P.px(ctx, 97, 115, 14); P.px(ctx, 96, 116, 6);   // straw wisps dropping
  P.px(ctx, 123, 115, 14); P.px(ctx, 124, 117, 6);
  /* sack head */
  P.circle(ctx, 110, 100, 9, 11, 7);
  P.dither(ctx, 103, 104, 14, 7, 7, 8);            // grimy lower face
  P.rect(ctx, 104, 92, 13, 2, 8);                  // stitched seam on the scalp
  P.px(ctx, 106, 91, 8); P.px(ctx, 113, 91, 8);
  /* button eyes. One is missing. The other... follows. */
  P.px(ctx, 106, 98, 0); P.circle(ctx, 114, 98, 2, 2, 0);
  const blink = Math.sin(t * 0.9) > 0.93;          // every so often it catches the light. Sure.
  P.px(ctx, 114 + (Math.sin(t * 0.3) > 0 ? 1 : -1), 98, blink ? 12 : 8);
  /* stitched mouth, smiling a little too wide for sackcloth */
  P.line(ctx, 104, 105, 116, 105, 0, 1);
  P.px(ctx, 104, 104, 0); P.px(ctx, 116, 104, 0);
  P.px(ctx, 107, 106, 0); P.px(ctx, 113, 106, 0);  // cross-stitches
  /* a straw hat that has given up */
  P.poly(ctx, [[100, 92], [121, 92], [118, 86], [103, 86]], 6);
  P.rect(ctx, 97, 92, 27, 2, 6);                   // brim
  P.rect(ctx, 97, 92, 27, 1, 14);                  // lit brim edge
  P.px(ctx, 119, 89, 0);                           // hole in the hat
  /* a jar at its feet. Empty. Label long gone. Smells like jam. */
  P.rect(ctx, 124, 146, 6, 7, 7);
  P.rect(ctx, 125, 145, 4, 1, 8);
  P.px(ctx, 125, 148, 15);                          // glass glint
  /* a torn rag knotted to the crossbar, twitching in wind that isn't there */
  const rag = Math.sin(t * 3.1) > 0.85 ? 1 : 0;
  P.px(ctx, 100, 108, 5); P.px(ctx, 101, 108, 5);  // knot (same yarn as the shawl)
  P.line(ctx, 100, 109, 99 - rag, 113, 5, 1);      // dangling strip
  P.px(ctx, 99 - rag, 114, 13);                    // frayed pale tip

  /* ---------- decorative flora: tufts, ferns, grass specks ---------- */
  const tufts = [[34, 158], [122, 168], [200, 162], [288, 168], [60, 184], [222, 186]];
  for (const [gx, gy] of tufts) {
    P.line(ctx, gx, gy, gx - 2, gy - 5, 2, 1);
    P.line(ctx, gx, gy, gx + 2, gy - 4, 10, 1);
  }
  const fern = [[20, 196], [94, 192], [212, 196], [300, 192]];
  for (const [px2, py2] of fern) {
    P.line(ctx, px2, py2, px2 - 5, py2 - 8, 2, 1);
    P.line(ctx, px2, py2, px2, py2 - 10, 2, 1);
    P.line(ctx, px2, py2, px2 + 5, py2 - 7, 2, 1);
    P.px(ctx, px2 - 3, py2 - 6, 10);
  }
  /* tiny decorative toadstools far from the hotspots — set dressing only */
  P.px(ctx, 28, 140, 7); P.rect(ctx, 27, 138, 3, 2, 7);
  P.px(ctx, 306, 156, 7); P.rect(ctx, 305, 154, 3, 2, 7);

  /* ---------- life, technically ---------- */
  /* fireflies in the treeline gloom */
  if (Math.sin(t * 2.0) > 0.3) P.px(ctx, 60 + Math.sin(t) * 5, 96, 14);
  if (Math.sin(t * 1.6 + 2) > 0.5) P.px(ctx, 230, 88 + Math.cos(t * 1.4) * 4, 14);
  if (Math.sin(t * 2.7 + 4) > 0.6) P.px(ctx, 150, 78, 10);
  /* a bat doing slow laps under the canopy. It lives here. You don't. */
  const batx = 160 + Math.sin(t * 0.8) * 90, baty = 58 + Math.cos(t * 1.9) * 6;
  const flap = Math.sin(t * 10) > 0 ? 1 : 0;
  P.px(ctx, batx, baty, 0);
  P.rect(ctx, batx - 2, baty - flap, 2, 1, 0);
  P.rect(ctx, batx + 1, baty - flap, 2, 1, 0);
});
