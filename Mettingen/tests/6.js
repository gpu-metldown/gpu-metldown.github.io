/* Übungstest 6 – im Format des Online-Tests Mettingen, mit Aufgabentypen aus Beispieltests anderer Studienkollegs */
(function(){
const RFN = ["richtig", "falsch", "nicht im Text"];

const CHART = `
<figure class="chart">
  <figcaption>Wie kommen Studierende zur Hochschule? <span>(Umfrage, Angaben in Prozent – Übungsdaten)</span></figcaption>
  <div class="bars">
    <div class="b"><span class="l">Bus und Bahn</span><span class="t"><i style="width:100%"></i></span><span class="v">41 %</span></div>
    <div class="b"><span class="l">Fahrrad</span><span class="t"><i style="width:78%"></i></span><span class="v">32 %</span></div>
    <div class="b"><span class="l">zu Fuß</span><span class="t"><i style="width:34%"></i></span><span class="v">14 %</span></div>
    <div class="b"><span class="l">Auto</span><span class="t"><i style="width:27%"></i></span><span class="v">11 %</span></div>
    <div class="b"><span class="l">Sonstiges</span><span class="t"><i style="width:5%"></i></span><span class="v">2 %</span></div>
  </div>
  <div class="src">Fiktive Zahlen, nur für diese Übung.</div>
</figure>`;

const READING = `<h3>Haben Bibliotheken eine Zukunft?</h3>
  <p><span class="pn">[1]</span>Wer heute etwas wissen möchte, sucht meistens zuerst im Internet. Bücher, Zeitschriften und sogar wissenschaftliche Artikel sind oft digital verfügbar. Deshalb wurde in den letzten Jahren immer wieder die Frage gestellt, ob man öffentliche Bibliotheken überhaupt noch braucht.</p>
  <p><span class="pn">[2]</span>Ein Blick in viele Stadtbibliotheken zeigt jedoch: Die Lesesäle sind oft gut besucht. Allerdings kommen die Menschen heute häufig aus anderen Gründen als früher. Viele leihen sich nicht nur Bücher aus, sondern nutzen die Bibliothek als ruhigen Arbeitsplatz, treffen sich dort zum gemeinsamen Lernen oder besuchen Veranstaltungen wie Lesungen und Computerkurse.</p>
  <p><span class="pn">[3]</span>Besonders für Schüler und Studierende sind Bibliotheken wichtig. Zu Hause fehlt vielen ein ruhiger Ort zum Lernen, zum Beispiel weil sie sich ein Zimmer teilen müssen. In der Bibliothek finden sie nicht nur Ruhe, sondern auch WLAN und Zugang zu teuren Fachdatenbanken, die sie privat nicht bezahlen könnten.</p>
  <p><span class="pn">[4]</span>Viele Bibliotheken haben sich deshalb verändert. Sie bieten längere Öffnungszeiten an, manche haben sogar am Sonntag geöffnet. Neben Büchern kann man dort E-Books, Filme oder Spiele ausleihen, und in sogenannten „Makerspaces“ stehen 3D-Drucker und andere Geräte zur Verfügung, die man kostenlos ausprobieren darf.</p>
  <p><span class="pn">[5]</span>Kritiker meinen allerdings, dass diese Angebote zu viel Geld kosten und die eigentliche Aufgabe der Bibliothek – das Sammeln und Bereitstellen von Wissen – in den Hintergrund gerät. Befürworter halten dagegen: Gerade weil es heute so viele Informationen gibt, braucht man Orte, an denen Menschen lernen, gute von schlechten Quellen zu unterscheiden.</p>`;

window.TEST = {
  id: "6",
  kind: "exam",
  minutes: 60,
  intro: `Dieser Test hat das <b>Format des Online-Tests in Mettingen</b> (Mehrfachauswahl, Auswahllisten, Grafik, C-Test mit unregelmäßigen Lücken) und dieselbe Länge wie die Übungstests 1–4: ca. <b>100 Punkte in 60 Minuten</b>.<br>
    Dazu kommen Aufgabentypen aus Beispieltests anderer Studienkollegs: Lückentext mit Wortauswahl (TU Berlin), Umformungen (Heidelberg) und eine Grafikbeschreibung.<br>
    <b>Teil A</b> Grammatik &amp; Wortschatz · <b>Teil B</b> C-Test · <b>Teil C</b> Grafik &amp; Leseverstehen · <b>Teil D</b> Schreiben (zusätzlich, ohne Punkte)`,
  tasks: [
    /* ---------------- TEIL A ---------------- */
    { section: "Teil A – Grammatik und Wortschatz",
      type: "multi",
      instr: "Beide Sätze sollen sinnvoll miteinander verbunden werden. Kreuzen Sie die richtigen Lösungen an.",
      items: [
        { prompt: "Er hat die Prüfung bestanden. Er hat nicht viel gelernt.",
          options: ["Er hat die Prüfung bestanden, obwohl er nicht viel gelernt hat.",
                    "Er hat die Prüfung bestanden, trotzdem er hat nicht viel gelernt.",
                    "Er hat nicht viel gelernt, trotzdem hat er die Prüfung bestanden.",
                    "Er hat die Prüfung bestanden, weil er nicht viel gelernt hat."],
          correct: [0, 2],
          expl: "<b>a</b> ✓ <i>obwohl</i> + Verb am Ende. <b>c</b> ✓ <i>trotzdem</i> steht auf Position 1 → danach sofort das Verb (<i>hat er</i>). <b>b</b> ✗ nach <i>trotzdem</i> kommt das Verb direkt. <b>d</b> ✗ <i>weil</i> ergibt keinen Sinn." },
        { prompt: "Es regnete stark. Das Fußballspiel wurde abgesagt.",
          options: ["Weil es stark regnete, wurde das Fußballspiel abgesagt.",
                    "Es regnete stark, denn das Fußballspiel wurde abgesagt.",
                    "Das Fußballspiel wurde abgesagt, weil regnete es stark.",
                    "Es regnete stark, deshalb wurde das Fußballspiel abgesagt."],
          correct: [0, 3],
          expl: "<b>a</b> ✓ Nebensatz zuerst → Hauptsatz beginnt mit dem Verb. <b>d</b> ✓ <i>deshalb</i> + Verb auf Position 2. <b>b</b> ✗ <i>denn</i> nennt einen Grund – hier wäre der Regen die Folge. <b>c</b> ✗ nach <i>weil</i> Verb ans Ende." },
        { prompt: "Ich lerne jeden Tag Vokabeln. Ich will die Aufnahmeprüfung bestehen.",
          options: ["Ich lerne jeden Tag Vokabeln, um die Aufnahmeprüfung zu bestehen.",
                    "Ich lerne jeden Tag Vokabeln, um ich die Aufnahmeprüfung bestehe.",
                    "Ich lerne jeden Tag Vokabeln, damit ich die Aufnahmeprüfung bestehe.",
                    "Ich lerne jeden Tag Vokabeln, damit die Aufnahmeprüfung zu bestehen."],
          correct: [0, 2],
          expl: "Ziel: <b>um … zu</b> + Infinitiv (ohne Subjekt) oder <b>damit</b> + Subjekt + Verb am Ende. b und d mischen beide Formen." },
        { prompt: "Zuerst kaufte sie die Fahrkarte. Dann stieg sie in den Zug.",
          options: ["Während sie die Fahrkarte kaufte, stieg sie in den Zug.",
                    "Nachdem sie die Fahrkarte gekauft hatte, stieg sie in den Zug.",
                    "Bevor sie in den Zug stieg, kaufte sie die Fahrkarte.",
                    "Nachdem sie die Fahrkarte kaufte, stieg sie in den Zug."],
          correct: [1, 2],
          expl: "<b>b</b> ✓ <i>nachdem</i> + Plusquamperfekt (gekauft hatte), Hauptsatz Präteritum. <b>c</b> ✓ <i>bevor</i> passt auch. <b>a</b> ✗ <i>während</i> = gleichzeitig. <b>d</b> ✗ nach <i>nachdem</i> muss die Zeit „eine Stufe früher“ sein (Plusquamperfekt)." }
      ]
    },
    { type: "single",
      instr: "Wie lautet der Satz im Passiv? Achten Sie auf die Zeitform.",
      items: [
        { prompt: "Man renoviert zurzeit die Bibliothek.",
          options: ["Die Bibliothek wurde zurzeit renoviert.", "Die Bibliothek ist zurzeit renoviert worden.", "Die Bibliothek wird zurzeit renoviert worden.", "Die Bibliothek wird zurzeit renoviert."],
          correct: 3, expl: "Präsens → Passiv Präsens: <b>wird</b> + Partizip II." },
        { prompt: "Der Arzt untersuchte den Patienten gründlich.",
          options: ["Der Patient wird vom Arzt gründlich untersucht.", "Der Patient ist vom Arzt gründlich untersucht worden.", "Der Patient wurde vom Arzt gründlich untersucht.", "Den Patienten wurde vom Arzt gründlich untersucht."],
          correct: 2, expl: "Präteritum → Passiv Präteritum: <b>wurde</b> + Partizip II. Das Akkusativobjekt (<i>den Patienten</i>) wird zum Subjekt im Nominativ (<i>der Patient</i>)." },
        { prompt: "Man muss die Anträge bis Freitag abgeben.",
          options: ["Die Anträge müssen bis Freitag abgegeben werden.", "Die Anträge werden bis Freitag abgeben müssen.", "Die Anträge müssen bis Freitag abgegeben worden.", "Die Anträge muss bis Freitag abgegeben werden."],
          correct: 0, expl: "Passiv mit Modalverb: Modalverb + Partizip II + <b>werden</b>. <i>Die Anträge</i> ist Plural → <b>müssen</b>." }
      ]
    },
    { type: "select",
      instr: "Setzen Sie das passende Pronomen ein.",
      hint: "Im echten Test per Drag-and-Drop. Manche Wörter passen mehrmals, eines passt gar nicht.",
      bank: ["mich", "mir", "dich", "dir", "sich", "uns", "euch", "ihm", "ihr"],
      rows: [
        {s: "Ich wünsche ___ viel Erfolg bei der Prüfung!", a: "dir", e: "<i>jemandem</i> etwas wünschen → Dativ: <b>dir</b>."},
        {s: "Hast du ___ schon für den Deutschkurs angemeldet?", a: "dich", e: "sich anmelden – <i>du</i> → Akkusativ <b>dich</b>."},
        {s: "Wir treffen ___ morgen um acht vor der Bibliothek.", a: "uns", e: "sich treffen – <i>wir</i> → <b>uns</b>."},
        {s: "Meine Schwester hat Geburtstag. Ich schenke ___ ein Buch.", a: "ihr", e: "<i>jemandem</i> etwas schenken → Dativ feminin: <b>ihr</b>."},
        {s: "Kinder, putzt ___ bitte die Zähne!", a: "euch", e: "sich (Dativ) die Zähne putzen – <i>ihr</i> → <b>euch</b>."},
        {s: "Herr Müller ärgert ___ über den Lärm.", a: "sich", e: "sich ärgern über – <i>er</i> → <b>sich</b>."},
        {s: "Ich kann ___ seinen Namen einfach nicht merken.", a: "mir", e: "sich (Dativ) etwas merken – es gibt schon ein Akkusativobjekt (<i>seinen Namen</i>) → <b>mir</b>."},
        {s: "Mein Bruder hat Probleme mit Mathe. Ich helfe ___ bei den Hausaufgaben.", a: "ihm", e: "<i>helfen</i> + Dativ, maskulin → <b>ihm</b>."}
      ]
    },
    { type: "select",
      instr: "Ergänzen Sie die Relativpronomen in der korrekten Form.",
      bank: ["der", "die", "das", "den", "dem", "deren", "dessen", "denen", "was", "wo"],
      rows: [
        {s: "Der Kurs, ___ ich besuche, beginnt um neun Uhr.", a: "den", e: "<i>der</i> Kurs; ich besuche <i>ihn</i> → Akkusativ <b>den</b>."},
        {s: "Die Lehrerin, mit ___ ich gesprochen habe, war sehr freundlich.", a: "der", e: "<i>mit</i> + Dativ, feminin → <b>der</b>."},
        {s: "Das ist der Student, ___ Vater Arzt ist.", a: "dessen", e: "Besitz (Genitiv), maskulin → <b>dessen</b>."},
        {s: "Die Bewerber, ___ wir eine Zusage geschickt haben, beginnen im März.", a: "denen", e: "<i>jemandem</i> etwas schicken → Dativ Plural → <b>denen</b>."},
        {s: "Es gibt noch vieles, ___ ich lernen muss.", a: "was", e: "Nach <i>vieles, alles, nichts, etwas</i> → <b>was</b>."},
        {s: "Die Stadt, ___ das Studienkolleg liegt, ist sehr klein.", a: "wo", e: "Ort (= in der) → <b>wo</b>."}
      ]
    },
    { type: "select",
      instr: "Ergänzen Sie die passende Präposition.",
      hint: "Verben mit festen Präpositionen. Zwei Wörter bleiben übrig.",
      bank: ["an", "auf", "für", "über", "mit", "von", "um", "nach", "vor"],
      rows: [
        {s: "Viele Bewerber träumen ___ einem Studienplatz in Medizin.", a: "von", e: "träumen <b>von</b> + Dativ."},
        {s: "Ich bewerbe mich ___ einen Platz im M-Kurs.", a: "um", e: "sich bewerben <b>um</b> + Akkusativ."},
        {s: "Hast du schon ___ die Anmeldung gedacht?", a: "an", e: "denken <b>an</b> + Akkusativ."},
        {s: "Sie hat Angst ___ der mündlichen Prüfung.", a: "vor", e: "Angst haben <b>vor</b> + Dativ."},
        {s: "Ich habe mich sehr ___ die schlechte Note geärgert.", a: "über", e: "sich ärgern <b>über</b> + Akkusativ."},
        {s: "Er fragt die Sekretärin ___ dem Weg zum Prüfungsraum.", a: "nach", e: "fragen <b>nach</b> + Dativ."},
        {s: "Wir müssen uns noch gut ___ den Test vorbereiten.", a: "auf", e: "sich vorbereiten <b>auf</b> + Akkusativ."}
      ]
    },
    { type: "select",
      instr: "Welche Adjektive passen zusammen? Ordnen Sie das Gegenteil zu.",
      hint: "Nicht alle Wörter passen – und manche Wörter gibt es gar nicht.",
      bank: ["unhöflich", "geduldlos", "selbstbewusst", "unordentlich", "freundlich", "leise", "unschüchtern", "ungeduldig", "ordentlos", "optimistisch", "fleißig", "höflos"],
      rows: [
        {s: "höflich ↔ ___", a: "unhöflich", e: "<b>unhöflich</b>. „höflos“ gibt es nicht."},
        {s: "geduldig ↔ ___", a: "ungeduldig", e: "<b>ungeduldig</b>. „geduldlos“ gibt es nicht."},
        {s: "schüchtern ↔ ___", a: "selbstbewusst", e: "<b>selbstbewusst</b>. „unschüchtern“ gibt es nicht."},
        {s: "ordentlich ↔ ___", a: "unordentlich", e: "<b>unordentlich</b> (oder: chaotisch). „ordentlos“ gibt es nicht."},
        {s: "pessimistisch ↔ ___", a: "optimistisch", e: "<b>optimistisch</b>."},
        {s: "laut ↔ ___", a: "leise", e: "<b>leise</b>."}
      ]
    },
    { type: "cloze",
      instr: "Lesen Sie den Text und wählen Sie das Wort, das jeweils in die Lücke passt. Es gibt für jede Lücke nur eine richtige Lösung.",
      hint: "Aufgabentyp aus dem Aufnahmetest der TU Berlin.",
      title: "Erfolgreich im Studienkolleg",
      text: "Jedes Jahr bewerben sich tausende junge Menschen aus der ganzen Welt [[für|*um|auf|nach]] einen Platz an einem Studienkolleg. Dort bereiten sie sich ein Jahr lang auf die Feststellungsprüfung vor, [[*damit|um|sodass|weil]] sie danach an einer deutschen Hochschule studieren können. Der Unterricht ist intensiv: [[*Neben|Wegen|Statt|Ohne]] Deutsch stehen je nach Kurs auch Mathematik, Biologie oder Wirtschaft auf dem Stundenplan. Viele Kollegiaten berichten, dass die erste Zeit besonders anstrengend [[*sei|sein|seien|seist]]. Sie müssen sich nicht nur an die Sprache, sondern auch an ein neues Lernsystem [[*gewöhnen|gewöhnt|gewohnt|gewöhnten]]. Lehrkräfte empfehlen deshalb, [[seit|*von|ab|am]] Anfang an regelmäßig zu wiederholen, [[*statt|damit|sondern|weil]] erst kurz vor der Prüfung mit dem Lernen zu beginnen. Hilfreich ist es außerdem, in einer Lerngruppe zu arbeiten, [[*wo|wohin|dass|was]] man Fragen gemeinsam klären kann. Wer die Feststellungsprüfung besteht, [[*kann|könnten|konnte|können]] sich an deutschen Hochschulen bewerben – vorausgesetzt, das Studienfach passt zum Kurs. Die Mühe [[*lohnt|zahlt|bringt|macht]] sich also.",
      expl: "(a) sich bewerben <b>um</b> · (b) Ziel mit eigenem Subjekt → <b>damit</b> · (c) <b>neben</b> = zusätzlich zu · (d) indirekte Rede → Konjunktiv I <b>sei</b> · (e) sich gewöhnen an – Infinitiv nach <i>müssen</i> · (f) <b>von</b> Anfang an · (g) <b>statt</b> … zu + Infinitiv · (h) Ort → <b>wo</b> · (i) <i>wer</i> = 3. Person Singular → <b>kann</b> · (j) sich <b>lohnen</b>."
    },
    { type: "single",
      instr: "Formen Sie die Sätze um, ohne die Bedeutung zu verändern. Welche Lösung ist richtig?",
      hint: "Aufgabentyp aus dem Einstufungstest der Universität Heidelberg.",
      items: [
        { prompt: "<u>Gerüchten zufolge</u> entlässt die Firma 200 Mitarbeiter.<br>→ Die Firma ___ 200 Mitarbeiter entlassen.",
          options: ["muss", "soll", "will", "darf"], correct: 1,
          expl: "<i>Gerüchten zufolge / man sagt, dass …</i> → Modalverb <b>sollen</b> (fremde Behauptung)." },
        { prompt: "Die Aufgabe ist <u>lösbar</u>.<br>→ Die Aufgabe ___.",
          options: ["kann gelöst werden", "muss gelöst werden", "wird gelöst", "kann lösen"], correct: 0,
          expl: "Adjektiv auf <i>-bar</i> = <b>kann</b> + Partizip II + <b>werden</b> (Passiv mit <i>können</i>)." },
        { prompt: "<u>Zur Verbesserung seiner Aussprache</u> hört er deutsche Podcasts.<br>→ Um ___, hört er deutsche Podcasts.",
          options: ["seine Aussprache verbessert", "seine Aussprache zu verbessert", "seine Aussprache zu verbessern", "zu seine Aussprache verbessern"], correct: 2,
          expl: "<i>zu</i> + Nomen (Zweck) → <b>um … zu</b> + Infinitiv am Ende." },
        { prompt: "Die <u>im Internet veröffentlichten</u> Ergebnisse sind falsch.<br>→ Die Ergebnisse, ___, sind falsch.",
          options: ["die im Internet veröffentlichen", "die im Internet veröffentlicht wurden", "die im Internet veröffentlicht haben", "die im Internet veröffentlichend sind"], correct: 1,
          expl: "Partizip II vor dem Nomen = Passiv, abgeschlossen → Relativsatz im Passiv: <b>die … veröffentlicht wurden</b>." },
        { prompt: "<u>Es ist nicht nötig, dass</u> du heute kommst.<br>→ Du ___ heute nicht zu kommen.",
          options: ["brauchst", "musst", "darfst", "sollst"], correct: 0,
          expl: "<b>nicht brauchen … zu</b> = nicht müssen. Achtung: <i>nicht dürfen</i> wäre ein Verbot." },
        { prompt: "<u>Es ist möglich, dass</u> er den Zug verpasst hat.<br>→ Er ___ den Zug verpasst haben.",
          options: ["muss", "soll", "will", "kann"], correct: 3,
          expl: "Vermutung, möglich → <b>kann</b> (oder <i>könnte</i>). <i>muss</i> = fast sicher, <i>soll</i> = man sagt." }
      ]
    },

    /* ---------------- TEIL B ---------------- */
    { section: "Teil B – C-Test",
      type: "gaps",
      instr: "Vervollständigen Sie die jeweiligen Lücken durch die Eingabe der fehlenden Buchstaben. Achten Sie dabei auf die orthografische und grammatische Korrektheit.",
      text: "Viele Studierende ernähren sich während der Prüfungszeit ungesund. Statt selbst zu kochen, greif{en} sie oft z{u} Fertiggerichten od{er} Fast Food, wei{l} es schnell ge{ht} und wen{ig} kostet. Doch ei{ne} unausgewogene Ernähr{ung} kann d{ie} Konzentration deut{lich} verschlechtern. Expert{en} empfehlen deshalb, regel{mäßig} zu essen u{nd} viel Was{ser} zu trink{en}. Besonders geeig{net} sind Vollkornprodukte, fris{ches} Obst und Nüs{se}, weil s{ie} das Gehirn la{nge} mit Energie versorgen. Wer morgens gut frühstückt, startet außerdem konzentrierter in den Tag.",
      expl: "Achte auf Endungen: <i>ein<b>e</b> unausgewogene Ernährung</i> (feminin), <i>frisch<b>es</b> Obst</i> (ohne Artikel, neutral), <i>Expert<b>en</b></i> (n-Deklination, Plural), <i>regel<b>mäßig</b></i> (ä + ß!)."
    },
    { type: "gaps",
      instr: "Vervollständigen Sie die Lücken im zweiten Text.",
      text: "Im Sommer wird es in deutschen Großstädten immer heißer. Grund dafür si{nd} vor all{em} die vielen Gebäu{de} und Straß{en}, die die Wär{me} der Sonne speich{ern} und nachts wieder abgeb{en}. In d{er} Innenstadt kann d{ie} Temperatur deshalb bis z{u} zehn Grad höh{er} sein als a{m} Stadtrand. Für älte{re} Menschen und klei{ne} Kinder ist d{as} gefährlich. Vie{le} Städ{te} pflanzen daher mehr Bäu{me}, legen Parks a{n} und begrünen Dächer, d{enn} Pflanzen kühlen ihre Umgebung. So soll das Leben in der Stadt auch in Zukunft angenehm bleiben.",
      expl: "Achte auf: <i>vor all<b>em</b></i> (feste Wendung), <i>höh<b>er</b> … als</i> (Komparativ), <i>a<b>m</b> Stadtrand</i>, <i>für älte<b>re</b> Menschen</i> (Komparativ + Endung, Akkusativ Plural ohne Artikel), <i>Parks a<b>n</b>legen</i> (trennbares Verb)."
    },

    /* ---------------- TEIL C ---------------- */
    { section: "Teil C – Grafik und Leseverstehen",
      type: "single",
      instr: "Sehen Sie sich die Grafik an und beantworten Sie die Fragen.",
      prompt: CHART,
      items: [
        { prompt: "Welche Aussage ist richtig?",
          options: ["Die meisten Studierenden fahren mit dem Fahrrad.", "Mehr als ein Drittel der Studierenden nutzt Bus und Bahn.", "Das Auto ist das zweitbeliebteste Verkehrsmittel.", "Weniger Studierende gehen zu Fuß, als mit dem Auto fahren."],
          correct: 1, expl: "Bus und Bahn: 41 % – mehr als ein Drittel (33 %). Das Fahrrad liegt mit 32 % nur auf Platz 2, das Auto (11 %) auf Platz 4, zu Fuß (14 %) ist mehr als Auto." },
        { prompt: "Etwa wie viele Studierende fahren mit dem Fahrrad?",
          options: ["jeder zehnte", "ein Viertel", "etwa ein Drittel", "mehr als die Hälfte"],
          correct: 2, expl: "32 % ≈ ein Drittel (33 %). Ein Viertel wären 25 %, jeder zehnte 10 %." },
        { prompt: "Welche Schlussfolgerung lässt sich aus der Grafik ziehen?",
          options: ["Fast 90 % der Studierenden kommen ohne Auto zur Hochschule.", "Die Hälfte aller Studierenden geht zu Fuß.", "Das Auto wird häufiger benutzt als das Fahrrad.", "Öffentliche Verkehrsmittel werden kaum genutzt."],
          correct: 0, expl: "100 % − 11 % (Auto) = 89 % ≈ fast 90 %." }
      ]
    },
    { type: "single",
      instr: "Lesen Sie den Text. Sind die Aussagen richtig, falsch oder stehen sie nicht im Text?",
      prompt: READING, reading: true, plain: true,
      hint: "Aussagen 1–6:",
      items: [
        { prompt: "Viele Menschen suchen Informationen heute zuerst im Internet.", options: RFN, correct: 0, expl: "Absatz 1: „sucht meistens zuerst im Internet“." },
        { prompt: "Die Lesesäle vieler Stadtbibliotheken sind fast leer.", options: RFN, correct: 1, expl: "Absatz 2: Die Lesesäle sind oft <b>gut besucht</b>." },
        { prompt: "Manche Lernende gehen in die Bibliothek, weil sie zu Hause keinen ruhigen Platz haben.", options: RFN, correct: 0, expl: "Absatz 3: Zu Hause fehlt vielen ein ruhiger Ort, z. B. weil sie sich ein Zimmer teilen." },
        { prompt: "Alle Bibliotheken haben inzwischen auch sonntags geöffnet.", options: RFN, correct: 1, expl: "Absatz 4: Nur <b>manche</b> haben sonntags geöffnet." },
        { prompt: "In den Makerspaces kann man 3D-Drucker kaufen.", options: RFN, correct: 1, expl: "Absatz 4: Man darf die Geräte kostenlos <b>ausprobieren</b>, nicht kaufen." },
        { prompt: "Bibliotheken bekommen jedes Jahr weniger Geld vom Staat.", options: RFN, correct: 2, expl: "Über Geld vom Staat sagt der Text nichts. Absatz 5 sagt nur, dass Kritiker die Angebote zu teuer finden." }
      ]
    },
    { type: "single",
      instr: "Beantworten Sie die Fragen zum Text „Haben Bibliotheken eine Zukunft?“.",
      items: [
        { prompt: "Was bedeutet „in den Hintergrund geraten“ (Absatz 5)?",
          options: ["wichtiger werden", "weniger wichtig werden", "für immer verschwinden", "teurer werden"],
          correct: 1, expl: "Etwas gerät in den Hintergrund = man achtet weniger darauf, es wird <b>weniger wichtig</b>." },
        { prompt: "Welches Argument nennen die Befürworter?",
          options: ["Bibliotheken sind billiger als das Internet.", "Bücher sind besser als E-Books.", "Bibliotheken sollen weniger Veranstaltungen anbieten.", "Man braucht Orte, an denen man lernt, gute von schlechten Quellen zu unterscheiden."],
          correct: 3, expl: "Absatz 5, letzter Satz." },
        { prompt: "Welche Überschrift passt am besten zu Absatz 4?",
          options: ["Bibliotheken werden geschlossen", "Neue Angebote in der Bibliothek", "Streit um Öffnungszeiten", "Warum Studierende kein WLAN haben"],
          correct: 1, expl: "Absatz 4 beschreibt neue Angebote: längere Öffnungszeiten, E-Books, Filme, Spiele, Makerspaces." }
      ]
    },

    /* ---------------- TEIL D ---------------- */
    { section: "Teil D – Schreiben (zusätzlich, ohne Punkte)",
      type: "write",
      instr: "Beschreiben Sie die Grafik „Wie kommen Studierende zur Hochschule?“.",
      prompt: "Schreiben Sie ca. <b>80–100 Wörter</b>: Nennen Sie das Thema der Grafik, die wichtigsten Zahlen, vergleichen Sie zwei oder drei Werte und schreiben Sie am Ende einen Satz zu Ihrer eigenen Meinung oder Situation.<br><span class=\"small-note\">Die Grafikbeschreibung ist eine typische Schreibaufgabe in Aufnahmetests.</span>",
      model: `<h3>Redemittel</h3>
        <ul class="redem">
          <li><b>Thema:</b> Die Grafik zeigt, … / In der Grafik geht es um … / Die Grafik informiert über …</li>
          <li><b>Zahlen:</b> Mit 41 % liegt … an erster Stelle. / … Prozent der Befragten … / Ein Drittel / ein Viertel / jeder zehnte …</li>
          <li><b>Vergleich:</b> … deutlich mehr / weniger als … / An zweiter Stelle folgt … / Nur … Prozent …</li>
          <li><b>Schluss:</b> Insgesamt kann man feststellen, dass … / Auffällig ist, dass … / Meiner Meinung nach …</li>
        </ul>
        <h3>Musterlösung (ca. 95 Wörter)</h3>
        <div class="model">Die Grafik zeigt, wie Studierende zur Hochschule kommen. Mit 41 Prozent liegen Bus und Bahn an erster Stelle. An zweiter Stelle folgt das Fahrrad mit 32 Prozent, also etwa ein Drittel der Befragten. Deutlich weniger Studierende gehen zu Fuß (14 Prozent) oder fahren mit dem Auto (11 Prozent). Nur zwei Prozent nutzen andere Verkehrsmittel. Insgesamt kann man feststellen, dass fast 90 Prozent der Studierenden ohne Auto zur Hochschule kommen. Meiner Meinung nach liegt das daran, dass ein Auto für Studierende zu teuer ist und es in Universitätsstädten oft wenige Parkplätze gibt.</div>`
    }
  ]
};
})();
