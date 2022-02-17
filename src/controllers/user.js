"use strict";

import db from "../models/db.js";

const User = {
  dashboard: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const places = await db.placesStore.getAllPlaces();
      // user.isAdmin = true;
      return h.view(
        "dashboard",
        { user, places },
        { layout: "dashboardlayout" }
      );
    },
  },

  myPlaces: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const places = await db.placesStore.getAllPlaces();
      return h.view(
        "my-places",
        { user, places },
        { layout: "dashboardlayout" }
      );
    },
  },

  addPlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      return h.view("add-place", { user }, { layout: "dashboardlayout" });
    },
  },

  addPlacePost: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const { name } = req.payload;
      const place = await db.placesStore.addPlace(name, user.id);
      return h.redirect("/dashboard/places");
    },
  },

  deletePlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const { id } = req.params;
      const place = await db.placesStore.deletePlace(id);
      return h.redirect("/dashboard/places");
    },
  },

  editPlace: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const place = await db.placesStore.getPlaceById(req.params.id);
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
      const { id, name } = req.payload;
      const place = {
        id,
        name,
      };
      const updatedPlace = await db.placesStore.updatePlace(place);
      return h.redirect("/dashboard/places");
    },
  },
};

export default User;
