// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getDatabase, ref, set, push } from 'firebase/database'; // Import push from 'firebase/database'
import { getStorage } from 'firebase/storage'; // Ensure you import getStorage for Firebase Storage

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFHxt83jUiWNzhUSX63qcq6xDVCsWUBlw",
  authDomain: "gemhack-a9246.firebaseapp.com",
  databaseURL: "https://gemhack-a9246-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gemhack-a9246",
  storageBucket: "gemhack-a9246.firebasestorage.app",
  messagingSenderId: "118483115946",
  appId: "1:118483115946:web:65c9b5e60c7a123c86d5d3",
  measurementId: "G-Y075DR7QNE"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

// Export Firebase services and app for use in other files
export { app, auth, createUserWithEmailAndPassword, database, db, ref, set, push, storage, firestore };  // Export 'push' here
