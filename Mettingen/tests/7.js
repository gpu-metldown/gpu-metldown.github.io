/* Übungstest 7 – Mettingen-Format mit Hörverstehen */
(function(){
const WF = ["Wahr", "Falsch"];

const CHART = `
<figure class="chart">
  <figcaption>Wo informieren sich junge Menschen über Nachrichten?<br><span>Anteil der Befragten, die die Quelle regelmäßig nutzen*</span></figcaption>
  <div class="bars">
    <div class="b"><span class="l">Soziale Medien</span><span class="t"><i style="width:100%"></i></span><span class="v">58 %</span></div>
    <div class="b"><span class="l">Nachrichten-Websites und -Apps</span><span class="t"><i style="width:71%"></i></span><span class="v">41 %</span></div>
    <div class="b"><span class="l">Gespräche mit Familie und Freunden</span><span class="t"><i style="width:62%"></i></span><span class="v">36 %</span></div>
    <div class="b"><span class="l">Fernsehen</span><span class="t"><i style="width:55%"></i></span><span class="v">32 %</span></div>
    <div class="b"><span class="l">Radio</span><span class="t"><i style="width:26%"></i></span><span class="v">15 %</span></div>
    <div class="b"><span class="l">Gedruckte Zeitung</span><span class="t"><i style="width:12%"></i></span><span class="v">7 %</span></div>
  </div>
  <div class="src">* Basis: 1.000 Befragte zwischen 16 und 25 Jahren in Deutschland; Mehrfachauswahl möglich; Januar 2026. Fiktive Übungsdaten.</div>
</figure>`;

const TEXT_APPS = `<h3>Sprachen lernen per App</h3>
  <p>Millionen Menschen in Deutschland nutzen inzwischen Apps, um eine Fremdsprache zu lernen. Die Programme sind praktisch: Man kann überall und zu jeder Zeit üben, zum Beispiel im Bus oder in der Mittagspause. Viele Apps arbeiten mit kurzen Übungen von wenigen Minuten und belohnen die Nutzer mit Punkten, wenn sie jeden Tag lernen. Dadurch bleiben viele Lernende länger motiviert.</p>
  <p>Sprachwissenschaftler sehen die Apps trotzdem kritisch. Sie seien gut geeignet, um Vokabeln zu wiederholen und erste Sätze zu lernen. Wer aber eine Sprache wirklich beherrschen wolle, müsse sie auch sprechen – und das könne eine App bisher nur begrenzt trainieren. Außerdem fehle bei vielen Programmen die Erklärung der Grammatik: Die Lernenden wüssten zwar, wie ein Satz richtig ist, aber nicht, warum.</p>
  <p>Die Experten empfehlen deshalb, Apps als Ergänzung zu einem Sprachkurs zu nutzen, nicht als Ersatz. Besonders wirksam sei es, das Gelernte möglichst schnell in echten Gesprächen anzuwenden – etwa in einem Sprachcafé oder mit einem Tandempartner.</p>`;

window.TEST = {
  id: "7",
  kind: "exam",
  minutes: 60,
  intro: `Ein neuer Test im <b>Format des Online-Tests in Mettingen</b> – mit einem zusätzlichen Teil <b>Hörverstehen</b>.<br>
    <b>So funktioniert das Hören:</b> Der Text wird von der Sprachausgabe deines Geräts vorgelesen (auf Mac/iPhone meist die Stimme „Anna“). Wie in einer echten Prüfung kannst du jeden Hörtext <b>zweimal</b> hören. Lies die Aufgaben vorher durch! Nach der Auswertung kannst du beliebig oft hören und den Text mitlesen. Ton anschalten 🔊<br>
    <span class="small-note">Hinweis: Auf den Fotos der echten Mettinger Tests (Dez. 2024) gab es keinen Hörteil – andere Studienkollegs prüfen ihn aber. Die Grafikdaten sind erfunden.</span>`,
  tasks: [
    /* ---------------- HÖREN ---------------- */
    { section: "Teil A – Hörverstehen",
      type: "single", plain: true,
      instr: "Hörtext 1: Sie hören ein Radiointerview mit Amir, der ein Studienkolleg besucht. Sind die Aussagen wahr oder falsch?",
      audio: { maxPlays: 2, script: [
        {sp: "Moderatorin", g: "f", text: "Herzlich willkommen zu unserer Sendung „Neu in Deutschland“. Heute ist Amir bei uns. Er kommt aus Jordanien und besucht seit September ein Studienkolleg. Amir, warum hast du dich für Deutschland entschieden?"},
        {sp: "Amir", g: "m", text: "Ich möchte Maschinenbau studieren, und deutsche Hochschulen haben in diesem Bereich einen sehr guten Ruf. Außerdem gibt es an staatlichen Universitäten keine hohen Studiengebühren. Das war für meine Familie ein wichtiger Punkt."},
        {sp: "Moderatorin", g: "f", text: "Wie war der Anfang für dich?"},
        {sp: "Amir", g: "m", text: "Ehrlich gesagt ziemlich schwer. Ich hatte in Amman zwar zwei Jahre Deutsch gelernt, aber hier sprechen die Leute viel schneller. In den ersten Wochen habe ich im Unterricht nur die Hälfte verstanden. Am meisten hat mir geholfen, dass ich in einer Wohngemeinschaft mit zwei deutschen Studenten wohne. Wir kochen oft zusammen, und dabei muss ich Deutsch sprechen."},
        {sp: "Moderatorin", g: "f", text: "Und wie sieht dein Alltag im Studienkolleg aus?"},
        {sp: "Amir", g: "m", text: "Wir haben jeden Tag von acht bis ungefähr halb drei Unterricht. Ich bin im T-Kurs, also habe ich neben Deutsch vor allem Mathematik, Physik und Chemie. Physik finde ich am schwierigsten, nicht wegen der Formeln, sondern wegen der vielen Fachwörter."},
        {sp: "Moderatorin", g: "f", text: "Was machst du in deiner Freizeit?"},
        {sp: "Amir", g: "m", text: "Ich spiele zweimal pro Woche Fußball in einem Verein. Am Anfang war ich unsicher, ob ich dort Anschluss finde, aber die Mannschaft hat mich sehr freundlich aufgenommen. Am Wochenende lerne ich meistens, denn im Februar haben wir die ersten Prüfungen."},
        {sp: "Moderatorin", g: "f", text: "Hast du einen Tipp für andere, die bald nach Deutschland kommen?"},
        {sp: "Amir", g: "m", text: "Ja: Nicht nur aus Büchern lernen! Sucht euch ein Hobby, bei dem ihr mit Deutschen in Kontakt kommt. Dann lernt man die Sprache viel schneller und fühlt sich nicht so allein."},
        {sp: "Moderatorin", g: "f", text: "Vielen Dank, Amir, und viel Erfolg bei den Prüfungen!"}
      ]},
      items: [
        { prompt: "Amir hat sich für Deutschland entschieden, unter anderem weil das Studium dort wenig kostet.", options: WF, correct: 0, expl: "„An staatlichen Universitäten gibt es keine hohen Studiengebühren. Das war für meine Familie ein wichtiger Punkt.“" },
        { prompt: "Amir hatte vor seiner Ankunft noch nie Deutsch gelernt.", options: WF, correct: 1, expl: "Er hatte in Amman <b>zwei Jahre</b> Deutsch gelernt." },
        { prompt: "Am Anfang hat Amir im Unterricht fast alles verstanden.", options: WF, correct: 1, expl: "Er hat in den ersten Wochen nur <b>die Hälfte</b> verstanden." },
        { prompt: "Amir wohnt mit deutschen Studenten zusammen.", options: WF, correct: 0, expl: "Er wohnt in einer WG mit zwei deutschen Studenten." },
        { prompt: "In Physik hat Amir vor allem mit den Formeln Probleme.", options: WF, correct: 1, expl: "„… nicht wegen der Formeln, sondern wegen der vielen <b>Fachwörter</b>.“ – Achtung bei <i>nicht …, sondern …</i>!" },
        { prompt: "Amir empfiehlt, ein Hobby zu suchen, bei dem man Deutsche trifft.", options: WF, correct: 0, expl: "„Sucht euch ein Hobby, bei dem ihr mit Deutschen in Kontakt kommt.“" }
      ]
    },
    { type: "single",
      instr: "Hörtext 2: Sie hören einen kurzen Vortrag. Wählen Sie die richtige Antwort.",
      audio: { maxPlays: 2, script: [
        {sp: "Sprecherin", g: "f", text: "Guten Tag, meine Damen und Herren. In meinem kurzen Vortrag geht es heute um Mikroplastik. Als Mikroplastik bezeichnet man Plastikteilchen, die kleiner als fünf Millimeter sind. Manche dieser Teilchen werden absichtlich hergestellt, zum Beispiel für Kosmetikprodukte wie Peelings. Der größte Teil entsteht aber, wenn größere Plastikgegenstände langsam zerfallen, etwa Plastiktüten im Meer."},
        {sp: "Sprecherin", g: "f", text: "Eine weitere wichtige Quelle, an die viele Menschen nicht denken, ist der Abrieb von Autoreifen. Bei jeder Fahrt lösen sich winzige Teilchen vom Reifen und gelangen mit dem Regen in Flüsse und Seen."},
        {sp: "Sprecherin", g: "f", text: "Mikroplastik wurde inzwischen fast überall nachgewiesen: im Meer, im Boden, in der Luft und sogar im Trinkwasser. Welche Folgen das für die Gesundheit des Menschen hat, ist allerdings noch nicht ausreichend erforscht. Sicher ist, dass Meerestiere die Teilchen mit Nahrung verwechseln und daran sterben können."},
        {sp: "Sprecherin", g: "f", text: "Was kann man tun? Die Europäische Union hat bereits beschlossen, absichtlich zugesetztes Mikroplastik in vielen Produkten schrittweise zu verbieten. Jeder Einzelne kann außerdem helfen, indem er weniger Plastik kauft und Kleidung aus Kunstfasern seltener wäscht, denn auch beim Waschen lösen sich kleine Fasern. Vielen Dank für Ihre Aufmerksamkeit."}
      ]},
      items: [
        { prompt: "Was ist Mikroplastik laut Vortrag?",
          options: ["Plastikmüll, der im Meer schwimmt", "Plastikteilchen, die kleiner als fünf Millimeter sind", "Plastik, das nur in Kosmetik verwendet wird", "Plastikteilchen, die kleiner als fünf Zentimeter sind"],
          correct: 1, expl: "„Plastikteilchen, die kleiner als fünf <b>Millimeter</b> sind.“" },
        { prompt: "Welche Quelle von Mikroplastik vergessen laut Vortrag viele Menschen?",
          options: ["Plastiktüten", "Peelings", "den Abrieb von Autoreifen", "Trinkflaschen"],
          correct: 2, expl: "„Eine weitere wichtige Quelle, an die viele Menschen nicht denken, ist der Abrieb von Autoreifen.“" },
        { prompt: "Was sagt die Sprecherin über die Gesundheit des Menschen?",
          options: ["Die Folgen sind noch nicht ausreichend erforscht.", "Mikroplastik ist sicher ungefährlich.", "Mikroplastik macht nachweislich krank.", "Menschen nehmen kein Mikroplastik auf."],
          correct: 0, expl: "„Welche Folgen das für die Gesundheit des Menschen hat, ist allerdings noch nicht ausreichend erforscht.“" },
        { prompt: "Was kann laut Vortrag jeder Einzelne tun?",
          options: ["nur noch mit dem Fahrrad fahren", "kein Leitungswasser mehr trinken", "mehr Peelings benutzen", "Kleidung aus Kunstfasern seltener waschen"],
          correct: 3, expl: "„… indem er weniger Plastik kauft und Kleidung aus Kunstfasern seltener wäscht.“" }
      ]
    },

    /* ---------------- GRAFIK ---------------- */
    { section: "Teil B – Grafik",
      type: "single", plain: true,
      instr: "Wahr oder falsch? Entscheiden Sie anhand der Grafik.",
      prompt: CHART,
      items: [
        { prompt: "Die Befragten konnten mehrere Antworten geben.", options: WF, correct: 0, expl: "„Mehrfachauswahl möglich“." },
        { prompt: "Mehr als die Hälfte der Befragten informiert sich über soziale Medien.", options: WF, correct: 0, expl: "58 % &gt; 50 %." },
        { prompt: "Das Fernsehen wird häufiger genutzt als Nachrichten-Websites und -Apps.", options: WF, correct: 1, expl: "Fernsehen 32 % &lt; Websites/Apps 41 %." },
        { prompt: "Nur wenige Befragte lesen eine gedruckte Zeitung.", options: WF, correct: 0, expl: "7 %." },
        { prompt: "Die Zahlen sind in absoluten Zahlen angegeben.", options: WF, correct: 1, expl: "Es sind <b>Prozentangaben</b>." },
        { prompt: "Gespräche mit Familie und Freunden spielen keine Rolle.", options: WF, correct: 1, expl: "Immerhin 36 %." },
        { prompt: "Alle Befragten waren volljährig.", options: WF, correct: 1, expl: "Die Befragten waren zwischen <b>16</b> und 25 Jahre alt – nicht alle sind volljährig." },
        { prompt: "Etwa jeder siebte Befragte hört Radio, um sich zu informieren.", options: WF, correct: 0, expl: "15 % ≈ 1/7 (14 %)." },
        { prompt: "Die Befragung fand im Jahr 2025 statt.", options: WF, correct: 1, expl: "Januar <b>2026</b>." },
        { prompt: "Das Fernsehen wird etwa doppelt so oft genannt wie das Radio.", options: WF, correct: 0, expl: "32 % : 15 % ≈ 2 : 1." }
      ]
    },

    /* ---------------- GRAMMATIK ---------------- */
    { section: "Teil C – Grammatik und Wortschatz",
      type: "single",
      instr: "Ergänzen Sie die Lücken durch ein Relativpronomen, indem Sie die richtige Form ankreuzen.",
      items: [
        { prompt: "Die Nachrichten, ___ junge Menschen lesen, kommen oft aus sozialen Medien.", options: ["die", "denen", "deren"], correct: 0, expl: "Nachrichten lesen → Akkusativ Plural → <b>die</b>." },
        { prompt: "Der Journalist, ___ Artikel ich gelesen habe, arbeitet für eine große Zeitung.", options: ["der", "dessen", "dem"], correct: 1, expl: "Besitz (Genitiv), maskulin → <b>dessen</b>." },
        { prompt: "Die Plattform, auf ___ viele Videos geteilt werden, ist sehr beliebt.", options: ["die", "der", "dem"], correct: 1, expl: "<i>auf</i> + Dativ (wo?), feminin → <b>der</b>." },
        { prompt: "Das Smartphone, mit ___ ich Nachrichten lese, ist schon alt.", options: ["dem", "das", "den"], correct: 0, expl: "<i>mit</i> + Dativ, neutral → <b>dem</b>." },
        { prompt: "Die Studierenden, ___ die Bibliothek zu laut ist, lernen zu Hause.", options: ["die", "deren", "denen"], correct: 2, expl: "<i>jemandem</i> ist etwas zu laut → Dativ Plural → <b>denen</b>." },
        { prompt: "Es gibt vieles, ___ man im Internet nicht glauben sollte.", options: ["das", "was", "die"], correct: 1, expl: "Nach <i>vieles</i> → <b>was</b>." },
        { prompt: "Die Stadt, in ___ das Studienkolleg liegt, ist ziemlich klein.", options: ["dem", "die", "der"], correct: 2, expl: "<i>in</i> + Dativ (wo?), feminin → <b>der</b>." },
        { prompt: "Der Kurs, für ___ ich mich angemeldet habe, beginnt im März.", options: ["den", "dem", "der"], correct: 0, expl: "<i>für</i> + Akkusativ, maskulin → <b>den</b>." },
        { prompt: "Die Lehrerin, ___ Unterricht allen gefällt, kommt aus Münster.", options: ["die", "deren", "dessen"], correct: 1, expl: "Besitz, feminin → <b>deren</b>." },
        { prompt: "Die Freunde, ___ ich gestern geholfen habe, haben mich zum Essen eingeladen.", options: ["die", "denen", "deren"], correct: 1, expl: "<i>helfen</i> + Dativ, Plural → <b>denen</b>." }
      ]
    },
    { type: "multi",
      instr: "Beide Sätze sollen sinnvoll miteinander verbunden werden. Kreuzen Sie die richtigen Lösungen an.",
      items: [
        { prompt: "Sie hatte keine Zeit. Sie ist trotzdem zur Party gegangen.",
          options: ["Obwohl sie keine Zeit hatte, ist sie zur Party gegangen.", "Sie hatte keine Zeit, trotzdem ist sie zur Party gegangen.", "Sie ist zur Party gegangen, weil sie keine Zeit hatte.", "Obwohl sie hatte keine Zeit, ist sie zur Party gegangen."],
          correct: [0, 1], expl: "<b>a</b> ✓ <i>obwohl</i> + Verb am Ende. <b>b</b> ✓ <i>trotzdem</i> + Verb auf Position 2. <b>c</b> ✗ falscher Sinn. <b>d</b> ✗ nach <i>obwohl</i> Verb ans Ende." },
        { prompt: "Ich weiß nicht. Kommt er heute?",
          options: ["Ich weiß nicht, ob er heute kommt.", "Ich weiß nicht, dass er heute kommt.", "Ich weiß nicht, kommt er heute.", "Ich weiß nicht, ob kommt er heute."],
          correct: [0], expl: "Ja/Nein-Frage → indirekte Frage mit <b>ob</b>, Verb am Ende. Auch wenn mehrere Antworten möglich sind, kann nur eine richtig sein!" },
        { prompt: "Er hat das Visum bekommen. Er kann im Oktober nach Deutschland fliegen.",
          options: ["Er hat das Visum bekommen, sodass er im Oktober nach Deutschland fliegen kann.", "Weil er das Visum bekommen hat, kann er im Oktober nach Deutschland fliegen.", "Er hat das Visum bekommen, deshalb er kann im Oktober nach Deutschland fliegen.", "Er kann im Oktober nach Deutschland fliegen, obwohl er das Visum bekommen hat."],
          correct: [0, 1], expl: "<b>a</b> ✓ Folge mit <i>sodass</i>. <b>b</b> ✓ Grund mit <i>weil</i>. <b>c</b> ✗ nach <i>deshalb</i> kommt sofort das Verb (<i>deshalb kann er</i>). <b>d</b> ✗ falscher Sinn." }
      ]
    },
    { type: "single",
      instr: "Wie lautet der Satz im Passiv? Achten Sie auf die Zeitform.",
      items: [
        { prompt: "Man hat die Prüfungsergebnisse gestern veröffentlicht.",
          options: ["Die Prüfungsergebnisse wurden gestern veröffentlicht worden.", "Die Prüfungsergebnisse sind gestern veröffentlicht worden.", "Die Prüfungsergebnisse haben gestern veröffentlicht worden.", "Die Prüfungsergebnisse sind gestern veröffentlicht geworden."],
          correct: 1, expl: "Perfekt → Passiv Perfekt: <b>sind</b> + Partizip II + <b>worden</b> (nicht <i>geworden</i>)." },
        { prompt: "Der Hausmeister hatte die Tür schon abgeschlossen.",
          options: ["Die Tür wurde vom Hausmeister schon abgeschlossen.", "Die Tür ist vom Hausmeister schon abgeschlossen worden.", "Die Tür war vom Hausmeister schon abgeschlossen worden.", "Die Tür hatte vom Hausmeister schon abgeschlossen worden."],
          correct: 2, expl: "Plusquamperfekt → <b>war</b> + Partizip II + <b>worden</b>." },
        { prompt: "Man wird die neue Brücke im Sommer eröffnen.",
          options: ["Die neue Brücke wird im Sommer eröffnet werden.", "Die neue Brücke wird im Sommer eröffnet worden.", "Die neue Brücke ist im Sommer eröffnet worden.", "Die neue Brücke wird im Sommer eröffnen werden."],
          correct: 0, expl: "Futur → <b>wird</b> + Partizip II + <b>werden</b>." }
      ]
    },
    { type: "select",
      instr: "Setzen Sie die passende Präposition in die Sätze ein.",
      hint: "Im echten Test per Drag-and-Drop. Zwei Wörter bleiben übrig.",
      bank: ["an", "auf", "für", "mit", "über", "von", "unter", "zu", "um", "nach"],
      rows: [
        {s: "Ich habe mich gestern ___ meinem Professor über die Note unterhalten.", a: "mit", e: "sich unterhalten <b>mit</b> jemandem (über etwas)."},
        {s: "Sie hat sich sehr ___ das Geschenk gefreut.", a: "über", e: "sich freuen <b>über</b> – etwas ist schon passiert."},
        {s: "Das Studienkolleg gehört ___ einer Hochschule.", a: "zu", e: "gehören <b>zu</b> + Dativ (Teil von etwas sein)."},
        {s: "Ich bedanke mich ___ Ihre Hilfe.", a: "für", e: "sich bedanken <b>für</b> + Akkusativ."},
        {s: "Er nimmt ___ einem Sprachkurs teil.", a: "an", e: "teilnehmen <b>an</b> + Dativ."},
        {s: "Viele Studierende leiden ___ Prüfungsangst.", a: "unter", e: "leiden <b>unter</b> + Dativ."},
        {s: "In dem Text geht es ___ den Klimawandel.", a: "um", e: "es geht <b>um</b> + Akkusativ."},
        {s: "Kannst du mir ___ deinem Urlaub erzählen?", a: "von", e: "erzählen <b>von</b> + Dativ."}
      ]
    },
    { type: "select",
      instr: "Welche Adjektive passen zusammen? Ordnen Sie das Gegenteil zu.",
      hint: "Nicht alle Wörter passen – und manche Wörter gibt es gar nicht.",
      bank: ["unpünktlich", "pünktlos", "großzügig", "geizlos", "unzuverlässig", "zuverlässlos", "nervös", "freundlich", "locker", "strenglos", "desinteressiert", "neugierlos"],
      rows: [
        {s: "pünktlich ↔ ___", a: "unpünktlich", e: "<b>unpünktlich</b>. „pünktlos“ gibt es nicht."},
        {s: "geizig ↔ ___", a: "großzügig", e: "<b>großzügig</b>. „geizlos“ gibt es nicht."},
        {s: "zuverlässig ↔ ___", a: "unzuverlässig", e: "<b>unzuverlässig</b>. „zuverlässlos“ gibt es nicht."},
        {s: "ruhig ↔ ___", a: "nervös", e: "<b>nervös</b> (auch: unruhig)."},
        {s: "streng ↔ ___", a: "locker", e: "<b>locker</b> (auch: nachsichtig). „strenglos“ gibt es nicht."},
        {s: "neugierig ↔ ___", a: "desinteressiert", e: "<b>desinteressiert</b>. „neugierlos“ gibt es nicht."}
      ]
    },

    /* ---------------- LESEN ---------------- */
    { section: "Teil D – Leseverstehen",
      type: "multi",
      instr: "Lesen Sie den Text und entscheiden Sie, welche der unten genannten Aussagen mit dem Inhalt übereinstimmen, und kreuzen Sie diese an.",
      prompt: TEXT_APPS, reading: true,
      items: [
        { prompt: "Welche Aussagen stimmen mit dem Text überein?",
          options: [
            "Mit Sprach-Apps kann man unabhängig von Ort und Zeit lernen.",
            "Die Punkte in den Apps führen dazu, dass viele Lernende ihre Motivation verlieren.",
            "Laut Sprachwissenschaftlern eignen sich Apps vor allem für Wortschatz und einfache Sätze.",
            "Apps können das Sprechen inzwischen genauso gut trainieren wie ein Sprachkurs.",
            "Viele Apps erklären nicht ausreichend, warum eine grammatische Form richtig ist.",
            "Experten raten, Sprachkurse durch Apps zu ersetzen."
          ],
          correct: [0, 2, 4],
          expl: "<b>a</b> ✓ „überall und zu jeder Zeit“. <b>b</b> ✗ Die Punkte halten die Lernenden <i>motiviert</i>. <b>c</b> ✓ „Vokabeln wiederholen und erste Sätze lernen“. <b>d</b> ✗ nur „begrenzt“. <b>e</b> ✓ „… wie ein Satz richtig ist, aber nicht, warum“. <b>f</b> ✗ Apps als <i>Ergänzung</i>, nicht als Ersatz." }
      ]
    },

    /* ---------------- C-TEST ---------------- */
    { section: "Teil E – C-Test",
      type: "gaps",
      instr: "Vervollständigen Sie die jeweiligen Lücken durch die Eingabe der fehlenden Buchstaben. Achten Sie dabei auf die orthografische und grammatische Korrektheit.",
      hint: "Wie im echten Test: 40 Lücken, die Lücken beginnen schon im ersten Satz.",
      text: "Imm{er} weniger Kinder i{n} Deutschland le{sen} in ih{rer} Freizeit Bücher. Vie{le} verbringen ih{re} freie Zeit lie{ber} mit d{em} Smartphone od{er} vor d{em} Fernseher. Experten se{hen} diese Entwicklung kriti{sch}, denn rege{lmäßiges} Lesen förd{ert} den Wortschatz u{nd} die Konzentration. Kin{der}, die vi{el} lesen, hab{en} später of{t} bessere No{ten} in d{er} Schule. Ei{ne} wichtige Rol{le} spielen da{bei} die Elt{ern}: We{nn} sie sel{bst} lesen od{er} ihren Kind{ern} vorlesen, ste{igt} die Wahrscheinlichkeit, da{ss} auch d{ie} Kinder Freu{de} an Büchern ent{wickeln}. Viele Bibliotheken bie{ten} deshalb Lesestunden f{ür} Kinder a{n}, bei de{nen} gemeinsam Geschich{ten} gelesen wer{den}.",
      expl: "Achte auf: <i>in ih<b>rer</b> Freizeit</i> (Dativ feminin), <i>regelmäßig<b>es</b> Lesen</i> (neutral ohne Artikel, ä + ß!), <i>ihren Kind<b>ern</b></i> (Dativ Plural), <i>da<b>ss</b></i> (Konjunktion mit ss), <i>bie<b>ten</b> … a<b>n</b></i> (trennbares Verb), <i>bei de<b>nen</b></i> (Relativpronomen Dativ Plural)."
    }
  ]
};
})();
