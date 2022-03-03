import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug_name: String,
});

const Category = Mongoose.model("Category", categorySchema);

export default Category;
