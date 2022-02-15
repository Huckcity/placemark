"use strict";

const Home = require("../controllers/home.js");
const Auth = require("../controllers/auth.js");
const User = require("../controllers/user.js");

module.exports = [
  {
    method: "GET",
    path: "/",
    config: Home.index,
  },
  {
    method: "GET",
    path: "/login",
    config: Auth.login,
  },
  {
    method: "GET",
    path: "/logout",
    config: Auth.logout,
  },
  {
    method: "GET",
    path: "/register",
    config: Auth.register,
  },
  {
    method: "POST",
    path: "/register",
    config: Auth.registerPost,
  },
  {
    method: "POST",
    path: "/login",
    config: Auth.loginPost,
  },
  {
    method: "GET",
    path: "/dashboard",
    config: User.dashboard,
  },
];

// server.route({
//   method: "GET",
//   path: "/",
//   handler: (req, h) => {
//     return h.view("index");
//   },
// });

// server.route({
//   method: "GET",
//   path: "/login",
//   handler: (req, h) => {
//     return h.view("login");
//   },
// });

// server.route({
//   method: "POST",
//   path: "/login",
//   handler: async (req, h) => {
//     const { username, password } = req.payload;
//     const user = users.find((u) => u.username === username);

//     if (!user) {
//       return h.view("login", {
//         error: "User not found",
//       });
//     }

//     req.cookieAuth.set({
//       id: user.id,
//     });

//     return h.redirect("/dashboard");
//   },
// });

// server.route({
//   method: "GET",
//   path: "/dashboard",
//   options: {
//     auth: "simple",
//   },
//   handler: (req, h) => {
//     return h.view("dashboard");
//   },
// });
