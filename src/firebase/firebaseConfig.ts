// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuGY5PoPKE9T0tTSl-aOxtvgVOxkByHxE",
  authDomain: "matt-ecc.firebaseapp.com",
  projectId: "matt-ecc",
  storageBucket: "matt-ecc.appspot.com",
  messagingSenderId: "231623898868",
  appId: "1:231623898868:web:440f655e82b5ad98e650a1",
  measurementId: "G-J04K2N60Y6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)