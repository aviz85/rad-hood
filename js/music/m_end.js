// m_end — victory celebration march for the epilogue (scene14).
// 132 bpm, bright C major, no wrong notes this time — Grandma is in the van,
// Zevik has a restaurant, and the neighborhood is dancing.
// 32 beats, loops cleanly. Structure: A (whistleable hook) / A' (answer up to
// the high E) / B (skipping bridge) / coda (run-down and a big C landing).
// All four voices sum to exactly 32 beats.
RH.registerMusic('m_end', {
  bpm: 132,
  voices: [
    // Voice 1 — lead melody (square): the whistleable victory tune.
    {
      wave: 'square',
      vol: 0.12,
      notes: [
        // A — the hook (8 beats)
        ['G4', 0.5], ['G4', 0.5], ['E4', 0.5], ['G4', 0.5], ['C5', 1], ['G4', 1],
        ['A4', 0.5], ['B4', 0.5], ['C5', 0.5], ['A4', 0.5], ['G4', 2],
        // A' — same opening, answer climbs to the high E (8 beats)
        ['G4', 0.5], ['G4', 0.5], ['E4', 0.5], ['G4', 0.5], ['C5', 1], ['E5', 1],
        ['D5', 0.5], ['C5', 0.5], ['B4', 0.5], ['D5', 0.5], ['C5', 2],
        // B — skipping bridge, down and back up the scale (8 beats)
        ['E5', 1], ['D5', 0.5], ['C5', 0.5], ['B4', 1], ['G4', 1],
        ['A4', 0.5], ['B4', 0.5], ['C5', 0.5], ['D5', 0.5], ['E5', 1], ['G4', 1],
        // Coda — run down from the top, cheeky rest, final landing (8 beats)
        ['F5', 0.5], ['E5', 0.5], ['D5', 0.5], ['C5', 0.5], ['G4', 1],
        ['A4', 0.5], ['B4', 0.5],
        ['C5', 0.5], [0, 0.5], ['G4', 0.5], [0, 0.5], ['C5', 2],
      ],
    },
    // Voice 2 — harmony (square, soft): sustained thirds under the tune.
    {
      wave: 'square',
      vol: 0.06,
      notes: [
        // A (8 beats): C / C / F / C
        ['E4', 2], ['G3', 2], ['F4', 2], ['E4', 2],
        // A' (8 beats): C / C / G / C
        ['E4', 2], ['G3', 2], ['D4', 2], ['E4', 2],
        // B (8 beats): C / G / Am / G
        ['G3', 2], ['B3', 2], ['A3', 2], ['B3', 2],
        // Coda (8 beats): F / G / C / C
        ['A3', 2], ['B3', 2], ['E4', 2], ['G4', 2],
      ],
    },
    // Voice 3 — bass (triangle): oompah march, root and fifth.
    {
      wave: 'triangle',
      vol: 0.16,
      notes: [
        // A (8 beats)
        ['C2', 1], ['G2', 1], ['C2', 1], ['G2', 1],
        ['F2', 1], ['C3', 1], ['C2', 1], ['G2', 1],
        // A' (8 beats)
        ['C2', 1], ['G2', 1], ['C2', 1], ['G2', 1],
        ['G2', 1], ['D3', 1], ['C2', 1], ['G2', 1],
        // B (8 beats)
        ['C2', 1], ['G2', 1], ['G2', 1], ['D3', 1],
        ['A2', 1], ['E3', 1], ['G2', 1], ['B2', 1],
        // Coda — IV-V-I parade landing (8 beats)
        ['F2', 1], ['F2', 1], ['G2', 1], ['G2', 1],
        ['C2', 1], ['G2', 1], ['C2', 2],
      ],
    },
    // Voice 4 — drums (noise): steady parade snare, roll into the loop.
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
        // B (8 beats): lighter backbeat so the bridge can skip
        ['x', 0.5], [0, 0.5], [0, 0.5], ['x', 0.5],
        ['x', 0.5], [0, 0.5], [0, 0.5], ['x', 0.5],
        ['x', 0.5], [0, 0.5], [0, 0.5], ['x', 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5],
        // Coda (8 beats): full march, snare roll into the downbeat
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.25], ['x', 0.25], ['x', 0.25], ['x', 0.25], ['x', 1],
      ],
    },
  ],
});
