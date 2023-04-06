// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_DB_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_DB_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_DB_FPROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_DB_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_DB_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_DB_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
