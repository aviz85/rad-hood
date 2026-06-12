/* art13 — The basement.
   Grandma's true headquarters: a horror basement lit by one bare swinging
   bulb. Stone-block walls, an evidence wall (maps, X-ed wolf photos, red
   strings), a barred cage waiting in the corner, a jam "production"
   table dripping suspicious red, a phone charger snaking from a wall outlet,
   a bear trap waiting in the middle of the floor, cat pawprints wisely
   bypassing it, and wooden stairs back up to the polite world. Horizon 124.
   Hotspots painted exactly at spec rects:
     evidence_wall [110,52,90,64] · cage [44,128,38,34]
     charger [254,140,26,22] · traps_floor [140,168,60,22]
     tracks [120,180,80,12] · stairs [20,80,28,80] */
RH.registerArt('art13', function (ctx, P, t) {
  /* the bulb's nervous electricity: one clock drives all the light */
  const fl = Math.sin(t * 7.3) * 0.6 + Math.sin(t * 11.1) * 0.4; // -1..1
  const lit = fl > -0.55;                                        // bright phase
  const sway = Math.sin(t * 1.4) * 3;                            // bulb swing, px

  /* ---------- base: cold dark everywhere ---------- */
  P.rect(ctx, 0, 0, 320, 200, 0);

  /* ---------- back wall: stone blocks reached by the bulb ---------- */
  P.rect(ctx, 0, 30, 320, 94, 8);
  P.dither(ctx, 0, 30, 320, 10, 0, 8);             // ceiling gloom melting in
  P.dither(ctx, 0, 0, 320, 30, 0, 0);              // pure ceiling black
  P.dither(ctx, 0, 36, 36, 88, 0, 8);              // dark left rim
  P.dither(ctx, 292, 36, 28, 88, 0, 8);            // dark right rim
  /* mortar lines: coarse stone block coursework */
  for (let y = 42; y < 124; y += 14) P.line(ctx, 0, y, 320, y, 0, 1);
  for (let y = 42; y < 124; y += 14) {
    const off = ((y / 14) | 0) % 2 ? 18 : 0;
    for (let x = 8 + off; x < 320; x += 36) P.line(ctx, x, y, x, y + 14, 0, 1);
  }
  /* the warm pool of bulb light on the wall, breathing with the filament */
  P.dither(ctx, 110, 44, 110, 76, 7, 8);
  if (lit) P.dither(ctx, 130, 52, 70, 60, 7, 7);
  /* damp stains and one long crack — the house's honest opinion */
  P.dither(ctx, 250, 56, 26, 30, 8, 0);
  P.line(ctx, 84, 36, 92, 64, 0, 1);
  P.line(ctx, 92, 64, 86, 92, 0, 1);
  if (lit) { P.px(ctx, 96, 70, 7); P.px(ctx, 262, 60, 7); }      // wet glints

  /* ---------- ceiling beams + a rusty pipe ---------- */
  P.rect(ctx, 0, 24, 320, 6, 6);
  P.dither(ctx, 0, 24, 320, 6, 6, 0);
  P.rect(ctx, 70, 18, 4, 12, 0); P.rect(ctx, 240, 18, 4, 12, 0); // joists
  P.rect(ctx, 0, 12, 320, 4, 8);                   // the pipe nobody maintains
  P.circle(ctx, 200, 14, 3, 3, 8); P.px(ctx, 200, 17, 6);        // rusty joint
  /* a drop forming at the joint and committing to the floor */
  const drop = (t * 70) % 100;
  if (drop < 78) P.px(ctx, 200, 18 + drop * 2, 9);
  else if (drop < 86) { P.px(ctx, 198, 176, 9); P.px(ctx, 202, 176, 9); }
  P.circle(ctx, 200, 177, 7, 2, 8); P.circle(ctx, 200, 177, 4, 1, 1); // its puddle
  /* cobweb in the right ceiling corner, with landlord */
  P.line(ctx, 320, 6, 296, 26, 7, 1); P.line(ctx, 320, 22, 300, 8, 7, 1);
  P.line(ctx, 308, 6, 312, 24, 7, 1);
  P.px(ctx, 307, 15, 15); P.px(ctx, 308, 15, 15);  // the spider. paying no rent.

  /* ---------- the bare bulb: swinging, flickering, judging ---------- */
  P.line(ctx, 160, 16, 160 + sway, 34, 8, 1);      // cord
  P.rect(ctx, 159 + sway, 34, 3, 3, 7);            // socket
  P.circle(ctx, 160 + sway, 41, 4, 5, lit ? 14 : 6);
  if (lit) {
    P.px(ctx, 159 + sway, 39, 15);                 // hot filament glint
    P.circle(ctx, 160 + sway, 41, 6, 7, '#AA5500'); // faint halo — brown reads warm
    P.circle(ctx, 160 + sway, 41, 4, 5, 14);
    /* light cone dusting down toward the floor */
    P.dither(ctx, 132 + sway, 48, 56, 8, 7, 8);
  }

  /* ---------- stairs back up (hotspot [20,80,28,80]) ---------- */
  /* a slab of escape-shaped hope in the left wall */
  P.rect(ctx, 18, 76, 32, 86, 0);                  // stairwell void
  P.rect(ctx, 20, 76, 28, 8, 6);                   // door at the top, ajar
  P.rect(ctx, 24, 70, 20, 8, 6);
  P.px(ctx, 42, 74, 14);                            // sliver of living-room light
  for (let i = 0; i < 6; i++) {                    // wooden steps coming down
    const sy = 84 + i * 13, sx = 20, sw = 28;
    P.rect(ctx, sx, sy, sw, 5, 6);                 // tread
    P.rect(ctx, sx, sy + 5, sw, 8, 0);             // riser shadow
    P.dither(ctx, sx, sy, sw, 2, 7, 6);            // worn tread edge
  }
  P.line(ctx, 18, 76, 18, 162, 8, 2);              // side rail
  P.px(ctx, 30, 110, 0); P.px(ctx, 36, 136, 0);    // knots in the wood

  /* ---------- evidence wall (hotspot [110,52,90,64]) ---------- */
  /* cork board, the kind serial planners buy in bulk */
  P.rect(ctx, 110, 52, 90, 64, 6);
  P.dither(ctx, 110, 52, 90, 64, 6, 6);
  P.rect(ctx, 110, 52, 90, 2, 0); P.rect(ctx, 110, 114, 90, 2, 0); // frame
  P.rect(ctx, 110, 52, 2, 64, 0); P.rect(ctx, 198, 52, 2, 64, 0);
  /* pinned forest map, annotated with intent */
  P.rect(ctx, 116, 58, 26, 20, 7);
  P.line(ctx, 118, 64, 132, 60, 2, 1);             // river squiggle... in green
  P.line(ctx, 124, 74, 138, 68, 1, 1);             // the actual river
  P.px(ctx, 128, 66, 4); P.px(ctx, 134, 70, 4);    // marked ambush spots
  P.circle(ctx, 136, 62, 3, 3, 4);                 // circled clearing. Zevik's.
  /* three wolf "photos", each X-ed with growing enthusiasm */
  for (let i = 0; i < 3; i++) {
    const px2 = 148 + i * 17, py2 = 58;
    P.rect(ctx, px2, py2, 13, 16, 15);             // photo paper
    P.rect(ctx, px2 + 2, py2 + 2, 9, 10, 8);       // gray mugshot field
    P.circle(ctx, px2 + 6, py2 + 6, 3, 3, 7);      // wolf head
    P.px(ctx, px2 + 4, py2 + 4, 0); P.px(ctx, px2 + 8, py2 + 4, 0); // sad eyes
    P.px(ctx, px2 + 6, py2 + 9, 0);                // sadder snout
    P.line(ctx, px2 + 1, py2 + 1, px2 + 11, py2 + 14, 4, 1);  // the X
    P.line(ctx, px2 + 11, py2 + 1, px2 + 1, py2 + 14, 4, 1);
  }
  /* notes row: jam ledger, a list, one heart. The heart is the worst part. */
  P.rect(ctx, 118, 84, 16, 12, 14);                // yellow sticky note
  P.line(ctx, 120, 87, 131, 87, 0, 1); P.line(ctx, 120, 90, 128, 90, 0, 1);
  P.line(ctx, 120, 93, 130, 93, 0, 1);
  P.rect(ctx, 140, 86, 14, 16, 15);                // long list, mostly crossed out
  for (let i = 0; i < 5; i++) P.line(ctx, 142, 89 + i * 3, 151, 89 + i * 3, 8, 1);
  P.line(ctx, 141, 89, 152, 89, 4, 1); P.line(ctx, 141, 95, 152, 95, 4, 1);
  P.rect(ctx, 160, 88, 12, 12, 13);                // pink note
  P.px(ctx, 164, 92, 4); P.px(ctx, 166, 92, 4);    // a little hand-drawn heart
  P.px(ctx, 163, 93, 4); P.px(ctx, 167, 93, 4); P.px(ctx, 165, 95, 4);
  P.rect(ctx, 178, 84, 18, 22, 7);                 // grainy photo of the cottage
  P.poly(ctx, [[180, 94], [187, 88], [194, 94]], 8);
  P.rect(ctx, 182, 94, 10, 8, 8);
  P.circle(ctx, 187, 90, 1, 1, 4);                 // circled attic window
  /* red string network — pins first, then the conspiracy */
  const pins = [[129, 59], [154, 60], [171, 60], [188, 60], [126, 85], [147, 87], [166, 89], [187, 85]];
  for (const [nx, ny] of pins) P.px(ctx, nx, ny, 4);
  P.line(ctx, 129, 59, 154, 60, 4, 1);
  P.line(ctx, 154, 60, 147, 87, 4, 1);
  P.line(ctx, 171, 60, 126, 85, 4, 1);
  P.line(ctx, 188, 60, 166, 89, 4, 1);
  P.line(ctx, 126, 85, 187, 85, 4, 1);
  P.line(ctx, 129, 59, 187, 85, 4, 1);             // every board needs one long one

  /* ---------- jam production table, right of the board ---------- */
  P.rect(ctx, 212, 92, 72, 6, 6);                  // table top
  P.dither(ctx, 212, 92, 72, 2, 7, 6);
  P.rect(ctx, 216, 98, 4, 28, 6); P.rect(ctx, 276, 98, 4, 28, 6); // legs
  P.dither(ctx, 216, 98, 4, 28, 6, 0); P.dither(ctx, 276, 98, 4, 28, 6, 0);
  /* the big jam pot, simmering with secrets */
  P.circle(ctx, 232, 86, 11, 7, 8);
  P.rect(ctx, 221, 80, 22, 6, 8);
  P.dither(ctx, 223, 81, 18, 3, 4, 8);             // red surface. "strawberry".
  P.line(ctx, 219, 82, 216, 78, 7, 1);             // handle
  if (lit) P.px(ctx, 228, 81, 12);                 // a bubble surfacing
  /* a slow red drip down the table edge — quality control */
  const jd = (t * 26) % 36;
  P.px(ctx, 244, 98 + Math.min(jd, 26), 4);
  P.dither(ctx, 240, 126, 10, 3, 4, 0);            // the stain it feeds
  /* filled jars, labeled with cheerful lies */
  for (let i = 0; i < 3; i++) {
    P.rect(ctx, 252 + i * 10, 82, 7, 10, 4);       // jar of red
    P.rect(ctx, 252 + i * 10, 80, 7, 2, 7);        // tin lid
    P.rect(ctx, 253 + i * 10, 86, 5, 3, 15);       // tiny label
    if (lit) P.px(ctx, 253 + i * 10, 83, 12);      // glassy glint
  }
  P.circle(ctx, 246, 88, 3, 4, 7);                 // a funnel, tipped over
  P.poly(ctx, [[243, 90], [249, 90], [246, 95]], 7);
  /* a hand saw hung on the wall above. For "fruit". */
  P.line(ctx, 290, 56, 290, 60, 7, 1);             // its nail
  P.rect(ctx, 282, 60, 6, 8, 6);                   // handle
  P.poly(ctx, [[284, 68], [292, 68], [290, 96], [286, 96]], 7); // blade
  for (let i = 0; i < 5; i++) P.px(ctx, 285, 72 + i * 5, 0);    // teeth

  /* ---------- floor: cold concrete from the horizon down ---------- */
  P.rect(ctx, 0, 124, 320, 76, 8);
  P.dither(ctx, 0, 124, 320, 6, 7, 8);             // lit rim at the horizon
  P.dither(ctx, 0, 186, 320, 14, 0, 8);            // dark pooling at the bottom
  P.dither(ctx, 0, 130, 30, 70, 0, 8);             // dark left flank
  P.dither(ctx, 296, 130, 24, 70, 0, 8);           // dark right flank
  /* bulb light pool on the floor, swinging gently with the cord */
  P.dither(ctx, 118 + sway, 140, 92, 44, 7, 8);
  if (lit) P.dither(ctx, 140 + sway, 150, 48, 24, 7, 7);
  P.line(ctx, 0, 158, 320, 158, 0, 1);             // expansion joint
  P.line(ctx, 252, 124, 244, 200, 0, 1);           // floor crack
  P.px(ctx, 70, 150, 7); P.px(ctx, 230, 170, 7);   // concrete texture
  P.px(ctx, 104, 186, 7); P.px(ctx, 282, 156, 7);

  /* ---------- the cage (hotspot [44,128,38,34]) ---------- */
  P.circle(ctx, 63, 162, 22, 4, 0);                // ground shadow
  P.rect(ctx, 44, 128, 38, 32, 0);                 // dark interior
  P.rect(ctx, 44, 128, 38, 3, 7);                  // top frame
  P.rect(ctx, 44, 157, 38, 3, 7);                  // bottom frame
  for (let i = 0; i < 6; i++) P.rect(ctx, 46 + i * 7, 131, 2, 26, 7); // bars
  P.dither(ctx, 44, 128, 38, 3, 7, 8);             // dull metal
  /* a fat padlock — Grandma believes in commitment */
  P.rect(ctx, 76, 142, 7, 7, 14);
  P.circle(ctx, 79, 141, 3, 3, 8); P.circle(ctx, 79, 141, 1, 2, 0);
  P.px(ctx, 79, 145, 0);                            // keyhole
  /* interior stays pure dark — the cat is a sprite-bearing character and the
     background cannot know whether the cage is still occupied. A blanket and
     a bowl tell the prisoner story without drawing the prisoner. */
  P.rect(ctx, 50, 152, 18, 4, 6);                  // folded blanket on the floor
  P.dither(ctx, 50, 152, 18, 2, 6, 0);
  P.circle(ctx, 52, 164, 5, 2, 7);                 // food bowl outside the bars
  P.circle(ctx, 52, 164, 3, 1, 4);                 // filled with... jam. Of course.

  /* ---------- the charger (hotspot [254,140,26,22]) ---------- */
  /* wall outlet on a wooden post, cable down to a charger brick on a stool */
  P.rect(ctx, 262, 110, 6, 30, 6);                 // wooden post off the wall
  P.dither(ctx, 262, 110, 6, 30, 6, 0);
  P.rect(ctx, 260, 116, 10, 9, 7);                 // outlet plate
  P.px(ctx, 263, 119, 0); P.px(ctx, 267, 119, 0);  // socket holes
  P.px(ctx, 265, 122, 0);
  P.rect(ctx, 256, 146, 20, 12, 6);                // little stool
  P.rect(ctx, 257, 158, 3, 6, 6); P.rect(ctx, 272, 158, 3, 6, 6);
  P.rect(ctx, 258, 141, 12, 6, 15);                // the charger brick itself
  P.rect(ctx, 259, 142, 3, 2, 8);                  // its little badge
  P.line(ctx, 264, 125, 262, 134, 0, 1);           // cable from outlet
  P.line(ctx, 262, 134, 263, 141, 0, 1);
  P.line(ctx, 270, 145, 278, 150, 0, 1);           // free cable end, waiting
  P.px(ctx, 279, 151, 7);                           // the connector
  if (lit && Math.sin(t * 3.2) > 0.4) P.px(ctx, 268, 142, 10);  // ready LED wink

  /* ---------- the bear trap (hotspot [140,168,60,22]) ---------- */
  /* half "hidden" under straw, which fools exactly nobody except guests */
  P.dither(ctx, 142, 170, 56, 16, 6, 8);           // scattered straw bed
  P.circle(ctx, 170, 178, 22, 7, 8);               // base plate
  P.circle(ctx, 170, 178, 18, 5, 0);               // dark mouth
  /* two arcs of teeth, open and optimistic */
  for (let i = 0; i < 7; i++) {
    const tx = 154 + i * 6;
    P.poly(ctx, [[tx, 174], [tx + 3, 174], [tx + 1, 169]], 7);  // upper fangs
    P.poly(ctx, [[tx, 182], [tx + 3, 182], [tx + 1, 187]], 7);  // lower fangs
  }
  P.circle(ctx, 170, 178, 3, 2, 6);                // rusty trigger plate
  P.line(ctx, 190, 182, 202, 188, 8, 1);           // anchor chain
  P.px(ctx, 195, 184, 7); P.px(ctx, 199, 186, 7);  // chain links
  P.circle(ctx, 204, 189, 3, 2, 8);                // floor ring
  if (lit) { P.px(ctx, 156, 170, 15); P.px(ctx, 184, 170, 15); } // glinting teeth

  /* ---------- the cat tracks (hotspot [120,180,80,12]) ---------- */
  /* small four-toed prints sweeping politely AROUND the trap */
  for (let i = 0; i < 7; i++) {
    const px3 = 122 + i * 11;
    const py3 = 188 - Math.sin((i / 6) * Math.PI) * 4;          // the bypass arc
    P.px(ctx, px3, py3, 0); P.px(ctx, px3 + 1, py3, 0);         // pad
    P.px(ctx, px3 - 1, py3 - 2, 0); P.px(ctx, px3, py3 - 3, 0); // toes
    P.px(ctx, px3 + 1, py3 - 2, 0); P.px(ctx, px3 + 2, py3 - 2, 0);
  }
  /* the trail keeps going toward the cage. Smart cat. Doomed cat. */
  P.px(ctx, 108, 184, 0); P.px(ctx, 96, 180, 0); P.px(ctx, 86, 174, 0);

  /* ---------- storytelling clutter ---------- */
  /* stenciled jam crates stacked by the right wall */
  P.rect(ctx, 290, 96, 26, 28, 6);
  P.rect(ctx, 292, 70, 22, 26, 6);
  P.dither(ctx, 290, 96, 26, 28, 6, 0); P.dither(ctx, 292, 70, 22, 26, 6, 0);
  P.rect(ctx, 294, 104, 18, 6, 15);                // label band, squiggles only
  P.rect(ctx, 296, 106, 6, 2, 4); P.rect(ctx, 305, 106, 5, 2, 4);
  /* a rat commuting along the bottom wall, strictly off the straw */
  const rx = 300 - ((t * 30) % 280);
  P.circle(ctx, rx, 196, 4, 2, 8);                 // body
  P.px(ctx, rx - 5, 195, 8);                        // nose
  P.line(ctx, rx + 4, 196, rx + 9, 194, 8, 1);     // tail
  P.px(ctx, rx - 4, 194, 12);                       // one judging eye
  /* dust motes drifting through the cone of light */
  for (let i = 0; i < 3; i++) {
    const my = 60 + ((t * 9 + i * 27) % 70);
    P.px(ctx, 150 + sway + Math.sin(t * 1.2 + i * 2) * 14, my, 7);
  }
});
