import { ObjectId } from "mongodb";
import { Place } from "./place.js";
import Category from "./category.js";

const placeMongoStore = {
  async getAll() {
    const places = Place.find({}).populate("user").populate("category").lean();
    return places;
  },

  async getById(id) {
    if (!id) {
      throw new Error("Place id is required.");
    }
    const place = await Place.findById(id).populate("category").populate("user").lean();
    if (!place) {
      throw new Error(`Place with id ${id} not found.`);
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
    if (!userId) {
      throw new Error("User id is required.");
    }
    const places = await Place.find({ user: userId }).populate("user").populate("category").lean();
    if (!places) {
      return [];
    }
    return places;
  },

  async getByCategorySlug(categorySlug) {
    if (!categorySlug) {
      throw new Error("Category is required.");
    }
    const category = await Category.findOne({ slug_name: categorySlug });
    if (!category) {
      throw new Error(`Category with slug ${categorySlug} not found.`);
    }
    const places = await Place.find({ category: category._id })
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
    await newPlace.save();
    const savedPlace = await this.getById(newPlace._id);
    return savedPlace;
  },

  async update(userId, placeId, place) {
    if (!userId) {
      throw new Error("User id is required.");
    }
    if (!placeId) {
      throw new Error("Place id is required.");
    }
    if (!place) {
      throw new Error("Place is required.");
    }
    if (!place.name) {
      throw new Error("Place name is required.");
    }

    const existingPlace = await Place.findById(placeId);
    if (!existingPlace) {
      throw new Error(`Place with id ${placeId} not found.`);
    } else if (!existingPlace.user._id.equals(userId)) {
      throw new Error("You do not have permission to edit this place.");
    } else {
      existingPlace.name = place.name || existingPlace.name;
      existingPlace.description = place.description || existingPlace.description;
      existingPlace.location.lat = place.latitude || existingPlace.location.lat;
      existingPlace.location.lng = place.longitude || existingPlace.location.lng;
      existingPlace.category = place.category || existingPlace.category;
      const savedPlace = await existingPlace.save();
      const returnedPlace = await this.getById(savedPlace._id);
      return returnedPlace;
    }
  },

  async delete(id, userId) {
    if (!id) {
      throw new Error("Place id is required.");
    }
    if (!userId) {
      throw new Error("User id is required.");
    }

    const deletedPlace = await Place.findOneAndDelete({
      _id: id,
      user: ObjectId(userId),
    });
    if (!deletedPlace) {
      throw new Error(
        "You do not have permission to delete that record. Your places are listed below.",
      );
    }
    return deletedPlace;
  },

  async deleteAll() {
    return Place.deleteMany({});
  },
};

export default placeMongoStore;
