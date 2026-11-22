((scope)=>{
 'use strict';
 let opening;
 function db(){if(!opening)opening=new Promise((resolve,reject)=>{const r=indexedDB.open('mi-estudio-reminders',1);r.onupgradeneeded=()=>r.result.createObjectStore('settings');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});return opening;}
 async function get(){const database=await db();return new Promise((resolve,reject)=>{const r=database.transaction('settings').objectStore('settings').get('device');r.onsuccess=()=>resolve(r.result||{});r.onerror=()=>reject(r.error);});}
 async function set(value){const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction('settings','readwrite');tx.objectStore('settings').put(value,'device');tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
 scope.MiEstudioReminderStore={get,set};if(typeof module!=='undefined'&&module.exports)module.exports=scope.MiEstudioReminderStore;
})(globalThis);
