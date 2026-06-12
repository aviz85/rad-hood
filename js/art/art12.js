/* art12 — Grandma's living room (scene12, horizon 120)
   A too-perfect grandma parlor with something deeply wrong underneath.
   Hotspot rects (binding): certificates [120,56,60,44] · jamshelf [254,70,44,60]
   oldphone [98,118,20,22] · cellar_door [40,92,32,76] · exit_door [286,94,30,74]
   Grandma is a sprite (pos [217,172]) — not drawn here. */
RH.registerArt('art12', function (ctx, P, t) {
  /* ---------- wall (down to horizon 120): sweet rose wallpaper ---------- */
  P.rect(ctx, 0, 0, 320, 120, 13);                 // pink plaster wall
  P.rect(ctx, 0, 0, 320, 5, 15);                   // white ceiling cornice
  P.line(ctx, 0, 5, 319, 5, 7, 1);                 // cornice shadow line
  // wallpaper motif: tidy little rose buds in a strict grid (too tidy)
  for (let wy = 16; wy < 104; wy += 18) {
    for (let wx = 8 + ((wy / 18) % 2) * 12; wx < 318; wx += 24) {
      P.px(ctx, wx, wy, 4);                        // rose bud
      P.px(ctx, wx + 1, wy, 12);
      P.px(ctx, wx, wy + 1, 2);                    // tiny leaf
    }
  }
  // wainscot strip + baseboard
  P.line(ctx, 0, 106, 319, 106, 5, 1);             // magenta trim line
  P.rect(ctx, 0, 114, 320, 6, 15);                 // white baseboard
  P.line(ctx, 0, 114, 319, 114, 7, 1);

  /* ---------- floor (120..200): warm wooden planks ---------- */
  P.rect(ctx, 0, 120, 320, 80, 6);
  P.dither(ctx, 0, 120, 320, 5, 6, 8);             // shadow at the wall base
  const rows = [128, 137, 148, 161, 176, 192];     // plank seams, perspective spacing
  for (let i = 0; i < rows.length; i++) P.line(ctx, 0, rows[i], 319, rows[i], 8, 1);
  for (let i = -3; i <= 3; i++) {                  // converging plank joints
    P.line(ctx, 160 + i * 44, 120, 160 + i * 88, 200, 8, 1);
  }
  P.px(ctx, 70, 132, 8); P.px(ctx, 250, 156, 8);   // wood knots
  P.px(ctx, 132, 188, 8);
  P.dither(ctx, 0, 194, 320, 6, 6, 8);             // darker foreground edge

  /* ---------- heavy basement door on the left — hotspot [40,92,32,76] ---------- */
  P.rect(ctx, 36, 88, 40, 84, 8);                  // stone-gray frame, oddly thick
  P.line(ctx, 36, 88, 75, 88, 0, 1);
  P.line(ctx, 36, 88, 36, 171, 0, 1);
  P.rect(ctx, 40, 92, 32, 76, 6);                  // heavy plank door leaf
  P.line(ctx, 48, 92, 48, 167, 8, 1);              // vertical planks
  P.line(ctx, 56, 92, 56, 167, 8, 1);
  P.line(ctx, 64, 92, 64, 167, 8, 1);
  P.rect(ctx, 40, 100, 32, 4, 8);                  // iron bands
  P.rect(ctx, 40, 130, 32, 4, 8);
  P.rect(ctx, 40, 156, 32, 4, 8);
  P.px(ctx, 43, 101, 7); P.px(ctx, 68, 101, 7);    // rivets catching light
  P.px(ctx, 43, 131, 7); P.px(ctx, 68, 131, 7);
  P.px(ctx, 43, 157, 7); P.px(ctx, 68, 157, 7);
  // big rusty padlock on a hasp
  P.rect(ctx, 60, 118, 4, 6, 7);                   // hasp plate
  P.circle(ctx, 62, 128, 4, 5, 6);                 // lock body
  P.rect(ctx, 60, 121, 4, 4, 8);                   // shackle
  P.px(ctx, 62, 128, 0);                           // keyhole
  P.px(ctx, 62, 130, 0);
  // cold draft glow seeping under the door (faint flicker)
  const seep = (Math.floor(t * 2) % 2 === 0) ? 9 : 1;
  P.rect(ctx, 41, 168, 30, 2, seep);
  P.dither(ctx, 38, 170, 36, 3, 1, 6);
  // scratch marks low on the door... probably the cat. probably.
  P.line(ctx, 44, 146, 47, 152, 8, 1);
  P.line(ctx, 47, 146, 50, 152, 8, 1);
  P.line(ctx, 50, 146, 53, 152, 8, 1);
  // "preserves" doily nailed over the lintel — overcompensating
  P.rect(ctx, 46, 80, 20, 8, 15);
  P.px(ctx, 48, 82, 12); P.px(ctx, 56, 84, 12); P.px(ctx, 62, 82, 12);

  /* ---------- certificate wall — hotspot [120,56,60,44] ---------- */
  // four proud frames hung with surgical symmetry
  P.rect(ctx, 122, 58, 26, 19, 6);                 // frame A (wood)
  P.rect(ctx, 124, 60, 22, 15, 15);
  P.line(ctx, 126, 63, 143, 63, 8, 1);             // certificate text scribbles
  P.line(ctx, 126, 66, 141, 66, 8, 1);
  P.line(ctx, 126, 69, 143, 69, 8, 1);
  P.circle(ctx, 142, 72, 2, 2, 14);                // gold seal
  P.rect(ctx, 152, 58, 26, 19, 14);                // frame B (gilded)
  P.rect(ctx, 154, 60, 22, 15, 15);
  P.line(ctx, 156, 63, 173, 63, 8, 1);
  P.line(ctx, 156, 66, 171, 66, 8, 1);
  P.circle(ctx, 158, 72, 2, 2, 4);                 // red ribbon seal
  P.line(ctx, 157, 74, 156, 77, 4, 1);
  P.line(ctx, 159, 74, 160, 77, 4, 1);
  P.rect(ctx, 122, 80, 26, 18, 14);                // frame C
  P.rect(ctx, 124, 82, 22, 14, 15);
  P.line(ctx, 126, 85, 143, 85, 8, 1);
  P.line(ctx, 126, 88, 139, 88, 8, 1);
  P.line(ctx, 126, 91, 142, 91, 8, 1);
  P.rect(ctx, 152, 80, 26, 18, 6);                 // frame D — hangs a hair crooked
  P.rect(ctx, 154, 82, 22, 14, 15);
  P.line(ctx, 156, 86, 173, 85, 8, 1);             // tilted text lines
  P.line(ctx, 156, 89, 171, 88, 8, 1);
  P.circle(ctx, 170, 92, 2, 2, 14);
  P.px(ctx, 135, 56, 8); P.px(ctx, 165, 56, 8);    // nails above the top row

  /* ---------- window between certificates and grandma ---------- */
  P.rect(ctx, 190, 34, 46, 48, 15);                // white frame
  P.rect(ctx, 194, 38, 38, 40, 1);                 // evening sky
  P.bands(ctx, 194, 38, 38, 24, [9, 9, 1]);        // dusk fading down
  // dark treeline of the forest she "has nothing to do with"
  P.poly(ctx, [[194, 66], [202, 56], [210, 64], [218, 54], [226, 63], [232, 58], [232, 78], [194, 78]], 0);
  P.px(ctx, 204, 44, 15); P.px(ctx, 222, 41, 15);  // early stars
  // a crow flaps past the window now and then
  const cw = 194 + Math.floor((t * 9) % 44);
  if (cw < 230) {
    const cf = (Math.floor(t * 6) % 2 === 0) ? 1 : 0;
    P.px(ctx, cw, 46, 0); P.px(ctx, cw - 1, 45 + cf, 0); P.px(ctx, cw + 1, 45 + cf, 0);
  }
  P.rect(ctx, 211, 38, 2, 40, 15);                 // mullions
  P.rect(ctx, 194, 56, 38, 2, 15);
  // lace curtains with a gentle sway — spotless, of course
  const sway = Math.round(Math.sin(t * 1.3) * 1);
  P.poly(ctx, [[191, 39], [198, 39], [196 + sway, 60], [199 + sway, 80], [191, 80]], 15);
  P.poly(ctx, [[235, 39], [228, 39], [230 - sway, 60], [227 - sway, 80], [235, 80]], 15);
  P.px(ctx, 194, 50, 7); P.px(ctx, 232, 50, 7);    // curtain fold hints
  P.rect(ctx, 188, 82, 50, 4, 15);                 // sill
  P.line(ctx, 188, 86, 237, 86, 7, 1);
  // potted geranium on the sill, suspiciously thriving
  P.rect(ctx, 196, 76, 7, 6, 6);
  P.rect(ctx, 197, 71, 5, 5, 2);
  P.px(ctx, 197, 70, 4); P.px(ctx, 200, 69, 12); P.px(ctx, 202, 71, 4);

  /* ---------- jam jar shelf — hotspot [254,70,44,60] ---------- */
  P.rect(ctx, 252, 68, 48, 64, 6);                 // wooden cabinet body
  P.line(ctx, 252, 68, 299, 68, 14, 1);            // top highlight
  P.line(ctx, 252, 131, 299, 131, 8, 1);
  P.rect(ctx, 256, 72, 40, 56, 0);                 // dark interior
  P.rect(ctx, 256, 90, 40, 3, 6);                  // shelf boards
  P.rect(ctx, 256, 110, 40, 3, 6);
  // top row: red jam, lids glinting
  const jx = [259, 272, 285];
  for (let i = 0; i < 3; i++) {
    P.rect(ctx, jx[i], 78, 9, 12, 4);              // jar of red goo
    P.rect(ctx, jx[i], 76, 9, 3, 7);               // tin lid
    P.px(ctx, jx[i] + 1, 80, 12);                  // glass shine
    P.rect(ctx, jx[i] + 2, 83, 5, 4, 15);          // little label
  }
  // middle row: magenta "special batch" + one jar that is just... wrong
  P.rect(ctx, 259, 98, 9, 11, 5);
  P.rect(ctx, 259, 96, 9, 3, 7);
  P.rect(ctx, 261, 101, 5, 4, 15);
  P.rect(ctx, 272, 98, 9, 11, 5);
  P.rect(ctx, 272, 96, 9, 3, 7);
  P.px(ctx, 273, 100, 13);
  P.rect(ctx, 285, 98, 9, 11, 2);                  // the green one. nobody asks.
  P.rect(ctx, 285, 96, 9, 3, 7);
  const blup = Math.floor(t * 2) % 3;              // it bubbles, slowly
  P.px(ctx, 288 + blup, 101, 10);
  // bottom row: sealed jars wrapped in cute checkered cloth
  for (let i = 0; i < 3; i++) {
    P.rect(ctx, jx[i], 118, 9, 10, 4);
    P.rect(ctx, jx[i] - 1, 115, 11, 4, 15);        // cloth cap
    P.px(ctx, jx[i] + 1, 116, 4); P.px(ctx, jx[i] + 5, 116, 4);
  }
  P.dither(ctx, 252, 132, 48, 4, 8, 6);            // floor shadow under cabinet

  /* ---------- side table + antique phone — hotspot [98,118,20,22] ---------- */
  P.rect(ctx, 90, 138, 36, 5, 6);                  // round-ish table top
  P.line(ctx, 90, 138, 125, 138, 14, 1);
  P.rect(ctx, 92, 143, 4, 22, 6);                  // legs
  P.rect(ctx, 120, 143, 4, 22, 6);
  P.line(ctx, 94, 150, 122, 150, 8, 1);            // stretcher bar
  P.rect(ctx, 94, 136, 28, 2, 15);                 // doily under the phone (obviously)
  P.px(ctx, 95, 135, 15); P.px(ctx, 120, 135, 15);
  // the antique phone itself, inside [98,118,20,22]
  P.rect(ctx, 100, 128, 16, 10, 0);                // tapered black body
  P.poly(ctx, [[100, 128], [115, 128], [112, 122], [103, 122]], 0);
  P.circle(ctx, 108, 132, 4, 4, 7);                // rotary dial
  P.circle(ctx, 108, 132, 2, 2, 8);
  P.px(ctx, 105, 130, 0); P.px(ctx, 111, 130, 0);  // finger holes
  P.px(ctx, 105, 134, 0); P.px(ctx, 111, 134, 0);
  P.rect(ctx, 99, 119, 18, 3, 0);                  // handset resting on top
  P.circle(ctx, 100, 120, 2, 2, 0);
  P.circle(ctx, 116, 120, 2, 2, 0);
  P.px(ctx, 101, 119, 7); P.px(ctx, 115, 119, 7);  // handset highlights
  P.line(ctx, 116, 124, 121, 136, 8, 1);           // curly cord
  P.px(ctx, 120, 130, 8); P.px(ctx, 118, 133, 8);
  P.dither(ctx, 90, 165, 38, 3, 8, 6);             // table shadow

  /* ---------- grandma's armchair (left of where she stands) ---------- */
  P.dither(ctx, 142, 168, 52, 4, 8, 6);            // floor shadow
  P.rect(ctx, 146, 124, 44, 26, 5);                // tall floral backrest
  P.line(ctx, 146, 124, 189, 124, 13, 1);
  P.px(ctx, 154, 132, 13); P.px(ctx, 168, 130, 13);// floral upholstery dots
  P.px(ctx, 180, 134, 13); P.px(ctx, 161, 140, 13);
  P.px(ctx, 175, 142, 13);
  P.rect(ctx, 146, 138, 9, 30, 5);                 // armrests
  P.rect(ctx, 181, 138, 9, 30, 5);
  P.line(ctx, 146, 138, 154, 138, 13, 1);
  P.line(ctx, 181, 138, 189, 138, 13, 1);
  P.rect(ctx, 155, 148, 26, 12, 13);               // seat cushion, deeply dented
  P.line(ctx, 158, 153, 178, 153, 5, 1);
  P.rect(ctx, 155, 160, 26, 8, 5);                 // skirt
  P.rect(ctx, 160, 126, 16, 6, 15);                // headrest doily
  P.px(ctx, 162, 132, 15); P.px(ctx, 173, 132, 15);
  // knitting basket beside the chair — needles a bit too sharp
  P.circle(ctx, 134, 176, 9, 6, 6);
  P.circle(ctx, 134, 174, 8, 4, 14);
  P.circle(ctx, 132, 173, 3, 3, 4);                // ball of red yarn
  P.line(ctx, 128, 170, 122, 160, 7, 1);           // gleaming needle 1
  P.line(ctx, 136, 170, 142, 159, 7, 1);           // gleaming needle 2
  P.px(ctx, 122, 160, 15); P.px(ctx, 142, 159, 15);
  P.line(ctx, 132, 173, 120, 182, 4, 1);           // loose yarn thread

  /* ---------- cuckoo clock with swinging pendulum ---------- */
  P.poly(ctx, [[86, 50], [106, 50], [96, 40]], 6); // little roof
  P.rect(ctx, 88, 50, 16, 16, 6);                  // body
  P.circle(ctx, 96, 57, 5, 5, 15);                 // face
  P.px(ctx, 96, 53, 0); P.px(ctx, 96, 61, 0);      // 12 and 6
  P.px(ctx, 92, 57, 0); P.px(ctx, 100, 57, 0);     // 9 and 3
  P.line(ctx, 96, 57, 96, 54, 0, 1);               // hour hand
  P.line(ctx, 96, 57, 99, 58, 0, 1);               // minute hand
  P.px(ctx, 96, 48, 14);                           // cuckoo door knob
  const pend = Math.round(Math.sin(t * 3) * 4);
  P.line(ctx, 94, 66, 94 + pend, 76, 8, 1);        // pendulum
  P.circle(ctx, 94 + pend, 78, 2, 2, 14);
  P.line(ctx, 99, 66, 99 - pend, 74, 8, 1);        // second weight chain
  P.px(ctx, 99 - pend, 75, 14);

  /* ---------- ceiling lamp with rosy shade ---------- */
  P.line(ctx, 226, 0, 226, 10, 8, 1);
  P.poly(ctx, [[216, 22], [236, 22], [231, 11], [221, 11]], 12);
  P.line(ctx, 217, 22, 235, 22, 15, 1);            // fringe highlight
  P.px(ctx, 226, 23, 14);                          // warm bulb tip
  P.dither(ctx, 219, 24, 15, 3, 14, 13);           // light haze

  /* ---------- tea trolley with the famous jam tasting set ---------- */
  P.rect(ctx, 226, 146, 34, 4, 6);                 // trolley top
  P.line(ctx, 226, 146, 259, 146, 14, 1);
  P.rect(ctx, 228, 150, 3, 16, 8);                 // legs
  P.rect(ctx, 255, 150, 3, 16, 8);
  P.circle(ctx, 229, 168, 2, 2, 0);                // wheels
  P.circle(ctx, 256, 168, 2, 2, 0);
  P.rect(ctx, 230, 140, 8, 6, 15);                 // teapot body
  P.poly(ctx, [[238, 141], [241, 142], [238, 144]], 15); // spout
  P.px(ctx, 233, 139, 15);                         // lid knob
  // steam curling from the pot
  const sphase = Math.floor(t * 3) % 3;
  P.px(ctx, 240, 134 - sphase, 7);
  P.px(ctx, 241, 131 - sphase, 7);
  P.rect(ctx, 245, 142, 6, 4, 15);                 // a single waiting teacup
  P.px(ctx, 251, 143, 15);                         // its handle
  P.rect(ctx, 252, 141, 5, 5, 4);                  // the "tasting" jam jar. no.
  P.px(ctx, 253, 140, 7);
  P.dither(ctx, 226, 170, 36, 3, 8, 6);            // trolley shadow

  /* ---------- exit door on the right — hotspot [286,94,30,74] ---------- */
  P.rect(ctx, 284, 92, 36, 80, 7);                 // frame
  P.line(ctx, 284, 92, 284, 171, 8, 1);
  P.rect(ctx, 286, 94, 30, 74, 6);                 // door leaf
  P.line(ctx, 286, 94, 315, 94, 14, 1);            // top highlight
  P.rect(ctx, 290, 100, 22, 24, 6);                // upper panel
  P.line(ctx, 290, 100, 311, 100, 8, 1);
  P.line(ctx, 290, 100, 290, 123, 8, 1);
  P.line(ctx, 290, 123, 311, 123, 14, 1);
  P.rect(ctx, 290, 132, 22, 28, 6);                // lower panel
  P.line(ctx, 290, 132, 311, 132, 8, 1);
  P.line(ctx, 290, 132, 290, 159, 8, 1);
  P.line(ctx, 290, 159, 311, 159, 14, 1);
  P.circle(ctx, 291, 128, 2, 2, 14);               // brass knob, polished daily
  P.px(ctx, 291, 127, 15);
  // heart-shaped wreath on the door — aggressive coziness
  P.circle(ctx, 298, 108, 4, 4, 2);
  P.circle(ctx, 305, 108, 4, 4, 2);
  P.poly(ctx, [[294, 110], [309, 110], [301, 118]], 2);
  P.px(ctx, 297, 106, 4); P.px(ctx, 305, 107, 4);  // tiny berries
  P.px(ctx, 301, 112, 4);
  P.rect(ctx, 282, 172, 40, 6, 12);                // welcome mat
  P.dither(ctx, 284, 173, 36, 4, 12, 4);
  // four perfectly aligned bolts on the inside of the "welcoming" door
  P.px(ctx, 288, 97, 8); P.px(ctx, 313, 97, 8);
  P.px(ctx, 288, 164, 8); P.px(ctx, 313, 164, 8);

  /* ---------- oval rug at the center of the room ---------- */
  P.circle(ctx, 170, 184, 56, 13, 4);              // braided oval rug
  P.circle(ctx, 170, 184, 46, 10, 12);
  P.circle(ctx, 170, 184, 34, 7, 4);
  P.circle(ctx, 170, 184, 22, 5, 14);
  P.circle(ctx, 170, 184, 10, 3, 12);
  P.px(ctx, 124, 188, 4); P.px(ctx, 217, 180, 4);  // frayed edge stitches
  // one floorboard near the rug edge that doesn't quite match. hm.
  P.rect(ctx, 96, 178, 18, 4, 8);
  P.px(ctx, 98, 179, 0); P.px(ctx, 111, 180, 0);   // pry marks

  /* ---------- small wall details ---------- */
  // embroidered "home sweet home" sampler (shapes only) left of certificates
  P.rect(ctx, 84, 88, 22, 14, 15);
  P.rect(ctx, 85, 89, 20, 12, 7);
  P.rect(ctx, 86, 90, 18, 10, 15);
  P.px(ctx, 90, 93, 4); P.px(ctx, 92, 93, 4);      // cross-stitch heart
  P.px(ctx, 91, 94, 4);
  P.line(ctx, 95, 96, 101, 96, 5, 1);              // stitched motto squiggle
  // power outlet near the trolley — antique phone, modern paranoia
  P.rect(ctx, 244, 108, 6, 5, 7);
  P.px(ctx, 245, 110, 0); P.px(ctx, 248, 110, 0);
  // faint dust motes drifting in the lamp light
  const ma = t * 0.8;
  P.px(ctx, 222 + Math.round(Math.cos(ma) * 8), 40 + Math.round(Math.sin(ma * 1.7) * 6), 7);
  P.px(ctx, 230 + Math.round(Math.sin(ma) * 6), 52 + Math.round(Math.cos(ma * 1.3) * 5), 7);
});
