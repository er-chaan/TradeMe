var createError = require('http-errors');
var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var stocksRouter = require('./routes/stocks');
var usersRouter = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/stocks', stocksRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.send(err.message);
});

module.exports = app;
