import Boom from "@hapi/boom";

function validationError(request, h, error) {
  console.log(error);
  return Boom.badRequest(error.message);
}

export default validationError;
