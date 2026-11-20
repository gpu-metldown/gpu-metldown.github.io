/* Übungstest 1 – Daten */
(function(){
const CTEXTS = [
  { title:"Text 1: Zu wenig Schlaf",
    intro:"Viele Menschen in Deutschland schlafen zu wenig.",
    body:"Experten empfehlen für Erwachsene sieben bis neun Stunden Schlaf pro Nacht. Wer dauerhaft weniger schläft, kann sich tagsüber schlechter konzentrieren und macht häufiger Fehler. Außerdem steigt das Risiko für verschiedene Krankheiten, zum Beispiel für Herzprobleme oder Übergewicht. Ein wichtiger Grund für den Schlafmangel ist die Nutzung von Smartphones am Abend. Das helle Licht der Bildschirme signalisiert dem Gehirn, dass es noch Tag ist.",
    outro:"Deshalb raten Ärzte, das Handy mindestens eine Stunde vor dem Schlafengehen wegzulegen." },
  { title:"Text 2: Fahrrad statt Auto",
    intro:"Immer mehr Städte in Europa wollen den Autoverkehr in ihren Zentren reduzieren.",
    body:"Sie bauen neue Radwege und machen das Parken in der Innenstadt teurer. #Kopenhagen gilt dabei als gutes Vorbild, denn dort fährt fast die Hälfte der Einwohner täglich mit dem Fahrrad zur Arbeit oder zur Ausbildung. Die Vorteile liegen auf der Hand: Radfahren ist billig, gesund und schont die Umwelt. Allerdings gibt es auch Kritik. Viele Geschäftsleute befürchten, dass weniger Kunden in die Innenstadt kommen, wenn man dort nicht mehr parken kann.",
    outro:"Studien zeigen jedoch, dass Radfahrer zwar pro Einkauf weniger ausgeben, aber dafür häufiger einkaufen gehen." },
  { title:"Text 3: Richtig lernen",
    intro:"Wer für eine Prüfung lernt, sollte regelmäßig Pausen machen.",
    body:"Das Gehirn kann neue Informationen nämlich nur eine begrenzte Zeit aufnehmen. Nach etwa einer halben Stunde sinkt die Konzentration deutlich. Eine kurze Pause von fünf bis zehn Minuten hilft dabei, das Gelernte zu speichern. In dieser Zeit sollte man sich bewegen oder etwas trinken, aber nicht auf das Handy schauen. Besonders wirksam ist es außerdem, den Stoff nach einigen Tagen noch einmal zu wiederholen.",
    outro:"Wer dagegen alles in der letzten Nacht vor der Prüfung lernt, vergisst das meiste sehr schnell wieder." },
  { title:"Text 4: Bienen in Gefahr",
    intro:"Bienen sind für die Landwirtschaft von großer Bedeutung.",
    body:"Sie bestäuben viele Pflanzen, die wir als Nahrung brauchen, zum Beispiel Äpfel, Kirschen und Erdbeeren. Ohne diese kleinen Insekten würden die Ernten deutlich geringer ausfallen. In den letzten Jahrzehnten ist die Zahl der Bienen jedoch stark zurückgegangen. Als Ursachen nennen Wissenschaftler vor allem den Einsatz von Pestiziden, den Klimawandel und den Verlust von Lebensräumen. Auch jeder Einzelne kann etwas gegen das Bienensterben tun.",
    outro:"Wer im Garten oder auf dem Balkon heimische Blumen pflanzt, bietet den Tieren wertvolle Nahrung." }
];

const GRAM = [
  {q:"Ich weiß nicht, ___ der Kurs morgen stattfindet.", o:["dass","wenn","ob","als"], a:2, e:"Indirekte Ja/Nein-Frage („Findet der Kurs statt?“) → <b>ob</b>."},
  {q:"___ ich ein Kind war, habe ich in einem kleinen Dorf gewohnt.", o:["Als","Wenn","Wann","Ob"], a:0, e:"Einmalige Situation / Zeitraum in der Vergangenheit → <b>als</b>. (<i>wenn</i> = wiederholt oder Gegenwart/Zukunft)"},
  {q:"Das ist der Professor, ___ ich gestern eine E-Mail geschrieben habe.", o:["den","der","dessen","dem"], a:3, e:"<i>jemandem</i> schreiben → Dativ maskulin → <b>dem</b>."},
  {q:"Die Studentin, ___ Laptop kaputt ist, arbeitet heute in der Bibliothek.", o:["die","deren","dessen","der"], a:1, e:"Besitz (Genitiv), Bezugswort feminin (die Studentin) → <b>deren</b>."},
  {q:"Das neue Gebäude ___ im nächsten Jahr gebaut.", o:["ist","hat","wird","wurde"], a:2, e:"Passiv: <i>werden</i> + Partizip II. „im nächsten Jahr“ = Zukunft → <b>wird</b> gebaut."},
  {q:"Trotz ___ schlechten Wetters sind wir spazieren gegangen.", o:["des","dem","das","den"], a:0, e:"<i>trotz</i> + Genitiv → <b>des</b> schlechten Wetters."},
  {q:"Er kommt heute nicht, ___ er viel arbeiten muss.", o:["denn","deshalb","trotzdem","weil"], a:3, e:"Das Verb (<i>muss</i>) steht am Ende → Nebensatz → <b>weil</b>. Mit <i>denn</i> wäre es: „denn er muss viel arbeiten“."},
  {q:"Wenn ich mehr Geld ___, würde ich eine größere Wohnung mieten.", o:["habe","hatte","hätte","gehabt"], a:2, e:"Irrealer Bedingungssatz → Konjunktiv II → <b>hätte</b>."},
  {q:"Ich interessiere mich sehr ___ Medizin.", o:["für","an","über","auf"], a:0, e:"sich interessieren <b>für</b> + Akkusativ."},
  {q:"Wir freuen uns schon ___ die Sommerferien.", o:["über","auf","an","für"], a:1, e:"sich freuen <b>auf</b> = etwas in der Zukunft. (sich freuen <i>über</i> = etwas, das schon passiert ist)"},
  {q:"Welcher Satz ist richtig?", o:["Gestern ich habe meine Freundin besucht.","Ich gestern habe meine Freundin besucht.","Gestern habe besucht ich meine Freundin.","Gestern habe ich meine Freundin besucht."], a:3, e:"Hauptsatz: Verb auf Position 2, Partizip am Ende. Steht „Gestern“ vorne, kommt danach sofort das Verb."},
  {q:"Welcher Satz ist richtig?", o:["Ich glaube, dass er morgen kommt nicht.","Ich glaube, dass er morgen nicht kommt.","Ich glaube, dass nicht er morgen kommt.","Ich glaube, dass er kommt morgen nicht."], a:1, e:"Nebensatz mit <i>dass</i>: konjugiertes Verb ganz am Ende, <i>nicht</i> direkt davor."},
  {q:"Welcher Satz ist richtig?", o:["Weil es regnet, bleiben wir zu Hause.","Weil es regnet, wir bleiben zu Hause.","Weil regnet es, bleiben wir zu Hause.","Weil es regnet, zu Hause wir bleiben."], a:0, e:"Der Nebensatz steht auf Position 1 → der Hauptsatz beginnt direkt mit dem Verb: „…, <b>bleiben</b> wir …“."},
  {q:"Welcher Satz ist richtig?", o:["Sie hat gestern gegeben mir das Buch.","Sie gestern hat mir das Buch gegeben.","Sie hat mir das Buch gestern geben.","Sie hat mir gestern das Buch gegeben."], a:3, e:"Satzklammer: <i>hat</i> auf Position 2, Partizip II <i>gegeben</i> am Ende."},
  {q:"Weil die Preise steigen, kaufen die Menschen weniger.<br>→ ___ der steigenden Preise kaufen die Menschen weniger.", o:["Trotz","Während","Wegen","Statt"], a:2, e:"Nominalisierung eines Grundes (<i>weil</i>) → <b>wegen</b> + Genitiv."},
  {q:"Nachdem er das Studium beendet hatte, zog er nach Berlin.<br>→ Nach ___ seines Studiums zog er nach Berlin.", o:["die Beendigung","der Beendigung","des Beendens","dem Beendigung"], a:1, e:"<i>nach</i> + Dativ; die Beendigung → <b>der Beendigung</b>."},
  {q:"Bei schlechtem Wetter fällt das Konzert aus.<br>→ ___ das Wetter schlecht ist, fällt das Konzert aus.", o:["Obwohl","Damit","Wenn","Bevor"], a:2, e:"<i>bei</i> drückt hier eine Bedingung aus → verbalisiert mit <b>wenn</b>."},
  {q:"Er lernt jeden Tag, ___ er die Prüfung besteht.", o:["um","damit","dass","weil"], a:1, e:"Ziel/Zweck mit Subjekt und konjugiertem Verb → <b>damit</b>. (Mit <i>um</i> bräuchte man: „um die Prüfung zu bestehen“.)"},
  {q:"Die Hausaufgaben müssen bis Freitag ___ werden.", o:["abgeben","abzugeben","abgegeben","abgab"], a:2, e:"Passiv mit Modalverb: Modalverb + Partizip II + <i>werden</i> → <b>abgegeben</b> werden."},
  {q:"Je mehr man übt, ___ besser wird man.", o:["als","wie","dann","desto"], a:3, e:"Feste Verbindung: je … <b>desto</b> (oder: je … umso)."}
];

const RFN = ["richtig","falsch","nicht im Text"];
const LESEN_A = [
  {q:"Die meisten Lebensmittelabfälle entstehen in Supermärkten.", a:1, e:"Absatz 1: Den größten Teil werfen <b>private Haushalte</b> weg, nicht Supermärkte."},
  {q:"Supermärkte dürfen Produkte nach dem Mindesthaltbarkeitsdatum nicht mehr verkaufen.", a:2, e:"Der Text sagt nichts darüber, ob Supermärkte diese Produkte verkaufen dürfen. Es geht nur ums Essen."},
  {q:"Frischen Fisch sollte man nach dem Verbrauchsdatum nicht mehr essen.", a:0, e:"Absatz 2: Produkte mit Verbrauchsdatum (Fleisch, Fisch) sollte man danach „tatsächlich nicht mehr essen“."},
  {q:"Sonderangebote können dazu führen, dass Menschen zu viel kaufen.", a:0, e:"Absatz 3: Sonderangebote „verstärken diesen Effekt“ (mehr kaufen, als man braucht)."},
  {q:"Foodsharing-Gruppen verkaufen Lebensmittel zu niedrigen Preisen.", a:1, e:"Absatz 4: Sie verteilen die Lebensmittel <b>kostenlos</b>. Günstig verkaufen nur Restaurants über Apps."},
  {q:"Die Bundesregierung will die Lebensmittelabfälle bis 2030 komplett verhindern.", a:1, e:"Absatz 4: Ziel ist es, die Abfälle zu <b>halbieren</b>, nicht komplett zu verhindern."}
];
const LESEN_B = [
  {q:"Was bedeutet das Mindesthaltbarkeitsdatum laut Text?", o:["Nach diesem Datum ist das Produkt gefährlich.","Bis zu diesem Datum garantiert der Hersteller Geschmack und Qualität.","Nach diesem Datum muss man das Produkt kochen.","Es gilt nur für Fleisch und Fisch."], a:1, e:"Absatz 2: Das Datum gibt an, bis wann der Hersteller Geschmack und Qualität garantiert."},
  {q:"Welcher Tipp steht <u>nicht</u> im Text?", o:["Den Einkauf planen","Reste kreativ verwerten","Lebensmittel einfrieren","Riechen oder probieren, bevor man etwas wegwirft"], a:2, e:"Einfrieren wird im Text nicht erwähnt. Die anderen drei Tipps stehen in Absatz 5."},
  {q:"Was ist das Hauptthema des Textes?", o:["Gesunde Ernährung in Familien","Ursachen von Lebensmittelverschwendung und was man dagegen tun kann","Steigende Preise in Supermärkten","Neue Apps für Restaurants"], a:1, e:"Der Text nennt Ursachen (Absatz 2–3) und Maßnahmen (Absatz 4–5)."}
];


window.TEST = {
  id: "1",
  ctexts: CTEXTS, gram: GRAM, lesenA: LESEN_A, lesenB: LESEN_B,
  reading: `<h3>Zu gut für die Tonne</h3>
      <p><span class="pn">[1]</span>Jedes Jahr landen in Deutschland etwa elf Millionen Tonnen Lebensmittel im Müll. Das sind rund 130 Kilogramm pro Person. Den größten Teil davon werfen nicht Supermärkte oder Restaurants weg, sondern private Haushalte: Mehr als die Hälfte der Abfälle entsteht in den Küchen ganz normaler Familien.</p>
      <p><span class="pn">[2]</span>Warum werfen wir so viel weg? Ein häufiger Grund ist das Mindesthaltbarkeitsdatum. Viele Verbraucher glauben, dass man ein Produkt nach diesem Datum nicht mehr essen darf. Das ist jedoch ein Irrtum: Das Datum gibt nur an, bis wann der Hersteller garantiert, dass Geschmack und Qualität unverändert bleiben. Joghurt, Nudeln oder Reis sind oft noch Wochen oder sogar Monate danach genießbar. Anders ist es beim Verbrauchsdatum, das man zum Beispiel auf frischem Fleisch oder Fisch findet. Diese Produkte sollte man nach Ablauf des Datums tatsächlich nicht mehr essen.</p>
      <p><span class="pn">[3]</span>Ein weiterer Grund ist schlechte Planung. Wer ohne Einkaufsliste in den Supermarkt geht, kauft oft mehr, als er braucht. Sonderangebote wie „Drei zum Preis von zwei“ verstärken diesen Effekt. Zu Hause verschwinden die Lebensmittel dann im Kühlschrank und werden vergessen, bis sie verdorben sind.</p>
      <p><span class="pn">[4]</span>Inzwischen gibt es zahlreiche Initiativen gegen die Verschwendung. Sogenannte Foodsharing-Gruppen holen überschüssige Lebensmittel bei Bäckereien und Geschäften ab und verteilen sie kostenlos weiter. Außerdem bieten verschiedene Apps Restaurants die Möglichkeit, übrig gebliebenes Essen am Ende des Tages günstig zu verkaufen. Auch die Politik ist aktiv geworden: Die Bundesregierung hat sich das Ziel gesetzt, die Lebensmittelabfälle bis 2030 zu halbieren.</p>
      <p><span class="pn">[5]</span>Experten betonen jedoch, dass jeder Einzelne den größten Beitrag leisten kann. Ihre Tipps sind einfach: den Einkauf planen, Reste kreativ verwerten und vor dem Wegwerfen prüfen, ob ein Lebensmittel wirklich schlecht ist. Oft reicht es schon, daran zu riechen oder es zu probieren.</p>`,
  task: `<strong>Aufgabe:</strong> Einige Politiker fordern: <i>„Supermärkte sollen gesetzlich verpflichtet werden, nicht verkaufte Lebensmittel zu spenden.“</i><br>
      Was ist Ihre Meinung? Schreiben Sie einen Text von <b>ca. 80–100 Wörtern</b>. Nennen Sie mindestens zwei Argumente und ein Gegenargument.`,
  model: `Meiner Meinung nach sollten Supermärkte verpflichtet werden, nicht verkaufte Lebensmittel zu spenden. Erstens werden jedes Jahr große Mengen guter Lebensmittel weggeworfen, obwohl viele Menschen zu wenig Geld für Essen haben. Zweitens schont es die Umwelt, wenn weniger Müll entsteht. Andererseits muss man bedenken, dass das Spenden für die Supermärkte zusätzliche Kosten und Organisation bedeutet. Deshalb könnte der Staat sie dabei unterstützen, zum Beispiel durch Steuervorteile. Insgesamt überwiegen für mich aber die Vorteile, denn es ist nicht richtig, essbare Lebensmittel einfach in den Müll zu werfen.`
};
})();
