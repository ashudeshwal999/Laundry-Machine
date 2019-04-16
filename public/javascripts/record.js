var date_tag=document.querySelector('#date-set');

date_tag.addEventListener('change',function(e){
    var date_ob =new Date(this.value);
    let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
    let today_date= day+" "+month+" "+date+" "+year;
    console.log(today_date);

    
    var form=document.createElement('form');
    form.setAttribute('method','post');
    form.setAttribute('action','#');

    var input_tag=document.createElement('input');
    input_tag.setAttribute('type','text');
    input_tag.setAttribute('name','date');
    input_tag.setAttribute('value',`${today_date}`);

    form.appendChild(input_tag);

    document.body.appendChild(form);
    form.submit();
    form.remove();


});