import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDUAEwqBVqmhH-sWhuc0kJuBNTEQUntDK8",
    authDomain: "ecommerce-1b17e.firebaseapp.com",
    projectId: "ecommerce-1b17e",
    storageBucket: "ecommerce-1b17e.appspot.com",
    messagingSenderId: "150638489945",
    appId: "1:150638489945:web:558a2b6e210f9abae9dc48",
    measurementId: "G-40WFL3C5D1"
};

const fireBaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export {auth}