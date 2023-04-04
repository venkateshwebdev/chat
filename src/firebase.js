// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9WUU_jiMUL2vCBvE_mgmHra8nmhGx32Q",
  authDomain: "chatty-dd224.firebaseapp.com",
  projectId: "chatty-dd224",
  storageBucket: "chatty-dd224.appspot.com",
  messagingSenderId: "988394936640",
  appId: "1:988394936640:web:dff0d1d6e36ddeedf202a5",
  measurementId: "G-VYDT1506T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app) 