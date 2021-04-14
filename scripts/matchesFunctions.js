/* ------------------------------------- Variables ------------------------------------- */

var movies;
var movieIndex = 0;


/* ------------------------------ HTML Re-Direct Functions ------------------------------ */

// document.getElementById(id = "matchesToSwipeButton").onclick = function () {
//     location.href = "./swipe • collection.html";
// };


/* ------------------------------ Sort Object Functions ------------------------------ */

function sort_object(obj) {
    items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    sorted_obj={}
    $.each(items, function(k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return(sorted_obj)
} 



/* ------------------------------ Movie Display Functions ------------------------------ */

// Find the current users group name, pass this information to findAllUsers function
function runMatchesPage(){

    firebase.auth().onAuthStateChanged(function (user) {

    var docRef = db.collection("userstwo").doc(user.uid);

    docRef.get().then((doc) => {

        console.log("Document data:", doc.data());
        currentGroup = doc.data().current_group;
        // console.log(currentGroup)
        findAllUsers(currentGroup)
        })
    })
}


// Find all users that are in the same group, create a list, containing lists of their desired movies. 
// Pass this master list to sortAndMatch
function findAllUsers(currentGroup){

    db.collection("userstwo").where("current_group", "==", currentGroup)
    .get()
    .then((querySnapshot) => {

        let total_users = 0;

        var allMoviesList = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            allMoviesList.push(doc.data().desired_movies)
            // console.log(trial_list)
            total_users ++     
        });

        console.log("total_users" + total_users)
        sortAndMatch(allMoviesList, total_users)
    })
}

// Combine the list of lists into one large list containing every single element
function sortAndMatch(allMoviesList, total_users){

    var combinedMovies = [];

    for (var i = 0; i < allMoviesList.length; i++) {
        var theList = allMoviesList[i];
        for (var j = 0; j < theList.length; j++) {
            combinedMovies.push(theList[j]);
        }
    }

// Create the object that includes each movie and it's count, no duplicates
    var countedMovies = {};

    combinedMovies.forEach(function(movie) {

        if (countedMovies.hasOwnProperty(movie)) {countedMovies[movie]++} 

        else {countedMovies[movie] = 1}

    });

    var sortedMovies = sort_object(countedMovies)

    // console.log("sortedMovies")
    // console.log(sortedMovies)

// maybe pass this object to one final function that creates and displays the DOM's?
    // console.log(countedMovies);
    getMoviesTwo(sortedMovies, total_users) 

}


    runMatchesPage();

// ------------------------------ Joel's Code Above--------------------------------------
// Yo Marti this is what I did:
// 1. copied my JS functions from scratch.html to ^^
// 2. Commented out your call to getMovies(); in line 108
// 3. Called getMovies from my last function in line 79, passed it the dictionary (countedMovies)
// 4. added if statement in line 101.. for each movie in the database, if the dictionary ^^ has that key, it passes it to addMatchesPage()
// 5. Did not alter addMatchesPage() at all
//  Test it out with a few diff groups and see if it works for you too. Will have to add in some sort of rank?

function getMovies(sortedMovies, total_users) {
    db.collection("movies")
        .get()
        .then(function (snap) {
            console.log(sortedMovies)
            movies = snap.docs;
            console.log(movies)
            snap.forEach(element => {
                if (sortedMovies.hasOwnProperty(element.data().title)) {
                    let totalLikes = sortedMovies[element.data().title];
                    let percentLikes = totalLikes / total_users
                    addMatchesToPage(element, percentLikes)
                }
            });
        })
}



function getMoviesTwo(sortedMovies, total_users) {
    db.collection("movies")
        .get()
        .then(function (snap) {
            console.log(sortedMovies)
            movies = snap.docs;
            console.log(movies)



            for (var key in sortedMovies) {
                // check if the property/key is defined in the object itself, not in parent
                if (sortedMovies.hasOwnProperty(key)) {           
                    console.log(key, sortedMovies[key]);
                    snap.forEach(element => {
                        if (element.data().title == key) {
                            let totalLikes = sortedMovies[element.data().title];
                            let percentLikes = totalLikes / total_users
                            addMatchesToPage(element, percentLikes)
                        }
                    })
                }
            }

            // snap.forEach(element => {
            //     if (sortedMovies.hasOwnProperty(element.data().title)) {
            //         let totalLikes = sortedMovies[element.data().title];
            //         let percentLikes = totalLikes / total_users
            //         addMatchesToPage(element, percentLikes)
            //     }
            // });
        })
}


// getMovies();

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



function addMovieToPage() {

    var movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", "row align-items-center");

    var movieDivTwo = document.createElement("div");
    movieDivTwo.setAttribute("class", "match_col");
    var imageAside = document.createElement("aside");
    imageAside.setAttribute("class", "match_image");
    var movieImage = document.createElement("img");
    movieImage.setAttribute("src", "./images/ikiru.jpg")
    imageAside.appendChild(movieImage)
    movieDivTwo.appendChild(imageAside)

    // Info for movies here
    // Title
    var matchedMovieTitle = document.createElement("div")
    matchedMovieTitle.setAttribute("class", "match_text")
    var titleHeader = document.createElement("h2")
    var titleText = document.createTextNode("Tester Movie (1969)")
    titleHeader.appendChild(titleText)

    matchedMovieTitle.appendChild(titleHeader)

    // Director
    var matchedDirector = document.createElement("h5")
    var textDirector = document.createTextNode("Tester Director")
    matchedDirector.appendChild(textDirector)

    matchedMovieTitle.appendChild(matchedDirector)

    // Description
    var matchedDescription = document.createElement("h6")
    var textDescription = document.createTextNode("Tester Description")
    matchedDescription.appendChild(textDescription)

    matchedMovieTitle.appendChild(matchedDescription)


    movieDivTwo.appendChild(matchedMovieTitle)
    
    movieDiv.appendChild(movieDivTwo)

    document.getElementById("matches_container").appendChild(movieDiv)
}


function addMatchesToPage(movieVariable, percentLikes) {

    console.log("percentLikes inside addMatches" + percentLikes)

    var movieTitle = movieVariable.data().title;
    var movieDirector = movieVariable.data().director;
    var movieYear = movieVariable.data().year;
    var movieDescription = movieVariable.data().description;
    var movieImageURL = movieVariable.data().image_url;


    

    var movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", "row align-items-center");

    var movieDivTwo = document.createElement("div");
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

    var matchPercentage = document.createElement("h5")
    var stringPercent = percentLikes * 100
    var textMatch = document.createTextNode(stringPercent + "% Match")
    matchPercentage.appendChild(textMatch)

    matchedMovieTitle.appendChild(matchedDirector)
    matchedMovieTitle.appendChild(matchPercentage)

    // Description
    var matchedDescription = document.createElement("h6")
    var textDescription = document.createTextNode(movieDescription)
    matchedDescription.appendChild(textDescription)

    matchedMovieTitle.appendChild(matchedDescription)


    movieDivTwo.appendChild(matchedMovieTitle)
    
    movieDiv.appendChild(movieDivTwo)

    if (percentLikes == 1) {
        movieDiv.style.border = "5px solid gold"
    }

    document.getElementById("matches_container").appendChild(movieDiv)

}



// addMatchesToPage()




/* <div class="row align-items-center">
    <div class="match_col">
        <aside class="match_image">
            <img src="./images/ikiru.jpg" width="200" height="300">
            </aside>
            <div class="match_text">
                <h2>Ikiru (1952)</h2>
                <h5>Directed by: Akira Kurosawa</h5>
                <h6>Lorem Ipsum.</h6>
                <button type="button" class="btn btn-dark">More info.</button>
            </div>
          </div>
    </div> */



async function hello() {
    return "hello"
};

hello().then((value) => console.log(value))

// syncMovies.then((value) => console.log(value))
