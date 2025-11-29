// firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ4sGUZHpP_CW89SdILPumSqRp9qPCBCY",
  authDomain: "lootlake-ecommerce.firebaseapp.com",
  projectId: "lootlake-ecommerce",
  storageBucket: "lootlake-ecommerce.firebasestorage.app",
  messagingSenderId: "921622647316",
  appId: "1:921622647316:web:aa574c01ec2596235ccd01"
};

// Initialize Firebase only once (fix for Next.js hot reload)
const app = initializeApp(firebaseConfig);

// Export Firebase services (you will use these later)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
