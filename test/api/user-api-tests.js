import { assert } from "chai";
import apiService from "./user-api-service.js";
import * as testData from "../../test/fixtures.js";

suite("User API Tests", () => {
  setup(async () => {
    await apiService.deleteAllUsers();
    for (let user of testData.users) {
      await apiService.createUser(user);
    }
  });

  teardown(async () => {
    await apiService.deleteAllUsers();
  });

  test("Create A User", async () => {
    const returnedUser = await apiService.createUser(testData.newUser);
    assert.equal(returnedUser.username, testData.newUser.username);
    assert.equal(returnedUser.email, testData.newUser.email);
    const allUsers = await apiService.getAllUsers();
    assert.equal(allUsers.length, testData.users.length + 1);
  });

  test("getAllUsers() should return an array of users", async () => {
    const users = await apiService.getAllUsers();
    assert.isArray(users);
    assert.equal(users.length, testData.users.length);
  });

  test("getUserById() should return a user", async () => {
    const newUser = await apiService.createUser(testData.users[0]);
    const user = await apiService.getUserById(newUser.id);
    assert.equal(user.username, newUser.username);
  });

  test("deleteUser() should delete one user", async () => {
    const newUser = await apiService.createUser(testData.newUser);
    const user = await apiService.getUserById(newUser.id);
    assert.equal(user.username, newUser.username);
    await apiService.deleteUser(newUser.id);
    const allUsers = await apiService.getAllUsers();
    assert.equal(allUsers.length, 5);
  });

  test("deleteAllUsers() should delete all users", async () => {
    const users = await apiService.getAllUsers();
    assert.equal(users.length, 5);
    await apiService.deleteAllUsers();
    const allUsers = await apiService.getAllUsers();
    assert.equal(allUsers.length, 0);
  });

  test("create a user, bad data", async () => {
    const badUser = await apiService.createUser({});
    assert.isNull(badUser);
    assert.equal(testData.users.length, 5);
  });
});
