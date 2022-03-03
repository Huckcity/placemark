import { assert } from "chai";
import apiService from "./api-service.js";
import { newUser, newCategory, categoryArray } from "../fixtures.js";

suite("Category API Tests", () => {
  setup(async () => {
    apiService.clearAuth();
    await apiService.createUser(newUser);
    await apiService.authenticate(newUser);
    await apiService.deleteAllCategories();
    await apiService.deleteAllUsers();
    await apiService.createUser(newUser);
    await apiService.authenticate(newUser);
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
});
