
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm6FLYqlmYCtVubw851CbCVk-bxLZdUOE",
  authDomain: "kaltaknews-9f133.firebaseapp.com",
  projectId: "kaltaknews-9f133",
  storageBucket: "kaltaknews-9f133.firebasestorage.app",
  messagingSenderId: "830305167153",
  appId: "1:830305167153:web:92134cfedeb142ffc43210"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 