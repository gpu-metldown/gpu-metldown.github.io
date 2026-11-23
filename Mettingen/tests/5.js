/* Alte Klausur Mettingen – echte Aufnahmetests 07.12.2024 und 16.12.2024 (nach Fotos) + Zusatz Nordhausen */
(function(){
const WF = ["Wahr", "Falsch"];

const CHART_KLIMA = `
<figure class="chart">
  <figcaption>Der Klimawandel ist im Alltag angekommen<br><span>Anteil der Befragten, die Ereignisse beobachtet haben, für die der Klimawandel verantwortlich sein könnte*</span></figcaption>
  <div class="bars">
    <div class="b"><span class="l">Zu warme Temperaturen für den Winter</span><span class="t"><i style="width:100%"></i></span><span class="v">60 %</span></div>
    <div class="b"><span class="l">Stark schwankende/sich schnell verändernde Temperaturen</span><span class="t"><i style="width:83%"></i></span><span class="v">50 %</span></div>
    <div class="b"><span class="l">Schnelle Wetterumschwünge</span><span class="t"><i style="width:73%"></i></span><span class="v">44 %</span></div>
    <div class="b"><span class="l">Trockenheit</span><span class="t"><i style="width:73%"></i></span><span class="v">44 %</span></div>
    <div class="b"><span class="l">Früheres Blühen von Bäumen, Blumen etc.</span><span class="t"><i style="width:68%"></i></span><span class="v">41 %</span></div>
    <div class="b"><span class="l">Stürme</span><span class="t"><i style="width:65%"></i></span><span class="v">39 %</span></div>
    <div class="b"><span class="l">Frühere Rückkehr von Tieren aus Überwinterungsorten</span><span class="t"><i style="width:57%"></i></span><span class="v">34 %</span></div>
    <div class="b"><span class="l">Starke/lange Regengüsse</span><span class="t"><i style="width:52%"></i></span><span class="v">31 %</span></div>
  </div>
  <div class="src">* Beobachtungen in der eigenen Umgebung in den letzten Wochen und Monaten. Basis: 1.315 Befragte (ab 18 Jahre) in Deutschland, die an den menschengemachten Klimawandel glauben; Mehrfachauswahl möglich; 20.–22.03.2023. Quelle: YouGov</div>
</figure>`;

const CHART_ABFALL = `
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

const TEXT_ESSEN = `<h3>Das kann man doch noch essen!</h3>
  <p>Brot, Obst, Gemüse, Käse: Etwa elf Millionen Tonnen Lebensmittel werden in Deutschland jedes Jahr in den Müll geworfen. Aber nicht alles ist ungenießbar. Manche von diesen Lebensmitteln könnte man noch essen. Die Überproduktion von Lebensmitteln ist ein großes Problem. Denn sie sorgt für viel Müll. Und sie verschwendet Geld und Ressourcen. Das Getreide vom Feld für das Brot – auf dem Müll. Die Orange aus Spanien, extra mit dem Flugzeug nach Deutschland geflogen – auf dem Müll. Tatsache ist: Lebensmittel sind in Deutschland relativ günstig. Hier geben Menschen etwa elf Prozent ihres Einkommens für Nahrungsmittel aus. In anderen Ländern ist das deutlich mehr. Und weil die Lebensmittel hierzulande so wenig kosten, haben sie für die Menschen weniger Wert. Man denkt meist nicht darüber nach: Aus welchem Land kommt die Orange? Wie viel Milch muss eine Kuh jeden Tag geben? Das deutsche Bundesministerium für Ernährung und Landwirtschaft hat dieses große Problem erkannt. Es möchte, dass weniger Essen weggeworfen wird, und hat dafür eine App gestartet: „Zu gut für die Tonne“. Diese App erklärt, wie Essen länger haltbar bleibt, und zeigt Rezepte für die Verwertung von Essensresten.</p>`;

const TEXT_SCHOEN = `<h3>„Die Macht der Schönheit“</h3>
  <p>Werden Sie oft mit anderen Leuten verwechselt? Hören Sie den Spruch „Sie kommen mir irgendwie bekannt vor.“ fast täglich? Kurz: Sie sehen vollkommen durchschnittlich aus? Gut für Sie, denn zahlreiche Forschungsergebnisse weisen darauf hin, dass durchschnittliche Gesichter von den meisten Menschen als attraktiv bewertet werden. Doch egal, ob Sie durchschnittlich schön sind oder umwerfend aussehen, Tatsache ist: Schöne haben es leichter im Leben. Das ist zwar nicht gerade fair, bestätigt sich aber immer wieder. Schöne Menschen sind im Allgemeinen beliebter bei ihren Mitmenschen und es werden ihnen automatisch positive Charaktereigenschaften zugesprochen. So werden gut aussehende Menschen in der Regel als erfolgreicher, intelligenter, glaubwürdiger, geselliger, kreativer und fleißiger eingeschätzt; unattraktive Menschen gelten viel eher als faul, fantasielos und langweilig.</p>`;

window.TEST = {
  id: "5",
  kind: "exam",
  version: 2,
  minutes: 60,
  intro: `Diese Klausur besteht aus <b>zwei echten Aufnahmetests des Studienkollegs Mettingen</b> (07.12.2024 und 16.12.2024), abgeschrieben von Fotos, und einer Zusatzaufgabe aus dem Online-Test der Hochschule Nordhausen.<br>
    <b>Achtung:</b> Es gibt keinen offiziellen Lösungsschlüssel – die Lösungen sind selbst erarbeitet. Aufgaben, die auf den Fotos fehlten oder abgeschnitten waren, sind <i>nachgebaut</i> und mit <b>(nachgebaut)</b> markiert. Den Teil „Multiple Choice“ (Fragen 23–32) vom 07.12. gab es nicht als Foto.<br>
    In den echten Tests hattest du ca. 45 bzw. 30 Minuten. Für diese ganze Klausur gibt es 60 Minuten.`,
  tasks: [
    /* ================= KLAUSUR 07.12.2024 ================= */
    { section: "Teil 1 – Klausur vom 07.12.2024",
      type: "single", plain: true,
      instr: "Wahr oder falsch? Entscheiden Sie anhand der Grafik.",
      prompt: CHART_KLIMA,
      hint: "Im echten Test: Fragen 1–10, je 2 Punkte.",
      items: [
        { prompt: "Die Befragten durften nur eine Antwort auswählen.", options: WF, correct: 1, expl: "Unter der Grafik steht: „Mehrfachauswahl möglich“." },
        { prompt: "Die Zahlen der Grafik sind in absoluten Zahlen angegeben.", options: WF, correct: 1, expl: "Die Zahlen sind <b>Prozentangaben</b> (Anteile), keine absoluten Zahlen." },
        { prompt: "Schnelle Wetterumschwünge und Trockenheit wurden anteilig genau gleich als Antwort angegeben.", options: WF, correct: 0, expl: "Beide: 44 %." },
        { prompt: "Die Befragung wurde 2023 durchgeführt.", options: WF, correct: 0, expl: "20.–22.03.2023." },
        { prompt: "Die meisten Befragten beobachteten zu hohe Temperaturen im Winter.", options: WF, correct: 0, expl: "60 % – das ist der höchste Wert und mehr als die Hälfte." },
        { prompt: "Die Befragten beobachteten keine Auswirkungen des Klimas auf die Tier- und Pflanzenwelt (Fauna und Flora).", options: WF, correct: 1, expl: "Früheres Blühen (41 %) und frühere Rückkehr von Tieren (34 %) wurden beobachtet." },
        { prompt: "Mehr als die Hälfte der Befragten beobachtete stark schwankende Temperaturen. <i>(nachgebaut)</i>", options: WF, correct: 1, expl: "Es sind <b>genau</b> 50 % – also nicht <i>mehr</i> als die Hälfte. Auf solche Wörter achten!" },
        { prompt: "Die Befragten glaubten daran, dass der Klimawandel nicht nur natürlichen Ursprungs ist.", options: WF, correct: 0, expl: "Basis: Befragte, „die an den <b>menschengemachten</b> Klimawandel glauben“." },
        { prompt: "Die Befragten waren volljährig.", options: WF, correct: 0, expl: "„ab 18 Jahre“ = volljährig." },
        { prompt: "Von den Befragten wurden auch Niederschläge, Stürme und schnelle Änderungen des Wetters als Auswirkungen des Klimawandels beobachtet.", options: WF, correct: 0, expl: "Regengüsse = Niederschläge (31 %), Stürme (39 %), Wetterumschwünge (44 %)." }
      ]
    },
    { type: "single",
      instr: "Ergänzen Sie die Lücken durch ein Relativpronomen, indem Sie die richtige Form ankreuzen.",
      hint: "Im echten Test: Fragen 11–20, je 2 Punkte.",
      items: [
        { prompt: "Viele Wetterumschwünge, ___ beobachtet werden, sind in letzter Zeit häufiger geworden.", options: ["der", "deren", "die"], correct: 2, expl: "Bezugswort <i>Wetterumschwünge</i> (Plural), Subjekt im Relativsatz → <b>die</b>." },
        { prompt: "Stürme, durch ___ Schäden entstehen, werden häufiger.", options: ["deren", "die", "dessen"], correct: 1, expl: "<i>durch</i> + Akkusativ, Plural → <b>die</b>." },
        { prompt: "Ein Ereignis, ___ immer mehr zunimmt, ist Hochwasser. <i>(Antworten b und c nachgebaut)</i>", options: ["das", "der", "dessen"], correct: 0, expl: "<i>das</i> Ereignis (neutral), Subjekt → <b>das</b>." },
        { prompt: "Tornados, ___ Entstehung immer häufiger stattfindet, verursachen oft große Schäden.", options: ["deren", "dessen", "welche"], correct: 0, expl: "Besitz (Genitiv): die Entstehung <i>der Tornados</i> → Plural → <b>deren</b>." },
        { prompt: "Viele Pflanzen, von ___ man weiß, werden durch den Klimawandel bedroht.", options: ["dessen", "deren", "denen"], correct: 2, expl: "<i>von</i> + Dativ Plural → <b>denen</b>." },
        { prompt: "Der Weg der Tiere, ___ sehr beliebt ist, wird ebenfalls durch den Klimawandel bedroht.", options: ["die", "das", "der"], correct: 2, expl: "Das Verb <i>ist</i> (Singular) zeigt: gemeint ist <i>der Weg</i> → <b>der</b>. (<i>die</i> Tiere wäre Plural → <i>sind</i>.)" },
        { prompt: "Die Gletscher, ___ Eis immer schneller schmilzt, liegen vor allem in den Alpen. <i>(nachgebaut)</i>", options: ["die", "deren", "dessen"], correct: 1, expl: "Besitz: das Eis <i>der Gletscher</i> (Plural) → <b>deren</b>." },
        { prompt: "Der Sommer, in ___ es kaum geregnet hat, war sehr heiß. <i>(nachgebaut)</i>", options: ["dem", "den", "der"], correct: 0, expl: "<i>in</i> + Dativ (wann/wo?), maskulin → <b>dem</b>." },
        { prompt: "Die Forscherin, ___ wir diese Studie verdanken, arbeitet in Potsdam. <i>(nachgebaut)</i>", options: ["die", "der", "deren"], correct: 1, expl: "<i>jemandem</i> etwas verdanken → Dativ feminin → <b>der</b>." },
        { prompt: "Das Klimaabkommen, ___ viele Staaten unterschrieben haben, soll die Erderwärmung begrenzen. <i>(nachgebaut)</i>", options: ["das", "dem", "dessen"], correct: 0, expl: "<i>etwas</i> unterschreiben → Akkusativ neutral → <b>das</b>." }
      ]
    },
    { type: "gaps",
      instr: "Aufnahme C-Test: Vervollständigen Sie die Lücken durch die Eingabe der fehlenden Buchstaben.",
      hint: "Beispiel aus dem echten Test: D<u>er</u> Zug na<u>ch</u> Berlin i<u>st</u> heute ga<u>nz</u> pünktlich abgef<u>ahren</u>. – Achten Sie bei Wortendungen auf die grammatikalische Anpassung. (Im echten Test: 40 Punkte)",
      text: "Die Za{hl} der durchschni{ttlichen} Hitzetage i{n} NRW steigt kontinui{erlich} an. Zw{ar} gab e{s} in de{n} Jahren se{it} 2000 je na{ch} Sommerverlauf Schwank{ungen}, die Tend{enz} ist jed{och} eindeutig. Na{ch} dem Klimamit{tel} 1961 bis 1990 verzeich{nete} NRW durchschnittlich ru{nd} vier hei{ße} Tage pr{o} Jahr i{n} NRW, i{m} Klimamittel 1991 bi{s} 2020 waren e{s} mit et{wa} acht Hitzetag{en} schon dopp{elt} so vie{le}. Als Hitzetage gel{ten} Tage a{b} 30 Grad Celsius. Le{gt} man di{e} Jahre vo{n} 2003 bis 2023 zugru{nde}, sind wi{r} in NRW sch{on} bei ne{un} heißen Tag{en} als langjähri{gem} Durchschnittswert angela{ngt}, sagt Thomas Kesseler-Lauterkorn, stellvertretender Lei{ter} des Klimabür{os} des Deutschen Wetterdienstes in Essen.",
      expl: "Wichtige Stellen: <i>der durchschnittlich<b>en</b> Hitzetage</i> (Genitiv Plural), <i>kontinui<b>erlich</b></i>, <i>Zw<b>ar</b> … die Tendenz ist jed<b>och</b></i>, <i>verzeich<b>nete</b></i> (Präteritum), <i>vier heiß<b>e</b> Tage</i>, <i>mit etwa acht Hitzetag<b>en</b></i> (Dativ Plural), <i>doppelt so vie<b>le</b></i>, <i>zugru<b>nde</b> legen</i>, <i>als langjährig<b>em</b> Durchschnittswert</i> (Dativ, wie <i>bei … Tagen</i>), <i>des Klimabür<b>os</b></i> (Genitiv)."
    },

    /* ================= KLAUSUR 16.12.2024 ================= */
    { section: "Teil 2 – Klausur vom 16.12.2024",
      type: "multi",
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
      expl: "<b>a</b> ✓ <i>weil</i> → Verb am Ende (<i>geholfen haben</i>). <b>d</b> ✓ <i>denn</i> → Hauptsatz, Verb auf Position 2. <b>b</b> ✗ <i>sodass</i> = Folge (falscher Sinn) und falsche Wortstellung. <b>c</b> ✗ nach <i>weil</i> darf das Verb nicht auf Position 2 stehen."
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
      expl: "Aktiv im <b>Perfekt</b> → Passiv Perfekt: <b>ist</b> + Partizip II + <b>worden</b>. a = Präsens, c = Plusquamperfekt, d gibt es nicht."
    },
    { type: "single",
      instr: "Welche Schlussfolgerung lässt sich aus der Grafik ziehen?",
      prompt: CHART_ABFALL,
      note: "Antworten neu formuliert (auf dem Foto nicht lesbar).",
      options: [
        "Der Groß- und Einzelhandel verursacht den größten Teil der Lebensmittelabfälle.",
        "Mehr als die Hälfte der Lebensmittelabfälle entsteht in privaten Haushalten.",
        "In der Primärproduktion entsteht mehr Abfall als bei der Verarbeitung von Lebensmitteln.",
        "Restaurants und Kantinen (Außer-Haus-Verpflegung) werfen weniger weg als der Handel."
      ],
      correct: 1,
      expl: "Private Haushalte: 6,1 von 12 Mio. t = <b>52 %</b>. Handel nur 4 %; Primärproduktion (1,4) &lt; Verarbeitung (2,2); Außer-Haus (1,7) &gt; Handel (0,5)."
    },
    { type: "multi",
      instr: "Lesen Sie den Text und entscheiden Sie, welche der unten genannten Aussagen mit dem Inhalt übereinstimmen, und kreuzen Sie diese an.",
      prompt: TEXT_ESSEN, reading: true,
      items: [
        { prompt: "Welche Aussagen stimmen mit dem Text überein?",
          options: [
            "Hauptsächlich entsteht das Problem daraus, dass im Allgemeinen zu viele Lebensmittel hergestellt werden.",
            "Die jährliche Verschwendung von Millionen Lebensmitteln ist sehr teuer und schadet der Umwelt.",
            "Der Staat hat die Probleme erkannt und macht nun Werbung, wie Essen zum Beispiel länger haltbar gemacht werden kann.",
            "Die App „Zu gut für die Tonne“ zeigt, in welche Tonne die Essensreste geworfen werden sollen.",
            "Ein weiteres Problem sind die hohen Lebensmittelpreise in Deutschland.",
            "In Deutschland werden jährlich circa elf Millionen genießbare Lebensmittel entsorgt."
          ],
          correct: [0, 1, 2],
          expl: "<b>a</b> ✓ „Die Überproduktion von Lebensmitteln ist ein großes Problem.“ <b>b</b> ✓ Überproduktion verschwendet Geld und Ressourcen und sorgt für viel Müll. <b>c</b> ✓ Das Ministerium hat das Problem erkannt und eine App gestartet, die erklärt, wie Essen länger haltbar bleibt. <b>d</b> ✗ Die App zeigt Rezepte, nicht die richtige Tonne. <b>e</b> ✗ Lebensmittel sind in Deutschland <i>günstig</i>. <b>f</b> ✗ Es sind elf Millionen <i>Tonnen</i>, und nicht alles davon ist genießbar. (a und c sind ohne Lösungsschlüssel etwas unsicher.)" }
      ]
    },
    { type: "select",
      instr: "Setzen Sie die passenden Reflexivpronomen in die Sätze ein.",
      hint: "Im echten Test per Drag-and-Drop. Ein Wort kann mehrmals passen, ein Wort passt gar nicht.",
      bank: ["sich", "mich", "mir", "dich", "uns", "dir", "euch"],
      rows: [
        {s: "Ich freue ___ auf das Wochenende.", a: "mich", e: "sich freuen auf – <i>ich</i> → Akkusativ <b>mich</b>."},
        {s: "Kannst du ___ noch an die Schulzeit erinnern?", a: "dich", e: "sich erinnern an – <i>du</i> → <b>dich</b>."},
        {s: "Sie muss ___ dringend ausruhen, weil sie gestern lange gearbeitet hat.", a: "sich", e: "sich ausruhen – <i>sie</i> → <b>sich</b>."},
        {s: "Ich möchte ___ dein Geschenk schon heute geben.", a: "dir", e: "Kein Reflexivpronomen: <i>jemandem</i> etwas geben → Dativ → <b>dir</b>."},
        {s: "Könnt ihr ___ vorstellen, einen Marathon zu laufen?", a: "euch", e: "sich etwas vorstellen – <i>ihr</i> → <b>euch</b>."},
        {s: "Die Kinder amüsieren ___ auf dem Spielplatz.", a: "sich", e: "sich amüsieren – <i>sie</i> (Plural) → <b>sich</b>."},
        {s: "Er hat ___ das Ziel gesetzt, mehr Sport zu machen.", a: "sich", e: "sich (Dativ) ein Ziel setzen – <i>er</i> → <b>sich</b>."},
        {s: "Wir müssen ___ beeilen, sonst kommen wir zu spät.", a: "uns", e: "sich beeilen – <i>wir</i> → <b>uns</b>."}
      ]
    },
    { type: "gaps",
      instr: "Vervollständigen Sie die jeweiligen Lücken durch die Eingabe der fehlenden Buchstaben. Achten Sie dabei auf die orthografische und grammatische Korrektheit.",
      text: "70 Milliarden Euro Krankheitskosten gehen auf das Konto von falscher Ernährung und Bewegungsman{gel}. Fettleibigkeit und Diabe{tes} sind ein wachsen{des} Problem i{m} Kindesalter, wa{s} durch fal{sche} Ernährung, z{u} viele Kohlenhy{drate} und Fe{tt} sowie wen{ig} Bewegung verur{sacht} wird. D{er} Organismus vo{n} Kindern rea{giert} zudem stär{ker} auf Chemik{alien} in d{er} Nahrung – mi{t} Aufmerksamkeitsstörungen, Lernpro{blemen} und Aller{gien}.",
      expl: "Typische Fallen: <i>ein wachsend<b>es</b> Problem</i> (neutral, nach <i>ein</i>), <i>i<b>m</b> Kindesalter</i>, <i>wa<b>s</b></i> (bezieht sich auf den ganzen Satz), <i>durch fal<b>sche</b> Ernährung</i> (Akkusativ, feminin), <i>Fe<b>tt</b></i>, <i>stär<b>ker</b></i> (Komparativ), <i>in d<b>er</b> Nahrung</i> (Dativ), <i>Lernpro<b>blemen</b></i> (Dativ Plural)."
    },
    { type: "select",
      instr: "Welche Adjektive passen zusammen? Ordnen Sie zu.",
      hint: "Gesucht ist jeweils das Gegenteil. Nicht alle Wörter passen – und manche Wörter gibt es gar nicht.",
      bank: ["mutig", "zurückhaltend", "hübsch", "unternehmungslustig", "intelligent", "sportlos", "sparsam", "kleinzügig", "angstlos", "unsportlich", "lustig", "faul"],
      rows: [
        {s: "sportlich ↔ ___", a: "unsportlich", e: "<b>unsportlich</b>. „sportlos“ gibt es nicht."},
        {s: "offen ↔ ___", a: "zurückhaltend", e: "offen ↔ <b>zurückhaltend</b>."},
        {s: "fleißig ↔ ___", a: "faul", e: "fleißig ↔ <b>faul</b>."},
        {s: "lustlos ↔ ___", a: "unternehmungslustig", e: "lustlos = ohne Lust/Motivation ↔ <b>unternehmungslustig</b>. Falle: <i>lustig</i> = witzig."},
        {s: "großzügig ↔ ___", a: "sparsam", e: "großzügig ↔ <b>sparsam</b>. „kleinzügig“ gibt es nicht (richtig wäre <i>kleinlich</i>)."},
        {s: "ängstlich ↔ ___", a: "mutig", alt: ["angstlos"], e: "ängstlich ↔ <b>mutig</b> (<i>angstlos</i> wird auch akzeptiert)."}
      ]
    },
    { type: "select",
      instr: "Ergänzen Sie die Relativpronomen der, die, das in der korrekten Form.",
      bank: ["der", "die", "das", "den", "dem", "deren", "dessen", "denen"],
      rows: [
        {s: "Immer wieder ist von Jugendlichen zu hören, ___ auf die schiefe Bahn geraten.", a: "die", e: "<i>Jugendliche</i> (Plural), Subjekt → <b>die</b>."},
        {s: "Oft ist es Gruppenzwang, durch ___ Jugendliche zu Straftätern werden.", a: "den", e: "<i>der</i> Gruppenzwang, <i>durch</i> + Akkusativ → <b>den</b>."},
        {s: "Eine gute Alternative ist die sportliche Betätigung, bei ___ Jugendliche zeigen können, welche Kräfte in ihnen stecken.", a: "der", e: "<i>die</i> Betätigung, <i>bei</i> + Dativ → <b>der</b>."},
        {s: "Sie wollen Freunde, ___ ihnen sehr wichtig sind, beeindrucken.", a: "die", e: "<i>Freunde</i> (Plural), Subjekt → <b>die</b>."},
        {s: "Das Einfügen in die Gemeinschaft lernt man am schnellsten im Team, ___ immer eine erzieherische Funktion hat.", a: "das", e: "<i>das</i> Team, Subjekt → <b>das</b>."}
      ]
    },

    /* ================= ZUSATZ ================= */
    { section: "Zusatz – Leseverstehen aus dem Online-Test der Hochschule Nordhausen",
      type: "multi",
      instr: "Lesen Sie den Text und entscheiden Sie, welche Aussagen mit dem Textinhalt übereinstimmen.",
      prompt: TEXT_SCHOEN, reading: true,
      note: "Gleiches Prüfungssystem wie in Mettingen. Weitere Antworten nach e. waren auf dem Foto abgeschnitten.",
      items: [
        { prompt: "Welche Aussagen stimmen mit dem Text überein?",
          options: [
            "Ein durchschnittliches Aussehen wird von den meisten Menschen als negativ empfunden, was häufig zu abwertenden Beurteilungen der Personen führt.",
            "Immer wieder kann festgestellt werden, dass schöne Menschen weniger Schwierigkeiten in ihrem Leben haben.",
            "Nicht so attraktive Menschen wirken für andere Menschen durch die ihnen zugeordnete Faulheit und Fantasielosigkeit eher langweilig und uninteressant.",
            "Schöne Menschen werden allgemein als beliebter eingestuft, weil ihnen Charaktereigenschaften wie Erfolglosigkeit und mangelnde Glaubwürdigkeit zugeordnet werden.",
            "Ein schönes Aussehen wird von den meisten Menschen zwar als positiv empfunden, führt aber häufig zu abwertenden Beurteilungen der Personen."
          ],
          correct: [1],
          expl: "<b>b</b> ✓ „Schöne haben es leichter im Leben … bestätigt sich aber immer wieder.“ <b>a</b> ✗ Durchschnittliche Gesichter gelten als <i>attraktiv</i>. <b>c</b> ✗ Im Text sind <i>faul, fantasielos</i> und <i>langweilig</i> drei gleichwertige Eigenschaften – „langweilig“ ist keine <i>Folge</i> der Faulheit, und „uninteressant“ steht nicht im Text (Achtung: solche Ursache-Wirkungs-Umdeutungen sind typische Fallen). <b>d</b> ✗ Schönen werden <i>positive</i> Eigenschaften zugesprochen. <b>e</b> ✗ Von abwertenden Urteilen über schöne Menschen steht nichts im Text." }
      ]
    }
  ]
};
})();
