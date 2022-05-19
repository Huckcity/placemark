import { db } from "../models/db.js";
import { registerSpec, loginSpec } from "../models/joi-schemas.js";

const authController = {
  githubLogin: {
    auth: "github",
    handler: async (request, h) => {
      console.log(request.auth.credentials);
      if (request.auth.isAuthenticated) {
        const existingUser = await db.userStore.getByEmail(request.auth.credentials.profile.email);
        console.log(existingUser);
        if (!existingUser) {
          return h.redirect("/register");
        }
        request.cookieAuth.set({
          _id: existingUser._id,
          email: existingUser.email,
          username: existingUser.username,
          scope: existingUser.role,
          role: existingUser.role,
          github_id: request.auth.credentials.profile.id,
          github_username: request.auth.credentials.profile.username,
          github_access_token: request.auth.credentials.token,
        });
        return h.redirect("/dashboard");
      }
      return h.redirect("/login");
    },
  },

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

        if (!(await user.checkPassword(req.payload.password))) {
          return h
            .view("login", {
              error: "Invalid username or password",
            })
            .takeover()
            .code(400);
        }

        if (!user.active) {
          return h
            .view("login", {
              error: "Your account has been deactivated",
            })
            .takeover()
            .code(400);
        }

        req.cookieAuth.set({
          _id: user._id,
          username: user.username,
          email: user.email,
          scope: user.role,
          role: user.role,
        });

        return h.redirect("/dashboard");
      } catch (err) {
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
      if (user.password !== user.passwordConfirm) {
        return h.view("index", {
          error: "Passwords do not match.",
        });
      }
      const newUser = await db.userStore.create(user);
      if (!newUser) {
        return h.view("index", {
          error: "User already exists.",
        });
      }
      return h.redirect("/login");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getById(session._id);
    if (!user) {
      return { valid: false };
    }
    user.scope = user.role;
    return { valid: true, credentials: user };
  },
};

export default authController;
