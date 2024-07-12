// Firebase service account
// firebase-adminsdk-e3s9u@victorys-428bc.iam.gserviceaccount.com

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKwMFXASbFxNm8-AWVMojONYXYqEfc6n8",
  authDomain: "victorys-428bc.firebaseapp.com",
  databaseURL: "https://victorys-428bc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "victorys-428bc",
  storageBucket: "victorys-428bc.appspot.com",
  messagingSenderId: "265974940282",
  appId: "1:265974940282:web:e2a21de59dfd7741d3b1c3",
  measurementId: "G-N6ZDX8B6Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;