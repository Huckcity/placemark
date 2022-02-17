import axios from "axios";

const serverUrl = `http://localhost:3000`;

const userApiService = {
  async getAllUsers() {
    try {
      const response = await axios.get(`${serverUrl}/api/users`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async getUserById(id) {
    try {
      const response = await axios.get(`${serverUrl}/api/users/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async createUser(user) {
    try {
      const response = await axios.post(`${serverUrl}/api/users/add`, user);
      return response.data === "" ? null : response.data;
    } catch (err) {
      return null;
    }
  },

  async deleteUser(id) {
    try {
      const response = await axios.delete(`${serverUrl}/api/users/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async deleteAllUsers() {
    try {
      const response = await axios.delete(`${serverUrl}/api/users/deleteall`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};

export default userApiService;
