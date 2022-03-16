import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    placeImage: {
      type: String,
      // default: "../public/images/default-place-image.jpeg",
      default: "/public/images/default-place-image.jpeg",
    },
    location: {
      lat: Number,
      lng: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const Place = Mongoose.model("Place", placeSchema);
