const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  city: { type: String },
  profile_pic: {type: String, default:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'},
  profile_Background: {type: String, default:'https://cdn-res.keymedia.com/cms/images/ca/155/0319_637171637373959129.jpg'},
  description: { type: String, maxlength: 280 },
  rol: { type: String },
  gameList: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  social: {
    facebook: { type: String },
    twitter: { type: String },
    steam: { type: String },
  },
  genres: [],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
