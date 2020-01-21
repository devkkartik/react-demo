import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK_kjp1l-jblRGcCD7QIpJY8poYrtIcqI",
  authDomain: "sandbox-253814.firebaseapp.com",
  databaseURL: "https://sandbox-253814.firebaseio.com",
  projectId: "sandbox-253814",
  storageBucket: "sandbox-253814.appspot.com",
  messagingSenderId: "76326992511",
  appId: "1:76326992511:web:931905368d3b6dbe281d4a",
  measurementId: "G-D6MH7P7C07"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
