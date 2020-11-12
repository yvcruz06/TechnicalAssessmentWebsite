var createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();

// Promises
const Promise = require('bluebird');
mongoose.Promise = Promise;

// Register view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware & Static Files
app.use(express.static('public')); // access images, css, js
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Avoid deprecated warning for findByIdAndUpdate()
mongoose.set('useFindAndModify', false);

// Models from our Database
const User = require('./models/user');

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


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var quiz_router = require('./routes/quiz')
var signupRouter = require('./routes/signup');
var questionsRouter = require('./routes/questions');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quiz', quiz_router)
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/questions', questionsRouter);

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
