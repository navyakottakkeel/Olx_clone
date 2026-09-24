import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCLA0jmkyaDAo7fJGzkO_RvjDHLhoDD_Zo",
    authDomain: "olx-clone-fbd81.firebaseapp.com",
    projectId: "olx-clone-fbd81",
    storageBucket: "olx-clone-fbd81.firebasestorage.app",
    messagingSenderId: "546857949350",
    appId: "1:546857949350:web:3b55844271793c0bc43c67",
    measurementId: "G-8JRQ72WDTR"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  