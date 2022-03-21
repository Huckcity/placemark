import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

dotenv.config();

function connectFirebase() {
  const firebaseApp = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "placemark-66b6e.firebaseapp.com",
    projectId: "placemark-66b6e",
  });

  const db = getFirestore();

  return db;
}

export default connectFirebase;
