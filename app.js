require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

const passport = require('./passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var footwearRouter = require('./routes/footwears');
var detailRouter = require('./routes/productdetail');

const usersApiRouter = require('./routes/api/user_api');
const orderApiRouter = require('./routes/api/order_api');

var hbs = require('hbs');

// register path to partials
hbs.registerPartials(__dirname + '/views/partials');

var paginate = require('handlebars-paginate');
hbs.registerHelper('paginate', paginate);
hbs.handlebars.registerHelper('paginateHelper', paginate.createPagination);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Passport middlewares
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
//Pass req.user to res.locals
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});
//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/footwears', footwearRouter);

app.use('/footwears', detailRouter);
//Route API
app.use('/api/users', usersApiRouter);
app.use('/api/order', orderApiRouter);


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