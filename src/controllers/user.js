"use strict";

const User = {
  dashboard: {
    auth: "session",
    handler: async (req, h) => {
      const user = req.auth.credentials;
      return h.view("dashboard", user, { layout: "dashboardlayout" });
    },
  },
};

module.exports = User;
