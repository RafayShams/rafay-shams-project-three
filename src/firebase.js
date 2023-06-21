// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpGZC8ZUdy7NKVYpcizjMOuzm9u9KpyAY",
  authDomain: "rafay-project03.firebaseapp.com",
  databaseURL: "https://rafay-project03-default-rtdb.firebaseio.com",
  projectId: "rafay-project03",
  storageBucket: "rafay-project03.appspot.com",
  messagingSenderId: "631465497867",
  appId: "1:631465497867:web:5851cfd651077e5909fe0e"
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;
