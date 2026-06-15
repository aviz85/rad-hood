/* Hebrew parser — decodes free-form commands into verb + noun + target.
   Forgiving by design: handles Hebrew prefix letters (ו/ה/ב/ל/כ/מ/ש), the
   infinitive ל- on verbs ("לדבר", "לקחת"), and small typos via edit distance,
   so players rarely get stuck on phrasing. */
(function () {
  const VERBS = {
    look:  ['הבט', 'הביטי', 'תביט', 'תביטי', 'הסתכל', 'הסתכלי', 'תסתכל', 'תסתכלי', 'בדוק', 'בדקי', 'תבדוק', 'תבדקי', 'ראה', 'תראי', 'חפש', 'חפשי', 'תחפש', 'תחפשי'],
    take:  ['קח', 'קחי', 'תיקח', 'תיקחי', 'תקח', 'תקחי', 'הרם', 'הרימי', 'תרים', 'תרימי', 'אסוף', 'אספי', 'תאסוף', 'תאספי'],
    talk:  ['דבר', 'דברי', 'תדבר', 'תדברי', 'שוחח', 'שוחחי', 'תגיד', 'תגידי', 'שאל', 'שאלי', 'תשאל', 'תשאלי'],
    use:   ['השתמש', 'השתמשי', 'תשתמש', 'תשתמשי'],
    give:  ['תן', 'תני', 'תיתן', 'תיתני'],
    show:  ['הצג', 'הציגי', 'תציג', 'הראה', 'הראי'],
    open:  ['פתח', 'פתחי', 'תפתח', 'תפתחי'],
    eat:   ['אכול', 'אכלי', 'תאכל', 'תאכלי', 'טעם', 'טעמי', 'תטעם', 'תטעמי', 'לאכול', 'שתה', 'שתי'],
    read:  ['קרא', 'קראי', 'תקרא', 'תקראי'],
    knock: ['דפוק', 'דפקי', 'תדפוק', 'תדפקי', 'הקש', 'הקישי', 'תקיש'],
    push:  ['דחוף', 'דחפי', 'תדחוף', 'לחץ', 'לחצי', 'תלחץ', 'תלחצי', 'הזז', 'הזיזי'],
    call:  ['התקשר', 'התקשרי', 'תתקשר', 'תתקשרי', 'צלצל', 'צלצלי', 'חייג', 'חייגי'],
    photo: ['צלם', 'צלמי', 'תצלם', 'תצלמי'],
    walk:  ['לך', 'לכי', 'גש', 'גשי', 'זוז', 'זוזי', 'התקרב', 'התקרבי'],
    swim:  ['שחה', 'שחי', 'תשחה', 'קפוץ', 'קפצי', 'תקפוץ'],
    inv:   ['חפצים', 'תיק', 'מלאי', 'ציוד'],
    help:  ['עזרה', 'הוראות', 'פקודות'],
    save:  ['שמור', 'שמרי'],
    load:  ['טען', 'טעני', 'שחזר', 'שחזרי'],
  };

  /* nice, player-facing label per verb — used for "did you mean" + autocomplete chips */
  const VERB_LABEL = {
    look: 'הבט', take: 'קח', talk: 'דבר עם', use: 'השתמש ב', give: 'תן', show: 'הצג',
    open: 'פתח', eat: 'אכול', read: 'קרא', knock: 'דפוק', push: 'דחוף', call: 'התקשר',
    photo: 'צלם', walk: 'לך אל', swim: 'שחה', inv: 'חפצים', help: 'עזרה', save: 'שמור', load: 'טען',
  };

  const FINALS = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };

  function normalize(s) {
    s = String(s || '').replace(/[״”“"'.,!?:;()\-_]/g, ' ').replace(/\s+/g, ' ').trim();
    return s.split('').map(c => FINALS[c] || c).join('');
  }

  /* normalize verb synonym lists and prepositions once, so final letters always match */
  for (const v in VERBS) VERBS[v] = VERBS[v].map(normalize);
  const PREPS = ['את', 'עם', 'אל', 'של', 'בבקשה', 'אנא', 'יא', 'כבר', 'מתחת', 'ליד'].map(normalize);

  /* Hebrew "letters of use" (אותיות השימוש) that can prefix a word, plus common
     two-letter combos. We grow the known NAME with these (safe) rather than peel
     them off unknown player input (risky — "מזרקה" must not become "זרקה"). */
  const PFX1 = ['ה', 'ב', 'ל', 'ו', 'כ', 'מ', 'ש'];
  const PFX2 = ['וה', 'שה', 'מה', 'כש', 'וב', 'ול', 'ומ', 'וכ', 'לכ', 'בכ', 'שב', 'כשה', 'ושה'];
  function prefixForms(x) {
    const set = new Set([x]);
    for (const p of PFX1) set.add(p + x);
    for (const p of PFX2) set.add(p + x);
    return set;
  }

  /* Levenshtein edit distance — strings here are short (a word or two). */
  function lev(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      prev = cur;
    }
    return prev[n];
  }

  /* How well does player input `noun` match a single candidate `name`?  0..100 */
  function scoreName(noun, name) {
    const n = normalize(noun), x = normalize(name);
    if (!n || !x || x.length < 2) return 0;
    if (n === x) return 100;
    if (prefixForms(x).has(n)) return 92;            // "הפנסיונר", "ולפיד", "כשהזאב"…
    if (n.length >= 2 && (n.includes(x) || x.includes(n))) return 78; // partial / prefixed-and-typo'd
    const d = lev(n, x);
    if (d === 1 && Math.max(n.length, x.length) >= 4) return 70;  // one typo (skip 3-letter words: too collision-prone)
    if (d === 2 && Math.min(n.length, x.length) >= 6) return 62;  // two typos, only on long words
    return 0;
  }

  /* best score of `noun` against a list of candidate names */
  function matchScore(noun, names) {
    const n = normalize(noun);
    if (!n) return 0;
    let best = 0;
    for (const x of (names || [])) {
      const s = scoreName(n, x);
      if (s > best) best = s;
    }
    return best;
  }

  /* Noun matching — boolean API kept for scene onCommand handlers. */
  function matchNoun(noun, names) {
    return matchScore(noun, names) >= 62;
  }

  /* peel one leading prefix letter off a verb token when the rest is long enough
     (handles the infinitive ל- and a stray ו-) */
  function stripVerbPfx(w) {
    if (w.length > 3 && PFX1.includes(w[0])) return w.slice(1);
    return w;
  }

  /* closest verb to a token, by edit distance, with the matching distance */
  function verbScore(token) {
    const cands = [token];
    const s = stripVerbPfx(token);
    if (s !== token) cands.push(s);
    let best = null, bd = 99;
    for (const v in VERBS) {
      for (const w of VERBS[v]) {
        for (const c of cands) {
          const d = lev(c, w);
          if (d < bd) { bd = d; best = v; }
        }
      }
    }
    return { verb: best, dist: bd };
  }

  /* resolve a token to a verb: exact → infinitive/prefix-stripped → one typo */
  function verbOf(token) {
    for (const v in VERBS) if (VERBS[v].includes(token)) return v;
    const s = stripVerbPfx(token);
    if (s !== token) for (const v in VERBS) if (VERBS[v].includes(s)) return v;
    const { verb, dist } = verbScore(token);
    return dist <= 1 ? verb : null;
  }

  /* looser lookup for a "did you mean" hint (allows two typos) */
  function suggestVerb(token) {
    if (!token) return null;
    const { verb, dist } = verbScore(normalize(token));
    if (verb && dist <= 2) return { verb, word: VERB_LABEL[verb] };
    return null;
  }

  function parse(text) {
    const tk = normalize(text).split(' ').filter(Boolean);
    if (!tk.length) return {};
    const verb = verbOf(tk[0]);
    let rest = tk.slice(verb ? 1 : 0);
    let target = null;

    if (verb === 'use') {
      const i = rest.indexOf('על');
      if (i >= 0) { target = rest.slice(i + 1).join(' '); rest = rest.slice(0, i); }
    }
    if (verb === 'give' || verb === 'show') {
      // "give X to Y" — the target is the last token starting with the Hebrew prefix lamed
      for (let i = rest.length - 1; i > 0; i--) {
        const w = rest[i];
        if (w.length > 2 && w[0] === 'ל') {
          target = [w.slice(1)].concat(rest.slice(i + 1)).join(' ');
          rest = rest.slice(0, i);
          break;
        }
      }
    }
    const noun = rest.filter(w => !PREPS.includes(w)).join(' ');
    return { verb, noun, target, raw: text };
  }

  window.RHParser = {
    VERBS, VERB_LABEL, parse, matchNoun, matchScore, scoreName, normalize,
    verbOf, suggestVerb, lev,
  };
})();
