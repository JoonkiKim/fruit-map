// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2ll3QKwE7LoJvAX5H3maRjJh9Skqntsc",
  authDomain: "qkjk-fruitmap.firebaseapp.com",
  projectId: "qkjk-fruitmap",
  storageBucket: "qkjk-fruitmap.firebasestorage.app",
  messagingSenderId: "393838753860",
  appId: "1:393838753860:web:b54af73d79362c85be6411",
};

// Initialize Firebase
export const firebasefruitapp = initializeApp(firebaseConfig);

// 이미지 업로드용
export const storage = getStorage(firebasefruitapp);
export const db = getFirestore(firebasefruitapp);
export const auth = getAuth(firebasefruitapp);
