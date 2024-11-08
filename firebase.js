import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Your web app's Firebase configuration
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

// Check if Firebase Analytics is supported in the current environment
const analytics = isSupported() ? getAnalytics(app) : null;

// Initialize Firebase Auth with AsyncStorage persistence
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, analytics };
