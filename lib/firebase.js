import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7TdNUq0uR0-3LavQpzsQlZLMWSjK8qrw",
  authDomain: "first-firebase-bc16b.firebaseapp.com",
  projectId: "first-firebase-bc16b",
  storageBucket: "first-firebase-bc16b.appspot.com",
  messagingSenderId: "935176458818",
  appId: "1:935176458818:web:53c7c3092162c561c113db",
  measurementId: "G-7YX2ZPEV0K"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(firebaseApp);
export const storage = getStorage();