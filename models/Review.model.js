const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    game: { type: Schema.Types.ObjectId, ref: "Game" },
    comment: { type: String },
    upvote: { type: Number },
    downvote: { type: Number },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
