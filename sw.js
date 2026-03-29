// Nombre de la caché
const CACHE_NAME = 'obrador-v1';

// Archivos que queremos guardar en caché (para que funcione rápido y reconozca la PWA)
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icono-192.png',
  './icono-512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Archivos en caché abiertos');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve el archivo de la caché si existe, si no, lo pide a la red
        return response || fetch(event.request);
      })
  );
});