import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// firebase provides me the option to sign with through redirect, and other ways

const firebaseConfig = {
  apiKey: "AIzaSyBAJP4cIFmOI_OdKx7ald_K2tXrIemo6gE",
  authDomain: "quizgpt-1261b.firebaseapp.com",
  projectId: "quizgpt-1261b",
  storageBucket: "quizgpt-1261b.appspot.com",
  messagingSenderId: "285076313265",
  appId: "1:285076313265:web:3a754285cb00cb838cbe90",
  measurementId: "G-848S2VDH1T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
