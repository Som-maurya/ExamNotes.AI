
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotesai-4da1c.firebaseapp.com",
  projectId: "authexamnotesai-4da1c",
  storageBucket: "authexamnotesai-4da1c.firebasestorage.app",
  messagingSenderId: "988804150309",
  appId: "1:988804150309:web:1af1fb3dcb494356d83bcc"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}