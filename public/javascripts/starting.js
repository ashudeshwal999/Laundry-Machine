
var form=document.querySelector('.dw>.main>.add-form');
var list=document.querySelector('.dw>.main>.student-list');
var list_id=-1;


add_listener();
function add_listener(){
    let liTags=list.querySelectorAll('li');
    if(liTags.length==0)return;
    liTags.forEach(item=>{
        let a_tags=item.querySelectorAll('a');
        a_tags[2].addEventListener('click',editTag);
        a_tags[3].addEventListener('click',removeTag);
        list_id++;
        
    });
}



//display name,room_no,edit,remove tags

form.addEventListener('submit',add_to_list);

function add_to_list(e){
    
    e.preventDefault();
    list_id++;
    
    var input1= this.querySelector('.add_name');
    var input2= this.querySelector('.room_no');
    
    var name =input1.value;
    var room_no=input2.value;

   

    var li= document.createElement('li');
    li.setAttribute('data-index',`${list_id}`);

    var aTag= document.createElement('a');
    aTag.innerHTML=name;
    aTag.style.fontWeight='bolder';

    var raTag= document.createElement('a');
    raTag.innerHTML=room_no;
    raTag.style.fontWeight='bolder';
    

    var eTag= document.createElement('a');
    eTag.innerHTML='Edit';
    eTag.style.cursor='pointer';
    eTag.style.color='white';
    eTag.setAttribute('data-action','edit');
    eTag.addEventListener('click',editTag);

    var rTag= document.createElement('a');
    rTag.innerHTML='Remove';
    rTag.style.cursor='pointer';
    rTag.style.color='white';
    rTag.setAttribute('data-action','remove');
    rTag.addEventListener('click',removeTag);

    li.appendChild(aTag);
    li.appendChild(raTag);
    li.appendChild(eTag);
    li.appendChild(rTag);
    

    list.append(li);
    
    input1.value='';
    input2.value='';

}


// remove tag action
var action_to_do=null;
function removeTag(e){ 
    var parent=this.parentNode;
    var parent_parent =parent.parentNode;
    var parent_index=parent.dataset.index;

    parent.remove();
    var list_items=Array.from( parent_parent.querySelectorAll('li'));

    if(list_items.length==0)return ;

    list_items.forEach( item =>{
        if(parent_index<item.dataset.index){
            item.dataset.index=parent_index;
            parent_index++;
        }
    });
    
     
}

// edit tag action
function editTag(e){
    var parent=this.parentNode;

    var form_edit =document.createElement('form');
    form_edit.setAttribute('class','edit-container');

    var info_tag= parent.querySelectorAll('a');
    var first_name = info_tag[0].innerHTML;
    var room_no = info_tag[1].innerHTML;
    

    var inputNameEdit=document.createElement('input');
    inputNameEdit.setAttribute('class','temp_edit_name');
    
    inputNameEdit.type='text';
    inputNameEdit.value=first_name;

    var inputRoomEdit=document.createElement('input');
    inputRoomEdit.setAttribute('class','temp_edit_room');
    
    inputRoomEdit.type='Number';
    inputRoomEdit.value=room_no;
    

    var submitInput=document.createElement('input');
    submitInput.setAttribute('class','temp_edit_submit');
    submitInput.type='submit';
    submitInput.value='Done';
    
    parent.innerHTML='';

    var div_tag=document.createElement('div');
    

    div_tag.appendChild(inputNameEdit);
    div_tag.appendChild(inputRoomEdit);

    form_edit.appendChild(div_tag);
    form_edit.appendChild(submitInput);

    form_edit.addEventListener('submit',edit_name);
    parent.appendChild(form_edit);


}

// Name  and room no edit
function edit_name(e){
    e.preventDefault();
    
    
    var parent = this.parentNode;

    info_tag=this.querySelectorAll('input');
    first_name=info_tag[0].value;
    room_no=info_tag[1].value;
    
    var li= document.createElement('li');
    

    parent.innerHTML= `
                            <a > ${first_name}
                            </a>
                            <a > ${room_no}
                            </a>
                            <a data-action="edit" style="cursor: pointer; color: white;">
                            Edit
                            </a>
                            <a data-action="remove" style="cursor: pointer; color: white;">
                            Remove
                            </a>
                        `;


    aTags=parent.querySelectorAll('a');
    edit_a_Tag=aTags[2];
    edit_a_Tag.addEventListener('click',editTag);
    remove_a_Tag=aTags[3];
    remove_a_Tag.addEventListener('click',removeTag);
    

}


var savebtn=document.querySelector('#save');
savebtn.addEventListener('click',send_to_save);

// send name room_no to server
function send_to_save(e){

 let li_name =list.querySelectorAll('li');

    


 let name =[],room_no=[];
   li_name.forEach(item =>{
       let a_tag=item.querySelectorAll('a');
        name.push((a_tag[0].innerHTML).trim() );
        room_no.push((a_tag[1].innerHTML).trim() );
   }); 

   $.ajax({
    url: '/admin/starting',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"name": name,"room_no":room_no}),
    success: function() {   
        location.reload();  
    }
    }); 

   
}



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









