import Boom from "@hapi/boom";
import Joi from "joi";
import db from "../models/db.js";

import { validationError } from "./logger.js";
import {
  idSpec,
  placeArray,
  placeSpec,
  updatePlaceSpec,
} from "../models/joi-schemas.js";

const placeApi = {
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
    tags: ["api"],
    description: "Get place by id",
    notes: "Returns details of a place",
    response: { schema: placeSpec, failAction: validationError },
  },

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
    tags: ["api"],
    description: "Get all places",
    notes: "Returns details of all places",
    response: { schema: placeArray, failAction: validationError },
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
    tags: ["api"],
    description: "Get places by user id",
    notes: "Returns details of all places by user id",
    response: { schema: placeArray, failAction: validationError },
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
    tags: ["api"],
    description: "Get places by category id",
    notes: "Returns details of all places by category id",
    response: { schema: placeArray, failAction: validationError },
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
    tags: ["api"],
    description: "Get places by name",
    notes: "Returns details of all places by name",
    response: { schema: placeArray, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async (request, h) => {
      try {
        const place = await db.placeStore.create(
          request.payload.place,
          request.payload.userId
        );
        return place;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Create a new place",
    notes: "Creates a new place",
    validate: {
      payload: Joi.object({
        place: placeSpec,
        userId: idSpec,
      }),
      failAction: validationError,
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
    tags: ["api"],
    description: "Update place by id",
    notes: "Updates place with id",
    validate: {
      params: idSpec,
      payload: updatePlaceSpec,
      failAction: validationError,
    },
    response: { schema: placeSpec, failAction: validationError },
  },

  delete: {
    auth: false,
    handler: async (request, h) => {
      try {
        const place = await db.placeStore.delete(
          request.payload.id,
          request.payload.userId
        );
        return place;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Delete a place",
    notes: "Deletes a place",
    validate: {
      payload: idSpec,
      failAction: validationError,
    },
  },

  deleteAll: {
    auth: false,
    handler: async (request, h) => {
      try {
        const places = await db.placeStore.deleteAll();
        return h.response(places).code(204);
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Delete all places",
    notes: "Deletes all places",
  },
};

export default placeApi;
