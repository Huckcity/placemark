import Joi from "joi";

// User Schemas

export const idSpec = Joi.alternatives()
  .try(Joi.string(), Joi.object())
  .description("User id or object with id");

export const userSpec = Joi.object()
  .keys({
    username: Joi.string().required().example("johndoe"),
    password: Joi.string().required().example("password"),
    firstName: Joi.string().optional().allow("").example("John"),
    lastName: Joi.string().optional().allow("").example("Doe"),
    email: Joi.string().email().required().example("johndoe@email.com"),
    role: Joi.string().required().example("user"),
    _id: idSpec,
    __v: Joi.number(),
    createdAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
    updatedAt: Joi.date().optional().example("2018-01-01T00:00:00.000Z"),
  })
  .label("User");

export const userArray = Joi.array().items(userSpec).label("User Array");

export const registerSpec = Joi.object()
  .keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().required(),
    email: Joi.string().email().required(),
  })
  .label("Registeration Spec");

export const loginSpec = Joi.object()
  .keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
  .label("Login Spec");

export const updateUserSpec = Joi.object()
  .keys({
    username: Joi.string().required().example("johndoe"),
    email: Joi.string().email().required().example("johndoe@email.com"),
    password: Joi.string().optional().allow("").example("password"),
    passwordConfirm: Joi.string().optional().allow("").example("password"),
    firstName: Joi.string().optional().allow("").example("John"),
    lastName: Joi.string().optional().allow("").example("Doe"),
  })
  .label("Update User Spec");

// Place Schema

export const placeSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Times Square"),
    description: Joi.string().optional().allow("").example("Long form description"),
    image: Joi.string().optional().allow("").example("https://www.example.com/image.jpg"),
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
    category: Joi.string().optional().allow("").example("restaurant"),
  })
  .label("Place Spec");

export const placeArray = Joi.array().items(placeSpec).label("Place Array");

export const updatePlaceSpec = Joi.object().keys({
  name: Joi.string().required().example("Times Square"),
  description: Joi.string().optional().allow("").example("Long form description"),
  image: Joi.string().optional().allow("").example("https://www.example.com/image.jpg"),
  location: Joi.object()
    .keys({
      lat: Joi.number().required().example(40.75),
      lng: Joi.number().required().example(-73.98),
    })
    .label("Update Location Spec"),
});

// Category Schemas

export const categorySpec = Joi.object()
  .keys({
    _id: idSpec,
    name: Joi.string().required().example("Some Category"),
    slug_name: Joi.string().required().example("some-category"),
    __v: Joi.number(),
  })
  .label("Category Spec");

export const categoryArray = Joi.array().items(categorySpec).label("Category Array");
