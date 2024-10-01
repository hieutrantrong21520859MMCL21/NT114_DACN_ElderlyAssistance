// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTcxUnxJOi_fuuu6UjyYnZnGuDDgEu-qk",
  authDomain: "elderassistance-fe406.firebaseapp.com",
  projectId: "elderassistance-fe406",
  storageBucket: "elderassistance-fe406.appspot.com",
  messagingSenderId: "409800732572",
  appId: "1:409800732572:web:11fd561be2c8ad99bd6259",
  measurementId: "G-VRYQW4WK06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);