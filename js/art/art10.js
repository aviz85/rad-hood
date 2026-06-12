/* art10 — The path to Grandma's.
   A countryside lane that is aggressively adorable: candy-pastel sky, rolling
   hills with suspiciously identical trees, a white picket fence, flowers
   planted in perfect military rows — and on top of all that sugar, two
   unsettling jam billboards and a heart-shaped mailbox stuffed with
   complaint letters nobody ever opened.
   Horizon at y=116. Hotspots painted exactly at spec rects:
     signs [80,90,60,60] · mailbox_heart [270,134,24,38]
   The crow [222,118,18,16] is a sprite (engine draws it, baseline 231,134) —
   we only build the fat fence post it perches on.                          */
RH.registerArt('art10', function (ctx, P, t) {
  /* ---------- sky: candy-shop pastel, almost insultingly cheerful ---------- */
  P.bands(ctx, 0, 0, 320, 64, [11, 11, 13, 13]);
  P.dither(ctx, 0, 26, 320, 8, 11, 13);            // cyan -> pink blend
  P.rect(ctx, 0, 64, 320, 52, 13);                 // lower pink sky down to the horizon
  /* an over-eager sun with tidy little rays */
  P.circle(ctx, 48, 24, 13, 13, 14);
  P.circle(ctx, 48, 24, 9, 9, 15);
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4 + t * 0.15;          // rays rotate, slowly, watching
    P.line(ctx, 48 + Math.cos(a) * 16, 24 + Math.sin(a) * 16,
                48 + Math.cos(a) * 21, 24 + Math.sin(a) * 21, 14, 1);
  }
  /* puffy clouds drifting on rails — even the weather is staged */
  const cd = (t * 4) % 360 - 20;
  for (const [cx, cy, s] of [[cd + 70, 16, 1], [cd + 190, 30, 0.8], [cd + 300, 12, 0.7]]) {
    P.circle(ctx, cx, cy, 14 * s, 6 * s, 15);
    P.circle(ctx, cx - 10 * s, cy + 2, 9 * s, 5 * s, 15);
    P.circle(ctx, cx + 11 * s, cy + 2, 9 * s, 5 * s, 15);
    P.dither(ctx, cx - 12 * s, cy + 3, 24 * s, 3, 15, 13);   // pink-lit bellies
  }

  /* ---------- rolling hills, soft as a trap ---------- */
  P.circle(ctx, 60, 132, 130, 52, 10);             // big left hill
  P.circle(ctx, 270, 140, 150, 58, 10);            // big right hill
  P.dither(ctx, 0, 84, 320, 10, 10, 13);           // pink haze kissing the hilltops
  P.dither(ctx, 0, 104, 320, 12, 10, 2);           // hills darkening toward the lane
  /* identical lollipop trees — same tree, copy-pasted by someone cheap */
  for (const [tx, ty] of [[28, 96], [96, 88], [186, 92], [258, 86], [306, 98]]) {
    P.rect(ctx, tx - 1, ty, 3, 8, 6);
    P.circle(ctx, tx, ty - 6, 7, 7, 2);
    P.dither(ctx, tx - 5, ty - 11, 10, 4, 2, 10);  // lit crown, all from the same angle
    P.px(ctx, tx - 3, ty - 4, 4); P.px(ctx, tx + 3, ty - 7, 4);  // identical red fruit
  }
  /* Grandma's cottage peeking over the right hill — so cozy, so wrong */
  P.poly(ctx, [[284, 76], [296, 66], [308, 76]], 4);   // red roof
  P.rect(ctx, 287, 76, 18, 9, 7);                      // walls
  P.rect(ctx, 294, 79, 4, 6, 0);                       // dark doorway
  P.rect(ctx, 300, 64, 3, 8, 8);                       // chimney
  /* chimney smoke: sweet-smelling, probably jam. Probably. */
  for (let i = 0; i < 4; i++) {
    const sy = 60 - ((t * 9 + i * 11) % 34);
    P.px(ctx, 301 + Math.sin(t * 2 + i * 2) * 2.5, sy, 7);
  }

  /* ---------- ground: lawn-commercial grass + the lane ---------- */
  P.rect(ctx, 0, 116, 320, 84, 2);
  P.dither(ctx, 0, 116, 320, 7, 2, 10);            // bright rim at the horizon
  P.dither(ctx, 0, 190, 320, 10, 2, 0);            // shade at the bottom edge
  /* the dirt lane crossing the whole screen — straight to Grandma's */
  P.poly(ctx, [[0, 162], [120, 156], [220, 158], [320, 152], [320, 178], [200, 184], [90, 182], [0, 186]], 6);
  P.dither(ctx, 0, 156, 320, 5, 6, 2);             // grassy upper edge
  P.dither(ctx, 0, 180, 320, 6, 6, 0);             // shadowed lower edge
  P.dither(ctx, 30, 164, 260, 12, 6, 14);          // sun-baked sandy middle
  /* tidy wheel ruts — somebody hauls a LOT of jam down this lane */
  P.line(ctx, 0, 168, 320, 162, 4, 1);
  P.line(ctx, 0, 176, 320, 170, 4, 1);
  for (let i = 0; i < 8; i++) P.px(ctx, 20 + i * 40, 165 + (i % 3), 7);  // pebbles

  /* ---------- white picket fence, the crow's runway ---------- */
  /* back rails first, then pickets; fat perch post at x≈231 (crow pos) */
  P.rect(ctx, 0, 140, 320, 3, 15); P.rect(ctx, 0, 142, 320, 1, 7);   // top rail
  P.rect(ctx, 0, 149, 320, 3, 15); P.rect(ctx, 0, 151, 320, 1, 7);   // low rail
  for (let i = 0; i < 17; i++) {
    const px2 = 6 + i * 19;
    if (px2 > 218 && px2 < 244) continue;          // gap for the perch post
    P.rect(ctx, px2, 136, 4, 20, 15);
    P.poly(ctx, [[px2, 136], [px2 + 2, 132], [px2 + 4, 136]], 15);   // pointy cap
    P.rect(ctx, px2 + 3, 136, 1, 20, 7);           // shaded edge
    P.px(ctx, px2 + 1, 144, 8);                    // one nail each. Symmetry.
  }
  /* the perch post — thick, weathered, crow-approved (crow rect [222,118,18,16]) */
  P.rect(ctx, 227, 134, 8, 24, 15);
  P.rect(ctx, 233, 134, 2, 24, 7);
  P.rect(ctx, 227, 134, 8, 2, 7);                  // flat worn top, baseline y=134
  P.px(ctx, 229, 140, 8); P.px(ctx, 231, 150, 8);  // old nail holes
  P.dither(ctx, 222, 156, 18, 3, 2, 0);            // post shadow
  /* white feathers below the perch — the crow has been waiting a while */
  P.px(ctx, 240, 158, 15); P.px(ctx, 244, 160, 7); P.px(ctx, 237, 161, 15);

  /* ---------- the jam billboards (hotspot [80,90,60,60]) ---------- */
  /* big billboard: legs planted at the rect's bottom edge (y=150) */
  P.rect(ctx, 86, 124, 4, 26, 6); P.rect(ctx, 89, 124, 1, 26, 0);
  P.rect(ctx, 130, 124, 4, 26, 6); P.rect(ctx, 133, 124, 1, 26, 0);
  P.circle(ctx, 88, 151, 7, 2, 0); P.circle(ctx, 132, 151, 7, 2, 0);  // leg shadows
  P.rect(ctx, 80, 90, 60, 36, 6);                  // wooden frame
  P.rect(ctx, 82, 92, 56, 32, 15);                 // billboard face
  P.rect(ctx, 80, 90, 60, 2, 14);                  // sunlit top edge
  P.rect(ctx, 80, 124, 60, 2, 0);                  // shaded bottom edge
  /* painted jam jar, lovingly rendered */
  P.rect(ctx, 87, 100, 14, 18, 4);                 // jar of very red jam
  P.dither(ctx, 87, 100, 14, 18, 4, 12);
  P.rect(ctx, 86, 97, 16, 4, 14);                  // gingham lid
  P.px(ctx, 88, 98, 4); P.px(ctx, 92, 98, 4); P.px(ctx, 96, 98, 4); P.px(ctx, 100, 98, 4);
  P.rect(ctx, 89, 104, 10, 6, 15); P.rect(ctx, 90, 105, 8, 4, 12);   // label
  /* grandma's smiling face — the eyes don't smile */
  P.circle(ctx, 118, 104, 8, 8, 13);               // sweet pink face
  P.circle(ctx, 113, 96, 5, 4, 7); P.circle(ctx, 123, 96, 5, 4, 7);  // grey bun curls
  P.px(ctx, 115, 102, 0); P.px(ctx, 121, 102, 0);  // pinpoint pupils, dead center
  P.px(ctx, 114, 101, 15); P.px(ctx, 120, 101, 15);// too-wide whites
  P.line(ctx, 114, 108, 122, 108, 4, 1);           // a smile drawn with a ruler
  P.px(ctx, 113, 107, 4); P.px(ctx, 123, 107, 4);
  /* slogan squiggles (real text via the read command) */
  P.rect(ctx, 86, 119, 16, 2, 4); P.rect(ctx, 105, 119, 10, 2, 4); P.rect(ctx, 118, 119, 16, 2, 4);
  /* jam dripping off the board — paint, surely. Surely paint. */
  P.rect(ctx, 95, 126, 2, 3, 4); P.rect(ctx, 124, 126, 2, 5, 4);
  const drip = (t * 16) % 26;
  if (drip < 20) P.px(ctx, 125, 130 + drip, 4);    // one slow falling drop
  P.px(ctx, 125, 152, 4); P.px(ctx, 124, 153, 12); // the puddle it feeds
  /* smaller crooked sign nailed to the left leg — within the same hotspot */
  P.poly(ctx, [[81, 128], [103, 125], [104, 138], [82, 142]], 14);
  P.line(ctx, 81, 128, 103, 125, 6, 1);
  P.rect(ctx, 85, 131, 14, 2, 0); P.rect(ctx, 85, 135, 9, 2, 0);     // scrawl
  P.px(ctx, 100, 136, 4); P.px(ctx, 101, 137, 4);  // an exclamation in jam

  /* ---------- heart-shaped mailbox (hotspot [270,134,24,38]) ---------- */
  P.rect(ctx, 279, 152, 5, 20, 6);                 // wooden post to y=172
  P.rect(ctx, 283, 152, 1, 20, 0);
  P.circle(ctx, 282, 173, 8, 2, 0);                // post shadow
  /* the heart: two lobes + a point, pink with a red rim. Adorable. Ominous. */
  P.circle(ctx, 276, 141, 6, 6, 4);
  P.circle(ctx, 288, 141, 6, 6, 4);
  P.poly(ctx, [[270, 143], [294, 143], [282, 156]], 4);
  P.circle(ctx, 276, 141, 4, 4, 13);
  P.circle(ctx, 288, 141, 4, 4, 13);
  P.poly(ctx, [[273, 144], [291, 144], [282, 153]], 13);
  P.px(ctx, 275, 139, 15); P.px(ctx, 287, 139, 15);                  // glossy highlights
  P.rect(ctx, 277, 142, 10, 2, 0);                 // the letter slot
  /* complaint letters jammed in the slot — unread since forever */
  P.rect(ctx, 279, 139, 5, 3, 15); P.px(ctx, 281, 140, 8);
  P.rect(ctx, 284, 140, 4, 2, 7);
  /* one escaped envelope yellowing in the grass */
  P.poly(ctx, [[296, 168], [304, 166], [305, 171], [297, 173]], 14);
  P.line(ctx, 296, 168, 300, 170, 6, 1); P.line(ctx, 304, 166, 300, 170, 6, 1);
  /* a tiny red flag, permanently raised. Nobody is coming. */
  P.rect(ctx, 289, 134, 1, 8, 8);
  P.poly(ctx, [[290, 134], [294, 136], [290, 139]], 4);

  /* ---------- flowers in perfect rows: nature does not do this ---------- */
  for (let i = 0; i < 9; i++) {
    const fx = 14 + i * 36, fy = 132;
    if (fx > 78 && fx < 142) continue;             // skip behind the billboard
    if (fx > 264 && fx < 298) continue;            // skip behind the mailbox
    P.line(ctx, fx, fy + 5, fx, fy, 2, 1);
    P.circle(ctx, fx, fy - 1, 2, 2, (i % 2) ? 14 : 12);
    P.px(ctx, fx, fy - 1, 15);
  }
  /* second row, equally obedient, along the lane's lower edge */
  for (let i = 0; i < 8; i++) {
    const fx = 30 + i * 38, fy = 190;
    P.line(ctx, fx, fy + 4, fx, fy, 10, 1);
    P.circle(ctx, fx, fy - 1, 2, 2, (i % 2) ? 13 : 15);
    P.px(ctx, fx, fy - 1, 14);
  }
  /* grass tufts to loosen the manicure just a little */
  for (const [gx, gy] of [[56, 146], [160, 134], [206, 188], [120, 192], [310, 158], [10, 196]]) {
    P.line(ctx, gx, gy, gx - 2, gy - 5, 10, 1);
    P.line(ctx, gx, gy, gx + 1, gy - 6, 10, 1);
    P.line(ctx, gx, gy, gx + 3, gy - 4, 2, 1);
  }

  /* ---------- small life: one butterfly, one nervous sparkle ---------- */
  const bx = 160 + Math.sin(t * 0.9) * 50, by = 126 + Math.sin(t * 2.3) * 8;
  const wing = Math.sin(t * 12) > 0 ? 2 : 0;
  P.px(ctx, bx, by, 0);
  P.px(ctx, bx - 1, by - wing, 14); P.px(ctx, bx + 1, by - wing, 14);
  /* the mailbox glints. It wants you to come closer. */
  if (Math.sin(t * 2.4) > 0.6) { P.px(ctx, 287, 138, 15); P.px(ctx, 288, 137, 15); }
  /* a sun ray sparkle on the billboard jar — premium product, premium dread */
  if (Math.sin(t * 3.1 + 1) > 0.7) P.px(ctx, 89, 102, 15);
});
