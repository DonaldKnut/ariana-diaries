// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjwnA4BvzNoc0Sgq2yCZopbxENK-gzO8s",
  authDomain: "ariana-blog.firebaseapp.com",
  projectId: "ariana-blog",
  storageBucket: "ariana-blog.appspot.com",
  messagingSenderId: "991320699319",
  appId: "1:991320699319:web:e7351bd2a8b353e42cb832",
  measurementId: "G-S56GJFBY2G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
