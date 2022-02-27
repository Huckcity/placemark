import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import db from "../models/db.js";

export const createToken = (user) => {
  const payload = {
    userId: user._id,
    role: user.role,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export const decodeToken = (token) => {
  let userInfo = {};
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userInfo = {
      userId: decoded.userId,
      role: decoded.role,
    };
  } catch (err) {
    console.log(err);
  }
  return userInfo;
};

export const validate = async (decoded, request, h) => {
  const user = await db.userStore.getById(decoded.userId);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true };
};
