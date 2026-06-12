/* scene13 — The basement. The climax of the game.
   Beats (per GAME-SPEC section 7 + design/story.md section 8 + design/review.md):
   - evidence wall look: +15 p_wall (story.md canonical description).
   - open cage: +15 p_cat, flag freedCat, cat sprite then waits by the stairs.
   - use phone on charger: +10 p_charge, flag phoneCharged ("37 missed calls" payoff).
   - photo evidence_wall (when phoneCharged): photos, +20 p_photo, then the finale
     cutscene (story.md section 8, 15 beats) -> +30 p_finale, flag finale -> scene14.
   - Trap: ANY command targeting charger or cage before sawTracks = death.
     Death lines are jokes.md #22 (charger) and #23 (cage), verbatim.
   - look tracks sets sawTracks ("מתוק עקף את האמצע. חכם ממך.").
   - Cop's killer line verbatim (review.md, non-negotiable); Zevik's window apology
     lands exactly two beats after his heroism; the Narrator's one sincere beat,
     instantly retracted, is the last line before goto. */

/* Trap gate: true (and kills) when the player sends any command at the cage or
   the charger before noticing the safe path. freedCat implies sawTracks, so the
   freed cat can never re-trigger the trap. */
function rh13Trapped(g, towardCage) {
  if (g.flag('sawTracks') || g.flag('finale')) return false;
  g.die(
    towardCage
      ? 'מתוק החתול עקף את מרכז החדר בקשת רחבה. את הלכת ישר. בגלל זה הוא בכלוב ואת בקליק-קלאק.'
      : 'רצת ישר למטען בלי להסתכל על הרצפה. מלכודת דובים. לרגל שלך יש עכשיו דעות.'
  );
  return true;
}

/* The finale cutscene — story.md section 8, staged so each sfx lands with its beat.
   g.say resolves when the player clicks through the queued messages, so chaining
   .then() gives us creak/crash/siren at the right dramatic moments. */
function rh13Finale(g) {
  g.flag('finale', 1); // lock the room: trap moot, stairs moot, no double-fire
  g.playSfx('camera');
  g.addScore(20, 'p_photo');
  g.give('photos');
  g
    .say(
      'צילמת את קיר הראיות. עשרים שנה של הפללה — עכשיו בגלריה שלך, בין צילומי מסך של מתכונים.'
    )
    .then(() => {
      // The creak. She was always going to hear the camera.
      g.playSfx('creak');
      g.say('מאחורייך. על המדרגות. את יודעת מי. אני יודע מי. בואי נעמיד פנים שזאת הפתעה.');
      g.sayAs(
        'סבתא',
        'לאן ממהרים, מתוקה? עוד לא הראיתי לך איפה אני שומרת את הדברים המיוחדים. אה. כבר מצאת.'
      );
      g.sayAs(
        'כיפה',
        g.flag('freedCat')
          ? 'סבתא. קיר עם תמונות של זאביק, חוטים אדומים, וחתול חטוף שכבר שחררתי. תסבירי לאט. אני רוצה לזכור הכל לעדות.'
          : 'סבתא. קיר עם תמונות של זאביק, חוטים אדומים, וכלוב עם החתול של הקיוסק. תסבירי לאט. אני רוצה לזכור הכל לעדות.'
      );
      g.sayAs(
        'סבתא',
        'זה לא יפה לחטט בדברים של סבתא... אבל אל תדאגי, בובה\'לה. סבתא יודעת לשמור סוד. סבתא יודעת לשמור הרבה דברים. לפעמים שנים.'
      );
      return g.sayAs(
        'סבתא',
        'תיזהרי איפה שאת דורכת, פצקעלע. המלכודונות האלה עלו לי הון, וחבל לבזבז אחת על מישהי מהמשפחה.'
      );
    })
    .then(() => {
      // The window explodes. Twenty years of doormat, one perfect entrance.
      g.playSfx('crash');
      g.say('החלון מתפוצץ פנימה. זאביק עומד בתוך הזכוכיות, זקוף. בפעם הראשונה במשחק — הקול שלו לא רועד.');
      g.sayAs(
        'זאביק',
        'תתרחקי מהילדה. עשרים שנה שתקתי. עשרים שנה ברחתי. זה נגמר עכשיו — והפעם, עו"ד שועלי מצלם!'
      );
      g.sayAs(
        'כיפה',
        'זאביק?! נשמה... תזמון של אלופים. ובאת דרך החלון. יש דלת, אבל סבבה, יש לזה נוכחות.'
      );
      return g.sayAs(
        'סבתא',
        'אה. הזאב. בדיוק חשבתי עליך, חמודי — נשארה לי מסגרת ריקה על הקיר.'
      );
    })
    .then(() => {
      // Sirens. Zevik knows people. The people wear a trench coat.
      g.playSfx('siren');
      g.sayAs('זאביק', 'אני מכיר אנשים.');
      g.say('שוטר היער יורד במדרגות. מבט אחד בקיר. מבט אחד בצילומים בטלפון שלך. הוא ראה הכל — אבל תיק כזה, אף פעם.');
      g.sayAs(
        'השוטר',
        'קיר ראיות, חתול חטוף, וריבה שמופיעה בשלושה עשר תיקים פתוחים. את עצורה.'
      );
      g.sayAs('השוטר', 'גברת, יש לך זכות לשמור על שתיקה. הריבה שלך — אין לה.');
      g.sayAs(
        'השוטר',
        g.flag('freedCat')
          ? 'קחו את הזקנה. תאבטחו את המרתף. והחתול — שמישהו ירשום שהוא שוחרר באירוע. יש לו בעלים שמחכה ליד קיוסק.'
          : 'קחו את הזקנה. תאבטחו את המרתף. ושמישהו ישחרר את החתול הזה רשמית — יש לו בעלים שמחכה ליד קיוסק.'
      );
      g.sayAs(
        'סבתא',
        'אל תבכי עליי, כיפה\'לה. סבתא מסתדרת בכל מקום — ולשוטרת הזאת יש פנים של מישהי שעוד לא טעמה ריבה טובה.'
      );
      return g.sayAs(
        'סבתא',
        'תשקי את הצמחים בערוגה, מתוקה. רק את הערוגה. לא לחפור. סבתא תדע אם חפרת.'
      );
    })
    .then(() => {
      // Two seconds after heroism, Zevik is fully Zevik again.
      g.sayAs(
        'זאביק',
        'סליחה על החלון... אני אשלם על הזכוכית. ואם מישהו רעב — יש לי פטריות על הגריל, הן בדיוק בשלב המושלם, וזה יהיה חבל...'
      );
      g.sayAs(
        'כיפה',
        'תכלס... הצלתי את היער, את הזאב ואת החתול לפני ארוחת ערב. בקטנה. לגמרי בקטנה.'
      );
      // Continuity: the cat is out either way (the cop ordered it). Score for
      // p_cat is only awarded through the cage — kindness pays, paperwork doesn't.
      g.flag('freedCat', 1);
      g.addScore(30, 'p_finale');
      return g.say(
        '+30 נקודות. סיירה הייתה גאה. גם אני, רגע אחד, ה... לא חשוב. לא אמרתי כלום. תתקדמי לפני שאני מתרגש.'
      );
    })
    .then(() => {
      g.goto('scene14', 160, 170);
    });
}

RH.registerScene({
  id: 'scene13',
  name: 'המרתף',
  art: 'art13',
  music: 'm_danger',
  horizon: 124,

  look:
    'מרתף באור של נורה חשופה: קיר ראיות עם חוטים אדומים, כלוב, שולחן ייצור ריבה, ומטען בקיר. ' +
    'באמצע החדר — שכבת קש, ומשהו מתחתיה מבריק. הרצפה פה מספרת סיפור. כדאי להקשיב לה.',

  enter(g) {
    // Idempotent first-entry beat (seen13).
    if (!g.flag('seen13')) {
      g.flag('seen13', 1);
      g.say(
        'מרתף. נורה חשופה, קיר ראיות, כלוב, ושולחן ייצור ריבה. או כמו שסבתא קוראת לזה — "שימורים".'
      );
      g.playSfx('meow');
      g.say('מהכלוב בפינה עולה יללה קטנה ועייפה.');
      g.sayAs(
        'כיפה',
        'סבבה. מרתף עם קיר רצח וכלוב. הכל סבבה. אני לגמרי רגועה, רואים עליי, נכון?',
        'מתוק! רגע, נשמה, אני באה. ...אחרי שאני מבינה מה הקטע של הקש הזה באמצע.'
      );
      // The Narrator's Grandma-fear payoff + the one honest gameplay hint.
      g.say(
        'אני אשאר פה ליד המדרגות. מה? למספר מותר לפחד, ראית את הסריגה שלה. ...ותסתכלי על הרצפה לפני שאת זזה. ברצינות נדירה: הרצפה.'
      );
    }
  },

  hotspots: [
    /* The freed cat — listed before the cage so "חתול"/"מתוק" resolve to him
       once he is out. He waits by the stairs, far from the straw. Smart cat. */
    {
      id: 'cat',
      names: ['חתול', 'מתוק', 'חתלתול'],
      rect: [52, 158, 16, 14],
      sprite: 'cat',
      pos: [60, 170],
      when: g => g.flag('freedCat') && !g.flag('finale'),
      look:
        'מתוק. החתול מהפוסטר של הקיוסק, יושב ליד המדרגות ומלקק כתף כאילו לא בילה שבוע בכלוב. חתולים לא עושים דרמה — בשביל זה יש אותך.',
      talk(g) {
        g.playSfx('meow');
        g.sayAs('כיפה', 'עוד קצת, כפרה. מסיימים פה משהו ועפים הביתה לקיוסק.');
        g.say('הוא מצמץ לאט. אצל חתולים זה או "תודה" או "בסדר, בני אנוש". כנראה שניהם.');
      },
      take:
        'הוא מתוק, לא מזוודה. הוא ילך אחרייך כשזה יתאים לו — חתול נשאר חתול, גם אחרי חילוץ.',
      give: {
        seeds:
          'הצעת לו גרעינים. הוא הריח, הסתכל עלייך, והתיישב עם הגב. ביקורת קולינרית של חתול: קצרה וסופית.',
        basket:
          'המאפים האלה שרדו יער שלם, סבתא, ומרתף. הם לא ייפלו עכשיו מול חתול עם עיניים גדולות.',
        '*': 'הוא חתול. הוא לא רוצה דברים. הוא רוצה שדברים יקרו בשבילו.',
      },
      eat: 'את לא אוכלת את מתוק. אפילו לא בתור בדיחה. תתביישי לך, והלאה.',
      push: 'דחפת קלות את החתול. החתול לא זז. במאבק הרצונות הזה כבר נקבע מנצח, ולא את.',
      photo:
        'צילמת אותו? הוא הסתובב בדיוק כשנגעת בכפתור. חתולים יודעים. תשמרי את הסוללה לקיר.',
    },

    {
      id: 'evidence_wall',
      names: ['קיר', 'קיר ראיות', 'ראיות', 'תמונות', 'חוטים', 'מפות', 'כתבות'],
      rect: [110, 52, 90, 64],
      look(g) {
        // +15 p_wall — story.md canonical description (addScore dedupes by key).
        g.addScore(15, 'p_wall');
        g.say(
          'קיר ראיות: מפה של היער, תמונות של זאביק עם איקסים אדומים, חוטים אדומים בין כתבות עיתון — כולן עם אותו כתב יד בשוליים.',
          'עשרים שנה של הפללה, מסודרת כמו אלבום משפחתי. יש אפילו מדבקות. מדבקות, אחותי.'
        );
      },
      read:
        '"זאב נצפה ביער. שוב." — אותה כותרת, עשרים תאריכים שונים, ובשוליים של כל גזיר — אותו כתב יד עגול ומסודר. מהשלט ביער. מהצנצנות. ממנה.',
      photo(g) {
        if (g.flag('finale')) return;
        if (!g.flag('phoneCharged')) {
          g.say('לחצת על הכפתור. הטלפון נשאר אבן דקורטיבית — סוללה מתה מאז מסך הפתיחה.');
          g.sayAs('כיפה', 'נו באמת. ...רגע. יש שקע שם בפינה. מי שמה מטען במרתף — תודה לה, ניצלנו אותה.');
          return;
        }
        rh13Finale(g);
      },
      use: {
        phone(g) {
          // "use phone on wall" routes to the same photo logic.
          if (g.flag('finale')) return;
          if (!g.flag('phoneCharged')) {
            g.say('טלפון מת מול קיר ראיות. ב-1989 קוראים לזה "פוטנציאל". קודם חשמל, אחר כך צדק.');
            return;
          }
          rh13Finale(g);
        },
        jam: 'להצמיד את הצנצנת לקיר? היא כבר חלק מהתיק. אל תערבבי ראיות, יש פה שיטה.',
        '*': 'הקיר הזה לא צריך עזרה. הוא צריך עדים. תכווני מצלמה, לא חפצים.',
      },
      take:
        'עשרים שנה של ראיות לא נכנסות לסלסלה אחת. בשביל זה המציאו את הצילום. רמז.',
      talk(g) {
        g.sayAs('כיפה', 'מי עשתה אותך, אה? ...טוב, את זה אפילו אני יודעת.');
        g.say('הקיר שתק. עם כתב יד כזה בשוליים, גם לו אין מה להוסיף.');
      },
      push: 'דחפת את הקיר. הקיר נשאר במקום, החוטים האדומים רעדו קצת. גם הם מפוחדים.',
      eat: 'לאכול ראיות זה טריק של עבריינים, וזה בדיוק הצד הלא נכון של הקיר הזה.',
      knock: 'נקשת על קיר הראיות. אף אחד לא ענה. כל מי שקשור לקיר הזה או נעלם, או סורגת למעלה.',
    },

    {
      id: 'cage',
      names: ['כלוב', 'סורגים', 'מנעול', 'בריח'],
      rect: [44, 128, 38, 34],
      look(g) {
        if (rh13Trapped(g, true)) return;
        if (g.flag('freedCat')) {
          g.say('כלוב ריק, דלת פתוחה. בפעם הראשונה מאז שנכנסת לבית הזה — משהו פה נראה כמו שצריך.');
          return;
        }
        g.say(
          'כלוב, ובתוכו חתול מפוספס עם מבט של אסיר ותיק. מתוק. מהפוסטר. הקערה שלו בקיוסק עדיין מלאה — מחכה.'
        );
      },
      open(g) {
        if (rh13Trapped(g, true)) return;
        if (g.flag('freedCat')) {
          g.say('הכלוב כבר פתוח וריק. הדייר לשעבר עבר לאזור המדרגות ולא משלם שכירות.');
          return;
        }
        g.flag('freedCat', 1);
        g.addScore(15, 'p_cat');
        g.playSfx('meow');
        g.say('הבריח חורק, הדלת נפתחת, ומתוק זולג החוצה — צמוד לקיר, רחוק מהקש. מקצוען.');
        g.sayAs(
          'כיפה',
          'בוא, כפרה, יוצאים מפה. ...כן, ליטפתי חתול באמצע משימה. מה אכפת לי, תתבעו אותי.'
        );
      },
      talk(g) {
        if (rh13Trapped(g, true)) return;
        if (g.flag('freedCat')) {
          g.say('דיברת אל כלוב ריק. אפילו בשביל המשחק הזה — נמוך.');
          return;
        }
        g.sayAs('כיפה', 'פסססס. ...פסססס? אחי, הפוסטר אמר שאתה עונה לזה.');
        g.say('כלום. הוא רק הצמיד את האף לסורגים. אולי הפוסטר טעה. אולי הוא פשוט רוצה שתפתחי כבר.');
      },
      take(g) {
        if (rh13Trapped(g, true)) return;
        g.say(g.flag('freedCat')
          ? 'הכלוב נשאר פה. ראיה מספר ארבע, לפי הסדר של הקיר.'
          : 'לקחת כלוב עם חתול זה לא חילוץ, זה משלוח. תפתחי אותו, גברת.');
      },
      eat(g) {
        if (rh13Trapped(g, true)) return;
        g.say('ברזל זה לא ברזל בתפריט. ומה שבתוך הכלוב — בכלל לא למשא ומתן.');
      },
      push(g) {
        if (rh13Trapped(g, true)) return;
        g.say('דחפת את הכלוב. הוא חרק בנימוס. הדלת, לעומת זאת, נפתחת — תנסי "פתח".');
      },
      knock(g) {
        if (rh13Trapped(g, true)) return;
        g.playSfx('meow');
        g.say('נקשת. מהצד השני ענתה כפה קטנה: טוק. יש פה שניים שרוצים שהדלת הזאת תיפתח.');
      },
      photo(g) {
        if (rh13Trapped(g, true)) return;
        g.say('הסוללה — אם יש לך כזאת — שמורה לקיר. החתול ייצא לתקשורת אחרי השחרור.');
      },
      use: {
        rusty_key(g) {
          if (rh13Trapped(g, true)) return;
          g.say('המפתח החלוד גדול על המנעול הקטן הזה בשתי מידות. הבריח רק תקוע — תנסי פשוט לפתוח.');
        },
        '*': function (g) {
          if (rh13Trapped(g, true)) return;
          g.say('הכלוב צריך יד אחת ולב אחד, לא ציוד. "פתח כלוב" — וזהו.');
        },
      },
    },

    {
      id: 'charger',
      names: ['מטען', 'שקע', 'חשמל', 'כבל', 'מטען בקיר'],
      rect: [254, 140, 26, 22],
      look(g) {
        if (rh13Trapped(g, false)) return;
        g.say('מטען בקיר של מרתף ב-1989. אנחנו לא שואלים שאלות על התפאורה, וזה הסדר שעובד לכולם.');
      },
      use: {
        phone(g) {
          if (rh13Trapped(g, false)) return;
          if (g.flag('phoneCharged')) {
            g.say('הטלפון כבר טעון ומלא בנזיפות של אמא. אין מה להוסיף לו חוץ מתמונה אחת חשובה.');
            return;
          }
          g.flag('phoneCharged', 1);
          g.addScore(10, 'p_charge');
          g.playSfx('ring');
          g.sayAs(
            'כיפה',
            'הטלפון נדלק. שלושים ושבע שיחות שלא נענו מאמא. נטפל בזה אחר כך. קודם — תיעוד.'
          );
          g.say('יש לך עכשיו מצלמה טעונה וקיר שמחכה להיכנס להיסטוריה. חברי בין השניים.');
        },
        '*': function (g) {
          if (rh13Trapped(g, false)) return;
          g.say('השקע הזה מחכה לטלפון שלך. כן, זה שמת מאז הסצנה הראשונה. סוף סוף הגיע הרגע שלו.');
        },
      },
      take(g) {
        if (rh13Trapped(g, false)) return;
        g.say('המטען מחובר לקיר, הקיר מחובר לסבתא, וסבתא בקרוב מחוברת לאזיקים. הכל נשאר בתפקיד.');
      },
      open(g) {
        if (rh13Trapped(g, false)) return;
        g.say('שקע לא פותחים. מחברים אליו דברים. למשל טלפון. למשל עכשיו.');
      },
      push(g) {
        if (rh13Trapped(g, false)) return;
        g.say('דחפת את המטען עמוק יותר לשקע. הוא היה בסדר גם קודם, אבל יופי, יסודיות.');
      },
      eat(g) {
        if (rh13Trapped(g, false)) return;
        g.say('לאכול חשמל? אפילו סיירה לא כתבו את המוות הזה, וזה אומר משהו.');
      },
      knock(g) {
        if (rh13Trapped(g, false)) return;
        g.say('נקשת על השקע. החשמל לא עונה לדפיקות, רק לתקעים. ביורוקרטיה של אנרגיה.');
      },
      talk(g) {
        if (rh13Trapped(g, false)) return;
        g.say('דיברת אל שקע. הוא הקשיב בשני חורים. בינינו — שיחה טובה מהממוצע שלך היום.');
      },
      photo(g) {
        if (rh13Trapped(g, false)) return;
        g.say('לצלם את המטען עם הטלפון שהוא טוען זה פילוסופיה, לא תיעוד. הקיר, גברת. הקיר.');
      },
    },

    {
      id: 'traps_floor',
      names: ['רצפה', 'קש', 'מלכודת', 'מלכודות', 'אמצע', 'אמצע החדר'],
      rect: [140, 168, 60, 22],
      look:
        'רצפת המרתף. משהו במרכז החדר מבריק מתחת לשכבת קש. קש. במרתף. מי מפזרת קש במרתף — חוץ ממישהי שמסתירה משהו מתחתיו.',
      take:
        'להרים את הקש ביד? מה שמתחתיו כבר סגר עסקה עם רגל אחת השבוע. אל תהיי הלקוחה הבאה.',
      use: { '*': 'לא נוגעים באמצע החדר. עוקפים אותו. תשאלי את העקבות הקטנות שם ליד — הן יודעות משהו.' },
      push: 'דחפת קצת קש עם קצה הנעל. משהו מתכתי מתחתיו נדרך בנקישה קטנה. הנעל חזרה אלייך. בחיים לא תזוזי מהר יותר.',
      eat: 'קש אוכלים סוסים, ורק כאלה שלא ראו מה מבריק מתחתיו.',
      talk: 'דיברת אל הרצפה. היא ענתה בשתיקה מתוחה של מישהי שמחכה שתדרכי. אל תדרכי.',
      photo: 'צילום של קש זה לא ראיה, זה חיסכון בתאונה. את הסוללה שווה לשמור לקיר.',
    },

    {
      id: 'tracks',
      names: ['עקבות', 'טביעות', 'עקבות חתול', 'כפות', 'שביל'],
      rect: [120, 180, 80, 12],
      look(g) {
        if (g.flag('sawTracks')) {
          g.say('העקבות עדיין שם: צמוד לקיר, אף פעם לא דרך האמצע. שיטה של מקצוענים. תאמצי.');
          return;
        }
        g.flag('sawTracks', 1);
        g.say(
          'טביעות קטנות של חתול, צמודות לקיר, עוקפות את מרכז החדר בקשת רחבה ומדויקת.',
          'מתוק עקף את האמצע. חכם ממך.'
        );
      },
      take: 'עקבות לא אוספים, מהן לומדים. השיעור: הקיר חבר, האמצע לא.',
      talk(g) {
        g.sayAs('כיפה', 'תכלס, חתול, ניווט יפה. אני לוקחת את המסלול שלך.');
        g.say('העקבות לא ענו. מי שמשאיר מסלול בריחה מושלם לא צריך לנאום עליו.');
      },
      eat: 'אבק מרתף עם נגיעות קש. השף ממליץ לוותר.',
      push: 'אל תמרחי את העקבות. הן כרגע המסמך הבטיחותי הכי חשוב בחדר הזה.',
      photo: 'צילמת עקבות של חתול. חמוד לאלבום, חלש לבית משפט. הקיר, שוב, הקיר.',
    },

    {
      id: 'stairs',
      names: ['מדרגות', 'גרם מדרגות', 'יציאה', 'למעלה'],
      rect: [20, 80, 28, 80],
      look:
        'מדרגות עץ חדות שעולות חזרה לסלון. כל מדרגה חורקת בגובה אחר — סבתא מכוונת אותן. כמו פסנתר, רק לאזעקה.',
      use: {
        '*': function (g) {
          g.goto('scene12', 56, 172);
        },
      },
      open(g) {
        g.goto('scene12', 56, 172);
      },
      push: 'דחפת את המעקה. הוא חרק בסולם לה מינור. אמרתי לך — מכוונות.',
      take: 'מדרגות לוקחים ברגליים, לא לתיק. "השתמש במדרגות" ועולים.',
      eat: 'עץ ישן עם מסמרים חלודים. גם הקיבה שלך אמרה לא.',
      knock(g) {
        g.playSfx('knock');
        g.say('דפקת על המדרגות. למעלה משהו הפסיק לזוז לרגע. ...אולי פחות לדפוק על דברים בבית הזה.');
      },
    },
  ],

  onCommand(g, verb, noun, target) {
    // Trap catch-all: ANY verb aimed at the cage or the charger before sawTracks
    // sends Red straight across the straw. Per spec — crossing the center = death.
    if (!g.flag('sawTracks') && !g.flag('finale') && verb) {
      const words = (noun || '') + ' ' + (target || '');
      // Tracks vocabulary is the SAFE action ("עקבות חתול") — never trap on it.
      const safeWords = ['עקבות', 'טביעות', 'כפות', 'שביל'];
      if (!safeWords.some(w => words.includes(w))) {
        const cageWords = ['כלוב', 'סורגים', 'חתול', 'מתוק'];
        const chargerWords = ['מטען', 'שקע', 'חשמל', 'כבל'];
        if (cageWords.some(w => words.includes(w))) return rh13Trapped(g, true);
        if (chargerWords.some(w => words.includes(w))) return rh13Trapped(g, false);
      }
    }
    // The jam production table — scenery without a spec rect, handled here.
    if (noun.includes('שולחן') || noun.includes('משפך') || noun.includes('ייצור')) {
      if (verb === 'look') {
        g.say(
          'שולחן ייצור: משפך, תוויות, ופנקס הזמנות פתוח. ההזמנה האחרונה: "13 צנצנות. בלי שאלות." מישהו ענה מתחת: "כרגיל".'
        );
      } else if (verb === 'eat') {
        g.say('שום דבר משולחן הייצור לא נכנס לך לפה. ראית מה כתוב על האצוות. את יודעת למה.');
      } else {
        g.say('השולחן הזה ייצר מספיק צרות. אל תוסיפי לו משמרת.');
      }
      return true;
    }
    // The bare bulb.
    if (noun.includes('נורה') || noun.includes('מנורה') || noun.includes('אור')) {
      if (verb === 'look') {
        g.say('נורה חשופה על חוט. מתנדנדת קצת, בלי רוח. במרתפים של סבתא גם לתאורה יש עצבים.');
      } else {
        g.say('עזבי את הנורה. היא היחידה פה שעובדת בשבילך.');
      }
      return true;
    }
    // Calling out for the cat.
    if (verb === 'call') {
      if (g.flag('freedCat')) {
        g.playSfx('meow');
        g.say('מתוק ענה מכיוון המדרגות. קצר, יבש, חתולי: "נו".');
      } else {
        g.playSfx('meow');
        g.sayAs('כיפה', 'מתוק! פסססס!');
        g.say('יללה חלשה מהכלוב. הוא פה. עכשיו תורך — רק תבדקי קודם איפה דורכים.');
      }
      return true;
    }
    return false;
  },

  exits: {
    up: { to: 'scene12', x: 56, y: 172 },
  },
});
