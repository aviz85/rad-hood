/* art02 — Neighborhood street & kiosk (scene02)
   Horizon at y=122. Hotspot rects (binding):
     kioskman [118,96,38,72]  (sprite drawn by engine — keep area clear-ish behind counter)
     kiosk    [96,62,96,108]
     poster   [206,84,30,38]
     trash    [44,148,22,32]
     laundry  [240,40,70,30]
*/
RH.registerArt('art02', function (ctx, P, t) {
  /* ===== sky ===== */
  P.bands(ctx, 0, 0, 320, 70, [9, 9, 11, 11]);
  P.dither(ctx, 0, 30, 320, 8, 9, 11);            // soft transition band
  P.rect(ctx, 0, 70, 320, 52, 11);                // pale lower sky behind blocks

  /* sun, top-left, with a soft halo */
  P.circle(ctx, 36, 22, 11, 11, 14);
  P.circle(ctx, 36, 22, 6, 6, 15);

  /* drifting cloud (slow, wraps around) */
  var cx = ((t * 6) % 380) - 30;
  P.circle(ctx, cx, 18, 14, 5, 15);
  P.circle(ctx, cx + 12, 21, 10, 4, 15);
  P.circle(ctx, cx - 10, 21, 9, 4, 7);

  /* a bird flapping across the sky */
  var bx = ((t * 26) % 400) - 40;
  var by = 34 + Math.round(Math.sin(t * 3) * 2);
  var flap = (Math.floor(t * 6) % 2) ? -2 : 1;
  P.line(ctx, bx - 3, by + flap, bx, by, 0, 1);
  P.line(ctx, bx, by, bx + 3, by + flap, 0, 1);

  /* ===== distant housing blocks (skyline) ===== */
  P.rect(ctx, 150, 56, 50, 66, 8);                // far block between the near ones
  for (var fy = 0; fy < 4; fy++)
    for (var fx = 0; fx < 4; fx++)
      P.rect(ctx, 155 + fx * 11, 62 + fy * 14, 5, 7, (fx + fy) % 3 ? 1 : 11);
  P.rect(ctx, 150, 52, 50, 4, 7);                 // roof slab
  P.line(ctx, 160, 52, 160, 44, 0, 1);            // antenna
  P.line(ctx, 156, 46, 164, 46, 0, 1);

  /* ===== left housing block (shikun) ===== */
  P.rect(ctx, 0, 18, 96, 104, 7);
  P.rect(ctx, 0, 18, 96, 5, 8);                   // roof edge
  P.dither(ctx, 0, 110, 96, 12, 7, 8);            // grime near street level
  for (var ly = 0; ly < 3; ly++) {
    for (var lx = 0; lx < 4; lx++) {
      var wx = 8 + lx * 22, wy = 32 + ly * 28;
      P.rect(ctx, wx, wy, 14, 18, 8);             // window recess
      P.rect(ctx, wx + 1, wy + 1, 12, 16, 1);     // glass
      P.rect(ctx, wx + 2, wy + 2, 4, 6, 9);       // sky reflection
      P.line(ctx, wx, wy + 9, wx + 13, wy + 9, 7, 1);  // sill bar
    }
  }
  P.rect(ctx, 30, 60, 14, 8, 7);                  // AC unit on a window
  P.rect(ctx, 31, 61, 12, 6, 8);
  P.line(ctx, 33, 62, 33, 66, 7, 1);
  P.rect(ctx, 36, 68, 2, 4, 11);                  // AC drip streak
  /* rooftop solar heater + antenna */
  P.rect(ctx, 8, 10, 18, 8, 8);
  P.poly(ctx, [[8, 10], [26, 10], [22, 4], [12, 4]], 7);
  P.line(ctx, 70, 18, 70, 2, 0, 1);
  P.line(ctx, 64, 6, 76, 6, 0, 1);
  P.line(ctx, 66, 10, 74, 10, 0, 1);

  /* ===== right housing block ===== */
  P.rect(ctx, 200, 24, 120, 98, 7);
  P.rect(ctx, 200, 24, 120, 5, 8);
  P.dither(ctx, 200, 112, 120, 10, 7, 8);
  /* windows on right block — one low row (laundry hangs over the upper floors);
     keep clear of the poster rect 206..236 x 84..122 */
  P.rect(ctx, 248, 78, 14, 18, 8); P.rect(ctx, 249, 79, 12, 16, 1); P.rect(ctx, 250, 80, 4, 6, 9);
  P.rect(ctx, 276, 78, 14, 18, 8); P.rect(ctx, 277, 79, 12, 16, 1); P.rect(ctx, 278, 80, 4, 6, 9);
  P.rect(ctx, 300, 78, 14, 18, 8); P.rect(ctx, 301, 79, 12, 16, 1); P.rect(ctx, 302, 80, 4, 6, 9);
  P.rect(ctx, 276, 100, 14, 8, 7);                // AC unit
  P.rect(ctx, 277, 101, 12, 6, 8);

  /* ===== laundry line — hotspot [240,40,70,30] ===== */
  var sway = Math.round(Math.sin(t * 1.6) * 2);
  P.line(ctx, 240, 46, 310, 44, 8, 1);            // the line itself
  /* red shirt */
  P.rect(ctx, 244 + sway, 46, 10, 12, 4);
  P.rect(ctx, 242 + sway, 46, 3, 5, 4);
  P.rect(ctx, 253 + sway, 46, 3, 5, 4);
  P.px(ctx, 246, 45, 15); P.px(ctx, 252, 45, 15); // clothespins
  /* white undershirt */
  P.rect(ctx, 262 + sway, 45, 9, 13, 15);
  P.dither(ctx, 262 + sway, 54, 9, 4, 15, 7);
  P.px(ctx, 264, 44, 12); P.px(ctx, 269, 44, 12);
  /* blue pants */
  P.rect(ctx, 278 + sway, 45, 10, 6, 1);
  P.rect(ctx, 278 + sway, 51, 4, 12, 1);
  P.rect(ctx, 284 + sway, 51, 4, 12, 1);
  P.px(ctx, 280, 44, 15); P.px(ctx, 286, 44, 15);
  /* pink sock — comically oversized (whose feet are THAT big?) */
  P.px(ctx, 297 + sway, 43, 15);                  // clothespin
  P.rect(ctx, 294 + sway, 44, 7, 12, 13);
  P.rect(ctx, 294 + sway, 56, 11, 4, 13);
  P.dither(ctx, 295 + sway, 52, 5, 3, 13, 5);     // worn heel shading

  /* ===== ground: sidewalk + road ===== */
  P.rect(ctx, 0, 122, 320, 78, 8);                // base asphalt
  P.dither(ctx, 0, 122, 320, 16, 7, 8);           // sun-bleached sidewalk strip
  P.line(ctx, 0, 138, 320, 138, 7, 1);            // curb
  P.line(ctx, 0, 140, 320, 140, 0, 1);            // curb shadow
  P.dither(ctx, 0, 141, 320, 59, 8, 0);           // road texture
  /* sidewalk paving joints */
  for (var sj = 0; sj < 320; sj += 32) P.line(ctx, sj, 122, sj - 4, 138, 7, 1);
  /* faded lane marking */
  for (var lm = 0; lm < 320; lm += 40) P.rect(ctx, lm, 172, 18, 3, 7);
  /* manhole cover */
  P.circle(ctx, 282, 186, 12, 5, 7);
  P.circle(ctx, 282, 186, 9, 3, 8);
  P.line(ctx, 275, 186, 289, 186, 0, 1);
  /* cracks in the asphalt */
  P.line(ctx, 20, 160, 34, 168, 0, 1);
  P.line(ctx, 34, 168, 30, 178, 0, 1);
  P.line(ctx, 210, 150, 226, 158, 0, 1);
  /* squashed soda can + bottle cap — street ambience */
  P.rect(ctx, 168, 188, 7, 3, 12);
  P.px(ctx, 170, 187, 15);
  P.px(ctx, 240, 156, 14);

  /* building shadows falling on the sidewalk */
  P.dither(ctx, 0, 122, 60, 8, 8, 0);
  P.dither(ctx, 230, 122, 90, 8, 8, 0);

  /* ===== kiosk — hotspot structure [96,62,96,108] ===== */
  /* shadow on the ground first */
  P.dither(ctx, 92, 168, 108, 7, 8, 0);
  /* body */
  P.rect(ctx, 96, 78, 96, 92, 6);                 // brown booth
  P.dither(ctx, 96, 78, 4, 92, 6, 0);             // left edge shading (dithered dark brown)
  P.dither(ctx, 96, 78, 96, 6, 6, 4);             // weathered top of facade
  /* counter window opening (kioskman sprite stands here: [118,96,38,72]) */
  P.rect(ctx, 112, 90, 52, 56, 0);                // dark interior
  P.dither(ctx, 112, 90, 52, 10, 0, 8);           // faint interior depth
  P.rect(ctx, 108, 144, 60, 8, 7);                // counter slab
  P.line(ctx, 108, 151, 168, 151, 8, 1);
  /* goods on the counter */
  P.rect(ctx, 110, 138, 8, 6, 12);                // gum jar
  P.px(ctx, 113, 137, 15);
  P.rect(ctx, 158, 136, 8, 8, 14);                // candy box
  P.line(ctx, 158, 139, 165, 139, 4, 1);
  /* interior shelf with bottles, above the owner's head */
  P.rect(ctx, 112, 90, 52, 3, 6);
  P.rect(ctx, 116, 83, 5, 9, 2);  P.px(ctx, 118, 82, 2);   // green bottle
  P.rect(ctx, 124, 83, 5, 9, 4);  P.px(ctx, 126, 82, 4);   // red bottle
  P.rect(ctx, 132, 83, 5, 9, 11); P.px(ctx, 134, 82, 11);  // soda
  P.rect(ctx, 140, 84, 10, 8, 7); P.line(ctx, 141, 86, 149, 86, 8, 1); // newspaper stack
  P.rect(ctx, 153, 83, 6, 9, 13);                 // pink snack bag
  /* right side panel: snack rack */
  P.dither(ctx, 170, 92, 18, 54, 6, 8);
  for (var sn = 0; sn < 4; sn++) {
    P.rect(ctx, 172, 96 + sn * 13, 14, 9, [14, 12, 10, 13][sn]);
    P.line(ctx, 172, 96 + sn * 13, 186, 96 + sn * 13, 0, 1);
  }
  /* left side panel: ice-cream chest sticker */
  P.rect(ctx, 98, 100, 12, 40, 7);
  P.rect(ctx, 99, 102, 10, 16, 11);
  P.circle(ctx, 104, 108, 3, 3, 15);              // ice-cream scoop doodle
  P.poly(ctx, [[101, 110], [107, 110], [104, 117]], 14);
  /* awning — scalloped red/white stripes, kept inside the kiosk rect x 96..192 */
  P.rect(ctx, 96, 62, 96, 16, 4);
  for (var aw = 0; aw < 5; aw++) P.rect(ctx, 96 + aw * 18 + 9, 62, 9, 16, 15);
  for (var sc = 0; sc < 12; sc++)
    P.circle(ctx, 100 + sc * 8, 78, 4, 3, (Math.floor(sc / 2) % 2) ? 15 : 4);
  P.line(ctx, 96, 62, 192, 62, 8, 1);             // awning rail
  P.line(ctx, 98, 78, 98, 90, 8, 1);              // support struts
  P.line(ctx, 190, 78, 190, 90, 8, 1);
  /* bare bulb under the awning — flickers */
  var on = Math.sin(t * 7) > -0.3;
  P.line(ctx, 138, 78, 138, 84, 0, 1);
  P.circle(ctx, 138, 86, 2, 3, on ? 14 : 8);
  if (on) { P.px(ctx, 135, 86, 14); P.px(ctx, 141, 86, 14); P.px(ctx, 138, 90, 14); }
  /* kiosk sign board above the awning — shapes only, no text */
  P.rect(ctx, 108, 50, 72, 11, 14);
  P.line(ctx, 108, 50, 180, 50, 0, 1);
  P.line(ctx, 108, 60, 180, 60, 0, 1);
  P.rect(ctx, 114, 53, 10, 5, 0);                 // blocky "letters"
  P.rect(ctx, 128, 53, 14, 5, 0);
  P.rect(ctx, 146, 53, 8, 5, 0);
  P.rect(ctx, 158, 53, 16, 5, 0);
  /* full, untouched cat food bowl by the kiosk — Matok has been gone a week */
  P.circle(ctx, 186, 166, 6, 2, 12);
  P.circle(ctx, 186, 165, 4, 1, 6);
  P.px(ctx, 185, 164, 7); P.px(ctx, 188, 164, 7); // dry kibble bits
  /* chalk paw doodle next to the bowl */
  P.px(ctx, 196, 168, 15); P.px(ctx, 199, 167, 15); P.px(ctx, 202, 168, 15); P.px(ctx, 199, 171, 15);

  /* ===== missing-cat poster — hotspot [206,84,30,38] ===== */
  P.rect(ctx, 206, 84, 30, 38, 15);               // paper
  P.poly(ctx, [[236, 114], [236, 122], [228, 122]], 7); // curled torn corner
  P.rect(ctx, 206, 84, 30, 2, 7);                 // top tape shading
  P.px(ctx, 208, 85, 11); P.px(ctx, 233, 85, 11); // tape bits
  /* headline scribble */
  P.rect(ctx, 210, 88, 22, 3, 0);
  /* cat face: ears, head, eyes */
  P.circle(ctx, 221, 101, 7, 6, 8);
  P.poly(ctx, [[214, 97], [217, 90], [219, 97]], 8);
  P.poly(ctx, [[223, 97], [226, 90], [228, 97]], 8);
  P.px(ctx, 218, 100, 0); P.px(ctx, 224, 100, 0);
  P.px(ctx, 221, 103, 13);                        // pink nose
  P.line(ctx, 213, 103, 217, 103, 0, 1);          // whiskers
  P.line(ctx, 225, 103, 229, 103, 0, 1);
  /* fine-print scribble lines */
  P.line(ctx, 209, 111, 232, 111, 8, 1);
  P.line(ctx, 209, 114, 228, 114, 8, 1);
  P.line(ctx, 209, 117, 224, 117, 8, 1);

  /* ===== trash can — hotspot [44,148,22,32] ===== */
  P.dither(ctx, 40, 177, 32, 4, 8, 0);            // ground shadow
  P.rect(ctx, 46, 154, 18, 26, 8);                // body
  P.line(ctx, 48, 156, 48, 178, 7, 1);            // ridges
  P.line(ctx, 53, 156, 53, 178, 7, 1);
  P.line(ctx, 58, 156, 58, 178, 7, 1);
  P.rect(ctx, 44, 150, 22, 5, 7);                 // lid, ajar
  P.rect(ctx, 44, 148, 22, 3, 7);
  P.px(ctx, 55, 147, 7);                          // lid handle
  /* (no newspaper here — this can is suspiciously empty; the paper is in scene03) */
  /* banana peel slumped against the can */
  P.poly(ctx, [[40, 178], [46, 174], [45, 180]], 14);
  /* two flies orbiting the can */
  var f1x = 55 + Math.round(Math.cos(t * 5) * 8), f1y = 146 + Math.round(Math.sin(t * 5) * 4);
  var f2x = 55 + Math.round(Math.cos(t * 4 + 2) * 10), f2y = 150 + Math.round(Math.sin(t * 4 + 2) * 5);
  P.px(ctx, f1x, f1y, 0);
  P.px(ctx, f2x, f2y, 0);

  /* ===== street pole with a second, older poster (ambience) ===== */
  P.rect(ctx, 18, 92, 4, 46, 8);
  P.rect(ctx, 17, 90, 6, 3, 7);
  P.rect(ctx, 14, 100, 12, 14, 7);                // faded old flyer
  P.line(ctx, 16, 104, 24, 104, 8, 1);
  P.line(ctx, 16, 108, 22, 108, 8, 1);
  P.dither(ctx, 18, 136, 10, 3, 8, 0);            // pole shadow
});
