const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const Game = require("../models/Game.model");
const User = require("../models/User.model");

//TODO IsLoggedIn
router.post("/create", (req, res, next) => {
  const { gameID: game, review: comment } = req.body;
  const { _id: user } = req.user;
  Review.create({ user, game, comment })
    .then(() => res.redirect(`/game/${game}`))
    .catch((error) => next(error));
});

//TODO IsLoggedIn
router.post("/:id/upvote", (req, res, next) => {
  const { id } = req.params;
  Review.findById(id)
    .then((review) => {
      const upvote = review.upvote+1;
      Review.findByIdAndUpdate(id, { upvote })
      .then(() => res.redirect(`/game/${review.game}`))
      .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

//TODO IsLoggedIn
router.post("/:id/downvote", (req, res, next) => {
  const { id } = req.params;
  Review.findById(id)
    .then((review) => {
      const downvote = review.downvote+1;
      Review.findByIdAndUpdate(id, { downvote })
      .then(() => res.redirect(`/game/${review.game}`))
      .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

//TODO IsLoggedIn
router.get("/:id/edit", (req, res, next) => {
  const backURL=req.header('Referer');
  const origin = req.headers.host
  console.log(backURL);
  console.log(origin);
  
  const { id } = req.params;
  Review.findById(id)
    .then((review) => res.render('reviews/review-edit', review ))
    .catch((error) => next(error));
});

//TODO IsLoggedIn
router.post("/:id/edit", (req, res, next) => {
  const { review: comment } = req.body;
  const { id } = req.params;
  const backURL=req.header('Referer');
  const url=req.originalUrl;
  console.log(backURL);
  console.log(url);
  Review.findByIdAndUpdate(id, { comment }, { new: true })
    .then((review) => {
      res.redirect(`/game/${gameID}`)
    })
    .catch((error) => next(error));
});

//TODO IsLoggedIn
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  const { gameID: game } = req.body;
  Review.findByIdAndDelete(id)
    .then(() => res.redirect(`/game/${game}`))
    .catch((error) => next(error));
});

module.exports = router;
