import dotenv from "dotenv";
dotenv.config();

import Mongoose from "mongoose";

export function connectMongoose() {
  Mongoose.connect(process.env.DB);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`Database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("Database disconnected.");
  });

  db.on("open", function () {
    console.log(`Database connected to ${this.name} on ${this.host}`);
  });
}
