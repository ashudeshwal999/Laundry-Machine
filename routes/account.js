var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
     const Admin = client.db("machine").collection("admin");
    

router.get('/',ensureAuthenticated, function(req,res,next){    
  
    res.render('account',{title:'Account',message:''});
   
  });

  function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect('/login');
     
}

  router.post('/', function(req,res,next){
    let oldAdminName=req.body.label1,
      newAdminName=req.body.label2,
      oldPassword=req.body.label3,
      newPassword=req.body.label4,



      flag=false;
          
      Admin.findOne({username:oldAdminName},function(err,doc){
        if(err) throw err;      
        if(!doc){    
          req.flash('info','Invalid Admin name or Password');  
          res.render('account',{title:'Account',message: req.flash('info') });
          return;
        }
        if(doc.password==oldPassword){
          Admin.updateOne({username:doc.username},{$set:{
            username : newAdminName ,
            password:newPassword 
           }},function(err,doc){
             if(err)throw err;
           } );
           req.flash('info','Admin & password changed');
           res.render('account',{title:'Account',message: req.flash('info') });
           return ;
        }
        req.flash('info','Invalid Admin name or Password');  
          res.render('account',{title:'Account',message: req.flash('info') });
      
      } );
     
  });
  
});

  module.exports=router;