"use strict";

import db from "../models/db.js";

const User = {
  dashboard: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const places = await db.placeStore.getAll();
      console.log(places);
      // user.isAdmin = true;
      const viewData = {
        user,
        places,
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
      const places = await db.placeStore.getByUserId(user);
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
        // active: {
        //   MyPlaces: true,
        // },
      };
      return h.view("place", viewData, { layout: "dashboardlayout" });
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
      try {
        const place = await db.placeStore.create(req.payload, user.id);
        return h.redirect("/dashboard/places/" + place._id);
      } catch (err) {
        return h.view(
          "add-place",
          {
            user,
            error: err.message,
            active: {
              AddPlace: true,
            },
          },
          { layout: "dashboardlayout" }
        );
      }
    },
  },

  deletePlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const { id } = req.params;
      try {
        const place = await db.placeStore.delete(id, user.id);
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
          { layout: "dashboardlayout" }
        );
      }
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
      const updatedPlace = {
        ...req.payload,
      };
      console.log(updatedPlace);
      try {
        await db.placeStore.update(req.params.id, updatedPlace);
      } catch (error) {
        console.log(error);
        return h.view(
          "edit-place",
          {
            user: req.auth.credentials,
            place: req.payload,
            error: error.message,
          },
          { layout: "dashboardlayout" }
        );
      }
      return h.redirect("/dashboard/places");
    },
  },

  // placesByCategory: {
  //   auth: "session",
  //   handler: async (req, h) => {
  //     const user = req.auth.credentials;
  //     const category = req.params.category;
  //     const places = await db.placeStore.getByCategory(category);
  //     const viewData = {
  //       user,
  //       places,
  //       active: {
  //         Places: true,
  //       },
  //     };
  //     return h.view("places-by-category", viewData, {
  //       layout: "dashboardlayout",
  //     });
  //   },
  // },
};

export default User;
