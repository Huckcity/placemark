import axios from "axios";

const serverUrl = `http://localhost:3000`;
console.log(serverUrl);

const apiService = {
  async getAllUsers() {
    const response = await axios.get(`${serverUrl}/api/users`);
    console.log(response.data);
    return response.data;
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
