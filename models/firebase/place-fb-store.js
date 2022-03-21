import { collection, where, addDoc, getDocs } from "firebase/firestore";

const placeFirebaseStore = (db) => {
  const places = collection(db, "places");

  const getAll = async () => {
    const allPlaces = await getDocs(places);
    return allPlaces.docs.map((doc) => doc.data());
  };

  const getById = async (id) => {
    const place = await places.doc(id).get();
    return place.data();
  };

  const getByName = async (name) => {
    const place = await places.where("name", "==", name).get();
    return place.docs.map((doc) => doc.data());
  };

  const getByUserId = async (userId) => {
    const allPlaces = await getDocs(places, where("userId", "==", userId));
    return allPlaces.docs.map((doc) => doc.data());
  };

  const getByCategorySlug = async (categorySlug) => {
    const category = await categoryFirebaseStore(db).getBySlug(categorySlug);
    const allPlaces = await places.where("category", "==", category._id).get();
    return allPlaces.docs.map((doc) => doc.data());
  };

  const create = async (place) => {
    const placeDoc = await addDoc(places, place);
    return placeDoc;
  };

  const update = async (id, place) => {
    const updatedPlace = await places.doc(id).update(place);
    return updatedPlace;
  };

  const deleteById = async (id) => {
    const deletedPlace = await places.doc(id).delete();
    return deletedPlace;
  };

  const deleteAll = async () => {
    return places.delete();
  };

  return {
    getAll,
    getById,
    getByName,
    getByUserId,
    getByCategorySlug,
    create,
    update,
    deleteById,
    deleteAll,
  };
};

export default placeFirebaseStore;
