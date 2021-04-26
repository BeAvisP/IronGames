const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const flash = require('connect-flash');

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error);
      });
  });
  app.use(flash());
  //Local Strategy
  passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      (req, username, password, done) => {
        User.findOne({ email: username })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                error: "Incorrect email or password",
              });
            }
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, {
                error: "Incorrect email or password",
              });
            }
            done(null, user);
          })
          .catch((error) => {
            done(error);
          });
      }
    )
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
