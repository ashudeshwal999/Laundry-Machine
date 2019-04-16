var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
     const starting_db = client.db("machine").collection("starting");
        



        
  router.get('/',function(req,res,next){

    let date_ob= new Date();
    let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
    let today_date= day+" "+date+" "+month+" "+year;
   
    starting_db.findOne({date:today_date},function(err,doc){
                    
                            
            if(!doc){
                res.render('starting',{title:'Starting-15' ,list:[]});                         
           }
           else { 
            let name= doc['students'].map(item=>{
                  return { 
                      name:item['name'],
                      room_no:item['room_no']
                     } ;  
                    });  
            res.render('starting',{title:'Starting-15' ,list:name }); 
            
             }
    });
   
});
                                             
        

  router.post('/',function(req,res,next){
        let names= req.body.name,names2=[];
            
        if(names){
        names= [].concat(req.body.name);
        room_nos=[].concat(req.body.room_no);
            for(let i=0;i<names.length;i++){
                names2.push({
                    name: (names[i].toLowerCase()).trim(),
                    room_no:room_nos[i],
                    done:false,
                    start:'00:00'
                });
            }
            
        }
        
         let date_ob= new Date();
         let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
         let today_date= day+" "+date+" "+month+" "+year;
        
         starting_db.findOne({date:today_date},function(err,doc){
                if(!doc){
                    starting_db.insertOne({date:today_date ,students:names2},function(err,doc2){
                        if(err)throw err;
                    } );
                  
                }
                else {
                       
                    starting_db.updateOne({date:today_date},{$set:{students:names2 }},function(err,doc2){
                            if(err) throw err;
                    } );
      
                }

         });
         
        
      res.redirect('/admin/starting');     
    
        
  });
  
  
});

  module.exports=router;