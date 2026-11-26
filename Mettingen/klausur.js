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
  const ver = T.version || 1;
  // Neue Version der Klausur (andere Aufgaben) → alte Antworten passen nicht mehr. Verlauf und Fehler bleiben.
  if (!s.tests[T.id] || (s.tests[T.id].v || 1) !== ver) s.tests[T.id] = {attempt: Date.now(), a: {}, evaluated: false, v: ver};
  const x = s.tests[T.id]; if (!x.a) x.a = {};
  return x;
}

/* ---- Aufbau ---- */
// Jede "Einheit" ist ein Punkt: {key, task, label, get(), set(v), check(v), mark(ok), correctText, context, expl}
const units = [];
const taskUnits = [];
const writes = [];
const sentenceOf = s => ((s.match(/[^.!?]+[.!?]*/g) || [s]).map(x => x.trim()).find(x => x.includes('[[')) || s).trim();

/* ---- Hörverstehen (Sprachausgabe des Browsers) ---- */
const audioTasks = [];
const synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
let deVoices = [];
function loadVoices(){ try { deVoices = synth ? synth.getVoices().filter(v => /^de([-_]|$)/i.test(v.lang)) : []; } catch(e){ deVoices = []; } }
if (synth) { loadVoices(); try { synth.addEventListener('voiceschanged', loadVoices); } catch(e){ synth.onvoiceschanged = loadVoices; } }
const FEMALE = /anna|petra|helena|katja|hedda|marlene|vicki|sabine|female|frau|seraphina|amala|katja|google deutsch$/i;
const MALE = /markus|yannick|stefan|hans|conrad|viktor|male|mann|killian|florian|jonas/i;
function voiceFor(g){
  if (!deVoices.length) return null;
  const pref = deVoices.filter(v => (g === 'm' ? MALE : FEMALE).test(v.name));
  const local = l => l.filter(v => v.localService);
  return (local(pref)[0] || pref[0]) || (local(deVoices)[0] || deVoices[0]);
}
function audioHtml(t, ti){
  const id = 't' + ti, a = t.audio;
  const script = a.script.map(l => `<p>${l.sp ? `<b>${esc(l.sp)}:</b> ` : ''}${esc(l.text)}</p>`).join('');
  audioTasks.push(ti);
  return `<div class="listen">
    <div class="lrow">
      <button type="button" id="${id}play">▶ Abspielen</button>
      <button type="button" class="ghost" id="${id}stop" hidden>■ Stopp</button>
      <label class="rate">Tempo <select id="${id}rate"><option value="0.85">langsam</option><option value="1" selected>normal</option></select></label>
      <span class="plays" id="${id}count"></span>
    </div>
    <div class="small-note" id="${id}warn" hidden></div>
    <details class="transcript" id="${id}tr" hidden><summary>Hörtext lesen</summary>${script}</details>
  </div>`;
}
let speakingTi = null;
function stopSpeech(){ if (synth) synth.cancel(); if (speakingTi !== null) { $(`t${speakingTi}stop`).hidden = true; $(`t${speakingTi}play`).disabled = false; speakingTi = null; updateAudioUI(); } }
function playsOf(ti){ const p = st().plays || {}; return p[ti] || 0; }
function updateAudioUI(){
  audioTasks.forEach(ti => {
    const a = T.tasks[ti].audio, max = a.maxPlays || 2, used = playsOf(ti), free = st().evaluated;
    const btn = $(`t${ti}play`), cnt = $(`t${ti}count`);
    if (speakingTi === ti) return;
    btn.textContent = used ? '▶ Noch einmal hören' : '▶ Abspielen';
    btn.disabled = !free && used >= max;
    cnt.textContent = free ? 'Unbegrenzt (nach der Auswertung)' : `Durchgang ${Math.min(used, max)} von ${max}`;
    if (free) $(`t${ti}tr`).hidden = false; else if ($(`t${ti}warn`).hidden) $(`t${ti}tr`).hidden = true;
  });
}
function playAudio(ti){
  const a = T.tasks[ti].audio;
  if (!synth) { const w = $(`t${ti}warn`); w.hidden = false; w.innerHTML = 'Dein Browser kann keinen Text vorlesen. Öffne die Seite in Safari, Chrome oder Edge – oder lies den Hörtext unten.'; $(`t${ti}tr`).hidden = false; return; }
  stopSpeech();
  loadVoices();
  const noDe = !deVoices.length;
  if (noDe) { const w = $(`t${ti}warn`); w.hidden = false; w.textContent = 'Auf diesem Gerät wurde keine deutsche Stimme gefunden – dieser Durchgang zählt nicht. Falls die Aussprache falsch klingt, installiere eine deutsche Stimme in den Systemeinstellungen oder lies den Hörtext unten.'; $(`t${ti}tr`).hidden = false; }
  const s = st(); s.plays = s.plays || {}; if (!noDe) s.plays[ti] = (s.plays[ti] || 0) + 1; M.saveStore();
  const rate = parseFloat($(`t${ti}rate`).value) || 1;
  const fv = voiceFor('f'), mv = voiceFor('m');
  const sameVoice = !fv || !mv || fv === mv;
  const parts = [];
  a.script.forEach(l => (l.text.match(/[^.!?…]+[.!?…]*["“”«»]?/g) || [l.text]).forEach((sent, i, arr) => parts.push({g: l.g || 'f', text: sent.trim(), pause: i === arr.length - 1})));
  speakingTi = ti; $(`t${ti}play`).disabled = true; $(`t${ti}stop`).hidden = false;
  $(`t${ti}count`).textContent = noDe ? 'Läuft (zählt nicht) …' : `Durchgang ${s.plays[ti]} von ${a.maxPlays || 2} läuft …`;
  parts.forEach((p, i) => {
    const u = new SpeechSynthesisUtterance(p.text);
    u.lang = 'de-DE';
    const v = p.g === 'm' ? mv : fv; if (v) u.voice = v;
    u.rate = rate * 0.95;
    u.pitch = sameVoice ? (p.g === 'm' ? 0.8 : 1.15) : 1;
    if (i === parts.length - 1) u.onend = () => { if (speakingTi === ti) { speakingTi = null; $(`t${ti}stop`).hidden = true; $(`t${ti}play`).disabled = false; updateAudioUI(); } };
    synth.speak(u);
  });
}

function renderTask(t, ti){
  const n = ti + 1, own = [];
  let h = (t.section ? `<h2 class="sect">${t.section}</h2>` : '') + `<section class="card" id="aufgabe-${n}"><div class="thead"><span class="task-n">Aufgabe ${n}</span><span class="tscore" id="ts${ti}"></span></div>
    <h2 class="instr">${t.instr}</h2>`;
  if (t.audio) h += audioHtml(t, ti);
  if (t.type === 'multi' || t.type === 'single') {
    const multi = t.type === 'multi', many = Array.isArray(t.items);
    const items = many ? t.items : [{prompt: t.prompt, options: t.options, correct: t.correct}];
    if (many && t.prompt) h += `<div class="${t.reading ? 'reading' : 'prompt'}">${t.prompt}</div>`;
    if (t.note) h += `<div class="small-note">${esc(t.note)}</div>`;
    if (many) h += `<div class="hint">${t.hint || (multi ? 'Wählen Sie eine oder mehrere Antworten:' : 'Wählen Sie jeweils eine Antwort:')}</div>`;
    items.forEach((q, qi) => {
      const key = many ? `t${ti}i${qi}` : 't' + ti;
      const opts = q.options || t.options;
      const lab = j => t.plain ? '' : String.fromCharCode(97 + j) + '. ';
      h += many ? `<div class="q"><div class="qt"><b>${qi + 1}.</b> ${q.prompt}</div>`
                : `<div class="prompt">${q.prompt}</div><div class="hint">${t.hint || 'Wählen Sie eine Antwort:'}</div>`;
      h += `<div class="opts${t.plain ? ' row' : ''}" id="${key}">` +
        opts.map((o, j) => `<label class="opt"><input type="${multi ? 'checkbox' : 'radio'}" name="${key}" value="${j}"><span>${lab(j)}${o}</span></label>`).join('') + '</div>';
      if (many && q.expl) h += `<div class="expl" id="${key}x" hidden>${q.expl}</div>`;
      if (many) h += '</div>';
      const correct = multi ? q.correct.slice().sort().join(',') : String(q.correct);
      const u = {
        key, task: ti, label: `Aufgabe ${n}` + (many ? `, Nr. ${qi + 1}` : ''),
        get: () => [...document.querySelectorAll(`input[name="${key}"]:checked`)].map(i => i.value).sort().join(','),
        set: v => String(v || '').split(',').forEach(j => { const i = document.querySelector(`input[name="${key}"][value="${j}"]`); if (i) i.checked = true; }),
        check: v => v === correct,
        mark: () => {
          const sel = new Set(u.get().split(',').filter(Boolean)), corr = new Set(correct.split(','));
          document.querySelectorAll(`#${key} .opt`).forEach((l, j) => {
            l.classList.remove('ok', 'bad');
            if (corr.has(String(j))) l.classList.add('ok'); else if (sel.has(String(j))) l.classList.add('bad');
          });
          const x = $(key + 'x'); if (x) x.hidden = false;
        },
        typedText: v => String(v || '').split(',').filter(Boolean).map(j => lab(+j) + M.stripHtml(opts[+j])).join(' | '),
        correctText: correct.split(',').map(j => lab(+j) + M.stripHtml(opts[+j])).join(' | '),
        context: M.stripHtml(many ? q.prompt : t.prompt).slice(0, 300), expl: M.stripHtml(many ? (q.expl || '') : t.expl)
      };
      own.push(u);
    });
  }
  else if (t.type === 'cloze') {
    // Lückentext mit Auswahl: [[falsch|*richtig|falsch|falsch]]
    const parts = t.text.split(/\[\[(.*?)\]\]/);
    let body = '', k = 0; const gaps = [];
    parts.forEach((p, i) => {
      if (i % 2 === 0) { body += p; return; }
      const opts = p.split('|').map(s => s.trim()), ci = opts.findIndex(o => o.startsWith('*'));
      const clean = opts.map(o => o.replace(/^\*/, '')), key = `t${ti}c${k}`, letter = String.fromCharCode(97 + k);
      gaps.push({key, clean, ans: clean[ci], idx: i, letter});
      body += `<span class="cl">(${letter})&nbsp;<select class="pick" id="${key}" aria-label="Lücke ${letter}"><option value="">…</option>${clean.map(o => `<option>${esc(o)}</option>`).join('')}</select></span>`;
      k++;
    });
    if (t.hint) h += `<div class="hint">${t.hint}</div>`;
    if (t.title) h += `<h3 style="margin-top:6px">${t.title}</h3>`;
    h += `<p class="ctext" style="line-height:2.3">${body}</p>`;
    gaps.forEach(g => {
      const ctx = parts.map((p, i) => i % 2 === 0 ? p : (i === g.idx ? '[[___]]' : gaps.find(x => x.idx === i).ans)).join('');
      own.push({
        key: g.key, task: ti, label: `Aufgabe ${n}, Lücke (${g.letter})`,
        get: () => $(g.key).value, set: v => { $(g.key).value = v || ''; },
        check: v => v === g.ans,
        mark: ok => { $(g.key).classList.remove('ok', 'bad'); $(g.key).classList.add(ok ? 'ok' : 'bad');
          const nx = $(g.key).nextElementSibling; if (nx && nx.classList.contains('sol')) nx.remove();
          if (!ok) $(g.key).insertAdjacentHTML('afterend', `<span class="sol">${esc(g.ans)}</span>`); },
        typedText: v => v, correctText: g.ans, context: sentenceOf(ctx), expl: ''
      });
    });
  }
  else if (t.type === 'write') {
    h += `<div class="prompt" style="font-family:inherit;font-size:17px">${t.prompt}</div>
      <textarea id="t${ti}w" placeholder="Schreiben Sie hier Ihren Text …" spellcheck="false"></textarea>
      <div class="actions"><span class="meta" id="t${ti}wc" style="margin:0">0 Wörter</span>
      <button type="button" class="ghost" id="t${ti}mb">Redemittel &amp; Musterlösung zeigen</button></div>
      <div id="t${ti}m" hidden>${t.model}</div>`;
    writes.push(ti);
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
      body += `<span class="gap"><input id="${key}" style="width:7.5ch" maxlength="14" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Lücke ${(i - 1) / 2 + 1}"></span>`;
    });
    if (t.hint) h += `<div class="hint">${t.hint}</div>`;
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
audioTasks.forEach(ti => {
  $(`t${ti}play`).onclick = () => playAudio(ti);
  $(`t${ti}stop`).onclick = () => stopSpeech();
});
window.addEventListener('pagehide', () => { if (synth) synth.cancel(); });
T.tasks.forEach((t, ti) => { if (!t.expl) $('x' + ti).remove(); });

/* ---- Schreiben ---- */
function countWords(ti){
  const t = $(`t${ti}w`).value.trim(), n = t ? t.split(/\s+/).length : 0;
  $(`t${ti}wc`).textContent = `${n} Wörter` + (n ? (n < 80 ? ' (zu kurz)' : n > 110 ? ' (etwas zu lang)' : ' ✓') : '');
}
writes.forEach(ti => {
  $(`t${ti}w`).addEventListener('input', () => countWords(ti));
  $(`t${ti}mb`).onclick = () => { const m = $(`t${ti}m`); m.hidden = !m.hidden; };
});

/* ---- Speichern ---- */
function save(){ const s = st(); s.a = {}; units.forEach(u => { const v = u.get(); if (v) s.a[u.key] = v; }); s.w = {}; writes.forEach(ti => { const v = $(`t${ti}w`).value; if (v) s.w[ti] = v; }); M.saveStore(); }
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
    if (!own.length) return;
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
  updateAudioUI();
  const p = got / max;
  $('scoreAll').textContent = `${got} / ${max} Punkte (${Math.round(p * 100)} %)`; $('scoreAll').className = 'score ' + scoreClass(p);
  $('barFill').style.width = Math.round(p * 100) + '%';
  const weakest = taskUnits.map((own, ti) => [ti + 1, own.length ? own.filter(u => u.check(u.get())).length / own.length : 1]).sort((x, y) => x[1] - y[1])[0];
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
    stopSpeech();
    M.store.tests[T.id] = {attempt: Date.now(), a: {}, evaluated: false, v: T.version || 1};
    setTimeout(updateAudioUI, 0);
    document.querySelectorAll('#tasks input').forEach(i => { if (i.type === 'text' || !i.type || i.type === 'search') i.value = ''; else i.checked = false; i.classList.remove('ok', 'bad'); });
    document.querySelectorAll('#tasks .gap input').forEach(i => { i.value = ''; i.classList.remove('ok', 'bad'); });
    document.querySelectorAll('#tasks select').forEach(s => { s.value = ''; s.classList.remove('ok', 'bad'); });
    writes.forEach(ti => { $(`t${ti}w`).value = ''; countWords(ti); $(`t${ti}m`).hidden = true; });
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
  writes.forEach(ti => { if (s.w && s.w[ti]) { $(`t${ti}w`).value = s.w[ti]; countWords(ti); } });
  if (s.evaluated) evaluate(true);
  else if (Object.keys(s.a).length) M.toast('Weiter, wo du aufgehört hast.');
})();
updateAudioUI();
renderHistory();
})();
