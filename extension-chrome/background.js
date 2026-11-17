// Mi Estudio · Sincronizar — abre Moodle/Classroom en una ventanita, lee tus tareas con tu sesión y se las pasa a la app.
const api = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;   // Chrome/Edge usan api.*, Zen/Firefox browser.*
const APP_URL = 'https://kamaleon69.github.io/mi-estudio/';
const NAME = {moodle: 'Moodle', classroom: 'Classroom'};
const sleep = ms => new Promise(r => setTimeout(r, ms));
const tell = (tabId, msg) => { try{ const p = api.tabs.sendMessage(tabId, msg); if(p && p.catch) p.catch(() => {}); }catch(e){} };
let busy = false;

api.runtime.onMessage.addListener((m, sender, reply) => {
  if(m && m.type === 'sync' && sender.tab) runSync(sender.tab.id, m);
  if(m && m.type === 'capture' && sender.tab) captureElectude(sender.tab.id);
  if(m && m.type === 'keys'){ const k = {}; for(const f of ['claudeKey', 'claudeModel', 'geminiKey', 'geminiModel', 'aiProvider']) if(typeof m[f] === 'string') k[f] = m[f].slice(0, 300); api.storage.local.set({ai: k}); }
  if(m && m.type === 'openApp'){ openAppTab('#cfg-ai'); }
  if(m && m.type === 'elecPrompt'){ reply({prompt: ELEC_PROMPT}); return; }
  if(m && m.type === 'checkUpdate'){ checkUpdate().then(reply); return true; }
  if(m && m.type === 'openUpdate'){ openAppTab('#ext-update'); }
  if(m && m.type === 'askPerm') api.tabs.create({url: api.runtime.getURL('perm.html')});
  if(m && m.type === 'openClaude' && typeof m.q === 'string') api.tabs.create({url: 'https://claude.ai/new?q=' + encodeURIComponent(m.q.slice(0, 6500))});
  if(m && m.type === 'openElec' && sender.tab) (async () => {
    const ts = (await api.tabs.query({url: 'https://*.electude.eu/*'})).sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0));
    if(ts[0]){ await api.tabs.update(ts[0].id, {active: true}); if(api.windows && api.windows.update) await api.windows.update(ts[0].windowId, {focused: true}); }
    else await api.tabs.create({url: m.url});
    tell(sender.tab.id, {type: 'MS_EXT_ELEC_OPENED', existing: !!ts[0]});
  })();
  if(m && (m.type === 'elecShot' || m.type === 'elecAsk') && sender.tab && /^https:\/\/[^/]*electude\.eu\//.test(sender.tab.url || '')){
    (m.type === 'elecShot' ? elecShot(sender.tab) : elecAsk(m)).then(reply, e => reply({error: e.message}));
    return true;
  }
});
// ---------- aviso de versión nueva (version.json en GitHub) ----------
const vLess = (a, b) => String(a || '0').localeCompare(String(b || '0'), undefined, {numeric: true}) < 0;
async function checkUpdate(){
  const mine = api.runtime.getManifest().version;
  try{
    const r = await fetch(APP_URL + 'version.json?t=' + Date.now(), {cache: 'no-store'}); if(!r.ok) return {mine};
    const v = await r.json(), latest = v && v.extension, newer = !!latest && vLess(mine, latest);
    try{ api.action.setBadgeText({text: newer ? 'NEW' : ''}); if(newer) api.action.setBadgeBackgroundColor({color: '#10b981'}); api.action.setTitle({title: newer ? 'Mi Estudio: hay una versión nueva (v' + latest + ')' : 'Mi Estudio (en Electude: ayuda IA)'}); }catch(e){}
    return {mine, latest, newer};
  }catch(e){ return {mine}; }
}
api.runtime.onInstalled.addListener(() => checkUpdate());
if(api.runtime.onStartup) api.runtime.onStartup.addListener(() => checkUpdate());
async function openAppTab(hash = ''){
  const [t] = await api.tabs.query({url: APP_URL + '*'});
  if(t){ await api.tabs.update(t.id, hash ? {active: true, url: APP_URL + hash} : {active: true}); if(api.windows && api.windows.update) await api.windows.update(t.windowId, {focused: true}); }
  else await api.tabs.create({url: APP_URL + hash});
}
// ---------- Ayuda IA en Electude ----------
async function elecShot(tab){
  let dataUrl;
  try{
    const [before] = await api.tabs.query({active: true, windowId: tab.windowId});
    if(!before || before.id !== tab.id || before.url !== tab.url) return {dataUrl: null, needActive: true};
    dataUrl = await api.tabs.captureVisibleTab(tab.windowId, {format: 'jpeg', quality: 85});
    const [after] = await api.tabs.query({active: true, windowId: tab.windowId});
    if(!after || after.id !== tab.id || after.url !== before.url) return {dataUrl: null, needActive: true};
  }
  catch(e){ return {dataUrl: null, needPerm: true}; }   // sin permiso de captura: se usa solo el texto
  // se reduce en tu ordenador antes de enviarla (sube más rápido)
  try{
    const bmp = await createImageBitmap(await (await fetch(dataUrl)).blob());
    const k = Math.min(1, 1100 / bmp.width);
    if(k < 1){
      const c = new OffscreenCanvas(Math.round(bmp.width * k), Math.round(bmp.height * k));
      c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
      const b = await c.convertToBlob({type: 'image/jpeg', quality: 0.72});
      const buf = new Uint8Array(await b.arrayBuffer()); let bin = '';
      for(let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
      dataUrl = 'data:image/jpeg;base64,' + btoa(bin);
    }
  }catch(e){}
  return {dataUrl};
}
const ELEC_PROMPT = `Eres un profesor de automoción y electricidad/electrónica que ayuda a entender una actividad de Electude.
Lee la teoría de ESTA página y la actividad activa. La teoría aporta evidencia; sus títulos y listas no son opciones de respuesta. Ten en cuenta negaciones, unidades, condiciones y el estado visible del dibujo. No presupongas el resultado de otras lecciones ni inventes datos que falten. Si la imagen o la información necesaria no están disponibles, indícalo y no adivines.
El texto empieza con un inventario de controles reales de la actividad, con identificadores. Estos IDs tienen prioridad sobre una interpretación visual: las opciones O son elecciones, las afirmaciones V son verdadero/falso y los campos C son valores o desplegables. No confundas varias casillas con una sola respuesta ni confundas la pareja verdadero/falso de cada fila con dos opciones independientes.
Devuelve texto sin Markdown ni código, en este formato:
ANÁLISIS: <resumen breve de la evidencia relevante, 1-3 frases, sin razonamiento paso a paso>
RESPUESTA: [O2]
Usa una línea RESPUESTA por opción elegida; una sola por grupo radio, varias si son casillas checkbox. Usa SOLO IDs O del inventario. Si no hay inventario de opciones, copia literalmente la opción del recuadro activo.
VF: [V1] => V | <justificación breve>
Usa una línea VF por CADA afirmación del inventario, sin omitir ni duplicar IDs; V significa verdadero y F falso. Si no hay inventario, copia literalmente la afirmación del recuadro activo.
CAMPO: C1 => <valor exacto>
Usa una línea CAMPO por CADA campo. En campos numéricos da solo el número, sin unidades, con punto decimal; comprueba las unidades que pide el enunciado. En desplegables usa el value de una de sus opciones, exactamente. En texto, da únicamente el texto que hay que escribir. No pongas comillas ni explicaciones en el valor.
Escribe SOLO los tipos de línea que correspondan a los controles de la actividad. No mezcles IDs con otros ejercicios ni inventes selectores. Revisa que todos los grupos, afirmaciones y campos tengan respuesta.
Para localizar piezas en el dibujo: PUNTO: <nombre> | x=<0-1000> y=<0-1000>, una línea por componente, en el orden pedido, coordenadas sobre la captura completa. Si falta la captura, no inventes puntos. Para una acción manual no representada por los controles: ACCIÓN: <instrucción concreta>.
FIABILIDAD: <ALTA, MEDIA o BAJA; usa BAJA si falta evidencia para contestar>
POR QUÉ: <explicación clara en 2-4 frases basada en la lección o en la imagen; si no hay apoyo explícito, di qué dato falta>.
Si no hay una actividad que responder, dilo en una frase y no produzcas líneas de respuesta.`;
const G_CHAIN = ['gemini-3.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-3.1-flash-lite'];
const G_PRECISE = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];
const THINK_OK = {};
// lee tus claves de IA de Mi Estudio (localStorage de la app) por si no llegaron solas
async function keysFromApp(){
  let [t] = await api.tabs.query({url: APP_URL + '*'}), tmp = null;
  try{
    if(!t){ tmp = await api.tabs.create({url: APP_URL, active: false}); await waitLoad(tmp.id, 15000); t = tmp; }
    const [r] = await api.scripting.executeScript({target: {tabId: t.id}, func: () => { try{ return JSON.parse(localStorage.getItem('me_cfg') || '{}'); }catch(e){ return {}; } }});
    const c = (r && r.result) || {}, k = {};
    for(const f of ['claudeKey', 'claudeModel', 'geminiKey', 'geminiModel', 'aiProvider']) if(typeof c[f] === 'string') k[f] = c[f].slice(0, 300);
    if(k.claudeKey || k.geminiKey) await api.storage.local.set({ai: k});
    return k;
  }catch(e){ return {}; }
  finally{ if(tmp) try{ await api.tabs.remove(tmp.id); }catch(e){} }
}
// El límite cubre también la lectura del cuerpo y el conjunto de alternativas.
async function aiRequest(url, options, timeout){
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), timeout);
  try{
    const r = await fetch(url, {...options, signal: controller.signal});
    const j = await r.json().catch(() => ({}));
    return {r, j};
  }catch(e){ return {r: {ok: false, status: 0}, j: {error: {message: e.name === 'AbortError' ? 'se agotó el tiempo de espera' : e.message}}}; }
  finally{ clearTimeout(timer); }
}
async function elecAsk(m){
  let {ai = {}} = await api.storage.local.get('ai');
  if(!ai.claudeKey && !ai.geminiKey) ai = await keysFromApp();
  const img = typeof m.image === 'string' && /^data:image\/jpeg;base64,/.test(m.image) ? m.image.split(',')[1] : null;
  const requirePrecise = m.requirePrecise === true;
  const precise = requirePrecise || m.mode !== 'fast';
  const P = ELEC_PROMPT + (precise ? '' : '\nSé conciso: conserva todos los IDs y da una justificación de una frase.');
  const text = P + '\n\n--- TEXTO DE LA PÁGINA ---\n' + String(m.text || '').slice(0, 16000);
  const useClaude = ai.claudeKey && (ai.aiProvider === 'claude' || !ai.geminiKey);
  if(!ai.claudeKey && !ai.geminiKey) return {error: 'Añade una clave de API de Gemini o Claude en Mi Estudio → Ajustes → Asistentes IA y abre la app para sincronizarla.', nokey: true, prompt: text.slice(0, 6500)};
  if(useClaude){
    const content = []; if(img) content.push({type: 'image', source: {type: 'base64', media_type: 'image/jpeg', data: img}}); content.push({type: 'text', text});
    const selected = ai.claudeModel || 'claude-sonnet-5-5';
    const model = precise ? (requirePrecise && /haiku/i.test(selected) ? 'claude-sonnet-5-5' : selected) : 'claude-haiku-5-5';
    const {r, j} = await aiRequest('https://api.anthropic.com/v1/messages', {method: 'POST', headers: {'content-type': 'application/json', 'x-api-key': ai.claudeKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true'}, body: JSON.stringify({model, max_tokens: precise ? 3000 : 1800, messages: [{role: 'user', content}]})}, 45000);
    if(!r.ok) return {error: 'Claude: ' + ((j.error && j.error.message) || r.status)};
    if(j.stop_reason === 'max_tokens') return {error: 'Claude devolvió una respuesta incompleta. Vuelve a analizarla.'};
    const output = (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n');
    return output.trim() ? {text: output, model, precise: precise && !/haiku/i.test(model)} : {error: 'Claude devolvió una respuesta vacía.'};
  }
  const parts = [{text}]; if(img) parts.push({inline_data: {mime_type: 'image/jpeg', data: img}});
  const chosen = (ai.geminiModel || G_CHAIN[0]).replace(/^models\//, '');
  const candidates = precise ? (/lite/.test(chosen) ? [...G_PRECISE, chosen, ...G_CHAIN] : [chosen, ...G_PRECISE, ...G_CHAIN]) : (/lite/.test(chosen) ? [chosen, ...G_CHAIN] : [...G_CHAIN, chosen]);
  const chain = requirePrecise ? candidates.filter(model => !/lite/i.test(model)) : candidates;
  const deadline = Date.now() + 50000;
  let last = '';
  for(const model of [...new Set(chain)]){
    const fast = /lite/.test(model);
    const thinkOpts = THINK_OK[model] !== undefined ? [THINK_OK[model]] : [{thinkingLevel: 'low'}, {thinkingBudget: fast ? 0 : 256}, null];
    let r, j;
    for(const th of thinkOpts){
      const remaining = deadline - Date.now();
      if(remaining < 500) return {error: 'Gemini: se agotó el tiempo de espera. ' + last};
      const generationConfig = {temperature: 0.1, maxOutputTokens: fast ? 1800 : 3000}; if(th) generationConfig.thinkingConfig = th;
      ({r, j} = await aiRequest('https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent', {method: 'POST', headers: {'content-type': 'application/json', 'x-goog-api-key': ai.geminiKey}, body: JSON.stringify({contents: [{role: 'user', parts}], generationConfig})}, Math.min(remaining, fast ? 18000 : 22000)));
      if(r.status === 400 && /think/i.test((j.error && j.error.message) || '')) continue;
      if(r.ok) THINK_OK[model] = th;
      break;
    }
    if(r.ok){
      const candidate = (j.candidates || [])[0] || {};
      if(candidate.finishReason === 'MAX_TOKENS'){ last = 'respuesta incompleta'; continue; }
      const output = ((candidate.content || {}).parts || []).filter(p => !p.thought).map(p => p.text || '').join('');
      if(output.trim()) return {text: output, model, precise: precise && !/lite/i.test(model)};
      last = 'respuesta vacía'; continue;
    }
    last = (j.error && j.error.message) || ('error ' + r.status);
    if(![0, 400, 404, 429, 500, 502, 503, 504].includes(r.status)) break;
  }
  return {error: 'Gemini: ' + last};
}
// Captura la pestaña de Electude (solo cuando el usuario lo pide) y la pasa al asistente de la app
const ELEC = 'https://*.electude.eu/*';
async function captureElectude(appTab, elecTab){
  try{
    if(!elecTab){ const ts = await api.tabs.query({url: ELEC}); elecTab = ts.sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0))[0]; }
    if(!elecTab){ tell(appTab, {type: 'MS_EXT_CAPERR', text: 'Abre Electude con el enunciado y vuelve a pulsar el botón'}); return; }
    await api.tabs.update(elecTab.id, {active: true});
    if(api.windows && api.windows.update) await api.windows.update(elecTab.windowId, {focused: true});
    await sleep(350);
    const dataUrl = await api.tabs.captureVisibleTab(elecTab.windowId, {format: 'jpeg', quality: 85});
    await api.tabs.update(appTab, {active: true});
    const t = await api.tabs.get(appTab); if(api.windows && api.windows.update) await api.windows.update(t.windowId, {focused: true});
    await sleep(150);
    tell(appTab, {type: 'MS_EXT_IMAGE', dataUrl});
  }catch(e){ tell(appTab, {type: 'MS_EXT_CAPERR', text: 'No se pudo capturar Electude: ' + e.message}); }
}
// Botón de la barra de Chrome: abre la app y sincroniza
api.action.onClicked.addListener(async (cur) => {
  const [t] = await api.tabs.query({url: APP_URL + '*'});
  // Estando en Electude: abre el panel de ayuda en la propia página y analiza la pregunta
  if(cur && /^https:\/\/[^/]*electude\.eu\//.test(cur.url || '')){
    try{ await api.tabs.sendMessage(cur.id, {type: 'MS_ELEC_OPEN', analyze: true}); }
    catch(e){ try{ await api.scripting.executeScript({target: {tabId: cur.id}, files: ['electude-core.js', 'electude.js']}); await sleep(200); await api.tabs.sendMessage(cur.id, {type: 'MS_ELEC_OPEN', analyze: true}); }catch(_){} }
    return;
  }
  if(t){ await api.tabs.update(t.id, {active: true}); if(api.windows && api.windows.update) await api.windows.update(t.windowId, {focused: true}); tell(t.id, {type: 'MS_EXT_START'}); }
  else api.tabs.create({url: APP_URL + '#autosync'});
});

async function tabNow(tabId){ try{ return await api.tabs.get(tabId); }catch(e){ return null; } }
async function waitLoad(tabId, ms = 30000){
  const t0 = Date.now();
  for(;;){ const t = await tabNow(tabId); if(!t) return null; if(t.status === 'complete') return t; if(Date.now() - t0 > ms) return t; await sleep(300); }
}
function readyUrl(src, url, m){
  try{
    const u = new URL(url);
    if(src === 'moodle') return u.origin === new URL(m.moodleUrl).origin && !/\/login\//.test(u.pathname) && !/\/auth\//.test(u.pathname);
    return u.hostname === 'classroom.google.com' && /\/a\/(not-turned-in|missing|turned-in)\//.test(u.pathname);
  }catch(e){ return false; }
}
async function runOne(tabId, appTab, src, url, m){
  tell(appTab, {type: 'MS_EXT_PROGRESS', text: 'Abriendo ' + NAME[src] + '…'});
  await api.tabs.update(tabId, {url});
  await sleep(600);
  let t = await waitLoad(tabId);
  // ¿Hace falta iniciar sesión? Se espera hasta 3 minutos a que el usuario entre en la ventanita.
  const t0 = Date.now(); let asked = false;
  while(t && !readyUrl(src, t.url, m)){
    const loading = !t.url || /^about:/.test(t.url) || t.status !== 'complete';
    if(!asked && ((!loading && Date.now() - t0 > 2500) || Date.now() - t0 > 8000)){ asked = true; tell(appTab, {type: 'MS_EXT_PROGRESS', text: 'Inicia sesión en ' + NAME[src] + ' en la ventana que se ha abierto…', login: true}); }
    if(Date.now() - t0 > 180000) return {src, error: 'No se inició sesión en ' + NAME[src] + ' a tiempo.'};
    await sleep(asked ? 1000 : 300); t = await tabNow(tabId);
    if(t && src === 'classroom' && t.url && /classroom\.google\.com/.test(t.url) && !/\/a\//.test(t.url) && t.status === 'complete'){ await api.tabs.update(tabId, {url}); await sleep(1500); }
  }
  if(!t) return {src, error: 'Se cerró la ventana de ' + NAME[src] + '.'};
  t = await waitLoad(tabId);
  if(src === 'classroom') await sleep(2500);
  if(src === 'moodle') await sleep(500);
  tell(appTab, {type: 'MS_EXT_PROGRESS', text: 'Leyendo tus tareas de ' + NAME[src] + '…'});
  await api.scripting.executeScript({target: {tabId}, world: 'MAIN', func: () => { window.__msResult = null; }});
  await api.scripting.executeScript({target: {tabId}, world: 'MAIN', func: __msSync, args: ['__RETURN__', {from: m.from || 0}]});
  for(let i = 0; i < 180; i++){
    await sleep(500);
    let r; try{ [r] = await api.scripting.executeScript({target: {tabId}, world: 'MAIN', func: () => window.__msResult || null}); }catch(e){ continue; }
    if(r && r.result) return Object.assign({src}, r.result);
  }
  return {src, error: 'Tiempo de espera agotado leyendo ' + NAME[src] + '.'};
}
async function runSync(appTab, m){
  if(busy){ tell(appTab, {type: 'MS_EXT_PROGRESS', text: 'Ya hay una sincronización en marcha…'}); return; }
  busy = true; let win = null;
  try{
    let tabId;
    if(api.windows && api.windows.create){
      try{ win = await api.windows.create({url: 'about:blank', type: 'popup', width: 520, height: 760, focused: true}); tabId = win.tabs[0].id; }catch(e){ win = null; }
    }
    if(!tabId){ const t = await api.tabs.create({url: 'about:blank', active: true}); tabId = t.id; win = {tabOnly: tabId}; }
    for(const src of (m.what || ['moodle', 'classroom'])){
      const url = src === 'moodle' ? m.moodleUrl.replace(/\/+$/, '') + '/my/' : (m.classroomUrl || m.classroomBase.replace(/\/+$/, '') + '/a/not-turned-in/all');
      let res; try{ res = await runOne(tabId, appTab, src, url, m); }catch(e){ res = {src, error: e.message}; }
      tell(appTab, {type: 'MS_EXT_RESULT', result: res});
    }
  }catch(e){ tell(appTab, {type: 'MS_EXT_RESULT', result: {error: e.message}}); }
  finally{
    if(win){ try{ if(win.tabOnly) await api.tabs.remove(win.tabOnly); else await api.windows.remove(win.id); }catch(e){} }
    busy = false; tell(appTab, {type: 'MS_EXT_DONE'});
    try{ const t = await api.tabs.get(appTab); await api.tabs.update(appTab, {active: true}); if(api.windows && api.windows.update) await api.windows.update(t.windowId, {focused: true}); }catch(e){}
  }
}

// ===== Código de lectura (copiado automáticamente de la app: es el mismo que usa el marcador) =====
function __msSync(APP, OPTS){
  (async () => {
    OPTS = OPTS || {};
    const SY = new Date(); const FROM = OPTS.from || new Date(SY.getMonth() >= 7 ? SY.getFullYear() : SY.getFullYear() - 1, 8, 1).getTime();
    const enc = d => btoa(unescape(encodeURIComponent(JSON.stringify(d)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const RET = APP === '__RETURN__';
    const say = m => { if(RET) window.__msResult = {error: m}; else alert(m); };
    const go = d => {
      if(RET){ window.__msResult = d; return; }
      const u = APP + '#sync=' + enc(d);
      if(!matchMedia('(pointer:coarse)').matches){ const w = window.open(u, 'miestudio'); if(!w) location.href = u; return; }
      /* Móvil: panel para elegir entre la app del navegador y la app instalada */
      const old = document.getElementById('__msPanel'); if(old) old.remove();
      const box = document.createElement('div'); box.id = '__msPanel';
      box.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;background:#1f3a5f;color:#fff;border-radius:16px;padding:16px;font:15px system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.45)';
      const title = document.createElement('div'); title.style.cssText = 'font-weight:700;margin-bottom:8px';
      title.textContent = '⚡ Mi Estudio: ' + d.tasks.length + ' tareas de ' + ({moodle: 'Moodle', classroom: 'Classroom', electude: 'Electude'}[d.src]) + ' listas';
      const mk = (label, bg) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.style.cssText = 'display:block;width:100%;margin:6px 0;padding:13px;border:0;border-radius:10px;font:600 15px system-ui,sans-serif;color:#fff;background:' + bg; return b; };
      const bCopy = mk('📋 Copiar para la app instalada', '#2f6fde'), bOpen = mk('🌐 Abrir en el navegador', '#4a5260'), bClose = mk('Cerrar', 'transparent');
      const info = document.createElement('div'); info.style.cssText = 'font-size:13px;opacity:.9;margin:4px 0';
      bCopy.onclick = async () => {
        try{ await navigator.clipboard.writeText(u); info.textContent = '✅ Copiado. Abre la app Mi Estudio y pulsa «📋 Pegar sincronización».'; }
        catch(e){ const ta = document.createElement('textarea'); ta.value = u; ta.readOnly = true; ta.style.cssText = 'width:100%;height:70px;color:#000;border-radius:8px'; box.insertBefore(ta, bClose); ta.focus(); ta.select(); info.textContent = 'Mantén pulsado el texto → Copiar. Después ábrelo en la app con «📋 Pegar sincronización».'; }
      };
      bOpen.onclick = () => { location.href = u; };
      bClose.onclick = () => box.remove();
      box.append(title, bCopy, bOpen, info, bClose); document.body.appendChild(box);
    };
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const prog = (txt) => { let b = document.getElementById('__msProg'); if(!b){ b = document.createElement('div'); b.id = '__msProg'; b.style.cssText = 'position:fixed;top:12px;right:12px;z-index:2147483647;background:#1f3a5f;color:#fff;padding:10px 14px;border-radius:10px;font:600 14px system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.35)'; document.body.appendChild(b); } b.textContent = '⚡ Mi Estudio: ' + txt; };
    const progDone = () => { const b = document.getElementById('__msProg'); if(b) b.remove(); };
    const MON = {gen:0,ene:0,jan:0,feb:1,febr:1,'març':2,marc:2,mar:2,abr:3,apr:3,maig:4,may:4,jun:5,juny:5,jul:6,ag:7,ago:7,aug:7,set:8,sep:8,sept:8,oct:9,nov:10,des:11,dic:11,dec:11};
    const parseDue = (txt) => {
      if(!txt) return null; const t = txt.toLowerCase();
      if(/publica|posted|publicad/.test(t)) return null;
      const now = new Date(); let d = null;
      if(/\b(avui|hoy|today)\b/.test(t)) d = new Date(now);
      else if(/\b(demà|dema|mañana|manana|tomorrow)\b/.test(t)){ d = new Date(now); d.setDate(d.getDate() + 1); }
      else if(/\b(ahir|ayer|yesterday)\b/.test(t)){ d = new Date(now); d.setDate(d.getDate() - 1); }
      else {
        const m = t.match(/(\d{1,2})\s*(?:de\s+|d['’]\s*)?([a-zçñ]+)/i);
        if(m){ const k = m[2].replace(/\.$/, ''); const mon = MON[k] ?? MON[k.slice(0,4)] ?? MON[k.slice(0,3)]; if(mon !== undefined){ d = new Date(now.getFullYear(), mon, +m[1]); const diff = d - now; if(diff > 180*864e5) d.setFullYear(d.getFullYear() - 1); if(diff < -180*864e5) d.setFullYear(d.getFullYear() + 1); } }
      }
      if(!d) return null;
      const tm = t.match(/(\d{1,2}):(\d{2})/); if(tm) d.setHours(+tm[1], +tm[2], 0, 0); else d.setHours(23, 59, 0, 0);
      return d.getTime();
    };
    const parseFull = (txt) => {
      const m = (txt || '').toLowerCase().match(/(\d{1,2})\s+(?:de\s+|d['’]\s*)?([a-zçñé]+)\.?,?\s+(?:de\s+)?(\d{4})(?:,?\s+(\d{1,2}):(\d{2})\s*(am|pm)?)?/);
      if(!m) return null; const k = m[2]; const mon = MON[k] ?? MON[k.slice(0,4)] ?? MON[k.slice(0,3)]; if(mon === undefined) return null;
      let hh = m[4] ? +m[4] : 23, mm = m[5] ? +m[5] : 59; if(m[6] === 'pm' && hh < 12) hh += 12; if(m[6] === 'am' && hh === 12) hh = 0;
      return new Date(+m[3], mon, +m[1], hh, mm).getTime();
    };
    try{
      const h = location.hostname;
      /* ---------- MOODLE ---------- */
      const sk = (window.M && M.cfg && M.cfg.sesskey) || ((document.documentElement.innerHTML.match(/"sesskey":"([^"]+)"/) || [])[1]);
      if(sk && window.M){
        const root = (M.cfg && M.cfg.wwwroot) || location.origin;
        const call = async (n, a) => { const r = await fetch(root + '/lib/ajax/service.php?sesskey=' + sk + '&info=' + n, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify([{index: 0, methodname: n, args: a}])}); const j = await r.json(); if(j[0].error) throw new Error((j[0].exception && j[0].exception.message) || n); return j[0].data; };
        const now = Math.floor(Date.now() / 1000);
        prog('leyendo tareas pendientes…');
        const ev = await call('core_calendar_get_action_events_by_timesort', {timesortfrom: Math.floor(FROM / 1000), limitnum: 50});
        let cs = {courses: []}; try{ cs = await call('core_course_get_enrolled_courses_by_timeline_classification', {classification: 'inprogress', limit: 0, offset: 0}); }catch(e){}
        const tasks = (ev.events || []).map(e => ({id: (String(e.url || '').match(/id=(\d+)/) || [])[1] || ('e' + e.id), title: e.activityname || e.name, course: e.course ? e.course.fullname : '', due: e.timesort * 1000, url: e.url || e.viewurl, kind: e.modulename, action: e.action ? e.action.name : '', late: !!e.overdue, status: e.overdue || e.timesort < now ? 'missing' : 'pending'}));
        const seen = new Set(tasks.map(t => String(t.id)));
        /* tareas entregadas / calificadas / no presentadas: estado de cada tarea del curso */
        const todo = [];
        for(const c of (cs.courses || [])){
          try{ const st = await call('core_courseformat_get_state', {courseid: c.id}); const S = typeof st === 'string' ? JSON.parse(st) : st;
            (S.cm || []).filter(m => m.module === 'assign' && m.uservisible !== false && !seen.has(String(m.id))).forEach(m => todo.push({cm: m, course: c.fullname})); }catch(e){}
        }
        let done = 0;
        const worker = async () => { for(;;){ const it = todo.shift(); if(!it) return; try{
          const html = await fetch(it.cm.url, {credentials: 'include'}).then(r => r.text());
          const d = new DOMParser().parseFromString(html, 'text/html');
          const sub = !!d.querySelector('td.submissionstatussubmitted, .submissionstatussubmitted');
          const graded = !!d.querySelector('td.submissiongraded, .submissiongraded');
          const overdue = !!d.querySelector('td.overdue, .overdue');
          let due = null;
          const dateLines = [...d.querySelectorAll('[data-region="activity-dates"] div, .activity-dates div, table.generaltable tr')].map(x => x.textContent.replace(/\s+/g, ' ').trim());
          for(const l of dateLines){ if(/venc|due|entrega|termini|límit|limit|cierre|tanca|closes/i.test(l) && !/pròrroga|prorroga|extension|ampliaci/i.test(l)){ const t = parseFull(l); if(t){ due = t; break; } } }
          let grade = '';
          d.querySelectorAll('table.generaltable td.cell.c1, table.generaltable td').forEach(td => { const t = td.textContent.trim(); if(!grade && /^-?\d+([.,]\d+)?\s*\/\s*\d+([.,]\d+)?$/.test(t)) grade = t.replace(/,00\b/g, '').replace(/\s+/g, ' '); });
          const status = graded ? 'graded' : sub ? 'submitted' : overdue ? 'missing' : 'pending';
          if(!(due && due < FROM)) tasks.push({id: it.cm.id, title: it.cm.name, course: it.course, due, url: it.cm.url, kind: 'assign', status, grade: graded ? grade : '', late: status === 'missing'});
        }catch(e){} done++; prog('leyendo tareas ' + done + '/' + total + '…'); } };
        const total = todo.length;
        await Promise.all([worker(), worker(), worker(), worker()]);
        progDone();
        return go({src: 'moodle', at: Date.now(), site: root, tasks,
          courses: (cs.courses || []).map(c => ({id: c.id, name: c.fullname, url: c.viewurl}))});
      }
      /* ---------- CLASSROOM ---------- */
      if(/(^|\.)classroom\.google\.com$/.test(h)){
        const u = (location.pathname.match(/^\/u\/\d+/) || [''])[0];
        const now = Date.now();
        const read = () => [...document.querySelectorAll('li')].filter(li => li.querySelector('a[href*="/details"]')).map(li => {
          const a = li.querySelector('a[href*="/details"]'), href = a.getAttribute('href');
          const leaves = [...li.querySelectorAll('*')].filter(e => !e.children.length && e.textContent.trim() && !/google-symbols|material-icons/.test(e.className)).map(e => e.textContent.trim());
          const rest = leaves.slice(2).join(' | ');
          const gm = rest.match(/(-?[\d.,]+)\s*(?:punts|puntos|points|punti|points?)\s*(?:de|of|di|sur)\s*([\d.,]+)/i);
          const turned = /lliurat|entregad|turned in|consegnat|remis/i.test(rest) && !/sense lliurar|sin entregar|missing|non consegnat/i.test(rest);
          const missingTxt = /sense lliurar|sin entregar|missing|non consegnat|non remis/i.test(rest);
          const dueTxt = leaves.slice(2).find(x => /\d|avui|demà|hoy|mañana|today|tomorrow|ahir|ayer/i.test(x) && !/punts|puntos|points|^\/|^\d+([.,]\d+)?$/i.test(x)) || '';
          const due = parseDue(dueTxt);
          const status = gm && !missingTxt ? 'graded' : turned ? 'submitted' : (missingTxt || (due && due < now)) ? 'missing' : 'pending';
          return {id: (href.match(/\/(?:a|sa|mc|q)\/([^/]+)/) || [])[1] || href, title: leaves[0] || '', course: leaves[1] || '', due, dueText: /publica|posted/i.test(dueTxt) ? '' : dueTxt, url: 'https://classroom.google.com' + href, kind: 'classroom', status, grade: gm ? gm[1] + '/' + gm[2] : '', late: status === 'missing'};
        });
        const waitFor = async (re) => { for(let i = 0; i < 30; i++){ if(re.test(location.pathname)) { await sleep(1800); return true; } await sleep(200); } return false; };
        const tab = re => [...document.querySelectorAll('a[href]')].find(x => re.test(x.getAttribute('href')));
        if(!/\/a\/(not-turned-in|missing|turned-in)\//.test(location.pathname)){
          const t = tab(/\/a\/not-turned-in\//); if(!t){ say('Mi Estudio: abre Classroom → «Pendientes» (menú de la izquierda) y pulsa el marcador allí.'); return; }
          t.click(); await waitFor(/not-turned-in/);
        }
        const all = [];
        for(const [re, label] of [[/\/a\/not-turned-in\//, 'asignadas'], [/\/a\/missing\//, 'sin entregar'], [/\/a\/turned-in\//, 'hechas']]){
          prog('leyendo ' + label + '…');
          if(!re.test(location.pathname)){ const t = tab(re); if(!t) continue; t.click(); await waitFor(re); }
          all.push(...read());
        }
        progDone();
        const rank = {graded: 4, submitted: 3, missing: 2, pending: 1}, byId = {};
        all.forEach(t => { const o = byId[t.id]; if(!o || rank[t.status] > rank[o.status]) byId[t.id] = t; });
        const tasks = Object.values(byId).filter(t => !(t.due && t.due < FROM));
        const acc = ([...document.querySelectorAll('[aria-label*="@"]')].map(e => (e.getAttribute('aria-label').match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/) || [])[0]).find(Boolean)) || '';
        const courses = [...document.querySelectorAll('a[href]')].filter(x => new RegExp('^' + u + '/c/[^/]+$').test(x.getAttribute('href'))).map(x => ({id: x.getAttribute('href').split('/c/')[1], name: (x.textContent || '').trim().replace(/^[A-Z]\s*/, ''), url: 'https://classroom.google.com' + x.getAttribute('href')})).filter((c, i, arr) => c.name && arr.findIndex(z => z.id === c.id) === i);
        return go({src: 'classroom', at: Date.now(), account: acc, tasks, courses});
      }
      /* ---------- ELECTUDE ---------- */
      if(/(^|\.)electude\./.test(h)){
        say('Mi Estudio: la sincronización de Electude todavía no está disponible.'); return;
      }
      say('Mi Estudio: abre Moodle, Classroom o Electude (con tu sesión iniciada) y pulsa este marcador allí.');
    }catch(e){ const b = document.getElementById('__msProg'); if(b) b.remove(); say('Mi Estudio: no se pudo sincronizar (' + e.message + ')'); }
  })();
}
