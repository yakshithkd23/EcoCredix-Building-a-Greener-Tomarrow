// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';  // Import Realtime Database module

// Your Firebase configuration
const firebaseConfig = {
 //your firebase configuration;
};

const app = initializeApp(firebaseConfig);

// Get Auth and Database instances
const auth = getAuth(app);
const database = getDatabase(app);

// Export Firebase services
export { auth, createUserWithEmailAndPassword, database, ref, set };
