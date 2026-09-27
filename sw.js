const CACHE='pdw27-offline-v76';
const ASSETS=['./','./index.html','./app.js?v=76','./modules-v73.css?v=76','./assets/event-portal.jpg?v=72','./vendor/qrcode.js','./vendor/qrcode-utf8.js','./vendor/jsQR.js'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(async cache=>{
      for(const asset of ASSETS){
        const response=await fetch(asset,{cache:'reload'});
        if(response.ok) await cache.put(asset,response);
      }
    })
  );
});

self.addEventListener('activate',e=>e.waitUntil(
  Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),
    self.clients.claim()
  ])
));

self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request,{cache:'no-store'})
        .then(r=>{
          const clone=r.clone();
          caches.open(CACHE).then(c=>c.put('./index.html',clone));
          return r;
        })
        .catch(()=>caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(
    fetch(e.request,{cache:'no-store'})
      .then(r=>{
        if(r && r.ok){
          const clone=r.clone();
          caches.open(CACHE).then(c=>c.put(e.request,clone));
        }
        return r;
      })
      .catch(()=>caches.match(e.request))
  );
});
