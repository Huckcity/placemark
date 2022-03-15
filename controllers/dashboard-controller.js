import { db } from "../models/db.js";
import { addPlaceSpec, updateUserSpec } from "../models/joi-schemas.js";
import uploadObject from "../helpers/image-handler.js";

const dashboardController = {
  dashboard: {
    auth: "session",
    handler: async (req, h) => {
      try {
        const user = req.auth.credentials;
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
      const user = await db.userStore.getById(req.auth.credentials._id);
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
    payload: {
      output: 'file',
      parse: true,
      allow: 'multipart/form-data',
      multipart: true,
      maxBytes: 1024 * 1024 * 100,
      timeout: false,
    },
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials._id);
      const userData = req.payload;
      const viewData = {
        user,
        active: {
          Settings: true,
        },
      };

      if (userData.password) {
        if (userData.password !== userData.passwordConfirm) {
          viewData.error = "Passwords do not match";
          return h.view("settings", viewData, { layout: "dashboardlayout" });
        }
      } else {
        delete userData.password;
      }

      if (req.payload.profileImage.filename && uploadObject(user._id, req.payload.profileImage)) {
        req.payload.profileImage = `https://placemark-storage.fra1.digitaloceanspaces.com/${user._id}/${req.payload.profileImage.filename}`;
      } else {
        delete req.payload.profileImage;
      }

      try {
        viewData.user = await db.userStore.update(user._id, userData);
        viewData.message = "User updated successfully";
      } catch (err) {
        viewData.error = "Failed to update user";
      }
      return h.view("settings", viewData, { layout: "dashboardlayout" });
    },
    validate: {
      payload: updateUserSpec,
      failAction: async (req, h, error) => {
        const user = req.auth.credentials;
        const viewData = {
          user,
          error: error.message,
          active: {
            Settings: true,
          },
        };
        return h.view("settings", viewData, { layout: "dashboardLayout" }).takeover();
      },
    },
  },

  myPlaces: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
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
      const user = req.auth.credentials;
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
      const user = req.auth.credentials;
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
      failAction: async (req, h, error) => {
        const user = req.auth.credentials;
        const categories = await db.categoryStore.getAll();
        const viewData = {
          user,
          categories,
          error: error.message,
          active: {
            AddPlace: true,
          },
        };
        return h.view("add-place", viewData, { layout: "dashboardlayout" }).takeover();
      },
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const categories = await db.categoryStore.getAll();
      try {
        const place = await db.placeStore.create(req.payload, user._id);
        return h.redirect(`/places/${place._id}`);
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
      const user = req.auth.credentials;
      const { id } = req.params;
      const deletedPlace = await db.placeStore.delete(id, user._id);
      const places = await db.placeStore.getByUserId(user);
      const viewData = {
        user,
        places,
        active: {
          MyPlaces: true,
        },
      };
      if (deletedPlace) {
        viewData.message = "Place deleted successfully";
      } else {
        viewData.error = "You cannot delete that place.";
      }
      return h.view("my-places", viewData, { layout: "dashboardlayout" });
    },
  },

  editPlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
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
      const user = req.auth.credentials;
      const place = await db.placeStore.getById(req.params.id);
      const viewData = {
        user,
        place,
      };
      if (!place.user._id.equals(user._id)) {
        viewData.error = "You cannot edit this place.";
        return h.view("edit-place", viewData, { layout: "dashboardlayout" });
      }
      try {
        await db.placeStore.update(user._id, req.params.id, req.payload);
        return h.redirect(`/places/${req.params.id}`);
      } catch (error) {
        console.log(error);
        return h.view("place", viewData, { layout: "dashboardlayout" });
      }
    },
  },

  placesByCategory: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
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

  user: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const viewUser = await db.userStore.getById(req.params.id);
      const places = await db.placeStore.getByUserId(req.params.id);
      const viewData = {
        user,
        viewUser,
        places,
        active: {
          Profile: true,
        },
      };
      return h.view("user", viewData, { layout: "dashboardlayout" });
    },
  },
};

export default dashboardController;
