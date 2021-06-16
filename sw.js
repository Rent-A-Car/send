const Static_CACHE = 'static-' + '21-06-16-n'
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
self.addEventListener('fetch', async event => {
	if (event.request.method == "GET") {
		const req = event.request
		let url = new URL(req.url),
		    nreq;
		if (location.hostname == url.hostname && url.pathname == "/") {
			url.search = ""
			nreq = new Request(url.toString(),{...req})
			event.respondWith(async e=>{
				const cacheS = await caches.open(Static_CACHE);
				const StaticCachedResponse = await cacheS.match((nreq) ? nreq : req);
				return StaticCachedResponse
			});
		}
		
	}
});
