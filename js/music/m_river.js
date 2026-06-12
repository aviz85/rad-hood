// m_river — the river & bridge theme (scene08)
// Flowing, rolling arpeggios in D major, 98 BPM.
// Structure: 8 bars x 4 beats = 32 beats. Chords: D G Bm A | D G A D.
// Voices: square melody, sine rolling arpeggio (the "water"),
// triangle bass, soft noise drums. All voices sum to exactly 32 beats.
RH.registerMusic('m_river', {
  bpm: 98,
  voices: [
    // Melody — a gentle phrase that rises and falls like the current.
    {
      wave: 'square', vol: 0.12,
      notes: [
        // Bar 1 (D)
        ['A4', 1], ['F#4', 0.5], ['G4', 0.5], ['A4', 2],
        // Bar 2 (G)
        ['B4', 1], ['A4', 0.5], ['G4', 0.5], ['B4', 1], ['D5', 1],
        // Bar 3 (Bm)
        ['D5', 1.5], ['C#5', 0.5], ['B4', 1], ['F#4', 1],
        // Bar 4 (A)
        ['E4', 1], ['F#4', 0.5], ['G4', 0.5], ['A4', 2],
        // Bar 5 (D)
        ['F#4', 1], ['A4', 1], ['D5', 1.5], ['C#5', 0.5],
        // Bar 6 (G)
        ['B4', 1], ['G4', 1], ['E4', 1], ['G4', 1],
        // Bar 7 (A)
        ['A4', 1], ['B4', 0.5], ['C#5', 0.5], ['E5', 1], ['C#5', 1],
        // Bar 8 (D) — resolve, breathe, lead back to the top
        ['D5', 2], [0, 1], ['A4', 1],
      ],
    },
    // Rolling eighth-note arpeggios — the flowing water itself.
    {
      wave: 'sine', vol: 0.07,
      notes: [
        // Bar 1 (D)
        ['D3', 0.5], ['F#3', 0.5], ['A3', 0.5], ['D4', 0.5], ['F#4', 0.5], ['D4', 0.5], ['A3', 0.5], ['F#3', 0.5],
        // Bar 2 (G)
        ['G3', 0.5], ['B3', 0.5], ['D4', 0.5], ['G4', 0.5], ['B4', 0.5], ['G4', 0.5], ['D4', 0.5], ['B3', 0.5],
        // Bar 3 (Bm)
        ['B3', 0.5], ['D4', 0.5], ['F#4', 0.5], ['B4', 0.5], ['F#4', 0.5], ['D4', 0.5], ['B3', 0.5], ['F#3', 0.5],
        // Bar 4 (A)
        ['A3', 0.5], ['C#4', 0.5], ['E4', 0.5], ['A4', 0.5], ['E4', 0.5], ['C#4', 0.5], ['A3', 0.5], ['E3', 0.5],
        // Bar 5 (D)
        ['D3', 0.5], ['F#3', 0.5], ['A3', 0.5], ['D4', 0.5], ['F#4', 0.5], ['D4', 0.5], ['A3', 0.5], ['F#3', 0.5],
        // Bar 6 (G)
        ['G3', 0.5], ['B3', 0.5], ['D4', 0.5], ['G4', 0.5], ['B4', 0.5], ['G4', 0.5], ['D4', 0.5], ['B3', 0.5],
        // Bar 7 (A)
        ['A3', 0.5], ['C#4', 0.5], ['E4', 0.5], ['A4', 0.5], ['E4', 0.5], ['C#4', 0.5], ['A3', 0.5], ['E3', 0.5],
        // Bar 8 (D) — settle downstream
        ['D3', 0.5], ['F#3', 0.5], ['A3', 0.5], ['D4', 0.5], ['A3', 0.5], ['F#3', 0.5], ['D3', 0.5], ['A2', 0.5],
      ],
    },
    // Bass — slow root movement, half notes, like the riverbed.
    {
      wave: 'triangle', vol: 0.16,
      notes: [
        ['D2', 2], ['A2', 2],   // Bar 1 (D)
        ['G2', 2], ['B2', 2],   // Bar 2 (G)
        ['B2', 2], ['F#2', 2],  // Bar 3 (Bm)
        ['A2', 2], ['E2', 2],   // Bar 4 (A)
        ['D2', 2], ['A2', 2],   // Bar 5 (D)
        ['G2', 2], ['D2', 2],   // Bar 6 (G)
        ['A2', 2], ['E2', 2],   // Bar 7 (A)
        ['D2', 2], ['A2', 1], ['D2', 1], // Bar 8 (D)
      ],
    },
    // Drums — soft brushed noise, sparse, lets the water breathe.
    {
      wave: 'noise', vol: 0.05,
      notes: [
        // Same gentle pattern each bar: tap .. tap .. tap .
        ['x', 0.5], [0, 1], ['x', 0.5], [0, 1], ['x', 0.5], [0, 0.5], // Bar 1
        ['x', 0.5], [0, 1], ['x', 0.5], [0, 1], ['x', 0.5], [0, 0.5], // Bar 2
        ['x', 0.5], [0, 1], ['x', 0.5], [0, 1], ['x', 0.5], [0, 0.5], // Bar 3
        ['x', 0.5], [0, 1], ['x', 0.5], [0, 1], ['x', 0.5], [0, 0.5], // Bar 4
        ['x', 0.5], [0, 1], ['x', 0.5], [0, 1], ['x', 0.5], [0, 0.5], // Bar 5
        ['x', 0.5], [0, 1], ['x', 0.5], [0, 1], ['x', 0.5], [0, 0.5], // Bar 6
        ['x', 0.5], [0, 1], ['x', 0.5], [0, 1], ['x', 0.5], [0, 0.5], // Bar 7
        ['x', 0.5], [0, 1], ['x', 0.5], [0, 1], ['x', 0.5], [0, 0.5], // Bar 8
      ],
    },
  ],
});
