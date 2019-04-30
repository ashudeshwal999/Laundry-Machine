
/*var mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/machine' ,{useNewUrlParser:true});

var db=mongoose.connection;

var schema = mongoose.Schema;
var userSchema = new schema({
    
                name :{type:String},
                info : {
                    endpoint:{type:String},
                    keys:{
                        p256dh:{type:String},
                        auth:{type:String}
                    },
                    _id:false
                },
                
            
        

},{collection:'subscribe'} );

var subscribe_db=module.exports=mongoose.model('subscribe',userSchema);

*/