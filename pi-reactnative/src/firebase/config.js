import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyArRsS-8SCqwE7kKPcuNfuGRSxoFO7GRig",
    authDomain: "pi-react-native-d45dc.firebaseapp.com",
    projectId: "pi-react-native-d45dc",
    storageBucket: "pi-react-native-d45dc.firebasestorage.app",
    messagingSenderId: "199522014729",
    appId: "1:199522014729:web:c4db9f3d94fab5fad84ad8"
  };  

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
