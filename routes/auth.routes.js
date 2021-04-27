const express = require("express");
const bcypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User.model");
const router = express.Router();
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", isLoggedOut, (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.render("auth/signup", {
      errorMessage: "Username and password are required",
    });
  }

  User.findOne({ name }).then((user) => {
    if (user) {
      res.render("auth/signup", {
        errorMessage: "User or email already exists.",
      });
    }

    User.findOne({ email }).then((email) => {
      if (email) {
        res.render("auth/signup", {
          errorMessage: "User or email already exists",
        });
      }
    });
    const salt = bcypt.genSaltSync(saltRounds);
    const hashPass = bcypt.hashSync(password, salt);

    User.create({ name, email, password: hashPass })
      .then((newUser) => {
        req.login(newUser, (error) => {
          if (error) {
            next(error);
          }
          return res.redirect(`/user/${newUser._id}`);
        });
      })
      .catch((error) => {
        return res.render("auth/signup", {
          errorMessage: "Server error. Try again",
        });
      });
  });
});

router.get("/login", isLoggedOut, (req, res) => {
  let errorMessage = req.flash("error")[0];
  const { email, password } = req.body;
  if ((!email || !password) && errorMessage) {
    return res.render("auth/login", {
      errorMessage: "Username and password are required",
    });
  }
  res.render("auth/login");
});

router.post(
  "/login",
  isLoggedOut,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
  })
);

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
