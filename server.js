import dotenv from "dotenv";
import os from "os";
import fetch from "node-fetch";
import path from "path";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Cookie from "@hapi/cookie";
import Bell from "@hapi/bell";
import Handlebars from "handlebars";
import hapiswagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import { GetParametersCommand, SSMClient } from "@aws-sdk/client-ssm";
import authController from "./controllers/auth-controller.js";
import { validate } from "./helpers/utils.js";
import hbsHelpers from "./helpers/handlebars.js";

import webRoutes from "./routes/webRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

import { db } from "./models/db.js";

const ssmClient = new SSMClient({
  region: "us-east-1",
});

// Check if IS_AWS SSM Parameter Store is true, and if so,
// set the process.env variables to the corresponding parameter store values
const checkSSMParameters = async () => {
  const params = {
    Names: [
      "IS_AWS",
      "ENVIRONMENT",
      "SEED",
      // "MONGO_LIVE_URL",
      "DO_SECRET_ACCESS_KEY",
      "DO_ACCESS_KEY_ID",
      "JWT_SECRET",
      "PORT",
      "PRIVATE_INSTANCE_MONGO_URL",
      "GITHUB_CLIENT_ID",
      "GITHUB_CLIENT_SECRET",
    ],
    WithDecryption: false,
  };

  console.log("Checking SSM Parameters");
  const command = new GetParametersCommand(params);

  try {
    const data = await ssmClient.send(command);
    const is_aws = data.Parameters.find((p) => p.Name === "IS_AWS").Value;
    if (is_aws && is_aws === "true") {
      data.Parameters.forEach((param) => {
        process.env[param.Name] = param.Value;
      });
    } else {
      console.log("Not running on AWS");
      dotenv.config();
    }
  } catch (err) {
    console.log(err);
  }
};

await checkSSMParameters()
  .then(() => {
    console.log("SSM Parameters loaded");
    const res = fetch("http://169.254.169.254/latest/meta-data/instance-id", {
      method: "GET",
    })
      .then((res) => res.text())
      .then((res) => {
        process.env.INSTANCE_ID = res;
      })
      .catch((err) => {
        console.log(err);
      });
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
  await server.register(Bell);
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

  const bellAuthOptions = {
    provider: "github",
    password: "github-encryption-string-should-be-32-characters",
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    isSecure: false,
    scope: ["user:email"],
  };

  server.auth.strategy("github", "bell", bellAuthOptions);

  server.route([
    {
      method: "GET",
      path: "/githublogin",
      options: {
        auth: "github",
        handler: function (request, h) {
          if (request.auth.isAuthenticated) {
            try {
              const existingUser = db.userStore.findOne({
                email: request.auth.credentials.profile.email,
              });
            } catch (err) {
              console.log(err);
            }
            if (!existingUser) {
              return h.redirect("/register");
            }
            request.cookieAuth.set({
              _id: existingUser._id,
              email: existingUser.email,
              username: existingUser.username,
              scope: existingUser.role,
              role: existingUser.role,
              github_id: request.auth.credentials.profile.id,
              github_username: request.auth.credentials.profile.username,
              github_access_token: request.auth.credentials.token,
            });
            return h.redirect("/dashboard");
          }
        },
      },
    },
  ]);

  server.auth.default("session");
  db.init(process.env.ENVIRONMENT);

  server.route(webRoutes);
  server.route(apiRoutes);
  server.route({
    method: "GET",
    path: "/testlb",
    handler: function (request, h) {
      return "Server: " + os.hostname();
    },
    config: { auth: false },
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
