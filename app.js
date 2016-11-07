var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var roles = require('./routes/roles');
var user_role = require('./routes/user_role');

var app = express();


// mongoose config
var mongoose = require('mongoose')  
  , connectionString = 'mongodb://localhost:27017/message_board'
  , options = {};
mongoose.Promise = global.Promise;
options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
};
mongoose.connect(connectionString);  
mongoose.connection.on ('error', () => {
    console.log('连接数据库失败')
});
mongoose.connection.once ('open', function () {
    console.log('连接数据库成功!')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置session
app.use(session({
  secret: 'jsfioj12314sjfi',
  name: 'useradmin',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true,
}));



app.use('/', routes);
app.use('/users', users);
app.use('/roles',roles);
app.use('/user_role',user_role);

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