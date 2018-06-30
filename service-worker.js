const
    version = '1.0.0',
    CACHE = 'test' + version,
    offlineURL = '/wintest1/',
    installFilesEssential = [ '/', '1.png' ].concat(offlineURL);

self.addEventListener('install', function(event) {
    console.log('server worker install');
    event.waitUntil(
        caches.open(CACHE)
            .then(function(cache) {
            cache.addAll(installFilesEssential);
            })
            .then(function() {
                self.skipWaiting()
            } )
    );
});

self.addEventListener('activate', function(event) {
    console.log('server worker activate');
    event.waitUntil(
        caches.keys()
            .then(function(keylist) {
            return Promise.all(
                keylist
                    .filter( function(key){
                        key !== CACHE
                    })
                    .map(caches.delete(key))
            )
        })
        .then(function(){
            self.clients.claim()
        })
    );
})
