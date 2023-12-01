import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const api =  process.env.API_KEY;


const firebaseConfig = {
  apiKey:api,
  authDomain: "charlets-f55cc.firebaseapp.com",
  projectId: "charlets-f55cc",
  storageBucket: "charlets-f55cc.appspot.com",
  messagingSenderId: "408880167145",
  appId: "1:408880167145:web:2e2c49008d998d42bd5878"
};

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
