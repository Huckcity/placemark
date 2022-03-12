import { assert } from "chai";
import { assertSubset } from "../../helpers/utils.js";
import apiService from "./api-service.js";
import { testUsers, newUser, newUser2, newUserLogin } from "../fixtures.js";

suite("User API Tests", () => {
  const users = new Array(testUsers.length);

  setup(async () => {
    await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    await apiService.deleteAllUsers();
  });

  teardown(async () => {
    await apiService.deleteAllUsers();
    apiService.clearAuth();
  });

  test("Create A User", async () => {
    const returnedUser = await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    assertSubset(returnedUser, newUser);
  });

  test("getAllUsers() should return an array of users", async () => {
    await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await apiService.createUser(testUsers[i]);
    }
    const allUsers = await apiService.getAllUsers();
    assert.isArray(allUsers);
    assert.equal(allUsers.length, users.length + 1);
  });

  test("getUserById() should return a user", async () => {
    const userWithId = await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    const returnedUser = await apiService.getUserById(userWithId._id);
    assert.equal(returnedUser.username, newUser.username);
  });

  test("deleteUser() should delete one user", async () => {
    await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    const userToDelete = await apiService.createUser(newUser2);

    const allUsersBefore = await apiService.getAllUsers();
    assert.equal(allUsersBefore.length, 2);
    await apiService.deleteUser(userToDelete._id);
    const allUsersAfter = await apiService.getAllUsers();
    assert.equal(allUsersAfter.length, 1);
  });

  test("deleteAllUsers() should delete all users", async () => {
    await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);

    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await apiService.createUser(testUsers[i]);
    }

    const allUsersBefore = await apiService.getAllUsers();
    assert.equal(allUsersBefore.length, users.length + 1);
    await apiService.deleteAllUsers();

    await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    const allUsersAfter = await apiService.getAllUsers();
    assert.equal(allUsersAfter.length, 1);
  });

  test("create a user, bad data", async () => {
    try {
      await apiService.createUser({});
    } catch (err) {
      assert.equal(err.response.status, 400);
    }
  });
});
