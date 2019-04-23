var express = require('express');
var router = express.Router();



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
const update_db = client.db("machine").collection("update");
const starting_db = client.db("machine").collection("starting");


function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect('/login');
     
}
        
    

router.get('/', ensureAuthenticated,function(req, res, next) {
    
let date_ob= new Date();
let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
let today_date= day+" "+date+" "+month+" "+year;

let machine1_name=[],machine2_name=[],machine3_name=[];

update_db.countDocuments({date:today_date},function(err,count){
    if(count==0){
            starting_db.findOne({date:today_date},function(err,doc2){
                if(!doc2){
                }
                else{
                    let name= doc2['students'];
                   
                    for(let i=0;i<name.length;i+=3){
                        machine1_name.push(name[i]);
                    }
                    for(let i=1;i<name.length;i+=3){
                        machine2_name.push(name[i]);
                    }for(let i=2;i<name.length;i+=3){
                        machine3_name.push(name[i]);
                    }
                            
                   update_db.insertOne({date:today_date,
                    machine:{
                        machine1:machine1_name,
                        machine2:machine2_name,
                        machine3:machine3_name,
                    }
                    },function(err,doc3){
                        
                   });

                 
                }
                res.render('update',{title:'Update',machine1_name:machine1_name,machine2_name:machine2_name,machine3_name:machine3_name });
            });  
        
    
    }
    else{
        update_db.findOne({date:today_date},function(err,doc){
          
                machine1_name=doc['machine']['machine1'];
                machine2_name=doc['machine']['machine2'];
                machine3_name=doc['machine']['machine3'];
            
                //arrange name acc to tick
                let machine1_name_true=[],machine1_name_false=[],
                machine2_name_true=[],machine2_name_false=[]
                machine3_name_true=[],machine3_name_false=[];

                for(let i=0;i<machine1_name.length;i++){
                    if(machine1_name[i]['done']){
                        machine1_name_true.push(machine1_name[i]);
                    }
                    else{
                        machine1_name_false.push(machine1_name[i]);
                    }
                }
                for(let i=0;i<machine2_name.length;i++){
                    if(machine2_name[i]['done']){
                        machine2_name_true.push(machine2_name[i]);
                    }
                    else{
                        machine2_name_false.push(machine2_name[i]);
                    }
                }for(let i=0;i<machine3_name.length;i++){
                    if(machine3_name[i]['done']){
                        machine3_name_true.push(machine3_name[i]);
                    }
                    else{
                        machine3_name_false.push(machine3_name[i]);
                    }
                }

                machine1_name=machine1_name_true.concat(machine1_name_false);
                machine2_name=machine2_name_true.concat(machine2_name_false);
                machine3_name=machine3_name_true.concat(machine3_name_false);
                


            update_db.updateOne({date:today_date },{
                $set:{
                    machine:{
                        machine1:machine1_name,
                        machine2:machine2_name,
                        machine3:machine3_name
                    }
                }
            },function(err,doc4){
                
                res.render('update',{title:'Update',machine1_name:machine1_name,machine2_name:machine2_name,machine3_name:machine3_name });
            }  );    
                

           // res.render('update',{title:'Update',machine1_name:machine1_name,machine2_name:machine2_name,machine3_name:machine3_name });
    
        });
        
    }

});


  
   
});


router.post('/',function(req,res,next){
    let date_ob= new Date();
let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
let today_date= day+" "+date+" "+month+" "+year;

    
   
    let remove_list = req.body.remove_name;
    remove_list=remove_list.map(item=>{
        return item.trim();
    });
    
    
    let remove_id = req.body.remove_id;
    let R_id= remove_id[remove_id.length-1];
    
    let receive_id = req.body.receive_id;
    let R_id2= receive_id[receive_id.length-1];

    update_db.findOne({date:today_date},function(err,doc){
     let list= doc['machine'][`machine${R_id}`];
            
       list.forEach(item => {
            let flag=1;
            remove_list.forEach(item2=>{
                if(item['name']==item2){
                    flag=0;
                }
            });
            
            if(flag){
                if(R_id==1)
                update_db.updateOne({date:today_date},{$pull:{ 'machine.machine1':{name:item['name']} }},function(err,doc3){   
                            
                });
                if(R_id==2)
                update_db.updateOne({date:today_date},{$pull:{ 'machine.machine2':{name:item['name']} }},function(err,doc3){   
                                    
                                    
                });
                 if(R_id==3)
                 update_db.updateOne({date:today_date},{$pull:{ 'machine.machine3':{name:item['name']} }},function(err,doc3){   
                    
                });

                if(R_id2==1)
                update_db.updateOne({date:today_date},{$push:{ 'machine.machine1':item }},function(err,doc3){   
                    
                });
                if(R_id2==2)
                update_db.updateOne({date:today_date},{$push:{ 'machine.machine2':item }},function(err,doc3){   
                    
                });
                 if(R_id2==3)
                 update_db.updateOne({date:today_date},{$push:{ 'machine.machine3':item }},function(err,doc3){   
                    
                });
            
                    
            }
            
            

        });

    });
    

    
    
  
    
});



router.post('/add',function(req,res,next){

    let date_ob= new Date();
    let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
    let today_date= day+" "+date+" "+month+" "+year;

    let name=req.body.name;
    name= name.trim();
    let room_no=req.body.room;
    let machine_no=req.body.machine;

    
    

    let item={
        name: name.toLowerCase(),
        room_no:room_no,
        done:false,
        start:'00:00'
    }

    if(machine_no==1)
    update_db.updateOne({date:today_date},{$push:{ 'machine.machine1':item }},function(err,doc3){   
                          
    });
    if(machine_no==2)
    update_db.updateOne({date:today_date},{$push:{ 'machine.machine2':item }},function(err,doc3){                                    
        
    });
    if(machine_no==3)
    update_db.updateOne({date:today_date},{$push:{ 'machine.machine3':item }},function(err,doc3){   
        
    });
    
    res.redirect('/admin/update');


});


current_name1=null;
current_name2=null;
current_name3=null;


router.post('/run',function(req,res,next){

    let date_ob= new Date();
    let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
    let today_date= day+" "+date+" "+month+" "+year;

    let name = req.body.name;
    name=name.trim()
    let machine_no=req.body.machine_no;
    let op=req.body.op;
    let time=req.body.time;
    console.dir(req.body);

    


    
    if(machine_no==1){
        update_db.updateOne({date:today_date,"machine.machine1.name":name },{
            $set:{"machine.machine1.$.done":op,"machine.machine1.$.start":time } },function(err,doc3){
            
        } );
        current_name1=name;
    }
    
    if(machine_no==2){
        update_db.updateOne({date:today_date,"machine.machine2.name":name },{
            $set:{"machine.machine2.$.done":op,"machine.machine2.$.start":time } },function(err,doc3){
            
        } );
        current_name2=name;
    }
    if(machine_no==3){
        update_db.updateOne({date:today_date,"machine.machine3.name":name },{
            $set:{"machine.machine3.$.done":op,"machine.machine3.$.start":time } },function(err,doc3){
        
        } );
        current_name3=name;
    }
    
   
        res.redirect('/admin/update');
    
});



});


module.exports = router;
