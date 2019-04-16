// chat js
var count1=0;
function openForm() {

  document.getElementById("myForm").style.display = "block";

  document.querySelector('.open-button').style.display='none';
  if(count1==0)
  document.querySelector('.form-container').style.display='none';
  
  count1++;
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  
  document.querySelector('.open-button').style.display='block';
 

}


  var socket = io();
  var form_btn=document.querySelector('.form-container');
  var chat=document.querySelector('.chat-msg');
  var name_input_tag=document.querySelector('.name-block');
  var user_name=null;

name_input_tag.addEventListener('submit',function(e){
    e.preventDefault();
   name_tag=document.querySelector('.name-block>.name');
  user_name=name_tag.value;
  document.querySelector('.form-container').style.display='block';
  
  document.querySelector('.name-block').style.display='none';

  Notification.requestPermission();
});



  form_btn.addEventListener('submit',function (e) {
      e.preventDefault();
      var text_msg_tag=this.querySelector('input');
      var text_msg=text_msg_tag.value;
      socket.emit('send message',{name:user_name, msg:text_msg} );
      
      text_msg_tag.value="";
  });

  socket.on('send to all',function(data){

    let date_ob= new Date();
    let hour=date_ob.getHours(),minutes=date_ob.getMinutes();
    if(hour<10)hour='0'+hour;
    if(minutes<10)minutes='0'+minutes;
    let current_time=`${hour}:${minutes} `;

      var div_tag=document.createElement('div');
       div_tag.innerHTML=`
          <span><Strong> ${data.name} : </Strong> </span>
          <span> ${data.msg} </span>
          
       `;
       div_tag.style.listStyle='none';
       div_tag.style.width='80%';
       div_tag.style.position='relative';
       div_tag.style.wordBreak='break-all';
       div_tag.style.marginBottom='5px';
       div_tag.style.borderRadius='7px';

       span_tag=document.createElement('span');
        span_tag.innerHTML=`${current_time} `;
        span_tag.style.fontSize='10px';

       if(data.name==user_name){
          div_tag.style.right='-50px';
          div_tag.style.background= 'lightblue' ;
          span_tag.style.textAlign= 'right';
          
       }
       else if(data.name=='Admin'){
        div_tag.style.right='0px';
        div_tag.style.background= 'darkslategray' ;
        span_tag.style.textAlign= 'left';
      
       }
        else{
            div_tag.style.right='0px';
            div_tag.style.background= 'rgba(0,0,0,0.3)' ;
            span_tag.style.textAlign= 'left';
          
        }
        
      chat.appendChild(div_tag);
      chat.appendChild(span_tag);
      


        chat.scrollBy(0,chat.scrollHeight);

  });

//chat js





