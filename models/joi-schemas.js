import Joi from "joi";

export const imageSpec = Joi.any().meta({ swaggerType: "file" }).example("Base64 encoded image");

// User Schemas

export const idSpec = Joi.alternatives()
  .try(Joi.string(), Joi.object())
  .description("User id or object with id");

export const userSpec = Joi.object()
  .keys({
    username: Joi.string().required().example("johndoe"),
    email: Joi.string().email().required().example("johndoe@email.com"),
    password: Joi.string().required().example("password"),
    firstName: Joi.string().optional().allow("").example("John"),
    lastName: Joi.string().optional().allow("").example("Doe"),
    role: Joi.string().required().example("user"),
    _id: idSpec,
    __v: Joi.number(),
    createdAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
    updatedAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
    profileImage: imageSpec.optional(),
    active: Joi.boolean().optional().example(true),
    favouritePlaces: Joi.array()
      .optional()
      .items(Joi.string())
      .example(["5a8b8f8f8f8f8f8f8f8f8f8"]),
  })
  .label("User");

export const updateUserSpec = Joi.object()
  .keys({
    email: Joi.string().email().optional().allow("").example("test@test.com"),
    password: Joi.string().optional().allow("").example("password"),
    passwordConfirm: Joi.string().optional().allow("").example("password"),
    firstName: Joi.string().optional().allow("").example("John"),
    lastName: Joi.string().optional().allow("").example("Doe"),
    profileImage: imageSpec.optional(),
    dob: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
  })
  .label("Update User Spec");

export const userArray = Joi.array().items(userSpec).label("User Array");

export const registerSpec = Joi.object()
  .keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().required(),
  })
  .label("Registeration Spec");

export const adminRegisterSpec = registerSpec.keys({
  role: Joi.string().required(),
  firstName: Joi.string().optional().allow("").example("John"),
  lastName: Joi.string().optional().allow("").example("Doe"),
  profileImage: imageSpec.optional(),
});

export const loginSpec = Joi.object()
  .keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
  .label("Login Spec");

// Place Schema

export const placeSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Times Square"),
    description: Joi.string().optional().allow("").example("Long form description"),
    placeImages: Joi.array().items(imageSpec).optional().example(["Base64 encoded image"]),
    public: Joi.any().optional().example(false),
    location: Joi.object()
      .keys({
        lat: Joi.number().required().example(40.75),
        lng: Joi.number().required().example(-73.98),
      })
      .label("Location Spec"),
    user: idSpec,
    _id: idSpec,
    __v: Joi.number(),
    createdAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
    updatedAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
    category: idSpec,
  })
  .label("Place Spec");

export const addPlaceSpec = Joi.object()
  .keys({
    name: Joi.string()
      .required()
      .example("Times Square")
      .messages({ "any.required": "Name is required" }),
    description: Joi.string().optional().allow("").example("Long form description"),
    latitude: Joi.number().optional().example(40.75),
    longitude: Joi.number().optional().example(-73.98),
    category: idSpec,
    placeImage: imageSpec.optional(),
    public: Joi.string().optional().example(false),
  })
  .label("Add Place Spec");

export const placeArray = Joi.array().items(placeSpec).label("Place Array");

export const updatePlaceSpec = Joi.object()
  .keys({
    _id: idSpec,
    user: idSpec,
    name: Joi.string().required().example("Times Square"),
    description: Joi.string().optional().allow("").example("Long form description"),
    placeImage: imageSpec.optional(),
    public: Joi.any().optional().example(false),
    location: Joi.object().keys({
      lat: Joi.number().required().example(40.75),
      lng: Joi.number().required().example(-73.98),
    }),
    createdAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
    updatedAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
    __v: Joi.number(),
  })
  .label("Update Location Spec");

// Category Schemas

export const createCategorySpec = Joi.object()
  .keys({
    name: Joi.string()
      .required()
      .example("Restaurant")
      .messages({ "any.required": "Name is required" }),
  })
  .label("Create Category Spec");

export const categorySpec = Joi.object()
  .keys({
    _id: idSpec,
    name: Joi.string().required().example("Some Category"),
    slug_name: Joi.string().required().example("some-category"),
    __v: Joi.number(),
  })
  .label("Category Spec");

export const categoryArray = Joi.array().items(categorySpec).label("Category Array");

export const JWTAuth = Joi.object()
  .keys({
    success: Joi.boolean().required().example("true"),
    token: Joi.string()
      .required()
      .example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo"),
  })
  .label("JWT Auth");

export const createReviewSpec = Joi.object()
  .keys({
    review: Joi.object().keys({
      rating: Joi.number().required().example(5).messages({ "any.required": "Rating is required" }),
      comment: Joi.string()
        .required()
        .example("This place is great")
        .messages({ "any.required": "Comment is required" }),
    }),
    place: idSpec,
    user: idSpec,
  })
  .label("Create Review Spec");

export const reviewSpec = Joi.object()
  .keys({
    _id: idSpec,
    user: idSpec,
    place: idSpec,
    rating: Joi.number().required().example(5),
    comment: Joi.string().required().example("This place is great"),
    createdAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
    updatedAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
    __v: Joi.number(),
  })
  .label("Review Spec");

export const reviewArray = Joi.array().items(reviewSpec).label("Review Array");
