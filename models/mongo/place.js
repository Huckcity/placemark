import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  name: String,
  description: String,
  image: String,
  location: {
    lat: Number,
    lng: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
