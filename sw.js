/**
 * Created by Administrator on 2018/3/28.
 */
var cacheName = 'oslab-zc-blog';
var filesToCache = [];

self.addEventListener('install', function(e){
    console.log('service worker install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});