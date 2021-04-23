const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error);
      });
  });
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                errorMessage: "Incorrect username or password",
              });
            }
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, {
                errorMessage: "Incorrect username or password",
              });
            }
            done(null, user);
          })
          .catch((error) => {
            done(erro);
          });
      }
    )
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
