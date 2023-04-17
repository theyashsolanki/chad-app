// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC0kfWl8AzEsUyTm27EgUsKvctAK8BBkRo",
  authDomain: "chad-app-593b5.firebaseapp.com",
  projectId: "chad-app-593b5",
  storageBucket: "chad-app-593b5.appspot.com",
  messagingSenderId: "364503553011",
  appId: "1:364503553011:web:3fae5fa84a9a09d30f3886",
  measurementId: "G-QXB4J7W3D3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)