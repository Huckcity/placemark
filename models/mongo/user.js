import Mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    profileImage: {
      type: String,
      default: "/public/images/default-profile-image.png",
    },
    dob: Date,
    active: {
      type: Boolean,
      default: true,
    },
    favouritePlaces: [String],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    const hash = await bcrypt.hash(this._update.password, 10);
    this._update.password = hash;
  }
  next();
});

userSchema.methods.checkPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

export const User = Mongoose.model("User", userSchema);
