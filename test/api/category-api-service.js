import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const serverUrl = `http://localhost:${process.env.PORT}`;

const categoryApiService = {
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
    try {
      const response = await axios.delete(`${serverUrl}/api/categories/deleteall`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getCategoryBySlugName(slugName) {
    const response = await axios.get(`${serverUrl}/api/categories/slug/${slugName}`);
    return response.data;
  },
};

export default categoryApiService;
