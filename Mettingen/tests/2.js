/* Übungstest 2 – Daten */
(function(){
const CTEXTS = [
  { title:"Text 1: Arbeiten im Homeoffice",
    intro:"Seit einigen Jahren arbeiten viele Angestellte regelmäßig von zu Hause aus.",
    body:"Für die Beschäftigten hat das viele Vorteile, denn sie sparen den Weg zur Arbeit und können ihre Zeit flexibler einteilen. Besonders Eltern mit kleinen Kindern schätzen diese Freiheit sehr. Allerdings gibt es auch Nachteile. Manche Menschen fühlen sich zu Hause einsam, weil der direkte Kontakt zu den Kollegen fehlt. Andere haben Probleme, Arbeit und Freizeit klar voneinander zu trennen.",
    outro:"Viele Firmen setzen deshalb inzwischen auf ein Modell, bei dem man einige Tage im Büro und einige Tage zu Hause arbeitet." },
  { title:"Text 2: Wasser aus der Leitung",
    intro:"Wasser ist das wichtigste Lebensmittel des Menschen.",
    body:"Ein Erwachsener sollte jeden Tag ungefähr zwei Liter trinken, bei großer Hitze oder beim Sport sogar mehr. In Deutschland kann man das Wasser aus der Leitung fast überall ohne Bedenken trinken. Es wird streng kontrolliert und ist oft genauso gut wie Wasser aus der Flasche. Trotzdem kaufen viele Menschen lieber Mineralwasser im Supermarkt. Das ist nicht nur teurer, sondern belastet auch die Umwelt, weil die Flaschen produziert und transportiert werden müssen.",
    outro:"Wer Leitungswasser trinkt, spart also Geld und schützt gleichzeitig das Klima." },
  { title:"Text 3: Das Ehrenamt",
    intro:"In Deutschland engagieren sich Millionen Menschen ehrenamtlich.",
    body:"Sie arbeiten ohne Bezahlung in Sportvereinen, bei der Feuerwehr oder in sozialen Einrichtungen. Viele helfen zum Beispiel älteren Menschen beim Einkaufen oder geben Kindern Nachhilfe. Ohne diese freiwilligen Helfer könnten viele Angebote gar nicht existieren. Die Gründe für ein Ehrenamt sind sehr unterschiedlich. Manche wollen anderen Menschen helfen, andere suchen neue Kontakte oder möchten ihre Freizeit sinnvoll gestalten.",
    outro:"Für internationale Studierende kann ein Ehrenamt außerdem eine gute Möglichkeit sein, die Sprache im Alltag zu üben." },
  { title:"Text 4: Alte Handys",
    intro:"In vielen Schubladen liegen alte Handys, die niemand mehr benutzt.",
    body:"Dabei enthalten die Geräte wertvolle Rohstoffe wie Gold, Silber und Kupfer. Wenn man diese Materialien wiederverwertet, muss man weniger neue Rohstoffe aus der Erde holen. Der Abbau dieser Metalle verursacht nämlich große Umweltschäden und findet oft unter schlechten Arbeitsbedingungen statt. Alte Handys sollte man deshalb nicht in den normalen Hausmüll werfen. Viele Geschäfte und Wertstoffhöfe nehmen sie kostenlos zurück.",
    outro:"Vorher sollte man allerdings alle persönlichen Daten auf dem Gerät löschen." }
];

const GRAM = [
  {q:"Ich habe keine Ahnung, ___ er so spät nach Hause gekommen ist.", o:["warum","dass","ob","wenn"], a:0, e:"Indirekte W-Frage („Warum ist er so spät gekommen?“) → das Fragewort bleibt: <b>warum</b>."},
  {q:"___ ich nach Hause kam, war meine Mutter schon schlafen gegangen.", o:["Wenn","Als","Nachdem","Seit"], a:1, e:"Einmaliges Ereignis in der Vergangenheit → <b>als</b>. (<i>Nachdem</i> bräuchte im Nebensatz Plusquamperfekt: „Nachdem ich gekommen war …“)"},
  {q:"Das ist das Buch, ___ ich dir empfohlen habe.", o:["der","dem","das","dessen"], a:2, e:"<i>etwas</i> empfehlen → Akkusativ, das Buch (neutral) → <b>das</b>."},
  {q:"Die Freunde, mit ___ ich in den Urlaub fahre, kommen aus Spanien.", o:["die","denen","deren","den"], a:1, e:"<i>mit</i> + Dativ, Plural → <b>denen</b>."},
  {q:"Der Brief ___ gestern abgeschickt.", o:["wird","wurde","hat","hatte"], a:1, e:"Passiv Präteritum: <i>wurde</i> + Partizip II. „gestern“ = Vergangenheit → <b>wurde</b> abgeschickt."},
  {q:"Während ___ Unterrichts darf man das Handy nicht benutzen.", o:["dem","der","des","den"], a:2, e:"<i>während</i> + Genitiv → <b>des</b> Unterrichts."},
  {q:"Sie lernt Deutsch, ___ sie in Deutschland studieren möchte.", o:["denn","weil","deshalb","obwohl"], a:1, e:"Grund + Verb am Ende → <b>weil</b>. (<i>obwohl</i> hat auch das Verb am Ende, aber die falsche Bedeutung.)"},
  {q:"Wenn ich du ___, würde ich früher mit dem Lernen anfangen.", o:["bin","war","wäre","sei"], a:2, e:"Irreale Situation → Konjunktiv II von <i>sein</i> → <b>wäre</b>."},
  {q:"Ich warte schon seit einer Stunde ___ den Bus.", o:["für","an","auf","nach"], a:2, e:"warten <b>auf</b> + Akkusativ."},
  {q:"Er hat sich ___ den Lärm der Nachbarn beschwert.", o:["über","auf","an","von"], a:0, e:"sich beschweren <b>über</b> + Akkusativ."},
  {q:"Welcher Satz ist richtig?", o:["Morgen ich muss früh aufstehen.","Morgen muss ich früh aufstehen.","Morgen muss früh ich aufstehen.","Ich morgen muss früh aufstehen."], a:1, e:"Modalverb auf Position 2, Infinitiv am Ende. Nach „Morgen“ folgt sofort das Verb."},
  {q:"Welcher Satz ist richtig?", o:["Sie hat gesagt, dass sie heute keine Zeit hat.","Sie hat gesagt, dass sie hat heute keine Zeit.","Sie hat gesagt, dass hat sie heute keine Zeit.","Sie hat gesagt, dass keine Zeit sie heute hat."], a:0, e:"Nebensatz mit <i>dass</i>: Subjekt direkt nach <i>dass</i>, konjugiertes Verb am Ende."},
  {q:"Welcher Satz ist richtig?", o:["Obwohl er war krank, ging er zur Arbeit.","Obwohl er krank war, er ging zur Arbeit.","Obwohl krank er war, ging er zur Arbeit.","Obwohl er krank war, ging er zur Arbeit."], a:3, e:"Nebensatz: Verb am Ende (<i>krank war</i>). Danach beginnt der Hauptsatz mit dem Verb (<i>ging er</i>)."},
  {q:"Welcher Satz ist richtig?", o:["Ich möchte fahren im Sommer nach Italien.","Im Sommer ich möchte nach Italien fahren.","Ich möchte im Sommer nach Italien fahren.","Ich möchte im Sommer fahren nach Italien."], a:2, e:"Satzklammer: <i>möchte</i> auf Position 2, Infinitiv <i>fahren</i> ganz am Ende."},
  {q:"Obwohl es stark regnete, fand das Spiel statt.<br>→ ___ des starken Regens fand das Spiel statt.", o:["Wegen","Trotz","Bei","Statt"], a:1, e:"Gegengrund (<i>obwohl</i>) → nominal mit <b>trotz</b> + Genitiv."},
  {q:"Bevor man das Gerät benutzt, sollte man die Anleitung lesen.<br>→ ___ der Benutzung des Geräts sollte man die Anleitung lesen.", o:["Vor","Nach","Bei","Seit"], a:0, e:"<i>bevor</i> → nominal mit <b>vor</b> + Dativ."},
  {q:"Nach dem Essen machen wir einen Spaziergang.<br>→ ___ wir gegessen haben, machen wir einen Spaziergang.", o:["Bevor","Während","Nachdem","Seitdem"], a:2, e:"<i>nach</i> + Nomen → verbal mit <b>nachdem</b>."},
  {q:"Ich gehe früh ins Bett, ___ morgen fit zu sein.", o:["damit","um","dass","weil"], a:1, e:"Ziel mit Infinitiv + <i>zu</i> (gleiches Subjekt) → <b>um</b> … zu."},
  {q:"Das Problem konnte leider nicht ___ werden.", o:["lösen","gelöst","zu lösen","löste"], a:1, e:"Passiv mit Modalverb: Partizip II + <i>werden</i> → <b>gelöst</b> werden."},
  {q:"Er spricht so schnell, ___ ich ihn kaum verstehe.", o:["als","damit","dass","ob"], a:2, e:"Folge: so … <b>dass</b>."}
];

const RFN = ["richtig","falsch","nicht im Text"];
const LESEN_A = [
  {q:"Früher dachten Experten, dass es für Kinder schwierig ist, mit zwei Sprachen aufzuwachsen.", a:0, e:"Absatz 1: Experten glaubten, das sei „eine Belastung“ für Kinder."},
  {q:"Wenn zweisprachige Kinder Wörter mischen, zeigt das, dass sie verwirrt sind.", a:1, e:"Absatz 2: Das ist „kein Zeichen von Verwirrung, sondern ganz normal“."},
  {q:"Der Wortschatz zweisprachiger Kinder ist insgesamt kleiner als der von einsprachigen Kindern.", a:1, e:"Absatz 2: Der Wortschatz ist insgesamt <b>nicht kleiner</b>, er ist nur auf zwei Sprachen verteilt."},
  {q:"Zweisprachige Menschen verdienen später im Beruf mehr Geld.", a:2, e:"Über Geld oder Gehalt sagt der Text nichts."},
  {q:"Fachleute empfehlen Eltern, mit ihren Kindern immer Deutsch zu sprechen.", a:1, e:"Absatz 4: Eltern sollen die Sprache sprechen, die sie <b>selbst am besten</b> beherrschen."},
  {q:"An manchen Schulen kann man Arabisch lernen.", a:0, e:"Absatz 5: Einige Schulen bieten Unterricht in Arabisch, Türkisch oder Russisch an."}
];
const LESEN_B = [
  {q:"Was empfehlen Fachleute den Eltern?", o:["Nur Deutsch mit dem Kind zu sprechen.","Die Sprache zu sprechen, die sie selbst am besten können.","Beide Sprachen in jedem Satz zu mischen.","Das Kind früh in einen Sprachkurs zu schicken."], a:1, e:"Absatz 4: „… die Sprache zu sprechen, die sie selbst am besten beherrschen“."},
  {q:"Welcher Vorteil der Mehrsprachigkeit wird im Text genannt?", o:["Bessere Noten in Mathematik","Mehr Freunde in der Schule","Früher sprechen lernen als andere Kinder","Später leichter eine dritte Sprache lernen"], a:3, e:"Absatz 3: Es fällt ihnen später häufig leichter, eine dritte Sprache zu lernen."},
  {q:"Warum ist es wichtig, dass die Herkunftssprache anerkannt wird?", o:["Weil Kinder sonst das Interesse an ihrer Familiensprache verlieren können.","Weil Schulen sonst kein Geld bekommen.","Weil die Kinder sonst kein Deutsch lernen.","Weil die Eltern es gesetzlich verlangen können."], a:0, e:"Absatz 5: Kinder, die sich für ihre Familiensprache schämen, verlieren oft das Interesse daran."}
];


window.TEST = {
  id: "2",
  ctexts: CTEXTS, gram: GRAM, lesenA: LESEN_A, lesenB: LESEN_B,
  reading: `<h3>Mit zwei Sprachen aufwachsen</h3>
      <p><span class="pn">[1]</span>Weltweit wächst mehr als die Hälfte aller Kinder mit zwei oder mehr Sprachen auf. Auch in Deutschland sprechen viele Familien zu Hause eine andere Sprache als in der Schule. Lange Zeit glaubten Experten, dass das für Kinder eine Belastung sei. Man befürchtete, dass sie am Ende keine der beiden Sprachen richtig lernen würden.</p>
      <p><span class="pn">[2]</span>Heute weiß man, dass diese Sorge unbegründet ist. Zwar mischen zweisprachige Kinder am Anfang manchmal Wörter aus beiden Sprachen. Das ist aber kein Zeichen von Verwirrung, sondern ganz normal. Meistens können sie die Sprachen spätestens im Schulalter gut voneinander trennen. Auch ihr Wortschatz ist insgesamt nicht kleiner als der von einsprachigen Kindern – er ist nur auf zwei Sprachen verteilt.</p>
      <p><span class="pn">[3]</span>Mehrsprachigkeit kann sogar Vorteile haben. Studien deuten darauf hin, dass sich zweisprachige Menschen oft besser auf eine Aufgabe konzentrieren und schneller zwischen verschiedenen Tätigkeiten wechseln können. Außerdem fällt es ihnen später häufig leichter, eine dritte Sprache zu lernen.</p>
      <p><span class="pn">[4]</span>Damit ein Kind beide Sprachen gut lernt, braucht es allerdings genug Kontakt zu jeder Sprache. Fachleute empfehlen Eltern, mit ihrem Kind die Sprache zu sprechen, die sie selbst am besten beherrschen. Wer seine Muttersprache aufgibt, um mit dem Kind fehlerhaftes Deutsch zu sprechen, hilft ihm damit nicht.</p>
      <p><span class="pn">[5]</span>Wichtig ist auch, dass die Herkunftssprache anerkannt wird. Kinder, die sich für ihre Familiensprache schämen, verlieren oft das Interesse daran. Einige Schulen bieten deshalb inzwischen Unterricht in Sprachen wie Arabisch, Türkisch oder Russisch an.</p>`,
  task: `<strong>Aufgabe:</strong> Einige Eltern fordern: <i>„Alle Schulen sollen Unterricht in den Herkunftssprachen der Kinder anbieten.“</i><br>
      Was ist Ihre Meinung? Schreiben Sie einen Text von <b>ca. 80–100 Wörtern</b>. Nennen Sie mindestens zwei Argumente und ein Gegenargument.`,
  model: `Ich bin der Meinung, dass Schulen Unterricht in den Herkunftssprachen anbieten sollten. Erstens zeigt die Schule damit, dass die Familiensprache der Kinder wertvoll ist. Dadurch schämen sich die Kinder nicht und verlieren ihre Muttersprache nicht. Zweitens ist Mehrsprachigkeit später im Beruf ein großer Vorteil. Andererseits kostet ein solcher Unterricht viel Geld, und es ist schwierig, genug qualifizierte Lehrkräfte zu finden. Deshalb könnte man den Unterricht zunächst nur für die häufigsten Sprachen anbieten. Insgesamt überwiegen für mich aber die Vorteile, denn Sprachen sind ein Schatz für die ganze Gesellschaft.`
};
})();
