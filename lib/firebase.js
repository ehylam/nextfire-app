// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// Firebase 9 - Compatiable with Firebase 8
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


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


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Firestore exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const increment = firebase.firestore.FieldValue.increment;

// const firebaseApp = initializeApp(firebaseConfig);

// export const auth = getAuth(firebaseApp);
// export const googleAuthProvider = new GoogleAuthProvider();

// export const db = getFirestore(firebaseApp);
// export const storage = getStorage();


// Helper functions

/**
* Retrieves the users/{uid} document via username
* @param {string} username
*/

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];

  return userDoc;
}

/**
* Retrieves the users/{uid} document via username
* @param {DocumentSnapshot} doc
*/

export function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

