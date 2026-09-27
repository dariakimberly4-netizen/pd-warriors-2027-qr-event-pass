const CACHE='pdw27-offline-v43';
const ASSETS=['./','./index.html','./app.js','./vendor/qrcode.js','./vendor/qrcode-utf8.js','./vendor/jsQR.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return res}).catch(()=>caches.match('./index.html')));return}e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(res=>{if(r.method==='GET'){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy))}return res})))});
