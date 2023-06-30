import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Subsequent queries will use persistence, if it was enabled successfully
const firebaseConfig = {
  apiKey: "AIzaSyDddrk3DDYbSFDfLxc5K0y3AJZ45Q-Wrgs",
  authDomain: "mokey-blogging-4566a.firebaseapp.com",
  projectId: "mokey-blogging-4566a",
  storageBucket: "mokey-blogging-4566a.appspot.com",
  messagingSenderId: "760511143033",
  appId: "1:760511143033:web:523bae6bfe2d3ce01a48a8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
