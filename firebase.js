import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3izZkYwcS-rVInadox8LFKqpbPhOCu6I",
  authDomain: "tabletap-27cd3.firebaseapp.com",
  projectId: "tabletap-27cd3",
  storageBucket: "tabletap-27cd3.appspot.com",
  messagingSenderId: "68768779352",
  appId: "1:68768779352:web:ddb864a012eb0205e8ce2d",
  measurementId: "G-VRHPXFR98F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };