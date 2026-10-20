import React from 'react';
import { useTournament } from '../context/TournamentContext';
import { Match, ResultMatch } from '../data/seedData';
import {
  getTeamShieldUrl,
  isMysteryTeam,
  getMysteryHint,
  parseCanchaInfo,
  cleanStr
} from '../utils/shields';

export const MatchCard: React.FC<{
  match: Match | ResultMatch;
  branchKey?: 'masculino' | 'femenino';
}> = ({ match, branchKey }) => {
  const { setActiveMatch } = useTournament();
  const m: any = match;

  const faseStr = cleanStr(m.fase);
  const faseUpper = faseStr.toUpperCase();
  const isGranFinal = faseUpper.includes('GRAN FINAL') || faseUpper === 'FINAL';
  const isTercerPuesto = faseUpper.includes('TERCER PUESTO');
  const isPlayIn = faseUpper.includes('PLAY-IN') || faseUpper.includes('PLAY IN');
  const isSemi = faseUpper.includes('SEMIFINAL');

  const isFem =
    branchKey === 'femenino'
      ? true
      : branchKey === 'masculino'
        ? false
        : m.branch === 'femenino' || faseUpper.includes('2.º') || faseUpper.includes('2.°');

  const branchClass = isFem ? 'match-fem' : 'match-masc';
  const branchLabel = isFem ? 'TORNEO FEMENINO' : 'TORNEO MASCULINO';
  const branchBadge = (
    <span className={`phase-category-badge ${isFem ? 'badge-fem' : 'badge-masc'}`}>
      {isFem ? 'FEMENINO' : 'MASCULINO'}
    </span>
  );

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

  const localIsMystery = isMysteryTeam(m.local);
  const visitIsMystery = isMysteryTeam(m.visitante);
  const localHint = localIsMystery ? getMysteryHint(m, 'local') : '';
  const visitHint = visitIsMystery ? getMysteryHint(m, 'visitante') : '';

  const localShield = getTeamShieldUrl(m.local);
  const visitShield = getTeamShieldUrl(m.visitante);

  let phaseCardClass = '';
  if (isGranFinal) {
    phaseCardClass = isFem
      ? 'match-card-gran-final card-gran-final-fem'
      : 'match-card-gran-final card-gran-final-masc';
  } else if (isTercerPuesto) {
    phaseCardClass = 'match-card-tercer-puesto';
  } else if (isSemi) {
    phaseCardClass = 'match-card-semifinal';
  } else if (isPlayIn) {
    phaseCardClass = 'match-card-playin';
  }

  const formatCardDate = () => {
    let str = m.fecha || 'Fecha por definir';
    if (m.hora) str += ` · ${m.hora}`;
    return str;
  };

  return (
    <div
      className={`match-row-card ${branchClass} ${phaseCardClass}`}
      tabIndex={0}
      role="button"
      aria-label={`Ver ficha del partido ${m.local} vs ${m.visitante}`}
      onClick={() => setActiveMatch(m)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveMatch(m);
        }
      }}
    >
      {isGranFinal ? (
        <div
          className={`phase-banner-header phase-banner-gran-final ${
            isFem ? 'banner-fem' : 'banner-masc'
          }`}
        >
          <span className="trophy-pulse">🏆</span>
          <span className="final-title-glow">GRAN FINAL · {branchLabel}</span>
          {branchBadge}
          <span className="trophy-pulse">🏆</span>
        </div>
      ) : isTercerPuesto ? (
        <div className="phase-banner-header phase-banner-tercer-puesto banner-masc">
          <span>🥉</span>
          <span>TERCER PUESTO · TORNEO MASCULINO</span>
          {branchBadge}
          <span>🥉</span>
        </div>
      ) : isSemi ? (
        <div className="phase-banner-header phase-banner-semifinal banner-masc">
          <span>⚡</span>
          <span>{faseStr} · TORNEO MASCULINO</span>
          {branchBadge}
        </div>
      ) : isPlayIn ? (
        <div
          className={`phase-banner-header phase-banner-playin ${
            isFem ? 'banner-fem' : 'banner-masc'
          }`}
        >
          <span>🔥</span>
          <span>{faseStr} · {branchLabel}</span>
          {branchBadge}
        </div>
      ) : null}

      <div className="match-teams-row">
        <div className={`team-side home ${localIsMystery ? 'is-mystery' : ''}`}>
          <div className="team-shield-box">
            {localShield ? (
              <img src={localShield} alt={m.local} className="team-shield-img" />
            ) : (
              <span className="team-shield-initials">
                {localIsMystery ? '?' : m.local.slice(0, 3)}
              </span>
            )}
          </div>
          <div className="team-info-col">
            <span className="team-name">{m.local}</span>
            {localHint && <span className="team-mystery-hint">{localHint}</span>}
          </div>
        </div>

        <div className="match-middle-box">
          {hasMarcador ? (
            <span className="match-score-pill">{marcadorDisplay}</span>
          ) : (
            <span className="match-vs-tag">vs</span>
          )}
        </div>

        <div className={`team-side away ${visitIsMystery ? 'is-mystery' : ''}`}>
          <div className="team-info-col team-info-col-away">
            <span className="team-name">{m.visitante}</span>
            {visitHint && <span className="team-mystery-hint">{visitHint}</span>}
          </div>
          <div className="team-shield-box">
            {visitShield ? (
              <img src={visitShield} alt={m.visitante} className="team-shield-img" />
            ) : (
              <span className="team-shield-initials">
                {visitIsMystery ? '?' : m.visitante.slice(0, 3)}
              </span>
            )}
          </div>
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

      <div className="match-meta-line">
        <div className="match-meta-left">
          <span className={`badge-tag ${isFem ? 'tag-femenino' : 'tag-masculino'}`}>
            {branchLabel}
          </span>
          <span>📅 {formatCardDate()}</span>
          <span>📍 {cancha.direccion}</span>
          {m.arbitro ? (
            <span className="match-referee-tag">
              👨‍⚖️ <strong>Árbitro:</strong> {m.arbitro}
            </span>
          ) : (
            <span className="match-referee-tag referee-pending">
              👨‍⚖️ Árbitro por designar
            </span>
          )}
        </div>
        {cancha.url && (
          <a
            href={cancha.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-maps-action"
            onClick={e => e.stopPropagation()}
          >
            Maps ↗
          </a>
        )}
      </div>
    </div>
  );
};
