"use strict";

const Home = {
  index: {
    auth: false,
    handler: async (req, h) => {
      return h.view("index");
    },
  },
};

module.exports = Home;
