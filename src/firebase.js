import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import useStore from "./store";
import shallow from "zustand/shallow";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB66j-2yYzA4s3r7Y6kpM0evyh7Ks-IV4g",
  authDomain: "todo-crise.firebaseapp.com",
  projectId: "todo-crise",
  storageBucket: "todo-crise.appspot.com",
  messagingSenderId: "958770536970",
  appId: "1:958770536970:web:127ffdd977e10f6df935f3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

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
