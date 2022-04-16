import dotenv from "dotenv";

import path from "path";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import hapiswagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import * as AWS from "@aws-sdk/client-ssm";
import authController from "./controllers/auth-controller.js";
import { validate } from "./helpers/utils.js";
import hbsHelpers from "./helpers/handlebars.js";

import webRoutes from "./routes/webRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

import { db } from "./models/db.js";

dotenv.config();

const ssmClient = new AWS.SSM({
  region: "us-east-1",
  apiVersion: "2014-11-06",
});

// Check if AWS SSM Parameter Store is true, and if so,
// set the process.env variables to the corresponding parameter store values
const checkSSMParameters = async () => {
  const params = {
    Names: [
      "IS_AWS",
      "ENVIRONMENT",
      "SEED",
      "MONGO_LIVE_URL",
      "DO_SECRET_ACCESS_KEY",
      "DO_ACCESS_KEY_ID",
      "JWT_SECRET",
      "PORT",
    ],
    WithDecryption: false,
  };

  console.log("something something dark side");

  const data = await ssmClient.getParameters(params);

  console.log(data);

  if (data.Parameters.IS_AWS && data.Parameters.IS_AWS.Value === "true") {
    data.Parameters.forEach((param) => {
      process.env[param.Name] = param.Value;
    });
  }
};

checkSSMParameters()
  .then(() => {
    console.log("SSM Parameters loaded");
  })
  .catch((err) => {
    console.log(err);
  });

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
        securityDefinitions: {
          jwt: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
          },
        },
        security: [{ jwt: [] }],
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
    validateFunc: authController.validate,
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
