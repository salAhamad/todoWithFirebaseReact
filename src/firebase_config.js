import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAZodkYD68g5BCnW8WD4E1slmFo78uSmHE",
    authDomain: "react-auth-todo-9d364.firebaseapp.com",
    projectId: "react-auth-todo-9d364",
    storageBucket: "react-auth-todo-9d364.appspot.com",
    messagingSenderId: "420989745182",
    appId: "1:420989745182:web:0a1959bb65db519185560f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;