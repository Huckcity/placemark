import { assert } from "chai";
import { db } from "../../models/db.js";
import { testUsers, newUser } from "../fixtures.js";

suite("User Model Tests", () => {
  suiteSetup(async () => {
    db.init(process.env.ENVIRONMENT);
  });

  setup(async () => {
    await db.userStore.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.create(testUsers[i]);
    }
  });

  test("Create A User", async () => {
    const returnedUser = await db.userStore.create(newUser);
    assert.equal(returnedUser.username, newUser.username);
    assert.equal(returnedUser.email, newUser.email);
    const allUsers = await db.userStore.getAll();
    assert.equal(allUsers.length, testUsers.length + 1);
  });

  test("getAllUsers() should return an array of users", async () => {
    const users = await db.userStore.getAll();
    assert.isArray(users);
    assert.equal(users.length, testUsers.length);
  });

  test("getUserById() should return a user", async () => {
    const createdUser = await db.userStore.create(newUser);
    const user = await db.userStore.getById(createdUser._id);
    assert.equal(user.username, newUser.username);
  });

  test("deleteUser() should delete one user", async () => {
    const createdUser = await db.userStore.create(newUser);
    const returnedUser = await db.userStore.getById(createdUser._id);
    assert.equal(returnedUser.username, newUser.username);
    await db.userStore.delete(returnedUser._id);
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
