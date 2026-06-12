/* Sound effects — Red Riding Hood and the Vegetarian Wolf
   Extra one-shot WebAudio effects registered via RH.registerSfx.
   Built-ins (blip, pickup, score, error, death, door, knock) live in the
   engine and are NOT redefined here.
   Each effect: function (ctx, out) — short (0.1-0.8s), gentle volume. */
(function () {
  /* Helper: a single oscillator tone with optional pitch ramp and fade-out.
     Returns the oscillator so callers can tweak it further. */
  function tone(ctx, out, wave, f0, f1, t0, dur, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = wave;
    o.frequency.setValueAtTime(f0, t0);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t0 + dur);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g); g.connect(out);
    o.start(t0); o.stop(t0 + dur + 0.02);
    return o;
  }

  /* Helper: short white-noise burst through an optional filter. */
  function noise(ctx, out, t0, dur, vol, filterType, fStart, fEnd) {
    const len = Math.ceil(ctx.sampleRate * (dur + 0.05));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = buf;
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    let head = s;
    if (filterType) {
      const f = ctx.createBiquadFilter();
      f.type = filterType;
      f.frequency.setValueAtTime(fStart || 1200, t0);
      if (fEnd) f.frequency.exponentialRampToValueAtTime(Math.max(40, fEnd), t0 + dur);
      s.connect(f); head = f;
    }
    head.connect(g); g.connect(out);
    s.start(t0); s.stop(t0 + dur + 0.05);
  }

  /* meow — quick rise then a whiny fall, like a street cat with opinions */
  RH.registerSfx('meow', function (ctx, out) {
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(620, t);
    o.frequency.exponentialRampToValueAtTime(1050, t + 0.08);
    o.frequency.exponentialRampToValueAtTime(450, t + 0.32);
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g); g.connect(out);
    o.start(t); o.stop(t + 0.4);
  });

  /* howl — long mournful wolf glide up, hold, slide down, with vibrato */
  RH.registerSfx('howl', function (ctx, out) {
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(520, t + 0.25);
    o.frequency.setValueAtTime(520, t + 0.45);
    o.frequency.exponentialRampToValueAtTime(260, t + 0.78);
    /* vibrato LFO for that lonely-on-a-hill feel */
    const lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.type = 'sine'; lfo.frequency.value = 6; lg.gain.value = 14;
    lfo.connect(lg); lg.connect(o.frequency);
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.2, t + 0.12);
    g.gain.setValueAtTime(0.2, t + 0.5);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    o.connect(g); g.connect(out);
    o.start(t); lfo.start(t);
    o.stop(t + 0.82); lfo.stop(t + 0.82);
  });

  /* splash — filtered noise whoosh down plus a low "bloop" */
  RH.registerSfx('splash', function (ctx, out) {
    const t = ctx.currentTime;
    noise(ctx, out, t, 0.45, 0.22, 'lowpass', 2400, 300);
    tone(ctx, out, 'sine', 300, 90, t + 0.02, 0.25, 0.16);
  });

  /* camera — mechanical shutter: tick, tiny gap, tick */
  RH.registerSfx('camera', function (ctx, out) {
    const t = ctx.currentTime;
    noise(ctx, out, t, 0.04, 0.22, 'highpass', 2500, 0);
    tone(ctx, out, 'square', 1800, 1200, t, 0.03, 0.1);
    noise(ctx, out, t + 0.09, 0.05, 0.18, 'highpass', 2000, 0);
    tone(ctx, out, 'square', 1100, 700, t + 0.09, 0.04, 0.1);
  });

  /* ring — old phone trill: two alternating tones, two short bursts */
  RH.registerSfx('ring', function (ctx, out) {
    const t = ctx.currentTime;
    for (let b = 0; b < 2; b++) {
      const bt = t + b * 0.4;
      for (let i = 0; i < 6; i++) {
        const f = (i % 2 === 0) ? 1080 : 860;
        tone(ctx, out, 'square', f, f, bt + i * 0.045, 0.04, 0.12);
      }
    }
  });

  /* crash — noise smash with a falling low rumble */
  RH.registerSfx('crash', function (ctx, out) {
    const t = ctx.currentTime;
    noise(ctx, out, t, 0.5, 0.25, 'lowpass', 4500, 200);
    tone(ctx, out, 'sawtooth', 180, 40, t, 0.5, 0.18);
    /* a little glassy ping on top */
    tone(ctx, out, 'square', 2200, 900, t + 0.02, 0.12, 0.08);
  });

  /* siren — forest cop arriving: two-tone wail, alternating pitches */
  RH.registerSfx('siren', function (ctx, out) {
    const t = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const hi = i % 2 === 0;
      tone(ctx, out, 'sawtooth', hi ? 660 : 880, hi ? 880 : 660, t + i * 0.2, 0.19, 0.13);
    }
  });

  /* tada — small victory fanfare: ascending arpeggio + held top note */
  RH.registerSfx('tada', function (ctx, out) {
    const t = ctx.currentTime;
    const seq = [523.25, 659.25, 783.99]; // C5 E5 G5
    seq.forEach(function (f, i) {
      tone(ctx, out, 'square', f, f, t + i * 0.09, 0.1, 0.13);
    });
    tone(ctx, out, 'square', 1046.5, 1046.5, t + 0.27, 0.4, 0.15);   // C6 hold
    tone(ctx, out, 'triangle', 523.25, 523.25, t + 0.27, 0.4, 0.12); // octave body
  });

  /* creak — slow wobbly door hinge: low sawtooth bending up with grind */
  RH.registerSfx('creak', function (ctx, out) {
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(70, t);
    o.frequency.linearRampToValueAtTime(160, t + 0.3);
    o.frequency.linearRampToValueAtTime(95, t + 0.45);
    o.frequency.linearRampToValueAtTime(185, t + 0.7);
    /* slow wobble = unoiled hinge */
    const lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.type = 'sine'; lfo.frequency.value = 11; lg.gain.value = 20;
    lfo.connect(lg); lg.connect(o.frequency);
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.15, t + 0.06);
    g.gain.setValueAtTime(0.15, t + 0.55);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.75);
    o.connect(g); g.connect(out);
    o.start(t); lfo.start(t);
    o.stop(t + 0.78); lfo.stop(t + 0.78);
  });

  /* crow — two harsh caws, raspy square drops */
  RH.registerSfx('crow', function (ctx, out) {
    const t = ctx.currentTime;
    [0, 0.22].forEach(function (dt) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(820, t + dt);
      o.frequency.exponentialRampToValueAtTime(380, t + dt + 0.16);
      g.gain.setValueAtTime(0.001, t + dt);
      g.gain.linearRampToValueAtTime(0.16, t + dt + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.18);
      o.connect(g); g.connect(out);
      o.start(t + dt); o.stop(t + dt + 0.2);
      /* raspy edge */
      noise(ctx, out, t + dt, 0.12, 0.06, 'bandpass', 900, 500);
    });
  });
})();
