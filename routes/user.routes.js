const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

//Profile Game List
router.get("/:id/collection", (req, res) => {
  let authUser = false;
  let mappedGames = [];
  const { id } = req.params;
  User.findById(id)
    .populate("gameList")
    .then((user) => {
      if(JSON.stringify(req.user._id)===JSON.stringify(id)){
        authUser = true;
          mappedGames = user.gameList.map((game)=> {
          game.authUser = true;
          return game;
        });
      }
      res.render("user/user-collection", { user, sessionUser: req.user, authUser, mappedGames });
    });
});

//Profile Wishlist
router.get("/:id/wishlist", (req, res) => {
  let authUser = false;
  let mappedWishlist = [];
  const { id } = req.params;
  User.findById(id)
    .populate("wishlist")
    .then((user) => {
      if(JSON.stringify(req.user._id)===JSON.stringify(id)){
        authUser = true;
          mappedWishlist = user.wishlist.map((wishlist)=> {
          wishlist.authUser = true;
          return wishlist;
        });
      }
      res.render("user/user-wishlist", { user, sessionUser: req.user, authUser, mappedWishlist });
    });
});

//Profile Game List and Wishlist
router.get("/:id", (req, res) => {
  let authUser = false;
  const { id } = req.params;
  User.findById(id)
    .populate("gameList")
    .populate("wishlist")
    .then((user) => {
      if(JSON.stringify(req.user._id) === JSON.stringify(id)){
        authUser = true;
      }
      res.render("user/profile", { user, sessionUser: req.user, authUser });
    });
});

module.exports = router;
