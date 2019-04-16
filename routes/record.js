var express = require('express');
var router = express.Router();


var days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
const update_db = client.db("machine").collection("update");

        


router.get('/', function(req,res,next){    
 
    res.render('record',{title:'Record',data:[] ,show:1,date:'' });
   
  });


  router.post('/',function(req,res,next){
      var queryy_date=req.body.date;
      var queryy_date_day= queryy_date.split(' ')[0];
        queryy_date_day=parseInt(queryy_date_day);
      var queryy_date_date=queryy_date.split(' ')[2] ;
      var queryy_date_month=queryy_date.split(' ')[1];
      queryy_date_month=parseInt(queryy_date_month);
      var queryy_date_year=queryy_date.split(' ')[3];

      queryy_date= queryy_date_day+" "+queryy_date_date+" "+queryy_date_month+" "+queryy_date_year;

      

      update_db.findOne({date:queryy_date},function(err,doc){
        var data;
        
        if(!doc){
         data=[];
        }
        else{
          let m1=doc['machine']['machine1'];
          let m2=doc['machine']['machine2'];
          let m3=doc['machine']['machine3'];
          data=m1.concat(m2);
          data=data.concat(m3);
          data.sort(compare);
         

        }
        var date_string=days[queryy_date_day]+" "+ queryy_date_date+" "+month[queryy_date_month]+" "+queryy_date_year; 
        res.render('record',{title:'Record',data:data ,date:date_string, show:0  });


      });
     

  });

  function compare(a,b){
    if (a.start < b.start)return -1;
    if (a.start > b.start)return 1;
    return 0;
  }

});

  module.exports = router;