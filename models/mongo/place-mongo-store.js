import { Place } from "./place.js";
import { ObjectId } from "mongodb";

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

  async getByName(name) {
    if (!name) {
      throw new Error("Place name is required.");
    }
    const place = await Place.findOne({ name }).lean();
    if (!place) {
      // throw new Error(`Place with name ${name} not found.`);
      return null;
    }
    return place;
  },

  async getByUserId(userId) {
    if (!userId) {
      throw new Error("User id is required.");
    }
    const places = await Place.find({ user: ObjectId(userId) }).lean();
    if (!places) {
      return [];
    }
    return places;
  },

  async getAll() {
    return Place.find({}).populate("user").lean();
  },

  async create(place, userId) {
    if (!place || !place.name) {
      throw new Error("Place is required.");
    }
    const newPlace = new Place(place);
    newPlace.user = userId;
    newPlace.location.lat = place.latitude || 0;
    newPlace.location.lng = place.longitude || 0;
    const savedPlace = await newPlace.save();
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
    } else if (existingPlace.user.toString() !== userId) {
      throw new Error(`You do not have permission to edit this place.`);
    } else {
      existingPlace.name = place.name || existingPlace.name;
      existingPlace.description =
        place.description || existingPlace.description;
      existingPlace.location.lat = place.latitude || existingPlace.location.lat;
      existingPlace.location.lng =
        place.longitude || existingPlace.location.lng;
      const savedPlace = await existingPlace.save();
      return savedPlace;
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
        "You do not have permission to delete that record. Your places are listed below."
      );
    }
    return deletedPlace;
  },

  async deleteAll() {
    return Place.deleteMany({});
  },
};

export default placeMongoStore;
