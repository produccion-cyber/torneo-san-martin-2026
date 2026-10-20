import React from 'react';
import { useTournament } from '../context/TournamentContext';

export const AficheModal: React.FC = () => {
  const { isAficheOpen, setIsAficheOpen } = useTournament();

  if (!isAficheOpen) return null;

  return (
    <div
      id="modalAfiche"
      className="modal-backdrop active"
      onClick={() => setIsAficheOpen(false)}
      style={{ display: 'flex' }}
    >
      <div
        className="modal-afiche-container"
        role="dialog"
        aria-modal="true"
        aria-label="Afiche Oficial del Torneo 2026"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-afiche-card">
          <div className="modal-afiche-topbar">
            <div className="modal-afiche-titles">
              <span className="modal-badge-gold">AFICHE OFICIAL · EDICIÓN 2026</span>
              <strong className="modal-afiche-sub">
                TORNEO FÚTBOL 5 SAN MARTÍN LÁCTEOS S.A.S.
              </strong>
            </div>
            <button
              id="btnCloseModalAfiche"
              className="btn-close-modal"
              aria-label="Cerrar afiche"
              onClick={() => setIsAficheOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="modal-afiche-img-wrap">
            <img
              src="img/AFICHE TORNEO 2026.jpg"
              alt="Afiche Oficial Torneo San Martín 2026 en Alta Resolución"
              className="modal-afiche-img"
            />
          </div>
          <div className="modal-afiche-foot">
            <span>
              📍 Cra. 24 #18-46 · Categorías Masculina y Femenina · "Primero las personas, después el resultado"
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
