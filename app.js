var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var index = require('./routes/index');
// var login = require('./routes/login');
// var newProject = require('./routes/project/newProject');
// var addProject = require('./routes/project/newProject');
// var searchProjects = require('./routes/project/searchProjects');
// var project = require('./routes/project/project');


var dburl = 'mongodb://localhost:27017/partyparrot';
MongoClient.connect(dburl, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
});

var appName = "ImpactCast";
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/jsvalidate', express.static(__dirname + '/node_modules/bootstrap-validator/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/fonts')); // redirect bootstrap fonts/glyficons
app.use('/public', express.static(__dirname + '/public'));

app.use('/', index);
// app.use('/login', login);
//
// //Project URLs
// app.use('/newProject', newProject);
// app.use('/addProject', addProject);
// app.use('/searchProjects', searchProjects);
// app.use('/project', project);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
