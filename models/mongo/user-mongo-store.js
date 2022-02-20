import { User } from "./user.js";

const userMongoStore = {
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
    if (!user || !user.username || !user.email) {
      throw new Error("User is required.");
    }
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  },

  async update(id, user) {
    console.log(user);
    if (!id) {
      throw new Error("User id is required.");
    }
    if (!user) {
      throw new Error("User is required.");
    }

    if (user.password === null) {
      delete user.password;
    }

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    if (!updatedUser) {
      throw new Error(`User with id ${id} not found.`);
    }
    console.log(updatedUser);
    return updatedUser;
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

  async getAll() {
    return User.find({});
  },

  async getByUsername(username) {
    if (!username) {
      throw new Error("Username is required.");
    }
    const user = await User.findOne({ username });
    return user;
  },
};

export default userMongoStore;