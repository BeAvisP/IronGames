const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const uploader = require("../configs/cloudinary.config");

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
      res.render("user/user-edit", { sessionUser: req.user, user });
    })
    .catch((error) => {
      res.render("user/profile");
    });
});

//Profile edit user
router.post(
  "/edit",
  uploader.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "profile_Background", maxCount: 1 },
  ]),
  (req, res) => {
    const { user, city, description, facebook, twitter, steam } = req.body;
    const { _id: id } = req.user;
    console.log(req.body);
    if (req.files) {
      User.findByIdAndUpdate(
        id,
        {
          name: user,
          city,
          description,
          social:{facebook: facebook},
          social:{twitter: twitter},
          social:{steam: steam},
          profile_pic: req.files.profileImage ? req.files.profileImage[0].path: req.user.profile_pic,
          profile_Background: req.files.profile_Background ? req.files.profile_Background[0].path: req.user.profile_Background,
        },
        { new: true }
      )
        .then((user) => {
          res.redirect(`/user/${user._id}`);
        }).catch(error => console.error(error))
    }   
  }
);

//Delete
router.post("/:id/delete", isLoggedIn, (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});

module.exports = router;
