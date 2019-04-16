
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
     const messages_db = client.db("machine").collection("messages");
        
        client.close();  

});


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/machine',{useNewUrlParser:true});
var db = mongoose.connection;

var schema = mongoose.Schema;
var userSchema = new schema({
date:{type:String},   
chat:[
    { 
        msg:{type:String} ,
        time:{type:String},
        _id:false
    }
     ]

},{collection:'messages'} );

var messages_db=module.exports=mongoose.model('messages',userSchema);

*/