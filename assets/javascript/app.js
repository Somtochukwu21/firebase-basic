import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  // where,
  getDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD82oVlyD5HTlJHMft981FMgzF_h9SKUh0",
  authDomain: "firebasic-13e07.firebaseapp.com",
  projectId: "firebasic-13e07",
  storageBucket: "firebasic-13e07.appspot.com",
  messagingSenderId: "575005889399",
  appId: "1:575005889399:web:e856b83d661fbf5e308772",
  measurementId: "G-HV7GJ69MW2",
};

initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// queries
const q = query(colRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
  let books = [];

  snapshot.docs.forEach((docs) => {
    books.push({ ...docs.data(), ID: docs.id });
  });

  console.table(books);
});

// the window outputs
window.onload = () => {
  const { addBook, deleteBook } = getHTML();

  addBook.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
      title: addBook.title.value,
      author: addBook.author.value,
      createdAt: serverTimestamp(),
    }).then(addBook.reset());
  });

  deleteBook.addEventListener("submit", (e) => {
    e.preventDefault();

    deleteDoc(doc(colRef, deleteBook.id.value)).then(deleteBook.reset());
  });
};

// get HTML documents
function getHTML() {
  const addBook = document.querySelector(".add");
  const deleteBook = document.querySelector(".delete");

  return {
    addBook,
    deleteBook,
  };
}

// getting a single document
const docRef = doc(db, "books", "5A7f5pM6zGV52DpkNVor");



onSnapshot(docRef, (docs) => {
  console.log(docs.data(), docs.id);
});
