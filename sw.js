const CACHE_NAME = 'mentis-habits-v3-1-pwa';
const ASSETS = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install', (event) => {event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate', (event) => {event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));self.clients.claim();});
self.addEventListener('fetch', (event) => {if (event.request.method !== 'GET') return; event.respondWith(caches.match(event.request).then((cached) => {const networkFetch = fetch(event.request).then((response) => {if (response && response.status === 200 && response.type === 'basic') {const responseClone = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));} return response;}).catch(() => cached); return cached || networkFetch;}));});
