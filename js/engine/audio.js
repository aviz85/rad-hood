/* Audio engine — chiptune sequencer (WebAudio) + sound effects */
(function () {
  function freq(name) {
    const m = /^([A-G])([#b]?)(\d)$/.exec(String(name));
    if (!m) return 0;
    let s = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
    if (m[2] === '#') s++;
    if (m[2] === 'b') s--;
    return 440 * Math.pow(2, (s + (+m[3] - 4) * 12 - 9) / 12);
  }

  const A = {
    ctx: null, master: null, music: {}, sfxs: {},
    cur: null, nodes: [], loopTO: null, pending: null, noiseBuf: null,

    ensure() {
      if (!A.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        A.ctx = new AC();
        A.master = A.ctx.createGain();
        A.master.gain.value = 0.5;
        A.master.connect(A.ctx.destination);
        const len = A.ctx.sampleRate;
        A.noiseBuf = A.ctx.createBuffer(1, len, A.ctx.sampleRate);
        const d = A.noiseBuf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      }
      if (A.ctx.state === 'suspended') A.ctx.resume();
      if (A.pending) { const p = A.pending; A.pending = null; A.play(p); }
    },

    registerMusic(id, def) { A.music[id] = def; },
    registerSfx(id, fn) { A.sfxs[id] = fn; },

    stop() {
      if (A.loopTO) { clearTimeout(A.loopTO); A.loopTO = null; }
      A.nodes.forEach(n => { try { n.stop(); } catch (e) {} });
      A.nodes = [];
      A.cur = null;
    },

    play(id) {
      if (!id) { A.stop(); return; }
      if (A.cur === id) return;
      if (!A.ctx) { A.pending = id; return; }
      A.stop();
      const def = A.music[id];
      if (!def || !def.voices) return;
      A.cur = id;
      A._loop(id, def);
    },

    _loop(id, def) {
      if (A.cur !== id) return;
      const t0 = A.ctx.currentTime + 0.06;
      const spb = 60 / (def.bpm || 120);
      let loopBeats = 0;
      def.voices.forEach(v => {
        let t = 0;
        const vol = v.vol === undefined ? 0.12 : v.vol;
        (v.notes || []).forEach(n => {
          const p = n[0], dur = (n[1] || 1) * spb;
          if (p && p !== 0) {
            if (v.wave === 'noise') A._noise(t0 + t, Math.min(dur * 0.8, 0.12), vol);
            else A._tone(t0 + t, dur * 0.88, freq(p), v.wave || 'square', vol);
          }
          t += dur;
        });
        loopBeats = Math.max(loopBeats, t / spb);
      });
      const loopLen = loopBeats * spb;
      if (loopLen > 0.2) {
        A.loopTO = setTimeout(() => { A.nodes = []; A._loop(id, def); }, (loopLen - 0.02) * 1000);
      }
    },

    _tone(at, dur, f, wave, vol) {
      if (!f) return;
      const o = A.ctx.createOscillator(), g = A.ctx.createGain();
      o.type = wave;
      o.frequency.setValueAtTime(f, at);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.linearRampToValueAtTime(vol, at + 0.01);
      g.gain.setValueAtTime(vol, Math.max(at + 0.01, at + dur - 0.04));
      g.gain.linearRampToValueAtTime(0.0001, at + dur);
      o.connect(g); g.connect(A.master);
      o.start(at); o.stop(at + dur + 0.02);
      A.nodes.push(o);
    },

    _noise(at, dur, vol) {
      const s = A.ctx.createBufferSource(), g = A.ctx.createGain();
      s.buffer = A.noiseBuf;
      g.gain.setValueAtTime(vol, at);
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      s.connect(g); g.connect(A.master);
      s.start(at); s.stop(at + dur + 0.02);
      A.nodes.push(s);
    },

    /* one-shot effect helper */
    sweep(f0, f1, dur, wave, vol) {
      if (!A.ctx) return;
      const t = A.ctx.currentTime;
      const o = A.ctx.createOscillator(), g = A.ctx.createGain();
      o.type = wave || 'square';
      o.frequency.setValueAtTime(f0, t);
      o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
      g.gain.setValueAtTime(vol || 0.18, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(A.master);
      o.start(t); o.stop(t + dur + 0.02);
    },
    burst(dur, vol) {
      if (!A.ctx) return;
      A._noise(A.ctx.currentTime, dur, vol || 0.2);
    },

    playSfx(name) {
      if (!A.ctx) return;
      const t = A.ctx.currentTime;
      switch (name) {
        case 'blip': A.sweep(620, 900, 0.06, 'square', 0.07); return;
        case 'pickup': A.sweep(500, 1400, 0.16, 'square', 0.14); return;
        case 'score': A.sweep(880, 1760, 0.22, 'triangle', 0.2); return;
        case 'error': A.sweep(220, 160, 0.18, 'square', 0.14); return;
        case 'death': A.sweep(420, 50, 0.9, 'sawtooth', 0.22); return;
        case 'door': A.burst(0.12, 0.12); A.sweep(120, 70, 0.18, 'triangle', 0.2); return;
        case 'knock': A.sweep(140, 90, 0.07, 'triangle', 0.25); setTimeout(() => A.sweep(140, 90, 0.07, 'triangle', 0.25), 180); return;
        default: {
          const f = A.sfxs[name];
          if (f) { try { f(A.ctx, A.master); } catch (e) {} }
        }
      }
    },
  };

  window.RHAudio = A;
})();
