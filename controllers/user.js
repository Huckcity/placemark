"use strict";

import db from "../models/db.js";
import { checkAdmin } from "../helpers/utils.js";

const User = {
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
            { layout: "dashboardlayout" }
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
      const user = await db.userStore.getById(req.auth.credentials.id);
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
        await db.placeStore.delete(id, user.id);
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
      const userId = req.auth.credentials.id;
      const updatedPlace = {
        ...req.payload,
      };
      console.log(updatedPlace);
      try {
        await db.placeStore.update(userId, req.params.id, updatedPlace);
        return h.redirect("/dashboard/places/" + req.params.id);
      } catch (error) {
        console.log(error);
        return h.view(
          "place",
          {
            user: req.auth.credentials,
            place: updatedPlace,
            error: error.message,
          },
          { layout: "dashboardlayout" }
        );
      }
    },
  },

  adminUsers: {
    auth: {
      strategy: "session",
      // scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const allusers = await db.userStore.getAll();
      const viewData = {
        user,
        allusers,
        active: {
          AllUsers: true,
        },
      };
      return h.view("all-users", viewData, { layout: "dashboardlayout" });
    },
  },

  adminAddUser: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const viewData = {
        user,
        active: {
          AddUser: true,
        },
      };
      return h.view("add-user", viewData, { layout: "dashboardlayout" });
    },
  },

  adminAddUserPost: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const viewData = { user };

      if (user.isAdmin) {
        try {
          await db.userStore.create(req.payload);
          return h.redirect("/dashboard/admin/users");
        } catch (error) {
          viewData.error = error.message;
          viewData.active = { AllUsers: true };
          return h.view("add-user", viewData, { layout: "dashboardlayout" });
        }
      }
      return h.view("add-user", viewData, { layout: "dashboardlayout" });
    },
  },

  adminEditUser: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const userToEdit = await db.userStore.getById(req.params.id);
      const viewData = {
        user,
        userToEdit,
      };
      return h.view("edit-user", viewData, { layout: "dashboardlayout" });
    },
  },

  adminEditUserPost: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      let userToEdit = await db.userStore.getById(req.payload.id);
      const viewData = {
        user,
        userToEdit,
      };
      try {
        console.log(req.payload);
        const updatedUser = await db.userStore.update(
          userToEdit._id,
          req.payload
        );
        viewData.userToEdit = updatedUser;
        viewData.message = "User details saved.";
        return h.view("edit-user", viewData, { layout: "dashboardlayout" });
      } catch (error) {
        viewData.error = error.message;
        return h.view("edit-user", viewData, { layout: "dashboardlayout" });
      }
    },
  },

  adminDeleteUser: {
    auth: "session",
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      try {
        await db.userStore.delete(req.params.id);
        return h.redirect("/dashboard/admin/users");
      } catch (error) {
        const allusers = await db.userStore.getAll();
        const viewData = {
          user,
          allusers,
          error: error.message,
          active: {
            AllUsers: true,
          },
        };
        return h.view("all-users", viewData, { layout: "dashboardlayout" });
      }
    },
  },
};

export default User;
