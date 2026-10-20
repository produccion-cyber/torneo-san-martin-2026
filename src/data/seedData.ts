// Seed data exported from original applet
export interface Match {
  jornada: string;
  partido: string;
  fecha: string;
  hora?: string;
  local: string;
  visitante: string;
  cancha: string;
  marcador: string;
  observaciones: string;
  arbitro?: string;
  fase?: string;
  branch?: 'masculino' | 'femenino';
}

export interface ResultMatch {
  jornada: string;
  partido: string;
  fecha: string;
  hora?: string;
  local: string;
  visitante: string;
  golesLocal: number;
  golesVisita: number;
  estado: string;
  observaciones: string;
  branch?: 'masculino' | 'femenino';
}

export interface Standing {
  pos: string;
  equipo: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dg: number;
  pts: number;
  ult5: string;
  estado: string;
  branch?: 'masculino' | 'femenino';
}

export interface PlayerStat {
  jugador: string;
  equipo: string;
  dorsal: string;
  posicion: string;
  pj: number;
  goles: number;
  asistencias: number;
  ta: number;
  tr: number;
  mvp: number;
  fairPlay: number;
  branch: 'masculino' | 'femenino';
}

export interface RosterMember {
  team: string;
  name: string;
  number: string;
  role: string;
}

export interface BranchConfig {
  id: string;
  nombre: string;
  color: string;
  badge: string;
  desc: string;
  video: string;
  totalPartidos: number;
  equipos: string[];
  plantillaBase: RosterMember[];
}

export const SHEETS_CONFIG: Record<'masculino' | 'femenino', BranchConfig> = {
    masculino: {
      id: '1mCMBHkh_Kg98IdgbKu8fPpqh8it_OCAn_aqA2BDSE1E',
      nombre: 'MASCULINO',
      color: '#31a8e6',
      badge: 'TORNEO MASCULINO 2026',
      desc: '5 equipos compitiendo todos contra todos. Semifinales (1.º vs 4.º y 2.º vs 3.º) y Gran Final.',
      video: 'cjn7Y9CnVTQ',
      totalPartidos: 13,
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
      desc: '3 escuadras compitiendo todos contra todos y Gran Final oficial (1.º vs 2.º).',
      video: 'UkpKEy84rO8',
      totalPartidos: 4,
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


export const TABLA_ESCUDOS: Record<string, string> = {
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


export const INITIAL_SEED_DATA = {
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
        "arbitro": "Ediwn Vasquez",
        "fase": "",
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
        "arbitro": "Ediwn Vasquez",
        "fase": "",
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
        "arbitro": "Ediwn Vasquez",
        "fase": "",
        "branch": "masculino"
      },
      {
        "jornada": "2",
        "partido": "4",
        "fecha": "sábado, octubre 10, 2026",
        "hora": "5:00 p.m.",
        "local": "ADMIN UNITED FC",
        "visitante": "LOS PROBIÓTICOS FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "3 - 2",
        "observaciones": "Inicio T1: 5:05 | Fin T1:  5:26 |\nInicio T2: 5:31 | Fin T2: 5:52",
        "arbitro": "Ediwn Vasquez",
        "fase": "",
        "branch": "masculino"
      },
      {
        "jornada": "2",
        "partido": "5",
        "fecha": "sábado, octubre 10, 2026",
        "hora": "6:00 p.m.",
        "local": "ULTIMA MILLA FC",
        "visitante": "BAYERN MUU FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "8 - 12",
        "observaciones": "Inicio T1: 6:00 | Fin T1:  6:20 |\nInicio T2: 6:25 | Fin T2: 6:46",
        "arbitro": "Ediwn Vasquez",
        "fase": "",
        "branch": "masculino"
      },
      {
        "jornada": "3",
        "partido": "6",
        "fecha": "sábado, octubre 17, 2026",
        "hora": "5:00 p.m.",
        "local": "REAL SAN MARTIN FC",
        "visitante": "LOS PROBIÓTICOS FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "6 - 2",
        "observaciones": "Inicio T1: 5:02 | Fin T1: 5:22 |\nInicio T2: 5:28 | Fin T2: 5:48",
        "arbitro": "Carlos Granada",
        "fase": "",
        "branch": "masculino"
      },
      {
        "jornada": "3",
        "partido": "7",
        "fecha": "sábado, octubre 17, 2026",
        "hora": "4:00 p.m.",
        "local": "ADMIN UNITED FC",
        "visitante": "ULTIMA MILLA FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "2 - 4",
        "observaciones": "Inicio T1: 4:02 | Fin T1: 4:23  |\nInicio T2: 4:28 | Fin T2: 4:50",
        "arbitro": "Carlos Granada",
        "fase": "",
        "branch": "masculino"
      },
      {
        "jornada": "4",
        "partido": "8",
        "fecha": "sábado, octubre 24, 2026",
        "hora": "5:00 p.m.",
        "local": "LOS PROBIÓTICOS FC",
        "visitante": "BAYERN MUU FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "arbitro": "",
        "fase": "",
        "branch": "masculino"
      },
      {
        "jornada": "4",
        "partido": "9",
        "fecha": "sábado, octubre 24, 2026",
        "hora": "4:00 p.m.",
        "local": "REAL SAN MARTIN FC",
        "visitante": "ULTIMA MILLA FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "arbitro": "",
        "fase": "",
        "branch": "masculino"
      },
      {
        "jornada": "4",
        "partido": "10",
        "fecha": "sábado, octubre 24, 2026",
        "hora": "6:00 p.m.",
        "local": "ADMIN UNITED FC",
        "visitante": "BAYERN MUU FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "arbitro": "",
        "fase": "",
        "branch": "masculino"
      },
      {
        "jornada": "6",
        "partido": "11",
        "fecha": "sábado, noviembre 07, 2026",
        "hora": "",
        "local": "Por definir",
        "visitante": "Por definir",
        "cancha": "",
        "marcador": "-",
        "observaciones": "",
        "arbitro": "",
        "fase": "SEMIFINAL 1",
        "branch": "masculino"
      },
      {
        "jornada": "6",
        "partido": "12",
        "fecha": "sábado, noviembre 07, 2026",
        "hora": "",
        "local": "Por definir",
        "visitante": "Por definir",
        "cancha": "",
        "marcador": "-",
        "observaciones": "",
        "arbitro": "",
        "fase": "SEMIFINAL 2",
        "branch": "masculino"
      },
      {
        "jornada": "7",
        "partido": "13",
        "fecha": "sábado, noviembre 07, 2026",
        "hora": "",
        "local": "Por definir",
        "visitante": "Por definir",
        "cancha": "",
        "marcador": "-",
        "observaciones": "",
        "arbitro": "",
        "fase": "GRAN FINAL",
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
        "observaciones": "Inicio T1: 16:18 | Fin T1: 16:38 |\nInicio T2: 16:45 | Fin T2: 5:05:00 p.m.",
        "branch": "masculino"
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
        "observaciones": "Inicio T1: 5:40 | Fin T1: 6:00 p.m. |\nInicio 2T: 6:07 p.m. | Fin T2: 6:27",
        "branch": "masculino"
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
        "observaciones": "Inicio T1: 6:40 | Fin T1: 7:00 |\nInicio T2: 7:05 | Fin T2: 7:25",
        "branch": "masculino"
      },
      {
        "jornada": "2",
        "partido": "4",
        "fecha": "10/10/2026",
        "local": "ADMIN UNITED FC",
        "visitante": "LOS PROBIÓTICOS FC",
        "golesLocal": 3,
        "golesVisita": 2,
        "estado": "Jugado",
        "observaciones": "Inicio T1: 5:05 | Fin T1:  5:26 |\nInicio T2: 5:31 | Fin T2: 5:52",
        "branch": "masculino"
      },
      {
        "jornada": "2",
        "partido": "5",
        "fecha": "10/10/2026",
        "local": "ULTIMA MILLA FC",
        "visitante": "BAYERN MUU FC",
        "golesLocal": 8,
        "golesVisita": 12,
        "estado": "Jugado",
        "observaciones": "Inicio T1: 6:00 | Fin T1:  6:20 |\nInicio T2: 6:25 | Fin T2: 6:46",
        "branch": "masculino"
      },
      {
        "jornada": "3",
        "partido": "6",
        "fecha": "10/17/2026",
        "local": "REAL SAN MARTIN FC",
        "visitante": "LOS PROBIÓTICOS FC",
        "golesLocal": 6,
        "golesVisita": 2,
        "estado": "Jugado",
        "observaciones": "Inicio T1: 5:02 | Fin T1: 5:22 |\nInicio T2: 5:28 | Fin T2: 5:48",
        "branch": "masculino"
      },
      {
        "jornada": "3",
        "partido": "7",
        "fecha": "10/17/2026",
        "local": "ADMIN UNITED FC",
        "visitante": "ULTIMA MILLA FC",
        "golesLocal": 2,
        "golesVisita": 4,
        "estado": "Jugado",
        "observaciones": "Inicio T1: 4:02 | Fin T1: 4:23  |\nInicio T2: 4:28 | Fin T2: 4:50",
        "branch": "masculino"
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
        "observaciones": "",
        "branch": "masculino"
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
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "4",
        "partido": "10",
        "fecha": "10/24/2026",
        "local": "ADMIN UNITED FC",
        "visitante": "BAYERN MUU FC",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "6",
        "partido": "11",
        "fecha": "11/7/2026",
        "local": "Por definir",
        "visitante": "Por definir",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "6",
        "partido": "12",
        "fecha": "11/7/2026",
        "local": "Por definir",
        "visitante": "Por definir",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": "",
        "branch": "masculino"
      },
      {
        "jornada": "7",
        "partido": "13",
        "fecha": "11/7/2026",
        "local": "Por definir",
        "visitante": "Por definir",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": "",
        "branch": "masculino"
      }
    ],
    "posiciones": [
      {
        "pos": "1",
        "equipo": "ADMIN UNITED FC",
        "pj": 3,
        "pg": 2,
        "pe": 0,
        "pp": 1,
        "gf": 11,
        "gc": 7,
        "dg": 4,
        "pts": 6,
        "ult5": "-",
        "estado": "En competencia",
        "branch": "masculino"
      },
      {
        "pos": "2",
        "equipo": "ULTIMA MILLA FC",
        "pj": 3,
        "pg": 2,
        "pe": 0,
        "pp": 1,
        "gf": 22,
        "gc": 20,
        "dg": 2,
        "pts": 6,
        "ult5": "-",
        "estado": "En competencia",
        "branch": "masculino"
      },
      {
        "pos": "3",
        "equipo": "REAL SAN MARTIN FC",
        "pj": 3,
        "pg": 2,
        "pe": 0,
        "pp": 1,
        "gf": 12,
        "gc": 12,
        "dg": 0,
        "pts": 6,
        "ult5": "-",
        "estado": "En competencia",
        "branch": "masculino"
      },
      {
        "pos": "4",
        "equipo": "BAYERN MUU FC",
        "pj": 2,
        "pg": 1,
        "pe": 0,
        "pp": 1,
        "gf": 16,
        "gc": 13,
        "dg": 3,
        "pts": 3,
        "ult5": "-",
        "estado": "Necesita remontar",
        "branch": "masculino"
      },
      {
        "pos": "5",
        "equipo": "LOS PROBIÓTICOS FC",
        "pj": 3,
        "pg": 0,
        "pe": 0,
        "pp": 3,
        "gf": 10,
        "gc": 19,
        "dg": -9,
        "pts": 0,
        "ult5": "-",
        "estado": "Necesita remontar",
        "branch": "masculino"
      }
    ],
    "jugadores": [
      {
        "jugador": "Hernández C.",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "8",
        "posicion": "Capitán",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Aguirre",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "1",
        "posicion": "Portero",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Urrea",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "2",
        "posicion": "Defensa",
        "pj": 3,
        "goles": 5,
        "asistencias": 1,
        "ta": 1,
        "tr": 0,
        "mvp": 19,
        "fairPlay": 5000,
        "branch": "masculino"
      },
      {
        "jugador": "Atehortua",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "74",
        "posicion": "Delantero",
        "pj": 3,
        "goles": 1,
        "asistencias": 4,
        "ta": 0,
        "tr": 0,
        "mvp": 14,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Orozco A.",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "6",
        "posicion": "Medio Campista",
        "pj": 3,
        "goles": 2,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 9,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Osorio C.",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "22",
        "posicion": "Medio Campista",
        "pj": 3,
        "goles": 2,
        "asistencias": 1,
        "ta": 1,
        "tr": 0,
        "mvp": 10,
        "fairPlay": 5000,
        "branch": "masculino"
      },
      {
        "jugador": "Gomez A.",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "4",
        "posicion": "Medio Campista",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Rios",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "99",
        "posicion": "Defensa",
        "pj": 3,
        "goles": 1,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 6,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Bustos",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "10",
        "posicion": "Medio Campista",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Gonzáles",
        "equipo": "ADMIN UNITED FC",
        "dorsal": "5",
        "posicion": "Defensa, Mediocampista",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Rivera",
        "equipo": "ULTIMA MILLA FC",
        "dorsal": "7",
        "posicion": "Capitán",
        "pj": 3,
        "goles": 3,
        "asistencias": 3,
        "ta": 0,
        "tr": 0,
        "mvp": 18,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Velazquez",
        "equipo": "ULTIMA MILLA FC",
        "dorsal": "6",
        "posicion": "Portero",
        "pj": 3,
        "goles": 3,
        "asistencias": 3,
        "ta": 0,
        "tr": 0,
        "mvp": 18,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Castro M.",
        "equipo": "ULTIMA MILLA FC",
        "dorsal": "20",
        "posicion": "Defensa",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Navarro C.",
        "equipo": "ULTIMA MILLA FC",
        "dorsal": "11",
        "posicion": "Defensa",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 1,
        "tr": 0,
        "mvp": 2,
        "fairPlay": 5000,
        "branch": "masculino"
      },
      {
        "jugador": "Pérez",
        "equipo": "ULTIMA MILLA FC",
        "dorsal": "16",
        "posicion": "Cualquier posición",
        "pj": 3,
        "goles": 3,
        "asistencias": 2,
        "ta": 0,
        "tr": 0,
        "mvp": 16,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Quintero",
        "equipo": "ULTIMA MILLA FC",
        "dorsal": "9",
        "posicion": "Defensa",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Sanchez",
        "equipo": "ULTIMA MILLA FC",
        "dorsal": "10",
        "posicion": "Cualquier posición",
        "pj": 3,
        "goles": 13,
        "asistencias": 4,
        "ta": 0,
        "tr": 0,
        "mvp": 50,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Viloria",
        "equipo": "LOS PROBIÓTICOS FC",
        "dorsal": "7",
        "posicion": "Capitán",
        "pj": 3,
        "goles": 5,
        "asistencias": 2,
        "ta": 0,
        "tr": 0,
        "mvp": 22,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Escalona",
        "equipo": "LOS PROBIÓTICOS FC",
        "dorsal": "1",
        "posicion": "Portero",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Soto Z.",
        "equipo": "LOS PROBIÓTICOS FC",
        "dorsal": "20",
        "posicion": "Mediocampista",
        "pj": 3,
        "goles": 1,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 6,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Navarro A.",
        "equipo": "LOS PROBIÓTICOS FC",
        "dorsal": "10",
        "posicion": "Delantero",
        "pj": 3,
        "goles": 4,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 15,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Arteaga",
        "equipo": "LOS PROBIÓTICOS FC",
        "dorsal": "4",
        "posicion": "Cualquier posición",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Ramirez L.",
        "equipo": "LOS PROBIÓTICOS FC",
        "dorsal": "6",
        "posicion": "Cualquier posición",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Alvarez",
        "equipo": "LOS PROBIÓTICOS FC",
        "dorsal": "9",
        "posicion": "Cualquier posición",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Albino",
        "equipo": "BAYERN MUU FC",
        "dorsal": "11",
        "posicion": "Capitán",
        "pj": 2,
        "goles": 8,
        "asistencias": 4,
        "ta": 1,
        "tr": 0,
        "mvp": 33,
        "fairPlay": 5000,
        "branch": "masculino"
      },
      {
        "jugador": "Ardila",
        "equipo": "BAYERN MUU FC",
        "dorsal": "1",
        "posicion": "Portero",
        "pj": 2,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 2,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Rodriguez",
        "equipo": "BAYERN MUU FC",
        "dorsal": "15",
        "posicion": "Defensa",
        "pj": 2,
        "goles": 0,
        "asistencias": 0,
        "ta": 1,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 5000,
        "branch": "masculino"
      },
      {
        "jugador": "Delprado",
        "equipo": "BAYERN MUU FC",
        "dorsal": "7",
        "posicion": "Delantero",
        "pj": 2,
        "goles": 7,
        "asistencias": 5,
        "ta": 1,
        "tr": 0,
        "mvp": 32,
        "fairPlay": 5000,
        "branch": "masculino"
      },
      {
        "jugador": "Sanchez M.",
        "equipo": "BAYERN MUU FC",
        "dorsal": "20",
        "posicion": "Cualquier posición",
        "pj": 2,
        "goles": 0,
        "asistencias": 1,
        "ta": 0,
        "tr": 0,
        "mvp": 4,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Urrego",
        "equipo": "BAYERN MUU FC",
        "dorsal": "9",
        "posicion": "Mediocampista",
        "pj": 2,
        "goles": 1,
        "asistencias": 3,
        "ta": 0,
        "tr": 0,
        "mvp": 11,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Palacio",
        "equipo": "BAYERN MUU FC",
        "dorsal": "5",
        "posicion": "Defensa",
        "pj": 2,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 2,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Ramirez",
        "equipo": "BAYERN MUU FC",
        "dorsal": "47",
        "posicion": "Cualquier posición",
        "pj": 2,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 2,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Marín C.",
        "equipo": "BAYERN MUU FC",
        "dorsal": "19",
        "posicion": "Defensa",
        "pj": 2,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 2,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Acosta",
        "equipo": "REAL SAN MARTIN FC",
        "dorsal": "10",
        "posicion": "Capitán",
        "pj": 3,
        "goles": 3,
        "asistencias": 1,
        "ta": 0,
        "tr": 0,
        "mvp": 14,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Pineda",
        "equipo": "REAL SAN MARTIN FC",
        "dorsal": "96",
        "posicion": "Portero",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Gallego",
        "equipo": "REAL SAN MARTIN FC",
        "dorsal": "21",
        "posicion": "Mediocampista",
        "pj": 3,
        "goles": 0,
        "asistencias": 1,
        "ta": 0,
        "tr": 0,
        "mvp": 5,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Soto H.",
        "equipo": "REAL SAN MARTIN FC",
        "dorsal": "80",
        "posicion": "Mediocampista",
        "pj": 3,
        "goles": 2,
        "asistencias": 1,
        "ta": 0,
        "tr": 0,
        "mvp": 11,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Echeverry",
        "equipo": "REAL SAN MARTIN FC",
        "dorsal": "17",
        "posicion": "Defensa, Mediocampista, Delantero",
        "pj": 3,
        "goles": 1,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 6,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Bohorquez",
        "equipo": "REAL SAN MARTIN FC",
        "dorsal": "7",
        "posicion": "Mediocampista, Delantero",
        "pj": 3,
        "goles": 6,
        "asistencias": 2,
        "ta": 0,
        "tr": 0,
        "mvp": 25,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Orozco J.",
        "equipo": "REAL SAN MARTIN FC",
        "dorsal": "23",
        "posicion": "Mediocampista",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      },
      {
        "jugador": "Espitia",
        "equipo": "REAL SAN MARTIN FC",
        "dorsal": "5",
        "posicion": "Defensa",
        "pj": 3,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 3,
        "fairPlay": 0,
        "branch": "masculino"
      }
    ],
    "plantilla": [
      {
        "team": "ADMIN UNITED FC",
        "name": "Hernández C.",
        "number": "8",
        "role": "Capitán"
      },
      {
        "team": "ADMIN UNITED FC",
        "name": "Aguirre",
        "number": "1",
        "role": "Portero"
      },
      {
        "team": "ADMIN UNITED FC",
        "name": "Urrea",
        "number": "2",
        "role": "Defensa"
      },
      {
        "team": "ADMIN UNITED FC",
        "name": "Atehortua",
        "number": "74",
        "role": "Delantero"
      },
      {
        "team": "ADMIN UNITED FC",
        "name": "Orozco A.",
        "number": "6",
        "role": "Medio Campista"
      },
      {
        "team": "ADMIN UNITED FC",
        "name": "Osorio C.",
        "number": "22",
        "role": "Medio Campista"
      },
      {
        "team": "ADMIN UNITED FC",
        "name": "Gomez A.",
        "number": "4",
        "role": "Medio Campista"
      },
      {
        "team": "ADMIN UNITED FC",
        "name": "Rios",
        "number": "99",
        "role": "Defensa"
      },
      {
        "team": "ADMIN UNITED FC",
        "name": "Bustos",
        "number": "10",
        "role": "Medio Campista"
      },
      {
        "team": "ADMIN UNITED FC",
        "name": "Gonzáles",
        "number": "5",
        "role": "Defensa, Mediocampista"
      },
      {
        "team": "ULTIMA MILLA FC",
        "name": "Rivera",
        "number": "7",
        "role": "Capitán"
      },
      {
        "team": "ULTIMA MILLA FC",
        "name": "Velazquez",
        "number": "6",
        "role": "Portero"
      },
      {
        "team": "ULTIMA MILLA FC",
        "name": "Castro M.",
        "number": "20",
        "role": "Defensa"
      },
      {
        "team": "ULTIMA MILLA FC",
        "name": "Navarro C.",
        "number": "11",
        "role": "Defensa"
      },
      {
        "team": "ULTIMA MILLA FC",
        "name": "Pérez",
        "number": "16",
        "role": "Cualquier posición"
      },
      {
        "team": "ULTIMA MILLA FC",
        "name": "Quintero",
        "number": "9",
        "role": "Defensa"
      },
      {
        "team": "ULTIMA MILLA FC",
        "name": "Sanchez",
        "number": "10",
        "role": "Cualquier posición"
      },
      {
        "team": "LOS PROBIÓTICOS FC",
        "name": "Viloria",
        "number": "7",
        "role": "Capitán"
      },
      {
        "team": "LOS PROBIÓTICOS FC",
        "name": "Escalona",
        "number": "1",
        "role": "Portero"
      },
      {
        "team": "LOS PROBIÓTICOS FC",
        "name": "Soto Z.",
        "number": "20",
        "role": "Mediocampista"
      },
      {
        "team": "LOS PROBIÓTICOS FC",
        "name": "Navarro A.",
        "number": "10",
        "role": "Delantero"
      },
      {
        "team": "LOS PROBIÓTICOS FC",
        "name": "Arteaga",
        "number": "4",
        "role": "Cualquier posición"
      },
      {
        "team": "LOS PROBIÓTICOS FC",
        "name": "Ramirez L.",
        "number": "6",
        "role": "Cualquier posición"
      },
      {
        "team": "LOS PROBIÓTICOS FC",
        "name": "Alvarez",
        "number": "9",
        "role": "Cualquier posición"
      },
      {
        "team": "BAYERN MUU FC",
        "name": "Albino",
        "number": "11",
        "role": "Capitán"
      },
      {
        "team": "BAYERN MUU FC",
        "name": "Ardila",
        "number": "1",
        "role": "Portero"
      },
      {
        "team": "BAYERN MUU FC",
        "name": "Rodriguez",
        "number": "15",
        "role": "Defensa"
      },
      {
        "team": "BAYERN MUU FC",
        "name": "Delprado",
        "number": "7",
        "role": "Delantero"
      },
      {
        "team": "BAYERN MUU FC",
        "name": "Sanchez M.",
        "number": "20",
        "role": "Cualquier posición"
      },
      {
        "team": "BAYERN MUU FC",
        "name": "Urrego",
        "number": "9",
        "role": "Mediocampista"
      },
      {
        "team": "BAYERN MUU FC",
        "name": "Palacio",
        "number": "5",
        "role": "Defensa"
      },
      {
        "team": "BAYERN MUU FC",
        "name": "Ramirez",
        "number": "47",
        "role": "Cualquier posición"
      },
      {
        "team": "BAYERN MUU FC",
        "name": "Marín C.",
        "number": "19",
        "role": "Defensa"
      },
      {
        "team": "REAL SAN MARTIN FC",
        "name": "Acosta",
        "number": "10",
        "role": "Capitán"
      },
      {
        "team": "REAL SAN MARTIN FC",
        "name": "Pineda",
        "number": "96",
        "role": "Portero"
      },
      {
        "team": "REAL SAN MARTIN FC",
        "name": "Gallego",
        "number": "21",
        "role": "Mediocampista"
      },
      {
        "team": "REAL SAN MARTIN FC",
        "name": "Soto H.",
        "number": "80",
        "role": "Mediocampista"
      },
      {
        "team": "REAL SAN MARTIN FC",
        "name": "Echeverry",
        "number": "17",
        "role": "Defensa, Mediocampista, Delantero"
      },
      {
        "team": "REAL SAN MARTIN FC",
        "name": "Bohorquez",
        "number": "7",
        "role": "Mediocampista, Delantero"
      },
      {
        "team": "REAL SAN MARTIN FC",
        "name": "Orozco J.",
        "number": "23",
        "role": "Mediocampista"
      },
      {
        "team": "REAL SAN MARTIN FC",
        "name": "Espitia",
        "number": "5",
        "role": "Defensa"
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
        "marcador": "3 - 2",
        "observaciones": "Inicio T1: 16:05 | Fin T1: | 16:25\nInicio T2: 16:31| Fin T2: 16:52",
        "arbitro": "Edwin Vasques",
        "fase": "",
        "branch": "femenino"
      },
      {
        "jornada": "2",
        "partido": "2",
        "fecha": "sábado, 17 de octubre de 2026",
        "hora": "3:00 p.m.",
        "local": "ÉLITE FC",
        "visitante": "MONARCAS FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "2 - 3",
        "observaciones": "Inicio T1: 3:58 | Fin T1: | 3:18\nInicio T2: 3:26| Fin T2: 3:46",
        "arbitro": "Carlos Granada",
        "fase": "",
        "branch": "femenino"
      },
      {
        "jornada": "3",
        "partido": "3",
        "fecha": "sábado, 24 de octubre de 2026",
        "hora": "3:00 p.m.",
        "local": "INTER LÁCTEOS FC",
        "visitante": "ÉLITE FC",
        "cancha": "Cra. 24 #18-46 | https://maps.app.goo.gl/CvkLHZJquJHDo7Ty9",
        "marcador": "-",
        "observaciones": "",
        "arbitro": "",
        "fase": "",
        "branch": "femenino"
      },
      {
        "jornada": "4",
        "partido": "4",
        "fecha": "sábado, 07 de noviembre de 2026",
        "hora": "",
        "local": "Por definir",
        "visitante": "Por definir",
        "cancha": "",
        "marcador": "-",
        "observaciones": "",
        "arbitro": "",
        "fase": "GRAN FINAL",
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
        "golesLocal": 3,
        "golesVisita": 2,
        "estado": "Jugado",
        "observaciones": "",
        "branch": "femenino"
      },
      {
        "jornada": "2",
        "partido": "2",
        "fecha": "sábado, 17 de octubre de 2026",
        "local": "ÉLITE FC",
        "visitante": "MONARCAS FC",
        "golesLocal": 2,
        "golesVisita": 3,
        "estado": "Jugado",
        "observaciones": "",
        "branch": "femenino"
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
        "observaciones": "",
        "branch": "femenino"
      },
      {
        "jornada": "4",
        "partido": "4",
        "fecha": "sábado, 07 de noviembre de 2026",
        "local": "Por definir",
        "visitante": "Por definir",
        "golesLocal": 0,
        "golesVisita": 0,
        "estado": "Pendiente",
        "observaciones": "",
        "branch": "femenino"
      }
    ],
    "posiciones": [
      {
        "pos": "1",
        "equipo": "MONARCAS FC",
        "pj": 2,
        "pg": 2,
        "pe": 0,
        "pp": 0,
        "gf": 6,
        "gc": 4,
        "dg": 2,
        "pts": 6,
        "ult5": "-",
        "estado": "En competencia",
        "branch": "femenino"
      },
      {
        "pos": "2",
        "equipo": "INTER LÁCTEOS FC",
        "pj": 1,
        "pg": 0,
        "pe": 0,
        "pp": 1,
        "gf": 2,
        "gc": 3,
        "dg": -1,
        "pts": 0,
        "ult5": "-",
        "estado": "Necesita remontar",
        "branch": "femenino"
      },
      {
        "pos": "3",
        "equipo": "ÉLITE FC",
        "pj": 1,
        "pg": 0,
        "pe": 0,
        "pp": 1,
        "gf": 2,
        "gc": 3,
        "dg": -1,
        "pts": 0,
        "ult5": "-",
        "estado": "Necesita remontar",
        "branch": "femenino"
      }
    ],
    "jugadores": [
      {
        "jugador": "Gonzales",
        "equipo": "MONARCA FC",
        "dorsal": "22",
        "posicion": "Capitana",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Murillo",
        "equipo": "MONARCA FC",
        "dorsal": "28",
        "posicion": "Mediocampista",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Giraldo",
        "equipo": "MONARCA FC",
        "dorsal": "5",
        "posicion": "Mediocampista",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "#REF!",
        "equipo": "#REF!",
        "dorsal": "",
        "posicion": "#REF!",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "#REF!",
        "equipo": "#REF!",
        "dorsal": "",
        "posicion": "#REF!",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "#REF!",
        "equipo": "#REF!",
        "dorsal": "",
        "posicion": "#REF!",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "García",
        "equipo": "MONARCA FC",
        "dorsal": "10",
        "posicion": "Defensa",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Valencia T.",
        "equipo": "MONARCA FC",
        "dorsal": "4",
        "posicion": "Defensa",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Gomez B.",
        "equipo": "MONARCA FC",
        "dorsal": "2",
        "posicion": "Defensa",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Betancurt",
        "equipo": "MONARCA FC",
        "dorsal": "8",
        "posicion": "Defensa",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Marquez",
        "equipo": "MONARCA FC",
        "dorsal": "3",
        "posicion": "Defensa",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Osorio",
        "equipo": "MONARCA FC",
        "dorsal": "18",
        "posicion": "Cualquier posición",
        "pj": 0,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 0,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Muñoz T",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "12",
        "posicion": "Capitana",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Guzmán",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "9",
        "posicion": "Mediocampista",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Lugo M.",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "23",
        "posicion": "Cualquier posición",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Oquendo",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "22",
        "posicion": "Defensa",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Valencia A.",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "25",
        "posicion": "Mediocampista",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Rojas",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "4",
        "posicion": "Cualquier posición",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Cruz G.",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "24",
        "posicion": "Mediocampista",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Toro",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "11",
        "posicion": "Delantero",
        "pj": 1,
        "goles": 0,
        "asistencias": 2,
        "ta": 1,
        "tr": 0,
        "mvp": 4,
        "fairPlay": 5000,
        "branch": "femenino"
      },
      {
        "jugador": "Ceballos",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "10",
        "posicion": "Cualquier posición",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Agudelo",
        "equipo": "INTER LÁCTEOS FC",
        "dorsal": "26",
        "posicion": "Mediocampista",
        "pj": 1,
        "goles": 1,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 4,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Rendón",
        "equipo": "ÉLITE FC",
        "dorsal": "9",
        "posicion": "Capitana",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Triana",
        "equipo": "ÉLITE FC",
        "dorsal": "7",
        "posicion": "Cualquier posición",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Uribe",
        "equipo": "ÉLITE FC",
        "dorsal": "2",
        "posicion": "Cualquier posición",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Carmona",
        "equipo": "ÉLITE FC",
        "dorsal": "10",
        "posicion": "Cualquier posición",
        "pj": 1,
        "goles": 1,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 4,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Castro M.",
        "equipo": "ÉLITE FC",
        "dorsal": "14",
        "posicion": "Cualquier posición",
        "pj": 1,
        "goles": 1,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 4,
        "fairPlay": 0,
        "branch": "femenino"
      },
      {
        "jugador": "Sanchez T.",
        "equipo": "ÉLITE FC",
        "dorsal": "15",
        "posicion": "Cualquier posición",
        "pj": 1,
        "goles": 0,
        "asistencias": 0,
        "ta": 0,
        "tr": 0,
        "mvp": 1,
        "fairPlay": 0,
        "branch": "femenino"
      }
    ],
    "plantilla": [
      {
        "team": "MONARCA FC",
        "name": "Gonzales",
        "number": "22",
        "role": "Capitana"
      },
      {
        "team": "MONARCA FC",
        "name": "Murillo",
        "number": "28",
        "role": "Mediocampista"
      },
      {
        "team": "MONARCA FC",
        "name": "Giraldo",
        "number": "5",
        "role": "Mediocampista"
      },
      {
        "team": "MONARCA FC",
        "name": "García",
        "number": "10",
        "role": "Defensa"
      },
      {
        "team": "MONARCA FC",
        "name": "Valencia T.",
        "number": "4",
        "role": "Defensa"
      },
      {
        "team": "MONARCA FC",
        "name": "Gomez B.",
        "number": "2",
        "role": "Defensa"
      },
      {
        "team": "MONARCA FC",
        "name": "Betancurt",
        "number": "8",
        "role": "Defensa"
      },
      {
        "team": "MONARCA FC",
        "name": "Marquez",
        "number": "3",
        "role": "Defensa"
      },
      {
        "team": "MONARCA FC",
        "name": "Osorio",
        "number": "18",
        "role": "Cualquier posición"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Muñoz T",
        "number": "12",
        "role": "Capitana"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Guzmán",
        "number": "9",
        "role": "Mediocampista"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Lugo M.",
        "number": "23",
        "role": "Cualquier posición"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Oquendo",
        "number": "22",
        "role": "Defensa"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Valencia A.",
        "number": "25",
        "role": "Mediocampista"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Rojas",
        "number": "4",
        "role": "Cualquier posición"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Cruz G.",
        "number": "24",
        "role": "Mediocampista"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Toro",
        "number": "11",
        "role": "Delantero"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Ceballos",
        "number": "10",
        "role": "Cualquier posición"
      },
      {
        "team": "INTER LÁCTEOS FC",
        "name": "Agudelo",
        "number": "26",
        "role": "Mediocampista"
      },
      {
        "team": "ÉLITE FC",
        "name": "Rendón",
        "number": "9",
        "role": "Capitana"
      },
      {
        "team": "ÉLITE FC",
        "name": "Triana",
        "number": "7",
        "role": "Cualquier posición"
      },
      {
        "team": "ÉLITE FC",
        "name": "Uribe",
        "number": "2",
        "role": "Cualquier posición"
      },
      {
        "team": "ÉLITE FC",
        "name": "Carmona",
        "number": "10",
        "role": "Cualquier posición"
      },
      {
        "team": "ÉLITE FC",
        "name": "Castro M.",
        "number": "14",
        "role": "Cualquier posición"
      },
      {
        "team": "ÉLITE FC",
        "name": "Sanchez T.",
        "number": "15",
        "role": "Cualquier posición"
      },
      {
        "team": "ÉLITE FC",
        "name": "Ladino",
        "number": "8",
        "role": "Cualquier posición"
      },
      {
        "team": "ÉLITE FC",
        "name": "Muñoz P.",
        "number": "17",
        "role": "Cualquier posición"
      },
      {
        "team": "ÉLITE FC",
        "name": "Soto A.",
        "number": "5",
        "role": "Cualquier posición"
      }
    ]
  }
};

export const INITIAL_JUGADORES_MASC = INITIAL_SEED_DATA.masculino.jugadores;
