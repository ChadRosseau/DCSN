// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD1qHH3zsiDBGVJL1lusKecWhZjTDyo1AU",
    authDomain: "dcsn-e8f7a.firebaseapp.com",
    databaseURL: "https://dcsn-e8f7a.firebaseio.com",
    projectId: "dcsn-e8f7a",
    storageBucket: "dcsn-e8f7a.appspot.com",
    messagingSenderId: "327191415154",
    appId: "1:327191415154:web:a4653bfb4629a94f79f5eb",
    measurementId: "G-300TVBWZ72"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Real-Time Database
var database = firebase.database();