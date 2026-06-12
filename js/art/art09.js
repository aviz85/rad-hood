/* art09 — The cave.
   A dark dripping cave lit by the warm shaky light of Red's torch.
   Rock walls and ceiling, stalactites and stalagmites, a colony of bats,
   suspicious cave paintings (Grandma with a saw — "art"), a crate of
   contraband jam, a rusty key glinting in the rubble, and small cat
   pawprints leading deeper. Horizon at y=120.
   Hotspots painted exactly at spec rects:
     key_glint [252,162,14,10] · jambox [58,138,42,32]
     paintings [120,60,80,44] · pawprints [180,170,40,12] · bats [140,30,60,24] */
RH.registerArt('art09', function (ctx, P, t) {
  /* torch flicker: one warm clock driving the whole scene's light */
  const fl = Math.sin(t * 9) * 0.5 + Math.sin(t * 13.7) * 0.5; // -1..1 shaky
  const lit = fl > -0.3;                                       // bright phase

  /* ---------- base darkness: deep rock everywhere ---------- */
  P.rect(ctx, 0, 0, 320, 200, 0);

  /* ---------- back wall, faintly reached by the torch ---------- */
  P.rect(ctx, 40, 36, 240, 84, 8);
  P.dither(ctx, 40, 36, 240, 14, 0, 8);            // ceiling shade melting in
  P.dither(ctx, 40, 104, 240, 16, 8, 6);           // warm torch wash near the floor
  P.dither(ctx, 40, 36, 26, 84, 0, 8);             // dark left rim
  P.dither(ctx, 254, 36, 26, 84, 0, 8);            // dark right rim
  /* a pitch-black passage going deeper — where the pawprints point */
  P.poly(ctx, [[228, 70], [252, 60], [262, 120], [222, 120]], 0);
  P.dither(ctx, 224, 68, 8, 52, 0, 8);             // crumbling passage edge
  P.dither(ctx, 256, 64, 8, 56, 0, 8);
  /* a pair of eyes blinking in the passage. Probably nothing. Probably. */
  if (Math.sin(t * 1.3) > -0.85) { P.px(ctx, 240, 92, 14); P.px(ctx, 245, 92, 14); }

  /* cracks and mineral veins on the back wall */
  P.line(ctx, 70, 44, 84, 78, 0, 1);
  P.line(ctx, 84, 78, 78, 104, 0, 1);
  P.line(ctx, 210, 46, 200, 72, 0, 1);
  P.line(ctx, 96, 40, 104, 58, 0, 1);
  P.line(ctx, 58, 90, 74, 96, 0, 1);
  /* glittering damp spots */
  P.px(ctx, 92, 66, 7); P.px(ctx, 206, 88, 7); P.px(ctx, 66, 58, 7);
  if (lit) { P.px(ctx, 110, 50, 15); P.px(ctx, 214, 64, 15); }

  /* ---------- ceiling: jagged rock + stalactites ---------- */
  P.rect(ctx, 0, 0, 320, 36, 0);
  P.dither(ctx, 0, 26, 320, 12, 0, 8);             // ragged underside of the ceiling
  /* stalactites — each a hanging fang with a lit warm edge */
  const stal = [[28, 34, 7, 30], [74, 30, 6, 22], [118, 32, 5, 18], [232, 30, 6, 24], [282, 34, 8, 34], [180, 28, 4, 14]];
  for (const [sx, sy, sw, sh] of stal) {
    P.poly(ctx, [[sx - sw, sy], [sx + sw, sy], [sx, sy + sh]], 8);
    P.poly(ctx, [[sx, sy], [sx + sw, sy], [sx + 1, sy + sh - 2]], 0); // shaded side
    if (lit) P.line(ctx, sx - sw + 2, sy + 2, sx - 1, sy + sh - 3, 6, 1); // torch-warm edge
  }
  /* a drop forming and falling from the big left stalactite */
  const drop = (t * 60) % 90;
  if (drop < 56) P.px(ctx, 28, 64 + drop, 9);
  else if (drop < 62) { P.px(ctx, 26, 124, 9); P.px(ctx, 30, 124, 9); } // tiny splash
  /* the puddle it has been feeding since the Bronze Age */
  P.circle(ctx, 28, 126, 12, 3, 1);
  P.circle(ctx, 28, 126, 8, 2, 9);
  if (lit) P.px(ctx, 25 + ((t * 8) | 0) % 6, 125, 11);   // wobbling reflection

  /* ---------- the bats (hotspot [140,30,60,24]) ---------- */
  /* a row of sleepers hanging from the ceiling, plus one nervous flyer */
  for (let i = 0; i < 4; i++) {
    const bx = 146 + i * 14, by = 33;
    P.line(ctx, bx, 30, bx, by, 8, 1);             // feet grip
    P.circle(ctx, bx, by + 4, 3, 4, 0);            // folded body
    P.circle(ctx, bx, by + 4, 2, 3, 8);
    P.px(ctx, bx - 1, by + 7, 12); P.px(ctx, bx + 1, by + 7, 12); // upside-down eyes
    P.px(ctx, bx - 2, by + 2, 0); P.px(ctx, bx + 2, by + 2, 0);   // wing tips
  }
  /* the one bat that never sleeps, looping inside the colony rect */
  const fx = 170 + Math.sin(t * 1.9) * 26, fy = 42 + Math.sin(t * 3.1) * 8;
  const wing = Math.sin(t * 16) > 0 ? 4 : 1;
  P.line(ctx, fx - 5, fy - wing, fx, fy, 8, 1);
  P.line(ctx, fx, fy, fx + 5, fy - wing, 8, 1);
  P.px(ctx, fx, fy, 0);
  /* guano dotting — the floor under a bat colony is never a mystery */
  P.px(ctx, 154, 122, 7); P.px(ctx, 168, 124, 7); P.px(ctx, 181, 121, 7);

  /* ---------- cave paintings (hotspot [120,60,80,44]) ---------- */
  /* a smoother ochre panel someone clearly prepared on purpose */
  P.rect(ctx, 120, 60, 80, 44, 6);
  P.dither(ctx, 120, 60, 80, 6, 8, 6);             // weathered top
  P.dither(ctx, 120, 98, 80, 6, 6, 8);             // weathered bottom
  P.rect(ctx, 120, 60, 1, 44, 8); P.rect(ctx, 199, 60, 1, 44, 8);
  /* figure 1: Grandma — bun hair, dress... and a saw. In red ochre. */
  P.circle(ctx, 138, 70, 3, 3, 4);                 // head
  P.px(ctx, 138, 65, 4);                            // the famous bun
  P.poly(ctx, [[134, 80], [142, 80], [144, 90], [132, 90]], 4); // dress
  P.line(ctx, 134, 76, 130, 82, 4, 1);             // arm
  P.line(ctx, 142, 76, 148, 74, 4, 1);             // arm holding the saw
  P.line(ctx, 148, 70, 158, 76, 4, 1);             // saw blade
  P.px(ctx, 150, 73, 4); P.px(ctx, 153, 74, 4); P.px(ctx, 156, 76, 4); // saw teeth
  P.line(ctx, 134, 90, 133, 96, 4, 1); P.line(ctx, 142, 90, 143, 96, 4, 1); // legs
  /* figure 2: a fleeing stick wolf, tail between his legs. Historic slander. */
  P.circle(ctx, 176, 84, 3, 2, 0);                 // body
  P.px(ctx, 180, 82, 0);                            // head
  P.px(ctx, 182, 81, 0);                            // snout
  P.line(ctx, 173, 84, 170, 88, 0, 1);             // drooping tail
  P.line(ctx, 175, 86, 173, 90, 0, 1); P.line(ctx, 178, 86, 180, 90, 0, 1); // legs mid-run
  /* motion dashes behind the wolf */
  P.px(ctx, 167, 83, 0); P.px(ctx, 164, 84, 0);
  /* figure 3: a row of jam jars, lovingly documented */
  for (let i = 0; i < 3; i++) {
    P.rect(ctx, 158 + i * 9, 94, 5, 6, 4);
    P.rect(ctx, 158 + i * 9, 93, 5, 1, 0);
  }
  /* ancient sun + hand stamp, for archaeological credibility */
  P.circle(ctx, 128, 66, 3, 3, 14);
  P.line(ctx, 124, 62, 132, 70, 14, 1); P.line(ctx, 132, 62, 124, 70, 14, 1);
  P.rect(ctx, 188, 64, 6, 8, 4); P.px(ctx, 187, 66, 4); // smudged palm print

  /* ---------- floor: rocky cave ground from the horizon down ---------- */
  P.rect(ctx, 0, 120, 320, 80, 8);
  P.dither(ctx, 0, 120, 320, 8, 6, 8);             // torch-warmed rim at the horizon
  P.dither(ctx, 0, 184, 320, 16, 0, 8);            // darkness pooling at the bottom
  P.dither(ctx, 0, 124, 44, 76, 0, 8);             // dark left flank
  P.dither(ctx, 286, 124, 34, 76, 0, 8);           // dark right flank
  /* the torchlight pool around where Red stands — breathing with the flame */
  P.dither(ctx, 116, 132, 96, 44, 6, 8);
  if (lit) { P.dither(ctx, 136, 142, 56, 24, 6, 14); P.dither(ctx, 124, 136, 80, 6, 6, 8); }
  /* scattered rocks and rubble */
  const rocks = [[58, 186, 8, 4], [104, 176, 6, 3], [226, 184, 9, 4], [296, 156, 7, 3], [14, 152, 6, 3], [250, 132, 5, 2]];
  for (const [rx, ry, rw, rh] of rocks) {
    P.circle(ctx, rx, ry, rw, rh, 7);
    P.circle(ctx, rx + 1, ry + 1, rw - 2, rh - 1, 8);
    if (lit) P.px(ctx, rx - rw + 2, ry - 1, 7);
  }
  /* stalagmites growing to meet their ceiling pen-pals */
  for (const [mx, mh] of [[96, 18], [288, 24], [44, 14]]) {
    P.poly(ctx, [[mx - 6, 200], [mx, 200 - mh - 60], [mx + 6, 200]], 8);
    P.poly(ctx, [[mx, 200 - mh - 60], [mx + 6, 200], [mx + 1, 200]], 0);
    if (lit) P.line(ctx, mx - 4, 196, mx - 1, 200 - mh - 56, 6, 1);
  }
  /* an old burnt-out torch stub in a wall ring — someone ran out of light here */
  P.rect(ctx, 50, 96, 3, 12, 6);
  P.px(ctx, 51, 95, 8); P.px(ctx, 51, 94, 0);      // cold charred tip
  P.circle(ctx, 51, 104, 3, 2, 7);                 // iron ring

  /* ---------- the jam crate (hotspot [58,138,42,32]) ---------- */
  P.circle(ctx, 79, 172, 24, 5, 0);                // ground shadow
  P.rect(ctx, 58, 144, 42, 26, 6);                 // crate body
  P.dither(ctx, 58, 144, 42, 26, 6, 0);            // rough planks in half-dark
  P.rect(ctx, 58, 144, 42, 2, 7); P.rect(ctx, 58, 168, 42, 2, 0);
  P.line(ctx, 71, 144, 71, 170, 0, 1); P.line(ctx, 86, 144, 86, 170, 0, 1); // plank seams
  P.rect(ctx, 58, 144, 2, 26, 0);                  // shaded left edge
  P.px(ctx, 60, 146, 8); P.px(ctx, 97, 167, 8);    // nail heads
  /* a red stenciled "label" band — squiggles only, text via the read command */
  P.rect(ctx, 63, 152, 32, 8, 15);
  P.rect(ctx, 65, 154, 9, 2, 4); P.rect(ctx, 77, 154, 6, 2, 4); P.rect(ctx, 86, 154, 7, 2, 4);
  P.rect(ctx, 67, 158, 12, 1, 4); P.rect(ctx, 82, 158, 9, 1, 4);
  /* jam jars peeking over the open top, one tipped over */
  for (let i = 0; i < 3; i++) {
    P.rect(ctx, 64 + i * 11, 138, 7, 7, 4);        // jar of suspicious red
    P.rect(ctx, 64 + i * 11, 138, 7, 2, 7);        // tin lid
    if (lit) P.px(ctx, 65 + i * 11, 141, 12);      // glassy glint
  }
  P.circle(ctx, 104, 168, 4, 3, 4);                // the escapee jar, on its side
  P.rect(ctx, 107, 166, 3, 4, 7);
  P.dither(ctx, 98, 171, 10, 3, 4, 0);             // leaked jam. or "jam".

  /* ---------- the key glint (hotspot [252,162,14,10]) ---------- */
  P.dither(ctx, 250, 168, 18, 4, 8, 0);            // rubble bed it half-sits in
  P.circle(ctx, 256, 166, 3, 3, 6);                // rusty bow (ring) of the key
  P.circle(ctx, 256, 166, 1, 1, 0);                // hole in the bow
  P.rect(ctx, 259, 165, 6, 2, 6);                  // shaft
  P.rect(ctx, 264, 166, 1, 3, 6); P.rect(ctx, 262, 166, 1, 2, 6); // teeth
  P.px(ctx, 260, 165, 4); P.px(ctx, 257, 163, 4);  // rust freckles
  /* the metallic wink that caught Red's eye — twinkles on its own beat */
  if (Math.sin(t * 5) > 0.1) {
    P.px(ctx, 258, 164, 15);
    P.px(ctx, 257, 164, 14); P.px(ctx, 259, 164, 14); P.px(ctx, 258, 163, 14); P.px(ctx, 258, 165, 14);
  }

  /* ---------- the cat pawprints (hotspot [180,170,40,12]) ---------- */
  /* small four-toed prints trotting toward the dark passage, right and up */
  for (let i = 0; i < 5; i++) {
    const px2 = 182 + i * 8, py2 = 178 - (i % 2) * 4;
    P.px(ctx, px2, py2, 0); P.px(ctx, px2 + 1, py2, 0);          // pad
    P.px(ctx, px2 - 1, py2 - 2, 0); P.px(ctx, px2, py2 - 3, 0);  // toes
    P.px(ctx, px2 + 1, py2 - 2, 0); P.px(ctx, px2 + 2, py2 - 2, 0);
  }
  /* the trail continues faintly toward the passage mouth */
  P.px(ctx, 224, 168, 0); P.px(ctx, 230, 164, 0); P.px(ctx, 236, 160, 0);

  /* ---------- torch smoke curling near the ceiling ---------- */
  for (let i = 0; i < 4; i++) {
    const sy2 = 116 - ((t * 10 + i * 16) % 88);
    const sx2 = 160 + Math.sin(t * 1.6 + i * 2.1) * (6 + i * 2);
    if (sy2 > 8) { P.px(ctx, sx2, sy2, 8); P.px(ctx, sx2 + 2, sy2 - 3, 7); }
  }
  /* one last cold draft from the depths: dust motes drifting left */
  const dm = (t * 22) % 70;
  P.px(ctx, 270 - dm, 96 + Math.sin(t * 4) * 3, 7);
});
