// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEC8HFlrPphz4VX4lhUtICGJwB-_YJpA4",
  authDomain: "intellicards.firebaseapp.com",
  projectId: "intellicards",
  storageBucket: "intellicards.appspot.com",
  messagingSenderId: "155055458560",
  appId: "1:155055458560:web:bb99b5e7917a2a95b2cbe5",
  measurementId: "G-9WJF6GVJ4F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
export { db, auth };
