import { User } from "./user.js";

const userMongoStore = {
  async getAll() {
    const users = User.find({}).lean();
    return users;
  },

  async getByUsername(username) {
    const user = await User.findOne({ username });
    return user;
  },

  async getById(id) {
    const user = await User.findById(id).lean();
    return user;
  },

  async getByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  },

  async authByEmailOrUsername(user) {
    const login = user.email ? user.email : user.username;
    const existingUser = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });
    return existingUser;
  },

  async create(user) {
    // TODO: Check for uniqueness of username/email
    try {
      const newUser = new User(user);
      const userObj = await newUser.save();
      const savedUser = await this.getById(userObj._id);
      return savedUser;
    } catch (err) {
      return null;
    }
  },

  async update(id, user) {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    }).lean();
    return updatedUser;
  },

  async delete(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  },

  async deleteAll() {
    return User.deleteMany({});
  },
};

export default userMongoStore;
