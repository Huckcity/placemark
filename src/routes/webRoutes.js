"use strict";

import Home from "../controllers/home.js";
import Auth from "../controllers/auth.js";
import User from "../controllers/user.js";

const routes = [
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

  {
    method: "GET",
    path: "/dashboard/places",
    config: User.myPlaces,
  },
  {
    method: "GET",
    path: "/dashboard/places/new",
    config: User.addPlace,
  },
  {
    method: "POST",
    path: "/dashboard/places/new",
    config: User.addPlacePost,
  },
  {
    method: "GET",
    path: "/dashboard/places/delete/{id}",
    config: User.deletePlace,
  },
  {
    method: "GET",
    path: "/dashboard/places/edit/{id}",
    config: User.editPlace,
  },
  {
    method: "POST",
    path: "/dashboard/places/edit",
    config: User.editPlacePost,
  },
];

export default routes;
