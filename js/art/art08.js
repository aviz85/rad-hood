/* art08 — The river & bridge.
   A wide lazy river crosses the foreground. On the right, a sturdy wooden
   toll bridge climbs from a plank landing toward the far side, guarded by
   a tough guy with sunglasses (sprite — the engine draws him). A hand-
   painted toll sign stands by the entrance, and a dark cave mouth gapes
   in the rocky cliff on the left, up above the bank.
   Hotspot rects honored exactly:
     bridge   [184,118,94,34]  · river [0,150,320,44]
     tollsign [168,100,22,36]  · cave_mouth [60,70,44,44]
   guard [212,96,34,74] is a sprite — we only paint his landing and props.
   Horizon 112: walkable bank from y=112 down (the water itself is a
   scene-logic death, not our problem — we just make it look inviting). */
RH.registerArt('art08', function (ctx, P, t) {
  /* ---------- sky: bright river-valley morning ---------- */
  P.bands(ctx, 0, 0, 320, 52, [1, 9, 9, 11, 11]);
  P.dither(ctx, 0, 18, 320, 6, 1, 9);             // blend deep blue -> light blue
  P.dither(ctx, 0, 38, 320, 6, 9, 11);            // blend light blue -> cyan haze
  /* two slow clouds drifting downstream like everyone else around here */
  const c1 = ((t * 5) % 380) - 30, c2 = ((t * 3.4 + 140) % 380) - 30;
  P.circle(ctx, c1, 16, 14, 5, 15); P.circle(ctx, c1 + 12, 18, 10, 4, 15);
  P.dither(ctx, c1 - 12, 19, 36, 3, 15, 11);
  P.circle(ctx, c2, 32, 11, 4, 15); P.circle(ctx, c2 - 10, 34, 8, 3, 15);
  /* one bird patrolling the valley */
  const bx = 200 + Math.cos(t * 0.7) * 60, by = 24 + Math.sin(t * 1.3) * 6;
  const flap = Math.sin(t * 8) > 0 ? 3 : -1;
  P.line(ctx, bx - 4, by - flap, bx, by, 0, 1);
  P.line(ctx, bx, by, bx + 4, by - flap, 0, 1);

  /* ---------- distant forest ridge across the horizon ---------- */
  P.dither(ctx, 0, 52, 320, 8, 11, 2);            // treetops melting into haze
  P.rect(ctx, 0, 58, 320, 54, 2);
  P.dither(ctx, 100, 60, 220, 50, 2, 0);          // murky depth between far trunks
  /* jagged pine silhouettes (right side — the cliff hides the left) */
  for (let i = 0; i < 10; i++) {
    const px2 = 116 + i * 21;
    P.poly(ctx, [[px2, 62], [px2 + 9, 42 + (i * 7) % 12], [px2 + 18, 62]], 2);
  }
  for (let i = 0; i < 7; i++) P.rect(ctx, 128 + i * 28, 84, 3, 28, 0);

  /* ---------- left cliff with the cave mouth [60,70,44,44] ---------- */
  P.poly(ctx, [[0, 34], [50, 42], [94, 54], [118, 68], [126, 94], [118, 116], [104, 126], [60, 132], [0, 134]], 8);
  P.dither(ctx, 0, 36, 90, 18, 8, 7);             // sunlit cap of the rock face
  P.dither(ctx, 96, 64, 26, 48, 8, 0);            // shaded right flank
  P.dither(ctx, 0, 118, 86, 14, 8, 7);            // scree at the base
  /* cracks and ledges — geology with personality */
  P.line(ctx, 14, 50, 30, 92, 0, 1);
  P.line(ctx, 30, 92, 22, 120, 0, 1);
  P.line(ctx, 104, 70, 112, 102, 0, 1);
  P.line(ctx, 4, 78, 34, 74, 0, 1);
  P.rect(ctx, 36, 62, 18, 2, 7); P.rect(ctx, 10, 96, 14, 2, 7);
  /* grass combing over the cliff top + a few hanging vines */
  P.dither(ctx, 0, 32, 96, 5, 2, 10);
  P.line(ctx, 44, 38, 42, 56, 2, 1); P.line(ctx, 70, 46, 72, 66, 2, 1);
  P.line(ctx, 24, 36, 26, 50, 10, 1);
  /* the cave mouth itself — black, toothy, zero customer service */
  P.circle(ctx, 82, 92, 23, 22, 7);               // pale weathered rim
  P.circle(ctx, 82, 93, 20, 19, 0);               // the dark itself
  P.dither(ctx, 64, 74, 36, 10, 0, 8);            // faint depth at the ceiling
  /* stalactite teeth across the opening */
  P.poly(ctx, [[68, 76], [73, 76], [70, 86]], 7);
  P.poly(ctx, [[78, 73], [84, 73], [81, 85]], 7);
  P.poly(ctx, [[90, 75], [95, 75], [92, 84]], 7);
  P.rect(ctx, 62, 108, 40, 4, 7);                 // worn stone lip at the entrance
  P.dither(ctx, 62, 110, 40, 3, 7, 8);
  /* something in there blinks. Probably nothing. Probably. */
  if (Math.sin(t * 1.3) > -0.55) { P.px(ctx, 76, 96, 14); P.px(ctx, 87, 96, 14); }
  /* a bat doing nervous laps by the entrance */
  const ax = 82 + Math.cos(t * 2.2) * 18, ay = 68 + Math.sin(t * 4.4) * 5;
  const aw = Math.sin(t * 12) > 0 ? 2 : 0;
  P.line(ctx, ax - 3, ay - aw, ax, ay + 1, 0, 1);
  P.line(ctx, ax, ay + 1, ax + 3, ay - aw, 0, 1);

  /* ---------- the bank: green strip between cliff and water ---------- */
  P.rect(ctx, 0, 112, 320, 40, 2);
  P.dither(ctx, 0, 112, 320, 6, 2, 10);           // sunlit rim along the horizon
  P.dither(ctx, 0, 144, 320, 6, 2, 6);            // muddy edge sliding into the river
  P.dither(ctx, 0, 124, 70, 22, 2, 0);            // cliff shadow pooling on the grass
  /* dirt path from the left exit along the bank to the bridge */
  P.poly(ctx, [[0, 130], [150, 132], [196, 140], [196, 148], [148, 142], [0, 142]], 6);
  P.dither(ctx, 0, 130, 170, 4, 6, 2);
  P.dither(ctx, 0, 138, 170, 4, 6, 0);
  /* a worn side-trail climbing toward the cave (the "up" exit) */
  P.poly(ctx, [[84, 114], [96, 114], [112, 134], [100, 138]], 6);
  P.dither(ctx, 88, 116, 18, 4, 6, 2);
  P.rect(ctx, 88, 116, 8, 2, 7); P.rect(ctx, 94, 122, 8, 2, 7);   // crude stone steps
  P.rect(ctx, 100, 128, 8, 2, 7);
  /* grass tufts and a couple of optimistic flowers */
  for (const [gx, gy] of [[26, 140], [128, 120], [156, 136], [300, 120], [288, 142]]) {
    P.line(ctx, gx, gy, gx - 2, gy - 5, 10, 1);
    P.line(ctx, gx, gy, gx, gy - 6, 10, 1);
    P.line(ctx, gx, gy, gx + 2, gy - 4, 2, 1);
  }
  P.px(ctx, 134, 118, 14); P.px(ctx, 162, 134, 12); P.px(ctx, 294, 124, 13);
  /* path continuing from the bridge's far end to the right exit */
  P.poly(ctx, [[284, 124], [320, 118], [320, 130], [288, 134]], 6);
  P.dither(ctx, 286, 124, 32, 3, 6, 2);

  /* ---------- the river [0,150,320,44] — wide, calm, lethal ---------- */
  P.rect(ctx, 0, 148, 320, 52, 1);
  P.line(ctx, 0, 148, 320, 148, 0, 1);            // dark cut along the far shore
  P.dither(ctx, 0, 150, 320, 5, 1, 9);            // bright shallows by the bank
  P.dither(ctx, 0, 186, 320, 10, 1, 0);           // deep cold water near the viewer
  /* cliff reflection wobbling on the left */
  P.dither(ctx, 8, 152, 70, 12, 1, 8);
  /* current: ripple dashes sliding downstream forever */
  for (let i = 0; i < 12; i++) {
    const wy = 154 + (i * 17) % 38;
    const wx = ((i * 53 + wy * 3 + t * 22) % 344) - 12;
    P.rect(ctx, wx, wy, 8, 1, 9);
    P.px(ctx, wx + 3, wy, 11);
  }
  /* sun sparkles winking on the surface */
  if (Math.sin(t * 5) > 0.3) P.px(ctx, 92, 160, 15);
  if (Math.sin(t * 6 + 2) > 0.4) P.px(ctx, 150, 172, 15);
  if (Math.sin(t * 4.4 + 4) > 0.2) P.px(ctx, 36, 182, 15);
  /* a skull-painted buoy bobbing where the last swimmer used to be */
  const bob = Math.sin(t * 2) * 1.5;
  P.circle(ctx, 40, 168 + bob, 5, 5, 15);
  P.px(ctx, 38, 167 + bob, 0); P.px(ctx, 42, 167 + bob, 0);
  P.rect(ctx, 39, 170 + bob, 3, 1, 0);
  P.circle(ctx, 40, 175 + bob, 8, 2, 9);          // its ripple ring
  /* a rubber duck drifting through, unbothered by mortality */
  const dux = ((t * 10) % 380) - 30, duy = 178 + Math.sin(t * 3) * 1.5;
  P.circle(ctx, dux, duy, 3, 2, 14);
  P.circle(ctx, dux + 3, duy - 3, 2, 2, 14);
  P.px(ctx, dux + 5, duy - 3, 12); P.px(ctx, dux + 3, duy - 4, 0);
  P.line(ctx, dux - 6, duy + 3, dux + 6, duy + 3, 9, 1);
  /* an occasional show-off fish */
  const ft = t % 6;
  if (ft < 0.6) {
    const fx = 120 + ft * 40, fy = 168 - Math.sin((ft / 0.6) * Math.PI) * 9;
    P.rect(ctx, fx, fy, 4, 2, 7); P.px(ctx, fx + 4, fy - 1, 7);
    if (ft > 0.45) { P.px(ctx, fx + 4, 166, 15); P.px(ctx, fx + 6, 167, 11); }
  }
  /* reeds nodding along the far shore */
  for (const [rx, rs] of [[16, 0], [142, 2], [164, 4]]) {
    const sway2 = Math.sin(t * 1.6 + rs) * 1.5;
    P.line(ctx, rx, 152, rx - 2 + sway2, 138, 2, 1);
    P.line(ctx, rx + 3, 152, rx + 3 + sway2, 136, 10, 1);
    P.line(ctx, rx + 6, 152, rx + 8 + sway2, 140, 2, 1);
    P.rect(ctx, rx + 2 + sway2, 132, 2, 5, 6);    // cattail head
    P.px(ctx, rx + 3 + sway2, 131, 14);
  }
  /* a dragonfly that pays no toll */
  const qx = 110 + Math.cos(t * 1.1) * 30, qy = 146 + Math.sin(t * 3.3) * 4;
  P.px(ctx, qx, qy, 11); P.px(ctx, qx - 1, qy, 3); P.px(ctx, qx + 1, qy - 1, 11);

  /* ---------- bridge support piles, sunk into the current ---------- */
  for (const [hx, ht] of [[216, 150], [244, 144], [268, 140]]) {
    P.rect(ctx, hx, ht, 5, 188 - ht, 6);
    P.rect(ctx, hx, ht, 1, 188 - ht, 0);          // shaded edge
    P.px(ctx, hx + 3, ht + 4, 14);                // sun catching the timber
    P.circle(ctx, hx + 2, 186 + Math.sin(t * 4 + hx) * 1, 6, 2, 9);   // foam ring
    P.px(ctx, hx - 3, 184, 15); P.px(ctx, hx + 7, 187, 15);
  }

  /* ---------- the plank landing where the guard holds court ---------- */
  P.poly(ctx, [[196, 148], [266, 148], [276, 194], [186, 194]], 6);
  P.dither(ctx, 198, 148, 66, 3, 6, 14);          // sun-bleached top edge
  P.dither(ctx, 188, 188, 86, 6, 6, 0);           // damp shadowed front
  for (let i = 0; i < 5; i++)                     // plank seams, slightly fanned
    P.line(ctx, 194 - i, 156 + i * 8, 270 + i, 156 + i * 8, 0, 1);
  P.px(ctx, 204, 160, 8); P.px(ctx, 250, 168, 8); P.px(ctx, 222, 184, 8);   // nails
  /* corner piles holding the landing out of the water */
  P.rect(ctx, 188, 192, 5, 8, 6); P.rect(ctx, 270, 192, 5, 8, 6);
  P.rect(ctx, 188, 192, 1, 8, 0); P.rect(ctx, 270, 192, 1, 8, 0);
  /* guard lifestyle: folding stool, thermos, cooler, sunflower-seed crime scene */
  P.line(ctx, 200, 182, 206, 172, 0, 1); P.line(ctx, 208, 182, 202, 172, 0, 1);
  P.rect(ctx, 200, 170, 9, 3, 4);                 // the stool he never offers anyone
  P.rect(ctx, 250, 164, 4, 8, 12); P.rect(ctx, 250, 163, 4, 2, 7);   // thermos
  P.rect(ctx, 256, 174, 13, 8, 9); P.rect(ctx, 256, 173, 13, 2, 15); // cooler box
  P.px(ctx, 234, 184, 6); P.px(ctx, 238, 186, 14); P.px(ctx, 242, 183, 6);
  P.px(ctx, 230, 187, 14); P.px(ctx, 245, 188, 6);                   // seed shells

  /* ---------- the bridge itself [184,118,94,34] ---------- */
  /* deck climbing from the landing up toward the far-right bank */
  P.poly(ctx, [[196, 146], [278, 128], [278, 138], [196, 156]], 6);
  P.line(ctx, 196, 146, 278, 128, 14, 1);         // sunlit top edge
  P.line(ctx, 196, 156, 278, 138, 0, 1);          // dark underside
  for (let i = 0; i < 8; i++) {                   // plank seams across the deck
    const sx2 = 202 + i * 10, sy3 = 145 - (sx2 - 196) * 0.21;
    P.line(ctx, sx2, sy3, sx2, sy3 + 9, 0, 1);
  }
  /* railing: five posts and a handrail, regulation height, zero warmth */
  for (let i = 0; i < 5; i++) {
    const rx2 = 200 + i * 19, ry2 = 145 - (rx2 - 196) * 0.21;
    P.rect(ctx, rx2, ry2 - 12, 3, 13, 6);
    P.rect(ctx, rx2, ry2 - 12, 1, 13, 0);
  }
  P.line(ctx, 199, 132, 277, 115 + 3, 6, 2);      // handrail
  P.line(ctx, 199, 131, 277, 117, 14, 1);         // its sun-kissed top
  /* the official toll box, bolted to the first post. Slot included. */
  P.rect(ctx, 194, 134, 9, 7, 6);
  P.rect(ctx, 195, 135, 7, 5, 4);
  P.rect(ctx, 197, 136, 4, 1, 0);                 // the coin slot
  P.px(ctx, 198, 133, 14);                        // one lonely coin on top
  /* a little red pennant on the far post — bureaucracy with flair */
  const fl = Math.sin(t * 5) * 2;
  P.poly(ctx, [[279, 103], [288 + fl, 106], [279, 109]], 4);
  P.rect(ctx, 278, 102, 1, 16, 6);

  /* ---------- the toll sign [168,100,22,36] ---------- */
  P.circle(ctx, 180, 138, 8, 2, 0);               // post shadow on the grass
  P.rect(ctx, 177, 120, 4, 16, 6);                // post planted by the path
  P.rect(ctx, 177, 120, 1, 16, 0);
  P.rect(ctx, 168, 100, 22, 22, 6);               // weathered board
  P.rect(ctx, 170, 102, 18, 18, 15);              // whitewashed face
  P.rect(ctx, 168, 100, 22, 1, 14);
  P.rect(ctx, 168, 121, 22, 1, 0);
  P.px(ctx, 170, 101, 8); P.px(ctx, 187, 101, 8); // nails
  /* squiggle "lettering" — the actual price arrives via the read command */
  P.rect(ctx, 172, 105, 13, 2, 0);
  P.rect(ctx, 172, 109, 10, 2, 0); P.rect(ctx, 184, 109, 3, 2, 0);
  P.rect(ctx, 172, 113, 7, 3, 4);                 // the angry red price part
  P.circle(ctx, 184, 115, 3, 3, 14);              // a painted coin, very motivational
  P.circle(ctx, 184, 115, 1, 1, 6);

  /* ---------- near shore strip at the bottom edge ---------- */
  P.rect(ctx, 0, 196, 320, 4, 2);
  P.dither(ctx, 0, 196, 320, 4, 2, 0);
  P.px(ctx, 48, 197, 7); P.px(ctx, 130, 198, 8); P.px(ctx, 296, 197, 7);
});
