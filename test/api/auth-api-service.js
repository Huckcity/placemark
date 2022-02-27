import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const serverUrl = `http://localhost:${process.env.PORT}`;

const authApiService = {
  async authenticate(user) {
    const response = await axios.post(`${serverUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    delete axios.defaults.headers.common["Authorization"];
  },
};

export default authApiService;
