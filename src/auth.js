import { getAuth } from "firebase/auth";
import app from "./firebaseConfig";

const auth = getAuth(app);
console.log("Firebase Auth initialized:", auth);
export default auth;
