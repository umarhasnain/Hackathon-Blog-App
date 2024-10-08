import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
  collection,
  addDoc,
   onSnapshot,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDO-478xaltJCjezpfRB-OU2g_4kXcRjRU",
  authDomain: "blog-app0.firebaseapp.com",
  projectId: "blog-app0",
  storageBucket: "blog-app0.appspot.com",
  messagingSenderId: "509053694593",
  appId: "1:509053694593:web:06f42a5eea14ed6ebd1380",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  collection,
  addDoc, getDocs,
  onSnapshot,
 query,
 where,
 orderBy};
