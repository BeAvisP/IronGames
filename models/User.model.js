const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required, unique },
  email: { type: String, required, unique },
  password: { type: String, required },
  profileImage: { type: String },
  avatarProfile: { type: String /* default: */ },
  description: { type: String, maxlength: 280 },
  rol: { type: String },
  gameList: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  Social: {
    facebook: { type: String },
    twiteer: { type: String },
    steam: { type: String },
  },
  genres: [],
  location: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
