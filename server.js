"use strict";

import dotenv from "dotenv";
dotenv.config();

import path from "path";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";

import hbsHelpers from "./helpers/handlebars.js";

import webRoutes from "./routes/webRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

import db from "./models/db.js";

db.init(process.env.ENVIRONMENT);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      files: {
        relativeTo: __dirname,
      },
    },
  });

  await server.register(Vision);
  await server.register(Inert);
  await server.register(Cookie);

  const viewsPath = path.resolve(__dirname, "public", "views");

  server.views({
    engines: {
      hbs: Handlebars,
    },
    path: viewsPath,
    layoutPath: path.resolve(viewsPath, "layouts"),
    layout: true,
    partialsPath: path.resolve(viewsPath, "partials"),
    isCached: false,
    context: {
      title: "Placemark",
    },
  });

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

  server.route(webRoutes);
  server.route(apiRoutes);

  server.ext("onPreResponse", (request, h) => {
    if (request.response.isBoom) {
      return h.view(
        "error-page",
        {
          friendlyerror: "I'm sorry Dave, I'm afraid I can't do that.",
        },
        { layout: "dashboardlayout" }
      );
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

  hbsHelpers(Handlebars);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
