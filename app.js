var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var handleLayoutMDW = require('./middleware/handle-layout');

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Models
var models = require("./models");

//setting middleware
// require('./app/config/passport')(passport);

//Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});


//session

var myStore = new SequelizeStore({
    db: models.sequelize,
    expiration: 24 * 60 * 60 * 1000 * 30,  // The maximum age (in milliseconds) of a valid session.
})

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: myStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    unset: 'destroy',
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false
    }, // 30 days
}));

myStore.sync();

app.use(handleLayoutMDW);

app.use('/', indexRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

const server_port = process.env.PORT || 3000;

const server = app.listen(server_port, function () {
  console.log(`App listening at port ${server_port}`)
});


