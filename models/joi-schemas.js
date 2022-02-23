import Joi from "@hapi/joi";

export const userSpec = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const registerSpec = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  passwordConfirm: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const loginSpec = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
