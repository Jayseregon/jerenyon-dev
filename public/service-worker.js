const CACHE_NAME = 'spline-cache-v1';
const urlsToCache = [
    // If you have specific URLs to cache initially, list them here.
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    const url = event.request.url;

    if (url.includes('prod.spline.design')) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return (
                    response ||
                    fetch(event.request).then((response) => {
                        const clonedResponse = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, clonedResponse);
                        });
                        return response;
                    })
                );
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});