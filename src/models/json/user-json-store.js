import { v4 } from "uuid";
import { Low, JSONFile } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/users.json"));
db.data ||= { users: [] };

const UserJsonStore = {
  getAll: async () => {
    await db.read();
    return db.data.users;
  },

  getById: async (id) => {
    await db.read();
    const user = db.data.users.find((u) => u.id === id);
    console.log(`user: ${user}`);
    return user ? user : null;
  },

  getByUsername: async (username) => {
    await db.read();
    const user = db.data.users.find((u) => u.username === username);
    return user ? user : null;
  },

  create: async (user) => {
    await db.read();
    const newUser = {
      id: v4(),
      ...user,
    };
    db.data.users.push(newUser);
    await db.write();
    return newUser;
  },

  update: async (id, user) => {
    await db.read();
    const index = db.data.users.findIndex((u) => u.id === id);
    db.data.users[index] = user;
    await db.write();
    return user;
  },

  delete: async (id) => {
    await db.read();
    const index = db.data.users.findIndex((u) => u.id === id);
    db.data.users.splice(index, 1);
    await db.write();
  },

  deleteAll: async () => {
    db.data.users = [];
    await db.write();
  },
};

export default UserJsonStore;
