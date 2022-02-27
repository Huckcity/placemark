import { assert } from "chai";
import authApiService from "./auth-api-service.js";
import userApiService from "./user-api-service.js";
import categoryApiService from "./category-api-service.js";
import * as testData from "../fixtures.js";

suite("Category API Tests", () => {
  let testUser = testData.newUser;
  let testCategories = testData.categories;

  suiteSetup(async () => {
    testUser = await userApiService.createUser(testUser);
    await authApiService.authenticate(testData.newUser);
    await categoryApiService.deleteAllCategories();
  });

  setup(async () => {
    for (let i = 0; i < testCategories.length; i++) {
      testCategories[i] = await categoryApiService.createCategory(testData.categories[i]);
    }
  });

  teardown(async () => {
    await categoryApiService.deleteAllCategories();
  });

  suiteTeardown(async () => {
    authApiService.clearAuth();
  });

  test("Create A Category", async () => {
    const returnedCategory = await categoryApiService.createCategory(testData.newCategory);
    assert.equal(returnedCategory.name, testData.newCategory.name);
    const allCategories = await categoryApiService.getAllCategories();
    assert.equal(allCategories.length, testData.categories.length + 1);
  });

  test("getAllCategories() should return an array of categories", async () => {
    const categories = await categoryApiService.getAllCategories();
    assert.isArray(categories);
    assert.equal(categories.length, testData.categories.length);
  });

  test("getCategoryById() should return a category", async () => {
    const newCategory = await categoryApiService.createCategory(testData.newCategory);
    const category = await categoryApiService.getCategoryById(newCategory._id);
    assert.equal(category.name, newCategory.name);
  });

  test("deleteCategory() should delete one category", async () => {
    const newCategory = await categoryApiService.createCategory(testData.newCategory);
    const category = await categoryApiService.getCategoryById(newCategory._id);
    await categoryApiService.deleteCategory(category._id);
    const allCategories = await categoryApiService.getAllCategories();
    assert.equal(allCategories.length, 5);
  });

  test("deleteAllCategories() should delete all categories", async () => {
    const categories = await categoryApiService.getAllCategories();
    assert.equal(categories.length, 5);
  });
});
