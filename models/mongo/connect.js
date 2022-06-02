import dotenv from "dotenv";

import Mongoose from "mongoose";
import seeder from "mais-mongoose-seeder";
import * as data from "./seed-data.js";

dotenv.config();

function connectMongoose(dbString) {
  Mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = Mongoose.connection;

  async function seed() {
    await seeder(Mongoose).seed(data.default, {
      dropDatabase: false,
      dropCollections: true,
    });
  }

  db.on("error", (err) => {
    console.log(`Database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("Database disconnected.");
  });

  db.on("open", () => {
    console.log(`Connected to database: ${dbString}`);
    if (process.env.SEED === "true") {
      console.log("Seeding database...");
      seed();
    }
  });
}

export default connectMongoose;
