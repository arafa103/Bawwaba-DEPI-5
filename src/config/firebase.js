import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlHaLpCS3o-UWxes9VDyHfPp_QpJKj4L4",
  authDomain: "bawwaba.firebaseapp.com",
  projectId: "bawwaba",
  storageBucket: "bawwaba.firebasestorage.app",
  messagingSenderId: "44703956816",
  appId: "1:44703956816:web:f090e435daa6b79f673655",
  measurementId: "G-G0DSWTMS1B"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
