import { v4 } from "uuid";
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./users.json"));
db.data ||= { users: [] };

const UserJsonStore = {
  getAll: async () => {
    await db.read();
    return db.data.users;
  },

  getById: async (id) => {
    await db.read();
    const user = db.data.users.find((u) => u._id === id);
    return user ? user : null;
  },

  getByUsername: async (username) => {
    await db.read();
    const user = db.data.users.find((u) => u.username === username);
    return user ? user : null;
  },

  create: async (user) => {
    await db.read();
    if (!user.username || !user.password || !user.email) {
      return null;
    }
    const newUser = {
      _id: v4(),
      ...user,
    };
    db.data.users.push(newUser);
    await db.write();
    return newUser;
  },

  update: async (id, user) => {
    await db.read();
    const index = db.data.users.findIndex((u) => u._id === id);
    db.data.users[index] = user;
    await db.write();
    return user;
  },

  delete: async (id) => {
    await db.read();
    const user = db.data.users.find((u) => u._id === id);
    const index = db.data.users.findIndex((u) => u._id === id);
    db.data.users.splice(index, 1);
    await db.write();
    return user;
  },

  deleteAll: async () => {
    db.data.users = [];
    await db.write();
  },
};

export default UserJsonStore;
