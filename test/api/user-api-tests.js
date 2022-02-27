import axios from "axios";
import { assert } from "chai";
import userApiService from "./user-api-service.js";
import authApiService from "./auth-api-service.js";
import * as testData from "../fixtures.js";

suite("User API Tests", () => {
  suiteSetup(async () => {
    await userApiService.deleteAllUsers();
  });

  setup(async () => {
    for (let user of testData.users) {
      await userApiService.createUser(user);
    }
  });

  teardown(async () => {
    await userApiService.deleteAllUsers();
    authApiService.clearAuth();
  });

  suiteTeardown(async () => {});

  test("Create A User", async () => {
    const returnedUser = await userApiService.createUser(testData.newUser);
    await authApiService.authenticate(testData.newUser);
    assert.equal(returnedUser.username, testData.newUser.username);
    assert.equal(returnedUser.email, testData.newUser.email);
    const allUsers = await userApiService.getAllUsers();
    assert.equal(allUsers.length, testData.users.length + 1);
  });

  test("getAllUsers() should return an array of users", async () => {
    const returnedUser = await userApiService.createUser(testData.newUser);
    await authApiService.authenticate(testData.newUser);
    const users = await userApiService.getAllUsers();
    assert.isArray(users);
    assert.equal(users.length, testData.users.length + 1);
  });

  test("getUserById() should return a user", async () => {
    const newUser = await userApiService.createUser(testData.newUser);
    await authApiService.authenticate(testData.newUser);

    const user = await userApiService.getUserById(newUser._id);
    assert.equal(user.username, newUser.username);
  });

  test("deleteUser() should delete one user", async () => {
    const newUser = await userApiService.createUser(testData.newUser);
    await authApiService.authenticate(testData.newUser);

    const userToDelete = await userApiService.createUser(testData.newUser2);
    const allUsers1 = await userApiService.getAllUsers();
    assert.equal(allUsers1.length, 7);
    await userApiService.deleteUser(userToDelete._id);
    const allUsers2 = await userApiService.getAllUsers();
    assert.equal(allUsers2.length, 6);
  });

  test("deleteAllUsers() should delete all users", async () => {
    const newUser = await userApiService.createUser(testData.newUser);
    await authApiService.authenticate(testData.newUser);

    const users = await userApiService.getAllUsers();
    assert.equal(users.length, 6);
    await userApiService.deleteAllUsers();

    const onlyUser = await userApiService.createUser(testData.newUser);
    await authApiService.authenticate(testData.newUser);
    const allUsers = await userApiService.getAllUsers();
    assert.equal(allUsers.length, 1);
  });

  test("create a user, bad data", async () => {
    const badUser = await userApiService.createUser({});
    assert.isNull(badUser);
    assert.equal(testData.users.length, 5);
  });
});
