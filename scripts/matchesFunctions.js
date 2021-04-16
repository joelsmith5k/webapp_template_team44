/* ------------------------------------- Variables ------------------------------------- */

// Variables here that allow indexing of movie collection in database
var movies;
var movieIndex = 0;

/* ------------------------------ Sort Object Functions ------------------------------ */

function sort_object(obj) {
    // Function takes an object and returns a sorted object with values descending from highest to lowest.
    items = Object.keys(obj).map(function (key) {
        return [key, obj[key]];
    });
    items.sort(function (first, second) {
        return second[1] - first[1];
    });
    sorted_obj = {}
    $.each(items, function (k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return (sorted_obj)
}


// ------------------------------ Match Logic --------------------------------------

function runMatchesPage() {
    // Find the current users group name, pass this information to findAllUsers function

    firebase.auth().onAuthStateChanged(function (user) {

        var docRef = db.collection("userstwo").doc(user.uid);

        docRef.get().then((doc) => {
            currentGroup = doc.data().current_group;
            findAllUsers(currentGroup)
        })
    })
}


function findAllUsers(currentGroup) {
    // Find all users that are in the same group, create a list, containing lists of their desired movies. 
    // Pass this master list to sortAndMatch
    // Pass total users in current group to sortAndMatch

    db.collection("userstwo").where("current_group", "==", currentGroup)
        .get()
        .then((querySnapshot) => {

            let total_users = 0;

            var allMoviesList = []
            querySnapshot.forEach((doc) => {
                allMoviesList.push(doc.data().desired_movies)
                total_users++
            });

            console.log("total_users" + total_users)
            sortAndMatch(allMoviesList, total_users)
        })
}


function sortAndMatch(allMoviesList, total_users) {
    // Combine the list of lists into one large list containing every single element    

    var combinedMovies = [];

    for (var i = 0; i < allMoviesList.length; i++) {
        var theList = allMoviesList[i];
        for (var j = 0; j < theList.length; j++) {
            combinedMovies.push(theList[j]);
        }
    }

    // Create the object that includes each movie and it's count, no duplicates
    var countedMovies = {};

    combinedMovies.forEach(function (movie) {

        if (countedMovies.hasOwnProperty(movie)) { countedMovies[movie]++ }

        else { countedMovies[movie] = 1 }

    });

    var sortedMovies = sort_object(countedMovies)

    // Pass all the sorted movies alongside the total amount of users in current group to getMoviesTwo()
    getMoviesTwo(sortedMovies, total_users)

}


runMatchesPage();

/* ------------------------------ Movie Display Functions ------------------------------ */

function getMoviesTwo(sortedMovies, total_users) {
    // Access "movies" collection and checks to see if there is a match with any movies in "sortedMovies" 
    // Send matched movies to addMatchesToPage
    // Send percent of users who like the movie to addMatcheToPage

    db.collection("movies")
        .get()
        .then(function (snap) {
            movies = snap.docs;

            for (var key in sortedMovies) {
                if (sortedMovies.hasOwnProperty(key)) {
                    snap.forEach(element => {
                        if (element.data().title == key) {
                            let totalLikes = sortedMovies[element.data().title];
                            let percentLikes = totalLikes / total_users
                            addMatchesToPage(element, percentLikes)
                        }
                    })
                }
            }
        })
}


var displayGroupTitle = () => {
    // Simple function that retrieves the current group, and displays the name in matches.html

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("userstwo").doc(user.uid).get().then(function (doc) {
            let groupName = doc.data().current_group
            document.getElementById('displayed-group-title').innerHTML = groupName;
        })
    });
}


displayGroupTitle()


function addMatchesToPage(movieVariable, percentLikes) {
    // Function that adds all movies previously matched to the matches.html as DOM elements

    // Access information in movieVariable
    var movieTitle = movieVariable.data().title;
    var movieDirector = movieVariable.data().director;
    var movieYear = movieVariable.data().year;
    var movieDescription = movieVariable.data().description;
    var movieImageURL = movieVariable.data().image_url;
    var movieIMDBURL = movieVariable.data().imdb_url;

    // Initial divs
    var movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", "row align-items-center");
    var movieDivTwo = document.createElement("div");

    // Div for Images
    movieDivTwo.setAttribute("class", "match_col");
    var imageAside = document.createElement("aside");
    imageAside.setAttribute("class", "match_image");
    var movieImage = document.createElement("img");
    movieImage.setAttribute("src", movieImageURL)
    imageAside.appendChild(movieImage)
    movieDivTwo.appendChild(imageAside)

    // Info for movies here

    // Title
    var matchedMovieTitle = document.createElement("div")
    matchedMovieTitle.setAttribute("class", "match_text")
    var titleHeader = document.createElement("h2")
    var titleText = document.createTextNode(movieTitle)
    titleHeader.appendChild(titleText)
    matchedMovieTitle.appendChild(titleHeader)

    // Director
    var matchedDirector = document.createElement("h5")
    var textDirector = document.createTextNode(movieDirector)
    matchedDirector.appendChild(textDirector)

    // Match Percentage
    var matchPercentage = document.createElement("h6")
    var stringPercent = Math.trunc(percentLikes * 100)
    var textMatch = document.createTextNode(stringPercent + "% Match")
    matchPercentage.style.color = "gold"
    matchPercentage.appendChild(textMatch)

    matchedMovieTitle.appendChild(matchedDirector)
    matchedMovieTitle.appendChild(matchPercentage)

    // Description
    var matchedDescription = document.createElement("h6")
    var textDescription = document.createTextNode(movieDescription)
    matchedDescription.appendChild(textDescription)

    matchedMovieTitle.appendChild(matchedDescription)

    // More info Button
    var infoLink = document.createElement("a")
    var infoButton = document.createElement("button")
    var infoText = document.createTextNode("More info.")

    infoButton.appendChild(infoText)
    infoLink.setAttribute("href", movieIMDBURL);
    console.log("IMDBLINK" + movieIMDBURL)
    infoButton.setAttribute("class", "btn btn-warning");
    infoButton.style["background-color"] = "#0E0F0f";
    infoButton.style.color = "gold";
    infoButton.style["margin-top"] = "20px";
    infoLink.appendChild(infoButton)
    matchedMovieTitle.appendChild(infoLink)

    movieDivTwo.appendChild(matchedMovieTitle)

    movieDiv.appendChild(movieDivTwo)

    // Will add a gold border to movies with a 100% match
    if (percentLikes == 1) {
        movieDiv.style.border = "5px solid gold"
    }

    document.getElementById("matches_container").appendChild(movieDiv)

}
