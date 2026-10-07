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

  const INITIAL_JUGADORES_MASC = [
    { jugador: 'Sanchez', equipo: 'ULTIMA MILLA FC', dorsal: '10', posicion: 'Cualquier posición', pj: 1, goles: 4, asistencias: 2, ta: 0, tr: 0, mvp: 17, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Bohorquez', equipo: 'REAL SAN MARTIN FC', dorsal: '7', posicion: 'Mediocampista, Delantero', pj: 2, goles: 4, asistencias: 0, ta: 0, tr: 0, mvp: 14, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Viloria', equipo: 'LOS PROBIÓTICOS FC', dorsal: '7', posicion: 'Capitán', pj: 1, goles: 3, asistencias: 2, ta: 0, tr: 0, mvp: 14, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Urrea', equipo: 'ADMIN UNITED FC', dorsal: '2', posicion: 'Defensa', pj: 1, goles: 3, asistencias: 0, ta: 0, tr: 0, mvp: 10, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Navarro A.', equipo: 'LOS PROBIÓTICOS FC', dorsal: '10', posicion: 'Delantero', pj: 1, goles: 3, asistencias: 0, ta: 0, tr: 0, mvp: 10, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Velazquez', equipo: 'ULTIMA MILLA FC', dorsal: '6', posicion: 'Portero', pj: 1, goles: 2, asistencias: 2, ta: 0, tr: 0, mvp: 11, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Rivera', equipo: 'ULTIMA MILLA FC', dorsal: '7', posicion: 'Capitán', pj: 1, goles: 2, asistencias: 1, ta: 0, tr: 0, mvp: 9, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Albino', equipo: 'BAYERN MUU FC', dorsal: '11', posicion: 'Capitán', pj: 1, goles: 2, asistencias: 1, ta: 0, tr: 0, mvp: 9, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Pérez', equipo: 'ULTIMA MILLA FC', dorsal: '16', posicion: 'Cualquier posición', pj: 1, goles: 2, asistencias: 0, ta: 0, tr: 0, mvp: 7, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Atehortua', equipo: 'ADMIN UNITED FC', dorsal: '74', posicion: 'Delantero', pj: 1, goles: 1, asistencias: 4, ta: 0, tr: 0, mvp: 12, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Soto H.', equipo: 'REAL SAN MARTIN FC', dorsal: '80', posicion: 'Mediocampista', pj: 2, goles: 1, asistencias: 1, ta: 0, tr: 0, mvp: 7, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Delprado', equipo: 'BAYERN MUU FC', dorsal: '7', posicion: 'Delantero', pj: 1, goles: 1, asistencias: 1, ta: 0, tr: 0, mvp: 6, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Urrego', equipo: 'BAYERN MUU FC', dorsal: '9', posicion: 'Mediocampista', pj: 1, goles: 1, asistencias: 1, ta: 0, tr: 0, mvp: 6, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Echeverry', equipo: 'REAL SAN MARTIN FC', dorsal: '17', posicion: 'Defensa, Mediocampista', pj: 2, goles: 1, asistencias: 0, ta: 0, tr: 0, mvp: 5, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Orozco A.', equipo: 'ADMIN UNITED FC', dorsal: '6', posicion: 'Medio Campista', pj: 1, goles: 1, asistencias: 0, ta: 0, tr: 0, mvp: 4, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Rios', equipo: 'ADMIN UNITED FC', dorsal: '99', posicion: 'Defensa, Portero', pj: 1, goles: 1, asistencias: 0, ta: 0, tr: 0, mvp: 4, fairPlay: 0, branch: 'masculino' },
    { jugador: 'Acosta', equipo: 'REAL SAN MARTIN FC', dorsal: '10', posicion: 'Capitán', pj: 2, goles: 0, asistencias: 1, ta: 0, tr: 0, mvp: 4, fairPlay: 0, branch: 'masculino' }
  ];

  // Diccionario pedagógico compacto de abreviaturas e íconos deportivos
  const ABBR_DICTIONARY = {
    POS: { code: 'Pos', title: 'Posición actual en la tabla' },
    PJ: { code: 'PJ', title: 'Partidos Jugados' },
    PG: { code: 'PG', title: 'Partidos Ganados (3 pts)' },
    PE: { code: 'PE', title: 'Partidos Empatados (1 pt)' },
    PP: { code: 'PP', title: 'Partidos Perdidos (0 pts)' },
    GF: { code: 'GF', title: 'Goles a Favor (anotados)' },
    GC: { code: 'GC', title: 'Goles en Contra (recibidos)' },
    DG: { code: 'DG', title: 'Diferencia de Gol (GF menos GC)' },
    PTS: { code: 'PTS', title: 'Puntos Totales acumulados' },
    PROM: { code: 'Prom.', title: 'Promedio por partido jugado' },
    GC_PJ: { code: 'GC/PJ', title: 'Promedio de goles recibidos por partido' },
    MVP: { code: 'MVP', title: 'Jugador Más Valioso del partido' },
    TA: { code: 'TA', title: 'Tarjeta Amarilla (multa $5.000)' },
    TR: { code: 'TR', title: 'Tarjeta Roja (multa $10.000)' },
    COP: { code: 'COP', title: 'Valor en Pesos Colombianos' },
    REND: { code: 'Rend.', title: 'Porcentaje de puntos obtenidos' },
    GOLES_EMOJI: { code: '⚽', title: 'Goles anotados' },
    ASIST_EMOJI: { code: '🅰️', title: 'Asistencias (pases de gol)' },
    TA_EMOJI: { code: '🟨', title: 'Tarjetas amarillas' },
    TR_EMOJI: { code: '🟥', title: 'Tarjetas rojas' }
  };

  function abbrHtml(key, customLabel = null) {
    const item = ABBR_DICTIONARY[key];
    if (!item) return escapeHtml(customLabel || key);
    const label = customLabel !== null ? customLabel : item.code;
    return `<span class="abbr-tip" data-abbr="${escapeHtml(key)}" role="button" tabindex="0" aria-label="${escapeHtml(item.title)}">${escapeHtml(label)}</span>`;
  }

  // Estado global en memoria
  const APP_STATE = {
    currentRoute: 'inicio',
    currentBranch: 'masculino',
    currentSub: 'resumen',
    currentStatTab: 'goleadores',
    genFilter: 'all',
    genView: 'cal',
    teamFilter: 'all',
    expandedTeams: new Set(),
    lastSyncTime: null,
    data: {
      masculino: {
        calendario: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.masculino.calendario || [])),
        resultados: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.masculino.resultados || [])),
        posiciones: JSON.parse(JSON.stringify(INITIAL_SEED_DATA.masculino.posiciones || [])),
        jugadores: JSON.parse(JSON.stringify(INITIAL_JUGADORES_MASC)),
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
        if (n.startsWith('POSICI') && rosterPosCol === -1) rosterPosCol = idx;
      });
    }
    // En Google Sheets gviz con headers=0, la columna numérica "Dorsal" (justo a la derecha de "Jugador")
    // puede venir con encabezado vacío en la fila 0. Si no se detectó por texto, usar rosterJugadorCol + 1.
    if (rosterDorsalCol === -1 && rosterJugadorCol !== -1) {
      rosterDorsalCol = rosterJugadorCol + 1;
    }

    const basePlantilla = SHEETS_CONFIG[branchKey]?.plantillaBase || [];

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
          let numDor = rosterDorsalCol !== -1 ? cleanStr(r[rosterDorsalCol]) : '';
          if (!numDor && r[rosterJugadorCol + 4] !== undefined) {
            numDor = cleanStr(r[rosterJugadorCol + 4]);
          }
          if (!numDor) {
            const baseMatch = basePlantilla.find(
              bp => normStr(bp.name) === normStr(jug) && normStr(bp.team) === normStr(eq)
            );
            if (baseMatch && baseMatch.number) numDor = baseMatch.number;
          }
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
      const fairPlay = (ta * 5000) + (tr * 10000);

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

    // Últimos recuerdos en Inicio
    renderHomeRecuerdosPreview();
  }

  function computeBranchFairPlaySummary(branchKey) {
    const cfg = SHEETS_CONFIG[branchKey];
    const branchData = APP_STATE.data[branchKey];
    const jugadosCount = (branchData.resultados || []).filter(r => r.estado === 'Jugado').length;
    const equipos = cfg.equipos || [];
    const posMap = {};
    (branchData.posiciones || []).forEach(p => {
      posMap[normStr(p.equipo)] = p;
    });

    const teamsMap = {};
    equipos.forEach(eq => {
      const p = posMap[normStr(eq)];
      teamsMap[normStr(eq)] = {
        equipo: eq,
        pj: p ? p.pj : 0,
        amarillas: 0,
        rojas: 0,
        multa: 0
      };
    });

    (branchData.jugadores || []).forEach(j => {
      const key = normStr(j.equipo);
      if (!teamsMap[key]) {
        teamsMap[key] = { equipo: j.equipo, pj: j.pj || 0, amarillas: 0, rojas: 0, multa: 0 };
      }
      teamsMap[key].amarillas += j.ta || 0;
      teamsMap[key].rojas += j.tr || 0;
      teamsMap[key].multa += ((j.ta || 0) * 5000) + ((j.tr || 0) * 10000);
    });

    const list = Object.values(teamsMap).sort((a, b) => a.multa - b.multa || a.rojas - b.rojas || a.amarillas - b.amarillas);
    const totalTarjetas = list.reduce((acc, t) => acc + t.amarillas + t.rojas, 0);
    const minMulta = list.length ? list[0].multa : 0;
    const leaders = list.filter(t => t.multa === minMulta);

    return {
      jugadosCount,
      totalTarjetas,
      allZeroCards: totalTarjetas === 0,
      allTied: leaders.length === list.length,
      leaders,
      list
    };
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

    const renderBranchFairCardBody = (branchKey, container) => {
      const fp = computeBranchFairPlaySummary(branchKey);
      if (fp.jugadosCount === 0) {
        container.innerHTML = `<span class="empty-state-msg">Se mostrará cuando haya partidos</span>`;
        return;
      }

      if (fp.allZeroCards || fp.allTied) {
        const shieldsHtml = fp.list.map(t => getTeamShieldHtml(t.equipo)).join('');
        container.innerHTML = `
          <div class="fairplay-all-good">
            <div class="fairplay-shields-strip">
              ${shieldsHtml}
            </div>
            <div class="fairplay-motto-box">
              <span>🤝</span>
              <div>
                <strong>¡Todos los equipos van muy bien!</strong><br>
                Sin tarjetas registradas hasta el momento: juego limpio y respeto ejemplar en toda la categoría.
              </div>
            </div>
          </div>
        `;
        return;
      }

      if (fp.leaders.length > 1) {
        const shieldsHtml = fp.leaders.map(t => getTeamShieldHtml(t.equipo)).join('');
        const names = fp.leaders.map(t => escapeHtml(t.equipo)).join(', ');
        container.innerHTML = `
          <div class="fairplay-all-good">
            <div class="fairplay-shields-strip">${shieldsHtml}</div>
            <div class="fairplay-motto-box">
              <span>🌟</span>
              <div>
                <strong>Liderato compartido en Juego Limpio:</strong> ${names} (${fp.leaders[0].amarillas} 🟨 · ${fp.leaders[0].rojas} 🟥).
              </div>
            </div>
          </div>
        `;
        return;
      }

      const best = fp.leaders[0];
      container.innerHTML = `
        <div class="fairplay-team-row">
          <div class="leader-team-info">
            ${getTeamShieldHtml(best.equipo)}
            <strong class="leader-team-name">${escapeHtml(best.equipo)}</strong>
          </div>
          <span class="cards-penalty">${best.amarillas} 🟨 · ${best.rojas} 🟥</span>
        </div>
      `;
    };

    renderBranchFairCardBody('masculino', mascBody);
    renderBranchFairCardBody('femenino', femBody);
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

  function getTeamKeeperName(branchKey, teamName) {
    const plantilla = APP_STATE.data[branchKey]?.plantilla?.length
      ? APP_STATE.data[branchKey].plantilla
      : SHEETS_CONFIG[branchKey].plantillaBase;
    const keepers = plantilla.filter(
      p => normStr(p.team) === normStr(teamName) && normStr(p.role).includes('PORTER')
    );
    if (keepers.length) return keepers.map(k => k.name).join(' / ');
    return '';
  }

  function renderTopThreeMini(branchKey, data) {
    const jug = data.jugadores || [];

    const scorersEl = document.getElementById('branchTopScorersMini');
    const topScorers = [...jug].filter(j => j.goles > 0).sort((a, b) => b.goles - a.goles || a.pj - b.pj).slice(0, 3);
    if (topScorers.length) {
      scorersEl.innerHTML = topScorers
        .map(
          (s, idx) => `
        <div class="top-three-row">
          <span class="top-rank-pos">${idx + 1}</span>
          <div class="top-player-cell">
            ${getTeamShieldHtml(s.equipo)}
            <div class="top-player-text">
              <strong>${escapeHtml(s.jugador)}</strong>
              <small>${escapeHtml(s.equipo)}</small>
            </div>
          </div>
          <strong class="top-stat-val">${s.goles}</strong>
        </div>
      `
        )
        .join('');
    } else {
      scorersEl.innerHTML = '<p class="empty-state-msg">Aún no hay goles registrados.</p>';
    }

    const assistsEl = document.getElementById('branchTopAssistsMini');
    const topAssists = [...jug].filter(j => j.asistencias > 0).sort((a, b) => b.asistencias - a.asistencias || a.pj - b.pj).slice(0, 3);
    if (topAssists.length) {
      assistsEl.innerHTML = topAssists
        .map(
          (a, idx) => `
        <div class="top-three-row">
          <span class="top-rank-pos">${idx + 1}</span>
          <div class="top-player-cell">
            ${getTeamShieldHtml(a.equipo)}
            <div class="top-player-text">
              <strong>${escapeHtml(a.jugador)}</strong>
              <small>${escapeHtml(a.equipo)}</small>
            </div>
          </div>
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
          (p, idx) => {
            const keeperName = getTeamKeeperName(branchKey, p.equipo);
            return `
        <div class="top-three-row">
          <span class="top-rank-pos">${idx + 1}</span>
          <div class="top-player-cell">
            ${getTeamShieldHtml(p.equipo)}
            <div class="top-player-text">
              <strong>${escapeHtml(keeperName ? keeperName : p.equipo)}</strong>
              <small>${escapeHtml(keeperName ? `${p.equipo} · ${p.gc} GC` : `${p.gc} goles recibidos`)}</small>
            </div>
          </div>
          <strong class="top-stat-val">${(p.gc / p.pj).toFixed(1)}</strong>
        </div>
      `;
          }
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
      <div class="abbr-help-hint">
        <span>💡</span>
        <span>¿No conoces alguna abreviación (${abbrHtml('PJ')}, ${abbrHtml('PG')}, ${abbrHtml('DG')}, ${abbrHtml('PTS')}…)? <strong>Presiónala</strong> para ver qué significa.</span>
      </div>
      <table class="official-table">
        <thead>
          <tr>
            <th>${abbrHtml('POS', 'Pos')}</th>
            <th>Equipo</th>
            <th class="num-cell">${abbrHtml('PJ')}</th>
            ${!isMini ? `
              <th class="num-cell">${abbrHtml('PG')}</th>
              <th class="num-cell">${abbrHtml('PE')}</th>
              <th class="num-cell">${abbrHtml('PP')}</th>
              <th class="num-cell">${abbrHtml('GF')}</th>
              <th class="num-cell">${abbrHtml('GC')}</th>
            ` : ''}
            <th class="num-cell">${abbrHtml('DG')}</th>
            <th class="pts-cell">${abbrHtml('PTS')}</th>
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
    const selectFilter = document.getElementById('selectTeamFilter');
    if (!teamsGrid || !selectFilter) return;

    const equipos = SHEETS_CONFIG[branchKey].equipos;
    const plantilla = data.plantilla.length ? data.plantilla : SHEETS_CONFIG[branchKey].plantillaBase;
    const statsJug = data.jugadores || [];

    selectFilter.innerHTML = '<option value="all">Todos los equipos (toca un equipo para ver su plantilla)</option>' +
      equipos.map(eq => `<option value="${escapeHtml(eq)}">${escapeHtml(eq)}</option>`).join('');

    if (APP_STATE.teamFilter && equipos.some(e => normStr(e) === normStr(APP_STATE.teamFilter))) {
      selectFilter.value = APP_STATE.teamFilter;
    } else {
      APP_STATE.teamFilter = 'all';
      selectFilter.value = 'all';
    }

    function renderCards() {
      const filterVal = APP_STATE.teamFilter || 'all';
      const visibleTeams = filterVal === 'all'
        ? equipos
        : equipos.filter(eq => normStr(eq) === normStr(filterVal));

      teamsGrid.innerHTML = visibleTeams
        .map(eq => {
          const stand = (data.posiciones || []).find(p => normStr(p.equipo) === normStr(eq));
          const teamPlayers = plantilla.filter(p => normStr(p.team) === normStr(eq));
          const cap = teamPlayers.find(p => normStr(p.role).includes('CAPIT'))?.name || 'Por definir';
          const isExpanded = filterVal !== 'all' || APP_STATE.expandedTeams.has(normStr(eq));
          const capLabel = branchKey === 'femenino' ? 'Capitana' : 'Capitán';

          const baseList = SHEETS_CONFIG[branchKey].plantillaBase || [];
          const rosterPlayersHtml = teamPlayers.length
            ? teamPlayers
                .map(p => {
                  const stat = statsJug.find(
                    j => normStr(j.jugador) === normStr(p.name) && normStr(j.equipo) === normStr(p.team)
                  );
                  const basePlayer = baseList.find(
                    bp => normStr(bp.name) === normStr(p.name) && normStr(bp.team) === normStr(p.team)
                  );
                  const dorsalNum = cleanStr(p.number) || cleanStr(stat?.dorsal) || cleanStr(basePlayer?.number) || '—';
                  const goles = stat ? stat.goles : 0;
                  const asist = stat ? stat.asistencias : 0;
                  const ta = stat ? stat.ta : 0;
                  const tr = stat ? stat.tr : 0;
                  return `
                  <div class="roster-player-card">
                    <div class="roster-dorsal">${escapeHtml(dorsalNum)}</div>
                    <div class="roster-player-info">
                      <strong>${escapeHtml(p.name)}</strong>
                      <small>${escapeHtml(p.role || basePlayer?.role || 'Jugador')} · Dorsal #${escapeHtml(dorsalNum)}</small>
                    </div>
                    <div class="roster-mini-stats">
                      <span class="roster-stat-chip abbr-tip" data-abbr="GOLES_EMOJI" role="button" tabindex="0">⚽ ${goles}</span>
                      <span class="roster-stat-chip abbr-tip" data-abbr="ASIST_EMOJI" role="button" tabindex="0">🅰️ ${asist}</span>
                      ${ta > 0 ? `<span class="roster-stat-chip abbr-tip" data-abbr="TA_EMOJI" role="button" tabindex="0">${ta} 🟨</span>` : ''}
                      ${tr > 0 ? `<span class="roster-stat-chip abbr-tip" data-abbr="TR_EMOJI" role="button" tabindex="0">${tr} 🟥</span>` : ''}
                    </div>
                  </div>
                `;
                })
                .join('')
            : '<p class="empty-state-msg">No hay integrantes registrados para este equipo.</p>';

          return `
          <div class="team-card-item ${isExpanded ? 'expanded' : ''}" data-team-card="${escapeHtml(eq)}">
            <div class="team-card-header-row">
              <div class="team-card-top">
                ${getTeamShieldHtml(eq)}
                <div>
                  <h3 class="team-card-title">${escapeHtml(eq)}</h3>
                  <p class="team-card-captain">${capLabel}: <strong>${escapeHtml(cap)}</strong> · ${teamPlayers.length} integrantes</p>
                </div>
              </div>
              <span class="team-toggle-pill">
                ${isExpanded ? '▲ Ocultar plantilla' : `👥 Ver plantilla (${teamPlayers.length}) ▼`}
              </span>
            </div>

            <div class="team-card-stats">
              <div>${abbrHtml('PJ')}: <strong>${stand ? stand.pj : 0}</strong></div>
              <div>${abbrHtml('PTS')}: <strong>${stand ? stand.pts : 0}</strong></div>
              <div>${abbrHtml('DG')}: <strong>${stand ? (stand.dg > 0 ? `+${stand.dg}` : stand.dg) : 0}</strong></div>
              <div>${abbrHtml('GF')}: <strong>${stand ? stand.gf : 0}</strong></div>
              <div>${abbrHtml('GC')}: <strong>${stand ? stand.gc : 0}</strong></div>
            </div>

            ${isExpanded ? `
              <div class="team-inline-roster" onclick="event.stopPropagation()">
                <div class="team-inline-roster-head">
                  <h4>📋 PLANTILLA DE JUGADORES · ${escapeHtml(eq)}</h4>
                  <span>${teamPlayers.length} jugadores inscritos · Dorsal, posición y estadísticas</span>
                </div>
                <div class="team-inline-roster-grid">
                  ${rosterPlayersHtml}
                </div>
              </div>
            ` : ''}
          </div>
        `;
        })
        .join('');

      teamsGrid.querySelectorAll('[data-team-card]').forEach(cardEl => {
        cardEl.onclick = e => {
          if (e.target.closest('.abbr-tip') || e.target.closest('.team-inline-roster')) return;
          const eqName = cardEl.getAttribute('data-team-card');
          const key = normStr(eqName);
          if (APP_STATE.teamFilter !== 'all') {
            APP_STATE.teamFilter = 'all';
            selectFilter.value = 'all';
            APP_STATE.expandedTeams.clear();
            return renderCards();
          }
          if (APP_STATE.expandedTeams.has(key)) {
            APP_STATE.expandedTeams.delete(key);
          } else {
            APP_STATE.expandedTeams.add(key);
          }
          renderCards();
        };
      });
    }

    selectFilter.onchange = e => {
      const val = e.target.value;
      APP_STATE.teamFilter = val;
      if (val !== 'all') {
        APP_STATE.expandedTeams.add(normStr(val));
      }
      renderCards();
    };

    renderCards();
  }

  function renderEmptyStatsWithShields(branchKey, icon, title, message) {
    const equipos = SHEETS_CONFIG[branchKey].equipos || [];
    return `
      <div class="empty-state-card">
        <span class="empty-state-icon">${icon}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(message)}</p>
        <div class="empty-shields-showcase">
          ${equipos.map(eq => `
            <span class="empty-shield-chip">
              ${getTeamShieldHtml(eq)}
              <span>${escapeHtml(eq)}</span>
            </span>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderBranchStats(branchKey, data) {
    const jug = data.jugadores || [];
    const pos = data.posiciones || [];
    const equipos = SHEETS_CONFIG[branchKey].equipos || [];

    // 1. GOLEADORES
    const goleadoresEl = document.getElementById('statPanelGoleadores');
    const scorers = [...jug].filter(j => j.goles > 0).sort((a, b) => b.goles - a.goles || a.pj - b.pj);
    if (scorers.length) {
      const top3 = scorers.slice(0, 3);
      goleadoresEl.innerHTML = `
        <div class="stats-podium-grid">
          ${top3.map((s, idx) => `
            <div class="stats-podium-card ${idx === 0 ? 'rank-1' : ''}">
              <div class="stats-podium-left">
                ${getTeamShieldHtml(s.equipo)}
                <div class="stats-podium-info">
                  <span class="stats-podium-rank">${idx === 0 ? '🥇 #1 LÍDER' : idx === 1 ? '🥈 #2' : '🥉 #3'}</span>
                  <strong class="stats-podium-name">${escapeHtml(s.jugador)}</strong>
                  <span class="stats-podium-team">${escapeHtml(s.equipo)} · #${escapeHtml(s.dorsal || '—')}</span>
                </div>
              </div>
              <div class="stats-podium-val">
                ${s.goles}
                <small>GOLES</small>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="abbr-help-hint">
          <span>💡</span>
          <span>Presiona cualquier abreviación (${abbrHtml('PJ')}, ${abbrHtml('PROM')}) para ver qué significa.</span>
        </div>
        <div class="table-responsive-box">
          <table class="official-table">
            <thead>
              <tr>
                <th>${abbrHtml('POS', '#')}</th>
                <th>Jugador</th>
                <th>Equipo</th>
                <th class="num-cell">${abbrHtml('PJ')}</th>
                <th class="pts-cell">Goles ⚽</th>
                <th class="num-cell">${abbrHtml('PROM')}</th>
              </tr>
            </thead>
            <tbody>
              ${scorers
                .map(
                  (s, i) => `
                <tr>
                  <td><strong>${i + 1}</strong></td>
                  <td>
                    <div class="table-player-cell">
                      ${getTeamShieldHtml(s.equipo)}
                      <div>
                        <strong>${escapeHtml(s.jugador)}</strong>
                        ${s.dorsal ? `<span class="player-dorsal-pill">#${escapeHtml(s.dorsal)}</span>` : ''}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="table-team-cell">
                      ${getTeamShieldHtml(s.equipo)}
                      <span>${escapeHtml(s.equipo)}</span>
                    </div>
                  </td>
                  <td class="num-cell">${s.pj}</td>
                  <td class="pts-cell">${s.goles}</td>
                  <td class="num-cell">${s.pj > 0 ? (s.goles / s.pj).toFixed(1) : '—'}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      goleadoresEl.innerHTML = renderEmptyStatsWithShields(
        branchKey,
        '⚽',
        'Tabla de Goleadores Oficial',
        'Aún no se han registrado goles en esta categoría. La tabla con los escudos y artilleros se activará en cuanto se jueguen los primeros encuentros.'
      );
    }

    // 2. ASISTENCIAS
    const asistEl = document.getElementById('statPanelAsistencias');
    const assists = [...jug].filter(j => j.asistencias > 0).sort((a, b) => b.asistencias - a.asistencias || a.pj - b.pj);
    if (assists.length) {
      const top3 = assists.slice(0, 3);
      asistEl.innerHTML = `
        <div class="stats-podium-grid">
          ${top3.map((a, idx) => `
            <div class="stats-podium-card ${idx === 0 ? 'rank-1' : ''}">
              <div class="stats-podium-left">
                ${getTeamShieldHtml(a.equipo)}
                <div class="stats-podium-info">
                  <span class="stats-podium-rank">${idx === 0 ? '🥇 #1 LÍDER' : idx === 1 ? '🥈 #2' : '🥉 #3'}</span>
                  <strong class="stats-podium-name">${escapeHtml(a.jugador)}</strong>
                  <span class="stats-podium-team">${escapeHtml(a.equipo)} · #${escapeHtml(a.dorsal || '—')}</span>
                </div>
              </div>
              <div class="stats-podium-val">
                ${a.asistencias}
                <small>ASIST.</small>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="table-responsive-box">
          <table class="official-table">
            <thead>
              <tr>
                <th>${abbrHtml('POS', '#')}</th>
                <th>Jugador</th>
                <th>Equipo</th>
                <th class="num-cell">${abbrHtml('PJ')}</th>
                <th class="pts-cell">Asistencias 🅰️</th>
                <th class="num-cell">${abbrHtml('PROM')}</th>
              </tr>
            </thead>
            <tbody>
              ${assists
                .map(
                  (a, i) => `
                <tr>
                  <td><strong>${i + 1}</strong></td>
                  <td>
                    <div class="table-player-cell">
                      ${getTeamShieldHtml(a.equipo)}
                      <div>
                        <strong>${escapeHtml(a.jugador)}</strong>
                        ${a.dorsal ? `<span class="player-dorsal-pill">#${escapeHtml(a.dorsal)}</span>` : ''}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="table-team-cell">
                      ${getTeamShieldHtml(a.equipo)}
                      <span>${escapeHtml(a.equipo)}</span>
                    </div>
                  </td>
                  <td class="num-cell">${a.pj}</td>
                  <td class="pts-cell">${a.asistencias}</td>
                  <td class="num-cell">${a.pj > 0 ? (a.asistencias / a.pj).toFixed(1) : '—'}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      asistEl.innerHTML = renderEmptyStatsWithShields(
        branchKey,
        '🅰️',
        'Ranking de Asistencias',
        'Aún no hay asistencias registradas en esta categoría. Se actualizará automáticamente tras disputarse los partidos.'
      );
    }

    // 3. VALLA MENOS VENCIDA
    const vallaEl = document.getElementById('statPanelValla');
    const keepersTeams = [...pos].filter(p => p.pj > 0).sort((a, b) => a.gc / a.pj - b.gc / b.pj || a.gc - b.gc);
    if (keepersTeams.length) {
      vallaEl.innerHTML = `
        <div class="abbr-help-hint">
          <span>🧤</span>
          <span>La <strong>Valla Menos Vencida</strong> premia al equipo y portero con menor promedio de goles recibidos (${abbrHtml('GC_PJ')}).</span>
        </div>
        <div class="table-responsive-box">
          ${keepersTeams
            .map((k, i) => {
              const keeperName = getTeamKeeperName(branchKey, k.equipo);
              return `
            <div class="keeper-stat-row">
              <div class="keeper-info-left">
                <span class="top-rank-pos">${i + 1}</span>
                ${getTeamShieldHtml(k.equipo)}
                <div>
                  <strong>${escapeHtml(k.equipo)}</strong>
                  <small class="keeper-meta-sub">
                    ${keeperName ? `🧤 Portero: <strong>${escapeHtml(keeperName)}</strong> · ` : ''}
                    ${k.gc} ${abbrHtml('GC')} en ${k.pj} ${abbrHtml('PJ')}
                  </small>
                </div>
              </div>
              <div class="keeper-stat-right">
                <strong class="keeper-prom-value">${(k.gc / k.pj).toFixed(1)}</strong>
                <span class="keeper-prom-label">${abbrHtml('GC_PJ')}</span>
              </div>
            </div>
          `;
            })
            .join('')}
        </div>
      `;
    } else {
      vallaEl.innerHTML = renderEmptyStatsWithShields(
        branchKey,
        '🧤',
        'Valla Menos Vencida',
        'Se mostrará el ranking de las porterías más seguras con sus escudos en cuanto se disputen los partidos.'
      );
    }

    // 4. MVP
    const mvpEl = document.getElementById('statPanelMvp');
    const mvpList = [...jug].filter(j => j.mvp > 0).sort((a, b) => b.mvp - a.mvp || b.goles - a.goles);
    if (mvpList.length) {
      const top3 = mvpList.slice(0, 3);
      mvpEl.innerHTML = `
        <div class="stats-podium-grid">
          ${top3.map((m, idx) => `
            <div class="stats-podium-card ${idx === 0 ? 'rank-1' : ''}">
              <div class="stats-podium-left">
                ${getTeamShieldHtml(m.equipo)}
                <div class="stats-podium-info">
                  <span class="stats-podium-rank">${idx === 0 ? '⭐ #1 MVP LÍDER' : idx === 1 ? '🥈 #2 MVP' : '🥉 #3 MVP'}</span>
                  <strong class="stats-podium-name">${escapeHtml(m.jugador)}</strong>
                  <span class="stats-podium-team">${escapeHtml(m.equipo)} · #${escapeHtml(m.dorsal || '—')}</span>
                </div>
              </div>
              <div class="stats-podium-val">
                ${m.mvp}
                <small>PTS MVP</small>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="table-responsive-box">
          <table class="official-table">
            <thead>
              <tr>
                <th>${abbrHtml('POS', '#')}</th>
                <th>Jugador</th>
                <th>Equipo</th>
                <th class="num-cell">${abbrHtml('PJ')}</th>
                <th class="num-cell">Goles</th>
                <th class="num-cell">Asist.</th>
                <th class="pts-cell">Puntaje ${abbrHtml('MVP')}</th>
              </tr>
            </thead>
            <tbody>
              ${mvpList
                .map(
                  (m, i) => `
                <tr>
                  <td><strong>${i + 1}</strong></td>
                  <td>
                    <div class="table-player-cell">
                      ${getTeamShieldHtml(m.equipo)}
                      <div>
                        <strong>${escapeHtml(m.jugador)}</strong>
                        ${m.dorsal ? `<span class="player-dorsal-pill">#${escapeHtml(m.dorsal)}</span>` : ''}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="table-team-cell">
                      ${getTeamShieldHtml(m.equipo)}
                      <span>${escapeHtml(m.equipo)}</span>
                    </div>
                  </td>
                  <td class="num-cell">${m.pj}</td>
                  <td class="num-cell">${m.goles}</td>
                  <td class="num-cell">${m.asistencias}</td>
                  <td class="pts-cell">${m.mvp}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      mvpEl.innerHTML = renderEmptyStatsWithShields(
        branchKey,
        '⭐',
        'Ranking Jugador Más Valioso (MVP)',
        'Los puntajes MVP individuales se mostrarán tras disputarse cada jornada oficial.'
      );
    }

    // 5. DISCIPLINA
    const discEl = document.getElementById('statPanelDisciplina');
    const discList = [...jug].filter(j => j.ta > 0 || j.tr > 0).sort((a, b) => b.tr * 10000 + b.ta * 5000 - (a.tr * 10000 + a.ta * 5000));
    if (discList.length) {
      discEl.innerHTML = `
        <div class="table-responsive-box">
          <table class="official-table">
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Equipo</th>
                <th class="num-cell">${abbrHtml('TA')} ($5k)</th>
                <th class="num-cell">${abbrHtml('TR')} ($10k)</th>
                <th class="pts-cell">Multa ${abbrHtml('COP')}</th>
              </tr>
            </thead>
            <tbody>
              ${discList
                .map(
                  d => `
                <tr>
                  <td>
                    <div class="table-player-cell">
                      ${getTeamShieldHtml(d.equipo)}
                      <strong>${escapeHtml(d.jugador)}</strong>
                    </div>
                  </td>
                  <td>
                    <div class="table-team-cell">
                      ${getTeamShieldHtml(d.equipo)}
                      <span>${escapeHtml(d.equipo)}</span>
                    </div>
                  </td>
                  <td class="num-cell">${d.ta} 🟨</td>
                  <td class="num-cell">${d.tr} 🟥</td>
                  <td class="pts-cell">$${((d.ta * 5000) + (d.tr * 10000)).toLocaleString('es-CO')}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      discEl.innerHTML = `
        <div class="stats-hero-banner fairplay-excelente">
          <div class="stats-hero-top">
            <span class="stats-hero-icon">🛡️</span>
            <h3 class="stats-hero-title">¡DISCIPLINA IMPECABLE! CERO TARJETAS REGISTRADAS</h3>
          </div>
          <p class="stats-hero-desc">
            Hasta el momento ningún jugador ha recibido Tarjetas Amarillas (${abbrHtml('TA')}) ni Tarjetas Rojas (${abbrHtml('TR')}). ¡Felicitaciones a todos los equipos por su conducta ejemplar!
          </p>
        </div>
        <div class="empty-shields-showcase">
          ${equipos.map(eq => `
            <span class="empty-shield-chip">
              ${getTeamShieldHtml(eq)}
              <span>${escapeHtml(eq)} · 0 🟨 0 🟥</span>
            </span>
          `).join('')}
        </div>
      `;
    }

    // 6. FAIR PLAY
    const fairEl = document.getElementById('statPanelFairplay');
    const fpSummary = computeBranchFairPlaySummary(branchKey);
    const bannerTitle = fpSummary.jugadosCount === 0
      ? '¡COMPROMISO TOTAL CON EL JUEGO LIMPIO!'
      : fpSummary.allZeroCards
        ? '¡HASTA EL MOMENTO TODOS LOS EQUIPOS TIENEN UN FAIR PLAY EXCELENTE!'
        : 'CLASIFICACIÓN OFICIAL DE FAIR PLAY';
    const bannerDesc = fpSummary.jugadosCount === 0
      ? 'Cuando se disputen los partidos de la categoría se evaluará aquí el comportamiento deportivo. Todos los equipos inician con un Fair Play impecable.'
      : fpSummary.allZeroCards
        ? 'No se han sacado tarjetas en lo que va del torneo: todos los equipos van igual de bien, compitiendo con respeto y compañerismo. ¡Primero las personas, después el resultado!'
        : 'El índice de Fair Play evalúa las amonestaciones oficiales de cada equipo. Entre menor puntaje de penalización, más deportivo es el equipo.';

    fairEl.innerHTML = `
      <div class="stats-hero-banner fairplay-excelente">
        <div class="stats-hero-top">
          <span class="stats-hero-icon">🤝</span>
          <h3 class="stats-hero-title">${bannerTitle}</h3>
        </div>
        <p class="stats-hero-desc">${bannerDesc}</p>
      </div>
      <div class="table-responsive-box">
        <table class="official-table">
          <thead>
            <tr>
              <th>${abbrHtml('POS', '#')}</th>
              <th>Equipo</th>
              <th class="num-cell">${abbrHtml('PJ')}</th>
              <th class="num-cell">${abbrHtml('TA')} 🟨</th>
              <th class="num-cell">${abbrHtml('TR')} 🟥</th>
              <th class="num-cell">Estado Fair Play</th>
              <th class="pts-cell">Sanción ${abbrHtml('COP')}</th>
            </tr>
          </thead>
          <tbody>
            ${fpSummary.list
              .map((item, idx) => {
                const isClean = item.amarillas === 0 && item.rojas === 0;
                return `
              <tr>
                <td><strong>${ fpSummary.allZeroCards ? '1' : idx + 1 }</strong></td>
                <td>
                  <div class="table-team-cell">
                    ${getTeamShieldHtml(item.equipo)}
                    <strong>${escapeHtml(item.equipo)}</strong>
                  </div>
                </td>
                <td class="num-cell">${item.pj}</td>
                <td class="num-cell">${item.amarillas} 🟨</td>
                <td class="num-cell">${item.rojas} 🟥</td>
                <td class="num-cell">
                  <span class="fairplay-status-pill ${isClean ? '' : 'has-cards'}">
                    ${isClean ? '🌟 Excelente · Sin tarjetas' : '⚠️ Con amonestaciones'}
                  </span>
                </td>
                <td class="pts-cell">$${item.multa.toLocaleString('es-CO')}</td>
              </tr>
            `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    // 7. GENERALES
    const genEl = document.getElementById('statPanelGenerales');
    let totalGoles = 0;
    let totalJugados = 0;
    (data.resultados || []).filter(r => r.estado === 'Jugado').forEach(r => {
      totalJugados++;
      totalGoles += (r.golesLocal || 0) + (r.golesVisita || 0);
    });
    genEl.innerHTML = `
      <div class="summary-cards-grid">
        <div class="stat-box"><span class="stat-box-label">PARTIDOS JUGADOS</span><div class="stat-box-value">${totalJugados}</div><span class="stat-box-sub">de ${SHEETS_CONFIG[branchKey].totalPartidos} programados</span></div>
        <div class="stat-box"><span class="stat-box-label">GOLES TOTALES</span><div class="stat-box-value">${totalGoles}</div><span class="stat-box-sub">anotados en la rama</span></div>
        <div class="stat-box"><span class="stat-box-label">PROMEDIO DE GOL</span><div class="stat-box-value">${totalJugados > 0 ? (totalGoles / totalJugados).toFixed(1) : '0.0'}</div><span class="stat-box-sub">goles por partido</span></div>
        <div class="stat-box"><span class="stat-box-label">EQUIPOS OFICIALES</span><div class="stat-box-value">${equipos.length}</div><span class="stat-box-sub">en competencia</span></div>
      </div>
      <div class="table-responsive-box">
        <table class="official-table">
          <thead>
            <tr>
              <th>Equipo</th>
              <th class="num-cell">${abbrHtml('PJ')}</th>
              <th class="num-cell">${abbrHtml('PG')}</th>
              <th class="num-cell">${abbrHtml('GF')}</th>
              <th class="num-cell">${abbrHtml('GC')}</th>
              <th class="num-cell">${abbrHtml('DG')}</th>
              <th class="pts-cell">${abbrHtml('PTS')}</th>
              <th class="num-cell">${abbrHtml('REND')}</th>
            </tr>
          </thead>
          <tbody>
            ${(pos.length ? pos : equipos.map(eq => ({ equipo: eq, pj: 0, pg: 0, gf: 0, gc: 0, dg: 0, pts: 0 })))
              .map(s => {
                const rend = s.pj > 0 ? Math.round((s.pts / (s.pj * 3)) * 100) + '%' : '0%';
                return `
              <tr>
                <td>
                  <div class="table-team-cell">
                    ${getTeamShieldHtml(s.equipo)}
                    <strong>${escapeHtml(s.equipo)}</strong>
                  </div>
                </td>
                <td class="num-cell">${s.pj}</td>
                <td class="num-cell">${s.pg}</td>
                <td class="num-cell">${s.gf}</td>
                <td class="num-cell">${s.gc}</td>
                <td class="num-cell">${s.dg > 0 ? `+${s.dg}` : s.dg}</td>
                <td class="pts-cell">${s.pts}</td>
                <td class="num-cell"><strong>${rend}</strong></td>
              </tr>
            `;
              })
              .join('')}
          </tbody>
        </table>
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

      const videoSource = cleanStr(cfg.video);
      const isLocal = videoSource.endsWith('.mp4') || videoSource.endsWith('.webm') || videoSource.includes('/');
      const ytWatchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoSource)}`;

      if (isLocal) {
        frame.innerHTML = `
          <div class="video-player-topbar">
            <button type="button" class="btn-video-back" id="btnBackVideoCover">← Volver</button>
          </div>
          <div class="video-iframe-wrap">
            <video controls autoplay playsinline>
              <source src="${escapeHtml(videoSource)}" type="video/mp4">
              Tu navegador no soporta reproducción de video.
            </video>
          </div>
        `;
      } else {
        frame.innerHTML = `
          <div class="video-player-topbar">
            <button type="button" class="btn-video-back" id="btnBackVideoCover">← Volver</button>
            <a href="${ytWatchUrl}" target="_blank" rel="noopener noreferrer" class="btn-video-yt">Abrir en YouTube ↗</a>
          </div>
          <div class="video-iframe-wrap">
            <iframe
              src="https://www.youtube.com/embed/${encodeURIComponent(videoSource)}?autoplay=1&playsinline=1&rel=0"
              title="Video Presentación Oficial ${escapeHtml(cfg.nombre)}"
              referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        `;
      }

      const btnBack = document.getElementById('btnBackVideoCover');
      if (btnBack) {
        btnBack.onclick = () => {
          frame.hidden = true;
          frame.innerHTML = '';
          poster.hidden = false;
        };
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
  const DEFAULT_RECUERDOS_SEED = [
    {
      id: 1,
      src: 'img/recuerdos/DSC02718.jpg',
      title: 'NÓMINA COMPLETA ADMIN UNITED FC',
      category: 'masculino',
      jornada: 'JORNADA 1',
      date: '3 de octubre de 2026',
      partido: 'REAL SAN MARTIN FC vs ADMIN UNITED FC',
      teamHint: 'ADMIN UNITED FC',
      description: 'Plantilla oficial de Admin United FC en su debut victorioso de la Jornada 1.'
    },
    {
      id: 2,
      src: 'img/recuerdos/DSC02728.jpg',
      title: 'NÓMINA COMPLETA REAL SAN MARTIN FC',
      category: 'masculino',
      jornada: 'JORNADA 1',
      date: '3 de octubre de 2026',
      partido: 'REAL SAN MARTIN FC vs ADMIN UNITED FC',
      teamHint: 'REAL SAN MARTIN FC',
      description: 'Escuadra oficial de Real San Martín FC lista para la primera fecha del torneo.'
    },
    {
      id: 3,
      src: 'img/recuerdos/DSC02735.jpg',
      title: 'NÓMINA COMPLETA ULTIMA MILLA FC',
      category: 'masculino',
      jornada: 'JORNADA 1',
      date: '3 de octubre de 2026',
      partido: 'LOS PROBIÓTICOS FC vs ULTIMA MILLA FC',
      teamHint: 'ULTIMA MILLA FC',
      description: 'Nómina oficial de Ultima Milla FC en su gran encuentro de la Jornada 1.'
    },
    {
      id: 4,
      src: 'img/recuerdos/DSC02742.jpg',
      title: 'NÓMINA COMPLETA LOS PROBIÓTICOS FC',
      category: 'masculino',
      jornada: 'JORNADA 1',
      date: '3 de octubre de 2026',
      partido: 'LOS PROBIÓTICOS FC vs ULTIMA MILLA FC',
      teamHint: 'LOS PROBIÓTICOS FC',
      description: 'Plantel completo de Los Probióticos FC previo al encuentro inaugural.'
    },
    {
      id: 5,
      src: 'img/recuerdos/DSC03001.jpg',
      title: 'NÓMINA COMPLETA BAYERN MUU FC',
      category: 'masculino',
      jornada: 'JORNADA 1',
      date: '3 de octubre de 2026',
      partido: 'REAL SAN MARTIN FC vs BAYERN MUU FC',
      teamHint: 'BAYERN MUU FC',
      description: 'Nómina oficial de Bayern Muu FC en el tercer partido de la Jornada 1.'
    }
  ];

  let RECUERDOS_ITEMS = DEFAULT_RECUERDOS_SEED.slice();
  let recuerdosCargados = false;

  const EXAMPLE_PLACEHOLDER_FILES = new Set([
    'foto_inaugural.jpg',
    'festejo_gol.jpg',
    'foto_probioticos.jpg',
    'foto_milla.jpg',
    'foto_femenino_j2.jpg'
  ]);

  function detectCategoryAndTeamFromText(textStr) {
    const n = normStr(textStr);
    const mascTeams = SHEETS_CONFIG.masculino.equipos;
    const femTeams = SHEETS_CONFIG.femenino.equipos;

    for (const eq of femTeams) {
      if (n.includes(normStr(eq)) || (normStr(eq).includes('MONARCA') && n.includes('MONARCA'))) {
        return { category: 'femenino', teamHint: eq };
      }
    }
    for (const eq of mascTeams) {
      if (n.includes(normStr(eq)) || (normStr(eq).includes('PROBIOTICOS') && n.includes('PROBIOTICOS'))) {
        return { category: 'masculino', teamHint: eq };
      }
    }
    if (n.includes('FEMENIN')) return { category: 'femenino', teamHint: '' };
    if (n.includes('MASCULIN')) return { category: 'masculino', teamHint: '' };
    return { category: 'masculino', teamHint: '' };
  }

  function resolveRecuerdoImgPath(fileName) {
    const clean = cleanStr(fileName);
    if (!clean) return '';
    if (clean.startsWith('http://') || clean.startsWith('https://')) return clean;
    if (clean.startsWith('img/')) return clean;
    return `img/recuerdos/${clean}`;
  }

  function parseNotasRecuerdosText(rawText) {
    if (!rawText || !rawText.trim()) return [];

    // Si el archivo contiene el bloque de instrucciones que termina en "NOTAS:" y una línea de "====",
    // procesamos únicamente el contenido real escrito después del bloque de NOTAS.
    let workingText = rawText;
    const notasIdx = rawText.search(/NOTAS\s*:/i);
    if (notasIdx !== -1) {
      const afterNotas = rawText.slice(notasIdx);
      const sepMatch = afterNotas.match(/={10,}\r?\n([\s\S]*)$/);
      if (sepMatch && sepMatch[1] && sepMatch[1].trim()) {
        workingText = sepMatch[1];
      }
    }

    const lines = workingText.split(/\r?\n/);
    const items = [];
    let currentJornada = '';
    let currentFecha = '';
    let currentPartido = '';

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || /^={5,}$/.test(trimmed)) return;

      // Encabezado de jornada: [JORNADA 1]
      if (/^\[JORNADA\s+[^\]]+\]$/i.test(trimmed)) {
        currentJornada = trimmed.slice(1, -1).trim().toUpperCase();
        return;
      }

      // FECHA: 3 de octubre de 2026
      if (/^FECHA\s*:/i.test(trimmed)) {
        currentFecha = trimmed.replace(/^FECHA\s*:/i, '').trim();
        return;
      }

      // PARTIDO: EQUIPO A vs EQUIPO B
      if (/^PARTIDO\s*:/i.test(trimmed)) {
        currentPartido = trimmed.replace(/^PARTIDO\s*:/i, '').trim();
        return;
      }

      // VIDEO: url | descripción (ignorar si está vacío)
      if (/^VIDEO\s*:/i.test(trimmed)) {
        return;
      }

      // FOTO: DSC02718.jpg | NÓMINA COMPLETA ADMIN UNITED FC
      if (/^FOTO\s*:/i.test(trimmed)) {
        const content = trimmed.replace(/^FOTO\s*:/i, '').trim();
        if (!content) return;
        const parts = content.split('|').map(p => p.trim());
        const fileName = parts[0];
        if (!fileName || EXAMPLE_PLACEHOLDER_FILES.has(fileName.toLowerCase())) return;

        const title = parts[1] || 'Recuerdo del Torneo';
        const desc = parts[2] || '';
        const combinedContext = `${title} ${currentPartido} ${desc}`;
        const { category, teamHint } = detectCategoryAndTeamFromText(combinedContext);

        // Si el partido quedó incompleto como "REAL SAN MARTIN FC vs " y la foto menciona al otro equipo, completarlo
        let displayPartido = currentPartido;
        if (/vs\s*$/i.test(displayPartido) && teamHint && !normStr(displayPartido).includes(normStr(teamHint))) {
          displayPartido = `${displayPartido.replace(/vs\s*$/i, 'vs')} ${teamHint}`;
        }

        items.push({
          id: items.length + 1,
          src: resolveRecuerdoImgPath(fileName),
          title,
          category,
          jornada: currentJornada || 'JORNADA 1',
          date: currentFecha,
          partido: displayPartido,
          teamHint,
          description: desc || (displayPartido ? `Encuentro oficial: ${displayPartido}` : '')
        });
        return;
      }

      // Formato lineal general: archivo.jpg | Título | Categoría | Fecha | Descripción
      if (trimmed.includes('|') && /\.(jpg|jpeg|png|webp|gif)/i.test(trimmed)) {
        const parts = trimmed.split('|').map(p => p.trim());
        const fileName = parts[0].replace(/^FOTO\s*:\s*/i, '').trim();
        if (!fileName || EXAMPLE_PLACEHOLDER_FILES.has(fileName.toLowerCase())) return;

        const title = parts[1] || 'Momento del Torneo';
        const { category, teamHint } = detectCategoryAndTeamFromText(`${title} ${parts[2] || ''} ${currentPartido}`);
        items.push({
          id: items.length + 1,
          src: resolveRecuerdoImgPath(fileName),
          title,
          category,
          jornada: currentJornada || 'JORNADA OFICIAL',
          date: parts[3] || currentFecha,
          partido: currentPartido,
          teamHint,
          description: parts[4] || ''
        });
      }
    });

    return items;
  }

  async function loadRecuerdosFromTxt() {
    const paths = ['NOTAS_RECUERDOS.txt', '/NOTAS_RECUERDOS.txt'];
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
        // Usar semilla por defecto si falla la red
      }
    }
    recuerdosCargados = true;
  }

  function openRecuerdoModal(item) {
    const modal = document.getElementById('modalRecuerdo');
    const imgEl = document.getElementById('modalRecuerdoImg');
    const titleEl = document.getElementById('modalRecuerdoTitle');
    const metaEl = document.getElementById('modalRecuerdoMeta');
    const descEl = document.getElementById('modalRecuerdoDesc');
    if (!modal || !imgEl) return;

    imgEl.src = item.src;
    imgEl.alt = item.title;
    if (titleEl) titleEl.textContent = item.title;
    if (metaEl) {
      const parts = [item.jornada, item.date, item.category ? item.category.toUpperCase() : ''].filter(Boolean);
      metaEl.textContent = parts.join(' · ') || 'GALERÍA OFICIAL · RECUERDOS';
    }
    if (descEl) {
      descEl.textContent = item.partido
        ? `⚽ ${item.partido}${item.date ? ` · 📅 ${item.date}` : ''}`
        : item.description || 'Torneo de Fútbol 5 San Martín Lácteos 2026';
    }
    modal.hidden = false;
  }

  function buildRecuerdoCardHtml(item) {
    return `
      <article class="recuerdo-card" data-recuerdo-id="${item.id}">
        <div class="recuerdo-img-box">
          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" class="recuerdo-img" loading="lazy" onerror="this.src='img/TOROS ICONO DEL TORNEO.jpg'">
          <span class="recuerdo-category-tag ${escapeHtml(item.category)}">${escapeHtml(item.jornada ? `${item.category} · ${item.jornada}` : item.category)}</span>
          <span class="recuerdo-zoom-badge">🔍 Ver foto</span>
        </div>
        <div class="recuerdo-info">
          ${item.date ? `<span class="recuerdo-date">📅 ${escapeHtml(item.date)}</span>` : ''}
          ${item.partido ? `<span class="recuerdo-match-pill">⚽ ${escapeHtml(item.partido)}</span>` : ''}
          <div class="recuerdo-team-row">
            ${item.teamHint ? getTeamShieldHtml(item.teamHint) : ''}
            <h3 class="recuerdo-title" style="margin-bottom:0">${escapeHtml(item.title)}</h3>
          </div>
          ${item.description ? `<p class="recuerdo-desc" style="margin-top:8px">${escapeHtml(item.description)}</p>` : ''}
        </div>
      </article>
    `;
  }

  async function renderHomeRecuerdosPreview() {
    const block = document.getElementById('homeRecuerdosBlock');
    const stream = document.getElementById('homeRecuerdosStream');
    if (!block || !stream) return;

    if (!recuerdosCargados) {
      await loadRecuerdosFromTxt();
    }

    if (!RECUERDOS_ITEMS.length) {
      block.hidden = true;
      return;
    }

    block.hidden = false;
    stream.innerHTML = RECUERDOS_ITEMS.slice(0, 4).map(buildRecuerdoCardHtml).join('');
    stream.querySelectorAll('[data-recuerdo-id]').forEach(card => {
      card.onclick = () => {
        const id = Number(card.getAttribute('data-recuerdo-id'));
        const found = RECUERDOS_ITEMS.find(r => r.id === id);
        if (found) openRecuerdoModal(found);
      };
    });
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
          <h3>No hay recuerdos en esta categoría aún</h3>
          <p>Próximamente se integrarán más fotografías oficiales de esta categoría en la galería del torneo.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="recuerdos-grid">
        ${filtered.map(buildRecuerdoCardHtml).join('')}
      </div>
    `;

    container.querySelectorAll('[data-recuerdo-id]').forEach(card => {
      card.onclick = () => {
        const id = Number(card.getAttribute('data-recuerdo-id'));
        const found = RECUERDOS_ITEMS.find(r => r.id === id);
        if (found) openRecuerdoModal(found);
      };
    });
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

    const modalAfiche = document.getElementById('modalAfiche');
    const btnCloseModalAfiche = document.getElementById('btnCloseModalAfiche');
    const cardPosterHero = document.getElementById('cardPosterHero');
    if (cardPosterHero && modalAfiche) {
      cardPosterHero.style.cursor = 'pointer';
      cardPosterHero.onclick = () => (modalAfiche.hidden = false);
    }
    if (btnCloseModalAfiche && modalAfiche) {
      btnCloseModalAfiche.onclick = () => (modalAfiche.hidden = true);
    }
    if (modalAfiche) {
      modalAfiche.onclick = e => {
        if (e.target === modalAfiche) modalAfiche.hidden = true;
      };
    }

    const modalRecuerdo = document.getElementById('modalRecuerdo');
    const btnCloseModalRecuerdo = document.getElementById('btnCloseModalRecuerdo');
    if (btnCloseModalRecuerdo && modalRecuerdo) {
      btnCloseModalRecuerdo.onclick = () => (modalRecuerdo.hidden = true);
    }
    if (modalRecuerdo) {
      modalRecuerdo.onclick = e => {
        if (e.target === modalRecuerdo) modalRecuerdo.hidden = true;
      };
    }

    // Notas flotantes pequeñas para abreviaciones e íconos (PJ, PG, DG, PTS, ⚽, 🅰️, etc.)
    const abbrPopover = document.getElementById('abbrPopover');
    const abbrTextEl = document.getElementById('abbrPopoverText');
    let abbrHideTimer = null;

    function hideAbbrPopover() {
      if (abbrHideTimer) {
        clearTimeout(abbrHideTimer);
        abbrHideTimer = null;
      }
      if (abbrPopover) abbrPopover.hidden = true;
    }

    function showAbbrPopover(triggerEl, key) {
      const info = ABBR_DICTIONARY[key];
      if (!info || !abbrPopover || !abbrTextEl) return;
      abbrTextEl.innerHTML = `<strong>${escapeHtml(info.code)}:</strong> ${escapeHtml(info.title)}`;
      abbrPopover.hidden = false;

      const rect = triggerEl.getBoundingClientRect();
      const popWidth = abbrPopover.offsetWidth || 160;
      const popHeight = abbrPopover.offsetHeight || 28;

      let left = rect.left + rect.width / 2 - popWidth / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - popWidth - 8));

      // Ubicar siempre ARRIBA del elemento presionado para nunca tapar el texto de abajo
      let top = rect.top - popHeight - 6;
      if (top < 8) {
        top = rect.bottom + 6;
      }

      abbrPopover.style.left = `${left}px`;
      abbrPopover.style.top = `${top}px`;

      if (abbrHideTimer) clearTimeout(abbrHideTimer);
      abbrHideTimer = setTimeout(hideAbbrPopover, 2600);
    }

    document.addEventListener('click', e => {
      const abbrTrigger = e.target.closest('.abbr-tip');
      if (abbrTrigger) {
        e.preventDefault();
        e.stopPropagation();
        const key = abbrTrigger.getAttribute('data-abbr');
        showAbbrPopover(abbrTrigger, key);
        return;
      }
      if (abbrPopover && !abbrPopover.hidden) {
        hideAbbrPopover();
      }
    });

    window.addEventListener('scroll', () => {
      if (abbrPopover && !abbrPopover.hidden) hideAbbrPopover();
    }, { passive: true });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeNav();
        hideAbbrPopover();
        if (modalPartido) modalPartido.hidden = true;
        if (modalAfiche) modalAfiche.hidden = true;
        if (modalRecuerdo) modalRecuerdo.hidden = true;
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
