((scope)=>{
 'use strict';
 const HOURS=8,HOUR=3600000,MAX_TASKS=200;
 function tasks(items,now=Date.now()){
  const out=new Map();
  for(const item of items||[]){
   const id=String(item.id??'').slice(0,200),due=Number(item.due);
   if(!id||!Number.isSafeInteger(due)||due<=now||due>now+366*24*HOUR||['submitted','graded','done'].includes(item.status)||item.done===true)continue;
   out.set(id,{id,title:String(item.title||'Tarea').slice(0,180),due,notifyAt:Math.max(now,due-HOURS*HOUR)});
   if(out.size>MAX_TASKS)throw new Error('Hay más de '+MAX_TASKS+' tareas con fecha. Reduce las tareas sincronizadas antes de activar los avisos.');
  }
  return [...out.values()].sort((a,b)=>a.due-b.due||a.id.localeCompare(b.id));
 }
 const key=task=>task.id+'|'+task.due;
 function reconcile(previous,incoming,now=Date.now()){
  const old=new Map((previous||[]).map(t=>[key(t),t]));
  return tasks(incoming,now).map(task=>{const saved=old.get(key(task));return{...task,notifyAt:saved?.notifyAt??task.notifyAt,attempts:saved?.attempts||0,sentAt:saved?.sentAt||0,retryAt:saved?.retryAt||0,leaseUntil:saved?.leaseUntil||0};});
 }
 function nextAlarm(items,now=Date.now()){
  const times=(items||[]).filter(t=>!t.sentAt&&t.due>now).map(t=>Math.max(now+1000,t.notifyAt,t.retryAt||0,t.leaseUntil||0));return times.length?Math.min(...times):null;
 }
 const due=(items,now=Date.now())=>(items||[]).filter(t=>!t.sentAt&&t.due>now&&t.notifyAt<=now&&(t.retryAt||0)<=now&&(t.leaseUntil||0)<=now);
 function payload(task,appURL,now=Date.now()){
  const minutes=Math.max(1,Math.ceil((task.due-now)/60000)),remaining=minutes>=60?Math.ceil(minutes/60)+' h':minutes+' min';
  const deadline=new Intl.DateTimeFormat('es-ES',{timeZone:'Europe/Madrid',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(task.due);
  return{title:'Tarea pendiente · '+remaining,body:task.title+'\nEntrega: '+deadline,tag:'tarea-'+key(task),taskId:task.id,url:new URL('#tarea='+encodeURIComponent(task.id),appURL).href};
 }
 function serviceURL(value){if(!String(value||'').trim())return'';const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.pathname!=='/')throw new Error('Usa la dirección HTTPS del servicio de avisos, sin rutas ni parámetros.');return u.origin;}
 scope.MiEstudioReminders={HOURS,HOUR,MAX_TASKS,tasks,key,reconcile,nextAlarm,due,payload,serviceURL};if(typeof module!=='undefined'&&module.exports)module.exports=scope.MiEstudioReminders;
})(globalThis);
