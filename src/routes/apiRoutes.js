import userApi from "../api/user-api.js";
import placeApi from "../api/place-api.js";

const apiRoutes = [
  // User API Routes
  {
    method: "GET",
    path: "/api/users",
    config: userApi.allUsers,
  },
  {
    method: "POST",
    path: "/api/users/add",
    config: userApi.create,
  },
  {
    method: "GET",
    path: "/api/users/{id}",
    config: userApi.findOne,
  },
  {
    method: "DELETE",
    path: "/api/users/{id}",
    config: userApi.remove,
  },
  {
    method: "DELETE",
    path: "/api/users/deleteall",
    config: userApi.removeAll,
  },

  // Place API Routes
  {
    method: "GET",
    path: "/api/places",
    config: placeApi.allPlaces,
  },
  {
    method: "POST",
    path: "/api/places/add",
    config: placeApi.create,
  },
  {
    method: "GET",
    path: "/api/places/{id}",
    config: placeApi.findOne,
  },
  {
    method: "DELETE",
    path: "/api/places/{id}",
    config: placeApi.delete,
  },
  {
    method: "DELETE",
    path: "/api/places/deleteall",
    config: placeApi.deleteAll,
  },
  {
    method: "PUT",
    path: "/api/places/{id}",
    config: placeApi.update,
  },
];

export default apiRoutes;
