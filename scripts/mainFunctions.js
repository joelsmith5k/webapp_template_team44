function greetingName(){
    // Function that finds current user's name, and displays name on main.html

    firebase.auth().onAuthStateChanged(function (user) {

    var docRef = db.collection("userstwo").doc(user.uid);

    docRef.get().then((doc) => {

        var currentUserName = doc.data().name

        var greetingHeader = document.createElement("h2")
        var greetingText = document.createTextNode("Hi, " + currentUserName + "!")
        greetingHeader.appendChild(greetingText)

        greetingHeader.style.color = "gold"

        document.getElementById("name_greeting").appendChild(greetingHeader)

        })
    })
}

greetingName()
