import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { categorySpec, createCategorySpec, categoryArray } from "../models/joi-schemas.js";

import validationError from "./logger.js";

const categoryApi = {
  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      try {
        const category = await db.categoryStore.getById(request.params.id);
        return category;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Get category by id",
    notes: "Returns details of a category",
    response: { schema: categorySpec, failAction: validationError },
  },

  allCategories: {
    auth: {
      strategy: "jwt",
    },
    handler: async () => {
      try {
        const categories = await db.categoryStore.getAll();
        return categories;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Get all categories",
    notes: "Returns details of all categories",
    response: { schema: categoryArray, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      try {
        const newCategory = await db.categoryStore.create(request.payload);
        if (newCategory) {
          return newCategory;
        }
        return Boom.serverUnavailable("Unable to create category");
      } catch (err) {
        throw Boom.serverUnavailable("Failed to create category");
      }
    },
    tags: ["api"],
    description: "Create a new category",
    notes: "Creates a new category",
    validate: { payload: createCategorySpec, failAction: validationError },
    response: { schema: categorySpec, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      try {
        const updatedCategory = await db.categoryStore.update(request.params.id, request.payload);
        return updatedCategory;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Update a category",
    notes: "Updates a category",
    validate: { payload: createCategorySpec, failAction: validationError },
    response: { schema: categorySpec, failAction: validationError },
  },

  delete: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      try {
        const deletedCategory = await db.categoryStore.delete(request.params.id);
        return deletedCategory;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Delete a category",
    notes: "Deletes a category",
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        await db.categoryStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Delete all categories",
    notes: "Deletes all categories",
  },
};

export default categoryApi;
