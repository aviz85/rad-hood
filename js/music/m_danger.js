// m_danger — cave / basement theme.
// Tension and dissonance at a crawling 76 bpm: an E-minor phrase that keeps
// leaning on the flat fifth (Bb) and minor second (F), a low chromatic bass
// that creeps in half steps, a thin dissonant drone, and a sparse
// heartbeat-like noise pulse. 32 beats per voice.
RH.registerMusic('m_danger', {
  bpm: 76,
  voices: [
    // Melody (square): a slow, uneasy phrase in E minor.
    // Four 8-beat phrases: statement, answer, climb to the tritone, collapse.
    {
      wave: 'square',
      vol: 0.12,
      notes: [
        // Phrase 1 (8): the motif — E rises a half step and sinks to the tritone.
        [0, 1], ['E4', 1.5], ['F4', 0.5], ['E4', 1], ['Bb3', 2], [0, 2],
        // Phrase 2 (8): the motif tries to climb, slides back chromatically.
        [0, 1], ['E4', 1.5], ['F4', 0.5], ['G4', 1], ['F#4', 1], ['F4', 1], ['E4', 2],
        // Phrase 3 (8): peak on the high tritone, then a slow chromatic fall.
        ['Bb4', 1.5], ['A4', 0.5], ['G4', 1], ['F#4', 1], ['G4', 0.5], ['F4', 0.5], ['E4', 1], ['C4', 2],
        // Phrase 4 (8): the motif returns and dies on a long flat fifth.
        [0, 1], ['E4', 1.5], ['F4', 0.5], ['E4', 1], ['B3', 1], ['Bb3', 3],
      ],
    },
    // Bass (triangle): crawling low chromatic figure, 4-beat cells.
    {
      wave: 'triangle',
      vol: 0.16,
      notes: [
        // Cells 1-2: home crawl E - F - E - Bb (tritone below).
        ['E2', 1], ['E2', 0.5], ['F2', 0.5], ['E2', 1], ['Bb1', 1],
        ['E2', 1], ['E2', 0.5], ['F2', 0.5], ['E2', 1], ['Bb1', 1],
        // Cell 3: slips down toward C.
        ['E2', 1], ['Eb2', 0.5], ['D2', 0.5], ['C2', 1], ['B1', 1],
        // Cell 4: regains the home crawl.
        ['E2', 1], ['E2', 0.5], ['F2', 0.5], ['E2', 1], ['Bb1', 1],
        // Cells 5-6: home crawl again under the high melody.
        ['E2', 1], ['E2', 0.5], ['F2', 0.5], ['E2', 1], ['Bb1', 1],
        ['E2', 1], ['E2', 0.5], ['F2', 0.5], ['E2', 1], ['C2', 1],
        // Cell 7: chromatic descent into the cadence.
        ['D2', 1], ['Db2', 1], ['C2', 1], ['B1', 1],
        // Cell 8: settles on a long low E with a last half-step shudder.
        ['E2', 1.5], ['F2', 0.5], ['E2', 2],
      ],
    },
    // Harmony (sine): faint dissonant drone — minor seconds and the tritone.
    {
      wave: 'sine',
      vol: 0.07,
      notes: [
        ['E3', 4], ['F3', 4],   // rubs a minor 9th over the bass E
        ['E3', 4], ['Bb2', 4],  // sinks to the tritone
        ['E3', 4], ['C3', 4],   // minor 6th shadow
        ['B2', 4], ['E3', 4],   // resolves home, still cold
      ],
    },
    // Drums (noise): a slow heartbeat — two soft thuds, then silence.
    {
      wave: 'noise',
      vol: 0.05,
      notes: [
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 2.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 2.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 2.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 2.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 2.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 2.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 2.5],
        ['x', 0.5], [0, 0.5], ['x', 0.5], [0, 2.5],
      ],
    },
  ],
});
