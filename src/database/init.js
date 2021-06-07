import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

var firebaseConfig = {
        apiKey: "AIzaSyCOvV3JyEXIdA3pSoMMjfweUzkmSMJTcAk",
        authDomain: "online-chatting-b08e2.firebaseapp.com",
        databaseURL: "https://online-chatting-b08e2-default-rtdb.firebaseio.com",
        projectId: "online-chatting-b08e2",
        storageBucket: "online-chatting-b08e2.appspot.com",
        messagingSenderId: "498591594149",
        appId: "1:498591594149:web:2edb6f69aababc35f3ff4c",
        measurementId: "G-85LWCJRG1T"
    }
    // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()