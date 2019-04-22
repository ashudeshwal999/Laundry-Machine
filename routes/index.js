var express = require('express');
var router = express.Router();
var fs = require('fs');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
const update_db = client.db("machine").collection("update");
const notification_db = client.db("machine").collection("notification");
const messages_db = client.db("machine").collection("messages");
const subscriber_db = client.db("machine").collection("subscriber");

        
    


/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  let date_ob= new Date();
    let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
    let today_date= day+" "+date+" "+month+" "+year;

    var list1=[],list2=[],list3=[],chat_msg=[],msg=[];
    let current_name={
      current_name1,
      current_name2,
      current_name3
    }
    console.log(current_name);
    

    update_db.findOne({date:today_date},function(err,doc){
            if(!doc){
                         
             }
           else {
          
             
             list1= doc['machine']['machine1'];
             list2= doc['machine']['machine2'];
             list3= doc['machine']['machine3'];

            }

           messages_db.findOne({date:today_date},function(err,doc2){
             
             
             
            if(!doc2){
              chat_msg=[];
            }
            else {
             chat_msg=doc2['chat']  ;
             
            } 
            
            notification_db.findOne({date:today_date},function(err,doc3){
             let msg=[];
              if(!doc3){
                  msg=[];
              }
              else{
                  msg=doc3['notify'];
              }
             
              
             
              
              res.render('index',{title:'HOME' ,list1:list1,list2:list2,list3:list3,txt:chat_msg ,notification_msg:msg,flag:adminFlag ,
              current_name:current_name }); 
      
            });
           
            
       
          });
    });
    

});


router.post('/add',function(req,res,next){

  
  let subscribe_obj =req.body.subscribe;
  let name=req.body.name;
  let room =req.body.room;
  let endpoint =subscribe_obj.endpoint;

  subscriber_db.findOne({ "info.endpoint":endpoint },function(err,doc){
    console.log("findOne-");
    if(!doc){
      let data_main= {
          name:name,
          room:room,
          info:subscribe_obj
      };
      
       subscriber_db.insertOne(data_main,function(err,doc3){
         console.log("Insert");
         console.log(doc3); 
       });
       
           
    }
  });
 
  res.redirect('/');
  
});


router.post('/remove',function(req,res,next){
  let subscribe_obj =req.body.subscribe;
  let endpoint =subscribe_obj.endpoint;
            
  subscriber_db.deleteOne({"info.endpoint":endpoint },function(err,doc){   
     console.log(doc);
  });
  

  

});




});




module.exports = router;
