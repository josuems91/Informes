// Service worker sencillo: siempre intenta la red primero (así las actualizaciones llegan solas)
// y nunca guarda las llamadas al servidor.
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(ks) { return Promise.all(ks.map(function(k) { return caches.delete(k); })); }).then(function() { return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req).catch(function() { return caches.match(req); }));
});
