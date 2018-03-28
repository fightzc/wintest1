/**
 * Created by Administrator on 2018/3/28.
 */
var cacheName = 'oslab-zc-blog';
var filesToCache = [
    'test.html'
];

self.addEventListener('install', function(e){
    console.log('service worker install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e){
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys.then(function(keyList){
            return Promise.all(keyList.map(function(){
                console.log('[ServiceWorker] Removing old cache', key);
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }))
        })
    );
});