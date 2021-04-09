// variables

var currentUser;

var movies;
var movieIndex = 0;

var userstwo;
var userIndex = 0;

yes = document.getElementById("yesButton");
no = document.getElementById("noButton");

/* ------------------------------ User Functions ------------------------------ */

function displayCurrentUser() {
    firebase.auth().onAuthStateChanged(function(user) {
        db.collection("userstwo").doc(user.uid).get().then(function(doc) {
            console.log(user.uid)
            console.log(doc.data())
            console.log(doc.data().name)
            
        })
        if (user) {
            currentUser = user
            // console.log("displayUser")
            // console.log(currentUser.email)
            // console.log(currentUser.displayName)
            // console.log(currentUser.uid)
            return currentUser
        } else {
          // No user is signed in.
        }
      });
}

displayCurrentUser()


var coolguy = displayCurrentUser()
console.log("coolguy" + coolguy)


var displayNextUser = () => {
    //document.getElementById('yes').addEventListener('click', function () {
    var userEmail = userstwo[0].data().email;

    userIndex++;
    console.log(userEmail);
}



function getUsers() {
    // Returns an array of the database collection for userstwo.
    db.collection("userstwo")
        .get()
        .then(function (snap) {
            userstwo = snap.docs;
            return userstwo
        })
}

getUsers();


/* ------------------------------ Movie Functions ------------------------------ */



function readTitle() {
    // Function used to access a specific object contained in "movies", and sets the HTML "displayed-movie" to be it
    // In this case, it is reading "Bladerunner" 
    db.collection("movies").doc("Bladerunner")
        .onSnapshot(function (c) {
            //console.log ("current document data: " + c.data());                       //.data() returns data object
            document.getElementById("displayed-movie").innerHTML = c.data().title; //using vanilla javascript
            //$('#quote-goes-here').text(c.data().quote);                             //using jquery object dot notation
            //$("#quote-goes-here").text(c.data()["quote"]);                          //using json object indexing
        })
}

// readTitle();




var displayNextMovie = () => {
    //document.getElementById('yes').addEventListener('click', function () {
    var movieTitle = movies[movieIndex].data().title;
    var movieDirector = movies[movieIndex].data().director;
    var movieYear = movies[movieIndex].data().year;
    var movieDescription = movies[movieIndex].data().description;

    document.getElementById('displayed-movie').innerHTML = movieTitle;
    document.getElementById('displayed-movie-small').innerHTML = movieTitle;
    document.getElementById('displayed-director').innerHTML = movieDirector;
    document.getElementById('displayed-year').innerHTML = movieYear;
    document.getElementById('displayed-description').innerHTML = movieDescription ;

    movieIndex++;
    console.log(movieTitle);
}

yes.onclick = displayNextMovie;
no.onclick = displayNextMovie;


function getMovies() {
    db.collection("movies")
        .get()
        .then(function (snap) {
            movies = snap.docs;
        })
}

getMovies();


// // Additional Functions


  

  












var currentUserEmail;

function getUser() {

    let p = new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user)
            } else {
                // No user is signed in.
            }
        })
    })
    p.then((user) => {
        console.log("PROMISE getUser()")
        return user.email
    }).catch((user) => {
        console.log("Something is going wrong.")
    })
}


function printUserEmail() {
    let printPromise = new Promise((resolve, reject) => {
        var promiseUser = getUser()
        if (promiseUser != undefined) {
            resolve(promiseUser)
        }
    })
    printPromise.then((message) => {
        console.log(message)
    })
}

printUserEmail();



/* ------------------------------ HTML Re-Direct Functions ------------------------------ */


document.getElementById(id = "swipeToMatchesButton").onclick = function () {
    location.href = "./matches.html";
};



// function addDesiredMovie() {

//     let currentUserPromise = new Promise((resolve, reject) => {
//         firebase.auth().onAuthStateChanged(function(user) {
//             if (user) {
//                 console.log("currentUserPromise" + user)
//                 resolve(user)
//             } else {
//                 // No user is signed in.
//             }
//         })
//     })

//     let currentIDPromise = new Promise ((resolve, reject) => {
//         currentUserPromise.then((user) => {
//             let userID = findUserID(user)
//             console.log("THIS HERE IS THE USERID")
//             console.log(userID)
//             resolve(userID)
//         }).catch((user) => {
//             console.log("Something is going wrong.")
//         })
//     })

//     currentUserPromise.then((user) => {
//         console.log("DESIRE MOVIE User")
//         console.log(user.email)  
        
//         var userRef = db.collection('userstwo').doc("CoolGuy");

//         var setWithMerge = userRef.set({
//             desired: [],
//             desiredTwo: "ok",
//             guy: "bless"
//         }, { merge: true });

//     }).catch((user) => {
//         console.log("Something is going wrong.")
//     })



//     var userRef = db.collection('userstwo').doc('BJ');

    
// }


// addDesiredMovie();

// var users;

// function findUserID(email) {
    
//     db.collection("userstwo")
//         .get()
//         .then(function (snap) {
//             users = snap.docs;
//             users.forEach(function (user) {
//                 console.log(user.id)
//                 console.log(user.data().email)
//                 if (email == user.data().email) {
//                     return user.id
//                 }

//             });
//         })
// 