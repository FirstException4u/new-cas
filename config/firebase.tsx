import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCaH_m97SpUWSJ800sFjMAXUFgnix6RNLg",
  authDomain: "railway-concession-4acd0.firebaseapp.com",
  projectId: "railway-concession-4acd0",
  storageBucket: "railway-concession-4acd0.appspot.com",
  messagingSenderId: "853556292607",
  appId: "1:853556292607:web:66f53d539004f5c90f15ca",
  measurementId: "G-6T0KENDQKF"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

