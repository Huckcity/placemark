import Boom from "@hapi/boom";
import Joi from "joi";
import { db } from "../models/db.js";
import validationError from "./logger.js";
import { idSpec, placeArray, placeSpec, updatePlaceSpec } from "../models/joi-schemas.js";
import uploadObject from "../helpers/image-handler.js";
import fs from "fs";

const placeApi = {
  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
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
    auth: {
      strategy: "jwt",
    },
    handler: async () => {
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
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
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
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      try {
        const places = await db.placeStore.getByCategorySlug(request.params.category);
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
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
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
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      try {
        const place = await db.placeStore.create(request.payload.place, request.payload.userId);

        if (request.payload.place.placeImage) {
          const imageFromBase64 = Buffer.from(
            request.payload.place.placeImage.replace(/^data:image\/\w+;base64,/, ""),
            "base64",
          );
          fs.writeFileSync(
            `./public/tmp/${place._id}.jpg`,
            imageFromBase64,
            { encoding: "base64" },
            (err) => {
              console.log(err);
            },
          );

          const imageObj = {
            path: `./public/tmp/${place._id}.jpg`,
            filename: `${place._id}.jpg`,
          };

          if (uploadObject(place._id, imageObj)) {
            const imageUrl = `https://placemark-storage.fra1.digitaloceanspaces.com/${place._id}/${place._id}.jpg`;
            await db.placeStore.update(place._id, { ...place, placeImage: imageUrl });
          }
        }

        return place;
      } catch (err) {
        console.log(err.message);
        throw Boom.serverUnavailable("Server Unavailable");
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
      failAction: "log",
    },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      const { placeId, place } = request.payload;
      try {
        const placeToUpdate = await db.placeStore.getById(placeId);
        if (placeToUpdate.user._id.equals(request.payload.userId)) {
          const updatedPlace = await db.placeStore.update(placeId, place);
          return updatedPlace;
        } else {
          throw Boom.unauthorized("User not authorized to update place");
        }
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Update place by id",
    notes: "Updates place with id",
    validate: {
      params: idSpec,
      payload: Joi.object({
        userId: idSpec,
        placeId: idSpec,
        place: updatePlaceSpec,
      }),
      failAction: validationError,
    },
    response: { schema: placeSpec, failAction: validationError },
  },

  delete: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      try {
        const place = await db.placeStore.delete(request.payload.id, request.payload.userId);
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
    auth: {
      strategy: "jwt",
    },
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
