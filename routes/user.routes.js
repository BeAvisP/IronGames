const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

//Profile gamelist and wishlist
router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate("gameList")
    .populate("wishlist")
    .then((user) => {
      res.render("user/profile", { user });
    });
});

//
router.get("/:id/games", (req, res) => {
  const { id } = req.params;
  User.findById(id)
  .populate("gameList")
  .then((user) => {
    res.redirect('/user/user-collection')
  })
})

module.exports = router;
