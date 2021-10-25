// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdIUdbzIYC8s8QrOLIIUZ-2ANWNp7q6m4",
  authDomain: "firstproject-cc674.firebaseapp.com",
  projectId: "firstproject-cc674",
  storageBucket: "firstproject-cc674.appspot.com",
  messagingSenderId: "85677692589",
  appId: "1:85677692589:web:de3932463117244ba3d824",
  measurementId: "G-5Y9T6T1LF7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;