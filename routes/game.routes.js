const express = require("express");
const router = express.Router();
const Game = require("../models/Game.model");
const User = require("../models/User.model");

/* GET Games Page */

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const { _id: userID } = req.user;
  let addCollection = true;
  let addWishlist = true;
  let showWishlist = true;
  Game.findById(id)
    .then((game) => {
      User.findById(userID).then((user) => {
        console.log(id);
        console.log(user.gameList);
        if (user.gameList.includes(id)) {
          console.log("hola");
          addCollection = false;
          addWishlist = false;
          showWishlist = false;
        } else if (user.wishlist.includes(id)) {
          addWishlist = false;
        }
        res.render("games/game-details", {
          game,
          user: req.user,
          addWishlist,
          addCollection,
          showWishlist,
        });
      });
    })
    .catch((error) => next(error));
});

// Add game to user collection
router.post("/add-collection", (req, res, next) => {
  const { gameID } = req.body;
  const { _id: userID } = req.user;
  User.findById(userID)
    .then((user) => {
      if (user) {
        const { gameList, wishlist } = user;
        if (!gameList.includes(gameID)) {
          User.findByIdAndUpdate(
            userID,
            { $push: { gameList: gameID }, $pull: { wishlist: gameID } },
            { new: true }
          )
            .then((user) => res.redirect(`/game/${gameID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/game/${gameID}`);
        }
      } else {
        res.redirect(`/game/${gameID}`);
      }
    })
    .catch((error) => next(error));
});

// Remove game from user collection
router.post("/remove-collection", (req, res, next) => {
  const { gameID } = req.body;
  const { _id: userID } = req.user;
  User.findById(userID)
    .then((user) => {
      if (user) {
        const { gameList } = user;
        if (gameList.includes(gameID)) {
          User.findByIdAndUpdate(
            userID,
            { $pull: { gameList: gameID } },
            { new: true }
          )
            .then((user) => res.redirect(`/game/${gameID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/game/${gameID}`);
        }
      } else {
        res.redirect(`/game/${gameID}`);
      }
    })
    .catch((error) => next(error));
});

// Add game to user wishlist
router.post("/add-wishlist", (req, res, next) => {
  const { gameID } = req.body;
  const { _id: userID } = req.user;
  User.findById(userID)
    .then((user) => {
      if (user) {
        const { wishlist } = user;
        if (!wishlist.includes(gameID)) {
          User.findByIdAndUpdate(
            userID,
            { $push: { wishlist: gameID } },
            { new: true }
          )
            .then((user) => res.redirect(`/game/${gameID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/game/${gameID}`);
        }
      } else {
        res.redirect(`/game/${gameID}`);
      }
    })
    .catch((error) => next(error));
});

// Remove game from user wishlist
router.post("/remove-wishlist", (req, res, next) => {
  const { gameID } = req.body;
  const { _id: userID } = req.user;
  User.findById(userID)
    .then((user) => {
      if (user) {
        const { wishlist } = user;
        if (wishlist.includes(gameID)) {
          User.findByIdAndUpdate(
            userID,
            { $pull: { wishlist: gameID } },
            { new: true }
          )
            .then((user) => res.redirect(`/game/${gameID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/game/${gameID}`);
        }
      } else {
        res.redirect(`/game/${gameID}`);
      }
    })
    .catch((error) => next(error));
});

module.exports = router;
