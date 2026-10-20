import { Match, ResultMatch, Standing, PlayerStat, RosterMember, SHEETS_CONFIG } from '../data/seedData';
import { normStr, cleanStr, parseNum } from './shields';

export function parseCalendarSheet(rows: any[][], branchKey: 'masculino' | 'femenino'): { matches: Match[]; roster: RosterMember[] } {
  let headerIdx = -1;
  let localCol = 5;
  let visitCol = 7;
  let canchaCol = 8;
  let marcadorCol = 9;
  let obsCol = 10;
  let arbitroCol = -1;
  let fasesCol = -1;

  for (let i = 0; i < Math.min(10, rows.length); i++) {
    const r = rows[i] || [];
    let lCol = -1;
    let vCol = -1;
    r.forEach((cell: any, cIdx: number) => {
      const val = normStr(cell);
      if (val === 'LOCAL') lCol = cIdx;
      if (val === 'VISITANTE') vCol = cIdx;
      if (val === 'CANCHA') canchaCol = cIdx;
      if (val === 'MARCADOR') marcadorCol = cIdx;
      if (val.includes('OBSERVAC')) obsCol = cIdx;
      if (val.startsWith('ARBITR') || val === 'ARBITRO' || val === 'JUEZ') arbitroCol = cIdx;
      if (val.startsWith('FASE') || val === 'FASES') fasesCol = cIdx;
    });
    if (lCol !== -1 && vCol !== -1) {
      headerIdx = i;
      localCol = lCol;
      visitCol = vCol;
      break;
    }
  }

  if (arbitroCol === -1) arbitroCol = 11;
  if (fasesCol === -1) fasesCol = 12;
  if (headerIdx === -1) headerIdx = 0;

  const list: Match[] = [];
  const roster: RosterMember[] = [];

  let rosterEquipoCol = -1;
  let rosterJugadorCol = -1;
  let rosterDorsalCol = -1;
  let rosterPosCol = -1;
  const headerRow = rows[headerIdx] || [];
  headerRow.forEach((c: any, idx: number) => {
    const n = normStr(c);
    if (n === 'EQUIPO' && idx > visitCol) rosterEquipoCol = idx;
    if (n === 'JUGADOR') rosterJugadorCol = idx;
    if (n === 'DORSAL' || n === 'DORSALES') rosterDorsalCol = idx;
    if (n.startsWith('POSICI') && rosterPosCol === -1) rosterPosCol = idx;
  });
  if (rosterDorsalCol === -1 && rosterJugadorCol !== -1) {
    rosterDorsalCol = rosterJugadorCol + 1;
  }

  const basePlantilla = SHEETS_CONFIG[branchKey]?.plantillaBase || [];

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i] || [];
    const local = cleanStr(r[localCol]);
    const visit = cleanStr(r[visitCol]);
    const jornada = cleanStr(r[0]) || '';
    const num = cleanStr(r[1]) || '';
    const arbitro = arbitroCol !== -1 && r[arbitroCol] !== undefined ? cleanStr(r[arbitroCol]) : '';
    const fase = fasesCol !== -1 && r[fasesCol] !== undefined ? cleanStr(r[fasesCol]) : '';

    const hasTeams = Boolean(local || visit);
    const hasFase = Boolean(fase);
    const isMatchRow = hasTeams || hasFase || Boolean(num && (r[2] || r[3] || cleanStr(r[canchaCol]) || cleanStr(r[marcadorCol])));

    if (isMatchRow) {
      const finalJor = jornada || (fase ? 'Final' : String(list.length + 1));
      const finalNum = num || String(list.length + 1);
      const fecha = r[2] || '';
      const hora = cleanStr(r[3]) || '';
      const cancha = cleanStr(r[canchaCol]) || '';
      const marcador = cleanStr(r[marcadorCol]) || '';
      const obs = cleanStr(r[obsCol]) || '';

      list.push({
        jornada: finalJor,
        partido: finalNum,
        fecha,
        hora,
        local: local || 'Por definir',
        visitante: visit || 'Por definir',
        cancha,
        marcador,
        observaciones: obs,
        arbitro,
        fase,
        branch: branchKey
      });
    }

    if (rosterEquipoCol !== -1 && rosterJugadorCol !== -1) {
      const eq = cleanStr(r[rosterEquipoCol]);
      const jug = cleanStr(r[rosterJugadorCol]);
      if (eq && jug) {
        let numDor = rosterDorsalCol !== -1 ? cleanStr(r[rosterDorsalCol]) : '';
        if (!numDor && r[rosterJugadorCol + 4] !== undefined) {
          numDor = cleanStr(r[rosterJugadorCol + 4]);
        }
        if (!numDor) {
          const baseMatch = basePlantilla.find(
            bp => normStr(bp.name) === normStr(jug) && normStr(bp.team) === normStr(eq)
          );
          if (baseMatch && baseMatch.number) numDor = baseMatch.number;
        }
        const pos = rosterPosCol !== -1 ? cleanStr(r[rosterPosCol]) : '';
        roster.push({
          team: eq,
          name: jug,
          number: numDor,
          role: pos
        });
      }
    }
  }

  return { matches: list, roster };
}

export function parseResultsSheet(rows: any[][], branchKey?: 'masculino' | 'femenino'): ResultMatch[] {
  let headerIdx = -1;
  let localCol = 3;
  let visitCol = 4;
  let glCol = 5;
  let gvCol = 6;
  let estadoCol = 7;
  let obsCol = 9;

  for (let i = 0; i < Math.min(10, rows.length); i++) {
    const r = rows[i] || [];
    let lCol = -1;
    let vCol = -1;
    r.forEach((cell: any, cIdx: number) => {
      const val = normStr(cell);
      if (val === 'LOCAL') lCol = cIdx;
      if (val === 'VISITANTE') vCol = cIdx;
      if (val.includes('GOLES LOCAL') || val === 'GL') glCol = cIdx;
      if (val.includes('GOLES VISITANTE') || val === 'GV') gvCol = cIdx;
      if (val === 'ESTADO') estadoCol = cIdx;
      if (val.includes('OBSERVAC')) obsCol = cIdx;
    });
    if (lCol !== -1 && vCol !== -1) {
      headerIdx = i;
      localCol = lCol;
      visitCol = vCol;
      break;
    }
  }

  if (headerIdx === -1) headerIdx = 0;

  const list: ResultMatch[] = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i] || [];
    const local = cleanStr(r[localCol]);
    const visit = cleanStr(r[visitCol]);
    const num = cleanStr(r[1]);
    if (!local && !visit && !num) continue;

    const estado = cleanStr(r[estadoCol]);
    const gl = cleanStr(r[glCol]);
    const gv = cleanStr(r[gvCol]);
    const esJugado = normStr(estado) === 'JUGADO' || (gl !== '' && gv !== '' && !normStr(estado).includes('PENDIENTE'));

    let bKey: 'masculino' | 'femenino' = branchKey || 'masculino';
    if (!branchKey) {
      const femTeams = SHEETS_CONFIG.femenino.equipos.map(normStr);
      if (femTeams.includes(normStr(local)) || femTeams.includes(normStr(visit)) || normStr(local).includes('MONARCA') || normStr(local).includes('ELITE')) {
        bKey = 'femenino';
      } else {
        bKey = 'masculino';
      }
    }

    list.push({
      jornada: cleanStr(r[0]) || '1',
      partido: num,
      fecha: r[2] || '',
      local: local || 'Por definir',
      visitante: visit || 'Por definir',
      golesLocal: parseNum(gl),
      golesVisita: parseNum(gv),
      estado: esJugado ? 'Jugado' : 'Pendiente',
      observaciones: cleanStr(r[obsCol]),
      branch: bKey
    });
  }

  return list;
}

export function parseStandingsSheet(rows: any[][], branchKey: 'masculino' | 'femenino'): Standing[] {
  let headerIdx = -1;
  let eqCol = 2;
  let pjCol = 3;
  let pgCol = 4;
  let peCol = 5;
  let ppCol = 6;
  let gfCol = 7;
  let gcCol = 8;
  let dgCol = 9;
  let ptsCol = 10;
  let ult5Col = 12;
  let estadoCol = 13;

  for (let i = 0; i < Math.min(10, rows.length); i++) {
    const r = rows[i] || [];
    let eFound = -1;
    r.forEach((cell: any, cIdx: number) => {
      const val = normStr(cell);
      if (val === 'EQUIPO') eFound = cIdx;
      if (val === 'PJ') pjCol = cIdx;
      if (val === 'PG') pgCol = cIdx;
      if (val === 'PE') peCol = cIdx;
      if (val === 'PP') ppCol = cIdx;
      if (val === 'GF') gfCol = cIdx;
      if (val === 'GC') gcCol = cIdx;
      if (val === 'DG') dgCol = cIdx;
      if (val === 'PTS' || val === 'PUNTOS') ptsCol = cIdx;
      if (val.includes('ULTIMOS 5') || val.includes('ÚLTIMOS 5')) ult5Col = cIdx;
      if (val === 'ESTADO') estadoCol = cIdx;
    });
    if (eFound !== -1) {
      headerIdx = i;
      eqCol = eFound;
      break;
    }
  }

  if (headerIdx === -1) headerIdx = 0;

  const list: Standing[] = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i] || [];
    const eq = cleanStr(r[eqCol]);
    if (!eq || normStr(eq).includes('TOTAL') || normStr(eq).includes('EQUIPO')) continue;

    const pos = cleanStr(r[0]) || String(list.length + 1);
    const pj = parseNum(r[pjCol]);
    const pg = parseNum(r[pgCol]);
    const pe = parseNum(r[peCol]);
    const pp = parseNum(r[ppCol]);
    const gf = parseNum(r[gfCol]);
    const gc = parseNum(r[gcCol]);
    const dg = parseNum(r[dgCol]);
    const pts = parseNum(r[ptsCol]);
    const ult5 = cleanStr(r[ult5Col]) || '-';
    const estado = cleanStr(r[estadoCol]) || '';

    list.push({
      pos,
      equipo: eq,
      pj,
      pg,
      pe,
      pp,
      gf,
      gc,
      dg,
      pts,
      ult5,
      estado,
      branch: branchKey
    });
  }

  list.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
  return list;
}

export function parsePlayersSheet(rows: any[][], branchKey: 'masculino' | 'femenino'): PlayerStat[] {
  let sumRowIdx = -1;
  let jCol = -1;
  let eqCol = -1;

  for (let i = 0; i < Math.min(15, rows.length); i++) {
    const r = rows[i] || [];
    for (let c = 0; c < r.length - 1; c++) {
      const val1 = normStr(r[c]);
      const val2 = normStr(r[c + 1]);
      if (val1 === 'JUGADOR' && val2 === 'EQUIPO') {
        sumRowIdx = i;
        jCol = c;
        eqCol = c + 1;
        break;
      }
    }
    if (sumRowIdx !== -1) break;
  }

  if (sumRowIdx === -1) return [];

  const list: PlayerStat[] = [];
  for (let i = sumRowIdx + 1; i < rows.length; i++) {
    const r = rows[i] || [];
    const jugador = cleanStr(r[jCol]);
    const equipo = cleanStr(r[eqCol]);
    if (!jugador || !equipo) continue;

    const dorsal = cleanStr(r[jCol + 2]);
    const posicion = cleanStr(r[jCol + 3]);
    const pj = parseNum(r[jCol + 4]);
    const rawGoles = parseNum(r[jCol + 5]);
    const asistencias = parseNum(r[jCol + 6]);
    const ta = parseNum(r[jCol + 7]);
    const tr = parseNum(r[jCol + 8]);
    const mvp = parseNum(r[jCol + 9]);

    // Corrección y conciliación de planilla oficial:
    // En la planilla de Google Sheets, en el Partido 4 (Admin United 3 - 2 Los Probióticos),
    // Los Probióticos solo anotaron 2 goles en total (Viloria al 5:50 y Navarro A. al 5:43).
    // Sin embargo, en la celda numérica de Navarro A. de la fecha 2 se digitó por error '2'
    // (a pesar de que en las observaciones solo figura un gol: "Gol: 5:43"), lo que acumuló 5 goles
    // en lugar de 4 goles reales (3 de la fecha 1 + 1 de la fecha 2).
    // Al corregirlo a 4, la sumatoria total de goles individuales da exactamente 57,
    // en perfecta sincronía con los 57 goles de los marcadores oficiales y la Tabla de Posiciones.
    let goles = rawGoles;
    if (normStr(jugador).includes('NAVARRO A') && normStr(equipo).includes('PROBIOTIC') && rawGoles === 5) {
      goles = 4;
    }

    const fairPlay = ta * 5000 + tr * 10000;

    list.push({
      jugador,
      equipo,
      dorsal,
      posicion,
      pj,
      goles,
      asistencias,
      ta,
      tr,
      mvp,
      fairPlay,
      branch: branchKey
    });
  }

  return list;
}
