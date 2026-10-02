const CONFIG = {
  masculino: {
    nombre: 'MASCULINO',
    id: '1mCMBHkh_Kg98IdgbKu8fPpqh8it_OCAn_aqA2BDSE1E',
    hojas: {
      cal: 'CALENDARIO',
      res: 'RESULTADOS',
      tab: 'TABLA_POSICIONES',
      jug: 'JUGADORES'
    },
    video: 'https://www.youtube.com/embed/cjn7Y9CnVTQ?rel=0'
  },

  femenino: {
    nombre: 'FEMENINO',
    id: '1YgQ8hXwvrV8tDmQtzRgrdDinkAM8U9coaxXuBe7JqHM',
    hojas: {
      cal: 'CALENDARIO',
      res: 'RESULTADOS',
      tab: 'TABLA_POSICIONES',
      jug: 'JUGADORES'
    },
    video: 'https://www.youtube.com/embed/UkpKEy84rO8?rel=0'
  }
};

let cat = 'masculino';
let DATA = {};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const clean = v =>
  v == null ? '' : String(v).trim();

const num = v => {
  if (v === null || v === undefined || v === '') return 0;

  let n = Number(
    String(v)
      .replace(/\./g, '')
      .replace(',', '.')
  );

  return Number.isFinite(n) ? n : 0;
};

const norm = v =>
  clean(v)
    .toUpperCase()
    .replace(/\s+/g, ' ');


/* =========================================================
   LECTURA SEGURA DE GOOGLE SHEETS
   ========================================================= */

function loadSheet(id, name) {

  return new Promise((resolve, reject) => {

    const callback =
      'gs_' +
      Date.now() +
      '_' +
      Math.random().toString(36).substring(2);

    const script = document.createElement('script');

    let terminado = false;

    const finalizar = () => {
      if (terminado) return;

      terminado = true;

      clearTimeout(timeout);

      if (window[callback]) {
        delete window[callback];
      }

      script.remove();
    };

    const timeout = setTimeout(() => {
      finalizar();

      reject(
        new Error(
          'Tiempo de espera agotado leyendo la hoja "' +
          name +
          '".'
        )
      );

    }, 12000);


    window[callback] = respuesta => {

      if (terminado) return;

      finalizar();

      if (
        respuesta &&
        respuesta.status === 'ok' &&
        respuesta.table
      ) {

        resolve(respuesta.table);

      } else {

        reject(
          new Error(
            'Google Sheets no devolvió datos válidos para "' +
            name +
            '".'
          )
        );

      }

    };


    script.onerror = () => {

      finalizar();

      reject(
        new Error(
          'No se pudo conectar con Google Sheets para "' +
          name +
          '".'
        )
      );

    };


    script.src =
      'https://docs.google.com/spreadsheets/d/' +
      encodeURIComponent(id) +
      '/gviz/tq?' +
      'tqx=' +
      encodeURIComponent('responseHandler:' + callback) +
      '&headers=1' +
      '&sheet=' +
      encodeURIComponent(name);


    document.head.appendChild(script);

  });

}


/* =========================================================
   CONVERSIÓN DE DATOS
   ========================================================= */

function rows(table) {

  if (!table || !table.rows) return [];

  return table.rows.map(row => {

    return (row.c || []).map(cell => {

      if (!cell) return '';

      if (cell.f !== undefined && cell.f !== '') {
        return cell.f;
      }

      return cell.v ?? '';

    });

  });

}


/* =========================================================
   ENCABEZADOS
   ========================================================= */

function findHeader(data, expected) {

  const target = expected.map(norm);

  return data.findIndex(row => {

    return target.every((x, i) =>
      norm(row[i]) === x
    );

  });

}


/* =========================================================
   JUGADORES
   ========================================================= */

function parsePlayers(data) {

  const header = findHeader(
    data,
    ['Equipo', 'Jugador', 'Dorsal', 'Posición']
  );

  if (header < 0) return [];

  return data
    .slice(header + 1)
    .map(row => ({

      team: clean(row[0]),
      name: clean(row[1]),
      number: clean(row[2]),
      role: clean(row[3])

    }))
    .filter(x => x.team && x.name);

}


/* =========================================================
   CONSTRUCCIÓN DE DATOS
   ========================================================= */

function build(cal, res, tab, jug) {

  const calendario = rows(cal)
    .map(r => ({

      round: num(r[0]),
      match: num(r[1]),
      date: clean(r[2]),
      time: clean(r[3]),
      home: clean(r[5]),
      away: clean(r[7]),
      venue: clean(r[8]),
      score: clean(r[9]) || '-',
      note: clean(r[10])

    }))
    .filter(x =>
      x.match ||
      x.home ||
      x.away
    );


  const resultados = rows(res)
    .map(r => ({

      match: num(r[0]),
      round: num(r[1]),
      date: clean(r[2]),
      home: clean(r[3]),
      away: clean(r[4]),
      hg: r[5] === '' ? null : num(r[5]),
      ag: r[6] === '' ? null : num(r[6]),
      status: clean(r[7])

    }))
    .filter(x =>
      x.match ||
      x.home ||
      x.away
    );


  const tabla = rows(tab)
    .map(r => ({

      pos: num(r[0]),
      team: clean(r[2]),
      pj: num(r[3]),
      pg: num(r[4]),
      pe: num(r[5]),
      pp: num(r[6]),
      gf: num(r[7]),
      gc: num(r[8]),
      dg: num(r[9]),
      pts: num(r[10]),
      pct: num(r[11])

    }))
    .filter(x => x.team);


  const jugadores = parsePlayers(
    rows(jug)
  );


  const equipos = [
    ...new Set([
      ...tabla.map(x => x.team),
      ...jugadores.map(x => x.team)
    ])
  ];


  return {
    cal: calendario,
    res: resultados,
    tab: tabla,
    players: jugadores,
    teams: equipos
  };

}


/* =========================================================
   CARGA PRINCIPAL
   ========================================================= */

async function load() {

  const cfg = CONFIG[cat];

  try {

    $('#status').textContent =
      'ACTUALIZANDO…';


    const [cal, res, tab, jug] =
      await Promise.all([

        loadSheet(
          cfg.id,
          cfg.hojas.cal
        ),

        loadSheet(
          cfg.id,
          cfg.hojas.res
        ),

        loadSheet(
          cfg.id,
          cfg.hojas.tab
        ),

        loadSheet(
          cfg.id,
          cfg.hojas.jug
        )

      ]);


    DATA[cat] =
      build(cal, res, tab, jug);


    $('#error').hidden = true;

    render();

    $('#status').textContent =
      'DATOS CONECTADOS';


  } catch (error) {

    console.error(
      'Error cargando Google Sheets:',
      error
    );


    $('#status').textContent =
      'SIN ACTUALIZAR';


    $('#error').textContent =
      'No se pudieron actualizar los datos de ' +
      cfg.nombre +
      '. Verifica que la hoja esté publicada o disponible para consulta web.';


    $('#error').hidden = false;


    renderStatic();

  }

}


/* =========================================================
   PANEL PRINCIPAL
   ========================================================= */

function render() {

  const d =
    DATA[cat] || {
      cal: [],
      res: [],
      tab: [],
      players: [],
      teams: []
    };


  $('#catTitle').textContent =
    'TORNEO ' +
    CONFIG[cat].nombre;


  $('#videoCat').textContent =
    cat;


  const jugados =
    d.res.filter(
      x => norm(x.status) === 'JUGADO'
    );


  const goles =
    jugados.reduce(
      (total, x) =>
        total +
        (x.hg || 0) +
        (x.ag || 0),
      0
    );


  const total =
    d.cal.length;


  const lider =
    d.tab[0];


  $('#cards').innerHTML = [

    [
      'PARTIDOS JUGADOS',
      jugados.length,
      'Encuentros oficiales'
    ],

    [
      'PARTIDOS PENDIENTES',
      Math.max(
        total - jugados.length,
        0
      ),
      'Programación restante'
    ],

    [
      'GOLES REGISTRADOS',
      goles,
      'Marcadores oficiales'
    ],

    [
      'LÍDER ACTUAL',
      lider ? lider.team : '—',
      lider
        ? lider.pts + ' puntos'
        : 'Tabla oficial'
    ]

  ]
    .map(x => `

      <div class="metric">

        <small>${x[0]}</small>

        <strong>${x[1]}</strong>

        <span>${x[2]}</span>

      </div>

    `)
    .join('');


  const proximo =
    d.cal.find(x =>
      x.home &&
      x.away &&
      (
        !x.score ||
        x.score === '-' ||
        x.score === 'VS'
      )
    );


  $('#next').innerHTML =
    proximo
      ? match(proximo)
      : '<div class="empty">No hay próximo partido cargado.</div>';


  const ultimo =
    jugados.length
      ? jugados[jugados.length - 1]
      : null;


  $('#latest').innerHTML =
    ultimo

      ? `

        <div class="result">

          <strong>${ultimo.home}</strong>

          <strong>
            ${ultimo.hg} - ${ultimo.ag}
          </strong>

          <strong>${ultimo.away}</strong>

        </div>

      `

      : '<div class="empty">Aún no hay resultados oficiales.</div>';


  $('#mini').innerHTML =
    d.tab.length

      ? d.tab
          .slice(0, 5)
          .map((x, i) => `

            <div class="minirow">

              <b>${x.pos || i + 1}</b>

              <span>${x.team}</span>

              <b>${x.pts}</b>

            </div>

          `)
          .join('')

      : '<div class="empty">Sin tabla.</div>';


  $('#topscorers').innerHTML =
    '<div class="empty">La tabla de goleadores se mostrará cuando la fuente oficial esté disponible.</div>';

  $('#scorers').innerHTML =
    $('#topscorers').innerHTML;


  renderComp('calendario');

  renderTeams(d);

  renderPlayers(d);

  renderVideo();

}


/* =========================================================
   PARTIDO
   ========================================================= */

function match(x) {

  return `

    <div class="match">

      <div class="team">

        <span class="badge">
          ${ini(x.home)}
        </span>

        ${x.home}

      </div>


      <div>

        <div class="score">
          VS
        </div>

        <div class="vs">

          ${x.date || ''}

          ${
            x.time
              ? ' · ' + x.time
              : ''
          }

        </div>

      </div>


      <div class="team">

        <span class="badge">
          ${ini(x.away)}
        </span>

        ${x.away}

      </div>

    </div>


    <div class="meta">

      ${x.venue || 'Cancha por definir'}

      ${
        x.note
          ? ' · ' + x.note
          : ''
      }

    </div>

  `;

}


function ini(x) {

  return clean(x)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(y => y[0])
    .join('')
    .toUpperCase();

}


/* =========================================================
   COMPETICIÓN
   ========================================================= */

function renderComp(panel) {

  const d =
    DATA[cat] || {
      cal: [],
      res: [],
      tab: []
    };


  const p =
    $('#competitionPanel');


  if (!p) return;


  if (panel === 'tabla') {

    p.innerHTML = `

      <div class="card table-wrap">

        <table class="table">

          <thead>

            <tr>

              <th>POS.</th>
              <th>EQUIPO</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>PTS</th>

            </tr>

          </thead>


          <tbody>

            ${
              d.tab
                .map((x, i) => `

                  <tr>

                    <td>
                      ${x.pos || i + 1}
                    </td>

                    <td>
                      <b>${x.team}</b>
                    </td>

                    <td>${x.pj}</td>
                    <td>${x.pg}</td>
                    <td>${x.pe}</td>
                    <td>${x.pp}</td>
                    <td>${x.gf}</td>
                    <td>${x.gc}</td>
                    <td>${x.dg}</td>

                    <td>
                      <b>${x.pts}</b>
                    </td>

                  </tr>

                `)
                .join('')
            }

          </tbody>

        </table>

      </div>

    `;

    return;
  }


  const arr =
    panel === 'resultados'

      ? d.res.filter(
          x =>
            norm(x.status) ===
            'JUGADO'
        )

      : d.cal;


  if (!arr.length) {

    p.innerHTML =
      '<div class="empty">Sin datos disponibles.</div>';

    return;

  }


  const grupos = {};


  arr.forEach(x => {

    const jornada =
      x.round || '';


    if (!grupos[jornada]) {
      grupos[jornada] = [];
    }


    grupos[jornada].push(x);

  });


  p.innerHTML = `

    <div class="calendar">

      ${
        Object.entries(grupos)
          .map(([jornada, partidos]) => `

            <div class="round">

              <div>
                JORNADA ${jornada || '—'}
              </div>


              ${
                partidos
                  .map(x => `

                    <div class="game">

                      <div>
                        <small>

                          ${x.date || ''}

                          <br>

                          ${x.time || ''}

                        </small>
                      </div>


                      <div class="home">

                        ${x.home || 'Por definir'}

                      </div>


                      <div class="score">

                        ${
                          panel === 'resultados'
                            ? `${x.hg} - ${x.ag}`
                            : 'VS'
                        }

                      </div>


                      <div class="away">

                        ${x.away || 'Por definir'}

                      </div>


                      <div>

                        <small>

                          ${x.venue || ''}

                          <br>

                          ${x.note || ''}

                        </small>

                      </div>

                    </div>

                  `)
                  .join('')
              }

            </div>

          `)
          .join('')
      }

    </div>

  `;

}


/* =========================================================
   EQUIPOS
   ========================================================= */

function renderTeams(d) {

  const contenedor =
    $('#teams');


  if (!contenedor) return;


  contenedor.innerHTML =
    d.teams.length

      ? d.teams
          .map(x => {

            const tabla =
              d.tab.find(
                t => norm(t.team) === norm(x)
              ) || {};


            return `

              <article class="team-card">

                <div class="team-logo">
                  ${ini(x)}
                </div>

                <h3>
                  ${x}
                </h3>

                <p>
                  ${cat.toUpperCase()}
                  · PLANTILLA OFICIAL
                </p>


                <div class="team-stats">

                  <span>
                    PJ
                    <b>${tabla.pj || 0}</b>
                  </span>

                  <span>
                    PTS
                    <b>${tabla.pts || 0}</b>
                  </span>

                </div>

              </article>

            `;

          })
          .join('')

      : '<div class="empty">Sin equipos cargados.</div>';

}


/* =========================================================
   JUGADORES
   ========================================================= */

function renderPlayers(d) {

  const filtro =
    $('#teamFilter');


  if (!filtro) return;


  const actual =
    filtro.value || 'all';


  filtro.innerHTML =
    '<option value="all">Todos los equipos</option>' +

    d.teams
      .map(x =>
        `<option value="${x}">
          ${x}
        </option>`
      )
      .join('');


  filtro.value =
    [...filtro.options].some(
      x => x.value === actual
    )
      ? actual
      : 'all';


  const jugadores =
    d.players.filter(
      x =>
        filtro.value === 'all' ||
        x.team === filtro.value
    );


  $('#players').innerHTML =
    jugadores.length

      ? jugadores
          .map(x => `

            <article class="player">

              <div class="number">

                #${x.number || '—'}

              </div>


              <div>

                <b>${x.name}</b>

                <small>
                  ${x.team}
                </small>

                <small>
                  ${x.role || 'Posición no registrada'}
                </small>

              </div>

            </article>

          `)
          .join('')

      : '<div class="empty">No hay jugadores registrados.</div>';

}


/* =========================================================
   VIDEOS
   ========================================================= */

function renderVideo() {

  const url =
    CONFIG[cat].video;


  const frame = `

    <iframe

      src="${url}"

      title="Presentación ${CONFIG[cat].nombre}"

      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      allowfullscreen>

    </iframe>

  `;


  if ($('#videoHome')) {
    $('#videoHome').innerHTML =
      frame;
  }


  if ($('#videoPage')) {
    $('#videoPage').innerHTML =
      frame;
  }

}


/* =========================================================
   MODO SIN DATOS
   ========================================================= */

function renderStatic() {

  if (DATA[cat]) {

    render();

    return;

  }


  const equipos =
    CONFIG[cat].nombre === 'MASCULINO'

      ? [
          'BAYERN MUU FC',
          'ADMIN UNITED FC',
          'REAL SAN MARTIN FC',
          'ULTIMA MILLA FC',
          'LOS PROBIÓTICOS FC'
        ]

      : [
          'MONARCA FC',
          'INTER LÁCTEOS FC',
          'ÉLITE FC'
        ];


  const d = {

    cal: [],
    res: [],
    tab: [],
    players: [],
    teams: equipos

  };


  renderTeams(d);

  renderPlayers(d);

  renderVideo();

}


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function go(id) {

  $$('.section').forEach(
    s =>
      s.classList.toggle(
        'activo',
        s.id === id
      )
  );


  $$('nav button').forEach(
    b =>
      b.classList.toggle(
        'activo',
        b.dataset.section === id
      )
  );


  if ($('#nav')) {
    $('#nav').classList.remove(
      'abierto'
    );
  }


  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}


/* =========================================================
   EVENTOS
   ========================================================= */

$$('nav button').forEach(
  b =>
    b.onclick = () =>
      go(b.dataset.section)
);


$$('[data-go]').forEach(
  b =>
    b.onclick = () =>
      go(b.dataset.go)
);


$$('.cat').forEach(
  b => {

    b.onclick = () => {

      $$('.cat').forEach(
        x =>
          x.classList.remove(
            'activo'
          )
      );


      b.classList.add(
        'activo'
      );


      cat =
        b.dataset.cat;


      load();

    };

  }
);


$$('.tabs button').forEach(
  b => {

    b.onclick = () => {

      $$('.tabs button').forEach(
        x =>
          x.classList.remove(
            'sel'
          )
      );


      b.classList.add(
        'sel'
      );


      renderComp(
        b.dataset.panel
      );

    };

  }
);


if ($('#teamFilter')) {

  $('#teamFilter').onchange =
    () =>
      renderPlayers(
        DATA[cat]
      );

}


if ($('#menubtn')) {

  $('#menubtn').onclick =
    () =>
      $('#nav').classList.toggle(
        'abierto'
      );

}


/* =========================================================
   INICIO
   ========================================================= */

load();


/*
   Actualización automática cada 2 minutos.
   Si una actualización falla, la página
   NO se queda bloqueada.
*/

setInterval(
  () => {

    if (!document.hidden) {
      load();
    }

  },
  120000
);
