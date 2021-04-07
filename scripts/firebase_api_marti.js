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

function readTitle(){
  db.collection("movies").doc("Bladerunner")
  .onSnapshot(function(c){
      console.log ("current document data: " + c.data());                       //.data() returns data object
      document.getElementById("displayed-movie").innerHTML = c.data().title;    //using vanilla javascript
      //$('#quote-goes-here').text(c.data().quote);                             //using jquery object dot notation
      //$("#quote-goes-here").text(c.data()["quote"]);                          //using json object indexing
  })
}
readTitle();

function writeFilms() {
  var citiesRef = db.collection("films");

  citiesRef.add({
      title: "Ikiru",
      director: "Akira Kurosawa",
  });
}

writeFilms();

function displayMovie(){
  db.collection("movies")
  .get()
  .then(function(snap){
      snap.forEach(function(doc){

          console.log(snap)
          
          console.log("Going through movies.")

          var movieTitle = doc.data().title;
          var movieDirector = doc.data().director;
          var movieYear = doc.data().year;
          var movieDescription = doc.data().description;
          
          document.getElementById('displayed-movie').innerHTML = movieTitle;
          document.getElementById('displayed-movie-small').innerHTML = movieTitle;
          document.getElementById('displayed-director').innerHTML = movieDirector;
          document.getElementById('displayed-year').innerHTML = movieYear;
          document.getElementById('displayed-description').innerHTML = movieDescription ;
          
          console.log(movieTitle);
          console.log(movieDirector);
          console.log("bless")
      })

  })
}
displayMovie();

console.log("second bless")


