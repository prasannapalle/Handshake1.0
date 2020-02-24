//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');


const mysql = require('mysql');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'MySql!05';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'handshake';

// Create the connection with required details
const con = mysql.createConnection({
  host, user, password, database,
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
  secret              : 'cmpe273_kafka_passport_mongo',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

var Users = [{
    username : "admin",
    password : "admin"
}]

var books = [
  {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
  {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
  {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//use express session to maintain session data





app.post('/companylogin',function(req,res){
    
  // Object.keys(req.body).forEach(function(key){
  //     req.body = JSON.parse(key);
  // });
  // var username = req.body.username;
  // var password = req.body.password;
  console.log("Inside Login Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ",req.body);  
});

app.post('/creg', function (req, res) {
  console.log('creg');
  console.log("Req Body : ",req.body);
  var flag2=0;
  
  if(!req.session.user)
  {
  res.cookie(null);
  }
  else{
  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
  }
  
  let data=[req.body.cname,req.body.email,req.body.password,req.body.location]
  
  con.query('INSERT into company(companyname,emailid,pwd,location) VALUES(?,?,?,?)',[req.body.cname,req.body.email,req.body.password,req.body.location],
  function (error, results, fields) {
  if (error) {
  console.log("error ocurred",error);
  res.send("err");
  }
  else{
  console.log(data);
  }
  });
  
  });

  app.get('/displaystudentdetails', async (req, res) => {
 
    con.query( 'SELECT * FROM student', function(error,results)
    {
        console.log(results);
        res.json({ results });
        
    });
});


app.get('/displayjobdetails', async (req, res) => {
 
  console.log('in backend');
  con.query( 'SELECT * FROM jobopenings', function(error,results)
  {
      console.log(results);
      res.json({ results });
      
  });
});


app.listen(3001);
console.log("Server Listening on port 3001");