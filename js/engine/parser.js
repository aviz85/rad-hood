/* Hebrew parser — decodes free-form commands into verb + noun + target */
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

  const FINALS = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };

  function normalize(s) {
    s = String(s || '').replace(/[״”“"'.,!?:;()\-_]/g, ' ').replace(/\s+/g, ' ').trim();
    return s.split('').map(c => FINALS[c] || c).join('');
  }

  /* normalize verb synonym lists and prepositions once, so final letters always match */
  for (const v in VERBS) VERBS[v] = VERBS[v].map(normalize);
  const PREPS = ['את', 'עם', 'אל', 'של', 'בבקשה', 'אנא', 'יא', 'כבר', 'מתחת', 'ליד'].map(normalize);

  function parse(text) {
    const tk = normalize(text).split(' ').filter(Boolean);
    if (!tk.length) return {};
    let verb = null;
    for (const v in VERBS) {
      if (VERBS[v].includes(tk[0])) { verb = v; break; }
    }
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

  /* Noun-to-synonym matching — forgiving of Hebrew prefixes (he/bet/lamed) and partial forms */
  function matchNoun(noun, names) {
    const n = normalize(noun);
    if (!n) return false;
    return (names || []).some(m => {
      const x = normalize(m);
      if (!x || x.length < 2) return false;
      if (n === x || n === 'ה' + x || n === 'ב' + x || n === 'ל' + x) return true;
      if (n.length >= 2 && (n.includes(x) || x.includes(n))) return true;
      return false;
    });
  }

  window.RHParser = { VERBS, parse, matchNoun, normalize };
})();
