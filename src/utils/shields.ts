import { TABLA_ESCUDOS } from '../data/seedData';
import { Match, PlayerStat, Standing } from '../data/seedData';

export function normStr(str: any): string {
  if (str == null) return '';
  return String(str)
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function cleanStr(val: any): string {
  return val == null ? '' : String(val).trim();
}

export function parseNum(val: any): number {
  if (val == null || val === '') return 0;
  const n = Number(String(val).replace(/[^\d.-]/g, ''));
  return isNaN(n) ? 0 : n;
}

export function getTeamShieldUrl(teamName: string): string | null {
  if (!teamName) return null;
  const n = normStr(teamName);
  if (TABLA_ESCUDOS[teamName]) return TABLA_ESCUDOS[teamName];
  if (TABLA_ESCUDOS[n]) return TABLA_ESCUDOS[n];
  for (const [key, val] of Object.entries(TABLA_ESCUDOS)) {
    if (normStr(key) === n) return val;
  }
  // Fallbacks by substrings
  if (n.includes('ADMIN')) return 'img/ADMIN UNITED FC.jpg';
  if (n.includes('BAYERN') || n.includes('MUU')) return 'img/BAYERN MUU FC.jpg';
  if (n.includes('INTER') || n.includes('LACTEOS')) return 'img/INTER L%C3%81CTEOS FC.jpg';
  if (n.includes('PROBIOTIC')) return 'img/LOS PROBI%C3%93TICOS FC.jpg';
  if (n.includes('MONARCA')) return 'img/MONARCAS FC.jpg';
  if (n.includes('REAL')) return 'img/REAL SAN MARTIN FC.jpg';
  if (n.includes('MILLA')) return 'img/ULTIMA MILLA FC.jpg';
  if (n.includes('ELITE')) return 'img/%C3%89LITE FC.jpg';
  return null;
}

export function isMysteryTeam(name: string): boolean {
  const n = normStr(name);
  return (
    !n ||
    n === 'POR DEFINIR' ||
    n === 'POR CONFIRMAR' ||
    n.startsWith('PENDIENTE') ||
    n.startsWith('POR ') ||
    n === 'TBD' ||
    n === '?' ||
    n === '-'
  );
}

export function getMysteryHint(m: Match, side: 'local' | 'visita' | 'visitante'): string {
  const faseNorm = normStr(m.fase || '');
  const isMasc = m.branch === 'masculino';

  if (faseNorm.includes('SEMIFINAL 1')) {
    return side === 'local' ? '1.º Lugar (Tabla General)' : '4.º Lugar (Tabla General)';
  }
  if (faseNorm.includes('SEMIFINAL 2')) {
    return side === 'local' ? '2.º Lugar (Tabla General)' : '3.º Lugar (Tabla General)';
  }
  if (faseNorm.includes('TERCER PUESTO')) {
    return side === 'local' ? 'Perdedor Semifinal 1' : 'Perdedor Semifinal 2';
  }
  if (faseNorm.includes('FINAL') || faseNorm.includes('GRAN FINAL')) {
    if (isMasc) {
      return side === 'local' ? 'Ganador Semifinal 1' : 'Ganador Semifinal 2';
    }
    return side === 'local' ? '1.º Lugar (Tabla General)' : '2.º Lugar (Tabla General)';
  }
  return side === 'local' ? 'Clasificado Local' : 'Clasificado Visitante';
}

export const ABBR_DICTIONARY: Record<string, { code: string; title: string }> = {
  POS: { code: 'Pos', title: 'Posición actual en la tabla' },
  PJ: { code: 'PJ', title: 'Partidos Jugados' },
  PG: { code: 'PG', title: 'Partidos Ganados (3 pts)' },
  PE: { code: 'PE', title: 'Partidos Empatados (1 pt)' },
  PP: { code: 'PP', title: 'Partidos Perdidos (0 pts)' },
  GF: { code: 'GF', title: 'Goles a Favor (anotados)' },
  GC: { code: 'GC', title: 'Goles en Contra (recibidos)' },
  DG: { code: 'DG', title: 'Diferencia de Gol (GF menos GC)' },
  PTS: { code: 'PTS', title: 'Puntos Totales acumulados' },
  PROM: { code: 'Prom.', title: 'Promedio por partido jugado' },
  GC_PJ: { code: 'GC/PJ', title: 'Promedio de goles recibidos por partido' },
  MVP: { code: 'MVP', title: 'Jugador Más Valioso del partido' },
  TA: { code: 'TA', title: 'Tarjeta Amarilla (multa $5.000)' },
  TR: { code: 'TR', title: 'Tarjeta Roja (multa $10.000)' },
  COP: { code: 'COP', title: 'Valor en Pesos Colombianos' },
  REND: { code: 'Rend.', title: 'Porcentaje de puntos obtenidos' },
  GOLES_EMOJI: { code: '⚽', title: 'Goles anotados' },
  ASIST_EMOJI: { code: '🅰️', title: 'Asistencias (pases de gol)' },
  TA_EMOJI: { code: '🟨', title: 'Tarjetas amarillas' },
  TR_EMOJI: { code: '🟥', title: 'Tarjetas rojas' }
};

export function parseCanchaInfo(canchaStr: string) {
  if (!canchaStr) return { direccion: 'Sede deportiva oficial', url: '' };
  const parts = canchaStr.split('|').map(p => p.trim());
  let direccion = parts[0] || 'Cra. 24 #18-46';
  let url = '';
  for (let i = 1; i < parts.length; i++) {
    if (parts[i].startsWith('http://') || parts[i].startsWith('https://')) {
      url = parts[i];
      break;
    }
  }
  if (!url && direccion.startsWith('http')) {
    url = direccion;
    direccion = 'Cra. 24 #18-46';
  }
  return { direccion, url };
}

export function formatDayHeader(rawDate: string): string {
  if (!rawDate) return 'Fecha por programar';
  const clean = cleanStr(rawDate);
  const m = clean.match(/^([a-záéíóú]+),\s*([a-záéíóú]+)\s+(\d{1,2}),\s*(\d{4})/i);
  if (m) {
    const diaSem = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
    const mes = m[2].charAt(0).toUpperCase() + m[2].slice(1).toLowerCase();
    const diaNum = m[3];
    const anio = m[4];
    return `${diaSem} ${diaNum} de ${mes} de ${anio}`;
  }
  return clean;
}

export function getRelativeDateLabel(rawDate: string): string {
  if (!rawDate) return '';
  const clean = cleanStr(rawDate);
  const m = clean.match(/^([a-záéíóú]+)/i);
  if (m) {
    return m[1].toUpperCase();
  }
  return '';
}

export interface FairPlayTeamItem {
  equipo: string;
  amarillas: number;
  rojas: number;
  multa: number;
  pj: number;
}

export interface FairPlaySummary {
  list: FairPlayTeamItem[];
  allZeroCards: boolean;
  totalAmarillas: number;
  totalRojas: number;
  totalMulta: number;
  jugadosCount: number;
}

export function computeBranchFairPlaySummary(
  equipos: string[],
  jugadores: PlayerStat[],
  posiciones: Standing[],
  jugadosCount: number
): FairPlaySummary {
  const map: Record<string, { amarillas: number; rojas: number; multa: number; pj: number }> = {};

  equipos.forEach(eq => {
    map[eq] = { amarillas: 0, rojas: 0, multa: 0, pj: 0 };
  });

  posiciones.forEach(p => {
    if (map[p.equipo]) map[p.equipo].pj = p.pj || 0;
  });

  jugadores.forEach(j => {
    const eq = j.equipo;
    if (eq && map[eq]) {
      map[eq].amarillas += j.ta || 0;
      map[eq].rojas += j.tr || 0;
      map[eq].multa += (j.ta || 0) * 5000 + (j.tr || 0) * 10000;
    }
  });

  const list = Object.entries(map).map(([equipo, val]) => ({
    equipo,
    ...val
  }));

  list.sort((a, b) => a.multa - b.multa || a.amarillas - b.amarillas || b.pj - a.pj);

  let totalAmarillas = 0;
  let totalRojas = 0;
  let totalMulta = 0;
  list.forEach(i => {
    totalAmarillas += i.amarillas;
    totalRojas += i.rojas;
    totalMulta += i.multa;
  });

  const allZeroCards = totalAmarillas === 0 && totalRojas === 0;

  return {
    list,
    allZeroCards,
    totalAmarillas,
    totalRojas,
    totalMulta,
    jugadosCount
  };
}
