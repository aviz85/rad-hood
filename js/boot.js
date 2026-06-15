/* Boot — title screen, start/load */
(function () {
  function el(id) { return document.getElementById(id); }
  const tb = el('titlebox');
  el('title-h1').textContent = RH.TITLE;
  el('title-h2').textContent = RH.SUB;

  let titleTimer = setInterval(() => {
    const c = el('screen').getContext('2d');
    const f = RH.arts['art_title'];
    if (f) { try { f(c, P, performance.now() / 1000); } catch (e) {} }
  }, 120);

  let started = false;
  function start(load) {
    if (started) return;
    started = true;
    clearInterval(titleTimer);
    tb.classList.add('hidden');
    el('hud-controls').classList.remove('hidden');
    RHAudio.ensure();
    if (load && RH.loadGame()) { RH.focusCmd(); return; }
    RH.newGame();
    RH.focusCmd();
  }

  el('btn-start').addEventListener('click', () => start(false));
  el('btn-load').addEventListener('click', () => start(true));
  tb.addEventListener('click', e => {
    if (e.target === tb) { RHAudio.ensure(); try { RHAudio.play('m_title'); } catch (err) {} }
  });
  window.addEventListener('keydown', e => {
    if (!tb.classList.contains('hidden') && e.key === 'Enter') start(false);
  });
})();
