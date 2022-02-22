import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = Mongoose.model("User", userSchema);
