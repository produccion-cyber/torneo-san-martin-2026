import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { MatchCard } from '../components/MatchCard';
import { AbbrTip } from '../components/AbbrTip';
import {
  getTeamShieldUrl,
  computeBranchFairPlaySummary,
  normStr
} from '../utils/shields';
import {
  getRankedScorers,
  getRankedAssists,
  getRankedKeepers,
  getRankedMVP,
  getRankedDiscipline
} from '../utils/tiebreakers';
import { SHEETS_CONFIG, RosterMember, PlayerStat } from '../data/seedData';

export const BranchView: React.FC<{
  branchKey: 'masculino' | 'femenino';
  initialSub?: string;
  onSelectBranch: (branch: 'masculino' | 'femenino') => void;
}> = ({ branchKey, initialSub = 'resumen', onSelectBranch }) => {
  const { data } = useTournament();
  const [subSection, setSubSection] = useState<string>(initialSub);
  const [statTab, setStatTab] = useState<string>('goleadores');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const cfg = SHEETS_CONFIG[branchKey];
  const branchData = data[branchKey];
  const cal = branchData.calendario || [];
  const res = branchData.resultados || [];
  const pos = branchData.posiciones || [];
  const jug = branchData.jugadores || [];
  const plantilla = branchData.plantilla?.length ? branchData.plantilla : cfg.plantillaBase;

  const isFem = branchKey === 'femenino';

  const toggleTeam = (teamName: string) => {
    setExpandedTeams(prev => {
      const next = new Set(prev);
      if (next.has(teamName)) next.delete(teamName);
      else next.add(teamName);
      return next;
    });
  };

  const isMatchPlayed = (m: any) => {
    if (m.estado === 'Jugado') return true;
    if (m.marcador && m.marcador !== '-' && m.marcador.includes('-')) return true;
    return false;
  };

  // Next match
  const nextMatch = cal.find(m => !isMatchPlayed(m));

  // Played matches
  const playedMatches = res.filter(r => r.estado === 'Jugado');

  // Ranked Scorers con criterios de desempate justos y transparentes:
  // 1. Goles -> 2. Asistencias -> 3. Puntaje MVP -> 4. Menos PJ -> 5. Fair Play
  const rankedScorers = getRankedScorers(jug);
  const topScorers = rankedScorers.map(r => r.item);

  // Ranked Assists (1. Asistencias -> 2. Goles -> 3. MVP -> 4. Menos PJ -> 5. Fair Play)
  const rankedAssists = getRankedAssists(jug);
  const topAssists = rankedAssists.map(r => r.item);

  // Top Keepers
  const getTeamKeeperName = (teamName: string) => {
    const keepers = plantilla.filter(
      p => normStr(p.team) === normStr(teamName) && normStr(p.role).includes('PORTER')
    );
    if (keepers.length) return keepers.map(k => k.name).join(' / ');
    return '';
  };

  // Ranked Keepers (1. Menor GC/PJ -> 2. Más PJ resguardados -> 3. Menor GC -> 4. PTS)
  const rankedKeepers = getRankedKeepers(pos);
  const topKeepers = rankedKeepers.map(r => r.item);

  // Ranked MVP (1. Puntos MVP -> 2. Goles -> 3. Asistencias -> 4. Menos PJ -> 5. Fair Play)
  const rankedMVP = getRankedMVP(jug);
  const mvpList = rankedMVP.map(r => r.item);

  // Ranked Disciplina (1. Mayor valor en sanciones $ -> 2. Más Rojas -> 3. Más Amarillas -> 4. Menos PJ)
  const rankedDiscipline = getRankedDiscipline(jug);
  const discList = rankedDiscipline.map(r => r.item);

  // Fairplay
  const fpSummary = computeBranchFairPlaySummary(
    cfg.equipos,
    jug,
    pos,
    playedMatches.length
  );

  // Group calendar matches by Jornada or Phase
  const calendarGroups: Record<string, typeof cal> = {};
  cal.forEach(m => {
    const key = m.fase || (m.jornada ? `Jornada ${m.jornada}` : 'Otras Fechas');
    if (!calendarGroups[key]) calendarGroups[key] = [];
    calendarGroups[key].push(m);
  });

  // Teams to display in equipos tab
  const teamsToDisplay =
    teamFilter === 'all' ? cfg.equipos : cfg.equipos.filter(eq => eq === teamFilter);

  return (
    <section id="view-rama" className="app-view active" aria-label="Espacio de categoría deportiva">
      {/* Selector de rama (fijo) */}
      <div className="branch-selector-bar">
        <div className="branch-toggle-control" role="tablist" aria-label="Seleccionar rama del torneo">
          <button
            id="btnRamaMasc"
            className={`branch-pill-btn ${!isFem ? 'active-masc' : ''}`}
            role="tab"
            aria-selected={!isFem}
            onClick={() => onSelectBranch('masculino')}
          >
            MASCULINO
          </button>
          <button
            id="btnRamaFem"
            className={`branch-pill-btn ${isFem ? 'active-fem' : ''}`}
            role="tab"
            aria-selected={isFem}
            onClick={() => onSelectBranch('femenino')}
          >
            FEMENINO
          </button>
        </div>
      </div>

      {/* Barra de sub-secciones fija bajo el selector */}
      <nav className="subsections-bar" aria-label="Subsecciones de la rama">
        <div className="subsections-scroll">
          {[
            { id: 'resumen', label: 'RESUMEN' },
            { id: 'calendario', label: 'CALENDARIO' },
            { id: 'resultados', label: 'RESULTADOS' },
            { id: 'posiciones', label: 'POSICIONES' },
            { id: 'equipos', label: 'EQUIPOS' },
            { id: 'estadisticas', label: 'ESTADÍSTICAS' },
            { id: 'presentacion', label: 'PRESENTACIÓN' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`sub-tab-btn ${subSection === tab.id ? 'active' : ''}`}
              onClick={() => setSubSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Encabezado de la rama actual */}
      <div className="branch-banner">
        <div className="branch-banner-text">
          <small className="branch-edition-badge" id="branchBadge">
            {cfg.badge}
          </small>
          <h1 className="branch-title" id="branchMainTitle">
            {isFem ? 'CATEGORÍA FEMENINA' : 'CATEGORÍA MASCULINA'}
          </h1>
          <p className="branch-desc" id="branchDescription">
            {cfg.desc}
          </p>
        </div>
      </div>

      {/* Contenedor dinámico de subsecciones */}
      <div className="subsection-content-container">
        {/* ==================== SUB-SECCIÓN: RESUMEN ==================== */}
        {subSection === 'resumen' && (
          <div id="sub-resumen" className="sub-panel active">
            {/* Próximo partido */}
            <div className="sub-block">
              <h3 className="sub-block-title">PRÓXIMO PARTIDO</h3>
              {nextMatch ? (
                <MatchCard match={nextMatch} branchKey={branchKey} />
              ) : (
                <div className="empty-state-card">
                  <p>Todos los partidos de la rama han finalizado.</p>
                </div>
              )}
            </div>

            {/* Clasificación de la rama */}
            <div className="sub-block">
              <div className="sub-block-head">
                <h3 className="sub-block-title">CLASIFICACIÓN OFICIAL</h3>
                <button
                  className="btn-link-action"
                  onClick={() => setSubSection('posiciones')}
                >
                  Ver tabla completa →
                </button>
              </div>
              <div className="table-responsive-box">
                <table className="official-table">
                  <thead>
                    <tr>
                      <th><AbbrTip abbrKey="POS" customLabel="#" /></th>
                      <th>Equipo</th>
                      <th className="num-cell"><AbbrTip abbrKey="PJ" /></th>
                      <th className="pts-cell"><AbbrTip abbrKey="PTS" /></th>
                      <th className="num-cell">Forma</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pos.slice(0, 4).map((p, idx) => {
                      const shield = getTeamShieldUrl(p.equipo);
                      return (
                        <tr key={idx}>
                          <td><strong>{p.pos || idx + 1}</strong></td>
                          <td>
                            <div className="table-team-cell">
                              {shield ? (
                                <img src={shield} alt={p.equipo} className="team-shield-img" />
                              ) : (
                                <span className="team-shield-initials">{p.equipo.slice(0, 3)}</span>
                              )}
                              <span>{p.equipo}</span>
                            </div>
                          </td>
                          <td className="num-cell">{p.pj}</td>
                          <td className="pts-cell">{p.pts}</td>
                          <td className="num-cell">
                            <span className="last5-pill">{p.ult5 || '-'}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Últimos resultados de la rama */}
            <div className="sub-block">
              <div className="sub-block-head">
                <h3 className="sub-block-title">ÚLTIMOS RESULTADOS</h3>
                <button
                  className="btn-link-action"
                  onClick={() => setSubSection('resultados')}
                >
                  Ver todos los resultados →
                </button>
              </div>
              <div className="results-stream">
                {playedMatches.length > 0 ? (
                  playedMatches
                    .slice(0, 3)
                    .map((m, idx) => (
                      <MatchCard key={`res-${idx}`} match={m} branchKey={branchKey} />
                    ))
                ) : (
                  <p className="empty-state-msg">Aún no se han disputado partidos en esta categoría.</p>
                )}
              </div>
            </div>

            {/* Los 3 mejores de estadísticas */}
            <div className="sub-block">
              <div className="sub-block-head">
                <h3 className="sub-block-title">DESTACADOS DEL TORNEO</h3>
                <button
                  className="btn-link-action"
                  onClick={() => setSubSection('estadisticas')}
                >
                  Ver estadísticas →
                </button>
              </div>
              <div className="top-three-grid">
                {/* Goleadores */}
                <article className="top-three-card">
                  <header className="top-three-header">
                    <strong>⚽ GOLEADORES</strong>
                  </header>
                  <div className="top-three-body">
                    {rankedScorers.length > 0 ? (
                      rankedScorers.slice(0, 3).map((r, idx) => {
                        const s = r.item;
                        const shield = getTeamShieldUrl(s.equipo);
                        return (
                          <div key={idx} className="top-three-row">
                            <span className="top-rank-pos">
                              #{r.rank}
                              {r.isTie && (
                                <small style={{ fontSize: '0.65rem', color: '#38bdf8', marginLeft: '2px' }} title={r.tieReason || 'Empate compartido'}>
                                  =
                                </small>
                              )}
                            </span>
                            <div className="top-player-cell">
                              {shield ? (
                                <img src={shield} alt={s.equipo} className="team-shield-img" />
                              ) : null}
                              <div className="top-player-text">
                                <strong>{s.jugador}</strong>
                                <small>{s.equipo} · {s.asistencias} Asist. · {s.mvp} MVP</small>
                              </div>
                            </div>
                            <strong className="top-stat-val">{s.goles}</strong>
                          </div>
                        );
                      })
                    ) : (
                      <p className="empty-state-msg">Aún no hay goles registrados.</p>
                    )}
                  </div>
                </article>

                {/* Asistencias */}
                <article className="top-three-card">
                  <header className="top-three-header">
                    <strong>🅰️ ASISTENCIAS</strong>
                  </header>
                  <div className="top-three-body">
                    {rankedAssists.length > 0 ? (
                      rankedAssists.slice(0, 3).map((r, idx) => {
                        const a = r.item;
                        const shield = getTeamShieldUrl(a.equipo);
                        return (
                          <div key={idx} className="top-three-row">
                            <span className="top-rank-pos">
                              #{r.rank}
                              {r.isTie && (
                                <small style={{ fontSize: '0.65rem', color: '#38bdf8', marginLeft: '2px' }} title={r.tieReason || 'Empate compartido'}>
                                  =
                                </small>
                              )}
                            </span>
                            <div className="top-player-cell">
                              {shield ? (
                                <img src={shield} alt={a.equipo} className="team-shield-img" />
                              ) : null}
                              <div className="top-player-text">
                                <strong>{a.jugador}</strong>
                                <small>{a.equipo} · {a.goles} Goles · {a.mvp} MVP</small>
                              </div>
                            </div>
                            <strong className="top-stat-val">{a.asistencias}</strong>
                          </div>
                        );
                      })
                    ) : (
                      <p className="empty-state-msg">Aún no hay asistencias registradas.</p>
                    )}
                  </div>
                </article>

                {/* Valla Menos Vencida */}
                <article className="top-three-card">
                  <header className="top-three-header">
                    <strong>🧤 VALLA MENOS VENCIDA</strong>
                  </header>
                  <div className="top-three-body">
                    {rankedKeepers.length > 0 ? (
                      rankedKeepers.slice(0, 3).map((r, idx) => {
                        const k = r.item;
                        const shield = getTeamShieldUrl(k.equipo);
                        const keeperName = getTeamKeeperName(k.equipo);
                        return (
                          <div key={idx} className="top-three-row">
                            <span className="top-rank-pos">
                              #{r.rank}
                              {r.isTie && (
                                <small style={{ fontSize: '0.65rem', color: '#38bdf8', marginLeft: '2px' }} title={r.tieReason || 'Empate compartido'}>
                                  =
                                </small>
                              )}
                            </span>
                            <div className="top-player-cell">
                              {shield ? (
                                <img src={shield} alt={k.equipo} className="team-shield-img" />
                              ) : null}
                              <div className="top-player-text">
                                <strong>{keeperName || k.equipo}</strong>
                                <small>{keeperName ? `${k.equipo} · ${k.gc} GC en ${k.pj} PJ` : `${k.gc} GC en ${k.pj} PJ`}</small>
                              </div>
                            </div>
                            <strong className="top-stat-val">{(k.gc / (k.pj || 1)).toFixed(1)}</strong>
                          </div>
                        );
                      })
                    ) : (
                      <p className="empty-state-msg">Se mostrará al disputarse los partidos.</p>
                    )}
                  </div>
                </article>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SUB-SECCIÓN: CALENDARIO ==================== */}
        {subSection === 'calendario' && (
          <div id="sub-calendario" className="sub-panel active">
            <div className="sub-block-head">
              <h3 className="sub-block-title">CALENDARIO OFICIAL POR JORNADAS</h3>
            </div>
            <div className="calendar-rounds-stream">
              {Object.entries(calendarGroups).map(([groupTitle, matches]) => (
                <div key={groupTitle} className="calendar-round-block">
                  <div className="calendar-round-header">
                    <h4>{groupTitle.toUpperCase()}</h4>
                  </div>
                  <div className="matches-stream">
                    {matches.map((m, idx) => (
                      <MatchCard key={idx} match={m} branchKey={branchKey} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SUB-SECCIÓN: RESULTADOS ==================== */}
        {subSection === 'resultados' && (
          <div id="sub-resultados" className="sub-panel active">
            <div className="sub-block-head">
              <h3 className="sub-block-title">RESULTADOS OFICIALES</h3>
            </div>
            <div className="results-stream">
              {res.length > 0 ? (
                res.map((m, idx) => (
                  <MatchCard key={idx} match={m} branchKey={branchKey} />
                ))
              ) : (
                <p className="empty-state-msg">Aún no se han disputado partidos oficiales en esta categoría.</p>
              )}
            </div>
          </div>
        )}

        {/* ==================== SUB-SECCIÓN: POSICIONES ==================== */}
        {subSection === 'posiciones' && (
          <div id="sub-posiciones" className="sub-panel active">
            <div className="sub-block-head">
              <h3 className="sub-block-title">TABLA OFICIAL DE POSICIONES</h3>
            </div>
            <div className="table-responsive-box">
              <table className="official-table">
                <thead>
                  <tr>
                    <th><AbbrTip abbrKey="POS" customLabel="#" /></th>
                    <th>Equipo</th>
                    <th className="num-cell"><AbbrTip abbrKey="PJ" /></th>
                    <th className="num-cell"><AbbrTip abbrKey="PG" /></th>
                    <th className="num-cell"><AbbrTip abbrKey="PE" /></th>
                    <th className="num-cell"><AbbrTip abbrKey="PP" /></th>
                    <th className="num-cell"><AbbrTip abbrKey="GF" /></th>
                    <th className="num-cell"><AbbrTip abbrKey="GC" /></th>
                    <th className="num-cell"><AbbrTip abbrKey="DG" /></th>
                    <th className="pts-cell"><AbbrTip abbrKey="PTS" /></th>
                    <th className="num-cell">Últimos 5</th>
                  </tr>
                </thead>
                <tbody>
                  {pos.map((p, idx) => {
                    const shield = getTeamShieldUrl(p.equipo);
                    return (
                      <tr key={idx}>
                        <td>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <span
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                background: isFem
                                  ? (idx < 2 ? '#f43f5e' : '#475569')
                                  : (idx < 4 ? '#38bdf8' : '#475569')
                              }}
                              title={
                                isFem
                                  ? (idx < 2 ? 'Zona de Gran Final' : 'Fase regular')
                                  : (idx < 4 ? 'Zona de Semifinales' : 'Fase regular')
                              }
                            />
                            <strong>{p.pos || idx + 1}</strong>
                          </div>
                        </td>
                        <td>
                          <div className="table-team-cell">
                            {shield ? (
                              <img src={shield} alt={p.equipo} className="team-shield-img" />
                            ) : (
                              <span className="team-shield-initials">{p.equipo.slice(0, 3)}</span>
                            )}
                            <strong>{p.equipo}</strong>
                          </div>
                        </td>
                        <td className="num-cell">{p.pj}</td>
                        <td className="num-cell">{p.pg}</td>
                        <td className="num-cell">{p.pe}</td>
                        <td className="num-cell">{p.pp}</td>
                        <td className="num-cell">{p.gf}</td>
                        <td className="num-cell">{p.gc}</td>
                        <td className="num-cell">{p.dg > 0 ? `+${p.dg}` : p.dg}</td>
                        <td className="pts-cell">{p.pts}</td>
                        <td className="num-cell">
                          <span className="last5-pill">{p.ult5 || '-'}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="standings-legend-box" style={{ marginTop: '16px', fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              {isFem ? (
                <div>
                  <span style={{ color: '#d62976', fontWeight: 600 }}>● 1.º y 2.º Lugar:</span> Clasificación directa a la <strong>Gran Final</strong> (Puesto 1 vs Puesto 2). <br />
                  <span style={{ color: '#64748b', fontWeight: 500 }}>● 3.º Lugar:</span> Culmina su participación en fase regular.
                </div>
              ) : (
                <div>
                  <span style={{ color: '#31a8e6', fontWeight: 600 }}>● 1.º al 4.º Lugar:</span> Clasificación a <strong>Semifinales</strong> (Semifinal 1: Puesto 1 vs Puesto 4 · Semifinal 2: Puesto 2 vs Puesto 3). <br />
                  <span style={{ color: '#64748b', fontWeight: 500 }}>● 5.º Lugar:</span> Culmina su participación en fase regular. <br />
                  <span style={{ color: '#f59e0b', fontWeight: 600 }}>● Gran Final:</span> Disputada entre los ganadores de ambas Semifinales.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== SUB-SECCIÓN: EQUIPOS Y PLANTILLAS ==================== */}
        {subSection === 'equipos' && (
          <div id="sub-equipos" className="sub-panel active">
            <div className="sub-block-head">
              <div>
                <h3 className="sub-block-title">EQUIPOS Y PLANTILLAS OFICIALES</h3>
                <p className="section-subtitle">
                  Presiona cualquier equipo para desplegar su plantilla de jugadores, dorsales y estadísticas
                </p>
              </div>
              <div className="team-filter-wrap">
                <label htmlFor="selectTeamFilter" className="sr-only">
                  Filtrar por equipo
                </label>
                <select
                  id="selectTeamFilter"
                  className="form-select"
                  value={teamFilter}
                  onChange={e => setTeamFilter(e.target.value)}
                >
                  <option value="all">Todos los equipos</option>
                  {cfg.equipos.map(eq => (
                    <option key={eq} value={eq}>
                      {eq}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="teams-cards-grid">
              {teamsToDisplay.map(teamName => {
                const shield = getTeamShieldUrl(teamName);
                const isExpanded = expandedTeams.has(teamName);
                const teamPlayers = plantilla.filter(
                  p => normStr(p.team) === normStr(teamName)
                );
                const captain = teamPlayers.find(p => normStr(p.role).includes('CAPIT'))?.name || 'Por definir';

                // Find stats of players in this team
                const teamStats = jug.filter(j => normStr(j.equipo) === normStr(teamName));

                return (
                  <article key={teamName} className="team-card-box">
                    <header
                      className="team-card-header"
                      onClick={() => toggleTeam(teamName)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="team-card-head-left">
                        {shield ? (
                          <img src={shield} alt={teamName} className="team-shield-img shield-medium" />
                        ) : (
                          <span className="team-shield-initials">{teamName.slice(0, 3)}</span>
                        )}
                        <div>
                          <h4 className="team-card-name">{teamName}</h4>
                          <span className="team-captain-pill">Capitán: {captain}</span>
                        </div>
                      </div>
                      <button
                        className="btn-expand-team"
                        aria-label="Expandir nómina"
                        onClick={e => {
                          e.stopPropagation();
                          toggleTeam(teamName);
                        }}
                      >
                        {isExpanded ? '▲ Ocultar nómina' : `▼ Ver ${teamPlayers.length} jugadores`}
                      </button>
                    </header>

                    {isExpanded && (
                      <div className="team-roster-body">
                        <table className="roster-table">
                          <thead>
                            <tr>
                              <th>Dorsal</th>
                              <th>Jugador</th>
                              <th>Posición / Rol</th>
                              <th className="num-cell">PJ</th>
                              <th className="num-cell">Goles</th>
                              <th className="num-cell">Asist.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamPlayers.map((player, pIdx) => {
                              const pStat = teamStats.find(
                                s => normStr(s.jugador) === normStr(player.name)
                              );
                              return (
                                <tr key={pIdx}>
                                  <td>
                                    <span className="player-dorsal-pill">
                                      #{player.number || '—'}
                                    </span>
                                  </td>
                                  <td>
                                    <strong>{player.name}</strong>
                                  </td>
                                  <td>
                                    <span className="player-role-tag">{player.role}</span>
                                  </td>
                                  <td className="num-cell">{pStat?.pj ?? 0}</td>
                                  <td className="num-cell">{pStat?.goles ?? 0} ⚽</td>
                                  <td className="num-cell">{pStat?.asistencias ?? 0} 🅰️</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== SUB-SECCIÓN: ESTADÍSTICAS ==================== */}
        {subSection === 'estadisticas' && (
          <div id="sub-estadisticas" className="sub-panel active">
            <div className="stats-internal-bar">
              {[
                { id: 'goleadores', label: 'GOLEADORES' },
                { id: 'asistencias', label: 'ASISTENCIAS' },
                { id: 'valla', label: 'VALLA MENOS VENCIDA' },
                { id: 'mvp', label: 'MVP' },
                { id: 'disciplina', label: 'DISCIPLINA' },
                { id: 'fairplay', label: 'FAIR PLAY' },
                { id: 'generales', label: 'GENERALES' }
              ].map(st => (
                <button
                  key={st.id}
                  className={`stats-tab-btn ${statTab === st.id ? 'active' : ''}`}
                  onClick={() => setStatTab(st.id)}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Goleadores */}
            {statTab === 'goleadores' && (
              <div className="stats-panel-box">
                {/* Banner de Criterios Oficiales de Desempate */}
                <div
                  className="stats-criteria-banner"
                  style={{
                    background: 'rgba(49, 168, 230, 0.08)',
                    border: '1px solid rgba(49, 168, 230, 0.25)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '18px',
                    fontSize: '0.86rem',
                    color: '#cbd5e1'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.1rem' }}>⚖️</span>
                    <strong style={{ color: '#38bdf8' }}>Criterios Oficiales de Desempate (Bota de Oro):</strong>
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.45 }}>
                    <strong>1.º</strong> Goles anotados · <strong>2.º</strong> Mayor cantidad de Asistencias directas ·{' '}
                    <strong>3.º</strong> Mayor puntaje MVP acumulado · <strong>4.º</strong> Menor número de Partidos Jugados (PJ) (mayor promedio/eficiencia) ·{' '}
                    <strong>5.º</strong> Fair Play (menor sanción económica en tarjetas). Si todos los criterios son idénticos, comparten con justicia la misma posición oficial (#).
                  </p>
                </div>

                {rankedScorers.length > 0 ? (
                  <>
                    <div className="stats-podium-grid">
                      {rankedScorers.slice(0, 3).map((r, idx) => {
                        const s = r.item;
                        const shield = getTeamShieldUrl(s.equipo);
                        return (
                          <div key={idx} className={`stats-podium-card ${r.rank === 1 ? 'rank-1' : ''}`}>
                            <div className="stats-podium-left">
                              {shield ? <img src={shield} alt={s.equipo} className="team-shield-img" /> : null}
                              <div className="stats-podium-info">
                                <span className="stats-podium-rank">
                                  {r.rank === 1 ? '🥇 #1 LÍDER' : r.rank === 2 ? '🥈 #2' : r.rank === 3 ? '🥉 #3' : `#${r.rank}`}
                                  {r.isTie && (
                                    <span
                                      style={{
                                        marginLeft: '6px',
                                        fontSize: '0.7rem',
                                        background: '#0284c7',
                                        color: '#fff',
                                        padding: '1px 6px',
                                        borderRadius: '4px',
                                        textTransform: 'uppercase'
                                      }}
                                      title={r.tieReason || 'Empate técnico compartido'}
                                    >
                                      Empate
                                    </span>
                                  )}
                                </span>
                                <strong className="stats-podium-name">{s.jugador}</strong>
                                <span className="stats-podium-team">{s.equipo} · #{s.dorsal || '—'}</span>
                                <small style={{ color: '#94a3b8', fontSize: '0.76rem', marginTop: '3px', display: 'block' }}>
                                  🅰️ {s.asistencias} Asist. · ⭐ {s.mvp} MVP · 🛡️ {s.pj} PJ
                                </small>
                              </div>
                            </div>
                            <div className="stats-podium-val">
                              {s.goles}
                              <small>GOLES</small>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="table-responsive-box">
                      <table className="official-table">
                        <thead>
                          <tr>
                            <th><AbbrTip abbrKey="POS" customLabel="#" /></th>
                            <th>Jugador</th>
                            <th>Equipo</th>
                            <th className="num-cell"><AbbrTip abbrKey="PJ" /></th>
                            <th className="pts-cell">Goles ⚽</th>
                            <th className="num-cell">Asist. 🅰️</th>
                            <th className="num-cell">MVP ⭐</th>
                            <th className="num-cell"><AbbrTip abbrKey="PROM" /></th>
                          </tr>
                        </thead>
                        <tbody>
                          {rankedScorers.map((r, i) => {
                            const s = r.item;
                            const shield = getTeamShieldUrl(s.equipo);
                            return (
                              <tr key={i}>
                                <td>
                                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    <strong>{r.rank}</strong>
                                    {r.isTie && (
                                      <span
                                        title={r.tieReason || 'Empate oficial compartido'}
                                        style={{
                                          fontSize: '0.65rem',
                                          background: 'rgba(56, 189, 248, 0.2)',
                                          color: '#38bdf8',
                                          border: '1px solid rgba(56, 189, 248, 0.4)',
                                          padding: '0 4px',
                                          borderRadius: '3px'
                                        }}
                                      >
                                        =
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div className="table-player-cell">
                                    <strong>{s.jugador}</strong>
                                    {s.dorsal && <span className="player-dorsal-pill">#{s.dorsal}</span>}
                                  </div>
                                </td>
                                <td>
                                  <div className="table-team-cell">
                                    {shield && <img src={shield} alt={s.equipo} className="team-shield-img" />}
                                    <span>{s.equipo}</span>
                                  </div>
                                </td>
                                <td className="num-cell">{s.pj}</td>
                                <td className="pts-cell">{s.goles}</td>
                                <td className="num-cell">{s.asistencias}</td>
                                <td className="num-cell">{s.mvp}</td>
                                <td className="num-cell">{s.pj > 0 ? (s.goles / s.pj).toFixed(1) : '—'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="empty-state-card">
                    <p>Aún no se han registrado goles en esta categoría.</p>
                  </div>
                )}
              </div>
            )}

            {/* Asistencias */}
            {statTab === 'asistencias' && (
              <div className="stats-panel-box">
                {/* Banner de Criterios Oficiales de Desempate */}
                <div
                  className="stats-criteria-banner"
                  style={{
                    background: 'rgba(49, 168, 230, 0.08)',
                    border: '1px solid rgba(49, 168, 230, 0.25)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '18px',
                    fontSize: '0.86rem',
                    color: '#cbd5e1'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.1rem' }}>⚖️</span>
                    <strong style={{ color: '#38bdf8' }}>Criterios Oficiales de Desempate (Líder de Asistencias):</strong>
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.45 }}>
                    <strong>1.º</strong> Asistencias · <strong>2.º</strong> Mayor cantidad de Goles anotados ·{' '}
                    <strong>3.º</strong> Mayor puntaje MVP acumulado · <strong>4.º</strong> Menor número de Partidos Jugados (PJ) (mayor promedio) ·{' '}
                    <strong>5.º</strong> Fair Play. Si todos los criterios son idénticos, comparten oficialmente la misma posición (#).
                  </p>
                </div>

                {rankedAssists.length > 0 ? (
                  <>
                    <div className="stats-podium-grid">
                      {rankedAssists.slice(0, 3).map((r, idx) => {
                        const a = r.item;
                        const shield = getTeamShieldUrl(a.equipo);
                        return (
                          <div key={idx} className={`stats-podium-card ${r.rank === 1 ? 'rank-1' : ''}`}>
                            <div className="stats-podium-left">
                              {shield ? <img src={shield} alt={a.equipo} className="team-shield-img" /> : null}
                              <div className="stats-podium-info">
                                <span className="stats-podium-rank">
                                  {r.rank === 1 ? '🥇 #1 LÍDER' : r.rank === 2 ? '🥈 #2' : r.rank === 3 ? '🥉 #3' : `#${r.rank}`}
                                  {r.isTie && (
                                    <span
                                      style={{
                                        marginLeft: '6px',
                                        fontSize: '0.7rem',
                                        background: '#0284c7',
                                        color: '#fff',
                                        padding: '1px 6px',
                                        borderRadius: '4px',
                                        textTransform: 'uppercase'
                                      }}
                                      title={r.tieReason || 'Empate técnico compartido'}
                                    >
                                      Empate
                                    </span>
                                  )}
                                </span>
                                <strong className="stats-podium-name">{a.jugador}</strong>
                                <span className="stats-podium-team">{a.equipo} · #{a.dorsal || '—'}</span>
                                <small style={{ color: '#94a3b8', fontSize: '0.76rem', marginTop: '3px', display: 'block' }}>
                                  ⚽ {a.goles} Goles · ⭐ {a.mvp} MVP · 🛡️ {a.pj} PJ
                                </small>
                              </div>
                            </div>
                            <div className="stats-podium-val">
                              {a.asistencias}
                              <small>ASIST.</small>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="table-responsive-box">
                      <table className="official-table">
                        <thead>
                          <tr>
                            <th><AbbrTip abbrKey="POS" customLabel="#" /></th>
                            <th>Jugador</th>
                            <th>Equipo</th>
                            <th className="num-cell"><AbbrTip abbrKey="PJ" /></th>
                            <th className="pts-cell">Asistencias 🅰️</th>
                            <th className="num-cell">Goles ⚽</th>
                            <th className="num-cell">MVP ⭐</th>
                            <th className="num-cell"><AbbrTip abbrKey="PROM" /></th>
                          </tr>
                        </thead>
                        <tbody>
                          {rankedAssists.map((r, i) => {
                            const a = r.item;
                            const shield = getTeamShieldUrl(a.equipo);
                            return (
                              <tr key={i}>
                                <td>
                                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    <strong>{r.rank}</strong>
                                    {r.isTie && (
                                      <span
                                        title={r.tieReason || 'Empate oficial compartido'}
                                        style={{
                                          fontSize: '0.65rem',
                                          background: 'rgba(56, 189, 248, 0.2)',
                                          color: '#38bdf8',
                                          border: '1px solid rgba(56, 189, 248, 0.4)',
                                          padding: '0 4px',
                                          borderRadius: '3px'
                                        }}
                                      >
                                        =
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div className="table-player-cell">
                                    <strong>{a.jugador}</strong>
                                    {a.dorsal && <span className="player-dorsal-pill">#{a.dorsal}</span>}
                                  </div>
                                </td>
                                <td>
                                  <div className="table-team-cell">
                                    {shield && <img src={shield} alt={a.equipo} className="team-shield-img" />}
                                    <span>{a.equipo}</span>
                                  </div>
                                </td>
                                <td className="num-cell">{a.pj}</td>
                                <td className="pts-cell">{a.asistencias}</td>
                                <td className="num-cell">{a.goles}</td>
                                <td className="num-cell">{a.mvp}</td>
                                <td className="num-cell">{a.pj > 0 ? (a.asistencias / a.pj).toFixed(1) : '—'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="empty-state-card">
                    <p>Aún no hay asistencias registradas en esta categoría.</p>
                  </div>
                )}
              </div>
            )}

            {/* Valla Menos Vencida */}
            {statTab === 'valla' && (
              <div className="stats-panel-box">
                {/* Banner de Criterios Oficiales */}
                <div
                  className="stats-criteria-banner"
                  style={{
                    background: 'rgba(49, 168, 230, 0.08)',
                    border: '1px solid rgba(49, 168, 230, 0.25)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '18px',
                    fontSize: '0.86rem',
                    color: '#cbd5e1'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.1rem' }}>⚖️</span>
                    <strong style={{ color: '#38bdf8' }}>Criterios Oficiales (Valla Menos Vencida):</strong>
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.45 }}>
                    <strong>1.º</strong> Menor promedio de Goles Recibidos por Partido (GC/PJ) ·{' '}
                    <strong>2.º</strong> Mayor cantidad de Partidos Jugados (PJ) resguardando la portería ·{' '}
                    <strong>3.º</strong> Menor cantidad de Goles en Contra absolutos (GC) ·{' '}
                    <strong>4.º</strong> Mayor puntaje del equipo en la tabla (PTS). Si todos los valores coinciden, comparten posición oficial.
                  </p>
                </div>

                {rankedKeepers.length > 0 ? (
                  <div className="table-responsive-box">
                    {rankedKeepers.map((r, i) => {
                      const k = r.item;
                      const shield = getTeamShieldUrl(k.equipo);
                      const keeperName = getTeamKeeperName(k.equipo);
                      return (
                        <div key={i} className="keeper-stat-row">
                          <div className="keeper-info-left">
                            <span className="top-rank-pos">
                              #{r.rank}
                              {r.isTie && (
                                <small style={{ fontSize: '0.65rem', color: '#38bdf8', marginLeft: '2px' }} title={r.tieReason || 'Empate compartido'}>
                                  =
                                </small>
                              )}
                            </span>
                            {shield && <img src={shield} alt={k.equipo} className="team-shield-img" />}
                            <div>
                              <strong>{k.equipo}</strong>
                              <small className="keeper-meta-sub">
                                {keeperName ? `🧤 Portero: ${keeperName} · ` : ''}
                                {k.gc} GC en {k.pj} PJ · {k.pts} PTS en tabla
                              </small>
                            </div>
                          </div>
                          <div className="keeper-stat-right">
                            <strong className="keeper-prom-value">{(k.gc / (k.pj || 1)).toFixed(1)}</strong>
                            <span className="keeper-prom-label"><AbbrTip abbrKey="GC_PJ" /></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-state-card">
                    <p>Se mostrará el ranking de las porterías más seguras en cuanto se disputen los partidos.</p>
                  </div>
                )}
              </div>
            )}

            {/* MVP */}
            {statTab === 'mvp' && (
              <div className="stats-panel-box">
                {/* Banner de Criterios Oficiales de Desempate */}
                <div
                  className="stats-criteria-banner"
                  style={{
                    background: 'rgba(49, 168, 230, 0.08)',
                    border: '1px solid rgba(49, 168, 230, 0.25)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '18px',
                    fontSize: '0.86rem',
                    color: '#cbd5e1'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.1rem' }}>⚖️</span>
                    <strong style={{ color: '#38bdf8' }}>Criterios Oficiales de Desempate (Jugador Más Valioso - MVP):</strong>
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.45 }}>
                    <strong>1.º</strong> Mayor puntaje acumulado MVP · <strong>2.º</strong> Goles anotados ·{' '}
                    <strong>3.º</strong> Asistencias directas · <strong>4.º</strong> Menor número de Partidos Jugados (PJ) ·{' '}
                    <strong>5.º</strong> Fair Play (menos tarjetas). Si todos los criterios son idénticos, comparten oficialmente la posición.
                  </p>
                </div>

                {rankedMVP.length > 0 ? (
                  <div className="table-responsive-box">
                    <table className="official-table">
                      <thead>
                        <tr>
                          <th><AbbrTip abbrKey="POS" customLabel="#" /></th>
                          <th>Jugador</th>
                          <th>Equipo</th>
                          <th className="num-cell"><AbbrTip abbrKey="PJ" /></th>
                          <th className="num-cell">Goles ⚽</th>
                          <th className="num-cell">Asist. 🅰️</th>
                          <th className="pts-cell">Puntaje <AbbrTip abbrKey="MVP" /> ⭐</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rankedMVP.map((r, i) => {
                          const m = r.item;
                          const shield = getTeamShieldUrl(m.equipo);
                          return (
                            <tr key={i}>
                              <td>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <strong>{r.rank}</strong>
                                  {r.isTie && (
                                    <span
                                      title={r.tieReason || 'Empate oficial compartido'}
                                      style={{
                                        fontSize: '0.65rem',
                                        background: 'rgba(56, 189, 248, 0.2)',
                                        color: '#38bdf8',
                                        border: '1px solid rgba(56, 189, 248, 0.4)',
                                        padding: '0 4px',
                                        borderRadius: '3px'
                                      }}
                                    >
                                      =
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="table-player-cell">
                                  <strong>{m.jugador}</strong>
                                  {m.dorsal && <span className="player-dorsal-pill">#{m.dorsal}</span>}
                                </div>
                              </td>
                              <td>
                                <div className="table-team-cell">
                                  {shield && <img src={shield} alt={m.equipo} className="team-shield-img" />}
                                  <span>{m.equipo}</span>
                                </div>
                              </td>
                              <td className="num-cell">{m.pj}</td>
                              <td className="num-cell">{m.goles}</td>
                              <td className="num-cell">{m.asistencias}</td>
                              <td className="pts-cell">{m.mvp}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="empty-state-card">
                    <p>Los puntajes MVP individuales se mostrarán tras disputarse cada jornada oficial.</p>
                  </div>
                )}
              </div>
            )}

            {/* Disciplina */}
            {statTab === 'disciplina' && (
              <div className="stats-panel-box">
                {/* Banner de Criterios Disciplinarios */}
                <div
                  className="stats-criteria-banner"
                  style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '18px',
                    fontSize: '0.86rem',
                    color: '#cbd5e1'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.1rem' }}>⚖️</span>
                    <strong style={{ color: '#f87171' }}>Criterios de Orden Disciplinario:</strong>
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.45 }}>
                    <strong>1.º</strong> Mayor valor acumulado en sanciones económicas (TR: $10.000 COP, TA: $5.000 COP) ·{' '}
                    <strong>2.º</strong> Mayor número de Tarjetas Rojas directas (TR) · <strong>3.º</strong> Mayor número de Tarjetas Amarillas (TA) ·{' '}
                    <strong>4.º</strong> Menos partidos jugados.
                  </p>
                </div>

                {rankedDiscipline.length > 0 ? (
                  <div className="table-responsive-box">
                    <table className="official-table">
                      <thead>
                        <tr>
                          <th><AbbrTip abbrKey="POS" customLabel="#" /></th>
                          <th>Jugador</th>
                          <th>Equipo</th>
                          <th className="num-cell"><AbbrTip abbrKey="PJ" /></th>
                          <th className="num-cell"><AbbrTip abbrKey="TA" /> ($5k)</th>
                          <th className="num-cell"><AbbrTip abbrKey="TR" /> ($10k)</th>
                          <th className="pts-cell">Multa <AbbrTip abbrKey="COP" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {rankedDiscipline.map((r, idx) => {
                          const d = r.item;
                          const shield = getTeamShieldUrl(d.equipo);
                          return (
                            <tr key={idx}>
                              <td>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <strong>{r.rank}</strong>
                                  {r.isTie && (
                                    <span
                                      title="Misma acumulación de sanciones"
                                      style={{
                                        fontSize: '0.65rem',
                                        background: 'rgba(239, 68, 68, 0.2)',
                                        color: '#f87171',
                                        border: '1px solid rgba(239, 68, 68, 0.4)',
                                        padding: '0 4px',
                                        borderRadius: '3px'
                                      }}
                                    >
                                      =
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="table-player-cell">
                                  <strong>{d.jugador}</strong>
                                  {d.dorsal && <span className="player-dorsal-pill">#{d.dorsal}</span>}
                                </div>
                              </td>
                              <td>
                                <div className="table-team-cell">
                                  {shield && <img src={shield} alt={d.equipo} className="team-shield-img" />}
                                  <span>{d.equipo}</span>
                                </div>
                              </td>
                              <td className="num-cell">{d.pj}</td>
                              <td className="num-cell">{d.ta} 🟨</td>
                              <td className="num-cell">{d.tr} 🟥</td>
                              <td className="pts-cell">${((d.ta * 5000) + (d.tr * 10000)).toLocaleString('es-CO')}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="stats-hero-banner fairplay-excelente">
                    <div className="stats-hero-top">
                      <span className="stats-hero-icon">🛡️</span>
                      <h3 className="stats-hero-title">¡DISCIPLINA IMPECABLE! CERO TARJETAS REGISTRADAS</h3>
                    </div>
                    <p className="stats-hero-desc">
                      Hasta el momento ningún jugador ha recibido Tarjetas Amarillas ni Tarjetas Rojas.
                      ¡Felicitaciones a todos los equipos por su conducta ejemplar!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Fair Play */}
            {statTab === 'fairplay' && (
              <div className="stats-panel-box">
                <div className="stats-hero-banner fairplay-excelente">
                  <div className="stats-hero-top">
                    <span className="stats-hero-icon">🤝</span>
                    <h3 className="stats-hero-title">
                      {fpSummary.jugadosCount === 0
                        ? '¡COMPROMISO TOTAL CON EL JUEGO LIMPIO!'
                        : fpSummary.allZeroCards
                          ? '¡HASTA EL MOMENTO TODOS LOS EQUIPOS TIENEN UN FAIR PLAY EXCELENTE!'
                          : 'CLASIFICACIÓN OFICIAL DE FAIR PLAY'}
                    </h3>
                  </div>
                  <p className="stats-hero-desc">
                    {fpSummary.jugadosCount === 0
                      ? 'Todos los equipos inician con un Fair Play impecable. Primero las personas, después el resultado.'
                      : fpSummary.allZeroCards
                        ? 'No se han sacado tarjetas en lo que va del torneo: todos los equipos compiten con respeto y compañerismo.'
                        : 'El índice de Fair Play evalúa las amonestaciones oficiales de cada equipo.'}
                  </p>
                </div>
                <div className="table-responsive-box">
                  <table className="official-table">
                    <thead>
                      <tr>
                        <th><AbbrTip abbrKey="POS" customLabel="#" /></th>
                        <th>Equipo</th>
                        <th className="num-cell"><AbbrTip abbrKey="PJ" /></th>
                        <th className="num-cell"><AbbrTip abbrKey="TA" /> 🟨</th>
                        <th className="num-cell"><AbbrTip abbrKey="TR" /> 🟥</th>
                        <th className="num-cell">Estado Fair Play</th>
                        <th className="pts-cell">Sanción <AbbrTip abbrKey="COP" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {fpSummary.list.map((item, idx) => {
                        const shield = getTeamShieldUrl(item.equipo);
                        const isClean = item.amarillas === 0 && item.rojas === 0;
                        return (
                          <tr key={idx}>
                            <td><strong>{fpSummary.allZeroCards ? '1' : idx + 1}</strong></td>
                            <td>
                              <div className="table-team-cell">
                                {shield && <img src={shield} alt={item.equipo} className="team-shield-img" />}
                                <strong>{item.equipo}</strong>
                              </div>
                            </td>
                            <td className="num-cell">{item.pj}</td>
                            <td className="num-cell">{item.amarillas} 🟨</td>
                            <td className="num-cell">{item.rojas} 🟥</td>
                            <td className="num-cell">
                              <span className={`fairplay-status-pill ${isClean ? '' : 'has-cards'}`}>
                                {isClean ? '🌟 Excelente · Sin tarjetas' : '⚠️ Con amonestaciones'}
                              </span>
                            </td>
                            <td className="pts-cell">${item.multa.toLocaleString('es-CO')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Generales */}
            {statTab === 'generales' && (
              <div className="stats-panel-box">
                <div className="summary-cards-grid">
                  <div className="stat-box">
                    <span className="stat-box-label">PARTIDOS JUGADOS</span>
                    <div className="stat-box-value">{playedMatches.length}</div>
                    <span className="stat-box-sub">de {cfg.totalPartidos} programados</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-box-label">GOLES TOTALES</span>
                    <div className="stat-box-value">
                      {playedMatches.reduce((acc, r) => acc + (r.golesLocal || 0) + (r.golesVisita || 0), 0)}
                    </div>
                    <span className="stat-box-sub">anotados en la rama</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-box-label">PROMEDIO DE GOL</span>
                    <div className="stat-box-value">
                      {playedMatches.length > 0
                        ? (
                            playedMatches.reduce((acc, r) => acc + (r.golesLocal || 0) + (r.golesVisita || 0), 0) /
                            playedMatches.length
                          ).toFixed(1)
                        : '0.0'}
                    </div>
                    <span className="stat-box-sub">goles por partido</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-box-label">EQUIPOS OFICIALES</span>
                    <div className="stat-box-value">{cfg.equipos.length}</div>
                    <span className="stat-box-sub">en competencia</span>
                  </div>
                </div>

                <div className="table-responsive-box" style={{ marginTop: '20px' }}>
                  <table className="official-table">
                    <thead>
                      <tr>
                        <th>Equipo</th>
                        <th className="num-cell"><AbbrTip abbrKey="PJ" /></th>
                        <th className="num-cell"><AbbrTip abbrKey="PG" /></th>
                        <th className="num-cell"><AbbrTip abbrKey="GF" /></th>
                        <th className="num-cell"><AbbrTip abbrKey="GC" /></th>
                        <th className="num-cell"><AbbrTip abbrKey="DG" /></th>
                        <th className="pts-cell"><AbbrTip abbrKey="PTS" /></th>
                        <th className="num-cell"><AbbrTip abbrKey="REND" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pos.length ? pos : cfg.equipos.map(eq => ({ equipo: eq, pj: 0, pg: 0, gf: 0, gc: 0, dg: 0, pts: 0, pos: '1', pe: 0, pp: 0, ult5: '-', estado: '' }))).map(s => {
                        const shield = getTeamShieldUrl(s.equipo);
                        const rend = s.pj > 0 ? Math.round((s.pts / (s.pj * 3)) * 100) + '%' : '0%';
                        return (
                          <tr key={s.equipo}>
                            <td>
                              <div className="table-team-cell">
                                {shield && <img src={shield} alt={s.equipo} className="team-shield-img" />}
                                <strong>{s.equipo}</strong>
                              </div>
                            </td>
                            <td className="num-cell">{s.pj}</td>
                            <td className="num-cell">{s.pg}</td>
                            <td className="num-cell">{s.gf}</td>
                            <td className="num-cell">{s.gc}</td>
                            <td className="num-cell">{s.dg > 0 ? `+${s.dg}` : s.dg}</td>
                            <td className="pts-cell">{s.pts}</td>
                            <td className="num-cell"><strong>{rend}</strong></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== SUB-SECCIÓN: PRESENTACIÓN ==================== */}
        {subSection === 'presentacion' && (
          <div id="sub-presentacion" className="sub-panel active">
            <div className="video-container-vertical">
              {!isPlayingVideo ? (
                <div id="videoBranchCover" className="video-poster-box">
                  <img
                    src="img/TOROS ICONO DEL TORNEO.jpg"
                    alt="Icono oficial Toros"
                    className="video-poster-mascot"
                    loading="lazy"
                  />
                  <span className="video-poster-badge" id="videoBranchBadge">
                    PRESENTACIÓN OFICIAL
                  </span>
                  <h2 className="video-poster-title" id="videoBranchTitle">
                    VIVE EL TORNEO 2026
                  </h2>
                  <p className="video-poster-desc" id="videoBranchDesc">
                    Experiencia audiovisual oficial de la categoría {isFem ? 'Femenina' : 'Masculina'}.
                  </p>
                  <button
                    id="btnPlayVideoBranch"
                    className="btn-play-trigger"
                    aria-label="Reproducir video oficial"
                    onClick={() => setIsPlayingVideo(true)}
                  >
                    ▶ VER VIDEO
                  </button>
                </div>
              ) : (
                <div className="video-player-frame" style={{ position: 'relative', width: '100%', height: '500px' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${cfg.video}?autoplay=1`}
                    title="Presentación Oficial"
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
