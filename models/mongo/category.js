import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug_name: String,
});

categorySchema.post("remove", (category) => {
  const Place = Mongoose.model("Place");
  Place.find({ category: category._id }).then((places) => {
    places.forEach((place) => {
      place.category = null;
    });
  });
});

const Category = Mongoose.model("Category", categorySchema);

export default Category;
