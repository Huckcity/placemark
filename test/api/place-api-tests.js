import { assert } from "chai";
import apiService from "./api-service.js";
import { newUser, places, newPlace, newCategory } from "../fixtures.js";

suite("Place API Tests", () => {
  let testUser = newUser;
  const testPlaces = places;

  setup(async () => {
    apiService.clearAuth();
    testUser = await apiService.createUser(newUser);
    await apiService.authenticate(newUser);
    await apiService.deleteAllPlaces();
    await apiService.deleteAllCategories();
    await apiService.deleteAllUsers();
    testUser = await apiService.createUser(newUser);
    await apiService.authenticate(newUser);
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await apiService.createPlace(places[i]);
    }
  });

  teardown(async () => {
    await apiService.deleteAllPlaces();
    await apiService.deleteAllUsers();
  });

  test("Create A Place", async () => {
    const returnedPlace = await apiService.createPlace(newPlace, testUser._id);
    assert.equal(returnedPlace.name, newPlace.name);
    const allPlaces = await apiService.getAllPlaces();
    assert.equal(allPlaces.length, places.length + 1);
  });

  test("getAllPlaces() should return an array of places", async () => {
    const allPlaces = await apiService.getAllPlaces();
    assert.isArray(allPlaces);
    assert.equal(allPlaces.length, places.length);
  });

  test("getPlaceById() should return a place", async () => {
    const createdPlace = await apiService.createPlace(newPlace, testUser._id);
    const returnedPlace = await apiService.getPlaceById(createdPlace._id);
    assert.equal(returnedPlace.name, createdPlace.name);
  });

  test("deletePlace() should delete one place", async () => {
    const createdPlace = await apiService.createPlace(newPlace, testUser._id);
    const returnedPlace = await apiService.getPlaceById(createdPlace._id);
    await apiService.deletePlace(returnedPlace._id, testUser._id);
    const allPlaces = await apiService.getAllPlaces();
    assert.equal(allPlaces.length, 5);
  });

  test("deleteAllPlaces() should delete all places", async () => {
    const allPlacesBefore = await apiService.getAllPlaces();
    assert.equal(allPlacesBefore.length, 5);
    await apiService.deleteAllPlaces();
    const allPlacesAfter = await apiService.getAllPlaces();
    assert.equal(allPlacesAfter.length, 0);
  });

  test("create a place, bad data", async () => {
    try {
      await apiService.createPlace({});
    } catch (err) {
      console.log(err.response.data.statusCode);
      assert.equal(err.response.data.statusCode, 503);
    }
  });

  test("getPlacesByCategory() should return an array of places", async () => {
    const createdCategory = await apiService.createCategory(newCategory);
    const placeWithCategory = { ...newPlace, category: createdCategory._id };
    const createdPlace = await apiService.createPlace(placeWithCategory, testUser._id);
    const allPlacesByCategory = await apiService.getPlacesByCategory(createdCategory.slug_name);
    assert.isArray(allPlacesByCategory);
    assert.equal(allPlacesByCategory.length, 1);
    assert.equal(allPlacesByCategory[0].name, createdPlace.name);
  });

  test("Update a place", async () => {
    const createdPlace = await apiService.createPlace(newPlace, testUser._id);
    const updatedPlace = { ...createdPlace, name: "Updated Place" };
    const updatedPlaceReturned = await apiService.updatePlace(
      testUser._id,
      createdPlace._id,
      updatedPlace,
    );
    assert.equal(updatedPlaceReturned.name, updatedPlace.name);
  });
});
