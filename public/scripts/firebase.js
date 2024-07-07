// Compte de service Firebase
// firebase-adminsdk-e3s9u@victorys-428bc.iam.gserviceaccount.com

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { } from 'firebase/database';
import { } from "firebase/firestore";
import { } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKwMFXASbFxNm8-AWVMojONYXYqEfc6n8",
  authDomain: "victorys-428bc.firebaseapp.com",
  projectId: "victorys-428bc",
  storageBucket: "victorys-428bc.appspot.com",
  messagingSenderId: "265974940282",
  appId: "1:265974940282:web:e2a21de59dfd7741d3b1c3",
  measurementId: "G-N6ZDX8B6Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

var admin = require("firebase-admin");

var serviceAccount = require("public\data\victorys-428bc-firebase-adminsdk-e3s9u-474570dec3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}