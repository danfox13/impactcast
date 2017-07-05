/**
 * Entry point for server side app
 * @author - Greg Wolverson
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const assert = require('assert');

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'));
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

const index = require('./routes/index');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/jsvalidate', express.static(__dirname + '/node_modules/bootstrap-validator/dist')); // redirect JS Validate
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/fonts')); // redirect bootstrap fonts/glyficons*/
app.use('/public', express.static(__dirname + '/public'));

app.use('/', index);

module.exports = app;
