import { assert } from "chai";
import apiService from "./api-service.js";
import { newUser } from "../fixtures.js";
import { decodeToken } from "../../helpers/utils.js";

suite("Authentication API Tests", () => {
  setup(async () => {
    await apiService.clearAuth();
    await apiService.createUser(newUser);
    await apiService.authenticate(newUser);
    await apiService.deleteAllUsers();
  });

  teardown(async () => {
    await apiService.deleteAllUsers();
  });

  test("authenticate user", async () => {
    await apiService.createUser(newUser);
    const response = await apiService.authenticate(newUser);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("Verify token", async () => {
    await apiService.createUser(newUser);
    const response = await apiService.authenticate(newUser);
    const { token } = response;
    const user = decodeToken(token);
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
