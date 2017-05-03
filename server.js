var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');

var index = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', index);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  // err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
