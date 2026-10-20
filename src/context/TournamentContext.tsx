import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Match,
  ResultMatch,
  Standing,
  PlayerStat,
  RosterMember,
  INITIAL_SEED_DATA,
  INITIAL_JUGADORES_MASC,
  SHEETS_CONFIG
} from '../data/seedData';
import { RecuerdoItem, INITIAL_RECUERDOS, parseNotasRecuerdosText } from '../data/recuerdosSeed';
import {
  parseCalendarSheet,
  parseResultsSheet,
  parseStandingsSheet,
  parsePlayersSheet
} from '../utils/sheetParsers';

export interface BranchData {
  calendario: Match[];
  resultados: ResultMatch[];
  posiciones: Standing[];
  jugadores: PlayerStat[];
  plantilla: RosterMember[];
}

export interface TournamentContextType {
  data: {
    masculino: BranchData;
    femenino: BranchData;
  };
  recuerdos: RecuerdoItem[];
  dataStatus: 'loading' | 'connected' | 'cached' | 'error';
  dataStatusText: string;
  lastSyncTime: Date | null;
  syncAllData: () => Promise<void>;
  // Modals & Popovers
  activeMatch: Match | ResultMatch | null;
  setActiveMatch: (m: Match | ResultMatch | null) => void;
  isAficheOpen: boolean;
  setIsAficheOpen: (open: boolean) => void;
  activeRecuerdo: RecuerdoItem | null;
  setActiveRecuerdo: (r: RecuerdoItem | null) => void;
  activeAbbrTooltip: { code: string; title: string; rect: DOMRect } | null;
  showAbbrTooltip: (key: string, el: HTMLElement) => void;
  hideAbbrTooltip: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

const TournamentContext = createContext<TournamentContextType | null>(null);

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<{
    masculino: BranchData;
    femenino: BranchData;
  }>({
    masculino: {
      calendario: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.masculino.calendario || [])),
      resultados: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.masculino.resultados || [])),
      posiciones: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.masculino.posiciones || [])),
      jugadores: JSON.parse(JSON.stringify(INITIAL_JUGADORES_MASC)),
      plantilla: SHEETS_CONFIG.masculino.plantillaBase.slice()
    },
    femenino: {
      calendario: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.femenino.calendario || [])),
      resultados: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.femenino.resultados || [])),
      posiciones: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.femenino.posiciones || [])),
      jugadores: [],
      plantilla: SHEETS_CONFIG.femenino.plantillaBase.slice()
    }
  });

  const [recuerdos, setRecuerdos] = useState<RecuerdoItem[]>(INITIAL_RECUERDOS);
  const [dataStatus, setDataStatus] = useState<'loading' | 'connected' | 'cached' | 'error'>('loading');
  const [dataStatusText, setDataStatusText] = useState('CONECTANDO CON PLANILLAS…');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(new Date());

  const [activeMatch, setActiveMatch] = useState<Match | ResultMatch | null>(null);
  const [isAficheOpen, setIsAficheOpen] = useState(false);
  const [activeRecuerdo, setActiveRecuerdo] = useState<RecuerdoItem | null>(null);
  const [activeAbbrTooltip, setActiveAbbrTooltip] = useState<{ code: string; title: string; rect: DOMRect } | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const applyApiData = useCallback((apiData: any) => {
    if (!apiData) return;
    setData(prev => {
      const nextMasc = { ...prev.masculino };
      const nextFem = { ...prev.femenino };

      if (apiData.masculino) {
        if (Array.isArray(apiData.masculino.CALENDARIO) && apiData.masculino.CALENDARIO.length) {
          const { matches, roster } = parseCalendarSheet(apiData.masculino.CALENDARIO, 'masculino');
          if (matches.length) nextMasc.calendario = matches;
          if (roster.length) nextMasc.plantilla = roster;
        }
        if (Array.isArray(apiData.masculino.RESULTADOS) && apiData.masculino.RESULTADOS.length) {
          const res = parseResultsSheet(apiData.masculino.RESULTADOS, 'masculino');
          if (res.length) nextMasc.resultados = res;
        }
        if (Array.isArray(apiData.masculino.TABLA_POSICIONES) && apiData.masculino.TABLA_POSICIONES.length) {
          const stand = parseStandingsSheet(apiData.masculino.TABLA_POSICIONES, 'masculino');
          if (stand.length) nextMasc.posiciones = stand;
        }
        if (Array.isArray(apiData.masculino.JUGADORES) && apiData.masculino.JUGADORES.length) {
          const ply = parsePlayersSheet(apiData.masculino.JUGADORES, 'masculino');
          if (ply.length) nextMasc.jugadores = ply;
        }
      }

      if (apiData.femenino) {
        if (Array.isArray(apiData.femenino.CALENDARIO) && apiData.femenino.CALENDARIO.length) {
          const { matches, roster } = parseCalendarSheet(apiData.femenino.CALENDARIO, 'femenino');
          if (matches.length) nextFem.calendario = matches;
          if (roster.length) nextFem.plantilla = roster;
        }
        if (Array.isArray(apiData.femenino.RESULTADOS) && apiData.femenino.RESULTADOS.length) {
          const res = parseResultsSheet(apiData.femenino.RESULTADOS, 'femenino');
          if (res.length) nextFem.resultados = res;
        }
        if (Array.isArray(apiData.femenino.TABLA_POSICIONES) && apiData.femenino.TABLA_POSICIONES.length) {
          const stand = parseStandingsSheet(apiData.femenino.TABLA_POSICIONES, 'femenino');
          if (stand.length) nextFem.posiciones = stand;
        }
        if (Array.isArray(apiData.femenino.JUGADORES) && apiData.femenino.JUGADORES.length) {
          const ply = parsePlayersSheet(apiData.femenino.JUGADORES, 'femenino');
          if (ply.length) nextFem.jugadores = ply;
        }
      }

      return { masculino: nextMasc, femenino: nextFem };
    });
  }, []);

  const syncAllData = useCallback(async () => {
    setDataStatus('loading');
    setDataStatusText('ACTUALIZANDO DATOS…');

    try {
      const resp = await fetch('/api/tournament-data', { cache: 'no-cache' });
      if (resp.ok) {
        const json = await resp.json();
        if (json && json.success && json.data) {
          applyApiData(json.data);
          setDataStatus('connected');
          setDataStatusText('DATOS ACTUALIZADOS EN VIVO');
          setLastSyncTime(new Date());
          return;
        }
      }
    } catch {
      // Fallback: seed data is already present and complete
    }

    // Try fetching NOTAS_RECUERDOS.txt
    try {
      const respTxt = await fetch('/NOTAS_RECUERDOS.txt?v=' + Date.now());
      if (respTxt.ok) {
        const txt = await respTxt.text();
        const parsed = parseNotasRecuerdosText(txt);
        if (parsed.length) setRecuerdos(parsed);
      }
    } catch {
      // Ignore
    }

    setDataStatus('connected');
    setDataStatusText('DATOS OFICIALES VERIFICADOS');
    setLastSyncTime(new Date());
  }, [applyApiData]);

  useEffect(() => {
    syncAllData();
    const interval = setInterval(syncAllData, 120000);
    return () => clearInterval(interval);
  }, [syncAllData]);

  const showAbbrTooltip = (key: string, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const info = ABBR_TOOLTIPS[key] || { code: key, title: key };
    setActiveAbbrTooltip({ code: info.code, title: info.title, rect });
  };

  const hideAbbrTooltip = () => {
    setActiveAbbrTooltip(null);
  };

  return (
    <TournamentContext.Provider
      value={{
        data,
        recuerdos,
        dataStatus,
        dataStatusText,
        lastSyncTime,
        syncAllData,
        activeMatch,
        setActiveMatch,
        isAficheOpen,
        setIsAficheOpen,
        activeRecuerdo,
        setActiveRecuerdo,
        activeAbbrTooltip,
        showAbbrTooltip,
        hideAbbrTooltip,
        mobileNavOpen,
        setMobileNavOpen
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export function useTournament() {
  const ctx = useContext(TournamentContext);
  if (!ctx) throw new Error('useTournament must be used within TournamentProvider');
  return ctx;
}

const ABBR_TOOLTIPS: Record<string, { code: string; title: string }> = {
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
  REND: { code: 'Rend.', title: 'Porcentaje de puntos obtenidos' }
};
