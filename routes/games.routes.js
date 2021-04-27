const express = require("express");
const router = express.Router();
const Game = require("../models/Game.model");

/* GET Games Page */

router.get("/", (req, res, next) => {
  Game.find({})
    .then((games) => {
      if(req.user){
        mappedGames = games.map((game) => {
          if(req.user.gameList.includes(game._id)){
            game.owned = true;
          } else if(req.user.wishlist.includes(game._id)){
            game.wishlisted = true;
          }
          return game;
        });
      } else {
        mappedGames = games;
      } 
      res.render("games/game-list", { games, sessionUser: req.user })
  })
    .catch((error) => next(error));
});

router.get("/search", (req, res, next) => {
  const { search } = req.query;
  let mappedGames = [];
  if (search) {
    Game.find({ name: { $regex: `.*(?i)${search}.*` } })
      .then((games) => {
        if(req.user){
          mappedGames = games.map((game) => {
            if(req.user.gameList.includes(game._id)){
              game.owned = true;
            } else if(req.user.wishlist.includes(game._id)){
              game.wishlisted = true;
            }
            return game;
          });
        } else {
          mappedGames = games;
        }       
        res.render("games/game-list", { games: mappedGames, search, sessionUser: req.user })
      })
      .catch((error) => next(error));
  } else {
    res.redirect("/games");
  }
});

module.exports = router;
