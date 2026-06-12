/* art04 — Forest entrance: the neighborhood asphalt dies, the forest begins.
   Dusk mood, last flickering streetlight, big warning sign, abandoned mailbox.
   Horizon at y=118 (walkable ground below). Hotspots painted exactly at spec rects:
     sign    [138,96,44,52]
     trees   [0,30,90,110]
     mailbox [250,140,20,34]                                            */
RH.registerArt('art04', function (ctx, P, t) {
  /* ---------- sky: dusk, darker toward the forest side (right) ---------- */
  P.bands(ctx, 0, 0, 320, 64, [1, 1, 9, 9, 11]);
  P.dither(ctx, 0, 12, 320, 6, 1, 9);            // blend band: deep blue -> light blue
  P.dither(ctx, 0, 38, 320, 6, 9, 11);           // blend band: light blue -> cyan glow
  P.dither(ctx, 240, 0, 80, 56, 1, 0);           // the forest corner of the sky goes dark
  /* low pale sun sinking behind the tree line */
  P.circle(ctx, 210, 52, 12, 12, 14);
  P.dither(ctx, 196, 44, 28, 6, 14, 11);         // shimmering top of the sun disk
  P.rect(ctx, 196, 56, 28, 2, 12);               // last red sliver at the horizon haze

  /* thin violet clouds drifting very slowly */
  const cd = (t * 3) % 340 - 20;
  P.rect(ctx, cd, 18, 46, 3, 5);
  P.rect(ctx, cd + 10, 15, 24, 3, 13);
  P.rect(ctx, ((t * 2) % 340) - 40, 30, 38, 3, 5);

  /* a distant bird circling above the forest — foreshadowing the "walking in circles" bit */
  const bx = 200 + Math.cos(t * 0.9) * 48, by = 26 + Math.sin(t * 1.8) * 9;
  const flap = Math.sin(t * 9) > 0 ? 3 : -1;
  P.line(ctx, bx - 4, by - flap, bx, by, 0, 1);
  P.line(ctx, bx, by, bx + 4, by - flap, 0, 1);

  /* ---------- distant forest wall down to the horizon ---------- */
  P.dither(ctx, 0, 64, 320, 10, 2, 1);           // far canopy against the sky
  P.rect(ctx, 0, 74, 320, 44, 2);
  P.dither(ctx, 0, 74, 320, 44, 2, 0);           // murky depth between the far trunks
  /* jagged silhouette treetops along the canopy edge */
  for (let i = 0; i < 16; i++) {
    const tx = i * 21 + 4;
    P.poly(ctx, [[tx, 76], [tx + 9, 56 + (i * 7) % 12], [tx + 18, 76]], 2);
  }
  /* a few far black trunks peeking through the gloom */
  for (let i = 0; i < 9; i++) P.rect(ctx, 116 + i * 23, 86, 3, 32, 0);

  /* ---------- ground: grass base, the dying asphalt, the dirt path ---------- */
  P.rect(ctx, 0, 118, 320, 82, 2);
  P.dither(ctx, 0, 118, 320, 8, 2, 10);          // lit grass rim right under the horizon
  P.dither(ctx, 200, 130, 120, 70, 2, 0);        // grass darkens toward the forest

  /* asphalt road arriving from the neighborhood (left), in perspective */
  P.poly(ctx, [[0, 122], [128, 122], [104, 200], [0, 200]], 8);
  P.dither(ctx, 0, 122, 124, 6, 8, 7);           // worn light edge at the road's far end
  /* cracked, crumbling end of the asphalt — civilization gives up here */
  P.poly(ctx, [[128, 122], [136, 134], [124, 148], [134, 164], [118, 182], [126, 200], [104, 200]], 8);
  P.dither(ctx, 112, 130, 26, 70, 8, 6);         // asphalt crumbling into dirt
  P.line(ctx, 130, 126, 118, 152, 0, 1);         // long cracks
  P.line(ctx, 118, 152, 128, 178, 0, 1);
  P.line(ctx, 122, 140, 110, 146, 0, 1);
  /* faded center line, the last dashes of it */
  P.rect(ctx, 52, 138, 10, 3, 15);
  P.rect(ctx, 76, 130, 9, 2, 15);
  P.rect(ctx, 24, 152, 12, 4, 7);
  /* loose asphalt chunks scattered past the edge */
  P.rect(ctx, 140, 150, 5, 3, 8); P.rect(ctx, 152, 170, 4, 3, 8); P.rect(ctx, 136, 186, 6, 3, 8);

  /* dirt path continuing right, into the trees (the exit Red needs the map for) */
  P.poly(ctx, [[132, 140], [320, 150], [320, 178], [120, 176]], 6);
  P.dither(ctx, 140, 142, 180, 8, 6, 2);         // grassy upper edge of the path
  P.dither(ctx, 130, 168, 190, 8, 6, 0);         // shadowed lower edge
  /* paw prints heading into the forest... and looping back. Cute. */
  for (let i = 0; i < 5; i++) {
    P.px(ctx, 170 + i * 22, 156 + (i % 2) * 4, 0);
    P.px(ctx, 173 + i * 22, 159 + (i % 2) * 4, 0);
  }
  P.px(ctx, 268, 166, 0); P.px(ctx, 252, 169, 0); P.px(ctx, 236, 165, 0); // ...coming back

  /* grass tufts and fallen leaves on the green */
  const tuft = [[14, 188], [40, 172], [156, 192], [188, 184], [216, 190], [300, 188], [284, 158]];
  for (const [gx, gy] of tuft) {
    P.line(ctx, gx, gy, gx - 2, gy - 5, 10, 1);
    P.line(ctx, gx, gy, gx, gy - 6, 10, 1);
    P.line(ctx, gx, gy, gx + 2, gy - 4, 2, 1);
  }
  P.px(ctx, 150, 134, 14); P.px(ctx, 226, 146, 4); P.px(ctx, 190, 170, 6);
  P.px(ctx, 96, 168, 4); P.px(ctx, 246, 184, 14); P.px(ctx, 64, 180, 6);
  /* one squashed soda can — the neighborhood's farewell gift */
  P.rect(ctx, 84, 176, 7, 4, 12); P.px(ctx, 86, 177, 15);

  /* ---------- the big trees (hotspot rect [0,30,90,110]) ---------- */
  /* three thick trunks with layered canopies, all inside x:0-90 y:30-140 */
  const trunks = [[10, 16], [40, 13], [70, 14]];
  for (const [tx, tw] of trunks) {
    P.rect(ctx, tx, 72, tw, 68, 6);                       // trunk
    P.rect(ctx, tx, 72, 3, 68, 0);                        // dark left edge
    P.dither(ctx, tx + tw - 4, 76, 4, 60, 6, 14);         // sunlit right edge
    P.poly(ctx, [[tx - 4, 140], [tx + 2, 124], [tx + tw - 2, 124], [tx + tw + 4, 140]], 6); // root flare
    P.line(ctx, tx + 5, 84, tx + 4, 130, 0, 1);           // bark groove
  }
  /* canopy masses: dark base, mid green, lit dither top */
  P.circle(ctx, 18, 52, 22, 20, 2);
  P.circle(ctx, 48, 46, 26, 14, 2);
  P.circle(ctx, 74, 54, 16, 20, 2);
  P.circle(ctx, 32, 64, 24, 14, 2);
  P.dither(ctx, 0, 30, 90, 16, 2, 10);                    // dusk light catching the top leaves
  P.dither(ctx, 4, 70, 84, 12, 2, 0);                     // deep shade under the canopy
  /* leaf speckles */
  P.px(ctx, 22, 40, 10); P.px(ctx, 52, 34, 10); P.px(ctx, 70, 42, 10);
  P.px(ctx, 36, 56, 0); P.px(ctx, 60, 60, 0); P.px(ctx, 12, 62, 0);
  /* a knothole staring at you. It is definitely staring. */
  P.circle(ctx, 47, 96, 4, 5, 0);
  P.px(ctx, 46, 95, 14);
  /* canopy shadow pooling on the grass at the trees' feet */
  P.dither(ctx, 0, 140, 96, 14, 2, 0);

  /* ---------- the last streetlight, flickering its goodbye ---------- */
  P.rect(ctx, 104, 70, 3, 76, 8);                         // pole
  P.rect(ctx, 104, 70, 1, 76, 7);                         // lit pole edge
  P.rect(ctx, 98, 64, 16, 7, 8);                          // lamp head
  const lampOn = Math.sin(t * 7) > -0.3 && Math.sin(t * 1.7) > -0.8;
  P.rect(ctx, 100, 71, 12, 3, lampOn ? 14 : 8);           // the bulb itself
  if (lampOn) {
    P.dither(ctx, 96, 74, 20, 8, 14, 2);                  // glow falling off the lamp
    P.circle(ctx, 106, 148, 14, 5, 14);                   // light pool on the ground
    P.dither(ctx, 92, 144, 28, 9, 14, 8);
  }

  /* ---------- the warning sign (hotspot rect [138,96,44,52]) ---------- */
  P.rect(ctx, 157, 122, 6, 26, 6);                        // wooden post, down to y=148
  P.rect(ctx, 157, 122, 2, 26, 0);                        // post shading
  P.rect(ctx, 138, 96, 44, 28, 14);                       // yellow board
  P.rect(ctx, 138, 96, 44, 2, 4); P.rect(ctx, 138, 122, 44, 2, 4); // red frame
  P.rect(ctx, 138, 96, 2, 28, 4); P.rect(ctx, 180, 96, 2, 28, 4);
  P.px(ctx, 141, 99, 8); P.px(ctx, 178, 99, 8);           // nails
  P.px(ctx, 141, 120, 8); P.px(ctx, 178, 120, 8);
  /* wolf pictogram: ears, head, snout — pure menace, zero accuracy */
  P.poly(ctx, [[150, 106], [152, 100], [154, 106]], 0);   // left ear
  P.poly(ctx, [[156, 106], [158, 100], [160, 106]], 0);   // right ear
  P.poly(ctx, [[148, 106], [162, 106], [166, 110], [158, 113], [150, 113]], 0); // head + snout
  P.px(ctx, 152, 108, 14);                                 // one glowing eye
  /* scribbled "text" lines (sign text is delivered via the read command) */
  P.rect(ctx, 144, 116, 32, 2, 0);
  P.rect(ctx, 148, 119, 24, 1, 0);
  P.rect(ctx, 168, 108, 9, 2, 0);
  /* the sign's long evening shadow */
  P.dither(ctx, 163, 146, 26, 5, 2, 0);

  /* ---------- the abandoned mailbox (hotspot rect [250,140,20,34]) ---------- */
  P.rect(ctx, 257, 154, 4, 20, 6);                        // leaning wooden post
  P.rect(ctx, 257, 154, 1, 20, 0);
  P.rect(ctx, 250, 140, 20, 14, 4);                       // rusty box body
  P.dither(ctx, 250, 146, 20, 8, 4, 6);                   // rust eating upward
  P.rect(ctx, 250, 140, 20, 2, 12);                       // top highlight
  P.rect(ctx, 251, 143, 8, 8, 0);                         // dark hollow inside
  P.poly(ctx, [[251, 151], [259, 151], [257, 156], [253, 156]], 8); // door flap hanging open
  P.line(ctx, 268, 142, 268, 150, 4, 1);                  // flag arm folded down for good
  P.rect(ctx, 266, 148, 3, 3, 12);
  /* cobweb across the open slot: nobody writes anymore */
  P.line(ctx, 260, 144, 265, 150, 7, 1);
  P.line(ctx, 262, 142, 262, 150, 7, 1);
  P.dither(ctx, 248, 174, 26, 4, 2, 0);                   // its sad little shadow

  /* ---------- forest fringe on the far right: where scene05 begins ---------- */
  P.rect(ctx, 306, 56, 12, 116, 0);                       // near-black trunk at the edge
  P.rect(ctx, 306, 56, 3, 116, 2);
  P.circle(ctx, 308, 50, 22, 18, 2);
  P.dither(ctx, 296, 36, 24, 18, 2, 0);
  P.dither(ctx, 290, 60, 30, 100, 0, 2);                  // darkness leaking onto the screen
  /* two firefly blinks deep in the dark — or eyes. Probably fireflies. */
  if (Math.sin(t * 2.6) > 0.4) { P.px(ctx, 298, 96, 14); P.px(ctx, 303, 96, 14); }
});
