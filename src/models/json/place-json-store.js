import { Low, JSONFile } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db ||= { places: [] };

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
    const newPlace = {
      id: (db.data.places.length + 1).toString(),
      name: place,
    };
    db.data.places.push(newPlace);
    await db.write();
    return place;
  },

  update: async (place) => {
    await db.read();
    const index = db.data.places.findIndex((p) => place.id === p.id);
    db.data.places[index] = place;
    await db.write();
    return place;
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
