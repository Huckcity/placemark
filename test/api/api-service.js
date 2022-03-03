import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const serverUrl = `http://localhost:${process.env.PORT}`;

const apiService = {
  // Auth API

  async authenticate(user) {
    const response = await axios.post(`${serverUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  // Category API

  async getAllCategories() {
    const response = await axios.get(`${serverUrl}/api/categories`);
    return response.data;
  },

  async getCategoryById(id) {
    const response = await axios.get(`${serverUrl}/api/categories/${id}`);
    return response.data;
  },

  async createCategory(category) {
    const response = await axios.post(`${serverUrl}/api/categories/add`, category);
    return response.data;
  },

  async updateCategory(id, category) {
    const response = await axios.put(`${serverUrl}/api/categories/${id}`, category);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${serverUrl}/api/categories/${id}`);
    return response.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${serverUrl}/api/categories/deleteall`);
    return response.data;
  },

  async getCategoryBySlugName(slugName) {
    const response = await axios.get(`${serverUrl}/api/categories/slug/${slugName}`);
    return response.data;
  },

  // Place API

  async getAllPlaces() {
    const response = await axios.get(`${serverUrl}/api/places`);
    return response.data;
  },

  async getPlaceById(id) {
    const response = await axios.get(`${serverUrl}/api/places/${id}`);
    return response.data;
  },

  async getPlacesByCategory(category) {
    const response = await axios.get(`${serverUrl}/api/places/category/${category}`);
    return response.data;
  },

  async createPlace(place, userId) {
    const response = await axios.post(`${serverUrl}/api/places/add`, {
      place,
      userId,
    });
    return response.data;
  },

  async updatePlace(userId, placeId, place) {
    const response = await axios.put(`${serverUrl}/api/places/${placeId}`, {
      userId,
      placeId,
      place,
    });
    return response.data;
  },

  async deletePlace(id, userId) {
    const response = await axios.delete(`${serverUrl}/api/places/${id}`, {
      data: {
        id,
        userId,
      },
    });
    return response.data;
  },

  async deleteAllPlaces() {
    const response = await axios.delete(`${serverUrl}/api/places/deleteall`);
    return response.data;
  },

  // User API

  async getAllUsers() {
    const response = await axios.get(`${serverUrl}/api/users`);
    return response.data;
  },

  async getUserById(id) {
    const response = await axios.get(`${serverUrl}/api/users/${id}`);
    return response.data;
  },

  async createUser(user) {
    const response = await axios.post(`${serverUrl}/api/users/add`, user);
    return response.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(`${serverUrl}/api/users/${id}`);
    return response.data;
  },

  async deleteAllUsers() {
    const response = await axios.delete(`${serverUrl}/api/users/deleteall`);
    return response.data;
  },
};

export default apiService;
