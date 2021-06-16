const Static_CACHE = 'static-'+'21-06-16'
const Static_CACHEAssets = [
    '/',
    'https://msng.link/assets/css/bootstrap.min.css',
    'https://msng.link/assets/css/main.css'
];
self.addEventListener('install', async event => {
    self.skipWaiting();
    const cache = await caches.open(Static_CACHE);
    await cache.addAll(Static_CACHEAssets);
});
self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![Static_CACHE].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
});
self.addEventListener('fetch', event => {
    if (event.request.method == "GET") {
        event.respondWith(async e=>{
          const cacheS = await caches.open(Static_CACHE);
          const StaticCachedResponse = await cacheS.match(event.request);
          return StaticCachedResponse || fetch(event.request);
        });
    }
});
