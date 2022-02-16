import UserJsonStore from "./json/user-json-store.js";
import PlacesJsonStore from "./json/place-json-store.js";

const db = {
  userStore: null,

  init() {
    this.userStore = UserJsonStore;
    this.placesStore = PlacesJsonStore;
  },
};

export default db;
