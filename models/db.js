import connectMongoose from "./mongo/connect.js";

import UserJsonStore from "./json/user-json-store.js";
import PlaceJsonStore from "./json/place-json-store.js";

import userMongoStore from "./mongo/user-mongo-store.js";
import placeMongoStore from "./mongo/place-mongo-store.js";
import categoryMongoStore from "./mongo/category-mongo-store.js";

export const db = {
  userStore: null,
  placeStore: null,
  categoryStore: null,

  init(env) {
    switch (env) {
      case "development_json":
        console.log("Using development JSON database");
        this.userStore = UserJsonStore;
        this.placeStore = PlaceJsonStore;
        break;
      case "development_mongo":
        console.log("Using development Mongo database");
        this.userStore = userMongoStore;
        this.placeStore = placeMongoStore;
        this.categoryStore = categoryMongoStore;
        connectMongoose(process.env.MONGO_LOCAL_URL);
        break;
      case "production":
        console.log("Using production Mongo database");
        this.userStore = userMongoStore;
        this.placeStore = placeMongoStore;
        this.categoryStore = categoryMongoStore;
        connectMongoose(process.env.MONGO_LIVE_URL);
        break;
      default:
        throw new Error(`Unknown execution environment: ${env}`);
    }
  },
};

export default db;
