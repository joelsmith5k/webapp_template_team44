// VARIABLES

var currentUser;

var movies;
var movieIndex = 0;

var userstwo;
var userIndex = 0;

yes = document.getElementById("yesButton");
no = document.getElementById("noButton");

/* ------------------------ Start Swipe Button Functions ------------------------ */

function startSwipe() {
    var swipeButtons = document.getElementById("bottom_grid")
    var imdbButton = document.getElementById("imdb_button")
    var initialButton = document.getElementById("startButton")

    swipeButtons.style.display = "block";
    imdbButton.style.display = "initial";
    initialButton.style.display = "none";
    
    firebase.auth().onAuthStateChanged(function(user) {
        db.collection("userstwo").doc(user.uid).get().then(function(doc) {
            
            if (doc.data().last_swipe_index == undefined) {
                movieIndex = 0
            } else {
                movieIndex = doc.data().last_swipe_index
            }
            
            displayMovie();
        })
    });


    
    console.log("movieIndex" + movieIndex)
}


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




var displayMovie = () => {
    //document.getElementById('yes').addEventListener('click', function () {
    
        if (movieIndex < movies.length) {
            var movieTitle = movies[movieIndex].data().title;
            var movieDirector = movies[movieIndex].data().director;
            var movieYear = movies[movieIndex].data().year;
            var movieDescription = movies[movieIndex].data().description;
            var movieImageURL = movies[movieIndex].data().image_url;
            var movieIMDBURL = movies[movieIndex].data().imdb_url;

            document.getElementById('imdbButton').setAttribute("href", movieIMDBURL);
        } else {
            var movieTitle = ""
            var movieDirector = "You've gone through all the movies!"
            var movieYear = "Why don't you go see your group's matches?"
            var movieDescription = "Here's a photo of a dog if you want to just chill..."
            var movieImageURL = "https://firebasestorage.googleapis.com/v0/b/cineder-3be64.appspot.com/o/movie_posters%2Fnomoremovies.png?alt=media&token=0adb5278-6d72-42c1-83cf-855e932b8eae"


            document.getElementById('imdbButton').setAttribute("href", "./matches.html");
            document.getElementById("imdb_button").childNodes[0].nodeValue="See Matches!";;

            
        }

        document.getElementById('displayed-movie-image').setAttribute("src", movieImageURL);

        document.getElementById('displayed-movie-small').innerHTML = movieTitle;
        document.getElementById('displayed-director').innerHTML = movieDirector;
        document.getElementById('displayed-year').innerHTML = movieYear;
        document.getElementById('displayed-description').innerHTML = movieDescription;

        

}


var displayGroupTitle = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        db.collection("userstwo").doc(user.uid).get().then(function(doc) {
            console.log(doc.data().current_group)
            let groupName = doc.data().current_group
            document.getElementById('displayed-group-title').innerHTML = groupName;
        })
      });
}

displayGroupTitle()




var approveMovie = () => {
    //document.getElementById('yes').addEventListener('click', function () {

    movieIndex++;

    if (movieIndex < movies.length) {
        console.log("length.movies" + movies.length)

        var movieTitle = movies[movieIndex].data().title;
        var movieDirector = movies[movieIndex].data().director;
        var movieYear = movies[movieIndex].data().year;
        var movieDescription = movies[movieIndex].data().description;
        var movieImageURL = movies[movieIndex].data().image_url;
        var movieIMDBURL = movies[movieIndex].data().imdb_url;

        document.getElementById('imdbButton').setAttribute("href", movieIMDBURL);

        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("userstwo").doc(user.uid).get().then(function (doc) {
                console.log(user.uid)
                console.log(doc.data())
                console.log(doc.data().name)
    
                var currentUser = db.collection("userstwo").doc(user.uid)

                var movieTitle = movies[movieIndex - 1].data().title;
                
                currentUser.update({
                    desired_movies: firebase.firestore.FieldValue.arrayUnion(movieTitle),
                    last_swipe_index: movieIndex
                })
            })
        })

    } else if (movieIndex = movies.length) {
        var movieTitle = ""
        var movieDirector = "You've gone through all the movies!"
        var movieYear = "Why don't you go see your group's matches?"
        var movieDescription = "Here's a photo of a dog if you want to just chill..."
        var movieImageURL = "https://firebasestorage.googleapis.com/v0/b/cineder-3be64.appspot.com/o/movie_posters%2Fnomoremovies.png?alt=media&token=0adb5278-6d72-42c1-83cf-855e932b8eae"

        document.getElementById('imdbButton').setAttribute("href", "./matches.html");
        document.getElementById("imdb_button").childNodes[0].nodeValue="See Matches!";;

        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("userstwo").doc(user.uid).get().then(function (doc) {
    
                var currentUser = db.collection("userstwo").doc(user.uid)

                var movieToAdd = movies[movieIndex - 1].data().title;
                
                currentUser.update({
                    desired_movies: firebase.firestore.FieldValue.arrayUnion(movieToAdd),
                    last_swipe_index: movieIndex
                })
            })
        })

    } else {
        var movieTitle = ""
        var movieDirector = "You've gone through all the movies!"
        var movieYear = "Why don't you go see your group's matches?"
        var movieDescription = "Here's a photo of a dog if you want to just chill..."
        var movieImageURL = "https://firebasestorage.googleapis.com/v0/b/cineder-3be64.appspot.com/o/movie_posters%2Fnomoremovies.png?alt=media&token=0adb5278-6d72-42c1-83cf-855e932b8eae"
        var movieIMDBURL = "https://www.imdb.com/"

        document.getElementById('imdbButton').setAttribute("href", "./matches.html");
        document.getElementById("imdb_button").childNodes[0].nodeValue="See Matches!";;
    }

    document.getElementById('displayed-movie-image').setAttribute("src", movieImageURL);

    document.getElementById('displayed-movie-small').innerHTML = movieTitle;
    document.getElementById('displayed-director').innerHTML = movieDirector;
    document.getElementById('displayed-year').innerHTML = movieYear;
    document.getElementById('displayed-description').innerHTML = movieDescription;


}

var disapproveMovie = () => {
    
    movieIndex++;
    
    if (movieIndex < movies.length) {
        var movieTitle = movies[movieIndex].data().title;
        var movieDirector = movies[movieIndex].data().director;
        var movieYear = movies[movieIndex].data().year;
        var movieDescription = movies[movieIndex].data().description;
        var movieImageURL = movies[movieIndex].data().image_url;
        var movieIMDBURL = movies[movieIndex].data().imdb_url;

        document.getElementById('imdbButton').setAttribute("href", movieIMDBURL);

        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("userstwo").doc(user.uid).get().then(function (doc) {                
                
                var currentUser = db.collection("userstwo").doc(user.uid)
                
                currentUser.update({
                    last_swipe_index: movieIndex
                })
            })
        })

    } else if (movieIndex = movies.length) {
        var movieTitle = ""
        var movieDirector = "You've gone through all the movies!"
        var movieYear = "Why don't you go see your group's matches?"
        var movieDescription = "Here's a photo of a dog if you want to just chill..."
        var movieImageURL = "https://firebasestorage.googleapis.com/v0/b/cineder-3be64.appspot.com/o/movie_posters%2Fnomoremovies.png?alt=media&token=0adb5278-6d72-42c1-83cf-855e932b8eae"
        var movieIMDBURL = "https://www.imdb.com/"

        document.getElementById('imdbButton').setAttribute("href", "./matches.html");
        document.getElementById("imdb_button").childNodes[0].nodeValue="See Matches!";;

        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("userstwo").doc(user.uid).get().then(function (doc) {
    
                var currentUser = db.collection("userstwo").doc(user.uid)

                var movieToAdd = movies[movieIndex - 1].data().title;
                
                currentUser.update({
                    desired_movies: firebase.firestore.FieldValue.arrayUnion(movieToAdd),
                    last_swipe_index: movieIndex
                })
            })
        })

    } else {
        var movieTitle = ""
        var movieDirector = "You've gone through all the movies!"
        var movieYear = "Why don't you go see your group's matches?"
        var movieDescription = "Here's a photo of a dog if you want to just chill..."
        var movieImageURL = "https://firebasestorage.googleapis.com/v0/b/cineder-3be64.appspot.com/o/movie_posters%2Fnomoremovies.png?alt=media&token=0adb5278-6d72-42c1-83cf-855e932b8eae"
        var movieIMDBURL = "https://www.imdb.com/"

        document.getElementById('imdbButton').setAttribute("href", "./matches.html");
        document.getElementById("imdb_button").childNodes[0].nodeValue="See Matches!";;
    }

    //document.getElementById('yes').addEventListener('click', function () {
    
    document.getElementById('displayed-movie-image').setAttribute("src", movieImageURL);

    // document.getElementById('displayed-movie').innerHTML = movieTitle;
    document.getElementById('displayed-movie-small').innerHTML = movieTitle;
    document.getElementById('displayed-director').innerHTML = movieDirector;
    document.getElementById('displayed-year').innerHTML = movieYear;
    document.getElementById('displayed-description').innerHTML = movieDescription;

    

    
    console.log(movieTitle);
}

yes.onclick = approveMovie;
no.onclick = disapproveMovie;


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


// document.getElementById(id = "swipeToMatchesButton").onclick = function () {
//     location.href = "./matches.html";
// };



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