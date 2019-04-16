/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
     const update_db = client.db("machine").collection("update");
        
        client.close();  

});

/*
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/machine',{useNewUrlParser:true});
var db = mongoose.connection;

var schema = mongoose.Schema;
var userSchema = new schema({
date:{type:String},   
machine:{
    machine1:[
        { 
            name:{type:String} , 
            room_no:{type:Number},
            done:{type:Boolean ,default:false},
            start:{type:String ,default:'00:00' },
            _id:false
        }
         ],
    machine2:[
            { 
                name:{type:String} , 
                room_no:{type:Number},
                done:{type:Boolean ,default:false},
                start:{type:String ,default:'00:00' },
                _id:false
            }
             ],
     machine3:[
                { 
                    name:{type:String} , 
                    room_no:{type:Number},
                    done:{type:Boolean ,default:false},
                    start:{type:String ,default:'00:00' },
                    _id:false
                }
                 ]
                          
                
    }

},{collection:'update'} );

var update_db=module.exports=mongoose.model('update',userSchema);

*/