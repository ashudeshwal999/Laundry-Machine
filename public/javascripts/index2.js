if ('serviceWorker' in navigator && 'PushManager' in window) {

 

const applicationServerPublicKey='BHYPy31teyZnhI5JPvCOw92cLEb70kXUY4tYcXrd3qxfdhLosziDKEbbFm0uW9XBp78SIcKzGjGcMeyGBazH-Q4';
const applicationServerprivateKey='crVA3N79qpcWVqFJjnXFyZRH10ZOn8T3sU5rjC8QLJM';
applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
var subscribe_obj ,isSubscribed=null,swRegistration;




if(Notification.permission=='granted'){
  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    swRegistration = swReg;
    
      initializeUI();
  })
  .catch(function(error) { throw error;    });
  
}
else if(Notification.permission=='denied'){
console.log("Notification-service-off");
}
else{
Notification.requestPermission();
}


function initializeUI() {
    
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);
    subscribe_obj=subscription;
    
    updateBtn();
  });


}

var name_tag= document.querySelector('#user-name');
var name_changed=0;

function updateBtn() {
  if(Notification.permission=='denied'){
    name_tag.innerHTML="Notification Blocked"
  return;
}

  if (isSubscribed) {
    check_tag.checked=true;
    socket.emit('give name',{sub:subscribe_obj});  
    socket.on('take name',function(data){  
      if(!name_changed){
      name_tag.innerHTML="Hello "+data;
        name_changed++;
      }
    });

  } else {
    check_tag.checked=false;
    
    
      name_tag.innerHTML="Hello Anon";
      
  }

}








var check_tag=document.querySelector('.switch>input');
check_tag.addEventListener('click',function(e){


  if(Notification.permission=='denied'){
      this.checked=false;
    return;
  }
    

    if( this.checked==true  ){
      form_tag.style.display='block';
      form_tag.style.opacity=1;
      document.querySelector('#user-name').style.display='block';

    }
    else if(this.checked==false ){  
      form_tag.style.display='none';
      form_tag.style.opacity=0;
      document.querySelector('#user-name').style.display='block';

        swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
          if (subscription) {
            $.ajax({
              url: '/remove',
              type: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({"subscribe":subscription}),
            });
            return subscription.unsubscribe();
          }
        })
        .catch(function(error) {
          console.log('Error unsubscribing', error);
        })
        .then(function() {
          isSubscribed = false;
          updateBtn();
        });
  
    
     
      

    }

});


form_tag=document.querySelector('.one-time');
form_tag.addEventListener('submit',function(e){
  e.preventDefault();
 
  var name_tag=document.querySelector('#notify-name');
  var room_tag=document.querySelector('#notify-room');
  
  let name = name_tag.value;
  let room = room_tag.value;
  
                  
                form_tag.style.display='none';
                form_tag.style.opacity=0; 
                

                
      swRegistration.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey: applicationServerKey
      }).then((sub)=>{
        subscribe_obj=sub;

        $.ajax({
          url: '/add',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({"subscribe":subscribe_obj,"name":name ,"room":room}),
      });


      location.reload();

      }).catch(function(error){ throw error; });
      
                
    
});

 
    
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}





}

