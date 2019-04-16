/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
     const notification_db = client.db("machine").collection("notification");
        
        client.close();  

});




/*var mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/machine' ,{useNewUrlParser:true});

var db=mongoose.connection;

var schema = mongoose.Schema;
var userSchema = new schema({
date:{type:String},   
notify:[
    { 
        info:{type:String} ,
        time:{type:String},
        _id:false
    }
     ]

},{collection:'notification'} );

var notification_db=module.exports=mongoose.model('notification',userSchema);

*/