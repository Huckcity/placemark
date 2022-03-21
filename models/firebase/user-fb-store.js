import { collection, where, doc, addDoc, getDocs } from "firebase/firestore";

const userFirebaseStore = (db) => {
  const users = collection(db, "users");

  const getAll = async () => {
    const users = await getDocs(users);
    return users.docs.map((doc) => doc.data());
  };

  const getByUsername = async (username) => {
    const user = await getDocs(users, where("username", "==", username));
    return user.docs.map((doc) => doc.data());
  };

  const getById = async (id) => {
    const user = await getDocs(users, id);
    return user.docs.map((doc) => doc.data());
  };

  const getByEmail = async (email) => {
    const user = await getDocs(users, where("email", "==", email));
    return user.docs.map((doc) => doc.data());
  };

  const authByEmailOrUsername = async (user) => {
    const login = user.email ? user.email : user.username;
    const res = await getDocs(users, where("email", "==", login));
    return res.docs.map((doc) => doc.data());
  };

  const create = async (user) => {
    const userDoc = await addDoc(users, user);
    return userDoc;
  };

  const update = async (id, user) => {
    const updatedUser = await doc(users, id).update(user);
    return updatedUser;
  };

  const deleteById = async (id) => {
    const deletedUser = await doc(users, id).delete();
    return deletedUser;
  };

  const deleteAll = async () => {
    return users.delete();
  };

  return {
    getAll,
    getByUsername,
    getById,
    getByEmail,
    authByEmailOrUsername,
    create,
    update,
    deleteById,
    deleteAll,
  };
};

export default userFirebaseStore;
