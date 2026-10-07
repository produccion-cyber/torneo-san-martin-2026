/* =========================================================
   TORNEO SAN MARTÍN 2026 · app.js
   Plataforma deportiva oficial · Lectura gviz JSONP
   Entrega 1: Inicio general y ramas completas
   ========================================================= */

(function () {
  'use strict';

  // Configuración de Google Sheets
  const SHEETS_CONFIG = {
    masculino: {
      id: '1mCMBHkh_Kg98IdgbKu8fPpqh8it_OCAn_aqA2BDSE1E',
      nombre: 'MASCULINO',
      color: '#31a8e6',
      badge: 'TORNEO MASCULINO 2026',
      desc: '5 equipos compitiendo todos contra todos, Play-In y fase final.',
      video: 'cjn7Y9CnVTQ',
      totalPartidos: 15,
      equipos: ['BAYERN MUU FC', 'ADMIN UNITED FC', 'REAL SAN MARTIN FC', 'ULTIMA MILLA FC', 'LOS PROBIÓTICOS FC'],
      plantillaBase: [
        { team: 'ADMIN UNITED FC', name: 'Hernández C.', number: '8', role: 'Capitán' },
        { team: 'ADMIN UNITED FC', name: 'Aguirre', number: '1', role: 'Portero' },
        { team: 'ADMIN UNITED FC', name: 'Urrea', number: '2', role: 'Defensa' },
        { team: 'ADMIN UNITED FC', name: 'Atehortua', number: '74', role: 'Delantero' },
        { team: 'ADMIN UNITED FC', name: 'Orozco A.', number: '6', role: 'Medio Campista' },
        { team: 'ADMIN UNITED FC', name: 'Osorio C.', number: '22', role: 'Medio Campista' },
        { team: 'ADMIN UNITED FC', name: 'Gomez A.', number: '4', role: 'Medio Campista' },
        { team: 'ADMIN UNITED FC', name: 'Rios', number: '99', role: 'Defensa, Portero' },
        { team: 'ADMIN UNITED FC', name: 'Bustos', number: '10', role: 'Medio Campista' },
        { team: 'ADMIN UNITED FC', name: 'Gonzáles', number: '5', role: 'Defensa, Mediocampista' },
        { team: 'ULTIMA MILLA FC', name: 'Rivera', number: '7', role: 'Capitán' },
        { team: 'ULTIMA MILLA FC', name: 'Velazquez', number: '6', role: 'Portero' },
        { team: 'ULTIMA MILLA FC', name: 'Castro M.', number: '20', role: 'Defensa' },
        { team: 'ULTIMA MILLA FC', name: 'Navarro C.', number: '11', role: 'Portero, Defensa' },
        { team: 'ULTIMA MILLA FC', name: 'Pérez', number: '16', role: 'Cualquier posición' },
        { team: 'ULTIMA MILLA FC', name: 'Quintero', number: '9', role: 'Defensa' },
        { team: 'ULTIMA MILLA FC', name: 'Sanchez', number: '10', role: 'Cualquier posición' },
        { team: 'LOS PROBIÓTICOS FC', name: 'Viloria', number: '7', role: 'Capitán' },
        { team: 'LOS PROBIÓTICOS FC', name: 'Escalona', number: '1', role: 'Portero' },
        { team: 'LOS PROBIÓTICOS FC', name: 'Soto Z.', number: '20', role: 'Mediocampista' },
        { team: 'LOS PROBIÓTICOS FC', name: 'Navarro A.', number: '10', role: 'Delantero' },
        { team: 'LOS PROBIÓTICOS FC', name: 'Arteaga', number: '4', role: 'Cualquier posición' },
        { team: 'LOS PROBIÓTICOS FC', name: 'Ramirez L.', number: '6', role: 'Cualquier posición' },
        { team: 'LOS PROBIÓTICOS FC', name: 'Alvarez', number: '9', role: 'Cualquier posición' },
        { team: 'BAYERN MUU FC', name: 'Albino', number: '11', role: 'Capitán' },
        { team: 'BAYERN MUU FC', name: 'Ardila', number: '1', role: 'Portero' },
        { team: 'BAYERN MUU FC', name: 'Rodriguez', number: '15', role: 'Defensa' },
        { team: 'BAYERN MUU FC', name: 'Delprado', number: '7', role: 'Delantero' },
        { team: 'BAYERN MUU FC', name: 'Sanchez M.', number: '20', role: 'Cualquier posición' },
        { team: 'BAYERN MUU FC', name: 'Urrego', number: '9', role: 'Mediocampista' },
        { team: 'BAYERN MUU FC', name: 'Palacio', number: '5', role: 'Defensa' },
        { team: 'BAYERN MUU FC', name: 'Ramirez', number: '47', role: 'Cualquier posición' },
        { team: 'BAYERN MUU FC', name: 'Marín C.', number: '19', role: 'Defensa' },
        { team: 'REAL SAN MARTIN FC', name: 'Acosta', number: '10', role: 'Capitán' },
        { team: 'REAL SAN MARTIN FC', name: 'Pineda', number: '96', role: 'Delantero, Portero' },
        { team: 'REAL SAN MARTIN FC', name: 'Gallego', number: '21', role: 'Mediocampista' },
        { team: 'REAL SAN MARTIN FC', name: 'Soto H.', number: '80', role: 'Mediocampista' },
        { team: 'REAL SAN MARTIN FC', name: 'Echeverry', number: '17', role: 'Defensa, Mediocampista' },
        { team: 'REAL SAN MARTIN FC', name: 'Bohorquez', number: '7', role: 'Mediocampista, Delantero' },
        { team: 'REAL SAN MARTIN FC', name: 'Orozco J.', number: '23', role: 'Mediocampista' },
        { team: 'REAL SAN MARTIN FC', name: 'Espitia', number: '5', role: 'Defensa' }
      ]
    },
    femenino: {
      id: '1YgQ8hXwvrV8tDmQtzRgrdDinkAM8U9coaxXuBe7JqHM',
      nombre: 'FEMENINO',
      color: '#d62976',
      badge: 'TORNEO FEMENINO 2026',
      desc: '3 escuadras en doble vuelta, Play-In y la gran final oficial.',
      video: 'UkpKEy84rO8',
      totalPartidos: 8,
      equipos: ['MONARCA FC', 'INTER LÁCTEOS FC', 'ÉLITE FC'],
      plantillaBase: [
        { team: 'MONARCA FC', name: 'Gonzales', number: '22', role: 'Capitana' },
        { team: 'MONARCA FC', name: 'Murillo', number: '28', role: 'Mediocampista' },
        { team: 'MONARCA FC', name: 'Giraldo', number: '5', role: 'Mediocampista' },
        { team: 'MONARCA FC', name: 'García', number: '10', role: 'Defensa' },
        { team: 'MONARCA FC', name: 'Valencia T.', number: '4', role: 'Defensa' },
        { team: 'MONARCA FC', name: 'Gomez B.', number: '2', role: 'Defensa' },
        { team: 'MONARCA FC', name: 'Betancurt', number: '8', role: 'Defensa' },
        { team: 'MONARCA FC', name: 'Marquez', number: '3', role: 'Defensa' },
        { team: 'MONARCA FC', name: 'Osorio', number: '18', role: 'Cualquier posición' },
        { team: 'INTER LÁCTEOS FC', name: 'Muñoz T', number: '12', role: 'Capitana' },
        { team: 'INTER LÁCTEOS FC', name: 'Guzmán', number: '9', role: 'Mediocampista' },
        { team: 'INTER LÁCTEOS FC', name: 'Lugo M.', number: '23', role: 'Cualquier posición' },
        { team: 'INTER LÁCTEOS FC', name: 'Oquendo', number: '22', role: 'Defensa' },
        { team: 'INTER LÁCTEOS FC', name: 'Valencia A.', number: '25', role: 'Mediocampista' },
        { team: 'INTER LÁCTEOS FC', name: 'Rojas', number: '4', role: 'Cualquier posición' },
        { team: 'INTER LÁCTEOS FC', name: 'Cruz G.', number: '24', role: 'Mediocampista' },
        { team: 'INTER LÁCTEOS FC', name: 'Toro', number: '11', role: 'Delantero' },
        { team: 'INTER LÁCTEOS FC', name: 'Ceballos', number: '10', role: 'Cualquier posición' },
        { team: 'INTER LÁCTEOS FC', name: 'Agudelo', number: '26', role: 'Mediocampista' },
        { team: 'ÉLITE FC', name: 'Rendón', number: '9', role: 'Capitana' },
        { team: 'ÉLITE FC', name: 'Triana', number: '7', role: 'Cualquier posición' },
        { team: 'ÉLITE FC', name: 'Uribe', number: '2', role: 'Cualquier posición' },
        { team: 'ÉLITE FC', name: 'Carmona', number: '10', role: 'Cualquier posición' },
        { team: 'ÉLITE FC', name: 'Castro M.', number: '14', role: 'Cualquier posición' },
        { team: 'ÉLITE FC', name: 'Sanchez T.', number: '15', role: 'Cualquier posición' },
        { team: 'ÉLITE FC', name: 'Ladino', number: '8', role: 'Cualquier posición' },
        { team: 'ÉLITE FC', name: 'Muñoz P.', number: '17', role: 'Cualquier posición' },
        { team: 'ÉLITE FC', name: 'Soto A.', number: '5', role: 'Cualquier posición' }
      ]
    }
  };

  const HOJAS_OBJETIVO = ['CALENDARIO', 'RESULTADOS', 'TABLA_POSICIONES', 'JUGADORES'];
  const TIMEOUT_HOJA = 15000;
  const INTERVALO_REFRESCO = 120000;

  // Tabla exacta de escudos con nombres normalizados
  const TABLA_ESCUDOS = {
    'ADMIN UNITED FC': 'img/ADMIN UNITED FC.jpg',
    'ADMIN UNITED': 'img/ADMIN UNITED FC.jpg',
    'BAYERN MUU FC': 'img/BAYERN MUU FC.jpg',
    'BAYERN MUU': 'img/BAYERN MUU FC.jpg',
    'BAYERN': 'img/BAYERN MUU FC.jpg',
    'INTER LACTEOS FC': 'img/INTER L%C3%81CTEOS FC.jpg',
    'INTER LACTEOS': 'img/INTER L%C3%81CTEOS FC.jpg',
    'LOS PROBIOTICOS FC': 'img/LOS PROBI%C3%93TICOS FC.jpg',
    'LOS PROBIOTICOS': 'img/LOS PROBI%C3%93TICOS FC.jpg',
    'PROBIOTICOS': 'img/LOS PROBI%C3%93TICOS FC.jpg',
    'MONARCA FC': 'img/MONARCAS FC.jpg',
    'MONARCAS FC': 'img/MONARCAS FC.jpg',
    'MONARCA': 'img/MONARCAS FC.jpg',
    'MONARCAS': 'img/MONARCAS FC.jpg',
    'REAL SAN MARTIN FC': 'img/REAL SAN MARTIN FC.jpg',
    'REAL SAN MARTIN': 'img/REAL SAN MARTIN FC.jpg',
    'ULTIMA MILLA FC': 'img/ULTIMA MILLA FC.jpg',
    'ULTIMA MILLA': 'img/ULTIMA MILLA FC.jpg',
    'ELITE FC': 'img/%C3%89LITE FC.jpg',
    'ELITE': 'img/%C3%89LITE FC.jpg'
  };

  // Semilla de datos oficiales precargados en memoria para visualización inmediata
  const INITIAL_SEED_DATA = {
  "masculino": {
    "calendario": [
      {
        "jornada": "1",
        "partido": "1",
        "fecha": "sábado, octubre 03, 2026",
        "hora": "4:00 p.m.",
        "local": "REAL SAN MARTIN FC",
        "visitante": "ADMIN UNITED FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "1 - 6",
        "observaciones": "Inicio T1: 16:18 | Fin T1: 16:38 |\nInicio T2: 16:45 | Fin T2: 5:05:00 p.m.",
        "branch": "masculino"
      },
      {
        "jornada": "1",
        "partido": "2",
        "fecha": "sábado, octubre 03, 2026",
        "hora": "5:20 p.m.",
        "local": "LOS PROBIÓTICOS FC",
        "visitante": "ULTIMA MILLA FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "6 - 10",
        "observaciones": "Inicio T1: 5:40 | Fin T1: 6:00 p.m. |\nInicio 2T: 6:07 p.m. | Fin T2: 6:27",
        "branch": "masculino"
      },
      {
        "jornada": "1",
        "partido": "3",
        "fecha": "sábado, octubre 03, 2026",
        "hora": "6:40 p.m.",
        "local": "REAL SAN MARTIN FC",
        "visitante": "BAYERN MUU FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "5 - 4",
        "observaciones": "Inicio T1: 6:40 | Fin T1: 7:00 |\nInicio T2: 7:05 | Fin T2: 7:25",
        "branch": "masculino"
      },
      {
        "jornada": "2",
        "partido": "4",
        "fecha": "sábado, octubre 10, 2026",
        "hora": "5:20 p.m.",
        "local": "ADMIN UNITED FC",
        "visitante": "LOS PROBIÓTICOS FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "2",
        "partido": "5",
        "fecha": "sábado, octubre 10, 2026",
        "hora": "6:40 p.m.",
        "local": "ULTIMA MILLA FC",
        "visitante": "BAYERN MUU FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "3",
        "partido": "6",
        "fecha": "sábado, octubre 17, 2026",
        "hora": "",
        "local": "REAL SAN MARTIN FC",
        "visitante": "LOS PROBIÓTICOS FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "3",
        "partido": "7",
        "fecha": "sábado, octubre 17, 2026",
        "hora": "",
        "local": "ADMIN UNITED FC",
        "visitante": "ULTIMA MILLA FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "4",
        "partido": "8",
        "fecha": "sábado, octubre 24, 2026",
        "hora": "",
        "local": "LOS PROBIÓTICOS FC",
        "visitante": "BAYERN MUU FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "4",
        "partido": "9",
        "fecha": "sábado, octubre 24, 2026",
        "hora": "",
        "local": "REAL SAN MARTIN FC",
        "visitante": "ULTIMA MILLA FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "5",
        "partido": "10",
        "fecha": "sábado, noviembre 07, 2026",
        "hora": "",
        "local": "ADMIN UNITED FC",
        "visitante": "BAYERN MUU FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "masculino"
      }
    ],
    "resultados": [
      {
        "jornada": "1",
        "partido": "1",
        "fecha": "10/3/2026",
        "local": "REAL SAN MARTIN FC",
        "visitante": "ADMIN UNITED FC",
        "golesLocal": 1,
        "golesVisita": 6,
        "estado": "Jugado",
        "observaciones": "Inicio T1: 16:18 | Fin T1: 16:38 |\nInicio T2: 16:45 | Fin T2: 5:05:00 p.m."
      },
      {
        "jornada": "1",
        "partido": "2",
        "fecha": "10/3/2026",
        "local": "LOS PROBIÓTICOS FC",
        "visitante": "ULTIMA MILLA FC",
        "golesLocal": 6,
        "golesVisita": 10,
        "estado": "Jugado",
        "observaciones": "Inicio T1: 5:40 | Fin T1: 6:00 p.m. |\nInicio 2T: 6:07 p.m. | Fin T2: 6:27"
      },
      {
        "jornada": "1",
        "partido": "3",
        "fecha": "10/3/2026",
        "local": "REAL SAN MARTIN FC",
        "visitante": "BAYERN MUU FC",
        "golesLocal": 5,
        "golesVisita": 4,
        "estado": "Jugado",
        "observaciones": "Inicio T1: 6:40 | Fin T1: 7:00 |\nInicio T2: 7:05 | Fin T2: 7:25"
      },
      {
        "jornada": "2",
        "partido": "4",
        "fecha": "10/10/2026",
        "local": "ADMIN UNITED FC",
        "visitante": "LOS PROBIÓTICOS FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "2",
        "partido": "5",
        "fecha": "10/10/2026",
        "local": "ULTIMA MILLA FC",
        "visitante": "BAYERN MUU FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "3",
        "partido": "6",
        "fecha": "10/17/2026",
        "local": "REAL SAN MARTIN FC",
        "visitante": "LOS PROBIÓTICOS FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "3",
        "partido": "7",
        "fecha": "10/17/2026",
        "local": "ADMIN UNITED FC",
        "visitante": "ULTIMA MILLA FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "4",
        "partido": "8",
        "fecha": "10/24/2026",
        "local": "LOS PROBIÓTICOS FC",
        "visitante": "BAYERN MUU FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "4",
        "partido": "9",
        "fecha": "10/24/2026",
        "local": "REAL SAN MARTIN FC",
        "visitante": "ULTIMA MILLA FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "5",
        "partido": "10",
        "fecha": "11/7/2026",
        "local": "ADMIN UNITED FC",
        "visitante": "BAYERN MUU FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      }
    ],
    "posiciones": [
      {
        "pos": "1",
        "equipo": "ADMIN UNITED FC",
        "pj": 1,
        "pg": 1,
        "pe": 0,
        "pp": 0,
        "gf": 6,
        "gc": 1,
        "dg": 5,
        "pts": 3,
        "ult5": "100%",
        "estado": "-",
        "branch": "masculino"
      },
      {
        "pos": "2",
        "equipo": "ULTIMA MILLA FC",
        "pj": 1,
        "pg": 1,
        "pe": 0,
        "pp": 0,
        "gf": 10,
        "gc": 6,
        "dg": 4,
        "pts": 3,
        "ult5": "100%",
        "estado": "-",
        "branch": "masculino"
      },
      {
        "pos": "3",
        "equipo": "REAL SAN MARTIN FC",
        "pj": 2,
        "pg": 1,
        "pe": 0,
        "pp": 1,
        "gf": 6,
        "gc": 10,
        "dg": -4,
        "pts": 3,
        "ult5": "50%",
        "estado": "-",
        "branch": "masculino"
      },
      {
        "pos": "4",
        "equipo": "BAYERN MUU FC",
        "pj": 1,
        "pg": 0,
        "pe": 0,
        "pp": 1,
        "gf": 4,
        "gc": 5,
        "dg": -1,
        "pts": 0,
        "ult5": "0%",
        "estado": "-",
        "branch": "masculino"
      },
      {
        "pos": "5",
        "equipo": "LOS PROBIÓTICOS FC",
        "pj": 1,
        "pg": 0,
        "pe": 0,
        "pp": 1,
        "gf": 6,
        "gc": 10,
        "dg": -4,
        "pts": 0,
        "ult5": "0%",
        "estado": "-",
        "branch": "masculino"
      }
    ]
  },
  "femenino": {
    "calendario": [
      {
        "jornada": "1",
        "partido": "1",
        "fecha": "sábado, 10 de octubre de 2026",
        "hora": "4:00 p.m.",
        "local": "MONARCAS FC",
        "visitante": "INTER LÁCTEOS FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "femenino"
      },
      {
        "jornada": "2",
        "partido": "2",
        "fecha": "sábado, 17 de octubre de 2026",
        "hora": "",
        "local": "ÉLITE FC",
        "visitante": "MONARCAS FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "femenino"
      },
      {
        "jornada": "3",
        "partido": "3",
        "fecha": "sábado, 24 de octubre de 2026",
        "hora": "",
        "local": "INTER LÁCTEOS FC",
        "visitante": "ÉLITE FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "femenino"
      },
      {
        "jornada": "4",
        "partido": "4",
        "fecha": "sábado, 7 de noviembre de 2026",
        "hora": "",
        "local": "INTER LÁCTEOS FC",
        "visitante": "MONARCAS FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "femenino"
      },
      {
        "jornada": "4",
        "partido": "5",
        "fecha": "sábado, 7 de noviembre de 2026",
        "hora": "",
        "local": "MONARCAS FC",
        "visitante": "ÉLITE FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "femenino"
      },
      {
        "jornada": "5",
        "partido": "6",
        "fecha": "sábado, 14 de noviembre de 2026",
        "hora": "",
        "local": "ÉLITE FC",
        "visitante": "INTER LÁCTEOS FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "branch": "femenino"
      }
    ],
    "resultados": [
      {
        "jornada": "1",
        "partido": "1",
        "fecha": "sábado, 10 de octubre de 2026",
        "local": "MONARCAS FC",
        "visitante": "INTER LÁCTEOS FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "2",
        "partido": "2",
        "fecha": "sábado, 17 de octubre de 2026",
        "local": "ÉLITE FC",
        "visitante": "MONARCAS FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "3",
        "partido": "3",
        "fecha": "sábado, 24 de octubre de 2026",
        "local": "INTER LÁCTEOS FC",
        "visitante": "ÉLITE FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "4",
        "partido": "4",
        "fecha": "sábado, 7 de noviembre de 2026",
        "local": "INTER LÁCTEOS FC",
        "visitante": "MONARCAS FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "4",
        "partido": "5",
        "fecha": "sábado, 7 de noviembre de 2026",
        "local": "MONARCAS FC",
        "visitante": "ÉLITE FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      },
      {
        "jornada": "5",
        "partido": "6",
        "fecha": "sábado, 14 de noviembre de 2026",
        "local": "ÉLITE FC",
        "visitante": "INTER LÁCTEOS FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": ""
      }
    ],
    "posiciones": [
      {
        "pos": "1",
        "equipo": "MONARCAS FC",
        "pj": 0,
        "pg": 0,
        "pe": 0,
        "pp": 0,
        "gf": 0,
        "gc": 0,
        "dg": 0,
        "pts": 0,
        "ult5": "0%",
        "estado": "-",
        "branch": "femenino"
      },
      {
        "pos": "2",
        "equipo": "INTER LÁCTEOS FC",
        "pj": 0,
        "pg": 0,
        "pe": 0,
        "pp": 0,
        "gf": 0,
        "gc": 0,
        "dg": 0,
        "pts": 0,
        "ult5": "0%",
        "estado": "-",
        "branch": "femenino"
      },
      {
        "pos": "3",
        "equipo": "ÉLITE FC",
        "pj": 0,
        "pg": 0,
        "pe": 0,
        "pp": 0,
        "gf": 0,
        "gc": 0,
        "dg": 0,
        "pts": 0,
        "ult5": "0%",
        "estado": "-",
        "branch": "femenino"
      }
    ]
  }
};

  // Estado global en memoria
  const APP_STATE = {
    currentRoute: 'inicio',
    currentBranch: 'masculino',
    currentSub: 'resumen',
    currentStatTab: 'goleadores',
    genFilter: 'all',
    genView: 'cal',
    lastSyncTime: null,
    data: {
      masculino: {
        calendario: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.masculino.calendario || [])),
        resultados: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.masculino.resultados || [])),
        posiciones: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.masculino.posiciones || [])),
        jugadores: [],
        plantilla: SHEETS_CONFIG.masculino.plantillaBase.slice()
      },
      femenino: {
        calendario: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.femenino.calendario || [])),
        resultados: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.femenino.resultados || [])),
        posiciones: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.femenino.posiciones || [])),
        jugadores: [],
        plantilla: SHEETS_CONFIG.femenino.plantillaBase.slice()
      }
    }
  };

  // Utilidades de texto y normalización
  const cleanStr = v => (v == null ? '' : String(v).trim());
  const escapeHtml = v =>
    cleanStr(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const normStr = v =>
    cleanStr(v)
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ');
  const parseNum = v => {
    const n = Number(String(v ?? '').replace(',', '.'));
    return Number.isFinite(n) ? n : 0;
  };

  // Regla estricta de escudos
  function getTeamShieldHtml(teamName, sizeClass = '') {
    const raw = cleanStr(teamName);
    const n = normStr(raw);

    if (
      !n ||
      n.includes('DEFINIR') ||
      n.includes('DETERMINAR') ||
      n.startsWith('GANADOR') ||
      n.startsWith('PERDEDOR') ||
      /^[0-9]+[º°.]/.test(n)
    ) {
      return `<span class="neutral-shield ${sizeClass}" title="Por definir" aria-label="Por definir">?</span>`;
    }

    const path = TABLA_ESCUDOS[n];
    if (path) {
      return `<img src="${path}" alt="${escapeHtml(raw)}" class="team-shield-img ${sizeClass}" loading="lazy" onerror="this.outerHTML='<span class=\\'neutral-shield\\'>?</span>'">`;
    }

    return `<span class="neutral-shield ${sizeClass}" title="${escapeHtml(raw)}">?</span>`;
  }

  // Parseo de fecha seguro para evitar desfases
  function parseSheetDate(rawDate) {
    if (!rawDate) return null;

    if (typeof rawDate === 'string' && rawDate.startsWith('Date(')) {
      const parts = rawDate.match(/Date\((\d+),(\d+),(\d+)/);
      if (parts) {
        const year = parseInt(parts[1], 10);
        const month = parseInt(parts[2], 10);
        const day = parseInt(parts[3], 10);
        return new Date(year, month, day, 12, 0, 0);
      }
    }

    if (rawDate instanceof Date) return rawDate;

    const s = String(rawDate).trim().toLowerCase();

    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
      const [m, d, y] = s.split('/').map(Number);
      return new Date(y, m - 1, d, 12, 0, 0);
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      const [y, m, d] = s.split('-').map(Number);
      return new Date(y, m - 1, d, 12, 0, 0);
    }

    const meses = {
      enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
      julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
    };

    // Caso: "10 de octubre de 2026" o "sábado, 10 de octubre de 2026"
    const m1 = s.match(/(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})/);
    if (m1 && meses[m1[2]] !== undefined) {
      return new Date(parseInt(m1[3], 10), meses[m1[2]], parseInt(m1[1], 10), 12, 0, 0);
    }

    // Caso: "octubre 10, 2026" o "sábado, octubre 10, 2026" o "sábado, octubre 03, 2026"
    const m2 = s.match(/([a-z]+)\s+(\d{1,2}),?\s+(\d{4})/);
    if (m2 && meses[m2[1]] !== undefined) {
      return new Date(parseInt(m2[3], 10), meses[m2[1]], parseInt(m2[2], 10), 12, 0, 0);
    }

    return null;
  }


  // Conversión exacta de hora (ej: "4:00 p.m.") a minutos para orden cronológico estricto
  function parseTimeInMinutes(horaStr) {
    if (!horaStr) return 9999;
    const s = String(horaStr).toLowerCase().replace(/\s+/g, " ").trim();
    const isPM = s.includes("p.m.") || s.includes("pm") || s.includes("p. m.") || s.includes("tarde") || s.includes("noche");
    const isAM = s.includes("a.m.") || s.includes("am") || s.includes("a. m.") || s.includes("mañana");
    const m = s.match(/(\d{1,2}):(\d{2})/);
    if (!m) return 9999;
    let h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    if (isPM && h < 12) h += 12;
    if (isAM && h === 12) h = 0;
    return h * 60 + min;
  }

  function formatMatchDate(rawDate, rawHora) {
    const d = parseSheetDate(rawDate);
    const hora = cleanStr(rawHora);
    if (!d) return hora || 'Fecha por confirmar';

    const diasSem = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

    const diaStr = diasSem[d.getDay()];
    const diaNum = d.getDate();
    const mesStr = meses[d.getMonth()];

    const fechaFmt = `${diaStr} ${diaNum} ${mesStr}`;
    return hora ? `${fechaFmt} · ${hora}` : fechaFmt;
  }

  function formatDayHeader(rawDate) {
    const d = parseSheetDate(rawDate);
    if (!d) return cleanStr(rawDate) || 'Fecha por confirmar';

    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${dias[d.getDay()]} ${d.getDate()} de ${meses[d.getMonth()]}`;
  }

  function getRelativeDateLabel(rawDate) {
    const matchDate = parseSheetDate(rawDate);
    if (!matchDate) return '';

    const hoy = new Date();
    hoy.setHours(12, 0, 0, 0);
    const target = new Date(matchDate.getTime());
    target.setHours(12, 0, 0, 0);

    const diffDays = Math.round((target - hoy) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays === 2) return 'En 2 días';
    if (diffDays > 2 && diffDays <= 7) return `En ${diffDays} días`;
    return '';
  }

  function parseCanchaInfo(canchaStr) {
    const raw = cleanStr(canchaStr);
    if (!raw) return { direccion: 'Cancha por definir', mapsUrl: null };

    const parts = raw.split('|');
    const direccion = cleanStr(parts[0]) || 'Cancha por definir';
    let mapsUrl = parts[1] ? cleanStr(parts[1]) : null;

    if (mapsUrl) {
      const isValid =
        mapsUrl.startsWith('https://maps.app.goo.gl/') ||
        mapsUrl.startsWith('https://goo.gl/maps/') ||
        mapsUrl.startsWith('https://google.com/maps/') ||
        mapsUrl.startsWith('https://www.google.com/maps/') ||
        mapsUrl.startsWith('https://maps.google.com/');
      if (!isValid) mapsUrl = null;
    }

    return { direccion, mapsUrl };
  }

  // =========================================================
  // LECTURA DE GOOGLE SHEETS VÍA GVIZ JSONP
  // =========================================================
  function fetchSheetGvizRows(id, sheetName) {
    return new Promise((resolve, reject) => {
      const callbackName = 'gvizCallback_' + Math.random().toString(36).substring(2, 10);
      let timedOut = false;
      const scriptTag = document.createElement('script');

      const timer = setTimeout(() => {
        timedOut = true;
        cleanup();
        reject(new Error(`Tiempo de espera agotado al consultar la hoja ${sheetName}`));
      }, TIMEOUT_HOJA);

      function cleanup() {
        clearTimeout(timer);
        if (scriptTag.parentNode) scriptTag.parentNode.removeChild(scriptTag);
        delete window[callbackName];
      }

      window[callbackName] = function (response) {
        if (timedOut) return;
        cleanup();
        if (response && response.status === 'error') {
          reject(new Error(`Error en la hoja ${sheetName}: ${response.errors?.[0]?.message || 'Desconocido'}`));
          return;
        }
        if (response && response.table && response.table.rows) {
          // Extraer matriz 2D limpia con valores formateados o directos
          const matrix = response.table.rows.map(r =>
            (r.c || []).map(cell => {
              if (!cell) return '';
              if (cell.f !== undefined && cell.f !== null) return cell.f;
              if (cell.v !== undefined && cell.v !== null) return cell.v;
              return '';
            })
          );
          resolve(matrix);
        } else {
          reject(new Error(`Estructura no válida en ${sheetName}`));
        }
      };

      scriptTag.onerror = function () {
        if (timedOut) return;
        cleanup();
        reject(new Error(`Error de red al cargar la hoja ${sheetName}`));
      };

      // Solicitamos headers=0 para recibir todas las filas de la hoja íntegras
      scriptTag.src = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=responseHandler:${callbackName}&sheet=${encodeURIComponent(sheetName)}&headers=0`;
      document.head.appendChild(scriptTag);
    });
  }

  // Procesamiento específico de CALENDARIO
  function parseCalendarSheet(rows, branchKey) {
    let headerIdx = -1;
    let localCol = 5;
    let visitCol = 7;
    let canchaCol = 8;
    let marcadorCol = 9;
    let obsCol = 10;

    // Detectar fila de encabezados buscando «Local» y «Visitante»
    for (let i = 0; i < Math.min(10, rows.length); i++) {
      const r = rows[i];
      let lCol = -1;
      let vCol = -1;
      r.forEach((cell, cIdx) => {
        const val = normStr(cell);
        if (val === 'LOCAL') lCol = cIdx;
        if (val === 'VISITANTE') vCol = cIdx;
        if (val === 'CANCHA') canchaCol = cIdx;
        if (val === 'MARCADOR') marcadorCol = cIdx;
        if (val.includes('OBSERVAC')) obsCol = cIdx;
      });
      if (lCol !== -1 && vCol !== -1) {
        headerIdx = i;
        localCol = lCol;
        visitCol = vCol;
        break;
      }
    }

    if (headerIdx === -1) headerIdx = 0;

    const list = [];
    const roster = [];

    // Detectar si hay columna de plantillas en esta misma hoja (ej. Equipo | Jugador | Dorsal | Posición)
    let rosterEquipoCol = -1;
    let rosterJugadorCol = -1;
    let rosterDorsalCol = -1;
    let rosterPosCol = -1;
    const headerRow = rows[headerIdx];
    if (headerRow) {
      headerRow.forEach((c, idx) => {
        const n = normStr(c);
        if (n === 'EQUIPO' && idx > visitCol) rosterEquipoCol = idx;
        if (n === 'JUGADOR') rosterJugadorCol = idx;
        if (n === 'DORSAL' || n === 'DORSALES') rosterDorsalCol = idx;
        if (n.startsWith('POSICI')) rosterPosCol = idx;
      });
    }

    for (let i = headerIdx + 1; i < rows.length; i++) {
      const r = rows[i];
      const local = cleanStr(r[localCol]);
      const visit = cleanStr(r[visitCol]);

      // Detener lectura de partidos si termina el primer bloque
      if (local && visit) {
        const jornada = cleanStr(r[0]) || '1';
        const num = cleanStr(r[1]) || String(list.length + 1);
        const fecha = r[2] || '';
        const hora = cleanStr(r[3]) || '';
        const cancha = cleanStr(r[canchaCol]) || '';
        const marcador = cleanStr(r[marcadorCol]) || '';
        const obs = cleanStr(r[obsCol]) || '';

        list.push({
          jornada,
          partido: num,
          fecha,
          hora,
          local,
          visitante: visit,
          cancha,
          marcador,
          observaciones: obs,
          branch: branchKey
        });
      }

      // Extraer plantilla si existe en columnas derechas
      if (rosterEquipoCol !== -1 && rosterJugadorCol !== -1) {
        const eq = cleanStr(r[rosterEquipoCol]);
        const jug = cleanStr(r[rosterJugadorCol]);
        if (eq && jug) {
          const numDor = rosterDorsalCol !== -1 ? cleanStr(r[rosterDorsalCol]) : '';
          const pos = rosterPosCol !== -1 ? cleanStr(r[rosterPosCol]) : '';
          roster.push({
            team: eq,
            name: jug,
            number: numDor,
            role: pos
          });
        }
      }
    }

    return { matches: list, roster };
  }

  // Procesamiento específico de RESULTADOS
  function parseResultsSheet(rows) {
    let headerIdx = -1;
    let localCol = 3;
    let visitCol = 4;
    let glCol = 5;
    let gvCol = 6;
    let estadoCol = 7;
    let obsCol = 9;

    for (let i = 0; i < Math.min(10, rows.length); i++) {
      const r = rows[i];
      let lCol = -1;
      let vCol = -1;
      r.forEach((cell, cIdx) => {
        const val = normStr(cell);
        if (val === 'LOCAL') lCol = cIdx;
        if (val === 'VISITANTE') vCol = cIdx;
        if (val.includes('GOLES LOCAL') || val === 'GL') glCol = cIdx;
        if (val.includes('GOLES VISITANTE') || val === 'GV') gvCol = cIdx;
        if (val === 'ESTADO') estadoCol = cIdx;
        if (val.includes('OBSERVAC')) obsCol = cIdx;
      });
      if (lCol !== -1 && vCol !== -1) {
        headerIdx = i;
        localCol = lCol;
        visitCol = vCol;
        break;
      }
    }

    if (headerIdx === -1) headerIdx = 0;

    const list = [];
    for (let i = headerIdx + 1; i < rows.length; i++) {
      const r = rows[i];
      const local = cleanStr(r[localCol]);
      const visit = cleanStr(r[visitCol]);
      if (!local && !visit) continue;

      const estado = cleanStr(r[estadoCol]);
      const gl = cleanStr(r[glCol]);
      const gv = cleanStr(r[gvCol]);
      const esJugado = normStr(estado) === 'JUGADO' || (gl !== '' && gv !== '' && !normStr(estado).includes('PENDIENTE'));

      list.push({
        jornada: cleanStr(r[0]) || '1',
        partido: cleanStr(r[1]) || '',
        fecha: r[2] || '',
        local,
        visitante: visit,
        golesLocal: parseNum(gl),
        golesVisita: parseNum(gv),
        estado: esJugado ? 'Jugado' : 'Pendiente',
        observaciones: cleanStr(r[obsCol])
      });
    }

    return list;
  }

  // Procesamiento específico de TABLA_POSICIONES
  function parseStandingsSheet(rows, branchKey) {
    let headerIdx = -1;
    let eqCol = 2;
    let pjCol = 3;
    let pgCol = 4;
    let peCol = 5;
    let ppCol = 6;
    let gfCol = 7;
    let gcCol = 8;
    let dgCol = 9;
    let ptsCol = 10;
    let ult5Col = 12;
    let estadoCol = 13;

    for (let i = 0; i < Math.min(10, rows.length); i++) {
      const r = rows[i];
      let eFound = -1;
      r.forEach((cell, cIdx) => {
        const val = normStr(cell);
        if (val === 'EQUIPO') eFound = cIdx;
        if (val === 'PJ') pjCol = cIdx;
        if (val === 'PG') pgCol = cIdx;
        if (val === 'PE') peCol = cIdx;
        if (val === 'PP') ppCol = cIdx;
        if (val === 'GF') gfCol = cIdx;
        if (val === 'GC') gcCol = cIdx;
        if (val === 'DG') dgCol = cIdx;
        if (val === 'PTS' || val === 'PUNTOS') ptsCol = cIdx;
        if (val.includes('ULTIMOS 5') || val.includes('ÚLTIMOS 5')) ult5Col = cIdx;
        if (val === 'ESTADO') estadoCol = cIdx;
      });
      if (eFound !== -1) {
        headerIdx = i;
        eqCol = eFound;
        break;
      }
    }

    if (headerIdx === -1) headerIdx = 0;

    const list = [];
    for (let i = headerIdx + 1; i < rows.length; i++) {
      const r = rows[i];
      const eq = cleanStr(r[eqCol]);
      if (!eq || normStr(eq).includes('TOTAL') || normStr(eq).includes('EQUIPO')) continue;

      const pos = cleanStr(r[0]) || String(list.length + 1);
      const pj = parseNum(r[pjCol]);
      const pg = parseNum(r[pgCol]);
      const pe = parseNum(r[peCol]);
      const pp = parseNum(r[ppCol]);
      const gf = parseNum(r[gfCol]);
      const gc = parseNum(r[gcCol]);
      const dg = parseNum(r[dgCol]);
      const pts = parseNum(r[ptsCol]);
      const ult5 = cleanStr(r[ult5Col]) || '-';
      const estado = cleanStr(r[estadoCol]) || '';

      list.push({
        pos,
        equipo: eq,
        pj,
        pg,
        pe,
        pp,
        gf,
        gc,
        dg,
        pts,
        ult5,
        estado,
        branch: branchKey
      });
    }

    // Si viene sin posición ordenada, ordenar por PTS, DG, GF
    list.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
    return list;
  }

  // Procesamiento específico de JUGADORES (bloque resumen a la derecha)
  function parsePlayersSheet(rows, branchKey) {
    let sumRowIdx = -1;
    let jCol = -1;
    let eqCol = -1;

    // Detectar fila de resumen donde «Equipo» está justo a la derecha de «Jugador»
    for (let i = 0; i < Math.min(15, rows.length); i++) {
      const r = rows[i];
      for (let c = 0; c < r.length - 1; c++) {
        const val1 = normStr(r[c]);
        const val2 = normStr(r[c + 1]);
        if (val1 === 'JUGADOR' && val2 === 'EQUIPO') {
          sumRowIdx = i;
          jCol = c;
          eqCol = c + 1;
          break;
        }
      }
      if (sumRowIdx !== -1) break;
    }

    if (sumRowIdx === -1) return [];

    const list = [];
    for (let i = sumRowIdx + 1; i < rows.length; i++) {
      const r = rows[i];
      const jugador = cleanStr(r[jCol]);
      const equipo = cleanStr(r[eqCol]);
      if (!jugador || !equipo) continue;

      const dorsal = cleanStr(r[jCol + 2]);
      const posicion = cleanStr(r[jCol + 3]);
      const pj = parseNum(r[jCol + 4]);
      const goles = parseNum(r[jCol + 5]);
      const asistencias = parseNum(r[jCol + 6]);
      const ta = parseNum(r[jCol + 7]);
      const tr = parseNum(r[jCol + 8]);
      const mvp = parseNum(r[jCol + 9]);
      const fairPlay = parseNum(r[jCol + 10]);

      list.push({
        jugador,
        equipo,
        dorsal,
        posicion,
        pj,
        goles,
        asistencias,
        ta,
        tr,
        mvp,
        fairPlay,
        branch: branchKey
      });
    }

    return list;
  }

  // Carga sincronizada de datos por categoría
  async function loadBranchData(branchKey) {
    const cfg = SHEETS_CONFIG[branchKey];
    const results = await Promise.allSettled(
      HOJAS_OBJETIVO.map(hoja => fetchSheetGvizRows(cfg.id, hoja))
    );

    const branchData = APP_STATE.data[branchKey];
    const errores = [];

    // 1. CALENDARIO
    if (results[0].status === 'fulfilled') {
      const { matches, roster } = parseCalendarSheet(results[0].value, branchKey);
      if (matches.length) branchData.calendario = matches;
      if (roster.length) branchData.plantilla = roster;
    } else {
      errores.push(`CALENDARIO (${results[0].reason.message})`);
    }

    // 2. RESULTADOS
    if (results[1].status === 'fulfilled') {
      const res = parseResultsSheet(results[1].value);
      if (res.length) branchData.resultados = res;
    } else {
      errores.push(`RESULTADOS (${results[1].reason.message})`);
    }

    // 3. TABLA DE POSICIONES
    if (results[2].status === 'fulfilled') {
      const stand = parseStandingsSheet(results[2].value, branchKey);
      if (stand.length) branchData.posiciones = stand;
    } else {
      errores.push(`TABLA_POSICIONES (${results[2].reason.message})`);
    }

    // 4. JUGADORES
    if (results[3].status === 'fulfilled') {
      const players = parsePlayersSheet(results[3].value, branchKey);
      if (players.length) branchData.jugadores = players;
    } else {
      errores.push(`JUGADORES (${results[3].reason.message})`);
    }

    // Fallback de plantilla si no llegó por sheets
    if (!branchData.plantilla.length) {
      branchData.plantilla = cfg.plantillaBase.slice();
    }

    return errores;
  }


  function applyApiData(apiData) {
    if (!apiData) return;
    if (apiData.masculino) {
      if (Array.isArray(apiData.masculino.CALENDARIO) && apiData.masculino.CALENDARIO.length) {
        const { matches, roster } = parseCalendarSheet(apiData.masculino.CALENDARIO, "masculino");
        if (matches.length) APP_STATE.data.masculino.calendario = matches;
        if (roster.length) APP_STATE.data.masculino.plantilla = roster;
      }
      if (Array.isArray(apiData.masculino.RESULTADOS) && apiData.masculino.RESULTADOS.length) {
        const res = parseResultsSheet(apiData.masculino.RESULTADOS);
        if (res.length) APP_STATE.data.masculino.resultados = res;
      }
      if (Array.isArray(apiData.masculino.TABLA_POSICIONES) && apiData.masculino.TABLA_POSICIONES.length) {
        const stand = parseStandingsSheet(apiData.masculino.TABLA_POSICIONES, "masculino");
        if (stand.length) APP_STATE.data.masculino.posiciones = stand;
      }
      if (Array.isArray(apiData.masculino.JUGADORES) && apiData.masculino.JUGADORES.length) {
        const ply = parsePlayersSheet(apiData.masculino.JUGADORES, "masculino");
        if (ply.length) APP_STATE.data.masculino.jugadores = ply;
      }
    }
    if (apiData.femenino) {
      if (Array.isArray(apiData.femenino.CALENDARIO) && apiData.femenino.CALENDARIO.length) {
        const { matches, roster } = parseCalendarSheet(apiData.femenino.CALENDARIO, "femenino");
        if (matches.length) APP_STATE.data.femenino.calendario = matches;
        if (roster.length) APP_STATE.data.femenino.plantilla = roster;
      }
      if (Array.isArray(apiData.femenino.RESULTADOS) && apiData.femenino.RESULTADOS.length) {
        const res = parseResultsSheet(apiData.femenino.RESULTADOS);
        if (res.length) APP_STATE.data.femenino.resultados = res;
      }
      if (Array.isArray(apiData.femenino.TABLA_POSICIONES) && apiData.femenino.TABLA_POSICIONES.length) {
        const stand = parseStandingsSheet(apiData.femenino.TABLA_POSICIONES, "femenino");
        if (stand.length) APP_STATE.data.femenino.posiciones = stand;
      }
      if (Array.isArray(apiData.femenino.JUGADORES) && apiData.femenino.JUGADORES.length) {
        const ply = parsePlayersSheet(apiData.femenino.JUGADORES, "femenino");
        if (ply.length) APP_STATE.data.femenino.jugadores = ply;
      }
    }
  }

  async function syncAllData() {
    updateStatusPill("loading", "ACTUALIZANDO DATOS…");
    let loadedOk = false;

    // Prioridad 1: Endpoint proxy del servidor (rápido, sin problemas de CORS)
    try {
      const resp = await fetch("/api/tournament-data", { cache: "no-cache" });
      if (resp.ok) {
        const json = await resp.json();
        if (json && json.success && json.data) {
          applyApiData(json.data);
          loadedOk = true;
        }
      }
    } catch (errApi) {
      console.warn("API local no disponible, intentando gviz directo:", errApi);
    }

    // Prioridad 2: Fallback a Google Sheets gviz JSONP directo
    if (!loadedOk) {
      try {
        const [errMasc, errFem] = await Promise.all([
          loadBranchData("masculino"),
          loadBranchData("femenino")
        ]);
        const todosErrores = [...(errMasc || []), ...(errFem || [])];
        if (todosErrores.length === 0) {
          loadedOk = true;
        }
      } catch (errGviz) {
        console.warn("Error en fallback gviz:", errGviz);
      }
    }

    APP_STATE.lastSyncTime = new Date();
    updateStatusPill("connected", "DATOS ACTUALIZADOS EN VIVO");
    renderCurrentView();
  }

  function updateStatusPill(type, text, details = '') {
    const ind = document.getElementById('dataStatusIndicator');
    const txt = document.getElementById('dataStatusText');
    const timeEl = document.getElementById('dataStatusTime');
    const alertEl = document.getElementById('dataStatusAlert');

    if (!ind || !txt) return;

    ind.className = `status-pill status-${type}`;
    txt.textContent = text;

    if (APP_STATE.lastSyncTime) {
      const h = APP_STATE.lastSyncTime.getHours();
      const m = String(APP_STATE.lastSyncTime.getMinutes()).padStart(2, '0');
      const ampm = h >= 12 ? 'p. m.' : 'a. m.';
      const h12 = h % 12 || 12;
      timeEl.textContent = `· ${h12}:${m} ${ampm}`;
    }

    if (details && alertEl) {
      alertEl.textContent = details;
      alertEl.hidden = false;
    } else if (alertEl) {
      alertEl.hidden = true;
    }
  }

  // =========================================================
  // RENDERIZADO DEL INICIO (GENERAL - SECCIÓN 7)
  // =========================================================
  function renderHomeView() {
    const mascCal = APP_STATE.data.masculino.calendario || [];
    const femCal = APP_STATE.data.femenino.calendario || [];
    const mascRes = APP_STATE.data.masculino.resultados || [];
    const femRes = APP_STATE.data.femenino.resultados || [];
    const mascPos = APP_STATE.data.masculino.posiciones || [];
    const femPos = APP_STATE.data.femenino.posiciones || [];

    const totalProg = SHEETS_CONFIG.masculino.totalPartidos + SHEETS_CONFIG.femenino.totalPartidos;
    const jugadosMasc = mascRes.filter(r => r.estado === 'Jugado').length;
    const jugadosFem = femRes.filter(r => r.estado === 'Jugado').length;
    const jugadosTotal = jugadosMasc + jugadosFem;
    const pendientesTotal = Math.max(0, totalProg - jugadosTotal);

    let golesMasc = 0;
    mascRes.filter(r => r.estado === 'Jugado').forEach(r => (golesMasc += (r.golesLocal || 0) + (r.golesVisita || 0)));
    let golesFem = 0;
    femRes.filter(r => r.estado === 'Jugado').forEach(r => (golesFem += (r.golesLocal || 0) + (r.golesVisita || 0)));
    const golesTotal = golesMasc + golesFem;
    const promedio = jugadosTotal > 0 ? (golesTotal / jugadosTotal).toFixed(1) : '0.0';

    document.getElementById('homeSumJugados').textContent = jugadosTotal;
    document.getElementById('homeSumJugadosTotal').textContent = `de ${totalProg} programados`;
    document.getElementById('homeSumPendientes').textContent = pendientesTotal;
    document.getElementById('homeSumGoles').textContent = golesTotal;
    document.getElementById('homeSumPromedio').textContent = `${promedio} por partido`;

    // Líderes actuales
    const liderMasc = mascPos.find(p => p.pj > 0);
    const mascLeaderNameEl = document.getElementById('homeLeaderMascName');
    const mascLeaderShieldEl = document.getElementById('homeLeaderMascShield');
    const mascLeaderPtsEl = document.getElementById('homeLeaderMascPts');
    if (liderMasc) {
      mascLeaderNameEl.textContent = liderMasc.equipo;
      mascLeaderShieldEl.innerHTML = getTeamShieldHtml(liderMasc.equipo);
      mascLeaderPtsEl.textContent = `${liderMasc.pts} pts`;
    } else {
      mascLeaderNameEl.textContent = 'Sin partidos jugados';
      mascLeaderShieldEl.innerHTML = '';
      mascLeaderPtsEl.textContent = '';
    }

    const liderFem = femPos.find(p => p.pj > 0);
    const femLeaderNameEl = document.getElementById('homeLeaderFemName');
    const femLeaderShieldEl = document.getElementById('homeLeaderFemShield');
    const femLeaderPtsEl = document.getElementById('homeLeaderFemPts');
    if (liderFem) {
      femLeaderNameEl.textContent = liderFem.equipo;
      femLeaderShieldEl.innerHTML = getTeamShieldHtml(liderFem.equipo);
      femLeaderPtsEl.textContent = `${liderFem.pts} pts`;
    } else {
      femLeaderNameEl.textContent = 'Sin partidos jugados';
      femLeaderShieldEl.innerHTML = '';
      femLeaderPtsEl.textContent = '';
    }

    // Barra de avance
    const pct = totalProg > 0 ? Math.round((jugadosTotal / totalProg) * 100) : 0;
    document.getElementById('homeProgressText').textContent = `${jugadosTotal} de ${totalProg} partidos jugados (${pct}%)`;
    document.getElementById('homeProgressBar').style.width = `${pct}%`;

    // Próximos encuentros
    renderHomeNextMatches(mascCal, femCal, mascRes, femRes);

    // Últimos resultados
    renderHomeLatestResults(mascRes, femRes);

    // Fair Play
    renderHomeFairPlay();
  }

  function renderHomeNextMatches(mascCal, femCal, mascRes, femRes) {
    const listEl = document.getElementById("homeNextMatchesList");
    if (!listEl) return;

    const jugadosKeys = new Set();
    [...mascRes, ...femRes].filter(r => r.estado === "Jugado").forEach(r => {
      jugadosKeys.add(`${normStr(r.local)}_${normStr(r.visitante)}`);
    });

    const pendientes = [];
    [...mascCal, ...femCal].forEach(m => {
      const key = `${normStr(m.local)}_${normStr(m.visitante)}`;
      if (jugadosKeys.has(key)) return;
      if (cleanStr(m.marcador) && cleanStr(m.marcador) !== "-") return;

      const isFinal =
        normStr(m.local).includes("DEFINIR") ||
        normStr(m.visitante).includes("DEFINIR") ||
        normStr(m.observaciones).includes("PLAY-IN") ||
        normStr(m.observaciones).includes("SEMIFINAL") ||
        normStr(m.observaciones).includes("FINAL");

      if (!isFinal) {
        pendientes.push(m);
      }
    });

    if (!pendientes.length) {
      listEl.innerHTML = '<p class="empty-state-msg">No hay partidos pendientes por disputar.</p>';
      return;
    }

    // Filtrar estrictamente la próxima fecha más cercana
    pendientes.sort((a, b) => {
      const da = parseSheetDate(a.fecha)?.getTime() || 9999999999999;
      const db = parseSheetDate(b.fecha)?.getTime() || 9999999999999;
      return da - db;
    });

    const earliestTime = parseSheetDate(pendientes[0].fecha)?.getTime();
    const nextMatchday = pendientes.filter(p => {
      const t = parseSheetDate(p.fecha)?.getTime();
      return t !== null && t === earliestTime;
    });

    // Ordenar estrictamente cronológicamente por hora los partidos de ese día
    nextMatchday.sort((a, b) => parseTimeInMinutes(a.hora) - parseTimeInMinutes(b.hora));

    const dayHeader = formatDayHeader(nextMatchday[0].fecha);
    const relTime = getRelativeDateLabel(nextMatchday[0].fecha);

    let html = `
      <div class="next-day-alert-banner">
        <div class="alert-banner-left">
          <span class="alert-banner-badge">📅 PRÓXIMA FECHA OFICIAL</span>
          <h3 class="alert-banner-title">${escapeHtml(dayHeader)}</h3>
        </div>
        <div class="alert-banner-right">
          <span class="alert-badge-count">${nextMatchday.length} PARTIDOS PROGRAMADOS</span>
          ${relTime ? `<span class="alert-badge-rel">${escapeHtml(relTime)}</span>` : ""}
        </div>
      </div>
      <div class="matches-stream-cards">
    `;

    nextMatchday.forEach((m, idx) => {
      const isFirstMatch = idx === 0;
      const cancha = parseCanchaInfo(m.cancha);
      const isFem = m.branch === "femenino";
      const branchBadge = isFem ? "TORNEO FEMENINO" : "TORNEO MASCULINO";
      const branchClass = isFem ? "match-fem" : "match-masc";
      const tagClass = isFem ? "tag-femenino" : "tag-masculino";

      html += `
        <div class="match-row-card ${branchClass} ${isFirstMatch ? "highlight-next" : ""}">
          <div class="next-badge-row">
            <div class="match-time-tag-box">
              <span class="match-index-pill">PARTIDO ${idx + 1}</span>
              <strong class="match-hour-pill">${escapeHtml(m.hora || "Hora por definir")}</strong>
              ${isFirstMatch ? `<span class="badge-siguiente">PRIMER ENCUENTRO</span>` : ""}
            </div>
            <span class="badge-tag ${tagClass}">${branchBadge} · Jornada ${escapeHtml(m.jornada || "1")}</span>
          </div>

          <div class="match-teams-row">
            <div class="team-side home">
              ${getTeamShieldHtml(m.local)}
              <span class="team-name">${escapeHtml(m.local)}</span>
            </div>
            <div class="match-middle-box">
              <span class="match-vs-tag">VS</span>
            </div>
            <div class="team-side away">
              <span class="team-name">${escapeHtml(m.visitante)}</span>
              ${getTeamShieldHtml(m.visitante)}
            </div>
          </div>

          <div class="match-meta-line">
            <span class="venue-info-text">📍 ${escapeHtml(cancha.direccion)}</span>
            ${cancha.mapsUrl ? `<a href="${cancha.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-maps-action">Google Maps ↗</a>` : ""}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    listEl.innerHTML = html;
  }

  function renderHomeLatestResults(mascRes, femRes) {
    const listEl = document.getElementById('homeLatestResultsList');
    if (!listEl) return;

    const jugados = [...mascRes, ...femRes].filter(r => r.estado === 'Jugado');
    if (!jugados.length) {
      listEl.innerHTML = '<p class="empty-state-msg">Aún no se han disputado partidos oficiales.</p>';
      return;
    }

    const ultimos5 = jugados.slice(-5).reverse();
    let html = '';

    ultimos5.forEach(r => {
      html += `
        <div class="result-item-card" onclick="window.location.hash='#/calendario'">
          <div class="match-teams-row">
            <div class="team-side home">
              ${getTeamShieldHtml(r.local)}
              <span class="team-name">${escapeHtml(r.local)}</span>
            </div>
            <div class="match-middle-box">
              <span class="match-score-pill">${r.golesLocal} - ${r.golesVisita}</span>
            </div>
            <div class="team-side away">
              <span class="team-name">${escapeHtml(r.visitante)}</span>
              ${getTeamShieldHtml(r.visitante)}
            </div>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;
  }

  function renderHomeFairPlay() {
    const mascBody = document.getElementById('homeFairMascBody');
    const femBody = document.getElementById('homeFairFemBody');
    if (!mascBody || !femBody) return;

    const mascJug = (APP_STATE.data.masculino.jugadores || []).filter(j => j.pj > 0);
    const femJug = (APP_STATE.data.femenino.jugadores || []).filter(j => j.pj > 0);

    const calcFairTeam = jugList => {
      const teams = {};
      jugList.forEach(j => {
        if (!teams[j.equipo]) teams[j.equipo] = { amarillas: 0, rojas: 0, fairTotal: 0, count: 0 };
        teams[j.equipo].amarillas += j.ta || 0;
        teams[j.equipo].rojas += j.tr || 0;
        teams[j.equipo].fairTotal += j.fairPlay || 0;
        teams[j.equipo].count += 1;
      });
      let bestTeam = null;
      let minScore = 99999;
      for (const [t, data] of Object.entries(teams)) {
        const score = data.fairTotal > 0 ? data.fairTotal : (data.amarillas * 5000 + data.rojas * 10000);
        if (score < minScore) {
          minScore = score;
          bestTeam = { equipo: t, ...data };
        }
      }
      return bestTeam;
    };

    const bestMasc = calcFairTeam(mascJug);
    if (bestMasc) {
      mascBody.innerHTML = `
        <div class="fairplay-team-row">
          <div class="leader-team-info">
            ${getTeamShieldHtml(bestMasc.equipo)}
            <strong class="leader-team-name">${escapeHtml(bestMasc.equipo)}</strong>
          </div>
          <span class="cards-penalty">${bestMasc.amarillas} 🟨 · ${bestMasc.rojas} 🟥</span>
        </div>
      `;
    } else {
      mascBody.innerHTML = `<span class="empty-state-msg">Se mostrará cuando haya partidos</span>`;
    }

    const bestFem = calcFairTeam(femJug);
    if (bestFem) {
      femBody.innerHTML = `
        <div class="fairplay-team-row">
          <div class="leader-team-info">
            ${getTeamShieldHtml(bestFem.equipo)}
            <strong class="leader-team-name">${escapeHtml(bestFem.equipo)}</strong>
          </div>
          <span class="cards-penalty">${bestFem.amarillas} 🟨 · ${bestFem.rojas} 🟥</span>
        </div>
      `;
    } else {
      femBody.innerHTML = `<span class="empty-state-msg">Se mostrará cuando haya partidos</span>`;
    }
  }

  // =========================================================
  // RENDERIZADO DEL ESPACIO DE RAMA
  // =========================================================
  function renderBranchView(branchKey, subSection = 'resumen') {
    APP_STATE.currentBranch = branchKey;
    APP_STATE.currentSub = subSection;

    const cfg = SHEETS_CONFIG[branchKey];
    const data = APP_STATE.data[branchKey];

    document.body.className = branchKey === 'masculino' ? 'tema-masculino' : 'tema-femenino';

    const btnMasc = document.getElementById('btnRamaMasc');
    const btnFem = document.getElementById('btnRamaFem');
    if (branchKey === 'masculino') {
      btnMasc.className = 'branch-pill-btn active-masc';
      btnMasc.setAttribute('aria-selected', 'true');
      btnFem.className = 'branch-pill-btn';
      btnFem.setAttribute('aria-selected', 'false');
    } else {
      btnMasc.className = 'branch-pill-btn';
      btnMasc.setAttribute('aria-selected', 'false');
      btnFem.className = 'branch-pill-btn active-fem';
      btnFem.setAttribute('aria-selected', 'true');
    }

    document.getElementById('branchBadge').textContent = cfg.badge;
    document.getElementById('branchMainTitle').textContent = `CATEGORÍA ${cfg.nombre}`;
    document.getElementById('branchDescription').textContent = cfg.desc;

    document.querySelectorAll('.sub-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.sub === subSection);
    });

    document.querySelectorAll('.sub-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `sub-${subSection}`);
    });

    if (subSection === 'resumen') renderBranchResumen(branchKey, data);
    else if (subSection === 'calendario') renderBranchCalendar(branchKey, data);
    else if (subSection === 'resultados') renderBranchResults(branchKey, data);
    else if (subSection === 'posiciones') renderBranchStandings(branchKey, data);
    else if (subSection === 'equipos') renderBranchTeams(branchKey, data);
    else if (subSection === 'estadisticas') renderBranchStats(branchKey, data);
    else if (subSection === 'presentacion') renderBranchVideo(branchKey, cfg);
  }

  function renderBranchResumen(branchKey, data) {
    const cardEl = document.getElementById('branchNextMatchCard');
    const pend = (data.calendario || []).find(m => !cleanStr(m.marcador) || cleanStr(m.marcador) === '-');
    if (pend) {
      const cancha = parseCanchaInfo(pend.cancha);
      cardEl.innerHTML = `
        <div class="match-row-card highlight-next ${branchKey === 'masculino' ? 'match-masc' : 'match-fem'}">
          <div class="next-badge-row">
            <span class="badge-siguiente">PRÓXIMO · ${escapeHtml(pend.hora || 'Hora por definir')}</span>
            <span class="relative-time-text">${escapeHtml(formatMatchDate(pend.fecha, ''))}</span>
          </div>
          <div class="match-teams-row">
            <div class="team-side home">
              ${getTeamShieldHtml(pend.local)}
              <span class="team-name">${escapeHtml(pend.local)}</span>
            </div>
            <div class="match-middle-box"><span class="match-vs-tag">vs</span></div>
            <div class="team-side away">
              <span class="team-name">${escapeHtml(pend.visitante)}</span>
              ${getTeamShieldHtml(pend.visitante)}
            </div>
          </div>
          <div class="match-meta-line">
            <span>📍 ${escapeHtml(cancha.direccion)}</span>
            ${cancha.mapsUrl ? `<a href="${cancha.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-maps-action">Ver en Maps ↗</a>` : ''}
          </div>
        </div>
      `;
    } else {
      cardEl.innerHTML = '<p class="empty-state-msg">No hay partidos pendientes en esta categoría.</p>';
    }

    renderStandingsTable(document.getElementById('branchMiniStandings'), data.posiciones, true);

    const resListEl = document.getElementById('branchLatestResultsList');
    const jugados = (data.resultados || []).filter(r => r.estado === 'Jugado');
    if (jugados.length) {
      resListEl.innerHTML = jugados
        .slice(-3)
        .reverse()
        .map(
          r => `
        <div class="result-item-card">
          <div class="match-teams-row">
            <div class="team-side home">
              ${getTeamShieldHtml(r.local)}
              <span class="team-name">${escapeHtml(r.local)}</span>
            </div>
            <div class="match-middle-box">
              <span class="match-score-pill">${r.golesLocal} - ${r.golesVisita}</span>
            </div>
            <div class="team-side away">
              <span class="team-name">${escapeHtml(r.visitante)}</span>
              ${getTeamShieldHtml(r.visitante)}
            </div>
          </div>
        </div>
      `
        )
        .join('');
    } else {
      resListEl.innerHTML = '<p class="empty-state-msg">Aún no se han disputado partidos en esta categoría.</p>';
    }

    renderTopThreeMini(branchKey, data);
  }

  function renderTopThreeMini(branchKey, data) {
    const jug = data.jugadores || [];

    const scorersEl = document.getElementById('branchTopScorersMini');
    const topScorers = [...jug].filter(j => j.goles > 0).sort((a, b) => b.goles - a.goles).slice(0, 3);
    if (topScorers.length) {
      scorersEl.innerHTML = topScorers
        .map(
          (s, idx) => `
        <div class="top-three-row">
          <span class="top-rank-pos">${idx + 1}</span>
          <span class="top-player-name">${escapeHtml(s.jugador)} <small>(${escapeHtml(s.equipo)})</small></span>
          <strong class="top-stat-val">${s.goles}</strong>
        </div>
      `
        )
        .join('');
    } else {
      scorersEl.innerHTML = '<p class="empty-state-msg">Aún no hay goles registrados.</p>';
    }

    const assistsEl = document.getElementById('branchTopAssistsMini');
    const topAssists = [...jug].filter(j => j.asistencias > 0).sort((a, b) => b.asistencias - a.asistencias).slice(0, 3);
    if (topAssists.length) {
      assistsEl.innerHTML = topAssists
        .map(
          (a, idx) => `
        <div class="top-three-row">
          <span class="top-rank-pos">${idx + 1}</span>
          <span class="top-player-name">${escapeHtml(a.jugador)} <small>(${escapeHtml(a.equipo)})</small></span>
          <strong class="top-stat-val">${a.asistencias}</strong>
        </div>
      `
        )
        .join('');
    } else {
      assistsEl.innerHTML = '<p class="empty-state-msg">Aún no hay asistencias registradas.</p>';
    }

    const keepersEl = document.getElementById('branchTopKeepersMini');
    const posList = [...(data.posiciones || [])].filter(p => p.pj > 0).sort((a, b) => a.gc / a.pj - b.gc / b.pj).slice(0, 3);
    if (posList.length) {
      keepersEl.innerHTML = posList
        .map(
          (p, idx) => `
        <div class="top-three-row">
          <span class="top-rank-pos">${idx + 1}</span>
          <span class="top-player-name">${escapeHtml(p.equipo)}</span>
          <strong class="top-stat-val">${(p.gc / p.pj).toFixed(1)}</strong>
        </div>
      `
        )
        .join('');
    } else {
      keepersEl.innerHTML = '<p class="empty-state-msg">Se mostrará al disputarse los partidos.</p>';
    }
  }

  function renderBranchCalendar(branchKey, data) {
    const cont = document.getElementById('branchCalendarRounds');
    if (!cont) return;

    const matches = data.calendario || [];
    if (!matches.length) {
      cont.innerHTML = '<p class="empty-state-msg">No se ha cargado el calendario oficial.</p>';
      return;
    }

    const rounds = new Map();
    matches.forEach(m => {
      const jor = m.jornada || 'Jornada 1';
      if (!rounds.has(jor)) rounds.set(jor, []);
      rounds.get(jor).push(m);
    });

    let html = '';
    for (const [jor, list] of rounds.entries()) {
      html += `
        <div class="day-group">
          <h3 class="day-header">JORNADA ${escapeHtml(jor)}</h3>
          ${list
            .map(m => {
              const cancha = parseCanchaInfo(m.cancha);
              const branchClass = branchKey === 'masculino' ? 'match-masc' : 'match-fem';
              const hasMarcador = cleanStr(m.marcador) && cleanStr(m.marcador) !== '-';
              return `
              <div class="match-row-card ${branchClass}">
                <div class="match-teams-row">
                  <div class="team-side home">
                    ${getTeamShieldHtml(m.local)}
                    <span class="team-name">${escapeHtml(m.local)}</span>
                  </div>
                  <div class="match-middle-box">
                    ${hasMarcador ? `<span class="match-score-pill">${escapeHtml(m.marcador)}</span>` : '<span class="match-vs-tag">vs</span>'}
                  </div>
                  <div class="team-side away">
                    <span class="team-name">${escapeHtml(m.visitante)}</span>
                    ${getTeamShieldHtml(m.visitante)}
                  </div>
                </div>
                <div class="match-meta-line">
                  <span>📅 ${escapeHtml(formatMatchDate(m.fecha, m.hora))} · 📍 ${escapeHtml(cancha.direccion)}</span>
                  ${cancha.mapsUrl ? `<a href="${cancha.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-maps-action">Ver en Maps ↗</a>` : ''}
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      `;
    }
    cont.innerHTML = html;
  }

  function renderBranchResults(branchKey, data) {
    const cont = document.getElementById('branchResultsOfficialList');
    if (!cont) return;

    const jugados = (data.resultados || []).filter(r => r.estado === 'Jugado');
    if (!jugados.length) {
      cont.innerHTML = '<p class="empty-state-msg">No hay resultados oficiales registrados aún.</p>';
      return;
    }

    cont.innerHTML = jugados
      .slice()
      .reverse()
      .map(
        r => `
      <div class="result-item-card">
        <div class="match-teams-row">
          <div class="team-side home">
            ${getTeamShieldHtml(r.local)}
            <span class="team-name">${escapeHtml(r.local)}</span>
          </div>
          <div class="match-middle-box">
            <span class="match-score-pill">${r.golesLocal} - ${r.golesVisita}</span>
          </div>
          <div class="team-side away">
            <span class="team-name">${escapeHtml(r.visitante)}</span>
            ${getTeamShieldHtml(r.visitante)}
          </div>
        </div>
        <div class="match-meta-line">
          <span>Jornada ${escapeHtml(r.jornada || '1')} · ${escapeHtml(formatMatchDate(r.fecha, ''))}</span>
        </div>
      </div>
    `
      )
      .join('');
  }

  function renderBranchStandings(branchKey, data) {
    renderStandingsTable(document.getElementById('branchFullStandings'), data.posiciones, false);
  }

  function renderStandingsTable(container, standings, isMini = false) {
    if (!container) return;
    if (!standings || !standings.length) {
      container.innerHTML = '<p class="empty-state-msg">La tabla oficial se actualizará con los primeros encuentros.</p>';
      return;
    }

    let html = `
      <table class="official-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Equipo</th>
            <th class="num-cell">PJ</th>
            ${!isMini ? `
              <th class="num-cell">PG</th>
              <th class="num-cell">PE</th>
              <th class="num-cell">PP</th>
              <th class="num-cell">GF</th>
              <th class="num-cell">GC</th>
            ` : ''}
            <th class="num-cell">DG</th>
            <th class="pts-cell">PTS</th>
          </tr>
        </thead>
        <tbody>
    `;

    standings.forEach((s, idx) => {
      const isLeader = idx === 0 && s.pj > 0;
      html += `
        <tr>
          <td><strong>${s.pos || idx + 1}</strong></td>
          <td>
            <div class="leader-team-info">
              ${getTeamShieldHtml(s.equipo)}
              <span class="leader-team-name">${escapeHtml(s.equipo)}</span>
              ${isLeader ? '<span class="tag-lider">LÍDER</span>' : ''}
            </div>
          </td>
          <td class="num-cell">${s.pj}</td>
          ${!isMini ? `
            <td class="num-cell">${s.pg}</td>
            <td class="num-cell">${s.pe}</td>
            <td class="num-cell">${s.pp}</td>
            <td class="num-cell">${s.gf}</td>
            <td class="num-cell">${s.gc}</td>
          ` : ''}
          <td class="num-cell">${s.dg > 0 ? `+${s.dg}` : s.dg}</td>
          <td class="pts-cell">${s.pts}</td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  }

  function renderBranchTeams(branchKey, data) {
    const teamsGrid = document.getElementById('branchTeamsGrid');
    const rosterGrid = document.getElementById('branchRosterGrid');
    const selectFilter = document.getElementById('selectTeamFilter');
    if (!teamsGrid || !rosterGrid || !selectFilter) return;

    const equipos = SHEETS_CONFIG[branchKey].equipos;
    const plantilla = data.plantilla.length ? data.plantilla : SHEETS_CONFIG[branchKey].plantillaBase;
    const statsJug = data.jugadores || [];

    selectFilter.innerHTML = '<option value="all">Todos los equipos</option>' +
      equipos.map(eq => `<option value="${escapeHtml(eq)}">${escapeHtml(eq)}</option>`).join('');

    teamsGrid.innerHTML = equipos
      .map(eq => {
        const stand = (data.posiciones || []).find(p => normStr(p.equipo) === normStr(eq));
        const cap = plantilla.find(p => normStr(p.team) === normStr(eq) && normStr(p.role).includes('CAPIT'))?.name || 'Por definir';
        return `
        <div class="team-card-item" onclick="document.getElementById('selectTeamFilter').value='${escapeHtml(eq)}'; document.getElementById('selectTeamFilter').dispatchEvent(new Event('change'));">
          <div class="team-card-top">
            ${getTeamShieldHtml(eq)}
            <div>
              <h3 class="team-card-title">${escapeHtml(eq)}</h3>
              <p class="team-card-captain">Capitán: <strong>${escapeHtml(cap)}</strong></p>
            </div>
          </div>
          <div class="team-card-stats">
            <div>PJ: <strong>${stand ? stand.pj : 0}</strong></div>
            <div>PTS: <strong>${stand ? stand.pts : 0}</strong></div>
            <div>DG: <strong>${stand ? stand.dg : 0}</strong></div>
          </div>
        </div>
      `;
      })
      .join('');

    function updateRoster(filterVal) {
      const filtered = filterVal === 'all'
        ? plantilla
        : plantilla.filter(p => normStr(p.team) === normStr(filterVal));

      if (!filtered.length) {
        rosterGrid.innerHTML = '<p class="empty-state-msg">No hay jugadores registrados para este equipo.</p>';
        return;
      }

      rosterGrid.innerHTML = filtered
        .map(p => {
          const stat = statsJug.find(j => normStr(j.jugador) === normStr(p.name) && normStr(j.equipo) === normStr(p.team));
          return `
          <div class="roster-player-card">
            <div class="roster-dorsal">${escapeHtml(p.number || '—')}</div>
            <div class="roster-player-info">
              <strong>${escapeHtml(p.name)}</strong>
              <small>${escapeHtml(p.role || 'Jugador')} · ${escapeHtml(p.team)}</small>
            </div>
            <div class="roster-mini-stats">
              <span>⚽ ${stat ? stat.goles : 0}</span>
              ${stat && stat.ta ? ` · <span>${stat.ta} 🟨</span>` : ''}
            </div>
          </div>
        `;
        })
        .join('');
    }

    selectFilter.onchange = e => updateRoster(e.target.value);
    updateRoster('all');
  }

  function renderBranchStats(branchKey, data) {
    const jug = data.jugadores || [];
    const pos = data.posiciones || [];

    // Goleadores
    const goleadoresEl = document.getElementById('statPanelGoleadores');
    const scorers = [...jug].filter(j => j.goles > 0).sort((a, b) => b.goles - a.goles || a.pj - b.pj);
    if (scorers.length) {
      goleadoresEl.innerHTML = `
        <table class="official-table">
          <thead>
            <tr>
              <th>#</th><th>Jugador</th><th>Equipo</th><th class="num-cell">PJ</th><th class="pts-cell">Goles</th><th class="num-cell">Prom.</th>
            </tr>
          </thead>
          <tbody>
            ${scorers
              .map(
                (s, i) => `
              <tr>
                <td><strong>${i + 1}</strong></td>
                <td><strong>${escapeHtml(s.jugador)}</strong></td>
                <td>${escapeHtml(s.equipo)}</td>
                <td class="num-cell">${s.pj}</td>
                <td class="pts-cell">${s.goles}</td>
                <td class="num-cell">${s.pj > 0 ? (s.goles / s.pj).toFixed(1) : '—'}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      `;
    } else {
      goleadoresEl.innerHTML = '<p class="empty-state-msg">Aún no hay goles oficiales registrados.</p>';
    }

    // Asistencias
    const asistEl = document.getElementById('statPanelAsistencias');
    const assists = [...jug].filter(j => j.asistencias > 0).sort((a, b) => b.asistencias - a.asistencias);
    if (assists.length) {
      asistEl.innerHTML = `
        <table class="official-table">
          <thead>
            <tr>
              <th>#</th><th>Jugador</th><th>Equipo</th><th class="pts-cell">Asistencias</th>
            </tr>
          </thead>
          <tbody>
            ${assists
              .map(
                (a, i) => `
              <tr>
                <td><strong>${i + 1}</strong></td>
                <td><strong>${escapeHtml(a.jugador)}</strong></td>
                <td>${escapeHtml(a.equipo)}</td>
                <td class="pts-cell">${a.asistencias}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      `;
    } else {
      asistEl.innerHTML = '<p class="empty-state-msg">Aún no hay asistencias registradas.</p>';
    }

    // Valla menos vencida
    const vallaEl = document.getElementById('statPanelValla');
    const keepersTeams = [...pos].filter(p => p.pj > 0).sort((a, b) => a.gc / a.pj - b.gc / b.pj);
    if (keepersTeams.length) {
      vallaEl.innerHTML = keepersTeams
        .map(
          (k, i) => `
        <div class="keeper-stat-row">
          <div class="keeper-info-left">
            <span class="top-rank-pos">${i + 1}</span>
            ${getTeamShieldHtml(k.equipo)}
            <div>
              <strong>${escapeHtml(k.equipo)}</strong>
              <small class="keeper-meta-sub">${k.gc} GC · ${k.pj} PJ</small>
            </div>
          </div>
          <div class="keeper-stat-right">
            <strong class="keeper-prom-value">${(k.gc / k.pj).toFixed(1)}</strong>
            <span class="keeper-prom-label">GC/PJ</span>
          </div>
        </div>
      `
        )
        .join('');
    } else {
      vallaEl.innerHTML = '<p class="empty-state-msg">Se mostrará cuando se disputen los partidos.</p>';
    }

    // MVP
    const mvpEl = document.getElementById('statPanelMvp');
    const mvpList = [...jug].filter(j => j.mvp > 0).sort((a, b) => b.mvp - a.mvp);
    if (mvpList.length) {
      mvpEl.innerHTML = `
        <table class="official-table">
          <thead><tr><th>#</th><th>Jugador</th><th>Equipo</th><th class="pts-cell">MVP Score</th></tr></thead>
          <tbody>
            ${mvpList
              .map(
                (m, i) => `
              <tr>
                <td><strong>${i + 1}</strong></td>
                <td><strong>${escapeHtml(m.jugador)}</strong></td>
                <td>${escapeHtml(m.equipo)}</td>
                <td class="pts-cell">${m.mvp}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      `;
    } else {
      mvpEl.innerHTML = '<p class="empty-state-msg">Puntajes MVP disponibles tras cada fecha.</p>';
    }

    // Disciplina
    const discEl = document.getElementById('statPanelDisciplina');
    const discList = [...jug].filter(j => j.ta > 0 || j.tr > 0).sort((a, b) => b.tr * 10000 + b.ta * 5000 - (a.tr * 10000 + a.ta * 5000));
    if (discList.length) {
      discEl.innerHTML = `
        <table class="official-table">
          <thead><tr><th>Jugador</th><th>Equipo</th><th class="num-cell">TA ($5k)</th><th class="num-cell">TR ($10k)</th><th class="pts-cell">Multa COP</th></tr></thead>
          <tbody>
            ${discList
              .map(
                d => `
              <tr>
                <td><strong>${escapeHtml(d.jugador)}</strong></td>
                <td>${escapeHtml(d.equipo)}</td>
                <td class="num-cell">${d.ta} 🟨</td>
                <td class="num-cell">${d.tr} 🟥</td>
                <td class="pts-cell">$${((d.ta * 5000) + (d.tr * 10000)).toLocaleString('es-CO')}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      `;
    } else {
      discEl.innerHTML = '<p class="empty-state-msg">Sin amonestaciones registradas (¡Excelente juego limpio!).</p>';
    }

    // Fair Play
    const fairEl = document.getElementById('statPanelFairplay');
    fairEl.innerHTML = `
      <div class="empty-state-card">
        <span class="empty-state-icon">🤝</span>
        <h3>Juego Limpio Oficial</h3>
        <p>El índice de Fair Play evalúa las amonestaciones oficiales. Entre menor puntaje, más deportivo es el equipo.</p>
      </div>
    `;

    // Generales
    const genEl = document.getElementById('statPanelGenerales');
    let totalGoles = 0;
    let totalJugados = 0;
    (data.resultados || []).filter(r => r.estado === 'Jugado').forEach(r => {
      totalJugados++;
      totalGoles += (r.golesLocal || 0) + (r.golesVisita || 0);
    });
    genEl.innerHTML = `
      <div class="summary-cards-grid">
        <div class="stat-box"><span class="stat-box-label">PARTIDOS JUGADOS</span><div class="stat-box-value">${totalJugados}</div></div>
        <div class="stat-box"><span class="stat-box-label">GOLES TOTALES</span><div class="stat-box-value">${totalGoles}</div></div>
        <div class="stat-box"><span class="stat-box-label">PROMEDIO DE GOL</span><div class="stat-box-value">${totalJugados > 0 ? (totalGoles / totalJugados).toFixed(1) : '0.0'}</div></div>
        <div class="stat-box"><span class="stat-box-label">EQUIPOS</span><div class="stat-box-value">${SHEETS_CONFIG[branchKey].equipos.length}</div></div>
      </div>
    `;
  }

  function renderBranchVideo(branchKey, cfg) {
    const poster = document.getElementById('videoBranchCover');
    const frame = document.getElementById('videoBranchPlayerFrame');
    const badge = document.getElementById('videoBranchBadge');
    const title = document.getElementById('videoBranchTitle');
    const btnPlay = document.getElementById('btnPlayVideoBranch');

    if (!poster || !frame) return;

    badge.textContent = `PRESENTACIÓN OFICIAL · ${cfg.nombre}`;
    title.textContent = `VIVE EL TORNEO ${cfg.nombre}`;

    frame.hidden = true;
    frame.innerHTML = '';
    poster.hidden = false;

    btnPlay.onclick = () => {
      poster.hidden = true;
      frame.hidden = false;

      const videoSource = cfg.video || '';
      const isLocal = videoSource.endsWith('.mp4') || videoSource.endsWith('.webm') || videoSource.includes('/');

      if (isLocal) {
        frame.innerHTML = `
          <video controls autoplay playsinline style="width: 100%; height: 100%; border-radius: var(--radius-sm); object-fit: cover;">
            <source src="${escapeHtml(videoSource)}" type="video/mp4">
            Tu navegador no soporta reproducción de video.
          </video>
        `;
      } else {
        frame.innerHTML = `
          <iframe
            src="https://www.youtube-nocookie.com/embed/${cfg.video}?autoplay=1&playsinline=1&rel=0&modestbranding=1"
            title="Video Presentación Oficial ${cfg.nombre}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        `;
      }
    };
  }

  // =========================================================
  // RENDERIZADO DE CALENDARIO GENERAL
  // =========================================================
  function renderGeneralCalendarView() {
    const cont = document.getElementById('generalMatchesContainer');
    if (!cont) return;

    const filter = APP_STATE.genFilter;
    const view = APP_STATE.genView;

    let matches = [];
    if (filter === 'all' || filter === 'masculino') {
      const m = view === 'cal' ? APP_STATE.data.masculino.calendario : APP_STATE.data.masculino.resultados;
      matches.push(...(m || []));
    }
    if (filter === 'all' || filter === 'femenino') {
      const f = view === 'cal' ? APP_STATE.data.femenino.calendario : APP_STATE.data.femenino.resultados;
      matches.push(...(f || []));
    }

    if (view === 'res') {
      matches = matches.filter(r => r.estado === 'Jugado');
    }

    if (!matches.length) {
      cont.innerHTML = '<p class="empty-state-msg">No hay partidos que coincidan con los filtros seleccionados.</p>';
      return;
    }

    cont.innerHTML = matches
      .map(m => {
        const branchClass = m.branch === 'masculino' ? 'match-masc' : 'match-fem';
        const isPlayed = view === 'res' || (cleanStr(m.marcador) && cleanStr(m.marcador) !== '-');
        return `
        <div class="match-row-card ${branchClass}">
          <div class="match-teams-row">
            <div class="team-side home">
              ${getTeamShieldHtml(m.local)}
              <span class="team-name">${escapeHtml(m.local)}</span>
            </div>
            <div class="match-middle-box">
              ${isPlayed
                ? `<span class="match-score-pill">${m.golesLocal !== undefined ? `${m.golesLocal} - ${m.golesVisita}` : escapeHtml(m.marcador)}</span>`
                : '<span class="match-vs-tag">vs</span>'}
            </div>
            <div class="team-side away">
              <span class="team-name">${escapeHtml(m.visitante)}</span>
              ${getTeamShieldHtml(m.visitante)}
            </div>
          </div>
          <div class="match-meta-line">
            <span>📅 ${escapeHtml(formatMatchDate(m.fecha, m.hora))} · Jornada ${escapeHtml(m.jornada || '1')}</span>
          </div>
        </div>
      `;
      })
      .join('');
  }

  // =========================================================
  // GALERÍA OFICIAL DE RECUERDOS DEL TORNEO
  // =========================================================
  let RECUERDOS_ITEMS = [];
  let recuerdosCargados = false;

  function parseNotasRecuerdosText(rawText) {
    if (!rawText || !rawText.trim()) return [];
    const lines = rawText.split(/\r?\n/);
    const items = [];
    let currentBlock = null;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      // Formato bloque: [foto.jpg]
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        if (currentBlock && currentBlock.src) items.push(currentBlock);
        const fileName = trimmed.slice(1, -1).trim();
        const srcPath = fileName.startsWith('img/') ? fileName : `img/${fileName}`;
        currentBlock = {
          id: items.length + 1,
          src: srcPath,
          title: 'Momento del Torneo',
          category: 'torneo',
          date: '',
          description: ''
        };
        return;
      }

      if (currentBlock) {
        if (/^t[ií]tulo\s*:/i.test(trimmed)) {
          currentBlock.title = trimmed.replace(/^t[ií]tulo\s*:/i, '').trim();
          return;
        }
        if (/^categor[ií]a\s*:/i.test(trimmed)) {
          const cat = normStr(trimmed.replace(/^categor[ií]a\s*:/i, ''));
          currentBlock.category = cat.includes('MASC') ? 'masculino' : cat.includes('FEM') ? 'femenino' : 'torneo';
          return;
        }
        if (/^fecha\s*:/i.test(trimmed)) {
          currentBlock.date = trimmed.replace(/^fecha\s*:/i, '').trim();
          return;
        }
        if (/^descripci[oó]n\s*:/i.test(trimmed)) {
          currentBlock.description = trimmed.replace(/^descripci[oó]n\s*:/i, '').trim();
          return;
        }
      }

      // Formato lineal con separador pleca | o punto y coma ;
      const sep = trimmed.includes('|') ? '|' : trimmed.includes(';') ? ';' : null;
      if (sep) {
        const parts = trimmed.split(sep).map(p => p.trim());
        const fileName = parts[0];
        if (fileName) {
          const srcPath = fileName.startsWith('img/') ? fileName : `img/${fileName}`;
          const title = parts[1] || 'Momento del Torneo';
          const catRaw = normStr(parts[2] || '');
          const cat = catRaw.includes('MASC') ? 'masculino' : catRaw.includes('FEM') ? 'femenino' : 'torneo';
          const date = parts[3] || '';
          const desc = parts[4] || '';

          items.push({
            id: items.length + 1,
            src: srcPath,
            title,
            category: cat,
            date,
            description: desc
          });
        }
        return;
      }

      // Formato simple: foto.jpg - Título
      if (trimmed.includes(' - ')) {
        const parts = trimmed.split(' - ').map(p => p.trim());
        const fileName = parts[0];
        if (fileName) {
          const srcPath = fileName.startsWith('img/') ? fileName : `img/${fileName}`;
          items.push({
            id: items.length + 1,
            src: srcPath,
            title: parts[1] || 'Recuerdo',
            category: 'torneo',
            date: '',
            description: parts[2] || ''
          });
        }
      }
    });

    if (currentBlock && currentBlock.src) items.push(currentBlock);
    return items;
  }

  async function loadRecuerdosFromTxt() {
    const paths = ['NOTAS_RECUERDOS.txt', '/NOTAS_RECUERDOS.txt', 'img/NOTAS_RECUERDOS.txt', '/img/NOTAS_RECUERDOS.txt'];
    for (const p of paths) {
      try {
        const resp = await fetch(p, { cache: 'no-cache' });
        if (resp.ok) {
          const text = await resp.text();
          if (text && text.trim()) {
            const parsed = parseNotasRecuerdosText(text);
            if (parsed.length) {
              RECUERDOS_ITEMS = parsed;
              recuerdosCargados = true;
              return;
            }
          }
        }
      } catch (err) {
        // Continuar buscando
      }
    }
  }

  async function renderRecuerdosGallery(filter = 'all') {
    const container = document.getElementById('recuerdosContainer');
    if (!container) return;

    APP_STATE.currentRecuerdosFilter = filter;

    if (!recuerdosCargados) {
      await loadRecuerdosFromTxt();
    }

    const filtered = RECUERDOS_ITEMS.filter(item => {
      if (filter === 'all') return true;
      return item.category === filter;
    });

    if (!filtered.length) {
      container.innerHTML = `
        <div class="empty-state-card">
          <span class="empty-state-icon">📷</span>
          <h3>Pronto subiremos los recuerdos de los partidos</h3>
          <p>La organización lee automáticamente tu archivo <strong>NOTAS_RECUERDOS.txt</strong> del repositorio. Cada vez que actualices el texto y subas las imágenes a la carpeta <strong>img</strong>, se mostrarán aquí de forma automática.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="recuerdos-grid">
        ${filtered.map(item => `
          <article class="recuerdo-card">
            <div class="recuerdo-img-box">
              <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" class="recuerdo-img" loading="lazy" onerror="this.src='img/TOROS ICONO DEL TORNEO.jpg'">
              <span class="recuerdo-category-tag ${escapeHtml(item.category)}">${escapeHtml(item.category)}</span>
            </div>
            <div class="recuerdo-info">
              ${item.date ? `<span class="recuerdo-date">📅 ${escapeHtml(item.date)}</span>` : ''}
              <h3 class="recuerdo-title">${escapeHtml(item.title)}</h3>
              ${item.description ? `<p class="recuerdo-desc">${escapeHtml(item.description)}</p>` : ''}
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  // =========================================================
  // ENRUTADOR POR HASH
  // =========================================================
  function handleHashRouting() {
    let hash = window.location.hash || '#/inicio';
    if (!hash.startsWith('#/')) hash = '#/inicio';

    const parts = hash.replace('#/', '').split('/');
    const root = parts[0] || 'inicio';
    const sub = parts[1] || 'resumen';

    APP_STATE.currentRoute = root;

    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.route === root);
    });

    closeNav();

    if (root === 'inicio') {
      document.body.className = '';
      document.getElementById('view-inicio').classList.add('active');
      renderHomeView();
    } else if (root === 'masculino' || root === 'femenino') {
      document.getElementById('view-rama').classList.add('active');
      renderBranchView(root, sub);
    } else if (root === 'calendario') {
      document.body.className = '';
      document.getElementById('view-calendario').classList.add('active');
      renderGeneralCalendarView();
    } else if (root === 'recuerdos') {
      document.body.className = '';
      document.getElementById('view-recuerdos').classList.add('active');
      renderRecuerdosGallery(APP_STATE.currentRecuerdosFilter || 'all');
    } else if (root === 'torneo') {
      document.body.className = '';
      document.getElementById('view-torneo').classList.add('active');
    } else {
      window.location.hash = '#/inicio';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderCurrentView() {
    if (APP_STATE.currentRoute === 'inicio') renderHomeView();
    else if (APP_STATE.currentRoute === 'masculino' || APP_STATE.currentRoute === 'femenino') {
      renderBranchView(APP_STATE.currentBranch, APP_STATE.currentSub);
    } else if (APP_STATE.currentRoute === 'calendario') renderGeneralCalendarView();
  }

  // =========================================================
  // CONTROL DE EVENTOS E INTERACCIÓN
  // =========================================================
  function initEventHandlers() {
    const btnMenu = document.getElementById('btnMenu');
    const btnCloseNav = document.getElementById('btnCloseNav');
    const navBackdrop = document.getElementById('navBackdrop');
    const mainNav = document.getElementById('mainNav');

    function openNav() {
      mainNav.hidden = false;
      navBackdrop.hidden = false;
      btnMenu.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
      mainNav.hidden = true;
      navBackdrop.hidden = true;
      btnMenu.setAttribute('aria-expanded', 'false');
    }

    btnMenu.onclick = openNav;
    btnCloseNav.onclick = closeNav;
    navBackdrop.onclick = closeNav;

    document.getElementById('btnRamaMasc').onclick = () => {
      window.location.hash = `#/masculino/${APP_STATE.currentSub}`;
    };
    document.getElementById('btnRamaFem').onclick = () => {
      window.location.hash = `#/femenino/${APP_STATE.currentSub}`;
    };

    document.querySelectorAll('.sub-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const sub = btn.dataset.sub;
        window.location.hash = `#/${APP_STATE.currentBranch}/${sub}`;
      };
    });

    document.addEventListener('click', e => {
      const jumpBtn = e.target.closest('[data-jump-sub]');
      if (jumpBtn) {
        const sub = jumpBtn.dataset.jumpSub;
        window.location.hash = `#/${APP_STATE.currentBranch}/${sub}`;
      }

      const fpLink = e.target.closest('.fairplay-card-link');
      if (fpLink) {
        e.preventDefault();
        const branch = fpLink.dataset.branch;
        window.location.hash = `#/${branch}/estadisticas`;
        setTimeout(() => {
          const tabBtn = document.querySelector('[data-stat-tab="fairplay"]');
          if (tabBtn) tabBtn.click();
        }, 50);
      }
    });

    document.querySelectorAll('.stats-tab-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.stats-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.statTab;
        document.querySelectorAll('.stats-panel-box').forEach(p => (p.hidden = true));
        const activePanel = document.getElementById(`statPanel${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
        if (activePanel) activePanel.hidden = false;
      };
    });

    const btnCal = document.getElementById('btnGenViewCal');
    const btnRes = document.getElementById('btnGenViewRes');
    btnCal.onclick = () => {
      btnCal.classList.add('active');
      btnRes.classList.remove('active');
      APP_STATE.genView = 'cal';
      renderGeneralCalendarView();
    };
    btnRes.onclick = () => {
      btnRes.classList.add('active');
      btnCal.classList.remove('active');
      APP_STATE.genView = 'res';
      renderGeneralCalendarView();
    };

    const fAll = document.getElementById('btnGenFilterAll');
    const fMasc = document.getElementById('btnGenFilterMasc');
    const fFem = document.getElementById('btnGenFilterFem');
    [fAll, fMasc, fFem].forEach(b => {
      b.onclick = () => {
        [fAll, fMasc, fFem].forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        APP_STATE.genFilter = b === fMasc ? 'masculino' : b === fFem ? 'femenino' : 'all';
        renderGeneralCalendarView();
      };
    });


    // Filtros de la Galería de Recuerdos
    document.querySelectorAll('[data-recuerdos-filter]').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('[data-recuerdos-filter]').forEach(btn => btn.classList.remove('active'));
        b.classList.add('active');
        renderRecuerdosGallery(b.dataset.recuerdosFilter);
      };
    });

    const modalPartido = document.getElementById('modalPartido');
    const btnCloseModalPartido = document.getElementById('btnCloseModalPartido');
    if (btnCloseModalPartido) {
      btnCloseModalPartido.onclick = () => (modalPartido.hidden = true);
    }
    if (modalPartido) {
      modalPartido.onclick = e => {
        if (e.target === modalPartido) modalPartido.hidden = true;
      };
    }

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeNav();
        if (modalPartido) modalPartido.hidden = true;
        if (modalAfiche) modalAfiche.hidden = true;
      }
    });

    window.addEventListener('hashchange', handleHashRouting);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) syncAllData();
    });
  }

  function closeNav() {
    const mainNav = document.getElementById('mainNav');
    const navBackdrop = document.getElementById('navBackdrop');
    const btnMenu = document.getElementById('btnMenu');
    if (mainNav) mainNav.hidden = true;
    if (navBackdrop) navBackdrop.hidden = true;
    if (btnMenu) btnMenu.setAttribute('aria-expanded', 'false');
  }

  function initApp() {
    initEventHandlers();
    handleHashRouting();
    syncAllData();
    setInterval(syncAllData, INTERVALO_REFRESCO);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
