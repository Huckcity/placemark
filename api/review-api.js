import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { reviewSpec, reviewArray, createReviewSpec } from "../models/joi-schemas.js";

import validationError from "./logger.js";

const reviewApi = {
  findOne: {
    auth: false,
    handler: async (request) => {
      try {
        const review = await db.reviewStore.getById(request.params.id);
        return review;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Get review by id",
    notes: "Returns details of a review",
    response: { schema: reviewSpec, failAction: validationError },
  },

  findByPlaceId: {
    auth: false,
    handler: async (request) => {
      try {
        const reviews = await db.reviewStore.getByPlaceId(request.params.placeId);
        return reviews;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Get reviews by place id",
    notes: "Returns details of reviews for a place",
    response: { schema: reviewArray, failAction: validationError },
  },

  allReviews: {
    auth: false,
    handler: async () => {
      try {
        const reviews = await db.reviewStore.getAll();
        return reviews;
      } catch (err) {
        throw Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Get all reviews",
    notes: "Returns details of all reviews",
    response: { schema: reviewArray, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      try {
        const newReview = await db.reviewStore.create(
          request.auth.credentials.id,
          request.payload.placeId,
          request.payload.review,
        );
        if (newReview) {
          return newReview;
        }
        return Boom.serverUnavailable("Unable to create review");
      } catch (err) {
        throw Boom.serverUnavailable("Failed to create review");
      }
    },
    tags: ["api"],
    description: "Create a new review",
    notes: "Returns details of a new review",
    validate: {
      payload: createReviewSpec,
      failAction: validationError,
    },
    response: { schema: reviewSpec, failAction: validationError },
  },

  delete: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request) => {
      try {
        const deletedReview = await db.reviewStore.delete(request.params.id);
        if (deletedReview) {
          return deletedReview;
        }
        return Boom.serverUnavailable("Unable to delete review");
      } catch (err) {
        throw Boom.serverUnavailable("Failed to delete review");
      }
    },
    tags: ["api"],
    description: "Delete a review",
    notes: "Deletes a review",
    response: { schema: reviewSpec, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async () => {
      try {
        const deletedReviews = await db.reviewStore.deleteAll();
        if (deletedReviews) {
          return deletedReviews;
        }
        return Boom.serverUnavailable("Unable to delete reviews");
      } catch (err) {
        throw Boom.serverUnavailable("Failed to delete reviews");
      }
    },
    tags: ["api"],
    description: "Delete all reviews",
    notes: "Deletes all reviews",
  },
};

export default reviewApi;
