var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var aws = require('aws-sdk');
var bcrypt = require('bcryptjs');
//var exphbs = require('express-handlebars');

var index = require('./routes/index');
var missionloc = require('./routes/missionloc');
var donors = require('./routes/donors');
var recipients = require('./routes/recipients');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath(__dirname + '/config.json');

aws.config.region = 'us-west-2';

//console.log("process.env-app: ", process.env);

app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('combined'));

app.use('/', index);
app.use('/donors', donors);
app.use('/recipients', recipients);
app.use('/missionloc', missionloc);

app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    next();
})

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
    console.log("err: ", err);
  res.render('error');
});

module.exports = app;
