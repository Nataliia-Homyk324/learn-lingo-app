// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA922kqfLqMvV9qRHPOrUV6GB3pbOzzfwU",
  authDomain: "learn-lingo-app-c6e98.firebaseapp.com",
  projectId: "learn-lingo-app-c6e98",
  storageBucket: "learn-lingo-app-c6e98.appspot.com",
  messagingSenderId: "845404324064",
  appId: "1:845404324064:web:bb129a90832ae2d71e5085",
  measurementId: "G-69SH91VWGW",
  databaseURL: "https://learn-lingo-app-c6e98-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);