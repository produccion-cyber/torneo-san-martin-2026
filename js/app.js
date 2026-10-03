/* =========================================================
   TORNEO SAN MARTÍN 2026 · app.js
   - Lectura en tiempo real de Google Sheets (gviz JSONP)
   - Extracción de plantillas desde la hoja CALENDARIO
     (tabla: Equipo | Jugador | Dorsal | Posición)
   - Integración de escudos, logos e imágenes oficiales
   - Tolerancia a fallos y respaldo sin dependencias
   ========================================================= */

const TIEMPO_ESPERA = 15000;
const TIEMPO_ESPERA_XLSX = 25000;
const INTERVALO = 120000;

// Zonas que se leen de cada hoja
const HOJAS = [
  { k: 'cal',  hoja: 'CALENDARIO',       rango: 'A1:X120' }, // Partidos (A:K), Ciudades (N:P) y Plantillas (R:U)
  { k: 'plan', hoja: 'CALENDARIO',       rango: 'R1:U120' }, // Tabla específica de nóminas
  { k: 'res',  hoja: 'RESULTADOS',       rango: 'A1:M60' },  // Marcadores y estado
  { k: 'tab',  hoja: 'TABLA_POSICIONES', rango: 'A1:N40' },  // Clasificación oficial
  { k: 'jug',  hoja: 'JUGADORES',        rango: 'P1:AE150' } // Resumen de estadísticas
];

const CONFIG = {
  masculino: {
    nombre: 'MASCULINO',
    id: '1mCMBHkh_Kg98IdgbKu8fPpqh8it_OCAn_aqA2BDSE1E',
    video: 'https://www.youtube.com/embed/cjn7Y9CnVTQ?rel=0',
    videoBadge: 'EDICIÓN MASCULINA',
    videoTitle: 'PRESENTACIÓN OFICIAL',
    videoDesc: 'Cinco equipos disputando el título oficial 2026 de San Martín Lácteos.',
    equipos: ['BAYERN MUU FC', 'ADMIN UNITED FC', 'REAL SAN MARTIN FC', 'ULTIMA MILLA FC', 'LOS PROBIÓTICOS FC'],
    plantillaBase: [
      { team: 'ADMIN UNITED FC', name: 'Hernández C.', number: '8', role: 'Capitán' },
      { team: 'ADMIN UNITED FC', name: 'Aguirre', number: '1', role: 'Portero' },
      { team: 'ADMIN UNITED FC', name: 'Urrea', number: '2', role: 'Defensa' },
      { team: 'ADMIN UNITED FC', name: 'Atehortua', number: '74', role: 'Delantero' },
      { team: 'ADMIN UNITED FC', name: 'Orozco A.', number: '6', role: 'Medio Campista' },
      { team: 'ADMIN UNITED FC', name: 'Osorio C.', number: '22', role: 'Medio Campista' },
      { team: 'ADMIN UNITED FC', name: 'Gomez A.', number: '4', role: 'Medio Campista' },
      { team: 'ADMIN UNITED FC', name: 'Rios', number: '99', role: 'Defensa, Portero' },
      { team: 'ADMIN UNITED FC', name: 'Bustos', number: '10', role: 'Medio Campista' },
      { team: 'ADMIN UNITED FC', name: 'Gonzáles', number: '5', role: 'Defensa, Mediocampista' },
      { team: 'ULTIMA MILLA FC', name: 'Rivera', number: '7', role: 'Capitán' },
      { team: 'ULTIMA MILLA FC', name: 'Velazquez', number: '6', role: 'Portero' },
      { team: 'ULTIMA MILLA FC', name: 'Castro M.', number: '20', role: 'Defensa' },
      { team: 'ULTIMA MILLA FC', name: 'Navarro C.', number: '11', role: 'Portero, Defensa' },
      { team: 'ULTIMA MILLA FC', name: 'Pérez', number: '16', role: 'Cualquier posición' },
      { team: 'ULTIMA MILLA FC', name: 'Quintero', number: '9', role: 'Defensa' },
      { team: 'ULTIMA MILLA FC', name: 'Sanchez', number: '10', role: 'Cualquier posición' },
      { team: 'LOS PROBIÓTICOS FC', name: 'Viloria', number: '7', role: 'Capitán' },
      { team: 'LOS PROBIÓTICOS FC', name: 'Escalona', number: '1', role: 'Portero' },
      { team: 'LOS PROBIÓTICOS FC', name: 'Soto Z.', number: '20', role: 'Mediocampista' },
      { team: 'LOS PROBIÓTICOS FC', name: 'Navarro A.', number: '10', role: 'Delantero' },
      { team: 'LOS PROBIÓTICOS FC', name: 'Arteaga', number: '4', role: 'Cualquier posición' },
      { team: 'LOS PROBIÓTICOS FC', name: 'Ramirez L.', number: '6', role: 'Cualquier posición' },
      { team: 'LOS PROBIÓTICOS FC', name: 'Alvarez', number: '9', role: 'Cualquier posición' },
      { team: 'BAYERN MUU FC', name: 'Albino', number: '11', role: 'Capitán' },
      { team: 'BAYERN MUU FC', name: 'Ardila', number: '1', role: 'Portero' },
      { team: 'BAYERN MUU FC', name: 'Rodriguez', number: '15', role: 'Defensa' },
      { team: 'BAYERN MUU FC', name: 'Delprado', number: '7', role: 'Delantero' },
      { team: 'BAYERN MUU FC', name: 'Sanchez M.', number: '20', role: 'Cualquier posición' },
      { team: 'BAYERN MUU FC', name: 'Urrego', number: '9', role: 'Mediocampista' },
      { team: 'BAYERN MUU FC', name: 'Palacio', number: '5', role: 'Defensa' },
      { team: 'BAYERN MUU FC', name: 'Ramirez', number: '47', role: 'Cualquier posición' },
      { team: 'BAYERN MUU FC', name: 'Marín C.', number: '19', role: 'Defensa' },
      { team: 'REAL SAN MARTIN FC', name: 'Acosta', number: '10', role: 'Capitán' },
      { team: 'REAL SAN MARTIN FC', name: 'Pineda', number: '96', role: 'Delantero, Portero' },
      { team: 'REAL SAN MARTIN FC', name: 'Gallego', number: '21', role: 'Mediocampista' },
      { team: 'REAL SAN MARTIN FC', name: 'Soto H.', number: '80', role: 'Mediocampista' },
      { team: 'REAL SAN MARTIN FC', name: 'Echeverry', number: '17', role: 'Defensa, Mediocampista, Delantero' },
      { team: 'REAL SAN MARTIN FC', name: 'Bohorquez', number: '7', role: 'Mediocampista, Delantero' },
      { team: 'REAL SAN MARTIN FC', name: 'Orozco J.', number: '23', role: 'Mediocampista' },
      { team: 'REAL SAN MARTIN FC', name: 'Espitia', number: '5', role: 'Defensa' }
    ]
  },
  femenino: {
    nombre: 'FEMENINO',
    id: '1YgQ8hXwvrV8tDmQtzRgrdDinkAM8U9coaxXuBe7JqHM',
    publicado: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvjdSukLjlJb9bk9BYCbl0NAsLfl49pnF1njIw2mCyODC15kBRcIHRL3iAM_nE44bRuPPIats-QOcy/pub',
    video: 'https://www.youtube.com/embed/UkpKEy84rO8?rel=0',
    videoBadge: 'EDICIÓN FEMENINA',
    videoTitle: 'PRESENTACIÓN OFICIAL',
    videoDesc: 'Tres escuadras disputando la corona oficial 2026 de San Martín Lácteos.',
    equipos: ['MONARCA FC', 'INTER LÁCTEOS FC', 'ÉLITE FC'],
    plantillaBase: [
      { team: 'MONARCA FC', name: 'Gonzales', number: '22', role: 'Capitana' },
      { team: 'MONARCA FC', name: 'Murillo', number: '28', role: 'Mediocampista' },
      { team: 'MONARCA FC', name: 'Giraldo', number: '5', role: 'Mediocampista' },
      { team: 'MONARCA FC', name: 'García', number: '10', role: 'Defensa' },
      { team: 'MONARCA FC', name: 'Valencia T.', number: '4', role: 'Defensa' },
      { team: 'MONARCA FC', name: 'Gomez B.', number: '2', role: 'Defensa' },
      { team: 'MONARCA FC', name: 'Betancurt', number: '8', role: 'Defensa' },
      { team: 'MONARCA FC', name: 'Marquez', number: '3', role: 'Defensa' },
      { team: 'MONARCA FC', name: 'Osorio', number: '18', role: 'Cualquier posición' },
      { team: 'INTER LÁCTEOS FC', name: 'Muñoz T', number: '12', role: 'Capitana' },
      { team: 'INTER LÁCTEOS FC', name: 'Guzmán', number: '9', role: 'Mediocampista' },
      { team: 'INTER LÁCTEOS FC', name: 'Lugo M.', number: '23', role: 'Cualquier posición' },
      { team: 'INTER LÁCTEOS FC', name: 'Oquendo', number: '22', role: 'Defensa' },
      { team: 'INTER LÁCTEOS FC', name: 'Valencia A.', number: '25', role: 'Mediocampista' },
      { team: 'INTER LÁCTEOS FC', name: 'Rojas', number: '4', role: 'Cualquier posición' },
      { team: 'INTER LÁCTEOS FC', name: 'Cruz G.', number: '24', role: 'Mediocampista' },
      { team: 'INTER LÁCTEOS FC', name: 'Toro', number: '11', role: 'Delantero' },
      { team: 'INTER LÁCTEOS FC', name: 'Ceballos', number: '10', role: 'Cualquier posición' },
      { team: 'INTER LÁCTEOS FC', name: 'Agudelo', number: '26', role: 'Mediocampista' },
      { team: 'ÉLITE FC', name: 'Rendón', number: '9', role: 'Capitana' },
      { team: 'ÉLITE FC', name: 'Triana', number: '7', role: 'Cualquier posición' },
      { team: 'ÉLITE FC', name: 'Uribe', number: '2', role: 'Cualquier posición' },
      { team: 'ÉLITE FC', name: 'Carmona', number: '10', role: 'Cualquier posición' },
      { team: 'ÉLITE FC', name: 'Castro M.', number: '14', role: 'Cualquier posición' },
      { team: 'ÉLITE FC', name: 'Sanchez T.', number: '15', role: 'Cualquier posición' },
      { team: 'ÉLITE FC', name: 'Ladino', number: '8', role: 'Cualquier posición' },
      { team: 'ÉLITE FC', name: 'Muñoz P.', number: '17', role: 'Cualquier posición' },
      { team: 'ÉLITE FC', name: 'Soto A.', number: '5', role: 'Cualquier posición' }
    ]
  }
};

const TEAM_LOGOS = {
  'ADMIN UNITED FC': 'img/ADMIN UNITED FC.jpg',
  'BAYERN MUU FC': 'img/BAYERN MUU FC.jpg',
  'INTER LACTEOS FC': 'img/INTER LÁCTEOS FC.jpg',
  'LOS PROBIOTICOS FC': 'img/LOS PROBIÓTICOS FC.jpg',
  'MONARCA FC': 'img/MONARCAS FC.jpg',
  'MONARCAS FC': 'img/MONARCAS FC.jpg',
  'REAL SAN MARTIN FC': 'img/REAL SAN MARTIN FC.jpg',
  'ULTIMA MILLA FC': 'img/ULTIMA MILLA FC.jpg',
  'ELITE FC': 'img/ÉLITE FC.jpg'
};

function getTeamLogo(team) {
  const k = nk(team || '');
  for (const [key, path] of Object.entries(TEAM_LOGOS)) {
    if (k.includes(nk(key)) || nk(key).includes(k)) return path;
  }
  return '';
}

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
const nk = v => norm(v).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const esc = v => clean(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const p2 = n => String(n).padStart(2, '0');

const cleanDorsal = v => {
  const s = clean(v);
  if (!s) return '';
  const n = Number(s);
  return Number.isFinite(n) ? String(Math.round(n)) : s;
};

const limpiarPos = v => {
  const t = clean(v);
  if (!t || t === '0') return 'Cualquier posición';
  return t;
};

function canonEquipo(team) {
  const k = nk(team || '');
  if (k.includes('BAYERN')) return 'BAYERN MUU FC';
  if (k.includes('ADMIN')) return 'ADMIN UNITED FC';
  if (k.includes('ULTIMA') || k.includes('MILLA')) return 'ULTIMA MILLA FC';
  if (k.includes('PROBIOTIC')) return 'LOS PROBIÓTICOS FC';
  if (k.includes('REAL') && k.includes('SAN MARTIN')) return 'REAL SAN MARTIN FC';
  if (k.includes('MONARCA')) return 'MONARCA FC';
  if (k.includes('INTER') && k.includes('LACTEO')) return 'INTER LÁCTEOS FC';
  if (k.includes('ELITE')) return 'ÉLITE FC';
  return clean(team);
}

function esNombreValido(n) {
  if (!n) return false;
  const t = clean(n);
  if (t.length < 2) return false;
  if (/^\d+(\.\d+)?$/.test(t)) return false; // descartar números solos (1, 2, 4...)
  if (/#REF!|#N\/A|#VALUE!|#NAME\?/i.test(t)) return false;
  const k = nk(t);
  if (/^(JORNADA|JUGADOR|EQUIPO|CODIGO|RESUMEN|TOTAL|FECHA|PARTIDO|GOL|ASISTENCIA|DORSAL|POSICION|GOL OFICIAL)$/i.test(k)) return false;
  return true;
}

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
    sc.onload = () => setTimeout(() => fallar('Google no entregó datos (archivo no público)'), 600);
    sc.src = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=' + encodeURIComponent('responseHandler:' + cb) +
      '&sheet=' + encodeURIComponent(nombre) + (rango ? '&range=' + encodeURIComponent(rango) : '') + '&headers=1&_=' + Date.now();
    document.head.appendChild(sc);
  });
}

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

function filasDe(t) {
  if (!t) return [];
  const cab = (t.cols || []).map(c => (c && c.label) ? c.label : '');
  return [cab, ...rows(t)];
}

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
    if (!Object.values(ix).some(k => clean(r[k]) !== '')) break;
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

function ordenarTabla(tab) {
  const arr = [...tab];
  arr.sort((a, b) => {
    // 1. Puntos descendente
    if (b.pts !== a.pts) return b.pts - a.pts;
    // 2. Diferencia de goles descendente
    if (b.dg !== a.dg) return b.dg - a.dg;
    // 3. Goles a favor descendente
    if (b.gf !== a.gf) return b.gf - a.gf;
    // 4. Menor cantidad de goles en contra
    if (a.gc !== b.gc) return a.gc - b.gc;
    // 5. Mayor partidos ganados
    if (b.pg !== a.pg) return b.pg - a.pg;
    // 6. Orden alfabético
    return a.team.localeCompare(b.team, 'es');
  });
  // Asignar posición estricta del 1° al último
  return arr.map((x, i) => ({
    ...x,
    pos: i + 1
  }));
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
      orden: out.length, pos: num(r[E - 2]), team: canonEquipo(team), pj: num(r[E + 1]), pg: num(r[E + 2]), pe: num(r[E + 3]), pp: num(r[E + 4]),
      gf: num(r[E + 5]), gc: num(r[E + 6]), dg: num(r[E + 7]), pts: num(r[E + 8]),
      ult: clean(r[h.col['ULTIMOS 5'] != null ? h.col['ULTIMOS 5'] : E + 10]),
      estado: clean(r[h.col.ESTADO != null ? h.col.ESTADO : E + 11])
    });
  }
  return ordenarTabla(out);
}

/*
   Extracción de plantilla:
   Busca la tabla oficial con encabezados Equipo | Jugador | Dorsal | Posición
   en la hoja CALENDARIO. Se detiene ante tablas de control y filtra anomalías.
*/
function parsePlantilla(a) {
  if (!a || !a.length) return [];
  const h = buscarEnc(a, ['EQUIPO', 'JUGADOR', 'DORSAL', 'POSICION'], ['EQUIPO', 'JUGADOR'], 2);
  if (!h) return [];
  const E = h.col.EQUIPO;
  const J = h.col.JUGADOR;
  const D = h.col.DORSAL != null ? h.col.DORSAL : J + 1;
  const P = h.col.POSICION != null ? h.col.POSICION : J + 2;
  const out = [];
  for (let i = h.fila + 1; i < a.length; i++) {
    const r = a[i] || [];
    const rawName = clean(r[J]);
    const rawTeam = clean(r[E]);
    if (nk(rawName) === 'JORNADA' || nk(rawTeam) === 'JORNADA') break;
    if (!esNombreValido(rawName) || !rawTeam) continue;
    const team = canonEquipo(rawTeam);
    out.push({
      team,
      name: rawName,
      number: cleanDorsal(r[D]),
      role: limpiarPos(r[P])
    });
  }
  return out;
}

function parseStats(a) {
  const h = buscarEnc(a, ['JUGADOR', 'EQUIPO', 'DORSAL', 'POSICION', 'PJ', 'GOLES', 'ASISTENCIAS', 'TA', 'TR', 'MVP SCORE', 'INDICE FAIR PLAY'], ['JUGADOR', 'EQUIPO'], 2, c => c.EQUIPO === c.JUGADOR + 1);
  if (!h) return [];
  const Q = h.col.JUGADOR, g = (n, o) => h.col[n] != null ? h.col[n] : Q + o;
  const out = [];
  for (let i = h.fila + 1; i < a.length; i++) {
    const r = a[i] || [];
    const rawName = clean(r[Q]);
    const rawTeam = clean(r[g('EQUIPO', 1)]);
    if (nk(rawName) === 'JORNADA' || nk(rawTeam) === 'EQUIPO') break;
    if (!esNombreValido(rawName)) continue;
    const team = canonEquipo(rawTeam);
    if (!team) continue;
    const p = {
      team,
      name: rawName,
      number: cleanDorsal(r[g('DORSAL', 2)]),
      role: limpiarPos(r[g('POSICION', 3)]),
      pj: num(r[g('PJ', 4)]),
      g: num(r[g('GOLES', 5)]),
      a: num(r[g('ASISTENCIAS', 6)]),
      ta: num(r[g('TA', 7)]),
      tr: num(r[g('TR', 8)]),
      mvp: num(r[g('MVP SCORE', 9)])
    };
    const fp = clean(r[g('INDICE FAIR PLAY', 13)]);
    p.fp = fp === '' ? p.ta + p.tr * 3 : num(fp);
    out.push(p);
  }
  return out;
}

function mezclar(roster, stats) {
  const key = p => nk(p.team) + '|' + nk(p.name);
  const mapa = new Map(stats.map(s => [key(s), s]));
  const usados = new Set();
  const out = roster.map(r => {
    const s = mapa.get(key(r)) || {};
    usados.add(key(r));
    return {
      ...r,
      number: r.number || s.number || '',
      role: r.role || s.role || 'Cualquier posición',
      pj: s.pj || 0,
      g: s.g || 0,
      a: s.a || 0,
      ta: s.ta || 0,
      tr: s.tr || 0,
      mvp: s.mvp || 0,
      fp: s.fp != null ? s.fp : ((s.ta || 0) + (s.tr || 0) * 3)
    };
  });
  stats.forEach(s => {
    if (!usados.has(key(s)) && esNombreValido(s.name) && s.team) {
      out.push({ ...s });
    }
  });
  return out;
}

function build(raw) {
  const filCal = filasDe(raw.cal);
  const cal = parseCal(filCal);
  const ciudades = parseCiudades(filCal);
  const res = parseRes(filasDe(raw.res));
  const tab = parseTab(filasDe(raw.tab));

  // 1. Plantilla base oficial (extraída directamente de los Excel del torneo)
  const base = (CONFIG[cat].plantillaBase || []).slice();

  // 2. Extrae nóminas en vivo desde la hoja CALENDARIO
  const fromPlan = parsePlantilla(filasDe(raw.plan));
  const fromCal = parsePlantilla(filCal);

  // 3. Fusiona asegurando que solo jugadores válidos ingresen
  const rosterMap = new Map();
  base.forEach(p => {
    if (esNombreValido(p.name)) {
      rosterMap.set(nk(p.team) + '|' + nk(p.name), {
        team: canonEquipo(p.team),
        name: clean(p.name),
        number: cleanDorsal(p.number),
        role: limpiarPos(p.role)
      });
    }
  });

  [...fromCal, ...fromPlan].forEach(p => {
    if (!esNombreValido(p.name)) return;
    const team = canonEquipo(p.team);
    const k = nk(team) + '|' + nk(p.name);
    const prev = rosterMap.get(k) || {};
    rosterMap.set(k, {
      team: team || prev.team,
      name: p.name || prev.name,
      number: p.number || prev.number || '',
      role: (p.role && p.role !== '0' ? p.role : prev.role) || 'Cualquier posición'
    });
  });

  const roster = [...rosterMap.values()];
  const stats = parseStats(filasDe(raw.jug));
  const players = mezclar(roster, stats);

  const teams = [...new Set([...CONFIG[cat].equipos, ...ciudades.map(x => x.name), ...tab.map(x => x.team), ...players.map(x => x.team)])].map(canonEquipo).filter(Boolean);
  return { cal, res, tab, players, teams: [...new Set(teams)], ciudades };
}

function datosVacios() {
  const base = (CONFIG[cat].plantillaBase || []).map(p => ({ ...p, pj: 0, g: 0, a: 0, ta: 0, tr: 0, mvp: 0, fp: 0 }));
  const eq = CONFIG[cat].equipos.slice().sort((a, b) => a.localeCompare(b, 'es'));
  const tab = eq.map((t, i) => ({
    pos: i + 1, team: t, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0, ult: '', estado: ''
  }));
  return { cal: [], res: [], tab, players: base, teams: eq, ciudades: [] };
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
    const ta = ps.reduce((s, p) => s + (p.ta || 0), 0), tr = ps.reduce((s, p) => s + (p.tr || 0), 0);
    return { team: t, ta, tr, idx: ta + tr * 3, pj: (d.tab.find(x => x.team === t) || {}).pj || 0 };
  }).filter(x => x.pj > 0).sort((a, b) => a.idx - b.idx || a.team.localeCompare(b.team, 'es'));
  return {
    jugados, goles,
    pendientes: Math.max(d.cal.length - jugados.length, 0),
    empates: jugados.filter(x => x.hg === x.ag).length,
    golesJug: d.players.reduce((s, p) => s + (p.g || 0), 0),
    goleadores: ranking(d.players.filter(p => p.g > 0), 'g'),
    asistentes: ranking(d.players.filter(p => p.a > 0), 'a'),
    mvp: ranking(d.players.filter(p => p.pj > 0), 'mvp'),
    sancionados: ranking(d.players.filter(p => (p.ta > 0) || (p.tr > 0)), 'fp'),
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

function badgeHtml(team) {
  const logo = getTeamLogo(team);
  const initials = ini(team) || '?';
  if (logo) {
    return `<div class="team-badge-wrap"><img class="badge-img" src="${esc(logo)}" alt="${esc(team)}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span class="badge" style="display:none">${initials}</span></div>`;
  }
  return `<span class="badge">${initials}</span>`;
}

function teamTag(name, isHome = true) {
  const logo = getTeamLogo(name);
  const img = logo ? `<img class="game-team-logo" src="${esc(logo)}" alt="${esc(name)}">` : '';
  return isHome ? `${esc(name) || 'Por definir'} ${img}` : `${img} ${esc(name) || 'Por definir'}`;
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
  const logo = getTeamLogo(x.team);
  const mini = logo ? `<img class="mini-table-logo" src="${esc(logo)}" alt="${esc(x.team)}">` : '';
  return `<div class="scorer"><div class="rank">${x.rank}</div><div><b>${esc(x.name)}</b><small style="display:flex;align-items:center;margin-top:3px">${mini}${esc(x.team)}${sub ? ' · ' + sub : ''}</small></div><div class="top-val">${val}</div></div>`;
}

const lista = (arr, n, val, sub, msg) => arr.length ? arr.slice(0, n).map(x => filaTop(x, val(x), sub ? sub(x) : '')).join('') : vacio(msg);

function matchHtml(x) {
  const etiqueta = `JORNADA ${x.round || '—'} · PARTIDO ${x.match || '—'}`;
  return `<div class="meta" style="margin-top:14px"><b>${etiqueta}</b> ${chip(x.note)}</div>` +
    `<div class="match"><div class="team">${badgeHtml(x.home)}${esc(x.home) || 'Por definir'}</div><div><div class="score">VS</div><div class="vs">${esc(fechaTxt(x.date))}${x.time ? ' · ' + esc(horaTxt(x.time)) : ''}</div></div><div class="team">${badgeHtml(x.away)}${esc(x.away) || 'Por definir'}</div></div>` +
    `<div class="meta">${esc(x.venue) || 'Cancha por definir'}</div>`;
}

function render() {
  document.body.classList.remove('tema-masculino', 'tema-femenino');
  document.body.classList.add('tema-' + cat);

  const d = DATA[cat] || datosVacios();
  const s = estadisticas(d);
  $('#catTitle').textContent = 'TORNEO ' + CONFIG[cat].nombre;
  $('#videoCat').textContent = cat;

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

  const hechos = new Set(s.jugados.map(x => x.match));
  const proximo = d.cal.find(x => !hechos.has(x.match) && (!x.score || x.score === '-'));
  $('#next').innerHTML = proximo ? matchHtml(proximo) : vacio('No hay próximos partidos programados.');

  const ult = s.jugados.slice(-4).reverse();
  $('#latest').innerHTML = ult.length
    ? ult.map(x => `<div class="result"><strong>${esc(x.home)}</strong><strong>${x.hg ?? '-'} - ${x.ag ?? '-'}</strong><strong>${esc(x.away)}</strong></div>`).join('')
    : vacio('Aún no hay resultados oficiales.');

  $('#mini').innerHTML = d.tab.length
    ? '<div class="minirow mh"><span>POS</span><span>EQUIPO</span><span>PJ</span><span>DG</span><span>PTS</span></div>' + d.tab.map(x => {
      const logo = getTeamLogo(x.team);
      const miniImg = logo ? `<img class="mini-table-logo" src="${esc(logo)}" alt="${esc(x.team)}">` : '';
      const isLeader = x.pos === 1 && x.pj > 0;
      const leaderBadge = isLeader ? '<span class="badge-lider">LÍDER</span>' : '';
      const posClass = x.pos === 1 ? 'pos-lider' : (x.pos <= 2 ? 'pos-clasif' : '');
      return `<div class="minirow ${posClass}"><b>${x.pos}°</b><span style="display:flex;align-items:center">${miniImg}<b>${esc(x.team)}</b>${leaderBadge}</span><span>${x.pj}</span><span>${x.dg > 0 ? '+' : ''}${x.dg}</span><b class="mini-pts">${x.pts}</b></div>`;
    }).join('')
    : vacio('Sin tabla.');

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
      ? `<div class="card table-wrap"><table class="table"><thead><tr><th>POS.</th><th>EQUIPO</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th><th>ESTADO</th><th>ÚLT. 5</th></tr></thead><tbody>${d.tab.map(x => {
        const logo = getTeamLogo(x.team);
        const mini = logo ? `<img class="mini-table-logo" src="${esc(logo)}" alt="${esc(x.team)}">` : '';
        const isLeader = x.pos === 1 && x.pj > 0;
        const leaderBadge = isLeader ? ' <span class="badge-lider">LÍDER</span>' : '';
        const rowClass = x.pos === 1 ? 'row-lider' : '';
        return `<tr class="${rowClass}"><td><b>${x.pos}°</b></td><td><span style="display:flex;align-items:center">${mini}<b>${esc(x.team)}</b>${leaderBadge}</span></td><td>${x.pj}</td><td>${x.pg}</td><td>${x.pe}</td><td>${x.pp}</td><td>${x.gf}</td><td>${x.gc}</td><td>${x.dg > 0 ? '+' : ''}${x.dg}</td><td><b class="mini-pts">${x.pts}</b></td><td>${esc(x.estado) || (x.pj > 0 ? 'En competencia' : 'Sin partidos')}</td><td>${esc(x.ult) || '-'}</td></tr>`;
      }).join('')}</tbody></table></div>`
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
      return `<div class="game"><div class="gf"><small>${esc(fechaTxt(x.date)) || 'Fecha por definir'} ${hora}</small></div><div class="home">${teamTag(x.home, true)}</div><div class="score">${marcador}</div><div class="away">${teamTag(x.away, false)}</div><div class="gl"><small>${esc(x.venue) || 'Cancha por definir'}</small>${x.note ? '<br>' + chip(x.note) : ''}</div></div>`;
    }).join('')}</div>`).join('') + '</div>';
}

/* ---------- EQUIPOS Y PLANTILLAS ---------- */

function renderTeams(d) {
  $('#teams').innerHTML = d.teams.map(x => {
    const t = d.tab.find(y => y.team === x) || {};
    const ciudad = (d.ciudades.find(c => c.name === x) || {}).city;
    const jug = d.players.filter(p => p.team === x);
    const cap = jug.find(p => /CAPIT/.test(nk(p.role)));
    const logo = getTeamLogo(x);
    const logoHtml = logo
      ? `<img class="team-card-img" src="${esc(logo)}" alt="${esc(x)}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="team-logo" style="display:none">${ini(x)}</div>`
      : `<div class="team-logo">${ini(x)}</div>`;
    return `<article class="team-card" data-team="${esc(x)}"><div class="team-logo-container">${logoHtml}</div><h3>${esc(x)}</h3>` +
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
    const ps = d.players.filter(p => p.team === t && esNombreValido(p.name));
    if (!ps.length) return;
    const logo = getTeamLogo(t);
    const miniLogo = logo ? `<img class="group-mini-logo" src="${esc(logo)}" alt="${esc(t)}">` : '';
    html += `<div class="grupo-eq">${miniLogo}${esc(t)}<span>${ps.length} JUGADORES REGISTRADOS</span></div>`;
    html += ps.map(x => {
      const statsBadge = x.pj > 0
        ? `<div class="player-stats"><span>PJ: ${x.pj}</span><span>⚽ ${x.g}</span><span>🅰️ ${x.a}</span><span>🟨 ${x.ta}</span><span>🟥 ${x.tr}</span></div>`
        : '';
      const numDorsal = x.number ? '#' + esc(x.number) : '#—';
      return `<article class="player"><div class="number">${numDorsal}</div><div><b>${esc(x.name)}</b><small>${esc(x.role) || 'Cualquier posición'}</small>${statsBadge}</div></article>`;
    }).join('');
  });
  $('#players').innerHTML = html || vacio('No hay jugadores registrados todavía. Se leen de la tabla Equipo | Jugador | Dorsal | Posición en la hoja CALENDARIO.');
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

  const tablaClasif = d.tab.length
    ? `<div class="table-wrap"><table class="table"><thead><tr><th>POS.</th><th>EQUIPO</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th><th>ESTADO</th></tr></thead><tbody>${d.tab.map(x => {
        const logo = getTeamLogo(x.team);
        const mini = logo ? `<img class="mini-table-logo" src="${esc(logo)}" alt="${esc(x.team)}">` : '';
        const isLeader = x.pos === 1 && x.pj > 0;
        const leaderBadge = isLeader ? ' <span class="badge-lider">LÍDER</span>' : '';
        const rowClass = x.pos === 1 ? 'row-lider' : '';
        return `<tr class="${rowClass}"><td><b>${x.pos}°</b></td><td><span style="display:flex;align-items:center">${mini}<b>${esc(x.team)}</b>${leaderBadge}</span></td><td>${x.pj}</td><td>${x.pg}</td><td>${x.pe}</td><td>${x.pp}</td><td>${x.gf}</td><td>${x.gc}</td><td>${x.dg > 0 ? '+' : ''}${x.dg}</td><td><b class="mini-pts">${x.pts}</b></td><td>${esc(x.estado) || (x.pj > 0 ? 'En competencia' : 'Sin partidos')}</td></tr>`;
      }).join('')}</tbody></table></div>`
    : vacio('Tabla de clasificación no disponible.');

  const tarjetaClasif = `<article class="card" style="grid-column:1/-1;margin-bottom:8px"><header><b>🏆 CLASIFICACIÓN GENERAL · ORDENADA DEL 1° AL ÚLTIMO PUESTO</b><button data-go="competicion" data-panel-go="tabla">VER EN COMPETICIÓN →</button></header>${tablaClasif}</article>`;

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

  cont.innerHTML = generales + tarjetaClasif + tarjeta('GOLEADORES', gol) + tarjeta('ASISTENCIAS', asi) + tarjeta('MVP DEL TORNEO', mvp) +
    tarjeta('FAIR PLAY POR EQUIPO · MENOR ÍNDICE ES MEJOR', fair) + tarjeta('JUGADORES CON TARJETAS · ÍNDICE = AMARILLAS + 3 × ROJAS', dis);
}

/* ---------- VIDEO ---------- */

function renderVideo() {
  const conf = CONFIG[cat];
  const u = conf.video;
  const isMasc = cat === 'masculino';
  const badgeCls = isMasc ? 'theme-badge-masc' : 'theme-badge-fem';
  const icon = isMasc ? '⭐' : '⚽';
  const badgeTxt = conf.videoBadge;

  const marco = `<div class="video-card-themed">
    <div class="video-header-themed">
      <div style="display:flex;align-items:center;gap:12px">
        <img class="mascot-video-logo" src="img/TOROS ICONO DEL TORNEO.jpg" alt="Toros Icono Oficial">
        <div>
          <span class="video-theme-pill ${badgeCls}">${icon} ${esc(badgeTxt)}</span>
          <h3 style="font:800 24px 'Barlow Condensed';color:white;margin:4px 0 0">${esc(conf.videoTitle)}</h3>
        </div>
      </div>
      <small style="color:#9bb0c6;font-size:11px;font-weight:700">${esc(conf.videoDesc)}</small>
    </div>
    <div class="video-iframe-wrap">
      <iframe src="${u}" title="Presentación ${esc(conf.nombre)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>`;

  $('#videoHome').innerHTML = marco;
  $('#videoPage').innerHTML = marco;

  const hEl = $('#videoPageHeadTitle');
  if (hEl) hEl.innerHTML = `${icon} PRESENTACIÓN <em>${conf.nombre}.</em>`;
  const sEl = $('#videoPageHeadSub');
  if (sEl) sEl.textContent = conf.videoDesc;
  const vCat = $('#videoCat');
  if (vCat) vCat.textContent = conf.nombre.toLowerCase();
}

/* ---------- NAVEGACIÓN E INTERACCIÓN ---------- */

function go(id) {
  $$('.section').forEach(s => s.classList.toggle('activo', s.id === id));
  $$('nav button').forEach(b => b.classList.toggle('activo', b.dataset.section === id));
  $('#nav').classList.remove('abierto');
  scrollTo({ top: 0, behavior: 'smooth' });
}

function iniciar() {
  document.body.classList.remove('tema-masculino', 'tema-femenino');
  document.body.classList.add('tema-' + cat);

  $$('nav button').forEach(b => b.onclick = () => go(b.dataset.section));
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-go]');
    if (b) {
      go(b.dataset.go);
      if (b.dataset.panelGo) {
        const tb = $('.tabs button[data-panel="' + b.dataset.panelGo + '"]');
        if (tb) tb.click();
      }
      return;
    }
    const t = e.target.closest('[data-team]');
    if (t) {
      $('#teamFilter').value = t.dataset.team;
      renderPlayers(DATA[cat] || datosVacios());
      go('plantillas');
    }
  });

  $$('.cat').forEach(b => b.onclick = () => {
    $$('.cat').forEach(x => x.classList.remove('activo'));
    b.classList.add('activo');
    cat = b.dataset.cat;
    document.body.classList.remove('tema-masculino', 'tema-femenino');
    document.body.classList.add('tema-' + cat);
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { build, estadisticas, filasDe, celda, parsePlantilla, getTeamLogo, CONFIG };
} else {
  iniciar();
}
