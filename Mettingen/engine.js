/* Mettingen Übungstests – Testseite */
(function(){
const T = window.TEST, M = window.MT;
const meta = M.TESTS[T.id] || {title: 'Übungstest ' + T.id};
const $ = id => document.getElementById(id);
const RFN = ["richtig", "falsch", "nicht im Text"];

document.title = meta.title + ' – Aufnahmeprüfung Deutsch';
$('brand').textContent = meta.title;
$('testTitle').textContent = 'Aufnahmeprüfung Deutsch – ' + meta.title;
$('reading').innerHTML = T.reading;
$('task').innerHTML = T.task;
$('modelText').innerHTML = T.model;

/* ---- Stand dieses Tests ---- */
function st(){
  const s = M.store;
  if (!s.tests[T.id]) s.tests[T.id] = {attempt: Date.now(), c: {}, r: {}, essay: '', evaluated: {}};
  return s.tests[T.id];
}
const scores = {C: null, G: null, L: null};

/* ---- C-Test ---- */
const WORD = /^([^A-Za-zÄÖÜäöüß#]*)(#?)([A-Za-zÄÖÜäöüß]+)([^A-Za-zÄÖÜäöüß]*)$/;
const GAPS = [];
function buildCTest(t, ti, maxGaps){
  let count = 0, made = 0;
  const toks = t.body.split(/\s+/).map(tok => {
    const m = tok.match(WORD);
    if (!m) return {txt: tok.replace('#', '')};
    const [, lead, skip, word, trail] = m;
    if (skip || word.length < 2 || made >= maxGaps) return {txt: lead + word + trail};
    count++;
    if (count % 2 !== 0) return {txt: tok};
    const keep = Math.floor(word.length / 2);
    made++;
    const g = {id: 'c' + GAPS.length, n: GAPS.length + 1, k: made, text: t.title, lead, trail,
               shown: word.slice(0, keep), answer: word.slice(keep), full: word};
    GAPS.push(g);
    return {gap: g};
  });
  toks.filter(x => x.gap).forEach(({gap}) => {
    const s = toks.map(x => x.txt != null ? x.txt : x.gap.lead + (x.gap === gap ? '[[' + gap.shown + '___]]' : x.gap.full) + x.gap.trail).join(' ');
    gap.context = (s.match(/[^.!?]+[.!?]*/g) || [s]).map(x => x.trim()).find(x => x.includes('[[')) || '';
  });
  const body = toks.map(x => x.txt != null ? x.txt :
    `${x.gap.lead}<span class="gap">${x.gap.shown}<input id="${x.gap.id}" style="width:${(x.gap.answer.length + 1.6).toFixed(1)}ch" maxlength="${x.gap.full.length + 2}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Lücke ${x.gap.n}"></span>${x.gap.trail}`).join(' ');
  return `<h3>${t.title}</h3><p class="ctext">${t.intro} ${body} ${t.outro}</p>`;
}
$('ctests').innerHTML = T.ctexts.map((t, i) => buildCTest(t, i, 20)).join('');

/* ---- Multiple Choice ---- */
function renderMC(container, items, prefix, startNum, row){
  $(container).innerHTML = items.map((q, i) => {
    const opts = q.o || RFN;
    return `<div class="q" id="${prefix}${i}">
      <div class="qt"><b>${startNum + i}.</b> ${q.q.replace('___', '<span class="blank">______</span>')}</div>
      <div class="opts${row ? ' row' : ''}">${opts.map((o, j) =>
        `<label class="opt"><input type="radio" name="${prefix}${i}" value="${j}"><span>${q.o ? String.fromCharCode(65 + j) + ') ' : ''}${o}</span></label>`).join('')}</div>
      <div class="expl" hidden>${q.e}</div></div>`;
  }).join('');
}
renderMC('gram', T.gram, 'g', 1, false);
renderMC('lesenA', T.lesenA, 'la', 1, true);
renderMC('lesenB', T.lesenB, 'lb', 1 + T.lesenA.length, false);

/* ---- Fehler speichern ---- */
function logMistakes(part, items){
  const s = M.store, a = st().attempt, now = Date.now(), same = m => m.attempt === a && m.test === T.id && m.part === part;
  const prevAt = {}; s.mistakes.filter(same).forEach(m => prevAt[m.n + '|' + m.typed] = m.at);
  s.mistakes = s.mistakes.filter(m => !same(m));
  items.forEach(it => s.mistakes.push(Object.assign({at: prevAt[it.n + '|' + it.typed] || now, attempt: a, test: T.id, part}, it)));
  s.mistakes.sort((x, y) => x.at - y.at);
  if (s.mistakes.length > M.MAX_LOG) s.mistakes = s.mistakes.slice(-M.MAX_LOG);
}

/* ---- Auswerten ---- */
const scoreClass = p => p >= 0.8 ? 'good' : p >= 0.6 ? 'mid' : 'low';
function showScore(el, got, max){
  const s = $(el);
  s.textContent = `${got} / ${max} Punkte (${Math.round(got / max * 100)} %)`;
  s.className = 'score ' + scoreClass(got / max);
}
function evalC(){
  let got = 0; const wrong = [];
  GAPS.forEach(g => {
    const inp = $(g.id), v = inp.value.trim();
    const right = v === g.answer || v === g.full;
    inp.classList.remove('ok', 'bad'); inp.classList.add(right ? 'ok' : 'bad');
    const next = inp.nextElementSibling;
    if (next && next.classList.contains('sol')) next.remove();
    if (right) { got++; return; }
    inp.insertAdjacentHTML('afterend', `<span class="sol">${g.answer}</span>`);
    wrong.push({n: g.n, label: `${g.text}, Lücke ${g.k}`, result: v ? 'falsch' : 'leer',
      correct: g.full, typed: v ? (v.startsWith(g.shown) && v.length > g.answer.length ? v : g.shown + v) : '',
      context: g.context, expl: ''});
  });
  scores.C = got; showScore('scoreC', got, GAPS.length);
  logMistakes('C', wrong); st().evaluated.C = true; update();
}
function evalMC(items, prefix, numOffset, labelPrefix){
  let got = 0; const wrong = [];
  items.forEach((q, i) => {
    const box = $(prefix + i), labels = box.querySelectorAll('.opt'), opts = q.o || RFN;
    labels.forEach(l => l.classList.remove('ok', 'bad'));
    const sel = box.querySelector('input:checked');
    labels[q.a].classList.add('ok');
    box.querySelector('.expl').hidden = false;
    if (sel && +sel.value === q.a) { got++; return; }
    if (sel) labels[+sel.value].classList.add('bad');
    wrong.push({n: numOffset + i + 1, label: `${labelPrefix} ${numOffset + i + 1}`, result: sel ? 'falsch' : 'leer',
      correct: M.stripHtml(opts[q.a]), typed: sel ? M.stripHtml(opts[+sel.value]) : '',
      context: M.stripHtml(q.q), expl: M.stripHtml(q.e)});
  });
  return {got, wrong};
}
function evalG(){
  const r = evalMC(T.gram, 'g', 0, 'Aufgabe');
  scores.G = r.got; showScore('scoreG', r.got, T.gram.length);
  logMistakes('G', r.wrong); st().evaluated.G = true; update();
}
function evalL(){
  const a = evalMC(T.lesenA, 'la', 0, 'Aufgabe'), b = evalMC(T.lesenB, 'lb', T.lesenA.length, 'Aufgabe');
  scores.L = a.got + b.got; showScore('scoreL', scores.L, T.lesenA.length + T.lesenB.length);
  logMistakes('L', a.wrong.concat(b.wrong)); st().evaluated.L = true; update();
}
$('evalC').onclick = evalC; $('evalG').onclick = evalG; $('evalL').onclick = evalL;
$('evalAll').onclick = () => { evalC(); evalG(); evalL(); $('ergebnis').scrollIntoView(); M.toast('Ausgewertet – deine Fehler sind gespeichert.'); };

/* ---- Ergebnis & Verlauf ---- */
const maxC = () => GAPS.length, maxG = () => T.gram.length, maxL = () => T.lesenA.length + T.lesenB.length;
function update(){
  const f = (v, m) => v === null ? `– / ${m}` : `${v} / ${m}`;
  $('rC').textContent = f(scores.C, maxC()); $('rG').textContent = f(scores.G, maxG()); $('rL').textContent = f(scores.L, maxL());
  const done = Object.values(scores).every(v => v !== null);
  const total = (scores.C || 0) + (scores.G || 0) + (scores.L || 0), max = maxC() + maxG() + maxL();
  $('rT').textContent = done ? `${total} / ${max}` : `– / ${max}`;
  const fb = $('feedback');
  if (!done) { $('barFill').style.width = '0'; fb.textContent = 'Werte alle drei Teile aus, um dein Gesamtergebnis zu sehen.'; }
  else {
    const p = total / max;
    $('barFill').style.width = Math.round(p * 100) + '%';
    const weakest = [['C-Test', scores.C / maxC()], ['Grammatik', scores.G / maxG()], ['Leseverstehen', scores.L / maxL()]].sort((a, b) => a[1] - b[1])[0][0];
    fb.innerHTML = `<b>${Math.round(p * 100)} % insgesamt.</b> ` + (
      p >= 0.8 ? 'Sehr gut, du bist auf einem guten Weg! Übe weiter unter Zeitdruck.' :
      p >= 0.6 ? `Gut, aber da ist noch Luft nach oben. Konzentriere dich besonders auf: <b>${weakest}</b>.` :
      `Hier brauchst du noch mehr Übung, vor allem im Bereich <b>${weakest}</b>. Lies die Erklärungen oben genau durch.`);
    recordHistory(total, max);
  }
  save();
}
function recordHistory(total, max){
  const s = M.store, id = st().attempt;
  const prev = s.history.find(h => h.test === T.id && h.id === id);
  const entry = {test: T.id, id, date: prev ? prev.date : Date.now(), C: scores.C, G: scores.G, L: scores.L, total, max};
  s.history = s.history.filter(h => !(h.test === T.id && h.id === id)).concat(entry);
  renderHistory();
}
function renderHistory(){
  const h = M.store.history.filter(x => x.test === T.id), t = $('histTable');
  if (!h.length) { t.innerHTML = '<tr><td class="meta">Noch keine Versuche gespeichert.</td></tr>'; return; }
  t.innerHTML = '<tr><td><b>Datum</b></td><td class="n">C-Test</td><td class="n">Gramm.</td><td class="n">Lesen</td><td class="n">Gesamt</td></tr>' +
    h.slice().reverse().map(x => {
      const d = new Date(x.date);
      return `<tr><td>${d.toLocaleDateString('de-DE')} ${d.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'})}</td><td class="n">${x.C}</td><td class="n">${x.G}</td><td class="n">${x.L}</td><td class="n">${x.total} / ${x.max} (${Math.round(x.total / x.max * 100)} %)</td></tr>`;
    }).join('');
}

/* ---- Antworten speichern ---- */
function save(){
  const s = st();
  s.c = {}; GAPS.forEach(g => { const v = $(g.id).value; if (v) s.c[g.id] = v; });
  s.r = {}; document.querySelectorAll('input[type=radio]:checked').forEach(r => s.r[r.name] = r.value);
  s.essay = $('essay').value;
  M.saveStore();
}
let saveT;
document.addEventListener('input', () => { clearTimeout(saveT); saveT = setTimeout(save, 300); });
document.addEventListener('change', save);
window.addEventListener('pagehide', save);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(); });

/* ---- Neuer Versuch ---- */
$('resetBtn').onclick = () => {
  const scrim = document.createElement('div'); scrim.className = 'scrim';
  scrim.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><p>Neuen Versuch starten? Deine Antworten werden gelöscht. Verlauf und gespeicherte Fehler bleiben erhalten.</p><div class="row"><button type="button" class="ghost" data-a="no">Abbrechen</button><button type="button" data-a="ok">Neu starten</button></div></div>';
  scrim.addEventListener('click', e => {
    const a = e.target.closest('[data-a]');
    if (e.target === scrim || (a && a.dataset.a === 'no')) { scrim.remove(); return; }
    if (!a) return;
    scrim.remove();
    M.store.tests[T.id] = {attempt: Date.now(), c: {}, r: {}, essay: '', evaluated: {}};
    GAPS.forEach(g => { const i = $(g.id); i.value = ''; i.classList.remove('ok', 'bad'); });
    document.querySelectorAll('.sol').forEach(x => x.remove());
    document.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
    document.querySelectorAll('.opt').forEach(l => l.classList.remove('ok', 'bad'));
    document.querySelectorAll('.expl').forEach(x => x.hidden = true);
    ['scoreC', 'scoreG', 'scoreL'].forEach(id => { $(id).textContent = ''; $(id).className = 'score'; });
    scores.C = scores.G = scores.L = null;
    $('essay').value = ''; countWords();
    stopTimer(); remaining = 3600; renderClock(); $('timerBtn').textContent = 'Zeit starten'; $('banner').classList.remove('show');
    update(); window.scrollTo(0, 0); M.toast('Neuer Versuch gestartet.');
  });
  document.body.appendChild(scrim);
};

/* ---- Schreiben ---- */
function countWords(){
  const t = $('essay').value.trim(), n = t ? t.split(/\s+/).length : 0;
  $('wc').textContent = `${n} Wörter` + (n ? (n < 80 ? ' (zu kurz)' : n > 110 ? ' (etwas zu lang)' : ' ✓') : '');
}
$('essay').addEventListener('input', countWords);
$('modelBtn').onclick = () => { $('model').hidden = !$('model').hidden; };

/* ---- Timer ---- */
let remaining = 3600, timerId = null;
function renderClock(){
  $('clock').textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
  $('clock').classList.toggle('low', remaining <= 300);
}
function stopTimer(){ if (timerId) { clearInterval(timerId); timerId = null; } }
$('timerBtn').addEventListener('click', e => {
  if (timerId) { stopTimer(); e.target.textContent = 'Weiter'; return; }
  if (remaining <= 0) remaining = 3600;
  e.target.textContent = 'Pause';
  timerId = setInterval(() => {
    remaining--; renderClock();
    if (remaining <= 0) { stopTimer(); e.target.textContent = 'Neu starten'; $('banner').classList.add('show'); }
  }, 1000);
});

/* ---- Wiederherstellen ---- */
(function restore(){
  const s = st();
  Object.entries(s.c || {}).forEach(([id, v]) => { const i = $(id); if (i) i.value = v; });
  Object.entries(s.r || {}).forEach(([name, v]) => { const r = document.querySelector(`input[name="${name}"][value="${v}"]`); if (r) r.checked = true; });
  if (s.essay) { $('essay').value = s.essay; countWords(); }
  const ev = Object.assign({}, s.evaluated);
  if (ev.C) evalC(); if (ev.G) evalG(); if (ev.L) evalL();
  if (Object.keys(s.c || {}).length || Object.keys(s.r || {}).length) M.toast('Weiter, wo du aufgehört hast.');
})();
renderHistory();
update();
})();
