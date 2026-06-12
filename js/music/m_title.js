// m_title — heroic-comic title fanfare for "Red Riding Hood and the Vegetarian Wolf".
// 120 bpm, C major with a sly chromatic twist (Eb / F# "wrong" notes — the
// fairy tale is not what it seems). 32 beats, loops cleanly.
// Structure: A (call) / A' (answer) / B (the twist) / coda (big finish).
// All four voices sum to exactly 32 beats.
RH.registerMusic('m_title', {
  bpm: 120,
  voices: [
    // Voice 1 — lead melody (square): bold trumpet-like fanfare.
    {
      wave: 'square',
      vol: 0.12,
      notes: [
        // A — heroic call (8 beats)
        ['C4', 0.5], ['C4', 0.5], ['C4', 0.5], ['E4', 0.5],
        ['G4', 1], ['E4', 0.5], ['G4', 0.5],
        ['C5', 2], ['B4', 0.5], ['G4', 0.5], ['A4', 1],
        // A' — answer, reaching higher (8 beats)
        ['C4', 0.5], ['C4', 0.5], ['C4', 0.5], ['E4', 0.5],
        ['G4', 1], ['A4', 0.5], ['B4', 0.5],
        ['C5', 1.5], [0, 0.5], ['D5', 0.5], ['C5', 0.5], ['B4', 0.5], ['G4', 0.5],
        // B — the twist: Eb5 sneaks in like Grandma's smile (8 beats)
        ['F4', 0.5], ['F4', 0.5], ['A4', 1], ['F4', 0.5], ['A4', 0.5], ['C5', 1],
        ['Eb5', 1], ['D5', 0.5], ['C5', 0.5], ['B4', 1], ['G4', 1],
        // Coda — strut to the finish, cheeky F# pickup (8 beats)
        ['C5', 0.5], [0, 0.5], ['C5', 0.5], [0, 0.5],
        ['G4', 0.5], ['A4', 0.5], ['B4', 0.5], ['C5', 0.5],
        ['F#4', 0.5], ['G4', 0.5], ['E5', 1], ['C5', 2],
      ],
    },
    // Voice 2 — harmony pad (square, soft): sustained chord tones.
    {
      wave: 'square',
      vol: 0.06,
      notes: [
        // A (8 beats)
        ['E3', 2], ['C4', 2], ['E4', 2], ['G3', 1], ['F3', 1],
        // A' (8 beats)
        ['E3', 2], ['C4', 2], ['F3', 2], ['E4', 1], ['G3', 1],
        // B — Ab supports the Eb twist (8 beats)
        ['A3', 2], ['F3', 2], ['Ab3', 2], ['G3', 2],
        // Coda (8 beats)
        ['E4', 2], ['G3', 2], ['D4', 2], ['E4', 2],
      ],
    },
    // Voice 3 — bass (triangle): marching root motion.
    {
      wave: 'triangle',
      vol: 0.16,
      notes: [
        // A (8 beats)
        ['C2', 1], ['G2', 1], ['C2', 1], ['G2', 1],
        ['C3', 1], ['G2', 1], ['A2', 1], ['F2', 1],
        // A' (8 beats)
        ['C2', 1], ['G2', 1], ['C2', 1], ['G2', 1],
        ['A2', 1], ['B2', 1], ['C3', 1], ['G2', 1],
        // B — Ab under the wrong note (8 beats)
        ['F2', 1], ['F2', 1], ['F2', 1], ['F2', 1],
        ['Ab2', 1], ['Ab2', 1], ['G2', 1], ['G2', 1],
        // Coda — V-I landing (8 beats)
        ['C2', 1], ['C2', 1], ['G2', 1], ['G2', 1],
        ['D2', 1], ['G2', 1], ['C2', 2],
      ],
    },
    // Voice 4 — drums (noise): parade snare with a fill at the end.
    {
      wave: 'noise',
      vol: 0.05,
      notes: [
        // A (8 beats): march pattern x2
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5],
        // A' (8 beats)
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], ['x', 0.5], ['x', 0.5], ['x', 0.5],
        // B (8 beats): lighter, lets the twist breathe
        ['x', 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5],
        // Coda (8 beats): march back in, snare roll into the downbeat
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.25], ['x', 0.25], ['x', 0.25], ['x', 0.25], ['x', 1],
      ],
    },
  ],
});
