import React from 'react';
import { useTournament } from '../context/TournamentContext';
import { MatchCard } from '../components/MatchCard';
import { getTeamShieldUrl, computeBranchFairPlaySummary } from '../utils/shields';
import { SHEETS_CONFIG } from '../data/seedData';

export const HomeView: React.FC = () => {
  const { data, setIsAficheOpen } = useTournament();

  const mascCal = data.masculino.calendario || [];
  const femCal = data.femenino.calendario || [];
  const mascRes = data.masculino.resultados || [];
  const femRes = data.femenino.resultados || [];

  const mascPlayed = mascRes.filter(r => r.estado === 'Jugado');
  const femPlayed = femRes.filter(r => r.estado === 'Jugado');

  const totalPartidos = (SHEETS_CONFIG.masculino.totalPartidos || 13) + (SHEETS_CONFIG.femenino.totalPartidos || 4);
  const totalJugados = mascPlayed.length + femPlayed.length;
  const totalPendientes = Math.max(0, totalPartidos - totalJugados);

  let totalGoles = 0;
  [...mascPlayed, ...femPlayed].forEach(r => {
    totalGoles += (r.golesLocal || 0) + (r.golesVisita || 0);
  });
  const promedioGoles = totalJugados > 0 ? (totalGoles / totalJugados).toFixed(1) : '0.0';
  const progressPct = totalPartidos > 0 ? Math.round((totalJugados / totalPartidos) * 100) : 0;

  // Leaders
  const mascStandings = data.masculino.posiciones || [];
  const femStandings = data.femenino.posiciones || [];
  const mascLeader = mascStandings.find(s => s.pj > 0) || mascStandings[0];
  const femLeader = femStandings.find(s => s.pj > 0) || femStandings[0];

  // Upcoming matches (pending matches)
  const isMatchPlayed = (m: any) => {
    if (m.estado === 'Jugado') return true;
    if (m.marcador && m.marcador !== '-' && m.marcador.includes('-')) return true;
    return false;
  };

  const pendingMasc = mascCal.filter(m => !isMatchPlayed(m));
  const pendingFem = femCal.filter(m => !isMatchPlayed(m));
  const nextMatches = [...pendingMasc, ...pendingFem].slice(0, 4);

  // Latest results (played matches)
  const latestPlayed = [...mascRes, ...femRes]
    .filter(r => r.estado === 'Jugado')
    .slice(0, 4);

  // Fairplay
  const mascFP = computeBranchFairPlaySummary(
    SHEETS_CONFIG.masculino.equipos,
    data.masculino.jugadores,
    data.masculino.posiciones,
    mascPlayed.length
  );
  const femFP = computeBranchFairPlaySummary(
    SHEETS_CONFIG.femenino.equipos,
    data.femenino.jugadores,
    data.femenino.posiciones,
    femPlayed.length
  );

  const mascBestTeam = mascFP.list[0];
  const femBestTeam = femFP.list[0];

  return (
    <section id="view-inicio" className="app-view active" aria-label="Inicio general del torneo">
      {/* Hero Dinámico V1 */}
      <section className="hero-banner-v1">
        <div className="hero-v1-content">
          <div className="hero-v1-copy">
            <div className="hero-live-pill">
              <span className="live-dot-pulse" />
              <span className="hero-edition-tag">TORNEO OFICIAL 2026 · FÚTBOL 5</span>
              <span className="badge-tag tag-masculino">EN VIVO</span>
            </div>
            <h1 className="hero-v1-title">
              LA COMPETENCIA
              <br />
              <em className="hero-accent-text">COMIENZA AQUÍ.</em>
            </h1>
            <p className="hero-v1-desc">
              El punto de encuentro oficial de San Martín Lácteos S.A.S. Sigue el torneo minuto a
              minuto: partidos programados, resultados oficiales, tabla de posiciones, nóminas y
              estadísticas individuales.
            </p>
            <div className="hero-v1-actions">
              <a href="#/torneo" className="btn-hero-ghost">
                📋 CONSULTAR MANUAL
              </a>
            </div>
            <div className="hero-badges-row">
              <div className="hero-mascot-pill">
                <img
                  src="img/TOROS ICONO DEL TORNEO.jpg"
                  alt="Toros Icono Oficial 2026"
                  className="hero-mascot-avatar"
                />
                <span className="hero-mascot-text">TOROS SAN MARTÍN · 2026</span>
              </div>
              <div className="hero-slogan-pill">
                <span>🤝 Primero las personas, después el resultado</span>
              </div>
            </div>
          </div>

          <div className="hero-v1-poster-wrap">
            <div
              className="hero-poster-card"
              id="cardPosterHero"
              onClick={() => setIsAficheOpen(true)}
              style={{ cursor: 'pointer' }}
              title="Presiona para ampliar afiche oficial"
            >
              <div className="poster-card-topbar">
                <span className="poster-gold-seal">★ AFICHE OFICIAL 2026 ★</span>
              </div>
              <div className="poster-img-container">
                <img
                  className="hero-poster-img"
                  src="img/AFICHE TORNEO 2026.jpg"
                  alt="Afiche Oficial del Torneo de Fútbol 5 San Martín Lácteos 2026"
                  fetchPriority="high"
                />
              </div>
              <div className="poster-card-badge">EDICIÓN 2026 · MASCULINO Y FEMENINO</div>
            </div>
          </div>
        </div>

        {/* Tira de métricas del torneo */}
        <div className="hero-stats-strip">
          <div className="hero-stat-cell">
            <strong className="stat-number">8</strong>
            <span className="stat-label">EQUIPOS</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-cell">
            <strong className="stat-number">{totalPartidos}</strong>
            <span className="stat-label">PARTIDOS TOTALES</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-cell">
            <strong className="stat-number">2</strong>
            <span className="stat-label">CATEGORÍAS</span>
          </div>
        </div>
      </section>

      {/* Botones de acceso a ramas */}
      <div className="branch-access-grid">
        <a href="#/masculino" className="branch-access-btn btn-masculino">
          <span className="branch-access-arrow">⚽</span>
          ENTRAR AL TORNEO MASCULINO
        </a>
        <a href="#/femenino" className="branch-access-btn btn-femenino">
          <span className="branch-access-arrow">⚽</span>
          ENTRAR AL TORNEO FEMENINO
        </a>
      </div>

      {/* 4 Tarjetas de resumen general sumadas */}
      <div className="summary-cards-grid">
        <article className="stat-box">
          <span className="stat-box-label">PARTIDOS JUGADOS</span>
          <div className="stat-box-value" id="homeSumJugados">
            {totalJugados}
          </div>
          <span className="stat-box-sub" id="homeSumJugadosTotal">
            de {totalPartidos} programados
          </span>
        </article>

        <article className="stat-box">
          <span className="stat-box-label">PARTIDOS PENDIENTES</span>
          <div className="stat-box-value" id="homeSumPendientes">
            {totalPendientes}
          </div>
          <span className="stat-box-sub">por disputarse</span>
        </article>

        <article className="stat-box">
          <span className="stat-box-label">GOLES REGISTRADOS</span>
          <div className="stat-box-value" id="homeSumGoles">
            {totalGoles}
          </div>
          <span className="stat-box-sub" id="homeSumPromedio">
            {promedioGoles} por partido
          </span>
        </article>

        <article className="stat-box stat-box-leaders">
          <span className="stat-box-label">LÍDERES ACTUALES</span>
          <div className="leaders-lines">
            <div className="leader-line" id="homeLeaderMasc">
              <span className="badge-tag tag-masculino">Masculino</span>
              <div className="leader-team-info">
                {mascLeader && getTeamShieldUrl(mascLeader.equipo) && (
                  <img
                    src={getTeamShieldUrl(mascLeader.equipo)!}
                    alt={mascLeader.equipo}
                    className="leader-team-shield"
                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}
                <span className="leader-team-name" id="homeLeaderMascName">
                  {mascLeader ? mascLeader.equipo : 'Sin partidos jugados'}
                </span>
              </div>
              <strong className="leader-team-pts" id="homeLeaderMascPts">
                {mascLeader ? `${mascLeader.pts} pts` : ''}
              </strong>
            </div>

            <div className="leader-line" id="homeLeaderFem">
              <span className="badge-tag tag-femenino">Femenino</span>
              <div className="leader-team-info">
                {femLeader && getTeamShieldUrl(femLeader.equipo) && (
                  <img
                    src={getTeamShieldUrl(femLeader.equipo)!}
                    alt={femLeader.equipo}
                    className="leader-team-shield"
                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}
                <span className="leader-team-name" id="homeLeaderFemName">
                  {femLeader ? femLeader.equipo : 'Sin partidos jugados'}
                </span>
              </div>
              <strong className="leader-team-pts" id="homeLeaderFemPts">
                {femLeader ? `${femLeader.pts} pts` : ''}
              </strong>
            </div>
          </div>
        </article>
      </div>

      {/* Barra de avance general */}
      <div className="progress-box">
        <div className="progress-info">
          <span className="progress-label">AVANCE DEL TORNEO</span>
          <strong className="progress-stats" id="homeProgressText">
            {totalJugados} de {totalPartidos} partidos jugados ({progressPct}%)
          </strong>
        </div>
        <div className="progress-bar-track">
          <div
            id="homeProgressBar"
            className="progress-bar-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Próximos Encuentros */}
      <section className="section-block" aria-label="Próximos encuentros">
        <div className="section-header">
          <div>
            <h2 className="section-title">PRÓXIMOS ENCUENTROS</h2>
            <p className="section-subtitle">Por fecha y hora · masculino y femenino</p>
          </div>
          <div className="branch-legend">
            <span className="legend-item">
              <i className="dot dot-masc" /> Masculino
            </span>
            <span className="legend-item">
              <i className="dot dot-fem" /> Femenino
            </span>
          </div>
        </div>

        <div id="homeNextMatchesList" className="matches-stream">
          {nextMatches.length > 0 ? (
            nextMatches.map((m, idx) => (
              <MatchCard key={`next-${idx}`} match={m} branchKey={m.branch} />
            ))
          ) : (
            <p className="empty-state-msg">Todos los encuentros han sido disputados.</p>
          )}
        </div>

        <div className="section-action-center">
          <a href="#/calendario" className="btn-more-action">
            Ver calendario completo →
          </a>
        </div>
      </section>

      {/* Últimos Resultados Oficiales */}
      <section className="section-block" aria-label="Últimos resultados oficiales">
        <div className="section-header">
          <div>
            <h2 className="section-title">ÚLTIMOS RESULTADOS OFICIALES</h2>
            <p className="section-subtitle">Marcadores oficiales verificados</p>
          </div>
        </div>

        <div id="homeLatestResultsList" className="results-stream">
          {latestPlayed.length > 0 ? (
            latestPlayed.map((m, idx) => (
              <MatchCard key={`res-${idx}`} match={m} branchKey={m.branch} />
            ))
          ) : (
            <p className="empty-state-msg">Aún no se han disputado partidos oficiales.</p>
          )}
        </div>

        <div className="section-action-center">
          <a href="#/calendario" className="btn-more-action">
            Ver todos los resultados →
          </a>
        </div>
      </section>

      {/* Fair Play · Equipos más deportivos */}
      <section className="section-block" aria-label="Juego limpio y Fair Play">
        <div className="section-header">
          <div>
            <h2 className="section-title">FAIR PLAY · MÁS DEPORTIVOS</h2>
            <p className="section-subtitle">Primeros en comportamiento y disciplina deportiva</p>
          </div>
        </div>

        <div className="fairplay-summary-grid">
          <a
            href="#/masculino"
            className="fairplay-card-link"
          >
            <div className="fairplay-card-head">
              <span className="badge-tag tag-masculino">Masculino</span>
              <span className="fairplay-card-goto">Ver tabla Fair Play →</span>
            </div>
            <div className="fairplay-card-body" id="homeFairMascBody">
              {mascBestTeam ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {getTeamShieldUrl(mascBestTeam.equipo) && (
                    <img
                      src={getTeamShieldUrl(mascBestTeam.equipo)!}
                      alt={mascBestTeam.equipo}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  )}
                  <div>
                    <strong>{mascBestTeam.equipo}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      {mascBestTeam.amarillas === 0 && mascBestTeam.rojas === 0
                        ? '🌟 Excelente conducta · 0 tarjetas'
                        : `${mascBestTeam.amarillas} 🟨 · ${mascBestTeam.rojas} 🟥`}
                    </div>
                  </div>
                </div>
              ) : (
                <span className="empty-state-msg">Se mostrará cuando haya partidos</span>
              )}
            </div>
          </a>

          <a
            href="#/femenino"
            className="fairplay-card-link"
          >
            <div className="fairplay-card-head">
              <span className="badge-tag tag-femenino">Femenino</span>
              <span className="fairplay-card-goto">Ver tabla Fair Play →</span>
            </div>
            <div className="fairplay-card-body" id="homeFairFemBody">
              {femBestTeam ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {getTeamShieldUrl(femBestTeam.equipo) && (
                    <img
                      src={getTeamShieldUrl(femBestTeam.equipo)!}
                      alt={femBestTeam.equipo}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  )}
                  <div>
                    <strong>{femBestTeam.equipo}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      {femBestTeam.amarillas === 0 && femBestTeam.rojas === 0
                        ? '🌟 Excelente conducta · 0 tarjetas'
                        : `${femBestTeam.amarillas} 🟨 · ${femBestTeam.rojas} 🟥`}
                    </div>
                  </div>
                </div>
              ) : (
                <span className="empty-state-msg">Se mostrará cuando haya partidos</span>
              )}
            </div>
          </a>
        </div>
      </section>

      {/* Presentaciones Oficiales */}
      <section className="section-block" aria-label="Presentaciones oficiales">
        <div className="section-header">
          <h2 className="section-title">PRESENTACIONES OFICIALES</h2>
          <p className="section-subtitle">Videos oficiales de lanzamiento 2026</p>
        </div>

        <div className="presentations-grid">
          <div className="presentation-mini-card masc">
            <div className="pres-mini-copy">
              <span className="badge-tag tag-masculino">EDICIÓN MASCULINA</span>
              <h3>VIVE EL TORNEO MASCULINO</h3>
              <p>5 equipos listos para la gloria deportiva.</p>
              <a href="#/masculino" className="btn-pres-go">
                Ver presentación →
              </a>
            </div>
          </div>

          <div className="presentation-mini-card fem">
            <div className="pres-mini-copy">
              <span className="badge-tag tag-femenino">EDICIÓN FEMENINA</span>
              <h3>VIVE EL TORNEO FEMENINO</h3>
              <p>3 escuadras disputando la corona oficial.</p>
              <a href="#/femenino" className="btn-pres-go">
                Ver presentación →
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
