"use strict";

const users = [
  {
    username: "test",
    password: "test", // 'secret'
    name: "John Doe",
    id: "2133d32a",
  },
];

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
      const user = users.find((u) => u.username === username);

      if (!user) {
        return h.view("login", {
          error: "User not found",
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
      const { username, password, name } = req.payload;
      const user = users.find((u) => u.username === username);

      if (user) {
        return h.view("register", {
          error: "Username already taken",
        });
      }

      users.push({
        username,
        password,
        name,
        id: Math.random().toString(36).substring(7),
      });

      return h.redirect("/");
    },
  },
};

module.exports = Auth;
