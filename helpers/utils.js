import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { db } from "../models/db.js";

dotenv.config();

export const createToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export const decodeToken = (token) => {
  let userInfo = {};
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userInfo = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    console.log(err);
  }
  return userInfo;
};

export const validate = async (decoded) => {
  const user = await db.userStore.getById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
};

export function assertSubset(subset, superset) {
  if (
    typeof superset !== "object"
    || superset === null
    || typeof subset !== "object"
    || subset === null
  ) {
    return false;
  }

  if (superset instanceof Date || subset instanceof Date) {
    return superset.valueOf() === subset.valueOf();
  }

  return Object.keys(subset).every((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!superset.propertyIsEnumerable(key)) return false;
    const subsetItem = subset[key];
    const supersetItem = superset[key];
    if (
      typeof subsetItem === "object" && subsetItem !== null
        ? !assertSubset(supersetItem, subsetItem)
        : supersetItem !== subsetItem
    ) {
      return false;
    }

    return true;
  });
}
