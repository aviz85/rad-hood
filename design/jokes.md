# jokes.md — Master Joke File

The official punchline bank for "Red Riding Hood and the Vegetarian Wolf".
Written by the head joke writer. Scene-logic agents: lift lines from here verbatim,
or match this exact tone. The Narrator is sarcastic, street-smart, Sierra-flavored,
and addresses the player in feminine form (the player is Red). Hebrew lines only
for player-facing text. Arrows in Hebrew are always `←`.

Tone rules (from GAME-SPEC section 12): every death gets a punchline + an implicit
"Sierra would be proud" nod; fourth-wall breaks in moderation; anachronisms are
the charm; never punch down at real groups — only at the characters.

50 jokes total, sorted into five sections.

---

## Section A — Narrator reactions to silly commands (12)

Use these for commands the parser understands but that make no sense in context
(`fly`, `kiss`, `take <huge object>`, etc.). Short, dry, lethal.

1. **"fly" / "עוף"** —
   "לעוף? את כיפה אדומה, לא כיפה תעופה. הרגליים נשארות על הפיקסלים."

2. **"kiss the wolf" / "נשק את הזאב"** —
   "המספר מסב את מבטו בנימוס. גם זאביק נבוך. גם אני נבוך. כולנו נבוכים. נמשיך?"

3. **"take the tree" / "קח את העץ"** —
   "בטח. תכניסי עץ בן שלוש מאות שנה לסלסלה. ליד המאפים. בצד."

4. **"hit X" / "הרבץ ל..."** —
   "אלימות זה הפתרון של מי שעוד לא ניסתה 'דבר עם'. נסי. תתפלאי."

5. **"eat the basket" / "אכול את הסלסלה"** —
   "המאפים לסבתא. בקושי התחלת את המשחק וכבר אוכלת את התפאורה?"

6. **"sleep" / "לך לישון"** —
   "לישון? ביער? כשסבתא כזאת מסתובבת חופשייה? אפילו המספר לא רגוע מספיק בשביל זה."

7. **"sing" / "שיר"** —
   "כיפה שרה. ציפור אחת נופלת מהעץ. בואי נסכים שזה לא קרה."

8. **"dig" / "חפור"** —
   "לחפור את יודעת רק בשיחות. ושם, תאמיני לי, את אלופת השכונה."

9. **"smell" / "תריח"** —
   "מריח כמו 1989 עם נגיעות פיקסל. בושם נוסטלגיה. לא נמכר בחנויות."

10. **"take the narrator" / "קח את המספר"** —
    "אותי אי אפשר לקחת. אני נשמע בלעדי, לא נלקח. יש הבדל, תבדקי בחוזה."

11. **"jump" / "קפוץ"** —
    "קפצת. שני פיקסלים שלמים באוויר. הקהל על הרגליים. שבי."

12. **"dance" / "רקוד"** —
    "כיפה עושה צעד ריקוד אחד ומסתכלת סביב לוודא שאף אחד לא ראה. ראיתי. רשמתי."

---

## Section B — Death messages (12, all spec deaths covered)

Pass these to `g.die(...)`. Each one is punchline-first; the engine handles the
restore prompt. Sierra nod is baked into the writing, not stated every time.

### Mushroom deaths (scene07 — eating ANY mushroom is death)

13. **Eat red mushrooms** —
    "פטרייה אדומה עם נקודות לבנות. גם בציור של ילד בגן זה סימן אזהרה בינלאומי. כיפה הבינה את זה — שתי דקות מאוחר מדי."

14. **Eat glowing mushrooms** —
    "הפטרייה זהרה בחושך. עכשיו גם את זוהרת — מלמעלה, עם כנפיים. סיירה הייתה גאה. ההורים שלך פחות."

15. **Eat brown mushrooms (raw, on the spot)** —
    "אכלת פטרייה אנונימית מרצפת יער. זאביק בוכה במרחק שתי סצנות — לא מעצב. מבושה מקצועית."

16. **Eat the `mushrooms` item from inventory** —
    "הפורטובלו היה מיועד לגריל של זאב מומחה, לא לנגיסה קרה בעמידה. הקיבה שלך הגישה התפטרות. התקבלה."

### River deaths (scene08)

17. **Swim in the river** —
    "שחייה בנחל: חינם. ההלוויה: לא. תכננו תקציב בהתאם."

18. **Jump into the river** —
    "קפיצת ראש למים בעומק ברך. כיפה אדומה, חבורה כחולה, מסך שחור."

### Jam deaths (cave jar + Grandma's offer)

19. **Eat the jam jar from the cave (scene09 item)** —
    "ריבת סבתא, ישר מהצנצנת. הטעם: תות. הריח: שקדים מרים. הסוף: בערך עכשיו."

20. **Eat jam / accept Grandma's offer (scene12)** —
    "סבתא אמרה 'כפית אחת לא תזיק, מתוקה'. סבתא דייקה: כפית אחת הספיקה בדיוק."

21. **Ask Grandma for seconds (alt line, scene12)** —
    "ביקשת תוספת. סבתא קרנה מאושר ורשמה משהו בפנקס. את כבר לא תקראי מה."

### Basement trap deaths (scene13 — crossing the floor before `sawTracks`)

22. **Trap death — heading to the charger** —
    "רצת ישר למטען בלי להסתכל על הרצפה. מלכודת דובים. לרגל שלך יש עכשיו דעות."

23. **Trap death — heading to the cage** (alt line) —
    "מתוק החתול עקף את מרכז החדר בקשת רחבה. את הלכת ישר. בגלל זה הוא בכלוב ואת בקליק-קלאק."

### Generic death tagline (closer, appended where the scene wants an extra beat)

24. **Universal epitaph** —
    "פה נטמנה כיפה. מתה כמו שחיה: בלי לקרוא את ההוראות. סיירה הייתה גאה."

---

## Section C — Looks for minor objects (12)

Cynical one-liners for decorative hotspots. Scene agents may reuse word-for-word.

25. **Sofa (scene01)** —
    "ספה בצבע שנקרא בקטלוג 'חום אופטימי'. מתחת לכריות: שלושה דורות של גרעינים ושלט שאבד ב-1987."

26. **TV (scene01)** —
    "טלוויזיה עם אנטנה מכופפת. קולטת שני ערוצים. שניהם שלג."

27. **Laundry lines (scene02)** —
    "כביסה בין הבלוקים. גרב אחת מנופפת ברוח. בת הזוג שלה נעלמה ב-1991 ואיש לא חקר."

28. **Bushes (scene03)** —
    "שיחים. מישהו זרק לתוכם בקבוק. השיחים שומרים על זכות השתיקה."

29. **Flowers (scene05)** —
    "פרחים צהובים, חמודים, לא בתפריט. אחרי הסיפור עם הפטריות — מצהירים מראש."

30. **Ancient tree (scene05)** —
    "עץ עתיק שראה מלכים, מלחמות, ועכשיו ילדה שמנסה להכניס אותו לסלסלה. הוא ראה הכל. זה — לא."

31. **Abandoned mailbox (scene04)** —
    "תיבת דואר נטושה. בפנים: עלון פיצה מ-1989. המבצע, באופן מפתיע, כבר לא בתוקף."

32. **Bats (scene09)** —
    "עטלפים. תלויים הפוך ושופטים אותך. כולם שופטים אותך היום, אבל לפחות לאלה יש נקודת מבט."

33. **Garden gnome (scene11)** —
    "גמד גינה שהעיניים שלו עוקבות אחרייך. בגינות אחרות זה קישוט. אצל סבתא זה מערך אבטחה."

34. **Herb bed (scene11)** —
    "ערוגת 'תבלינים'. אף תבלין מוכר לא זוהה. הבוטנאי שנשלח לבדוק — גם הוא לא זוהה מאז."

35. **Embroidered welcome sign (scene11)** —
    "שלט רקום: 'ברוכים הבאים'. מתחת, בתפרים קטנים יותר: 'היציאה באחריותכן'."

36. **Antique phone (scene12)** —
    "טלפון חוגה עתיק. סבתא היחידה ביער עם קו ישיר ל'ספק'. אל תרימי. הוא יודע מתי מרימים."

---

## Section D — Self-aware anachronisms (8)

The dead phone, GPS, insurance, branding — 1989 logic colliding with today.
These belong wherever the relevant object/topic surfaces.

37. **Look at the dead phone (starting item)** —
    "טלפון עם סוללה מתה. ב-1989 קוראים לזה 'אבן דקורטיבית'. תחזיקי, אולי תמצאי שקע ביער."

38. **Getting the map (scene03)** —
    "מפה של נייר. כמו ג'י־פי־אס, רק בלי קול שאומר 'בצעי פרסה'. עוד תתגעגעי לקול."

39. **The guard's "security toll" (scene08)** —
    "אגרת ביטחון על גשר עץ. הפוליסה לא מכסה זאבים, סבתות או נפילה למים. מה כן? שאלה מצוינת. אין תשובה."

40. **The charger in the basement (scene13)** —
    "מטען בקיר של מרתף ב-1989. אנחנו לא שואלים שאלות על התפאורה, וזה הסדר שעובד לכולם."

41. **Jam billboards (scene10)** —
    "שלטי חוצות לריבה באמצע יער. תקציב הפרסום של סבתא גדול מתקציב משטרת היער. זה מסביר המון."

42. **Photographing the evidence (scene13)** —
    "צילום ראיות בטלפון. פעם זה היה פולארויד, מעבדה ושבועיים המתנה. קידמה: עכשיו מפלילים סבתות בלחיצה."

43. **"That's not how the story goes" (any meta complaint about the plot)** —
    "'באגדה זה לא ככה'? נכון. באגדה גם לא היה לך מד ניקוד. תחליטי באיזו גרסה את חיה."

44. **Saving the game (Narrator tip, after first death or on demand)** —
    "טיפ מ-1989: שמירה לפני כל החלטה זה כמו ביטוח. רק שזה זול יותר ובאמת עובד."

---

## Section E — Fourth-wall breaks (6)

Space Quest dosage: rare, well-placed, never two in a row.

45. **Legal disclaimer (random Narrator beat)** —
    "המספר מבקש להבהיר: כל דמיון בין סבתא לסבתות אמיתיות הוא מקרי, מצער, ומטופל משפטית."

46. **On scoring (after some `addScore`)** —
    "עשר נקודות! לא, אי אפשר להמיר אותן לשקלים. ניסו לפנייך. יש תיק פתוח."

47. **The working relationship** —
    "את מקלידה, אני מקריא, כיפה סובלת. לכל אחד התפקיד שלו במערכת היחסים הזאת."

48. **On hints ("help" / "עזרה")** —
    "נתקעת? תמיד אפשר לעיין במדריך הרשמי. אין מדריך רשמי. זה 1989. המדריך זה אני, ואני נהנה מזה."

49. **After restoring a save** —
    "חזרת מהמתים? יפה. נטען, נעמיד פנים ששנינו לא ראינו כלום, ולא נדבר על זה יותר."

50. **On the graphics (look at scenery, rare random)** —
    "כל פיקסל פה צויר ביד. טוב, בפונקציה. אבל פונקציה עם נשמה ושישה עשר צבעים בלבד."

---

## Usage notes for scene agents

- Death lines (Section B) go into `g.die('...')` exactly as written.
- Look lines (Section C) drop into hotspot `look` fields.
- Anachronisms (D) and fourth-wall breaks (E) are seasoning — at most one per scene visit.
- Feminine address always (`תנסי`, `נתקעת`, `לפנייך`); the player is Red.
- Never `→` inside Hebrew. If an arrow is ever needed, it is `←`.
