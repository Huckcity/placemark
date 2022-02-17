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
      console.log(username, password);
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

      console.log(user);
      if (user) {
        return h.view("register", {
          error: "Username already taken",
        });
      }

      db.userStore.create({
        id: "1234567",
        username,
        password,
        email,
      });

      return h.redirect("/login");
    },
  },
};

export default Auth;
