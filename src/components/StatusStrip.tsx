import React from 'react';
import { useTournament } from '../context/TournamentContext';

export const StatusStrip: React.FC = () => {
  const { dataStatus, dataStatusText, lastSyncTime, syncAllData } = useTournament();

  const formattedTime = lastSyncTime
    ? lastSyncTime.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '';

  return (
    <aside className="status-strip" aria-live="polite">
      <div className="status-container">
        <button
          type="button"
          onClick={syncAllData}
          className={`status-pill status-${dataStatus}`}
          title="Presiona para sincronizar con Google Sheets"
          style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
        >
          <span className="status-dot" />
          <span id="dataStatusText">{dataStatusText}</span>
        </button>
        {formattedTime && (
          <span id="dataStatusTime" className="status-time">
            Actualizado: {formattedTime}
          </span>
        )}
      </div>
    </aside>
  );
};
