import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./baseConfig";
import { getHTML } from "./htmlDocs";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  // where,
  // getDoc,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const colRef = collection(db, "books");
const q = query(colRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
  let books = [];

  snapshot.docs.forEach((docs) => {
    books.push({ ...docs.data(), ID: docs.id });
  });

  console.table(books);
});

// getting a single document
const docRef = doc(db, "books", "5A7f5pM6zGV52DpkNVor");

onSnapshot(docRef, (docs) => {
  console.log(docs.data(), docs.id);
});

// the window outputs
window.onload = () => {
  const { addBook, deleteBook, updateBook } = getHTML();

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

  updateBook.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("why");
  });
};
