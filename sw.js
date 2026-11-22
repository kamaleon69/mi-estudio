// Guarda solo la "carcasa" de la app para que abra rápido y sin conexión.
// Nunca guarda llamadas a Moodle ni a Google.
const CACHE = 'mi-estudio-v12';
const SHELL = ['./', './index.html', './manifest.json', './ai-providers.js', './device.js', './ayuda/instalar-zen.html', './ayuda/activar-extension.html', './privacidad.html', './task-autofill.js', './task-document.js', './reminders-core.js', './reminders-store.js', './reminders-client.js', './notifications-config.json', './notificaciones/configurar.html', './ayuda/01-descomprimir.svg', './ayuda/02-desarrollador.svg', './ayuda/03-cargar-carpeta.svg', './ayuda/04-firefox-temporal.svg', './ayuda/05-firefox-permanente.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // Red primero (para recibir actualizaciones), caché si no hay conexión
  e.respondWith(
    fetch(e.request, {cache: 'no-cache'}).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});

// Push real: el servicio remoto despierta el service worker aunque la app esté cerrada.
importScripts('reminders-core.js','reminders-store.js');
self.addEventListener('push',event=>{
 event.waitUntil((async()=>{
  let data;try{data=event.data?.json()||{};}catch{data={};}
  const scopeURL=new URL(self.registration.scope);let url=scopeURL.href;
  try{const candidate=new URL(data.url||url);if(candidate.origin===scopeURL.origin&&candidate.pathname.startsWith(scopeURL.pathname))url=candidate.href;}catch{}
  await self.registration.showNotification(String(data.title||'Mi Estudio · aviso').slice(0,150),{body:String(data.body||'Tienes una tarea pendiente.').slice(0,500),icon:new URL('icon-192.png',scopeURL).href,badge:new URL('icon-192.png',scopeURL).href,tag:String(data.tag||'mi-estudio-aviso').slice(0,300),data:{url,taskId:String(data.taskId||'').slice(0,200)}});
 })());
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();event.waitUntil((async()=>{
  const data=event.notification.data||{},windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  const window=windows.find(client=>client.url.startsWith(self.registration.scope));
  if(window){await window.focus();window.postMessage({type:'OPEN_REMINDER_TASK',taskId:data.taskId});}
  else await self.clients.openWindow(data.url||self.registration.scope);
 })());
});
self.addEventListener('pushsubscriptionchange',event=>{
 event.waitUntil((async()=>{
  const config=await MiEstudioReminderStore.get();if(!config.enabled||!config.serviceUrl||!config.token)return;
  const key=Uint8Array.from(atob(config.publicKey.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
  const subscription=event.newSubscription||await self.registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key});
  const response=await fetch(MiEstudioReminders.serviceURL(config.serviceUrl)+'/v1/devices/'+config.id+'/subscription',{method:'PUT',headers:{'content-type':'application/json',Authorization:'Bearer '+config.token},body:JSON.stringify({subscription:subscription.toJSON()}),signal:AbortSignal.timeout(12000)});
  if(!response.ok)throw new Error('No se pudo renovar la suscripción push ('+response.status+').');
 })());
});
