// m_grill — Zevik the vegetarian wolf's grill clearing.
// Warm, mellow reggae-chiptune at 82bpm. 32 beats (8 bars of 4/4).
// Progression: C - Am - F - G, twice (question phrase + answer phrase).
// Classic reggae feel: bass skips the downbeat, square "skank" chords
// sit on every offbeat, soft noise ticks ride along.
RH.registerMusic('m_grill', {
  bpm: 82,
  voices: [
    // --- Melody (lead): a lazy, singable two-phrase tune ------------- 32
    {
      wave: 'square', vol: 0.12,
      notes: [
        // Phrase A — the question
        ['E4', 1], ['G4', 0.5], ['E4', 0.5], ['C4', 2],          // bar 1 (C)
        ['A4', 1.5], ['G4', 0.5], ['E4', 2],                     // bar 2 (Am)
        ['F4', 1], ['A4', 1], ['G4', 0.5], ['F4', 0.5], ['E4', 1], // bar 3 (F)
        ['D4', 2], ['B3', 1], [0, 1],                            // bar 4 (G) — breathe
        // Phrase B — the answer
        ['E4', 0.5], ['G4', 0.5], ['A4', 1], ['G4', 2],          // bar 5 (C)
        ['A4', 0.5], ['G4', 0.5], ['E4', 1], ['C4', 2],          // bar 6 (Am)
        ['D4', 1], ['F4', 1], ['A4', 1.5], ['G4', 0.5],          // bar 7 (F)
        ['E4', 1], ['D4', 1], ['C4', 2],                         // bar 8 (G->C) — settle home
      ],
    },
    // --- Bass: reggae "drop" — rest on the one, then walk root/fifth - 32
    {
      wave: 'triangle', vol: 0.16,
      notes: [
        [0, 0.5], ['C2', 1.5], ['G2', 1], ['C2', 1],             // bar 1 (C)
        [0, 0.5], ['A1', 1.5], ['E2', 1], ['A1', 1],             // bar 2 (Am)
        [0, 0.5], ['F2', 1.5], ['C3', 1], ['F2', 1],             // bar 3 (F)
        [0, 0.5], ['G2', 1.5], ['D2', 1], ['G2', 1],             // bar 4 (G)
        [0, 0.5], ['C2', 1.5], ['G2', 1], ['C2', 1],             // bar 5 (C)
        [0, 0.5], ['A1', 1.5], ['E2', 1], ['A1', 1],             // bar 6 (Am)
        [0, 0.5], ['F2', 1.5], ['C3', 1], ['F2', 1],             // bar 7 (F)
        [0, 0.5], ['G2', 1.5], ['D2', 1], ['C2', 1],             // bar 8 (G->C)
      ],
    },
    // --- Skank harmony: chord stabs on every offbeat ("and") --------- 32
    {
      wave: 'sawtooth', vol: 0.05,
      notes: [
        // bar 1 (C: G3)
        [0, 0.5], ['G3', 0.5], [0, 0.5], ['G3', 0.5], [0, 0.5], ['G3', 0.5], [0, 0.5], ['G3', 0.5],
        // bar 2 (Am: A3)
        [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5],
        // bar 3 (F: A3)
        [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5],
        // bar 4 (G: B3)
        [0, 0.5], ['B3', 0.5], [0, 0.5], ['B3', 0.5], [0, 0.5], ['B3', 0.5], [0, 0.5], ['B3', 0.5],
        // bar 5 (C: G3)
        [0, 0.5], ['G3', 0.5], [0, 0.5], ['G3', 0.5], [0, 0.5], ['G3', 0.5], [0, 0.5], ['G3', 0.5],
        // bar 6 (Am: A3)
        [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5],
        // bar 7 (F: A3)
        [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['A3', 0.5],
        // bar 8 (G: B3, resolve to C: E3 on the last offbeat)
        [0, 0.5], ['B3', 0.5], [0, 0.5], ['B3', 0.5], [0, 0.5], ['B3', 0.5], [0, 0.5], ['E3', 0.5],
      ],
    },
    // --- Drums: soft offbeat ticks, one-drop accent on beat 3 -------- 32
    {
      wave: 'noise', vol: 0.05,
      notes: [
        // Each bar: quiet offbeat ticks; the beat-3 hit lands a touch longer.
        [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], [0, 0.5], [0, 0.5], ['x', 0.5], // bar 1
        [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], [0, 0.5], [0, 0.5], ['x', 0.5], // bar 2
        [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], [0, 0.5], [0, 0.5], ['x', 0.5], // bar 3
        [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], // bar 4 (tiny fill)
        [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], [0, 0.5], [0, 0.5], ['x', 0.5], // bar 5
        [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], [0, 0.5], [0, 0.5], ['x', 0.5], // bar 6
        [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], [0, 0.5], [0, 0.5], ['x', 0.5], // bar 7
        [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], ['x', 0.5], // bar 8 (turnaround fill)
      ],
    },
  ],
});
