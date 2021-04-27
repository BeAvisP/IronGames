const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const uploader = require('../configs/cloudinary.config');

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
router.post("/edit", uploader.single('profileImage'), (req, res) => {
  const { city, description } = req.body;
  const { _id: id } = req.user;
  console.log(req.file)
  if(req.file){
  User.findByIdAndUpdate(id, { city, description, profile_pic: req.file.path }, {new: true})
    .then((user) => {
      res.redirect(`/user/${user._id}`);
    })
    .catch((error) => {
      res.render("user/profile");
    });
}});

//Delete
router.post("/:id/delete", isLoggedIn, (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect("/");
  })
  .catch(error => console.error(error))
});

module.exports = router;
