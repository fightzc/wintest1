/**
 * Created by Administrator on 2018/3/28.
 */
var cacheName = 'oslab-zc-blog-2';
var filesToCache = [
    'test.html',
    '1.png',
    'manifest.json'
];

self.addEventListener('install', function(e){
    console.log('service worker install');
    //ä½¿ç¨self.skipWaitingè§¦åactivate
    e.waitUntil(
        caches
            .open(cacheName)
            .then(function(cache){
                cache.addAll(filesToCache)
            })
            .then(function() { self.skipWaiting();  })
            .then(function() { console.log('[ServiceWorker] Install success'); })
    );
});

self.addEventListener('activate', function(e){
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key){
                console.log('[ServiceWorker] Removing old cache', key);
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }))
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(respond){
            return respond || fetch(e.request)
                    .then(function(res){
                        return caches.open(cacheName).then(function(cache){
                            if (e.request.url.endsWith("jpg") ||
                                e.request.url.endsWith("jpeg") ||
                                e.request.url.endsWith("png") ||
                                e.request.url.endsWith("bmp") ||
                                e.request.url.endsWith("gif") ||
                                e.request.url.endsWith("css") ||
                                e.request.url.endsWith("js") ||
                                e.request.url.endsWith("woff")){
                                cache.put(e.request.url, res.clone());
                            } else {
                                console.log('=====url::', e.request.url);
                            }
                            return res;
                        });
                        // return res;
                    })
                    .catch(function(){
                        return caches.match('test.html');
                    });
        })
    )
});

// åæ¶æ·»å å°ä¸»å±å¹
self.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    return false;
});

function sendMsg(msg) {
    const controller = navigator.serviceWorker.controller;

    if (!controller) {
        return;
    }

    controller.postMessage(msg, []);
}

