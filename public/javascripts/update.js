var receive_list,remove_list,op_done=false;
var no_of_click=0;
 $(document).ready(function () {

     

    $("#sortable1,#sortable2,#sortable3").sortable({
        connectWith: "#sortable1 , #sortable2,#sortable3",
        handle: '.handle',
        items: "li:not(.ui-state-disabled)",
        
        
        receive:function(event,ui){
                console.log('recieve');
                op_done=true;
                receive_list=this;
                let machine_id=this.dataset.index;
                let li_tags=this.querySelectorAll('li');
                li_tags.forEach(item => {
                    item.querySelector('input').dataset.index=machine_id;
                });
                

        },

        remove:function(event,ui){
            console.log('remove');
            remove_list=this;
        },

        stop:function(event,ui){
            if(!op_done)return;
            console.log('stop');
                let list1 = Array.from(receive_list.querySelectorAll('li'));
                let id1= receive_list.id
                id1=id1[id1.length-1];
                let name1=list1.map(item=>{
                       let span_tag=item.querySelector('span');
                       return span_tag.innerHTML.trim();
                });
            
                let list2 = Array.from(remove_list.querySelectorAll('li'));
                let id2= remove_list.id;
                id2=id2[id2.length-1];
                let name2=list2.map(item=>{
                       let span_tag=item.querySelector('span');
                       return span_tag.innerHTML.trim();
                });

                $.ajax({
                    url: '/admin/update',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({"receive_name": name1,"receive_id":id1 ,"remove_name":name2,"remove_id":id2}),
                    success: function() {   
                        location.reload();  
                    }
                }); 
                
                
            
        

            op_done=false;
            
        }
    });
    $("#sortable1,#sortable2,#sortable3").disableSelection();

    $('.add-item').click(function(){
                
            $('.hide').toggle(
                function(){
                    if(no_of_click%2==0){
                        $('.add-item').css('transform','rotate(135deg)');
                        $('.add-item').css('color','red');
                        
                        
                        
                    }
                    else{
                        $('.add-item').css('transform','rotate(90deg)');
                        $('.add-item').css('color','#1997c6;');
                    }
                    no_of_click++;
                
                },
                
            );
               
    });






    
});


var socket=io();
var checkbox_list= document.querySelectorAll('input[type=checkbox]');

checkbox_list.forEach((item,i)=>{
    item.addEventListener('click',function (e) {
           
        if(this.checked==false){
            this.checked=true;
            return;
        }
        /*
         if(this.checked==true){
            this.parentNode.classList.add("ui-state-disabled");
        }
        else{
            this.parentNode.classList.remove("ui-state-disabled");
        }
        */
                    
        let date_ob= new Date();
        let hour=date_ob.getHours(),minutes=date_ob.getMinutes();
        if(hour<10)hour='0'+hour;
        if(minutes<10)minutes='0'+minutes;
        let time=hour+":"+minutes;
        
       
        let machine_no=this.dataset.index;
        let name =this.dataset.name;
        name =name.trim();
         
            
        $.ajax({
            url: '/admin/update/run',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({"name":name,"machine_no":machine_no,"op":this.checked,"time":time })
            
        });

        
        socket.emit(`set time on server ${machine_no}`,45*60);
    
        
    })

    
    


});



















