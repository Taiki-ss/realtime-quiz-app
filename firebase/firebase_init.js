import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC4nvz5sUJ58Tz1BbuNQQy085sVbIERIg0",
  authDomain: "realtime-quiz-app-72792.firebaseapp.com",
  projectId: "realtime-quiz-app-72792",
  storageBucket: "realtime-quiz-app-72792.appspot.com",
  messagingSenderId: "557627477279",
  appId: "1:557627477279:web:20909f70ff25edfd67f42a"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch {}

export const db = firebase.firestore();
