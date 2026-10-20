import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { getTeamShieldUrl } from '../utils/shields';

export const RecuerdosView: React.FC = () => {
  const { recuerdos, setActiveRecuerdo } = useTournament();
  const [filter, setFilter] = useState<'all' | 'masculino' | 'femenino' | 'torneo'>('all');

  const filteredRecuerdos =
    filter === 'all' ? recuerdos : recuerdos.filter(r => r.category === filter);

  return (
    <section id="view-recuerdos" className="app-view active" aria-label="Galería de recuerdos fotográficos">
      <div className="pagehead-box">
        <span className="pagehead-pre">GALERÍA OFICIAL</span>
        <h1 className="pagehead-title">RECUERDOS DEL TORNEO</h1>
        <p className="pagehead-desc">
          Imágenes y momentos memorables de las jornadas disputadas.
        </p>
      </div>

      <div className="recuerdos-filters-bar">
        <button
          className={`filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos
        </button>
        <button
          className={`filter-pill-btn ${filter === 'masculino' ? 'active' : ''}`}
          onClick={() => setFilter('masculino')}
        >
          Masculino
        </button>
        <button
          className={`filter-pill-btn ${filter === 'femenino' ? 'active' : ''}`}
          onClick={() => setFilter('femenino')}
        >
          Femenino
        </button>
        <button
          className={`filter-pill-btn ${filter === 'torneo' ? 'active' : ''}`}
          onClick={() => setFilter('torneo')}
        >
          Torneo
        </button>
      </div>

      <div id="recuerdosContainer" className="recuerdos-content-box">
        {filteredRecuerdos.length > 0 ? (
          <div className="recuerdos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredRecuerdos.map(item => {
              const isVideo = !!item.isVideo;
              const tagLabel = isVideo
                ? `▶ VIDEO · ${item.jornada || item.category}`
                : item.category === 'torneo'
                  ? 'TORNEO'
                  : item.jornada
                    ? `${item.category.toUpperCase()} · ${item.jornada}`
                    : item.category.toUpperCase();

              const shield = item.teamHint ? getTeamShieldUrl(item.teamHint) : null;

              return (
                <article
                  key={item.id}
                  className={`recuerdo-card ${isVideo ? 'recuerdo-card-video' : ''}`}
                  onClick={() => setActiveRecuerdo(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="recuerdo-img-box">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="recuerdo-img"
                      loading="lazy"
                      onError={e => {
                        (e.currentTarget as HTMLImageElement).src = 'img/TOROS ICONO DEL TORNEO.jpg';
                      }}
                    />
                    <span className={`recuerdo-category-tag ${isVideo ? 'video' : item.category}`}>
                      {tagLabel}
                    </span>
                    {isVideo && (
                      <div className="recuerdo-play-overlay" aria-hidden="true">
                        <span className="recuerdo-play-icon">▶</span>
                      </div>
                    )}
                    <span className={`recuerdo-zoom-badge ${isVideo ? 'video-badge' : ''}`}>
                      {isVideo ? '▶ Ver video' : '🔍 Ver foto'}
                    </span>
                  </div>

                  <div className="recuerdo-info">
                    {item.date && (
                      <span className="recuerdo-date">📅 {item.date}</span>
                    )}
                    {item.partido && item.category !== 'torneo' && (
                      <span className="recuerdo-match-pill">⚽ {item.partido}</span>
                    )}
                    <div className="recuerdo-team-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      {shield && (
                        <img
                          src={shield}
                          alt={item.teamHint}
                          className="team-shield-img"
                          style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      )}
                      <h3 className="recuerdo-title" style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
                        {item.title}
                      </h3>
                    </div>
                    {item.description && item.description !== item.title && (
                      <p className="recuerdo-desc" style={{ marginTop: '6px', fontSize: '0.85rem', color: '#94a3b8' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state-card">
            <span className="empty-state-icon">📷</span>
            <h3>Pronto subiremos los recuerdos de los partidos</h3>
            <p>La organización está recopilando las mejores fotografías de cada fecha y encuentro.</p>
          </div>
        )}
      </div>
    </section>
  );
};
