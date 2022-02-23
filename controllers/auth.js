"use strict";

import db from "../models/db.js";
import { registerSpec, loginSpec } from "../models/joi-schemas.js";

const Auth = {
  login: {
    auth: false,
    handler: async (req, h) => {
      return h.view("login");
    },
  },

  loginPost: {
    auth: false,
    validate: {
      payload: loginSpec,
      failAction: (request, h, error) => {
        return h
          .view("login", {
            error: error.message,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async (req, h) => {
      const { username, password } = req.payload;
      const user = await db.userStore.getByUsername(username);

      if (!user || user.password !== password) {
        return h.view("login", {
          error: "Incorrect login details.",
        });
      }

      req.cookieAuth.set({
        id: user._id,
        scope: user.role,
      });

      return h.redirect("/dashboard");
    },
  },

  logout: {
    handler: async (req, h) => {
      req.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  register: {
    auth: false,
    handler: async (req, h) => {
      return h.view("register");
    },
  },

  registerPost: {
    auth: false,
    validate: {
      payload: registerSpec,
      failAction: (request, h, error) => {
        return h
          .view("index", {
            error: error.message,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async (req, h) => {
      const user = req.payload;
      await db.userStore.create(user);
      return h.redirect("/login");
    },
  },
};

export default Auth;
