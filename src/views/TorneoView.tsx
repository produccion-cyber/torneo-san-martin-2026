import React from 'react';
import { useTournament } from '../context/TournamentContext';

export const TorneoView: React.FC = () => {
  const { setIsAficheOpen } = useTournament();

  return (
    <section id="view-torneo" className="app-view active" aria-label="Documentación oficial y manual del torneo">
      <div className="pagehead-box">
        <span className="pagehead-pre">06 · DOCUMENTACIÓN OFICIAL</span>
        <h1 className="pagehead-title">
          MANUAL DEL TORNEO <em>2026.</em>
        </h1>
        <p className="pagehead-desc">Primero las personas, después el resultado.</p>
      </div>

      {/* Afiche dentro del manual */}
      <div className="afiche-block">
        <img
          className="afiche-img"
          src="img/AFICHE TORNEO 2026.jpg"
          alt="Afiche Oficial Torneo San Martín 2026"
          loading="lazy"
          onClick={() => setIsAficheOpen(true)}
          style={{ cursor: 'pointer' }}
          title="Presiona para ampliar afiche oficial"
        />
        <div className="afiche-caption">
          <small className="badge-tag">CAMPEONATO OFICIAL 2026</small>
          <h2>
            TORNEO FÚTBOL 5 <em>SAN MARTÍN LÁCTEOS</em>
          </h2>
          <p>
            Integración deportiva, juego limpio y compañerismo en las categorías Masculina y
            Femenina. Consulta a continuación el reglamento oficial, premiación y régimen disciplinario.
          </p>
        </div>
      </div>

      {/* Manual completo íntegro sin resumir ni cambiar textos */}
      <article className="manual-book">
        <div className="manual-book-cover">
          <div className="manual-seal-wrap">
            <img
              className="seal-logo"
              src="img/LOGO SAN MARTIN LACTEOS S.A.S.jpg"
              alt="San Martín Lácteos"
              onError={e => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <small className="manual-cover-sub">FÚTBOL 5 · SAN MARTÍN</small>
          <h2 className="manual-cover-title">
            MANUAL DEL <em>TORNEO 2026</em>
          </h2>
          <blockquote className="manual-cover-quote">
            “Un torneo para competir, compartir y fortalecer el compañerismo.”
          </blockquote>
          <span className="manual-cover-ver">DOCUMENTO OFICIAL · VERSIÓN 1.0</span>
        </div>

        <div className="manual-book-body">
          <div className="manual-block highlight-block">
            <span className="manual-num">00</span>
            <h3>
              🛡️ PRIMERO LAS PERSONAS, <em>DESPUÉS EL RESULTADO.</em>
            </h3>
            <p>
              <strong>Un torneo para competir, compartir y fortalecer el compañerismo.</strong>
            </p>
          </div>

          <div className="manual-block">
            <span className="manual-num">01</span>
            <h3>🏆 EL TORNEO</h3>
            <p>
              <strong>Objetivo</strong>
              <br />
              Actividad deportiva interna de carácter recreativo, integrativo y competitivo.
            </p>
            <div className="manual-chips-grid">
              <span>🤝 Compañerismo</span>
              <span>⚽ Competencia sana</span>
              <span>🙌 Integración</span>
              <span>🏆 Juego limpio</span>
            </div>
            <div className="manual-twocol-grid">
              <div>
                <strong>👨 MASCULINA</strong>
                <br />
                5 equipos · Todos contra todos
              </div>
              <div>
                <strong>👩 FEMENINA</strong>
                <br />
                3 equipos · Todos contra todos
              </div>
            </div>
          </div>

          <div className="manual-block">
            <span className="manual-num">02</span>
            <h3>⚽ REGLAS DE JUEGO</h3>
            <div className="manual-ruleline">
              <strong>MODALIDAD</strong>
              <span>Fútbol 5</span>
            </div>
            <ul className="manual-rules-list">
              <li>5 jugadores en cancha</li>
              <li>Uniforme y dorsal oficial</li>
              <li>Jugadores registrados</li>
              <li>Árbitro durante el partido</li>
              <li>Cambios según las condiciones establecidas por la organización</li>
            </ul>
            <h4>PUNTUACIÓN</h4>
            <div className="manual-points-grid">
              <span className="point-win">
                🟢 Victoria <strong>3 pts</strong>
              </span>
              <span className="point-draw">
                ⚪ Empate <strong>1 pt</strong>
              </span>
              <span className="point-loss">
                🔴 Derrota <strong>0 pts</strong>
              </span>
            </div>
            <h4>DESEMPATES</h4>
            <ol className="manual-tiebreak-list">
              <li>Diferencia de goles</li>
              <li>Goles a favor</li>
              <li>Resultado entre los equipos involucrados</li>
              <li>Fair Play</li>
              <li>Criterio de la organización</li>
            </ol>
          </div>

          <div className="manual-block">
            <span className="manual-num">03</span>
            <h3>👥 EQUIPOS Y JUGADORES</h3>
            <p>
              Cada equipo tendrá una <strong>nómina oficial</strong>.
            </p>
            <p>El jugador debe corresponder al equipo y utilizar el dorsal registrado.</p>
            <div className="manual-danger-grid">
              <span>❌ Participar con otro equipo</span>
              <span>❌ Utilizar jugadores no registrados</span>
              <span>❌ Cambiar un dorsal sin autorización</span>
            </div>
            <p>La información oficial alimentará las estadísticas del torneo.</p>
          </div>

          <div className="manual-block">
            <span className="manual-num">04</span>
            <h3>🟨 DISCIPLINA</h3>
            <div className="manual-discipline-grid">
              <div className="card-sanction yellow-sanction">
                <span className="sanction-icon">🟨</span>
                <small>TARJETA AMARILLA</small>
                <strong>$5.000 COP</strong>
                <p>Amonestación disciplinaria.</p>
              </div>
              <div className="card-sanction red-sanction">
                <span className="sanction-icon">🟥</span>
                <small>TARJETA ROJA</small>
                <strong>$10.000 COP</strong>
                <p>Expulsión del partido y posible sanción adicional según la situación.</p>
              </div>
            </div>
            <div className="manual-violence-box">
              <h4>🚨 CERO TOLERANCIA A LA VIOLENCIA</h4>
              <p>
                El torneo es recreativo. <strong>Las agresiones no forman parte de la competencia.</strong>
              </p>
              <div className="manual-danger-grid">
                <span>❌ Agresiones físicas</span>
                <span>❌ Intentos de agresión</span>
                <span>❌ Riñas</span>
                <span>❌ Amenazas</span>
                <span>❌ Intimidaciones</span>
                <span>❌ Conductas ofensivas graves, verbales o físicas</span>
              </div>
              <div className="manual-expel-banner">
                ⛔ EXPULSIÓN INMEDIATA
                <small>
                  Cualquier participante que protagonice una agresión física o una riña será
                  expulsado inmediatamente del torneo.
                </small>
              </div>
              <p>
                La organización podrá adoptar medidas adicionales cuando la gravedad de los hechos lo
                amerite.
              </p>
            </div>
          </div>

          <div className="manual-block">
            <span className="manual-num">05</span>
            <h3>🤝 FAIR PLAY</h3>
            <p>Queremos competir, pero también disfrutar el torneo.</p>
            <div className="manual-respect-grid">
              <span>Respeto al rival.</span>
              <span>Respeto al compañero.</span>
              <span>Respeto al árbitro.</span>
              <span>Respeto a la organización.</span>
            </div>
            <p>
              El comportamiento deportivo hará parte de las estadísticas de <strong>Fair Play</strong>.
            </p>
          </div>

          <div className="manual-block">
            <span className="manual-num">06</span>
            <h3>🛡️ SEGURIDAD</h3>
            <h4>LA SALUD ESTÁ POR ENCIMA DEL PARTIDO</h4>
            <p>
              La organización podrá detener un partido cuando exista una situación que pueda
              comprometer la integridad de los participantes.
            </p>
            <div className="manual-risk-steps">
              <span>DETENIDO</span> → <span>EVALUADO</span> → <span>SUSPENDIDO</span> →{' '}
              <span>REPROGRAMADO</span>
            </div>
            <h4>🚨 SITUACIÓN DE RIESGO</h4>
            <blockquote className="manual-risk-quote">
              Si durante el desarrollo del torneo se presentan dos o más personas lesionadas en
              circunstancias que evidencien un riesgo para la salud o integridad de los participantes,
              la organización procederá a cancelar el torneo.
            </blockquote>
            <div className="manual-final-quote">
              La competencia nunca estará por encima de las personas.
            </div>
          </div>

          <div className="manual-block">
            <span className="manual-num">07</span>
            <h3>📅 ORGANIZACIÓN</h3>
            <div className="manual-twocol-grid">
              <div>
                <h4>⏰ PUNTUALIDAD</h4>
                <p>
                  Los equipos deberán presentarse con anticipación suficiente para iniciar el partido
                  a la hora programada.
                </p>
              </div>
              <div>
                <h4>🌧️ SUSPENSIÓN</h4>
                <p>
                  Podrá suspenderse o reprogramarse por condiciones climáticas, estado de la cancha,
                  situaciones médicas, seguridad o fuerza mayor.
                </p>
              </div>
            </div>
            <h4>🚫 INASISTENCIA</h4>
            <p>
              Las consecuencias por inasistencia serán las establecidas por la organización y
              comunicadas a los equipos.
            </p>
          </div>

          <div className="manual-block">
            <span className="manual-num">08</span>
            <h3>📊 COMPETENCIA EN LA PLATAFORMA</h3>
            <div className="manual-features-grid">
              <span>
                📅 <strong>CALENDARIO</strong>
                <small>Próximos partidos y jornadas.</small>
              </span>
              <span>
                📋 <strong>RESULTADOS</strong>
                <small>Marcadores oficiales.</small>
              </span>
              <span>
                🏆 <strong>TABLA</strong>
                <small>Posiciones y puntos.</small>
              </span>
              <span>
                ⚽ <strong>GOLEADORES</strong>
                <small>Ranking individual de goles.</small>
              </span>
              <span>
                📈 <strong>ESTADÍSTICAS</strong>
                <small>Información de jugadores y equipos.</small>
              </span>
              <span>
                👕 <strong>EQUIPOS</strong>
                <small>Escudo, uniforme, jugadores y dorsales.</small>
              </span>
            </div>
          </div>

          <div className="manual-block">
            <span className="manual-num">09</span>
            <h3>🏅 PREMIACIÓN</h3>
            <div className="manual-awards-grid">
              <span>
                🥇 <strong>CAMPEÓN</strong>
              </span>
              <span>
                🥈 <strong>SUBCAMPEÓN</strong>
              </span>
              <span>
                ⚽ <strong>GOLEADOR</strong>
              </span>
              <span>
                🧤 <strong>VALLA MENOS VENCIDA</strong>
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
