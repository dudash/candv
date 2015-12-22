// CandV
// Created by: Jason Dudash
// https://github.com/dudash
//
// (C) 2015 Red Hat
//
// Released under the terms of MIT License
// https://opensource.org/licenses/MIT


// I like bunyan better than morgan, express generator likes morgan so I left them both in
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "myapp"});
log.info("Staring CandV");

// routing and webserver
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// database setup
var user = process.env.MONGODB_USER || 'dummy';
var pass = process.env.MONGODB_PASSWORD || 'dummy';
var dbip = process.env.MONGODB_SERVICE_HOST || 'localhost';
var dbport = process.env.MONGODB_SERVICE_PORT || 27017;
var dbcoll = process.env.MONGODB_DATABASE || 'cvDevel';
//var dbcoll = process.env.MONGODB_DATABASE || 'cvTest';
//var dbcoll = process.env.MONGODB_DATABASE || 'cvProd';
// uncomment to use with authentication
//var url = user+':'+pass+'@'+dbip+':'+dbport+'/'+dbcoll;
// uncomment to use without authentication
var url = dbip+':'+dbport+'/'+dbcoll

log.info('connecting to mongodb at ' + url);
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(url);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next) {
    req.db = db;  // make db available to express routes
    next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
