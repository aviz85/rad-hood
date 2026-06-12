/* art14 — Epilogue: the neighborhood celebration.
   Dusk over the block, string lights, confetti, balloons — and the grand
   opening of Zevik's restaurant "הזאב הרעב — חומוס וגריל פטריות".
   The sign carries no letters (no fillText): a happy wolf face, a hummus
   bowl and grilled portobellos say it all. In the background, far right,
   Grandma's ride to justice — a police van with a flashing light bar and
   two small hands gripping the bars (Grandma herself appears only as those
   hands — she has no sprite in this scene). The wolf, the kiosk owner,
   the dancing pensioner and the cop are SPRITES — the engine draws them;
   we only set the stage. Horizon at y=120.                                  */
RH.registerArt('art14', function (ctx, P, t) {
  /* ---------- dusk sky: the day the forest finally relaxed ----------
     The sky reaches the horizon (y=120) so no black gaps show between
     the housing blocks, the restaurant and the forest line.            */
  P.bands(ctx, 0, 0, 320, 112, [1, 1, 9, 9, 13, 13, 14, 14]);
  P.dither(ctx, 0, 25, 320, 6, 1, 9);             // night melting down
  P.dither(ctx, 0, 53, 320, 6, 9, 13);            // blue into celebration pink
  P.dither(ctx, 0, 81, 320, 6, 13, 14);           // pink into a warm glow
  /* early stars — even they came out for this */
  for (let i = 0; i < 9; i++) {
    const sx = (i * 67 + 23) % 314, sy = 4 + (i * 29) % 20;
    P.px(ctx, sx, sy, (Math.floor(t * 2) + i) % 3 ? 15 : 9);   // twinkle
  }
  /* a fat contented moon, slightly smug */
  P.circle(ctx, 282, 22, 11, 11, 14);
  P.circle(ctx, 286, 20, 8, 8, 15);
  P.px(ctx, 280, 26, 6); P.px(ctx, 277, 19, 6);   // craters
  /* one crow doing a victory lap */
  const bx = (t * 26) % 400 - 40, by = 30 + Math.sin(t * 3) * 4;
  P.line(ctx, bx - 4, by - 2, bx, by, 0, 1);
  P.line(ctx, bx, by, bx + 4, by - 2 - (Math.floor(t * 6) % 2) * 2, 0, 1);

  /* ---------- skyline: housing blocks left, tamed forest right ---------- */
  P.rect(ctx, 0, 56, 26, 64, 8);                  // block A
  P.rect(ctx, 26, 70, 22, 50, 0);                 // block B in shadow
  P.rect(ctx, 48, 62, 18, 58, 8);                 // block C
  for (let fy = 0; fy < 5; fy++) for (let fx = 0; fx < 3; fx++) {
    /* lit windows — the whole neighborhood is up watching */
    const lit = (fx + fy * 3 + Math.floor(t)) % 4;
    P.rect(ctx, 3 + fx * 8, 61 + fy * 11, 4, 5, lit ? 14 : 1);
  }
  P.rect(ctx, 29, 75, 3, 4, 14); P.rect(ctx, 38, 86, 3, 4, 14);
  P.rect(ctx, 51, 67, 3, 4, 14); P.rect(ctx, 58, 89, 3, 4, 14);
  /* forest line, far right — dark, quiet, finally minding its own business */
  P.dither(ctx, 210, 96, 110, 24, 2, 0);
  for (const [tx, th] of [[218, 18], [240, 24], [262, 16], [288, 22], [308, 14]]) {
    P.poly(ctx, [[tx - 7, 116], [tx, 116 - th], [tx + 7, 116]], 0);
    P.poly(ctx, [[tx - 5, 110], [tx, 110 - th + 4], [tx + 5, 110]], 2);
  }
  P.dither(ctx, 0, 112, 320, 8, 13, 6);           // glow hugging the horizon

  /* ---------- ground: the street, closed for the party ---------- */
  P.rect(ctx, 0, 120, 320, 80, 6);                // packed earth / old asphalt
  P.dither(ctx, 0, 120, 320, 8, 6, 14);           // lantern light spilling on it
  P.dither(ctx, 0, 150, 320, 30, 6, 8);           // mid tone
  P.dither(ctx, 0, 188, 320, 12, 8, 0);           // dark bottom edge
  /* a proper dance floor: borrowed plywood, painted in a hurry */
  P.poly(ctx, [[96, 156], [224, 156], [248, 192], [72, 192]], 7);
  P.dither(ctx, 90, 160, 140, 28, 7, 15);         // worn bright patches
  P.line(ctx, 96, 156, 72, 192, 8, 1); P.line(ctx, 224, 156, 248, 192, 8, 1);
  P.line(ctx, 86, 168, 234, 168, 8, 1);           // plank seams
  P.line(ctx, 78, 182, 242, 182, 8, 1);

  /* ---------- the police van (hotspot rect [238,82,76,48]) ---------- */
  P.circle(ctx, 254, 128, 6, 3, 0); P.circle(ctx, 296, 128, 6, 3, 0); // wheel shadows
  P.rect(ctx, 240, 92, 68, 32, 1);                // navy body
  P.rect(ctx, 240, 92, 68, 3, 9);                 // roof highlight
  P.rect(ctx, 240, 118, 68, 6, 0);                // dark skirt
  P.rect(ctx, 296, 98, 12, 12, 9);                // cab window (driver gone partying)
  P.rect(ctx, 240, 106, 50, 4, 15);               // white stripe — official misery
  /* rear bars window (grandma_van hotspot rect [246,94,22,18]): hands only */
  P.rect(ctx, 248, 96, 18, 14, 0);
  for (let i = 0; i < 4; i++) P.rect(ctx, 250 + i * 4, 96, 1, 14, 7);
  P.rect(ctx, 251, 105, 3, 2, 13); P.rect(ctx, 259, 105, 3, 2, 13);   // gripping hands
  /* light bar — alternating red/blue, the disco she deserves */
  const flash = Math.floor(t * 4) % 2;
  P.rect(ctx, 262, 88, 10, 4, flash ? 4 : 8);
  P.rect(ctx, 274, 88, 10, 4, flash ? 8 : 1);
  P.circle(ctx, 268, 86, 3, 2, flash ? 12 : 8);   // glow blob
  P.circle(ctx, 254, 124, 5, 5, 0); P.circle(ctx, 254, 124, 2, 2, 7); // wheels
  P.circle(ctx, 296, 124, 5, 5, 0); P.circle(ctx, 296, 124, 2, 2, 7);
  P.line(ctx, 240, 124, 232, 130, 8, 1);          // ramp it was loaded by

  /* ---------- the restaurant: "הזאב הרעב" (hotspot rect [64,52,142,104]) ---------- */
  P.circle(ctx, 134, 156, 74, 6, 0);              // building ground shadow
  P.rect(ctx, 70, 78, 128, 78, 6);                // warm wooden front
  P.dither(ctx, 70, 78, 128, 6, 6, 14);           // lamplight on the planks
  P.dither(ctx, 70, 146, 128, 10, 6, 0);          // base shade
  for (let i = 1; i < 8; i++) P.line(ctx, 70 + i * 16, 78, 70 + i * 16, 156, 8, 1); // planks
  /* roof */
  P.poly(ctx, [[62, 78], [134, 52], [206, 78]], 4);
  P.poly(ctx, [[70, 76], [134, 56], [198, 76]], 12);
  P.line(ctx, 62, 78, 206, 78, 0, 2);
  /* chimney with honest grill smoke — portobello, not propaganda */
  P.rect(ctx, 176, 56, 8, 16, 8); P.rect(ctx, 175, 54, 10, 3, 7);
  for (let i = 0; i < 5; i++) {
    const sy = 50 - ((t * 12 + i * 9) % 40);
    P.circle(ctx, 180 + Math.sin(t * 2 + i) * 3, sy, 2 + i * 0.4, 2, 7);
  }
  /* THE SIGN — wolf face + hummus bowl + skewered portobellos (no letters) */
  P.rect(ctx, 84, 60, 100, 24, 0);                // backboard
  P.rect(ctx, 86, 62, 96, 20, 14);                // yellow sign face
  P.rect(ctx, 84, 60, 100, 2, 15);                // top shine
  /* happy wolf head, finally off the wanted posters */
  P.poly(ctx, [[96, 66], [99, 61], [102, 66]], 8);     // left ear
  P.poly(ctx, [[108, 66], [111, 61], [114, 66]], 8);   // right ear
  P.circle(ctx, 105, 72, 9, 8, 8);                     // head
  P.poly(ctx, [[96, 74], [88, 77], [96, 79]], 8);      // snout (eating, of course)
  P.px(ctx, 101, 70, 15); P.px(ctx, 108, 70, 15);      // bright happy eyes
  P.line(ctx, 100, 76, 109, 76, 0, 1);                 // big grin
  /* hummus bowl with a swirl and olive oil */
  P.circle(ctx, 134, 74, 10, 6, 12);                   // clay bowl
  P.circle(ctx, 134, 72, 8, 4, 15);                    // hummus
  P.circle(ctx, 134, 72, 4, 2, 14);                    // oil pool
  P.px(ctx, 131, 71, 6); P.px(ctx, 137, 73, 6);        // paprika dust
  /* skewer of grilled portobellos — brown caps, bright dots. Only those. */
  P.line(ctx, 152, 78, 176, 64, 7, 1);
  for (const [mx, my] of [[157, 75], [164, 71], [171, 67]]) {
    P.circle(ctx, mx, my, 4, 3, 6);
    P.px(ctx, mx - 1, my - 1, 14); P.px(ctx, mx + 2, my, 14);  // the dots!
  }
  /* striped awning over the serving window */
  P.poly(ctx, [[78, 96], [190, 96], [182, 108], [86, 108]], 4);
  for (let i = 0; i < 7; i++) P.poly(ctx,
    [[86 + i * 16, 96], [94 + i * 16, 96], [92 + i * 16, 108], [88 + i * 16, 108]], 15);
  P.line(ctx, 86, 108, 182, 108, 0, 1);
  /* serving window — warm light, stacked pitas, a steaming pot */
  P.rect(ctx, 92, 110, 56, 28, 0);
  P.rect(ctx, 94, 112, 52, 24, 14);
  P.dither(ctx, 94, 112, 52, 5, 14, 15);          // glow
  P.rect(ctx, 92, 134, 56, 4, 6);                 // counter ledge
  P.circle(ctx, 104, 132, 6, 2, 15); P.circle(ctx, 104, 129, 5, 2, 7);  // pita stack
  P.rect(ctx, 126, 124, 12, 8, 8); P.rect(ctx, 125, 123, 14, 2, 7);     // pot
  P.px(ctx, 130, 119 - (Math.floor(t * 3) % 3), 7);                     // pot steam
  /* door, slightly open — everyone is already outside */
  P.rect(ctx, 158, 108, 22, 48, 8);
  P.rect(ctx, 160, 110, 14, 46, 6);
  P.rect(ctx, 174, 110, 6, 46, 14);               // light through the gap
  P.px(ctx, 171, 132, 14);                        // brass knob
  /* menu board by the door: three dishes, zero jam */
  P.rect(ctx, 186, 122, 14, 22, 7); P.rect(ctx, 187, 123, 12, 20, 15);
  P.line(ctx, 189, 127, 197, 127, 0, 1);
  P.line(ctx, 189, 132, 195, 132, 0, 1);
  P.line(ctx, 189, 137, 197, 137, 0, 1);

  /* ---------- string lights: kiosk-grade electricity, pure joy ---------- */
  for (let s = 0; s < 3; s++) {
    const x0 = 8 + s * 108, x1 = x0 + 104, ymid = 40 + s * 4;
    for (let i = 0; i <= 12; i++) {
      const lx = x0 + (x1 - x0) * i / 12;
      const ly = ymid + Math.sin(Math.PI * i / 12) * 10;
      if (i < 12) {
        const nx = x0 + (x1 - x0) * (i + 1) / 12;
        P.line(ctx, lx, ly, nx, ymid + Math.sin(Math.PI * (i + 1) / 12) * 10, 0, 1);
      }
      const bulbs = [14, 12, 10, 11];             // bulbs chase along the wire
      P.px(ctx, lx, ly + 2, bulbs[(i + Math.floor(t * 5)) % 4]);
      P.px(ctx, lx, ly + 3, bulbs[(i + Math.floor(t * 5)) % 4]);
    }
  }
  /* bunting on the restaurant facade */
  for (let i = 0; i < 8; i++) P.poly(ctx,
    [[74 + i * 16, 86], [82 + i * 16, 86], [78 + i * 16, 93]], [4, 14, 10, 12][i % 4]);

  /* ---------- party furniture ---------- */
  /* long table, left — the buffet Zevik dreamed about for three acts */
  P.rect(ctx, 8, 144, 56, 5, 15); P.rect(ctx, 8, 149, 56, 2, 7);
  P.rect(ctx, 12, 151, 4, 16, 6); P.rect(ctx, 56, 151, 4, 16, 6);
  P.dither(ctx, 8, 167, 56, 4, 8, 0);             // table shadow
  P.circle(ctx, 22, 142, 6, 2, 15); P.circle(ctx, 22, 140, 5, 2, 12);  // salad bowl
  P.circle(ctx, 38, 141, 5, 3, 6);                                     // mushroom platter
  P.px(ctx, 36, 140, 14); P.px(ctx, 40, 141, 14);
  P.rect(ctx, 50, 136, 4, 7, 11); P.rect(ctx, 56, 137, 4, 6, 13);      // soft drinks
  /* one (1) jar of Grandma's jam, repurposed as a tip jar. Justice. */
  P.rect(ctx, 30, 136, 7, 8, 11); P.rect(ctx, 30, 135, 7, 2, 6);
  P.px(ctx, 33, 140, 14);                          // a lonely coin inside
  /* balloons tied to the table leg, bobbing */
  const bob = Math.sin(t * 2.5) * 2;
  for (const [ox, c] of [[-4, 12], [2, 14], [8, 10]]) {
    P.line(ctx, 14, 152, 14 + ox, 122 + bob, 8, 1);
    P.circle(ctx, 14 + ox, 116 + bob, 5, 7, c);
    P.px(ctx, 12 + ox, 112 + bob, 15);             // shine
  }
  /* lamppost, right — leaning, like everyone after this party */
  P.line(ctx, 300, 188, 297, 130, 8, 2);
  P.line(ctx, 297, 130, 288, 126, 8, 2);
  P.circle(ctx, 286, 128, 4, 4, 14);
  P.circle(ctx, 286, 128, 2, 2, 15);
  P.dither(ctx, 274, 132, 24, 10, 14, 6);          // cone of light
  P.circle(ctx, 300, 190, 7, 3, 0);                // post shadow
  /* speaker crate pumping the victory march */
  P.rect(ctx, 220, 150, 16, 20, 0); P.rect(ctx, 222, 152, 12, 16, 8);
  P.circle(ctx, 228, 157, 4, 4, 0); P.circle(ctx, 228, 165, 2, 2, 0);
  const beat = Math.floor(t * 4) % 3;
  if (beat) P.circle(ctx, 228, 157, 4 + beat, 4 + beat, 7);   // thumping cone
  P.px(ctx, 240, 146 - beat * 2, 15); P.px(ctx, 244, 142 + beat, 15);  // note sparks

  /* ---------- confetti rain: the budget went HERE ---------- */
  for (let i = 0; i < 26; i++) {
    const cy = (t * 22 + i * 31) % 190;
    const cx = (i * 53 + Math.floor(Math.sin(t + i) * 6)) % 318;
    P.px(ctx, cx, cy, [12, 14, 10, 11, 13][i % 5]);
  }
  /* confetti already on the ground — somebody will sweep this. Not Red. */
  for (let i = 0; i < 14; i++)
    P.px(ctx, (i * 47 + 9) % 312, 160 + (i * 13) % 36, [12, 14, 10, 13][i % 4]);
});
