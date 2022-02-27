import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    location: {
      lat: Number,
      lng: Number,
    },
    category: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Place = Mongoose.model("Place", placeSchema);
