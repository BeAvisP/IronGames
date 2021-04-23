require("dotenv").config();
const axios = require('axios');

//Temp class to handle de api calls
class ApiHandler {
  constructor(baseURL){
    this.baseURL = baseURL;
  }

  getGames(){
    return axios.get(`${this.baseURL}/games?key=${process.env.API_KEY}&page_size=1`);
  }

  getGameByID(id){
    console.log(`${this.baseURL}/games/${id}?key=${process.env.API_KEY}`)
    return axios.get(`${this.baseURL}/games/${id}?key=${process.env.API_KEY}`)
  }
};

const mongoose = require('mongoose');
const apiHandler = new ApiHandler(`${process.env.API_BASE_URL}`);
const gameArr = [];

// const Game = require('./models/Game.model.js');
// require('./configs/db.config');


// apiHandler.getGames()
//   .then(response => {
//     response.data.results.forEach(game => {
//       apiHandler.getGameByID(game.id)
//       .then((game) => {
//         // console.log(game);
//         const { id, name_original, metacritic, released, background_image, website, metacritic_url, developers, genres, description_raw } = game.data;
//         gameArr.push(name_original);
//       })
//     });
//     if(response.data.next){
//       return axios.get(response.data.next);
//     }
//   })
//   .then((response)=> {
//     response.data.results.forEach(game => {
//       apiHandler.getGameByID(game.id)
//       .then((game) => {
//         const { id, name_original, metacritic, released, background_image, website, metacritic_url, developers, genres, description_raw } = game.data;
//         gameArr.push(name_original);
//         console.log(gameArr.length);
//       })
//     });
//   });


//Recursive function to get all games within the api
const getAllGames = (response) => {
  console.log(response);
  response.data.results.forEach(game => {
    apiHandler.getGameByID(game.id)
    .then((game) => {
      const { id, name_original, metacritic, released, background_image, website, metacritic_url, developers, genres, description_raw } = game.data;
      gameArr.push(name_original);
      console.log(gameArr.length);
    })
  });
  if(response.data.next){
    axios.get(response.data.next)
    .then(response => getAllGames(response))
  }
};

apiHandler.getGames()
.then(response => getAllGames(response));
