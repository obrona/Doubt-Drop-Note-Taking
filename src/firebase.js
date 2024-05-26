// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa7XDBG0vAJpWaGJkKM2hLtcOe_6D080U",
  authDomain: "doubtdropnotetaking.firebaseapp.com",
  projectId: "doubtdropnotetaking",
  storageBucket: "doubtdropnotetaking.appspot.com",
  messagingSenderId: "492406712967",
  appId: "1:492406712967:web:7418780cd36ee7da07e622"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);