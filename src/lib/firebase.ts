import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzGVYdTesS_n05BuDLIiuUgBSCKUdXnQk",
  authDomain: "khaziqandsons.firebaseapp.com",
  projectId: "khaziqandsons",
  storageBucket: "khaziqandsons.firebasestorage.app",
  messagingSenderId: "785775561074",
  appId: "1:785775561074:web:d8fd12702edc84355835eb",
  measurementId: "G-HE0ES46QLR",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
