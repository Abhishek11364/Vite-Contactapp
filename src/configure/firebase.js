// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj_eMDxGv10SboKnAyYydlSDVja3O4tWw",
  authDomain: "vite-contact-fdd4c.firebaseapp.com",
  projectId: "vite-contact-fdd4c",
  storageBucket: "vite-contact-fdd4c.appspot.com",
  messagingSenderId: "193152924699",
  appId: "1:193152924699:web:eb604e5546e73c1875ccbe",
  measurementId: "G-EGS6RVSSK9"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);