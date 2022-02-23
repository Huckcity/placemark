import db from "../models/db.js";

const adminController = {
  adminUsers: {
    auth: {
      strategy: "session",
      scope: ["admin"],
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
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
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
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      const viewData = { user };

      try {
        await db.userStore.create(req.payload);
        return h.redirect("/dashboard/admin/users");
      } catch (error) {
        viewData.error = error.message;
        viewData.active = { AllUsers: true };
        return h.view("add-user", viewData, { layout: "dashboardlayout" });
      }
    },
  },

  adminEditUser: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
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
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async (req, h) => {
      const user = await db.userStore.getById(req.auth.credentials.id);
      let userToEdit = await db.userStore.getById(req.payload.id);
      const viewData = {
        user,
        userToEdit,
      };
      try {
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
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
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

export default adminController;
