/* Alte Klausur Mettingen – Aufnahmetest Deutsch SoSe 2025 (16.12.2024), nach Fotos */
(function(){
const CHART = `
<figure class="chart">
  <figcaption>Wo entstehen Lebensmittelabfälle? <span>(insgesamt ca. 12 Mio. Tonnen pro Jahr)</span></figcaption>
  <div class="bars">
    <div class="b"><span class="l">Private Haushalte</span><span class="t"><i style="width:100%"></i></span><span class="v">6,1 Mio. t · 52 %</span></div>
    <div class="b"><span class="l">Verarbeitung von Lebensmitteln</span><span class="t"><i style="width:36%"></i></span><span class="v">2,2 Mio. t · 18 %</span></div>
    <div class="b"><span class="l">Außer-Haus-Verpflegung</span><span class="t"><i style="width:28%"></i></span><span class="v">1,7 Mio. t · 14 %</span></div>
    <div class="b"><span class="l">Primärproduktion</span><span class="t"><i style="width:23%"></i></span><span class="v">1,4 Mio. t · 12 %</span></div>
    <div class="b"><span class="l">Groß- und Einzelhandel</span><span class="t"><i style="width:8%"></i></span><span class="v">0,5 Mio. t · 4 %</span></div>
  </div>
  <div class="src">Daten: Bundesministerium für Ernährung und Landwirtschaft (BMEL), wie in der Klausur</div>
</figure>`;

window.TEST = {
  id: "5",
  kind: "exam",
  minutes: 15,
  intro: `Diese Aufgaben stammen aus dem <b>echten Aufnahmetest Deutsch (SoSe 2025, 16.12.2024)</b> des Studienkollegs Mettingen – abgeschrieben von Fotos. Die Aufgabentypen sind dieselben wie im Online-Test: Mehrfachauswahl, Drag-and-Drop, Auswahllisten, Grafik und C-Test.<br>
    <b>Achtung:</b> Es gibt keinen offiziellen Lösungsschlüssel. Die Lösungen und Erklärungen hier sind selbst erarbeitet. Bei Aufgabe 3 waren die Antworten auf dem Foto nicht lesbar – sie wurden neu formuliert.<br>
    Im echten Test hattest du für viel mehr Aufgaben ca. 30 Minuten. Hier gibt es deshalb nur 15 Minuten.`,
  tasks: [
    { type: "multi",
      instr: "Beide Sätze sollen sinnvoll miteinander verbunden werden. Kreuzen Sie die richtigen Lösungen an.",
      prompt: "Die ausgebildeten Fachkräfte haben bald eine Anstellung gefunden. Wir haben ihnen geholfen.",
      hint: "Wählen Sie eine oder mehrere Antworten:",
      options: [
        "Die ausgebildeten Fachkräfte haben bald eine Anstellung gefunden, weil wir ihnen geholfen haben.",
        "Die ausgebildeten Fachkräfte haben bald eine Anstellung gefunden, sodass wir ihnen haben geholfen.",
        "Die ausgebildeten Fachkräfte haben bald eine Anstellung gefunden, weil wir haben ihnen geholfen.",
        "Die ausgebildeten Fachkräfte haben bald eine Anstellung gefunden, denn wir haben ihnen geholfen."
      ],
      correct: [0, 3],
      expl: "<b>a</b> ✓ <i>weil</i> leitet einen Nebensatz ein → Verb am Ende (<i>geholfen haben</i>). <b>d</b> ✓ <i>denn</i> verbindet zwei Hauptsätze → Verb auf Position 2 (<i>wir haben …</i>). <b>b</b> ✗ <i>sodass</i> drückt eine Folge aus (falscher Sinn), und die Wortstellung ist falsch. <b>c</b> ✗ Nach <i>weil</i> darf das Verb nicht auf Position 2 stehen."
    },
    { type: "single",
      instr: "Wie lautet der Satz im Passiv?",
      prompt: "Die Kinder haben den Ball ins Tor geschossen.",
      options: [
        "Der Ball wird von den Kindern ins Tor geschossen.",
        "Der Ball ist von den Kindern ins Tor geschossen worden.",
        "Der Ball war von den Kindern ins Tor geschossen worden.",
        "Der Ball wird von den Kindern ins Tor geschossen worden."
      ],
      correct: 1,
      expl: "Der Aktivsatz steht im <b>Perfekt</b> (<i>haben … geschossen</i>) → Passiv Perfekt: <b>ist</b> + Partizip II + <b>worden</b>. a = Präsens, c = Plusquamperfekt, d gibt es nicht."
    },
    { type: "single",
      instr: "Welche Schlussfolgerung lässt sich aus der Grafik ziehen?",
      prompt: CHART,
      note: "Antworten neu formuliert (auf dem Foto nicht lesbar).",
      options: [
        "Der Groß- und Einzelhandel verursacht den größten Teil der Lebensmittelabfälle.",
        "Mehr als die Hälfte der Lebensmittelabfälle entsteht in privaten Haushalten.",
        "In der Primärproduktion entsteht mehr Abfall als bei der Verarbeitung von Lebensmitteln.",
        "Restaurants und Kantinen (Außer-Haus-Verpflegung) werfen weniger weg als der Handel."
      ],
      correct: 1,
      expl: "Private Haushalte: 6,1 von 12 Mio. Tonnen = <b>52 %</b>, also mehr als die Hälfte. Der Handel hat mit 4 % den kleinsten Anteil, die Primärproduktion (1,4) liegt unter der Verarbeitung (2,2), und die Außer-Haus-Verpflegung (1,7) liegt über dem Handel (0,5)."
    },
    { type: "select",
      instr: "Setzen Sie die passenden Reflexivpronomen in die Sätze ein.",
      hint: "Im echten Test per Drag-and-Drop. Ein Wort kann mehrmals passen, ein Wort passt gar nicht.",
      bank: ["sich", "mich", "mir", "dich", "uns", "dir", "euch"],
      rows: [
        {s: "Ich freue ___ auf das Wochenende.", a: "mich", e: "sich freuen auf – <i>ich</i> → Akkusativ <b>mich</b>."},
        {s: "Kannst du ___ noch an die Schulzeit erinnern?", a: "dich", e: "sich erinnern an – <i>du</i> → <b>dich</b>."},
        {s: "Sie muss ___ dringend ausruhen, weil sie gestern lange gearbeitet hat.", a: "sich", e: "sich ausruhen – <i>sie</i> → <b>sich</b>."},
        {s: "Ich möchte ___ dein Geschenk schon heute geben.", a: "dir", e: "Kein Reflexivpronomen: <i>jemandem</i> etwas geben → Dativ, und es geht um dich → <b>dir</b>."},
        {s: "Könnt ihr ___ vorstellen, einen Marathon zu laufen?", a: "euch", e: "sich etwas vorstellen (Dativ) – <i>ihr</i> → <b>euch</b> (Dativ und Akkusativ sind bei <i>ihr</i> gleich)."},
        {s: "Die Kinder amüsieren ___ auf dem Spielplatz.", a: "sich", e: "sich amüsieren – <i>die Kinder</i> (sie, Plural) → <b>sich</b>."},
        {s: "Er hat ___ das Ziel gesetzt, mehr Sport zu machen.", a: "sich", e: "sich (Dativ) ein Ziel setzen – <i>er</i> → <b>sich</b>."},
        {s: "Wir müssen ___ beeilen, sonst kommen wir zu spät.", a: "uns", e: "sich beeilen – <i>wir</i> → <b>uns</b>."}
      ]
    },
    { type: "gaps",
      instr: "Vervollständigen Sie die jeweiligen Lücken durch die Eingabe der fehlenden Buchstaben. Achten Sie dabei auf die orthografische und grammatische Korrektheit.",
      text: "70 Milliarden Euro Krankheitskosten gehen auf das Konto von falscher Ernährung und Bewegungsman{gel}. Fettleibigkeit und Diabe{tes} sind ein wachsen{des} Problem i{m} Kindesalter, wa{s} durch fal{sche} Ernährung, z{u} viele Kohlenhy{drate} und Fe{tt} sowie wen{ig} Bewegung verur{sacht} wird. D{er} Organismus vo{n} Kindern rea{giert} zudem stär{ker} auf Chemik{alien} in d{er} Nahrung – mi{t} Aufmerksamkeitsstörungen, Lernpro{blemen} und Aller{gien}.",
      expl: "Typische Fallen: <i>ein wachsend<b>es</b> Problem</i> (das Problem, neutral, nach <i>ein</i>), <i>i<b>m</b> Kindesalter</i>, <i>wa<b>s</b></i> (bezieht sich auf den ganzen Satz davor), <i>durch fal<b>sche</b> Ernährung</i> (<i>durch</i> + Akkusativ, feminin), <i>stär<b>ker</b></i> (Komparativ), <i>in d<b>er</b> Nahrung</i> (Dativ, wo?), <i>Lernpro<b>blemen</b></i> (<i>mit</i> + Dativ Plural → -n)."
    },
    { type: "select",
      instr: "Welche Adjektive passen zusammen? Ordnen Sie zu.",
      hint: "Gesucht ist jeweils das Gegenteil. Nicht alle Wörter passen – und manche Wörter gibt es gar nicht.",
      bank: ["mutig", "zurückhaltend", "hübsch", "unternehmungslustig", "intelligent", "sportlos", "sparsam", "kleinzügig", "angstlos", "unsportlich", "lustig", "faul"],
      rows: [
        {s: "sportlich ↔ ___", a: "unsportlich", e: "Gegenteil mit <i>un-</i>: <b>unsportlich</b>. „sportlos“ gibt es nicht."},
        {s: "offen ↔ ___", a: "zurückhaltend", e: "offen (geht auf Menschen zu) ↔ <b>zurückhaltend</b>."},
        {s: "fleißig ↔ ___", a: "faul", e: "fleißig ↔ <b>faul</b>."},
        {s: "lustlos ↔ ___", a: "unternehmungslustig", e: "lustlos = ohne Lust, ohne Motivation ↔ <b>unternehmungslustig</b>. Falle: <i>lustig</i> heißt „witzig“."},
        {s: "großzügig ↔ ___", a: "sparsam", e: "großzügig (gibt gern Geld aus) ↔ <b>sparsam</b>. „kleinzügig“ gibt es nicht (richtig wäre <i>kleinlich</i>)."},
        {s: "ängstlich ↔ ___", a: "mutig", alt: ["angstlos"], e: "ängstlich ↔ <b>mutig</b>. (<i>angstlos</i> ist auch ein echtes Wort und wird hier ebenfalls akzeptiert.)"}
      ]
    },
    { type: "select",
      instr: "Ergänzen Sie die Relativpronomen der, die, das in der korrekten Form.",
      bank: ["der", "die", "das", "den", "dem", "deren", "dessen", "denen"],
      rows: [
        {s: "Immer wieder ist von Jugendlichen zu hören, ___ auf die schiefe Bahn geraten.", a: "die", e: "Bezugswort <i>Jugendliche</i> (Plural), im Relativsatz Subjekt → Nominativ Plural <b>die</b>."},
        {s: "Oft ist es Gruppenzwang, durch ___ Jugendliche zu Straftätern werden.", a: "den", e: "<i>der</i> Gruppenzwang (maskulin), <i>durch</i> + Akkusativ → <b>den</b>."},
        {s: "Eine gute Alternative ist die sportliche Betätigung, bei ___ Jugendliche zeigen können, welche Kräfte in ihnen stecken.", a: "der", e: "<i>die</i> Betätigung (feminin), <i>bei</i> + Dativ → <b>der</b>."},
        {s: "Sie wollen Freunde, ___ ihnen sehr wichtig sind, beeindrucken.", a: "die", e: "<i>Freunde</i> (Plural) ist im Relativsatz Subjekt → <b>die</b>."},
        {s: "Das Einfügen in die Gemeinschaft lernt man am schnellsten im Team, ___ immer eine erzieherische Funktion hat.", a: "das", e: "<i>das</i> Team (neutral), Subjekt → <b>das</b>."}
      ]
    }
  ]
};
})();
