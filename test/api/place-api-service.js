import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const serverUrl = `http://localhost:${process.env.PORT}`;

const placeApiService = {
  async getAllPlaces() {
    try {
      const response = await axios.get(`${serverUrl}/api/places`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async getPlaceById(id) {
    try {
      const response = await axios.get(`${serverUrl}/api/places/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async createPlace(place, userId) {
    try {
      const response = await axios.post(`${serverUrl}/api/places/add`, {
        place,
        userId,
      });
      return response.data === "" ? null : response.data;
    } catch (err) {
      return null;
    }
  },

  async deletePlace(id, userId) {
    try {
      const response = await axios.delete(`${serverUrl}/api/places/${id}`, {
        data: {
          userId,
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async deleteAllPlaces() {
    try {
      const response = await axios.delete(`${serverUrl}/api/places/deleteall`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};

export default placeApiService;
