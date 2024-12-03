// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl390Efl59w_P5TrjeKL64Al_teesrxag",
  authDomain: "kakao-talk-32349.firebaseapp.com",
  projectId: "kakao-talk-32349",
  storageBucket: "kakao-talk-32349.firebasestorage.app",
  messagingSenderId: "862211395215",
  appId: "1:862211395215:web:ec9ac46c4681192cfb6afa",
  measurementId: "G-WRM6TKZFXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase 서비스들 초기화
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
