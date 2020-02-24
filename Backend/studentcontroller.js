// var express = require('express');
// var router = express.Router();
// var app = express();
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var cookieParser = require('cookie-parser');
// var cors = require('cors');
// const mysql = require('mysql');
// app.set('view engine', 'ejs');
// const dbConfig = require('./dbConfig');
// // ↑ exports = {user, password, host, database}
// const connection = require('./connection');
// const query = require('./query');
// const port = 3000;
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
//   });


//   router.get('/displaystudentdetails', async (req, res) => {
   
//     const conn = await connection(dbConfig).catch(e => {
//         console.log("error");
//     }) 
//     const results = await query(conn, 'SELECT * FROM student').catch(console.log);
//     res.json({ results });
  
// });



