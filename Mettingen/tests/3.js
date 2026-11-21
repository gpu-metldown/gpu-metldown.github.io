/* Übungstest 3 – Daten */
(function(){
const CTEXTS = [
  { title:"Text 1: Einkaufen im Internet",
    intro:"Immer mehr Menschen kaufen Kleidung und Elektronik im Internet.",
    body:"Das ist bequem, denn man kann rund um die Uhr bestellen und muss nicht in die Stadt fahren. Außerdem kann man die Preise verschiedener Anbieter schnell miteinander vergleichen. Ein großes Problem sind jedoch die vielen Rücksendungen. Viele Kunden bestellen ein Kleidungsstück gleich in mehreren Größen und schicken die meisten wieder zurück. Für die Händler bedeutet das hohe Kosten, und durch den zusätzlichen Transport wird auch die Umwelt belastet.",
    outro:"Einige Firmen verlangen deshalb inzwischen eine kleine Gebühr für jede Rücksendung." },
  { title:"Text 2: Wohnungssuche",
    intro:"In vielen deutschen Universitätsstädten ist es schwer, eine günstige Wohnung zu finden.",
    body:"Besonders zu Beginn des Wintersemesters suchen tausende Studierende gleichzeitig ein Zimmer. Die Mieten sind in den letzten Jahren stark gestiegen, vor allem in großen Städten wie #München oder #Frankfurt. Viele junge Leute wohnen deshalb in einer Wohngemeinschaft, in der sie sich Küche und Bad mit anderen teilen. Das ist nicht nur billiger, sondern auch eine gute Gelegenheit, neue Freunde kennenzulernen. Eine andere Möglichkeit ist ein Platz im Studentenwohnheim.",
    outro:"Allerdings sind die Wartelisten dort oft lang, sodass man sich möglichst früh bewerben sollte." },
  { title:"Text 3: Musik beim Lernen",
    intro:"Viele Schüler und Studenten hören beim Lernen gern Musik.",
    body:"Ob das wirklich hilft, hängt allerdings von der Art der Musik und von der Aufgabe ab. Bei einfachen Tätigkeiten wie dem Aufräumen kann Musik die Stimmung verbessern und motivieren. Wer dagegen einen schwierigen Text lesen oder Vokabeln lernen muss, wird durch Lieder mit Gesang leicht abgelenkt. Das Gehirn versucht nämlich, die Wörter im Lied und die Wörter im Text gleichzeitig zu verarbeiten. Ruhige Musik ohne Text stört dagegen meistens weniger.",
    outro:"Am besten probiert jeder selbst aus, unter welchen Bedingungen er sich am besten konzentrieren kann." },
  { title:"Text 4: Der Wald",
    intro:"Etwa ein Drittel der Fläche Deutschlands ist mit Wald bedeckt.",
    body:"Der Wald ist nicht nur ein Ort für Erholung und Sport, sondern auch für das Klima sehr wichtig. Bäume nehmen Kohlendioxid aus der Luft auf und speichern es in ihrem Holz. Außerdem bieten sie vielen Tieren und Pflanzen einen Lebensraum. In den letzten Jahren haben jedoch lange Trockenperioden und Schädlinge den Wäldern stark geschadet. Besonders die Fichte, die früher sehr oft gepflanzt wurde, leidet unter der Hitze.",
    outro:"Förster setzen deshalb heute auf Mischwälder mit verschiedenen Baumarten, die widerstandsfähiger sind." }
];

const GRAM = [
  {q:"Hast du daran gedacht, die Fenster ___?", o:["schließen","zu schließen","geschlossen","schließt"], a:1, e:"Nach <i>daran denken</i> folgt ein Infinitiv mit <b>zu</b>: „die Fenster <b>zu schließen</b>“."},
  {q:"Er hat nicht nur Deutsch gelernt, ___ auch Englisch.", o:["aber","und","sowie","sondern"], a:3, e:"Feste Verbindung: nicht nur … <b>sondern</b> auch."},
  {q:"Ich trinke ___ Tee ___ Kaffee – ich mag beides nicht.", o:["entweder … oder","sowohl … als auch","weder … noch","nicht nur … sondern"], a:2, e:"Beides wird verneint → <b>weder … noch</b>."},
  {q:"Ich erinnere mich gern ___ meine Schulzeit.", o:["an","über","auf","von"], a:0, e:"sich erinnern <b>an</b> + Akkusativ."},
  {q:"Hast du schon mit dem neuen ___ gesprochen?", o:["Student","Studenten","Studentes","Studente"], a:1, e:"n-Deklination: maskuline Nomen wie <i>der Student</i> bekommen außer im Nominativ Singular ein <b>-en</b> → mit dem Studenten."},
  {q:"Sie wohnt in einer ___ Wohnung im Zentrum.", o:["kleine","kleiner","kleines","kleinen"], a:3, e:"<i>in</i> + Dativ (wo?), feminin, nach unbestimmtem Artikel <i>einer</i> → Adjektivendung <b>-en</b>."},
  {q:"Das ist alles, ___ ich weiß.", o:["das","was","wo","welches"], a:1, e:"Nach <i>alles, nichts, etwas, vieles</i> steht das Relativpronomen <b>was</b>."},
  {q:"Wenn ich früher aufgestanden ___, hätte ich den Zug nicht verpasst.", o:["wäre","hätte","würde","bin"], a:0, e:"Konjunktiv II der Vergangenheit: <i>aufstehen</i> bildet das Perfekt mit <i>sein</i> → aufgestanden <b>wäre</b>."},
  {q:"Das Museum ist im Jahr 2010 renoviert ___.", o:["werden","wurde","geworden","worden"], a:3, e:"Passiv Perfekt: <i>ist</i> + Partizip II + <b>worden</b> (nicht <i>geworden</i>)."},
  {q:"Ich lasse mein Fahrrad morgen ___.", o:["reparierte","zu reparieren","reparieren","repariert"], a:2, e:"<i>lassen</i> + Infinitiv ohne <i>zu</i> → <b>reparieren</b> lassen."},
  {q:"Er ist einfach gegangen, ___ ein Wort zu sagen.", o:["damit","um","dass","ohne"], a:3, e:"Etwas passiert nicht → <b>ohne</b> … zu + Infinitiv."},
  {q:"Welcher Satz ist richtig?", o:["Er hat versprochen mir, morgen pünktlich zu kommen.","Er hat mir versprochen, zu kommen morgen pünktlich.","Er hat mir versprochen, morgen pünktlich zu kommen.","Er hat mir versprochen, morgen zu pünktlich kommen."], a:2, e:"Im Infinitivsatz steht <i>zu</i> + Infinitiv ganz am Ende: „morgen pünktlich <b>zu kommen</b>“."},
  {q:"Welcher Satz ist richtig?", o:["Ich weiß, dass er gestern konnte nicht kommen.","Ich weiß, dass er konnte gestern nicht kommen.","Ich weiß, dass er gestern nicht kommen konnte.","Ich weiß, dass er gestern nicht konnte kommen."], a:2, e:"Nebensatz mit Modalverb: Infinitiv vor dem Modalverb, das Modalverb ganz am Ende → „nicht <b>kommen konnte</b>“."},
  {q:"Welcher Satz ist richtig?", o:["Weißt du, wann der Zug abfährt?","Weißt du, wann fährt der Zug ab?","Weißt du, wann der Zug ab fährt?","Weißt du, der Zug wann abfährt?"], a:0, e:"Indirekte Frage = Nebensatz: Verb am Ende, trennbare Verben werden wieder zusammengeschrieben (<b>abfährt</b>)."},
  {q:"Welcher Satz ist richtig?", o:["Ich habe ihm es gegeben.","Ich habe es ihm gegeben.","Ich habe gegeben es ihm.","Es ich habe ihm gegeben."], a:1, e:"Zwei Pronomen: Akkusativ vor Dativ → „<b>es ihm</b>“."},
  {q:"Indem man regelmäßig übt, verbessert man seine Aussprache.<br>→ ___ regelmäßiges Üben verbessert man seine Aussprache.", o:["Durch","Bei","Mit","Für"], a:0, e:"<i>indem</i> (Mittel/Methode) → nominal mit <b>durch</b> + Akkusativ."},
  {q:"Während sie studierte, arbeitete sie in einem Café.<br>→ Während ___ arbeitete sie in einem Café.", o:["ihr Studium","ihrem Studium","ihren Studium","ihres Studiums"], a:3, e:"<i>während</i> + Genitiv → <b>ihres Studiums</b>."},
  {q:"Wegen der Verspätung des Zuges kam er zu spät.<br>→ ___ der Zug Verspätung hatte, kam er zu spät.", o:["Obwohl","Damit","Sobald","Da"], a:3, e:"Grund (<i>wegen</i>) → verbal mit <b>da</b> oder <i>weil</i>."},
  {q:"Das Buch, das gestern erschienen ist, ist schon ausverkauft.<br>→ Das gestern ___ Buch ist schon ausverkauft.", o:["erschienene","erscheinende","erschienen","erscheinend"], a:0, e:"Partizipialattribut: abgeschlossene Handlung → Partizip II mit Adjektivendung: das <b>erschienene</b> Buch."},
  {q:"Er tut so, ___ er alles wüsste.", o:["wie","als","ob","wenn"], a:1, e:"Irrealer Vergleich: so tun, <b>als</b> + Konjunktiv II (oder: als ob er alles wüsste)."}
];

const RFN = ["richtig","falsch","nicht im Text"];
const LESEN_A = [
  {q:"KI-Programme können Matheaufgaben lösen.", a:0, e:"Absatz 1: Sie können „Matheaufgaben lösen“."},
  {q:"Alle Lehrkräfte halten KI an Schulen für gefährlich.", a:1, e:"Absatz 2–3: Lehrkräfte haben „gemischte Gefühle“, manche setzen KI sogar bewusst im Unterricht ein."},
  {q:"Lehrer können immer leicht erkennen, ob ein Text von einer KI stammt.", a:1, e:"Absatz 2: Es ist für Lehrer <b>oft schwer</b> zu erkennen."},
  {q:"KI-Programme sind teurer als private Nachhilfelehrer.", a:2, e:"Über Kosten sagt der Text nichts."},
  {q:"Falsche Informationen der KI klingen oft glaubwürdig.", a:0, e:"Absatz 4: Die KI formuliert falsche Informationen „oft so überzeugend, dass man sie leicht für wahr hält“."},
  {q:"An den meisten Schulen darf man KI in Prüfungen benutzen.", a:1, e:"Absatz 5: Bei Prüfungen ist sie <b>fast überall verboten</b>."}
];
const LESEN_B = [
  {q:"Welche Schüler könnten laut Text besonders von KI profitieren?", o:["Schüler, die keine Hausaufgaben machen wollen","Schüler, deren Eltern ihnen bei den Hausaufgaben nicht helfen können","Schüler, die sehr schnell tippen können","Schüler, die keine Schulbücher haben"], a:1, e:"Absatz 3: „Gerade Schüler, deren Eltern ihnen bei den Hausaufgaben nicht helfen können …“"},
  {q:"Was fordern Experten?", o:["Ein Verbot von KI an allen Schulen","Mehr Hausaufgaben für alle Schüler","Dass Schulen den kritischen Umgang mit KI unterrichten","Bessere Computer für Schulen"], a:2, e:"Absatz 4: Schulen sollen den kritischen Umgang mit KI unterrichten."},
  {q:"Was bedeutet „mit gemischten Gefühlen“ in Absatz 2?", o:["Sie sehen Vorteile und Nachteile.","Sie sind sehr glücklich darüber.","Sie verstehen die Technik nicht.","Sie sind wütend auf die Schüler."], a:0, e:"Absatz 2 und 3 zeigen beides: „Einerseits …“ (Nachteile), „Andererseits …“ (Vorteile)."}
];

window.TEST = {
  id: "3",
  ctexts: CTEXTS, gram: GRAM, lesenA: LESEN_A, lesenB: LESEN_B,
  reading: `<h3>Hausaufgaben mit KI?</h3>
      <p><span class="pn">[1]</span>Seit Programme mit künstlicher Intelligenz (KI) für jeden verfügbar sind, hat sich das Lernen an Schulen und Hochschulen verändert. Solche Programme können in wenigen Sekunden Texte schreiben, Matheaufgaben lösen oder schwierige Themen einfach erklären. Viele Schülerinnen und Schüler nutzen sie inzwischen regelmäßig – oft auch für ihre Hausaufgaben.</p>
      <p><span class="pn">[2]</span>Lehrkräfte sehen diese Entwicklung mit gemischten Gefühlen. Einerseits befürchten sie, dass Jugendliche weniger selbst nachdenken, wenn eine Maschine die Arbeit für sie erledigt. Wer einen Aufsatz nur kopiert, lernt dabei nichts. Außerdem ist es für Lehrer oft schwer zu erkennen, ob ein Text von einem Schüler oder von einem Programm stammt.</p>
      <p><span class="pn">[3]</span>Andererseits bietet die Technik auch Chancen. KI kann wie ein geduldiger Nachhilfelehrer funktionieren, der jede Frage beantwortet, ohne müde zu werden. Gerade Schüler, deren Eltern ihnen bei den Hausaufgaben nicht helfen können, könnten davon profitieren. Manche Lehrer setzen KI deshalb bewusst im Unterricht ein, zum Beispiel um Texte zu verbessern oder Übungsaufgaben zu erstellen.</p>
      <p><span class="pn">[4]</span>Ein Problem bleibt allerdings: KI-Programme machen Fehler. Sie formulieren falsche Informationen oft so überzeugend, dass man sie leicht für wahr hält. Experten fordern deshalb, dass Schulen den kritischen Umgang mit KI unterrichten. Schüler sollen lernen, Antworten zu überprüfen und mit anderen Quellen zu vergleichen.</p>
      <p><span class="pn">[5]</span>Viele Schulen haben inzwischen eigene Regeln eingeführt. An einigen ist die Nutzung bei Hausaufgaben erlaubt, wenn man angibt, wofür man das Programm verwendet hat. Bei Klassenarbeiten und Prüfungen ist sie dagegen fast überall verboten.</p>`,
  task: `<strong>Aufgabe:</strong> In einer Diskussion heißt es: <i>„Schülerinnen und Schüler sollen KI für ihre Hausaufgaben benutzen dürfen.“</i><br>
      Was ist Ihre Meinung? Schreiben Sie einen Text von <b>ca. 80–100 Wörtern</b>. Nennen Sie mindestens zwei Argumente und ein Gegenargument.`,
  model: `Ich bin der Ansicht, dass KI bei Hausaufgaben erlaubt sein sollte, aber nur mit klaren Regeln. Zum einen kann ein solches Programm schwierige Themen geduldig erklären und so beim Lernen helfen. Zum anderen müssen junge Menschen lernen, mit dieser Technik umzugehen, weil sie später im Beruf wichtig sein wird. Allerdings besteht die Gefahr, dass Schüler Texte einfach kopieren und selbst nichts mehr lernen. Deshalb sollten sie immer angeben, wofür sie die KI benutzt haben. Zusammenfassend finde ich, dass ein Verbot nicht sinnvoll ist, eine kontrollierte Nutzung dagegen schon.`
};
})();
