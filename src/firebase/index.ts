// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2bz6jR9JCwVWk5W74CRyHJU8B58sWAZ0",
  authDomain: "wywm-a3dc2.firebaseapp.com",
  projectId: "wywm-a3dc2",
  storageBucket: "wywm-a3dc2.appspot.com",
  messagingSenderId: "400725479213",
  appId: "1:400725479213:web:e15cfaa01bd3796ae7cda4",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

const FIREBASE_DB = getFirestore(FIREBASE_APP);

export default FIREBASE_DB;
