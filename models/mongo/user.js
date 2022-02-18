import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

export const User = Mongoose.model("User", userSchema);
