import dotenv from "dotenv";

import path from "path";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import hapiswagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";

import { validate } from "./helpers/utils.js";
import hbsHelpers from "./helpers/handlebars.js";

import webRoutes from "./routes/webRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

import { db } from "./models/db.js";

dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const viewsPath = path.resolve(__dirname, "public", "views");

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

  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(jwt);

  await server.register([
    {
      plugin: hapiswagger,
      options: {
        info: {
          title: "API Documentation",
          version: "1.0.0",
        },
      },
    },
  ]);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    path: viewsPath,
    layoutPath: path.resolve(viewsPath, "layouts"),
    layout: true,
    partialsPath: path.resolve(viewsPath, "partials"),
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "sid-example",
      password: "password-should-be-32-characters",
      isSecure: false,
    },
    redirectTo: "/login",
  });

  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    verifyOptions: { algorithms: ["HS256"] },
    validate,
    redirectTo: "/login",
  });

  server.auth.default("session");
  db.init(process.env.ENVIRONMENT);

  server.route(webRoutes);
  server.route(apiRoutes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

  hbsHelpers(Handlebars);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
