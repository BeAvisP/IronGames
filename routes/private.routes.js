const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("user/profile", { sessionUser: req.user });
});

//Edit Profile
router.get("/edit", isLoggedIn, (req, res) => {
  const { _id: id } = req.user;
  User.findById(id)
    .then((user) => {
      res.render("user/user-edit", { sessionUser: req.user });
    })
    .catch((error) => {
      res.render("user/profile", { sessionUser: req.user });
    });
});

//Profile edit user
router.post("/edit", isLoggedIn, (req, res) => {
  const { city, description } = req.body;
  const { _id: id } = req.user;
  User.findByIdAndUpdate(id, { city, description })
    .then((user) => {
      res.redirect("/profile");
    })
    .catch((error) => {
      res.render("user/profile", { sessionUser: req.user });
    });
});

//Delete
router.post("/:id/delete", isLoggedIn, (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});

module.exports = router;
