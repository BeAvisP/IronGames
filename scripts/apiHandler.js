const axios = require("axios");
class ApiHandler {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getGames() {
    return axios.get(
      `${this.baseURL}/games?key=${process.env.API_KEY}&page_size=15`
    );
  }

  getGameByID(id) {
    // console.log(`${this.baseURL}/games/${id}?key=${process.env.API_KEY}`)
    return axios.get(`${this.baseURL}/games/${id}?key=${process.env.API_KEY}`);
  }
}

module.exports = ApiHandler;
