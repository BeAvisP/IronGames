const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  game: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  comment: { type: String },
  timestamp: { type: Date },
  upvote: { type: Number },
  downvote: { type: Number },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
