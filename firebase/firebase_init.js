import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBC-StbzkUqLBGu0V4J3vjUuDbLbdL4yp4",
  authDomain: "steamship-gcp.firebaseapp.com",
  projectId: "steamship-gcp",
  storageBucket: "steamship-gcp.appspot.com",
  messagingSenderId: "129710370400",
  appId: "1:129710370400:web:e53f7415f3bbe73095dd05",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch {}

export const db = firebase.firestore();
