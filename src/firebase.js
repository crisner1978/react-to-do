import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB66j-2yYzA4s3r7Y6kpM0evyh7Ks-IV4g",
  authDomain: "todo-crise.firebaseapp.com",
  projectId: "todo-crise",
  storageBucket: "todo-crise.appspot.com",
  messagingSenderId: "958770536970",
  appId: "1:958770536970:web:127ffdd977e10f6df935f3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export async function createUser() {}