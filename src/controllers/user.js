"use strict";

import db from "../models/db.js";

const User = {
  dashboard: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const places = await db.placeStore.getAll();
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
      const places = await db.placeStore.getAll();
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
      await db.placeStore.update(req.payload.id, updatedPlace);
      return h.redirect("/dashboard/places");
    },
  },
};

export default User;
