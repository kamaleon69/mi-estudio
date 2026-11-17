// Puente entre la web de Mi Estudio y la extensión. Solo reenvía mensajes; no lee nada de la página.
const api = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;
const VERSION = api.runtime.getManifest().version;
const hello = () => window.postMessage({type: 'MS_EXT_HERE', version: VERSION}, '*');
hello();
document.addEventListener('DOMContentLoaded', hello);
window.addEventListener('message', e => {
  if(e.source !== window || !e.data || typeof e.data.type !== 'string') return;
  if(e.data.type === 'MS_EXT_PING') hello();
  if(e.data.type === 'MS_EXT_KEYS') api.runtime.sendMessage({type: 'keys', claudeKey: e.data.claudeKey, claudeModel: e.data.claudeModel, geminiKey: e.data.geminiKey, geminiModel: e.data.geminiModel, aiProvider: e.data.aiProvider});
  if(e.data.type === 'MS_EXT_OPEN_ELEC' && /^https:\/\/[^/]*electude\.eu\//.test(e.data.url || '')) api.runtime.sendMessage({type: 'openElec', url: e.data.url});
  if(e.data.type === 'MS_EXT_CAPTURE') api.runtime.sendMessage({type: 'capture'});
  if(e.data.type === 'MS_EXT_SYNC') api.runtime.sendMessage({type: 'sync', what: e.data.what, moodleUrl: e.data.moodleUrl, classroomBase: e.data.classroomBase, classroomUrl: e.data.classroomUrl, from: e.data.from});
});
api.runtime.onMessage.addListener(m => { if(m && typeof m.type === 'string' && m.type.startsWith('MS_')) window.postMessage(m, '*'); });
