import { assert } from "chai";
import db from "../../models/db.js";
import * as testData from "../fixtures.js";

suite("Place Model Tests", () => {
  let testUser = {};

  setup(async () => {
    db.init(process.env.ENVIRONMENT);
    testUser = await db.userStore.create(testData.newUser);
    await db.placeStore.deleteAll();
    for (let place of testData.places) {
      await db.placeStore.create(place, testUser._id);
    }
  });

  test("Create A Place", async () => {
    const returnedPlace = await db.placeStore.create(
      testData.newPlace,
      testUser._id
    );
    assert.equal(returnedPlace.name, testData.newPlace.name);
    assert.equal(returnedPlace.address, testData.newPlace.address);
    const allPlaces = await db.placeStore.getAll();
    assert.equal(allPlaces.length, testData.places.length + 1);
  });

  test("getAllPlaces() should return an array of places", async () => {
    const places = await db.placeStore.getAll();
    assert.isArray(places);
    assert.equal(places.length, testData.places.length);
  });

  test("getPlaceById() should return a place", async () => {
    const newPlace = await db.placeStore.create(
      testData.newPlace,
      testUser._id
    );
    console.log(newPlace);
    const place = await db.placeStore.getById(newPlace._id);
    assert.equal(place.name, newPlace.name);
  });

  test("updatePlace() should update one place", async () => {
    const newPlace = await db.placeStore.create(
      testData.newPlace,
      testUser._id
    );
    const place = await db.placeStore.getById(newPlace._id);
    assert.equal(place.name, newPlace.name);
    await db.placeStore.update(newPlace._id, testData.updatedPlace);
    const updatedPlace = await db.placeStore.getById(newPlace._id);
    assert.equal(updatedPlace.name, testData.updatedPlace.name);
  });

  test("deletePlace() should delete one place", async () => {
    const newPlace = await db.placeStore.create(
      testData.newPlace,
      testUser._id
    );
    const place = await db.placeStore.getById(newPlace._id);
    assert.equal(place.name, newPlace.name);
    await db.placeStore.delete(newPlace._id, testUser._id);
    const allPlaces = await db.placeStore.getAll();
    assert.equal(allPlaces.length, 5);
  });

  test("deleteAllPlaces() should delete all places", async () => {
    const places = await db.placeStore.getAll();
    assert.equal(places.length, 5);
    await db.placeStore.deleteAll();
    const allPlaces = await db.placeStore.getAll();
    assert.equal(allPlaces.length, 0);
  });

  test("getPlacesByUserId() should return an array of places", async () => {
    const testUser = await db.userStore.create(testData.newUser);
    console.log(testUser);
    const newPlace = await db.placeStore.create(
      testData.newPlace,
      testUser._id
    );
    console.log(newPlace);
    const places = await db.placeStore.getByUserId(newPlace.user);
    assert.isArray(places);
    assert.equal(places.length, 1);
    assert.equal(places[places.length - 1].name, newPlace.name);
  });

  test("getPlacesByUserId() should return an empty array if no places", async () => {
    const places = await db.placeStore.getByUserId("123456654321");
    assert.isArray(places);
    assert.equal(places.length, 0);
  });

  test("getPlaceByName() should return a place", async () => {
    const newPlace = await db.placeStore.create(
      testData.newPlace,
      testUser._id
    );
    const place = await db.placeStore.getByName(newPlace.name);
    assert.equal(place.name, newPlace.name);
  });

  test("getPlaceByName() should return null if no place", async () => {
    const place = await db.placeStore.getByName("NonExistentPlace");
    assert.isNull(place);
  });
});
