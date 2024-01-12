// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFGrPJGGErHISlKgSAWFxlOFsqEU6d_-s",
  authDomain: "aiss-1b77d.firebaseapp.com",
  projectId: "aiss-1b77d",
  storageBucket: "aiss-1b77d.appspot.com",
  messagingSenderId: "62461113899",
  appId: "1:62461113899:web:3b06479816e848956f5c6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
