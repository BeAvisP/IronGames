const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const Game = require("../models/Game.model");
const User = require("../models/User.model");

//TODO ISLOGGEDIN
router.post("/create", (req, res, next) => {
  const { gameID: game, review: comment } = req.body;
  const { _id: user } = req.user;
  Review.create({ user, game, comment })
  .then(() => res.redirect(`/game/${game}`))
  .catch(error => next(error));
});

module.exports = router;