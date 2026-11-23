/* Mettingen Übungstests – gemeinsamer Speicher, Fehler-Log, Sicherungscode, Export */
(function(){
const KEY = 'mettingen_v1';
const MAX_LOG = 5000;

// Alle Tests. Neuer Test: hier eintragen und tests/<id>.js anlegen.
const TESTS = {
  "1": {title: "Übungstest 1", desc: "C-Test (Schlaf, Fahrrad, Lernen, Bienen) · 20 Grammatikaufgaben · Leseverstehen „Zu gut für die Tonne“ · Schreiben"},
  "2": {title: "Übungstest 2", desc: "C-Test (Homeoffice, Leitungswasser, Ehrenamt, alte Handys) · 20 Grammatikaufgaben · Leseverstehen „Mit zwei Sprachen aufwachsen“ · Schreiben"},
  "3": {title: "Übungstest 3", desc: "C-Test (Online-Shopping, Wohnungssuche, Musik beim Lernen, Wald) · 20 Grammatikaufgaben · Leseverstehen „Hausaufgaben mit KI?“ · Schreiben"},
  "4": {title: "Übungstest 4", desc: "C-Test (Mülltrennung, Buchdruck, Bewegung im Alltag, Haustiere) · 20 Grammatikaufgaben · Leseverstehen „Vier Tage arbeiten, drei Tage frei?“ · Schreiben"},
  "5": {title: "Alte Klausur Mettingen", page: "klausur.html?t=5", desc: "Echter Aufnahmetest SoSe 2025 (16.12.2024): Sätze verbinden, Passiv, Grafik, Reflexivpronomen, C-Test, Adjektive, Relativpronomen · im Format des Online-Tests · 15 Minuten"},
  "6": {title: "Übungstest 6 (Mettingen-Format)", page: "klausur.html?t=6", desc: "Wie der echte Online-Test: Sätze verbinden, Passiv, Pronomen, Präpositionen, Adjektive, Lückentext mit Auswahl, Umformungen · 2 C-Tests · Grafik & Leseverstehen „Haben Bibliotheken eine Zukunft?“ · Grafik beschreiben · 60 Minuten"}
};
const PARTS = {C: "C-Test", G: "Grammatik & Satzbau", L: "Leseverstehen", X: "Alte Klausur"};

const blank = () => ({v: 1, tests: {}, history: [], mistakes: []});
function loadStore(){
  try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY)) || {}); }
  catch(e){ return blank(); }
}
let store = loadStore();
function saveStore(){ try { localStorage.setItem(KEY, JSON.stringify(store)); } catch(e){} }
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {}); } catch(e){}

// Zwei Stände zusammenführen: Verlauf und Fehler werden vereinigt, angefangene Tests bleiben erhalten.
function mergeStores(a, b){
  const out = blank();
  const union = (x, y, key) => { const m = new Map(); (x || []).concat(y || []).forEach(e => { if (e) m.set(key(e), e); }); return [...m.values()]; };
  out.history = union(a.history, b.history, e => e.test + '|' + e.id).sort((p, q) => (p.id || 0) - (q.id || 0));
  out.mistakes = union(a.mistakes, b.mistakes, e => [e.attempt, e.test, e.part, e.n].join('|')).sort((p, q) => p.at - q.at).slice(-MAX_LOG);
  out.tests = Object.assign({}, b.tests || {}, a.tests || {});
  return out;
}

function backupCode(){
  return 'MT1-' + btoa(unescape(encodeURIComponent(JSON.stringify(store))));
}
function readBackup(code){
  code = String(code || '').trim().replace(/\s+/g, '');
  if (!code.startsWith('MT1-')) throw new Error('bad');
  const o = JSON.parse(decodeURIComponent(escape(atob(code.slice(4)))));
  if (!o || typeof o !== 'object' || !Array.isArray(o.history)) throw new Error('bad');
  return o;
}
function importBackup(code){
  const o = readBackup(code);
  store = mergeStores(store, o);
  saveStore();
  return store;
}

// Fehler-Export: eine JSON-Datei mit jedem Fehler im Satz, für einen Lernzettel.
function exportMistakes(){
  const fmt = t => new Date(t - new Date(t).getTimezoneOffset() * 60000).toISOString().slice(0, 16).replace('T', ' ');
  const mistakes = store.mistakes.map(m => ({
    date: fmt(m.at), test: (TESTS[m.test] || {}).title || ('Test ' + m.test), part: PARTS[m.part] || m.part,
    item: m.label, result: m.result, correct: m.correct, typed: m.typed || '',
    sentence: m.context || '', explanation: m.expl || ''
  }));
  const attempts = store.history.map(h => ({
    date: fmt(h.id), test: (TESTS[h.test] || {}).title || h.test, ctest: h.C, grammatik: h.G, lesen: h.L,
    total: h.total, max: h.max, percent: Math.round(h.total / h.max * 100)
  }));
  const data = JSON.stringify({app: 'Mettingen Übungstests', kind: 'fehler-export', version: 1, exported: new Date().toISOString(), mistakes, attempts}, null, 1);
  const filename = 'mettingen-fehler-' + new Date().toISOString().slice(0, 10) + '.json';
  return {data, filename, count: mistakes.length};
}
function downloadMistakes(){
  const {data, filename} = exportMistakes();
  try {
    const url = URL.createObjectURL(new Blob([data], {type: 'application/json'}));
    const a = document.createElement('a'); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast('Datei „' + filename + '“ wird heruntergeladen.');
  } catch(e){
    codeModal('Download nicht möglich. Kopiere den Text und schicke ihn als Nachricht.', data, 'Kopieren', copyFrom);
  }
}

/* ---- kleine UI-Helfer ---- */
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const stripHtml = s => String(s || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
let toastT;
function toast(msg){
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2600);
}
function codeModal(title, value, okLabel, onOk){
  const scrim = document.createElement('div'); scrim.className = 'scrim';
  scrim.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><p>${esc(title)}</p><textarea spellcheck="false" autocapitalize="none" autocomplete="off"></textarea><div class="row"><button type="button" class="ghost" data-a="no">Schließen</button><button type="button" data-a="ok">${esc(okLabel)}</button></div></div>`;
  const ta = scrim.querySelector('textarea'); ta.value = value || '';
  if (value) ta.readOnly = true;
  scrim.addEventListener('click', e => {
    const a = e.target.closest('[data-a]');
    if (e.target === scrim || (a && a.dataset.a === 'no')) scrim.remove();
    else if (a && a.dataset.a === 'ok') onOk(ta, () => scrim.remove());
  });
  document.body.appendChild(scrim);
  if (value) { ta.focus(); ta.select(); } else ta.focus();
}
function copyFrom(ta, close){
  const done = () => { close(); toast('Kopiert.'); };
  const fallback = () => { ta.select(); try { document.execCommand('copy'); done(); } catch(e){ toast('Bitte markieren und kopieren.'); } };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done, fallback);
  else fallback();
}
function showBackup(){
  codeModal('Dein Sicherungscode. Er enthält deine Antworten, deinen Verlauf und alle Fehler. Bewahre ihn auf (z. B. in einer Notiz) oder lade ihn auf einem anderen Gerät.', backupCode(), 'Kopieren', copyFrom);
}
function askBackup(after){
  codeModal('Füge deinen Sicherungscode ein. Er wird mit dem aktuellen Stand zusammengeführt.', '', 'Laden', (ta, close) => {
    try { importBackup(ta.value); } catch(e){ toast('Dieser Code ist ungültig.'); return; }
    close(); toast('Fortschritt wiederhergestellt.'); if (after) after();
  });
}

window.MT = {
  KEY, TESTS, PARTS, MAX_LOG,
  get store(){ return store; }, set store(v){ store = v; },
  saveStore, reload(){ store = loadStore(); return store; },
  backupCode, importBackup, exportMistakes, downloadMistakes,
  esc, stripHtml, toast, codeModal, copyFrom, showBackup, askBackup
};
})();
