const CACHE='pdw27-offline-v25';
const ASSETS=['./','./index.html','./app.js','./vendor/qrcode.js','./vendor/qrcode-utf8.js','./vendor/jsQR.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('pdw27-offline-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>r).catch(async()=>{const c=await caches.open(CACHE);return await c.match(e.request,{ignoreSearch:true})||(e.request.mode==='navigate'?await c.match('./index.html'):Response.error())}))});
