import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug_name: {
    type: String,
    required: true,
  },
});

export const Category = Mongoose.model("Category", categorySchema);
