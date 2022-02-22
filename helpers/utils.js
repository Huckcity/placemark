export const checkAdmin = (user) => {
  if (!user.isAdmin) {
    return false;
  }
  return true;
};
