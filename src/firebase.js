// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ySUgln28CkZx-ERR-uXztVnYVRvh_6k",
  authDomain: "mychatapp-e3f5c.firebaseapp.com",
  projectId: "mychatapp-e3f5c",
  storageBucket: "mychatapp-e3f5c.appspot.com",
  messagingSenderId: "767722478525",
  appId: "1:767722478525:web:ca03d8ae8c0189ac3250d4",
  measurementId: "G-9PBTPDT29Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);