var express = require('express');
var router = express.Router();
var passport= require('passport');
var LocalStrategy = require('passport-local');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
     const Admin = client.db("machine").collection("admin");
    
   




router.get('/', function(req, res, next) {
  res.render('login',{title:'login'});
});


passport.serializeUser(function(user,done){
  done(null,user.username);
});

passport.deserializeUser(function(username,done){
  Admin.findOne({username:username},function(err,user){
      done(err,user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    Admin.findOne({username:username} ,function(err,user){  
      
      if(err) throw err;
      if(!user){
        return done(null,false); 
      }
      if(user.password !=password){
        return done(null,false);
      }    
      return done(null,user);
    } );
  }
));


router.post('/', passport.authenticate('local',{  failureRedirect: '/login' }),
function(req,res,next){
  adminFlag=1;;
  res.redirect('/admin');
  
});


});

module.exports = router;