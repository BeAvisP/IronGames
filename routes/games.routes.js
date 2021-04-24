const express = require('express');
const router  = express.Router();
const Game = require('../models/Game.model'); 

/* GET Games Page */

router.get('/', (req, res, next) => {
  Game.find({})
  .then(games => res.render('games/game-list', { games }))
  .catch(error => next(error));  
});

router.get('/search', (req, res, next) => {
  const { search } = req.query;
  Game.find({ "name": {$regex : `.*(?i)${search}.*`} })
  .then(games => res.render('games/game-list', { games, search }))
  .catch(error => next(error));  
});

module.exports = router;
