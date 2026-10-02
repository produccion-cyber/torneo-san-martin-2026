/* =========================================================
   TORNEO SAN MARTÍN 2026 · app.js (versión robusta)
   - Lectura de Google Sheets con tiempo máximo de espera
   - Cada hoja se lee por separado: si una falla, las demás siguen
   - Si falla una actualización, se conservan los últimos datos
   - Nunca queda en "ACTUALIZANDO…" para siempre
   ========================================================= */

const TIEMPO_ESPERA = 15000;      // 15 s máximo por hoja
const TIEMPO_ESPERA_XLSX = 25000; // 25 s máximo para el respaldo XLSX
const INTERVALO = 120000;         // actualizar cada 2 minutos

const CONFIG = {
  masculino: {
    nombre: 'MASCULINO',
    id: '1mCMBHkh_Kg98IdgbKu8fPpqh8it_OCAn_aqA2BDSE1E',
    hojas: { cal: 'CALENDARIO', res: 'RESULTADOS', tab: 'TABLA_POSICIONES', jug: 'JUGADORES' },
    video: 'https://www.youtube.com/embed/cjn7Y9CnVTQ?rel=0',
    equipos: ['BAYERN MUU FC', 'ADMIN UNITED FC', 'REAL SAN MARTIN FC', 'ULTIMA MILLA FC', 'LOS PROBIÓTICOS FC']
  },
  femenino: {
    nombre: 'FEMENINO',
    id: '1YgQ8hXwvrV8tDmQtzRgrdDinkAM8U9coaxXuBe7JqHM',
    // Respaldo: solo se usa si fallan las 4 hojas por el método principal
    publicado: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvjdSukLjlJb9bk9BYCbl0NAsLfl49pnF1njIw2mCyODC15kBRcIHRL3iAM_nE44bRuPPIats-QOcy/pub',
    hojas: { cal: 'CALENDARIO', res: 'RESULTADOS', tab: 'TABLA_POSICIONES', jug: 'JUGADORES' },
    video: 'https://www.youtube.com/embed/UkpKEy84rO8?rel=0',
    equipos: ['MONARCA FC', 'INTER LÁCTEOS FC', 'ÉLITE FC']
  }
};

let cat = 'masculino';
let panelActual = 'calendario';
let cargando = false;
const DATA = {}; // datos ya procesados por categoría
const RAW = {};  // últimas tablas bajadas por categoría (se conservan si falla una actualización)

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const clean = v => v == null ? '' : String(v).trim();
const num = v => { const n = Number(String(v ?? '').replace(',', '.')); return Number.isFinite(n) ? n : 0; };
const norm = v => clean(v).toUpperCase().replace(/\s+/g, ' ');
const esc = v => clean(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- LECTURA DE GOOGLE SHEETS ---------- */

// Método principal: Google Visualization (gviz) por JSONP.
// No depende de CORS y siempre termina (éxito, error o tiempo agotado).
function cargarHoja(id, nombre) {
  return new Promise((resolver, rechazar) => {
    const cb = 'gv_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const sc = document.createElement('script');
    let terminado = false;
    let temporizador;

    const limpiar = () => { clearTimeout(temporizador); delete window[cb]; sc.remove(); };
    const fallar = msg => { if (terminado) return; terminado = true; limpiar(); rechazar(new Error(msg)); };

    temporizador = setTimeout(() => fallar('tiempo de espera agotado'), TIEMPO_ESPERA);

    window[cb] = d => {
      if (terminado) return;
      terminado = true; limpiar();
      if (d && d.status === 'ok' && d.table) resolver(d.table);
      else {
        const det = d && d.errors && d.errors[0] ? (d.errors[0].detailed_message || d.errors[0].message) : 'respuesta no válida';
        rechazar(new Error(det));
      }
    };

    sc.onerror = () => fallar('sin conexión con Google');
    // Si Google devuelve una página de inicio de sesión (archivo no público), el script "carga" pero no llama a la función:
    sc.onload = () => setTimeout(() => fallar('Google no entregó datos (¿el archivo está compartido como "Cualquier persona con el enlace"?)'), 600);

    sc.src = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=' + encodeURIComponent('responseHandler:' + cb) +
      '&sheet=' + encodeURIComponent(nombre) + '&headers=1&_=' + Date.now();
    document.head.appendChild(sc);
  });
}

// Respaldo: XLSX publicado (con tiempo máximo real mediante AbortController)
async function descargarXlsx(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIEMPO_ESPERA_XLSX);
  try {
    const r = await fetch(url + '?output=xlsx&cachebust=' + Date.now(), { cache: 'no-store', signal: ctl.signal });
    if (!r.ok) throw new Error('Google respondió ' + r.status);
    const wb = XLSX.read(await r.arrayBuffer(), { type: 'array', cellDates: false });
    const o = {};
    wb.SheetNames.forEach(n => { o[n] = XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: '', raw: false }); });
    return o;
  } catch (e) {
    throw new Error(e.name === 'AbortError' ? 'tiempo de espera agotado' : e.message);
  } finally { clearTimeout(t); }
}

const aTabla = arr => ({ rows: (arr || []).map(r => ({ c: r.map(v => ({ v, f: v })) })) });

// Lee las 4 hojas de una categoría. Cada una por separado.
async function cargarCategoria(clave) {
  const cfg = CONFIG[clave];
  const claves = Object.keys(cfg.hojas);
  const resultados = await Promise.allSettled(claves.map(k => cargarHoja(cfg.id, cfg.hojas[k])));
  const nuevo = { ...(RAW[clave] || {}) };
  let fallos = [];

  resultados.forEach((r, i) => {
    if (r.status === 'fulfilled') nuevo[claves[i]] = r.value;
    else fallos.push({ hoja: cfg.hojas[claves[i]], motivo: r.reason.message });
  });

  // Si fallaron todas y existe documento publicado, se intenta el respaldo XLSX
  if (fallos.length === claves.length && cfg.publicado && typeof XLSX !== 'undefined') {
    try {
      const libro = await descargarXlsx(cfg.publicado);
      const nombres = Object.keys(libro);
      const previos = fallos; fallos = [];
      claves.forEach(k => {
        const real = nombres.find(n => norm(n) === norm(cfg.hojas[k]));
        if (real) nuevo[k] = aTabla(libro[real]);
        else fallos.push({ hoja: cfg.hojas[k], motivo: 'no existe en el archivo publicado' });
      });
      if (fallos.length === claves.length) fallos = previos;
    } catch (e) {
      fallos.forEach(f => { f.motivo += ' · respaldo XLSX: ' + e.message; });
    }
  }

  RAW[clave] = nuevo;
  return fallos;
}

/* ---------- PROCESAMIENTO ---------- */

function rows(t) {
  return ((t && t.rows) || []).map(r => (r.c || []).map(c => {
    if (!c) return '';
    const v = (c.f != null && c.f !== '') ? c.f : c.v;
    return v == null ? '' : v;
  }));
}

function findHeader(a, esperado) {
  const objetivo = esperado.map(norm);
  return a.findIndex(r => objetivo.every((x, i) => norm(r[i]) === x));
}

function parsePlayers(a) {
  const h = findHeader(a, ['Equipo', 'Jugador', 'Dorsal', 'Posición']);
  if (h < 0) return [];
  return a.slice(h + 1)
    .map(r => ({ team: clean(r[0]), name: clean(r[1]), number: clean(r[2]), role: clean(r[3]) }))
    .filter(x => x.team && x.name);
}

function build(raw) {
  const cal = rows(raw.cal).map(r => ({
    round: num(r[0]), match: num(r[1]), date: clean(r[2]), time: clean(r[3]),
    home: clean(r[5]), away: clean(r[7]), venue: clean(r[8]), score: clean(r[9]) || '-', note: clean(r[10])
  })).filter(x => x.match > 0 || x.round > 0);

  const res = rows(raw.res).map(x => ({
    match: num(x[0]), round: num(x[1]), date: clean(x[2]), home: clean(x[3]), away: clean(x[4]),
    hg: clean(x[5]) === '' ? null : num(x[5]), ag: clean(x[6]) === '' ? null : num(x[6]), status: clean(x[7])
  })).filter(x => x.match > 0);

  const tab = rows(raw.tab).map(x => ({
    pos: num(x[0]), team: clean(x[2]), pj: num(x[3]), pg: num(x[4]), pe: num(x[5]), pp: num(x[6]),
    gf: num(x[7]), gc: num(x[8]), dg: num(x[9]), pts: num(x[10])
  })).filter(x => x.team && x.pos > 0);

  const players = parsePlayers(rows(raw.jug));
  const teams = [...new Set([...tab.map(x => x.team), ...players.map(x => x.team)])];
  return { cal, res, tab, players, teams };
}

function datosVacios() {
  return { cal: [], res: [], tab: [], players: [], teams: CONFIG[cat].equipos.slice() };
}

/* ---------- ESTADO VISIBLE ---------- */

function estado(texto, tipo) {
  const e = $('#status');
  e.textContent = texto;
  e.style.color = tipo === 'ok' ? '#27b274' : tipo === 'error' ? '#d94d5b' : '';
  e.style.fontWeight = tipo ? '800' : '';
}

function aviso(msg) {
  const e = $('#error');
  if (msg) { e.textContent = msg; e.hidden = false; } else { e.hidden = true; e.textContent = ''; }
}

/* ---------- CARGA GENERAL ---------- */

async function load() {
  if (cargando) return;
  if (document.hidden && DATA[cat]) return; // no gastar consultas con la pestaña oculta
  cargando = true;
  const clave = cat;
  estado('ACTUALIZANDO…');
  try {
    const fallos = await cargarCategoria(clave);
    if (Object.keys(RAW[clave] || {}).length) DATA[clave] = build(RAW[clave]);
    if (clave === cat) {
      render();
      if (!fallos.length) {
        const h = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        estado('DATOS CONECTADOS · ' + h, 'ok');
        aviso('');
      } else {
        estado('SIN ACTUALIZAR', 'error');
        aviso('No se pudo actualizar (' + CONFIG[clave].nombre + '): ' +
          fallos.map(f => f.hoja + ' → ' + f.motivo).join(' | ') +
          (DATA[clave] && DATA[clave].tab.length ? '. Se muestran los últimos datos disponibles. Se reintentará automáticamente.' : '. Se reintentará automáticamente.'));
      }
    }
  } catch (e) {
    console.error(e);
    if (clave === cat) {
      estado('SIN ACTUALIZAR', 'error');
      aviso('Error inesperado al actualizar ' + CONFIG[clave].nombre + ': ' + e.message);
      render();
    }
  } finally {
    cargando = false;
    if (clave !== cat) load(); // el usuario cambió de categoría mientras cargaba
  }
}

/* ---------- DIBUJO ---------- */

function ini(x) { return esc(clean(x).split(/\s+/).filter(Boolean).slice(0, 2).map(y => y[0]).join('').toUpperCase()); }

function match(x) {
  return `<div class="match"><div class="team"><span class="badge">${ini(x.home)}</span>${esc(x.home)}</div><div><div class="score">VS</div><div class="vs">${esc(x.date)}${x.time ? ' · ' + esc(x.time) : ''}</div></div><div class="team"><span class="badge">${ini(x.away)}</span>${esc(x.away)}</div></div><div class="meta">${esc(x.venue) || 'Cancha por definir'}${x.note ? ' · ' + esc(x.note) : ''}</div>`;
}

function render() {
  const d = DATA[cat] || datosVacios();
  $('#catTitle').textContent = 'TORNEO ' + CONFIG[cat].nombre;
  $('#videoCat').textContent = cat;

  const jugados = d.res.filter(x => norm(x.status) === 'JUGADO');
  const goles = jugados.reduce((s, x) => s + (x.hg || 0) + (x.ag || 0), 0);
  const total = d.cal.length;
  const lider = d.tab[0];

  $('#cards').innerHTML = [
    ['PARTIDOS JUGADOS', jugados.length, 'Encuentros oficiales'],
    ['PARTIDOS PENDIENTES', Math.max(total - jugados.length, 0), 'Programación restante'],
    ['GOLES REGISTRADOS', goles, 'Marcadores oficiales'],
    ['LÍDER ACTUAL', lider ? esc(lider.team) : '—', lider ? lider.pts + ' puntos' : 'Tabla oficial']
  ].map(x => `<div class="metric"><small>${x[0]}</small><strong>${x[1]}</strong><span>${x[2]}</span></div>`).join('');

  const proximo = d.cal.find(x => x.home && x.away && (!x.score || x.score === '-'));
  $('#next').innerHTML = proximo ? match(proximo) : '<div class="empty">No hay próximo partido cargado.</div>';

  const ultimo = jugados[jugados.length - 1];
  $('#latest').innerHTML = ultimo
    ? `<div class="result"><strong>${esc(ultimo.home)}</strong><strong>${ultimo.hg ?? '-'} - ${ultimo.ag ?? '-'}</strong><strong>${esc(ultimo.away)}</strong></div>`
    : '<div class="empty">Aún no hay resultados oficiales.</div>';

  $('#mini').innerHTML = d.tab.slice(0, 5).map((x, i) =>
    `<div class="minirow"><b>${x.pos || i + 1}</b><span>${esc(x.team)}</span><b>${x.pts}</b></div>`).join('') || '<div class="empty">Sin tabla.</div>';

  const msgGoleadores = '<div class="empty">La tabla de goleadores se mostrará cuando la fuente oficial esté disponible.</div>';
  $('#topscorers').innerHTML = msgGoleadores;
  $('#scorers').innerHTML = msgGoleadores;

  renderComp(panelActual);
  renderTeams(d);
  renderPlayers(d);
  renderVideo();
}

function renderComp(panel) {
  panelActual = panel;
  const d = DATA[cat] || datosVacios();
  const p = $('#competitionPanel');

  if (panel === 'tabla') {
    p.innerHTML = d.tab.length
      ? `<div class="card table-wrap"><table class="table"><thead><tr><th>POS.</th><th>EQUIPO</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th></tr></thead><tbody>${d.tab.map((x, i) =>
        `<tr><td>${x.pos || i + 1}</td><td><b>${esc(x.team)}</b></td><td>${x.pj}</td><td>${x.pg}</td><td>${x.pe}</td><td>${x.pp}</td><td>${x.gf}</td><td>${x.gc}</td><td>${x.dg}</td><td><b>${x.pts}</b></td></tr>`).join('')}</tbody></table></div>`
      : '<div class="empty">Tabla de posiciones no disponible por ahora.</div>';
    return;
  }

  const arr = panel === 'resultados' ? d.res.filter(x => norm(x.status) === 'JUGADO') : d.cal;
  if (!arr.length) { p.innerHTML = '<div class="empty">Sin datos disponibles por ahora.</div>'; return; }

  const grupos = {};
  arr.forEach(x => (grupos[x.round || ''] ??= []).push(x));
  p.innerHTML = '<div class="calendar">' + Object.entries(grupos).map(([j, rs]) =>
    `<div class="round"><div>JORNADA ${esc(j) || '—'}</div>${rs.map(x =>
      `<div class="game"><div><small>${esc(x.date)}<br>${esc(x.time)}</small></div><div class="home">${esc(x.home) || 'Por definir'}</div><div class="score">${panel === 'resultados' ? `${x.hg ?? '-'} - ${x.ag ?? '-'}` : 'VS'}</div><div class="away">${esc(x.away) || 'Por definir'}</div><div><small>${esc(x.venue)}<br>${esc(x.note)}</small></div></div>`).join('')}</div>`).join('') + '</div>';
}

function renderTeams(d) {
  $('#teams').innerHTML = d.teams.map(x => {
    const t = d.tab.find(y => y.team === x) || {};
    return `<article class="team-card"><div class="team-logo">${ini(x)}</div><h3>${esc(x)}</h3><p>${cat.toUpperCase()} · PLANTILLA OFICIAL</p><div class="team-stats"><span>PJ <b>${t.pj || 0}</b></span><span>PTS <b>${t.pts || 0}</b></span></div></article>`;
  }).join('') || '<div class="empty">Sin equipos cargados.</div>';
}

function renderPlayers(d) {
  d = d || datosVacios();
  const f = $('#teamFilter');
  const actual = f.value || 'all';
  f.innerHTML = '<option value="all">Todos los equipos</option>' + d.teams.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join('');
  f.value = [...f.options].some(x => x.value === actual) ? actual : 'all';
  const ps = d.players.filter(x => f.value === 'all' || x.team === f.value);
  $('#players').innerHTML = ps.length
    ? ps.map(x => `<article class="player"><div class="number">#${esc(x.number) || '—'}</div><div><b>${esc(x.name)}</b><small>${esc(x.team)}</small><small>${esc(x.role) || 'Posición no registrada'}</small></div></article>`).join('')
    : '<div class="empty">No hay jugadores registrados. Se lee exclusivamente la pestaña JUGADORES.</div>';
}

function renderVideo() {
  const u = CONFIG[cat].video;
  const marco = `<iframe src="${u}" title="Presentación ${CONFIG[cat].nombre}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  $('#videoHome').innerHTML = marco;
  $('#videoPage').innerHTML = marco;
}

/* ---------- NAVEGACIÓN ---------- */

function go(id) {
  $$('.section').forEach(s => s.classList.toggle('activo', s.id === id));
  $$('nav button').forEach(b => b.classList.toggle('activo', b.dataset.section === id));
  $('#nav').classList.remove('abierto');
  scrollTo({ top: 0, behavior: 'smooth' });
}

$$('nav button').forEach(b => b.onclick = () => go(b.dataset.section));
$$('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));

$$('.cat').forEach(b => b.onclick = () => {
  $$('.cat').forEach(x => x.classList.remove('activo'));
  b.classList.add('activo');
  cat = b.dataset.cat;
  render();   // muestra de inmediato lo último que se tenga de esa categoría
  load();     // y actualiza en segundo plano
});

$$('.tabs button').forEach(b => b.onclick = () => {
  $$('.tabs button').forEach(x => x.classList.remove('sel'));
  b.classList.add('sel');
  renderComp(b.dataset.panel);
});

$('#teamFilter').onchange = () => renderPlayers(DATA[cat] || datosVacios());
$('#menubtn').onclick = () => $('#nav').classList.toggle('abierto');

/* ---------- ARRANQUE ---------- */

render();            // la página nunca queda vacía, aun sin conexión
load();
setInterval(load, INTERVALO);
document.addEventListener('visibilitychange', () => { if (!document.hidden) load(); });
