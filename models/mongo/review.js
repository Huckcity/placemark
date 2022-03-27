import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },
  },
  {
    timestamps: true,
  },
);

export const Review = Mongoose.model("Review", reviewSchema);
