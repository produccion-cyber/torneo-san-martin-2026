import { normStr } from '../utils/shields';

export interface RecuerdoItem {
  id: number;
  isVideo: boolean;
  videoUrl?: string;
  videoId?: string;
  src: string;
  title: string;
  category: 'masculino' | 'femenino' | 'torneo';
  jornada: string;
  date: string;
  partido: string;
  teamHint: string;
  description: string;
}

const EXAMPLE_PLACEHOLDER_FILES = new Set([
  'foto1.jpg',
  'foto_admin.jpg',
  'foto_inaugural.jpg',
  'festejo_gol.jpg',
  'foto_probioticos.jpg',
  'foto_milla.jpg',
  'foto_femenino_j2.jpg'
]);

function detectCategoryAndTeamFromText(textStr: string): { category: 'masculino' | 'femenino' | 'torneo'; teamHint: string } {
  const n = normStr(textStr);
  const mascTeams = ['BAYERN MUU FC', 'ADMIN UNITED FC', 'REAL SAN MARTIN FC', 'ULTIMA MILLA FC', 'LOS PROBIÓTICOS FC'];
  const femTeams = ['MONARCA FC', 'INTER LÁCTEOS FC', 'ÉLITE FC'];

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

function extractYouTubeId(url: string): string {
  if (!url) return '';
  const clean = url.trim();
  const match = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
  if (match) return match[1];
  if (/^[\w-]{11}$/.test(clean)) return clean;
  return '';
}

export function parseNotasRecuerdosText(rawText: string): RecuerdoItem[] {
  if (!rawText || !rawText.trim()) return [];

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
  const items: RecuerdoItem[] = [];
  let currentJornada = '';
  let currentSectionCategory: 'masculino' | 'femenino' | 'torneo' | '' = '';
  let currentFecha = '';
  let currentPartido = '';

  lines.forEach(line => {
    const trimmed = line.replace(/^\uFEFF/, '').trim();
    if (!trimmed || trimmed.startsWith('#') || /^={5,}$/.test(trimmed)) return;

    const sectionMatch = trimmed.match(/^\[\s*([^\]]+?)\s*\]/);
    if (sectionMatch) {
      const rawHeader = sectionMatch[1].trim().toUpperCase();
      const normHeader = normStr(rawHeader);
      currentPartido = '';
      currentFecha = '';

      if (normHeader.includes('TORNEO')) {
        currentSectionCategory = 'torneo';
        currentJornada = 'TORNEO';
      } else if (normHeader.includes('FEMENIN')) {
        currentSectionCategory = 'femenino';
        currentJornada = rawHeader;
      } else if (normHeader.includes('MASCULIN')) {
        currentSectionCategory = 'masculino';
        currentJornada = rawHeader;
      } else {
        currentSectionCategory = '';
        currentJornada = rawHeader;
      }
      return;
    }

    if (/^FECHA\s*:/i.test(trimmed)) {
      currentFecha = trimmed.replace(/^FECHA\s*:/i, '').trim();
      return;
    }

    if (/^PARTIDO\s*:/i.test(trimmed)) {
      if (currentSectionCategory !== 'torneo') {
        currentPartido = trimmed.replace(/^PARTIDO\s*:/i, '').trim();
      }
      return;
    }

    if (/^(?:VIDEO|VÍDEO)\s*:/i.test(trimmed)) {
      const content = trimmed.replace(/^(?:VIDEO|VÍDEO)\s*:/i, '').trim();
      if (!content) return;
      const pipeIdx = content.indexOf('|');
      const videoRawUrl = (pipeIdx !== -1 ? content.substring(0, pipeIdx) : content).trim();
      const afterPipe = pipeIdx !== -1 ? content.substring(pipeIdx + 1).trim() : '';
      if (!videoRawUrl) return;

      const ytId = extractYouTubeId(videoRawUrl);
      const subParts = afterPipe ? afterPipe.split('|').map(p => p.trim()) : [];
      const title = subParts[0] || 'MOMENTOS DEL TORNEO';
      const desc = subParts[1] || '';
      const thumb = ytId
        ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
        : 'img/TOROS ICONO DEL TORNEO.jpg';

      if (currentSectionCategory === 'torneo') {
        items.push({
          id: items.length + 1,
          isVideo: true,
          videoUrl: videoRawUrl,
          videoId: ytId,
          src: thumb,
          title,
          category: 'torneo',
          jornada: 'TORNEO',
          date: currentFecha,
          partido: '',
          teamHint: '',
          description: desc || title
        });
        return;
      }

      const titleDetected = detectCategoryAndTeamFromText(title);
      const combinedContext = `${title} ${currentPartido} ${desc}`;
      const fullDetected = detectCategoryAndTeamFromText(combinedContext);
      const category = currentSectionCategory || (titleDetected.teamHint ? titleDetected.category : fullDetected.category);
      const teamHint = titleDetected.teamHint || fullDetected.teamHint;

      let displayPartido = currentPartido;
      if (/vs\s*$/i.test(displayPartido) && teamHint && !normStr(displayPartido).includes(normStr(teamHint))) {
        displayPartido = `${displayPartido.replace(/vs\s*$/i, 'vs')} ${teamHint}`;
      }

      items.push({
        id: items.length + 1,
        isVideo: true,
        videoUrl: videoRawUrl,
        videoId: ytId,
        src: thumb,
        title,
        category,
        jornada: currentJornada || 'JORNADA OFICIAL',
        date: currentFecha,
        partido: displayPartido,
        teamHint,
        description: desc || (displayPartido ? `Encuentro oficial: ${displayPartido}` : '')
      });
      return;
    }

    if (/^FOTO\s*:/i.test(trimmed)) {
      const content = trimmed.replace(/^FOTO\s*:/i, '').trim();
      if (!content) return;
      const parts = content.split('|').map(p => p.trim());
      const fileName = parts[0];
      if (!fileName || EXAMPLE_PLACEHOLDER_FILES.has(fileName.toLowerCase())) return;

      const title = parts[1] || 'Recuerdo del Torneo';
      const desc = parts[2] || '';
      const src = fileName.startsWith('img/') ? fileName : `img/recuerdos/${fileName}`;

      if (currentSectionCategory === 'torneo') {
        items.push({
          id: items.length + 1,
          isVideo: false,
          src,
          title,
          category: 'torneo',
          jornada: 'TORNEO',
          date: currentFecha,
          partido: '',
          teamHint: '',
          description: desc || title
        });
        return;
      }

      const titleDetected = detectCategoryAndTeamFromText(title);
      const combinedContext = `${title} ${currentPartido} ${desc}`;
      const fullDetected = detectCategoryAndTeamFromText(combinedContext);
      const category = currentSectionCategory || (titleDetected.teamHint ? titleDetected.category : fullDetected.category);
      const teamHint = titleDetected.teamHint || fullDetected.teamHint;

      let displayPartido = currentPartido;
      if (/vs\s*$/i.test(displayPartido) && teamHint && !normStr(displayPartido).includes(normStr(teamHint))) {
        displayPartido = `${displayPartido.replace(/vs\s*$/i, 'vs')} ${teamHint}`;
      }

      items.push({
        id: items.length + 1,
        isVideo: false,
        src,
        title,
        category,
        jornada: currentJornada || 'JORNADA OFICIAL',
        date: currentFecha,
        partido: displayPartido,
        teamHint,
        description: desc || (displayPartido ? `Encuentro oficial: ${displayPartido}` : '')
      });
    }
  });

  return items;
}

export const INITIAL_RECUERDOS: RecuerdoItem[] = [
  {
    id: 1,
    isVideo: false,
    src: 'img/recuerdos/DSC02718.jpg',
    title: 'NÓMINA COMPLETA ADMIN UNITED FC',
    category: 'masculino',
    jornada: 'JORNADA 1',
    date: '3 de octubre de 2026',
    partido: 'REAL SAN MARTIN FC vs ADMIN UNITED FC',
    teamHint: 'ADMIN UNITED FC',
    description: 'Encuentro oficial: REAL SAN MARTIN FC vs ADMIN UNITED FC'
  },
  {
    id: 2,
    isVideo: false,
    src: 'img/recuerdos/DSC02728.jpg',
    title: 'NÓMINA COMPLETA REAL SAN MARTIN FC',
    category: 'masculino',
    jornada: 'JORNADA 1',
    date: '3 de octubre de 2026',
    partido: 'REAL SAN MARTIN FC vs ADMIN UNITED FC',
    teamHint: 'REAL SAN MARTIN FC',
    description: 'Encuentro oficial: REAL SAN MARTIN FC vs ADMIN UNITED FC'
  },
  {
    id: 3,
    isVideo: false,
    src: 'img/recuerdos/DSC02735.jpg',
    title: 'NÓMINA COMPLETA ULTIMA MILLA FC',
    category: 'masculino',
    jornada: 'JORNADA 1',
    date: '3 de octubre de 2026',
    partido: 'LOS PROBIÓTICOS FC vs ULTIMA MILLA FC',
    teamHint: 'ULTIMA MILLA FC',
    description: 'Encuentro oficial: LOS PROBIÓTICOS FC vs ULTIMA MILLA FC'
  },
  {
    id: 4,
    isVideo: false,
    src: 'img/recuerdos/DSC02742.jpg',
    title: 'NÓMINA COMPLETA LOS PROBIÓTICOS FC',
    category: 'masculino',
    jornada: 'JORNADA 1',
    date: '3 de octubre de 2026',
    partido: 'LOS PROBIÓTICOS FC vs ULTIMA MILLA FC',
    teamHint: 'LOS PROBIÓTICOS FC',
    description: 'Encuentro oficial: LOS PROBIÓTICOS FC vs ULTIMA MILLA FC'
  },
  {
    id: 5,
    isVideo: false,
    src: 'img/recuerdos/DSC03001.jpg',
    title: 'NÓMINA COMPLETA BAYERN MUU FC',
    category: 'masculino',
    jornada: 'JORNADA 1',
    date: '3 de octubre de 2026',
    partido: 'REAL SAN MARTIN FC vs BAYERN MUU FC',
    teamHint: 'BAYERN MUU FC',
    description: 'Encuentro oficial: REAL SAN MARTIN FC vs BAYERN MUU FC'
  },
  {
    id: 6,
    isVideo: false,
    src: 'img/recuerdos/PLANTILLA EQUIPOS MASCULINO.png',
    title: 'PLANTILLA 5 EQUIPOS TORNEO MASCULINO',
    category: 'torneo',
    jornada: 'TORNEO',
    date: '3 de octubre de 2026',
    partido: '',
    teamHint: '',
    description: 'PLANTILLA 5 EQUIPOS TORNEO MASCULINO'
  },
  {
    id: 7,
    isVideo: false,
    src: 'img/recuerdos/PLANTILLA EQUIPOS FEMENINA.png',
    title: 'PLANTILLA 3 EQUIPOS TORNEO FEMENINO',
    category: 'torneo',
    jornada: 'TORNEO',
    date: '3 de octubre de 2026',
    partido: '',
    teamHint: '',
    description: 'PLANTILLA 3 EQUIPOS TORNEO FEMENINO'
  },
  {
    id: 8,
    isVideo: false,
    src: 'img/recuerdos/DSC02804.jpg',
    title: 'REGISTRO DE INFORMACIÓN',
    category: 'torneo',
    jornada: 'TORNEO',
    date: '3 de octubre de 2026',
    partido: '',
    teamHint: '',
    description: 'REGISTRO DE INFORMACIÓN'
  },
  {
    id: 9,
    isVideo: false,
    src: 'img/recuerdos/DSC03026.jpg',
    title: 'MOMENTOS',
    category: 'torneo',
    jornada: 'TORNEO',
    date: '3 de octubre de 2026',
    partido: '',
    teamHint: '',
    description: 'MOMENTOS'
  },
  {
    id: 10,
    isVideo: false,
    src: 'img/recuerdos/DSC02682.jpg',
    title: 'MOMENTOS',
    category: 'torneo',
    jornada: 'TORNEO',
    date: '3 de octubre de 2026',
    partido: '',
    teamHint: '',
    description: 'MOMENTOS'
  },
  {
    id: 11,
    isVideo: false,
    src: 'img/recuerdos/DSC02800.jpg',
    title: 'MARIO Y SUS MÚSCULOS',
    category: 'torneo',
    jornada: 'TORNEO',
    date: '3 de octubre de 2026',
    partido: '',
    teamHint: '',
    description: 'MARIO Y SUS MÚSCULOS'
  },
  {
    id: 12,
    isVideo: false,
    src: 'img/recuerdos/DSC02653.jpg',
    title: 'EL DE SEGURIDAD Y SUS HAZAÑAS',
    category: 'torneo',
    jornada: 'TORNEO',
    date: '3 de octubre de 2026',
    partido: '',
    teamHint: '',
    description: 'EL DE SEGURIDAD Y SUS HAZAÑAS'
  },
  {
    id: 13,
    isVideo: false,
    src: 'img/recuerdos/IMG_8625.jpg',
    title: 'NÓMINA COMPLETA INTER LÁCTEOS FC',
    category: 'femenino',
    jornada: 'JORNADA 1',
    date: '3 de octubre de 2026',
    partido: 'MONARCAS FC vs INTER LÁCTEOS FC',
    teamHint: 'INTER LÁCTEOS FC',
    description: 'Encuentro oficial: MONARCAS FC vs INTER LÁCTEOS FC'
  },
  {
    id: 14,
    isVideo: false,
    src: 'img/recuerdos/IMG_8628.jpg',
    title: 'NÓMINA COMPLETA MONARCAS FC',
    category: 'femenino',
    jornada: 'JORNADA 1',
    date: '3 de octubre de 2026',
    partido: 'MONARCAS FC vs INTER LÁCTEOS FC',
    teamHint: 'MONARCA FC',
    description: 'Encuentro oficial: MONARCAS FC vs INTER LÁCTEOS FC'
  }
];
