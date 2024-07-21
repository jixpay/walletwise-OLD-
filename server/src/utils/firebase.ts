import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCf5l_ukuevZt5Ua5b6dak5L24fuVOeTVs",
  authDomain: "web-applications-aab6d.firebaseapp.com",
  databaseURL: "https://web-applications-aab6d-default-rtdb.firebaseio.com",
  projectId: "web-applications-aab6d",
  storageBucket: "web-applications-aab6d.appspot.com",
  messagingSenderId: "418779161900",
  appId: "1:418779161900:web:7260b2b81d46dfede53889",
  measurementId: "G-29B9KT5V0M",
};

export const app = initializeApp(FIREBASE_CONFIG);
export const storage = getStorage(app);
export const db = getFirestore(app);