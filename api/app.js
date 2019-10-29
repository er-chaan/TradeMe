var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var app = express();

var dbConn = require('./db');

// var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var stocksRouter = require('./routes/stocks');
var usersRouter = require('./routes/users');
var accountsRouter = require('./routes/accounts');
var inplayRouter = require('./routes/inplay');
var adminRouter = require('./routes/admin');

app.use(cors());

var openMiddleware = function(req, res, next) {
  token = req.headers.token;
  mobile = req.headers.mobile;
  if(token == 'x' && mobile == 'x'){
    next();
  }else{
    res.status(400).send("unauthorized");
  }
}

var closedMiddleware = function(req, res, next) {
  token = req.headers.token;
  mobile = req.headers.mobile;
  if(token){
    if(token != 'x'){
      dbConn.query('SELECT id FROM users where ? AND ?', [{mobile:mobile},{token:token}], function (error, results, fields) {
        if(error){
           return res.status(400).send({ error:true, message: error.message });
         }
         if(!results[0]){
           return res.status(400).send({ error:true, message: "unauthorized" });      
         }
        next();
      });
    }else{
      res.status(400).send("unauthorized");
    }
  }else{
    res.status(400).send("unauthorized");
  }
}


var adminMiddleware = function(req, res, next) {
  token = req.headers.token;
  mobile = req.headers.mobile;
  if(token){
    if(token != 'x'){
      if(mobile != '9004313006'){
        return res.status(400).send({ error:true, message: "unauthorized" });      
      }
      dbConn.query('SELECT id FROM users where ? AND ?', [{mobile:mobile},{token:token}], function (error, results, fields) {
        if(error){
           return res.status(400).send({ error:true, message: error.message });
         }
         if(!results[0]){
           return res.status(400).send({ error:true, message: "unauthorized" });      
         }
        next();
      });
    }else{
      res.status(400).send("unauthorized");
    }
  }else{
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
app.use('/admin', adminMiddleware, adminRouter );


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send({ error:true, message: err.message });
});

module.exports = app;
