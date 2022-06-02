import { ObjectId } from "mongodb";
import { Place } from "./place.js";
import Category from "./category.js";

const placeMongoStore = {
  async getAll() {
    const places = Place.find({}).populate("user").populate("category").lean();
    return places;
  },

  async getAllPublic() {
    const places = Place.find({ public: true }).populate("user").populate("category").lean();
    return places;
  },

  async getById(id) {
    const place = await Place.findById(id).populate("category").populate("user").lean();
    if (!place) {
      return null;
    }
    return place;
  },

  async getByName(name) {
    const place = await Place.findOne({ name }).populate("user").populate("category").lean();
    if (!place) {
      return null;
    }
    return place;
  },

  async getByUserId(userId) {
    const places = await Place.find({ user: userId }).populate("user").populate("category").lean();
    if (!places) {
      return [];
    }
    return places;
  },

  async getFavourites(arrayOfIds) {
    const places = await Place.find({ _id: { $in: arrayOfIds } })
      .populate("user")
      .populate("category")
      .lean();
    if (!places) {
      return [];
    }
    return places;
  },

  async getByCategorySlug(categorySlug) {
    const category = await Category.findOne({ slug_name: categorySlug });
    const places = await Place.find({ public: true, category: category._id })
      .populate("user")
      .populate("category")
      .lean();
    if (!places) {
      return [];
    }
    return places;
  },

  async create(place, userId) {
    const newPlace = new Place(place);
    newPlace.user = userId;
    newPlace.location.lat = place.latitude || 0;
    newPlace.location.lng = place.longitude || 0;
    if (place.placeImage) {
      newPlace.placeImages = [place.placeImage];
    }
    await newPlace.save();
    const savedPlace = await this.getById(newPlace._id);
    return savedPlace;
  },

  async update(placeId, place) {
    const existingPlace = await Place.findById(placeId);
    if (!existingPlace) {
      return null;
    }
    if (place.placeImage) {
      place.placeImages = [...existingPlace.placeImages, place.placeImage];
    }
    const returnedPlace = await Place.findByIdAndUpdate(placeId, place, {
      new: true,
    })
      .populate("user")
      .populate("category")
      .lean();
    return returnedPlace;
  },

  async delete(id, userId) {
    const deletedPlace = await Place.findOneAndDelete({
      _id: id,
      user: ObjectId(userId),
    });
    return deletedPlace;
  },

  async deleteAll() {
    return Place.deleteMany({});
  },
};

export default placeMongoStore;
