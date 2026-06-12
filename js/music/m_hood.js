// m_hood — neighborhood theme.
// Light, rhythmic Mediterranean chiptune in E Phrygian dominant (freygish):
// E F G# A B C D — the classic "shchuna" scale.
// Structure: 8 bars of 4/4 = 32 beats. Phrases: A A' B A''.
// All voices sum to exactly 32 beats.
RH.registerMusic('m_hood', {
  bpm: 108,
  voices: [
    // Melody — square lead, a singable freygish phrase with a call-and-answer shape.
    {
      wave: 'square',
      vol: 0.12,
      notes: [
        // Bar 1 (phrase A, call): climb up the freygish steps and fall back home.
        ['E4', 0.5], ['F4', 0.5], ['G#4', 0.5], ['A4', 0.5], ['G#4', 0.5], ['F4', 0.5], ['E4', 1],
        // Bar 2 (phrase A, answer): dip below the root, lean on the half-step.
        ['D4', 0.5], ['E4', 0.5], ['F4', 1], ['E4', 0.5], ['D4', 0.5], ['E4', 1],
        // Bar 3 (phrase A', call): same climb but push up to B.
        ['E4', 0.5], ['F4', 0.5], ['G#4', 0.5], ['A4', 0.5], ['B4', 1], ['A4', 0.5], ['G#4', 0.5],
        // Bar 4 (phrase A', answer): wind back down, F-to-E sigh.
        ['A4', 0.5], ['G#4', 0.5], ['F4', 0.5], ['E4', 0.5], ['F4', 1], ['E4', 1],
        // Bar 5 (phrase B, high answer): hover around B-C, the dramatic top.
        ['B4', 0.5], ['C5', 0.5], ['B4', 0.5], ['A4', 0.5], ['G#4', 1], ['A4', 0.5], ['B4', 0.5],
        // Bar 6 (phrase B, release): slide down and rest on the root.
        ['A4', 0.5], ['G#4', 0.5], ['F4', 0.5], ['G#4', 0.5], ['E4', 2],
        // Bar 7 (phrase A'', call): the climb once more, eighth-note swagger.
        ['E4', 0.5], ['F4', 0.5], ['G#4', 0.5], ['A4', 0.5], ['G#4', 0.5], ['F4', 0.5], ['E4', 0.5], ['D4', 0.5],
        // Bar 8 (cadence): land on E, short breath before the loop.
        ['E4', 0.5], ['F4', 0.5], ['E4', 0.5], ['D4', 0.5], ['E4', 1.5], [0, 0.5],
      ],
    },
    // Harmony — soft sine stabs on the offbeats, like a lazy oud strum.
    {
      wave: 'sine',
      vol: 0.07,
      notes: [
        // Bars 1-3: E chord tones on the "and"s.
        [0, 0.5], ['E3', 0.5], [0, 0.5], ['G#3', 0.5], [0, 0.5], ['E3', 0.5], [0, 0.5], ['B3', 0.5],
        [0, 0.5], ['E3', 0.5], [0, 0.5], ['G#3', 0.5], [0, 0.5], ['E3', 0.5], [0, 0.5], ['B3', 0.5],
        [0, 0.5], ['E3', 0.5], [0, 0.5], ['G#3', 0.5], [0, 0.5], ['E3', 0.5], [0, 0.5], ['B3', 0.5],
        // Bar 4: lean on F — the Phrygian half-step color.
        [0, 0.5], ['F3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['F3', 0.5], [0, 0.5], ['C4', 0.5],
        // Bar 5: back to E under the high phrase.
        [0, 0.5], ['E3', 0.5], [0, 0.5], ['G#3', 0.5], [0, 0.5], ['E3', 0.5], [0, 0.5], ['B3', 0.5],
        // Bar 6: F color again for the release.
        [0, 0.5], ['F3', 0.5], [0, 0.5], ['A3', 0.5], [0, 0.5], ['F3', 0.5], [0, 0.5], ['C4', 0.5],
        // Bar 7: E chord tones.
        [0, 0.5], ['E3', 0.5], [0, 0.5], ['G#3', 0.5], [0, 0.5], ['E3', 0.5], [0, 0.5], ['B3', 0.5],
        // Bar 8: thin out for the cadence.
        [0, 0.5], ['E3', 0.5], [0, 0.5], ['G#3', 0.5], [0, 0.5], ['E3', 1], [0, 0.5],
      ],
    },
    // Bass — triangle, bouncy root-and-fifth groove with Phrygian F bars.
    {
      wave: 'triangle',
      vol: 0.16,
      notes: [
        // Bar 1: E pedal groove.
        ['E2', 1], ['E2', 0.5], ['B1', 0.5], ['E2', 1], ['B1', 1],
        // Bar 2: walk through D back to E.
        ['E2', 1], ['E2', 0.5], ['B1', 0.5], ['D2', 1], ['E2', 1],
        // Bar 3: E pedal groove.
        ['E2', 1], ['E2', 0.5], ['B1', 0.5], ['E2', 1], ['B1', 1],
        // Bar 4: F bar — the half-step neighbor, then resolve to E.
        ['F2', 1], ['F2', 0.5], ['C2', 0.5], ['F2', 1], ['E2', 1],
        // Bar 5: E pedal groove under the high melody.
        ['E2', 1], ['E2', 0.5], ['B1', 0.5], ['E2', 1], ['B1', 1],
        // Bar 6: broader F-to-E motion for the release.
        ['F2', 1], ['C2', 1], ['F2', 1], ['E2', 1],
        // Bar 7: E groove with a D pickup.
        ['E2', 1], ['E2', 0.5], ['B1', 0.5], ['E2', 1], ['D2', 1],
        // Bar 8: cadence — settle on a long E.
        ['E2', 1], ['B1', 1], ['E2', 2],
      ],
    },
    // Drums — noise, light dabke-ish skip: hit, rest, two quick taps.
    {
      wave: 'noise',
      vol: 0.05,
      notes: [
        // 2-beat cell x16 = 32 beats.
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
        ['x', 0.5], [0, 0.5], ['x', 0.25], ['x', 0.25], [0, 0.5],
      ],
    },
  ],
});
