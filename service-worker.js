const
    version = '1.0.0',
    CACHE = 'test' + version,
    offlineURL = '/wintest1/',
    installFilesEssential = [ '/', '1.png' ].concat(offlineURL);

self.addEventListener('install', event => {
    console.log('server worker install');
    event.waitUtill(
        caches.open(CACHE)
            .then(cache => {
            cache.addAll(installFilesEssential);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    console.log('server worker activate');
    event.waitUtill(
        caches.keys()
            .then(keylist => {
            return Promise.all(
                keylist
                    .filter(key => $key !== CACHE)
                    .map(key => caches.delete(key))
            )
        })
        .then(() => self.clients.claim())
    );
})
