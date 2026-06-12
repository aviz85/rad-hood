/* art05 — Forest path: deep inside the forest now. A junction scene —
   the path runs left-right (right leads to Zevik the wolf) and a smaller
   trail climbs up toward the mushroom field. A huge ancient tree looms on
   the left, a tiny wooden signpost points up, wildflowers by the path.
   Horizon at y=110 (walkable ground below). Hotspots painted exactly at spec rects:
     oldtree  [30,20,80,150]
     signpost [196,118,18,40]
     flowers  [120,160,40,16]
   (squirrel is a sprite — the engine draws it at [250,162]; keep that spot clean) */
RH.registerArt('art05', function (ctx, P, t) {
  /* ---------- sky: only slivers of it survive the canopy ---------- */
  P.bands(ctx, 0, 0, 320, 40, [9, 9, 11, 11]);
  P.dither(ctx, 0, 16, 320, 8, 9, 11);            // blend band in the sky slivers

  /* ---------- canopy ceiling: layered leaf masses swallowing the sky ---------- */
  P.dither(ctx, 0, 0, 320, 34, 2, 9);             // leaves against sky, light leaking through
  P.rect(ctx, 0, 30, 320, 26, 2);
  P.dither(ctx, 0, 30, 320, 26, 2, 0);            // murky underside of the canopy
  /* hanging leaf clumps along the ceiling */
  for (let i = 0; i < 9; i++) {
    const cx = i * 38 + 12;
    P.circle(ctx, cx, 28 + (i * 11) % 18, 24, 14, 2);
  }
  P.dither(ctx, 0, 0, 320, 10, 2, 10);            // sunlit very top of the leaves
  /* tiny sky holes that twinkle as the leaves sway */
  const sway = Math.sin(t * 1.4);
  P.px(ctx, 150 + sway * 2, 12, 11); P.px(ctx, 232 - sway * 2, 18, 11);
  P.px(ctx, 286 + sway, 9, 11); P.px(ctx, 124, 22, 9);

  /* ---------- mid-distance forest wall down to the horizon ---------- */
  P.rect(ctx, 0, 56, 320, 54, 2);
  P.dither(ctx, 0, 56, 320, 54, 2, 0);            // gloom between the far trunks
  /* far trunks, thin and dark, packed tight — a proper thick forest */
  for (let i = 0; i < 13; i++) {
    const fx = 116 + i * 16 + (i * 5) % 7;
    P.rect(ctx, fx, 60, 3, 50, 0);
    P.px(ctx, fx + 3, 70 + (i * 9) % 30, 2);      // a hint of moss on each
  }
  /* nearer mid trunks with some volume */
  const mids = [[126, 7], [178, 8], [262, 9], [298, 8]];
  for (const [mx, mw] of mids) {
    P.rect(ctx, mx, 52, mw, 58, 6);
    P.rect(ctx, mx, 52, 2, 58, 0);                // shaded left edge
    P.px(ctx, mx + mw - 1, 64, 14);               // sun fleck on the right edge
  }
  P.dither(ctx, 0, 102, 320, 8, 2, 10);           // lit moss rim right above the floor

  /* ---------- forest floor ---------- */
  P.rect(ctx, 0, 110, 320, 90, 2);
  P.dither(ctx, 0, 110, 320, 10, 2, 10);          // light grass right under the horizon
  P.dither(ctx, 0, 168, 320, 32, 2, 0);           // foreground undergrowth darkens
  P.dither(ctx, 0, 110, 44, 90, 2, 0);            // deep shade under the ancient tree

  /* ---------- the winding path: a real junction ---------- */
  /* branch climbing UP to the mushroom field (exit up), vanishing at the horizon */
  P.poly(ctx, [[214, 110], [224, 110], [236, 136], [206, 136]], 6);
  P.dither(ctx, 210, 112, 22, 22, 6, 2);          // half-swallowed by grass — barely used
  /* main path arriving from the left (scene04) and winding right (to Zevik) */
  P.poly(ctx, [[0, 148], [96, 142], [150, 152], [206, 136], [236, 136], [256, 150], [320, 146], [320, 172], [248, 176], [180, 162], [110, 178], [0, 184]], 6);
  P.dither(ctx, 0, 144, 320, 8, 6, 2);            // grassy upper fringe of the path
  P.dither(ctx, 0, 176, 320, 8, 6, 0);            // shadowed lower fringe
  P.dither(ctx, 196, 136, 44, 10, 6, 14);         // sunlit dust where the trails meet
  /* pebbles and ruts on the trodden dirt */
  P.rect(ctx, 58, 158, 5, 3, 8); P.rect(ctx, 142, 154, 4, 2, 8);
  P.rect(ctx, 268, 158, 5, 3, 8); P.rect(ctx, 226, 144, 3, 2, 8);
  P.line(ctx, 20, 166, 84, 160, 0, 1);            // old cart rut
  P.line(ctx, 246, 162, 312, 158, 0, 1);
  /* big wolf paw prints heading right. Suspiciously polite spacing. */
  for (let i = 0; i < 4; i++) {
    P.px(ctx, 254 + i * 16, 154 + (i % 2) * 3, 0);
    P.px(ctx, 257 + i * 16, 156 + (i % 2) * 3, 0);
    P.px(ctx, 255 + i * 16, 158 + (i % 2) * 3, 0);
  }

  /* ---------- sun shafts breaking through the canopy (slow breathing light) ---------- */
  const shaft = Math.sin(t * 0.7) * 0.5 + 0.5;
  if (shaft > 0.25) {
    P.dither(ctx, 160, 34, 3, 80, 14, 2);
    P.dither(ctx, 168, 34, 2, 86, 14, 2);
    P.circle(ctx, 168, 122, 16, 4, 10);           // light pool on the floor
    P.dither(ctx, 150, 118, 36, 8, 10, 2);
  }
  if (shaft > 0.7) { P.dither(ctx, 286, 40, 2, 66, 14, 2); P.circle(ctx, 288, 112, 9, 3, 10); }

  /* ---------- the ancient tree (hotspot rect [30,20,80,150]) ---------- */
  /* roots flaring onto the floor */
  P.poly(ctx, [[34, 170], [50, 138], [60, 138], [56, 170]], 6);
  P.poly(ctx, [[62, 170], [64, 134], [78, 134], [84, 170]], 6);
  P.poly(ctx, [[88, 170], [84, 138], [94, 140], [104, 168]], 6);
  P.dither(ctx, 34, 160, 72, 10, 6, 0);           // shade pooling between the roots
  /* the colossal trunk */
  P.poly(ctx, [[44, 150], [50, 60], [54, 36], [88, 36], [92, 62], [96, 150]], 6);
  P.rect(ctx, 46, 60, 6, 88, 0);                  // dark left flank
  P.dither(ctx, 84, 56, 9, 92, 6, 14);            // sunlit right flank
  P.dither(ctx, 52, 60, 30, 90, 6, 8);            // gnarled old bark texture
  /* deep bark grooves — it has more wrinkles than the pensioner */
  P.line(ctx, 58, 48, 56, 144, 0, 1);
  P.line(ctx, 70, 40, 68, 138, 0, 1);
  P.line(ctx, 80, 44, 82, 140, 0, 1);
  P.line(ctx, 50, 90, 62, 94, 0, 1);              // a horizontal scar
  /* the hollow: a black knothole that has seen things */
  P.circle(ctx, 66, 96, 7, 9, 0);
  P.circle(ctx, 66, 93, 4, 4, 8);                 // faint inner rim
  P.px(ctx, 65, 95, 14); P.px(ctx, 68, 95, 14);   // ...are those eyes? No. Probably.
  /* one heavy low branch reaching over the path */
  P.poly(ctx, [[88, 64], [128, 50], [132, 56], [92, 72]], 6);
  P.rect(ctx, 124, 44, 10, 10, 2);                // leaf tuft at the branch tip
  P.dither(ctx, 122, 42, 14, 6, 2, 10);
  /* its mighty crown filling the upper-left */
  P.circle(ctx, 56, 32, 34, 22, 2);
  P.circle(ctx, 92, 28, 28, 18, 2);
  P.circle(ctx, 36, 44, 22, 16, 2);
  P.dither(ctx, 28, 18, 84, 14, 2, 10);           // light on the crown's top
  P.dither(ctx, 32, 44, 76, 14, 2, 0);            // deep shade beneath it
  /* moss creeping up the north side, and a few mushrooms at the foot (decorative!) */
  P.dither(ctx, 46, 116, 8, 32, 2, 6);
  P.px(ctx, 40, 168, 7); P.rect(ctx, 39, 166, 3, 2, 7); // tiny gray toadstool
  P.px(ctx, 102, 166, 7); P.rect(ctx, 101, 164, 3, 2, 7);
  /* carved heart with an arrow — someone loved here. In THIS forest. Bold. */
  P.circle(ctx, 74, 118, 2, 2, 0); P.circle(ctx, 78, 118, 2, 2, 0);
  P.poly(ctx, [[72, 119], [80, 119], [76, 124]], 0);
  P.line(ctx, 70, 124, 82, 114, 0, 1);

  /* ---------- the wooden signpost (hotspot rect [196,118,18,40]) ---------- */
  P.dither(ctx, 198, 156, 20, 4, 2, 0);           // its little shadow
  P.rect(ctx, 203, 124, 4, 34, 6);                // post, planted at the fork
  P.rect(ctx, 203, 124, 1, 34, 0);                // shaded edge
  P.px(ctx, 206, 130, 14);                        // worn lit edge
  /* arrow board pointing UP (to the mushroom field) */
  P.poly(ctx, [[200, 126], [210, 126], [210, 122], [205, 118], [200, 122]], 6);
  P.rect(ctx, 200, 124, 10, 2, 14);               // weathered light face strip
  P.poly(ctx, [[201, 122], [205, 119], [209, 122]], 14);
  P.px(ctx, 205, 121, 0);                         // nail at the arrow's tip
  /* scribbled "text" marks (the actual text comes via the read command) */
  P.rect(ctx, 201, 127, 8, 1, 0);
  P.rect(ctx, 196, 132, 18, 9, 6);                // small lower plank
  P.rect(ctx, 196, 132, 18, 1, 14);
  P.rect(ctx, 198, 135, 14, 1, 0);
  P.rect(ctx, 200, 138, 10, 1, 0);
  P.px(ctx, 197, 133, 8); P.px(ctx, 212, 133, 8); // rusty nails
  /* the plank tilts — maintenance budget: one acorn per decade */
  P.line(ctx, 196, 141, 214, 140, 0, 1);

  /* ---------- the wildflowers (hotspot rect [120,160,40,16]) ---------- */
  P.dither(ctx, 120, 166, 40, 10, 2, 10);         // lusher grass patch under them
  const fl = [[124, 168, 12], [132, 172, 14], [141, 167, 15], [149, 171, 12], [156, 168, 13]];
  for (const [fx, fy, fc] of fl) {
    P.line(ctx, fx, fy + 6, fx, fy + 1, 2, 1);    // stem
    P.px(ctx, fx - 2, fy + 4, 10);                // little leaf
    P.px(ctx, fx - 1, fy, fc); P.px(ctx, fx + 1, fy, fc); // petals
    P.px(ctx, fx, fy - 1, fc); P.px(ctx, fx, fy + 1, fc);
    P.px(ctx, fx, fy, 14);                        // yellow heart
  }
  /* a butterfly working the patch — the calmest resident of this forest */
  const bx = 140 + Math.sin(t * 1.1) * 16, by = 156 + Math.cos(t * 2.3) * 5;
  const wing = Math.sin(t * 12) > 0 ? 2 : 1;
  P.px(ctx, bx, by, 0);
  P.rect(ctx, bx - wing, by - 1, wing, 2, 13);
  P.rect(ctx, bx + 1, by - 1, wing, 2, 13);

  /* ---------- right side: a mossy boulder and a stump near the squirrel ---------- */
  /* (squirrel sprite stands at [250,162] — the stump sits just behind it) */
  P.circle(ctx, 290, 134, 16, 9, 8);              // boulder
  P.dither(ctx, 278, 126, 26, 7, 8, 7);           // lit top
  P.dither(ctx, 280, 136, 24, 7, 8, 0);           // shaded bottom
  P.dither(ctx, 284, 128, 12, 5, 8, 2);           // moss cap
  P.rect(ctx, 244, 138, 14, 12, 6);               // old stump behind the squirrel
  P.circle(ctx, 251, 138, 7, 3, 7);               // pale cut face with rings
  P.circle(ctx, 251, 138, 4, 2, 6);
  P.px(ctx, 251, 138, 0);
  P.rect(ctx, 244, 140, 2, 10, 0);                // shaded side
  P.px(ctx, 248, 150, 14); P.px(ctx, 254, 149, 14); // dropped seed shells. Someone snacks here.

  /* ---------- foreground undergrowth: ferns, tufts, color specks ---------- */
  const fern = [[16, 196], [104, 192], [176, 196], [228, 192], [308, 194]];
  for (const [px2, py2] of fern) {
    P.line(ctx, px2, py2, px2 - 5, py2 - 8, 2, 1);
    P.line(ctx, px2, py2, px2, py2 - 10, 10, 1);
    P.line(ctx, px2, py2, px2 + 5, py2 - 7, 2, 1);
    P.px(ctx, px2 - 3, py2 - 6, 10); P.px(ctx, px2 + 3, py2 - 5, 10);
  }
  const tufts = [[36, 178], [148, 186], [200, 180], [274, 184], [120, 150], [62, 176]];
  for (const [gx, gy] of tufts) {
    P.line(ctx, gx, gy, gx - 2, gy - 5, 10, 1);
    P.line(ctx, gx, gy, gx + 2, gy - 4, 2, 1);
  }
  P.px(ctx, 188, 146, 4); P.px(ctx, 92, 184, 14); P.px(ctx, 300, 178, 12);
  P.px(ctx, 26, 158, 13); P.px(ctx, 218, 188, 4);

  /* ---------- life in the dark ---------- */
  /* a bird hopping along the low branch of the ancient tree */
  const hop = Math.floor(t * 1.6) % 3;
  const hx = 104 + hop * 8, hy = 56 - hop * 3 - (Math.sin(t * 8) > 0.6 ? 2 : 0);
  P.rect(ctx, hx, hy, 4, 3, 4);                   // little red body
  P.px(ctx, hx + 4, hy, 4);                       // head
  P.px(ctx, hx + 5, hy, 14);                      // beak
  P.px(ctx, hx - 1, hy + 1, 0);                   // tail
  /* fireflies drifting in the gloom between the far trunks */
  if (Math.sin(t * 2.2) > 0.3) P.px(ctx, 140 + Math.sin(t) * 6, 88, 14);
  if (Math.sin(t * 1.7 + 2) > 0.5) P.px(ctx, 248, 80 + Math.cos(t * 1.3) * 4, 14);
  if (Math.sin(t * 2.9 + 4) > 0.6) P.px(ctx, 196, 70, 10);
});
