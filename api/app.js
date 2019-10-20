var createError = require('http-errors');
var express = require('express');
var app = express();
var dbConn = require('./db');

// var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var stocksRouter = require('./routes/stocks');
var usersRouter = require('./routes/users');
var accountsRouter = require('./routes/accounts');
var inplayRouter = require('./routes/inplay');

// app.use(function(req, res, next) {
//   token = req.headers.token;
//   console.log(token);
//   if(token){
//     next();
//   }else{
//     res.status(400).send("unauthorized");
//   }
// });

var openMiddleware = function(req, res, next) {
  token = req.headers.token;
  // console.log("open middleware : "+token);
  if(token == 'x'){
    // console.log("open middleware : "+token);
    next();
  }else{
    // console.log("unauthorized");
    res.status(400).send("unauthorized");
  }
}

var closedMiddleware = function(req, res, next) {
  token = req.headers.token;
  mobile = req.headers.mobile;
  // console.log("closed middleware : "+token);
  if(token){
    if(token != 'x'){
      // console.log("closed middleware : "+token);
      // console.log("closed middleware : "+mobile);
      dbConn.query('SELECT id FROM users where ? AND ?', [{mobile:mobile},{token:token}], function (error, results, fields) {
        if(error){
           return res.status(400).send({ error:true, message: error.message });
         }
         if(!results[0]){
           return res.status(400).send({ error:true, message: "security error" });      
         }
        next();
      });
    }else{
      // console.log("unauthorized");
      res.status(400).send("unauthorized");
    }
  }else{
    // console.log("unauthorized");
    res.status(400).send("unauthorized");
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', indexRouter, openMiddleware);
app.use('/auth', openMiddleware, authRouter);
app.use('/stocks', closedMiddleware, stocksRouter);
app.use('/users', closedMiddleware, usersRouter);
app.use('/accounts', closedMiddleware, accountsRouter);
app.use('/inplay', closedMiddleware, inplayRouter );

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(400).send({ error:true, message: err.message });
});

app.use(function (err, req, res, next) {
  // console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
