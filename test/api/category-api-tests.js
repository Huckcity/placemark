import { assert } from "chai";
import apiService from "./api-service.js";
import { newUser, newCategory, categoryArray, newUserLogin } from "../fixtures.js";

suite("Category API Tests", () => {
  setup(async () => {
    apiService.clearAuth();
    await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    await apiService.deleteAllCategories();
    await apiService.deleteAllUsers();
    await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    for (let i = 0; i < categoryArray.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await apiService.createCategory(categoryArray[i]);
    }
  });

  teardown(async () => {
    await apiService.deleteAllUsers();
  });

  test("Create A Category", async () => {
    const returnedCategory = await apiService.createCategory(newCategory);
    assert.equal(returnedCategory.name, newCategory.name);
    const allCategories = await apiService.getAllCategories();
    assert.equal(allCategories.length, categoryArray.length + 1);
  });

  test("getAllCategories() should return an array of categories", async () => {
    const categories = await apiService.getAllCategories();
    assert.isArray(categories);
    assert.equal(categories.length, categoryArray.length);
  });

  test("getCategoryById() should return a category", async () => {
    const returnedCategory = await apiService.createCategory(newCategory);
    const category = await apiService.getCategoryById(returnedCategory._id);
    assert.equal(category.name, newCategory.name);
  });

  test("deleteCategory() should delete one category", async () => {
    const returnedCategory = await apiService.createCategory(newCategory);
    const category = await apiService.getCategoryById(returnedCategory._id);
    await apiService.deleteCategory(category._id);
    const allCategories = await apiService.getAllCategories();
    assert.equal(allCategories.length, 5);
  });

  test("deleteAllCategories() should delete all categories", async () => {
    const categories = await apiService.getAllCategories();
    assert.equal(categories.length, 5);
  });

  test("updateCategory() should update one category", async () => {
    const returnedCategory = await apiService.createCategory(newCategory);
    assert.equal(returnedCategory.name, newCategory.name);
    await apiService.updateCategory(returnedCategory._id, { name: "Updated" });
    const updatedCategory = await apiService.getCategoryById(returnedCategory._id);
    assert.equal(updatedCategory.name, "Updated");
  });

  test("create a category with bad data should fail", async () => {
    const badCategory = {
      name: "",
    };
    try {
      await apiService.createCategory(badCategory);
    } catch (err) {
      assert.equal(err.message, "Request failed with status code 400");
    }
  });
});
