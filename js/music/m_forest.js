// m_forest — forest theme: mysterious, A minor, 88 bpm, slow arpeggios.
// Structure: 8 bars x 4 beats = 32 beats per voice.
// Progression: Am | C | Dm | E | Am | F | Dm | E (loops back to Am).
RH.registerMusic('m_forest', {
  bpm: 88,
  voices: [
    // Melody (square) — a slow, questioning minor phrase that answers itself.
    {
      wave: 'square',
      vol: 0.12,
      notes: [
        // Bar 1 (Am): rise from the root's shadow            = 4 beats
        ['E4', 1.5], ['G4', 0.5], ['A4', 2],
        // Bar 2 (C): drift back down                          = 4 beats
        ['G4', 1], ['E4', 1], ['C4', 2],
        // Bar 3 (Dm): a wandering step upward                 = 4 beats
        ['D4', 1.5], ['F4', 0.5], ['A4', 1], ['G4', 1],
        // Bar 4 (E): hold the unresolved dominant             = 4 beats
        ['E4', 3], [0, 1],
        // Bar 5 (Am): the answer, an octave echo              = 4 beats
        ['A4', 1.5], ['G4', 0.5], ['E4', 2],
        // Bar 6 (F): brief warmth in the gloom                = 4 beats
        ['F4', 1], ['A4', 1], ['C5', 2],
        // Bar 7 (Dm): falling back toward the dark            = 4 beats
        ['D5', 1.5], ['C5', 0.5], ['A4', 1], ['F4', 1],
        // Bar 8 (E): leading tone pulls the loop home         = 4 beats
        ['E4', 1], ['G#4', 1], ['B4', 1], [0, 1],
      ],
    },
    // Slow arpeggios (sine) — one quarter-note arp per chord, soft and misty.
    {
      wave: 'sine',
      vol: 0.08,
      notes: [
        // Bar 1: Am
        ['A3', 1], ['C4', 1], ['E4', 1], ['C4', 1],
        // Bar 2: C
        ['G3', 1], ['C4', 1], ['E4', 1], ['C4', 1],
        // Bar 3: Dm
        ['A3', 1], ['D4', 1], ['F4', 1], ['D4', 1],
        // Bar 4: E
        ['G#3', 1], ['B3', 1], ['E4', 1], ['B3', 1],
        // Bar 5: Am
        ['A3', 1], ['C4', 1], ['E4', 1], ['C4', 1],
        // Bar 6: F
        ['A3', 1], ['C4', 1], ['F4', 1], ['C4', 1],
        // Bar 7: Dm
        ['A3', 1], ['D4', 1], ['F4', 1], ['D4', 1],
        // Bar 8: E
        ['G#3', 1], ['B3', 1], ['E4', 1], ['G#3', 1],
      ],
    },
    // Bass (triangle) — roots and fifths, half-note pulse.
    {
      wave: 'triangle',
      vol: 0.16,
      notes: [
        // Bar 1: Am
        ['A2', 2], ['E2', 2],
        // Bar 2: C
        ['C3', 2], ['G2', 2],
        // Bar 3: Dm
        ['D3', 2], ['A2', 2],
        // Bar 4: E
        ['E2', 2], ['B2', 2],
        // Bar 5: Am
        ['A2', 2], ['E2', 2],
        // Bar 6: F
        ['F2', 2], ['C3', 2],
        // Bar 7: Dm
        ['D3', 2], ['A2', 2],
        // Bar 8: E — short breath before the loop
        ['E2', 2], ['E2', 1], [0, 1],
      ],
    },
    // Drums (noise) — sparse brushed ticks, like twigs snapping far away.
    {
      wave: 'noise',
      vol: 0.05,
      notes: [
        // 8 bars x (tick . tick .) pattern                    = 4 beats each
        ['x', 0.5], [0, 1.5], ['x', 0.5], [0, 1.5],
        ['x', 0.5], [0, 1.5], ['x', 0.5], [0, 1.5],
        ['x', 0.5], [0, 1.5], ['x', 0.5], [0, 1.5],
        ['x', 0.5], [0, 1.5], ['x', 0.5], [0, 1.5],
        ['x', 0.5], [0, 1.5], ['x', 0.5], [0, 1.5],
        ['x', 0.5], [0, 1.5], ['x', 0.5], [0, 1.5],
        ['x', 0.5], [0, 1.5], ['x', 0.5], [0, 1.5],
        ['x', 0.5], [0, 1.5], ['x', 0.5], [0, 1.5],
      ],
    },
  ],
});
