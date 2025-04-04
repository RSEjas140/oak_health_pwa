// Service-worker is a background script that controls network requestes and cache responses ; enables offline functionality 

const CACHE_NAME = 'treeLogger-v1';

// What we have access to in offline mode
const STATIC_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json'
];

//intialises on install
self.addEventListener('install', async (event) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(STATIC_ASSETS);
    self.skipWaiting();
});

//SW takes control
self.addEventListener('activate', (event) => {
    self.clients.claim();
});


//triggered whenever a resource is requested
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                // If we got a response from the network, update the cache
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            })
            .catch(() => {
                // If network fails, try to serve from cache
                return caches.match(event.request);
            })
    );
});