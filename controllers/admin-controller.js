import { db } from "../models/db.js";
import { adminRegisterSpec } from "../models/joi-schemas.js";

const adminController = {

  index: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const users = await db.userStore.getAll();
      const places = await db.placeStore.getAll();
      const categories = await db.categoryStore.getAll();
      const viewData = {
        user: req.auth.credentials,
        users,
        places,
        categories,
        active: {
          AdminDashboard: true,
        },
      };
      return h.view("admin-dashboard", viewData, { layout: "dashboardLayout" });
    },
  },

  adminUsers: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
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
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
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
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const viewData = { user };

      const newUser = await db.userStore.create(req.payload);
      if (newUser) {
        return h.redirect("/admin/users");
      }

      viewData.error = "Error creating user";
      viewData.active = { AddUser: true };
      return h.view("add-user", viewData, { layout: "dashboardlayout" });
    },
    validate: {
      payload: adminRegisterSpec,
      failAction: async (req, h, error) => {
        const user = req.auth.credentials;
        const viewData = {
          user,
          error: error.message,
          active: {
            AddUser: true,
          },
        };
        return h.view("add-user", viewData, { layout: "dashboardlayout" }).takeover();
      },
    },
  },

  adminEditUser: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const userToEdit = await db.userStore.getById(req.params.id);
      const viewData = {
        user,
        userToEdit,
      };
      return h.view("edit-user", viewData, { layout: "dashboardlayout" });
    },
  },

  adminEditUserPost: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const userToEdit = await db.userStore.getById(req.payload.id);
      const viewData = {
        user,
        userToEdit,
      };
      const { password, passwordConfirm } = req.payload;
      if (password) {
        if (password !== passwordConfirm) {
          viewData.error = "Passwords do not match";
          viewData.active = { AllUsers: true };
          return h.view("edit-user", viewData, { layout: "dashboardlayout" });
        }
      } else {
        delete req.payload.password;
      }
      const updatedUser = await db.userStore.update(userToEdit._id, req.payload);
      console.log(updatedUser);
      if (updatedUser) {
        viewData.userToEdit = updatedUser;
        viewData.message = "User details saved.";
      } else {
        viewData.error = "User details not saved.";
      }
      return h.view("edit-user", viewData, { layout: "dashboardlayout" });
    },
  },

  adminDeleteUser: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
      try {
        await db.userStore.delete(req.params.id);
        return h.redirect("/admin/users");
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

  adminCategories: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const categories = await db.categoryStore.getAll();
      const viewData = {
        user,
        categories,
        active: {
          AllCategories: true,
        },
      };
      return h.view("all-categories", viewData, { layout: "dashboardlayout" });
    },
  },

  adminAddCategory: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const viewData = {
        user,
        active: {
          AddCategory: true,
        },
      };
      return h.view("add-category", viewData, { layout: "dashboardlayout" });
    },
  },

  adminAddCategoryPost: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      try {
        await db.categoryStore.create(req.payload);
        return h.redirect("/admin/categories");
      } catch (error) {
        const user = req.auth.credentials;
        const viewData = {
          user,
          error: error.message,
          active: {
            AddCategory: true,
          },
        };
        return h.view("add-category", viewData, { layout: "dashboardlayout" });
      }
    },
  },

  adminEditCategory: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
      const category = await db.categoryStore.getById(req.params.id);
      const viewData = {
        user,
        category,
      };
      return h.view("edit-category", viewData, { layout: "dashboardlayout" });
    },
  },

  adminEditCategoryPost: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      await db.userStore.getById(req.auth.credentials.id);
      await db.categoryStore.update(req.params.id, req.payload);
      return h.redirect("/admin/categories");
    },
  },

  adminDeleteCategory: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = req.auth.credentials;
      try {
        await db.categoryStore.delete(req.params.id);
        return h.redirect("/admin/categories");
      } catch (error) {
        const categories = await db.categoryStore.getAll();
        const viewData = {
          user,
          categories,
          error: error.message,
          active: {
            AllCategories: true,
          },
        };
        return h.view("all-categories", viewData, { layout: "dashboardlayout" });
      }
    },
  },
};

export default adminController;
