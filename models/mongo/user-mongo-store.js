import { User } from "./user.js";

const userMongoStore = {
  async getAll() {
    const users = User.find({}).lean();
    return users;
  },

  async getByUsername(username) {
    if (!username) {
      throw new Error("Username is required.");
    }
    const user = await User.findOne({ username });
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

  async getByEmail(email) {
    if (!email) {
      throw new Error("User email is required.");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }
    return user;
  },

  async authByEmailOrUsername(user) {
    if (!user.email && !user.username) {
      throw new Error("Username/email is required.");
    }
    if (!user.password) {
      throw new Error("User password is required.");
    }

    const login = user.email ? user.email : user.username;
    const existingUser = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });
    if (!existingUser) {
      throw new Error(`User with email ${login} not found.`);
    }
    const isMatch = await existingUser.checkPassword(user.password);
    if (!isMatch) {
      throw new Error("Invalid password.");
    }
    return existingUser;
  },

  async create(user) {
    // TODO: Check for uniqueness of username/email
    const newUser = new User(user);
    const userObj = await newUser.save();
    const savedUser = await this.getById(userObj._id);
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

    if (user.password === null || user.password === undefined || user.password === "") {
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
