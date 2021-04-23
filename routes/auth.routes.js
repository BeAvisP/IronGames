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
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render("signup", {
      errorMessage: "Username and password are required",
    });
  }

  User.findOne({ username }).then((user) => {
    if (user) {
      return res.render("signup", {
        errorMessage: "User or email already exists.",
      });
    }

    User.findOne({ email }).then((email) => {
      if (email) {
        return res.render("signup", {
          errorMessage: "User or email already exists",
        });
      }
    });
    const salt = bcypt.genSaltSync(saltRounds);
    const hashPass = bcypt.hashSync(password, salt);

    User.create({ username, email, password: hashPass })
      .then((newUser) => {
        req.login(newUser, (error) => {
          if (error) {
            next(error);
          }
          return res.redirect("/private/profile");
        });
      })
      .catch((error) => {
        return res.render("signup", {
          errorMessage: "Server error. Try again",
        });
      });
  });
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res)=> {
  const {email, password} = req.body;
  if(!email || !password){
    res.render('login', {errorMessage: "Email and password are required"});
  }

  User.findOne({email})
  .then(user => {
    if(!user){
    res.render("login", {errorMessage: 'Incorrect email or password'});
    }
  })

  const passwordCorrect = bcrypt.compareSync(password, email.password);
  if(passwordCorrect){
    req.session.currentUser = user;
    res.redirect('/private/profile')
  }else {
    res.render('login', {errorMessage: "Incorrect email or password"});
  }
})

module.exports = router;
