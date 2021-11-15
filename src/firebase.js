import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import shallow from "zustand/shallow";
import useStore from "./store";

const firebaseConfig = {
  apiKey: "AIzaSyCdGbmbhBrjGxvZ3cM1hknXFpGlKM3UK_Q",
  authDomain: "todolist-rise.firebaseapp.com",
  projectId: "todolist-rise",
  storageBucket: "todolist-rise.appspot.com",
  messagingSenderId: "707633360414",
  appId: "1:707633360414:web:f1a8e926eebbf99dd9c80f",
  measurementId: "G-5YFZ61GQEZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export const getTimestamp = serverTimestamp;

export async function signupUser({ email, password, username }) {
  const userCreds = await createUserWithEmailAndPassword(auth, email, password);
  await createUser({
    user: userCreds.user,
    username,
  });
}

export async function createUser({ user, username }) {
  const userDoc = doc(db, "users", user.uid);
  await setDoc(userDoc, {
    uid: user.uid,
    email: user.email,
    username,
  });
}

export async function checkIfUsernameTaken(username) {
  const col = collection(db, "users");
  const q = query(col, where("username", "==", username));
  const { empty } = await getDocs(q);
  return empty || "USERNAME TAKEN";
}

// check if user logged in
export function useAuthUser() {
  const [setUser, resetUser] = useStore(
    (s) => [s.setUser, s.resetUser],
    shallow
  );

  useEffect(() => {
    async function getUser(user) {
      if (!user) {
        resetUser();
      } else {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          resetUser();
        }
      }
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await getUser(user);
    });
    return () => unsubscribe();
  }, [setUser, resetUser]);
}

export async function loginUser({ email, password }) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return await signOut(auth);
}

export async function createTodo(todo) {
  const todoCol = collection(db, "todos");
  const { id } = await addDoc(todoCol, todo);
  const todoDoc = doc(db, "todos", id);
  const newTodo = await getDoc(todoDoc);
  return { id, ...newTodo.data() };
}

export async function getDocuments(ref) {
  const snap = await getDocs(ref);
  const docs = snap.docs.map((doc) => ({
    id: doc.id,
    reference: doc.ref,
    ...doc.data(),
  }));
  return docs;
}

export async function getTodosByUsername(username) {
  const col = collection(db, "todos");
  const q = query(col, where("user.username", "==", username));
  const todos = await getDocuments(q);
  return todos;
}

export const handleDelete = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};
