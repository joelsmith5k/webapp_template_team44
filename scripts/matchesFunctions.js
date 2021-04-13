/* ------------------------------------- Variables ------------------------------------- */

var movies;
var movieIndex = 0;


/* ------------------------------ HTML Re-Direct Functions ------------------------------ */

// document.getElementById(id = "matchesToSwipeButton").onclick = function () {
//     location.href = "./swipe • collection.html";
// };


/* ------------------------------ Movie Display Functions ------------------------------ */

function getMovies() {
    db.collection("movies")
        .get()
        .then(function (snap) {
            movies = snap.docs;
            snap.forEach(element => {
                addMatchesToPage(element)
            });
        })
}

getMovies();

// async function syncMovies() {
//     db.collection("movies")
//         .get()
//         .then(function (snap) {
//             let syncedMovies = snap.docs;
//             movies = snap.docs;
//             console.log(movies)
            
//         })
// }



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


function addMatchesToPage(movieVariable) {


    var movieTitle = movieVariable.data().title;
    var movieDirector = movieVariable.data().director;
    var movieYear = movieVariable.data().year;
    var movieDescription = movieVariable.data().description;
    var movieImageURL = movieVariable.data().image_url;

    console.log(movieTitle)

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

    matchedMovieTitle.appendChild(matchedDirector)

    // Description
    var matchedDescription = document.createElement("h6")
    var textDescription = document.createTextNode(movieDescription)
    matchedDescription.appendChild(textDescription)

    matchedMovieTitle.appendChild(matchedDescription)


    movieDivTwo.appendChild(matchedMovieTitle)
    
    movieDiv.appendChild(movieDivTwo)

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
