/* Mettingen – Klausur-Seite (Moodle-ähnliche Aufgabentypen) */
(function(){
const T = window.TEST, M = window.MT;
const meta = M.TESTS[T.id] || {title: 'Klausur'};
const $ = id => document.getElementById(id);
const esc = M.esc;
const LETTERS = /[A-Za-zÄÖÜäöüß]*$/;

document.title = meta.title + ' – Aufnahmeprüfung Deutsch';
$('brand').textContent = meta.title;
$('testTitle').textContent = meta.title;
$('intro').innerHTML = T.intro || '';

function st(){
  const s = M.store;
  if (!s.tests[T.id]) s.tests[T.id] = {attempt: Date.now(), a: {}, evaluated: false};
  const x = s.tests[T.id]; if (!x.a) x.a = {};
  return x;
}

/* ---- Aufbau ---- */
// Jede "Einheit" ist ein Punkt: {key, task, label, get(), set(v), check(v), mark(ok), correctText, context, expl}
const units = [];
const taskUnits = [];
const sentenceOf = s => ((s.match(/[^.!?]+[.!?]*/g) || [s]).map(x => x.trim()).find(x => x.includes('[[')) || s).trim();

function renderTask(t, ti){
  const n = ti + 1, own = [];
  let h = `<section class="card" id="aufgabe-${n}"><div class="thead"><span class="task-n">Aufgabe ${n}</span><span class="tscore" id="ts${ti}"></span></div>
    <h2 class="instr">${t.instr}</h2>`;
  if (t.type === 'multi' || t.type === 'single') {
    const multi = t.type === 'multi', key = 't' + ti;
    h += `<div class="prompt">${t.prompt}</div>`;
    if (t.note) h += `<div class="small-note">${esc(t.note)}</div>`;
    h += `<div class="hint">${t.hint || 'Wählen Sie eine Antwort:'}</div><div class="opts" id="${key}">` +
      t.options.map((o, j) => `<label class="opt"><input type="${multi ? 'checkbox' : 'radio'}" name="${key}" value="${j}"><span>${String.fromCharCode(97 + j)}. ${o}</span></label>`).join('') + '</div>';
    const correct = multi ? t.correct.slice().sort().join(',') : String(t.correct);
    own.push({
      key, task: ti, label: `Aufgabe ${n}`,
      get: () => [...document.querySelectorAll(`input[name="${key}"]:checked`)].map(i => i.value).sort().join(','),
      set: v => String(v || '').split(',').forEach(j => { const i = document.querySelector(`input[name="${key}"][value="${j}"]`); if (i) i.checked = true; }),
      check: v => v === correct,
      mark: () => {
        const sel = new Set(own[0].get().split(',').filter(Boolean));
        const corr = new Set(correct.split(','));
        document.querySelectorAll(`#${key} .opt`).forEach((l, j) => {
          l.classList.remove('ok', 'bad');
          if (corr.has(String(j))) l.classList.add('ok'); else if (sel.has(String(j))) l.classList.add('bad');
        });
      },
      typedText: v => String(v || '').split(',').filter(Boolean).map(j => String.fromCharCode(97 + +j) + '. ' + M.stripHtml(t.options[+j])).join(' | '),
      correctText: correct.split(',').map(j => String.fromCharCode(97 + +j) + '. ' + M.stripHtml(t.options[+j])).join(' | '),
      context: M.stripHtml(t.prompt).slice(0, 300), expl: M.stripHtml(t.expl)
    });
  }
  else if (t.type === 'select') {
    if (t.hint) h += `<div class="hint">${t.hint}</div>`;
    h += `<div class="bankline">${t.bank.map(b => `<span>${esc(b)}</span>`).join('')}</div>`;
    t.rows.forEach((r, ri) => {
      const key = `t${ti}r${ri}`, accept = [r.a].concat(r.alt || []);
      const sel = `<select class="pick" id="${key}" aria-label="Lücke ${ri + 1}"><option value="">Auswählen …</option>${t.bank.map(b => `<option>${esc(b)}</option>`).join('')}</select>`;
      h += `<div class="srow"><span class="num">${ri + 1}.</span>${r.s.replace('___', sel)}<span class="e" id="${key}e" hidden>${r.e || ''}</span></div>`;
      own.push({
        key, task: ti, label: `Aufgabe ${n}, Satz ${ri + 1}`,
        get: () => $(key).value, set: v => { $(key).value = v || ''; },
        check: v => accept.includes(v),
        mark: ok => { $(key).classList.remove('ok', 'bad'); $(key).classList.add(ok ? 'ok' : 'bad'); $(key + 'e').hidden = false; },
        typedText: v => v, correctText: r.a,
        context: r.s.replace('___', '[[___]]'), expl: M.stripHtml(r.e)
      });
    });
  }
  else if (t.type === 'gaps') {
    const parts = t.text.split(/\{([^}]*)\}/); // text, ans, text, ans, ...
    const gaps = [];
    for (let i = 1; i < parts.length; i += 2) gaps.push({ans: parts[i], stem: (parts[i - 1].match(LETTERS) || [''])[0], idx: i});
    let body = '';
    parts.forEach((p, i) => {
      if (i % 2 === 0) { body += esc(p); return; }
      const g = gaps[(i - 1) / 2], key = `t${ti}g${(i - 1) / 2}`;
      body += `<span class="gap"><input id="${key}" style="width:${(g.ans.length + 1.6).toFixed(1)}ch" maxlength="${g.stem.length + g.ans.length + 2}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Lücke ${(i - 1) / 2 + 1}"></span>`;
    });
    h += `<p class="ctext">${body}</p>`;
    gaps.forEach((g, k) => {
      const key = `t${ti}g${k}`;
      const ctx = parts.map((p, i) => {
        if (i % 2 === 0) return (i === g.idx - 1) ? p.slice(0, p.length - g.stem.length) : p;
        return i === g.idx ? `[[${g.stem}___]]` : p;
      }).join('');
      own.push({
        key, task: ti, label: `Aufgabe ${n} (C-Test), Lücke ${k + 1}`,
        get: () => $(key).value.trim(), set: v => { $(key).value = v || ''; },
        check: v => v === g.ans,   // streng wie im echten Test: nur die fehlenden Buchstaben
        mark: ok => {
          const inp = $(key); inp.classList.remove('ok', 'bad'); inp.classList.add(ok ? 'ok' : 'bad');
          const nx = inp.nextElementSibling; if (nx && nx.classList.contains('sol')) nx.remove();
          if (!ok) inp.insertAdjacentHTML('afterend', `<span class="sol">${esc(g.ans)}</span>`);
        },
        typedText: v => v ? g.stem + v : '',
        correctText: g.stem + g.ans, context: sentenceOf(ctx), expl: ''
      });
    });
  }
  h += `<div class="expl" id="x${ti}" hidden>${t.expl || ''}</div></section>`;
  taskUnits[ti] = own;
  units.push(...own);
  return h;
}
$('tasks').innerHTML = T.tasks.map(renderTask).join('');
T.tasks.forEach((t, ti) => { if (!t.expl) $('x' + ti).remove(); });

/* ---- Speichern ---- */
function save(){ const s = st(); s.a = {}; units.forEach(u => { const v = u.get(); if (v) s.a[u.key] = v; }); M.saveStore(); }
let saveT;
document.addEventListener('input', () => { clearTimeout(saveT); saveT = setTimeout(save, 300); });
document.addEventListener('change', save);
window.addEventListener('pagehide', save);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(); });

/* ---- Auswerten ---- */
const scoreClass = p => p >= 0.8 ? 'good' : p >= 0.6 ? 'mid' : 'low';
function evaluate(silent){
  save();
  let got = 0; const wrong = [];
  units.forEach(u => {
    const v = u.get(), ok = !!u.check(v);
    u.mark(ok);
    if (ok) { got++; return; }
    wrong.push({n: units.indexOf(u) + 1, label: u.label, result: v ? 'falsch' : 'leer',
      typed: u.typedText(v), correct: u.correctText, context: u.context, expl: u.expl});
  });
  taskUnits.forEach((own, ti) => {
    const g = own.filter(u => u.check(u.get())).length, el = $('ts' + ti);
    el.textContent = `${g} / ${own.length}`; el.className = 'tscore score ' + scoreClass(g / own.length);
    const x = $('x' + ti); if (x) x.hidden = false;
  });
  // Fehler speichern (ersetzt die Fehler dieses Versuchs)
  const s = M.store, a = st().attempt, now = Date.now(), same = m => m.attempt === a && m.test === T.id;
  const prevAt = {}; s.mistakes.filter(same).forEach(m => prevAt[m.n + '|' + m.typed] = m.at);
  s.mistakes = s.mistakes.filter(m => !same(m));
  wrong.forEach(w => s.mistakes.push(Object.assign({at: prevAt[w.n + '|' + w.typed] || now, attempt: a, test: T.id, part: 'X'}, w)));
  s.mistakes.sort((x, y) => x.at - y.at);
  if (s.mistakes.length > M.MAX_LOG) s.mistakes = s.mistakes.slice(-M.MAX_LOG);
  // Verlauf
  const max = units.length, prev = s.history.find(h => h.test === T.id && h.id === a);
  s.history = s.history.filter(h => !(h.test === T.id && h.id === a)).concat({test: T.id, id: a, date: prev ? prev.date : now, C: null, G: null, L: null, total: got, max});
  st().evaluated = true;
  M.saveStore();
  const p = got / max;
  $('scoreAll').textContent = `${got} / ${max} Punkte (${Math.round(p * 100)} %)`; $('scoreAll').className = 'score ' + scoreClass(p);
  $('barFill').style.width = Math.round(p * 100) + '%';
  const weakest = taskUnits.map((own, ti) => [ti + 1, own.filter(u => u.check(u.get())).length / own.length]).sort((x, y) => x[1] - y[1])[0];
  $('feedback').innerHTML = `<b>${Math.round(p * 100)} % insgesamt.</b> ` + (p >= 0.8 ? 'Sehr gut!' : p >= 0.6 ? 'Gut – aber da geht noch mehr.' : 'Hier brauchst du noch Übung.') +
    (weakest[1] < 1 ? ` Am schwächsten: <a href="#aufgabe-${weakest[0]}">Aufgabe ${weakest[0]}</a>. Lies dort die Erklärungen.` : '') +
    ` ${wrong.length ? wrong.length + ' Fehler wurden gespeichert.' : ''}`;
  renderHistory();
  if (!silent) { $('ergebnis').scrollIntoView(); M.toast('Ausgewertet – deine Fehler sind gespeichert.'); }
}
$('evalAll').onclick = () => evaluate(false);

function renderHistory(){
  const h = M.store.history.filter(x => x.test === T.id), t = $('histTable');
  if (!h.length) { t.innerHTML = '<tr><td class="meta">Noch keine Versuche gespeichert.</td></tr>'; return; }
  t.innerHTML = '<tr><td><b>Datum</b></td><td class="n">Punkte</td><td class="n">Prozent</td></tr>' + h.slice().reverse().map(x => {
    const d = new Date(x.date);
    return `<tr><td>${d.toLocaleDateString('de-DE')} ${d.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'})}</td><td class="n">${x.total} / ${x.max}</td><td class="n">${Math.round(x.total / x.max * 100)} %</td></tr>`;
  }).join('');
}

/* ---- Neuer Versuch ---- */
$('resetBtn').onclick = () => {
  const scrim = document.createElement('div'); scrim.className = 'scrim';
  scrim.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><p>Neuen Versuch starten? Deine Antworten werden gelöscht. Verlauf und gespeicherte Fehler bleiben erhalten.</p><div class="row"><button type="button" class="ghost" data-a="no">Abbrechen</button><button type="button" data-a="ok">Neu starten</button></div></div>';
  scrim.addEventListener('click', e => {
    const a = e.target.closest('[data-a]');
    if (e.target === scrim || (a && a.dataset.a === 'no')) { scrim.remove(); return; }
    if (!a) return;
    scrim.remove();
    M.store.tests[T.id] = {attempt: Date.now(), a: {}, evaluated: false};
    document.querySelectorAll('#tasks input').forEach(i => { if (i.type === 'text' || !i.type || i.type === 'search') i.value = ''; else i.checked = false; i.classList.remove('ok', 'bad'); });
    document.querySelectorAll('#tasks .gap input').forEach(i => { i.value = ''; i.classList.remove('ok', 'bad'); });
    document.querySelectorAll('#tasks select').forEach(s => { s.value = ''; s.classList.remove('ok', 'bad'); });
    document.querySelectorAll('.sol').forEach(x => x.remove());
    document.querySelectorAll('.opt').forEach(l => l.classList.remove('ok', 'bad'));
    document.querySelectorAll('.expl, .srow .e').forEach(x => x.hidden = true);
    document.querySelectorAll('.tscore').forEach(x => { x.textContent = ''; x.className = 'tscore'; });
    $('scoreAll').textContent = ''; $('barFill').style.width = '0';
    $('feedback').textContent = 'Beantworte alle Aufgaben und klicke dann auf „Klausur auswerten“. Deine Fehler werden dabei gespeichert.';
    stopTimer(); remaining = total; renderClock(); $('timerBtn').textContent = 'Zeit starten'; $('banner').classList.remove('show');
    M.saveStore(); window.scrollTo(0, 0); M.toast('Neuer Versuch gestartet.');
  });
  document.body.appendChild(scrim);
};

/* ---- Timer ---- */
const total = (T.minutes || 30) * 60;
let remaining = total, timerId = null;
function renderClock(){
  $('clock').textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
  $('clock').classList.toggle('low', remaining <= 120);
}
function stopTimer(){ if (timerId) { clearInterval(timerId); timerId = null; } }
$('timerBtn').addEventListener('click', e => {
  if (timerId) { stopTimer(); e.target.textContent = 'Weiter'; return; }
  if (remaining <= 0) remaining = total;
  e.target.textContent = 'Pause';
  timerId = setInterval(() => {
    remaining--; renderClock();
    if (remaining <= 0) { stopTimer(); e.target.textContent = 'Neu starten'; $('banner').classList.add('show'); }
  }, 1000);
});
renderClock();

/* ---- Wiederherstellen ---- */
(function restore(){
  const s = st();
  units.forEach(u => { if (s.a[u.key]) u.set(s.a[u.key]); });
  if (s.evaluated) evaluate(true);
  else if (Object.keys(s.a).length) M.toast('Weiter, wo du aufgehört hast.');
})();
renderHistory();
})();
