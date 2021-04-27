const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  city: { type: String },
  profileImage: { type: String },
  avatarProfile: { type: String /* default: */ },
  description: { type: String, maxlength: 280 },
  rol: { type: String },
  gameList: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  social: {
    facebook: { type: String },
    twiteer: { type: String },
    steam: { type: String },
  },
  profile_pic: {type: String, default:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'},
  genres: [],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
