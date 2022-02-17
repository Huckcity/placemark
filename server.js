"use strict";

import dotenv from "dotenv";
dotenv.config();

import path from "path";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";

import webRoutes from "./src/routes/webRoutes.js";
import apiRoutes from "./src/routes/apiRoutes.js";

import db from "./src/models/db.js";

db.init(process.env.ENVIRONMENT);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    routes: { cors: true },
  });

  await server.register(Vision);
  await server.register(Inert);
  await server.register(Cookie);

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
      hbs: Handlebars,
    },
    layout: true,
    relativeTo: __dirname,
    path: "./src/views",
    layoutPath: "./src/views/layout",
    partialsPath: "./src/views/partials",
    isCached: false,
  });

  server.route(webRoutes);
  server.route(apiRoutes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
