// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBf9SetXLREL1ThDeJL4MLAS-BAEp-tLek",
    authDomain: "petadoption-mfd.firebaseapp.com",
    projectId: "petadoption-mfd",
    storageBucket: "petadoption-mfd.firebasestorage.app",
    messagingSenderId: "184427669656",
    appId: "1:184427669656:web:e943a6b1eba96e16a108ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };