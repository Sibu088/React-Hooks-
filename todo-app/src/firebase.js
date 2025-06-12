// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3HNDUFzKYD_bDkD_5VjrGFBDok40TAUc",
  authDomain: "todo-app-a2c93.firebaseapp.com",
  projectId: "todo-app-a2c93",
  storageBucket: "todo-app-a2c93.firebasestorage.app",
  messagingSenderId: "25357289117",
  appId: "1:25357289117:web:e1f3f18f7e16846a00f674",
  measurementId: "G-KY7KGVBR20"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
