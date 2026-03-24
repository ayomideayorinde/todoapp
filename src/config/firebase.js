// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzG6NdDa2H8wwqzYwXE5FNux5bs7kWTU4",
  authDomain: "midetodoapp.firebaseapp.com",
  projectId: "midetodoapp",
  storageBucket: "midetodoapp.firebasestorage.app",
  messagingSenderId: "229804353112",
  appId: "1:229804353112:web:10f50d528579bb4742cc2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

export { auth,db };
