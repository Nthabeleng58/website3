import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAa0twirzS50f2OqpJMxmBnhYvAXIaTO00",
  authDomain: "wings-cafe-aa8f1.firebaseapp.com",
  projectId: "wings-cafe-aa8f1",
  storageBucket: "wings-cafe-aa8f1.appspot.com",
  messagingSenderId: "517523242191",
  appId: "1:517523242191:web:3527fb29ee3133cbc00bba",
  measurementId: "G-01FN6ZJGN5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;
