// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDirDRTDBzRn3fJbXupfUq-SSBgM4HdmKY",
  authDomain: "pass-b3138.firebaseapp.com",
  projectId: "pass-b3138",
  storageBucket: "pass-b3138.appspot.com",
  messagingSenderId: "918802461601",
  appId: "1:918802461601:web:9b9a714402c796cb1311e0",
  measurementId: "G-V3KTWCLY6F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
