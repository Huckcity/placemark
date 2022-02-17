import { v4 } from "uuid";
import { Low, JSONFile } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data ||= { places: [] };

const PlacesJsonStore = {
  getAll: async () => {
    await db.read();
    const places = db.data.places;
    return places;
  },

  getById: async (id) => {
    await db.read();
    const place = db.data.places.find((place) => place.id === id);
    return place;
  },

  create: async (place) => {
    await db.read();
    place.id = v4();
    db.data.places.push(place);
    await db.write();
    return place;
  },

  update: async (id, place) => {
    await db.read();
    const index = db.data.places.findIndex((place) => place.id === id);
    db.data.places[index] = {
      id,
      ...place,
    };
    await db.write();
    return db.data.places[index];
  },

  delete: async (id) => {
    await db.read();
    const index = db.data.places.findIndex((place) => place.id === id);
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
    return place;
  },

  getByUserId: async (userId) => {
    await db.read();
    const places = db.data.places.filter((place) => place.userId === userId);
    return places;
  },
};

export default PlacesJsonStore;
