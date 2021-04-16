

var profileBtn = document.getElementById("changeProfile");

profileBtn.addEventListener('click', function () {
    console.log('hi')
    window.location.assign('edit_profile.html')
});

function showProfile() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.uid);
            db.collection("userstwo").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    var m = doc.data().aboutme;
                    var co = doc.data().country;
                    var ci = doc.data().city;
                    console.log(n);
                    document.getElementById("name").innerHTML = n;
                    console.log(m);
                    document.getElementById("aboutMe").innerHTML = m;
                    console.log(co);
                    document.getElementById("country").innerHTML = co;
                    console.log(ci);
                    document.getElementById("city").innerHTML = ci;

                    var amazon = doc.data().amazon;
                    var netflix = doc.data().netflix;
                    if (amazon) {
                        let amazonPrime = "<h2> Amazon Prime </h2>";
                        $("#streamingservice").append(amazonPrime);
                        let url = "images/primevideo.jpeg";
                        let image = new Image();
                        image.src = url;
                        document.getElementById("streamingservice").appendChild(image);
                    }
                    if (netflix) {
                        let netFlix = "<h2> Net Flix </h2>";
                        $("#streamingservice").append(netFlix);
                        let url = "images/netflix.png";
                        let image = new Image();
                        image.src = url;
                        document.getElementById("streamingservice").appendChild(image);
                    }
                });
            // var name = document.getElementById("name");
            // name.appendChild(n);
        };
    });
};
showProfile();