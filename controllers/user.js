"use strict";

import db from "../models/db.js";

const User = {
  dashboard: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const places = await db.placeStore.getAll();
      // user.isAdmin = true;
      const viewData = {
        user: user,
        places: places,
        active: {
          Dashboard: true,
        },
      };
      return h.view("dashboard", viewData, { layout: "dashboardlayout" });
    },
  },

  settings: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const viewData = {
        user: user,
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
              user: user,
              error: "Passwords do not match",
              active: {
                Settings: true,
              },
            },
            { layout: "dashboardlayout" }
          );
        }
        updatePassword = true;
      }

      const userUpdate = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: updatePassword ? userData.password : null,
      };
      await db.userStore.update(user._id, userUpdate);
      return h.redirect("/dashboard/settings");
    },
  },

  myPlaces: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const places = await db.placeStore.getAll();
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

  addPlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const viewData = {
        user,
        active: {
          AddPlace: true,
        },
      };
      return h.view("add-place", viewData, { layout: "dashboardlayout" });
    },
  },

  addPlacePost: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      // const { name } = req.payload;
      const place = await db.placeStore.create(req.payload, user.id);
      return h.redirect("/dashboard/places");
    },
  },

  deletePlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const { id } = req.params;
      const place = await db.placeStore.delete(id);
      return h.redirect("/dashboard/places");
    },
  },

  editPlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const place = await db.placeStore.getById(req.params.id);
      return h.view(
        "edit-place",
        { user, place },
        { layout: "dashboardlayout" }
      );
    },
  },

  editPlacePost: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const updatedPlace = {
        ...req.payload,
      };
      console.log(updatedPlace);
      await db.placeStore.update(req.params.id, updatedPlace);
      return h.redirect("/dashboard/places");
    },
  },
};

export default User;
