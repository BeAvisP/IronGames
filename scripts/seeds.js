require("dotenv").config();
const mongoose = require('mongoose');
const apiHandler = require('./apiHandler');
// const Game = require('./models/Game.model.js');
// require('./configs/db.config');

const apiHandler = new ApiHandler(`${process.env.API_BASE_URL}`);

// Array with game data objects for DDBB insert
const gameData = [];

// Call the apiHandler without the recursive function to limit the response from the api
apiHandler.getGames()
  .then(response => {
    response.data.results.forEach(game => {
      const images = game.short_screenshots;
      apiHandler.getGameByID(game.id)
      .then((game) => {
        console.log(game);
        const { id, name_original, metacritic, released, background_image, website, metacritic_url, developers, genres, description_raw } = game.data;
        gameArr.push(name_original);
      })
    });
  });


//Recursive function to get all games within the api

// const getAllGames = (response) => {
//   console.log(response);
//   response.data.results.forEach(game => {
//     apiHandler.getGameByID(game.id)
//     .then((game) => {
//       const { id, name_original, metacritic, released, background_image, website, metacritic_url, developers, genres, description_raw } = game.data;
//       gameArr.push(name_original);
//       console.log(gameArr.length);
//     })
//   });
//   if(response.data.next){
//     axios.get(response.data.next)
//     .then(response => getAllGames(response))
//   }
// };

// apiHandler.getGames()
// .then(response => getAllGames(response));
