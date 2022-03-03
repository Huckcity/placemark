import { v4 } from "uuid";
import { Low, JSONFile } from "lowdb";

const db = new Low(new JSONFile("./places.json"));
db.data ||= { places: [] };

const PlaceJsonStore = {
  getAll: async () => {
    await db.read();
    const { places } = db.data;
    return places;
  },

  getById: async (id) => {
    await db.read();
    const place = db.data.places.find((place) => place._id === id);
    return place;
  },

  create: async (place, userId) => {
    await db.read();
    if (!place.name) {
      throw new Error("Place name is required");
    }
    if (!userId) {
      throw new Error("User id is required");
    }

    place._id = v4();
    place.user = userId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  update: async (userId, placeId, place) => {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === placeId);
    db.data.places[index] = {
      _id: placeId,
      name: place.name,
      ...place,
    };
    await db.write();
    return db.data.places[index];
  },

  delete: async (id) => {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    db.data.places.splice(index, 1);
    await db.write();
    return true;
  },

  deleteAll: async () => {
    db.data.places = [];
    await db.write();
    return true;
  },

  getByName: async (name) => {
    await db.read();
    const place = db.data.places.find((place) => place.name === name);
    if (!place) {
      return null;
    }
    return place;
  },

  getByUserId: async (userId) => {
    await db.read();
    const places = db.data.places.filter((place) => place.user === userId);
    return places;
  },
};

export default PlaceJsonStore;
