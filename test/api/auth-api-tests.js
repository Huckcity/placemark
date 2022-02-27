import { assert } from "chai";
import apiService from "./auth-api-service.js";
import userApiService from "./user-api-service.js";
import * as testData from "../../test/fixtures.js";
import * as utils from "../../helpers/utils.js";

suite("Authentication API Tests", () => {
  let users = testData.users;
  let newUser = testData.newUser;

  setup(async () => {
    await userApiService.deleteAllUsers();
  });

  test("authenticate user", async () => {
    await userApiService.createUser(newUser);
    const response = await apiService.authenticate(newUser);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("Verify token", async () => {
    await userApiService.createUser(newUser);
    const response = await apiService.authenticate(newUser);
    const token = response.token;
    const user = utils.decodeToken(token);
    assert.isDefined(user);
  });

  test("authenticate user with invalid email", async () => {
    try {
      await apiService.authenticate("invalid", newUser.password);
    } catch (err) {
      assert.equal(err.response.status, 401);
    }
  });

  test("authenticate user with invalid password", async () => {
    try {
      await apiService.authenticate(newUser.email, "invalid");
    } catch (err) {
      assert.equal(err.response.status, 401);
    }
  });
});
