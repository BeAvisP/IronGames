const mongoose = require("mongoose");
const { schema } = require("./User.model");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: { type: String },
  released: { type: String },
  imageGame: { type: String },
  metacritic: { type: Number },
  genres: { type: [] },
  screenshoots: { type: [""] },
  upvote: { type: Number },
  dowvote: { type: Number },
  gameSaved: { type: Number },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
