import { PlayerStat, Standing } from '../data/seedData';

export interface RankedItem<T> {
  item: T;
  rank: number;
  isTie: boolean;
  tieReason?: string;
  tieBreakNote?: string;
}

/**
 * Asigna número de posición (#) respetando empates reales:
 * Si dos o más elementos están empatados en todos los criterios deportivos,
 * reciben la misma posición (ej: 2, 2) y el siguiente elemento salta a la posición correspondiente (ej: 4).
 */
export function computeRankWithTies<T>(
  sortedList: T[],
  areEqual: (a: T, b: T) => boolean,
  getTieReason?: (a: T, b: T) => string
): RankedItem<T>[] {
  const result: RankedItem<T>[] = [];

  for (let i = 0; i < sortedList.length; i++) {
    const current = sortedList[i];
    let rank = i + 1;
    let isTie = false;

    // Verificar si empata en todos los criterios con el anterior
    if (i > 0 && areEqual(current, sortedList[i - 1])) {
      rank = result[i - 1].rank;
      isTie = true;
      result[i - 1].isTie = true;
    }

    // Verificar si empata con el siguiente
    if (i < sortedList.length - 1 && areEqual(current, sortedList[i + 1])) {
      isTie = true;
    }

    result.push({
      item: current,
      rank,
      isTie,
      tieReason: isTie && getTieReason ? getTieReason(current, sortedList[i > 0 ? i - 1 : i]) : undefined
    });
  }

  return result;
}

// -------------------------------------------------------------
// 1. GOLEADORES (Bota de Oro Deportiva)
// Criterios ordenados de desempate justo y transparente:
// 1. Goles anotados (descendente)
// 2. Mayor cantidad de asistencias (descendente) -> Aporte directo a gol
// 3. Mayor puntaje MVP acumulado (descendente) -> Incidencia determinante
// 4. Menor cantidad de partidos jugados (PJ ascendente) -> Mayor efectividad por partido
// 5. Fair Play (menor costo acumulado en tarjetas: TA $5.000, TR $10.000)
// 6. Si todos los 5 criterios son idénticos -> Empate técnico compartido oficial
// -------------------------------------------------------------
export function sortScorers(players: PlayerStat[]): PlayerStat[] {
  return [...players]
    .filter(p => p.goles > 0)
    .sort((a, b) => {
      // 1. Goles
      if (b.goles !== a.goles) return b.goles - a.goles;
      // 2. Asistencias (primer criterio de desempate)
      if (b.asistencias !== a.asistencias) return b.asistencias - a.asistencias;
      // 3. MVP (segundo criterio de desempate)
      if (b.mvp !== a.mvp) return b.mvp - a.mvp;
      // 4. Menos PJ (tercer criterio de desempate: mayor promedio)
      if (a.pj !== b.pj) return a.pj - b.pj;
      // 5. Fair Play (cuarto criterio de desempate)
      const sancionA = (a.ta || 0) * 5000 + (a.tr || 0) * 10000;
      const sancionB = (b.ta || 0) * 5000 + (b.tr || 0) * 10000;
      if (sancionA !== sancionB) return sancionA - sancionB;
      // 6. Alfabético neutro
      return a.jugador.localeCompare(b.jugador);
    });
}

export function areScorersEqual(a: PlayerStat, b: PlayerStat): boolean {
  const sancionA = (a.ta || 0) * 5000 + (a.tr || 0) * 10000;
  const sancionB = (b.ta || 0) * 5000 + (b.tr || 0) * 10000;
  return (
    a.goles === b.goles &&
    a.asistencias === b.asistencias &&
    a.mvp === b.mvp &&
    a.pj === b.pj &&
    sancionA === sancionB
  );
}

export function getRankedScorers(players: PlayerStat[]): RankedItem<PlayerStat>[] {
  const sorted = sortScorers(players);
  return computeRankWithTies(
    sorted,
    areScorersEqual,
    (a, b) => `Empate en goles (${a.goles}), asistencias (${a.asistencias}), MVP (${a.mvp}) y PJ (${a.pj})`
  );
}

// -------------------------------------------------------------
// 2. ASISTENCIAS (Líder de Pases de Gol)
// Criterios ordenados:
// 1. Asistencias (descendente)
// 2. Goles anotados (descendente)
// 3. Puntaje MVP acumulado (descendente)
// 4. Menor cantidad de partidos jugados (PJ ascendente)
// 5. Fair Play (menor sanción)
// 6. Empate técnico compartido oficial
// -------------------------------------------------------------
export function sortAssists(players: PlayerStat[]): PlayerStat[] {
  return [...players]
    .filter(p => p.asistencias > 0)
    .sort((a, b) => {
      // 1. Asistencias
      if (b.asistencias !== a.asistencias) return b.asistencias - a.asistencias;
      // 2. Goles anotados
      if (b.goles !== a.goles) return b.goles - a.goles;
      // 3. Puntaje MVP
      if (b.mvp !== a.mvp) return b.mvp - a.mvp;
      // 4. Menos PJ
      if (a.pj !== b.pj) return a.pj - b.pj;
      // 5. Fair Play
      const sancionA = (a.ta || 0) * 5000 + (a.tr || 0) * 10000;
      const sancionB = (b.ta || 0) * 5000 + (b.tr || 0) * 10000;
      if (sancionA !== sancionB) return sancionA - sancionB;
      return a.jugador.localeCompare(b.jugador);
    });
}

export function areAssistsEqual(a: PlayerStat, b: PlayerStat): boolean {
  const sancionA = (a.ta || 0) * 5000 + (a.tr || 0) * 10000;
  const sancionB = (b.ta || 0) * 5000 + (b.tr || 0) * 10000;
  return (
    a.asistencias === b.asistencias &&
    a.goles === b.goles &&
    a.mvp === b.mvp &&
    a.pj === b.pj &&
    sancionA === sancionB
  );
}

export function getRankedAssists(players: PlayerStat[]): RankedItem<PlayerStat>[] {
  const sorted = sortAssists(players);
  return computeRankWithTies(
    sorted,
    areAssistsEqual,
    (a, b) => `Empate en asistencias (${a.asistencias}), goles (${a.goles}), MVP (${a.mvp}) y PJ (${a.pj})`
  );
}

// -------------------------------------------------------------
// 3. VALLA MENOS VENCIDA (Mejor Rendimiento Defensivo)
// Criterios ordenados:
// 1. Menor promedio de Goles Recibidos por Partido (GC / PJ)
// 2. Mayor cantidad de partidos jugados (PJ) (mantener el promedio con más partidos tiene más mérito)
// 3. Menor cantidad de Goles en Contra absolutos (GC)
// 4. Mayor puntaje del equipo en la tabla (PTS)
// 5. Mejor Diferencia de Gol (DG)
// -------------------------------------------------------------
export function sortKeepers(posiciones: Standing[]): Standing[] {
  return [...posiciones]
    .filter(p => p.pj > 0)
    .sort((a, b) => {
      const promA = a.gc / a.pj;
      const promB = b.gc / b.pj;
      if (Math.abs(promA - promB) > 0.001) return promA - promB;
      // Desempate 1: más partidos jugados habiendo mantenido el promedio
      if (b.pj !== a.pj) return b.pj - a.pj;
      // Desempate 2: menos goles en contra absolutos
      if (a.gc !== b.gc) return a.gc - b.gc;
      // Desempate 3: puntos del equipo
      if (b.pts !== a.pts) return b.pts - a.pts;
      // Desempate 4: mejor diferencia de gol
      if (b.dg !== a.dg) return b.dg - a.dg;
      return a.equipo.localeCompare(b.equipo);
    });
}

export function areKeepersEqual(a: Standing, b: Standing): boolean {
  const promA = (a.gc / (a.pj || 1)).toFixed(2);
  const promB = (b.gc / (b.pj || 1)).toFixed(2);
  return promA === promB && a.pj === b.pj && a.gc === b.gc && a.pts === b.pts && a.dg === b.dg;
}

export function getRankedKeepers(posiciones: Standing[]): RankedItem<Standing>[] {
  const sorted = sortKeepers(posiciones);
  return computeRankWithTies(
    sorted,
    areKeepersEqual,
    (a, b) => `Empate en promedio (${(a.gc / a.pj).toFixed(2)} GC/PJ), PJ (${a.pj}) y GC (${a.gc})`
  );
}

// -------------------------------------------------------------
// 4. MVP (Jugador Más Valioso del Torneo)
// Criterios ordenados:
// 1. Puntos MVP acumulados (descendente)
// 2. Goles anotados (descendente)
// 3. Asistencias (descendente)
// 4. Menos PJ (mayor promedio de incidencia por partido)
// 5. Fair Play (menos tarjetas / sanciones)
// -------------------------------------------------------------
export function sortMVP(players: PlayerStat[]): PlayerStat[] {
  return [...players]
    .filter(p => p.mvp > 0)
    .sort((a, b) => {
      if (b.mvp !== a.mvp) return b.mvp - a.mvp;
      if (b.goles !== a.goles) return b.goles - a.goles;
      if (b.asistencias !== a.asistencias) return b.asistencias - a.asistencias;
      if (a.pj !== b.pj) return a.pj - b.pj;
      const sancionA = (a.ta || 0) * 5000 + (a.tr || 0) * 10000;
      const sancionB = (b.ta || 0) * 5000 + (b.tr || 0) * 10000;
      if (sancionA !== sancionB) return sancionA - sancionB;
      return a.jugador.localeCompare(b.jugador);
    });
}

export function areMVPEqual(a: PlayerStat, b: PlayerStat): boolean {
  const sancionA = (a.ta || 0) * 5000 + (a.tr || 0) * 10000;
  const sancionB = (b.ta || 0) * 5000 + (b.tr || 0) * 10000;
  return (
    a.mvp === b.mvp &&
    a.goles === b.goles &&
    a.asistencias === b.asistencias &&
    a.pj === b.pj &&
    sancionA === sancionB
  );
}

export function getRankedMVP(players: PlayerStat[]): RankedItem<PlayerStat>[] {
  const sorted = sortMVP(players);
  return computeRankWithTies(
    sorted,
    areMVPEqual,
    (a, b) => `Empate en MVP (${a.mvp} pts), goles (${a.goles}), asistencias (${a.asistencias}) y PJ (${a.pj})`
  );
}

// -------------------------------------------------------------
// 5. DISCIPLINA (Tarjetas y Sanciones Económicas)
// Criterios ordenados:
// 1. Mayor valor total en sanciones ($COP)
// 2. Más Tarjetas Rojas (TR)
// 3. Más Tarjetas Amarillas (TA)
// 4. Menos PJ (acumulación en menos encuentros)
// -------------------------------------------------------------
export function sortDiscipline(players: PlayerStat[]): PlayerStat[] {
  return [...players]
    .filter(p => (p.ta || 0) > 0 || (p.tr || 0) > 0)
    .sort((a, b) => {
      const sancionA = (a.ta || 0) * 5000 + (a.tr || 0) * 10000;
      const sancionB = (b.ta || 0) * 5000 + (b.tr || 0) * 10000;
      if (sancionB !== sancionA) return sancionB - sancionA;
      if ((b.tr || 0) !== (a.tr || 0)) return (b.tr || 0) - (a.tr || 0);
      if ((b.ta || 0) !== (a.ta || 0)) return (b.ta || 0) - (a.ta || 0);
      if (a.pj !== b.pj) return a.pj - b.pj;
      return a.jugador.localeCompare(b.jugador);
    });
}

export function areDisciplineEqual(a: PlayerStat, b: PlayerStat): boolean {
  return (a.ta || 0) === (b.ta || 0) && (a.tr || 0) === (b.tr || 0) && a.pj === b.pj;
}

export function getRankedDiscipline(players: PlayerStat[]): RankedItem<PlayerStat>[] {
  const sorted = sortDiscipline(players);
  return computeRankWithTies(sorted, areDisciplineEqual);
}
