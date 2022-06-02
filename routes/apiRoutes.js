import userApi from "../api/user-api.js";
import placeApi from "../api/place-api.js";
import categoryApi from "../api/category-api.js";
import reviewApi from "../api/review-api.js";

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
  {
    method: "PUT",
    path: "/api/users/{id}",
    config: userApi.update,
  },
  {
    method: "POST",
    path: "/api/places/{id}/favourite",
    config: userApi.toggleFavourite,
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
    method: "GET",
    path: "/api/places/public/{id}",
    config: placeApi.findOnePublic,
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
  {
    method: "GET",
    path: "/api/places/category/{category}",
    config: placeApi.findByCategory,
  },
  {
    method: "GET",
    path: "/api/places/user/{id}",
    config: placeApi.findByUser,
  },

  // Category API Routes

  {
    method: "GET",
    path: "/api/categories",
    config: categoryApi.allCategories,
  },
  {
    method: "POST",
    path: "/api/categories/add",
    config: categoryApi.create,
  },
  {
    method: "GET",
    path: "/api/categories/{id}",
    config: categoryApi.findOne,
  },
  {
    method: "DELETE",
    path: "/api/categories/{id}",
    config: categoryApi.delete,
  },
  {
    method: "DELETE",
    path: "/api/categories/deleteall",
    config: categoryApi.deleteAll,
  },
  {
    method: "PUT",
    path: "/api/categories/{id}",
    config: categoryApi.update,
  },

  // Review API Routes
  {
    method: "GET",
    path: "/api/reviews",
    config: reviewApi.allReviews,
  },
  {
    method: "POST",
    path: "/api/reviews/add",
    config: reviewApi.create,
  },
  {
    method: "GET",
    path: "/api/reviews/{id}",
    config: reviewApi.findOne,
  },
  {
    method: "DELETE",
    path: "/api/reviews/{id}",
    config: reviewApi.delete,
  },
  {
    method: "DELETE",
    path: "/api/reviews/deleteall",
    config: reviewApi.deleteAll,
  },
  {
    method: "GET",
    path: "/api/reviews/place/{placeId}",
    config: reviewApi.findByPlaceId,
  },

  // Auth API Routes
  {
    method: "POST",
    path: "/api/users/authenticate",
    config: userApi.authenticate,
  },
];

export default apiRoutes;
