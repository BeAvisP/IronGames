const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("user/profile", { sessionUser: req.user });
});


//Edit Profile
router.get("/edit", isLoggedIn, (req, res) => {
  const { _id: id } = req.user;
  User.findById(id)
    .then((user) => {
      res.render("user/user-edit", { user });
    })
    .catch((error) => {
      res.render("user/profile");
    });
});

//Profile edit user
router.post("/edit", (req, res) => {
  const { city, description } = req.body;
  const { _id: id } = req.user;
  User.findByIdAndUpdate(id, { city, description })
    .then((user) => {
      res.redirect("/profile");
    })
    .catch((error) => {
      res.render("user/profile");
    });
});

//Delete
router.post("/:id/delete", isLoggedIn, (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect("/");
  })
  .catch(error => console.error(error))
});

module.exports = router;
