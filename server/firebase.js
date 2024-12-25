import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export const auth = getAuth(app);