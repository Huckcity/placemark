import userApi from "../api/user-api.js";

const apiRoutes = [
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
];

export default apiRoutes;
