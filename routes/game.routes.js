const express = require('express');
const router  = express.Router();
const Game = require('../models/Game.model'); 
const User =  require('../models/User.model');

/* GET Games Page */

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Game.findById(id)
  .then(game => res.render('games/game-details', { game, user: req.user }))
  .catch(error => next(error));  
});

router.post('/add-collection', (req, res, next) => {
  const { gameID } = req.body;
  const { _id: userID } = req.user;
  User.findById(userID)
  .then((user) => {
    if(user){
      const { gameList } = user;
      if(!gameList.includes(gameID)) {
        User.findByIdAndUpdate(userID, { $push: { gameList: gameID } }, { new: true })
        .then((user) => res.redirect(`/game/${gameID}`))
        .catch(error => next(error));
      } else {
        res.redirect(`/game/${gameID}`);
      }
    } else {
      res.redirect(`/game/${gameID}`);
    }
  })
  .catch(error => next(error));
});

router.post('/remove-collection', (req, res, next) => {
  const { gameID } = req.body;
  const { _id: userID } = req.user;
  User.findById(userID)
  .then((user) => {
    if(user){
      const { gameList } = user;
      if(gameList.includes(gameID)) {
        User.findByIdAndUpdate(userID, { $pull: { gameList: gameID } }, { new: true })
        .then((user) => res.redirect(`/game/${gameID}`))
        .catch(error => next(error));
      } else {
        res.redirect(`/game/${gameID}`);
      }
    } else {
      res.redirect(`/game/${gameID}`);
    }
  })
  .catch(error => next(error));
});

module.exports = router;
