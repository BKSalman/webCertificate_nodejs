const createError = require('http-errors');
const express = require('express');
const fs = require("fs");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts')
const session = require("express-session");
const connection = require("./middleware/db");
const passport = require("passport");
const initializePassport = require("./middleware/passport-config");
const crypto = require("crypto");
require("dotenv").config({ path: ".env" });


const app = express();
const port = process.env.PORT || 3000;

// console.log(crypto.randomBytes(24).toString('hex'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'base');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initializePassport(passport);

connection();

const routesFiles = fs
  .readdirSync("./routes")
  .filter((file) => file.endsWith(".js"));

for (const file of routesFiles) {
  const router = require(`./routes/${file}`);
  app.use(router.path, router.router);
}
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


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
