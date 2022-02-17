import { assert } from "chai";
import userApiService from "./place-api-service.js";
import * as testData from "../../test/fixtures.js";

suite("Place API Tests", () => {
  setup(async () => {
    await userApiService.deleteAllPlaces();
    for (let place of testData.places) {
      await userApiService.createPlace(place);
    }
  });

  teardown(async () => {
    await userApiService.deleteAllPlaces();
  });

  test("Create A Place", async () => {
    const returnedPlace = await userApiService.createPlace(testData.newPlace);
    assert.equal(returnedPlace.name, testData.newPlace.name);
    assert.equal(returnedPlace.address, testData.newPlace.address);
    const allPlaces = await userApiService.getAllPlaces();
    assert.equal(allPlaces.length, testData.places.length + 1);
  });

  test("getAllPlaces() should return an array of places", async () => {
    const places = await userApiService.getAllPlaces();
    assert.isArray(places);
    assert.equal(places.length, testData.places.length);
  });

  test("getPlaceById() should return a place", async () => {
    const newPlace = await userApiService.createPlace(testData.places[0]);
    const place = await userApiService.getPlaceById(newPlace.id);
    assert.equal(place.name, newPlace.name);
  });

  test("deletePlace() should delete one place", async () => {
    const newPlace = await userApiService.createPlace(testData.newPlace);
    const place = await userApiService.getPlaceById(newPlace.id);
    assert.equal(place.name, newPlace.name);
    await userApiService.deletePlace(newPlace.id);
    const allPlaces = await userApiService.getAllPlaces();
    assert.equal(allPlaces.length, 5);
  });

  test("deleteAllPlaces() should delete all places", async () => {
    const places = await userApiService.getAllPlaces();
    assert.equal(places.length, 5);
    await userApiService.deleteAllPlaces();
    const allPlaces = await userApiService.getAllPlaces();
    assert.equal(allPlaces.length, 0);
  });

  test("create a place, bad data", async () => {
    const badPlace = await userApiService.createPlace({});
    assert.isNull(badPlace);
    assert.equal(testData.places.length, 5);
  });
});
