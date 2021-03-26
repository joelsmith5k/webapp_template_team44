//---------------------------------------------------
// replace the lines below with your own "firebaseConfig"
// key value pairs
//--------------------------------------------------- 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBo8Z2nhjdAq9LiUJqVs2TaOKQNA3-2g0E",
    authDomain: "cineder-3be64.firebaseapp.com",
    projectId: "cineder-3be64",
    storageBucket: "cineder-3be64.appspot.com",
    messagingSenderId: "855842445281",
    appId: "1:855842445281:web:281e3be0aa8ffb17d164a0"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Get a reference to database
  const db = firebase.firestore();
  // Get a reference to the storage service, which is used to create references in your storage bucket
  // const storage = firebase.storage();
  