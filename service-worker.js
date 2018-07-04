const version = '1.0.1';
const cache_name = 'test'+version;

const cache_resource_url = [
    //'1.png'
];

/**
 * 安装
 * 缓存需要的文件，进入等待状态
 * 通过skipWating()直接进入激活状态
 */
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cache_name)
            .then(function(cache){
              return cache.addAll(cache_resource_url);
             })
            .then(function(){
                self.skipWaiting()  //跳过等待进入激活状态
            })
    );
});

/**
 * 激活
 * 更新客户端sw，清楚缓存
 */
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all([
                clients.claim(), //更新客户端
                keyList.map(function(key){
                   caches.delete(cache_name)
                })
            ])
        })
    );
});

self.addEventListener('fetch', function(event){
    const fetchRequest = event.request.clone();
    onlineRequest(fetchRequest);
});

//联网情况下
function onlineRequest(fetchRequest){
    return fetch(fetchRequest)
        .then(function(response){
            //在请求成功后缓存需要的文件
            if (!response || response.status != 200){
                return response;
            }
            //成功则克隆
            const responseToCache = response.clone();
            caches.open(cache_name)
                .then(function(cache){
                    cache.put(fetchRequest, responseToCache)
                })
            return response;
        }).catch(function(){
            //获取失败，使用离线文件
            offlieRequest(fetchRequest)
        });
}

//离线
function offlieRequest(fetchRequest){
    caches.match(fetchRequest)
        .then(function(hit){
            if (hit){
                return hit;
            }
        })
}

