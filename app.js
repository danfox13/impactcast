var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var assert = require('assert');

var index = require('./routes/index');

var app = express();



function checkAuth (req, res, next) {
    console.log('checkAuth ' + req.url);

    // don't serve /secure to those not logged in
    // you should add to this list, for each and every secure url
    if ((!(req.url === '/' || req.url === '/login'
        || req.url === '/forgotPassword'
        || req.url === '/resetPassword'
        || req.url === '/invalidEmail'
        || req.url.match("/reset/.*"))) && (!req.session || !req.session.authenticated)) {
      console.log('hit');
        res.render('login', {
            title: 'ImpactCast - Login',
            //TODO returns a 200 not 403
            status: 403,
            failedLogin: (req.url === '/failedLogin'?true:false)
        });
        return;
    }
    next();
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/jsvalidate', express.static(__dirname + '/node_modules/bootstrap-validator/dist')); // redirect JS Validate
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/fonts')); // redirect bootstrap fonts/glyficons
app.use('/public', express.static(__dirname + '/public'));
app.use(checkAuth);
app.use('/', index);

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
