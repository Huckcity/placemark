import UserJsonStore from "./json/user-json-store.js";
import PlacesJsonStore from "./json/place-json-store.js";

const db = {
  userStore: null,

  init(env) {
    switch (env) {
      case "development":
        console.log("Using development database");
        this.userStore = UserJsonStore;
        this.placeStore = PlacesJsonStore;
        break;
      case "production":
        console.log("Using production database");
        this.userStore = UserJsonStore;
        this.placeStore = PlacesJsonStore;
        break;
      default:
        throw new Error(`Unknown execution environment: ${env}`);
    }
  },
};

export default db;
