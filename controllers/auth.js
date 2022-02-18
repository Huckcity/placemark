"use strict";

import db from "../models/db.js";

const Auth = {
  login: {
    auth: false,
    handler: async (req, h) => {
      return h.view("login");
    },
  },

  loginPost: {
    auth: false,
    handler: async (req, h) => {
      const { username, password } = req.payload;
      const user = await db.userStore.getByUsername(username);

      if (!user || user.password !== password) {
        return h.view("login", {
          error: "Incorrect login details.",
        });
      }

      req.cookieAuth.set({
        id: user.id,
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
    handler: async (req, h) => {
      const { username, email, password } = req.payload;
      const user = await db.userStore.getByUsername(username);

      if (user) {
        return h.view("register", {
          error: "Username already taken",
        });
      }

      try {
        db.userStore.create({
          username,
          password,
          email,
        });
      } catch (err) {
        return h.view("register", {
          error: err.message,
        });
      }

      return h.redirect("/login");
    },
  },
};

export default Auth;
