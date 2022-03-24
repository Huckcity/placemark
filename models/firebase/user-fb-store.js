import { collection, where, doc, addDoc, getDoc, getDocs, query } from "firebase/firestore";

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
    const docRef = doc(db, "users", id);
    const user = await getDoc(docRef);
    if (user.exists()) {
      return { ...user.data(), _id: user.id };
    }
    return null;
  };

  const getByEmail = async (email) => {
    const user = await getDocs(users, where("email", "==", email));
    return user.docs.map((doc) => doc.data());
  };

  const authByEmailOrUsername = async (user) => {
    const login = user.email ? user.email : user.username;
    const q1 = query(users, where("email", "==", login));
    let snapshot = await getDocs(q1);
    if (snapshot.docs.length === 0) {
      const q2 = query(users, where("username", "==", login));
      snapshot = await getDocs(q2);
      if (snapshot.docs.length === 0) {
        throw new Error("User not found");
      }
    }
    // return with _id field

    return {
      ...snapshot.docs[0].data(),
      _id: snapshot.docs[0].id,
    };
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
