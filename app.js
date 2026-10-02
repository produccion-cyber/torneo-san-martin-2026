/* TORNEO SAN MARTÍN 2026 — datos en vivo desde Google Sheets */
const CONFIG={
  masculino:{
    nombre:'MASCULINO',
    id:'1mCMBHkh_Kg98IdgbKu8fPpqh8it_OCAn_aqA2BDSE1E',
    hojas:{calendario:'CALENDARIO',resultados:'RESULTADOS',tabla:'TABLA_POSICIONES',jugadores:'JUGADORES'}
  },
  femenino:{
    nombre:'FEMENINO',
    id:'1YgQ8hXwvrV8tDmQtzRgrdDinkAM8U9coaxXuBe7JqHM',
    hojas:{calendario:'CALENDARIO',resultados:'RESULTADOS',tabla:'TABLA_POSICIONES',jugadores:'JUGADORES'}
  }
};
let DATA={};let cat='masculino';let requestToken=0;
const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
function initials(n){return (n||'SM').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()}
function fmtDate(d){if(!d)return 'Fecha por definir';if(/^\d{2}\/\d{2}\/\d{4}$/.test(String(d)))return d;const m=String(d).match(/Date\((\d+),(\d+),(\d+)/);if(m)return `${String(+m[3]).padStart(2,'0')}/${String(+m[2]+1).padStart(2,'0')}/${m[1]}`;return String(d)}
function clean(v){return v==null?'':String(v).trim()}
function num(v){if(v==null||v==='')return 0;const n=Number(String(v).replace(',','.'));return Number.isFinite(n)?n:0}
function parseDate(v,f){return clean(f)||clean(v)}
function loadSheet(spreadsheetId,sheetName){
  return new Promise((resolve,reject)=>{
    const cb='gsCallback_'+Date.now()+'_'+Math.random().toString(36).slice(2);
    const script=document.createElement('script');
    const timer=setTimeout(()=>{cleanup();reject(new Error('Tiempo de espera al cargar '+sheetName));},15000);
    function cleanup(){clearTimeout(timer);delete window[cb];script.remove()}
    window[cb]=data=>{cleanup();if(!data||data.status!=='ok'){reject(new Error('No se pudo leer '+sheetName));return}resolve(data.table||{cols:[],rows:[]})};
    script.onerror=()=>{cleanup();reject(new Error('No se pudo conectar con '+sheetName))};
    const url='https://docs.google.com/spreadsheets/d/'+encodeURIComponent(spreadsheetId)+'/gviz/tq?tqx='+encodeURIComponent('responseHandler:'+cb)+'&sheet='+encodeURIComponent(sheetName)+'&headers=1';
    script.src=url;document.head.appendChild(script);
  });
}
function tableRows(table){return (table.rows||[]).map(r=>(r.c||[]).map(c=>c?((c.f!==undefined&&c.f!==null&&c.f!=='')?c.f:c.v):''));}
function buildData(calTable,resTable,tabTable,jugTable){
  const cal=tableRows(calTable).map(r=>({round:num(r[0]),match:num(r[1]),date:parseDate(r[2],r[2]),time:clean(r[3]),home:clean(r[5]),away:clean(r[7]),venue:clean(r[8]),score:clean(r[9])||'-',note:clean(r[10])})).filter(x=>x.match||x.home||x.away||x.note);
  const results=tableRows(resTable).map(r=>({round:num(r[0]),match:num(r[1]),date:parseDate(r[2],r[2]),home:clean(r[3]),away:clean(r[4]),homeGoals:r[5]===''?null:num(r[5]),awayGoals:r[6]===''?null:num(r[6]),status:clean(r[7]),winner:clean(r[8]),note:clean(r[9])})).filter(x=>x.match||x.home||x.away||x.note);
  const standings=tableRows(tabTable).map(r=>({pos:r[0]===''?null:num(r[0]),code:r[1]===''?null:num(r[1]),team:clean(r[2]),pj:num(r[3]),pg:num(r[4]),pe:num(r[5]),pp:num(r[6]),gf:num(r[7]),gc:num(r[8]),dg:num(r[9]),pts:num(r[10]),pct:num(r[11]),form:clean(r[12]),state:clean(r[13])})).filter(x=>x.team);
  const players=tableRows(jugTable).slice(8).map(r=>({match:num(r[0]),round:num(r[1]),date:parseDate(r[2],r[2]),team:clean(r[3]),rival:clean(r[4]),name:clean(r[5]),number:clean(r[6]),role:clean(r[7]),goals:num(r[8]),assists:num(r[9]),yellow:num(r[10]),red:num(r[11])})).filter(x=>x.name&&x.team);
  const teamMap=new Map();standings.forEach(x=>{if(x.code!=null)teamMap.set(String(x.code),x.team)});cal.forEach(x=>{if(x.home&&!standings.some(s=>s.team===x.home))standings.push({team:x.home,code:null,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,dg:0,pts:0,pct:0})});
  const teams=[...new Map(standings.filter(x=>x.team).map(x=>[x.team,{code:x.code,name:x.team}])).values()];
  return {schedule:cal,results,standings,players,teams,updated:new Date()};
}
async function loadLive(){
  const token=++requestToken;const cfg=CONFIG[cat];
  setLoading(true);
  try{const [cal,res,tab,jug]=await Promise.all([loadSheet(cfg.id,cfg.hojas.calendario),loadSheet(cfg.id,cfg.hojas.resultados),loadSheet(cfg.id,cfg.hojas.tabla),loadSheet(cfg.id,cfg.hojas.jugadores)]);if(token!==requestToken)return;DATA[cat]=buildData(cal,res,tab,jug);render();setLoading(false)}catch(e){console.error(e);setLoading(false);showError('No se pudieron actualizar los datos desde Google Sheets. Revisa que el archivo esté compartido para cualquier usuario con el vínculo.');}
}
function setLoading(on){const p=$('#statusPill');if(p)p.textContent=on?'ACTUALIZANDO…':(DATA[cat]?'EN VIVO':'SIN DATOS')}
function showError(msg){const el=$('#liveError');if(el){el.textContent=msg;el.hidden=false}}
function getData(){return DATA[cat]||{results:[],schedule:[],standings:[],players:[],teams:[]}}
function render(){const d=getData();$('#liveError').hidden=true;const played=d.results.filter(x=>x.status.toLowerCase()==='jugado').length;const pending=d.results.filter(x=>x.status.toLowerCase()!=='jugado').length;const goals=d.results.reduce((s,x)=>s+(x.homeGoals==null?0:x.homeGoals)+(x.awayGoals==null?0:x.awayGoals),0);$('#played').textContent=played;$('#pending').textContent=pending;$('#goals').textContent=goals;$('#statusPill').textContent=played?'EN VIVO':'PRÓXIMAMENTE';
 const upcoming=d.schedule.filter(x=>x.date&&x.home&&x.away&&(!x.score||x.score==='-'));const next=upcoming[0];$('#nextRound').textContent=next?`Jornada ${next.round}`:'';$('#nextMatch').innerHTML=next?matchHTML(next):'<p class="meta">No hay partidos próximos cargados.</p>';
 const latest=d.results.filter(x=>x.status.toLowerCase()==='jugado').slice(-4).reverse();$('#latest').innerHTML=latest.length?latest.map(x=>`<div class="result-row"><span>${x.home}</span><span class="result-score">${x.homeGoals} - ${x.awayGoals}</span><span class="away">${x.away}</span></div>`).join(''):'<p class="meta">Aún no hay resultados registrados.</p>';
 const sorted=[...d.standings].sort((a,b)=>{if(a.pj===0&&b.pj>0)return 1;if(a.pj>0&&b.pj===0)return -1;return (a.pos||99)-(b.pos||99)});$('#miniTable').innerHTML=sorted.map(x=>`<div class="result-row" style="grid-template-columns:32px 1fr 40px"><b>${x.pos||'—'}</b><span>${x.team}</span><b>${x.pts}</b></div>`).join('');
 renderSchedule();renderStandings();renderTeams();renderPlayers();}
function matchHTML(x){return `<div class="match"><div class="team"><div class="badge">${initials(x.home)}</div>${x.home||'Por definir'}</div><div><div class="score">${x.score&&x.score!=='-'?x.score:'VS'}</div><div class="vs">${fmtDate(x.date)}${x.time?' · '+x.time:''}</div></div><div class="team"><div class="badge">${initials(x.away)}</div>${x.away||'Por definir'}</div></div><div class="meta">${x.venue||'Cancha por definir'}${x.note?' · '+x.note:''}</div>`}
function renderSchedule(){const d=getData();const f=$('#roundFilter');const current=f.value||'all';f.innerHTML='<option value="all">Todas las jornadas</option>'+[...new Set(d.schedule.map(x=>x.round).filter(Boolean))].map(r=>`<option value="${r}">Jornada ${r}</option>`).join('');f.value=[...f.options].some(o=>o.value===current)?current:'all';const filter=f.value;const rows=d.schedule.filter(x=>filter==='all'||String(x.round)===filter);$('#scheduleTable').innerHTML=rows.map(x=>`<tr><td>${x.round||'—'}</td><td>#${x.match||'—'}</td><td>${fmtDate(x.date)}</td><td>${x.home||'Por definir'}</td><td><b>${x.score||'-'}</b></td><td>${x.away||'Por definir'}</td><td>${x.venue||'Por definir'}</td><td><span class="status ${x.score&&x.score!=='-'?'played':'pending'}">${x.score&&x.score!=='-'?'JUGADO':'PENDIENTE'}</span></td></tr>`).join('')}
function renderStandings(){const d=getData();const rows=[...d.standings].sort((a,b)=>{if(a.pj===0&&b.pj>0)return 1;if(a.pj>0&&b.pj===0)return -1;return (a.pos||99)-(b.pos||99)});$('#standingsTable').innerHTML=rows.map(x=>`<tr><td><b>${x.pos||'—'}</b></td><td><b>${x.team}</b></td><td>${x.pj}</td><td>${x.pg}</td><td>${x.pe}</td><td>${x.pp}</td><td>${x.gf}</td><td>${x.gc}</td><td>${x.dg}</td><td><b>${x.pts}</b></td><td>${x.pct?Math.round(x.pct*100)+'%':'0%'}</td></tr>`).join('')}
function renderTeams(){const d=getData();$('#teamGrid').innerHTML=d.teams.map(t=>{const s=d.standings.find(x=>x.team===t.name)||{};const players=d.players.filter(p=>p.team===t.name);return `<article class="team-card"><div class="team-logo">${initials(t.name)}</div><h3>${t.name}</h3><p>${t.code!=null?'Código '+t.code+' · ':''}${players.length} jugadores registrados</p><div class="team-stat"><span>PJ <b>${s.pj||0}</b></span><span>PTS <b>${s.pts||0}</b></span><span>DG <b>${s.dg||0}</b></span></div></article>`}).join('')}
function renderPlayers(){const d=getData();const f=$('#teamFilter');const current=f.value||'all';f.innerHTML='<option value="all">Todos los equipos</option>'+d.teams.map(t=>`<option>${t.name}</option>`).join('');f.value=[...f.options].some(o=>o.value===current)?current:'all';const ps=d.players.filter(p=>f.value==='all'||p.team===f.value);$('#playerGrid').innerHTML=ps.length?ps.map(p=>`<div class="player"><div class="number">${p.number||'—'}</div><div><b>${p.name}</b><small>${p.team}</small><small>${p.role||'Jugador'}</small></div></div>`).join(''):'<p class="meta">No hay jugadores registrados todavía.</p>'}
$$('.navbtn').forEach(b=>b.onclick=()=>{$$('.navbtn').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.section').forEach(x=>x.classList.remove('active'));$('#'+b.dataset.section).classList.add('active');window.scrollTo({top:0,behavior:'smooth'})});
$$('.cat').forEach(b=>b.onclick=()=>{$$('.cat').forEach(x=>x.classList.remove('active'));b.classList.add('active');cat=b.dataset.cat;loadLive()});
$('#roundFilter').onchange=renderSchedule;$('#teamFilter').onchange=renderPlayers;$$('[data-go]').forEach(b=>b.onclick=()=>{const n=b.dataset.go;$$('.navbtn').forEach(x=>x.classList.toggle('active',x.dataset.section===n));$$('.section').forEach(x=>x.classList.toggle('active',x.id===n));window.scrollTo({top:0,behavior:'smooth'})});
loadLive();setInterval(loadLive,120000);
