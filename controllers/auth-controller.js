import { db } from "../models/db.js";
import { registerSpec, loginSpec } from "../models/joi-schemas.js";

const authController = {
  login: {
    auth: false,
    handler: async (req, h) => h.view("login"),
  },

  loginPost: {
    auth: false,
    validate: {
      payload: loginSpec,
      failAction: (request, h, error) =>
        h
          .view("login", {
            error: error.message,
          })
          .takeover()
          .code(400),
    },
    handler: async (req, h) => {
      try {
        const user = await db.userStore.authByEmailOrUsername(req.payload);

        req.cookieAuth.set({
          id: user._id,
          scope: user.role,
        });

        return h.redirect("/dashboard");
      } catch (err) {
        console.log(err);
        return h.view("login", {
          error: "Incorrect login details.",
        });
      }
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
    handler: async (req, h) => h.view("register"),
  },

  registerPost: {
    auth: false,
    validate: {
      payload: registerSpec,
      failAction: (request, h, error) =>
        h
          .view("index", {
            error: error.message,
          })
          .takeover()
          .code(400),
    },
    handler: async (req, h) => {
      const user = req.payload;
      await db.userStore.create(user);
      return h.redirect("/login");
    },
  },
};

export default authController;
