// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp8uUobH6MEhn0_DYnb4iibdNfekw--DU",
  authDomain: "testcrud-5c700.firebaseapp.com",
  projectId: "testcrud-5c700",
  storageBucket: "testcrud-5c700.appspot.com",
  messagingSenderId: "1012405541101",
  appId: "1:1012405541101:web:11e60054e8c1f2b48814e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();