import Mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = Mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
  },
);

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.checkPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

export const User = Mongoose.model("User", userSchema);
