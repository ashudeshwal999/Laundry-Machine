var express = require('express');
var router = express.Router();
var subscribe_db=require('../db/subscribe');


const webpush = require('web-push');
     const applicationServerPublicKey='BHYPy31teyZnhI5JPvCOw92cLEb70kXUY4tYcXrd3qxfdhLosziDKEbbFm0uW9XBp78SIcKzGjGcMeyGBazH-Q4';
     const applicationServerprivateKey='crVA3N79qpcWVqFJjnXFyZRH10ZOn8T3sU5rjC8QLJM';
     
     webpush.setVapidDetails(
       'mailto:myuserid@email.com',
       applicationServerPublicKey,
       applicationServerprivateKey
     )


 const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
 const client = new MongoClient(uri, { useNewUrlParser: true });
 client.connect(err => {
const notification_db = client.db("machine").collection("notification");
const subscriber_db = client.db("machine").collection("subscriber");
                
                
            
            router.get('/', function(req, res, next) {
                let date_ob= new Date();
                let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
                let today_date= day+" "+date+" "+month+" "+year;

                notification_db.findOne({date:today_date},function(err,doc){
                    let msg;
                    if(!doc){
                        msg=[];
                    }
                    else{
                        msg=doc['notify'];
                    }
                    res.render('notification',{title:'Notification',notification_msg:msg});

                });



            
            
            });


            router.post('/',function(req,res,next){
                var notification_msg=req.body.notification;  
                notification_msg= notification_msg.trim();

                
               let cursor= subscriber_db.find({});
          cursor.each(function(err, item) {
            if(item == null) {
             
              cursor.toArray(function(err, items) { 
                 
                  items.forEach((send)=>{
                    
                    webpush.sendNotification(send['info'],JSON.stringify({'msg':notification_msg ,'title':"Notification"}));
                    
                  });
                  
                
              });
            };
          });


                    
                let date_ob= new Date();
                let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
                let today_date= day+" "+date+" "+month+" "+year;

                let hour=date_ob.getHours(),minutes=date_ob.getMinutes();
                if(hour<10)hour='0'+hour;
                if(minutes<10)minutes='0'+minutes;
                let current_time=`${hour}:${minutes} `;

                    var query= {
                        info:notification_msg,
                        time:current_time
                    }

                notification_db.findOne({date:today_date},function(err,doc){

                    if(!doc){
                        notification_db.insertOne({date:today_date ,notify:[query] });
                    }
                    else{
                        notification_db.updateOne({date:today_date},{$push:{notify:query } },function(err,doc2){
                            if(err) throw err;
                            
                        } );
                    }


                    notification_db.findOne({date:today_date},function(err,doc2){
                    msg=doc2['notify'];
                     res.render('notification',{title:'Notification',notification_msg:msg });
                    });
                    
                    
                    
                });
                

                res.redirect('/admin/notification');
            });


});



module.exports=router;