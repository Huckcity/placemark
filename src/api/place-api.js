import Boom from "@hapi/boom";
import db from "../models/db.js";

const placeApi = {
  allPlaces: {
    auth: false,
    handler: async (request, h) => {
      try {
        const places = await db.placeStore.getAll();
        return places;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  create: {
    auth: false,
    handler: async (request, h) => {
      try {
        const place = await db.placeStore.create(request.payload);
        return place;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  findOne: {
    auth: false,
    handler: async (request, h) => {
      try {
        const place = await db.placeStore.getById(request.params.id);
        return place;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  delete: {
    auth: false,
    handler: async (request, h) => {
      try {
        const place = await db.placeStore.delete(request.params.id);
        return place;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  update: {
    auth: false,
    handler: async (request, h) => {
      try {
        const place = await db.placeStore.update(
          request.params.id,
          request.payload
        );
        return place;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  findByUser: {
    auth: false,
    handler: async (request, h) => {
      try {
        const places = await db.placeStore.getByUserId(request.params.id);
        return places;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  findByCategory: {
    auth: false,
    handler: async (request, h) => {
      try {
        const places = await db.placeStore.getByCategory(request.params.id);
        return places;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  findByName: {
    auth: false,
    handler: async (request, h) => {
      try {
        const places = await db.placeStore.getByName(request.params.id);
        return places;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },
};

export default placeApi;
