const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

//GameList and Wishlist
router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate("gameList")
    .populate("wishlist")
    .then((user) => {
      res.render("auth/profile", { user });
    });
});



module.exports = router;
