/* Übungstest 4 – Daten */
(function(){
const CTEXTS = [
  { title:"Text 1: Mülltrennung",
    intro:"In Deutschland wird der Müll in verschiedene Tonnen getrennt.",
    body:"Papier kommt in die blaue Tonne, Verpackungen aus Plastik oder Metall in den gelben Sack oder die gelbe Tonne. Für Essensreste und Gartenabfälle gibt es die Biotonne. Glasflaschen bringt man zu speziellen Containern, wo sie nach Farben sortiert werden. Für viele Menschen, die neu in Deutschland sind, wirkt dieses System am Anfang kompliziert. Doch es hat einen wichtigen Zweck: Wertvolle Materialien können wiederverwertet werden, und es entsteht weniger Restmüll.",
    outro:"Wer unsicher ist, findet auf der Internetseite seiner Stadt meistens eine genaue Übersicht." },
  { title:"Text 2: Der Buchdruck",
    intro:"Um das Jahr 1450 entwickelte Johannes Gutenberg in Mainz eine neue Technik.",
    body:"Mit beweglichen Buchstaben aus Metall konnte er Bücher viel schneller herstellen als vorher. Bis dahin mussten Texte mühsam mit der Hand abgeschrieben werden, was oft mehrere Monate dauerte. Deshalb waren Bücher sehr teuer und nur für wenige Menschen zugänglich. Durch den Buchdruck sanken die Preise deutlich, und immer mehr Menschen lernten lesen. Wissen und neue Ideen konnten sich nun schnell in ganz Europa verbreiten.",
    outro:"Viele Historiker halten die Erfindung deshalb für eine der wichtigsten der Menschheitsgeschichte." },
  { title:"Text 3: Bewegung im Alltag",
    intro:"Regelmäßige Bewegung ist eines der besten Mittel, um gesund zu bleiben.",
    body:"Dafür muss man nicht unbedingt ins Fitnessstudio gehen oder teure Geräte kaufen. Schon ein täglicher Spaziergang von dreißig Minuten kann das Risiko für viele Krankheiten senken. Auch kleine Veränderungen im Alltag helfen, zum Beispiel wenn man die Treppe statt des Aufzugs nimmt. Wichtig ist vor allem, dass man sich regelmäßig bewegt und nicht nur einmal im Monat sehr intensiv trainiert. Außerdem macht Sport mehr Spaß, wenn man ihn gemeinsam mit Freunden betreibt.",
    outro:"So fällt es leichter, auch an Tagen mit wenig Motivation aktiv zu bleiben." },
  { title:"Text 4: Haustiere",
    intro:"Viele Haushalte in Deutschland besitzen ein Haustier.",
    body:"Am beliebtesten sind Katzen, gefolgt von Hunden und kleinen Tieren wie Kaninchen oder Meerschweinchen. Tiere können das Leben bereichern, denn sie bringen Freude und helfen gegen Einsamkeit. Besonders ältere Menschen, die allein leben, profitieren von der Gesellschaft eines Tieres. Ein Haustier bedeutet aber auch viel Verantwortung. Man muss es jeden Tag füttern, sich um seine Gesundheit kümmern und auch im Urlaub eine Betreuung organisieren.",
    outro:"Bevor man sich ein Tier anschafft, sollte man sich daher gut überlegen, ob man genug Zeit und Geld dafür hat." }
];

const GRAM = [
  {q:"Der Minister sagte, er ___ mit dem Ergebnis sehr zufrieden.", o:["ist","sein","sei","seid"], a:2, e:"Indirekte Rede (z.&nbsp;B. in Zeitungen) → Konjunktiv I: er <b>sei</b>."},
  {q:"Das ___ Kind sucht seine Mutter. (weinen)", o:["geweinte","weinend","geweint","weinende"], a:3, e:"Partizip I (Infinitiv + <i>d</i>) für eine Handlung, die gerade passiert, mit Adjektivendung: das <b>weinende</b> Kind."},
  {q:"Ich habe gestern leider nicht kommen ___.", o:["gekonnt","konnte","können","zu können"], a:2, e:"Modalverb + Infinitiv im Perfekt → Ersatzinfinitiv: nicht kommen <b>können</b> (nicht <i>gekonnt</i>)."},
  {q:"Vor dem Essen wasche ich ___ die Hände.", o:["mich","mir","mein","meine"], a:1, e:"Es gibt schon ein Akkusativobjekt (<i>die Hände</i>) → Reflexivpronomen im Dativ: <b>mir</b>."},
  {q:"Bitte bezahlen Sie die Rechnung innerhalb ___ Woche.", o:["eine","einem","einen","einer"], a:3, e:"<i>innerhalb</i> + Genitiv, feminin → <b>einer</b> Woche."},
  {q:"Er geht nicht ans Telefon. Er wird wohl krank ___.", o:["ist","sein","gewesen","war"], a:1, e:"Vermutung über die Gegenwart: <i>werden</i> + <i>wohl</i> + Infinitiv → wird wohl krank <b>sein</b>."},
  {q:"Warte bitte hier, ___ ich zurückkomme.", o:["bis","seit","während","bevor"], a:0, e:"Bis zu einem Zeitpunkt in der Zukunft → <b>bis</b>."},
  {q:"___ ich die Ergebnisse habe, rufe ich dich an.", o:["Solange","Seit","Sobald","Bis"], a:2, e:"Direkt nach einem Ereignis → <b>sobald</b>."},
  {q:"Die Wohnung ist zwar klein, ___ sie ist sehr hell.", o:["sondern","aber","denn","oder"], a:1, e:"Feste Verbindung: <b>zwar … aber</b>."},
  {q:"___ denkst du gerade?", o:["Worüber","Wofür","Wovon","Woran"], a:3, e:"denken <b>an</b> → Fragewort <b>woran</b> (wo + r + an)."},
  {q:"Ich freue mich sehr ___, dich bald wiederzusehen.", o:["darüber","daran","darauf","dafür"], a:2, e:"sich freuen <b>auf</b> (Zukunft) → Verweis auf den Nebensatz mit <b>darauf</b>."},
  {q:"Nimmst du auch ___ dem Deutschkurs teil?", o:["an","bei","in","zu"], a:0, e:"teilnehmen <b>an</b> + Dativ."},
  {q:"Ob wir grillen, hängt ___ Wetter ab.", o:["am","vom","beim","zum"], a:1, e:"abhängen <b>von</b> + Dativ → von dem = <b>vom</b>."},
  {q:"Welcher Satz ist richtig?", o:["Ich fahre nach Berlin morgen mit dem Zug.","Morgen ich fahre mit dem Zug nach Berlin.","Ich fahre mit dem Zug nach Berlin morgen.","Ich fahre morgen mit dem Zug nach Berlin."], a:3, e:"Reihenfolge im Mittelfeld: <b>te</b>mporal – <b>ka</b>usal – <b>mo</b>dal – <b>lo</b>kal (TeKaMoLo): morgen – mit dem Zug – nach Berlin."},
  {q:"Welcher Satz ist richtig?", o:["Ich habe vergessen, dich anzurufen.","Ich habe vergessen, dich zu anrufen.","Ich habe vergessen, anzurufen dich.","Ich habe vergessen, dich an zu rufen."], a:0, e:"Trennbare Verben: <i>zu</i> steht zwischen Präfix und Verb, alles in einem Wort → <b>anzurufen</b>."},
  {q:"Welcher Satz ist richtig?", o:["Es regnete, deshalb wir blieben zu Hause.","Es regnete, deshalb blieben wir zu Hause.","Es regnete, deshalb wir zu Hause blieben.","Es regnete, wir deshalb blieben zu Hause."], a:1, e:"<i>deshalb</i> steht auf Position 1 → danach sofort das Verb: „deshalb <b>blieben</b> wir“."},
  {q:"Seit er umgezogen ist, fährt er mit dem Rad zur Arbeit.<br>→ Seit ___ fährt er mit dem Rad zur Arbeit.", o:["seines Umzugs","seinen Umzug","seinem Umzug","sein Umzug"], a:2, e:"<i>seit</i> + Dativ → <b>seinem Umzug</b>."},
  {q:"Trotz seiner guten Noten bekam er keinen Studienplatz.<br>→ ___ er gute Noten hatte, bekam er keinen Studienplatz.", o:["Weil","Obwohl","Wenn","Damit"], a:1, e:"<i>trotz</i> (Gegengrund) → verbal mit <b>obwohl</b>."},
  {q:"Damit die Umwelt geschützt wird, fahren wir mit dem Rad.<br>→ Zum ___ der Umwelt fahren wir mit dem Rad.", o:["Schutzes","Schutz","Geschützten","Schützung"], a:1, e:"Zweck (<i>damit</i>) → nominal mit <b>zum</b> + Nomen: zum <b>Schutz</b> der Umwelt."},
  {q:"Die Stadt, ___ ich geboren bin, liegt am Meer.", o:["wo","wohin","woher","wann"], a:0, e:"Relativsatz für einen Ort (= in der) → <b>wo</b>."}
];

const RFN = ["richtig","falsch","nicht im Text"];
const LESEN_A = [
  {q:"Bei der Vier-Tage-Woche verdienen die Beschäftigten weniger Geld.", a:1, e:"Absatz 1: Sie arbeiten weniger „bei <b>gleichem Lohn</b>“."},
  {q:"Einige deutsche Firmen haben die Vier-Tage-Woche schon ausprobiert.", a:0, e:"Absatz 1: Einige Unternehmen haben das Modell in einem Pilotprojekt ausprobiert."},
  {q:"Laut den Befürwortern werden Beschäftigte mit einer Vier-Tage-Woche seltener krank.", a:0, e:"Absatz 2: Wer drei Tage frei hat, „wird seltener krank“."},
  {q:"Die meisten Beschäftigten in Deutschland wünschen sich eine Vier-Tage-Woche.", a:2, e:"Was die meisten Beschäftigten wünschen, steht nicht im Text."},
  {q:"Bei allen Modellen wird die Wochenarbeitszeit kürzer.", a:1, e:"Absatz 4: Bei manchen Modellen arbeitet man 4 × 10 Stunden – die Wochenarbeitszeit bleibt <b>gleich</b>."},
  {q:"Gewerkschaften sehen sehr lange Arbeitstage kritisch.", a:0, e:"Absatz 4: Gewerkschaften kritisieren diese Variante, weil lange Arbeitstage sehr anstrengend sein können."}
];
const LESEN_B = [
  {q:"Welches Argument nennen die Kritiker?", o:["Die Mitarbeiter werden weniger motiviert.","Das Modell passt nicht zu jedem Beruf.","Die Mitarbeiter wollen gar nicht weniger arbeiten.","Familien haben dann zu viel Freizeit."], a:1, e:"Absatz 3: Das Modell „eignet sich nicht für jeden Beruf“, z.&nbsp;B. Krankenhäuser oder Supermärkte."},
  {q:"Was bedeutet „drei Tage am Stück“ in Absatz 2?", o:["drei halbe Tage","drei Tage im Monat","drei Tage hintereinander","drei Tage mit Überstunden"], a:2, e:"„Am Stück“ = ohne Unterbrechung, also <b>hintereinander</b>."},
  {q:"Was erwarten viele Experten für die Zukunft?", o:["Die Vier-Tage-Woche wird verboten.","Bald arbeiten alle nur noch vier Tage.","Die Arbeitszeit wird wieder länger.","Es wird verschiedene Modelle je nach Branche geben."], a:3, e:"Absatz 5: keine einheitliche Lösung, sondern „verschiedene Modelle je nach Branche“."}
];

window.TEST = {
  id: "4",
  ctexts: CTEXTS, gram: GRAM, lesenA: LESEN_A, lesenB: LESEN_B,
  reading: `<h3>Vier Tage arbeiten, drei Tage frei?</h3>
      <p><span class="pn">[1]</span>In vielen Ländern wird zurzeit über die Vier-Tage-Woche diskutiert. Die Idee: Beschäftigte arbeiten nur noch an vier statt an fünf Tagen pro Woche – und das bei gleichem Lohn. In Deutschland haben einige Unternehmen das Modell bereits in einem Pilotprojekt ausprobiert.</p>
      <p><span class="pn">[2]</span>Die Befürworter nennen vor allem gesundheitliche Gründe. Wer drei Tage am Stück frei hat, kann sich besser erholen, hat mehr Zeit für Familie und Hobbys und wird seltener krank. Viele Firmen, die das Modell getestet haben, berichten außerdem, dass ihre Mitarbeiter motivierter und konzentrierter arbeiten. Auch bei der Suche nach neuen Fachkräften kann eine kürzere Arbeitswoche ein Vorteil sein.</p>
      <p><span class="pn">[3]</span>Kritiker sehen das anders. Sie weisen darauf hin, dass sich das Modell nicht für jeden Beruf eignet. In Krankenhäusern, Pflegeheimen oder Supermärkten muss an allen Tagen jemand da sein. Wenn dort weniger gearbeitet wird, müssten zusätzliche Mitarbeiter eingestellt werden, die es oft gar nicht gibt. Außerdem befürchten manche Arbeitgeber, dass die Kosten steigen.</p>
      <p><span class="pn">[4]</span>Wichtig ist auch, wie die vier Tage gestaltet werden. Bei einigen Modellen wird die Arbeitszeit tatsächlich verkürzt. Bei anderen arbeitet man an vier Tagen jeweils zehn Stunden und kommt so auf die gleiche Wochenarbeitszeit wie vorher. Gewerkschaften kritisieren diese Variante, weil lange Arbeitstage sehr anstrengend sein können.</p>
      <p><span class="pn">[5]</span>Ob sich die Vier-Tage-Woche durchsetzt, ist noch offen. Viele Experten glauben, dass es in Zukunft keine einheitliche Lösung für alle geben wird, sondern verschiedene Modelle je nach Branche.</p>`,
  task: `<strong>Aufgabe:</strong> In einer Diskussion heißt es: <i>„Die Vier-Tage-Woche sollte für alle Beschäftigten eingeführt werden.“</i><br>
      Was ist Ihre Meinung? Schreiben Sie einen Text von <b>ca. 80–100 Wörtern</b>. Nennen Sie mindestens zwei Argumente und ein Gegenargument.`,
  model: `Meiner Meinung nach wäre die Vier-Tage-Woche für viele Beschäftigte eine gute Lösung. Zum einen hätten die Menschen mehr Zeit, sich zu erholen, und würden dadurch seltener krank. Zum anderen könnten sie mehr Zeit mit ihrer Familie verbringen. Allerdings eignet sich das Modell nicht für alle Berufe, denn in Krankenhäusern oder in der Pflege muss jeden Tag jemand arbeiten. Deshalb sollte man es nicht für alle gesetzlich vorschreiben. Insgesamt bin ich der Ansicht, dass jede Branche ein eigenes Modell finden sollte, das zu ihr passt.`
};
})();
