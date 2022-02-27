import { assert } from "chai";
import authApiService from "./auth-api-service.js";
import userApiService from "./user-api-service.js";
import placeApiService from "./place-api-service.js";
import * as testData from "../fixtures.js";

suite("Place API Tests", () => {
  let testUser = testData.newUser;
  let testPlaces = testData.places;

  suiteSetup(async () => {
    await userApiService.deleteAllUsers();
    testUser = await userApiService.createUser(testUser);
    await authApiService.authenticate(testData.newUser);
    await placeApiService.deleteAllPlaces();
  });

  setup(async () => {
    for (let i = 0; i < testPlaces.length; i++) {
      testPlaces[i] = await placeApiService.createPlace(testData.places[i]);
    }
  });

  teardown(async () => {
    await placeApiService.deleteAllPlaces();
  });

  suiteTeardown(async () => {
    authApiService.clearAuth();
  });

  test("Create A Place", async () => {
    const returnedPlace = await placeApiService.createPlace(testData.newPlace, testUser._id);
    assert.equal(returnedPlace.name, testData.newPlace.name);
    const allPlaces = await placeApiService.getAllPlaces();
    assert.equal(allPlaces.length, testData.places.length + 1);
  });

  test("getAllPlaces() should return an array of places", async () => {
    const places = await placeApiService.getAllPlaces();
    assert.isArray(places);
    assert.equal(places.length, testData.places.length);
  });

  test("getPlaceById() should return a place", async () => {
    const newPlace = await placeApiService.createPlace(testData.newPlace, testUser._id);
    const place = await placeApiService.getPlaceById(newPlace._id);
    assert.equal(place.name, newPlace.name);
  });

  test("deletePlace() should delete one place", async () => {
    const newPlace = await placeApiService.createPlace(testData.newPlace, testUser._id);
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

  test("getPlacesByCategory() should return an array of places", async () => {
    const places = await placeApiService.getPlacesByCategory("restaurant");
    assert.isArray(places);
    assert.equal(places.length, 2);
  });
});
