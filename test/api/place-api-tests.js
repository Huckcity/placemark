import { assert } from "chai";
import apiService from "./api-service.js";
import { newUser, places, newPlace, newPlace2, newCategory, newUserLogin } from "../fixtures.js";
import fs from "fs";

suite("Place API Tests", () => {
  let testUser = newUser;
  let testPlaces = places;

  setup(async () => {
    apiService.clearAuth();
    testUser = await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    await apiService.deleteAllPlaces();
    await apiService.deleteAllCategories();
    await apiService.deleteAllUsers();
    testUser = await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    testPlaces = [];
    for (let i = 0; i < places.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await apiService.createPlace(places[i]);
      console.log(testPlaces[i]);
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

  test("Update a places location object latitude and longitutde", async () => {
    const createdPlace = await apiService.createPlace(newPlace, testUser._id);
    const updatedPlace = { ...createdPlace, location: { lat: 1, lng: 1 } };
    const updatedPlaceReturned = await apiService.updatePlace(
      testUser._id,
      createdPlace._id,
      updatedPlace,
    );
    console.log(updatedPlaceReturned);
    assert.equal(updatedPlaceReturned.location.latitude, updatedPlace.location.latitude);
    assert.equal(updatedPlaceReturned.location.longitude, updatedPlace.location.longitude);
  });

  test("Update a place, bad data", async () => {
    const createdPlace = await apiService.createPlace(newPlace, testUser._id);
    try {
      await apiService.updatePlace(testUser._id, createdPlace._id, {});
    } catch (err) {
      assert.equal(err.response.data.statusCode, 400);
    }
  });

  test("getPlacesByUser() should return an array of places", async () => {
    await apiService.createPlace(newPlace, testUser._id);
    await apiService.createPlace(newPlace2, testUser._id);
    const allPlacesByUser = await apiService.getPlacesByUserId(testUser._id);
    assert.isArray(allPlacesByUser);
    assert.equal(allPlacesByUser.length, 2);
  });

  // Test to create a place with a base64 image
  test("Create a place with a base64 image", async () => {
    const base64Image = fs.readFileSync("./test/cavan.jpeg").toString("base64");
    const createdPlace = await apiService.createPlace(
      { ...newPlace, placeImage: base64Image },
      testUser._id,
    );
    assert.equal(createdPlace.placeImage, base64Image);
  });
});
