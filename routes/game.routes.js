const express = require('express');
const router  = express.Router();
const Game = require('../models/Game.model'); 

/* GET Games Page */

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Game.findById(id)
  .then(game => res.render('games/game-details', { game }))
  .catch(error => next(error));  
});

module.exports = router;
