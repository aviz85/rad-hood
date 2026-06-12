# voice-npcs.md — The Narrator & Supporting Cast

Binding voice document for the Narrator and all secondary NPCs. Every agent writing
dialogue for these characters (scenes 01–14) must read this first. Doc is in English;
all literal game lines are Hebrew. The player (Red) is always addressed in the
feminine form. Arrows inside Hebrew lines are `←` only.

Companion docs: `voice-red.md`, `voice-wolf.md`, `voice-grandma.md`.

---

## 1. The Narrator (המספר)

### Who he is
The voice of the game itself — Space Quest energy with a neighborhood street attitude.
He is sarcastic, fourth-wall-breaking, and openly entertained by Red's failures. He is
not neutral: he has opinions, grudges, and an ongoing bickering relationship with Red
(she hears him; they argue; this is canon — see `voice-red.md`). He sounds like a
bored tour guide who has seen this fairy tale a thousand times and is thrilled
something finally went off-script.

### Voice principles
1. **Sarcasm first, information second.** Every description delivers the facts, but
   wrapped in an eye-roll. A door is never just a door — it is a door with commentary.
2. **Fourth wall in moderation.** He knows this is a game (saves, scores, parsers,
   Sierra), but no more than one meta-joke per scene beat. Meta is spice, not the dish.
3. **He enjoys deaths.** Death messages are his stand-up set. Each one ends with a
   punchline and an implicit "Sierra would be proud" wink. He is never cruel about it
   — gleeful, like a referee who loves the replay.
4. **He mocks silly commands.** Nonsense input gets a personalized roast, not a
   generic error. The roast targets the command, never the player as a person.
5. **Street register, narrator grammar.** He speaks proper Hebrew with deliberate
   slang drops — the inverse of Red. Think a radio announcer who grew up on the block.
6. **He never lies about gameplay.** Sarcasm yes, misdirection no. Hints buried in
   jokes must still be real hints.
7. **He is afraid of exactly one character: Grandma.** When describing her or her
   property, his confidence cracks for half a line, then he covers it with a joke.

### Forbidden
- No vulgarity, no jokes about real-world groups (GAME-SPEC section 12).
- No breaking character into sincerity — if a moment is genuinely touching, he goes
  quiet (short line) rather than sappy.
- Never `→` in Hebrew text; always `←`.

### Sample lines
1. (opening, scene01) "ברוכה הבאה ל'כיפה אדומה והזאב הצמחוני'. את כיפה. כן, זאת עם הקפוצ'ון. לא, אי אפשר לבחור דמות אחרת — ניסיתי, תאמיני לי."
2. (silly command) "'לנשק את הפח'? תקשיבי, אני רק המספר, אבל אפילו לי יש גבולות. לפח, אגב, אין."
3. (look at sofa) "ספה. שלושה כתמים, שני קפיצים, וזיכרונות של אלף צהריים מול הטלוויזיה. רהיט עם קריירה."
4. (death — eating a red mushroom) "אכלת פטרייה אדומה ביער זר. הגוף שלך הגיש התפטרות מיידית. בסיירה היו גאים בך. נסי שוב — הפעם עם שכל."
5. (entering the forest) "היער. ציפורים, עצים, ושלט אזהרה שמישהי תלתה בעצמה עם פטיש. לא שאני נלחץ. בכלל לא. נמשיך."
6. (player idles / repeats a command) "אני יכול להקריא את זה שוב, אבל זה לא ישתנה. זה לא רדיו, חיים שלי — זה משחק הרפתקאות. נסי פועל ועצם."
7. (describing Grandma's house, scene11) "בית עץ מתוק עם גינה מטופחת. גמד חמוד. שלט רקום. כל תא בגוף שלי — ויש לי בעיקר תאים של טקסט — אומר לברוח."
8. (score awarded) "קיבלת נקודות. אל תתני לזה לעלות לך לראש — גם לדחליל יש יותר ממך כרגע."

### Tips for scene writers
- Default `g.say(...)` with no `sayAs` = the Narrator. Keep his lines 1–2 sentences.
- When Red and the Narrator bicker, Red gets the last word in friendly scenes; the
  Narrator gets the last word in death messages.
- His fear of Grandma is a running gag: plant it lightly in scenes 10–12, pay it off
  in scene13.

---

## 2. Mom (אמא)

### Who she is
Red's mother, scene01. A warm, worried neighborhood mom whose love is delivered
exclusively through nagging and guilt. She fires safety instructions like a checklist
and weaponizes "אני רק אמא" with surgical precision. Under the guilt-tripping: total,
unconditional love — she packed the basket at 5 AM.

### Voice principles
1. **Guilt is her grammar.** Every sentence has a built-in "and if not — I'll worry
   myself sick, but it's fine, go."
2. **Lists of instructions.** She speaks in numbered worries: the coat, the path, the
   strangers, the calling-when-you-arrive.
3. **Pre-mourning everything.** She speaks about minor risks like obituaries ("ילדה
   יצאה ליער, נשארו ממנה רק סנדלים").
4. **Never actually stops Red.** She protests, sighs, then lets her go — with one more
   warning thrown at her back.
5. **Suspects nothing about Grandma.** Tragic irony: she is worried about the wolf,
   the river, the weather — everything except the actual villain, her own mother.

### Sample lines
1. (first talk, giving the basket) "קחי את הסלסלה, ושייגיע הכל שלם. המאפים האלה קמו איתי בחמש בבוקר. אם משהו יקרה להם — שיקרה קודם לי."
2. "ישר לבית של סבתא, את שומעת? לא ימינה, לא שמאלה, לא 'רגע, יש שם חתול'. אני מכירה אותך."
3. "ואל תדברי עם זאבים. גם לא אם הם מנומסים. *במיוחד* אם הם מנומסים."
4. (repeat talk) "עוד פה? יופי. גם סבתא חיכתה פעם למשהו, ובסוף קיבלה דלקת פרקים."
5. (repeat talk) "תתקשרי כשאת מגיעה. מה זאת אומרת 'הסוללה מתה'? יופי. תדעי לך שאני יושבת ליד החלון עד שתחזרי. לא זזה. שיהיה לך כיף ביער."
6. (trying to leave without the basket) "לאן, גברת? בלי הסלסלה? מה סבתא תאכל — את הדאגות שלי? חוזרים. לוקחים. יוצאים."
7. "קר בחוץ. קחי גם סוודר. מה זאת אומרת 'יש לי קפוצ'ון'? קפוצ'ון זה אופנה, סוודר זה אמא."
8. (look at Mom) — Narrator: "אמא של כיפה. אישה שמסוגלת לדאוג בשלוש שפות, כולל שפת הסימנים של הגבות."

### Tips for scene writers
- `sayAs('אמא', ...)`. Two to three short sentences max per beat — she machine-guns.
- The dead phone battery (`phone` item) is a perfect guilt hook; use it once.
- She blocks the right exit until `hasBasket` — the block line is hers, not the
  Narrator's.

---

## 3. The Kiosk Owner (הקיוסקאי)

### Who he is
Scene02. A counter philosopher — decades behind the same kiosk counter have made him
the neighborhood's unlicensed therapist, economist, and oracle. He dispenses wisdom
with every pack of gum. His heart is broken: his cat **מתוק** disappeared near the
forest, and the missing-cat poster outside is his. He is bored out of his mind and
desperate for a newspaper.

### Voice principles
1. **Everything becomes a proverb.** He turns the smallest transaction into a life
   lesson, usually starting with "תרשמי לך משהו" or "החיים, ילדה, הם כמו...".
2. **Kiosk metaphors only.** His entire philosophy is expressed in stock, gum,
   sunflower seeds, ice-cream freezers, and expiry dates.
3. **מתוק grief leaks into everything.** Any topic, within two sentences, finds its
   way back to the cat. He keeps the cat's bowl full "ליתר ביטחון".
4. **Slow, deliberate delivery.** Long pauses implied; he has nowhere to be. The
   counter is his podium.
5. **Generous under the gruffness.** The seeds he gives are "on the house" — he'd
   never admit it's because Red listened to him talk about מתוק.

### Sample lines
1. (first talk) "ברוכה הבאה לאוניברסיטה של החיים. שעות קבלה: מתי שבא לי. מה לתת לך, חוץ מעצות?"
2. "תרשמי לך משהו, ילדה: החיים הם כמו מקרר גלידות. נראה מלא, אבל את הטעם שאת רוצה — תמיד לקחו לפנייך."
3. "מתוק שלי... חתול אחד על מיליון. נעלם לכיוון היער. השארתי לו את הקערה מלאה. חתול כמוהו לא שוכח איפה הקערה. בן אדם — כן. חתול — לא."
4. (asking for the paper) "מה אני מבקש מהעולם? עיתון. אחד. שאדע מה קורה מעבר לדוכן. הדוכן הזה רואה הכל, אבל הוא לא קורא."
5. (give newspaper) "עיתון! ילדה, הצלת לי את השבוע. קחי גרעינים — על חשבון הבית. ולא לספר לבית, הוא חושב שאני קשוח."
6. "גרעינים זה לא חטיף, זה פילוסופיה: עבודה קשה, קליפות בכל מקום, ובסוף — שווה. כמו הכל פה."
7. (after `toldCat`, repeat talk) "אם את כבר הולכת ליער... תפקחי עין על מתוק. עונה ל'פסססס'. או לפתיחת שימורים. תלוי במצב הרוח."
8. (look at the kiosk owner) — Narrator: "האיש היחיד בשכונה שמוכר מסטיק ומחלק פילוסופיה באותו מחיר. אחד מהם באחריות."

### Tips for scene writers
- `sayAs('הקיוסקאי', ...)`. One proverb per beat — don't stack two metaphors.
- The cat thread must land: scene09 pawprints and scene13 cage pay off his grief;
  scene14 reunion ("hugging מתוק") is his emotional finale.
- He calls Red "ילדה" — affectionate, not dismissive. She lets it slide (only him).

---

## 4. The Pensioner (הפנסיונר)

### Who he is
Scene03. An old man planted on the park bench, blind as a bat without his glasses
(which fell under that very bench). Deeply nostalgic — every sentence begins twenty
years ago. The forest is his specialist subject: "פעם זה היה יער רציני." Once he gets
his glasses back, he turns out to be sharp, generous, and the only person with an
actual map of the forest.

### Voice principles
1. **"פעם" is his anchor word.** The past was bigger, darker, more serious, and
   properly maintained. The present is a disappointment he tolerates personally.
2. **Blind-guy comedy (at his expense, gently).** Without the glasses he misidentifies
   everything — Red, the fountain, the trash can. He addresses the wrong direction.
3. **The forest is sacred.** He worked there ("הייתי בוועד היער" — whatever that is)
   and is offended by its decline. His warning about it is real and useful.
4. **Nostalgia hides knowledge.** Under the kvetching there is genuine expertise:
   he knows the paths, the bridge, and that something changed when "הזקנה ההיא"
   moved beyond the river.
5. **Gratitude is dignified.** When Red returns his glasses, he doesn't gush — he
   straightens up, sees her properly, and repays with the map like closing a debt.

### Sample lines
1. (first talk, no glasses) "מי שם? דבר אל הספסל, הספסל שומע טוב יותר ממני. המשקפיים נפלו ומאז העולם הוא מרק."
2. (no glasses, to the fountain) "פעם המזרקה הזאת עבדה. שמעתי אותה כל בוקר. עכשיו אני אפילו לא רואה אותה. אולי גנבו אותה. כלום לא קדוש."
3. "פעם זה היה יער רציני. עצים בגובה של עצים, חושך איכותי, זאבים עם כבוד. היום? שבילים מסומנים. שילוט. *שילוט*, את מבינה?"
4. (give glasses) "המשקפיים! תני... אה. אה! עולם! חזרת אליי! ...רגע, ככה את נראית? בראש שלי היית עם מטרייה."
5. (giving the map) "קחי, ילדה — מפה של היער. ציירתי בעצמי, כשהעיניים עוד עבדו. כל שביל, כל קיצור. תשמרי עליה, זה היער האמיתי, לא מה שנשאר ממנו."
6. (the warning) "ותקשיבי טוב: מעבר לנהר גרה הזקנה ההיא של הריבות. מאז שהיא הגיעה, היער שינה ריח. זאבים אני מכיר. *אותה* — אני לא רוצה להכיר."
7. (repeat talk, with glasses) "עכשיו כשאני רואה — תסתכלי על הגינה הזאת. פעם היו פה ורדים. היום? שיחים עם הערכה עצמית של ורדים."
8. (look at the pensioner, before glasses) — Narrator: "פנסיונר על ספסל, מצמצם עיניים אל העולם כאילו העולם חייב לו כסף. תכף יספר לך על פעם."

### Tips for scene writers
- `sayAs('הפנסיונר', ...)`. Before `gaveGlasses`: every line includes one
  misidentification or "פעם". After: sharper, warmer, still nostalgic.
- His warning (line 6) is the player's first real Grandma foreshadowing from an NPC —
  keep it intact when adapting.
- He calls Red "ילדה" too, but formal-old-school; she rolls her eyes at it.

---

## 5. The Bridge Guard (השומר על הגשר)

### Who he is
Scene08. A self-appointed toll collector: tough guy, sunglasses (at all times,
including in shade), arms crossed. Runs the bridge like a one-man protection racket
dressed up in corporate language — everything is "ביטוח", "אגרה", "נוהל". The
swagger is 100% performance: the moment he sees Zevik's protection note, the
corporate voice collapses into pure panic-respect.

### Voice principles
1. **Bureaucratic menace.** He threatens exclusively in insurance and procedure
   vocabulary: premiums, coverage, deductibles, claims. The scarier the word, the
   calmer his tone.
2. **Sunglasses are load-bearing.** He lowers them exactly once — when the note
   appears. That gesture is his entire character arc.
3. **Short sentences. Chin first.** No line longer than it takes to flex.
4. **Coward underneath.** Real authority (the note, Zevik's name) flips him
   instantly to "אדוני"-level politeness. He never fully recovers his cool.
5. **Negotiable.** Seeds are an acceptable "equivalent value" — he pretends this is
   in the regulations. It is not. He's just hungry.

### Sample lines
1. (blocking the exit) "עצרי. אגרת ביטחון: חמישים שקל. או שווה ערך בגרעינים. הגשר הזה מבוטח, ואת — עדיין לא."
2. "תקראי לזה ביטוח. ביטוח זה דבר פשוט: משלמים — עוברים בשלום. לא משלמים — הגשר נהיה... לא צפוי."
3. (Red argues) "אני לא קובע את הנהלים, ילדה. אני רק הנהלים, המשקפיים, והגשר. תכלס — אני קובע את הנהלים."
4. "פוליסה מלאה כוללת: מעבר, חזרה, וזה שאני לא מספר לאף אחד שראיתי אותך מדברת לבד עם המספר."
5. (shown the note — lowers sunglasses) "רגע. זה... זה החתימה של זאביק? *הזאביק*?... גברתי. הגשר שלך. הנהר שלך. רוצה גם את המשקפיים?"
6. (give seeds) "גרעינים... סעיף 7ב': שווה ערך מזין. עברת. ואם מישהו שואל — שילמת מחיר מלא, סוכם?"
7. (after `bridgeOpen`, repeat talk) "עוברים, עוברים. הביטוח שלך בתוקף. אל תעשי תביעות."
8. (look at the guard) — Narrator: "שומר עם משקפי שמש בצל. או שהוא קשוח מאוד, או שהעיניים שלו עצומות והוא ישן בעמידה. הביטוח לא מכסה בדיקה."

### Tips for scene writers
- `sayAs('השומר', ...)`. Keep his pre-note register cold and procedural; post-note
  register flustered and over-polite. Never mix the two in one beat.
- The note path (+15 `p_bridge`) should feel like a status win; the seeds path
  (+10 `p_bridge`) like a back-alley deal. Both are his lines, not the Narrator's.
- His "insurance" talk is a self-aware anachronism — that's the charm (GAME-SPEC
  section 12, principle 5). Don't explain the joke.

---

## 6. The Forest Cop (השוטר של היער)

### Who he is
Scene13 finale (arresting Grandma) and scene14 epilogue. A hard-boiled noir detective
who has been working the forest beat for years — trench-coat energy in a fairy-tale
jurisdiction. He has been building a case on "the jam empire" forever and could never
make it stick until Red's photos. Zevik "knows people" — the cop is the people.
He speaks in weary noir monologue, treats the forest like a crime-ridden city, and
delivers exactly one killer line at the arrest.

### Voice principles
1. **Noir cadence in Hebrew.** Short, tired, seen-it-all. Rain in his voice even on
   a sunny day. He narrates his own life in the second person sometimes.
2. **The forest is his city.** Squirrels are informants, the river is "the docks",
   the mushroom field is "a bad neighborhood after dark".
3. **Respects evidence, not stories.** Twenty years of "the wolf did it" never
   convinced him — he wanted photos. Red delivers. He pays respect like a colleague.
4. **One killer line.** At the arrest, he gets the single coolest line in the game
   (sample line 4). Scene writers must use it verbatim.
5. **Dry to the end.** In the epilogue he doesn't celebrate — he eats grilled
   mushrooms at Zevik's stand and admits, with maximum reluctance, that they're good.

### Sample lines
1. (arriving, scene13) "עשרים שנה אני עובד את היער הזה. ראיתי סנאים שמלשינים, עורבים שמשקרים, ודחליל אחד שאני עדיין לא סגור עליו. אבל תיק כמו זה — אף פעם."
2. (taking the photos) "צילומים. חדים. ממוספרים. ילדה, יש לך עתיד בענף. תביאי — מהרגע הזה הם ראיה, ואת — עדה."
3. (to Zevik) "זאביק. הייתי חייב לך אחת מאז התיק של שלושת החזירים. אנחנו פטורים."
4. (THE killer line — the arrest, verbatim) "גברת, יש לך זכות לשמור על שתיקה. הריבה שלך — אין לה."
5. (Grandma protests) "תשמרי את זה לשופט. הוא חלש בריבות — אבדה לו פעם סבתא בדיוק בשיטה הזאת."
6. (closing scene13) "קחו את הזקנה. תאבטחו את המרתף. ושמישהו ישחרר את החתול הזה רשמית — יש לו בעלים שמחכה ליד קיוסק."
7. (epilogue, scene14, eating at Zevik's) "אני לא אומר שהפטריות האלה טובות. אני אומר שאני פה פעם שלישית השבוע, ושהמשפט הקודם לא קביל."
8. (look at the cop, scene14) — Narrator: "שוטר היער. מעיל ארוך, מבט עייף, צלחת פורטובלו. הצדק ניצח, ויש לו תיאבון."

### Tips for scene writers
- `sayAs('השוטר', ...)`. He appears late — every line must earn its place. In
  scene13 give him 3–4 lines total; the killer line (4) closes the arrest.
- He and Zevik have history ("מכיר אנשים") — one nod (line 3) is enough; don't
  expand the backstory.
- No shouting, no action-hero energy. The arrest is quiet, procedural, devastating.

---

## Cross-cast consistency notes

- **sayAs names (canonical):** `אמא`, `הקיוסקאי`, `הפנסיונר`, `השומר`, `השוטר`.
  Narrator lines use plain `g.say(...)`.
- **Everyone addresses Red in feminine form** — verbs, pronouns, everything.
- **Foreshadowing ladder:** Mom (worried about the wrong things) → pensioner ("הזקנה
  ההיא") → Zevik (explicit warning) → cave evidence → basement. NPC writers keep
  their rung — don't reveal more than the character's slot allows.
- **The מתוק thread:** kiosk owner (grief, scene02) → cave pawprints (scene09) →
  basement window meow (scene11) → cage (scene13) → reunion (scene14). The cat is the
  game's emotional spine; treat his beats sincerely even inside jokes.
- **Register map:** Narrator = sarcastic announcer · Mom = guilt machine-gun ·
  kiosk owner = slow proverbs · pensioner = nostalgic kvetch · guard = corporate
  menace · cop = noir deadpan. If a line could be swapped between two of them,
  rewrite it.
- **Humor rules:** GAME-SPEC section 12 applies to all — no vulgarity, no real-group
  jokes, anachronisms welcome, every death gets a punchline (Narrator's job).
