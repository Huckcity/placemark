import Boom from "@hapi/boom";
import db from "../models/db.js";

const userApi = {
  allUsers: {
    auth: false,
    handler: async (request, h) => {
      try {
        const users = await db.userStore.getAll();
        return users;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  create: {
    auth: false,
    handler: async (request, h) => {
      try {
        const user = await db.userStore.create(request.payload);
        return user;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  findOne: {
    auth: false,
    handler: async (request, h) => {
      try {
        const user = await db.userStore.getById(request.params.id);
        console.log(`user: ${user}`);
        return user;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  remove: {
    auth: false,
    handler: async (request, h) => {
      try {
        const user = await db.userStore.delete(request.params.id);
        return user;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
  },

  removeAll: {
    auth: false,
    handler: async (request, h) => {
      try {
        const users = await db.userStore.deleteAll();
        return h.response(users).code(204);
      } catch (err) {
        throw Boom.badImplementation(`delete alllllllllll ${err}`);
      }
    },
  },
};

export default userApi;
