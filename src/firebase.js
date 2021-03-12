import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCS24XgTqPAu1KT9cEeV4E6pcrruzG7fcU",
  authDomain: "entrevista-react.firebaseapp.com",
  projectId: "entrevista-react",
  storageBucket: "entrevista-react.appspot.com",
  messagingSenderId: "252489461813",
  appId: "1:252489461813:web:3f21a16a6db128d116c17c",
  measurementId: "G-PZ9C2F271B",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
