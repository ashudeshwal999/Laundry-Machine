console.log('Hello from service worker') ;

self.addEventListener('push',(e)=>{
console.log("push message",e );
console.log(e.data.json());
let body=e.data.json();

e.waitUntil(
    self.registration.showNotification(body.title,{
        body: body.msg,
        icon: "/images/bell.png",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
    })
);

});



self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    clients.openWindow("http://localhost:3000");
  });