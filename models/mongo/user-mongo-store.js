import { User } from "./user.js";

const userMongoStore = {
  async getAll() {
    return User.find({}).lean();
  },

  async getByUsername(username) {
    if (!username) {
      throw new Error("Username is required.");
    }
    const user = await User.findOne({ username }).lean();
    return user;
  },

  async getById(id) {
    if (!id) {
      throw new Error("User id is required.");
    }
    const user = await User.findById(id).lean();
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }
    return user;
  },

  async getUserByEmail(email) {
    if (!email) {
      throw new Error("User email is required.");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }
    return user;
  },

  async create(user) {
    // TODO: Check for uniqueness of username/email
    const newUser = new User(user);
    await newUser.save();
    const savedUser = await this.getById(newUser._id);
    return savedUser;
  },

  async update(id, user) {
    if (!user.username || !user.email) {
      throw new Error("Username/email is required.");
    }
    // TODO: Check for uniqueness of username/email
    if (!id) {
      throw new Error("User id is required.");
    }
    if (!user) {
      throw new Error("User is required.");
    }

    if (
      user.password === null ||
      user.password === undefined ||
      user.password === ""
    ) {
      delete user.password;
    }

    if (user.password && user.password !== user.passwordConfirm) {
      throw new Error("Passwords do not match.");
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(id, user, {
        new: true,
      }).lean();
      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update user.");
    }
  },

  async delete(id) {
    if (!id) {
      throw new Error("User id is required.");
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error(`User with id ${id} not found.`);
    }
    return deletedUser;
  },

  async deleteAll() {
    return User.deleteMany({});
  },
};

export default userMongoStore;
