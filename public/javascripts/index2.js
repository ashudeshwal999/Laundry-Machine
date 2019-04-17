const applicationServerPublicKey='BHYPy31teyZnhI5JPvCOw92cLEb70kXUY4tYcXrd3qxfdhLosziDKEbbFm0uW9XBp78SIcKzGjGcMeyGBazH-Q4';
const applicationServerprivateKey='crVA3N79qpcWVqFJjnXFyZRH10ZOn8T3sU5rjC8QLJM';
applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
var subscribe_obj;
var flag=0;

var img_tag=document.querySelector('img');
img_tag.addEventListener('click',function(e){
    if( (form_tag.style.display=='none' || form_tag.style.display=='') && flag==0 ){
      form_tag.style.display='block';
      form_tag.style.opacity=1;
      document.querySelector('#user-name').style.display='none';

    }
    else if(form_tag.style.display=='block' && flag==0){  
      form_tag.style.display='none';
      form_tag.style.opacity=0;
      document.querySelector('#user-name').style.display='block';
    }

});


form_tag=document.querySelector('.one-time');
form_tag.addEventListener('submit',function(e){
  e.preventDefault();
 
  var name_tag=document.querySelector('#notify-name');
  var room_tag=document.querySelector('#notify-room');
  
  let name = name_tag.value;
  let room = room_tag.value;
  
                  $.ajax({
                    url: '/add',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({"subscribe":subscribe_obj,"name":name ,"room":room}),
                   
                   
                });
                form_tag.style.display='none';
                form_tag.style.opacity=0; 
                location.reload();
              
                //$('#user-name').html("Hello "+name);  
    
});




if ('serviceWorker' in navigator && 'PushManager' in window) {
  
  

  if(Notification.permission=='granted'){
             

            navigator.serviceWorker.register('sw.js')
            .then(function(swReg) {   
              
                 
                swReg.pushManager.subscribe({
                  userVisibleOnly:true,
                  applicationServerKey: applicationServerKey
                }).then((sub)=>{
                  subscribe_obj=sub;
                  
                  $.ajax({
                    type: 'GET',
                    url: "https://laundry-machine.herokuapp.com/json/subscriber.json",
                    success:function(data){
                     $(document).ready(function(){
                      data.forEach(element => {
                        if(element.info.endpoint==sub.endpoint){
                          $('#user-name').html("Hello "+element.name);
                          flag=1;
                        }  
                       });
                       if(!flag)$('#user-name').html("Hello Anon");
                       

                     });
              
                     
                    }
                    });

              
                }).catch(function(error){ throw error; });
            })
            .catch(function(error) { throw error;    });

            

  }
  else if(Notification.permission=='denied'){
    console.log("Notification-service-off");

  
  }
  else{
    Notification.requestPermission();
  }
    

} 
    
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















