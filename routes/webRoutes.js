import baseController from "../controllers/base-controller.js";
import adminController from "../controllers/admin-controller.js";
import authController from "../controllers/auth-controller.js";
import dashboardController from "../controllers/dashboard-controller.js";

const routes = [
  // Home/Auth routes
  {
    method: "GET",
    path: "/",
    config: baseController.index,
  },
  {
    method: "GET",
    path: "/login",
    config: authController.login,
  },
  {
    method: "GET",
    path: "/logout",
    config: authController.logout,
  },
  {
    method: "GET",
    path: "/register",
    config: authController.register,
  },
  {
    method: "POST",
    path: "/register",
    config: authController.registerPost,
  },
  {
    method: "POST",
    path: "/login",
    config: authController.loginPost,
  },

  // Dashboard routes
  {
    method: "GET",
    path: "/dashboard",
    config: dashboardController.dashboard,
  },
  {
    method: "GET",
    path: "/dashboard/places",
    config: dashboardController.myPlaces,
  },
  {
    method: "GET",
    path: "/dashboard/places/{id}",
    config: dashboardController.place,
  },
  {
    method: "GET",
    path: "/dashboard/places/new",
    config: dashboardController.addPlace,
  },
  {
    method: "POST",
    path: "/dashboard/places/new",
    config: dashboardController.addPlacePost,
  },
  {
    method: "GET",
    path: "/dashboard/places/delete/{id}",
    config: dashboardController.deletePlace,
  },
  {
    method: "GET",
    path: "/dashboard/places/edit/{id}",
    config: dashboardController.editPlace,
  },
  {
    method: "POST",
    path: "/dashboard/places/edit/{id}",
    config: dashboardController.editPlacePost,
  },

  // User routes
  {
    method: "GET",
    path: "/dashboard/settings",
    config: dashboardController.settings,
  },
  {
    method: "POST",
    path: "/dashboard/settings/update",
    config: dashboardController.settingsUpdate,
  },

  // Admin routes
  {
    method: "GET",
    path: "/dashboard/admin/users",
    config: adminController.adminUsers,
  },
  {
    method: "GET",
    path: "/dashboard/admin/users/add",
    config: adminController.adminAddUser,
  },
  {
    method: "POST",
    path: "/dashboard/admin/users/add",
    config: adminController.adminAddUserPost,
  },
  {
    method: "GET",
    path: "/dashboard/admin/users/edit/{id}",
    config: adminController.adminEditUser,
  },
  {
    method: "POST",
    path: "/dashboard/admin/users/edit/{id}",
    config: adminController.adminEditUserPost,
  },
  {
    method: "GET",
    path: "/dashboard/admin/users/delete/{id}",
    config: adminController.adminDeleteUser,
  },

  // Wildcard static file routes
  {
    method: "GET",
    path: "/node_modules/{param*}",
    handler: {
      directory: {
        path: "./node_modules",
      },
    },
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/public/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: {
      auth: false,
    },
  },
];

export default routes;
