/**
 * Created by Administrator on 2018/3/28.
 */

if('serviceWorker' in navigator) {
    //注册上一步创建的js文件
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function() { console.log('Service Worker Registered'); });
}
