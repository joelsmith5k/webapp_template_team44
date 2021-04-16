// Variables allow indexing for the movies

var currentUser;

// This allows the program to index through the "movie" collection.
var movies;
var movieIndex = 0;

// This allows users to return to the list of movies they are swiping on, rather than always starting form the beginning
var userstwo;
var userIndex = 0;

yes = document.getElementById("yesButton");
no = document.getElementById("noButton");

/* ------------------------ Start Swipe Button Functions ------------------------ */

function startSwipe() {
    // Initializes the swiping process

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
    // Returns the current user on the page

    firebase.auth().onAuthStateChanged(function(user) {
        db.collection("userstwo").doc(user.uid).get().then(function(doc) {
        })
        if (user) {
            currentUser = user
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


var displayMovie = () => {
    // Function that shows a movie that allows a user to "swipe" on 
    
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
    // Simple function that retrieves the current group, and displays the group on "swipe • collection.html"

    firebase.auth().onAuthStateChanged(function(user) {
        db.collection("userstwo").doc(user.uid).get().then(function(doc) {
            let groupName = doc.data().current_group
            document.getElementById('displayed-group-title').innerHTML = groupName;
        })
      });
}


displayGroupTitle()


var approveMovie = () => {
    // Increments the movieIndex
    // Increments the userIndex
    // Allows user to approve of a movie they want to watch
    // Adds the displayed movie to the current user's desired movie array
    // Displays the next indexed movie.

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
    // Increments the movieIndex
    // Increments the userIndex
    // Displays the next indexed movie.
    
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
                
                currentUser.update({
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

    

    
    console.log(movieTitle);
}


yes.onclick = approveMovie;
no.onclick = disapproveMovie;


function getMovies() {
    // Access and returns the "movies" collection
    db.collection("movies")
        .get()
        .then(function (snap) {
            movies = snap.docs;
        })
}

getMovies();

