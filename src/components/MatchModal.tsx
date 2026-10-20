import React from 'react';
import { useTournament } from '../context/TournamentContext';
import {
  getTeamShieldUrl,
  isMysteryTeam,
  getMysteryHint,
  parseCanchaInfo,
  cleanStr
} from '../utils/shields';

export const MatchModal: React.FC = () => {
  const { activeMatch, setActiveMatch } = useTournament();

  if (!activeMatch) return null;

  const m: any = activeMatch;
  const cancha = parseCanchaInfo(m.cancha || '');
  const hasMarcador =
    (cleanStr(m.marcador) && cleanStr(m.marcador) !== '-') ||
    m.estado === 'Jugado' ||
    (m.golesLocal !== undefined && m.golesVisita !== undefined && m.estado === 'Jugado');

  const marcadorDisplay = m.marcador && m.marcador !== '-'
    ? m.marcador
    : m.golesLocal !== undefined && m.golesVisita !== undefined
      ? `${m.golesLocal} - ${m.golesVisita}`
      : '-';

  const faseUpper = (m.fase || '').toUpperCase();
  const isGranFinal = faseUpper.includes('GRAN FINAL') || faseUpper === 'FINAL';
  const isTercerPuesto = faseUpper.includes('TERCER PUESTO');
  const isPlayIn = faseUpper.includes('PLAY-IN') || faseUpper.includes('PLAY IN');
  const isSemi = faseUpper.includes('SEMIFINAL');

  const isFem = m.branch === 'femenino' || faseUpper.includes('2.º') || faseUpper.includes('2.°');
  const branchName = isFem ? 'TORNEO FEMENINO' : 'TORNEO MASCULINO';
  const branchTagClass = isFem ? 'tag-femenino' : 'tag-masculino';
  const branchPill = (
    <span className={`phase-category-badge ${isFem ? 'badge-fem' : 'badge-masc'}`}>
      {isFem ? 'FEMENINO' : 'MASCULINO'}
    </span>
  );

  const localIsMystery = isMysteryTeam(m.local);
  const visitIsMystery = isMysteryTeam(m.visitante);
  const localHint = localIsMystery ? getMysteryHint(m, 'local') : '';
  const visitHint = visitIsMystery ? getMysteryHint(m, 'visitante') : '';

  const localShield = getTeamShieldUrl(m.local);
  const visitShield = getTeamShieldUrl(m.visitante);

  const formatModalDate = () => {
    let str = m.fecha || 'Fecha por confirmar';
    if (m.hora) str += ` · ${m.hora}`;
    return str;
  };

  return (
    <div
      id="modalPartido"
      className="modal-backdrop active"
      onClick={() => setActiveMatch(null)}
      style={{ display: 'flex' }}
    >
      <div
        className="modal-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalPartidoTitulo"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-handle-bar">
          <span className="modal-handle" />
          <button
            id="btnCloseModalPartido"
            className="btn-close-modal"
            aria-label="Cerrar ficha del partido"
            onClick={() => setActiveMatch(null)}
          >
            ✕
          </button>
        </div>

        <div id="modalPartidoBody" className="modal-body-content">
          <div
            className={`modal-match-detail-card ${
              isGranFinal
                ? 'match-card-gran-final'
                : isTercerPuesto
                  ? 'match-card-tercer-puesto'
                  : ''
            }`}
          >
            {isGranFinal ? (
              <div
                className={`phase-banner-header phase-banner-gran-final ${
                  isFem ? 'banner-fem' : 'banner-masc'
                }`}
              >
                <span className="trophy-pulse">🏆</span>{' '}
                <span className="final-title-glow">
                  GRAN FINAL · {branchName}
                </span>{' '}
                {branchPill} <span className="trophy-pulse">🏆</span>
              </div>
            ) : isTercerPuesto ? (
              <div className="phase-banner-header phase-banner-tercer-puesto banner-masc">
                <span>🥉</span> TERCER PUESTO · TORNEO MASCULINO {branchPill} <span>🥉</span>
              </div>
            ) : isSemi ? (
              <div className="phase-banner-header phase-banner-semifinal banner-masc">
                <span>⚡</span> {m.fase} · TORNEO MASCULINO {branchPill}
              </div>
            ) : isPlayIn ? (
              <div
                className={`phase-banner-header phase-banner-playin ${
                  isFem ? 'banner-fem' : 'banner-masc'
                }`}
              >
                <span>🔥</span> {m.fase} · {branchName} {branchPill}
              </div>
            ) : (
              <div className={`modal-match-category-pill ${branchTagClass}`}>
                {branchName} · JORNADA {m.jornada || '1'}
              </div>
            )}

            <div className="modal-teams-head">
              <div className={`modal-team-side ${localIsMystery ? 'is-mystery' : ''}`}>
                <div className="team-shield-box shield-large">
                  {localShield ? (
                    <img
                      src={localShield}
                      alt={m.local}
                      className="team-shield-img shield-large"
                    />
                  ) : (
                    <span className="team-shield-initials shield-large">
                      {localIsMystery ? '?' : m.local.slice(0, 3)}
                    </span>
                  )}
                </div>
                <strong className="modal-team-name">{m.local}</strong>
                {localHint && <span className="team-mystery-hint">{localHint}</span>}
              </div>

              <div className="modal-vs-center">
                {hasMarcador ? (
                  <div className="modal-score-box">
                    <span className="modal-score-val">{marcadorDisplay}</span>
                    <small className="modal-pending-tag">MARCADOR OFICIAL</small>
                  </div>
                ) : (
                  <>
                    <div className="modal-vs-circle">VS</div>
                    <small className="modal-pending-tag">POR JUGAR</small>
                  </>
                )}
              </div>

              <div className={`modal-team-side ${visitIsMystery ? 'is-mystery' : ''}`}>
                <div className="team-shield-box shield-large">
                  {visitShield ? (
                    <img
                      src={visitShield}
                      alt={m.visitante}
                      className="team-shield-img shield-large"
                    />
                  ) : (
                    <span className="team-shield-initials shield-large">
                      {visitIsMystery ? '?' : m.visitante.slice(0, 3)}
                    </span>
                  )}
                </div>
                <strong className="modal-team-name">{m.visitante}</strong>
                {visitHint && <span className="team-mystery-hint">{visitHint}</span>}
              </div>
            </div>

            {isGranFinal ? (
              <div className={`final-excitement-ribbon ${isFem ? 'ribbon-fem' : 'ribbon-masc'}`}>
                <span>🏆</span>{' '}
                <strong>
                  {isFem
                    ? 'GRAN FINAL FEMENINA: 1.º vs 2.º DE LA TABLA GENERAL'
                    : 'GRAN FINAL MASCULINA: GANADOR SEMIFINAL 1 vs GANADOR SEMIFINAL 2'}
                </strong>{' '}
                <span>🏆</span>
              </div>
            ) : isTercerPuesto ? (
              <div className="tercer-puesto-ribbon ribbon-masc">
                <span>🥉</span>{' '}
                <strong>DISPUTA POR EL PODIO Y BRONCE · TORNEO MASCULINO</strong>{' '}
                <span>🥉</span>
              </div>
            ) : isSemi ? (
              <div className="final-excitement-ribbon ribbon-masc">
                <span>⚡</span>{' '}
                <strong>
                  {faseUpper.includes('1')
                    ? 'SEMIFINAL 1: 1.º vs 4.º DE LA TABLA GENERAL · TORNEO MASCULINO'
                    : faseUpper.includes('2')
                      ? 'SEMIFINAL 2: 2.º vs 3.º DE LA TABLA GENERAL · TORNEO MASCULINO'
                      : 'SEMIFINAL CLASIFICATORIA A LA GRAN FINAL · TORNEO MASCULINO'}
                </strong>{' '}
                <span>⚡</span>
              </div>
            ) : isPlayIn ? (
              <div className={`final-excitement-ribbon ${isFem ? 'ribbon-fem' : 'ribbon-masc'}`}>
                <span>🔥</span>{' '}
                <strong>
                  {isFem
                    ? 'DUELO CLASIFICATORIO A LA GRAN FINAL (1.º vs 2.º) · TORNEO FEMENINO'
                    : 'DUELO CLASIFICATORIO A SEMIFINALES · TORNEO MASCULINO'}
                </strong>{' '}
                <span>🔥</span>
              </div>
            ) : null}

            {(localHint || visitHint) && (
              <div className={`elimination-matchup-guide ${isFem ? 'guide-fem' : 'guide-masc'}`}>
                <span className="guide-tag">🎯 CRUCE DE CLASIFICACIÓN</span>
                <div className="guide-pair">
                  <span className="guide-side-box guide-side-home">
                    <strong>{localHint || m.local}</strong>
                  </span>
                  <span className="guide-vs-sep">VS</span>
                  <span className="guide-side-box guide-side-away">
                    <strong>{visitHint || m.visitante}</strong>
                  </span>
                </div>
              </div>
            )}

            <div className="modal-meta-grid">
              <div className="modal-meta-item">
                <span className="meta-icon">📅</span>
                <div className="meta-content">
                  <span className="meta-label">Fecha y Hora</span>
                  <strong className="meta-value">{formatModalDate()}</strong>
                </div>
              </div>

              <div className="modal-meta-item">
                <span className="meta-icon">📍</span>
                <div className="meta-content">
                  <span className="meta-label">Escenario Deportivo</span>
                  <strong className="meta-value">{cancha.direccion}</strong>
                  {cancha.url && (
                    <a
                      href={cancha.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-maps-action modal-maps-link"
                    >
                      Abrir en Google Maps ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="modal-meta-item modal-referee-highlight">
                <span className="meta-icon">👨‍⚖️</span>
                <div className="meta-content">
                  <span className="meta-label">Árbitro Oficial</span>
                  <strong className="meta-value">
                    {m.arbitro ? (
                      m.arbitro
                    ) : (
                      <em style={{ color: '#64748b', fontWeight: 400 }}>
                        Por designar por la organización
                      </em>
                    )}
                  </strong>
                  <small className="meta-sub">
                    Máxima autoridad arbitral asignada para este encuentro
                  </small>
                </div>
              </div>

              {m.observaciones ? (
                <div className="modal-meta-item modal-obs-full">
                  <span className="meta-icon">📋</span>
                  <div className="meta-content">
                    <span className="meta-label">Planilla y Observaciones</span>
                    <p className="meta-obs-body" style={{ whiteSpace: 'pre-line' }}>
                      {m.observaciones}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
