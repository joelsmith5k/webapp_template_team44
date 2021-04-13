
function getGroupName(){

    firebase.auth().onAuthStateChanged(function (user) {

        // Get the name of this users current group, so that we can find all other users with same group
        var groupName = db.collection("userstwo").doc(user.uid).doc("current group").get()
        // Do a console log to see that we accessed it
        addAllMovies(groupName)
    })
}


function addAllMovies(groupName){

    // Do a console log to see that the variable was passed properly

    // Create a reference to the userstwo collection
    var usersRef = db.collection("userstwo");

    // Create a query against the users collection.
    var allUsersInGroup = usersRef.where("current group", "==", groupName);

    // create an empty array, this will hold ALL desired movies from any user in the current users current group (including duplicates)
    var moviesToShow = []

    allUsersInGroup.forEach(element => {

        // access desired movie array
        // add every movie in the array of each user to moviesToShow
        // maybe moviesToShow should be an object(dictionary), then we could use the increment method Marti was working on..
        
    });

    // pass moviesToShow array to the func that sorts and/or builds the divs etc.
    displayMovies(moviesToShow)
}




// --------------- Original Code All in One Function --------------------------------------------------------

function addAllMovies(){

    firebase.auth().onAuthStateChanged(function (user) {

        // Get the name of this users current group, so that we can find all other users with same group
        var groupName = db.collection("userstwo").doc(user.uid).doc("current group").get()

        // Create a reference to the userstwo collection
        var usersRef = db.collection("userstwo");

        // Create a query against the users collection.
        var allUsersInGroup = usersRef.where("current group", "==", groupName);

        // create an empty array, this will hold ALL desired movies from any user in the current users current group (including duplicates)
        var moviesToShow = []

        allUsersInGroup.forEach(element => {

            // access desired movie array
            // add every movie in the array of each user to moviesToShow
            // sortAndDisplay(moviesToShow)
            
        });
    })
}


