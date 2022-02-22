import { assert } from "chai";
import db from "../../models/db.js";
import * as testData from "../fixtures.js";

suite("User Model Tests", () => {
  setup(async () => {
    db.init(process.env.ENVIRONMENT);
    await db.userStore.deleteAll();
    for (let user of testData.users) {
      await db.userStore.create(user);
    }
  });

  test("Create A User", async () => {
    const returnedUser = await db.userStore.create(testData.newUser);
    assert.equal(returnedUser.username, testData.newUser.username);
    assert.equal(returnedUser.email, testData.newUser.email);
    const allUsers = await db.userStore.getAll();
    assert.equal(allUsers.length, testData.users.length + 1);
  });

  test("getAllUsers() should return an array of users", async () => {
    const users = await db.userStore.getAll();
    assert.isArray(users);
    assert.equal(users.length, testData.users.length);
  });

  test("getUserById() should return a user", async () => {
    const newUser = await db.userStore.create(testData.newUser);
    const user = await db.userStore.getById(newUser._id);
    assert.equal(user.username, newUser.username);
  });

  test("deleteUser() should delete one user", async () => {
    const newUser = await db.userStore.create(testData.newUser);
    const user = await db.userStore.getById(newUser._id);
    assert.equal(user.username, newUser.username);
    await db.userStore.delete(newUser._id);
    const allUsers = await db.userStore.getAll();
    assert.equal(allUsers.length, 5);
  });

  test("deleteAllUsers() should delete all users", async () => {
    const users = await db.userStore.getAll();
    assert.equal(users.length, 5);
    await db.userStore.deleteAll();
    const allUsers = await db.userStore.getAll();
    assert.equal(allUsers.length, 0);
  });
});
