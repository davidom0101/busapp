import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDxkyuX1XJA3SEA5I4IP98AsfGRDR3V5ak",
  authDomain: "corkconnectapp.firebaseapp.com",
  projectId: "corkconnectapp",
  storageBucket: "corkconnectapp.appspot.com",
  messagingSenderId: "163841309727",
  appId: "1:163841309727:web:548b69a8935d0a5dbb292a",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
