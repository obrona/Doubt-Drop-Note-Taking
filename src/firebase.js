// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { getStorage } from "firebase/storage"
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

const db = getFirestore(app);
const colRef = collection(db, 'Notes')
const profilePicRef = collection(db, 'Profile')
const moduleRef = collection(db, 'Modules')
const imageDb = getStorage(app)

export { db, colRef, moduleRef, imageDb, profilePicRef }
