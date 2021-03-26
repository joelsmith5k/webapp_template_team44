//---------------------------------------------------
// replace the lines below with your own "firebaseConfig"
// key value pairs
//--------------------------------------------------- 

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD2tA6bDF_aqFvTJ5uKEv-8yqhwdiaC46w",
  authDomain: "march02demo-79141.firebaseapp.com",
  projectId: "march02demo-79141",
  storageBucket: "march02demo-79141.appspot.com",
  messagingSenderId: "115694269419",
  appId: "1:115694269419:web:76e40820b7e3cdb9efdfae"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to database
const db = firebase.firestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = firebase.storage();
