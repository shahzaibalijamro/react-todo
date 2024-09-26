import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8Shb_4tkym0cuzzO1AgNu7EkMVPhkkF8",
  authDomain: "react-todo-app-21f37.firebaseapp.com",
  projectId: "react-todo-app-21f37",
  storageBucket: "react-todo-app-21f37.appspot.com",
  messagingSenderId: "277125335626",
  appId: "1:277125335626:web:4e97a3569d679a5049b4b3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();