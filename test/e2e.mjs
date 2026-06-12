#!/usr/bin/env node
/* End-to-end golden-path playthrough test.
   Loads the REAL engine + ALL content files in Node with a stub DOM,
   plays the game start to finish via RH.dispatch, and asserts the
   full 270/270 score chain, plus one death + restore cycle.
   Usage: node test/e2e.mjs */
import { readFileSync } from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const failures = [];
let steps = 0;

/* ---------- stub DOM ---------- */
function mockCtx() {
  let p;
  const handler = {
    get: (t, k) => (k === Symbol.toPrimitive ? () => 0 : p),
    set: () => true,
    apply: () => p,
  };
  p = new Proxy(function () {}, handler);
  return p;
}

function makeEl(id) {
  const listeners = {};
  const el = {
    id,
    textContent: '',
    value: '',
    style: {},
    children: [],
    classList: {
      _set: new Set(id === 'msgbox' || id === 'deathbox' ? ['hidden'] : []),
      add(c) { this._set.add(c); },
      remove(c) { this._set.delete(c); },
      contains(c) { return this._set.has(c); },
    },
    addEventListener(ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); },
    dispatch(ev, arg) { (listeners[ev] || []).forEach(fn => fn(arg || { key: '', preventDefault() {}, clientX: 0, clientY: 0 })); },
    click() { this.dispatch('click', { clientX: 0, clientY: 0 }); },
    appendChild(c) { this.children.push(c); },
    getBoundingClientRect() { return { left: 0, top: 0, width: 960, height: 600 }; },
    getContext() { return mockCtx(); },
    set innerHTML(v) { this.children = []; },
    get innerHTML() { return ''; },
  };
  el.parentElement = { appendChild() {} };
  el.focus = () => {};
  return el;
}

const els = {};
const IDS = ['screen', 'msgbox', 'msgname', 'msgtext', 'msghint', 'deathbox', 'deathtitle', 'deathtext',
  'btn-restore', 'btn-restart', 'titlebox', 'title-h1', 'title-h2', 'btn-start', 'btn-load',
  'st-name', 'st-score', 'inv-label', 'inv-items', 'cmd', 'prompt', 'invbar', 'inputbar', 'statusbar', 'screenwrap'];
IDS.forEach(id => { els[id] = makeEl(id); });
els.screen.width = 320; els.screen.height = 200;

let rafCb = null;
const store = {};
const sandbox = {
  console, Math, JSON, Promise, Date,
  setTimeout, clearTimeout, setInterval, clearInterval,
  performance: { now: () => nowMs },
  requestAnimationFrame: (cb) => { rafCb = cb; },
  localStorage: {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; },
    clear: () => { for (const k in store) delete store[k]; },
  },
  document: {
    getElementById: id => els[id] || (els[id] = makeEl(id)),
    createElement: () => makeEl('dyn'),
    addEventListener() {},
  },
};
sandbox.addEventListener = () => {};
sandbox.removeEventListener = () => {};
sandbox.window = sandbox;
sandbox.self = sandbox;
vm.createContext(sandbox);

let nowMs = 0;
function load(rel) {
  const f = path.join(ROOT, rel);
  const src = readFileSync(f, 'utf8');
  vm.runInContext(src, sandbox, { filename: f });
}

/* load engine + all content in index.html order */
const html = readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(s => s !== 'js/boot.js');
scripts.forEach(load);

const RH = sandbox.RH;
const player = RH.player;

/* drive the rAF game loop manually */
function tick(ms) {
  for (let t = 0; t < ms; t += 16) {
    nowMs += 16;
    if (rafCb) { const cb = rafCb; rafCb = null; cb(nowMs); }
  }
}
const microtask = () => new Promise(r => setImmediate(r));

async function flush() {
  /* click through any open dialogue, letting promises resolve between clicks */
  for (let i = 0; i < 80; i++) {
    await microtask(); await microtask();
    tick(32);
    if (els.msgbox.classList.contains('hidden')) { await microtask(); tick(32); if (els.msgbox.classList.contains('hidden')) break; }
    els.msgbox.click();
  }
  await microtask();
}

function near(hotspotId) {
  const h = (RH.scene.hotspots || []).find(x => x.id === hotspotId);
  if (!h) { failures.push(`hotspot ${hotspotId} missing in ${RH.sceneId}`); return; }
  const hz = RH.scene.horizon === undefined ? 120 : RH.scene.horizon;
  player.x = Math.max(4, Math.min(316, h.rect[0] + h.rect[2] / 2));
  player.y = Math.max(hz, Math.min(196, h.rect[1] + h.rect[3] + 6));
  player.target = null;
}

async function go(sceneId, x, y) {
  RH.goto(sceneId, x === undefined ? 160 : x, y === undefined ? 180 : y);
  await flush();
}

async function cmd(text) {
  RH.dispatch(text);
  /* allow walk-then-act to complete */
  for (let i = 0; i < 400 && player.target; i++) tick(48);
  await flush();
}

async function step(label, phrasings, predicate) {
  steps++;
  const before = RH.score;
  for (const ph of phrasings) {
    await cmd(ph);
    if (predicate()) {
      console.log(`  ok  ${label}  [score ${before} -> ${RH.score}]  via "${ph}"`);
      return true;
    }
  }
  failures.push(`${label}: none of [${phrasings.join(' | ')}] satisfied the goal (score ${RH.score}, scene ${RH.sceneId})`);
  console.log(`  FAIL ${label}`);
  return false;
}

function expectScore(n, label) {
  steps++;
  if (RH.score !== n) { failures.push(`${label}: expected score ${n}, got ${RH.score}`); console.log(`  FAIL ${label}: score ${RH.score} != ${n}`); }
  else console.log(`  ok  ${label}: score = ${n}`);
}

/* ================= golden path ================= */
console.log('e2e: golden path playthrough');
RH.newGame();
await flush();

/* --- act 1 --- */
if (!RH.scenes.scene01) { console.error('scene01 missing'); process.exit(1); }

/* basket gate must block before mom */
{
  const blocked = RH.scene.beforeExit && RH.scene.beforeExit('right', RH) === false;
  steps++;
  if (!blocked) failures.push('scene01: exit right should be blocked without basket');
  else console.log('  ok  scene01 exit gate blocks without basket');
  await flush();
}

near('mom');
await step('mom gives basket (+10)', ['דבר עם אמא'], () => RH.has('basket') && RH.score === 10);

{
  const open = !RH.scene.beforeExit || RH.scene.beforeExit('right', RH) !== false;
  steps++;
  if (!open) failures.push('scene01: exit right should open with basket');
  else console.log('  ok  scene01 exit gate opens with basket');
  await flush();
}

await go('scene03', 160, 180);
near('bench');
await step('glasses under bench (+10)', ['הבט מתחת לספסל', 'חפש מתחת לספסל', 'הבט בספסל'], () => RH.has('glasses'));
near('trash');
await step('newspaper from trash (+5)', ['קח עיתון', 'הבט בפח', 'קח את העיתון מהפח', 'חפש בפח'], () => RH.has('newspaper'));
near('pensioner');
await step('glasses to pensioner -> map (+15)', ['תן משקפיים לפנסיונר'], () => RH.has('map'));

await go('scene02', 160, 180);
near('kioskman');
await step('newspaper to kiosk -> seeds (+15)', ['תן עיתון לקיוסקאי', 'דבר עם הקיוסקאי', 'תן עיתון לקיוסקאי'], () => RH.has('seeds'));
expectScore(55, 'act 1 complete');

/* map gate on scene04 */
await go('scene04', 160, 180);
{
  steps++;
  const open = !RH.scene.beforeExit || RH.scene.beforeExit('right', RH) !== false;
  if (!open) failures.push('scene04: exit right should open with map');
  else console.log('  ok  scene04 forest gate opens with map');
  await flush();
}

/* --- act 2 --- */
await go('scene06', 60, 180);
near('wolf');
await step('first talk with wolf (+5)', ['דבר עם הזאב'], () => RH.flag('wolfTold') && RH.score === 60);

await go('scene07', 160, 180);
near('brownshrooms');
await step('pick brown mushrooms (+15)', ['קח פטריות חומות', 'קח את הפטריות החומות', 'קח פטריות'], () => RH.has('mushrooms'));

await go('scene06', 60, 180);
near('wolf');
await step('feed wolf -> note (+25)', ['תן פטריות לזאב'], () => RH.flag('wolfFriend') && RH.has('note'));
near('fire');
await step('take torch (+10)', ['קח לפיד', 'קח אש מהמדורה', 'השתמש במדורה'], () => RH.has('torch'));

await go('scene08', 60, 180);
near('guard');
await step('show note to guard (+15)', ['הצג פתק למאבטח', 'תן פתק למאבטח'], () => RH.flag('bridgeOpen'));
expectScore(125, 'act 2 mid');

await go('scene09', 160, 180);
steps++;
if (RH.sceneId !== 'scene09') { failures.push('scene09: should be enterable with torch, got bounced to ' + RH.sceneId); }
else console.log('  ok  cave enterable with torch');
near('key_glint');
await step('rusty key (+10)', ['קח מפתח', 'קח את המפתח'], () => RH.has('rusty_key'));
near('jambox');
await step('jam jar (+10)', ['קח ריבה', 'קח צנצנת'], () => RH.has('jam'));

/* --- act 3 --- */
await go('scene11', 160, 180);
near('door');
await step('knock -> grandma opens (+5, +10 eyes)', ['דפוק בדלת', 'הקש בדלת'], () => RH.sceneId === 'scene12');
await flush();
expectScore(160, 'entered grandma house (p_enter+p_eyes)');

near('grandma');
await step('grandma gets busy (gmaBusy)', ['דבר עם סבתא'], () => RH.flag('gmaBusy'));
near('cellar_door');
await step('open basement (+20)', ['השתמש במפתח על דלת המרתף', 'השתמש במפתח על הדלת'], () => RH.flag('basementOpen') || RH.sceneId === 'scene13');
await flush();
steps++;
if (RH.sceneId !== 'scene13') { failures.push('expected to be in scene13, in ' + RH.sceneId); } else console.log('  ok  in basement');

near('tracks');
await step('see cat tracks (sawTracks)', ['הבט בעקבות', 'הבט בעקבות החתול'], () => RH.flag('sawTracks'));
near('cage');
await step('free the cat (+15)', ['פתח את הכלוב', 'פתח כלוב'], () => RH.flag('freedCat'));
near('charger');
await step('charge phone (+10)', ['השתמש בטלפון על המטען', 'השתמש בטלפון על השקע'], () => RH.flag('phoneCharged'));
near('evidence_wall');
await step('examine evidence wall (+15)', ['הבט בקיר הראיות', 'הבט בקיר'], () => RH.scored && RH.scored.p_wall);
await step('photograph evidence (+20, finale +30)', ['צלם את קיר הראיות', 'צלם את הקיר', 'צלם קיר'], () => RH.flag('finale') || RH.sceneId === 'scene14');
await flush();
await flush();

steps++;
if (RH.sceneId !== 'scene14') failures.push('expected epilogue scene14, in ' + RH.sceneId);
else console.log('  ok  reached the epilogue');
expectScore(270, 'FULL SCORE 270/270');

/* ---------- death + restore ---------- */
console.log('e2e: death & restore');
/* theEnd left the engine dead — restore into a prepared scene12 snapshot,
   which both clears the dead flag and puts us where the death test runs */
store['rh_auto'] = JSON.stringify({ sceneId: 'scene12', x: 200, y: 180, state: { seen12: 1 }, inv: ['phone', 'jam'], score: 100, scored: {} });
els['btn-restore'].click();
await flush();
els.deathbox.classList.add('hidden');
els.deathtext.textContent = '';
RH.dispatch('אכול ריבה');
for (let i = 0; i < 400 && player.target; i++) tick(48);
await flush();
await microtask();
steps++;
if (els.deathbox.classList.contains('hidden')) failures.push('eating jam should kill');
else console.log('  ok  jam death triggered: ' + els.deathtext.textContent.split('\n')[0]);
els['btn-restore'].click();
await flush();
steps++;
if (!els.deathbox.classList.contains('hidden') || RH.sceneId !== 'scene12') failures.push('restore should return to scene12 autosave');
else console.log('  ok  restore returns to autosave');

/* ---------- result ---------- */
console.log('');
if (failures.length) {
  failures.forEach(f => console.error('x ' + f));
  console.error(`\nE2E FAILED: ${failures.length}/${steps} checks failed`);
  process.exit(1);
} else {
  console.log(`E2E PASSED: all ${steps} checks ok — 270/270 reachable, death+restore working`);
}
