const CACHE = 'recogaya-v1';
const FILES = [
  '/RecogarYa-app/',
  '/RecogarYa-app/index.html',
  '/RecogarYa-app/style.css',
  '/RecogarYa-app/app.js',
  '/RecogarYa-app/manifest.json'
];

// Instalar: guardar archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// Activar: limpiar cachés viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: responder desde caché, si no desde red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
