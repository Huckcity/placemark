import { collection, addDoc, getDocs } from "firebase/firestore";

const categoryFirebaseStore = (db) => {
  const categories = collection(db, "categories");

  const getAll = async () => {
    const allCategories = await getDocs(categories);
    // return with _id field
    return allCategories.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
  };

  const getById = async (id) => {
    const category = await getDocs(categories, id);
    // return with _id field
    return category.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
  };

  const getByName = async (name) => {
    const category = await categories.where("name", "==", name).get();
    return category.docs.map((doc) => doc.data());
  };

  const create = async (category) => {
    category.slug_name = category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const categoryDoc = await addDoc(categories, category);
    return categoryDoc;
  };

  const update = async (id, category) => {
    const updatedCategory = await categories.doc(id).update(category);
    return updatedCategory;
  };

  const deleteById = async (id) => {
    const deletedCategory = await categories.doc(id).delete();
    return deletedCategory;
  };

  const deleteAll = async () => {
    return categories.delete();
  };

  return {
    getAll,
    getById,
    getByName,
    create,
    update,
    deleteById,
    deleteAll,
  };
};

export default categoryFirebaseStore;
