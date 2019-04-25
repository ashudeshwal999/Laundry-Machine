var time1_display=document.querySelector('#time1');
var time2_display=document.querySelector('#time2');
var time3_display=document.querySelector('#time3');


var socket=io();

socket.on('set time on client 1',function(data){

    time1_display.innerHTML=data.screen;
    time1_display.style.color=data.color;
});

socket.on('set time on client 2',function(data){

    time2_display.innerHTML=data.screen;
    time2_display.style.color=data.color;
});
socket.on('set time on client 3',function(data){

    time3_display.innerHTML=data.screen;
    time3_display.style.color=data.color;
});


//set time 

var btn1 =document.querySelector('#save-btn1');
var btn2 =document.querySelector('#save-btn2');
var btn3 =document.querySelector('#save-btn3');

var controllers=document.querySelectorAll('.controller');


btn1.addEventListener('click',function(e){
    var time=controllers[0].value
    if(time==''){
        return;
    }
        console.log(time);
        
    var minutes= time.split(':')[1],seconds=time.split(':')[2];
    if(!minutes) minutes=0;
    if(!seconds)seconds=0;
    console.log({minutes,seconds});

    var set_time=parseInt(minutes)*60 +parseInt(seconds);

    socket.emit(`set time on server 1`,set_time);
});

btn2.addEventListener('click',function(e){
    var time=controllers[1].value
    if(time==''){
        return;
    }
        console.log(time);
        
    var minutes= time.split(':')[1],seconds=time.split(':')[2];
    if(!minutes) minutes=0;
    if(!seconds)seconds=0;
    console.log({minutes,seconds});

    var set_time=parseInt(minutes)*60 +parseInt(seconds);

    socket.emit(`set time on server 2`,set_time);
});
btn3.addEventListener('click',function(e){
    var time=controllers[2].value
    if(time==''){
        return;
    }
        console.log(time);
        
    var minutes= time.split(':')[1],seconds=time.split(':')[2];
    if(!minutes) minutes=0;
    if(!seconds)seconds=0;
    console.log({minutes,seconds});

    var set_time=parseInt(minutes)*60 +parseInt(seconds);

    socket.emit(`set time on server 3`,set_time);
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
