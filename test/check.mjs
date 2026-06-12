#!/usr/bin/env node
/* Content file checker: syntax, registration and structural validation.
   Usage: node test/check.mjs <files...> */
import { readFileSync } from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const errs = [];
const warns = [];

const reg = { arts: {}, scenes: {}, music: {}, sprites: {}, items: {}, sfx: {} };

const sandbox = { console, Math, JSON, performance: { now: () => 0 } };
sandbox.window = sandbox;
sandbox.self = sandbox;
sandbox.RH = {
  registerArt: (id, fn) => { reg.arts[id] = fn; },
  registerScene: (d) => { reg.scenes[(d && d.id) || '?'] = d; },
  registerMusic: (id, d) => { reg.music[id] = d; },
  registerSprite: (id, d) => { reg.sprites[id] = d; },
  registerItem: (id, d) => { reg.items[id] = d; },
  registerSfx: (id, f) => { reg.sfx[id] = f; },
  snarks: [], state: {}, items: {}, inv: [],
};
sandbox.RHAudio = { registerMusic: sandbox.RH.registerMusic, registerSfx: sandbox.RH.registerSfx };
sandbox.RHSprites = { register: sandbox.RH.registerSprite };
vm.createContext(sandbox);

function load(f) {
  let src;
  try { src = readFileSync(f, 'utf8'); } catch (e) { errs.push(f + ': file does not exist'); return; }
  try { new vm.Script(src, { filename: f }); } catch (e) { errs.push(f + ': syntax error: ' + e.message); return; }
  try { vm.runInContext(src, sandbox, { filename: f }); } catch (e) { errs.push(f + ': runtime error: ' + e.message); }
}

/* load the real palette into the sandbox */
load(path.join(ROOT, 'js/engine/palette.js'));

const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node test/check.mjs <files...>'); process.exit(2); }
for (const f of files) load(path.resolve(f));

/* mock ctx — swallows every call */
function makeAny() {
  let p;
  const handler = {
    get: (t, k) => (k === Symbol.toPrimitive ? () => 0 : p),
    set: () => true,
    apply: () => p,
    has: () => true,
  };
  p = new Proxy(function () {}, handler);
  return p;
}

/* === art === */
for (const [id, fn] of Object.entries(reg.arts)) {
  if (typeof fn !== 'function') { errs.push('art ' + id + ': not a function'); continue; }
  try { fn(makeAny(), sandbox.P, 0); fn(makeAny(), sandbox.P, 7.3); }
  catch (e) { errs.push('art ' + id + ': crashed while drawing: ' + e.message); }
}

/* === scenes === */
const DIRS = ['left', 'right', 'up', 'down'];
const VERB_KEYS = ['look', 'take', 'talk', 'use', 'give', 'open', 'eat', 'read', 'knock', 'push', 'show', 'call', 'photo', 'swim'];
for (const [id, d] of Object.entries(reg.scenes)) {
  if (!d || typeof d !== 'object') { errs.push('scene ' + id + ': invalid definition'); continue; }
  for (const k of ['id', 'name', 'art', 'music']) {
    if (typeof d[k] !== 'string' || !d[k]) errs.push('scene ' + id + ': missing/invalid field: ' + k);
  }
  if (d.horizon !== undefined && (typeof d.horizon !== 'number' || d.horizon < 40 || d.horizon > 190))
    errs.push('scene ' + id + ': implausible horizon');
  if (d.enter !== undefined && typeof d.enter !== 'function') errs.push('scene ' + id + ': enter must be a function');
  if (d.hotspots !== undefined && !Array.isArray(d.hotspots)) errs.push('scene ' + id + ': hotspots must be an array');
  (Array.isArray(d.hotspots) ? d.hotspots : []).forEach((h, i) => {
    const tag = 'scene ' + id + '/hotspot[' + i + ']' + (h && h.id ? ' (' + h.id + ')' : '');
    if (!h || !h.id) errs.push(tag + ': missing id');
    if (!Array.isArray(h.names) || !h.names.length) errs.push(tag + ': missing names');
    if (!Array.isArray(h.rect) || h.rect.length !== 4 || h.rect.some(n => typeof n !== 'number'))
      errs.push(tag + ': rect must be numeric [x,y,w,h]');
    else {
      const [x, y, w, hh] = h.rect;
      if (x < 0 || y < 0 || x + w > 322 || y + hh > 202) warns.push(tag + ': rect exceeds 320x200');
    }
    for (const v of VERB_KEYS) {
      if (h && h[v] !== undefined && v !== 'give' && v !== 'use' && v !== 'show') {
        if (typeof h[v] !== 'string' && typeof h[v] !== 'function') errs.push(tag + ': ' + v + ' must be a string or function');
      }
    }
    for (const v of ['give', 'use', 'show']) {
      if (h && h[v] !== undefined && (typeof h[v] !== 'object' || Array.isArray(h[v])))
        errs.push(tag + ': ' + v + ' must be an object {itemId: handler}');
    }
  });
  if (d.exits) {
    for (const [dir, e] of Object.entries(d.exits)) {
      if (!DIRS.includes(dir)) errs.push('scene ' + id + ': illegal exit direction: ' + dir);
      if (!e || typeof e.to !== 'string') errs.push('scene ' + id + ': exit ' + dir + ' missing "to"');
    }
  }
  /* cross-check: if art was loaded in this run, verify the reference */
  if (Object.keys(reg.arts).length && d.art && !reg.arts[d.art])
    warns.push('scene ' + id + ': art "' + d.art + '" not loaded in this check (may be fine)');
}

/* === music === */
const WAVES = ['square', 'triangle', 'sawtooth', 'sine', 'noise'];
const PITCH = /^[A-G][#b]?\d$/;
for (const [id, d] of Object.entries(reg.music)) {
  if (!d || !Array.isArray(d.voices) || !d.voices.length) { errs.push('music ' + id + ': missing voices'); continue; }
  if (typeof d.bpm !== 'number' || d.bpm < 40 || d.bpm > 260) errs.push('music ' + id + ': invalid bpm');
  const lens = [];
  d.voices.forEach((v, i) => {
    const tag = 'music ' + id + '/voice[' + i + ']';
    if (!WAVES.includes(v.wave)) errs.push(tag + ': illegal wave: ' + v.wave);
    if (!Array.isArray(v.notes) || !v.notes.length) { errs.push(tag + ': missing notes'); return; }
    let total = 0;
    v.notes.forEach((n, j) => {
      if (!Array.isArray(n) || n.length < 2) { errs.push(tag + '/note[' + j + ']: must be [pitch, duration]'); return; }
      const [pp, dur] = n;
      const okPitch = pp === 0 || pp === 'x' || (typeof pp === 'string' && PITCH.test(pp));
      if (!okPitch) errs.push(tag + '/note[' + j + ']: illegal pitch: ' + JSON.stringify(pp));
      if (typeof dur !== 'number' || dur <= 0 || dur > 16) errs.push(tag + '/note[' + j + ']: illegal duration');
      else total += dur;
    });
    lens.push(total);
  });
  if (lens.length > 1 && Math.max(...lens) - Math.min(...lens) > 0.01)
    errs.push('music ' + id + ': voices differ in total beats: ' + lens.join(', '));
}

/* === sprites === */
for (const [id, d] of Object.entries(reg.sprites)) {
  if (!d || !d.frames || typeof d.frames !== 'object') { errs.push('sprite ' + id + ': missing frames'); continue; }
  for (const [fname, rows] of Object.entries(d.frames)) {
    const tag = 'sprite ' + id + '/' + fname;
    if (!Array.isArray(rows) || !rows.length) { errs.push(tag + ': empty frame'); continue; }
    const w = rows[0].length;
    rows.forEach((r, i) => {
      if (typeof r !== 'string') errs.push(tag + '/row[' + i + ']: not a string');
      else if (r.length !== w) errs.push(tag + '/row[' + i + ']: length ' + r.length + ' instead of ' + w);
      else {
        for (const ch of r) {
          if (ch !== '.' && ch !== ' ' && (!d.pal || d.pal[ch] === undefined)) {
            errs.push(tag + ': char "' + ch + '" is not defined in pal');
            break;
          }
        }
      }
    });
  }
}

/* === sfx === */
for (const [id, f] of Object.entries(reg.sfx)) {
  if (typeof f !== 'function') errs.push('sfx ' + id + ': not a function');
}

const counts = Object.entries(reg).map(([k, v]) => k + ':' + Object.keys(v).length).join(' · ');
if (warns.length) warns.forEach(w => console.log('! ' + w));
if (errs.length) {
  errs.forEach(e => console.error('x ' + e));
  console.error('\nFAILED: ' + errs.length + ' errors (' + counts + ')');
  process.exit(1);
} else {
  console.log('OK (' + counts + ')');
}
