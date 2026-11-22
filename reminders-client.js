((scope)=>{
 'use strict';
 const R=scope.MiEstudioReminders,decode=value=>Uint8Array.from(atob(value.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
 class Client{
  constructor({storage=scope.MiEstudioReminderStore,fetcher=(...a)=>scope.fetch(...a),navigator=scope.navigator,notification=scope.Notification,getTasks=()=>[],onState=()=>{}}={}){Object.assign(this,{storage,fetcher,navigator,notification,getTasks,onState});this.device={};this.publicConfig=null;this.timer=null;this.syncing=false;this.again=false;}
  state(extra={}){this.onState({enabled:!!this.device.enabled,serviceUrl:this.device.serviceUrl||'',ready:!!this.publicConfig,supported:!!(this.notification&&this.navigator?.serviceWorker&&scope.PushManager),scheduled:this.device.scheduled||0,lastSync:this.device.lastSync||0,...extra});}
  async request(path,{method='GET',body,auth=true}={}){
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
   try{const response=await this.fetcher(this.device.serviceUrl+path,{method,headers:{'content-type':'application/json',...(auth&&this.device.token?{Authorization:'Bearer '+this.device.token}:{})},...(body?{body:JSON.stringify(body)}:{}),signal:controller.signal,cache:'no-store'});const value=response.status===204?{}:await response.json();if(!response.ok)throw new Error(value.error||'Error del servicio de avisos ('+response.status+').');return value;}finally{clearTimeout(timer);}
  }
  async init(){
   this.device=await this.storage.get();
   if(!this.device.serviceUrl){try{const r=await this.fetcher('notifications-config.json',{cache:'no-store'});this.device.serviceUrl=R.serviceURL((await r.json()).serviceUrl);}catch{}}
   if(this.device.serviceUrl)try{await this.loadConfig();}catch(error){this.state({error:error.message});return;}
   this.state();if(this.device.enabled)await this.syncNow();
  }
  async loadConfig(){const config=await this.request('/v1/config',{auth:false});if(decode(config.publicKey||'').length!==65||config.hours!==8)throw new Error('El servicio no devuelve una configuración de avisos válida.');this.publicConfig=config;this.state();}
  async setService(value){const url=R.serviceURL(value);if(url===this.device.serviceUrl){await this.loadConfig();return;}if(this.device.enabled)await this.disable();this.publicConfig=null;this.device={serviceUrl:url,enabled:false};await this.storage.set(this.device);if(url)await this.loadConfig();this.state();}
  async registration(){let timer;try{return await Promise.race([this.navigator.serviceWorker.ready,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('No se pudo iniciar la app para recibir avisos. Recarga la página con conexión.')),10000);})]);}finally{clearTimeout(timer);}}
  enable(){
   if(this.enabling)return this.enabling;
   this.enabling=this.performEnable().finally(()=>{this.enabling=null;this.state();});return this.enabling;
  }
  async performEnable(){
   if(this.device.enabled)return this.syncNow();
   if(!this.publicConfig)throw new Error('Configura primero el servicio de avisos.');
   if(!this.notification||!scope.PushManager||!this.navigator.serviceWorker)throw new Error('Este navegador no permite avisos push. En iPhone añade Mi Estudio a la pantalla de inicio y ábrela desde su icono.');
   // Antes de cualquier await: el permiso procede directamente del clic del usuario.
   const permissionPromise=this.notification.requestPermission();
   if(await permissionPromise!=='granted')throw new Error('No se han permitido las notificaciones. Puedes cambiarlo en los ajustes del navegador o del móvil.');
   const registration=await this.registration();let subscription=await registration.pushManager.getSubscription();
   const key=decode(this.publicConfig.publicKey),oldKey=subscription?.options?.applicationServerKey;
   if(oldKey&&String(new Uint8Array(oldKey))!==String(key)){await subscription.unsubscribe();subscription=null;}
   if(!subscription)subscription=await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key});
   let created;
   const previous={...this.device};
   try{created=await this.request('/v1/devices',{method:'POST',auth:false,body:{subscription:subscription.toJSON(),tasks:R.tasks(this.getTasks())}});this.device={serviceUrl:this.device.serviceUrl,id:created.id,token:created.token,enabled:true,publicKey:this.publicConfig.publicKey,scheduled:created.scheduled,lastSync:Date.now()};await this.storage.set(this.device);this.state();}
   catch(error){if(created){try{await this.fetcher(this.device.serviceUrl+'/v1/devices/'+created.id,{method:'DELETE',headers:{Authorization:'Bearer '+created.token}});}catch{}}this.device=previous;await subscription.unsubscribe().catch(()=>{});throw error;}
  }
  async disable(){
   clearTimeout(this.timer);const current={...this.device};let error;
   if(current.id&&current.token)try{await this.request('/v1/devices/'+current.id,{method:'DELETE'});}catch(e){error=e;}
   try{const r=await this.registration(),sub=await r.pushManager.getSubscription();if(sub)await sub.unsubscribe();}catch{}
   this.device={serviceUrl:current.serviceUrl||'',enabled:false};await this.storage.set(this.device);this.state(error?{error:'Avisos desactivados en este dispositivo; no se pudo confirmar el borrado del servicio. La suscripción del navegador se ha cancelado.'}:{});
  }
  queueSync(){if(!this.device.enabled)return;clearTimeout(this.timer);this.timer=setTimeout(()=>this.syncNow().catch(error=>this.state({error:error.message})),500);}
  async syncNow(){
   if(!this.device.enabled)return;if(this.syncing){this.again=true;return;}this.syncing=true;
   try{
    if(this.notification.permission!=='granted')throw new Error('El permiso de notificaciones está desactivado.');
    const registration=await this.registration(),sub=await registration.pushManager.getSubscription();if(!sub)throw new Error('La suscripción del móvil ha caducado. Desactiva y vuelve a activar los avisos.');
    await this.request('/v1/devices/'+this.device.id+'/subscription',{method:'PUT',body:{subscription:sub.toJSON()}});
    const result=await this.request('/v1/devices/'+this.device.id+'/tasks',{method:'PUT',body:{tasks:R.tasks(this.getTasks())}});this.device.scheduled=result.scheduled;this.device.lastSync=Date.now();await this.storage.set(this.device);this.state();
   }finally{this.syncing=false;if(this.again){this.again=false;this.queueSync();}}
  }
  async test(){if(!this.device.enabled)throw new Error('Activa primero los avisos en este dispositivo.');await this.request('/v1/devices/'+this.device.id+'/test',{method:'POST',body:{}});}
 }
 scope.MiEstudioReminderClient={Client};if(typeof module!=='undefined'&&module.exports)module.exports=scope.MiEstudioReminderClient;
})(globalThis);
