// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBLvmS9JwKSVEi5XkT3hKRh0ueeFM36kCA",
  authDomain: "travel-journal-project-405412.firebaseapp.com",
  projectId: "travel-journal-project-405412",
  storageBucket: "travel-journal-project-405412.appspot.com",
  messagingSenderId: "1028651757092",
  appId: "1:1028651757092:web:3e6ff4ae1cecd64715b2b1",
  measurementId: "G-F06MQMH7YE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
