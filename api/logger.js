export function validationError(request, h, error) {
  console.log(error.message);
  return h.response(error.message).takeover().code(400);
}
