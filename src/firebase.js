import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({

        apiKey: "AIzaSyD9gUpU3lQ67TBTmRX-5gTG0L5xqCNQTfw",
        authDomain: "facebook-messenger-clone-b8330.firebaseapp.com",
        databaseURL: "https://facebook-messenger-clone-b8330.firebaseio.com",
        projectId: "facebook-messenger-clone-b8330",
        storageBucket: "facebook-messenger-clone-b8330.appspot.com",
        messagingSenderId: "536533316591",
        appId: "1:536533316591:web:ae4f4a9c88debf5b1b3c1a",
        measurementId: "G-L6WZWHC9M4"
    
});

const db = firebaseApp.firestore();

export default db;