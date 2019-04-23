var express = require('express');
var router = express.Router();



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
     const messages_db = client.db("machine").collection("messages");


router.get('/', ensureAuthenticated, function(req,res,next){   
    let date_ob= new Date();
    let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
    let today_date= day+" "+date+" "+month+" "+year;
    
    let chat_msg;
    messages_db.findOne({date:today_date},function(err,doc2){
        if(!doc2){
          chat_msg=[];
        }
        else {
         chat_msg=Array.from(doc2['chat'] ) ;
        }  
        res.render('admin',{title:'Admin',txt:chat_msg});

      });
    
    
  });



  function ensureAuthenticated(req,res,next){
      if(req.isAuthenticated()){
          return next();
      } 
      res.redirect('/login');
       
  }

  
  
  


  router.get('/logout',function(req,res,next){
    adminFlag=0;
      req.logout();
      res.redirect('/login');
  });

});


  module.exports=router;