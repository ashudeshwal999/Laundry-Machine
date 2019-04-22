var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash =require('connect-flash');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@laundry-gsdfb.mongodb.net/machine?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
     const messages_db = client.db("machine").collection("messages");
     const update_db = client.db("machine").collection("update");
     const subscriber_db = client.db("machine").collection("subscriber");
     


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');
var adminAccountRouter = require('./routes/account');
var adminStartingRouter = require('./routes/starting');
var adminUpdateRouter = require('./routes/update');
var adminRecordRouter = require('./routes/record');
var adminNotificationRouter = require('./routes/notification');


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'thesecret',
  saveUninitialized: true,
  resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash());

app.use(function(req, res, next){
  res.locals.success_messages = req.flash('success_messages');
  res.locals.error_messages = req.flash('error_messages');
  next();
});


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/admin/starting', adminStartingRouter);
app.use('/admin/account', adminAccountRouter);
app.use('/admin/update', adminUpdateRouter);
app.use('/admin/record', adminRecordRouter);
app.use('/admin/notification', adminNotificationRouter);



http.listen( process.env.PORT || 3000,function(err){
  console.log("listening");
  
} );

        

var timer1,timer2,timer3,count1=0,count2=0,count3=0;
 adminFlag=0;

io.on('connection', function(socket){
  
  
      socket.on('admin online',function(){
            adminSocket=socket;
          adminFlag=1;
      });

      socket.on("give name",function(data){
        subscriber_db.findOne({"info.endpoint":data.endpoint},function(err,doc4){
              io.sockets.emit('take name',doc4.name);
              
              
        });
      });



    socket.on('send message',function(doc){
      let date_ob= new Date();
    let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
    let today_date= day+" "+date+" "+month+" "+year;

      let hour=date_ob.getHours(),minutes=date_ob.getMinutes();
      if(hour<10)hour='0'+hour;
      if(minutes<10)minutes='0'+minutes;
      
      

      let item= {
        msg: `${doc.name} : ${doc.msg}`,
        time:`${hour}:${minutes} `
      };

      messages_db.findOne({date:today_date},function(err,doc2){
            
        if(!doc2){  
          messages_db.insertOne({date:today_date ,chat:[item]  },function(err,doc4){
            if(err) throw err;
          });
        }
        else{
          
          messages_db.updateMany({date:today_date},{$push:{chat: item } },function(err,doc3){
            if(err) throw err;   
          });
     
        }
        
      });

      io.sockets.emit('send to all',doc);
        
    });
      

    socket.on('set time on server 1',function(data){
      
      
      if(count1!=0){
        timer1=data;
        send_notify_1=0;
        return ;
      }
      
       timer1 = data;
       var minutes, seconds,last_second=5*60,current_time;
      var Interval=setInterval(function () {
        
          minutes = parseInt(timer1 / 60)
          seconds = parseInt(timer1 % 60);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          current_time = minutes + ":" + seconds;
          if (--timer1 < 0) {
              clearInterval(Interval);
              count1=0;
              io.sockets.emit('set time on client 1',{screen:'EMPTY',color:'red' });
          }
         else if(timer1<last_second-1) {
              io.sockets.emit('set time on client 1',{screen:current_time,color:'red' });
          
          }
          else {
            io.sockets.emit('set time on client 1',{screen:current_time,color:'black' });
          }
          if(timer1==last_second-1){
            send_notification_machine(1,"5 minutes left for your turn.","5 Minutes left");
          }
          if(timer1==2*(last_second)-1){
            send_notification_machine(1,"10 minutes left for your turn.","10 Minutes left");
          }

          
      }, 1000);
      
    count1=1;

    });

    socket.on('set time on server 2',function(data){
      if(count2!=0){
        timer2=data;
        return ;
      }
      
       timer2 = data;

      var  minutes, seconds,last_second=5*60,current_time;
      var Interval=setInterval(function () {
          minutes = parseInt(timer2 / 60)
          seconds = parseInt(timer2 % 60);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          current_time = minutes + ":" + seconds;
          if (--timer2 < 0) {
              clearInterval(Interval);
              count2=0;
              io.sockets.emit('set time on client 2',{screen:'EMPTY',color:'red' });
          }
         else if(timer2<last_second-1) {
              io.sockets.emit('set time on client 2',{screen:current_time,color:'red' });
          }
          else {
            io.sockets.emit('set time on client 2',{screen:current_time,color:'black' });
          }
          if(timer2==last_second-1){
            send_notification_machine(2,"5 minutes left for your turn.","5 Minutes left");
          }
          if(timer2==2*(last_second)-1){
            send_notification_machine(2,"10 minutes left for your turn.","10 Minutes left");
          }
      }, 1000);   

      count2=1;
    });
    
    socket.on('set time on server 3',function(data){
      if(count3!=0){
        timer3=data;
        return ;
      }
      
       timer3 = data;

      var  minutes, seconds,last_second=5*60,current_time;
      var Interval=setInterval(function () {
        
        
          minutes = parseInt(timer3 / 60)
          seconds = parseInt(timer3 % 60);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          current_time = minutes + ":" + seconds;
          if (--timer3 < 0) {
              clearInterval(Interval);
              count3=0;
              io.sockets.emit('set time on client 3',{screen:'EMPTY',color:'red' });
          }
         else if(timer3<last_second-1) {
              io.sockets.emit('set time on client 3',{screen:current_time,color:'red' });
          }
          else {
            io.sockets.emit('set time on client 3',{screen:current_time,color:'black' });
          }
          if(timer3==last_second-1){
            send_notification_machine(3,"5 minutes left for your turn.","5 Minutes left");
          }
          if(timer3==2*(last_second)-1){
            send_notification_machine(3,"10 minutes left for your turn.","10 Minutes left");
          }
          

      }, 1000);  
      count3=1;
    });
    
  socket.on('disconnect', function(){
      
    
  });
});




const webpush = require('web-push');
const applicationServerPublicKey='BHYPy31teyZnhI5JPvCOw92cLEb70kXUY4tYcXrd3qxfdhLosziDKEbbFm0uW9XBp78SIcKzGjGcMeyGBazH-Q4';
const applicationServerprivateKey='crVA3N79qpcWVqFJjnXFyZRH10ZOn8T3sU5rjC8QLJM';

webpush.setVapidDetails(
  'mailto:myuserid@email.com',
  applicationServerPublicKey,
  applicationServerprivateKey
)

function send_notification_machine(no,message,title){
  let date_ob= new Date();
  let day= date_ob.getDay(),month=date_ob.getMonth(),date=date_ob.getDate(),year=date_ob.getFullYear();
  let today_date= day+" "+date+" "+month+" "+year;

  update_db.findOne({date:today_date},function(err,doc){
    let machine_name=doc['machine'][`machine${no}`];
      for(let i=0;i<machine_name.length;i++){
        if(machine_name[i]['done']==false){
          
          let next=machine_name[i];
          let next_name=machine_name[i]['name'];
          console.log(next_name);
          
          let cursor= subscriber_db.find({ "name":{$regex:next_name,$options:"$i"}});
          cursor.each(function(err, item) {
            if(item == null) {
             
              cursor.toArray(function(err, items) { 
                 
                  items.forEach((send)=>{
                    if(send['room']==next['room_no'])
                    webpush.sendNotification(send['info'],JSON.stringify({'msg':send['name']+" "+message ,'title':title}));
                    
                  });
                  
                
              });
            };
          });

         
            
          

          break;
        }
      }
      
      
  });

}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
});