import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6ALqmlGvT9kyuq2ChOhcoxvsubWQzQJU",
  authDomain: "image-encryption-6a6a9.firebaseapp.com",
  projectId: "image-encryption-6a6a9",
  storageBucket: "image-encryption-6a6a9.appspot.com",
  messagingSenderId: "240010401206",
  appId: "1:240010401206:web:466055ef9cf0138a8b5d17",
  measurementId: "G-TF7BNNYK1X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
