const express = require("express");
const bcypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User.model");
const router = express.Router();
const saltRounds = 10;

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
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
          return res.redirect("/profile");
        });
      })
      .catch((error) => {
        return res.render("auth/signup", {
          errorMessage: "Server error. Try again",
        });
      });
  });
});

router.get("/login", (req, res) => {
  console.log(req.flash());
  res.render("auth/login", { errorMessage: req.flash("error")[0] });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
