import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  // apiKey: process.env.EXPO_PUBLIC_API_KEY,
  // authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  // projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  // storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  // messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  // appId: process.env.EXPO_PUBLIC_APP_ID,
  apiKey: "AIzaSyDxkyuX1XJA3SEA5I4IP98AsfGRDR3V5ak",
  authDomain: "corkconnectapp.firebaseapp.com",
  projectId: "corkconnectapp",
  storageBucket: "corkconnectapp.appspot.com",
  messagingSenderId: "163841309727",
  appId: "1:163841309727:web:548b69a8935d0a5dbb292a"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
