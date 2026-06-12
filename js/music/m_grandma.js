// m_grandma — a "sweet" waltz that feels wrong: cute C-major lullaby in 3/4,
// but every cycle hits one sour chromatic note (the C#5 in bar 4, grinding
// against the F-major harmony) — like Grandma's smile, almost right.
// Structure: 8 bars x 3 beats = 24 beats per voice.
// Progression: C | G | Am | F(sour) | C | F | G | C.
RH.registerMusic('m_grandma', {
  bpm: 126,
  voices: [
    // Melody (square) — a music-box waltz tune, gentle and rounded.
    {
      wave: 'square',
      vol: 0.12,
      notes: [
        // Bar 1 (C): a sweet upward curtsy                    = 3 beats
        ['E4', 1], ['G4', 1], ['C5', 1],
        // Bar 2 (G): lean on the leading tone                 = 3 beats
        ['B4', 2], ['G4', 1],
        // Bar 3 (Am): climbing a little too eagerly           = 3 beats
        ['A4', 1], ['C5', 1], ['E5', 1],
        // Bar 4 (F): THE SOUR NOTE — C#5 against F major,
        // a half-step smear sliding down like a forced smile  = 3 beats
        ['D5', 1], ['C#5', 1], ['C5', 1],
        // Bar 5 (C): pretend nothing happened                 = 3 beats
        ['G4', 2], ['E4', 1],
        // Bar 6 (F): rocking gently, grandmotherly            = 3 beats
        ['A4', 1], ['F4', 1], ['A4', 1],
        // Bar 7 (G): polite little descent                    = 3 beats
        ['D5', 1], ['B4', 1], ['G4', 1],
        // Bar 8 (C): home, sweet (?) home                     = 3 beats
        ['C5', 2], [0, 1],
      ],
    },
    // Harmony (sine) — the "pah-pah" of the waltz, soft chord tones on 2 and 3.
    {
      wave: 'sine',
      vol: 0.07,
      notes: [
        // Bar 1: C                                            = 3 beats
        [0, 1], ['E4', 1], ['G4', 1],
        // Bar 2: G                                            = 3 beats
        [0, 1], ['B3', 1], ['D4', 1],
        // Bar 3: Am                                           = 3 beats
        [0, 1], ['C4', 1], ['E4', 1],
        // Bar 4: F (innocent below the sour melody)           = 3 beats
        [0, 1], ['A3', 1], ['C4', 1],
        // Bar 5: C                                            = 3 beats
        [0, 1], ['E4', 1], ['G4', 1],
        // Bar 6: F                                            = 3 beats
        [0, 1], ['A3', 1], ['C4', 1],
        // Bar 7: G                                            = 3 beats
        [0, 1], ['B3', 1], ['D4', 1],
        // Bar 8: C                                            = 3 beats
        [0, 1], ['E4', 1], ['C4', 1],
      ],
    },
    // Bass (triangle) — the "oom" on beat 1, fifths swaying on 2 and 3.
    {
      wave: 'triangle',
      vol: 0.16,
      notes: [
        // Bar 1: C                                            = 3 beats
        ['C3', 1], ['G2', 1], ['G2', 1],
        // Bar 2: G                                            = 3 beats
        ['G2', 1], ['D3', 1], ['D3', 1],
        // Bar 3: Am                                           = 3 beats
        ['A2', 1], ['E3', 1], ['E3', 1],
        // Bar 4: F                                            = 3 beats
        ['F2', 1], ['C3', 1], ['C3', 1],
        // Bar 5: C                                            = 3 beats
        ['C3', 1], ['G2', 1], ['G2', 1],
        // Bar 6: F                                            = 3 beats
        ['F2', 1], ['C3', 1], ['C3', 1],
        // Bar 7: G                                            = 3 beats
        ['G2', 1], ['D3', 1], ['D3', 1],
        // Bar 8: C — settle home for the loop                 = 3 beats
        ['C3', 1], ['G2', 1], ['C3', 1],
      ],
    },
    // Drums (noise) — a tiny brushed waltz tick: ONE-two-three, very polite.
    {
      wave: 'noise',
      vol: 0.05,
      notes: [
        // 8 bars x (tick . tick . tick .)                     = 3 beats each
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 0.5],
      ],
    },
  ],
});
