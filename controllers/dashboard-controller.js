import { db } from "../models/db.js";
import { addPlaceSpec } from "../models/joi-schemas.js";

const dashboardController = {
  dashboard: {
    auth: "session",
    handler: async (req, h) => {
      try {
        const user = await db.userStore.getById(req.auth.credentials.id);
        const places = await db.placeStore.getAll();
        const viewData = {
          user,
          places,
          active: {
            Dashboard: true,
          },
        };
        return h.view("dashboard", viewData, { layout: "dashboardlayout" });
      } catch (err) {
        console.log(err);
        return h.redirect("/login");
      }
    },
  },

  settings: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const viewData = {
        user,
        active: {
          Settings: true,
        },
      };
      return h.view("settings", viewData, { layout: "dashboardlayout" });
    },
  },

  settingsUpdate: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const userData = req.payload;
      let updatePassword = false;

      if (userData.password) {
        if (userData.password !== userData.passwordConfirm) {
          return h.view(
            "settings",
            {
              user,
              error: "Passwords do not match",
              active: {
                Settings: true,
              },
            },
            { layout: "dashboardlayout" },
          );
        }
        updatePassword = true;
      }

      const userUpdate = {
        username: user.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: updatePassword ? userData.password : null,
      };
      const viewData = {
        user,
        active: {
          Settings: true,
        },
      };
      try {
        viewData.user = await db.userStore.update(user._id, userUpdate);
        viewData.message = "User updated successfully";
      } catch (err) {
        viewData.error = "Failed to update user";
        console.log(err);
      }
      return h.view("settings", viewData, { layout: "dashboardlayout" });
    },
  },

  myPlaces: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const places = await db.placeStore.getByUserId(user._id);
      const viewData = {
        user,
        places,
        active: {
          MyPlaces: true,
        },
      };
      return h.view("my-places", viewData, { layout: "dashboardlayout" });
    },
  },

  place: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const placeId = req.params.id;
      const place = await db.placeStore.getById(placeId);
      const viewData = {
        user,
        place,
      };
      return h.view("place", viewData, { layout: "dashboardlayout" });
    },
  },

  addPlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const categories = await db.categoryStore.getAll();
      const viewData = {
        user,
        categories,
        active: {
          AddPlace: true,
        },
      };
      return h.view("add-place", viewData, { layout: "dashboardlayout" });
    },
  },

  addPlacePost: {
    auth: "session",
    validate: {
      payload: addPlaceSpec,
      failAction: async (request, h, error) => {
        const user = await db.userStore.getById(request.auth.credentials.id);
        const viewData = {
          user,
          error,
          active: {
            AddPlace: true,
          },
        };
        return h.view("add-place", viewData, { layout: "dashboardlayout" }).takeover();
      },
    },
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const categories = await db.categoryStore.getAll();
      try {
        const place = await db.placeStore.create(req.payload, user._id);
        return h.redirect(`/dashboard/places/${place._id}`);
      } catch (err) {
        return h.view(
          "add-place",
          {
            user,
            categories,
            error: err.message,
            active: {
              AddPlace: true,
            },
          },
          { layout: "dashboardlayout" },
        );
      }
    },
  },

  deletePlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const { id } = req.params;
      try {
        await db.placeStore.delete(id, user._id);
        return h.redirect("/dashboard/places");
      } catch (err) {
        const places = await db.placeStore.getByUserId(user);
        return h.view(
          "my-places",
          {
            user,
            places,
            error: err.message,
            active: {
              MyPlaces: true,
            },
          },
          { layout: "dashboardlayout" },
        );
      }
    },
  },

  editPlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const place = await db.placeStore.getById(req.params.id);
      const categories = await db.categoryStore.getAll();
      const viewData = {
        user,
        place,
        categories,
        active: {
          EditPlace: true,
        },
      };
      return h.view("edit-place", viewData, { layout: "dashboardlayout" });
    },
  },

  editPlacePost: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      try {
        await db.placeStore.update(user._id, req.params.id, req.payload);
        return h.redirect(`/dashboard/places/${req.params.id}`);
      } catch (error) {
        console.log(error);
        const place = await db.placeStore.getById(req.params.id);
        return h.view(
          "place",
          {
            user,
            place,
            error: error.message,
          },
          { layout: "dashboardlayout" },
        );
      }
    },
  },

  placesByCategory: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      try {
        const { category } = req.params;
        const places = await db.placeStore.getByCategorySlug(category);
        const viewData = {
          user,
          places,
          active: {
            Places: true,
          },
        };
        return h.view("places-by-category", viewData, { layout: "dashboardlayout" });
      } catch (err) {
        return h.view(
          "dashboard",
          {
            user,
            error: err.message,
            active: {
              Places: true,
            },
          },
          { layout: "dashboardlayout" },
        );
      }
    },
  },
};

export default dashboardController;
