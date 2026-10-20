import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { MatchCard } from '../components/MatchCard';

export const GeneralCalendarView: React.FC = () => {
  const { data } = useTournament();
  const [viewMode, setViewMode] = useState<'cal' | 'res'>('cal');
  const [filterBranch, setFilterBranch] = useState<'all' | 'masculino' | 'femenino'>('all');

  const mascCal = data.masculino.calendario || [];
  const femCal = data.femenino.calendario || [];
  const mascRes = data.masculino.resultados || [];
  const femRes = data.femenino.resultados || [];

  let matchesToShow: any[] = [];

  if (viewMode === 'cal') {
    if (filterBranch === 'all') matchesToShow = [...mascCal, ...femCal];
    else if (filterBranch === 'masculino') matchesToShow = [...mascCal];
    else matchesToShow = [...femCal];
  } else {
    const playedMasc = mascRes.filter(r => r.estado === 'Jugado');
    const playedFem = femRes.filter(r => r.estado === 'Jugado');
    if (filterBranch === 'all') matchesToShow = [...playedMasc, ...playedFem];
    else if (filterBranch === 'masculino') matchesToShow = [...playedMasc];
    else matchesToShow = [...playedFem];
  }

  return (
    <section id="view-calendario" className="app-view active" aria-label="Calendario y resultados generales">
      <div className="pagehead-box">
        <span className="pagehead-pre">COMPETICIÓN GENERAL</span>
        <h1 className="pagehead-title">CALENDARIO Y RESULTADOS</h1>
        <p className="pagehead-desc">
          Consulta la programación completa y todos los resultados oficiales de ambas ramas.
        </p>
      </div>

      <div className="general-filters-bar">
        <div className="btn-switch-group">
          <button
            className={`switch-btn ${viewMode === 'cal' ? 'active' : ''}`}
            onClick={() => setViewMode('cal')}
          >
            CALENDARIO
          </button>
          <button
            className={`switch-btn ${viewMode === 'res' ? 'active' : ''}`}
            onClick={() => setViewMode('res')}
          >
            RESULTADOS
          </button>
        </div>

        <div className="btn-switch-group">
          <button
            className={`switch-btn ${filterBranch === 'all' ? 'active' : ''}`}
            onClick={() => setFilterBranch('all')}
          >
            Todos
          </button>
          <button
            className={`switch-btn ${filterBranch === 'masculino' ? 'active' : ''}`}
            onClick={() => setFilterBranch('masculino')}
          >
            Masculino
          </button>
          <button
            className={`switch-btn ${filterBranch === 'femenino' ? 'active' : ''}`}
            onClick={() => setFilterBranch('femenino')}
          >
            Femenino
          </button>
        </div>
      </div>

      <div id="generalMatchesContainer" className="general-stream-box">
        {matchesToShow.length > 0 ? (
          <div className="matches-stream">
            {matchesToShow.map((m, idx) => (
              <MatchCard key={idx} match={m} branchKey={m.branch} />
            ))}
          </div>
        ) : (
          <div className="empty-state-card">
            <p>No hay encuentros para mostrar con el filtro seleccionado.</p>
          </div>
        )}
      </div>
    </section>
  );
};
