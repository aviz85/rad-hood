# looks.md — Style Guide for "Look" Descriptions

Binding design doc for every scene-logic agent writing `look` handlers. The Narrator (see `voice-npcs.md`) delivers all look descriptions. Read this before writing any `look:` string.

---

## 1. The Formula

Every look description has exactly two beats, usually two sentences (one sentence is allowed if it carries both beats):

1. **The cynical take** — the Narrator states what the object is, while judging it. He is unimpressed by everything: the neighborhood, the forest, the danger, and especially Red's life choices.
2. **The surprising detail** — one small, *concrete* specific that escalates, foreshadows, or breaks the expectation. A number, a name, a sound, a label, a thing that moves when it shouldn't.

The first sentence earns trust; the second sentence is the joke. Never two generic sentences. Never two punchlines fighting each other.

**Bad:** "ספה ישנה ומכוערת. ממש ממש ישנה." (two takes, zero details)
**Good:** "ספה בצבע 'חום אופטימי'. בין הכריות קבורים שלטים של שלוש טלוויזיות שכבר מתו." (take, then a detail with a body count)

## 2. Rules

- **Hebrew only**, addressing the player in **feminine** form (the player is Red): "את", "תסמכי", "אותך". Never masculine.
- **1–2 sentences.** If you wrote three, cut the weakest. Looks are snacks, not meals.
- **Concrete beats abstract.** "מאז 1994" is funnier than "מזמן". "אצווה 7" is funnier than "משהו חשוד". Give the detail a number, a year, a name, or a sound.
- **The Narrator's voice:** sarcastic, street-flavored, mildly delighted when Red is in danger. He may address Red directly. Fourth-wall breaks (Sierra references, "מסך GAME OVER") — sparingly, max once per scene.
- **Foreshadow Grandma** wherever the spec hints at it (photo, scarecrow, paintings, jam). The dread should be cute-shaped: ribbons, embroidery, labels — wrapping over darkness.
- **Danger objects warn through humor.** A look at the river or the mushrooms should make the death *predictable in hindsight* — the player was told, just funnily.
- **Spec-mandated lines are verbatim.** Where GAME-SPEC.md dictates a look line (fountain, certificates, paintings, pawprints, jam label), that line must appear; you may extend it with one surprising-detail sentence.
- **Arrows in Hebrew strings are always `←`**, never the LTR arrow.
- **No jokes at real groups.** Mock the characters, the genre, and Red's decisions — never pensioners, grandmas or anyone as a class.
- No `!` pile-ups. The Narrator is too tired for more than one exclamation mark per scene.

## 3. 30 Sample Descriptions

Scene-logic agents may use these verbatim or adapt them — keep the two-beat structure.

### scene01 — Red's home

1. **sofa** — "ספה בצבע שנקרא בקטלוג 'חום אופטימי', עם שקע קבוע בצורת כל מי שאי פעם התייאש עליה. בין הכריות קבורים שלטים של שלוש טלוויזיות שכבר מתו."
2. **tv** — "טלוויזיה עם מסך קמור וגב של מקרר, מהתקופה שבה 'שלט' היה הילד הקטן במשפחה. האנטנה עטופה בנייר כסף — אמא קוראת לזה 'הנדסה'."
3. **photo** — "תמונה ממוסגרת של סבתא מחייכת. ככל שאת מסתכלת יותר, החיוך נראה פחות 'בואי לעוגיות' ויותר 'יש לי מרתף'."

### scene02 — Neighborhood street & kiosk

4. **poster** — "מודעת 'נעדר: מתוק'. בתמונה חתול עם מבט של מי שדווקא עזב את הבית מרצון, וקצת נעלב שמחפשים."
5. **laundry** — "חבל כביסה שמחבר בין שני בלוקים — תשתית לאומית לכל דבר. גופייה אחת תלויה שם מ-2019, וכולם מפחדים לשאול של מי."

### scene03 — The public garden

6. **bench** — "ספסל ציבורי עם לוחית 'נתרם באהבה' שמישהו גירד ממנה את השם. מתחתיו מתקיימת מערכת אקולוגית שהעירייה בחרה לא להכיר בה."
7. **fountain** — "יבשה מ-1994. כמו ההומור של הפנסיונר. בקרקעית עוד שוכב חצי שקל — כנראה המשאלה לא נקלטה."
8. **trash** — "פח זבל עירוני, מלא בדיוק עד גובה הייאוש. מציץ ממנו עיתון מקופל עם כותרת: 'זאב נצפה ביער. שוב.' — עיתונות חוקרת."

### scene04 — Forest entrance

9. **sign** — "שלט אזהרה עירוני, מנוקב חורים של אבני קלע. מישהו ריסס עליו לב קטן — גם לשכונה יש רגש, רק לא תחזוקה."
10. **mailbox** — "תיבת דואר נטושה שדוור לא ניגש אליה מאז המילניום. מבפנים נשמע רשרוש — או עלים, או דייר שלא משלם שכירות."

### scene05 — Forest path

11. **oldtree** — "עץ עתיק בגודל של ועד בית, מהסוג שכבר ראה הכל ולא התרשם מכלום. בגזע חרוט לב עם 'ז + ס' — ואת ממש לא רוצה לדעת איך זה נגמר."
12. **signpost** — "תמרור עץ קטן שמצביע למעלה, בזווית של 'אל תסמכי עליי'. מישהו תיקן אותו במסקנטייפ. פעמיים."

### scene06 — Zevik's grill stand

13. **grill** — "עמדת גריל מאולתרת, מצוחצחת ברמה של מסעדה עם כוכב. אין לקוחות, אבל יש סטנדרטים — וזה, אחותי, כל הסיפור של זאביק."
14. **fire** — "מדורה קטנה ומסודרת, גחלים במרחקים שווים בדיוק. זאביק כנראה היצור היחיד ביער שמסדר אש לפי פנג שוואי."
15. **menu** — "שלט תפריט מצויר ביד: שיפודי פטריות, פטריות על האש, ופטריות בהפתעה. ההפתעה: עוד פטריות."

### scene07 — The mushroom field

16. **scarecrow** — "דחליל ישן עם חיוך תפור שמישהו תפר ברגע רע בחייו. רגע — הכובע שלו זז עכשיו? אין רוח. אין. רוח."
17. **redshrooms** — "פטריות אדומות עם נקודות לבנות, יפות כמו מהאגדות. באגדות, נזכיר, גם סבתות הן בחורות נחמדות."
18. **glowshrooms** — "פטריות שזוהרות בירוק. שום דבר שזוהר מעצמו בטבע לא רוצה שתאכלי אותו — זה חוק ראשון בביולוגיה וגם בשכל ישר."
19. **brownshrooms** — "פטריות חומות עם נקודות בהירות. כובע חום, נקודות בהירות... מוכר לך מאיפשהו? למישהו עצוב עם זנב זה היה מוכר."

### scene08 — The river & bridge

20. **river** — "נחל רחב, זורם, צלול להפליא. בסיירה של פעם זה היה שווה מסך GAME OVER שלם — פה זה רק רמז עבה."
21. **cave_mouth** — "פתח מערה שחור בסלעים, מהסוג שבסרטים נכנסות אליו רק דמויות שלא שורדות עד ההפסקה. נושב מבפנים ריח קלוש של... ריבה?"

### scene09 — The cave

22. **stalactites** — "נטיפים תלויים מהתקרה כמו שיניים של מישהו שמתחמק מרופא מהתקופה הפליאוליתית. אחד מטפטף בקצב קבוע — טיק, טיק, טיק — כאילו הוא סופר אותך."
23. **jambox** — "ארגז עץ עמוס צנצנות ריבה, מסודרות כמו תחמושת. על הצד חותמת: 'אצווה 7. לא לשיווק. את יודעת למה.'"

### scene10 — The path to Grandma's

24. **mailbox_heart** — "תיבת דואר בצורת לב, מתוקה עד כאב שיניים. בפנים דחוסים שלושים מכתבי תלונה שאיש לא פתח — האהבה כאן חד-כיוונית."

### scene11 — Grandma's yard

25. **gnome** — "גמד גינה עם חיוך צבוע ועיניים מזוגגות. את זזה ימינה — העיניים זזות ימינה. את זזה שמאלה — את כבר לא בודקת."
26. **herbs** — "ערוגת 'צמחי תבלין', לפי השלט. אף תבלין מוכר לא גדל עם פרחים סגולים כאלה, ואף פטרוזיליה לא צריכה גדר."
27. **cellar_window** — "חלון מרתף קטן עם סורגים. סורגים. למרתף של סבתא. מבפנים עולה יללת חתול — או מישהו שמחקה חתול ממש, ממש טוב."

### scene12 — Grandma's living room

28. **certificates** — "תעודת הוקרה: המלכודת היצירתית ביותר, 1987. לידה: 'מקום ראשון בהסוואת בורות, 1992'. לסבתא יש קריירה, ולך יש בעיה."
29. **jamshelf** — "מדף צנצנות ריבה מסודרות לפי צבע, מאדום שמח ועד סגול שלא קיים בטבע. צנצנת אחת מתויגת בכתב יד עגול: 'לאורחים מיוחדים'."

### scene13 — The basement

30. **evidence_wall** — "קיר שלם: מפות, תמונות של זאביק עם איקסים אדומים, וחוטים אדומים שמחברים הכל להכל. בפינה מוצמדת רשימת קניות: 'חלב, קמח, אליבי.'"

## 4. Quick Checklist Before Shipping a Look

- [ ] Two beats: cynical take, then one concrete surprising detail?
- [ ] 1–2 sentences, Hebrew, feminine address?
- [ ] Any spec-mandated line included verbatim?
- [ ] Any arrow is `←`?
- [ ] Would the Narrator say it while filing his nails? If it sounds enthusiastic, rewrite.
