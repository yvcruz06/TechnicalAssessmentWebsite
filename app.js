var createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();

// Session for Logged in Users
var session = require('express-session');
app.locals.currentUserID = "";
app.locals.user = false;
app.locals.admin = false;

app.use(session({
  secret: "Crazy Green",
  rolling: true,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 5
  }
}));

// Promises
const Promise = require('bluebird');
mongoose.Promise = Promise;

// Register view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware & Static Files
app.engine('html', require('ejs').renderFile);
app.use(express.static('public')); // access images, css, js
app.use(express.static('css'));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Avoid deprecated warning for findByIdAndUpdate()
mongoose.set('useFindAndModify', false);

// Connect to mongodb
const uri = 'mongodb+srv://Esoto1290:CSTwebstore1900@cst438.vwxeq.mongodb.net/TechnicalAssistant?retryWrites=true&w=majority';
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(process.env.PORT || 3000, function () {
      console.log('Express server is running...');
      console.log(this.address().port);
    })
  )
  .catch((err) => console.log(err));


// Some of these don't make sense. Look over it later
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var welcomeRouter = require('./routes/welcome');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var quiz_router = require('./routes/quiz');
var result_router = require('./routes/result');
var signupRouter = require('./routes/signup');
var questionsRoutes = require('./routes/questions');
var logoutRouter = require('./routes/logout');

app.use('/', welcomeRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/quiz', quiz_router);
app.use('/result', result_router);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/question', questionsRoutes);
app.use('/logout', logoutRouter);

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


module.exports = app;