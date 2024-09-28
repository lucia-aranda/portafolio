const CACHE_NAME = 'cache-portafolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/acerca.html',
  '/contacto.html',
  '/experiencia.html',
  '/proyectos.html',
  '/talentos.html',
  '/css/styles.css',
  '/js/main.js',
  '/img/caroulsel-1.jpg',
  '/img/caroulsel-2.jpg',
  '/img/header.jpg',
  '/img/lucy.png',
  '/img/projects-1.jpg',
  '/img/projects-2.jpg',
  '/img/projects-3.jpg',
  '/img/projects-4.jpg',
  '/img/projects-5.jpg',
  '/img/skills-1.jpg',
  '/img/skills-2.jpg',
  '/img/skills-3.jpg',
  '/img/skills-4.jpg',
  '/img/skills-5.jpg',
  '/img/skills-6.jpg',
  '/img/skills-7.jpg',
  '/img/skills-8.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cacheando archivos');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});