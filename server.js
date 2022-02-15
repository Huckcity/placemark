"use strict";

require("dotenv").config();
const path = require("path");
const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
  });

  await server.register(require("@hapi/vision"));
  await server.register(require("@hapi/inert"));
  await server.register(require("@hapi/cookie"));

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "sid-example",
      password: "password-should-be-32-characters",
      isSecure: false,
    },
    redirectTo: "/login",
  });
  server.auth.default("session");

  server.route({
    method: "GET",
    path: "/public/{param*}",
    handler: {
      directory: {
        path: path.join(__dirname, "public"),
      },
    },
    options: {
      auth: false,
    },
  });

  server.route({
    method: "GET",
    path: "/node_modules/{param*}",
    handler: {
      directory: {
        path: path.join(__dirname, "node_modules"),
      },
    },
    options: {
      auth: false,
    },
  });

  server.views({
    engines: {
      hbs: require("handlebars"),
    },
    layout: true,
    relativeTo: __dirname,
    path: "./src/views",
    layoutPath: "./src/views/layout",
    partialsPath: "./src/views/partials",
    isCached: false,
  });

  server.route(require("./src/routes/index"));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
