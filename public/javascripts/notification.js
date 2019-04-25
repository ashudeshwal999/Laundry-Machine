var send_notifcation_btn=document.querySelector('#send-notifcation-btn');

var form =document.querySelector('form');
var cancel_btn;

send_notifcation_btn.addEventListener('click',function(e){
    send_notifcation_btn.style.display='none';
    form.style.display='flex';

    setTimeout(function(){
       form.style.opacity=1; 
    },150);

    cancel_btn=document.querySelector('.cancel2');
    
    cancel_btn.addEventListener('click',function(e){
        e.preventDefault();
        form.style.display='none';
        form.style.opacity=0;
        send_notifcation_btn.style.display='block';
    });
    
});

form.addEventListener('submit',function(){
    form.style.display='none';
    form.style.opacity=0;
    send_notifcation_btn.style.display='block';
    
});

try{
    var side = document.querySelector('.side-item');
    var menu =document.querySelector('img');
    menu.addEventListener('click',function(e){
        side.style.left="0";
    });
    var close= document.querySelector('.close');
    close.addEventListener('click',function(e){
        side.style.left='-100%';
    });

    }
    catch(e){

    }
