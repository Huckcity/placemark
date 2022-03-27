import { assert } from "chai";
import apiService from "./api-service.js";
import { newUser, newUserLogin, newReview, newReview2, newPlace } from "../fixtures.js";

suite("Reviews API Tests", () => {
  let testUser = newUser;
  let testPlace = newPlace;
  setup(async () => {
    apiService.clearAuth();
    await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    await apiService.deleteAllReviews();
    await apiService.deleteAllPlaces();
    await apiService.deleteAllUsers();
    testUser = await apiService.createUser(newUser);
    await apiService.authenticate(newUserLogin);
    testPlace = await apiService.createPlace(newPlace);
  });

  teardown(async () => {
    await apiService.deleteAllUsers();
  });

  test("Create A Review", async () => {
    const returnedReview = await apiService.createReview(testUser._id, testPlace._id, newReview);
    assert.equal(returnedReview.rating, newReview.rating);
    const allReviews = await apiService.getAllReviews();
    assert.equal(allReviews.length, 1);
  });

  test("getAllReviews() should return an array of reviews", async () => {
    const reviews = await apiService.getAllReviews();
    assert.isArray(reviews);
    assert.equal(reviews.length, 0);
    await apiService.createReview(testUser._id, testPlace._id, newReview);
    const reviews2 = await apiService.getAllReviews();
    assert.isArray(reviews2);
    assert.equal(reviews2.length, 1);
  });

  test("getReviewById() should return a review", async () => {
    const returnedReview = await apiService.createReview(testUser._id, testPlace._id, newReview);
    const review = await apiService.getReviewById(returnedReview._id);
    assert.equal(review.rating, newReview.rating);
  });

  test("getReviewsByPlaceId() should return an array of reviews", async () => {
    const reviews = await apiService.getReviewsByPlaceId(testPlace._id);
    assert.isArray(reviews);
    assert.equal(reviews.length, 0);
    await apiService.createReview(testUser._id, testPlace._id, newReview);
    await apiService.createReview(testUser._id, testPlace._id, newReview2);
    const reviews2 = await apiService.getReviewsByPlaceId(testPlace._id);
    assert.isArray(reviews2);
    assert.equal(reviews2.length, 2);
  });

  test("deleteReview() should delete one review", async () => {
    const returnedReview = await apiService.createReview(testUser._id, testPlace._id, newReview);
    const review = await apiService.getReviewById(returnedReview._id);
    assert.equal(review.rating, newReview.rating);
    await apiService.deleteReview(review._id);
    const allReviews = await apiService.getAllReviews();
    assert.equal(allReviews.length, 0);
  });
});
