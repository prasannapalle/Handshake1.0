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

var sessvar;
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

var User = {
    username : "admin",
    password : "admin"
}

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





app.post('/companylogin',function(req,res)
{
console.log("Inside Company Login Post Request");
//console.log("Req Body : ", username + "password : ",password);
console.log("Req Body : ",req.body);
sessvar = req.session;
let email= req.body.username;
let password1 = req.body.password;
sessvar.email = email;
con.query('SELECT * FROM company WHERE emailid = ?',[email], function (error, results, fields) {
if (error) 
{
console.log("error ocurred",error);
res.send("err");
}
else
{
if(results.length > 0){
if(results[0].pwd === password1)
{
console.log('success');
console.log(results);
res.cookie('companydata',results);
sessvar.username = results[0].companyname;
sessvar.company_id = results[0].company_id;
req.session.username = sessvar.username;
res.cookie('cookie',results,{maxAge: 900000, httpOnly: false, path : '/'});
console.log("company_id",sessvar.company_id);
console.log(results[0].company_id);
res.send(results[0].companyname);
} 
else
{
res.send("fail2");
console.log('wrong password');
}
}
}
});
});

// app.get('/profileWorkDetails',function(req,res)
// {
// console.log('profile work details');
// con.query('SELECT * from experience' , function(error,results)
// {
//   console.log(results);
//   res.json({results});
// }
// )
// });



app.post('/companysignup', function (req, res) {
  console.log('companyregistration initialized');
  console.log("Req Body : ",req.body);
  var flag2=0;
  
  if(!req.session.user)
  {
  res.cookie(null);
  }
  else
  {
  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
  }
  
  let data=[req.body.company,req.body.emailid,req.body.password,req.body.location]
  
  con.query('INSERT into company(companyname,emailid,pwd,location) VALUES(?,?,?,?)',[req.body.company,req.body.emailid,req.body.password,req.body.location],
  function (error, results, fields) {
  if (error) {
  console.log("error ocurred",error);
  res.send("err");
  }
  else{
  console.log(data);
  res.send("success")
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
  console.log("session var in display job ",sessvar.emailID);
  });



  app.post('/updatedetails', async (req, res) => {
 
    console.log('in backend axios');
    console.log("in session",req.session.emailID);
    console.log("in updatedetails",req.body);
    con.query('update userdetails set emailID = ?, name = ? , password= ?, collegeName = ?  where emailID = ? ' , [req.session.emailID,req.body.name,req.body.password,req.body.collegeName] ,function (error, results, fields) {
      {
        console.log("eeeee",req.body.emailID);
        console.log(results);
        res.json({ results });
        
    }});
    console.log("session var in display job ",sessvar.emailID);
    });

    app.get('/userDetails', function(req,res){

      var emailId = "'"+req.body.emailId+"'";
      // if(emailId)
      // var emailId = req.params.emailId;
      console.log("here "+ req.session.emailID);
      con.query( 'SELECT * from userDetails where emailID= ?',[req.session.emailID], function(error,results)
      {
      res.json({results});
      console.log(results);
      });
      // var dbQuery = "Select * from userDetails Where emailID = " + emailId;

    //   con.query(
    //     dbQuery,
    //     (err, rows) => {
    //     if (err) throw err;   
    //     console.log('Data received from Db:\n');
    //     console.log(rows);
    //     res.body = rows;
    //     return res.send(rows[0]);
    //     }
    // );
     
      })


      app.post('/submitnewjob',function(req,res){

console.log("in submitnewjob");
console.log(req.body);

      });



  app.post('/updateform', function(req,res)
  {

    let updateUser = (req,res) => {
    
      var collegeName = req.body.collegeName;
      var profilePic = req.body.profilePic;
      var careerObjective = req.body.careerObjective;
      var education = req.body.education;
      var skillset = req.body.skillset;
      var dob = req.body.dob;
      var city = req.body.city;
      var state = req.body.state;
      var country = req.body.country;
      var collegeLocation = req.body.collegeLocation;
      var degree = req.body.degree;
      var major = req.body.major;
      var yearOfPassing = req.body.yearOfPassing;
      var currentCGPA = req.body.currentCGPA;
      var expCompanyName = req.body.expCompanyName;
      var expCompanyTitle = req.body.expCompanyTitle;
      var expLocation = req.body.expLocation;
      var expStartD = req.body.expStartDate;
      var expEndD = req.body.expEndDate;
      var expDescription = req.body.expDescription;
      var resume = req.body.resume;
      var name = req.body.name;
      var emailID = req.body.emailID;
      var contactNo = req.body.contactNo;
  
      var dbQuery = "UPDATE userDetails SET name='"+name+"', collegeName='"+ collegeName+"', careerObjective='"+ careerObjective+"', careerObjective='"+ careerObjective+"', education='"+ education+"', skillset='"+ skillset+"', dob='"+ dob+"', city='"+ city+"', state='"+ state+"', country='"+ country+"', collegeLocation='"+ collegeLocation+"', degree='"+ degree+"', major='"+ major+"', yearOfPassing='"+ yearOfPassing+"', currentCGPA='"+ currentCGPA+"', expCompanyName='"+ expCompanyName+"', expCompanyTitle='"+ expCompanyTitle+"', expLocation='"+ expLocation+"', expStartDate='"+ expStartD+"', expEndDate='"+ expEndD+"', expDescription='"+ expDescription+"', resume='"+ resume +"',contactNo = '" + contactNo +"' WHERE emailID = '" + emailID + "'"; 
  
      dbCon.con.query(
          dbQuery,
          (err, rows) => {
              if (err){
                  console.log('error while updating'+err);
                  res.writeHead(401, {
                      "Content-Type": "text/plain"
                  });
                  res.end("Error Occurred");
              }else{
                  console.log('server response while updating');
                  res.writeHead(200, {
                      "Content-Type": "text/plain"
                  });
                  res.end("User Updated");
              } 
          }
      );
  }
  
    console.log("in update form",req.body);

  })

  app.post('/login',function(req,res){
    sessvar=req.session;
      console.log("Inside Login Post Request");
      console.log("Req Body : ",req.body);
      
          let email= req.body.username;
          let password1 = req.body.password;
          con.query('SELECT * FROM userDetails WHERE emailID = ?',[email], function (error, results, fields) {
          if (error) {
            console.log("error ocurred",error);
            res.send("err");
          }else{
            // console.log('The solution is: ', results);
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            // res.writeHead(200,{
            //     'Content-Type' : 'text/plain',
               
            // })
            if(results.length >0){
              if(results[0].password == password1){
               sessvar.name = results[0].name;
               req.session.name=sessvar.name;
               req.session.emailID = results[0].emailID;
        console.log("sess:"+req.session.emailID);
             
                console.log('success');
              
              res.send(req.session.name);
              
              }
              else{
                res.send("fail2");
                console.log('wrong password');
              }
            }
            else{
              res.send("fail1");
              console.log('username doesnt exist');
            }
          }
          });    
  });


  app.post('/reg', function (req, res) {
    
    console.log('reg');
    console.log("Req Body : ",req.body);
      var flag2=0;
  
      if(!req.session.user)
      {
          res.cookie(null);
      }
      else{
          res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
      }
  
      let data=[req.body.name,req.body.email,req.body.password,req.body.collegename] 
  
      con.query('INSERT into userDetails(name,emailID,password,collegeName) VALUES(?,?,?,?)',[req.body.name,req.body.email,req.body.password,req.body.collegename], 
      function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send("err");
        }
        else{
         console.log(data);
         res.send("success");
        }
        });
  
      });


    
app.listen(3001);
console.log("Server Listening on port 3001");