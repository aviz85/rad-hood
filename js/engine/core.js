/* Engine core — game loop, scenes, player, commands, UI, save/load */
(function () {
  const W = 320, H = 200;

  const RH = window.RH = {
    TITLE: 'כיפה אדומה והזאב הצמחוני',
    SUB: 'הרפתקת קווסט שכונתית בסגנון סיירה · 1989',
    MAX_SCORE: 270,
    scenes: {}, arts: {}, items: {},
    state: {}, inv: [], score: 0, scored: {},
    scene: null, sceneId: null,
    lastInput: '',
    snarks: [
      'מה? גם המתכנת לא הבין מה רצית.',
      'כיפה מרימה גבה. "אחי, תדבר ברור."',
      'נסי: הבט, קח, דבר עם..., השתמש ב... על..., תן ... ל...',
      'זה לא עבד. כמו הדיאטה של הזאב.',
      'המספר מעדיף לא להגיב לזה.',
      'פקודה מעניינת. לא חוקית, אבל מעניינת.',
    ],
    player: { x: 160, y: 170, dir: 1, moving: false, frame: 0, target: null, speed: 62, sprite: 'red', hidden: false },
  };
  const p = RH.player;

  /* ===== content registration ===== */
  RH.registerArt = (id, fn) => { RH.arts[id] = fn; };
  RH.registerScene = (def) => { RH.scenes[def.id] = def; };
  RH.registerItem = (id, def) => { def.id = id; RH.items[id] = def; };
  RH.registerMusic = (id, def) => RHAudio.registerMusic(id, def);
  RH.registerSprite = (id, def) => RHSprites.register(id, def);
  RH.registerSfx = (id, fn) => RHAudio.registerSfx(id, fn);

  /* ===== state & inventory ===== */
  RH.flag = (k, v) => { if (v === undefined) return RH.state[k]; RH.state[k] = v; return v; };
  RH.has = (id) => RH.inv.includes(id);
  RH.give = (id) => { if (!RH.has(id)) { RH.inv.push(id); RH.playSfx('pickup'); refreshInv(); } };
  RH.takeItem = (id) => { RH.inv = RH.inv.filter(i => i !== id); refreshInv(); };
  RH.addScore = (n, key) => {
    if (key) { if (RH.scored[key]) return; RH.scored[key] = 1; }
    RH.score += n;
    RH.playSfx('score');
    refreshStatus();
  };
  RH.playSfx = (n) => { try { RHAudio.playSfx(n); } catch (e) {} };

  function el(id) { return document.getElementById(id); }

  /* ===== message box (queue + Promise) ===== */
  let msgQ = [], msgResolvers = [], msgOpen = false;
  RH.say = (...lines) => {
    lines.flat().forEach(L => msgQ.push(typeof L === 'string' ? { text: L } : L));
    return new Promise(res => { msgResolvers.push(res); if (!msgOpen) nextMsg(); });
  };
  RH.sayAs = (name, ...lines) => RH.say(...lines.flat().map(t => ({ name, text: t })));

  function nextMsg() {
    const m = msgQ.shift();
    const box = el('msgbox');
    if (!m) {
      msgOpen = false;
      box.classList.add('hidden');
      const rs = msgResolvers; msgResolvers = [];
      rs.forEach(r => r());
      focusCmd();
      return;
    }
    msgOpen = true;
    box.classList.remove('hidden');
    el('msgname').textContent = m.name ? m.name + ':' : '';
    el('msgname').style.display = m.name ? 'block' : 'none';
    el('msgtext').textContent = m.text;
    RH.playSfx('blip');
  }
  function advance() { if (msgOpen) nextMsg(); }

  /* ===== death & ending ===== */
  let dead = false;
  RH.die = (text) => {
    RH.playSfx('death');
    RHAudio.stop();
    dead = true;
    msgQ = []; msgOpen = false; el('msgbox').classList.add('hidden');
    el('deathtext').textContent = text + '\n\nסיירה הייתה גאה בך.';
    el('btn-restore').style.display = localStorage.getItem('rh_auto') ? '' : 'none';
    el('deathbox').classList.remove('hidden');
  };
  RH.theEnd = (text) => {
    dead = true;
    el('deathtext').textContent = text;
    el('btn-restore').style.display = 'none';
    el('btn-restart').textContent = 'שחקי שוב';
    el('deathbox').classList.remove('hidden');
  };

  /* ===== save/load ===== */
  function snapshot() {
    return JSON.stringify({
      sceneId: RH.sceneId, x: Math.round(p.x), y: Math.round(p.y),
      state: RH.state, inv: RH.inv, score: RH.score, scored: RH.scored,
    });
  }
  function loadSlot(slot) {
    const s = localStorage.getItem(slot);
    if (!s) return false;
    try {
      const d = JSON.parse(s);
      RH.state = d.state || {}; RH.inv = d.inv || []; RH.score = d.score || 0; RH.scored = d.scored || {};
      refreshInv();
      RH.goto(d.sceneId, d.x, d.y);
      return true;
    } catch (e) { return false; }
  }
  RH.saveGame = () => { localStorage.setItem('rh_save', snapshot()); };
  RH.loadGame = () => loadSlot('rh_save');
  RH.newGame = () => {
    RH.state = {}; RH.inv = ['phone']; RH.score = 0; RH.scored = {};
    refreshInv();
    RH.goto('scene01', 260, 172);
    /* one-time onboarding tip, queued right after the scene's intro lines */
    RH.say('(טיפ מהמספר: אם נתקעת — כתבי "עזרה". אבל בינינו, ערסיות לא נתקעות.)');
  };

  /* ===== scene transitions ===== */
  let bgDirty = true;
  RH.goto = (id, x, y) => {
    const def = RH.scenes[id];
    if (!def) { console.warn('missing scene:', id); return; }
    RH.scene = def; RH.sceneId = id;
    if (x !== undefined) p.x = x;
    if (y !== undefined) p.y = y;
    const hz = def.horizon === undefined ? 120 : def.horizon;
    p.y = Math.max(hz, Math.min(197, p.y));
    p.target = null; pendingAct = null;
    p.hidden = !!def.noPlayer;
    bgDirty = true;
    refreshStatus();
    try { RHAudio.play(def.music); } catch (e) {}
    localStorage.setItem('rh_auto', snapshot());
    if (def.enter) { try { def.enter(RH); } catch (e) { console.error(e); } }
  };

  /* ===== rendering ===== */
  const cv = el('screen'), ctx = cv.getContext('2d');
  const bg = document.createElement('canvas'); bg.width = W; bg.height = H;
  const bgx = bg.getContext('2d');
  let lastBg = 0, last = 0;

  function activeHotspots() {
    return ((RH.scene && RH.scene.hotspots) || []).filter(h => { try { return !h.when || h.when(RH); } catch (e) { return true; } });
  }

  function render(t) {
    const sc = RH.scene;
    if (bgDirty || t - lastBg > 0.12) {
      bgx.fillStyle = '#000'; bgx.fillRect(0, 0, W, H);
      const f = RH.arts[sc.art];
      if (f) { try { f(bgx, P, t); } catch (e) {} }
      lastBg = t; bgDirty = false;
    }
    ctx.drawImage(bg, 0, 0);
    const ents = [];
    activeHotspots().forEach(h => {
      if (!h.sprite) return;
      const x = h.pos ? h.pos[0] : h.rect[0] + h.rect[2] / 2;
      const y = h.pos ? h.pos[1] : h.rect[1] + h.rect[3];
      const fr = h.anim ? h.anim[Math.floor(t * 2.5) % h.anim.length] : (h.frame || 'stand');
      ents.push({ y, draw: () => RHSprites.draw(ctx, h.sprite, fr, x, y, h.flip) });
    });
    if (!p.hidden) {
      const fr = p.moving ? (Math.floor(p.frame) % 2 ? 'walk1' : 'walk2') : 'stand';
      ents.push({ y: p.y, draw: () => RHSprites.draw(ctx, p.sprite, fr, p.x, p.y, p.dir < 0) });
    }
    ents.sort((a, b) => a.y - b.y).forEach(e => e.draw());
    if (sc.overlay) { try { sc.overlay(ctx, P, t); } catch (e) {} }
  }

  /* ===== movement & exits ===== */
  const keys = {};
  function update(dt) {
    const sc = RH.scene;
    const hz = sc.horizon === undefined ? 120 : sc.horizon;
    let vx = 0, vy = 0;
    if (keys.ArrowLeft) vx = -1;
    if (keys.ArrowRight) vx = 1;
    if (keys.ArrowUp) vy = -1;
    if (keys.ArrowDown) vy = 1;
    if (vx || vy) p.target = null;
    else if (p.target) {
      const dx = p.target.x - p.x, dy = p.target.y - p.y, d = Math.hypot(dx, dy);
      if (d < 2.5) {
        p.target = null;
        const pa = pendingAct; pendingAct = null;
        if (pa) pa();
      } else { vx = dx / d; vy = dy / d; }
    }
    if (vx || vy) {
      p.moving = true;
      p.frame += dt * 7;
      if (vx) p.dir = vx > 0 ? 1 : -1;
      p.x = Math.max(1, Math.min(319, p.x + vx * p.speed * dt));
      p.y = Math.max(hz, Math.min(197, p.y + vy * p.speed * dt));
      const ex = sc.exits || {};
      const tryExit = (dir) => {
        const e = ex[dir];
        if (!e) return false;
        if (sc.beforeExit && sc.beforeExit(dir, RH) === false) {
          if (dir === 'left') p.x += 8; if (dir === 'right') p.x -= 8;
          if (dir === 'up') p.y += 8; if (dir === 'down') p.y -= 8;
          p.target = null;
          return true;
        }
        const dst = RH.scenes[e.to];
        const dhz = dst && dst.horizon !== undefined ? dst.horizon : 120;
        const defs = { left: { x: 312, y: p.y }, right: { x: 8, y: p.y }, up: { x: p.x, y: 194 }, down: { x: p.x, y: dhz + 6 } };
        RH.goto(e.to, e.x !== undefined ? e.x : defs[dir].x, e.y !== undefined ? e.y : defs[dir].y);
        return true;
      };
      if (p.x <= 1 && vx < 0) tryExit('left');
      else if (p.x >= 319 && vx > 0) tryExit('right');
      else if (p.y <= hz && vy < 0) tryExit('up');
      else if (p.y >= 197 && vy > 0) tryExit('down');
    } else p.moving = false;
  }

  /* ===== verb execution ===== */
  RH.near = (h) => {
    const r = h.rect;
    const cx = Math.max(r[0], Math.min(r[0] + r[2], p.x));
    const cy = Math.max(r[1], Math.min(r[1] + r[3], p.y));
    return Math.hypot(p.x - cx, p.y - cy) < 58;
  };

  let pendingAct = null;
  const NEED_NEAR = ['look', 'take', 'talk', 'use', 'open', 'give', 'show', 'eat', 'push', 'knock', 'read', 'photo'];
  const DEFAULTS = {
    look: 'לא רואים שם שום דבר מיוחד. כמו בטלוויזיה ביום שישי.',
    take: 'זה לא עובר לתיק. עזבי.',
    talk: 'אין תגובה. מביך לשני הצדדים.',
    open: 'זה לא נפתח. נסי קסם. או ידית.',
    use: 'זה לא עושה כלום. מאכזב, נכון?',
    give: 'לא נראה שמתבשלת פה עסקה.',
    show: 'הקהל לא מתרשם.',
    eat: 'כיפה: "אני לא מכניסה את זה לפה. יש גבולות."',
    read: 'אין שם מה לקרוא. תנסי ספרייה.',
    knock: 'דפקת. כלום. אולי תנסי דלת?',
    push: 'זה לא זז. כמו תור בקופת חולים.',
    photo: 'אין טעם לצלם את זה. זה לא יעלה לסטורי.',
    call: 'למי בדיוק? תהיי ספציפית.',
    swim: 'אין פה איפה לשחות. וגם ככה אין מציל.',
  };

  function runHandler(handler, h, itemId) {
    if (typeof handler === 'function') { try { handler(RH, h, itemId); } catch (e) { console.error(e); } }
    else if (typeof handler === 'string') RH.say(handler);
    else snark();
  }
  function snark() { RH.say(RH.snarks[Math.floor(Math.random() * RH.snarks.length)]); }

  function walkPointFor(h) {
    const sc = RH.scene;
    const hz = sc.horizon === undefined ? 120 : sc.horizon;
    return {
      x: Math.max(6, Math.min(314, h.rect[0] + h.rect[2] / 2)),
      y: Math.max(hz, Math.min(196, h.rect[1] + h.rect[3] + 10)),
    };
  }

  function doVerbOn(verb, h, itemId) {
    if (NEED_NEAR.includes(verb) && !RH.near(h)) {
      p.target = walkPointFor(h);
      pendingAct = () => doVerbOn(verb, h, itemId);
      return;
    }
    let handler;
    if (verb === 'give') handler = h.give && (h.give[itemId] || h.give['*']);
    else if (verb === 'show') handler = (h.show && (h.show[itemId] || h.show['*'])) || (h.give && (h.give[itemId] || h.give['*']));
    else if (verb === 'use' && itemId) handler = h.use && (h.use[itemId] || h.use['*']);
    else if (verb === 'use') handler = (h.use && h.use['*']) || h.open || h.push;
    else handler = h[verb];
    if (handler === undefined) handler = DEFAULTS[verb];
    runHandler(handler, h, itemId);
  }

  function findHotspot(noun) {
    if (!noun) return null;
    return activeHotspots().find(h => RHParser.matchNoun(noun, [h.id].concat(h.names || [])));
  }
  function findInvItem(noun) {
    if (!noun) return null;
    return RH.inv.find(id => {
      const d = RH.items[id];
      return d && RHParser.matchNoun(noun, [id, d.name].concat(d.names || []));
    });
  }

  /* ===== command dispatch ===== */
  function dispatch(text) {
    RH.lastInput = text;
    const { verb, noun, target } = RHParser.parse(text);
    const sc = RH.scene;
    if (sc.onCommand) {
      try { if (sc.onCommand(RH, verb || '', noun || '', target || '') === true) return; } catch (e) { console.error(e); }
    }
    if (!verb) { snark(); return; }

    if (verb === 'inv') {
      if (!RH.inv.length) RH.say('התיק ריק. עצוב.');
      else RH.say('בתיק שלך: ' + RH.inv.map(id => (RH.items[id] && RH.items[id].name) || id).join(', ') + '.');
      return;
    }
    if (verb === 'help') {
      RH.say(
        'פקודות: הבט [במשהו] · קח · דבר עם... · השתמש ב... על... · תן ... ל... · פתח · קרא · אכול · דפוק בדלת · צלם · חפצים · שמור · טען.',
        'הליכה: חיצי המקלדת או קליק על המסך. יציאה מהמסך — ללכת עד הקצה.',
      );
      return;
    }
    if (verb === 'save') { RH.saveGame(); RH.say('המשחק נשמר. ההתקדמות שלך בטוחה יותר מהסלסלה.'); return; }
    if (verb === 'load') { if (!RH.loadGame()) RH.say('אין משחק שמור. תתחילי לחיות בהווה.'); return; }

    if (verb === 'look' && !noun) {
      RH.say(sc.look || 'מקום. יש בו דברים. תהיי ספציפית.');
      return;
    }
    if (verb === 'walk') {
      const h = findHotspot(noun);
      if (h) p.target = walkPointFor(h);
      else RH.say('לכי עם החיצים או קליק. אני מספר, לא GPS.');
      return;
    }
    if (verb === 'give' || verb === 'show') {
      const it = findInvItem(noun);
      if (!it) { RH.say('אין לך דבר כזה בתיק. בדקי: "חפצים".'); return; }
      const h = findHotspot(target || '');
      if (!h) { RH.say('למי? אין פה כזה.'); return; }
      doVerbOn(verb, h, it);
      return;
    }
    if (verb === 'use') {
      const it = findInvItem(noun);
      if (it && target) {
        const h = findHotspot(target);
        if (!h) { RH.say('על מה בדיוק? אין פה דבר כזה.'); return; }
        doVerbOn('use', h, it);
        return;
      }
      if (it) {
        const idef = RH.items[it];
        if (idef.use) runHandler(idef.use, null, it);
        else RH.say('להשתמש ב' + idef.name + ' על מה? נסי: השתמש ב... על...');
        return;
      }
      const h = findHotspot(noun);
      if (h) { doVerbOn('use', h, null); return; }
      snark();
      return;
    }

    const h = findHotspot(noun);
    if (h) { doVerbOn(verb, h, findInvItem(noun)); return; }

    const it = findInvItem(noun);
    if (it) {
      const idef = RH.items[it];
      let handler = verb === 'look' ? idef.desc : idef[verb];
      if (typeof handler === 'function' && verb === 'look') { RH.say(handler(RH)); return; }
      if (handler === undefined && verb === 'take') handler = 'זה כבר אצלך בתיק, נשמה.';
      if (handler === undefined) handler = DEFAULTS[verb];
      runHandler(handler, null, it);
      return;
    }
    if (verb === 'look') { RH.say('את לא מוצאת "' + noun + '" פה.'); return; }
    if (DEFAULTS[verb]) { RH.say(DEFAULTS[verb]); return; }
    snark();
  }
  RH.dispatch = dispatch;

  /* ===== UI ===== */
  function refreshStatus() {
    el('st-name').textContent = RH.scene ? RH.scene.name : RH.TITLE;
    el('st-score').textContent = 'ניקוד: ' + RH.score + ' מתוך ' + RH.MAX_SCORE;
  }
  function refreshInv() {
    const c = el('inv-items');
    c.innerHTML = '';
    RH.inv.forEach(id => {
      const d = RH.items[id];
      const s = document.createElement('span');
      s.className = 'inv-item';
      s.textContent = d ? d.name : id;
      s.onclick = () => {
        if (!d) return;
        RH.say(typeof d.desc === 'function' ? d.desc(RH) : (d.desc || d.name));
      };
      c.appendChild(s);
    });
  }
  RH.refreshInv = refreshInv;

  const cmd = el('cmd');
  function focusCmd() { setTimeout(() => cmd.focus(), 0); }
  RH.focusCmd = focusCmd;

  cmd.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (msgOpen) { advance(); e.preventDefault(); return; }
      const v = cmd.value.trim();
      cmd.value = '';
      if (v && !dead) dispatch(v);
    }
  });
  window.addEventListener('keydown', e => {
    /* skip if the cmd input handler already consumed this Enter (avoids double-advance) */
    if (e.key === 'Enter' && msgOpen && !e.defaultPrevented) { advance(); e.preventDefault(); return; }
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      keys[e.key] = true;
      e.preventDefault();
    }
  });
  window.addEventListener('keyup', e => { delete keys[e.key]; });
  el('msgbox').addEventListener('click', advance);

  function hotspotAtPoint(x, y) {
    return activeHotspots().find(hh => {
      const [rx, ry, rw, rh2] = hh.rect;
      return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh2;
    });
  }

  /* hover highlight — pointer cursor + hotspot name label near the mouse */
  const hover = document.createElement('div');
  hover.id = 'hoverlabel';
  cv.parentElement.appendChild(hover);
  cv.addEventListener('mousemove', e => {
    const r = cv.getBoundingClientRect();
    const h = (!msgOpen && !dead && RH.scene)
      ? hotspotAtPoint((e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height)
      : null;
    if (h) {
      hover.textContent = h.names[0];
      hover.style.display = 'block';
      hover.style.left = (e.clientX - r.left + 16) + 'px';
      hover.style.top = (e.clientY - r.top + 12) + 'px';
      cv.style.cursor = 'pointer';
    } else {
      hover.style.display = 'none';
      cv.style.cursor = 'crosshair';
    }
  });
  cv.addEventListener('mouseleave', () => { hover.style.display = 'none'; });

  cv.addEventListener('click', e => {
    if (msgOpen) { advance(); return; }
    if (dead || !RH.scene) return;
    const r = cv.getBoundingClientRect();
    const x = (e.clientX - r.left) * W / r.width;
    const y = (e.clientY - r.top) * H / r.height;
    const h = hotspotAtPoint(x, y);
    if (h) doVerbOn('look', h);
    else {
      const hz = RH.scene.horizon === undefined ? 120 : RH.scene.horizon;
      p.target = { x: Math.max(2, Math.min(318, x)), y: Math.max(hz, Math.min(197, y)) };
      pendingAct = null;
    }
  });

  el('btn-restore').addEventListener('click', () => {
    el('deathbox').classList.add('hidden');
    dead = false;
    loadSlot('rh_auto');
  });
  el('btn-restart').addEventListener('click', () => location.reload());

  /* ===== main loop ===== */
  function frame(t) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (t - last) / 1000);
    last = t;
    if (RH.scene) {
      if (!msgOpen && !dead) update(dt);
      render(t / 1000);
    }
  }
  requestAnimationFrame(frame);
  refreshStatus();
})();
