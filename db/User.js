/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
     const Admin = client.db("machine").collection("admin");
    
    Admin.countDocuments({},function(err,count){
        if(count==0){
            Admin.insertOne({username:'admin',password:'admin'},function(err,doc){
             client.close();
            });
        }
        
    });
    

});


*/