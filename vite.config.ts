import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SHEETS_IDS = {
  masculino: '1mCMBHkh_Kg98IdgbKu8fPpqh8it_OCAn_aqA2BDSE1E',
  femenino: '1YgQ8hXwvrV8tDmQtzRgrdDinkAM8U9coaxXuBe7JqHM'
};
const HOJAS = ['CALENDARIO', 'RESULTADOS', 'TABLA_POSICIONES', 'JUGADORES'];

let cacheData: any = null;
let cacheTime = 0;
const CACHE_TTL_MS = 30000;

async function fetchGvizSheetMatrix(sheetId: string, sheetName: string) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&headers=0`;
  const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const text = await resp.text();
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
  if (!match) throw new Error('Invalid gviz format');
  const json = JSON.parse(match[1]);
  if (!json.table || !json.table.rows) return [];
  return json.table.rows.map((r: any) =>
    (r.c || []).map((cell: any) => {
      if (!cell) return '';
      if (cell.f !== undefined && cell.f !== null) return cell.f;
      if (cell.v !== undefined && cell.v !== null) return cell.v;
      return '';
    })
  );
}

function tournamentDataPlugin(): Plugin {
  return {
    name: 'tournament-data-proxy',
    configureServer(server) {
      server.middlewares.use('/api/tournament-data', async (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const now = Date.now();
        if (cacheData && now - cacheTime < CACHE_TTL_MS) {
          res.end(JSON.stringify({ success: true, data: cacheData, cached: true }));
          return;
        }

        try {
          const data: any = { masculino: {}, femenino: {} };
          await Promise.all(
            Object.entries(SHEETS_IDS).flatMap(([branch, id]) =>
              HOJAS.map(async hoja => {
                try {
                  data[branch][hoja] = await fetchGvizSheetMatrix(id, hoja);
                } catch {
                  data[branch][hoja] = cacheData?.[branch]?.[hoja] || [];
                }
              })
            )
          );
          cacheData = data;
          cacheTime = now;
          res.end(JSON.stringify({ success: true, data }));
        } catch (err: any) {
          if (cacheData) {
            res.end(JSON.stringify({ success: true, data: cacheData, cached: true, stale: true }));
            return;
          }
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), tournamentDataPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  }
});
