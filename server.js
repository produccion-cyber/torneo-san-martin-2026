import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const SHEETS_IDS = {
  masculino: '1mCMBHkh_Kg98IdgbKu8fPpqh8it_OCAn_aqA2BDSE1E',
  femenino: '1YgQ8hXwvrV8tDmQtzRgrdDinkAM8U9coaxXuBe7JqHM'
};
const HOJAS = ['CALENDARIO', 'RESULTADOS', 'TABLA_POSICIONES', 'JUGADORES'];

let cacheData = null;
let cacheTime = 0;
const CACHE_TTL_MS = 30000;

async function fetchGvizSheetMatrix(sheetId, sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&headers=0`;
  const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const text = await resp.text();
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
  if (!match) throw new Error('Invalid gviz format');
  const json = JSON.parse(match[1]);
  if (!json.table || !json.table.rows) return [];
  return json.table.rows.map(r =>
    (r.c || []).map(cell => {
      if (!cell) return '';
      if (cell.f !== undefined && cell.f !== null) return cell.f;
      if (cell.v !== undefined && cell.v !== null) return cell.v;
      return '';
    })
  );
}

app.get('/api/tournament-data', async (req, res) => {
  const now = Date.now();
  if (cacheData && (now - cacheTime < CACHE_TTL_MS)) {
    return res.json({ success: true, data: cacheData, cached: true });
  }

  try {
    const data = { masculino: {}, femenino: {} };
    await Promise.all(
      Object.entries(SHEETS_IDS).flatMap(([branch, id]) =>
        HOJAS.map(async hoja => {
          try {
            data[branch][hoja] = await fetchGvizSheetMatrix(id, hoja);
          } catch (e) {
            data[branch][hoja] = cacheData?.[branch]?.[hoja] || [];
          }
        })
      )
    );
    cacheData = data;
    cacheTime = now;
    res.json({ success: true, data });
  } catch (err) {
    if (cacheData) {
      return res.json({ success: true, data: cacheData, cached: true, stale: true });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use(express.static(__dirname));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
