const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/:id/collection", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate("gameList")
    .populate("wishList")
    .then((user) => {
      res.render("user/user-collection", { user, sessionUser: req.user });
    });
});

//Profile gamelist and wishlist
router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate("gameList")
    .populate("wishlist")
    .then((user) => {
      res.render("user/profile", { user, sessionUser: req.user });
    });
});

module.exports = router;
