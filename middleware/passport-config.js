const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { Admin } = require("../models/Admin");

function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    Admin.findOne({ username: username.toLowerCase() }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Incorrect username" });

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return done(err);

        if (result) return done(null, user);

        return done(null, false, { message: "Incorrect Password" });
      });
    });
  };
  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, user) => {
      return done(err, user);
    });
  });
}

module.exports = initialize;
