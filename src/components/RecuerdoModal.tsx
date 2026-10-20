import React from 'react';
import { useTournament } from '../context/TournamentContext';

export const RecuerdoModal: React.FC = () => {
  const { activeRecuerdo, setActiveRecuerdo } = useTournament();

  if (!activeRecuerdo) return null;

  const item = activeRecuerdo;

  return (
    <div
      id="modalRecuerdo"
      className="modal-backdrop active"
      onClick={() => setActiveRecuerdo(null)}
      style={{ display: 'flex' }}
    >
      <div
        className="modal-afiche-container"
        role="dialog"
        aria-modal="true"
        aria-label="Fotografía del recuerdo"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-afiche-card">
          <div className="modal-afiche-topbar">
            <div className="modal-afiche-titles">
              <span className="modal-badge-gold" id="modalRecuerdoMeta">
                {item.jornada} · {item.date || 'EDICIÓN 2026'}
              </span>
              <strong className="modal-afiche-sub" id="modalRecuerdoTitle">
                {item.title}
              </strong>
            </div>
            <button
              id="btnCloseModalRecuerdo"
              className="btn-close-modal"
              aria-label="Cerrar fotografía"
              onClick={() => setActiveRecuerdo(null)}
            >
              ✕
            </button>
          </div>

          <div className="modal-afiche-img-wrap" id="modalRecuerdoMediaWrap">
            {item.isVideo && item.videoId ? (
              <div className="modal-video-wrap" style={{ position: 'relative', width: '100%', height: '400px' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1`}
                  title={item.title}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                id="modalRecuerdoImg"
                src={item.src}
                alt={item.title}
                className="modal-afiche-img"
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = 'img/TOROS ICONO DEL TORNEO.jpg';
                }}
              />
            )}
          </div>

          <div className="modal-afiche-foot" id="modalRecuerdoDesc">
            <span>{item.description || item.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
