import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyCkGy5TjAbkS7QqnoqqTrnwKl5YlgLwKcM",
  authDomain: "smart-meal-28add.firebaseapp.com",
  projectId: "smart-meal-28add",
  storageBucket: "smart-meal-28add.appspot.com",
  messagingSenderId: "447635732488",
  appId: "1:447635732488:web:4f702093afef44179f79bd",
  measurementId: "G-DH3WXQJS3B",
};
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const db = firebase.firestore();

// collection references
const categoriesCollection = db.collection("categories");
const productsCollection = db.collection("products");
const itemsCollection = db.collection("items");

export default { projectAuth, db, productsCollection };

// utils
// const db = firebase.firestore();
// const auth = firebase.auth();

// // export utils/refs
// export { db, auth, usersCollection, adsCollection };
