function getFormInputs() {
    document.getElementById("save").addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {

            // get various values from the form
            var name = document.getElementById("user-name").value;
            var greetingMessage = document.getElementById("greeting").value;
            var country = document.getElementById("country").value;
            var city = document.getElementById("city").value;
            var user = authResult.user;
            // if (authResult.additionalUserInfo.isNewUser) {
            //     db.collection("usersthree").doc(user.uid).set({
            //         name: name,
            //         greetingMessage: greeting,
            //         country: country,
            //         city: city
            //     })

            db.collection("usersthree")
                .doc(user.uid)
                .collection("items")
                .add({
                    "name": name,   //from text field
                    "greetingMessage": greeting,     //from checkbox
                    "country": country,      //from checkbox
                    "city": city
                })
        })
    })
}
getFormInputs();