/* =========================================================
   TORNEO SAN MARTÍN 2026 · app.js (versión 2)
   Lee la estructura REAL del Excel "Control Torneo":
   - CALENDARIO  : partidos (A:K), equipos y ciudad (N:P), plantillas (R:U)
   - RESULTADOS  : marcadores y estado (Jugado / Pendiente)
   - TABLA_POSICIONES : clasificación (columna Pos. se calcula sola)
   - JUGADORES   : estadísticas por jugador (P:AE) -> goleadores,
                   asistencias, MVP, tarjetas y fair play
   Todo se busca por NOMBRE de encabezado, así que si mueves columnas
   la página sigue funcionando.
   ========================================================= */

const TIEMPO_ESPERA = 15000;
const TIEMPO_ESPERA_XLSX = 25000;
const INTERVALO = 120000;

// Zonas que se leen de cada hoja (rango = área de la hoja que se consulta)
const HOJAS = [
  { k: 'cal',  hoja: 'CALENDARIO',       rango: 'A1:P40' },
  { k: 'plan', hoja: 'CALENDARIO',       rango: 'R1:U80' },
  { k: 'res',  hoja: 'RESULTADOS',       rango: 'A1:M40' },
  { k: 'tab',  hoja: 'TABLA_POSICIONES', rango: 'A1:N30' },
  { k: 'jug',  hoja: 'JUGADORES',        rango: 'P1:AE60' }
];

const CONFIG = {
  masculino: {
    nombre: 'MASCULINO',
    id: '1mCMBHkh_Kg98IdgbKu8fPpqh8it_OCAn_aqA2BDSE1E',
    video: 'https://www.youtube.com/embed/cjn7Y9CnVTQ?rel=0',
    equipos: ['BAYERN MUU FC', 'ADMIN UNITED FC', 'REAL SAN MARTIN FC', 'ULTIMA MILLA FC', 'LOS PROBIÓTICOS FC']
  },
  femenino: {
    nombre: 'FEMENINO',
    id: '1YgQ8hXwvrV8tDmQtzRgrdDinkAM8U9coaxXuBe7JqHM',
    publicado: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvjdSukLjlJb9bk9BYCbl0NAsLfl49pnF1njIw2mCyODC15kBRcIHRL3iAM_nE44bRuPPIats-QOcy/pub',
    video: 'https://www.youtube.com/embed/UkpKEy84rO8?rel=0',
    equipos: ['MONARCA FC', 'INTER LÁCTEOS FC', 'ÉLITE FC']
  }
};

let cat = 'masculino';
let panelActual = 'calendario';
let cargando = false;
const DATA = {};
const RAW = {};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const clean = v => v == null ? '' : String(v).trim();
const num = v => { const n = Number(String(v ?? '').replace(',', '.')); return Number.isFinite(n) ? n : 0; };
const norm = v => clean(v).toUpperCase().replace(/\s+/g, ' ');
const nk = v => norm(v).normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // sin tildes, para comparar encabezados
const esc = v => clean(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const p2 = n => String(n).padStart(2, '0');

/* ---------- LECTURA DE GOOGLE SHEETS ---------- */

function cargarHoja(id, nombre, rango) {
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
    sc.onload = () => setTimeout(() => fallar('Google no entregó datos (¿el archivo está compartido como "Cualquier persona con el enlace"?)'), 600);
    sc.src = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=' + encodeURIComponent('responseHandler:' + cb) +
      '&sheet=' + encodeURIComponent(nombre) + (rango ? '&range=' + encodeURIComponent(rango) : '') + '&headers=1&_=' + Date.now();
    document.head.appendChild(sc);
  });
}

// Si el rango falla (no por tiempo), se reintenta leyendo la hoja completa
async function leerHoja(id, j) {
  try { return await cargarHoja(id, j.hoja, j.rango); }
  catch (e) {
    if (/tiempo/.test(e.message)) throw e;
    return await cargarHoja(id, j.hoja, null);
  }
}

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

const aTabla = arr => ({ cols: [], rows: (arr || []).map(r => ({ c: r.map(v => ({ v, f: v })) })) });

async function cargarCategoria(clave) {
  const cfg = CONFIG[clave];
  const resultados = await Promise.allSettled(HOJAS.map(j => leerHoja(cfg.id, j)));
  const nuevo = { ...(RAW[clave] || {}) };
  let fallos = [];

  resultados.forEach((r, i) => {
    if (r.status === 'fulfilled') nuevo[HOJAS[i].k] = r.value;
    else fallos.push({ hoja: HOJAS[i].hoja + (HOJAS[i].k === 'plan' ? ' (plantillas)' : ''), motivo: r.reason.message });
  });

  if (fallos.length === HOJAS.length && cfg.publicado && typeof XLSX !== 'undefined') {
    try {
      const libro = await descargarXlsx(cfg.publicado);
      const nombres = Object.keys(libro);
      const previos = fallos; fallos = [];
      HOJAS.forEach(j => {
        const real = nombres.find(n => norm(n) === norm(j.hoja));
        if (real) nuevo[j.k] = aTabla(libro[real]);
        else fallos.push({ hoja: j.hoja, motivo: 'no existe en el archivo publicado' });
      });
      if (fallos.length === HOJAS.length) fallos = previos;
    } catch (e) {
      fallos.forEach(f => { f.motivo += ' · respaldo XLSX: ' + e.message; });
    }
  }
  RAW[clave] = nuevo;
  return fallos;
}

/* ---------- LECTURA DE CELDAS ---------- */

// Convierte una celda de Google (o del XLSX) en texto/número simple.
// Fechas -> "2026-10-03"   Horas -> "16:00"
function celda(c) {
  if (!c) return '';
  const v = c.v;
  if (typeof v === 'string') {
    const m = /^Date\((\d+),(\d+),(\d+)/.exec(v);
    if (m) return m[1] + '-' + p2(+m[2] + 1) + '-' + p2(+m[3]);
    return v;
  }
  if (typeof Date !== 'undefined' && v instanceof Date) return v.getFullYear() + '-' + p2(v.getMonth() + 1) + '-' + p2(v.getDate());
  if (Array.isArray(v)) return p2(v[0]) + ':' + p2(v[1]);
  if (v == null || v === '') return (c.f != null && c.f !== '') ? c.f : '';
  return v;
}

const rows = t => ((t && t.rows) || []).map(r => (r.c || []).map(celda));

// El encabezado que entrega Google (cols[].label) se agrega como primera fila
function filasDe(t) {
  if (!t) return [];
  const cab = (t.cols || []).map(c => (c && c.label) ? c.label : '');
  return [cab, ...rows(t)];
}

// Busca la fila de encabezados por nombre y devuelve la posición de cada columna
function buscarEnc(a, claves, requeridas, minimo, valida) {
  for (let i = 0; i < a.length; i++) {
    const col = {};
    (a[i] || []).forEach((v, j) => { const n = nk(v); if (n && claves.includes(n) && col[n] == null) col[n] = j; });
    if (requeridas.every(r => col[r] != null) && Object.keys(col).length >= minimo && (!valida || valida(col))) return { fila: i, col };
  }
  return null;
}

/* ---------- INTERPRETACIÓN DE CADA HOJA ---------- */

function parseCal(a) {
  const h = buscarEnc(a, ['LOCAL', 'VISITANTE', 'CANCHA', 'MARCADOR', 'OBSERVACIONES'], ['LOCAL'], 3);
  if (!h) return [];
  const L = h.col.LOCAL, g = (n, o) => h.col[n] != null ? h.col[n] : L + o;
  const ix = { r: L - 5, p: L - 4, f: L - 3, h: L - 2, l: L, v: g('VISITANTE', 2), c: g('CANCHA', 3), m: g('MARCADOR', 4), o: g('OBSERVACIONES', 5) };
  const out = [];
  for (let i = h.fila + 1; i < a.length; i++) {
    const r = a[i] || [];
    if (!Object.values(ix).some(k => clean(r[k]) !== '')) break; // fin del bloque (hay otro calendario más abajo)
    const x = {
      round: num(r[ix.r]), match: num(r[ix.p]), date: clean(r[ix.f]), time: clean(r[ix.h]),
      home: clean(r[ix.l]), away: clean(r[ix.v]), venue: clean(r[ix.c]), score: clean(r[ix.m]) || '-', note: clean(r[ix.o])
    };
    if (x.match > 0 || x.round > 0) out.push(x);
  }
  return out;
}

function parseCiudades(a) {
  const h = buscarEnc(a, ['EQUIPOS', 'CIUDAD'], ['EQUIPOS', 'CIUDAD'], 2);
  if (!h) return [];
  const out = [];
  for (let i = h.fila + 1; i < a.length; i++) {
    const r = a[i] || [];
    const name = clean(r[h.col.EQUIPOS]);
    if (!name) { if (out.length) break; else continue; }
    out.push({ code: num(r[h.col.EQUIPOS - 1]), name, city: clean(r[h.col.CIUDAD]) });
  }
  return out;
}

function parseRes(a) {
  const h = buscarEnc(a, ['LOCAL', 'VISITANTE', 'ESTADO', 'GANADOR', 'OBSERVACIONES'], ['LOCAL', 'ESTADO'], 3);
  if (!h) return [];
  const L = h.col.LOCAL, g = (n, o) => h.col[n] != null ? h.col[n] : L + o;
  const ix = { j: L - 3, p: L - 2, f: L - 1, l: L, v: g('VISITANTE', 1), gl: L + 2, gv: L + 3, e: g('ESTADO', 4), w: g('GANADOR', 5), o: g('OBSERVACIONES', 6) };
  const out = [];
  for (let i = h.fila + 1; i < a.length; i++) {
    const r = a[i] || [];
    if (!Object.values(ix).some(k => clean(r[k]) !== '')) break;
    const x = {
      round: num(r[ix.j]), match: num(r[ix.p]), date: clean(r[ix.f]), home: clean(r[ix.l]), away: clean(r[ix.v]),
      hg: clean(r[ix.gl]) === '' ? null : num(r[ix.gl]), ag: clean(r[ix.gv]) === '' ? null : num(r[ix.gv]),
      status: clean(r[ix.e]), winner: clean(r[ix.w]), note: clean(r[ix.o])
    };
    if (x.match > 0) out.push(x);
  }
  return out;
}

function parseTab(a) {
  const h = buscarEnc(a, ['EQUIPO', 'ESTADO', 'ULTIMOS 5', 'CODIGO'], ['EQUIPO'], 2);
  if (!h) return [];
  const E = h.col.EQUIPO;
  const out = [];
  for (let i = h.fila + 1; i < a.length; i++) {
    const r = a[i] || [];
    const team = clean(r[E]);
    if (!team) { if (out.length) break; else continue; }
    out.push({
      orden: out.length, pos: num(r[E - 2]), team, pj: num(r[E + 1]), pg: num(r[E + 2]), pe: num(r[E + 3]), pp: num(r[E + 4]),
      gf: num(r[E + 5]), gc: num(r[E + 6]), dg: num(r[E + 7]), pts: num(r[E + 8]),
      ult: clean(r[h.col['ULTIMOS 5'] != null ? h.col['ULTIMOS 5'] : E + 10]),
      estado: clean(r[h.col.ESTADO != null ? h.col.ESTADO : E + 11])
    });
  }
  // La hoja entrega los equipos por código; la posición oficial está en la columna "Pos." (vacía hasta que haya partidos)
  out.sort((p, q) => {
    const a1 = p.pos > 0, b1 = q.pos > 0;
    if (a1 && b1) return p.pos - q.pos;
    if (a1) return -1;
    if (b1) return 1;
    return p.orden - q.orden;
  });
  return out;
}

const limpiarPos = v => { const t = clean(v); return t === '0' ? '' : t; };

function parsePlantilla(a) {
  const h = buscarEnc(a, ['EQUIPO', 'JUGADOR', 'DORSAL', 'POSICION'], ['EQUIPO', 'JUGADOR'], 2);
  if (!h) return [];
  const J = h.col.JUGADOR, g = (n, o) => h.col[n] != null ? h.col[n] : J + o;
  const out = [];
  for (let i = h.fila + 1; i < a.length; i++) {
    const r = a[i] || [];
    const name = clean(r[J]);
    if (!name) { if (out.length) break; else continue; }
    const team = clean(r[h.col.EQUIPO]);
    if (!team) continue;
    out.push({ team, name, number: clean(r[g('DORSAL', 1)]), role: limpiarPos(r[g('POSICION', 2)]) });
  }
  return out;
}

function parseStats(a) {
  // En el resumen, "Equipo" está justo a la derecha de "Jugador" (en el registro por partido es al revés)
  const h = buscarEnc(a, ['JUGADOR', 'EQUIPO', 'DORSAL', 'POSICION', 'PJ', 'GOLES', 'ASISTENCIAS', 'TA', 'TR', 'MVP SCORE', 'INDICE FAIR PLAY'], ['JUGADOR', 'EQUIPO'], 2, c => c.EQUIPO === c.JUGADOR + 1);
  if (!h) return [];
  const Q = h.col.JUGADOR, g = (n, o) => h.col[n] != null ? h.col[n] : Q + o;
  const out = [];
  for (let i = h.fila + 1; i < a.length; i++) {
    const r = a[i] || [];
    const name = clean(r[Q]);
    if (!name) { if (out.length) break; else continue; }
    const team = clean(r[g('EQUIPO', 1)]);
    if (!team) continue;
    const p = {
      team, name, number: clean(r[g('DORSAL', 2)]), role: limpiarPos(r[g('POSICION', 3)]),
      pj: num(r[g('PJ', 4)]), g: num(r[g('GOLES', 5)]), a: num(r[g('ASISTENCIAS', 6)]),
      ta: num(r[g('TA', 7)]), tr: num(r[g('TR', 8)]), mvp: num(r[g('MVP SCORE', 9)])
    };
    const fp = clean(r[g('INDICE FAIR PLAY', 13)]);
    p.fp = fp === '' ? p.ta + p.tr * 3 : num(fp);
    out.push(p);
  }
  return out;
}

// Plantilla oficial (CALENDARIO R:U) + estadísticas (JUGADORES P:AE)
function mezclar(roster, stats) {
  const key = p => norm(p.team) + '|' + norm(p.name);
  const mapa = new Map(stats.map(s => [key(s), s]));
  const usados = new Set();
  const out = roster.map(r => {
    const s = mapa.get(key(r)) || {};
    usados.add(key(r));
    return { ...r, pj: s.pj || 0, g: s.g || 0, a: s.a || 0, ta: s.ta || 0, tr: s.tr || 0, mvp: s.mvp || 0, fp: s.fp || 0 };
  });
  stats.forEach(s => { if (!usados.has(key(s))) out.push({ ...s }); });
  return out;
}

function build(raw) {
  const filCal = filasDe(raw.cal);
  const cal = parseCal(filCal);
  const ciudades = parseCiudades(filCal);
  const res = parseRes(filasDe(raw.res));
  const tab = parseTab(filasDe(raw.tab));
  const players = mezclar(parsePlantilla(filasDe(raw.plan)), parseStats(filasDe(raw.jug)));
  const teams = [...new Set([...ciudades.map(x => x.name), ...tab.map(x => x.team), ...players.map(x => x.team)])].filter(Boolean);
  return { cal, res, tab, players, teams, ciudades };
}

function datosVacios() {
  return { cal: [], res: [], tab: [], players: [], teams: CONFIG[cat].equipos.slice(), ciudades: [] };
}

/* ---------- ESTADÍSTICAS DERIVADAS ---------- */

function ranking(arr, campo, desc = true) {
  const s = [...arr].sort((a, b) => (desc ? b[campo] - a[campo] : a[campo] - b[campo]) || (a.pj - b.pj) || a.name.localeCompare(b.name, 'es'));
  let pos = 0;
  return s.map((p, i) => { if (i === 0 || p[campo] !== s[i - 1][campo]) pos = i + 1; return { ...p, rank: pos }; });
}

function estadisticas(d) {
  const jugados = d.res.filter(x => norm(x.status) === 'JUGADO');
  const goles = jugados.reduce((s, x) => s + (x.hg || 0) + (x.ag || 0), 0);
  const conPJ = d.tab.filter(x => x.pj > 0);
  const fairTeams = d.teams.map(t => {
    const ps = d.players.filter(p => p.team === t);
    const ta = ps.reduce((s, p) => s + p.ta, 0), tr = ps.reduce((s, p) => s + p.tr, 0);
    return { team: t, ta, tr, idx: ta + tr * 3, pj: (d.tab.find(x => x.team === t) || {}).pj || 0 };
  }).filter(x => x.pj > 0).sort((a, b) => a.idx - b.idx || a.team.localeCompare(b.team, 'es'));
  return {
    jugados, goles,
    pendientes: Math.max(d.cal.length - jugados.length, 0),
    empates: jugados.filter(x => x.hg === x.ag).length,
    golesJug: d.players.reduce((s, p) => s + p.g, 0),
    goleadores: ranking(d.players.filter(p => p.g > 0), 'g'),
    asistentes: ranking(d.players.filter(p => p.a > 0), 'a'),
    mvp: ranking(d.players.filter(p => p.pj > 0), 'mvp'),
    sancionados: ranking(d.players.filter(p => p.ta > 0 || p.tr > 0), 'fp'),
    fairTeams,
    mejorAtaque: conPJ.length ? [...conPJ].sort((a, b) => b.gf - a.gf)[0] : null,
    mejorDefensa: conPJ.length ? [...conPJ].sort((a, b) => a.gc - b.gc)[0] : null,
    mayorDG: conPJ.length ? [...conPJ].sort((a, b) => b.dg - a.dg)[0] : null
  };
}

/* ---------- FORMATO ---------- */

function fechaTxt(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!m) return clean(s);
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return d.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' }).replace(/[.,]/g, '');
}
function horaTxt(s) {
  const m = /^(\d{1,2}):(\d{2})/.exec(s || '');
  if (!m) return clean(s);
  let h = +m[1]; const ap = h >= 12 ? 'p. m.' : 'a. m.'; h = h % 12 || 12;
  return h + ':' + m[2] + ' ' + ap;
}
const FASES = /PLAY-?IN|SEMIFINAL|TERCER|FINAL/i;
function chip(n) {
  if (!n) return '';
  return `<span class="${FASES.test(n) ? 'fase' : 'nota'}">${esc(n)}</span>`;
}
function ini(x) { return esc(clean(x).split(/\s+/).filter(Boolean).slice(0, 2).map(y => y[0]).join('').toUpperCase()); }

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
  if (document.hidden && DATA[cat]) return;
  cargando = true;
  const clave = cat;
  estado('ACTUALIZANDO…');
  try {
    const fallos = await cargarCategoria(clave);
    if (Object.keys(RAW[clave] || {}).length) {
      try { DATA[clave] = build(RAW[clave]); }
      catch (e) { console.error(e); fallos.push({ hoja: 'Interpretación de datos', motivo: e.message }); }
    }
    if (clave === cat) {
      try { render(); } catch (e) { console.error(e); fallos.push({ hoja: 'Dibujo de la página', motivo: e.message }); }
      if (!fallos.length) {
        const h = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        estado('DATOS CONECTADOS · ' + h, 'ok');
        aviso('');
      } else {
        estado('SIN ACTUALIZAR', 'error');
        aviso('No se pudo actualizar (' + CONFIG[clave].nombre + '): ' + fallos.map(f => f.hoja + ' → ' + f.motivo).join(' | ') +
          '. Se muestran los últimos datos disponibles y se reintentará automáticamente.');
      }
    }
  } catch (e) {
    console.error(e);
    if (clave === cat) { estado('SIN ACTUALIZAR', 'error'); aviso('Error inesperado al actualizar ' + CONFIG[clave].nombre + ': ' + e.message); }
  } finally {
    cargando = false;
    if (clave !== cat) load();
  }
}

/* ---------- DIBUJO: PANEL PRINCIPAL ---------- */

const vacio = t => `<div class="empty">${t}</div>`;

function filaTop(x, val, sub) {
  return `<div class="scorer"><div class="rank">${x.rank}</div><div><b>${esc(x.name)}</b><small>${esc(x.team)}${sub ? ' · ' + sub : ''}</small></div><div class="top-val">${val}</div></div>`;
}
const lista = (arr, n, val, sub, msg) => arr.length ? arr.slice(0, n).map(x => filaTop(x, val(x), sub ? sub(x) : '')).join('') : vacio(msg);


function matchHtml(x) {
  const etiqueta = `JORNADA ${x.round || '—'} · PARTIDO ${x.match || '—'}`;
  return `<div class="meta" style="margin-top:14px"><b>${etiqueta}</b> ${chip(x.note)}</div>` +
    `<div class="match"><div class="team"><span class="badge">${ini(x.home) || '?'}</span>${esc(x.home) || 'Por definir'}</div><div><div class="score">VS</div><div class="vs">${esc(fechaTxt(x.date))}${x.time ? ' · ' + esc(horaTxt(x.time)) : ''}</div></div><div class="team"><span class="badge">${ini(x.away) || '?'}</span>${esc(x.away) || 'Por definir'}</div></div>` +
    `<div class="meta">${esc(x.venue) || 'Cancha por definir'}</div>`;
}

function render() {
  const d = DATA[cat] || datosVacios();
  const s = estadisticas(d);
  $('#catTitle').textContent = 'TORNEO ' + CONFIG[cat].nombre;
  $('#videoCat').textContent = cat;
  const pp = $('#plantillas .pagehead p');
  if (pp) pp.textContent = 'Plantilla oficial de cada equipo con dorsal, posición y estadísticas individuales.';
  const pe = $('#estadisticas .pagehead p');
  if (pe) pe.textContent = 'Goleadores, asistencias, MVP, disciplina y datos generales. Se actualizan con cada partido.';

  // Métricas
  const lider = d.tab[0] && d.tab[0].pj > 0 ? d.tab[0] : null;
  const prom = s.jugados.length ? (s.goles / s.jugados.length).toFixed(1) + ' goles por partido' : 'Marcadores oficiales';
  $('#cards').innerHTML = [
    ['PARTIDOS JUGADOS', s.jugados.length, 'de ' + d.cal.length + ' programados'],
    ['PARTIDOS PENDIENTES', s.pendientes, 'Programación restante'],
    ['GOLES REGISTRADOS', s.goles, prom],
    ['LÍDER ACTUAL', lider ? esc(lider.team) : '—', lider ? lider.pts + ' puntos' : 'Aún sin partidos jugados']
  ].map(x => `<div class="metric"><small>${x[0]}</small><strong>${x[1]}</strong><span>${x[2]}</span></div>`).join('');

  const pct = d.cal.length ? Math.round(s.jugados.length / d.cal.length * 100) : 0;
  $('#avTxt').textContent = 'AVANCE DEL TORNEO · ' + s.jugados.length + ' DE ' + d.cal.length + ' PARTIDOS JUGADOS';
  $('#avPct').textContent = pct + '%';
  $('#avBar').style.width = pct + '%';

  // Próximo partido (incluye Play-In / semifinales / final aunque estén "por definir")
  const hechos = new Set(s.jugados.map(x => x.match));
  const proximo = d.cal.find(x => !hechos.has(x.match) && (!x.score || x.score === '-'));
  $('#next').innerHTML = proximo ? matchHtml(proximo) : vacio('No hay próximos partidos programados.');

  // Últimos resultados
  const ult = s.jugados.slice(-4).reverse();
  $('#latest').innerHTML = ult.length
    ? ult.map(x => `<div class="result"><strong>${esc(x.home)}</strong><strong>${x.hg ?? '-'} - ${x.ag ?? '-'}</strong><strong>${esc(x.away)}</strong></div>`).join('')
    : vacio('Aún no hay resultados oficiales.');

  // Clasificación
  $('#mini').innerHTML = d.tab.length
    ? '<div class="minirow mh"><span></span><span>EQUIPO</span><span>PJ</span><span>DG</span><span>PTS</span></div>' + d.tab.slice(0, 8).map((x, i) =>
      `<div class="minirow"><b>${x.pos || (x.pj > 0 ? i + 1 : '–')}</b><span>${esc(x.team)}</span><span>${x.pj}</span><span>${x.dg > 0 ? '+' : ''}${x.dg}</span><b>${x.pts}</b></div>`).join('')
    : vacio('Sin tabla.');

  // Rankings del panel
  $('#topscorers').innerHTML = lista(s.goleadores, 5, x => x.g, null, 'Aún no hay goles registrados por jugador.');
  $('#topassists').innerHTML = lista(s.asistentes, 5, x => x.a, null, 'Aún no hay asistencias registradas.');
  $('#topmvp').innerHTML = lista(s.mvp, 5, x => x.mvp, null, 'El MVP se calcula cuando se juegue el primer partido.');
  $('#topfair').innerHTML = s.fairTeams.length
    ? s.fairTeams.slice(0, 5).map((x, i) => `<div class="minirow" style="grid-template-columns:30px 1fr auto"><b>${i + 1}</b><span>${esc(x.team)}</span><b>${x.ta}🟨 ${x.tr}🟥</b></div>`).join('')
    : vacio('Se mostrará cuando haya partidos jugados.');

  renderComp(panelActual);
  renderTeams(d);
  renderPlayers(d);
  renderStats(d, s);
  renderVideo();
}

/* ---------- COMPETICIÓN ---------- */

function renderComp(panel) {
  panelActual = panel;
  const d = DATA[cat] || datosVacios();
  const p = $('#competitionPanel');

  if (panel === 'tabla') {
    p.innerHTML = d.tab.length
      ? `<div class="card table-wrap"><table class="table"><thead><tr><th>POS.</th><th>EQUIPO</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th><th>ÚLT. 5</th></tr></thead><tbody>${d.tab.map((x, i) =>
        `<tr><td>${x.pos || (x.pj > 0 ? i + 1 : '–')}</td><td><b>${esc(x.team)}</b></td><td>${x.pj}</td><td>${x.pg}</td><td>${x.pe}</td><td>${x.pp}</td><td>${x.gf}</td><td>${x.gc}</td><td>${x.dg}</td><td><b>${x.pts}</b></td><td>${esc(x.ult) || '-'}</td></tr>`).join('')}</tbody></table></div>`
      : vacio('Tabla de posiciones no disponible por ahora.');
    return;
  }

  const calPorPartido = new Map(d.cal.map(x => [x.match, x]));
  let arr;
  if (panel === 'resultados') {
    arr = d.res.filter(x => norm(x.status) === 'JUGADO').map(x => {
      const c = calPorPartido.get(x.match) || {};
      return { ...x, time: c.time || '', venue: c.venue || '', note: x.note || c.note || '' };
    });
  } else arr = d.cal;
  if (!arr.length) { p.innerHTML = vacio(panel === 'resultados' ? 'Aún no hay resultados oficiales.' : 'Sin datos disponibles por ahora.'); return; }

  const grupos = {};
  arr.forEach(x => (grupos[x.round || ''] ??= []).push(x));
  p.innerHTML = '<div class="calendar">' + Object.entries(grupos).map(([j, rs]) =>
    `<div class="round"><div>JORNADA ${esc(j) || '—'}</div>${rs.map(x => {
      const jugado = panel === 'resultados' || (x.score && x.score !== '-');
      const marcador = panel === 'resultados' ? `${x.hg ?? '-'} - ${x.ag ?? '-'}` : (jugado ? esc(x.score) : 'VS');
      const hora = x.time ? `<span class="hr">${esc(horaTxt(x.time))}</span>` : '<span class="hr">Hora por definir</span>';
      return `<div class="game"><div class="gf"><small>${esc(fechaTxt(x.date)) || 'Fecha por definir'} ${hora}</small></div><div class="home">${esc(x.home) || 'Por definir'}</div><div class="score">${marcador}</div><div class="away">${esc(x.away) || 'Por definir'}</div><div class="gl"><small>${esc(x.venue) || 'Cancha por definir'}</small>${x.note ? '<br>' + chip(x.note) : ''}</div></div>`;
    }).join('')}</div>`).join('') + '</div>';
}

/* ---------- EQUIPOS Y PLANTILLAS ---------- */

function renderTeams(d) {
  $('#teams').innerHTML = d.teams.map(x => {
    const t = d.tab.find(y => y.team === x) || {};
    const ciudad = (d.ciudades.find(c => c.name === x) || {}).city;
    const jug = d.players.filter(p => p.team === x);
    const cap = jug.find(p => /CAPIT/.test(nk(p.role)));
    return `<article class="team-card" data-team="${esc(x)}"><div class="team-logo">${ini(x)}</div><h3>${esc(x)}</h3>` +
      `<p>${cat.toUpperCase()} · ${jug.length} JUGADORES${ciudad ? ' · ' + esc(ciudad).toUpperCase() : ''}</p>` +
      `<div class="team-stats"><span>PJ <b>${t.pj || 0}</b></span><span>PTS <b>${t.pts || 0}</b></span><span>DG <b>${t.dg || 0}</b></span></div>` +
      `<p style="margin-top:14px">${cap ? 'CAPITÁN: <b>' + esc(cap.name) + '</b> · ' : ''}VER PLANTILLA →</p></article>`;
  }).join('') || vacio('Sin equipos cargados.');
}

function renderPlayers(d) {
  d = d || datosVacios();
  const f = $('#teamFilter');
  const actual = f.value || 'all';
  f.innerHTML = '<option value="all">Todos los equipos</option>' + d.teams.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join('');
  f.value = [...f.options].some(x => x.value === actual) ? actual : 'all';

  const equipos = f.value === 'all' ? d.teams : [f.value];
  let html = '';
  equipos.forEach(t => {
    const ps = d.players.filter(p => p.team === t);
    if (!ps.length) return;
    html += `<div class="grupo-eq">${esc(t)}<span>${ps.length} JUGADORES</span></div>`;
    html += ps.map(x => {
      const est = x.pj > 0 ? `<small>PJ ${x.pj} · ⚽ ${x.g} · 🅰️ ${x.a} · 🟨 ${x.ta} · 🟥 ${x.tr}</small>` : '';
      return `<article class="player"><div class="number">#${esc(x.number) || '—'}</div><div><b>${esc(x.name)}</b><small>${esc(x.role) || 'Posición no registrada'}</small>${est}</div></article>`;
    }).join('');
  });
  $('#players').innerHTML = html || vacio('No hay jugadores registrados todavía. Se leen de la lista de plantillas en la hoja CALENDARIO.');
}

/* ---------- ESTADÍSTICAS ---------- */

function tabla(cab, filas) {
  return `<div class="table-wrap"><table class="table"><thead><tr>${cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${filas.join('')}</tbody></table></div>`;
}
const fila = celdas => `<tr>${celdas.map(c => `<td>${c}</td>`).join('')}</tr>`;
const tarjeta = (titulo, cuerpo) => `<article class="card"><header><b>${titulo}</b></header>${cuerpo}</article>`;

function renderStats(d, s) {
  const cont = $('#estadisticas .statsgrid');
  if (!cont) return;
  const hay = s.jugados.length > 0;
  const m = (t, v, sub) => `<div class="metric"><small>${t}</small><strong>${v}</strong><span>${sub}</span></div>`;
  const sin = 'Sin partidos jugados';
  const generales = `<div class="cards" style="grid-column:1/-1;margin:0">` + [
    m('PARTIDOS JUGADOS', s.jugados.length, 'de ' + d.cal.length),
    m('GOLES', s.goles, hay ? (s.goles / s.jugados.length).toFixed(2) + ' por partido' : sin),
    m('EMPATES', hay ? s.empates : '—', hay ? 'Partidos empatados' : sin),
    m('GOLES POR JUGADOR', hay ? s.golesJug : '—', hay ? (s.golesJug === s.goles ? 'Coincide con los marcadores' : 'Marcador oficial: ' + s.goles) : sin),
    m('MEJOR ATAQUE', s.mejorAtaque ? esc(s.mejorAtaque.team) : '—', s.mejorAtaque ? s.mejorAtaque.gf + ' goles a favor' : sin),
    m('MEJOR DEFENSA', s.mejorDefensa ? esc(s.mejorDefensa.team) : '—', s.mejorDefensa ? s.mejorDefensa.gc + ' goles en contra' : sin),
    m('MAYOR DIFERENCIA', s.mayorDG ? esc(s.mayorDG.team) : '—', s.mayorDG ? (s.mayorDG.dg > 0 ? '+' : '') + s.mayorDG.dg + ' de diferencia' : sin)
  ].join('') + `</div>`;

  const gol = s.goleadores.length ? tabla(['POS.', 'JUGADOR', 'EQUIPO', 'GOLES', 'PJ', 'GOL/PJ'],
    s.goleadores.slice(0, 10).map(x => fila([x.rank, `<b>${esc(x.name)}</b>`, esc(x.team), `<b>${x.g}</b>`, x.pj, x.pj ? (x.g / x.pj).toFixed(2) : '-']))) : vacio('Aún no hay goles registrados.');
  const asi = s.asistentes.length ? tabla(['POS.', 'JUGADOR', 'EQUIPO', 'ASIST.', 'PJ'],
    s.asistentes.slice(0, 10).map(x => fila([x.rank, `<b>${esc(x.name)}</b>`, esc(x.team), `<b>${x.a}</b>`, x.pj]))) : vacio('Aún no hay asistencias registradas.');
  const mvp = s.mvp.length ? tabla(['POS.', 'JUGADOR', 'EQUIPO', 'PJ', 'PUNTOS'],
    s.mvp.slice(0, 10).map(x => fila([x.rank, `<b>${esc(x.name)}</b>`, esc(x.team), x.pj, `<b>${x.mvp}</b>`]))) : vacio('El MVP se calcula desde el primer partido.');
  const dis = s.sancionados.length ? tabla(['JUGADOR', 'EQUIPO', '🟨', '🟥', 'ÍNDICE'],
    s.sancionados.map(x => fila([`<b>${esc(x.name)}</b>`, esc(x.team), x.ta, x.tr, x.fp]))) : vacio('Sin tarjetas registradas hasta ahora.');
  const fair = s.fairTeams.length ? tabla(['POS.', 'EQUIPO', '🟨', '🟥', 'ÍNDICE'],
    s.fairTeams.map((x, i) => fila([i + 1, `<b>${esc(x.team)}</b>`, x.ta, x.tr, x.idx]))) : vacio('Se mostrará cuando haya partidos jugados.');

  cont.innerHTML = generales + tarjeta('GOLEADORES', gol) + tarjeta('ASISTENCIAS', asi) + tarjeta('MVP DEL TORNEO', mvp) +
    tarjeta('FAIR PLAY POR EQUIPO · MENOR ÍNDICE ES MEJOR', fair) + tarjeta('JUGADORES CON TARJETAS · ÍNDICE = AMARILLAS + 3 × ROJAS', dis);
}

/* ---------- VIDEO ---------- */

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


function iniciar() {
  $$('nav button').forEach(b => b.onclick = () => go(b.dataset.section));
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-go]');
    if (b) { go(b.dataset.go); if (b.dataset.panelGo) { const tb = $('.tabs button[data-panel="' + b.dataset.panelGo + '"]'); if (tb) tb.click(); } return; }
    const t = e.target.closest('[data-team]');
    if (t) { $('#teamFilter').value = t.dataset.team; renderPlayers(DATA[cat] || datosVacios()); go('plantillas'); }
  });
  $$('.cat').forEach(b => b.onclick = () => {
    $$('.cat').forEach(x => x.classList.remove('activo'));
    b.classList.add('activo');
    cat = b.dataset.cat;
    $('#teamFilter').value = 'all';
    render();
    load();
  });
  $$('.tabs button').forEach(b => b.onclick = () => {
    $$('.tabs button').forEach(x => x.classList.remove('sel'));
    b.classList.add('sel');
    renderComp(b.dataset.panel);
  });
  $('#teamFilter').onchange = () => renderPlayers(DATA[cat] || datosVacios());
  $('#menubtn').onclick = () => $('#nav').classList.toggle('abierto');
  render();
  load();
  setInterval(load, INTERVALO);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) load(); });
}

if (typeof module !== 'undefined' && module.exports) module.exports = { build, estadisticas, filasDe, celda };
else iniciar();
