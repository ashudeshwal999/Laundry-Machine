
var machineTime1 =document.querySelector('#time1');
var machineTime2 =document.querySelector('#time2');
var machineTime3 =document.querySelector('#time3');


var socket=io();

socket.on('set time on client 1',function(data){

    machineTime1.innerHTML=data.screen;
    machineTime1.style.color=data.color;
});

socket.on('set time on client 2',function(data){

    machineTime2.innerHTML=data.screen;
    machineTime2.style.color=data.color;
});
socket.on('set time on client 3',function(data){

    machineTime3.innerHTML=data.screen;
    machineTime3.style.color=data.color;
});


var listicon=document.querySelectorAll('.main>.wash-main>.list');
var isListiconRotate1=false,isListiconRotate2=false,isListiconRotate3=false;
var student_list = document.querySelectorAll('.main>.wash-main>.student-list');

var machine_ob=[];
for(let i=0;i<3;i++){
    machine_ob.push({
        listicon:listicon[i],
        isListiconRotate:false,
        student_list:student_list[i]
    });
}



listicon.forEach(item=> item.addEventListener('click',Rotate_it));


function Rotate_it(){
        let index_item=this.dataset.index-1;
         
    let {isListiconRotate ,listicon,student_list}=machine_ob[index_item];
    
    if(isListiconRotate){
        listicon.style.setProperty('transform',`rotate(${0}deg)`);
        student_list.classList.remove('student-list-open');
        student_list.classList.remove('student-list-open2');
        isListiconRotate=false;
    }
    else {
        listicon.style.setProperty('transform',`rotate(${90}deg)`);
        student_list.classList.add('student-list-open');
        setTimeout(() => {
            student_list.classList.add('student-list-open2');    
        }, 150);
        
        isListiconRotate=true;
    }  
       
    machine_ob[index_item]= {isListiconRotate ,listicon,student_list};
}




$(document).ready(function() {
    $('#box-heading').click(function(){
        $('.notification-box').toggle();
    });
    

});
var click=0;

var img_tag= document.querySelector('img');
var head=document.querySelector('.head');
var notify_box = document.querySelector('.notification-box');
var form_notify =document.querySelector('.one-time');

img_tag.addEventListener('click',function(e){
    if(click%2==0){
        
        head.style.left="60%";
        img_tag.style.transform="rotate(-90deg)";

    }
    else{
        head.style.left="100%";
    
        img_tag.style.transform="rotate(0deg)";
        notify_box.style.display='none';
        form_notify.style.display='none';
        
    }
    click++;
});




