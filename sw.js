const V='armas-adam-v4';
const SHELL=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','fundo-armas.jpg'];
const OPT=['pdfjs/pdf.min.mjs','pdfjs/pdf.worker.min.mjs'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>c.put(u,r)))).then(()=>Promise.all(OPT.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>c.put(u,r)).catch(()=>0))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  const fonte=/fonts\.(googleapis|gstatic)\.com$/.test(u.host);
  if(u.origin!==location.origin&&!fonte)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
    const net=fetch(new Request(r,{cache:'no-cache'})).then(res=>{if(res.ok||res.type==='opaque')caches.open(V).then(c=>c.put(r,res.clone()));return res}).catch(()=>hit);
    return hit||net;
  }));
});
