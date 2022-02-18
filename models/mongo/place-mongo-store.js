import { Place } from "./place.js";

const placeMongoStore = {
  async getById(id) {
    if (!id) {
      throw new Error("Place id is required.");
    }
    const place = await Place.findById(id).lean();
    if (!place) {
      throw new Error(`Place with id ${id} not found.`);
    }
    return place;
  },

  async getAll() {
    return Place.find({}).lean();
  },

  async create(place, userId) {
    if (!place || !place.name) {
      throw new Error("Place is required.");
    }
    const newPlace = new Place(place);
    newPlace.user = userId;
    const savedPlace = await newPlace.save();
    return savedPlace;
  },

  async update(id, place) {
    if (!id) {
      throw new Error("Place id is required.");
    }
    if (!place) {
      throw new Error("Place is required.");
    }
    const updatedPlace = await Place.findByIdAndUpdate(id, place, {
      new: true,
    });
    if (!updatedPlace) {
      throw new Error(`Place with id ${id} not found.`);
    }
    return updatedPlace;
  },

  async delete(id) {
    if (!id) {
      throw new Error("Place id is required.");
    }
    const deletedPlace = await Place.findByIdAndDelete(id);
    if (!deletedPlace) {
      throw new Error(`Place with id ${id} not found.`);
    }
    return deletedPlace;
  },

  async deleteAll() {
    return Place.deleteMany({});
  },
};

export default placeMongoStore;
