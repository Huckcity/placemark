import dotenv from "dotenv";
dotenv.config();

import Mongoose from "mongoose";
import seeder from "mais-mongoose-seeder";
import * as data from "./seed-data.json" assert { type: "json" };

export function connectMongoose(db_string) {
  Mongoose.connect(db_string);
  const db = Mongoose.connection;

  async function seed() {
    const seedData = await seeder(Mongoose).seed(data.default, {
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

  db.on("open", function () {
    console.log(`Database connected to ${this.name} on ${this.host}`);
    if (process.env.SEED === "true") {
      seed();
    }
  });
}
