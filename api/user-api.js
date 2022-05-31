import Boom from "@hapi/boom";
import Joi from "joi";
import { db } from "../models/db.js";
import { createToken } from "../helpers/utils.js";
import validationError from "./logger.js";
import {
  idSpec,
  registerSpec,
  userArray,
  userSpec,
  updateUserSpec,
  JWTAuth,
  loginSpec,
} from "../models/joi-schemas.js";

const userApi = {
  allUsers: {
    auth: "jwt",
    handler: async () => {
      try {
        const users = await db.userStore.getAll();
        return users;
      } catch (err) {
        throw Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    response: { schema: userArray, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async (request, h) => {
      try {
        const user = await db.userStore.create(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a new user",
    notes: "Creates a new user",
    validate: { payload: registerSpec, failAction: validationError },
    response: { schema: userSpec, failAction: validationError },
  },

  findOne: {
    auth: "jwt",
    handler: async (request) => {
      try {
        const user = await db.userStore.getById(request.params.id);
        return user;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Get user by id",
    notes: "Returns details of user with id",
    response: { schema: userSpec, failAction: validationError },
  },

  remove: {
    auth: "jwt",
    handler: async (request) => {
      try {
        const user = await db.userStore.delete(request.params.id);
        return user;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Delete user by id",
    notes: "Deletes user with id",
    validate: { params: idSpec, failAction: validationError },
  },

  removeAll: {
    auth: false,
    handler: async (request, h) => {
      try {
        const users = await db.userStore.deleteAll();
        return h.response(users).code(204);
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Delete all users",
    notes: "Deletes all users",
  },

  update: {
    auth: "jwt",
    handler: async (request) => {
      try {
        const user = await db.userStore.update(request.params.id, request.payload);
        return user;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Update user by id",
    notes: "Updates user with id",
    validate: {
      params: idSpec,
      payload: updateUserSpec,
      failAction: validationError,
    },
    response: { schema: userSpec, failAction: validationError },
  },

  authenticate: {
    auth: false,
    handler: async (request, h) => {
      try {
        const user = await db.userStore.authByEmailOrUsername(request.payload);
        if (!user || !(await user.checkPassword(request.payload.password))) {
          return Boom.unauthorized("Invalid email or password");
        }
        const token = createToken(user);
        return h.response({ token, success: true }).code(200);
      } catch (err) {
        return Boom.unauthorized("Invalid email or password");
      }
    },
    tags: ["api"],
    description: "Authenticate a user",
    notes: "Id user has valid email/password, create and return a JWT",
    validate: {
      payload: loginSpec,
      failAction: validationError,
    },
    response: {
      schema: JWTAuth,
      failAction: validationError,
    },
  },

  toggleFavourite: {
    auth: false,
    handler: async (request) => {
      try {
        const place = await db.userStore.addRemoveFavouritePlace(
          request.payload.userId,
          request.payload.placeId,
        );
        return place;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Toggle favourite",
    notes: "Toggles favourite",
    validate: {
      payload: Joi.object({
        placeId: idSpec,
        userId: idSpec,
      }),
      failAction: validationError,
    },
  },
};

export default userApi;
