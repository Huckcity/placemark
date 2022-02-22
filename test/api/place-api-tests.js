import { assert } from "chai";
import placeApiService from "./place-api-service.js";
import userApiService from "./user-api-service.js";
import * as testData from "../../test/fixtures.js";

suite("Place API Tests", () => {
  let testUser = {};

  setup(async () => {
    await placeApiService.deleteAllPlaces();
    await userApiService.deleteAllUsers();
    testUser = await userApiService.createUser(testData.newUser);
    for (let place of testData.places) {
      await placeApiService.createPlace(place, testUser._id);
    }
  });

  teardown(async () => {
    await placeApiService.deleteAllPlaces();
  });

  test("Create A Place", async () => {
    const returnedPlace = await placeApiService.createPlace(
      testData.newPlace,
      testUser._id
    );
    assert.equal(returnedPlace.name, testData.newPlace.name);
    assert.equal(returnedPlace.address, testData.newPlace.address);
    const allPlaces = await placeApiService.getAllPlaces();
    assert.equal(allPlaces.length, testData.places.length + 1);
  });

  test("getAllPlaces() should return an array of places", async () => {
    const places = await placeApiService.getAllPlaces();
    assert.isArray(places);
    assert.equal(places.length, testData.places.length);
  });

  test("getPlaceById() should return a place", async () => {
    const newPlace = await placeApiService.createPlace(
      testData.newPlace,
      testUser._id
    );
    const place = await placeApiService.getPlaceById(newPlace._id);
    assert.equal(place.name, newPlace.name);
  });

  test("deletePlace() should delete one place", async () => {
    const newPlace = await placeApiService.createPlace(
      testData.newPlace,
      testUser._id
    );
    const place = await placeApiService.getPlaceById(newPlace._id);
    await placeApiService.deletePlace(place._id, testUser._id);
    const allPlaces = await placeApiService.getAllPlaces();
    assert.equal(allPlaces.length, 5);
  });

  test("deleteAllPlaces() should delete all places", async () => {
    const places = await placeApiService.getAllPlaces();
    assert.equal(places.length, 5);
    await placeApiService.deleteAllPlaces();
    const allPlaces = await placeApiService.getAllPlaces();
    assert.equal(allPlaces.length, 0);
  });

  test("create a place, bad data", async () => {
    const badPlace = await placeApiService.createPlace({});
    assert.equal(testData.places.length, 5);
  });
});
