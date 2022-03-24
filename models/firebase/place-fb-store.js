import { collection, where, addDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import Place from "./place.js";
import { placeConverter } from "./converters.js";

const placeFirebaseStore = (db) => {
  const places = collection(db, "places");

  const getAll = async () => {
    const allPlaces = await getDocs(places);
    return allPlaces.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
  };

  const getById = async (id) => {
    const place = await getDoc(doc(db, "places", id));
    if (place.exists()) {
      return { ...place.data(), _id: place.id };
    }
    return null;
  };

  const getByName = async (name) => {
    const place = await places.where("name", "==", name).get();
    return place.docs.map((doc) => doc.data());
  };

  const getByUserId = async (userId) => {
    console.log("getByUserId", userId);
    try {
      const q = query(collection(db, "places"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getByCategorySlug = async (categorySlug) => {
    const category = await categoryFirebaseStore(db).getBySlug(categorySlug);
    const allPlaces = await places.where("category", "==", category._id).get();
    return allPlaces.docs.map((doc) => doc.data());
  };

  const create = async (place, userId) => {
    const newPlace = new Place(place, userId);
    const placeDoc = await addDoc(places, placeConverter.toFirestore(newPlace));
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
